import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Heart, Moon, Sparkles, Sun } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import AstroNote from "@/components/AstroNote";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { siteConfig, siteLink } from "@/lib/site";
import { placementPath } from "@/lib/placements";
import { glyphText, signPath } from "@/lib/zodiac";
import { getSunMoon, getSunMoonFor, sunMoonFaqs, sunMoonPath, sunMoons, sunMoonsForMoon, sunMoonsForSun } from "@/lib/sunmoon";

type Props = { params: Promise<{ combo: string }> };

// Only the 144 real combinations are built; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return sunMoons.map((c) => ({ combo: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getSunMoon((await params).combo);
  if (!c) return {};
  const title = `${c.title}: Personality, Emotions & Love`;
  const an = (e: string) => (e === "Earth" || e === "Air" ? "an" : "a");
  const link = c.sun.slug === c.moon.slug ? "same-sign Sun and Moon" : c.relation.name.replace(/^([^(]+?) \((.*)\)$/, (_, n, d) => `${n.toLowerCase()}, ${d.toLowerCase()}`);
  const description = `${c.sun.name} Sun with ${c.moon.name} Moon: ${an(c.sun.element)} ${c.sun.element.toLowerCase()} identity with ${an(c.moon.element)} ${c.moon.element.toLowerCase()} emotional core (${link}). Strengths, growth edges and how the two work together.`;
  const path = sunMoonPath(c.sun.slug, c.moon.slug);
  return {
    title,
    description,
    keywords: [c.title, `${c.sun.name} sun ${c.moon.name} moon`, `${c.sun.name} sun ${c.moon.name} moon personality`, "sun and moon sign combination"],
    alternates: { canonical: path },
    openGraph: { type: "article", title, description, url: path },
    twitter: { title, description },
  };
}

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export default async function SunMoonPage({ params }: Props) {
  const c = getSunMoon((await params).combo);
  if (!c) notFound();

  const { sun, moon, relation } = c;
  const path = sunMoonPath(sun.slug, moon.slug);
  const same = sun.slug === moon.slug;
  const reverse = same ? null : getSunMoonFor(moon.slug, sun.slug);
  const faqs = sunMoonFaqs(c);
  const shortRelation = relation.name.replace(/ \(.*\)/, "");

  const facts: { label: string; value: string }[] = [
    { label: "Sun sign", value: `${sun.name} ${glyphText(sun)}` },
    { label: "Moon sign", value: `${moon.name} ${glyphText(moon)}` },
    { label: "Sun–Moon link", value: same ? "Same sign" : `${relation.name} · ${relation.angle}` },
    { label: "Elements", value: `${sun.element} Sun · ${moon.element} Moon` },
    { label: "Modalities", value: `${sun.modality} · ${moon.modality}` },
    { label: "Rulers", value: `${sun.ruler} & ${moon.ruler}` },
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.title}: Personality, Emotions & Love`,
    description: `${sun.name} Sun with ${moon.name} Moon: how your identity and emotional nature work together.`,
    about: { "@type": "Thing", name: `${c.title} (astrology)` },
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
          { name: "Sun & Moon Signs", path: "/sun-moon" },
          { name: c.title, path },
        ]}
      />

      <header className="text-center mb-8">
        <span className="block font-display text-6xl text-accent leading-none mb-3" aria-hidden="true">
          {glyphText(sun)} {glyphText(moon)}
        </span>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Sun {sun.name} · Moon {moon.name}</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">{sun.name} Sun</span> {moon.name} Moon
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          {sun.name} on the outside, {moon.name} on the inside — {lowerFirst(c.elementText.split(/(?<=[.!?])\s/)[0])}
        </p>
      </header>

      <section aria-label={`${c.title} quick facts`} className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
        {facts.map((f) => (
          <div key={f.label} className="glass-card px-4 py-3">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{f.label}</p>
            <p className="font-medium text-sm mt-0.5">{f.value}</p>
          </div>
        ))}
      </section>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold mb-2 flex items-center gap-2">
            <Sun className="w-5 h-5 text-accent" aria-hidden="true" /> {sun.name} Sun: who you are
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">{sun.tagline}</p>
          <p className="text-xs text-muted-foreground mb-3">{sun.keywords.slice(0, 4).join(" · ")}</p>
          <Link href={signPath(sun.slug)} className="text-sm text-accent underline-offset-4 hover:underline">
            Read the {sun.name} guide
          </Link>
        </section>
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold mb-2 flex items-center gap-2">
            <Moon className="w-5 h-5 text-accent" aria-hidden="true" /> {moon.name} Moon: what you feel
          </h2>
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">{c.moonPlacement.text.blurb}</p>
          <p className="text-xs text-muted-foreground mb-3">{c.moonPlacement.text.keywords.join(" · ")}</p>
          <Link href={placementPath("moon", moon.slug)} className="text-sm text-accent underline-offset-4 hover:underline">
            Moon in {moon.name} in depth
          </Link>
        </section>
      </div>

      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-accent" aria-hidden="true" />
          <h2 className="font-display text-xl font-semibold">How your {sun.name} Sun and {moon.name} Moon work together</h2>
        </div>
        <div className="space-y-3 text-foreground/80 leading-relaxed">
          <p>
            <strong className="text-foreground">{same ? "Double " + sun.name : `${shortRelation}.`}</strong> {relation.text}
          </p>
          <p>
            <strong className="text-foreground">Element mix ({sun.element} + {moon.element}).</strong> {c.elementText}
          </p>
          <p>
            <strong className="text-foreground">Modality mix ({sun.modality} + {moon.modality}).</strong> {c.modalityText}
          </p>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          This reads the signs, not the exact degrees. The precise angle between your Sun and Moon adds detail that your full natal chart shows.
        </p>
      </section>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-accent" aria-hidden="true" /> Gifts of this combination
          </h2>
          <ul className="space-y-2 text-sm text-foreground/80">
            {c.gifts.map((g) => (
              <li key={g} className="flex gap-2">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-green-400" aria-hidden="true" />
                {g}
              </li>
            ))}
          </ul>
        </section>
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-accent" aria-hidden="true" /> Growth edges
          </h2>
          <ul className="space-y-2 text-sm text-foreground/80">
            {c.tensions.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="glass-card p-6 mb-6">
        <h2 className="font-display text-xl font-semibold mb-2">Working with your {sun.name} Sun and {moon.name} Moon</h2>
        <p className="text-foreground/80 leading-relaxed">{relation.tip}</p>
        <p className="text-foreground/80 leading-relaxed mt-3">
          For the {moon.name} side, {lowerFirst(c.moonPlacement.point.byElement[moon.element].tip)}
        </p>
      </section>

      <AstroNote />

      <CtaBanner
        title={`More than a ${sun.name} Sun ${moon.name} Moon`}
        body="Your Rising sign, Venus, Mars and the houses complete the picture. Get your free natal chart on Skygram to see every placement."
      />

      <Faq items={faqs} title={`${c.title} FAQ`} />

      {reverse && (
        <p className="text-sm text-center mb-6">
          <Link href={sunMoonPath(reverse.sun.slug, reverse.moon.slug)} className="text-accent underline-offset-4 hover:underline">
            Swap them: {reverse.title}
          </Link>
        </p>
      )}

      <section className="glass-card p-6 mb-6" aria-label="Related combinations">
        <h2 className="font-display text-lg font-semibold mb-3">{sun.name} Sun with every Moon sign</h2>
        <ul className="flex flex-wrap gap-1.5 mb-6">
          {sunMoonsForSun(sun.slug).map((x) => (
            <li key={x.slug}>
              <Link
                href={sunMoonPath(x.sun.slug, x.moon.slug)}
                aria-current={x.slug === c.slug ? "page" : undefined}
                className="inline-block rounded-md bg-secondary/40 px-2.5 py-1 text-xs hover:bg-secondary/70 transition-colors aria-[current=page]:bg-primary/30"
              >
                {x.moon.name} Moon
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="font-display text-lg font-semibold mb-3">{moon.name} Moon with every Sun sign</h2>
        <ul className="flex flex-wrap gap-1.5">
          {sunMoonsForMoon(moon.slug).map((x) => (
            <li key={x.slug}>
              <Link
                href={sunMoonPath(x.sun.slug, x.moon.slug)}
                aria-current={x.slug === c.slug ? "page" : undefined}
                className="inline-block rounded-md bg-secondary/40 px-2.5 py-1 text-xs hover:bg-secondary/70 transition-colors aria-[current=page]:bg-primary/30"
              >
                {x.sun.name} Sun
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
