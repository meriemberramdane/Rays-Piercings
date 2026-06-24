import { ShieldCheck, Syringe, Sparkles, FlaskConical, ClipboardList } from "lucide-react";
import { Reveal } from "../components/Reveal";

const hygienePoints = [
  {
    icon: Syringe,
    title: "Aiguilles à usage unique",
    text: "Chaque aiguille est neuve, stérile et utilisée une seule fois avant d'être jetée dans un container sécurisé.",
  },
  {
    icon: FlaskConical,
    title: "Matériel stérilisé",
    text: "Nos instruments réutilisables sont systématiquement stérilisés selon un protocole validé.",
  },
  {
    icon: Sparkles,
    title: "Désinfection rigoureuse",
    text: "Chaque poste de travail est désinfecté avant et après chaque client, sans exception.",
  },
  {
    icon: ShieldCheck,
    title: "Normes d'hygiène respectées",
    text: "Nous suivons les standards professionnels du secteur pour votre sécurité et la nôtre.",
  },
  {
    icon: ClipboardList,
    title: "Suivi personnalisé",
    text: "Une fiche de conseils adaptée à votre piercing vous est remise après chaque pose.",
  },
];

export function Hygiene() {
  return (
    <section className="relative py-28 lg:py-36 bg-ink-soft">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16 max-w-2xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest2 text-silver mb-4">
            Hygiène &amp; sécurité
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-5">
            Votre sécurité, <span className="font-display-italic">notre priorité</span>
          </h2>
          <p className="text-bone-dim">
            Chaque geste est encadré par un protocole strict, pensé pour
            garantir votre confiance du premier au dernier rendez-vous.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {hygienePoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <Reveal key={point.title} delay={i * 0.07} className="lg:col-span-1 sm:col-span-1">
                <div className="h-full p-6 rounded-2xl bg-ink-card border border-white/[0.06] hover:border-silver/25 transition-colors duration-300">
                  <div className="w-11 h-11 rounded-full bg-white/[0.05] flex items-center justify-center mb-5">
                    <Icon size={20} className="text-silver" />
                  </div>
                  <h3 className="font-display text-base text-white mb-2 leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-xs text-bone-dim leading-relaxed">
                    {point.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
