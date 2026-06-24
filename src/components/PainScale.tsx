interface PainScaleProps {
  level: number;
  max?: number;
}

export function PainScale({ level, max = 5 }: PainScaleProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-widest2 text-bone-faint">
        Douleur
      </span>
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            className={`w-3.5 h-1 rounded-full transition-colors ${
              i < level ? "bg-silver" : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
