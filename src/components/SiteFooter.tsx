import Link from "next/link";
import { Button } from "@/components/ui/button";
import { appLink, siteConfig } from "@/lib/site";
import { dateRange, glyphText, pairPath, signMeta, signPath } from "@/lib/zodiac/meta";
import type { SignSlug } from "@/lib/zodiac/types";
import { relationshipTypePath, relationshipTypes } from "@/lib/compatibility/types";
import { planetPath, tenPlanets } from "@/lib/planets";
import { pointPath, points } from "@/lib/placements";
import { elementName, elementOrder, elementPath } from "@/lib/elements";

type FooterLink = { href: string; label: string; external?: boolean };

const signName = (slug: SignSlug) => signMeta.find((s) => s.slug === slug)!.name;

// Canonical order (earlier sign first) so pairPath never lands on a redirect.
const popularPairs: [SignSlug, SignSlug][] = [
  ["aries", "leo"],
  ["taurus", "virgo"],
  ["gemini", "libra"],
  ["cancer", "scorpio"],
  ["cancer", "capricorn"],
  ["leo", "sagittarius"],
  ["virgo", "capricorn"],
  ["libra", "aquarius"],
  ["scorpio", "pisces"],
  ["taurus", "scorpio"],
];

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Learn astrology",
    links: [
      { href: "/astrology", label: "Astrology basics" },
      { href: "/birth-chart", label: "Free birth chart" },
      { href: "/astrology-charts", label: "Chart types" },
      { href: "/zodiac", label: "Zodiac signs" },
      { href: "/planets", label: "Planets" },
      { href: "/houses", label: "Houses" },
      { href: "/aspects", label: "Aspects" },
      { href: "/elements", label: "Elements" },
    ],
  },
  {
    title: "Compatibility",
    links: [
      { href: "/compatibility", label: "Compatibility chart" },
      ...relationshipTypes.map((t) => ({
        href: relationshipTypePath(t.slug),
        label: `${t.slug === "romantic" ? "Love" : t.label} compatibility`,
      })),
      { href: appLink("/compatibility-calculator"), label: "Compatibility calculator", external: true },
    ],
  },
  {
    title: "Popular matches",
    links: popularPairs.map(([a, b]) => ({ href: pairPath(a, b), label: `${signName(a)} & ${signName(b)}` })),
  },
  {
    title: "Placements",
    links: [
      { href: "/placements", label: "All placements" },
      ...points.map((p) => ({ href: pointPath(p.slug), label: `${p.signLabel}s` })),
      { href: "/sun-moon", label: "Sun & Moon combinations" },
      { href: "/birthday", label: "Birthday astrology" },
    ],
  },
  {
    title: "Planets",
    links: tenPlanets.map((p) => ({ href: planetPath(p.slug), label: p.name })),
  },
  {
    title: "Skygram",
    links: [
      { href: "/methodology", label: "Methodology" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
      { href: appLink("/register"), label: "Create free account", external: true },
      { href: appLink("/login"), label: "Sign in", external: true },
      { href: `https://x.com/${siteConfig.twitter.replace("@", "")}`, label: `Follow ${siteConfig.twitter}`, external: true },
    ],
  },
];

// ~65 links: prefetch={false} so scrolling to the footer doesn't fetch every route.
function FooterLinkItem({ link }: { link: FooterLink }) {
  const className = "text-muted-foreground hover:text-foreground transition-colors";
  return link.external ? (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} prefetch={false} className={className}>
      {link.label}
    </Link>
  );
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/30 mt-8 bg-card/30">
      <div className="max-w-5xl mx-auto px-4 pt-12 pb-10">
        {/* Brand + zodiac signs */}
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <Link href="/" prefetch={false} className="font-display text-lg font-bold tracking-tight" aria-label="Skygram.ai home">
              <span className="gradient-text">skygram</span>
              <span className="text-muted-foreground font-semibold">.ai</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm">
              AI-powered astrology for the modern soul. Decode your natal chart, compare it with friends for a real
              synastry compatibility score, and get daily insights based on your birth chart.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="cta" size="sm" asChild>
                <a href={appLink("/register")}>Get your free chart</a>
              </Button>
              <Button variant="glass" size="sm" asChild>
                <a href={appLink("/compatibility-calculator")}>Check compatibility</a>
              </Button>
            </div>
          </div>

          <nav aria-label="Zodiac signs">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-4">
              <p className="font-display font-semibold">Zodiac signs</p>
              <p className="text-xs text-muted-foreground">
                By element:{" "}
                {elementOrder.map((e, i) => (
                  <span key={e}>
                    {i > 0 && <span className="opacity-40"> · </span>}
                    <Link href={elementPath(e)} prefetch={false} className="hover:text-foreground transition-colors">
                      {elementName(e)}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {signMeta.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={signPath(s.slug)}
                    prefetch={false}
                    className="glass-card rounded-xl flex items-center gap-2.5 px-3 py-2 hover:border-accent/40 transition-colors"
                  >
                    <span className="text-accent text-lg leading-none w-5 text-center" aria-hidden>
                      {glyphText(s)}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium leading-tight">{s.name}</span>
                      <span className="block text-[11px] text-muted-foreground leading-tight">{dateRange(s, true)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Link columns */}
        <div className="mt-12 pt-10 border-t border-border/30 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 text-sm">
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="font-display font-semibold mb-3">{c.title}</p>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <FooterLinkItem link={l} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-border/30 py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Skygram.ai · Astrology for entertainment and self-reflection.</p>
          <p>Built with cosmic intelligence 🔭</p>
        </div>
      </div>
    </footer>
  );
}
