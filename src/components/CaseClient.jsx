'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { EMAIL, LINKEDIN, sized, CropMarks, SiteOverlays, SiteNav, SiteFooter } from './studio-chrome';
import '../app/drukklaar.css';

/* ─────────────────────────────────────────────────────────────
   Casepagina in dezelfde "Drukklaar"-taal als de homepage.
   Alle inhoud komt uit de DatoCMS page builder; elk bloktype heeft
   een vaste, rustige vorm zodat elke case er verzorgd uitziet,
   hoe de inhoud ook is opgebouwd.
   ───────────────────────────────────────────────────────────── */

const pad = n => String(n).padStart(2, '0');

const isVideoFile = media =>
  !!media && (media.mimeType?.startsWith('video/') || /\.(mp4|webm|mov|ogg)(\?|$)/i.test(media.url || ''));
const videoSrcOf = media => media?.video?.mp4Url || media?.url;

/* Vimeo/YouTube → embed-URL. background=true geeft een stille, loopende speler zonder bediening. */
function parseVideoUrl(url, background = true) {
  if (!url) return null;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-zA-Z0-9]+))?/);
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
  if (vimeo) {
    let src = `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&loop=1&muted=1&quality=auto&dnt=1`;
    if (background) src += '&background=1';
    if (vimeo[2]) src += `&h=${vimeo[2]}`;
    return src;
  }
  if (yt) {
    const id = yt[1];
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&loop=1&mute=1&playlist=${id}&controls=0&rel=0&modestbranding=1&playsinline=1`;
  }
  return null;
}

/* Tekst uit het CMS: HTML blijft HTML; platte tekst wordt opgesplitst in alinea's.
   Harde regelafbrekingen midden in een zin (geplakt uit een PDF) worden samengevoegd. */
function toParagraphs(text) {
  if (!text) return [];
  return text
    .replace(/\r/g, '')
    .split(/\n{2,}/)
    .flatMap(block => {
      const out = [];
      let cur = '';
      block.split('\n').forEach(line => {
        const l = line.trim();
        if (!l) return;
        cur = cur ? `${cur} ${l}` : l;
        if (/[.!?:;)"”’]$/.test(l)) {
          out.push(cur);
          cur = '';
        }
      });
      if (cur) out.push(cur);
      return out;
    });
}

function RichText({ text, className = '' }) {
  if (!text || typeof text !== 'string') return null;
  if (/<[a-z][\s\S]*>/i.test(text)) {
    return <div className={`h-prose ${className}`} dangerouslySetInnerHTML={{ __html: text }} />;
  }
  return (
    <div className={`h-prose ${className}`}>
      {toParagraphs(text).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function Cta({ url, label, fallback = 'Bekijk resultaat online', dark }) {
  if (!url) return null;
  let text = label || fallback;
  if (!label && /vimeo\.com/.test(url)) text = 'Bekijk op Vimeo';
  if (!label && /youtu/.test(url)) text = 'Bekijk op YouTube';
  return (
    <div className="h-case-cta-row" data-h="up">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`h-btn ${dark ? 'h-btn--spot' : 'h-btn--ink'}`}
        data-h-magnet
      >
        <span>{text}</span>
        <i aria-hidden="true">↗</i>
      </a>
    </div>
  );
}

/* Eén mediadrager voor beeld, video-bestand of embed — altijd in een kader met snijtekens. */
function Media({ image, embed, alt = '', caption, ratio, parallax = true, eager = false, width = 1800 }) {
  if (!image && !embed) return null;
  let inner = null;
  let style;
  if (embed) {
    style = { aspectRatio: ratio || '16 / 9' };
    inner = (
      <iframe
        src={embed}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading={eager ? 'eager' : 'lazy'}
        title={alt || 'Video'}
      />
    );
  } else if (isVideoFile(image)) {
    inner = (
      <video autoPlay loop muted playsInline preload="metadata" aria-label={alt || undefined}>
        <source src={videoSrcOf(image)} type={image.mimeType || 'video/mp4'} />
      </video>
    );
  } else {
    inner = (
      <img
        src={sized(image.url, width)}
        alt={image.alt || alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    );
  }

  return (
    <figure className={`h-fig ${embed ? 'h-fig--embed' : ''}`}>
      <div className="h-fig-box">
        <div className="h-fig-frame" data-h-media {...(parallax && !embed ? { 'data-h-parallax': '' } : {})} style={style}>
          <div className="h-fig-in" data-h-media-in>
            {inner}
          </div>
        </div>
        <CropMarks className="h-crop--out" />
      </div>
      {caption && <figcaption className="h-fig-cap h-mono">{caption}</figcaption>}
    </figure>
  );
}

function alignClass(a) {
  if (a === 'Midden') return 'is-center';
  if (a === 'Rechts') return 'is-right';
  return '';
}

/* Page builder vooraf plannen: thema's en nummering.
   Tekstblokken hebben hun eigen thema; mediablokken nemen het thema
   van het voorgaande blok over, zodat de pagina in rustige banen loopt. */
function planBlocks(pageBuilder = []) {
  const out = [];
  let prevTheme = 'paper';
  let sectionNo = 0;
  let figNo = 1; /* Fig. 01 is de hero */
  for (const block of pageBuilder || []) {
    const key = block._modelApiKey;
    let theme = prevTheme;
    if (key === 'block_text' || key === 'block_zebra') theme = block.darkTheme ? 'dark' : 'paper';
    if (key === 'block_image_text') theme = block.darkTheme !== false ? 'dark' : 'paper';
    prevTheme = theme;
    const hasHeading = ['block_text', 'block_zebra', 'block_image_text'].includes(key) && block.title;
    if (hasHeading) sectionNo += 1;
    const figs = [];
    let nFigs = 0;
    if (key === 'block_image' || key === 'block_video') nFigs = 1;
    if (key === 'block_double_image') nFigs = 2;
    if ((key === 'block_zebra' || key === 'block_image_text') && (block.image || block.externalVideoUrl)) nFigs = 1;
    for (let k = 0; k < nFigs; k++) {
      figNo += 1;
      figs.push(figNo);
    }
    out.push({ block, key, theme, no: hasHeading ? sectionNo : null, figs });
  }
  return out;
}

export default function CaseClient({ project, nextProject, index = 0, total = 0 }) {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Motion (gedeeld met de homepage) */
  useEffect(() => {
    let cleanup = null;
    let cancelled = false;
    const root = rootRef.current;
    /* Nieuwe case altijd bovenaan openen (Next behoudt soms de scrollpositie) */
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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

  if (!project) return null;

  const name = project.client || project.title;
  const cats = project.categories?.map(c => c.name).filter(Boolean) || [];
  const discipline = project.projectType || cats[0] || 'Case';

  /* ── Hero-media: eigen video, embed of coverbeeld ── */
  const heroEmbed = parseVideoUrl(project.headerVideoUrl, true);
  const heroImage = !heroEmbed && project.headerVideo ? project.headerVideo : project.coverImage;

  const blocks = planBlocks(project.pageBuilder);

  /* Kop van een sectie: nummer + (optioneel) ondertitel links, titel rechts */
  const renderHead = (block, no, theme) => (
    <div className="h-cs-head">
      <div className="h-cs-meta" data-h="up">
        {no != null && <span className="h-mono h-cs-no">({pad(no)})</span>}
        {block.showSubtitle !== false && block.subtitle ? (
          <span className="h-mono h-cs-sub">{block.subtitle}</span>
        ) : null}
      </div>
      {block.title ? (
        <h2 className={`h-cs-title ${theme === 'dark' ? '' : 'h-cs-title--ink'}`} data-h-lines>
          {block.title}
        </h2>
      ) : null}
    </div>
  );

  const capOf = n => `Fig. ${pad(n)} — ${name}`;

  return (
    <div className="h-root h-case-page" ref={rootRef} id="top">
      <SiteOverlays />
      <SiteNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* ───────── HERO ───────── */}
      <section className="h-chero h-dark" data-theme="dark">
        <div className="h-wrap">
          <div className="h-label" data-h="up">
            <span className="h-mono">
              Case {total ? `${pad(index + 1)} / ${pad(total)}` : ''} — {discipline}
            </span>
            <Link href="/work" className="h-mono h-chero-back">
              ← Alle cases
            </Link>
          </div>

          <div className="h-chero-top">
            <h1 className="h-chero-title" data-h-lines>
              {project.title}
            </h1>
            {total ? (
              <span className="h-chero-index" aria-hidden="true" data-h="up">
                {pad(index + 1)}
              </span>
            ) : null}
          </div>

          <div className="h-chero-grid">
            {project.introText ? (
              <p className="h-chero-intro" data-h="up">
                {project.introText.replace(/\s*\n\s*/g, ' ')}
              </p>
            ) : (
              <span />
            )}
            <dl className="h-chero-ledger" data-h="up">
              <div>
                <dt className="h-mono">Klant</dt>
                <dd>{name}</dd>
              </div>
              <div>
                <dt className="h-mono">Type project</dt>
                <dd>{discipline}</dd>
              </div>
              {cats.length > 0 && cats.join(', ') !== discipline ? (
                <div>
                  <dt className="h-mono">Disciplines</dt>
                  <dd>{cats.join(', ')}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>

        <div className="h-wrap h-wrap--wide h-chero-media">
          <Media
            image={heroImage}
            embed={heroEmbed}
            alt={project.title}
            caption={capOf(1)}
            eager
            width={2200}
            ratio="16 / 9"
          />
        </div>
      </section>

      {/* ───────── PAGE BUILDER ───────── */}
      <main className="h-cs-main">
        {blocks.map(({ block, key, theme, no, figs }, i) => {
          const next = blocks[i + 1];
          const joinNext = next && next.theme === theme;
          const cls = `h-cs h-${theme} h-cs--${key.replace('block_', '')} ${joinNext ? 'is-joined' : ''}`;
          const dark = theme === 'dark';

          switch (key) {
            case 'block_text':
              return (
                <section key={block.id} className={cls} data-theme={theme}>
                  <div className={`h-wrap h-cs-grid ${alignClass(block.textAlignment)}`}>
                    {renderHead(block, no, theme)}
                    <div className="h-cs-body">
                      <RichText text={block.content} />
                      <Cta url={block.ctaUrl} label={block.ctaLabel} dark={dark} />
                    </div>
                  </div>
                </section>
              );

            case 'block_image':
              if (!block.image) return null;
              return (
                <section key={block.id} className={cls} data-theme={theme}>
                  <div className="h-wrap h-wrap--wide">
                    <Media image={block.image} caption={capOf(figs[0])} />
                  </div>
                </section>
              );

            case 'block_video': {
              const embed = parseVideoUrl(block.externalVideoUrl, true);
              const hasFile = block.video && (block.video.video?.mp4Url || block.video.url);
              if (!embed && !hasFile) return null;
              return (
                <section key={block.id} className={cls} data-theme={theme}>
                  <div className="h-wrap h-wrap--wide">
                    {block.title ? (
                      <p className="h-mono h-cs-vtitle" data-h="up">
                        {block.title}
                      </p>
                    ) : null}
                    <Media
                      image={embed ? null : { ...block.video, mimeType: block.video?.mimeType || 'video/mp4' }}
                      embed={embed}
                      alt={block.title}
                      caption={capOf(figs[0])}
                      parallax={false}
                    />
                    <Cta url={block.ctaUrl} label={block.ctaLabel} fallback="Bekijk de video" dark={dark} />
                  </div>
                </section>
              );
            }

            case 'block_double_image':
              return (
                <section key={block.id} className={cls} data-theme={theme}>
                  <div className="h-wrap h-wrap--wide h-cs-duo">
                    <Media image={block.imageLeft} caption={capOf(figs[0])} width={1200} />
                    <Media image={block.imageRight} caption={capOf(figs[1])} width={1200} />
                  </div>
                </section>
              );

            case 'block_zebra': {
              const showImage = block.image && block.displayLayout !== 'Alleen Tekst (Verberg beeld)';
              return (
                <section key={block.id} className={cls} data-theme={theme}>
                  <div className={`h-wrap h-cs-grid ${alignClass(block.textAlignment)}`}>
                    {renderHead(block, no, theme)}
                    <div className="h-cs-body">
                      <RichText text={block.text} className="h-prose--lead" />
                      <Cta url={block.ctaUrl} label={block.ctaLabel} dark={dark} />
                    </div>
                  </div>
                  {showImage && (
                    <div className="h-wrap h-wrap--wide h-cs-after">
                      <Media image={block.image} alt={block.title} caption={capOf(figs[0])} />
                    </div>
                  )}
                </section>
              );
            }

            case 'block_image_text': {
              const embed = parseVideoUrl(block.externalVideoUrl, true);
              const showMedia = (embed || block.image) && block.displayLayout !== 'Alleen Tekst (Verberg beeld)';
              if (!showMedia) {
                return (
                  <section key={block.id} className={cls} data-theme={theme}>
                    <div className={`h-wrap h-cs-grid ${alignClass(block.textAlignment)}`}>
                      {renderHead(block, no, theme)}
                      <div className="h-cs-body">
                        <RichText text={block.text} />
                        <Cta url={block.ctaUrl} label={block.ctaLabel} dark={dark} />
                      </div>
                    </div>
                  </section>
                );
              }
              const ratio =
                {
                  '2/3 Beeld - 1/3 Tekst': 'r-2-3',
                  '1/3 Beeld - 2/3 Tekst': 'r-1-3',
                  '3/4 Beeld - 1/4 Tekst': 'r-3-4',
                  '1/4 Beeld - 3/4 Tekst': 'r-1-4',
                }[block.layoutRatio] || 'r-1-1';
              return (
                <section key={block.id} className={cls} data-theme={theme}>
                  <div className={`h-wrap h-cs-split ${ratio} ${block.imageOnRight ? 'is-flipped' : ''}`}>
                    <div className="h-cs-split-media">
                      <Media image={embed ? null : block.image} embed={embed} alt={block.title} caption={capOf(figs[0])} />
                    </div>
                    <div className={`h-cs-split-text ${alignClass(block.textAlignment)}`}>
                      {renderHead(block, no, theme)}
                      <RichText text={block.text} />
                      <Cta url={block.ctaUrl} label={block.ctaLabel} dark={dark} />
                    </div>
                  </div>
                </section>
              );
            }

            default:
              return null;
          }
        })}
      </main>

      {/* ───────── VOLGENDE CASE ───────── */}
      {nextProject && (
        <section className="h-cnext h-spot" data-theme="spot">
          <Link href={`/work/${nextProject.slug}`} className="h-cnext-link" data-h-cursor="Open">
            <div className="h-wrap h-cnext-grid">
              <div className="h-cnext-text">
                <span className="h-mono h-cnext-label" data-h="up">
                  Volgende case{total ? ` — ${pad(((index + 1) % total) + 1)} / ${pad(total)}` : ''}
                </span>
                <span className="h-cnext-title" data-h-lines>
                  {nextProject.client || nextProject.title}
                </span>
                <span className="h-mono h-cnext-type" data-h="up">
                  {nextProject.projectType} <b aria-hidden="true">→</b>
                </span>
              </div>
              <div className="h-cnext-media" data-h="up">
                <div className="h-cnext-frame">
                  {nextProject.coverImage?.url ? (
                    <img src={sized(nextProject.coverImage.url, 1100)} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <span className="h-case-noimg">{(nextProject.title || 'EM').slice(0, 2)}</span>
                  )}
                </div>
                <CropMarks className="h-crop--out" />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ───────── CONTACT ───────── */}
      <section className="h-contact h-cs-contact h-dark" data-theme="dark">
        <div className="h-wrap">
          <p className="h-contact-eyebrow" data-h="up">
            Een vergelijkbaar project in gedachten?
          </p>
          <h2 className="h-contact-title" data-h-lines>
            Laten we <em>iets moois</em> maken.
          </h2>
          <div className="h-contact-actions" data-h="up">
            <Link href="/contact" className="h-btn h-btn--spot" data-h-magnet>
              <span>Start een project</span>
              <i aria-hidden="true">→</i>
            </Link>
            <Link href="/pakketten" className="h-btn h-btn--ghost" data-h-magnet>
              <span>Bekijk pakketten</span>
              <i aria-hidden="true">→</i>
            </Link>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="h-btn h-btn--ghost" data-h-magnet>
              <span>LinkedIn</span>
              <i aria-hidden="true">↗</i>
            </a>
            <Link href="/work" className="h-btn h-btn--ghost" data-h-magnet>
              <span>Alle projecten</span>
              <i aria-hidden="true">←</i>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
