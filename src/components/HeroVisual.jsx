'use client';
import { useEffect, useRef } from 'react';

/*
 * HeroVisual — het portret als drukproef.
 * - Kader met snijtekens (crop marks) en bijschrift "Fig. 01".
 * - Een rasterpunt-laag ("halftone") die bij laden wegvalt: de foto "ontwikkelt" zich.
 *   De animatie wordt aangestuurd vanuit home-animations.js via [data-h-dots].
 * - Subtiele muis-parallax (alleen bij fijne pointer en zonder reduced-motion).
 */
export default function HeroVisual({ portraitUrl = '/images/eugene-portrait.jpg' }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const hero = el.closest('.h-hero');
    let raf = 0;
    const m = { x: 0, y: 0, tx: 0, ty: 0 };

    const onMove = e => {
      const r = hero.getBoundingClientRect();
      m.tx = (e.clientX - r.left) / r.width - 0.5;
      m.ty = (e.clientY - r.top) / r.height - 0.5;
    };

    const tick = () => {
      m.x += (m.tx - m.x) * 0.07;
      m.y += (m.ty - m.y) * 0.07;
      el.style.setProperty('--px', `${(m.x * -22).toFixed(2)}px`);
      el.style.setProperty('--py', `${(m.y * -16).toFixed(2)}px`);
      el.style.setProperty('--lx', `${(50 + m.x * 36).toFixed(1)}%`);
      el.style.setProperty('--ly', `${(38 + m.y * 36).toFixed(1)}%`);
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div className="h-portrait" ref={wrapRef} data-h-portrait>
      <div className="h-portrait-frame">
        <div className="h-portrait-media" data-h-portrait-media>
          <img src={portraitUrl} alt="Portret van Eugène Maaijen" decoding="async" fetchPriority="high" />
          <span className="h-portrait-light" aria-hidden="true" />
          <span className="h-portrait-dots" data-h-dots aria-hidden="true" />
        </div>
        <span className="h-crop h-crop--out" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
      </div>
      <span className="h-portrait-cap h-mono" aria-hidden="true">
        Fig. 01 — Eugène Maaijen
      </span>
    </div>
  );
}
