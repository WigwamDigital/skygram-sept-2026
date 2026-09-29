import Link from "next/link";

const hubs = [
  { href: "/astrology", label: "Astrology basics", note: "Signs, planets, houses and aspects in one page" },
  { href: "/zodiac", label: "Zodiac signs", note: "All 12 signs, dates and traits" },
  { href: "/planets", label: "Planets", note: "What each planet governs" },
  { href: "/houses", label: "Houses", note: "The 12 areas of life" },
  { href: "/aspects", label: "Aspects", note: "Angles between planets" },
  { href: "/elements", label: "Elements", note: "Fire, earth, air and water" },
  { href: "/placements", label: "Placements", note: "Moon, Venus, Mars and more by sign" },
  { href: "/astrology-charts", label: "Chart types", note: "Natal, synastry, composite and more" },
  { href: "/compatibility", label: "Compatibility", note: "Every zodiac pairing, scored" },
];

/** Links to the main learning hubs, minus the current page. */
export default function ExploreGrid({ current, title = "Keep exploring" }: { current?: string; title?: string }) {
  const items = hubs.filter((h) => h.href !== current);
  return (
    <section className="mb-6" aria-labelledby="explore-h">
      <h2 id="explore-h" className="font-display text-xl font-semibold mb-3">{title}</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {items.map((h) => (
          <li key={h.href}>
            <Link href={h.href} className="block h-full glass-card px-4 py-3 hover:border-primary/40 transition-colors">
              <span className="block font-display font-semibold text-sm">{h.label}</span>
              <span className="block text-[11px] text-muted-foreground mt-0.5">{h.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
