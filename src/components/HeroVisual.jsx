'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';

/**
 * HeroVisual — Möbius Central Rotated Case Stack met Scroll-Peel & 3D Tilt.
 * - exacte Möbius rotatiehoeken (+5deg, -10deg, -20deg, -5deg).
 * - Elke kaart heeft een buitenste scroll-peel laag (`data-m-peel-card`)
 *   die bij het omlaag scrollen één voor één omhoog uit beeld vliegt
 *   (exact zoals Möbius's `Main` -> `Out` scroll variant).
 * - Binnenste kaart (`m-stack-card`) verzorgt de entry-drop, het doorbladeren
 *   van de cases en subtiele 3D pointer-tilt parallax.
 */

const CARD_ANGLES = [
  { rotate: 5, x: 0, y: 0 },
  { rotate: -10, x: -10, y: -6 },
  { rotate: -20, x: -18, y: 8 },
  { rotate: -5, x: 14, y: 10 },
];

export default function HeroVisual({ slides = [] }) {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const stageRef = useRef(null);

  const validSlides = slides.length > 0 ? slides : [];
  const count = validSlides.length;

  const nextSlide = useCallback(() => {
    if (count < 2) return;
    setActive(prev => (prev + 1) % count);
  }, [count]);

  useEffect(() => {
    if (count < 2 || isHovered) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const timer = window.setInterval(nextSlide, 4200);
    return () => window.clearInterval(timer);
  }, [count, isHovered, nextSlide]);

  const handlePointerMove = useCallback(e => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    el.style.setProperty('--tilt-x', `${(nx * 10).toFixed(2)}px`);
    el.style.setProperty('--tilt-y', `${(ny * 10).toFixed(2)}px`);
    el.style.setProperty('--tilt-r', `${(nx * 2.2).toFixed(2)}deg`);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0px');
    el.style.setProperty('--tilt-y', '0px');
    el.style.setProperty('--tilt-r', '0deg');
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
      <div className="m-hero-stack" role="region" aria-label="Geselecteerde cases" data-m-hero-stack>
        {/* Achterliggende donkere en warme papier-kaarten die meebewegen in de scroll-peel */}
        <div className="m-stack-peel-layer" data-m-peel-card="3" style={{ zIndex: 1 }} aria-hidden="true">
          <div className="m-stack-backing m-stack-backing--black" data-m-stack-entry="4" />
        </div>
        <div className="m-stack-peel-layer" data-m-peel-card="2" style={{ zIndex: 2 }} aria-hidden="true">
          <div className="m-stack-backing m-stack-backing--warm" data-m-stack-entry="3" />
        </div>

        {validSlides.map((slide, idx) => {
          const offset = (idx - active + count) % count;
          const pose = CARD_ANGLES[offset % CARD_ANGLES.length];
          const isTop = offset === 0;
          const zIndex = count - offset + 3;

          return (
            <div
              key={slide.slug || idx}
              className="m-stack-peel-layer"
              data-m-peel-card={offset}
              style={{ zIndex }}
            >
              <div
                className={`m-stack-card ${isTop ? 'is-top' : `is-back-${offset}`}`}
                data-m-stack-entry={offset}
                data-h-cursor={isTop ? 'BEKIJK CASE' : 'VOLGENDE'}
                style={{
                  '--card-rot': `${pose.rotate}deg`,
                  '--card-x': `${pose.x}px`,
                  '--card-y': `${pose.y}px`,
                }}
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
          );
        })}
      </div>
    </div>
  );
}
