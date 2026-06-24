export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Est-ce que le piercing fait mal ?",
    answer:
      "La sensation varie selon la zone et la sensibilité de chacun. La plupart de nos clients décrivent une pression brève plutôt qu'une vraie douleur. Nous prenons le temps d'expliquer chaque étape avant de commencer, pour que vous soyez serein.",
  },
  {
    question: "Combien de temps dure la cicatrisation ?",
    answer:
      "Cela dépend de l'emplacement : un lobe cicatrise en 6 à 8 semaines, tandis qu'un cartilage ou un nombril peut demander plusieurs mois. Nous vous remettons une fiche de suivi personnalisée après chaque pose.",
  },
  {
    question: "Quels bijoux utilisez-vous ?",
    answer:
      "Nous posons exclusivement des bijoux en titane chirurgical, acier 316L ou or, sans nickel, conformes aux normes en vigueur pour limiter tout risque d'allergie ou de rejet.",
  },
  {
    question: "Quels sont les conseils après un piercing ?",
    answer:
      "Nettoyer le piercing avec une solution saline deux fois par jour, éviter de le manipuler avec les mains sales, ne pas le retirer pendant la phase de cicatrisation et éviter piscine, mer et sauna les premières semaines.",
  },
  {
    question: "Puis-je changer mon bijou rapidement ?",
    answer:
      "Il est recommandé d'attendre la fin de la cicatrisation complète avant de changer de bijou, pour éviter tout risque d'irritation. Nous pouvons réaliser ce changement pour vous en studio en toute sécurité.",
  },
];

export interface Testimonial {
  name: string;
  rating: number;
  comment: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah",
    rating: 5,
    comment:
      "Accueil incroyable, hygiène irréprochable et un geste très précis. Mon hélix a cicatrisé sans aucun souci.",
  },
  {
    name: "Imene",
    rating: 5,
    comment:
      "J'avais peur pour mon septum, l'équipe m'a mise tellement à l'aise. Le résultat est magnifique.",
  },
  {
    name: "Lina",
    rating: 5,
    comment:
      "Le studio est superbe, tout est pensé pour qu'on se sente en confiance. Je recommande à 100%.",
  },
  {
    name: "Yasmine",
    rating: 5,
    comment:
      "Des bijoux de très belle qualité et des conseils précieux après la pose. Une vraie référence à Oran.",
  },
  {
    name: "Nour",
    rating: 5,
    comment:
      "Rendez-vous pris en ligne en deux minutes, ponctualité parfaite et un travail très soigné.",
  },
];
