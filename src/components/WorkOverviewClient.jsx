'use client';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sized, CharSwap, SplitChars, SiteOverlays, SiteNav, SiteFooter } from './studio-chrome';
import '../app/drukklaar.css';
import '../app/mobius-scandi.css';

gsap.registerPlugin(ScrollTrigger);

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
  const handleFilterClick = useCallback(
    newFilter => {
      if (newFilter === filter) return;
      setFilter(newFilter);
      if (stackRef.current) {
        const rect = stackRef.current.getBoundingClientRect();
        if (rect.top < 100) {
          const targetY = window.scrollY + rect.top - 120;
          window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
        }
      }
    },
    [filter]
  );

  /* 100% GSAP ScrollTrigger Stacking Parallax, Image Scale & Content Reveal */
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const slides = Array.from(stack.querySelectorAll('.spector-slide'));
      slides.forEach((slide, i) => {
        const img = slide.querySelector('.spector-slide-img');
        const content = slide.querySelector('.spector-slide-content');
        const nextSlide = slides[i + 1];

        // Bij filter-wissel of laden: zachte GSAP entry op de eerste zichtbare slide
        if (i === 0 && content) {
          gsap.fromTo(
            content,
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'expo.out', force3D: true }
          );
        }

        // GSAP ScrollTrigger parallax zoom op het beeld van elke slide
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.0 },
            {
              scale: 1.12,
              ease: 'none',
              force3D: true,
              scrollTrigger: {
                trigger: slide,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.65,
              },
            }
          );
        }

        // GSAP ScrollTrigger depth-fade wanneer de volgende slide eroverheen schuift
        if (nextSlide) {
          gsap.fromTo(
            slide,
            { filter: 'brightness(1)' },
            {
              filter: 'brightness(0.55)',
              ease: 'none',
              scrollTrigger: {
                trigger: nextSlide,
                start: 'top bottom',
                end: 'top top',
                scrub: 0.5,
              },
            }
          );
        }
      });
    }, stack);

    return () => ctx.revert();
  }, [shown.length, filter]);

  /* Globale GSAP site-motion (nav, cursor, reveals, footer blinds) */
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

      <section className="h-work-page h-dark" data-theme="paper">
        <div className="h-wrap spector-header-wrap">
          <div className="spector-work-head">
            <h1 className="spector-work-title">
              <SplitChars text="Al mijn projecten" attr="data-m-sec-char" />
            </h1>
            <div className="spector-chips" role="group" aria-label="Filter op discipline" data-h="up">
              {FILTERS.map(f => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  className={`spector-chip ${filter === f ? 'is-on' : ''}`}
                  onClick={() => handleFilterClick(f)}
                  data-h-magnet
                >
                  <CharSwap text={f} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Spector Stacking Project Slides — 100% GSAP ScrollTrigger gestuurd */}
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
                  data-h-cursor="OPEN"
                >
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

                  <div className="spector-slide-content">
                    <div className="spector-slide-tag">
                      <span className="spector-tag-cats">{cats.join(' · ')}</span>
                    </div>

                    <h2 className="spector-slide-title">{name}</h2>

                    {subtitle && <p className="spector-slide-desc">{subtitle}</p>}
                  </div>

                  <div className="spector-slide-footer">
                    <span className="spector-slide-index h-mono">
                      {pad(i + 1)} / {pad(shown.length)}
                    </span>
                    <span className="spector-slide-action h-mono">
                      Bekijk case <i aria-hidden="true">→</i>
                    </span>
                  </div>

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

      <section className="h-cs-contact h-contact h-dark" data-theme="paper">
        <div className="h-wrap">
          <p className="h-contact-eyebrow" data-h="up">Heb je een project in gedachten?</p>
          <h2 className="h-contact-title">
            <SplitChars text="Laten we kennismaken." attr="data-m-sec-char" />
          </h2>
          <div className="h-contact-actions" data-h="up">
            <Link href="/contact" className="h-btn h-btn--spot" data-h-magnet>
              <CharSwap text="Start een project" />
              <i aria-hidden="true">→</i>
            </Link>
            <Link href="/pakketten" className="h-btn h-btn--ghost" data-h-magnet>
              <CharSwap text="Bekijk pakketten" />
              <i aria-hidden="true">→</i>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter tagline={homepage?.footerTagline} location={homepage?.footerLocation} copyright={homepage?.footerCopyright} />
    </div>
  );
}
