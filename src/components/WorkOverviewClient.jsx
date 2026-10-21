'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { sized, CropMarks, SiteOverlays, SiteNav, SiteFooter } from './studio-chrome';
import '../app/drukklaar.css';

const FILTERS = ['Alles', 'UX/UI Design', 'Brand Identity', 'Video Editing'];
const pad = n => String(n).padStart(2, '0');

export default function WorkOverviewClient({ projects = [], homepage }) {
  const rootRef = useRef(null);
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
                  onClick={() => setFilter(f)}
                  data-h-magnet
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <ol className="h-cases" data-h-cases>
            {shown.length > 0 ? (
              shown.map((proj, i) => {
                const cats = proj.categories?.length
                  ? proj.categories.map(c => c.name)
                  : proj.projectType
                  ? [proj.projectType]
                  : ['Case'];
                const name = proj.client || proj.title;
                return (
                  <li key={proj.slug + i} className="h-case-item" data-h="up">
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
                <span className="h-mono">Geen projecten gevonden voor dit filter.</span>
              </li>
            )}
          </ol>

          <div className="h-peek" data-h-peek aria-hidden="true">
            <div className="h-peek-frame">
              {shown.map((proj, i) => (
                <div className="h-peek-img" data-h-peek-img={i} key={proj.slug + i}>
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
