import { motion } from "framer-motion";
import { usePiercingsData } from "../hooks/usePiercingsData";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { PainScale } from "../components/PainScale";
import { Reveal } from "../components/Reveal";
import { RingDivider } from "../components/RingMark";

export function Piercings() {
  const { items: piercings } = usePiercingsData();

  return (
    <section id="piercings" className="relative py-28 lg:py-36 bg-ink">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-widest2 text-silver mb-4">
            Notre savoir-faire
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-5">
            Nos <span className="font-display-italic">piercings</span>
          </h2>
          <p className="text-bone-dim max-w-xl mx-auto">
            Treize emplacements, un même niveau d'exigence. Chaque piercing
            est réalisé selon un protocole strict et adapté à votre anatomie.
          </p>
          <RingDivider className="mt-8" />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {piercings.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group rounded-2xl overflow-hidden bg-ink-card border border-white/[0.06] hover:border-silver/30 transition-colors duration-300 h-full flex flex-col"
              >
                <ImagePlaceholder
                  label={`${p.name} — ${p.zone}`}
                  ratio="aspect-[4/3]"
                  src={p.image}
                  className="group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-display text-xl text-white">
                      {p.name}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone-faint">
                      {p.zone}
                    </span>
                  </div>
                  <p className="text-sm text-bone-dim leading-relaxed mb-5 flex-1">
                    {p.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone-faint block mb-1">
                        Cicatrisation
                      </span>
                      <span className="text-sm text-white">{p.healing}</span>
                    </div>
                    <PainScale level={p.pain} />
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
