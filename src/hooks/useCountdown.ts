import { useEffect, useState } from "react";
import { targetTimestamp } from "@/config";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
};

function compute(now: number): TimeLeft {
  const diff = targetTimestamp - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    isOver: false,
  };
}

export function useCountdown(): TimeLeft {
  const [time, setTime] = useState<TimeLeft>(() => compute(Date.now()));

  useEffect(() => {
    let frame = 0;
    let last = -1;
    const tick = () => {
      const now = Date.now();
      const sec = Math.floor(now / 1000);
      if (sec !== last) {
        last = sec;
        setTime(compute(now));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return time;
}
