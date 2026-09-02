import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Spark = { id: number; x: number; y: number; char: string; dx: number; dy: number };

const CHARS = ["♡", "✦", "✨"];

/** Soft glowing cursor + occasional trailing sparkles + click bursts. */
export function CursorEffects({ hasPointer, reducedMotion }: { hasPointer: boolean; reducedMotion: boolean }) {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const glow = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(0);
  const lastSpark = useRef(0);

  const burst = (x: number, y: number, count: number) => {
    const next: Spark[] = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + Math.random();
      const dist = 34 + Math.random() * 46;
      return {
        id: idRef.current++,
        x,
        y,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 14,
      };
    });
    setSparks((s) => [...s.slice(-40), ...next]);
    window.setTimeout(() => {
      const ids = new Set(next.map((n) => n.id));
      setSparks((s) => s.filter((sp) => !ids.has(sp.id)));
    }, 900);
  };

  useEffect(() => {
    if (reducedMotion) return;

    const onMove = (e: PointerEvent) => {
      if (glow.current) {
        glow.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const now = performance.now();
      if (hasPointer && now - lastSpark.current > 320 && Math.random() < 0.4) {
        lastSpark.current = now;
        burst(e.clientX, e.clientY, 1);
      }
    };
    const onDown = (e: PointerEvent) => burst(e.clientX, e.clientY, 7);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [hasPointer, reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {hasPointer && !reducedMotion && (
        <div ref={glow} className="absolute left-0 top-0 will-change-transform">
          <div className="cursor-glow -translate-x-1/2 -translate-y-1/2" />
        </div>
      )}
      <AnimatePresence>
        {sparks.map((s) => (
          <motion.span
            key={s.id}
            className="absolute select-none text-base text-rose-light"
            style={{ left: s.x, top: s.y, textShadow: "0 0 10px rgba(255,190,225,0.9)" }}
            initial={{ opacity: 0.95, scale: 0.5, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.2, x: s.dx, y: s.dy }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            {s.char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
