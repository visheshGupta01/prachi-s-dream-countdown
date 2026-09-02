import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { config } from "@/config";

type Props = { hasPointer?: boolean; reducedMotion?: boolean; celebrating?: boolean };

/** Hero photograph, blended into the background with gradient masking + glow. */
export function MainPhoto({ hasPointer = false, reducedMotion = false, celebrating = false }: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 60, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 60, damping: 18 });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  useEffect(() => {
    if (!hasPointer || reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [hasPointer, reducedMotion, mx, my]);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[26rem] lg:max-w-[30rem]"
      style={{ y: reducedMotion ? 0 : y, perspective: 1200 }}
      initial={{ opacity: 0, scale: 0.94, filter: "blur(18px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* glow behind */}
      <div
        className="absolute inset-0 -z-10 scale-125 rounded-full opacity-70 blur-3xl"
        style={{ background: "var(--gradient-photo-glow)" }}
      />

      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative">
        <motion.div
          animate={reducedMotion ? {} : { y: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <img
            src={config.mainPhoto}
            alt=""
            width={1024}
            height={1280}
            className="photo-mask w-full select-none object-cover"
            style={{
              filter: celebrating
                ? "saturate(1.35) brightness(1.15) contrast(1.05)"
                : "saturate(1.05) brightness(0.98)",
              transition: "filter 1.4s ease",
            }}
            draggable={false}
          />
          {/* light reflection sweep */}
          <span className="photo-mask pointer-events-none absolute inset-0 photo-sheen" />
          {/* colour blend into background */}
          <span
            className="photo-mask pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{ background: "var(--gradient-photo-tint)" }}
          />
        </motion.div>
      </motion.div>

      {/* floating particles around the photo */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-white/80"
          style={{
            left: `${8 + ((i * 37) % 88)}%`,
            top: `${12 + ((i * 53) % 78)}%`,
            boxShadow: "0 0 12px 3px rgba(255,214,235,0.75)",
            filter: i % 3 === 0 ? "blur(2px)" : "none",
          }}
          animate={reducedMotion ? {} : { y: [0, -26, 0], opacity: [0.15, 0.85, 0.15] }}
          transition={{ duration: 5 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}
    </motion.div>
  );
}
