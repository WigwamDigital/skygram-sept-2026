import Link from "next/link";
import { cn } from "@/lib/utils";
import { dateRange, elementAccent, glyphText, signPath, type ZodiacSign } from "@/lib/zodiac";

export default function SignCard({
  sign,
  note,
  compact = false,
  href,
}: {
  sign: ZodiacSign;
  note?: string;
  compact?: boolean;
  /** Defaults to the sign's own page */
  href?: string;
}) {
  return (
    <Link
      href={href ?? signPath(sign.slug)}
      className={cn(
        "group glass-card relative overflow-hidden flex flex-col items-center text-center transition-all hover:-translate-y-0.5 hover:border-primary/40",
        compact ? "p-4" : "p-5",
      )}
    >
      <span className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-100 transition-opacity", elementAccent[sign.element])} aria-hidden="true" />
      <span className={cn("relative font-display text-accent leading-none mb-2", compact ? "text-3xl" : "text-4xl")} aria-hidden="true">
        {glyphText(sign)}
      </span>
      <span className="relative font-display font-semibold">{sign.name}</span>
      <span className="relative text-xs text-muted-foreground mt-0.5">{note ?? dateRange(sign, true)}</span>
    </Link>
  );
}
