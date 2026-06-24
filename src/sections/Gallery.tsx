import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { InstagramIcon } from "../components/RingMark";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { Lightbox } from "../components/Lightbox";
import { Reveal } from "../components/Reveal";

const galleryItems: { label: string; src?: string }[] = [
  { label: "Septum — pose" },
  { label: "Hélix double" },
  { label: "Avant / après — lobe" },
  { label: "Nombril — clicker argenté" },
  { label: "Conch — anneau" },
  { label: "Daith — finition" },
  { label: "Tragus — clou serti" },
  { label: "Industrial — barre droite" },
  { label: "Nostril — anneau fin" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="galerie" className="relative py-28 lg:py-36 bg-ink-soft">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest2 text-silver mb-4">
              Réalisations
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white">
              Notre <span className="font-display-italic">galerie</span>
            </h2>
          </div>
          <a
            href="https://instagram.com/rayspiercing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-bone-dim hover:text-white transition-colors group"
          >
            <InstagramIcon size={18} className="group-hover:text-silver transition-colors" />
            @rayspiercing
          </a>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {galleryItems.map((item, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06} y={16}>
              <motion.button
                onClick={() => setActive(i)}
                whileHover={{ scale: 0.98 }}
                className="relative w-full group overflow-hidden rounded-xl"
              >
                <ImagePlaceholder label={item.label} src={item.src} ratio="aspect-square" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <Search
                    size={22}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox
        items={galleryItems}
        activeIndex={active}
        onClose={() => setActive(null)}
        onNavigate={setActive}
      />
    </section>
  );
}
