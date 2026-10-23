'use client';
import { useEffect, useRef } from 'react';

const HUD_LABELS = [
  'ACTIVATE',
  'STIMULATE',
  'INNOVATE',
  'RESONATE',
  'ILLUMINATE',
  'CAPTIVATE',
  'ELEVATE',
  'ORCHESTRATE',
];

/**
 * HeroVisual — Spector-stijl cinematische hero canvas.
 * - Volledige schaal (full-bleed) stoere achtergrondfoto met uiterste scherpte.
 * - Dynamische interactieve wireframe mesh overlay (ruiten/isometrisch grid) met elastische cursor-bulge.
 * - High-tech HUD coördinaten en roterende tags bij pointer interactie.
 * - Multi-layer diepte en muis-tilt, geoptimaliseerd met RAF en IntersectionObserver.
 */
export default function HeroVisual({
  heroImage = '/images/eugene-portrait.jpg',
  heroMobileImage = '/images/eugene-portrait.jpg',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Grid spacing & mesh configuration
    const spacing = 38;
    let cols = 0;
    let rows = 0;
    let points = [];
    let lines = [];

    // Pointer & physics state
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
      distTraveled: 0,
      lastTagPos: { x: -1000, y: -1000 },
      labelIndex: 0,
    };

    // Parallax tilt state
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };

    function buildMesh(w, h) {
      cols = Math.ceil(w / spacing) + 2;
      rows = Math.ceil(h / spacing) + 2;
      points = [];
      lines = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c - 1) * spacing;
          const y = (r - 1) * spacing;
          // Subtiele helderheid / diepte variatie
          const distToCenter = Math.hypot(x - w * 0.55, y - h * 0.35);
          const maxDist = Math.hypot(w * 0.6, h * 0.6);
          const factor = Math.max(0, 1 - distToCenter / maxDist);
          const baseAlpha = 0.04 + factor * 0.22;

          points.push({
            anchorX: x,
            anchorY: y,
            x: x,
            y: y,
            targetX: x,
            targetY: y,
            baseAlpha,
          });
        }
      }

      // Verbind punten: horizontaal, verticaal en kruisende diagonalen voor het ruit-patroon
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;

          // Horizontaal
          if (c + 1 < cols) {
            lines.push([idx, idx + 1]);
          }
          // Verticaal
          if (r + 1 < rows) {
            lines.push([idx, idx + cols]);
          }
          // Diagonaal top-left -> bottom-right
          if (c + 1 < cols && r + 1 < rows) {
            lines.push([idx, idx + cols + 1]);
          }
          // Diagonaal top-right -> bottom-left
          if (c > 0 && r + 1 < rows) {
            lines.push([idx, idx + cols - 1]);
          }
        }
      }
    }

    function resize() {
      const rect = container.getBoundingClientRect();
      width = Math.max(320, Math.round(rect.width));
      height = Math.max(320, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      buildMesh(width, height);
    }

    resize();

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(container);

    // Muis tracking
    function onPointerMove(e) {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;
      mouse.targetX = clientX - rect.left;
      mouse.targetY = clientY - rect.top;
      mouse.isHovered = true;

      // Parallax tilt normaliseren (-0.5 tot 0.5)
      tilt.tx = (clientX - rect.left) / rect.width - 0.5;
      tilt.ty = (clientY - rect.top) / rect.height - 0.5;

      // Update HUD label cyclus op afstand
      const d = Math.hypot(mouse.targetX - mouse.lastTagPos.x, mouse.targetY - mouse.lastTagPos.y);
      if (d > 70) {
        mouse.labelIndex = (mouse.labelIndex + 1) % HUD_LABELS.length;
        mouse.lastTagPos = { x: mouse.targetX, y: mouse.targetY };
      }
    }

    function onPointerLeave() {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      tilt.tx = 0;
      tilt.ty = 0;
    }

    if (finePointer && !prefersReducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.body.addEventListener('pointerleave', onPointerLeave);
    }

    // Animation Loop
    const bulgeRadius = 300;
    const bulgeRadiusSq = bulgeRadius * bulgeRadius;
    const bulgeStrength = 85;

    function render() {
      if (!isVisible) {
        rafId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Lerp mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // Lerp tilt voor CSS variabelen
      if (finePointer && !prefersReducedMotion) {
        tilt.x += (tilt.tx - tilt.x) * 0.08;
        tilt.y += (tilt.ty - tilt.y) * 0.08;
        container.style.setProperty('--tx', `${(tilt.x * -16).toFixed(2)}px`);
        container.style.setProperty('--ty', `${(tilt.y * -14).toFixed(2)}px`);
      }

      // Update point posities
      const mx = mouse.x;
      const my = mouse.y;
      const hovered = mouse.isHovered && finePointer && !prefersReducedMotion;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (hovered) {
          const dx = p.anchorX - mx;
          const dy = p.anchorY - my;
          const distSq = dx * dx + dy * dy;

          if (distSq < bulgeRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const norm = 1 - dist / bulgeRadius;
            const ease = norm * norm * (3 - 2 * norm); // Smooth hermite
            const force = ease * bulgeStrength;
            const angle = Math.atan2(dy, dx);
            p.targetX = p.anchorX + Math.cos(angle) * force;
            p.targetY = p.anchorY + Math.sin(angle) * force;
          } else {
            p.targetX = p.anchorX;
            p.targetY = p.anchorY;
          }
        } else {
          p.targetX = p.anchorX;
          p.targetY = p.anchorY;
        }

        // Elastische terugvering
        p.x += (p.targetX - p.x) * 0.15;
        p.y += (p.targetY - p.y) * 0.15;
      }

      // Teken verbindingslijnen
      ctx.lineWidth = 0.85;
      ctx.lineCap = 'round';

      for (let i = 0; i < lines.length; i++) {
        const [aIdx, bIdx] = lines[i];
        const a = points[aIdx];
        const b = points[bIdx];
        if (!a || !b) continue;

        // Bepaal alpha op basis van afstand tot cursor en basis helderheid
        let alpha = Math.max(a.baseAlpha, b.baseAlpha);
        if (hovered) {
          const midX = (a.x + b.x) * 0.5;
          const midY = (a.y + b.y) * 0.5;
          const distToMouse = Math.hypot(midX - mx, midY - my);
          if (distToMouse < bulgeRadius) {
            const proximity = 1 - distToMouse / bulgeRadius;
            alpha = Math.min(0.65, alpha + proximity * 0.4);
          }
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Subtiele knooppunt-markers
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      for (let i = 0; i < points.length; i += 3) {
        const p = points[i];
        if (!p) continue;
        ctx.fillRect(p.x - 0.75, p.y - 0.75, 1.5, 1.5);
      }

      // Cursor HUD (coördinaten + actieve tag)
      if (hovered && mx > 0 && mx < width && my > 0 && my < height) {
        ctx.save();
        ctx.font = '10px var(--ff-mono), monospace';
        ctx.fillStyle = 'rgba(249, 65, 55, 0.9)'; // Neon spot kleur
        const tag = `[${HUD_LABELS[mouse.labelIndex]}]`;
        const coords = `X:${Math.round(mx)} Y:${Math.round(my)}`;
        ctx.fillText(`${tag} ${coords}`, mx + 16, my - 14);

        // Subtiel draadkruis bij cursor
        ctx.strokeStyle = 'rgba(249, 65, 55, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mx - 8, my);
        ctx.lineTo(mx + 8, my);
        ctx.moveTo(mx, my - 8);
        ctx.lineTo(mx, my + 8);
        ctx.stroke();
        ctx.restore();
      }

      rafId = requestAnimationFrame(render);
    }

    rafId = requestAnimationFrame(render);

    // Stop animatie wanneer de hero buiten beeld is
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      if (finePointer) {
        window.removeEventListener('pointermove', onPointerMove);
        document.body.removeEventListener('pointerleave', onPointerLeave);
      }
    };
  }, []);

  return (
    <div className="h-hero-bg-stage" ref={containerRef} data-h-hero-bg>
      <div className="h-hero-bg-inner">
        {/* Full-bleed foto met mobile & desktop responsive source */}
        <picture className="h-hero-picture">
          <source media="(max-width: 768px)" srcSet={heroMobileImage} />
          <img
            src={heroImage}
            alt="Studio Maaijen — Hero Portrait"
            className="h-hero-photo"
            decoding="async"
            fetchPriority="high"
          />
        </picture>

        {/* Dynamische interactieve wireframe mesh canvas */}
        <canvas ref={canvasRef} className="h-hero-canvas" aria-hidden="true" />

        {/* Cinematische vignettes voor ultieme typografische scherpte & diepte */}
        <div className="h-hero-vignette h-hero-vignette--top" aria-hidden="true" />
        <div className="h-hero-vignette h-hero-vignette--bottom" aria-hidden="true" />
        <div className="h-hero-vignette h-hero-vignette--left" aria-hidden="true" />
        <div className="h-hero-vignette h-hero-vignette--spot" aria-hidden="true" />
      </div>
    </div>
  );
}
