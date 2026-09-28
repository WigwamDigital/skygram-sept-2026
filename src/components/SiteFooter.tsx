import Link from "next/link";

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Learn astrology",
    links: [
      { href: "/astrology", label: "Astrology basics" },
      { href: "/zodiac", label: "Zodiac signs" },
      { href: "/planets", label: "Planets" },
      { href: "/houses", label: "Houses" },
      { href: "/aspects", label: "Aspects" },
      { href: "/elements", label: "Elements" },
      { href: "/astrology-charts", label: "Chart types" },
    ],
  },
  {
    title: "Compatibility",
    links: [
      { href: "/compatibility", label: "Compatibility chart" },
      { href: "/compatibility/romantic", label: "Romantic" },
      { href: "/compatibility/friendship", label: "Friendship" },
      { href: "/compatibility/work", label: "Work" },
      { href: "/compatibility/family", label: "Family" },
      { href: "/compatibility/aries-and-leo", label: "Aries & Leo" },
      { href: "/compatibility/cancer-and-scorpio", label: "Cancer & Scorpio" },
    ],
  },
  {
    title: "Your chart",
    links: [
      { href: "/birth-chart", label: "Free birth chart" },
      { href: "/placements", label: "Placements" },
      { href: "/sun-moon", label: "Sun & Moon combinations" },
      { href: "/birthday", label: "Birthdays" },
    ],
  },
  {
    title: "Skygram",
    links: [
      { href: "/methodology", label: "Methodology" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/30 mt-8">
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="font-display font-semibold mb-3">{c.title}</p>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border/30 py-4">
        <p className="max-w-5xl mx-auto px-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Skygram.ai · Built with cosmic intelligence
        </p>
      </div>
    </footer>
  );
}
