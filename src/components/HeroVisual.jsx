'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

/**
 * HeroVisual — Möbius Central Rotated Case Stack (100% GSAP Driven).
 * - Royaal formaat (zoals Möbius: 540×540 / clamp(340px, 34vw, 540px)).
 * - Geen strijd tussen CSS transitions en GSAP: alle posities, rotaties,
 *   pointer-tilt én de kaartwissel worden boterzacht door GSAP (`quickTo` +
 *   `expo.out`) aangestuurd op 60–120fps.
 * - De buitenste laag (`data-m-peel-card`) wordt door GSAP ScrollTrigger
 *   in `home-animations.js` zijdezacht omhoog gescrubd tijdens het scrollen.
 */

const CARD_ANGLES = [
  { rotate: 5, x: 0, y: 0, scale: 1 },
  { rotate: -10, x: -12, y: -8, scale: 0.985 },
  { rotate: -20, x: -22, y: 10, scale: 0.965 },
  { rotate: -5, x: 16, y: 12, scale: 0.95 },
];

export default function HeroVisual({ slides = [] }) {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const stageRef = useRef(null);
  const stackRef = useRef(null);
  const cardRefs = useRef([]);
  const backBlackRef = useRef(null);
  const backWarmRef = useRef(null);
  const quickTiltRef = useRef(null);
  const prevActiveRef = useRef(0);

  const validSlides = slides.length > 0 ? slides : [];
  const count = validSlides.length;

  const nextSlide = useCallback(() => {
    if (count < 2) return;
    setActive(prev => (prev + 1) % count);
  }, [count]);

  /* Auto-advance alleen wanneer de muis niet op de stapel rust */
  useEffect(() => {
    if (count < 2 || isHovered) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const timer = window.setInterval(nextSlide, 4600);
    return () => window.clearInterval(timer);
  }, [count, isHovered, nextSlide]);

  /* 1. GSAP quickTo voor boterzachte 3D pointer-tilt zonder React re-renders of CSS-lag */
  useEffect(() => {
    const stackEl = stackRef.current;
    if (!stackEl) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.set(stackEl, { transformPerspective: 1200, force3D: true });

    quickTiltRef.current = {
      x: gsap.quickTo(stackEl, 'x', { duration: 0.65, ease: 'power3.out' }),
      y: gsap.quickTo(stackEl, 'y', { duration: 0.65, ease: 'power3.out' }),
      rotateY: gsap.quickTo(stackEl, 'rotationY', { duration: 0.75, ease: 'power3.out' }),
      rotateX: gsap.quickTo(stackEl, 'rotationX', { duration: 0.75, ease: 'power3.out' }),
      rotateZ: gsap.quickTo(stackEl, 'rotationZ', { duration: 0.75, ease: 'power3.out' }),
    };
  }, []);

  /* 2. GSAP choreografie wanneer `active` of `isHovered` verandert */
  useEffect(() => {
    if (count === 0) return;
    const prevActive = prevActiveRef.current;
    const switched = prevActive !== active;
    prevActiveRef.current = active;

    cardRefs.current.forEach((cardEl, idx) => {
      if (!cardEl) return;
      const offset = (idx - active + count) % count;
      const pose = CARD_ANGLES[offset % CARD_ANGLES.length];
      const isTop = offset === 0;

      // Hover fan-out offsets (subtiel en organisch via GSAP)
      const hoverX = isHovered ? (isTop ? 0 : pose.x * 1.45) : pose.x;
      const hoverY = isHovered ? (isTop ? -10 : pose.y * 1.35) : pose.y;
      const hoverRot = isHovered
        ? isTop
          ? 2.2
          : pose.rotate + (pose.rotate < 0 ? -2.8 : 2.8)
        : pose.rotate;
      const hoverScale = isHovered ? (isTop ? 1.028 : pose.scale) : pose.scale;

      // Als deze kaart net van bovenop (prevActive) naar achteren gaat:
      // maak een vloeiende kaart-shuffle boog zodat het voelt als echte fysieke kaarten
      if (switched && idx === prevActive && count > 1) {
        const tl = gsap.timeline({ overwrite: 'auto' });
        tl.to(cardEl, {
          x: -95,
          y: -48,
          rotation: -18,
          scale: 1.04,
          duration: 0.34,
          ease: 'power2.out',
          force3D: true,
        }).to(cardEl, {
          x: hoverX,
          y: hoverY,
          rotation: hoverRot,
          scale: hoverScale,
          duration: 0.78,
          ease: 'expo.out',
          force3D: true,
        });
      } else {
        gsap.to(cardEl, {
          x: hoverX,
          y: hoverY,
          rotation: hoverRot,
          scale: hoverScale,
          duration: switched ? 0.92 : 0.72,
          ease: 'expo.out',
          overwrite: 'auto',
          force3D: true,
        });
      }
    });

    // Achterliggende zwarte & warme kaarten waaieren mee via GSAP
    if (backBlackRef.current) {
      gsap.to(backBlackRef.current, {
        x: isHovered ? -28 : -16,
        y: isHovered ? -14 : -8,
        rotation: isHovered ? -19.5 : -15,
        scale: isHovered ? 0.965 : 0.95,
        duration: 0.8,
        ease: 'expo.out',
        overwrite: 'auto',
        force3D: true,
      });
    }
    if (backWarmRef.current) {
      gsap.to(backWarmRef.current, {
        x: isHovered ? 26 : 14,
        y: isHovered ? -16 : -10,
        rotation: isHovered ? 13.5 : 9.5,
        scale: isHovered ? 0.985 : 0.97,
        duration: 0.8,
        ease: 'expo.out',
        overwrite: 'auto',
        force3D: true,
      });
    }
  }, [active, isHovered, count]);

  const handlePointerMove = useCallback(e => {
    const el = stageRef.current;
    const qt = quickTiltRef.current;
    if (!el || !qt) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    qt.x(nx * 14);
    qt.y(ny * 12);
    qt.rotateY(nx * 5.5);
    qt.rotateX(-ny * 4.5);
    qt.rotateZ(nx * 1.6);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    const qt = quickTiltRef.current;
    if (!qt) return;
    qt.x(0);
    qt.y(0);
    qt.rotateY(0);
    qt.rotateX(0);
    qt.rotateZ(0);
  }, []);

  if (count === 0) return null;

  return (
    <div
      ref={stageRef}
      className="m-hero-stack-stage"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <div
        ref={stackRef}
        className="m-hero-stack"
        role="region"
        aria-label="Geselecteerde cases"
        data-m-hero-stack
      >
        {/* Achterliggende donkere en warme papier-kaarten die meebewegen in de scroll-peel */}
        <div className="m-stack-peel-layer" data-m-peel-card="3" style={{ zIndex: 1 }} aria-hidden="true">
          <div className="m-stack-entry-wrap" data-m-stack-entry="4">
            <div ref={backBlackRef} className="m-stack-backing m-stack-backing--black" />
          </div>
        </div>
        <div className="m-stack-peel-layer" data-m-peel-card="2" style={{ zIndex: 2 }} aria-hidden="true">
          <div className="m-stack-entry-wrap" data-m-stack-entry="3">
            <div ref={backWarmRef} className="m-stack-backing m-stack-backing--warm" />
          </div>
        </div>

        {validSlides.map((slide, idx) => {
          const offset = (idx - active + count) % count;
          const isTop = offset === 0;
          const zIndex = count - offset + 3;

          return (
            <div
              key={slide.slug || idx}
              className="m-stack-peel-layer"
              data-m-peel-card={offset}
              style={{ zIndex }}
            >
              <div className="m-stack-entry-wrap" data-m-stack-entry={offset}>
                <div
                  ref={el => {
                    cardRefs.current[idx] = el;
                  }}
                  className={`m-stack-card ${isTop ? 'is-top' : `is-back-${offset}`}`}
                  data-h-cursor={isTop ? 'BEKIJK CASE' : 'VOLGENDE'}
                  onClick={() => {
                    if (!isTop) setActive(idx);
                  }}
                >
                  <img
                    src={slide.src}
                    alt={slide.client || 'Case preview'}
                    className="m-stack-img"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={idx === 0 ? 'high' : undefined}
                  />

                  {isTop && (
                    <div className="m-stack-caption">
                      <Link href={`/work/${slide.slug}`} className="m-stack-caption-link">
                        <span className="m-stack-client">{slide.client}</span>
                        <span className="m-stack-cta">Bekijk case ↗</span>
                      </Link>
                      {count > 1 && (
                        <button
                          type="button"
                          className="m-stack-next-btn"
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            nextSlide();
                          }}
                          aria-label="Volgende case in stapel"
                          title="Volgende case"
                        >
                          {String(active + 1).padStart(2, '0')}/{String(count).padStart(2, '0')} ↻
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
