export const CONTACT = {
  phone: "+213 559 03 00 84",
  phoneRaw: "213559030084",
  email: "meriemberramdane98@gmail.com",
  instagram: "@rayspiercing",
  instagramUrl: "https://instagram.com/rayspiercing",
  city: "Oran, Algérie",
};

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.phoneRaw}?text=${encoded}`;
}

export function buildMailtoLink(subject: string, body: string) {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${CONTACT.email}?subject=${encodedSubject}&body=${encodedBody}`;
}

export function buildCallLink() {
  return `tel:${CONTACT.phoneRaw}`;
}
