import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "../data/content";
import { Reveal } from "../components/Reveal";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[index];

  return (
    <section className="relative py-28 lg:py-36 bg-ink overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <Reveal className="mb-14">
          <p className="font-mono text-xs uppercase tracking-widest2 text-silver mb-4">
            Avis clients
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-white">
            Ils nous ont fait <span className="font-display-italic">confiance</span>
          </h2>
        </Reveal>

        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-5"
            >
              <div className="flex gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-silver fill-silver" />
                ))}
              </div>
              <p className="font-display-italic text-xl sm:text-2xl text-white leading-relaxed max-w-xl">
                « {current.comment} »
              </p>
              <span className="font-mono text-xs uppercase tracking-widest2 text-bone-faint">
                {current.name}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Voir le témoignage ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-silver" : "w-3 bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
