import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { RingMark } from "./RingMark";

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "Nos Piercings", href: "#piercings" },
  { label: "Boutique", href: "#boutique" },
  { label: "Réserver", href: "#reserver" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-5 lg:px-10 flex items-center justify-between rounded-2xl transition-all duration-500 ${
          scrolled ? "glass border border-white/[0.06] shadow-glow-sm" : ""
        }`}
        style={{ padding: scrolled ? "0.65rem 1.25rem" : "0.4rem 0" }}
      >
        <a
          href="#accueil"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#accueil");
          }}
          className="flex items-center gap-2.5 group"
        >
          <RingMark size={26} className="group-hover:rotate-180 transition-transform duration-700" />
          <span className="font-display italic text-lg text-white tracking-wide">
            Rays Piercings
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-sm text-bone-dim hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-silver group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <a
          href="#reserver"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#reserver");
          }}
          className="hidden lg:inline-flex items-center px-5 py-2 rounded-full border border-silver/30 text-sm text-white hover:bg-silver/10 hover:border-silver/60 transition-all duration-300"
        >
          Prendre rendez-vous
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden mx-4 mt-2 overflow-hidden glass border border-white/[0.06] rounded-2xl"
          >
            <nav className="flex flex-col p-5 gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="py-3 text-bone-dim hover:text-white transition-colors border-b border-white/5 last:border-none"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reserver"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("#reserver");
                }}
                className="mt-3 text-center px-5 py-3 rounded-full border border-silver/30 text-white"
              >
                Prendre rendez-vous
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
