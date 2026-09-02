import { motion, useScroll, useTransform } from "framer-motion";
import { ParticleField } from "./ParticleField";
import { config } from "@/config";

type Props = { density?: number; reducedMotion?: boolean; celebrating?: boolean };

const orbs = [
  { size: 46, x: "-12%", y: "-8%", color: "var(--orb-rose)", dur: 34, dx: 90, dy: 60 },
  { size: 40, x: "62%", y: "6%", color: "var(--orb-violet)", dur: 44, dx: -110, dy: 80 },
  { size: 34, x: "8%", y: "58%", color: "var(--orb-lavender)", dur: 52, dx: 130, dy: -70 },
  { size: 30, x: "70%", y: "66%", color: "var(--orb-peach)", dur: 40, dx: -80, dy: -90 },
];

export function AnimatedBackground({ density = 1, reducedMotion = false, celebrating = false }: Props) {
  const { scrollYProgress } = useScroll();
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const ghostOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.6, 0.85], [0, 0.16, 0.1, 0.2]);
  const ghostScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base animated gradient */}
      <div className={`absolute inset-0 bg-night-gradient ${reducedMotion ? "" : "animate-gradient-drift"}`} />

      {/* slow drifting blurred orbs */}
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-screen"
          style={{
            width: `${o.size}vmax`,
            height: `${o.size}vmax`,
            left: o.x,
            top: o.y,
            background: `radial-gradient(circle at 50% 50%, ${o.color} 0%, transparent 68%)`,
            filter: "blur(60px)",
            opacity: celebrating ? 0.85 : 0.55,
            transition: "opacity 1.2s ease",
          }}
          animate={reducedMotion ? {} : { x: [0, o.dx, 0], y: [0, o.dy, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* slowly moving gradient clouds */}
      <div className={`absolute inset-0 bg-cloud-layer ${reducedMotion ? "" : "animate-cloud-drift"}`} />

      {/* large ghost photograph appearing on scroll */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${config.galleryPhotos[4] ?? config.mainPhoto})`,
          opacity: ghostOpacity,
          scale: ghostScale,
          filter: "blur(38px) saturate(120%)",
        }}
      />

      {/* stars + particles */}
      <motion.div className="absolute inset-0" style={{ y: reducedMotion ? 0 : starsY }}>
        <ParticleField density={density} reducedMotion={reducedMotion} className="h-full w-full" />
      </motion.div>

      {/* atmospheric glow + vignette + grain */}
      <div className="absolute inset-0 bg-atmosphere" />
      <div className="absolute inset-0 bg-grain opacity-[0.16]" />
    </div>
  );
}
