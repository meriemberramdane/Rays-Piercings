import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqItems } from "../data/content";
import { Reveal } from "../components/Reveal";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 lg:py-36 bg-ink">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest2 text-silver mb-4">
            Questions fréquentes
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-white">
            Tout <span className="font-display-italic">savoir</span>
          </h2>
        </Reveal>

        <div className="flex flex-col gap-3">
          {faqItems.map((item, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={i} delay={i * 0.05} y={14}>
                <div className="rounded-2xl bg-ink-card border border-white/[0.06] overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-display text-lg text-white">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 text-silver"
                    >
                      <Plus size={20} />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <p className="px-6 pb-6 text-sm text-bone-dim leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
