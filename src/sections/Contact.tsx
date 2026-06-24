import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { InstagramIcon, RingMark } from "../components/RingMark";
import { CONTACT, buildCallLink, buildWhatsAppLink } from "../data/contact";
import { Reveal } from "../components/Reveal";

export function Contact() {
  return (
    <section id="contact" className="relative py-28 lg:py-36 bg-ink-soft overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-silver/[0.03] blur-[120px] -z-0" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <Reveal>
          <RingMark size={36} className="mx-auto mb-6 opacity-80" />
          <p className="font-mono text-xs uppercase tracking-widest2 text-silver mb-4">
            Contact
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-5">
            Parlons de votre <span className="font-display-italic">prochain piercing</span>
          </h2>
          <p className="text-bone-dim flex items-center justify-center gap-2 mb-12">
            <MapPin size={16} className="text-silver" /> {CONTACT.city}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <motion.a
              href={buildCallLink()}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-ink-card border border-white/[0.06] hover:border-silver/30 transition-colors"
            >
              <Phone size={22} className="text-silver" />
              <span className="text-sm text-white font-medium">Appeler</span>
              <span className="text-xs text-bone-faint">{CONTACT.phone}</span>
            </motion.a>

            <motion.a
              href={buildWhatsAppLink("Bonjour Rays Piercing, j'aimerais avoir des informations.")}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-ink-card border border-white/[0.06] hover:border-silver/30 transition-colors"
            >
              <MessageCircle size={22} className="text-silver" />
              <span className="text-sm text-white font-medium">WhatsApp</span>
              <span className="text-xs text-bone-faint">Réponse rapide</span>
            </motion.a>

            <motion.a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-ink-card border border-white/[0.06] hover:border-silver/30 transition-colors"
            >
              <InstagramIcon size={22} className="text-silver" />
              <span className="text-sm text-white font-medium">Instagram</span>
              <span className="text-xs text-bone-faint">{CONTACT.instagram}</span>
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
