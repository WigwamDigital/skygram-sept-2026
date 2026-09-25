import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Briefcase, Check, Heart, Sparkles, Users, Zap } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import SignCard from "@/components/zodiac/SignCard";
import { siteConfig, siteLink } from "@/lib/site";
import { pairPath, pairingsFor } from "@/lib/compatibility";
import { placementPath, placementsForSign } from "@/lib/placements";
import {
  dateRange,
  elements,
  glyphText,
  modalities,
  mustGetSign,
  neighbours,
  signFaqs,
  signPath,
  signs,
  getSign,
} from "@/lib/zodiac";

type Props = { params: Promise<{ sign: string }> };

// Only the 12 known signs are built; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return signs.map((s) => ({ sign: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sign = getSign((await params).sign);
  if (!sign) return {};
  const title = `${sign.name} Zodiac Sign: Dates, Traits, Love & Compatibility`;
  const description = `${sign.name} (${dateRange(sign)}) is a ${sign.modality.toLowerCase()} ${sign.element.toLowerCase()} sign ruled by ${sign.ruler}. ${sign.tagline} Explore ${sign.name} personality, love, career and best matches.`;
  const path = signPath(sign.slug);
  return {
    title,
    description,
    keywords: [`${sign.name}`, `${sign.name} traits`, `${sign.name} compatibility`, `${sign.name} dates`, `${sign.name} zodiac sign`],
    alternates: { canonical: path },
    openGraph: { type: "article", title, description, url: path },
    twitter: { title, description },
  };
}

function Section({ icon: Icon, title, children }: { icon: typeof Heart; title: string; children: React.ReactNode }) {
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

export default async function SignPage({ params }: Props) {
  const sign = getSign((await params).sign);
  if (!sign) notFound();

  const { prev, next } = neighbours(sign.slug);
  const opposite = mustGetSign(sign.opposite);
  const siblings = elements[sign.element].signs.filter((s) => s !== sign.slug).map(mustGetSign);
  const faqs = signFaqs(sign);
  const path = signPath(sign.slug);

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: "Dates", value: dateRange(sign, true) },
    { label: "Element", value: sign.element },
    { label: "Modality", value: sign.modality },
    {
      label: "Ruling planet",
      value: sign.traditionalRuler ? `${sign.ruler} (trad. ${sign.traditionalRuler})` : sign.ruler,
    },
    { label: "Symbol", value: sign.symbol },
    {
      label: "Opposite sign",
      value: (
        <Link href={signPath(opposite.slug)} className="hover:text-accent transition-colors underline-offset-4 hover:underline">
          {opposite.name}
        </Link>
      ),
    },
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${sign.name} Zodiac Sign: Dates, Traits, Love & Compatibility`,
    description: sign.tagline,
    about: { "@type": "Thing", name: `${sign.name} (astrology)` },
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
          { name: "Zodiac Signs", path: "/zodiac" },
          { name: sign.name, path },
        ]}
      />

      {/* Hero */}
      <header className="text-center mb-8">
        <span className="block font-display text-7xl text-accent leading-none mb-3 animate-float" aria-hidden="true">
          {glyphText(sign)}
        </span>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {sign.symbol} · {dateRange(sign)}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">{sign.name}</span> Zodiac Sign
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">{sign.tagline}</p>
      </header>

      {/* Quick facts */}
      <section aria-label={`${sign.name} quick facts`} className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {facts.map((f) => (
          <div key={f.label} className="glass-card px-4 py-3">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{f.label}</p>
            <p className="font-medium text-sm mt-0.5">{f.value}</p>
          </div>
        ))}
      </section>

      <ul className="flex flex-wrap justify-center gap-2 mb-8" aria-label={`${sign.name} keywords`}>
        {sign.keywords.map((k) => (
          <li key={k} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-foreground/85">
            {k}
          </li>
        ))}
      </ul>

      <Section icon={Sparkles} title={`${sign.name} personality`}>
        <div className="space-y-3 text-foreground/80 leading-relaxed">
          {sign.overview.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </Section>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" aria-hidden="true" /> Strengths
          </h2>
          <ul className="space-y-2 text-sm text-foreground/80">
            {sign.strengths.map((s) => (
              <li key={s} className="flex gap-2">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-green-400" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </section>
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-accent" aria-hidden="true" /> Growth areas
          </h2>
          <ul className="space-y-2 text-sm text-foreground/80">
            {sign.challenges.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Section icon={Heart} title={`${sign.name} in love`}>
        <div className="space-y-3 text-foreground/80 leading-relaxed">
          {sign.love.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </Section>

      <Section icon={Users} title={`${sign.name} as a friend`}>
        <p className="text-foreground/80 leading-relaxed">{sign.friendship}</p>
      </Section>

      <Section icon={Briefcase} title={`${sign.name} at work`}>
        <p className="text-foreground/80 leading-relaxed mb-4">{sign.career}</p>
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Careers that suit {sign.name}</p>
        <ul className="flex flex-wrap gap-2">
          {sign.careerPaths.map((c) => (
            <li key={c} className="rounded-lg bg-secondary/40 px-3 py-1.5 text-sm">{c}</li>
          ))}
        </ul>
      </Section>

      {/* Compatibility */}
      <section className="glass-card p-6 mb-6" aria-labelledby="compat-heading">
        <h2 id="compat-heading" className="font-display text-xl font-semibold mb-1">{sign.name} compatibility</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Traditional Sun-sign matches — tap a sign for the full pairing. For the real picture, Skygram compares every planet in both charts.
        </p>
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Best matches</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          {sign.bestMatches.map((m) => (
            <SignCard key={m} sign={mustGetSign(m)} compact href={pairPath(sign.slug, m)} />
          ))}
        </div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Challenging matches</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {sign.challengingMatches.map((m) => (
            <SignCard key={m} sign={mustGetSign(m)} compact href={pairPath(sign.slug, m)} />
          ))}
        </div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground mt-6 mb-2">{sign.name} with every sign</p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {pairingsFor(sign.slug).map(({ partner, pairing }) => (
            <li key={partner.slug}>
              <Link
                href={pairPath(sign.slug, partner.slug)}
                className="flex items-center justify-between gap-2 rounded-lg bg-secondary/30 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
              >
                <span>
                  {sign.name} & {partner.name}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{pairing.scores.overall}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Element & modality */}
      <section className="glass-card p-6 mb-6">
        <h2 className="font-display text-xl font-semibold mb-3">
          {sign.name} as a {sign.modality.toLowerCase()} {sign.element.toLowerCase()} sign
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-2">
          <strong className="text-foreground">{sign.element}:</strong> {elements[sign.element].description}
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          <strong className="text-foreground">{sign.modality}:</strong> {modalities[sign.modality]}
        </p>
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Other {sign.element.toLowerCase()} signs</p>
        <div className="grid grid-cols-2 gap-2 max-w-sm">
          {siblings.map((s) => (
            <SignCard key={s.slug} sign={s} compact />
          ))}
        </div>
      </section>

      {/* Other placements in this sign */}
      <section className="glass-card p-6 mb-6" aria-labelledby="placements-heading">
        <h2 id="placements-heading" className="font-display text-xl font-semibold mb-1">{sign.name} placements</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Your Sun is only one planet. Here&apos;s how {sign.name} shows up in the rest of the chart.
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {placementsForSign(sign.slug).map((pl) => (
            <li key={pl.slug}>
              <Link
                href={placementPath(pl.point.slug, sign.slug)}
                className="block rounded-lg bg-secondary/30 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
              >
                <span className="block font-medium">{pl.title}</span>
                <span className="block text-[11px] text-muted-foreground">{pl.point.domain}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBanner title={`More than a ${sign.name}`} />

      <Faq items={faqs} title={`${sign.name} FAQ`} />

      {/* Prev / next */}
      <nav className="grid grid-cols-2 gap-3 mt-8" aria-label="More zodiac signs">
        <Link href={signPath(prev.slug)} className="glass-card px-4 py-3 hover:border-primary/40 transition-colors">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="w-3 h-3" aria-hidden="true" /> Previous sign
          </span>
          <span className="font-display font-semibold">{glyphText(prev)} {prev.name}</span>
        </Link>
        <Link href={signPath(next.slug)} className="glass-card px-4 py-3 text-right hover:border-primary/40 transition-colors">
          <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            Next sign <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </span>
          <span className="font-display font-semibold">{next.name} {glyphText(next)}</span>
        </Link>
      </nav>
    </article>
  );
}
