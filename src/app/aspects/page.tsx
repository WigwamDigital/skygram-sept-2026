import type { Metadata } from "next";
import Link from "next/link";
import AstroNote from "@/components/AstroNote";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { siteLink } from "@/lib/site";
import { planetGlyph, planetPath, tenPlanets } from "@/lib/planets";
import { aspectTypePath, aspectTypes, getAspectFor, pathOf } from "@/lib/aspects";

const title = "Aspects in Astrology: Meanings of Every Planetary Aspect";
const description =
  "What aspects mean in astrology: conjunction, sextile, square, trine and opposition explained, plus the meaning of all 500 planet-to-planet aspects from Sun conjunct Moon to Pluto opposite Neptune.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/aspects" },
  openGraph: { title, description, url: "/aspects" },
  twitter: { title, description },
};

const steps = [
  { t: "Identify the planets", d: "Each planet is a function: the Sun is identity, the Moon is emotion, Venus is love and so on. An aspect is a conversation between two of them." },
  { t: "Read the angle", d: "The angle sets the tone: conjunctions fuse, trines and sextiles cooperate, squares and oppositions create productive tension." },
  { t: "Check the orb", d: "The closer the aspect is to exact, the louder it is. Within 1–3° it's a headline theme; near the edge of the orb it's background." },
  { t: "Add sign and house", d: "Signs show how the planets behave; houses show where in life the aspect plays out. The same aspect reads differently in the 2nd house and the 10th." },
  { t: "Look at the context", d: "Is it natal, a transit or synastry between two people? The meaning shifts from 'who you are' to 'what's happening now' to 'what happens between you'." },
];

const faqs = [
  {
    q: "What are aspects in astrology?",
    a: "Aspects are the angles planets make to each other in a chart, measured along the zodiac. They show which parts of your personality work together easily and which pull against each other.",
  },
  {
    q: "What are the five major aspects?",
    a: "The conjunction (0°), sextile (60°), square (90°), trine (120°) and opposition (180°). These are the Ptolemaic aspects used by almost every astrologer. Minor aspects such as the quincunx (150°) and semi-sextile (30°) add finer detail.",
  },
  {
    q: "Are hard aspects bad?",
    a: "No. Squares and oppositions are uncomfortable, but they create the drive to change and achieve. Charts with only easy aspects can lack motivation, and many accomplished people have strong squares.",
  },
  {
    q: "What is an orb?",
    a: "The orb is how far an aspect is from exact. Most astrologers allow 8–10° for conjunctions and oppositions, 6–8° for squares and trines and 4–6° for sextiles, with a little extra when the Sun or Moon is involved.",
  },
  {
    q: "Is Sun trine Moon the same as Moon trine Sun?",
    a: "In your own birth chart, yes: it's one aspect between two planets. The two versions matter in synastry, where it makes a difference whose Sun and whose Moon is involved, and in transits, where the first planet is the moving one.",
  },
];

export default function AspectsHubPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Major astrological aspects",
    itemListElement: aspectTypes.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: siteLink(aspectTypePath(t.slug)) })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd data={itemListLd} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Aspects", path: "/aspects" }]} />

      <header className="text-center mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          Astrology <span className="gradient-text">Aspects</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Planets are the actors, signs are the costumes and houses are the stage. Aspects are the relationships: the angles
          between planets that show where your chart flows and where it fights.
        </p>
      </header>

      <section className="mb-12" aria-labelledby="major-h">
        <h2 id="major-h" className="font-display text-2xl font-semibold mb-4">The five major aspects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {aspectTypes.map((t) => (
            <Link key={t.slug} href={aspectTypePath(t.slug)} className="glass-card p-5 hover:-translate-y-0.5 hover:border-primary/40 transition-all">
              <span className="block font-display text-4xl text-accent leading-none mb-3" aria-hidden="true">{t.glyph}</span>
              <h3 className="font-display text-lg font-semibold">{t.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{t.angle}° · {t.nature}</p>
              <p className="text-sm text-foreground/75">{t.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12 glass-card p-6 overflow-x-auto" aria-labelledby="table-h">
        <h2 id="table-h" className="font-display text-2xl font-semibold mb-4">Aspects at a glance</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="py-2 pr-3 font-medium">Aspect</th>
              <th className="py-2 pr-3 font-medium">Angle</th>
              <th className="py-2 pr-3 font-medium">Signs apart</th>
              <th className="py-2 pr-3 font-medium">Natal orb</th>
              <th className="py-2 pr-3 font-medium">Nature</th>
              <th className="py-2 font-medium">Keyword</th>
            </tr>
          </thead>
          <tbody>
            {aspectTypes.map((t) => (
              <tr key={t.slug} className="border-b border-border/30 last:border-0">
                <td className="py-2 pr-3 font-medium whitespace-nowrap">
                  <span className="text-accent mr-1.5" aria-hidden="true">{t.glyph}</span>
                  <Link href={aspectTypePath(t.slug)} className="hover:text-accent">{t.name}</Link>
                </td>
                <td className="py-2 pr-3 font-mono">{t.angle}°</td>
                <td className="py-2 pr-3">{t.signsApart}</td>
                <td className="py-2 pr-3 font-mono">{t.orb}</td>
                <td className="py-2 pr-3">{t.nature}</td>
                <td className="py-2">{t.keyword}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-12" aria-labelledby="read-h">
        <h2 id="read-h" className="font-display text-2xl font-semibold mb-4">How to read an aspect</h2>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {steps.map((s, i) => (
            <li key={s.t} className="glass-card p-5">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display font-semibold mt-1 mb-1">{s.t}</h3>
              <p className="text-sm text-foreground/75">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12" aria-labelledby="matrix-h">
        <h2 id="matrix-h" className="font-display text-2xl font-semibold mb-1">Every planetary aspect</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Pick a planet, then the planet it aspects. The symbols link to each of the five aspects:{" "}
          {aspectTypes.map((t) => `${t.glyph} ${t.name.toLowerCase()}`).join(", ")}.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {tenPlanets.map((row) => (
            <div key={row.slug} className="glass-card p-5">
              <h3 className="font-display text-lg font-semibold mb-3">
                <span className="text-accent mr-1.5" aria-hidden="true">{planetGlyph(row)}</span>
                <Link href={planetPath(row.slug)} className="hover:text-accent">{row.name}</Link> aspects
              </h3>
              <ul className="space-y-1">
                {tenPlanets.map((col) => (
                  <li key={col.slug} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-foreground/80">
                      <span className="text-accent/80 mr-1.5 inline-block w-4 text-center" aria-hidden="true">{planetGlyph(col)}</span>
                      {row.name} – {col.name}
                    </span>
                    <span className="flex gap-1">
                      {aspectTypes.map((t) => {
                        const x = getAspectFor(row.slug, t.verb, col.slug);
                        return (
                          <Link
                            key={t.slug}
                            href={pathOf(x)}
                            title={x.title}
                            aria-label={x.title}
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary/40 text-foreground/80 hover:bg-primary/40 hover:text-foreground transition-colors"
                          >
                            {t.glyph}
                          </Link>
                        );
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-3xl mx-auto">
        <CtaBanner
          title="See the aspects in your own chart"
          body="Skygram calculates every aspect in your birth chart, with exact orbs, and explains what each one means for you. It's free."
        />
        <Faq items={faqs} title="Aspects FAQ" />
        <AstroNote />
      </div>
    </div>
  );
}
