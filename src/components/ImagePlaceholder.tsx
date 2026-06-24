import { RingMark } from "./RingMark";

interface ImagePlaceholderProps {
  label?: string;
  className?: string;
  ratio?: string;
  src?: string;
  alt?: string;
}

/**
 * Zone d'image réservée. Si `src` est fourni, affiche la vraie image.
 * Sinon affiche un placeholder élégant en attendant les photos du studio.
 */
export function ImagePlaceholder({
  label,
  className = "",
  ratio = "aspect-square",
  src,
  alt,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${ratio} ${className}`}>
        <img
          src={src}
          alt={alt || label || ""}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${ratio} ${className} bg-gradient-to-br from-ink-soft via-ink-card to-ink-soft`}
    >
      <div className="absolute inset-0 noise-bg" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-50">
        <RingMark size={28} className="opacity-70" />
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone-dim text-center px-4">
            {label}
          </span>
        )}
      </div>
      <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
    </div>
  );
}
