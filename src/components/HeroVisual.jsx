'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

/**
 * HeroVisual — Möbius Central Rotated Case Stack.
 * - Centraal op het heldere canvas geplaatst en overlapt subtiel de bovenrand
 *   van het monumentale woordmerk onderaan.
 * - Gebruikt de echte DatoCMS cases van Studio Maaijen.
 * - Klikken op de kaart bladert naar de volgende case of opent direct de case.
 */

const CARD_ANGLES = [
  { rotate: -4.5, x: 0, y: 0 },
  { rotate: 6.5, x: 14, y: -10 },
  { rotate: -13.5, x: -16, y: 8 },
  { rotate: 11.5, x: 18, y: 12 },
];

export default function HeroVisual({ slides = [] }) {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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

  if (count === 0) return null;

  const current = validSlides[active];

  return (
    <div
      className="m-hero-stack-stage"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="m-hero-stack" role="region" aria-label="Geselecteerde cases" data-h-hero-fade>
        {/* Achterliggende donkere/getinte papier-kaart voor het exacte Möbius diepte-effect */}
        <div className="m-stack-backing m-stack-backing--black" aria-hidden="true" />
        <div className="m-stack-backing m-stack-backing--warm" aria-hidden="true" />

        {validSlides.map((slide, idx) => {
          // Bereken relatieve positie in de stapel (0 = bovenop, 1 = daarachter, etc.)
          const offset = (idx - active + count) % count;
          const pose = CARD_ANGLES[offset % CARD_ANGLES.length];
          const isTop = offset === 0;
          const zIndex = count - offset + 2;

          return (
            <div
              key={slide.slug || idx}
              className={`m-stack-card ${isTop ? 'is-top' : `is-back-${offset}`}`}
              style={{
                zIndex,
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
          );
        })}
      </div>
    </div>
  );
}
