import { useEffect, useState } from "react";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { fetchPiercings } from "../lib/dataService";
import { piercings as fallbackPiercings } from "../data/piercings";
import type { PiercingType } from "../data/piercings";

export function usePiercingsData() {
  const [items, setItems] = useState<PiercingType[]>(fallbackPiercings);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let cancelled = false;

    fetchPiercings()
      .then((rows) => {
        if (cancelled) return;
        if (rows.length > 0) {
          setItems(
            rows.map((r) => ({
              id: r.id,
              name: r.name,
              zone: r.zone,
              description: r.description,
              healing: r.healing,
              pain: r.pain as PiercingType["pain"],
              image: r.image_url || undefined,
            }))
          );
        }
        // Si la table est vide, on garde les données codées en dur en fallback.
      })
      .catch((err) => {
        console.error("Erreur de chargement des piercings depuis Supabase :", err);
        // En cas d'échec, les données codées en dur restent affichées.
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
