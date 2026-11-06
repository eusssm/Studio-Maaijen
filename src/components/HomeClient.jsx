'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import HeroVisual from './HeroVisual';
import {
  EMAIL,
  LINKEDIN,
  HERO_NAV_ITEMS,
  sized,
  LiveClock,
  SiteOverlays,
  SiteNav,
  SiteFooter,
} from './studio-chrome';
import { normalizePackages } from '../../lib/packages';
import '../app/drukklaar.css';
import '../app/mobius-scandi.css';

const DEFAULT_CLIENTS = ['PostNL', 'De Kindertelefoon', 'Spotta', 'Enova', 'Blue Bricks', 'Gemeenten'];

const CASE_SUBTITLE_OVERRIDES = {
  'de-kindertelefoon': 'Een platform dat luistert: redesign voor 45 jaar vertrouwen',
  enova: 'Internationaal energieplatform: van kijken naar realtime sturen',
  spotta: 'Eén schaalbaar platform voor 14,7 miljoen huishoudens, bezorgers en adverteerders',
  bluebricks: 'Nieuw digitaal platform voor een team van hands-on veranderpartners',
};

function resolveCaseSubtitle(proj) {
  if (!proj) return '';
  const slug = (proj.slug || '').toLowerCase();
  const raw = (proj.introText || '').trim();
  if (
    CASE_SUBTITLE_OVERRIDES[slug] &&
    (!raw ||
      raw.toLowerCase() === 'van strategie naar werkelijkheid' ||
      raw.toLowerCase().includes('nieuw digitale platform'))
  ) {
    return CASE_SUBTITLE_OVERRIDES[slug];
  }
  return raw || CASE_SUBTITLE_OVERRIDES[slug] || '';
}

const DEFAULT_SERVICES = [
  {
    index: 'A /',
    title: 'UX/UI & Webdesign',
    statement: 'Digitale ervaringen die rust uitstralen, helder navigeren en bezoekers moeiteloos in beweging brengen.',
    tags: [
      'UX Research & Strategie',
      'Wireframing & Klikbare Prototypes',
      'High-end UI & Design Systems',
      'Maatwerk Next.js & CMS Websites',
    ],
  },
  {
    index: 'B /',
    title: 'Merkidentiteit & Richting',
    statement: 'Tijdloze visuele identiteiten die laten zien wie je bent en vertrouwen wekken vanaf het eerste contact.',
    tags: [
      'Logo & Visuele Identiteit',
      'Typografie & Kleursystemen',
      'Merkpositionering & Tone of Voice',
      'Brand Guidelines & Templates',
    ],
  },
  {
    index: 'C /',
    title: 'Video & Motion Design',
    statement: 'Bewegend beeld en subtiele interactie die complexe verhalen menselijk, ritmisch en tastbaar maken.',
    tags: [
      'Bedrijfsvideo & Montage',
      'Motion Graphics & UI-Animatie',
      'Showreels & Social Content',
      'Color Grading & Audio Finishing',
    ],
  },
];

const DEFAULT_STEPS = [
  {
    num: '01',
    name: 'Luisteren & Essentie',
    desc: 'We starten bij de kern van je merk en je doelgroep. Geen dikke rapporten, maar snel scherp krijgen wat écht telt.',
  },
  {
    num: '02',
    name: 'Richting & Concept',
    desc: 'Ik vertaal je verhaal naar een heldere visuele koers, structuur en klikbaar prototype dat we direct samen toetsen.',
  },
  {
    num: '03',
    name: 'Design, Beeld & Bouw',
    desc: 'Pixel-perfecte uitwerking in design, video en razendsnelle webcode — alles in één hand zonder ruis op de lijn.',
  },
  {
    num: '04',
    name: 'Livegang & Groei',
    desc: 'Sleutelklaar opgeleverd met een gebruiksvriendelijk CMS, zodat je zelfstandig én met vertrouwen vooruit kunt.',
  },
];

const MANIFESTO_TEXT =
  'Geen bureaulagen of wisselende accountmanagers. Je werkt rechtstreeks samen met één ervaren ontwerper die strategie, merkidentiteit, web en video in één rustige lijn verenigt.';

const STATEMENT = MANIFESTO_TEXT.split(' ').map(w => ({ t: w, em: false }));

const FAQ_ITEMS = [
  {
    q: 'Werk ik tijdens het traject direct met jou samen?',
    a: 'Ja, altijd 1-op-1. Van de eerste kennismaking tot het ontwerp, de technische realisatie en de livegang heb je rechtstreeks contact met mij. Daardoor schakelen we snel en gaat er geen enkele nuance verloren.',
  },
  {
    q: 'Wat is de gemiddelde doorlooptijd van een project?',
    a: 'Een krachtige landingspagina staat vaak binnen 1 tot 2 weken live. Een complete bedrijfswebsite of rebranding duurt gemiddeld 2 tot 5 weken, afhankelijk van de omvang en beschikbare content.',
  },
  {
    q: 'Kan ik mijn website na oplevering zelf aanpassen?',
    a: 'Zeker. Elke website lever ik op met een overzichtelijk CMS waarin je zelf eenvoudig teksten, foto’s en nieuwe projecten of pagina’s kunt beheren — inclusief persoonlijke uitleg.',
  },
  {
    q: 'Kan ik eerst vrijblijvend zien wat je voor mijn bedrijf kunt betekenen?',
    a: 'Ja! Via de gratis preview-tool op deze website kun je in 2 minuten 7 korte vragen beantwoorden, waarna je direct een eerste interactieve schets voor jouw onderneming ontvangt.',
  },
];

const pad = n => String(n).padStart(2, '0');

export default function HomeClient({ homepage, projects = [], testimonials = [], packages: packageData = [] }) {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Conversational form state ("Let's Talk!" Möbius style)
  const [convName, setConvName] = useState('');
  const [convCompany, setConvCompany] = useState('');
  const [convGoal, setConvGoal] = useState('een nieuwe website');
  const [convEmail, setConvEmail] = useState('');
  const [convMessage, setConvMessage] = useState('');
  const [convSending, setConvSending] = useState(false);
  const [convStatus, setConvStatus] = useState(null);

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
  const portraitUrl = h.aboutPortrait?.url || '/images/eugene-portrait.jpg';
  const portraitImage = sized(portraitUrl, 1200) || '/images/eugene-portrait.jpg';

  /* Hero Case-Stack: gebruik de echte DatoCMS cases van Studio Maaijen */
  const reelSlides = projects
    .filter(p => p.coverImage?.url)
    .slice(0, 4)
    .map(p => ({
      src: sized(p.coverImage.url, 1400),
      client: p.client || p.title,
      title: p.title,
      slug: p.slug,
      type: p.projectType || p.categories?.[0]?.name || 'Digital Design',
    }));

  const clients = h.aboutClients
    ? h.aboutClients
        .split(',')
        .map(c => c.trim().replace(/^Blubricks$/i, 'Blue Bricks'))
    : DEFAULT_CLIENTS;

  const featuredProjects = projects.slice(0, 4);
  const tiers = normalizePackages(packageData).slice(0, 3);

  const stats = [
    {
      v: h.stat1Value || '20',
      suffix: '+',
      l: h.stat1Label || 'Jaar ervaring in digital design, merkidentiteit & media',
      s: h.stat1Sub || 'Van strategie en concept tot pixel-perfecte uitvoering.',
    },
    {
      v: h.stat2Value || '50',
      suffix: '+',
      l: h.stat2Label || 'Websites, digitale producten en campagnes opgeleverd',
      s: h.stat2Sub || 'Voor ambitieuze MKB-bedrijven, stichtingen en landelijke merken.',
    },
    {
      v: h.stat3Value || '30',
      suffix: '+',
      l: h.stat3Label || 'Merkidentiteiten, rebrandings en videoproducties',
      s: h.stat3Sub || 'Eén herkenbare handtekening over al je kanalen heen.',
    },
  ];

  const services = [1, 2, 3].map((n, i) => ({
    index: DEFAULT_SERVICES[i].index,
    title: h[`service${n}Title`] || DEFAULT_SERVICES[i].title,
    statement: DEFAULT_SERVICES[i].statement,
    desc: h[`service${n}Desc`] || DEFAULT_SERVICES[i].statement,
    tags: h[`service${n}Tags`]
      ? h[`service${n}Tags`].split(',').map(t => t.trim())
      : DEFAULT_SERVICES[i].tags,
  }));

  const email = h.ctaEmail || EMAIL;

  async function handleConvSubmit(e) {
    e.preventDefault();
    if (!convName.trim() || !convEmail.trim()) {
      setConvStatus({ type: 'error', text: 'Vul alsjeblieft je naam en e-mailadres in.' });
      return;
    }
    setConvSending(true);
    setConvStatus(null);
    const fullMessage = `Doel: ${convGoal}.\n${convMessage ? `\nToelichting: ${convMessage}` : ''}`;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: convName,
          email: convEmail,
          company: convCompany,
          website: '',
          interests: [convGoal],
          message: fullMessage,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setConvStatus({ type: 'error', text: data.error || 'Er ging iets mis. Probeer het opnieuw.' });
      } else {
        setConvStatus({
          type: 'success',
          text: 'Bedankt! Ik heb je bericht ontvangen en reageer binnen twee werkdagen.',
        });
        setConvName('');
        setConvCompany('');
        setConvEmail('');
        setConvMessage('');
      }
    } catch {
      setConvStatus({
        type: 'error',
        text: `Verzenden lukte niet. Mail gerust direct naar ${email}.`,
      });
    } finally {
      setConvSending(false);
    }
  }

  return (
    <div className="h-root h-home m-scandi" ref={rootRef} id="top">
      <SiteOverlays />
      <SiteNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* ═══════════════════════════════════════════════════════════
          00. MÖBIUS HERO — EXACT VOLGENS REFERENTIE
          Top-left: Editorial intro · Top-right: 4 clean nav items
          Center: Gedraaide case-stapel · Bottom: Monumentaal woordmerk + © + Klok
          ═══════════════════════════════════════════════════════════ */}
      <section id="start" className="m-hero no-print" data-theme="paper">
        {/* Bovenste balk: Intro links + 4 ultra-clean nav kolommen rechts */}
        <div className="m-hero-top">
          <p className="m-hero-intro" data-h-hero-fade>
            <strong>Studio Maaijen<sup>®</sup></strong> — een ontwerpstudio die merken en digitale ervaringen vormgeeft met rust, helderheid en tijdloos vakmanschap. Vanuit Ridderkerk help ik ambitieuze bedrijven laten zien wie ze zijn en waar ze voor staan.
          </p>

          <nav className="m-hero-topnav" aria-label="Snelnavigatie" data-h-hero-fade>
            {HERO_NAV_ITEMS.map(item => (
              <Link key={item.id} href={item.href} className="m-hero-topnav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="m-hero-mobile-menu-btn"
            onClick={() => setMenuOpen(v => !v)}
            aria-expanded={menuOpen}
            aria-controls="h-menu"
          >
            {menuOpen ? 'SLUIT' : 'MENU'}
          </button>
        </div>

        {/* Centraal: De gelaagde, gedraaide stapel met jouw eigen cases */}
        <HeroVisual slides={reelSlides} />

        {/* Onderaan: Monumentaal woordmerk links + © 2013-26 & Live Klok rechts */}
        <div className="m-hero-bottom">
          <div className="m-hero-wordmark-wrap" data-h-hero-headline>
            <h1 className="m-hero-wordmark" aria-label="Studio Maaijen">
              <span className="m-hero-wordmark-text">Studio Maaijen</span>
              <sup className="m-hero-reg">®</sup>
            </h1>
          </div>

          <div className="m-hero-right-meta" data-h-hero-fade>
            <span className="m-hero-copy">© 2013-26</span>
            <LiveClock className="m-hero-clock" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          01. GESELECTEERD WERK — MÖBIUS 4-CARD EXPANDING GALLERY
          ═══════════════════════════════════════════════════════════ */}
      <section id="werk" className="m-section m-work" data-theme="paper">
        <div className="h-wrap">
          <div className="m-sec-head" data-h="up">
            <span className="m-sec-label">01 / Geselecteerd werk</span>
            <Link href="/work" className="m-sec-link">
              Bekijk alle cases ({projects.length || 6}) ↗
            </Link>
          </div>

          {featuredProjects.length > 0 && (
            <div className="m-expand-gallery" data-h="up">
              {featuredProjects.map((proj, idx) => {
                const name = proj.client || proj.title;
                const subtitle = resolveCaseSubtitle(proj);
                const letter = ['A', 'B', 'C', 'D'][idx] || pad(idx + 1);
                const isExpanded = expandedCard === idx;
                const cat = proj.categories?.[0]?.name || proj.projectType || 'Digital Product';

                return (
                  <article
                    key={proj.slug || idx}
                    className={`m-expand-card ${isExpanded ? 'is-expanded' : ''}`}
                    onMouseEnter={() => setExpandedCard(idx)}
                  >
                    <Link href={`/work/${proj.slug}`} className="m-expand-card-link">
                      <div className="m-expand-card-top">
                        <span className="m-expand-letter">{letter} /</span>
                        <span className="m-expand-cat">{cat}</span>
                      </div>

                      <div className="m-expand-media">
                        {proj.coverImage?.url ? (
                          <img
                            src={sized(proj.coverImage.url, 1400)}
                            alt={proj.title || name}
                            loading={idx < 2 ? 'eager' : 'lazy'}
                            decoding="async"
                          />
                        ) : (
                          <div className="m-expand-placeholder">{name.slice(0, 2)}</div>
                        )}
                      </div>

                      <div className="m-expand-foot">
                        <div className="m-expand-titles">
                          <h2 className="m-expand-title">{name}</h2>
                          {subtitle && <p className="m-expand-sub">{subtitle}</p>}
                        </div>
                        <span className="m-expand-arrow" aria-hidden="true">↗</span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          02. MANIFESTO — SCROLL OPACITY WORD REVEAL (MÖBIUS SCRAMBLE)
          ═══════════════════════════════════════════════════════════ */}
      <section className="m-section m-manifesto" data-theme="paper">
        <div className="h-wrap">
          <div className="m-manifesto-grid">
            <div className="m-manifesto-left" data-h="up">
              <span className="m-sec-label">02 / Filosofie</span>
              <span className="m-manifesto-tag">Eén senior maker · Korte lijnen</span>
            </div>

            <div className="m-manifesto-right">
              <p className="h-statement m-statement" data-h-statement aria-label={MANIFESTO_TEXT}>
                {STATEMENT.map((w, i) => (
                  <span key={i} className="h-word" aria-hidden="true">
                    {w.t}{' '}
                  </span>
                ))}
              </p>

              <div className="m-manifesto-cols" data-h="up">
                <p>
                  Goed ontwerp heeft geen schreeuwerige effecten nodig. Door ruis weg te laten ontstaat ruimte voor wat je bedrijf écht onderscheidt: een glashelder verhaal, sterke visuele keuzes en techniek die direct vertrouwen wekt.
                </p>
                <p>
                  Al ruim twintig jaar combineer ik UX/UI-design, merkidentiteit, front-end development en videoproductie. Zo sluit je nieuwe website naadloos aan op je merk én het bewegende beeld.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          03. ONZE DIENSTEN — ARCHITECTURALE A / B / C RIJEN (MÖBIUS SERVICES)
          ═══════════════════════════════════════════════════════════ */}
      <section id="services" className="m-section m-services" data-theme="paper">
        <div className="h-wrap">
          <div className="m-sec-head" data-h="up">
            <span className="m-sec-label">03 / Expertise & Diensten</span>
            <span className="m-sec-note">Strategie, Design, Web & Beweging</span>
          </div>

          <div className="m-services-list">
            {services.map((s, i) => (
              <div key={i} className="m-service-row" data-h="up">
                <div className="m-service-index" aria-hidden="true">
                  {s.index}
                </div>
                <div className="m-service-main">
                  <span className="m-service-kicker">{s.title}</span>
                  <h3 className="m-service-statement">{s.statement}</h3>
                </div>
                <ul className="m-service-deliverables">
                  {s.tags.map((t, j) => (
                    <li key={j}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          04. STUDIO IN NUMBERS — MÖBIUS MILESTONE CARDS + THUMBNAILS
          ═══════════════════════════════════════════════════════════ */}
      <section className="m-section m-numbers" data-theme="paper">
        <div className="h-wrap">
          <div className="m-sec-head" data-h="up">
            <span className="m-sec-label">04 / Studio Maaijen in cijfers</span>
            <span className="m-sec-note">Bewezen vakmanschap sinds 2006</span>
          </div>

          <div className="m-numbers-grid">
            {stats.map((st, i) => (
              <div key={i} className="m-number-card" data-h="up">
                <div className="m-number-top">
                  <span className="m-number-idx">0{i + 1}</span>
                  <div className="m-number-thumbs" aria-hidden="true">
                    {reelSlides.slice(0, 3).map((sl, ti) => (
                      <img key={ti} src={sl.src} alt="" className="m-number-thumb" loading="lazy" />
                    ))}
                  </div>
                </div>

                <div className="m-number-value">
                  <span data-h-count-to={st.v} data-h-suffix={st.suffix}>
                    {st.v}{st.suffix}
                  </span>
                </div>

                <div className="m-number-body">
                  <h3 className="m-number-label">{st.l}</h3>
                  <p className="m-number-sub">{st.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          05. DE MAKER / FOUNDER — MÖBIUS EDITORIAL PORTRAIT & PARTNERS
          ═══════════════════════════════════════════════════════════ */}
      <section id="about" className="m-section m-founder" data-theme="paper">
        <div className="h-wrap">
          <div className="m-sec-head" data-h="up">
            <span className="m-sec-label">05 / De Studio & Oprichter</span>
            <span className="m-sec-note">Ridderkerk / Rotterdam</span>
          </div>

          <div className="m-founder-grid">
            <figure className="m-founder-portrait" data-h="up">
              <div className="m-founder-img-wrap">
                <img
                  src={portraitImage}
                  alt="Eugène Maaijen — Oprichter & Creative Director van Studio Maaijen"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="m-founder-caption">
                <span>Eugène Maaijen</span>
                <span>Founder &amp; Creative Director</span>
              </figcaption>
            </figure>

            <div className="m-founder-content" data-h="up">
              <span className="m-founder-eyebrow">Persoonlijk vakmanschap</span>
              <h2 className="m-founder-title">
                Eén aanspreekpunt dat zowel het creatieve ontwerp als de techniek beheerst.
              </h2>
              <p className="m-founder-lead">
                Ik ben Eugène Maaijen. Vanuit mijn studio in Ridderkerk help ik ondernemers, organisaties en merken aan een digitale uitstraling die klopt — van de eerste merkschets tot een razendsnelle website en bedrijfsvideo.
              </p>
              <p className="m-founder-text">
                Doordat ik ontwerp (Figma, Adobe CC), front-end development (Next.js, React, CMS) én videomontage (Premiere Pro, After Effects) combineer, hoef je geen drie losse partijen aan te sturen. Alles spreekt dezelfde visuele taal.
              </p>

              <div className="m-founder-links">
                <Link href="/contact" className="m-btn m-btn--primary">
                  <span>Plan een kennismaking</span>
                  <i aria-hidden="true">→</i>
                </Link>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="m-btn m-btn--outline">
                  <span>LinkedIn profiel</span>
                  <i aria-hidden="true">↗</i>
                </a>
              </div>

              {/* Partners / Opdrachtgevers Grid (Möbius Partners stijl) */}
              <div className="m-partners">
                <span className="m-partners-label">Eerder gewerkt voor o.a.</span>
                <ul className="m-partners-grid">
                  {clients.map((c, i) => (
                    <li key={i} className="m-partner-cell">
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          06. HET PROCES — 01 TOT 04 (MÖBIUS PROCESS)
          ═══════════════════════════════════════════════════════════ */}
      <section id="werkwijze" className="m-section m-process" data-theme="paper">
        <div className="h-wrap">
          <div className="m-sec-head" data-h="up">
            <span className="m-sec-label">06 / Werkwijze</span>
            <span className="m-sec-note">Helder proces in 4 stappen</span>
          </div>

          <ol className="m-process-grid">
            {DEFAULT_STEPS.map((s, i) => (
              <li key={i} className="m-process-card" data-h="up">
                <span className="m-process-num">{s.num} /</span>
                <h3 className="m-process-name">{s.name}</h3>
                <p className="m-process-desc">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          07. PAKKETTEN & INVESTERING + GRATIS PREVIEW TOOL (MÖBIUS PRICING)
          ═══════════════════════════════════════════════════════════ */}
      <section id="pakketten" className="m-section m-pricing" data-theme="paper">
        <div className="h-wrap">
          <div className="m-sec-head" data-h="up">
            <span className="m-sec-label">07 / Pakketten & Investering</span>
            <Link href="/pakketten" className="m-sec-link">
              Volledige specificaties ↗
            </Link>
          </div>

          <div className="m-pricing-intro-row" data-h="up">
            <h2 className="m-pricing-heading">Heldere pakketten, sleutelklaar opgeleverd.</h2>
            <p className="m-pricing-sub">
              Transparante vaste prijzen zonder verrassingen achteraf. Kies het traject dat past bij de groeifase van jouw onderneming.
            </p>
          </div>

          <div className="m-pricing-grid">
            {tiers.map((pkg, idx) => (
              <div
                key={pkg.id || idx}
                className={`m-price-card ${pkg.isFeatured ? 'is-featured' : ''}`}
                data-h="up"
              >
                <div className="m-price-card-top">
                  <span className="m-price-tier-idx">{['A', 'B', 'C'][idx] || pad(idx + 1)} / {pkg.name}</span>
                  {pkg.isFeatured && <span className="m-price-badge">Meest gekozen</span>}
                </div>

                <div className="m-price-amount-row">
                  <span className="m-price-amount">{pkg.priceLabel}</span>
                  {pkg.duration && <span className="m-price-duration">Doorlooptijd: {pkg.duration}</span>}
                </div>

                <p className="m-price-tagline">{pkg.tagline}</p>

                <ul className="m-price-features">
                  {(pkg.features || []).slice(0, 5).map((f, fi) => (
                    <li key={fi}>
                      <span aria-hidden="true">+</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/contact?pakket=${encodeURIComponent(pkg.name)}`}
                  className={`m-btn ${pkg.isFeatured ? 'm-btn--primary' : 'm-btn--outline'} m-price-cta`}
                >
                  <span>Start met {pkg.name}</span>
                  <i aria-hidden="true">→</i>
                </Link>
              </div>
            ))}
          </div>

          {/* Subtiele, strakke Scandinavische banner voor de Gratis Website-Preview */}
          <div className="m-preview-banner" data-h="up">
            <div className="m-preview-banner-left">
              <span className="m-sec-label">Interactieve Preview Tool · 2 minuten</span>
              <h3 className="m-preview-banner-title">
                Benieuwd hoe jouw nieuwe website eruit kan zien?
              </h3>
              <p className="m-preview-banner-desc">
                Beantwoord 7 korte vragen over je bedrijf en ontvang direct een vrijblijvende, interactieve schets van je nieuwe homepage.
              </p>
            </div>
            <div className="m-preview-banner-right">
              <Link href="/start?bron=home-banner" className="m-btn m-btn--primary">
                <span>Genereer gratis preview</span>
                <i aria-hidden="true">→</i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          08. CONVERSATIONAL CONTACT ("LET'S TALK!") + FAQ ACCORDION
          ═══════════════════════════════════════════════════════════ */}
      <section id="cta" className="m-section m-talk" data-theme="paper">
        <div className="h-wrap">
          <div className="m-sec-head" data-h="up">
            <span className="m-sec-label">08 / Contact &amp; Vragen</span>
            <span className="m-sec-note">Reactie binnen 2 werkdagen</span>
          </div>

          <div className="m-talk-grid">
            {/* Conversational Form (Möbius "Let's Talk!" stijl) */}
            <div className="m-talk-form-col" data-h="up">
              <h2 className="m-talk-heading">Laten we kennismaken.</h2>
              <p className="m-talk-sub">
                Vul de zin hieronder aan of stuur direct een e-mail naar{' '}
                <a href={`mailto:${email}`}>{email}</a>.
              </p>

              <form className="m-madlibs-form" onSubmit={handleConvSubmit} noValidate>
                <div className="m-madlibs-sentence">
                  <span>Hoi Eugène, mijn naam is</span>
                  <input
                    type="text"
                    value={convName}
                    onChange={e => setConvName(e.target.value)}
                    placeholder="jouw naam *"
                    aria-label="Jouw naam"
                    required
                  />
                  <span>van</span>
                  <input
                    type="text"
                    value={convCompany}
                    onChange={e => setConvCompany(e.target.value)}
                    placeholder="bedrijfsnaam"
                    aria-label="Bedrijfsnaam"
                  />
                  <span>. Ik neem contact op voor</span>
                  <select
                    value={convGoal}
                    onChange={e => setConvGoal(e.target.value)}
                    aria-label="Waarvoor neem je contact op?"
                  >
                    <option value="een nieuwe website">een nieuwe website</option>
                    <option value="een merkidentiteit / rebranding">een merkidentiteit</option>
                    <option value="een video- of motion-productie">een videoproductie</option>
                    <option value="een vrijblijvende kennismaking">een kennismaking</option>
                  </select>
                  <span>. Je kunt mij bereiken op</span>
                  <input
                    type="email"
                    value={convEmail}
                    onChange={e => setConvEmail(e.target.value)}
                    placeholder="jouw@email.nl *"
                    aria-label="Jouw e-mailadres"
                    required
                  />
                  <span>.</span>
                </div>

                <div className="m-madlibs-extra">
                  <input
                    type="text"
                    value={convMessage}
                    onChange={e => setConvMessage(e.target.value)}
                    placeholder="Optioneel: vertel kort iets over je wensen of planning…"
                    aria-label="Extra toelichting"
                  />
                </div>

                <div className="m-madlibs-actions">
                  <button type="submit" className="m-btn m-btn--primary" disabled={convSending}>
                    <span>{convSending ? 'Verzenden…' : 'Verstuur bericht'}</span>
                    <i aria-hidden="true">→</i>
                  </button>
                  <span className="m-madlibs-privacy">
                    Geen spam — ik reageer persoonlijk binnen 2 werkdagen.
                  </span>
                </div>

                {convStatus && (
                  <p role="status" className={`m-madlibs-status is-${convStatus.type}`}>
                    {convStatus.text}
                  </p>
                )}
              </form>
            </div>

            {/* FAQ Accordion (Möbius "Questions, answered." stijl) */}
            <div className="m-faq-col" data-h="up">
              <h3 className="m-faq-heading">Veelgestelde vragen</h3>
              <div className="m-faq-list">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className={`m-faq-item ${isOpen ? 'is-open' : ''}`}>
                      <button
                        type="button"
                        className="m-faq-question"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      >
                        <span className="m-faq-q-text">{item.q}</span>
                        <span className="m-faq-icon" aria-hidden="true">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="m-faq-answer">
                          <span className="m-faq-badge" aria-hidden="true">A</span>
                          <p>{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter tagline={h.footerTagline} location={h.footerLocation} copyright={h.footerCopyright} />
    </div>
  );
}
