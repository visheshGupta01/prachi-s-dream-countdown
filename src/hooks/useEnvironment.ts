import { useEffect, useState } from "react";

export type Environment = {
  isMobile: boolean;
  reducedMotion: boolean;
  /** particle density multiplier */
  density: number;
  hasPointer: boolean;
  ready: boolean;
};

export function useEnvironment(): Environment {
  const [env, setEnv] = useState<Environment>({
    isMobile: false,
    reducedMotion: false,
    density: 1,
    hasPointer: false,
    ready: false,
  });

  useEffect(() => {
    const compute = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const hasPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const cores = navigator.hardwareConcurrency ?? 4;
      const weak = cores <= 4;
      setEnv({
        isMobile,
        reducedMotion,
        hasPointer,
        density: reducedMotion ? 0.35 : isMobile ? (weak ? 0.4 : 0.55) : weak ? 0.75 : 1,
        ready: true,
      });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return env;
}
