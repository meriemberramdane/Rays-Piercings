import { useState } from "react";
import { CheckCircle2, MessageCircle, Mail } from "lucide-react";
import { Modal } from "./Modal";
import { FieldWrap, TextInput, TextArea } from "./FormFields";
import type { Product } from "../data/products";
import { buildWhatsAppLink, buildMailtoLink } from "../data/contact";
import { notifyOwnerByEmail } from "../data/notify";

interface OrderModalProps {
  product: Product | null;
  onClose: () => void;
}

export function OrderModal({ product, onClose }: OrderModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  const reset = () => {
    setName("");
    setPhone("");
    setQuantity(1);
    setComment("");
    setSent(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const buildMessage = () => {
    return `Bonjour Rays Piercing, je souhaite commander :

Produit : ${product?.name}
Prix unitaire : ${product?.price} DA
Quantité : ${quantity}

Nom complet : ${name}
Téléphone : ${phone}
Commentaire : ${comment || "—"}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    notifyOwnerByEmail({
      type: "Commande",
      fromName: name,
      fromPhone: phone,
      message: buildMessage(),
    });
    setSent(true);
  };

  if (!product) return null;

  return (
    <Modal open={!!product} onClose={handleClose} title={sent ? "Commande envoyée" : "Commander"}>
      {sent ? (
        <div className="flex flex-col items-center text-center gap-4 py-2">
          <CheckCircle2 size={44} className="text-silver" />
          <p className="text-bone-dim text-sm leading-relaxed">
            Votre demande de commande a bien été préparée. Choisissez comment
            l'envoyer pour que nous puissions la confirmer rapidement.
          </p>
          <div className="flex flex-col w-full gap-3 mt-2">
            <a
              href={buildWhatsAppLink(buildMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-ink text-sm font-medium hover:bg-silver-light transition-colors"
            >
              <MessageCircle size={16} /> Envoyer sur WhatsApp
            </a>
            <a
              href={buildMailtoLink(`Commande — ${product.name}`, buildMessage())}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/15 text-white text-sm hover:border-silver/50 transition-colors"
            >
              <Mail size={16} /> Envoyer par e-mail
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-5 p-4 rounded-xl bg-ink-soft border border-white/[0.06]">
            <p className="text-sm text-white font-medium mb-0.5">{product.name}</p>
            <p className="text-xs text-bone-faint">{product.material}</p>
            <p className="font-mono text-sm text-silver mt-2">{product.price} DA</p>
          </div>

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

          <FieldWrap label="Quantité" required>
            <TextInput
              required
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </FieldWrap>

          <FieldWrap label="Commentaire (optionnel)">
            <TextArea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Précisions, gravure, couleur souhaitée..."
            />
          </FieldWrap>

          <button
            type="submit"
            className="w-full mt-2 px-5 py-3.5 rounded-full bg-white text-ink text-sm font-medium hover:bg-silver-light transition-colors"
          >
            Continuer
          </button>
        </form>
      )}
    </Modal>
  );
}
