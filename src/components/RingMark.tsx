interface RingIconProps {
  size?: number;
  className?: string;
}

export function RingMark({ size = 32, className = "" }: RingIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#717479" />
          <stop offset="25%" stopColor="#E8E9EB" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#C7C9CC" />
          <stop offset="100%" stopColor="#717479" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="6"
      />
    </svg>
  );
}

export function RingHero({ size = 420 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      aria-hidden="true"
      className="drop-shadow-[0_0_60px_rgba(199,201,204,0.18)]"
    >
      <defs>
        <linearGradient id="heroRingGrad" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#5C5F63" />
          <stop offset="20%" stopColor="#C7C9CC" />
          <stop offset="42%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#D8D9DB" />
          <stop offset="75%" stopColor="#9A9DA3" />
          <stop offset="100%" stopColor="#4B4D50" />
        </linearGradient>
        <radialGradient id="heroGem" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#D9DADC" />
          <stop offset="100%" stopColor="#86888C" />
        </radialGradient>
      </defs>
      <circle
        cx="200"
        cy="200"
        r="148"
        fill="none"
        stroke="url(#heroRingGrad)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <circle cx="200" cy="56" r="13" fill="url(#heroGem)" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, className = "" }: RingIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function RingDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-silver-deep/60" />
      <RingMark size={18} />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-silver-deep/60" />
    </div>
  );
}
