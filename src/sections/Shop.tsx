import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useProductsData } from "../hooks/useProductsData";
import type { Product } from "../data/products";
import { ImagePlaceholder } from "../components/ImagePlaceholder";
import { OrderModal } from "../components/OrderModal";
import { Reveal } from "../components/Reveal";

export function Shop() {
  const { items: products } = useProductsData();
  const [filter, setFilter] = useState<string>("Tous");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const filtered =
    filter === "Tous" ? products : products.filter((p) => p.category === filter);

  return (
    <section id="boutique" className="relative py-28 lg:py-36 bg-ink">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-widest2 text-silver mb-4">
            Boutique
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-5">
            Nos <span className="font-display-italic">bijoux</span>
          </h2>
          <p className="text-bone-dim max-w-xl mx-auto">
            Titane chirurgical, acier 316L et or — une sélection pensée pour
            accompagner chaque étape de votre cicatrisation.
          </p>
        </Reveal>

        <Reveal className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-10 no-scrollbar justify-start lg:justify-center">
          {["Tous", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                filter === cat
                  ? "bg-white text-ink border-white"
                  : "border-white/15 text-bone-dim hover:text-white hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <Reveal key={product.id} delay={(i % 3) * 0.07}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl overflow-hidden bg-ink-card border border-white/[0.06] hover:border-silver/30 transition-colors h-full flex flex-col"
              >
                <ImagePlaceholder
                  label={product.name}
                  ratio="aspect-square"
                  src={product.image}
                  className="group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display text-lg text-white leading-snug">
                      {product.name}
                    </h3>
                    <span className="font-mono text-sm text-silver shrink-0">
                      {product.price} DA
                    </span>
                  </div>
                  <p className="text-xs text-bone-faint uppercase tracking-wide mb-3">
                    {product.material}
                  </p>
                  <p className="text-sm text-bone-dim leading-relaxed mb-5 flex-1">
                    {product.description}
                  </p>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full px-4 py-2.5 rounded-full border border-white/15 text-white text-sm hover:bg-white hover:text-ink hover:border-white transition-all duration-300"
                  >
                    Commander
                  </button>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>

      <OrderModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
