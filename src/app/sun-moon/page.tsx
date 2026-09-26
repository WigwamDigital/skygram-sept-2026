import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { siteLink } from "@/lib/site";
import { glyphText, signs } from "@/lib/zodiac";
import { sunMoonPath, sunMoons } from "@/lib/sunmoon";

const title = "Sun and Moon Sign Combinations: All 144 Pairings Explained";
const description =
  "Your Sun sign is who you are; your Moon sign is what you feel. Browse all 144 Sun and Moon sign combinations to see how identity and emotions work together in your chart.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sun-moon" },
  openGraph: { title, description, url: "/sun-moon" },
  twitter: { title, description },
};

const faqs = [
  {
    q: "What is a Sun and Moon sign combination?",
    a: "It pairs the zodiac sign your Sun was in at birth — your core identity — with the sign your Moon was in — your emotional nature. Together they describe how what you do and what you feel fit together.",
  },
  {
    q: "Which is more important, Sun sign or Moon sign?",
    a: "Neither outranks the other. The Sun describes purpose and how you shine, while the Moon describes emotional needs and instincts. Astrologers often use the Moon sign to describe the private, emotional side of a person, and the Sun sign for the more visible core identity.",
  },
  {
    q: "How do I find my Moon sign?",
    a: "The Moon changes sign every two to three days, so you need your birth date and ideally your birth time and place. Skygram calculates your Moon sign for free in your natal chart.",
  },
  {
    q: "Why are there 144 combinations?",
    a: "There are 12 possible Sun signs and 12 possible Moon signs, giving 12 × 12 = 144 pairings. A Sun in Aries with a Moon in Taurus reads differently from a Sun in Taurus with a Moon in Aries, so each order has its own page.",
  },
];

export default function SunMoonHubPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sun and Moon sign combinations",
    itemListElement: sunMoons.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.title, url: siteLink(sunMoonPath(c.sun.slug, c.moon.slug)) })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd data={itemListLd} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Sun & Moon Signs", path: "/sun-moon" }]} />

      <header className="text-center mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          Sun &amp; Moon <span className="gradient-text">Sign Combinations</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Pick your Sun sign, then your Moon sign, to see how who you are and what you feel fit together.
        </p>
      </header>

      <section className="mb-12 overflow-x-auto" aria-label="Sun and Moon sign grid">
        <table className="w-full glass-card text-xs sm:text-sm">
          <caption className="sr-only">Rows are Sun signs, columns are Moon signs</caption>
          <thead>
            <tr className="border-b border-border/50">
              <th scope="col" className="px-2 py-3 text-left text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Sun ↓ Moon →</th>
              {signs.map((m) => (
                <th key={m.slug} scope="col" className="px-1 py-3 text-center font-medium" title={`${m.name} Moon`}>
                  <span aria-hidden="true" className="text-accent">{glyphText(m)}</span>
                  <span className="sr-only">{m.name} Moon</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {signs.map((s) => (
              <tr key={s.slug} className="border-b border-border/30 last:border-0">
                <th scope="row" className="px-2 py-2 text-left font-medium whitespace-nowrap">
                  <span aria-hidden="true" className="text-accent mr-1">{glyphText(s)}</span>
                  {s.name}
                </th>
                {signs.map((m) => (
                  <td key={m.slug} className="p-0.5 text-center">
                    <Link
                      href={sunMoonPath(s.slug, m.slug)}
                      className="block rounded-md py-2 hover:bg-secondary/60 transition-colors"
                      aria-label={`${s.name} Sun ${m.name} Moon`}
                    >
                      {s.slug === m.slug ? "●" : "○"}
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-muted-foreground">● same sign for Sun and Moon</p>
      </section>

      <section className="mb-12" aria-labelledby="by-sun-heading">
        <h2 id="by-sun-heading" className="font-display text-2xl font-semibold mb-4">Browse by Sun sign</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {signs.map((s) => (
            <div key={s.slug} className="glass-card p-5">
              <h3 className="font-display text-lg font-semibold mb-2">{s.name} {glyphText(s)} Sun</h3>
              <ul className="flex flex-wrap gap-1">
                {sunMoons
                  .filter((c) => c.sun.slug === s.slug)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link href={sunMoonPath(c.sun.slug, c.moon.slug)} className="inline-block rounded-md bg-secondary/40 px-2 py-0.5 text-xs hover:bg-secondary/70 transition-colors">
                        {c.moon.name} Moon
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-3xl mx-auto">
        <CtaBanner />
        <Faq items={faqs} title="Sun and Moon sign FAQ" />
      </div>
    </div>
  );
}
