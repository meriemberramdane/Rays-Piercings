/**
 * Configuration EmailJS — notifications automatiques par e-mail.
 *
 * Pour activer l'envoi automatique d'e-mail à chaque réservation ou commande,
 * crée un compte gratuit sur https://www.emailjs.com puis renseigne les 3
 * valeurs ci-dessous (voir README.md pour le guide pas-à-pas complet).
 *
 * Tant que ces valeurs ne sont pas renseignées, le site fonctionne
 * normalement : seul l'envoi WhatsApp/email manuel reste actif, la
 * notification automatique est simplement ignorée (aucune erreur visible
 * pour le client).
 */
export const EMAILJS_CONFIG = {
  serviceId: "", // ex: "service_abc1234"
  templateId: "", // ex: "template_xyz5678"
  publicKey: "", // ex: "AbCdEfGhIjKlMnOp"
};

export const isEmailJsConfigured =
  EMAILJS_CONFIG.serviceId.length > 0 &&
  EMAILJS_CONFIG.templateId.length > 0 &&
  EMAILJS_CONFIG.publicKey.length > 0;
