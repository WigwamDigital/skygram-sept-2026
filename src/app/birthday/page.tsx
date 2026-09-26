import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import SignFinder from "@/components/zodiac/SignFinder";
import { siteLink } from "@/lib/site";
import { MONTHS, datePath, datesInSign, monthNumbers, monthPath, signChangesInMonth } from "@/lib/birthday";
import { dateRange, glyphText, signPath, signs } from "@/lib/zodiac";

const title = "Birthday Zodiac Signs: Find Your Sign for Every Date of the Year";
const description =
  "Look up the zodiac sign for any birthday. Browse all 12 months and 366 dates for each date's sign, decan, cusp status, birthstone and personality.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/birthday" },
  openGraph: { title, description, url: "/birthday" },
  twitter: { title, description },
};

const faqs = [
  {
    q: "How do I find my zodiac sign from my birthday?",
    a: "Pick your birth month below, then your date. Each page shows the tropical zodiac sign for that day, plus its decan and whether it sits on a cusp.",
  },
  {
    q: "What is a decan?",
    a: "A decan is one third of a zodiac sign, a 10° slice of the zodiac, which the Sun crosses in about ten days. In the traditional Chaldean system each decan has its own ruling planet, which astrologers say adds a second flavour to the sign. Some modern astrologers assign decan rulers differently.",
  },
  {
    q: "What is a cusp birthday?",
    a: "A cusp birthday falls within a day or two of the boundary between two signs. It is often said that people born then show traits of both signs, but astrology assigns the Sun to just one, and only a chart calculated from your birth year, time and place shows which.",
  },
  {
    q: "Do zodiac sign dates change every year?",
    a: "Slightly. The Sun enters each sign at a slightly different moment each year, so the boundary can fall a day or so either side of the usual dates. The dates on this site are the standard tropical ranges used in most horoscopes.",
  },
];

export default function BirthdayHubPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Birthday zodiac signs by month",
    itemListElement: monthNumbers.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: MONTHS[m - 1], url: siteLink(monthPath(m)) })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd data={itemListLd} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Birthdays", path: "/birthday" }]} />

      <header className="text-center mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          Birthday <span className="gradient-text">Zodiac Signs</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose a month to see the zodiac sign, decan and meaning of every birthday in the year.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 mb-12 items-start">
        <section aria-label="Birthday months" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {monthNumbers.map((m) => {
            const changes = signChangesInMonth(m);
            return (
              <Link key={m} href={monthPath(m)} className="glass-card p-4 hover:-translate-y-0.5 hover:border-primary/40 transition-all">
                <span className="block font-display text-lg font-semibold">{MONTHS[m - 1]}</span>
                <span className="block text-xs text-muted-foreground mt-1">
                  {changes.length ? `${changes[0].from.name} → ${changes[0].to.name} on the ${changes[0].date.day}` : "One sign all month"}
                </span>
              </Link>
            );
          })}
        </section>
        <div className="lg:sticky lg:top-20">
          <SignFinder />
        </div>
      </div>

      <section className="mb-12" aria-labelledby="by-sign-heading">
        <h2 id="by-sign-heading" className="font-display text-2xl font-semibold mb-4">Birthdays by zodiac sign</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {signs.map((s) => (
            <div key={s.slug} className="glass-card p-5">
              <h3 className="font-display text-lg font-semibold">
                <Link href={signPath(s.slug)} className="hover:text-accent transition-colors">{s.name} {glyphText(s)}</Link>
              </h3>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{dateRange(s)}</p>
              <ul className="flex flex-wrap gap-1">
                {datesInSign(s.slug).map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={datePath(d.month, d.day)}
                      className="inline-block rounded-md bg-secondary/40 px-2 py-0.5 text-xs hover:bg-secondary/70 transition-colors"
                      aria-label={d.label}
                    >
                      {d.month}/{d.day}
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
        <Faq items={faqs} title="Birthday zodiac FAQ" />
      </div>
    </div>
  );
}
