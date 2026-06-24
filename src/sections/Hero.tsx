import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RingHero } from "../components/RingMark";

export function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20"
    >
      {/* Arrière-plan animé */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-ink" />
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-silver/[0.04] blur-[120px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 noise-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />
      </div>

      <div className="relative max-w-7xl w-full mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Texte */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-mono text-xs uppercase tracking-widest2 text-silver mb-6"
          >
            Studio de piercing — Oran
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-6xl sm:text-7xl lg:text-8xl text-white leading-[0.95] mb-6"
          >
            Rays
            <br />
            <span className="font-display-italic text-gradient-silver">
              Piercings
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg sm:text-xl text-bone-dim max-w-md mx-auto lg:mx-0 mb-3"
          >
            Votre studio de piercing moderne à Oran.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-base text-bone-faint max-w-md mx-auto lg:mx-0 mb-10"
          >
            Des piercings réalisés avec précision, dans le respect des normes
            d'hygiène et avec des bijoux de qualité.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={() => scrollTo("#reserver")}
              className="px-8 py-3.5 rounded-full bg-white text-ink font-medium text-sm hover:bg-silver-light transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto"
            >
              Prendre rendez-vous
            </button>
            <button
              onClick={() => scrollTo("#piercings")}
              className="px-8 py-3.5 rounded-full border border-white/20 text-white text-sm hover:border-silver/60 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto"
            >
              Voir nos réalisations
            </button>
          </motion.div>
        </div>

        {/* Anneau signature */}
        <div className="order-1 lg:order-2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)`,
              transition: "transform 0.4s ease-out",
            }}
            className="relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="animate-float"
            >
              <RingHero size={380} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone-faint">
          Découvrir
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-silver to-transparent"
        />
      </motion.div>
    </section>
  );
}
