import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Heart, Lightbulb, MessageCircle, Orbit, Users } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ScoreBars from "@/components/compatibility/ScoreBars";
import ScoreRing from "@/components/compatibility/ScoreRing";
import { appLink, siteConfig, siteLink } from "@/lib/site";
import { dateRange, glyphText, signPath, type ZodiacSign } from "@/lib/zodiac";
import { getPairing, pairFaqs, pairPath, pairTitle, pairings, pairingsFor, traitsOf } from "@/lib/compatibility";

type Props = { params: Promise<{ pair: string }> };

// Only the 78 canonical pairs are built. Reverse order (e.g. leo-and-aries) is redirected in next.config.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return pairings.map((p) => ({ pair: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPairing((await params).pair);
  if (!p) return {};
  const title = `${pairTitle(p)}: Love, Friendship & Score (${p.scores.overall}/100)`;
  const description = `${p.a.name} and ${p.b.name}: ${p.tagline} See their love, friendship, communication and trust scores, strengths, challenges and tips.`;
  const path = pairPath(p.a.slug, p.b.slug);
  return {
    title,
    description,
    keywords: [
      `${p.a.name} and ${p.b.name} compatibility`,
      `${p.b.name} and ${p.a.name} compatibility`,
      `${p.a.name} ${p.b.name} love`,
      `${p.a.name} ${p.b.name} friendship`,
    ],
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

function SignBadge({ sign }: { sign: ZodiacSign }) {
  return (
    <Link href={signPath(sign.slug)} className="group flex flex-col items-center">
      <span className="font-display text-5xl sm:text-6xl text-accent leading-none mb-1 group-hover:scale-105 transition-transform" aria-hidden="true">
        {glyphText(sign)}
      </span>
      <span className="font-display font-semibold group-hover:text-accent transition-colors">{sign.name}</span>
      <span className="text-[11px] text-muted-foreground">{dateRange(sign, true)}</span>
    </Link>
  );
}

function PartnerLinks({ sign, exclude }: { sign: ZodiacSign; exclude: string }) {
  return (
    <div>
      <h3 className="font-display font-semibold mb-3">{sign.name} compatibility with other signs</h3>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {pairingsFor(sign.slug)
          .filter(({ pairing }) => pairing.slug !== exclude)
          .map(({ partner, pairing }) => (
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
    </div>
  );
}

export default async function PairPage({ params }: Props) {
  const p = getPairing((await params).pair);
  if (!p) notFound();

  const { a, b } = p;
  const path = pairPath(a.slug, b.slug);
  const ta = traitsOf(a);
  const tb = traitsOf(b);
  const faqs = pairFaqs(p);
  const sameRuler = a.ruler === b.ruler;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pairTitle(p),
    description: p.tagline,
    about: [
      { "@type": "Thing", name: `${a.name} (astrology)` },
      { "@type": "Thing", name: `${b.name} (astrology)` },
    ],
    mainEntityOfPage: siteLink(path),
    image: siteLink(`${path}/opengraph-image`),
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  const facts = [
    { label: "Elements", value: `${a.element} + ${b.element}` },
    { label: "Modalities", value: `${a.modality} + ${b.modality}` },
    { label: "Aspect", value: `${p.aspect.name} (${p.aspect.angle})` },
    { label: "Rulers", value: sameRuler ? `${a.ruler} (shared)` : `${a.ruler} + ${b.ruler}` },
  ];

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <JsonLd data={articleLd} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Compatibility", path: "/compatibility" },
          { name: `${a.name} & ${b.name}`, path },
        ]}
      />

      {/* Hero */}
      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-5">
          <SignBadge sign={a} />
          <Heart className="w-6 h-6 text-pink-cta shrink-0 animate-pulse-glow" aria-hidden="true" />
          <SignBadge sign={b} />
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">{a.name}</span> and <span className="gradient-text">{b.name}</span> Compatibility
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">{p.tagline}</p>
      </header>

      {/* Scores */}
      <section className="glass-card cosmic-glow p-6 mb-6" aria-labelledby="score-heading">
        <h2 id="score-heading" className="sr-only">Compatibility score</h2>
        <div className="grid sm:grid-cols-[auto_1fr] gap-6 items-center">
          <div className="flex flex-col items-center">
            <ScoreRing score={p.scores.overall} label="of 100" />
            <p className="font-display font-semibold mt-2">{p.verdict}</p>
          </div>
          <ScoreBars scores={p.scores} />
        </div>
        <p className="text-xs text-muted-foreground mt-5">
          Sun-sign estimate based on element, modality and aspect.{" "}
          <Link href="/methodology" className="underline underline-offset-2 hover:text-foreground">How Skygram scores full charts</Link>.
        </p>
      </section>

      <section aria-label="Pairing facts" className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {facts.map((f) => (
          <div key={f.label} className="glass-card px-4 py-3">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{f.label}</p>
            <p className="font-medium text-sm mt-0.5">{f.value}</p>
          </div>
        ))}
      </section>

      <Section icon={Orbit} title="Overview">
        <div className="space-y-3 text-foreground/80 leading-relaxed">
          <p>
            <strong className="text-foreground">{p.aspect.name}:</strong> {p.aspect.text}
          </p>
          <p>{p.element.summary}</p>
          <p>{p.modality.text}</p>
        </div>
      </Section>

      <Section icon={Heart} title={`${a.name} and ${b.name} in love`}>
        <div className="space-y-3 text-foreground/80 leading-relaxed">
          <p>{p.element.love}</p>
          {p.same ? (
            <p>
              Two {a.name}s both bring {ta.gives} — and both need {ta.needs}. Knowing that you want the same things makes it
              easier to give them to each other.
            </p>
          ) : (
            <>
              <p>
                {a.name} brings {ta.gives}, and in return needs {ta.needs}.
              </p>
              <p>
                {b.name} brings {tb.gives}, and in return needs {tb.needs}.
              </p>
            </>
          )}
        </div>
      </Section>

      <Section icon={Users} title={`${a.name} and ${b.name} as friends`}>
        <p className="text-foreground/80 leading-relaxed">{p.element.friendship}</p>
      </Section>

      <Section icon={MessageCircle} title="Communication">
        <p className="text-foreground/80 leading-relaxed">
          {p.element.communication}{" "}
          {sameRuler
            ? `Sharing ${a.ruler} as a ruling planet gives them a common instinct for how to connect.`
            : `${a.name} is ruled by ${a.ruler} and ${b.name} by ${b.ruler}, so they bring different instincts to every conversation.`}
        </p>
      </Section>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold mb-3">What works</h2>
          <ul className="space-y-2 text-sm text-foreground/80">
            {p.strengths.map((s) => (
              <li key={s} className="flex gap-2">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-green-400" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </section>
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold mb-3">What needs work</h2>
          <ul className="space-y-2 text-sm text-foreground/80">
            {p.challenges.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Section icon={Lightbulb} title="Making it work">
        <p className="text-foreground/80 leading-relaxed">{p.element.tip}</p>
      </Section>

      <CtaBanner
        title={`Is your ${a.name}–${b.name} bond above average?`}
        body="Sun signs are only the start. Skygram compares every planet in both birth charts to calculate your real compatibility score — for partners and friends."
        cta="Check our real compatibility"
        href={appLink("/compatibility-calculator")}
      />

      <Faq items={faqs} title={`${a.name} & ${b.name} FAQ`} />

      <section className="glass-card p-6 space-y-6" aria-label="More compatibility pairings">
        <PartnerLinks sign={a} exclude={p.slug} />
        {!p.same && <PartnerLinks sign={b} exclude={p.slug} />}
      </section>
    </article>
  );
}
