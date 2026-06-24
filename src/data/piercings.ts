export type PainLevel = 1 | 2 | 3 | 4 | 5;

export interface PiercingType {
  id: string;
  name: string;
  zone: string;
  description: string;
  healing: string;
  pain: PainLevel;
  image?: string;
}

export const piercings: PiercingType[] = [
  {
    id: "lobe",
    name: "Lobe",
    zone: "Oreille",
    description:
      "Le piercing le plus classique et le plus accessible. Discret ou multiplié, il se décline à l'infini selon vos envies.",
    healing: "6 à 8 semaines",
    pain: 1,
  },
  {
    id: "helix",
    name: "Hélix",
    zone: "Oreille",
    description:
      "Posé sur le cartilage supérieur de l'oreille, il apporte une touche élégante et facilement personnalisable.",
    healing: "3 à 6 mois",
    pain: 2,
  },
  {
    id: "tragus",
    name: "Tragus",
    zone: "Oreille",
    description:
      "Sur la petite saillie de cartilage devant le conduit auditif. Discret, il structure joliment l'oreille.",
    healing: "3 à 9 mois",
    pain: 2,
  },
  {
    id: "conch",
    name: "Conch",
    zone: "Oreille",
    description:
      "Placé dans le creux central de l'oreille, il offre une grande surface pour des bijoux audacieux.",
    healing: "4 à 9 mois",
    pain: 3,
  },
  {
    id: "daith",
    name: "Daith",
    zone: "Oreille",
    description:
      "Traverse le pli cartilagineux interne de l'oreille. Très tendance, il se porte avec un anneau fin.",
    healing: "4 à 9 mois",
    pain: 3,
  },
  {
    id: "rook",
    name: "Rook",
    zone: "Oreille",
    description:
      "Sur le repli cartilagineux entre le haut de l'oreille et le conch. Pour un look affirmé et original.",
    healing: "4 à 9 mois",
    pain: 3,
  },
  {
    id: "industrial",
    name: "Industrial",
    zone: "Oreille",
    description:
      "Double perforation reliée par une longue barre droite, généralement entre deux hélix. Un statement fort.",
    healing: "6 à 12 mois",
    pain: 4,
  },
  {
    id: "nostril",
    name: "Nostril",
    zone: "Nez",
    description:
      "Le piercing de narine classique, en anneau ou en clou. Subtil et intemporel.",
    healing: "2 à 4 mois",
    pain: 2,
  },
  {
    id: "septum",
    name: "Septum",
    zone: "Nez",
    description:
      "Posé dans la fine cloison entre les narines. Discrètement retourné ou pleinement assumé, il a beaucoup de caractère.",
    healing: "2 à 4 mois",
    pain: 3,
  },
  {
    id: "labret",
    name: "Labret",
    zone: "Bouche",
    description:
      "Sous la lèvre inférieure. Un piercing facial moderne qui demande une attention particulière en cicatrisation.",
    healing: "6 à 8 semaines",
    pain: 2,
  },
  {
    id: "navel",
    name: "Nombril",
    zone: "Corps",
    description:
      "Le piercing emblématique de l'été, posé sur le repli supérieur du nombril.",
    healing: "6 à 12 mois",
    pain: 2,
  },
  {
    id: "nipple",
    name: "Téton",
    zone: "Corps",
    description:
      "Réalisé dans un cadre strictement hygiénique et confidentiel, avec un accompagnement personnalisé.",
    healing: "4 à 9 mois",
    pain: 3,
  },
  {
    id: "autres",
    name: "Autres demandes",
    zone: "Sur mesure",
    description:
      "Une envie particulière, un emplacement spécifique ? Parlons-en ensemble lors de votre rendez-vous.",
    healing: "Variable",
    pain: 3,
  },
];
