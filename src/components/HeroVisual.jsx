'use client';
import { useEffect, useRef } from 'react';

/*
 * HeroVisual — Pure Typographic + Mouse-Follow Edition
 * 1. Interactieve oranje licht-gloed op canvas die direct en soepel de muis volgt.
 * 2. Grid-spotlight die het raster rondom de cursor subtiel oplicht.
 * 3. Subtiele magnetische parallax op de grote hero-titel.
 */
export default function HeroVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const hero = canvas.closest('#hero');
    const headline = hero?.querySelector('#hero-headline');
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, dpr = 1, raf = 0, t = 0;
    const mouse = { x: 0.55, y: 0.45, tx: 0.55, ty: 0.45, active: false };

    const ambientBlobs = [
      { x: 0.68, y: 0.36, r: 0.44, color: [255, 77, 0], a: 0.42, sx: 0.00022, sy: 0.00018, ph: 0 },
      { x: 0.25, y: 0.68, r: 0.36, color: [210, 45, 0], a: 0.26, sx: 0.00017, sy: 0.00023, ph: 2.2 },
      { x: 0.82, y: 0.75, r: 0.30, color: [255, 120, 40], a: 0.24, sx: 0.00025, sy: 0.00015, ph: 4.1 },
    ];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr * 0.5));
      canvas.height = Math.max(1, Math.floor(h * dpr * 0.5));
      ctx.setTransform(dpr * 0.5, 0, 0, dpr * 0.5, 0, 0);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width;
      mouse.ty = (e.clientY - rect.top) / rect.height;
      mouse.active = true;
    };

    const draw = () => {
      t += 16;
      mouse.x += (mouse.tx - mouse.x) * 0.075;
      mouse.y += (mouse.ty - mouse.y) * 0.075;

      if (hero) {
        hero.style.setProperty('--mx', `${(mouse.x * 100).toFixed(2)}%`);
        hero.style.setProperty('--my', `${(mouse.y * 100).toFixed(2)}%`);
      }
      if (headline && !reduce) {
        const dx = (mouse.x - 0.5) * 22;
        const dy = (mouse.y - 0.5) * 14;
        headline.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      const base = Math.max(w, h);

      // Ambient bewegende lichtbollen
      ambientBlobs.forEach((b) => {
        const ox = Math.sin(t * b.sx + b.ph) * 0.09;
        const oy = Math.cos(t * b.sy + b.ph) * 0.09;
        const cx = (b.x + ox + (mouse.x - 0.5) * 0.15) * w;
        const cy = (b.y + oy + (mouse.y - 0.5) * 0.15) * h;
        const r = b.r * base * (1 + Math.sin(t * 0.0006 + b.ph) * 0.06);

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        const [cr, cg, cb] = b.color;
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${b.a})`);
        g.addColorStop(0.45, `rgba(${cr},${cg},${cb},${b.a * 0.35})`);
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });

      // Directe Mouse-Follow Spotlight (heldere oranje kern die de cursor volgt)
      const mx = mouse.x * w;
      const my = mouse.y * h;
      const spotRadius = base * 0.34;
      const spot = ctx.createRadialGradient(mx, my, 0, mx, my, spotRadius);
      spot.addColorStop(0, 'rgba(255, 110, 30, 0.58)');
      spot.addColorStop(0.3, 'rgba(255, 77, 0, 0.32)');
      spot.addColorStop(0.65, 'rgba(200, 40, 0, 0.10)');
      spot.addColorStop(1, 'rgba(255, 77, 0, 0)');
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'source-over';
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting && !reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      if (headline) headline.style.transform = '';
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="hv-canvas" aria-hidden="true" />
      <div className="hv-grid-spotlight" aria-hidden="true" />
      <div className="hv-noise" aria-hidden="true" />
    </>
  );
}
