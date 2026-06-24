import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG, isEmailJsConfigured } from "./emailjs.config";
import { CONTACT } from "./contact";

interface NotifyParams {
  type: "Réservation" | "Commande";
  fromName: string;
  fromPhone: string;
  message: string;
}

/**
 * Envoie une notification e-mail silencieuse à Rays Piercings.
 * N'affecte jamais l'expérience du client : aucune erreur n'est montrée
 * à l'écran si l'envoi échoue ou si EmailJS n'est pas encore configuré.
 */
export function notifyOwnerByEmail({ type, fromName, fromPhone, message }: NotifyParams) {
  if (!isEmailJsConfigured) return;

  emailjs
    .send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        to_email: CONTACT.email,
        request_type: type,
        from_name: fromName,
        from_phone: fromPhone,
        message,
      },
      { publicKey: EMAILJS_CONFIG.publicKey }
    )
    .catch(() => {
      // Échec silencieux : le client garde son flux WhatsApp/email normal.
    });
}
