import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import PairPicker from "@/components/compatibility/PairPicker";
import { appLink, siteLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { glyphText, signs } from "@/lib/zodiac";
import { getPairingFor, pairPath, pairings } from "@/lib/compatibility";
import { relationshipTypePath, relationshipTypes } from "@/lib/compatibility/types";
import LegacySections from "@/components/legacy/LegacySections";
import { mustLoadLegacy } from "@/lib/legacy";

// Synastry guide from the old /compatibility hub. The pair finder and "by context" link lists are
// replaced by the chart and relationship-type cards on this page.
const guideRaw = mustLoadLegacy("compatibility-types", "_hub");
const guide = {
  ...guideRaw,
  sections: guideRaw.sections.filter((s) => !/^(zodiac sign pair finder|compatibility by context|how skygram)/i.test(s.heading)),
};

const title = "Zodiac Compatibility Chart: Every Sign Pairing, Scored";
const description =
  "Zodiac sign compatibility for all 78 pairings. See love, friendship, communication and trust scores for every combination — from Aries & Aries to Pisces & Pisces.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/compatibility" },
  openGraph: { title, description, url: "/compatibility" },
  twitter: { title, description },
};

const cellTone = (n: number) =>
  n >= 85
    ? "bg-primary/45 text-foreground"
    : n >= 75
      ? "bg-primary/30 text-foreground"
      : n >= 65
        ? "bg-primary/20 text-foreground/90"
        : n >= 55
          ? "bg-secondary/60 text-foreground/80"
          : "bg-secondary/30 text-muted-foreground";

const faqs = [
  {
    q: "Which zodiac signs are most compatible?",
    a: "Signs of the same element (trines) and complementary elements (sextiles) tend to score highest — for example Aries & Leo, Taurus & Virgo, Gemini & Libra and Cancer & Scorpio. Fire pairs well with air, and earth with water.",
  },
  {
    q: "Which zodiac signs are least compatible?",
    a: "Square (90°) and quincunx (150°) pairings, such as Aries & Cancer or Taurus & Sagittarius, face the most friction. Challenging doesn't mean doomed — these pairings often grow the most when both people put in the work.",
  },
  {
    q: "How is this compatibility score calculated?",
    a: "These Sun-sign scores combine the angle between the two signs, how their elements and modalities interact, and traditional astrological pairings. On Skygram, full-chart compatibility compares every planet in both birth charts for a far more personal result.",
  },
  {
    q: "Is Sun-sign compatibility accurate?",
    a: "It's a useful starting point, but only one layer. Your Moon, Venus, Mars and Rising sign often matter more for day-to-day chemistry, which is why two couples with the same Sun signs can have very different relationships.",
  },
];

export default function CompatibilityHubPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Zodiac compatibility pairings",
    numberOfItems: pairings.length,
    itemListElement: pairings.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.a.name} and ${p.b.name}`,
      url: siteLink(pairPath(p.a.slug, p.b.slug)),
    })),
  };

  const top = [...pairings].filter((p) => !p.same).sort((x, y) => y.scores.overall - x.scores.overall).slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd data={itemListLd} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Compatibility", path: "/compatibility" }]} />

      <header className="text-center mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          Zodiac <span className="gradient-text">Compatibility</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          How well do your signs get along? Explore love, friendship and communication for every one of the 78 zodiac pairings.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 mb-12 items-start">
        <section aria-labelledby="top-heading">
          <h2 id="top-heading" className="font-display text-2xl font-semibold mb-4">Most compatible pairings</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {top.map((p) => (
              <li key={p.slug}>
                <Link href={pairPath(p.a.slug, p.b.slug)} className="glass-card flex items-center gap-4 p-4 hover:border-primary/40 transition-colors">
                  <span className="font-display text-2xl text-accent" aria-hidden="true">
                    {glyphText(p.a)}
                    {glyphText(p.b)}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display font-semibold">{p.a.name} & {p.b.name}</span>
                    <span className="block text-xs text-muted-foreground line-clamp-1">{p.tagline}</span>
                  </span>
                  <span className="font-mono font-semibold">{p.scores.overall}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <div className="lg:sticky lg:top-20 space-y-3">
          <PairPicker />
          <p className="text-xs text-muted-foreground px-1">
            Want the real answer? <a href={appLink("/compatibility-calculator")} className="text-accent hover:underline">Compare full birth charts</a> on Skygram.
          </p>
        </div>
      </div>

      <section className="mb-12" aria-labelledby="chart-heading">
        <h2 id="chart-heading" className="font-display text-2xl font-semibold mb-1">Compatibility chart</h2>
        <p className="text-sm text-muted-foreground mb-4">Sun-sign score out of 100. Tap any cell for the full breakdown.</p>
        <div className="relative overflow-x-auto glass-card p-3">
          <table className="w-full border-separate border-spacing-1 text-xs">
            <thead>
              <tr>
                <th className="sr-only">Sign</th>
                {signs.map((s) => (
                  <th key={s.slug} scope="col" className="font-normal text-muted-foreground px-1 pb-1" title={s.name}>
                    <span className="font-display text-base text-accent block" aria-hidden="true">{glyphText(s)}</span>
                    <span className="hidden md:block">{s.name.slice(0, 3)}</span>
                    <span className="sr-only">{s.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {signs.map((row) => (
                <tr key={row.slug}>
                  <th scope="row" className="text-left font-medium pr-2 whitespace-nowrap">
                    <span className="font-display text-accent mr-1" aria-hidden="true">{glyphText(row)}</span>
                    <span className="hidden sm:inline">{row.name}</span>
                  </th>
                  {signs.map((col) => {
                    const p = getPairingFor(row.slug, col.slug);
                    return (
                      <td key={col.slug} className="p-0">
                        <Link
                          href={pairPath(row.slug, col.slug)}
                          className={cn(
                            "flex h-9 min-w-9 items-center justify-center rounded-md font-mono transition-transform hover:scale-110 hover:ring-1 hover:ring-primary",
                            cellTone(p.scores.overall),
                          )}
                          title={`${row.name} & ${col.name}: ${p.scores.overall}`}
                          aria-label={`${row.name} and ${col.name} compatibility: ${p.scores.overall} out of 100`}
                        >
                          {p.scores.overall}
                        </Link>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12" aria-labelledby="by-sign-heading">
        <h2 id="by-sign-heading" className="font-display text-2xl font-semibold mb-4">Compatibility by sign</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {signs.map((s) => (
            <div key={s.slug} className="glass-card p-5">
              <h3 className="font-display font-semibold mb-2">
                <span className="text-accent mr-1" aria-hidden="true">{glyphText(s)}</span>
                {s.name} compatibility
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {signs.map((o) => (
                  <li key={o.slug}>
                    <Link href={pairPath(s.slug, o.slug)} className="inline-block rounded-md bg-secondary/40 px-2 py-1 text-xs hover:bg-secondary/70 transition-colors">
                      {o.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12" aria-labelledby="types-heading">
        <h2 id="types-heading" className="font-display text-2xl font-semibold mb-4">Compatibility by relationship</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {relationshipTypes.map((t) => (
            <Link key={t.slug} href={relationshipTypePath(t.slug)} className="glass-card p-5 hover:-translate-y-0.5 hover:border-primary/40 transition-all">
              <h3 className="font-display font-semibold mb-1">{t.label} compatibility</h3>
              <p className="text-sm text-foreground/75">{t.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto mb-6" aria-labelledby="synastry-heading">
        <h2 id="synastry-heading" className="font-display text-2xl font-semibold mb-2">How to read compatibility: a synastry guide</h2>
        {guide.summary && <p className="text-foreground/80 leading-relaxed mb-6">{guide.summary}</p>}
        <LegacySections page={guide} />
      </section>

      <div className="max-w-3xl mx-auto">
        <CtaBanner
          title="Go beyond Sun signs"
          body="Skygram compares every planet in two birth charts — Moon, Venus, Mars, Ascendant and more — for a compatibility score that's actually about you."
          cta="Try the compatibility calculator"
          href={appLink("/compatibility-calculator")}
        />
        <Faq items={[...faqs, ...guide.faqs]} title="Compatibility FAQ" />
      </div>
    </div>
  );
}
