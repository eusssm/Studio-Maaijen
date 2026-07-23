import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initHomeAnimations(container) {
  gsap.registerPlugin(ScrollTrigger);

  const qs = s => container.querySelector(s);
  const qsa = s => container.querySelectorAll(s);
  
  if (typeof window === 'undefined') return;

  /* ============ CURSOR ============ */
  const cur = qs('#cursor');
  const ring = qs('#cursor-ring');
  if (cur && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    cur.style.left = '-100px'; ring.style.left = '-100px';
    
    function animCursor() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      cur.style.left = mx + 'px';  cur.style.top = my + 'px';
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animCursor);
    }
    animCursor();
  }

  qsa('a,button,.work-panel').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('is-hovering'));
  });

  /* ============ LOADER ============ */
  const loaderEl = qs('#loader');
  const loaderCount = qs('#loader-count');
  if (loaderEl && loaderCount) {
    let count = 0;
    const countUp = setInterval(() => {
      count = Math.min(count + Math.floor(Math.random() * 12) + 4, 100);
      loaderCount.textContent = count + '%';
      if (count >= 100) {
        clearInterval(countUp);
        setTimeout(() => {
          gsap.to(loaderEl, {
            yPercent: -100, opacity: 0, duration: .9,
            ease: 'power3.inOut',
            onComplete: () => { loaderEl.style.display = 'none'; initAnimations(); }
          });
        }, 300);
      }
    }, 60);
  } else {
    initAnimations();
  }

  /* ============ INIT AFTER LOAD ============ */
  function initAnimations() {

    /* --- NAV entrance --- */
    gsap.to(['.nav-logo', '.nav-links', '.nav-cta-btn', '.nav-menu-btn'], {
      opacity: 1, y: 0, duration: .8,
      ease: 'power3.out', stagger: .08, delay: .1
    });

    /* --- HERO word reveal --- */
    gsap.to('.word-inner', {
      y: '0%', duration: 1.1,
      ease: 'power4.out', stagger: .12, delay: .2
    });

    /* --- Hero eyebrow & bottom --- */
    gsap.from('#hero-eyebrow-txt', { opacity:0, x:-20, duration:.8, ease:'power3.out', delay:.6 });
    gsap.from('#hero-cta', { opacity:0, y:20, duration:.8, ease:'power3.out', delay:.9 });
    gsap.from('#hero-disc', { opacity:0, y:20, duration:.8, ease:'power3.out', delay:1.0 });
    gsap.from('.scroll-hint', { opacity:0, duration:1, ease:'power2.out', delay:1.4 });

    /* --- Hero parallax --- */
    gsap.to('.hero-orb-1', {
      y: -120, scrollTrigger: {
        trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5
      }
    });
    gsap.to('.hero-orb-2', {
      y: -60, scrollTrigger: {
        trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2
      }
    });
    gsap.to('.hero-content', {
      y: 80, opacity: .3, scrollTrigger: {
        trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1
      }
    });
    gsap.to('.hero-grid', {
      y: 60, scrollTrigger: {
        trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2
      }
    });

    /* --- SCROLL PROGRESS BAR --- */
    gsap.to('#scroll-bar', {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: .3 }
    });

    /* --- NAV scroll behaviour --- */
    const navEl = qs('#nav');
    if (navEl) {
      ScrollTrigger.create({
        start: 'top -80',
        onUpdate: self => {
          if (self.progress > 0) navEl.classList.add('scrolled');
          else navEl.classList.remove('scrolled');
        }
      });
    }

    /* --- Scroll hint fade --- */
    gsap.to('.scroll-hint', {
      opacity: 0, scrollTrigger: {
        trigger: '#hero', start: '40% top', end: '60% top', scrub: true
      }
    });



    /* ============ CTA BACKDROP SCALE ============ */
    gsap.fromTo('#cta-backdrop',
      { scale: 0.6, opacity: 0 },
      {
        scale: 1, opacity: 1,
        scrollTrigger: {
          trigger: '#cta', start: 'top 80%', end: 'center center',
          scrub: 1.5
        }
      }
    );

    /* ============ SECTION REVEALS ============ */
    qsa('.reveal').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el, start: 'top 88%',
          toggleActions: 'play none none none'
        },
        delay: 0
      });
    });
    qsa('.reveal-left').forEach(el => {
      gsap.to(el, {
        opacity: 1, x: 0, duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
    qsa('.reveal-right').forEach(el => {
      gsap.to(el, {
        opacity: 1, x: 0, duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
    qsa('.reveal-scale').forEach(el => {
      gsap.to(el, {
        opacity: 1, scale: 1, duration: 1.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    /* ============ STATS STAGGER ============ */
    gsap.fromTo('.stat-item',
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.4, stagger: .18,
        ease: 'expo.out',
        scrollTrigger: { trigger: '#stats', start: 'top 82%', toggleActions: 'play none none none' }
      }
    );

    /* ============ COUNTERS ============ */
    qsa('.counter').forEach(el => {
      const target = +el.dataset.to;
      let triggered = false;
      ScrollTrigger.create({
        trigger: '#stats',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (triggered) return;
          triggered = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 2.2, ease: 'power2.out',
            onUpdate: () => { el.textContent = Math.round(obj.val); }
          });
        }
      });
    });

    /* ============ SERVICES IMAGE PARALLAX ============ */
    gsap.to('.services-img-block', {
      y: -40,
      scrollTrigger: {
        trigger: '#services', start: 'top bottom', end: 'bottom top', scrub: 2
      }
    });

    /* ============ MARQUEE SPEED ON SCROLL ============ */
    let scrollVel = 0;
    ScrollTrigger.create({
      onUpdate: self => { scrollVel = self.getVelocity(); }
    });

    /* ============ PROCESS STEPS STAGGER ============ */
    gsap.fromTo('.process-step',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.2, stagger: .16,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: '#process',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    /* ============ FOOTER REVEAL ============ */
    gsap.fromTo('footer',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 98%',
          toggleActions: 'play none none none'
        }
      }
    );

    setTimeout(() => ScrollTrigger.refresh(), 500);
    setTimeout(() => ScrollTrigger.refresh(), 1500);

    /* ============ MAGNETIC BUTTONS ============ */
    qsa('.btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - r.left - r.width/2;
        const dy = e.clientY - r.top  - r.height/2;
        gsap.to(btn, { x: dx*.18, y: dy*.18, duration:.4, ease:'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x:0, y:0, duration:.6, ease:'elastic.out(1,.4)' });
      });
    });
  } // end initAnimations

  /* ============ NAV ============ */
  const overlay = qs('#menu-overlay');
  const openBtn = qs('#menu-open-btn');
  const closeBtn = qs('#menu-close-btn');

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

  function closeMenu() {
    if (overlay) overlay.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  /* ============ SMOOTH ANCHOR SCROLL ============ */
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      const target = qs(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth', block:'start' }); }
    });
  });

  /* ============ RESIZE ============ */
  window.addEventListener('resize', () => ScrollTrigger.refresh());
}