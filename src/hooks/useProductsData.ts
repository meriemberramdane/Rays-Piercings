import { useEffect, useState } from "react";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { fetchProducts } from "../lib/dataService";
import { products as fallbackProducts } from "../data/products";
import type { Product } from "../data/products";

export function useProductsData() {
  const [items, setItems] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let cancelled = false;

    fetchProducts()
      .then((rows) => {
        if (cancelled) return;
        if (rows.length > 0) {
          setItems(
            rows.map((r) => ({
              id: r.id,
              name: r.name,
              category: r.category,
              price: r.price,
              material: r.material,
              description: r.description,
              image: r.image_url || undefined,
            }))
          );
        }
        // Si la table est vide, on garde les données codées en dur en fallback.
      })
      .catch((err) => {
        console.error("Erreur de chargement des produits depuis Supabase :", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}
