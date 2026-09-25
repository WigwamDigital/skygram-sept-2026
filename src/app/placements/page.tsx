import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { siteLink } from "@/lib/site";
import { glyphText, signPath, signs } from "@/lib/zodiac";
import { getPlacementFor, placementPath, pointPath, points } from "@/lib/placements";

const title = "Astrology Placements: Moon, Venus, Mars, Rising & More in Every Sign";
const description =
  "What does your Moon sign, Venus sign or Rising sign mean? Explore Moon, Mercury, Venus, Mars, Jupiter, Saturn and Rising in all 12 zodiac signs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/placements" },
  openGraph: { title, description, url: "/placements" },
  twitter: { title, description },
};

const faqs = [
  {
    q: "What are placements in astrology?",
    a: "A placement is the zodiac sign a planet (or point like the Ascendant) was in when you were born. Your Sun sign is just one placement — your Moon, Mercury, Venus, Mars and Rising sign each describe a different part of your personality.",
  },
  {
    q: "What are the 'big three' in astrology?",
    a: "Your big three are your Sun sign (core identity), Moon sign (emotional nature) and Rising sign (how you come across). Together they give a much fuller picture than your Sun sign alone.",
  },
  {
    q: "Why aren't Uranus, Neptune and Pluto signs included?",
    a: "The outer planets stay in each sign for 7 to 30 years, so everyone born in the same period shares them. They describe generations more than individuals — their house position in your chart matters more than their sign.",
  },
  {
    q: "How do I find my placements?",
    a: "You need your birth date, exact birth time and birthplace. Skygram calculates your full natal chart for free, showing every placement, house and aspect.",
  },
];

export default function PlacementsHubPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Astrology placements",
    itemListElement: points.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.slug === "rising" ? "Rising signs" : `${p.name} signs`,
      url: siteLink(pointPath(p.slug)),
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd data={itemListLd} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Placements", path: "/placements" }]} />

      <header className="text-center mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          Your <span className="gradient-text">Placements</span>, Explained
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          You&apos;re more than your Sun sign. Discover what your Moon, Venus, Mars, Rising and other placements reveal about you.
        </p>
      </header>

      <section aria-label="Placement types" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
        <Link href="/zodiac" className="glass-card p-5 hover:border-primary/40 transition-colors">
          <span className="font-display text-4xl text-accent leading-none block mb-2" aria-hidden="true">☉&#xFE0E;</span>
          <span className="block font-display font-semibold">Sun signs</span>
          <span className="block text-sm text-muted-foreground mt-1">Core identity, ego and life force</span>
        </Link>
        {points.map((p) => (
          <Link key={p.slug} href={pointPath(p.slug)} className="glass-card p-5 hover:border-primary/40 transition-colors">
            <span className="font-display text-4xl text-accent leading-none block mb-2" aria-hidden="true">
              {p.slug === "rising" ? "AC" : `${p.glyph}︎`}
            </span>
            <span className="block font-display font-semibold">{p.slug === "rising" ? "Rising signs" : `${p.name} signs`}</span>
            <span className="block text-sm text-muted-foreground mt-1 first-letter:uppercase">{p.governs}</span>
          </Link>
        ))}
      </section>

      <section className="mb-12" aria-labelledby="grid-heading">
        <h2 id="grid-heading" className="font-display text-2xl font-semibold mb-1">Every placement</h2>
        <p className="text-sm text-muted-foreground mb-4">Pick a planet and sign.</p>
        <div className="relative overflow-x-auto glass-card p-3">
          <table className="w-full border-separate border-spacing-1 text-xs">
            <thead>
              <tr>
                <th className="sr-only">Placement</th>
                {signs.map((s) => (
                  <th key={s.slug} scope="col" className="font-normal text-muted-foreground px-1 pb-1">
                    <Link href={signPath(s.slug)} className="block hover:text-foreground">
                      <span className="font-display text-base text-accent block" aria-hidden="true">{glyphText(s)}</span>
                      <span className="hidden md:block">{s.name.slice(0, 3)}</span>
                      <span className="sr-only">{s.name}</span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {points.map((p) => (
                <tr key={p.slug}>
                  <th scope="row" className="text-left font-medium pr-2 whitespace-nowrap">
                    <Link href={pointPath(p.slug)} className="hover:text-accent">{p.name}</Link>
                  </th>
                  {signs.map((s) => {
                    const pl = getPlacementFor(p.slug, s.slug);
                    return (
                      <td key={s.slug} className="p-0">
                        <Link
                          href={placementPath(p.slug, s.slug)}
                          className="flex h-9 min-w-9 items-center justify-center rounded-md bg-secondary/40 font-display text-accent transition-transform hover:scale-110 hover:bg-primary/30"
                          title={pl.title}
                          aria-label={pl.title}
                        >
                          {glyphText(s)}
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

      <div className="max-w-3xl mx-auto">
        <CtaBanner title="See all your placements at once" cta="Get my free natal chart" />
        <Faq items={faqs} title="Placements FAQ" />
      </div>
    </div>
  );
}
