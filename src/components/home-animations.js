import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/*
 * Motion voor de homepage. Eén context, één opruimfunctie.
 *
 * Principes:
 *  - Alles is zichtbaar zonder JS en bij prefers-reduced-motion.
 *  - Alleen transform/opacity/clip-path worden geanimeerd.
 *  - Het laadscherm (SSR) bedekt de pagina tot de beginstanden gezet zijn,
 *    dus er is geen flits van onzichtbare of verspringende content.
 */
export function initHomeMotion(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
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
    const heroBg = one('[data-h-hero-bg]');
    const emblem = one('[data-h-emblem]');
    const portrait = one('[data-h-portrait]');
    const portraitMedia = one('[data-h-portrait-media]');
    const dots = one('[data-h-dots]');

    if (heroLines.length) gsap.set(heroLines, { yPercent: 112 });
    if (heroFade.length) gsap.set(heroFade, { opacity: 0, y: 18 });
    if (emblem) gsap.set(emblem, { scale: 0, rotate: -180, opacity: 0 });
    if (heroBg) gsap.set(heroBg, { scale: 1.08, opacity: 0 });
    if (portrait) gsap.set(portrait, { opacity: 0 });
    if (portraitMedia) gsap.set(portraitMedia, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.14 });
    if (dots) dots.style.setProperty('--r', '7');

    /* ───────── 1. LOADER + HERO INTRO ───────── */
    const countEl = one('[data-h-count]');
    const barEl = one('[data-h-bar]');
    const seen = (() => {
      try {
        return sessionStorage.getItem('h-seen') === '1';
      } catch (e) {
        return false;
      }
    })();
    const loadDur = seen ? 0.55 : 1.3;
    const counter = { v: 0 };

    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
    const heroIn = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      if (heroBg) tl.to(heroBg, { opacity: 1, scale: 1, duration: 1.8, ease: 'expo.out' }, 0);
      if (heroLines.length) tl.to(heroLines, { yPercent: 0, duration: 1.25, stagger: 0.12 }, 0.1);
      if (emblem) tl.to(emblem, { scale: 1, rotate: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.8)' }, 0.35);
      if (portrait) tl.to(portrait, { opacity: 1, duration: 0.01 }, 0.1);
      if (portraitMedia) tl.to(portraitMedia, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.5, ease: 'expo.out' }, 0.1);
      if (dots) {
        const o = { r: 7 };
        tl.to(o, { r: 0, duration: 2.6, ease: 'power2.inOut', onUpdate: () => dots.style.setProperty('--r', o.r.toFixed(2)), onComplete: () => { dots.style.display = 'none'; } }, 0.5);
      }
      if (heroFade.length) tl.to(heroFade, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.5);
      return tl;
    };

    if (!loader) {
      /* pagina's zonder laadscherm (cases): direct de intro */
      heroIn();
      root.classList.add('is-ready');
    } else intro
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

    /* ───────── 2. NAV: thema per sectie, verbergen bij omlaag scrollen ───────── */
    const nav = one('[data-h-nav]');
    if (nav) {
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
          if (menuOpen || y < 240) nav.classList.remove('is-hidden');
          else if (self.direction === 1) nav.classList.add('is-hidden');
          else if (self.direction === -1) nav.classList.remove('is-hidden');
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

    /* ───────── 4. HERO: Spector multi-plane scrubbed parallax ───────── */
    const hero = one('.h-hero');
    if (hero) {
      const heroBgEl = one('[data-h-hero-bg]', hero);
      const headlineEl = one('[data-h-hero-headline]', hero) || one('.h-hero-name', hero);
      const topLayerEl = one('[data-h-hero-top-layer]', hero);
      const barcodeEl = one('[data-h-hero-barcode]', hero);

      // Achtergrondfoto + mesh: daalt langzaam naar beneden met lichte schaling
      if (heroBgEl) {
        gsap.to(heroBgEl, {
          yPercent: 18,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Monumentale typografie: schuift sneller omhoog over de foto
      if (headlineEl) {
        gsap.to(headlineEl, {
          yPercent: -28,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Top metadata: lichte lift en fade
      if (topLayerEl) {
        gsap.to(topLayerEl, {
          yPercent: -15,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Verticale barcode rechts: lift en fade
      if (barcodeEl) {
        gsap.to(barcodeEl, {
          yPercent: -22,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (portrait) {
        gsap.to(portrait, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    }

    /* ───────── 5. REVEAL: fade-up ───────── */
    const ups = q('[data-h="up"]');
    if (ups.length) gsap.set(ups, { opacity: 0, y: 40 });
    ScrollTrigger.batch(ups, {
      start: 'top 92%',
      once: true,
      onEnter: els =>
        gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.09, overwrite: true }),
    });

    /* ───────── 6. REVEAL: regels met masker (koppen) ───────── */
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
        } catch (e) {
          /* geen animatie, tekst blijft gewoon staan */
        }
      });
      ScrollTrigger.refresh();
    });

    /* ───────── 7. STATEMENT: woorden lichten op tijdens scrollen ───────── */
    const statement = one('[data-h-statement]');
    if (statement) {
      const words = q('.h-word', statement);
      gsap.set(words, { opacity: 0.16 });
      gsap.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.12,
        scrollTrigger: { trigger: statement, start: 'top 82%', end: 'bottom 52%', scrub: 0.5 },
      });
    }

    /* ───────── 8. STAPPEN (tijdlijn): beeld + lijn ───────── */
    const steps = one('[data-h-steps]');
    if (steps) {
      const arts = q('[data-h-step-art]', steps);
      gsap.set(arts, { clipPath: 'inset(100% 0% 0% 0%)' });
      ScrollTrigger.batch(arts, {
        start: 'top 90%',
        once: true,
        onEnter: els =>
          gsap.to(els, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out', stagger: 0.14 }),
      });
      const items = q('.h-step', steps);
      gsap.set(items, { opacity: 0, y: 28 });
      ScrollTrigger.batch(items, {
        start: 'top 90%',
        once: true,
        onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.14, delay: 0.2 }),
      });
      gsap.fromTo(
        steps,
        { '--line': 0 },
        {
          '--line': 1,
          ease: 'none',
          scrollTrigger: { trigger: steps, start: 'top 80%', end: 'bottom 70%', scrub: true },
        }
      );
    }

    /* ───────── 9. TELLERS, BALKEN, LIJNEN ───────── */
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
        onEnter: () => gsap.to(el, { scaleX: 1, duration: 1.6, ease: 'expo.out' }),
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

    /* ───────── 10. FOOTER-WOORDMERK ───────── */
    const mark = q('.h-footer-mark span');
    if (mark.length) {
      gsap.fromTo(
        mark,
        { yPercent: 35 },
        {
          yPercent: 0,
          ease: 'none',
          stagger: 0.04,
          scrollTrigger: { trigger: '.h-footer-mark', start: 'top 100%', end: 'bottom 85%', scrub: true },
        }
      );
    }

    /* ───────── 11. CASES: zwevend voorbeeld + hover ───────── */
    const list = one('[data-h-cases]');
    const peek = one('[data-h-peek]');
    if (list && peek && fine && window.matchMedia('(min-width: 900px)').matches) {
      const imgs = q('[data-h-peek-img]', peek);
      const cap = one('[data-h-peek-cap]', peek);
      const frame = one('.h-peek-frame', peek);
      const rows = q('[data-h-case]', list);
      gsap.set(peek, { autoAlpha: 0, scale: 0.86, xPercent: 0, yPercent: -50 });
      gsap.set(imgs, { autoAlpha: 0 });

      const xTo = gsap.quickTo(peek, 'x', { duration: 0.7, ease: 'power3.out' });
      const yTo = gsap.quickTo(peek, 'y', { duration: 0.7, ease: 'power3.out' });
      const rotTo = gsap.quickTo(peek, 'rotation', { duration: 0.9, ease: 'power3.out' });
      let lastX = 0;
      let current = -1;

      const place = e => {
        const w = peek.offsetWidth;
        const toLeft = e.clientX > window.innerWidth - w - 120;
        xTo(toLeft ? e.clientX - w - 56 : e.clientX + 56);
        yTo(e.clientY);
        rotTo(gsap.utils.clamp(-4, 4, (e.clientX - lastX) * 0.25));
        lastX = e.clientX;
      };

      const show = i => {
        if (i === current) return;
        const prev = imgs[current];
        const next = imgs[i];
        current = i;
        list.classList.add('is-hovering');
        rows.forEach((r, k) => r.classList.toggle('is-active', k === i));
        if (prev) gsap.to(prev, { autoAlpha: 0, duration: 0.3, overwrite: true });
        if (next) {
          gsap.fromTo(next, { autoAlpha: 0, clipPath: 'inset(0% 0% 100% 0%)' }, { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'expo.out', overwrite: true });
        }
        if (cap) cap.textContent = `Fig. ${String(i + 1).padStart(2, '0')} — ${rows[i].querySelector('.h-case-name')?.textContent || ''}`;
        gsap.to(peek, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
      };

      const hide = () => {
        current = -1;
        list.classList.remove('is-hovering');
        rows.forEach(r => r.classList.remove('is-active'));
        gsap.to(peek, { autoAlpha: 0, scale: 0.9, duration: 0.4, ease: 'power3.in', overwrite: 'auto' });
      };

      const onMove = e => place(e);
      const handlers = rows.map((row, i) => {
        const enter = e => {
          if (current === -1) {
            gsap.set(peek, { x: e.clientX + 56, y: e.clientY });
            lastX = e.clientX;
          }
          show(i);
        };
        row.addEventListener('mouseenter', enter);
        row.addEventListener('focus', () => show(i));
        row.addEventListener('blur', hide);
        return [row, enter];
      });
      list.addEventListener('mousemove', onMove);
      list.addEventListener('mouseleave', hide);
      cleanups.push(() => {
        list.removeEventListener('mousemove', onMove);
        list.removeEventListener('mouseleave', hide);
        handlers.forEach(([row, enter]) => row.removeEventListener('mouseenter', enter));
      });
    }

    /* ───────── 12. CURSOR + MAGNETISCHE KNOPPEN ───────── */
    if (fine) {
      const cur = one('.h-cursor');
      const label = one('[data-h-cursor-label]');
      if (cur) {
        root.classList.add('h-cursor-on');
        const cx = gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3.out' });
        const cy = gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3.out' });
        let shown = false;
        const move = e => {
          if (!shown) {
            gsap.set(cur, { x: e.clientX, y: e.clientY });
            cur.classList.add('is-on');
            shown = true;
          }
          cx(e.clientX);
          cy(e.clientY);
        };
        const over = e => {
          const t = e.target.closest?.('a, button, [data-h-cursor], [role="region"]');
          const lab = e.target.closest?.('[data-h-cursor]')?.getAttribute('data-h-cursor');
          cur.classList.toggle('is-link', !!t && !lab);
          cur.classList.toggle('is-label', !!lab);
          if (label) label.textContent = lab || '';
        };
        const leave = () => {
          cur.classList.remove('is-on');
          shown = false;
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

      q('[data-h-magnet]').forEach(el => {
        const xt = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
        const yt = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
        const move = e => {
          const r = el.getBoundingClientRect();
          xt((e.clientX - (r.left + r.width / 2)) * 0.22);
          yt((e.clientY - (r.top + r.height / 2)) * 0.32);
        };
        const out = () => {
          xt(0);
          yt(0);
        };
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', out);
        cleanups.push(() => {
          el.removeEventListener('mousemove', move);
          el.removeEventListener('mouseleave', out);
        });
      });
    }

    /* ───────── 11b. BEELD: masker-reveal + parallax (cases) ───────── */
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

    /* ───────── 12b. PRINT: toon eindwaarden (tellers/balken) ───────── */
    const beforePrint = () => {
      q('[data-h-count-to]').forEach(el => {
        el.textContent = `${el.getAttribute('data-h-count-to')}${el.getAttribute('data-h-suffix') || ''}`;
      });
      q('[data-h-fill]').forEach(el => gsap.set(el, { scaleX: 1 }));
    };
    window.addEventListener('beforeprint', beforePrint);
    cleanups.push(() => window.removeEventListener('beforeprint', beforePrint));

    /* ───────── 13. REFRESH na laden van afbeeldingen/lettertypes ───────── */
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    cleanups.push(() => window.removeEventListener('load', refresh));
  }, root);

  return () => {
    cleanups.forEach(fn => fn());
    ctx.revert();
  };
}
