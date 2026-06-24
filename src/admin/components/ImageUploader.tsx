import { useRef, useState } from "react";
import { Upload, Loader2, X } from "lucide-react";
import { uploadImage } from "../../lib/dataService";

interface ImageUploaderProps {
  folder: "piercings" | "products";
  value: string | null;
  onChange: (url: string | null) => void;
}

export function ImageUploader({ folder, value, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      setError("Échec de l'envoi de l'image. Vérifie la configuration Supabase.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <span className="block font-mono text-[10px] uppercase tracking-widest2 text-bone-faint mb-2">
        Photo
      </span>

      {value ? (
        <div className="relative w-full aspect-square max-w-[180px] rounded-xl overflow-hidden border border-white/10">
          <img src={value} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black/90 transition-colors"
            aria-label="Retirer l'image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full max-w-[180px] aspect-square rounded-xl border border-dashed border-white/15 flex flex-col items-center justify-center gap-2 text-bone-faint hover:border-silver/40 hover:text-bone-dim transition-colors"
        >
          {uploading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Upload size={20} />
          )}
          <span className="text-xs">
            {uploading ? "Envoi..." : "Choisir une photo"}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
    </div>
  );
}
