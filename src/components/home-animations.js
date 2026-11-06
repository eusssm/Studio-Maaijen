import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/*
 * Motion voor de homepage én subpagina's — Möbius × Scandinavisch.
 * Eén GSAP-context, één opruimfunctie.
 *
 * Bevat alle 8 kenmerkende Möbius-motions:
 *  1. Hero Central Card Stack Entry Deal + Scroll-Peel (`Main` -> `Out` bij scrollen)
 *  2. Monumentale Hero & Sectie Per-Character Staggered Reveals
 *  3. Manifesto `Scramble` 2D Word Scatter-to-Lock + Masked Supporting Copy
 *  4. Kinetische Showreel Expansion + Dual Opposite Tickers (`Ideas in Motion`)
 *  5. Services Sticky Slash-Bar + Staggered Pill Deliverables
 *  6. Studio in Numbers Vertical Slot-Machine Digit Rollers (`0..9` strips) + Thumbnail Fan
 *  7. Founder Multi-Plane Scroll Parallax + Process 01–12 Timeline Progress Scrub
 *  8. Footer Venetian Blinds + Monumental Wordmark Per-Character Rise + Pill Cursor
 */
export function initHomeMotion(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isMobile = window.matchMedia('(max-width: 760px)').matches;
  const q = (sel, ctx = root) => Array.from(ctx.querySelectorAll(sel));
  const one = (sel, ctx = root) => ctx.querySelector(sel);

  const loader = one('.h-loader');

  if (reduce) {
    loader?.classList.add('is-done');
    root.classList.add('is-ready');
    return () => {};
  }

  const cleanups = [];
  const ctx = gsap.context(() => {
    /* ───────── 0. BEGINSTANDEN ───────── */
    const heroLines = q('[data-h-line] > span');
    const heroFade = q('[data-h-hero-fade]');
    const heroChars = q('[data-m-hero-char]');
    const stackEntries = q('[data-m-stack-entry]');
    const heroBg = one('[data-h-hero-bg]');
    const emblem = one('[data-h-emblem]');
    const portrait = one('[data-h-portrait]');
    const portraitMedia = one('[data-h-portrait-media]');
    const dots = one('[data-h-dots]');

    if (heroLines.length) gsap.set(heroLines, { yPercent: 112 });
    if (heroFade.length) gsap.set(heroFade, { opacity: 0, y: 20 });
    if (heroChars.length) gsap.set(heroChars, { yPercent: 108, force3D: true });
    if (stackEntries.length) {
      gsap.set(stackEntries, {
        y: 165,
        opacity: 0,
        scale: 0.88,
        rotation: 6,
        force3D: true,
      });
    }
    if (emblem) gsap.set(emblem, { scale: 0, rotate: -180, opacity: 0 });
    if (heroBg) gsap.set(heroBg, { scale: 1.08, opacity: 0 });
    if (portrait) gsap.set(portrait, { opacity: 0 });
    if (portraitMedia) gsap.set(portraitMedia, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.14 });
    if (dots) dots.style.setProperty('--r', '7');

    /* ───────── 1. LOADER + MÖBIUS HERO INTRO CHOREOGRAFIE ───────── */
    const countEl = one('[data-h-count]');
    const barEl = one('[data-h-bar]');
    const seen = (() => {
      try {
        return sessionStorage.getItem('h-seen') === '1';
      } catch (e) {
        return false;
      }
    })();
    const loadDur = seen ? 0.55 : 1.2;
    const counter = { v: 0 };

    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
    const heroIn = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      if (heroBg) tl.to(heroBg, { opacity: 1, scale: 1, duration: 1.8, ease: 'expo.out' }, 0);
      if (heroLines.length) tl.to(heroLines, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.08);

      // Monumentale "Studio Maaijen®" per-karakter opkomst (Möbius wordmark reveal)
      if (heroChars.length) {
        tl.to(
          heroChars,
          {
            yPercent: 0,
            duration: 1.35,
            ease: 'expo.out',
            stagger: 0.024,
            force3D: true,
          },
          0.04
        );
      }

      // Centrale gedraaide case-stapel valt kaart-voor-kaart boterzacht op zijn plek
      if (stackEntries.length) {
        tl.to(
          stackEntries,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.55,
            ease: 'expo.out',
            stagger: 0.085,
            force3D: true,
          },
          0.1
        );
      }

      if (emblem) tl.to(emblem, { scale: 1, rotate: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.8)' }, 0.35);
      if (portrait) tl.to(portrait, { opacity: 1, duration: 0.01 }, 0.1);
      if (portraitMedia) tl.to(portraitMedia, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.5, ease: 'expo.out' }, 0.1);
      if (dots) {
        const o = { r: 7 };
        tl.to(
          o,
          {
            r: 0,
            duration: 2.6,
            ease: 'power2.inOut',
            onUpdate: () => dots.style.setProperty('--r', o.r.toFixed(2)),
            onComplete: () => {
              dots.style.display = 'none';
            },
          },
          0.5
        );
      }
      if (heroFade.length) {
        tl.to(
          heroFade,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.07,
            clearProps: 'transform',
          },
          0.22
        );
      }
      return tl;
    };

    if (!loader) {
      heroIn();
      root.classList.add('is-ready');
    } else {
      intro
        .to(counter, {
          v: 100,
          duration: loadDur,
          ease: 'power2.inOut',
          onUpdate: () => {
            const n = Math.round(counter.v);
            if (countEl) countEl.textContent = String(n).padStart(3, '0');
            if (barEl) barEl.style.transform = `scaleX(${counter.v / 100})`;
          },
        })
        .add(() => {
          try {
            sessionStorage.setItem('h-seen', '1');
          } catch (e) {}
        })
        .to(loader, { yPercent: -101, duration: 0.95, ease: 'expo.inOut' }, '+=0.1')
        .add(heroIn, '-=0.55')
        .add(() => {
          loader?.classList.add('is-done');
          root.classList.add('is-ready');
        }, '-=0.2');
    }

    /* ───────── 2. NAV: thema per sectie, GSAP slide-in/out bij scrollen ───────── */
    const nav = one('[data-h-nav]');
    const isHome = root.classList.contains('h-home');
    if (nav) {
      if (isHome) {
        gsap.set(nav, { y: -14, autoAlpha: 0 });
      }
      let navState = isHome ? 'top' : 'shown';

      q('[data-theme]').forEach(sec => {
        const theme = sec.getAttribute('data-theme');
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 44px',
          end: 'bottom 44px',
          onToggle: self => self.isActive && nav.setAttribute('data-theme', theme),
        });
      });

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: self => {
          const y = self.scroll();
          const menuOpen = document.body.classList.contains('menu-open');
          nav.classList.toggle('is-scrolled', y > 40);

          let nextState = 'shown';
          if (isHome && y <= 40 && !menuOpen) {
            nextState = 'top';
          } else if (!menuOpen && y >= 240 && self.direction === 1) {
            nextState = 'hidden';
          }

          if (nextState !== navState) {
            navState = nextState;
            if (nextState === 'top') {
              gsap.to(nav, { y: -14, autoAlpha: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
            } else if (nextState === 'hidden') {
              gsap.to(nav, { yPercent: -102, autoAlpha: 1, duration: 0.5, ease: 'expo.out', overwrite: 'auto' });
            } else {
              gsap.to(nav, { y: 0, yPercent: 0, autoAlpha: 1, duration: 0.55, ease: 'expo.out', overwrite: 'auto' });
            }
          }
        },
      });
    }

    /* ───────── 3. VOORTGANGSBALK ───────── */
    const prog = one('[data-h-progress]');
    if (prog) {
      gsap.set(prog, { scaleX: 0, transformOrigin: 'left center' });
      gsap.to(prog, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.2 },
      });
    }

    /* ───────── 4. MÖBIUS HERO SCROLL-PEEL (`Main` -> `Out` met zijdezachte GSAP inertia) ───────── */
    const mHero = one('[data-m-hero]');
    if (mHero && !isMobile) {
      const peelLayers = q('[data-m-peel-card]', mHero);
      peelLayers.forEach(layer => {
        const order = parseInt(layer.getAttribute('data-m-peel-card') || '0', 10);
        const startOffset = order * 42;
        const rotDelta = order % 2 === 0 ? -7 : 7;

        gsap.fromTo(
          layer,
          { y: 0, rotation: 0 },
          {
            y: () => -window.innerHeight * 1.05,
            rotation: rotDelta,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: mHero,
              start: `top+=${startOffset} top`,
              end: `bottom+=${startOffset + 160} top`,
              scrub: 0.85 + order * 0.16,
            },
          }
        );
      });

      const wordmarkWrap = one('[data-h-hero-headline]', mHero);
      if (wordmarkWrap) {
        gsap.to(wordmarkWrap, {
          yPercent: -18,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: mHero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.75,
          },
        });
      }
    }

    /* Legacy hero fallback voor eventuele andere pagina's */
    const legacyHero = one('.h-hero');
    if (legacyHero) {
      const heroBgEl = one('[data-h-hero-bg]', legacyHero);
      const headlineEl = one('[data-h-hero-headline]', legacyHero) || one('.h-hero-name', legacyHero);
      if (heroBgEl) {
        gsap.to(heroBgEl, {
          yPercent: 18,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: { trigger: legacyHero, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
      if (headlineEl) {
        gsap.to(headlineEl, {
          yPercent: -28,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: legacyHero, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    }

    /* ───────── 5. SECTIE-KOPPEN: PER-CHARACTER SCROLL REVEAL ───────── */
    q('.m-split-chars').forEach(group => {
      const chars = q('[data-m-sec-char]', group);
      if (!chars.length) return;
      gsap.set(chars, { yPercent: 105 });
      ScrollTrigger.create({
        trigger: group,
        start: 'top 90%',
        once: true,
        onEnter: () =>
          gsap.to(chars, {
            yPercent: 0,
            duration: 0.95,
            ease: 'expo.out',
            stagger: 0.02,
          }),
      });
    });

    /* ───────── 6. REVEAL: FADE-UP VOOR BLOKKEN & KAARTEN ───────── */
    const ups = q('[data-h="up"]');
    if (ups.length) gsap.set(ups, { opacity: 0, y: 38 });
    ScrollTrigger.batch(ups, {
      start: 'top 92%',
      once: true,
      onEnter: els =>
        gsap.to(els, { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out', stagger: 0.08, overwrite: true }),
    });

    /* ───────── 7. MÖBIUS MANIFESTO `SCRAMBLE` 2D WORD SCATTER-TO-LOCK ───────── */
    const statement = one('[data-h-statement]');
    if (statement) {
      const scrambleWords = q('.m-scramble-word', statement);
      if (scrambleWords.length) {
        const scaleFactor = isMobile ? 0.2 : 0.48;
        gsap.set(scrambleWords, {
          x: (i, el) => parseFloat(el.getAttribute('data-scatter-x') || '0') * scaleFactor,
          y: (i, el) => parseFloat(el.getAttribute('data-scatter-y') || '0') * scaleFactor,
          rotation: (i, el) => parseFloat(el.getAttribute('data-scatter-r') || '0') * (isMobile ? 0.3 : 0.6),
          opacity: 0.22,
        });

        gsap.to(scrambleWords, {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          ease: 'power3.out',
          stagger: {
            each: 0.012,
            from: 'random',
          },
          scrollTrigger: {
            trigger: statement,
            start: 'top 88%',
            end: 'top 48%',
            scrub: 0.35,
          },
        });
      } else {
        const words = q('.h-word', statement);
        gsap.set(words, { opacity: 0.16 });
        gsap.to(words, {
          opacity: 1,
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: { trigger: statement, start: 'top 85%', end: 'top 48%', scrub: 0.35 },
        });
      }
    }

    /* Gemaskeerde supporting copy (woord-voor-woord slide-up) */
    q('[data-m-word-group]').forEach(group => {
      const words = q('[data-m-word-reveal]', group);
      if (!words.length) return;
      gsap.set(words, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: group,
        start: 'top 90%',
        once: true,
        onEnter: () =>
          gsap.to(words, {
            yPercent: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.012,
          }),
      });
    });

    /* ───────── 8. MÖBIUS KINETIC REEL & DUAL OPPOSITE TICKERS ───────── */
    const reelSec = one('[data-m-reel-sec]');
    if (reelSec) {
      const leftTicker = one('[data-m-ticker="left"]', reelSec);
      const rightTicker = one('[data-m-ticker="right"]', reelSec);
      const reelFrame = one('[data-m-reel-frame]', reelSec);

      if (leftTicker) {
        gsap.fromTo(
          leftTicker,
          { xPercent: 0 },
          {
            xPercent: -22,
            ease: 'none',
            scrollTrigger: {
              trigger: reelSec,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      }

      if (rightTicker) {
        gsap.fromTo(
          rightTicker,
          { xPercent: -22 },
          {
            xPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: reelSec,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      }

      if (reelFrame) {
        gsap.fromTo(
          reelFrame,
          { scale: 0.86, y: 40 },
          {
            scale: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: reelFrame,
              start: 'top 92%',
              end: 'center 55%',
              scrub: 0.6,
            },
          }
        );
      }
    }

    /* ───────── 9. SERVICES: RIJ-REVEAL & STAGGERED PILL TAGS ───────── */
    q('[data-m-service-row]').forEach(row => {
      const pills = q('[data-m-tag]', row);
      gsap.set(row, { opacity: 0, y: 36 });
      if (pills.length) gsap.set(pills, { opacity: 0, y: 18, scale: 0.96 });

      ScrollTrigger.create({
        trigger: row,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(row, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
          if (pills.length) {
            gsap.to(pills, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: 'back.out(1.4)',
              stagger: 0.06,
              delay: 0.15,
            });
          }
        },
      });
    });

    /* ───────── 10. STUDIO IN NUMBERS: VERTICAL SLOT-MACHINE DIGIT ROLLERS ───────── */
    q('[data-m-number-card]').forEach((card, cardIdx) => {
      const strips = q('[data-m-slot-digit]', card);
      const thumbs = q('[data-m-thumb]', card);

      gsap.set(card, { opacity: 0, y: 42 });
      strips.forEach(strip => gsap.set(strip, { yPercent: 0 }));
      if (thumbs.length) {
        gsap.set(thumbs, { opacity: 0, x: 18, rotate: 8, scale: 0.85 });
      }

      ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: 'power3.out',
            delay: cardIdx * 0.08,
          });

          // Laat elke cijferstrip verticaal naar zijn eindcijfer rollen (0..9 -> -digit * 10%)
          strips.forEach((strip, sIdx) => {
            const targetDigit = parseInt(strip.getAttribute('data-m-slot-digit') || '0', 10);
            const extraDelay = parseFloat(strip.getAttribute('data-m-slot-delay') || '0');
            // Voor een echt slot-machine gevoel bij het cijfer 0 (zoals de '0' in 20, 50, 30),
            // rolt hij eerst vanaf 9 terug naar 0!
            if (targetDigit === 0 && sIdx > 0) {
              gsap.fromTo(
                strip,
                { yPercent: -90 },
                {
                  yPercent: 0,
                  duration: 1.55,
                  ease: 'expo.inOut',
                  delay: 0.12 + cardIdx * 0.1 + extraDelay,
                }
              );
            } else {
              gsap.fromTo(
                strip,
                { yPercent: 0 },
                {
                  yPercent: -targetDigit * 10,
                  duration: 1.45,
                  ease: 'expo.inOut',
                  delay: 0.08 + cardIdx * 0.1 + extraDelay,
                }
              );
            }
          });

          // Mini-thumbnails waaieren uit zoals in Möbius
          if (thumbs.length) {
            gsap.to(thumbs, {
              opacity: 1,
              x: 0,
              rotate: i => (i - 1) * 4,
              scale: 1,
              duration: 0.85,
              ease: 'back.out(1.7)',
              stagger: 0.08,
              delay: 0.25 + cardIdx * 0.08,
            });
          }
        },
      });
    });

    /* ───────── 11. FOUNDER MULTI-PLANE PARALLAX & PARTNERS REVEAL ───────── */
    if (!isMobile) {
      q('[data-m-parallax]').forEach(el => {
        const delta = parseFloat(el.getAttribute('data-m-parallax') || '-40');
        gsap.fromTo(
          el,
          { y: -delta * 0.6 },
          {
            y: delta * 0.6,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      });
    }

    const partners = q('[data-m-partner]');
    if (partners.length) {
      gsap.set(partners, { opacity: 0, y: 18 });
      ScrollTrigger.batch(partners, {
        start: 'top 92%',
        once: true,
        onEnter: els =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.06,
          }),
      });
    }

    /* ───────── 12. HET PROCES: 01–12 RULER SCRUB & KAARTEN ───────── */
    const procSec = one('[data-m-process]');
    if (procSec) {
      const rulerFill = one('[data-m-process-fill]', procSec);
      const procCards = q('[data-m-process-card]', procSec);

      if (rulerFill) {
        gsap.set(rulerFill, { scaleX: 0, transformOrigin: 'left center' });
        gsap.to(rulerFill, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: procSec,
            start: 'top 78%',
            end: 'bottom 55%',
            scrub: 0.4,
          },
        });
      }

      if (procCards.length) {
        gsap.set(procCards, { opacity: 0, y: 36 });
        ScrollTrigger.batch(procCards, {
          start: 'top 90%',
          once: true,
          onEnter: els =>
            gsap.to(els, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.1,
            }),
        });
      }
    }

    /* ───────── 13. TELLERS, BALKEN & LIJNEN (SUBPAGINA'S & ALGEMEEN) ───────── */
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    fontsReady.then(() => {
      q('[data-h-lines]').forEach(el => {
        try {
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            linesClass: 'h-line',
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 112,
                duration: 1.15,
                ease: 'power4.out',
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              });
            },
          });
        } catch (e) {}
      });
      ScrollTrigger.refresh();
    });

    q('[data-h-count-to]').forEach(el => {
      const target = parseFloat(el.getAttribute('data-h-count-to'));
      const suffix = el.getAttribute('data-h-suffix') || '';
      const from = target > 100 ? target - 40 : 0;
      const o = { v: from };
      el.textContent = `${from}${suffix}`;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: () =>
          gsap.to(o, {
            v: target,
            duration: 1.8,
            ease: 'power3.out',
            onUpdate: () => (el.textContent = `${Math.round(o.v)}${suffix}`),
          }),
      });
    });

    q('[data-h-fill]').forEach(el => {
      gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 94%',
        once: true,
        onEnter: () => gsap.to(el, { scaleX: 1, duration: 1.5, ease: 'expo.out' }),
      });
    });

    q('[data-h-rule]').forEach(el => {
      gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 95%',
        once: true,
        onEnter: () => gsap.to(el, { scaleX: 1, duration: 1.4, ease: 'expo.out' }),
      });
    });

    /* ───────── 14. FOOTER VENETIAN BLINDS + MONUMENTAAL WOORDMERK ───────── */
    const footerMark = one('[data-m-footer-mark]');
    if (footerMark) {
      const footerChars = q('[data-m-footer-char]', footerMark);
      const blindSlats = q('[data-m-blinds] > span', footerMark);

      if (footerChars.length) {
        gsap.fromTo(
          footerChars,
          { yPercent: 40, opacity: 0.15 },
          {
            yPercent: 0,
            opacity: 1,
            ease: 'power2.out',
            stagger: 0.02,
            scrollTrigger: {
              trigger: footerMark,
              start: 'top 96%',
              end: 'bottom 82%',
              scrub: 0.35,
            },
          }
        );
      }

      if (blindSlats.length) {
        gsap.fromTo(
          blindSlats,
          { scaleY: 1, transformOrigin: 'top center' },
          {
            scaleY: 0,
            ease: 'none',
            stagger: 0.04,
            scrollTrigger: {
              trigger: footerMark,
              start: 'top 96%',
              end: 'bottom 82%',
              scrub: 0.35,
            },
          }
        );
      }
    }

    /* ───────── 15. CASE MEDIA REVEALS ───────── */
    q('[data-h-showcase-media]').forEach(media => {
      gsap.set(media, { clipPath: 'inset(12% 0% 0% 0%)' });
      ScrollTrigger.create({
        trigger: media,
        start: 'top 92%',
        once: true,
        onEnter: () =>
          gsap.to(media, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out' }),
      });
    });

    q('[data-h-media]').forEach(fig => {
      const inner = one('[data-h-media-in]', fig);
      gsap.set(fig, { clipPath: 'inset(14% 0% 0% 0%)' });
      if (inner) gsap.set(inner, { scale: 1.12, transformOrigin: '50% 50%' });
      ScrollTrigger.create({
        trigger: fig,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(fig, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out' });
          if (inner) gsap.to(inner, { scale: 1.04, duration: 1.8, ease: 'expo.out' });
        },
      });
      if (inner && fig.hasAttribute('data-h-parallax')) {
        gsap.fromTo(
          inner,
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: 'none',
            scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      }
    });

    /* ───────── 16. 100% GSAP CURSOR, KNOPPEN, PILLS & CARDS ───────── */
    if (fine) {
      const cur = one('.h-cursor');
      const dot = one('[data-h-cursor-dot]', cur);
      const arrow = one('[data-h-cursor-label]', cur);

      if (cur) {
        root.classList.add('h-cursor-on');
        const cx = gsap.quickTo(cur, 'x', { duration: 0.28, ease: 'power3.out' });
        const cy = gsap.quickTo(cur, 'y', { duration: 0.28, ease: 'power3.out' });
        let shown = false;
        let mode = 'idle'; // 'idle' | 'link' | 'label'

        if (dot) gsap.set(dot, { scale: 0, opacity: 0, force3D: true });
        if (arrow) gsap.set(arrow, { scale: 0.4, opacity: 0, force3D: true });

        const applyCursorMode = nextMode => {
          if (nextMode === mode) return;
          mode = nextMode;
          cur.classList.toggle('is-link', mode === 'link');
          cur.classList.toggle('is-label', mode === 'label');

          if (dot) {
            gsap.to(dot, {
              scale: mode === 'label' ? 6.8 : mode === 'link' ? 3.2 : 1,
              opacity: shown ? 1 : 0,
              backgroundColor: mode === 'label' ? '#111111' : '#FFFFFF',
              duration: 0.42,
              ease: 'expo.out',
              overwrite: 'auto',
              force3D: true,
            });
          }
          if (arrow) {
            gsap.to(arrow, {
              scale: mode === 'label' ? 1 : 0.45,
              opacity: mode === 'label' ? 1 : 0,
              duration: 0.38,
              ease: 'expo.out',
              overwrite: 'auto',
              force3D: true,
            });
          }
        };

        const move = e => {
          if (!shown) {
            gsap.set(cur, { x: e.clientX, y: e.clientY });
            cur.classList.add('is-on');
            shown = true;
            if (dot) gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
          }
          cx(e.clientX);
          cy(e.clientY);
        };
        const over = e => {
          const t = e.target.closest?.('a, button, [data-h-cursor], [role="region"]');
          const lab = e.target.closest?.('[data-h-cursor]')?.getAttribute('data-h-cursor');
          if (lab) applyCursorMode('label');
          else if (t) applyCursorMode('link');
          else applyCursorMode('idle');
        };
        const leave = () => {
          cur.classList.remove('is-on');
          shown = false;
          mode = 'idle';
          if (dot) gsap.to(dot, { scale: 0, opacity: 0, duration: 0.25 });
          if (arrow) gsap.to(arrow, { scale: 0.4, opacity: 0, duration: 0.2 });
        };
        window.addEventListener('mousemove', move, { passive: true });
        root.addEventListener('mouseover', over);
        document.addEventListener('mouseleave', leave);
        cleanups.push(() => {
          window.removeEventListener('mousemove', move);
          root.removeEventListener('mouseover', over);
          document.removeEventListener('mouseleave', leave);
          root.classList.remove('h-cursor-on');
        });
      }

      /* Magnetische knoppen + GSAP pijl-shift */
      q('[data-h-magnet]').forEach(el => {
        const xt = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
        const yt = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
        const icon = el.querySelector('i');
        const move = e => {
          const r = el.getBoundingClientRect();
          xt((e.clientX - (r.left + r.width / 2)) * 0.18);
          yt((e.clientY - (r.top + r.height / 2)) * 0.26);
        };
        const enter = () => {
          if (icon) gsap.to(icon, { x: 4, duration: 0.35, ease: 'expo.out', overwrite: 'auto' });
        };
        const out = () => {
          xt(0);
          yt(0);
          if (icon) gsap.to(icon, { x: 0, duration: 0.45, ease: 'expo.out', overwrite: 'auto' });
        };
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', out);
        cleanups.push(() => {
          el.removeEventListener('mouseenter', enter);
          el.removeEventListener('mousemove', move);
          el.removeEventListener('mouseleave', out);
        });
      });

      /* GSAP hover-lift op service pills, proces-kaarten, prijskaarten & partner-cellen */
      q('.m-service-pill, .m-process-card, .m-price-card, .h-pkg, .m-partner-cell, .m-number-card').forEach(card => {
        const isPill = card.classList.contains('m-service-pill');
        const enter = () => {
          gsap.to(card, {
            y: isPill ? -3 : -5,
            duration: 0.45,
            ease: 'expo.out',
            overwrite: 'auto',
            force3D: true,
          });
        };
        const leave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.55,
            ease: 'expo.out',
            overwrite: 'auto',
            force3D: true,
          });
        };
        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', leave);
        cleanups.push(() => {
          card.removeEventListener('mouseenter', enter);
          card.removeEventListener('mouseleave', leave);
        });
      });
    }

    /* ───────── 17. PRINT & REFRESH ───────── */
    const beforePrint = () => {
      q('[data-h-count-to]').forEach(el => {
        el.textContent = `${el.getAttribute('data-h-count-to')}${el.getAttribute('data-h-suffix') || ''}`;
      });
      q('[data-h-fill]').forEach(el => gsap.set(el, { scaleX: 1 }));
    };
    window.addEventListener('beforeprint', beforePrint);
    cleanups.push(() => window.removeEventListener('beforeprint', beforePrint));

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    cleanups.push(() => window.removeEventListener('load', refresh));
  }, root);

  return () => {
    cleanups.forEach(fn => fn());
    ctx.revert();
  };
}
