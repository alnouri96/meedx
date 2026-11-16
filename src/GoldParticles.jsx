import React, { useEffect, useRef } from 'react';

export function GoldParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const count = 28;
    const pts = [];

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = Math.max(300, Math.floor(rect?.width || window.innerWidth));
      h = Math.max(260, Math.floor(rect?.height || 520));
      canvas.width = w;
      canvas.height = h;
    };

    resize();
    for (let i = 0; i < count; i++) {
      pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.28,
        vy: -0.15 - Math.random() * 0.25,
        a: 0.18 + Math.random() * 0.35,
      });
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -6) p.y = h + 6;
        if (p.x < -6) p.x = w + 6;
        if (p.x > w + 6) p.x = -6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 185, 76, ${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />;
}
