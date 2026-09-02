import { AnimatePresence, motion } from "framer-motion";

type Props = {
  value: number;
  label: string;
  digits?: number;
  index: number;
  reducedMotion?: boolean;
};

function pad(value: number, digits: number) {
  return value.toString().padStart(digits, "0");
}

/** A single frosted glass countdown card with smooth flip/slide digits. */
export function CountdownCard({ value, label, digits = 2, index, reducedMotion = false }: Props) {
  const text = pad(value, digits);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.15 + index * 0.13, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <motion.div
        animate={reducedMotion ? {} : { y: [0, -7, 0] }}
        transition={{ duration: 6 + index * 0.7, repeat: Infinity, ease: "easeInOut" }}
        className="group relative"
      >
        {/* animated glow border */}
        <div className="glass-border absolute -inset-px rounded-[1.65rem]" />

        <div className="glass-card relative overflow-hidden rounded-[1.6rem] px-3 py-5 sm:px-6 sm:py-7">
          {/* travelling sparkle */}
          <span className="card-sheen pointer-events-none absolute inset-0" />
          {/* top reflection */}
          <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          <div className="relative flex h-[1.05em] items-center justify-center overflow-hidden text-center font-display text-[clamp(2.6rem,12vw,5.5rem)] leading-none tracking-tight text-glow">
            <div className="flex">
              {text.split("").map((char, i) => (
                <span key={i} className="relative block w-[0.62em] overflow-hidden">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.span
                      key={char}
                      initial={reducedMotion ? { opacity: 0 } : { y: "-100%", opacity: 0, filter: "blur(6px)" }}
                      animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                      exit={reducedMotion ? { opacity: 0 } : { y: "100%", opacity: 0, filter: "blur(6px)" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="block text-center"
                    >
                      {char}
                    </motion.span>
                  </AnimatePresence>
                </span>
              ))}
            </div>
          </div>

          <p className="relative mt-3 text-center text-[0.58rem] font-medium uppercase tracking-[0.42em] text-lavender/80 sm:text-[0.7rem]">
            {label}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
