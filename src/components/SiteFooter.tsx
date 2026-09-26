import Link from "next/link";

const links = [
  { href: "/zodiac", label: "Zodiac Signs" },
  { href: "/compatibility", label: "Compatibility" },
  { href: "/placements", label: "Placements" },
  { href: "/houses", label: "Houses" },
  { href: "/birthday", label: "Birthdays" },
  { href: "/sun-moon", label: "Sun & Moon" },
  { href: "/methodology", label: "Methodology" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/30 py-4 mt-8">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Skygram.ai · Built with cosmic intelligence</span>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {links.map((l, i) => (
            <span key={l.href} className="flex items-center gap-x-4">
              {i > 0 && <span className="opacity-30">·</span>}
              <Link href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
