import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import { config } from "@/config";
import { useCountdown } from "@/hooks/useCountdown";
import { useEnvironment } from "@/hooks/useEnvironment";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Countdown } from "@/components/Countdown";
import { MainPhoto } from "@/components/MainPhoto";
import { FloatingPhoto } from "@/components/FloatingPhoto";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Lightbox } from "@/components/Lightbox";
import { CursorEffects } from "@/components/CursorEffects";
import { LoadingIntro } from "@/components/LoadingIntro";
import { BirthdayCelebration } from "@/components/BirthdayCelebration";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Counting down to ${config.name}'s Birthday — 13 September 2026` },
      {
        name: "description",
        content:
          "A dreamy animated countdown to 13 September 2026, with starlit skies, floating photographs and a little bit of magic.",
      },
      { property: "og:title", content: `Counting down to ${config.name}'s Birthday` },
      {
        property: "og:description",
        content: "A dreamy animated birthday countdown with starlit skies and floating photographs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const time = useCountdown();
  const env = useEnvironment();
  const [intro, setIntro] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!config.backgroundMusic) return;

    const audio = new Audio(config.backgroundMusic);
    audio.loop = true;
    audioRef.current = audio;

    // Start playing on first click/tap anywhere on the screen
    const handleFirstInteraction = () => {
      audio.play().catch((err) => {
        console.warn("Autoplay was prevented:", err);
      });
      window.removeEventListener("pointerdown", handleFirstInteraction);
    };

    window.addEventListener("pointerdown", handleFirstInteraction);

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setIntro(false), config.introDurationMs);
    return () => window.clearTimeout(t);
  }, []);

  const celebrating = time.isOver;
  const floaters = config.galleryPhotos;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-starlight">
      <AnimatedBackground
        density={env.density}
        reducedMotion={env.reducedMotion}
        celebrating={celebrating}
      />
      <LoadingIntro show={intro} />
      {env.ready && <CursorEffects hasPointer={env.hasPointer} reducedMotion={env.reducedMotion} />}
      <BirthdayCelebration active={celebrating} reducedMotion={env.reducedMotion} />

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col items-center justify-center gap-10 px-5 py-16 sm:px-8 lg:flex-row lg:justify-between lg:gap-14">
        {/* decorative floating photos (desktop only, kept clear of the countdown) */}
        {env.hasPointer &&
          !celebrating && (
            <>
              <FloatingPhoto
                src={floaters[0]}
                className="pointer-events-auto absolute left-[2%] top-[14%] hidden w-28 xl:block"
                rotate={-8}
                depth={0.9}
                delay={0.4}
                hasPointer
                reducedMotion={env.reducedMotion}
                onClick={() => setSelected(floaters[0])}
              />
              <FloatingPhoto
                src={floaters[2]}
                className="pointer-events-auto absolute bottom-[8%] left-[6%] hidden w-24 xl:block"
                rotate={6}
                depth={0.55}
                delay={0.7}
                hasPointer
                reducedMotion={env.reducedMotion}
                onClick={() => setSelected(floaters[2])}
              />
              <FloatingPhoto
                src={floaters[4]}
                className="pointer-events-auto absolute right-[3%] top-[10%] hidden w-24 xl:block"
                rotate={9}
                depth={0.75}
                delay={0.9}
                hasPointer
                reducedMotion={env.reducedMotion}
                onClick={() => setSelected(floaters[4])}
              />
            </>
          )}

        {/* photo: above the countdown on mobile, beside it on desktop */}
        <motion.div
          className="order-1 w-full lg:order-2 lg:w-[42%]"
          animate={{ opacity: intro ? 0 : 1 }}
          transition={{ duration: 1.2 }}
        >
          <MainPhoto
            hasPointer={env.hasPointer}
            reducedMotion={env.reducedMotion}
            celebrating={celebrating}
          />
        </motion.div>

        <div className="order-2 w-full lg:order-1 lg:w-[56%]">
          <AnimatePresence mode="wait">
            {!celebrating ? (
              <motion.div
                key="countdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -40, filter: "blur(14px)", scale: 0.96 }}
                transition={{ duration: 1 }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="mb-6 text-center text-[0.62rem] uppercase tracking-[0.55em] text-lavender/70 sm:text-xs lg:text-left"
                >
                  13 · 09 · 2026
                </motion.p>
                <Countdown time={time} reducedMotion={env.reducedMotion} />
              </motion.div>
            ) : (
              <motion.div
                key="celebrate"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex min-h-[10rem] items-center justify-center"
              >
                {/* ── SLOT: birthday message goes here later ── */}
                <span className="font-display text-5xl text-glow sm:text-7xl">✦</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── SCROLL: floating photographs ───────────────────── */}
      <PhotoGallery
        onSelect={setSelected}
        hasPointer={env.hasPointer}
        reducedMotion={env.reducedMotion}
      />

      <Lightbox src={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
