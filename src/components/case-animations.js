import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initCaseAnimations(container) {
  gsap.registerPlugin(ScrollTrigger);
  const qs = s => container.querySelector(s);
  const qsa = s => [...container.querySelectorAll(s)];
  
  if (typeof window === 'undefined') return;

  /* ─── 1. CURSOR ───────────────────────────────────────────── */
  const dot  = qs('#cursor');
  const ring = qs('#cursor-ring');
  if (dot && ring) {
    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    dot.style.cssText  = 'opacity:1';
    ring.style.cssText = 'opacity:1';
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      dot.style.transform  = `translate(${mx - 4}px, ${my - 4}px)`;
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ─── 2. SCROLL PROGRESS BAR ─────────────────────────────── */
  const bar = qs('#scroll-bar');
  if (bar) {
    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });
  }

  /* ─── 3. NAV ENTRANCE ─────────────────────────────────────── */
  const nav = qs('#nav');
  if (nav) {
    gsap.set(nav, { opacity: 0, y: -40 });
    gsap.to(nav, {
      opacity: 1, y: 0,
      duration: 1.4,
      ease: 'expo.out',
      delay: 0.2
    });
    gsap.to(qsa('.nav-logo, .nav-links, .nav-menu-btn'), {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.08,
      delay: 0.4
    });
    ScrollTrigger.create({
      start: 'top -60',
      end: 99999,
      toggleClass: { targets: nav, className: 'scrolled' }
    });
  }

  /* ─── 4. HERO LINE-INNER REVEALS ─────────────────────────── */
  const lines = qsa('.line-inner');
  if (lines.length) {
    gsap.fromTo(lines,
      { y: '120%' },
      {
        y: '0%',
        duration: 1.6,
        ease: 'expo.out',
        stagger: 0.1,
        delay: 0.3
      }
    );
  }

  /* ─── 5. HERO PARALLAX BACKGROUND ───────────────────────── */
  const heroBg = qs('.case-hero-bg');
  if (heroBg) {
    gsap.fromTo(heroBg,
      { yPercent: 0 },
      {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '#case-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      }
    );
  }

  /* ─── 8. GENERIC .reveal ELEMENTS ───────────────────────── */
  qsa('.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 80 },
      {
        opacity: 1, y: 0,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  /* ─── 10. PARALLAX IMAGES ───────────────────────────────── */
  qsa('.parallax-img').forEach(el => {
    gsap.fromTo(el,
      { yPercent: 0 },
      {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('.full-image-wrap') || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      }
    );
  });

  /* ─── 16. MAGNETIC BUTTONS ──────────────────────────────── */
  qsa('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r   = btn.getBoundingClientRect();
      const cx  = r.left + r.width  / 2;
      const cy  = r.top  + r.height / 2;
      const dx  = (e.clientX - cx) * 0.35;
      const dy  = (e.clientY - cy) * 0.35;
      gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  });

  /* ─── 17. MENU OVERLAY LISTENERS ─────────────────────────── */
  const overlay = qs('#menu-overlay');
  const openBtn = qs('#menu-open-btn');
  const closeBtn = qs('#menu-close-btn');

  const closeMenu = () => {
    if (overlay) overlay.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      if (overlay) overlay.classList.add('open');
      document.body.classList.add('menu-open');
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }
  if (overlay) {
    overlay.addEventListener('click', e => { if (e.target === overlay) closeMenu(); });
  }
  qsa('.menu-nav a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  /* ─── 18. HOVER CLASSES FOR CURSOR ───────────────────────── */
  qsa('a, button, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('is-hovering'));
  });

  /* ─── 19. SMOOTH SCROLL REFRESH ON RESIZE ───────────────── */
  window.addEventListener('resize', () => ScrollTrigger.refresh());
}
