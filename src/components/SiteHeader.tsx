import Link from "next/link";
import { Button } from "@/components/ui/button";
import { appLink } from "@/lib/site";

const navItems = [
  { href: "/zodiac", label: "Zodiac Signs", external: false },
  { href: "/compatibility", label: "Compatibility", external: false },
  { href: "/placements", label: "Placements", external: false },
  { href: "/aspects", label: "Aspects", external: false },
  { href: "/birth-chart", label: "Birth Chart", external: false },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-border/50 rounded-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 px-4 h-14">
        <Link href="/" className="font-display text-lg font-bold tracking-tight" aria-label="Skygram.ai home">
          <span className="gradient-text">skygram</span>
          <span className="text-muted-foreground font-semibold">.ai</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main">
          {navItems.map((item) =>
            item.external ? (
              <Button key={item.label} variant="ghost" size="sm" asChild>
                <a href={item.href}>{item.label}</a>
              </Button>
            ) : (
              <Button key={item.label} variant="ghost" size="sm" asChild>
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <a href={appLink("/login")}>Sign In</a>
          </Button>
          <Button variant="cta" size="sm" asChild>
            <a href={appLink("/register")}>Get Started</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
