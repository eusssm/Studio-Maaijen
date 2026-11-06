'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sized, SplitChars, SiteOverlays, SiteNav, SiteFooter, LiveClock } from './studio-chrome';
import '../app/drukklaar.css';
import '../app/mobius-scandi.css';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   Werk (naar mobius.framer.website/work)
   · Desktop (≥ 1025px): oneindig, draagbaar canvas — scroll / drag.
   · Tablet & smartphone: cases onder elkaar met on-scroll reveal.
   Alles aangestuurd met GSAP.
   ───────────────────────────────────────────────────────────── */

const DESKTOP_MQ = '(min-width: 1025px)';

/* Vaste compositie (x, y, breedte, hoogte) op een referentie-tegel van 2600 × 2300 (exact zoals mobius.framer.website/work) */
const TILE_W = 2600;
const TILE_H = 2300;
const SLOTS = [
  [-184, -682, 380, 507],
  [900, -685, 500, 375],
  [1550, 1086, 500, 375],
  [1662, -567, 380, 507],
  [-288, 791, 380, 504],
  [1610, 307, 380, 507],
  [362, 1066, 380, 507],
  [-348, 120, 500, 375],
  [362, -406, 380, 507],
  [960, 652, 380, 507],
  [275, 420, 380, 507],
  [1090, -84, 380, 507],
];

const CASE_SUBTITLE_OVERRIDES = {
  'de-kindertelefoon': 'Een platform dat luistert: redesign voor 45 jaar vertrouwen',
  enova: 'Internationaal energieplatform: van kijken naar realtime sturen',
  spotta: 'Eén schaalbaar platform voor 14,7 miljoen huishoudens, bezorgers en adverteerders',
  bluebricks: 'Nieuw digitaal platform voor een team van hands-on veranderpartners',
};

function caseDescription(proj) {
  const slug = (proj.slug || '').toLowerCase();
  const raw = (proj.introText || '').replace(/\s*\n\s*/g, ' ').trim();
  if (
    CASE_SUBTITLE_OVERRIDES[slug] &&
    (!raw || raw.toLowerCase() === 'van strategie naar werkelijkheid' || raw.toLowerCase().includes('nieuw digitale platform'))
  ) {
    return CASE_SUBTITLE_OVERRIDES[slug];
  }
  return raw || CASE_SUBTITLE_OVERRIDES[slug] || '';
}

/* ── Desktop canvas: scroll, drag, inertia en oneindige tegel ── */
function initCanvas(canvas, cards, items) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let scale = 1;
  let tileW = TILE_W;
  let tileH = TILE_H;
  let minX = -650;
  let minY = -750;

  const layout = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    scale = Math.min(1, Math.max(0.65, vw / 1680));
    tileW = Math.max(TILE_W * scale, vw + 760);
    tileH = Math.max(TILE_H * scale, vh + 760);
    minX = -650 * scale;
    minY = -750 * scale;
    cards.forEach((el, i) => {
      const [, , w, h] = items[i].slot;
      gsap.set(el, { width: Math.round(w * scale), height: Math.round(h * scale) });
    });
  };
  layout();

  const pos = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  const render = () => {
    cards.forEach((el, i) => {
      const [sx, sy] = items[i].slot;
      const x = gsap.utils.wrap(minX, minX + tileW, sx * scale + pos.x);
      const y = gsap.utils.wrap(minY, minY + tileH, sy * scale + pos.y);
      gsap.set(el, { x, y, force3D: true });
    });
  };
  render();

  const tick = () => {
    const k = reduce ? 1 : 1 - Math.pow(1 - 0.11, gsap.ticker.deltaRatio());
    pos.x += (target.x - pos.x) * k;
    pos.y += (target.y - pos.y) * k;
    render();
  };
  gsap.ticker.add(tick);

  const onWheel = e => {
    e.preventDefault();
    target.x -= e.deltaX;
    target.y -= e.deltaY;
  };

  let dragging = false;
  let moved = 0;
  let last = { x: 0, y: 0, t: 0 };
  let vel = { x: 0, y: 0 };
  const onDown = e => {
    if (e.button !== undefined && e.button !== 0) return;
    if (e.target.closest('.wk-bar a')) return;
    dragging = true;
    moved = 0;
    last = { x: e.clientX, y: e.clientY, t: performance.now() };
    vel = { x: 0, y: 0 };
    canvas.classList.add('is-dragging');
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
    canvas.classList.remove('is-dragging');
    target.x += vel.x * 14;
    target.y += vel.y * 14;
  };
  const onClickCapture = e => {
    if (moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const onKey = e => {
    const step = 160;
    if (e.key === 'ArrowLeft') target.x += step;
    else if (e.key === 'ArrowRight') target.x -= step;
    else if (e.key === 'ArrowUp') target.y += step;
    else if (e.key === 'ArrowDown') target.y -= step;
  };

  canvas.addEventListener('wheel', onWheel, { passive: false });
  canvas.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);
  canvas.addEventListener('click', onClickCapture, true);
  window.addEventListener('keydown', onKey);
  window.addEventListener('resize', layout);

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
    gsap.from('[data-wk-char]', { opacity: 0, y: 70, duration: 1.1, ease: 'expo.out', stagger: 0.06, delay: 0.05 });
    gsap.from('.wk-hint, .wk-bar', { opacity: 0, duration: 0.9, delay: 0.8, ease: 'power2.out' });
  }, canvas);

  return () => {
    gsap.ticker.remove(tick);
    canvas.removeEventListener('wheel', onWheel);
    canvas.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    canvas.removeEventListener('click', onClickCapture, true);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', layout);
    ctx.revert();
  };
}

/* ── Mobiel/tablet: on-scroll reveal per case ── */
function initList(list) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const ctx = gsap.context(() => {
    gsap.from('[data-wk-list-char]', { yPercent: 100, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.05 });

    gsap.utils.toArray('.wk-item').forEach(item => {
      const media = item.querySelector('.wk-item-media');
      const img = item.querySelector('.wk-item-media img');
      const body = item.querySelectorAll('.wk-item-title, .wk-item-desc, .wk-item-cat');

      gsap
        .timeline({ scrollTrigger: { trigger: item, start: 'top 88%', once: true } })
        .fromTo(
          media,
          { clipPath: 'inset(18% 8% 0% 8%)', y: 60 },
          { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.3, ease: 'expo.out' }
        )
        .fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: 'expo.out' }, 0)
        .fromTo(body, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08 }, 0.35);

      /* zachte parallax binnen het kader tijdens het scrollen */
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: media, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          }
        );
      }
    });
  }, list);
  return () => ctx.revert();
}

export default function WorkOverviewClient({ projects = [], homepage }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const listRef = useRef(null);
  const cardRefs = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const list = useMemo(() => projects.filter(p => p?.slug), [projects]);

  /* Canvas: elke slot een case; bij minder cases dan slots herhalen ze. */
  const items = useMemo(() => {
    if (!list.length) return [];
    return SLOTS.map((slot, i) => ({ slot, proj: list[i % list.length] }));
  }, [list]);

  /* Globale site-motion (nav, cursor, footer) */
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

  /* Schakel tussen canvas (desktop) en lijst (tablet/mobiel) */
  useEffect(() => {
    if (!items.length) return;
    const mq = window.matchMedia(DESKTOP_MQ);
    let teardown = () => {};

    const setup = () => {
      teardown();
      if (mq.matches && canvasRef.current) {
        window.scrollTo(0, 0);
        teardown = initCanvas(canvasRef.current, cardRefs.current.filter(Boolean), items);
      } else if (listRef.current) {
        teardown = initList(listRef.current);
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    };
    setup();
    mq.addEventListener('change', setup);
    return () => {
      mq.removeEventListener('change', setup);
      teardown();
    };
  }, [items]);

  return (
    <div className="h-root h-subpage wk-page" ref={rootRef} id="top">
      <SiteOverlays />
      <SiteNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* ───────── DESKTOP: CANVAS ───────── */}
      <section className="wk-canvas" ref={canvasRef} aria-label="Alle cases">
        <h1 className="wk-title">
          <SplitChars text="Werk" attr="data-wk-char" />
        </h1>
        <p className="wk-hint">scroll / drag</p>

        {items.map(({ slot, proj }, i) => {
          const [, , sw, sh] = slot;
          const name = proj.client || proj.title;
          const cat = proj.categories?.[0]?.name || proj.projectType || 'Case';
          return (
            <Link
              key={`${proj.slug}-${i}`}
              href={`/work/${proj.slug}`}
              className="wk-card"
              style={{ width: `${sw}px`, height: `${sh}px` }}
              ref={el => (cardRefs.current[i] = el)}
              draggable={false}
              data-h-cursor="OPEN"
              aria-label={`Bekijk case ${name}`}
              tabIndex={i < list.length ? 0 : -1}
            >
              <span className="wk-card-media">
                {proj.coverImage?.url ? (
                  <img
                    src={sized(proj.coverImage.url, 900)}
                    alt=""
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
      </section>

      {/* ───────── TABLET & MOBIEL: LIJST ───────── */}
      <section className="wk-list" ref={listRef}>
        <h2 className="wk-list-title">
          <SplitChars text="Werk" attr="data-wk-list-char" />
        </h2>
        <ul className="wk-items">
          {list.map(proj => {
            const name = proj.client || proj.title;
            const cats = proj.categories?.map(c => c.name).filter(Boolean) || [];
            const desc = caseDescription(proj);
            return (
              <li key={proj.slug} className="wk-item">
                <Link href={`/work/${proj.slug}`} className="wk-item-link">
                  <span className="wk-item-media">
                    {proj.coverImage?.url ? (
                      <img src={sized(proj.coverImage.url, 1100)} alt="" loading="lazy" decoding="async" />
                    ) : null}
                  </span>
                  <span className="wk-item-body">
                    <span className="wk-item-title">{name}</span>
                    {desc ? <span className="wk-item-desc">{desc}</span> : null}
                    <span className="wk-item-cat">{cats.join(' · ') || proj.projectType || 'Case'}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="wk-list-footer">
        <SiteFooter tagline={homepage?.footerTagline} location={homepage?.footerLocation} copyright={homepage?.footerCopyright} />
      </div>
    </div>
  );
}
