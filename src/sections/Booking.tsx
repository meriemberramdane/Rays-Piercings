import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Mail } from "lucide-react";
import { piercings } from "../data/piercings";
import { Reveal } from "../components/Reveal";
import { FieldWrap, TextInput, TextArea, SelectInput } from "../components/FormFields";
import { buildWhatsAppLink, buildMailtoLink } from "../data/contact";
import { notifyOwnerByEmail } from "../data/notify";
import { RingMark } from "../components/RingMark";

export function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [piercingType, setPiercingType] = useState(piercings[0].name);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  const buildMessage = () => {
    return `Bonjour Rays Piercing, je souhaite prendre rendez-vous :

Nom complet : ${name}
Téléphone : ${phone}
Type de piercing : ${piercingType}
Date souhaitée : ${date}
Heure souhaitée : ${time}
Commentaire : ${comment || "—"}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    notifyOwnerByEmail({
      type: "Réservation",
      fromName: name,
      fromPhone: phone,
      message: buildMessage(),
    });
    setSent(true);
  };

  return (
    <section id="reserver" className="relative py-28 lg:py-36 bg-ink-soft overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-silver/[0.03] blur-[140px] -z-0" />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-widest2 text-silver mb-4">
            Réservation
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-5">
            Prendre <span className="font-display-italic">rendez-vous</span>
          </h2>
          <p className="text-bone-dim max-w-md mx-auto">
            Remplissez le formulaire ci-dessous, nous vous recontactons
            rapidement pour confirmer votre créneau.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-ink-card border border-white/[0.06] p-7 sm:p-10">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-5 py-6"
              >
                <RingMark size={40} className="animate-spin-slow" />
                <CheckCircle2 size={40} className="text-silver -mt-2" />
                <h3 className="font-display text-2xl text-white">
                  Demande envoyée
                </h3>
                <p className="text-bone-dim text-sm max-w-sm leading-relaxed">
                  Votre demande de rendez-vous a bien été envoyée. Nous vous
                  contacterons rapidement pour confirmer votre réservation.
                </p>
                <div className="flex flex-col sm:flex-row w-full gap-3 mt-2">
                  <a
                    href={buildWhatsAppLink(buildMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-ink text-sm font-medium hover:bg-silver-light transition-colors"
                  >
                    <MessageCircle size={16} /> Confirmer sur WhatsApp
                  </a>
                  <a
                    href={buildMailtoLink("Demande de rendez-vous", buildMessage())}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/15 text-white text-sm hover:border-silver/50 transition-colors"
                  >
                    <Mail size={16} /> Par e-mail
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-x-5">
                  <FieldWrap label="Nom complet" required>
                    <TextInput
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom et prénom"
                    />
                  </FieldWrap>
                  <FieldWrap label="Numéro de téléphone" required>
                    <TextInput
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0XX XX XX XX XX"
                    />
                  </FieldWrap>
                </div>

                <FieldWrap label="Type de piercing" required>
                  <SelectInput
                    value={piercingType}
                    onChange={(e) => setPiercingType(e.target.value)}
                  >
                    {piercings.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </SelectInput>
                </FieldWrap>

                <div className="grid sm:grid-cols-2 gap-x-5">
                  <FieldWrap label="Date souhaitée" required>
                    <TextInput
                      required
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </FieldWrap>
                  <FieldWrap label="Heure souhaitée" required>
                    <TextInput
                      required
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </FieldWrap>
                </div>

                <FieldWrap label="Commentaire (optionnel)">
                  <TextArea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Une précision à nous communiquer ?"
                  />
                </FieldWrap>

                <button
                  type="submit"
                  className="w-full mt-2 px-5 py-3.5 rounded-full bg-white text-ink text-sm font-medium hover:bg-silver-light transition-colors"
                >
                  Envoyer ma demande
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
