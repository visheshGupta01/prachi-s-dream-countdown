import { motion } from "framer-motion";
import { CountdownCard } from "./CountdownCard";
import type { TimeLeft } from "@/hooks/useCountdown";

type Props = { time: TimeLeft; reducedMotion?: boolean };

function Separator({ delay, reducedMotion }: { delay: number; reducedMotion?: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className="hidden select-none font-display text-4xl text-rose/70 lg:block"
      animate={reducedMotion ? {} : { opacity: [0.35, 1, 0.35] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
    >
      :
    </motion.span>
  );
}

export function Countdown({ time, reducedMotion }: Props) {
  const units = [
    { label: "Days", value: time.days, digits: 2 },
    { label: "Hours", value: time.hours, digits: 2 },
    { label: "Minutes", value: time.minutes, digits: 2 },
    { label: "Seconds", value: time.seconds, digits: 2 },
  ];

  return (
    <div className={`relative ${reducedMotion ? "" : "animate-glow-pulse"}`}>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:flex lg:items-center lg:gap-3">
        {units.map((u, i) => (
          <div key={u.label} className="contents lg:flex lg:items-center lg:gap-3">
            <div className="lg:w-[8.5rem] xl:w-[9.5rem]">
              <CountdownCard
                value={u.value}
                label={u.label}
                digits={u.digits}
                index={i}
                reducedMotion={reducedMotion}
              />
            </div>
            {i < units.length - 1 && <Separator delay={i * 0.25} reducedMotion={reducedMotion} />}
          </div>
        ))}
      </div>
    </div>
  );
}
