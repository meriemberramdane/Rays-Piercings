import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface LightboxProps {
  items: { label: string; src?: string }[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, activeIndex, onClose, onNavigate }: LightboxProps) {
  if (activeIndex === null) return null;

  const prev = () => onNavigate((activeIndex - 1 + items.length) % items.length);
  const next = () => onNavigate((activeIndex + 1) % items.length);

  return (
    <AnimatePresence>
      {activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-md flex items-center justify-center px-6"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
            aria-label="Fermer"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 sm:left-8 text-white/70 hover:text-white transition-colors p-2"
            aria-label="Image précédente"
          >
            <ChevronLeft size={32} />
          </button>

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg"
          >
            <ImagePlaceholder
              label={items[activeIndex].label}
              src={items[activeIndex].src}
              ratio="aspect-square"
              className="rounded-2xl"
            />
          </motion.div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 sm:right-8 text-white/70 hover:text-white transition-colors p-2"
            aria-label="Image suivante"
          >
            <ChevronRight size={32} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
