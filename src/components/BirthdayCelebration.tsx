import { motion } from "framer-motion";
import { useEffect } from "react";

type Props = { active: boolean; reducedMotion?: boolean };

const COLORS = ["#ff8fc7", "#ffd6ea", "#c9a7ff", "#8f7bff", "#ffd79a", "#ffffff"];

/**
 * Visual-only birthday celebration: confetti, hearts, sparkles, balloons
 * and background fireworks. Text/messages can be added inside the marked
 * slot below later.
 */
export function BirthdayCelebration({ active, reducedMotion = false }: Props) {
  useEffect(() => {
    if (!active || reducedMotion) return;
    let stop = false;
    let timer: number | undefined;

    (async () => {
      const confetti = (await import("canvas-confetti")).default;
      const fire = () => {
        if (stop) return;
        confetti({
          particleCount: 60,
          spread: 90,
          startVelocity: 42,
          origin: { x: Math.random(), y: 0.9 },
          colors: COLORS,
          scalar: 1.1,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 18,
          spread: 120,
          origin: { x: Math.random(), y: 0.4 },
          colors: COLORS,
          shapes: ["circle"],
          scalar: 1.4,
        });
      };
      fire();
      timer = window.setInterval(fire, 1400);
    })();

    return () => {
      stop = true;
      if (timer) window.clearInterval(timer);
    };
  }, [active, reducedMotion]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {/* fireworks bursts */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.span
          key={`fw-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + ((i * 23) % 45)}%`,
            width: 10,
            height: 10,
            background: COLORS[i % COLORS.length],
            boxShadow: `0 0 60px 24px ${COLORS[i % COLORS.length]}`,
          }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.2, 5.5, 7] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.9, ease: "easeOut" }}
        />
      ))}

      {/* balloons */}
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.span
          key={`b-${i}`}
          className="absolute"
          style={{ left: `${5 + i * 11}%`, bottom: "-18vh" }}
          animate={{ y: ["0vh", "-125vh"], x: [0, i % 2 ? 40 : -40, 0] }}
          transition={{ duration: 13 + (i % 5) * 2.5, repeat: Infinity, delay: i * 1.1, ease: "easeInOut" }}
        >
          <span
            className="block h-16 w-12 rounded-[50%_50%_50%_50%/60%_60%_40%_40%]"
            style={{
              background: `radial-gradient(circle at 32% 28%, #fff8, ${COLORS[i % COLORS.length]})`,
              boxShadow: `0 0 30px ${COLORS[i % COLORS.length]}66`,
            }}
          />
          <span className="mx-auto block h-14 w-px bg-white/30" />
        </motion.span>
      ))}

      {/* hearts + sparkles */}
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.span
          key={`h-${i}`}
          className="absolute select-none text-xl"
          style={{
            left: `${(i * 41) % 100}%`,
            bottom: "-5vh",
            color: COLORS[i % COLORS.length],
            textShadow: "0 0 12px rgba(255,255,255,0.7)",
          }}
          animate={{ y: ["0vh", "-110vh"], opacity: [0, 1, 0], rotate: [0, i % 2 ? 25 : -25, 0] }}
          transition={{ duration: 9 + (i % 6), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        >
          {i % 3 === 0 ? "♡" : i % 3 === 1 ? "✦" : "✨"}
        </motion.span>
      ))}

      {/* colourful light wash */}
      <motion.div
        className="absolute inset-0 mix-blend-screen"
        style={{ background: "var(--gradient-celebrate)" }}
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── SLOT: add birthday text / messages here later ── */}
    </div>
  );
}
