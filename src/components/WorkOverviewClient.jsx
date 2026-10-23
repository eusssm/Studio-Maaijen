'use client';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { sized, CropMarks, SiteOverlays, SiteNav, SiteFooter } from './studio-chrome';
import '../app/drukklaar.css';

const FILTERS = ['Alles', 'UX/UI Design', 'Brand Identity', 'Video Editing'];
const pad = n => String(n).padStart(2, '0');

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
        const targetY = window.scrollY + rect.top - 140;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    }
  }, [filter]);

  /* Spector-style stacking card scroll depth (scale & dim op overdekte kaarten) */
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const cards = Array.from(stack.querySelectorAll('.spector-card-wrap'));
    if (cards.length === 0) return;

    let ticking = false;

    function updateCardTransforms() {
      ticking = false;
      const stickyTop = 68 + 24; // navbar hoogte + sticky offset
      const windowH = window.innerHeight;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const nextCard = cards[i + 1];

        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          // Bereken hoever de volgende kaart is in zijn opmars naar stickyTop
          const start = windowH;
          const end = stickyTop;
          const progress = Math.min(1, Math.max(0, (start - nextRect.top) / (start - end)));

          // Schaal kaart subtiel van 1 naar 0.94 en dim van 1 naar 0.55
          const scale = 1 - progress * 0.06;
          const brightness = 1 - progress * 0.45;
          const translateY = progress * -14;

          card.style.transform = `scale(${scale.toFixed(4)}) translateY(${translateY.toFixed(2)}px)`;
          card.style.filter = `brightness(${brightness.toFixed(3)})`;
        } else {
          card.style.transform = 'none';
          card.style.filter = 'none';
        }
      }
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateCardTransforms);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateCardTransforms();

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

          {/* Spector Stacking Project Cards */}
          <div className="spector-stack" ref={stackRef}>
            {shown.length > 0 ? (
              shown.map((proj, i) => {
                const cats = proj.categories?.length
                  ? proj.categories.map(c => c.name)
                  : proj.projectType
                  ? [proj.projectType]
                  : ['Case'];
                const name = proj.client || proj.title;
                return (
                  <div
                    key={proj.slug + i}
                    className="spector-card-wrap"
                    style={{ zIndex: i + 1 }}
                    data-card-index={i}
                  >
                    <article className="spector-card">
                      {/* Achtergrondmedia met subtiele zoom */}
                      <div className="spector-card-media">
                        {proj.coverImage?.url ? (
                          <img
                            src={sized(proj.coverImage.url, 1800)}
                            alt={name}
                            loading={i < 2 ? 'eager' : 'lazy'}
                            decoding="async"
                            className="spector-card-img"
                          />
                        ) : (
                          <div className="spector-card-noimg">
                            <span>{(name || 'SM').slice(0, 2)}</span>
                          </div>
                        )}
                        <div className="spector-card-overlay" aria-hidden="true" />
                      </div>

                      {/* Karakteristieke Studio Maaijen snijtekens */}
                      <CropMarks />

                      {/* Gecentreerde redactionele content */}
                      <div className="spector-card-content">
                        <div className="spector-card-badge">
                          <span className="spector-card-no">{pad(i + 1)}</span>
                          <span className="spector-card-dot" aria-hidden="true">✦</span>
                          <span className="spector-card-cats">{cats.join(' / ')}</span>
                        </div>

                        <h2 className="spector-card-title">{name}</h2>

                        <div className="spector-card-hairline" aria-hidden="true" />

                        {proj.introText && (
                          <p className="spector-card-desc">{proj.introText}</p>
                        )}

                        <div className="spector-card-cta">
                          <span className="spector-card-btn">
                            <span>Bekijk case</span>
                            <i aria-hidden="true">↗</i>
                          </span>
                        </div>
                      </div>

                      {/* Volledige kaart hitbox die direct naar de intacte detailpagina linkt */}
                      <Link
                        href={`/work/${proj.slug}`}
                        className="spector-card-hitbox"
                        aria-label={`Bekijk case ${name}`}
                      />
                    </article>
                  </div>
                );
              })
            ) : (
              <div className="spector-empty">
                <p className="h-mono">Geen projecten gevonden voor dit filter.</p>
              </div>
            )}
          </div>
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
