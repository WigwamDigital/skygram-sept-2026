import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import SignCard from "@/components/zodiac/SignCard";
import SignFinder from "@/components/zodiac/SignFinder";
import { siteLink } from "@/lib/site";
import LegacySections from "@/components/legacy/LegacySections";
import { zodiacHubExtras } from "@/lib/zodiac/legacy";

const guide = zodiacHubExtras();
import { dateRange, elements, modalities, mustGetSign, signPath, signs, type Element, type Modality } from "@/lib/zodiac";

const title = "The 12 Zodiac Signs: Dates, Elements, Traits & Compatibility";
const description =
  "Explore all 12 zodiac signs — Aries to Pisces. Find your sign by birthday and learn each sign's dates, element, ruling planet, personality, love style and best matches.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/zodiac" },
  openGraph: { title, description, url: "/zodiac" },
  twitter: { title, description },
};

const faqs = [
  {
    q: "What are the 12 zodiac signs in order?",
    a: `In order, the zodiac signs are ${signs.map((s) => s.name).join(", ")}. The zodiac year begins with Aries at the spring equinox around March 21.`,
  },
  {
    q: "How do I find my zodiac sign?",
    a: "Your Sun sign is based on where the Sun was on the day you were born. Use the finder above with your birthday. If you were born on the first or last day of a sign, your exact birth time decides it — your full natal chart on Skygram will tell you for certain.",
  },
  {
    q: "What are the four zodiac elements?",
    a: "The zodiac is divided into four elements: Fire (Aries, Leo, Sagittarius), Earth (Taurus, Virgo, Capricorn), Air (Gemini, Libra, Aquarius) and Water (Cancer, Scorpio, Pisces). Each element describes a core temperament.",
  },
  {
    q: "Is my Sun sign all that matters?",
    a: "No. Your Sun sign describes your core identity, but your Moon sign (emotions), Rising sign (how others see you) and the positions of Venus, Mars and the other planets add essential detail. That's why two people with the same Sun sign can be very different.",
  },
];

export default function ZodiacHubPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "The 12 zodiac signs",
    itemListElement: signs.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: siteLink(signPath(s.slug)),
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd data={itemListLd} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Zodiac Signs", path: "/zodiac" }]} />

      <header className="text-center mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          The 12 <span className="gradient-text">Zodiac Signs</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Dates, elements, personality traits and compatibility for every sign — from bold Aries to dreamy Pisces.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 mb-12 items-start">
        <section aria-label="All zodiac signs" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-3">
          {signs.map((s) => (
            <SignCard key={s.slug} sign={s} />
          ))}
        </section>
        <div className="lg:sticky lg:top-20">
          <SignFinder />
        </div>
      </div>

      <section className="mb-12" aria-labelledby="elements-heading">
        <h2 id="elements-heading" className="font-display text-2xl font-semibold mb-4">The four elements</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {(Object.keys(elements) as Element[]).map((el) => (
            <div key={el} className="glass-card p-5">
              <h3 className="font-display text-lg font-semibold mb-1">{el} signs</h3>
              <p className="text-sm text-foreground/75 mb-3">{elements[el].description}</p>
              <ul className="flex flex-wrap gap-2">
                {elements[el].signs.map(mustGetSign).map((s) => (
                  <li key={s.slug}>
                    <Link href={signPath(s.slug)} className="rounded-lg bg-secondary/40 px-3 py-1.5 text-sm hover:bg-secondary/70 transition-colors inline-block">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12" aria-labelledby="modalities-heading">
        <h2 id="modalities-heading" className="font-display text-2xl font-semibold mb-4">The three modalities</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {(Object.keys(modalities) as Modality[]).map((m) => (
            <div key={m} className="glass-card p-5">
              <h3 className="font-display text-lg font-semibold mb-1">{m}</h3>
              <p className="text-sm text-foreground/75 mb-3">{modalities[m]}</p>
              <p className="text-xs text-muted-foreground">
                {signs.filter((s) => s.modality === m).map((s) => s.name).join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 overflow-x-auto" aria-labelledby="dates-heading">
        <h2 id="dates-heading" className="font-display text-2xl font-semibold mb-4">Zodiac sign dates</h2>
        <table className="w-full glass-card text-sm overflow-hidden">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/50">
              <th className="px-4 py-3 font-medium">Sign</th>
              <th className="px-4 py-3 font-medium">Dates</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Element</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Ruling planet</th>
            </tr>
          </thead>
          <tbody>
            {signs.map((s) => (
              <tr key={s.slug} className="border-b border-border/30 last:border-0">
                <td className="px-4 py-2.5">
                  <Link href={signPath(s.slug)} className="font-medium hover:text-accent transition-colors">{s.name}</Link>
                </td>
                <td className="px-4 py-2.5 text-foreground/80">{dateRange(s)}</td>
                <td className="px-4 py-2.5 text-foreground/80 hidden sm:table-cell">{s.element}</td>
                <td className="px-4 py-2.5 text-foreground/80 hidden sm:table-cell">{s.ruler}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {guide && (
        <section className="max-w-3xl mx-auto" aria-label="Zodiac signs guide">
          <LegacySections page={guide} showIntro={false} />
        </section>
      )}

      <div className="max-w-3xl mx-auto">
        <CtaBanner />
        <Faq items={[...faqs, ...(guide?.faqs ?? [])]} title="Zodiac sign FAQ" />
      </div>
    </div>
  );
}
