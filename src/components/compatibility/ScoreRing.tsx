import { cn } from "@/lib/utils";

/** Server-rendered circular score (0–100) using the brand CTA gradient. */
export default function ScoreRing({ score, size = 140, label }: { score: number; size?: number; label?: string }) {
  const stroke = size * 0.08;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const id = `ring-${size}`;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(45 100% 60%)" />
            <stop offset="50%" stopColor="hsl(280 80% 60%)" />
            <stop offset="100%" stopColor="hsl(330 80% 58%)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--secondary))" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-display font-bold leading-none", size >= 120 ? "text-4xl" : "text-xl")}>{score}</span>
        {label && <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{label}</span>}
      </div>
    </div>
  );
}
