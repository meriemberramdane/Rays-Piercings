import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Client Supabase. Si les variables d'environnement ne sont pas encore
 * renseignées (avant la configuration), ce client est créé avec des valeurs
 * vides : les appels échoueront silencieusement et le site retombera sur
 * les données codées en dur grâce à isSupabaseConfigured.
 */
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);
