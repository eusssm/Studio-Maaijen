'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * HeroVisual — "Digital Stage".
 * - Rustige, architecturale achtergrond: diep grafiet, ambient horizon-glow en
 *   fijne 12-koloms haarlijnen (sluit aan op het Swiss grid van de pagina).
 * - Optioneel showreel-venster met coverbeelden van bestaande DatoCMS-cases.
 *   Wisselt alleen als het venster in beeld is en respecteert prefers-reduced-motion.
 */
export default function HeroVisual({ slides = [] }) {
  const reelRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = slides.length;

  useEffect(() => {
    const el = reelRef.current;
    if (!el || count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer = 0;
    const start = () => {
      stop();
      timer = window.setInterval(() => setActive(i => (i + 1) % count), 4200);
    };
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = 0;
    };
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      threshold: 0.15,
    });
    io.observe(el);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [count]);

  const pad = n => String(n).padStart(2, '0');
  const current = slides[active];

  return (
    <>
      <div className="h-hero-bg-stage" data-h-hero-bg aria-hidden="true">
        <div className="h-hero-horizon" />
        <div className="h-hero-hairlines" />
        <div className="h-hero-baseline" />
      </div>

      {count > 0 && (
        <div className="h-hero-reel" ref={reelRef} data-h-hero-fade aria-hidden="true">
          <div className="h-hero-reel-frame">
            {slides.map((s, i) => (
              <img
                key={s.slug || i}
                src={s.src}
                alt=""
                className={`h-hero-reel-img ${i === active ? 'is-active' : ''}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={i === 0 ? 'high' : undefined}
              />
            ))}
          </div>
          <div className="h-hero-reel-cap h-mono">
            <span className="h-hero-reel-no">
              {pad(active + 1)} / {pad(count)}
            </span>
            <span className="h-hero-reel-client">{current?.client}</span>
          </div>
          <span className="h-hero-reel-bar">
            <span key={active} className="h-hero-reel-progress" />
          </span>
        </div>
      )}
    </>
  );
}
