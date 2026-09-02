import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  src: string;
  className?: string;
  rotate?: number;
  depth?: number;
  delay?: number;
  polaroid?: boolean;
  hasPointer?: boolean;
  reducedMotion?: boolean;
  onClick?: () => void;
};

/** Elegant floating polaroid-style photo card with mouse/scroll parallax. */
export function FloatingPhoto({
  src,
  className = "",
  rotate = 0,
  depth = 0.5,
  delay = 0,
  polaroid = true,
  hasPointer = false,
  reducedMotion = false,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 45, damping: 20 });
  const sy = useSpring(py, { stiffness: 45, damping: 20 });

  const { scrollYProgress } = useScroll();
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -160 * depth]);

  useEffect(() => {
    if (!hasPointer || reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 46 * depth);
      py.set((e.clientY / window.innerHeight - 0.5) * 30 * depth);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [hasPointer, reducedMotion, depth, px, py]);

  return (
    <motion.div
      ref={ref}
      className={`group ${className}`}
      style={{ x: sx, y: sy }}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div style={{ y: reducedMotion ? 0 : scrollY }}>
        <motion.button
          type="button"
          onClick={onClick}
          aria-label="Open photo"
          className="photo-card block cursor-pointer"
          style={{ rotate }}
          animate={reducedMotion ? {} : { y: [0, -14, 0] }}
          transition={{ duration: 7 + depth * 4, repeat: Infinity, ease: "easeInOut", delay }}
          whileHover={{ y: -18, rotate: rotate + (rotate >= 0 ? 2.5 : -2.5), scale: 1.05 }}
          whileTap={{ y: -10, scale: 1.04 }}
        >
          <span className={polaroid ? "polaroid block" : "block overflow-hidden rounded-2xl"}>
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className={`block w-full object-cover ${polaroid ? "aspect-[4/5] rounded-[0.35rem]" : "aspect-[4/5]"}`}
              draggable={false}
            />
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
