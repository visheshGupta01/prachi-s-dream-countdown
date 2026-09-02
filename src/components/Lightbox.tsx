import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type Props = { src: string | null; onClose: () => void };

export function Lightbox({ src, onClose }: Props) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-midnight/80 backdrop-blur-xl" />
          <motion.img
            layout
            src={src}
            alt=""
            className="relative max-h-[86vh] w-auto max-w-[92vw] rounded-2xl object-contain shadow-dreamy"
            initial={{ scale: 0.82, opacity: 0, filter: "blur(14px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.88, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo"
            className="absolute right-5 top-5 z-10 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-md transition hover:bg-white/20"
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
