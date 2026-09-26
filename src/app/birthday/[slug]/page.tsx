import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Gem, Hash, Sparkles, Star } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import AstroNote from "@/components/AstroNote";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { siteConfig, siteLink } from "@/lib/site";
import { pairPath } from "@/lib/compatibility";
import { dateRange, glyphText, mustGetSign, signPath } from "@/lib/zodiac";
import {
  MONTHS,
  birthdayDates,
  birthdayFaqs,
  dateLabel,
  datePath,
  dayNumberMeaning,
  datesInMonth,
  decanRangeText,
  getBirthdayDate,
  getMonthBySlug,
  monthLore,
  monthNumbers,
  monthPath,
  monthSlug,
  neighbourDates,
  ordinal,
  ordinalWord,
  planetFlavour,
  signChangesInMonth,
  type BirthdayDate,
} from "@/lib/birthday";

type Props = { params: Promise<{ slug: string }> };

// Only real dates and months are built; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...monthNumbers.map((m) => ({ slug: monthSlug(m) })), ...birthdayDates.map((d) => ({ slug: d.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const date = getBirthdayDate(slug);
  if (date) {
    const title = `${date.label} Zodiac Sign: ${date.sign.name} Traits & Birthday Meaning`;
    const cuspNote = date.cusp ? ` A ${date.cusp.earlier ? `${date.cusp.other.name}–${date.sign.name}` : `${date.sign.name}–${date.cusp.other.name}`} cusp birthday.` : "";
    const description = `Born on ${date.label}? ${date.cusp ? "You're usually" : "You're"} a ${date.sign.name} in the ${ordinalWord[date.decan - 1]} decan, ruled by ${date.decanRuler} in the Chaldean system.${cuspNote} Explore ${date.label} birthday personality, birthstone and compatibility.`;
    const path = datePath(date.month, date.day);
    return {
      title,
      description,
      keywords: [`${date.label} zodiac sign`, `${date.label} birthday`, `born on ${date.label}`, `${date.sign.name} birthday`],
      alternates: { canonical: path },
      openGraph: { type: "article", title, description, url: path },
      twitter: { title, description },
    };
  }
  const month = getMonthBySlug(slug);
  if (!month) return {};
  const name = MONTHS[month - 1];
  const changes = signChangesInMonth(month);
  const signsInMonth = [...new Set(datesInMonth(month).map((d) => d.sign.name))];
  const title = `${name} Zodiac Signs: Birthday Dates, Signs & Meanings`;
  const description = `${name} birthdays fall under ${signsInMonth.join(" and ")}${changes.length ? `, with the Sun changing signs on ${dateLabel(month, changes[0].date.day)}` : ""}. Find the zodiac sign, decan and birthday meaning for every ${name} date.`;
  return {
    title,
    description,
    alternates: { canonical: monthPath(month) },
    openGraph: { title, description, url: monthPath(month) },
    twitter: { title, description },
  };
}

function Section({ icon: Icon, title, children }: { icon: typeof Star; title: string; children: React.ReactNode }) {
  return (
    <section className="glass-card p-6 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
        <h2 className="font-display text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default async function BirthdayPage({ params }: Props) {
  const slug = (await params).slug;
  const date = getBirthdayDate(slug);
  if (date) return <DatePage date={date} />;
  const month = getMonthBySlug(slug);
  if (month) return <MonthPage month={month} />;
  notFound();
}

function DatePage({ date }: { date: BirthdayDate }) {
  const { sign, cusp } = date;
  const path = datePath(date.month, date.day);
  const lore = monthLore[date.month - 1];
  const flavour = planetFlavour[date.decanRuler];
  const { prev, next } = neighbourDates(date);
  const faqs = birthdayFaqs(date);
  const bestMatch = mustGetSign(sign.bestMatches[0]);
  const cuspName = cusp ? (cusp.earlier ? `${cusp.other.name}–${sign.name}` : `${sign.name}–${cusp.other.name}`) : "";

  // Vary which traits are surfaced by position in the season so neighbouring dates read differently.
  const pick = <T,>(arr: T[], n: number) => Array.from({ length: Math.min(n, arr.length) }, (_, i) => arr[(date.dayInSign + i) % arr.length]);
  const strengths = pick(sign.strengths, 3);
  const challenge = pick(sign.challenges, 1)[0];

  const facts: { label: string; value: React.ReactNode }[] = [
    {
      label: "Zodiac sign",
      value: (
        <Link href={signPath(sign.slug)} className="hover:text-accent underline-offset-4 hover:underline">
          {sign.name} {glyphText(sign)}
        </Link>
      ),
    },
    { label: "Element · Modality", value: `${sign.element} · ${sign.modality}` },
    { label: `Decan (${ordinalWord[date.decan - 1]})`, value: `${date.decanRuler}-ruled` },
    { label: "Birthstone", value: lore.birthstone },
    { label: "Birth flower", value: lore.flower },
    { label: "Season position", value: `Day ${date.dayInSign} of ${date.signLength}` },
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${date.label} Zodiac Sign: ${sign.name} Traits & Birthday Meaning`,
    description: `${date.label} is a ${sign.name} birthday in the ${ordinalWord[date.decan - 1]} decan, ruled by ${date.decanRuler}.`,
    about: { "@type": "Thing", name: `${date.label} birthday (astrology)` },
    mainEntityOfPage: siteLink(path),
    image: siteLink(`${path}/opengraph-image`),
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <JsonLd data={articleLd} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Birthdays", path: "/birthday" },
          { name: MONTHS[date.month - 1], path: monthPath(date.month) },
          { name: date.label, path },
        ]}
      />

      <header className="text-center mb-8">
        <span className="block font-display text-7xl text-accent leading-none mb-3 animate-float" aria-hidden="true">
          {glyphText(sign)}
        </span>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {sign.symbol} · {dateRange(sign)}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          {date.label} <span className="gradient-text">Zodiac Sign</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Born on {date.label}, you&apos;re {cusp ? "usually" : "a"} {cusp ? `a ${sign.name}, on the ${cuspName} cusp` : sign.name} — {sign.tagline.charAt(0).toLowerCase()}
          {sign.tagline.slice(1)}
        </p>
      </header>

      <section aria-label={`${date.label} quick facts`} className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
        {facts.map((f) => (
          <div key={f.label} className="glass-card px-4 py-3">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{f.label}</p>
            <p className="font-medium text-sm mt-0.5">{f.value}</p>
          </div>
        ))}
      </section>

      <Section icon={Sparkles} title={`What astrology says about a ${date.label} birthday`}>
        <div className="space-y-3 text-foreground/80 leading-relaxed">
          <p>
            {date.label} is day {date.dayInSign} of {sign.name} season, so astrologers link it with the sign&apos;s core character: {sign.keywords.slice(0, 4).join(", ").toLowerCase()}.
            {" "}Traits astrologers commonly associate with {sign.name} include {strengths.map((s) => s.charAt(0).toLowerCase() + s.slice(1)).join("; ")}.
          </p>
          <p>
            A commonly cited growth area for {sign.name}: {challenge.charAt(0).toLowerCase() + challenge.slice(1)}. For the full picture of the sign, read the{" "}
            <Link href={signPath(sign.slug)} className="text-accent underline-offset-4 hover:underline">{sign.name} guide</Link>.
          </p>
        </div>
      </Section>

      <Section icon={Star} title={`${ordinal(date.decan)} decan of ${sign.name}: ${date.decanRuler}`}>
        <p className="text-foreground/80 leading-relaxed mb-3">
          Each sign is divided into three decans, 10° slices that the Sun crosses in about ten days each. {date.label} falls in the {ordinalWord[date.decan - 1]} decan of {sign.name} (about {decanRangeText(date)}),
          which the traditional Chaldean system assigns to {date.decanRuler}. Astrologers say that adds {flavour.adds}.
        </p>
        <p className="text-foreground/80 leading-relaxed">{flavour.effect}</p>
      </Section>

      {cusp && (
        <Section icon={Calendar} title={`A ${cuspName} cusp birthday`}>
          <p className="text-foreground/80 leading-relaxed mb-3">
            {date.label} is the {cusp.edge === "first" || cusp.edge === "last" ? (cusp.edge === "first" ? "first" : "last") : cusp.edge === "second" ? "second" : "second-to-last"} day of {sign.name} season, right beside{" "}
            <Link href={signPath(cusp.other.slug)} className="text-accent underline-offset-4 hover:underline">{cusp.other.name}</Link>.
            It is often said that people born this close to a boundary show traits of both signs: {cusp.other.name}&apos;s {cusp.other.keywords.slice(0, 2).join(" and ").toLowerCase()} alongside {sign.name}&apos;s {sign.keywords.slice(0, 2).join(" and ").toLowerCase()}.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Astrology doesn&apos;t recognise a blended sign, and the exact moment the Sun changes signs shifts from year to year. Only a chart calculated from your birth year, time and place can confirm which side of the line you were born on.
          </p>
        </Section>
      )}

      <Section icon={Hash} title={`The number ${date.day} in numerology`}>
        <p className="text-foreground/80 leading-relaxed">{dayNumberMeaning[date.day]}</p>
        <p className="text-xs text-muted-foreground mt-3">Numerology is a separate tradition from astrology and is offered here for interest.</p>
      </Section>

      <Section icon={Gem} title={`${MONTHS[date.month - 1]} birthstone and flower`}>
        <p className="text-foreground/80 leading-relaxed">
          The modern birthstone for {MONTHS[date.month - 1]} is <strong className="text-foreground">{lore.birthstone}</strong> and the commonly listed birth flower is the{" "}
          <strong className="text-foreground">{lore.flower.toLowerCase()}</strong>. {MONTHS[date.month - 1]} falls in {lore.season}.
        </p>
      </Section>

      <section className="glass-card p-6 mb-6">
        <h2 className="font-display text-xl font-semibold mb-2">{sign.name} love and compatibility</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">{sign.love[0]}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link href={pairPath(sign.slug, bestMatch.slug)} className="rounded-lg bg-secondary/40 px-3 py-1.5 hover:bg-secondary/70 transition-colors">
            {sign.name} &amp; {bestMatch.name} compatibility
          </Link>
          <Link href={`/compatibility`} className="rounded-lg bg-secondary/40 px-3 py-1.5 hover:bg-secondary/70 transition-colors">
            All {sign.name} pairings
          </Link>
        </div>
      </section>

      <AstroNote />

      <CtaBanner
        title={`Beyond your ${date.label} Sun sign`}
        body={`Your ${sign.name} Sun is one planet. Your Moon, Rising sign and the exact ${date.decanRuler}-ruled decan details live in your full natal chart. Get yours free on Skygram.`}
      />

      <Faq items={faqs} title={`${date.label} birthday FAQ`} />

      <nav className="grid grid-cols-2 gap-3 mt-8" aria-label="Adjacent birthdays">
        <Link href={datePath(prev.month, prev.day)} className="glass-card px-4 py-3 hover:border-primary/40 transition-colors">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="w-3 h-3" aria-hidden="true" /> Day before
          </span>
          <span className="font-display font-semibold">{prev.label} · {prev.sign.name}</span>
        </Link>
        <Link href={datePath(next.month, next.day)} className="glass-card px-4 py-3 text-right hover:border-primary/40 transition-colors">
          <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            Day after <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </span>
          <span className="font-display font-semibold">{next.label} · {next.sign.name}</span>
        </Link>
      </nav>
      <p className="text-center mt-4 text-sm">
        <Link href={monthPath(date.month)} className="text-muted-foreground hover:text-foreground transition-colors">
          All {MONTHS[date.month - 1]} birthdays
        </Link>
      </p>
    </article>
  );
}

function MonthPage({ month }: { month: number }) {
  const name = MONTHS[month - 1];
  const dates = datesInMonth(month);
  const changes = signChangesInMonth(month);
  const lore = monthLore[month - 1];
  const path = monthPath(month);
  const prevMonth = ((month + 10) % 12) + 1;
  const nextMonth = (month % 12) + 1;
  const signsInMonth = [...new Map(dates.map((d) => [d.sign.slug, d.sign])).values()];

  const faqs = [
    {
      q: `What zodiac signs are ${name} birthdays?`,
      a: `${name} birthdays are ${signsInMonth.map((s) => s.name).join(" and ")}. ${
        changes.length
          ? `The Sun moves from ${changes[0].from.name} into ${changes[0].to.name} on ${dateLabel(month, changes[0].date.day)}, though the exact day can shift by one in some years.`
          : `The whole month sits inside ${signsInMonth[0].name}.`
      }`,
    },
    {
      q: `What is the ${name} birthstone?`,
      a: `The modern ${name} birthstone is ${lore.birthstone}, and the birth flower is the ${lore.flower.toLowerCase()}. These are calendar traditions rather than part of astrology.`,
    },
  ];

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${name} birthdays and zodiac signs`,
    itemListElement: dates.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: d.label, url: siteLink(datePath(d.month, d.day)) })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <JsonLd data={itemListLd} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Birthdays", path: "/birthday" }, { name, path }]} />

      <header className="text-center mb-8">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">{name}</span> Birthdays &amp; Zodiac Signs
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {name} babies are {signsInMonth.map((s) => s.name).join(" and ")}
          {changes.length ? `, with the Sun changing signs on ${dateLabel(month, changes[0].date.day)}` : ""}. Tap a date for its sign, decan and birthday meaning.
        </p>
        <p className="text-sm text-muted-foreground mt-3">
          Birthstone: {lore.birthstone} · Birth flower: {lore.flower}
        </p>
      </header>

      <ul className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2 mb-10" aria-label={`${name} dates`}>
        {dates.map((d) => (
          <li key={d.slug}>
            <Link
              href={datePath(d.month, d.day)}
              className="glass-card block px-3 py-2.5 text-center hover:-translate-y-0.5 hover:border-primary/40 transition-all"
            >
              <span className="block font-display text-lg font-semibold">{d.day}</span>
              <span className="block text-[11px] text-muted-foreground">
                <span className="text-accent" aria-hidden="true">{glyphText(d.sign)}</span> {d.sign.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mb-10">
        <h2 className="font-display text-2xl font-semibold mb-4">Signs in {name}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {signsInMonth.map((s) => {
            const inMonth = dates.filter((d) => d.sign.slug === s.slug);
            return (
              <div key={s.slug} className="glass-card p-5">
                <h3 className="font-display text-lg font-semibold mb-1">
                  <Link href={signPath(s.slug)} className="hover:text-accent transition-colors">{s.name} {glyphText(s)}</Link>
                </h3>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {name} {inMonth[0].day}
                  {inMonth.length > 1 ? `–${inMonth[inMonth.length - 1].day}` : ""}
                </p>
                <p className="text-sm text-foreground/75">{s.tagline}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="max-w-3xl mx-auto">
        <AstroNote />
        <CtaBanner />
        <Faq items={faqs} title={`${name} birthday FAQ`} />
      </div>

      <nav className="grid grid-cols-2 gap-3 mt-8 max-w-3xl mx-auto" aria-label="Adjacent months">
        <Link href={monthPath(prevMonth)} className="glass-card px-4 py-3 hover:border-primary/40 transition-colors">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="w-3 h-3" aria-hidden="true" /> Previous month
          </span>
          <span className="font-display font-semibold">{MONTHS[prevMonth - 1]}</span>
        </Link>
        <Link href={monthPath(nextMonth)} className="glass-card px-4 py-3 text-right hover:border-primary/40 transition-colors">
          <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            Next month <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </span>
          <span className="font-display font-semibold">{MONTHS[nextMonth - 1]}</span>
        </Link>
      </nav>
    </div>
  );
}
