import { useEffect, useRef } from "react";

type Props = {
  density?: number;
  reducedMotion?: boolean;
  className?: string;
};

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  phase: number;
  depth: number;
};

type Mote = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  blur: number;
  hue: number;
  heart: boolean;
};

type Shot = { x: number; y: number; vx: number; vy: number; life: number; len: number };

const PALETTE = [330, 300, 275, 25, 45];

/**
 * Single-canvas particle system: twinkling stars, drifting glowing motes,
 * bokeh, hearts and occasional shooting stars. One canvas keeps the DOM
 * light and the animation GPU/CPU friendly.
 */
export function ParticleField({ density = 1, reducedMotion = false, className }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let motes: Mote[] = [];
    let shots: Shot[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = (w * h) / 1000;
      const starCount = Math.round(area * 0.55 * density);
      const moteCount = Math.round(area * 0.11 * density);

      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.4, 1.5),
        a: rand(0.25, 0.95),
        tw: rand(0.4, 2.2),
        phase: Math.random() * Math.PI * 2,
        depth: rand(0.2, 1),
      }));

      motes = Array.from({ length: moteCount }, () => {
        const depth = rand(0.25, 1);
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: rand(1, 4) * (1 / depth) * 0.9,
          vx: rand(-0.12, 0.12) * depth,
          vy: -rand(0.05, 0.32) * depth,
          a: rand(0.15, 0.65) * depth,
          blur: Math.random() < 0.45 ? rand(3, 14) : 0,
          hue: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          heart: Math.random() < 0.12,
        };
      });
    };

    build();
    window.addEventListener("resize", build);

    const heart = (x: number, y: number, s: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y + s * 0.75);
      ctx.bezierCurveTo(x - s * 1.4, y - s * 0.5, x - s * 0.35, y - s * 1.3, x, y - s * 0.35);
      ctx.bezierCurveTo(x + s * 0.35, y - s * 1.3, x + s * 1.4, y - s * 0.5, x, y + s * 0.75);
      ctx.closePath();
      ctx.fill();
    };

    let raf = 0;
    let t = 0;
    let lastTs = performance.now();
    let nextShot = rand(4000, 9000);

    const draw = (ts: number) => {
      const dt = Math.min(ts - lastTs, 60);
      lastTs = ts;
      t += dt / 1000;

      ctx.clearRect(0, 0, w, h);

      // stars
      for (const s of stars) {
        const tw = reducedMotion ? 1 : 0.55 + 0.45 * Math.sin(t * s.tw + s.phase);
        ctx.globalAlpha = s.a * tw;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.15) {
          ctx.globalAlpha = s.a * tw * 0.25;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // glowing motes / bokeh / hearts
      for (const m of motes) {
        if (!reducedMotion) {
          m.x += m.vx * (dt / 16);
          m.y += m.vy * (dt / 16);
          if (m.y < -20) {
            m.y = h + 20;
            m.x = Math.random() * w;
          }
          if (m.x < -20) m.x = w + 20;
          if (m.x > w + 20) m.x = -20;
        }
        ctx.globalAlpha = m.a;
        ctx.filter = m.blur ? `blur(${m.blur}px)` : "none";
        ctx.fillStyle = `hsl(${m.hue} 95% ${m.heart ? 72 : 82}%)`;
        if (m.heart) heart(m.x, m.y, m.r * 1.6);
        else {
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.filter = "none";
      }

      // shooting stars
      if (!reducedMotion) {
        nextShot -= dt;
        if (nextShot <= 0) {
          nextShot = rand(6000, 14000);
          const sx = rand(w * 0.1, w * 0.9);
          shots.push({
            x: sx,
            y: rand(0, h * 0.35),
            vx: rand(4, 8),
            vy: rand(1.6, 3.2),
            life: 1,
            len: rand(90, 190),
          });
        }
        for (const s of shots) {
          s.x += s.vx * (dt / 16);
          s.y += s.vy * (dt / 16);
          s.life -= dt / 1100;
          const nx = s.x - s.vx * (s.len / 8);
          const ny = s.y - s.vy * (s.len / 8);
          const g = ctx.createLinearGradient(s.x, s.y, nx, ny);
          g.addColorStop(0, `rgba(255,255,255,${Math.max(s.life, 0) * 0.9})`);
          g.addColorStop(0.4, `rgba(255,205,235,${Math.max(s.life, 0) * 0.35})`);
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.globalAlpha = 1;
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(nx, ny);
          ctx.stroke();
        }
        shots = shots.filter((s) => s.life > 0 && s.x < w + 200 && s.y < h + 200);
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
    };
  }, [density, reducedMotion]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
