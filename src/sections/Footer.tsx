import { RingMark } from "../components/RingMark";
import { CONTACT } from "../data/contact";

const quickLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Nos Piercings", href: "#piercings" },
  { label: "Boutique", href: "#boutique" },
  { label: "Réserver", href: "#reserver" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-ink border-t border-white/[0.06] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          <div>
            <a href="#accueil" onClick={(e) => { e.preventDefault(); scrollTo("#accueil"); }} className="flex items-center gap-2.5 mb-4">
              <RingMark size={24} />
              <span className="font-display italic text-lg text-white">
                Rays Piercing
              </span>
            </a>
            <p className="text-sm text-bone-faint leading-relaxed max-w-xs">
              Studio de piercing moderne à Oran. Précision, hygiène et bijoux
              de qualité.
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone-faint block mb-4">
              Liens rapides
            </span>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-sm text-bone-dim hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone-faint block mb-4">
              Contact
            </span>
            <ul className="flex flex-col gap-2.5 text-sm text-bone-dim">
              <li>{CONTACT.phone}</li>
              <li>{CONTACT.instagram}</li>
              <li>{CONTACT.city}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-bone-faint">
            © {year} Rays Piercing. Tous droits réservés.
          </span>
          <span className="text-xs text-bone-faint">Oran, Algérie</span>
        </div>
      </div>
    </footer>
  );
}
