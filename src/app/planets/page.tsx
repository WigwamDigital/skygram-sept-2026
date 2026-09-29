import type { Metadata } from "next";
import Link from "next/link";
import AstroNote from "@/components/AstroNote";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import LegacySections, { Toc } from "@/components/legacy/LegacySections";
import { mustLoadLegacy } from "@/lib/legacy";
import { siteLink } from "@/lib/site";
import { planetGlyph, planetPath, planets, type PlanetGroup } from "@/lib/planets";

const hub = mustLoadLegacy("planets", "_hub");
// "The Big Ten" was a card list of planets; the grid above replaces it.
const legacy = { ...hub, sections: hub.sections.filter((s) => !/big ten/i.test(s.heading)) };
const title = "Planets in Astrology: Meanings, Rulerships & Cycles";
const description =
  "What each planet means in astrology, from the Sun and Moon to Pluto and the North Node: what it governs, the signs it rules, its dignities, cycles and retrogrades.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/planets" },
  openGraph: { title, description, url: "/planets" },
  twitter: { title, description },
};

const groups: { group: PlanetGroup; note: string }[] = [
  { group: "Luminary", note: "The Sun and Moon: your core self and your emotional needs." },
  { group: "Personal planet", note: "Fast movers that shape personality and daily life." },
  { group: "Social planet", note: "Jupiter and Saturn bridge the personal and the collective." },
  { group: "Outer planet", note: "Slow movers with generational themes and life-changing transits." },
  { group: "Lunar node", note: "A calculated point, not a planet, tied to growth and direction." },
];

const extraFaqs = [
  {
    q: "How many planets are used in astrology?",
    a: "Modern Western astrology uses ten: the Sun and Moon (the luminaries, called planets for convenience), Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune and Pluto. Many astrologers also read points such as the North Node and Chiron.",
  },
];

export default function PlanetsHubPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Planets in astrology",
    itemListElement: planets.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: siteLink(planetPath(p.slug)) })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd data={itemListLd} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Planets", path: "/planets" }]} />

      <header className="text-center mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          The <span className="gradient-text">Planets</span> in Astrology
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Signs describe how energy behaves and houses describe where it shows up. Planets are the what: the drives and
          needs that make up a personality.
        </p>
      </header>

      <div className="space-y-8 mb-12">
        {groups.map(({ group, note }) => {
          const list = planets.filter((p) => p.group === group);
          return (
            <section key={group} aria-labelledby={`g-${group}`}>
              <div className="flex flex-wrap items-baseline gap-x-3 mb-3">
                <h2 id={`g-${group}`} className="font-display text-xl font-semibold">{group === "Lunar node" ? "Lunar nodes" : `${group}s`}</h2>
                <p className="text-sm text-muted-foreground">{note}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {list.map((p) => (
                  <Link key={p.slug} href={planetPath(p.slug)} className="glass-card p-5 flex gap-4 hover:-translate-y-0.5 hover:border-primary/40 transition-all">
                    <span className="font-display text-4xl text-accent leading-none" aria-hidden="true">{planetGlyph(p)}</span>
                    <span>
                      <span className="block font-display text-lg font-semibold">{p.name}</span>
                      <span className="block text-xs text-accent mb-1">{p.function.join(" · ")}</span>
                      <span className="block text-sm text-foreground/75">Governs {p.governs}.</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-foreground/85 mb-6">{legacy.summary}</p>
        <Toc sections={legacy.sections} />
        <LegacySections page={legacy} />
        <CtaBanner title="Meet the planets in your chart" />
        <Faq items={[...legacy.faqs, ...extraFaqs]} title="Planets FAQ" />
        <AstroNote />
      </div>
    </div>
  );
}
