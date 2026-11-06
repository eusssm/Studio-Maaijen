'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { sized, SplitChars, SiteOverlays, SiteNav, LiveClock } from './studio-chrome';
import '../app/drukklaar.css';
import '../app/mobius-scandi.css';

/* ─────────────────────────────────────────────────────────────
   Werk — een oneindig, draagbaar canvas (naar mobius.framer.website/work).
   Cases zweven verspreid over een tegel die naadloos herhaalt.
   Scrollen, slepen en swipen verplaatst het canvas met zachte inertia.
   Alles wordt aangestuurd met GSAP (ticker + quickSetters).
   ───────────────────────────────────────────────────────────── */

/* Vaste compositie (x, y, breedte, hoogte) binnen een tegel van 2600 × 2300 */
const TILE_W = 2600;
const TILE_H = 2300;
const SLOTS = [
  [2416, 1618, 380, 507],
  [900, 1615, 500, 375],
  [1550, 1086, 500, 375],
  [1662, 1733, 380, 507],
  [2312, 791, 380, 504],
  [1610, 307, 380, 507],
  [362, 1066, 380, 507],
  [2252, 120, 500, 375],
  [362, 1894, 380, 507],
  [960, 652, 380, 507],
  [336, 399, 380, 507],
  [1090, 2216, 380, 507],
];

export default function WorkOverviewClient({ projects = [] }) {
  const rootRef = useRef(null);
  const cardRefs = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Elke slot krijgt een case; bij minder cases dan slots herhalen we ze. */
  const items = useMemo(() => {
    const list = projects.filter(p => p?.slug);
    if (!list.length) return [];
    return SLOTS.map((slot, i) => ({ slot, proj: list[i % list.length] }));
  }, [projects]);

  /* Globale site-motion (cursor, nav) */
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

  /* Canvas: scroll, drag, inertia en oneindige tegel */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !items.length) return;
    const cards = cardRefs.current.filter(Boolean);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let scale = 1;
    let tileW = TILE_W;
    let tileH = TILE_H;

    const layout = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      scale = Math.min(1, Math.max(0.55, vw / 1500));
      tileW = Math.max(TILE_W * scale, vw + 760);
      tileH = Math.max(TILE_H * scale, vh + 760);
      cards.forEach((el, i) => {
        const [, , w, h] = items[i].slot;
        gsap.set(el, { width: w * scale, height: h * scale });
      });
    };
    layout();

    const pos = { x: 0, y: 0 }; /* huidige positie */
    const target = { x: 0, y: 0 }; /* gewenste positie */

    const render = () => {
      cards.forEach((el, i) => {
        const [sx, sy] = items[i].slot;
        const bx = (sx / TILE_W) * tileW;
        const by = (sy / TILE_H) * tileH;
        const x = gsap.utils.wrap(-620, tileW - 620, bx + pos.x);
        const y = gsap.utils.wrap(-620, tileH - 620, by + pos.y);
        gsap.set(el, { x, y, force3D: true });
      });
    };

    const tick = () => {
      const k = reduce ? 1 : 1 - Math.pow(1 - 0.11, gsap.ticker.deltaRatio());
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      render();
    };
    gsap.ticker.add(tick);

    /* Wiel / trackpad */
    const onWheel = e => {
      e.preventDefault();
      target.x -= e.deltaX;
      target.y -= e.deltaY;
    };

    /* Slepen met muis of vinger + losgelaten inertia */
    let dragging = false;
    let moved = 0;
    let last = { x: 0, y: 0, t: 0 };
    let vel = { x: 0, y: 0 };
    const onDown = e => {
      if (e.button !== undefined && e.button !== 0) return;
      if (e.target.closest('.h-nav, .h-menu, .wk-bar a')) return;
      dragging = true;
      moved = 0;
      last = { x: e.clientX, y: e.clientY, t: performance.now() };
      vel = { x: 0, y: 0 };
      root.classList.add('is-dragging');
    };
    const onMove = e => {
      if (!dragging) return;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const now = performance.now();
      const dt = Math.max(1, now - last.t);
      moved += Math.abs(dx) + Math.abs(dy);
      vel = { x: (dx / dt) * 16, y: (dy / dt) * 16 };
      target.x += dx;
      target.y += dy;
      last = { x: e.clientX, y: e.clientY, t: now };
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      root.classList.remove('is-dragging');
      target.x += vel.x * 14;
      target.y += vel.y * 14;
    };
    const onClickCapture = e => {
      if (moved > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    /* Toetsenbord: pijltjes verplaatsen het canvas */
    const onKey = e => {
      const step = 160;
      if (e.key === 'ArrowLeft') target.x += step;
      else if (e.key === 'ArrowRight') target.x -= step;
      else if (e.key === 'ArrowUp') target.y += step;
      else if (e.key === 'ArrowDown') target.y -= step;
    };

    root.addEventListener('wheel', onWheel, { passive: false });
    root.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    root.addEventListener('click', onClickCapture, true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', layout);

    /* Entree: cards rijzen gespreid op, titel schuift omhoog */
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from('.wk-card-media', {
        opacity: 0,
        scale: 0.86,
        y: 40,
        duration: 1.3,
        ease: 'expo.out',
        stagger: { each: 0.06, from: 'random' },
        delay: 0.1,
      });
      gsap.from('[data-wk-char]', {
        opacity: 0,
        y: 70,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
        delay: 0.05,
      });
      gsap.from('.wk-hint, .wk-bar', { opacity: 0, duration: 0.9, delay: 0.8, ease: 'power2.out' });
    }, root);

    return () => {
      gsap.ticker.remove(tick);
      root.removeEventListener('wheel', onWheel);
      root.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      root.removeEventListener('click', onClickCapture, true);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', layout);
      ctx.revert();
    };
  }, [items]);

  return (
    <div className="h-root h-subpage wk-page" ref={rootRef} id="top">
      <SiteOverlays />
      <SiteNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <h1 className="wk-title">
        <SplitChars text="Werk" attr="data-wk-char" />
      </h1>
      <p className="wk-hint">scroll / drag</p>

      {items.map(({ slot, proj }, i) => {
        const name = proj.client || proj.title;
        const cat = proj.categories?.[0]?.name || proj.projectType || 'Case';
        return (
          <Link
            key={`${proj.slug}-${i}`}
            href={`/work/${proj.slug}`}
            className="wk-card"
            ref={el => (cardRefs.current[i] = el)}
            draggable={false}
            data-h-cursor="OPEN"
            aria-label={`Bekijk case ${name}`}
          >
            <span className="wk-card-media">
              {proj.coverImage?.url ? (
                <img
                  src={sized(proj.coverImage.url, 900)}
                  alt={name}
                  loading={i < 6 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                />
              ) : null}
            </span>
            <span className="wk-card-cap">
              {name}
              <small>{cat}</small>
            </span>
          </Link>
        );
      })}

      <div className="wk-bar no-print">
        <Link href="/contact">Start een project →</Link>
        <LiveClock />
      </div>
    </div>
  );
}
