'use client';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { sized, SiteOverlays, SiteNav, SiteFooter } from './studio-chrome';
import '../app/drukklaar.css';

const FILTERS = ['Alles', 'UX/UI Design', 'Brand Identity', 'Video Editing'];
const pad = n => String(n).padStart(2, '0');

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

export default function WorkOverviewClient({ projects = [], homepage }) {
  const rootRef = useRef(null);
  const stackRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('Alles');

  const shown = useMemo(
    () =>
      projects.filter(p => {
        if (filter === 'Alles') return true;
        return (p.categories || []).some(c => c.name === filter);
      }),
    [projects, filter]
  );

  /* Filter switch met zachte scroll reset indien nodig */
  const handleFilterClick = useCallback((newFilter) => {
    if (newFilter === filter) return;
    setFilter(newFilter);
    if (stackRef.current) {
      const rect = stackRef.current.getBoundingClientRect();
      if (rect.top < 100) {
        const targetY = window.scrollY + rect.top - 120;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    }
  }, [filter]);

  /* Spector scroll effect: subtiele parallax zoom en depth fade */
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const slides = Array.from(stack.querySelectorAll('.spector-slide'));
    if (slides.length === 0) return;

    let ticking = false;

    function updateScrollEffect() {
      ticking = false;
      const windowH = window.innerHeight;

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const rect = slide.getBoundingClientRect();
        const img = slide.querySelector('.spector-slide-img');
        const nextSlide = slides[i + 1];

        // Parallax zoom op actieve slide afbeelding bij scrollen
        if (img) {
          const zoom = 1.0 + Math.max(0, (1 - rect.top / windowH)) * 0.08;
          img.style.transform = `scale(${Math.min(1.18, Math.max(1.0, zoom)).toFixed(4)})`;
        }

        // Subtiel dimmen wanneer de volgende full-bleed slide omhoog schuift
        if (nextSlide) {
          const nextRect = nextSlide.getBoundingClientRect();
          const coverProgress = Math.min(1, Math.max(0, (windowH - nextRect.top) / windowH));
          const brightness = 1 - coverProgress * 0.45;
          slide.style.filter = `brightness(${brightness.toFixed(3)})`;
        } else {
          slide.style.filter = 'none';
        }
      }
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffect);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollEffect();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [shown.length, filter]);

  /* Beweging opnieuw opzetten als de lijst verandert (filter) */
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
  }, [filter, shown.length]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  return (
    <div className="h-root h-subpage" ref={rootRef} id="top">
      <SiteOverlays />
      <SiteNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="h-work-page h-dark" data-theme="dark">
        {/* Module "Al mijn projecten" + filter — exact behouden in het grid */}
        <div className="h-wrap">
          <div className="h-label" data-h="up">
            <span className="h-mono">(01) Portfolio</span>
            <span className="h-mono">{pad(projects.length)} projecten</span>
          </div>
          <div className="h-work-head h-work-head--page">
            <h1 className="h-display" data-h-lines>
              Al mijn <em>projecten</em>
            </h1>
            <div className="h-chips" role="group" aria-label="Filter op discipline" data-h="up">
              {FILTERS.map(f => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  className={`h-chip ${filter === f ? 'is-on' : ''}`}
                  onClick={() => handleFilterClick(f)}
                  data-h-magnet
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Spector Stacking Project Slides — 100% FULL BLEED, VOLWASSEN, ZONDER BORDERS */}
        <div className="spector-stack" ref={stackRef}>
          {shown.length > 0 ? (
            shown.map((proj, i) => {
              const cats = proj.categories?.length
                ? proj.categories.map(c => c.name)
                : proj.projectType
                ? [proj.projectType]
                : ['Case'];
              const name = proj.client || proj.title;
              const subtitle = resolveCaseSubtitle(proj);

              return (
                <div
                  key={proj.slug + i}
                  className="spector-slide"
                  style={{ zIndex: i + 1 }}
                  data-slide-index={i}
                >
                  {/* Volledig beeldvullende achtergrondmedia (100vw x 100vh) */}
                  <div className="spector-slide-media">
                    {proj.coverImage?.url ? (
                      <img
                        src={sized(proj.coverImage.url, 2400)}
                        alt={name}
                        loading={i < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="spector-slide-img"
                      />
                    ) : (
                      <div className="spector-slide-noimg">
                        <span>{(name || 'SM').slice(0, 2)}</span>
                      </div>
                    )}
                    <div className="spector-slide-overlay" aria-hidden="true" />
                  </div>

                  {/* Gecentreerde monumentale typografie (zoals Spector) */}
                  <div className="spector-slide-content">
                    <div className="spector-slide-tag">
                      <span className="spector-tag-cats">{cats.join(' · ')}</span>
                    </div>

                    <h2 className="spector-slide-title">{name}</h2>

                    <div className="spector-slide-divider" aria-hidden="true" />

                    {subtitle && (
                      <p className="spector-slide-desc">{subtitle}</p>
                    )}
                  </div>

                  {/* Volledig klikbaar naar de intacte detailpagina */}
                  <Link
                    href={`/work/${proj.slug}`}
                    className="spector-slide-link"
                    aria-label={`Bekijk case ${name}`}
                  />
                </div>
              );
            })
          ) : (
            <div className="spector-empty">
              <p className="h-mono">Geen projecten gevonden voor dit filter.</p>
            </div>
          )}
        </div>
      </section>

      <section className="h-cs-contact h-contact h-dark" data-theme="dark">
        <div className="h-wrap">
          <p className="h-contact-eyebrow" data-h="up">Heb je een project in gedachten?</p>
          <h2 className="h-contact-title" data-h-lines>
            Laten we <em>kennis&shy;maken.</em>
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
          </div>
        </div>
      </section>

      <SiteFooter tagline={homepage?.footerTagline} location={homepage?.footerLocation} copyright={homepage?.footerCopyright} />
    </div>
  );
}
