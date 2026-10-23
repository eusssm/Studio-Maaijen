'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import HeroVisual from './HeroVisual';
import { PackageGrid } from './PackageCards';
import { EMAIL, LINKEDIN, sized, CropMarks, Reg, SiteOverlays, SiteNav, SiteFooter } from './studio-chrome';
import { normalizePackages } from '../../lib/packages';
import '../app/drukklaar.css';

const DEFAULT_CLIENTS = ['Blubricks', 'Spotta', 'De Kindertelefoon', 'PostNL', 'Gemeenten', 'Enova'];
const DEFAULT_SERVICES = [
  {
    title: 'UX/UI Design',
    desc: 'Van wireframe tot klikbaar prototype. Ik ontwerp digitale ervaringen die intuïtief aanvoelen en bezoekers van A naar B brengen.',
    tags: ['User research', 'Wireframing', 'Prototyping', 'Design systems'],
  },
  {
    title: 'Brand Identity',
    desc: 'Merken die er goed uitzien én iets zeggen. Logo, kleur, typografie en een stijlgids die je team daadwerkelijk gebruikt.',
    tags: ['Logo', 'Typografie', 'Kleurpaletten', 'Brand guidelines'],
  },
  {
    title: 'Video & Motion',
    desc: 'Van ruwe opnames naar een gepolijste productie, met oog voor ritme en sfeer. Bewegend beeld dat het verhaal versterkt.',
    tags: ['Post-productie', 'Motion graphics', 'Color grading', 'Sound design'],
  },
];
const DEFAULT_STEPS = [
  { name: 'Luisteren & begrijpen', desc: 'Ik duik in jouw merk, doelgroep en doelstellingen. Geen aannames, alleen een scherp beeld van wat je nodig hebt.' },
  { name: 'Creëren & verfijnen', desc: 'Van concept tot pixel-perfecte uitwerking. Ik werk iteratief, met jou als sparringpartner door het hele traject.' },
  { name: 'Lanceren & groeien', desc: 'Alles klaar voor livegang, met heldere documentatie zodat je zelfstandig verder kunt of met je team.' },
];
const STATEMENT = (
  'Ik bouw digitale producten voor ondernemers die meer willen dan mooi. Ze moeten *duidelijk* zijn, snel laden en klanten laten doen wat je wilt.'
).split(' ').map(w => (w.startsWith('*') ? { t: w.replace(/\*/g, ''), em: true } : { t: w, em: false }));

const isHtml = s => typeof s === 'string' && /<[a-z][\s\S]*>/i.test(s);
const pad = n => String(n).padStart(2, '0');

/* Koppen uit het CMS: regels scheiden met <br>, <p> of <div>-tags */
function headlineLines(html) {
  if (!html) return ['Impactvolle UX/UI', '&amp; <em>Merkidentiteiten</em>'];
  if (html.includes('</div>')) {
    return html
      .split(/<\/div>\s*<div[^>]*>/)
      .map(l => l.replace(/<\/?div[^>]*>/g, '').trim())
      .filter(Boolean);
  }
  return html.split(/<br\s*\/?>|\n/).map(l => l.trim()).filter(Boolean);
}

export default function HomeClient({ homepage, projects = [], packages: packageData = [] }) {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let cleanup = null;
    let cancelled = false;
    import('./home-animations').then(mod => {
      if (cancelled || !rootRef.current) return;
      cleanup = mod.initHomeMotion(rootRef.current);
    });
    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const h = homepage || {};
  const headline = h.heroHeadline || 'Impactvolle UX/UI<br />&amp; <em>Merkidentiteiten</em>';
  const headlineItems = headlineLines(headline);
  const portraitUrl = h.aboutPortrait?.url || '/images/eugene-portrait.jpg';
  const heroImage = sized(portraitUrl, 1600) || '/images/eugene-portrait.jpg';
  const clientNames = Array.from(new Set(projects.map(p => p.client).filter(Boolean)));
  const ticker = clientNames.length ? clientNames : DEFAULT_CLIENTS;
  const clients = h.aboutClients ? h.aboutClients.split(',').map(c => c.trim()) : DEFAULT_CLIENTS;
  const packages = normalizePackages(packageData).slice(0, 3);
  const stats = [
    { v: h.stat1Value || '20', l: h.stat1Label || 'Jaar werkervaring', s: h.stat1Sub || 'UX/UI & brand' },
    { v: h.stat2Value || '50', l: h.stat2Label || 'Projecten afgeleverd', s: h.stat2Sub || 'Diverse opdrachtgevers' },
    { v: h.stat3Value || '30', l: h.stat3Label || 'Huisstijlen gecreëerd', s: h.stat3Sub || 'Van concept tot delivery' },
    { v: h.stat4Value || '100', l: h.stat4Label || 'Passie voor craft', s: h.stat4Sub || 'Elke pixel telt' },
  ];
  const services = [1, 2, 3].map((n, i) => ({
    title: h[`service${n}Title`] || DEFAULT_SERVICES[i].title,
    desc: h[`service${n}Desc`] || DEFAULT_SERVICES[i].desc,
    tags: h[`service${n}Tags`]
      ? h[`service${n}Tags`].split(',').map(t => t.trim())
      : DEFAULT_SERVICES[i].tags,
  }));
  const blocks = [1, 2, 3, 4].map(n => ({ label: h[`aboutBlock${n}Label`], text: h[`aboutBlock${n}Text`] }));
  const steps = [1, 2, 3].map((n, i) => ({
    name: h[`processStep${n}Name`] || DEFAULT_STEPS[i].name,
    desc: h[`processStep${n}Desc`] || DEFAULT_STEPS[i].desc,
  }));
  const email = h.ctaEmail || EMAIL;

  return (
    <div className="h-root" ref={rootRef} id="top">
      <div className="h-loader no-print" aria-hidden="true">
        <div className="h-loader-inner">
          <span className="h-loader-label">Studio Maaijen</span>
          <span className="h-loader-count">
            <b data-h-count>000</b>
            <i>%</i>
          </span>
          <span className="h-loader-bar">
            <span data-h-bar />
          </span>
        </div>
      </div>
      <SiteOverlays />
      <SiteNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* ───────── 00 HERO (Spector Style) ───────── */}
      <section id="start" className="h-hero h-hero--spector h-dark no-print" data-theme="dark">
        <HeroVisual heroImage={heroImage} heroMobileImage={heroImage} />

        {/* Monumental Headline Across the Bottom */}
        <div className="h-hero-headline-wrap" data-h-hero-headline>
          <h1 className="h-hero-monumental" aria-label={headlineItems.join(' ').replace(/<[^>]+>/g, '')}>
            {headlineItems.map((line, i) => (
              <span
                key={i}
                className={`h-hero-line ${i === 1 ? 'h-hero-line--indent' : ''}`}
                data-h-line
              >
                <span>
                  <span dangerouslySetInnerHTML={{ __html: line }} />
                  {i === 0 && (
                    <span className="h-hero-emblem" data-h-emblem aria-hidden="true">
                      <svg viewBox="0 0 32 32" fill="none">
                        <path
                          d="M16 0L17.5 12.5L30 14L17.5 15.5L16 28L14.5 15.5L2 14L14.5 12.5L16 0Z"
                          fill="currentColor"
                        />
                        <circle cx="16" cy="14" r="2.5" fill="#050609" />
                      </svg>
                    </span>
                  )}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom Bar: Scroll Indicator & Availability */}
        <div className="h-hero-bottom-bar" data-h-hero-fade>
          <a href="#werk" className="h-hero-scroll-pill h-mono" data-h-magnet>
            <span>SCROLL</span>
            <span className="h-hero-scroll-arr" aria-hidden="true">↓</span>
          </a>
          <span className="h-hero-avail h-mono">
            <i aria-hidden="true" /> Nu beschikbaar — projecten vanaf 2 weken
          </span>
        </div>
      </section>

      {/* ───────── TICKER ───────── */}
      <div className="h-ticker h-dark no-print" data-theme="dark" aria-label="Opdrachtgevers">
        <div className="h-ticker-track">
          {[0, 1].map(dup => (
            <div className="h-ticker-set" key={dup} aria-hidden={dup === 1}>
              {ticker.map((name, i) => (
                <span key={`${dup}-${i}`} className="h-ticker-item">
                  {name}
                  <Reg />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ───────── 01 WERK ───────── */}
      <section id="werk" className="h-work h-dark" data-theme="dark">
        <div className="h-wrap">
          <div className="h-label" data-h="up">
            <span className="h-mono">(01) Geselecteerd werk</span>
            <span className="h-mono">{pad(projects.length)} cases</span>
          </div>
          <div className="h-work-head">
            <h2 className="h-display" data-h-lines>
              Projecten die <em>resultaat</em> leveren
            </h2>
            <p className="h-work-intro" data-h="up">
              Van brand identity tot digitale producten. Elk project vertelt een verhaal dat blijft hangen, en
              elk project is gebouwd om iets voor de opdrachtgever op te leveren.
            </p>
          </div>

          <ol className="h-cases" data-h-cases>
            {projects.length > 0 ? (
              projects.map((proj, i) => {
                const cats = proj.categories?.length
                  ? proj.categories.map(c => c.name)
                  : proj.projectType
                  ? [proj.projectType]
                  : ['Case'];
                const name = proj.client || proj.title;
                return (
                  <li key={proj.slug || i} className="h-case-item" data-h="up">
                    <Link href={`/work/${proj.slug}`} className="h-case" data-h-case={i}>
                      <span className="h-case-no h-mono">{pad(i + 1)}</span>
                      <span className="h-case-main">
                        <span className="h-case-name">{name}</span>
                        {proj.introText ? <span className="h-case-sub">{proj.introText}</span> : null}
                      </span>
                      <span className="h-case-cats h-mono">{cats.join(' / ')}</span>
                      <span className="h-case-arrow" aria-hidden="true">↗</span>
                      <span className="h-case-inline" aria-hidden="true">
                        {proj.coverImage?.url ? (
                          <img src={sized(proj.coverImage.url, 1000)} alt="" loading="lazy" decoding="async" />
                        ) : (
                          <span className="h-case-noimg">{(name || 'SM').slice(0, 2)}</span>
                        )}
                        <CropMarks />
                      </span>
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="h-case-item">
                <span className="h-mono">Projecten worden geladen…</span>
              </li>
            )}
          </ol>

          <div className="h-peek" data-h-peek aria-hidden="true">
            <div className="h-peek-frame">
              {projects.map((proj, i) => (
                <div className="h-peek-img" data-h-peek-img={i} key={proj.slug || i}>
                  {proj.coverImage?.url ? (
                    <img src={sized(proj.coverImage.url, 900)} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <span className="h-case-noimg">{(proj.client || proj.title || 'SM').slice(0, 2)}</span>
                  )}
                </div>
              ))}
              <CropMarks />
            </div>
            <span className="h-peek-cap h-mono" data-h-peek-cap />
          </div>

          <div className="h-work-more" data-h="up">
            <Link href="/work" className="h-btn h-btn--ghost" data-h-magnet>
              <span>Alle projecten</span>
              <i aria-hidden="true">→</i>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 02 DISCIPLINES ───────── */}
      <section id="services" className="h-svc h-paper" data-theme="paper">
        <div className="h-wrap">
          <div className="h-label" data-h="up">
            <span className="h-mono">(02) Disciplines</span>
            <span className="h-mono">Wat ik doe</span>
          </div>
          <h2 className="h-display h-display--ink" data-h-lines>
            Wat ik doe &amp; <em>hoe ik het doe</em>
          </h2>
          <p className="h-svc-intro" data-h="up">
            {h.servicesSubtitle || '20 jaar ervaring op het snijvlak van strategie, esthetiek en techniek.'}
          </p>

          <ol className="h-svc-list" data-h-group>
            {services.map((s, i) => (
              <li key={i} className="h-svc-row" data-h="up">
                <span className="h-mono h-svc-no">{pad(i + 1)}</span>
                <h3 className="h-svc-title">{s.title}</h3>
                <p className="h-svc-desc">{s.desc}</p>
                <ul className="h-svc-tags">
                  {s.tags.map((t, j) => (
                    <li key={j} className="h-mono">{t}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── 03 PAKKETTEN (teaser) ───────── */}
      <section id="pakketten" className="h-dark h-pkt-teaser" data-theme="dark">
        <div className="h-wrap">
          <div className="h-label" data-h="up">
            <span className="h-mono">(03) Pakketten</span>
            <Link href="/pakketten" className="h-mono h-chero-back">Alle pakketten →</Link>
          </div>
          <h2 className="h-display" data-h-lines>
            Heldere pakketten, <em>sleutelklaar</em>
          </h2>
          <PackageGrid packages={packages} compact />
        </div>
      </section>

      {/* ───────── 04 OVER MIJ ───────── */}
      <section id="about" className="h-story h-paper" data-theme="paper">
        <div className="h-wrap">
          <div className="h-label" data-h="up">
            <span className="h-mono">(04) Over mij</span>
            <span className="h-mono">Studio sinds 2013</span>
          </div>

          <p className="h-statement" data-h-statement aria-label={STATEMENT.map(w => w.t).join(' ')}>
            {STATEMENT.map((w, i) => (
              <span key={i} className={`h-word ${w.em ? 'is-em' : ''}`} aria-hidden="true">
                {w.t}{' '}
              </span>
            ))}
          </p>

          <div className="h-story-body">
            <div className="h-story-facts" data-h-group>
              {stats.map((st, i) => (
                <div key={i} className="h-fact" data-h="up">
                  <span
                    className="h-fact-num"
                    data-h-count-to={st.v}
                    data-h-suffix={i === 3 ? '%' : i === 0 ? '' : '+'}
                  >
                    {st.v}
                  </span>
                  <span className="h-mono">{st.l}</span>
                  <span className="h-fact-sub h-mono">{st.s}</span>
                </div>
              ))}
            </div>

            <div className="h-story-prose" data-h-group>
              {h.aboutIntro ? (
                <p className="h-story-lead" data-h="up" dangerouslySetInnerHTML={{ __html: h.aboutIntro }} />
              ) : (
                <p className="h-story-lead" data-h="up">
                  <strong>Ik ben Eugène Maaijen.</strong> Senior UX/UI-designer, front-end developer en brand creator.
                  Met ruim 20 jaar ervaring help ik bedrijven om <em>digitale ervaringen te maken</em> die raken,
                  helder communiceren en converteren.
                </p>
              )}
            </div>
          </div>

          <div className="h-blocks" data-h-group>
            {blocks.map((b, i) => (
              <div key={i} className="h-block-card" data-h="up">
                <span className="h-mono h-block-lbl">{b.label || ['Achtergrond', 'Werkwijze', 'Expertise', 'Tools'][i]}</span>
                {isHtml(b.text) ? (
                  <div className="h-prose" dangerouslySetInnerHTML={{ __html: b.text }} />
                ) : (
                  <div className="h-prose">
                    {(b.text ||
                      [
                        'Al meer dan twintig jaar beweeg ik me op het snijvlak van design, psychologie en technologie. Ik ontwerp niet alleen een intuïtieve interface, maar begrijp ook hoe interacties en moderne webcode werken.',
                        'Geen bureauprocessen of onnodige vergaderlagen. Je werkt rechtstreeks samen met degene die jouw project ontwerpt en bouwt. Korte lijnen, heldere afspraken, nuchter en transparant.',
                        'UX & UI design, front-end en web met Next.js en React, branding en visuele identiteit, en video & motion in Premiere Pro en After Effects.',
                        'Figma, Adobe Creative Cloud, After Effects, Premiere Pro, DaVinci Resolve, Next.js, HTML/CSS, Webflow en AI-gedreven workflows.',
                      ][i]
                    )
                      .split('\n')
                      .filter(Boolean)
                      .map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="h-clients" data-h="up">
            <span className="h-mono">Gewerkt voor</span>
            <ul>
              {clients.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── 05 WERKWIJZE ───────── */}
      <section id="werkwijze" className="h-proc h-dark" data-theme="dark">
        <div className="h-wrap">
          <div className="h-label" data-h="up">
            <span className="h-mono">(05) Werkwijze</span>
            <span className="h-mono">Van brief naar resultaat</span>
          </div>
          <h2 className="h-display" data-h-lines>
            {h.processTitle ? (
              <span dangerouslySetInnerHTML={{ __html: h.processTitle }} />
            ) : (
              <>
                Van brief naar <em>briljant resultaat</em>
              </>
            )}
          </h2>
          <ol className="h-proc-steps" data-h-group>
            {steps.map((s, i) => (
              <li key={i} className="h-proc-step" data-h="up">
                <span className="h-proc-num">{pad(i + 1)}</span>
                <h3 className="h-proc-name">{s.name}</h3>
                <p className="h-proc-desc">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── 06 CONTACT ───────── */}
      <section id="cta" className="h-contact h-dark" data-theme="dark">
        <div className="h-wrap">
          <div className="h-label" data-h="up">
            <span className="h-mono">(06) Samenwerken</span>
            <span className="h-mono h-contact-avail">
              <i aria-hidden="true" /> Nu beschikbaar
            </span>
          </div>
          <p className="h-contact-eyebrow" data-h="up">
            {h.ctaEyebrow || 'Klaar om samen te werken?'}
          </p>
          <h2 className="h-contact-title" data-h-lines>
            {h.ctaTitle ? (
              <span dangerouslySetInnerHTML={{ __html: h.ctaTitle }} />
            ) : (
              <>
                Laten we <em>iets moois</em> maken.
              </>
            )}
          </h2>
          <div className="h-contact-grid">
            <p className="h-contact-lead" data-h="up">
              Vertel kort wat je nodig hebt. Je krijgt binnen twee werkdagen een reactie, met een eerlijk advies
              en een voorstel dat past bij je budget.
            </p>
            <a href={`mailto:${email}`} className="h-contact-mail" data-h="up" data-h-cursor="Mail" data-h-magnet>
              <span>{email}</span>
              <i aria-hidden="true">↗</i>
            </a>
          </div>
          <div className="h-contact-actions" data-h="up">
            <Link href="/contact" className="h-btn h-btn--spot" data-h-magnet>
              <span>Start een project</span>
              <i aria-hidden="true">→</i>
            </Link>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="h-btn h-btn--ghost" data-h-magnet>
              <span>LinkedIn</span>
              <i aria-hidden="true">↗</i>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter tagline={h.footerTagline} location={h.footerLocation} copyright={h.footerCopyright} />
    </div>
  );
}
