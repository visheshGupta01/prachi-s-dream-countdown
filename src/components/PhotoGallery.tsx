import { motion } from "framer-motion";
import { config } from "@/config";
import { FloatingPhoto } from "./FloatingPhoto";

type Props = {
  onSelect: (src: string) => void;
  hasPointer?: boolean;
  reducedMotion?: boolean;
};

/** Scrapbook-style gallery: polaroids, a film strip and overlapping cards. */
export function PhotoGallery({ onSelect, hasPointer, reducedMotion }: Props) {
  const photos = config.galleryPhotos;

  return (
    <section className="relative mx-auto w-full max-w-6xl px-5 pb-32 pt-10 sm:px-8">
      {/* scrapbook cluster */}
      <div className="relative grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-3">
        {photos.slice(0, 6).map((src, i) => {
          const rotations = [-6, 4, -3, 7, -5, 3];
          const offsets = ["mt-0", "mt-10", "mt-4", "mt-14", "mt-2", "mt-12"];
          const scales = ["scale-100", "scale-95", "scale-105", "scale-95", "scale-100", "scale-105"];
          return (
            <FloatingPhoto
              key={src + i}
              src={src}
              rotate={rotations[i % rotations.length]}
              depth={0.25 + (i % 4) * 0.2}
              delay={i * 0.12}
              hasPointer={hasPointer}
              reducedMotion={reducedMotion}
              onClick={() => onSelect(src)}
              className={`${offsets[i % offsets.length]} ${scales[i % scales.length]}`}
            />
          );
        })}
      </div>

      {/* film strip */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="film-strip mt-24 flex gap-3 overflow-x-auto px-3 py-4 sm:gap-4"
      >
        {[...photos, ...photos.slice(0, 2)].map((src, i) => (
          <motion.button
            key={`film-${i}`}
            type="button"
            onClick={() => onSelect(src)}
            aria-label="Open photo"
            className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm sm:h-32 sm:w-28"
            whileHover={{ y: -6, scale: 1.06 }}
            whileTap={{ scale: 1.04 }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-90"
            />
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}
