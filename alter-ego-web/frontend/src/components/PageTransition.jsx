import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

/* ── Lightning Canvas ────────────────────────────────────────────────────────
   Petir VERTIKAL — menyambar dari atas dan bawah layar ke tengah
──────────────────────────────────────────────────────────────────────────── */
function LightningCanvas({ active, side }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  const makeBolt = (x1, y1, x2, y2, rough = 35) => {
    const pts = [{ x: x1, y: y1 }];
    const segs = 14 + Math.floor(Math.random() * 6);
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = -dy / len, ny = dx / len;
    for (let i = 1; i < segs; i++) {
      const t = i / segs;
      pts.push({
        x: x1 + dx * t + nx * (Math.random() - 0.5) * rough,
        y: y1 + dy * t + ny * (Math.random() - 0.5) * rough,
      });
    }
    pts.push({ x: x2, y: y2 });
    return pts;
  };

  const drawBolt = (ctx, pts, alpha, w) => {
    if (pts.length < 2) return;
    ctx.lineJoin = 'round';
    ctx.lineCap  = 'round';
    // outer glow — tebal
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = `rgba(180,0,0,${alpha * 0.4})`;
    ctx.lineWidth   = w * 8;
    ctx.shadowBlur  = 40;
    ctx.shadowColor = '#CC0000';
    ctx.stroke();
    // mid glow
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = `rgba(204,0,0,${alpha * 0.7})`;
    ctx.lineWidth   = w * 3;
    ctx.shadowBlur  = 20;
    ctx.stroke();
    // core
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = `rgba(220,0,0,${alpha})`;
    ctx.lineWidth   = w;
    ctx.shadowBlur  = 10;
    ctx.stroke();
    // white hot core
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = `rgba(255,200,200,${alpha * 0.5})`;
    ctx.lineWidth   = w * 0.3;
    ctx.shadowBlur  = 0;
    ctx.stroke();
  };

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const W = canvas.width;
    const H = canvas.height;
    let start = null;
    const DURATION = 700;

    // Bolt origins: tersebar horizontal di atas atau bawah
    const origins = side === 'top'
      ? [0.1, 0.25, 0.42, 0.58, 0.75, 0.90].map(fx => ({ x: W * fx, y: 0 }))
      : [0.08, 0.22, 0.40, 0.60, 0.78, 0.92].map(fx => ({ x: W * fx, y: H }));

    // Reach: masuk ke dalam layar ~40%
    const reach = side === 'top' ? H * 0.42 : H * 0.58;

    const tick = (ts) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / DURATION, 1);
      ctx.clearRect(0, 0, W, H);

      origins.forEach((o, i) => {
        const delay = i * 0.05;
        const p = Math.max(0, Math.min((t - delay) / 0.75, 1));
        if (p <= 0) return;
        if (Math.random() > 0.5) return; // flicker

        const ex = o.x + (Math.random() - 0.5) * 30;
        const ey = o.y + (reach - o.y) * p;
        const pts = makeBolt(o.x, o.y, ex, ey, 32 + Math.random() * 22);
        const alpha = (0.85 + Math.random() * 0.15) * (1 - t * 0.5);
        const w = 3 + Math.random() * 3; // tebal
        drawBolt(ctx, pts, alpha, w);

        // 1-2 branches
        if (p > 0.25 && Math.random() > 0.5) {
          const bi   = Math.floor(pts.length * (0.35 + Math.random() * 0.35));
          const bp   = pts[bi];
          const ang  = Math.atan2(ey - o.y, ex - o.x) + (Math.random() - 0.5) * 1.3;
          const bl   = 50 + Math.random() * 90;
          const bpts = makeBolt(bp.x, bp.y, bp.x + Math.cos(ang) * bl, bp.y + Math.sin(ang) * bl, 18);
          drawBolt(ctx, bpts, alpha * 0.55, w * 0.55);
        }
      });

      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, W, H);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, side]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

/* ── Main PageTransition ─────────────────────────────────────────────────────
   Curtain hitam slide dari ATAS ke bawah, petir vertikal,
   lalu halaman muncul dan meredup selama 3 detik
──────────────────────────────────────────────────────────────────────────── */
export default function PageTransition() {
  const location    = useLocation();
  const curtainRef  = useRef(null);
  const dimRef      = useRef(null);
  const [show,      setShow]      = useState(true);
  const [lightning, setLightning] = useState(false);

  const play = useCallback(() => {
    setShow(true);
    setLightning(false);

    // Kecil delay biar refs siap
    requestAnimationFrame(() => {
      const curtain = curtainRef.current;
      const dim     = dimRef.current;
      if (!curtain || !dim) return;

      const tl = gsap.timeline({
        onComplete: () => setShow(false),
      });

      // Reset
      gsap.set(curtain, { y: '-100%', opacity: 1 });
      gsap.set(dim,     { opacity: 0.85 });

      // 1. Curtain slide IN dari atas
      tl.to(curtain, {
        y: '0%',
        duration: 0.28,
        ease: 'power3.inOut',
        onComplete: () => setLightning(true),
      });

      // 2. Tahan — petir menyambar
      tl.to(curtain, { duration: 0.40 });

      // 3. Curtain slide OUT ke bawah
      tl.to(curtain, {
        y: '100%',
        duration: 0.28,
        ease: 'power3.inOut',
        onStart: () => setLightning(false),
      });

      // 4. Dim overlay meredup selama 3 detik
      tl.to(dim, {
        opacity: 0,
        duration: 3.0,
        ease: 'power1.out',
      }, '-=0.1');
    });
  }, []);

  useEffect(() => {
    play();
  }, [location.pathname]); // eslint-disable-line

  if (!show) return <div style={{ display: 'none' }} />;

  return (
    <>
      {/* Curtain hitam — slide vertikal */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
        style={{ backgroundColor: '#000000', transform: 'translateY(-100%)' }}
      >
        {/* Petir dari atas */}
        <LightningCanvas active={lightning} side="top" />
        {/* Petir dari bawah */}
        <LightningCanvas active={lightning} side="bottom" />

        {/* Edge glow atas */}
        <div className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(204,0,0,0.2), transparent)' }}
        />
        {/* Edge glow bawah */}
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(204,0,0,0.2), transparent)' }}
        />

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.12) 3px,rgba(0,0,0,0.12) 4px)' }}
        />
      </div>

      {/* Dim overlay — meredup 3 detik setelah curtain pergi */}
      <div
        ref={dimRef}
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{ backgroundColor: '#000000', opacity: 0 }}
      />
    </>
  );
}
