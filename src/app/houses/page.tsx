import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { siteLink } from "@/lib/site";
import { houses, housePath, housePlanets, kindText, planetHousePath } from "@/lib/houses";

const title = "The 12 Astrology Houses: Meanings & Planets in Houses";
const description =
  "Learn what the 12 houses mean in your birth chart and how each planet behaves in each house. Browse all 84 planet-in-house placements from Sun in the 1st house to Saturn in the 12th.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/houses" },
  openGraph: { title, description, url: "/houses" },
  twitter: { title, description },
};

const faqs = [
  {
    q: "What are the houses in astrology?",
    a: "The houses divide your birth chart into 12 areas of life, such as money, home, relationships and career. Signs describe how a planet behaves, and houses describe where in life it plays out.",
  },
  {
    q: "How do I find my houses?",
    a: "Your houses depend on your exact birth time and place, because they are calculated from the Ascendant, the sign rising on the eastern horizon at your birth. Skygram calculates them for free in your natal chart.",
  },
  {
    q: "What is the difference between a sign and a house?",
    a: "A sign shows the style of a planet's energy, and a house shows the area of life it applies to. For example, Venus in Leo describes a warm, generous way of loving, while Venus in the 7th house says that partnership is where that theme is most active.",
  },
  {
    q: "What are angular, succedent and cadent houses?",
    a: "Angular houses (1, 4, 7, 10) sit on the chart's key points and are traditionally the most prominent. Succedent houses (2, 5, 8, 11) are about building and sustaining, and cadent houses (3, 6, 9, 12) are about learning and adapting.",
  },
];

export default function HousesHubPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "The 12 astrology houses",
    itemListElement: houses.map((h, i) => ({ "@type": "ListItem", position: i + 1, name: h.name, url: siteLink(housePath(h.number)) })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd data={itemListLd} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Houses", path: "/houses" }]} />

      <header className="text-center mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          The 12 <span className="gradient-text">Astrology Houses</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Signs show how a planet acts; houses show where in life it acts. Explore each house and every planet in every house.
        </p>
      </header>

      <section className="mb-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3" aria-label="All twelve houses">
        {houses.map((h) => (
          <Link key={h.number} href={housePath(h.number)} className="glass-card p-5 hover:-translate-y-0.5 hover:border-primary/40 transition-all">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{kindText[h.kind].label}</p>
            <h2 className="font-display text-lg font-semibold">{h.name[0].toUpperCase() + h.name.slice(1)}</h2>
            <p className="text-sm text-accent mb-2">{h.title}</p>
            <p className="text-xs text-foreground/70">{h.themes.slice(0, 4).join(" · ")}</p>
          </Link>
        ))}
      </section>

      <section className="mb-12 overflow-x-auto" aria-labelledby="matrix-heading">
        <h2 id="matrix-heading" className="font-display text-2xl font-semibold mb-4">Planets in houses</h2>
        <table className="w-full glass-card text-xs sm:text-sm">
          <caption className="sr-only">Rows are planets, columns are houses</caption>
          <thead>
            <tr className="border-b border-border/50">
              <th scope="col" className="px-2 py-3 text-left text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Planet ↓ House →</th>
              {houses.map((h) => (
                <th key={h.number} scope="col" className="px-1 py-3 text-center font-medium">{h.number}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {housePlanets.map((p) => (
              <tr key={p.slug} className="border-b border-border/30 last:border-0">
                <th scope="row" className="px-2 py-2 text-left font-medium whitespace-nowrap">
                  <span aria-hidden="true" className="text-accent mr-1">{p.glyph}</span>
                  {p.name}
                </th>
                {houses.map((h) => (
                  <td key={h.number} className="p-0.5 text-center">
                    <Link
                      href={planetHousePath(p.slug, h.number)}
                      className="block rounded-md py-2 hover:bg-secondary/60 transition-colors"
                      aria-label={`${p.name} in the ${h.name}`}
                    >
                      ○
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="max-w-3xl mx-auto">
        <CtaBanner />
        <Faq items={faqs} title="Astrology houses FAQ" />
      </div>
    </div>
  );
}
