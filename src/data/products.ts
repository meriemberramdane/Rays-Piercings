export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  material: string;
  description: string;
  image?: string;
}

export const productCategories = [
  "Anneaux",
  "Barres",
  "Clickers",
  "Bijoux nombril",
  "Bijoux nez",
  "Bijoux oreille",
] as const;

export const products: Product[] = [
  {
    id: "p1",
    name: "Anneau Saturne",
    category: "Anneaux",
    price: 2800,
    material: "Titane chirurgical",
    description: "Anneau fin à charnière, parfait pour septum ou hélix.",
  },
  {
    id: "p2",
    name: "Anneau Lune",
    category: "Anneaux",
    price: 3200,
    material: "Or 14 carats",
    description: "Finition douce, idéal pour un port quotidien discret.",
  },
  {
    id: "p3",
    name: "Barre Stellaire",
    category: "Barres",
    price: 2400,
    material: "Titane chirurgical",
    description: "Barre droite avec embouts sertis, pensée pour l'industrial.",
  },
  {
    id: "p4",
    name: "Barre Comète",
    category: "Barres",
    price: 2600,
    material: "Acier chirurgical 316L",
    description: "Embout zirconium, légère et résistante au quotidien.",
  },
  {
    id: "p5",
    name: "Clicker Aurora",
    category: "Clickers",
    price: 3600,
    material: "Titane PVD",
    description: "Fermeture clic discrète, serti de pierres fines.",
  },
  {
    id: "p6",
    name: "Clicker Eclipse",
    category: "Clickers",
    price: 4200,
    material: "Or 14 carats",
    description: "Design épuré en forme de croissant, pour conch ou daith.",
  },
  {
    id: "p7",
    name: "Bijou nombril Étoile filante",
    category: "Bijoux nombril",
    price: 3000,
    material: "Titane chirurgical",
    description: "Pendentif fin orné d'un cristal, mouvement délicat.",
  },
  {
    id: "p8",
    name: "Bijou nombril Goutte",
    category: "Bijoux nombril",
    price: 2700,
    material: "Acier chirurgical 316L",
    description: "Forme minimaliste en goutte, finition polie miroir.",
  },
  {
    id: "p9",
    name: "Clou de nez Étincelle",
    category: "Bijoux nez",
    price: 1800,
    material: "Titane chirurgical",
    description: "Micro-zirconium serti, pour un éclat discret au quotidien.",
  },
  {
    id: "p10",
    name: "Anneau de nez Fin",
    category: "Bijoux nez",
    price: 1600,
    material: "Or 14 carats",
    description: "Diamètre fin et confortable, pensé pour nostril ou septum.",
  },
  {
    id: "p11",
    name: "Set Hélix Constellation",
    category: "Bijoux oreille",
    price: 4800,
    material: "Titane chirurgical",
    description: "Trio de petits clous sertis pour composer votre oreille.",
  },
  {
    id: "p12",
    name: "Créole Cartilage Mini",
    category: "Bijoux oreille",
    price: 2200,
    material: "Acier chirurgical 316L",
    description: "Petite créole légère, idéale pour tragus ou hélix.",
  },
];
