import { supabase } from "./supabaseClient";
import type { PiercingInput, PiercingRow, ProductInput, ProductRow } from "./types";

const BUCKET = "rays-piercing-media";

// ---------- Piercings ----------

export async function fetchPiercings(): Promise<PiercingRow[]> {
  const { data, error } = await supabase
    .from("piercings")
    .select("*")
    .order("position", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createPiercing(input: PiercingInput) {
  const { data, error } = await supabase
    .from("piercings")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as PiercingRow;
}

export async function updatePiercing(id: string, input: Partial<PiercingInput>) {
  const { data, error } = await supabase
    .from("piercings")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as PiercingRow;
}

export async function deletePiercing(id: string) {
  const { error } = await supabase.from("piercings").delete().eq("id", id);
  if (error) throw error;
}

// ---------- Produits ----------

export async function fetchProducts(): Promise<ProductRow[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("position", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createProduct(input: ProductInput) {
  const { data, error } = await supabase
    .from("products")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as ProductRow;
}

export async function updateProduct(id: string, input: Partial<ProductInput>) {
  const { data, error } = await supabase
    .from("products")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as ProductRow;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

// ---------- Upload d'image (Storage) ----------

export async function uploadImage(file: File, folder: "piercings" | "products") {
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}
