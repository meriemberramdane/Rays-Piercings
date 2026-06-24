export interface PiercingRow {
  id: string;
  name: string;
  zone: string;
  description: string;
  healing: string;
  pain: number;
  image_url: string | null;
  position: number;
  created_at: string;
}

export interface ProductRow {
  id: string;
  name: string;
  category: string;
  price: number;
  material: string;
  description: string;
  image_url: string | null;
  position: number;
  created_at: string;
}

export type PiercingInput = Omit<PiercingRow, "id" | "created_at">;
export type ProductInput = Omit<ProductRow, "id" | "created_at">;
