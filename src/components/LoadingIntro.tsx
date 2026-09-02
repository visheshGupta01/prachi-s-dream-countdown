import { AnimatePresence, motion } from "framer-motion";

export function LoadingIntro({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-midnight"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {Array.from({ length: 34 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-[3px] w-[3px] rounded-full bg-white"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 61) % 100}%`,
                boxShadow: "0 0 10px 2px rgba(255,255,255,0.6)",
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 0.9, 0.35], scale: 1 }}
              transition={{ duration: 1.6, delay: 0.1 + (i % 12) * 0.08, ease: "easeOut" }}
            />
          ))}

          <motion.div
            className="absolute h-[60vmax] w-[60vmax] rounded-full"
            style={{
              background: "radial-gradient(circle, var(--orb-rose) 0%, transparent 65%)",
              filter: "blur(70px)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          <motion.div
            className="relative font-display text-2xl tracking-[0.5em] text-lavender"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: [0, 1, 0.75], y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            ✦
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
