import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AstroNote from "@/components/AstroNote";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import LegacySections, { Toc } from "@/components/legacy/LegacySections";
import { clipDescription, mustLoadLegacy } from "@/lib/legacy";
import { siteConfig, siteLink } from "@/lib/site";
import { getPlanet, planetGlyph, planetPath, planets, type Planet, type PlanetSlug } from "@/lib/planets";
import { aspectTypes, aspectsFrom, pathOf } from "@/lib/aspects";
import { mustGetSign, signPath, signs } from "@/lib/zodiac";
import { getPoint, placementPath } from "@/lib/placements";
import { getHousePlanet, houses, planetHousePath, ordinalHouse, type HouseNumber, type HousePlanetSlug } from "@/lib/houses";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return planets.map((p) => ({ slug: p.slug }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPlanet((await params).slug);
  if (!p) return {};
  const legacy = mustLoadLegacy("planets", p.slug);
  const path = planetPath(p.slug);
  const title = legacy.title;
  const description = clipDescription(legacy.summary || `${p.name} in astrology governs ${p.governs}.`);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", title, description, url: path },
    twitter: { title, description },
  };
}

const signList = (xs: string[]) =>
  xs.map((s, i) => (
    <span key={s}>
      {i > 0 && ", "}
      <Link href={signPath(s as Parameters<typeof signPath>[0])} className="hover:text-accent">
        {mustGetSign(s as Parameters<typeof mustGetSign>[0]).name}
      </Link>
    </span>
  ));

export default async function PlanetPage({ params }: Props) {
  const p = getPlanet((await params).slug);
  if (!p) notFound();
  const legacy = mustLoadLegacy("planets", p.slug);
  const path = planetPath(p.slug);
  const isPlanet = p.slug !== "north-node";
  const point = getPoint(p.slug);
  const housePlanet = getHousePlanet(p.slug);
  const idx = planets.findIndex((x) => x.slug === p.slug);
  const prev = planets[(idx + planets.length - 1) % planets.length];
  const next = planets[(idx + 1) % planets.length];

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: "Type", value: p.group },
    { label: "Governs", value: p.function.join(" · ") },
    ...(p.domicile.length ? [{ label: "Rules", value: <>{signList(p.domicile)}{p.traditionalDomicile && <> (trad. {signList(p.traditionalDomicile)})</>}</> }] : []),
    ...(p.exaltation.length ? [{ label: "Exalted in", value: signList(p.exaltation) }] : []),
    ...(p.detriment.length ? [{ label: "Detriment", value: signList(p.detriment) }] : []),
    ...(p.fall.length ? [{ label: "Fall", value: signList(p.fall) }] : []),
    { label: "Full cycle", value: p.cycle },
    { label: "Time in each sign", value: p.perSign },
    { label: "Retrograde", value: p.retrograde },
  ];

  const faqs = legacy.faqs.length >= 2 ? legacy.faqs : planetFaqs(p);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: legacy.title,
    description: legacy.summary ?? p.governs,
    about: { "@type": "Thing", name: `${p.name} (astrology)` },
    mainEntityOfPage: siteLink(path),
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  const extraToc = [
    ...(isPlanet || point ? [{ id: "signs", heading: `${p.name} in the signs` }] : []),
    ...(housePlanet ? [{ id: "houses", heading: `${p.name} in the houses` }] : []),
    ...(isPlanet ? [{ id: "aspects", heading: `${p.name} aspects` }] : []),
  ];

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <JsonLd data={articleLd} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Planets", path: "/planets" }, { name: p.name, path }]} />

      <header className="text-center mb-8">
        <span className="block font-display text-7xl text-accent leading-none mb-3 animate-float" aria-hidden="true">{planetGlyph(p)}</span>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {p.group} · {p.function.join(" · ")}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">{p.name}</span> in Astrology
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{legacy.summary}</p>
      </header>

      <section aria-label={`${p.name} quick facts`} className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {facts.map((f) => (
          <div key={f.label} className="glass-card px-4 py-3">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{f.label}</p>
            <p className="font-medium text-sm mt-0.5">{f.value}</p>
          </div>
        ))}
      </section>

      <ul className="flex flex-wrap justify-center gap-2 mb-8" aria-label={`${p.name} keywords`}>
        {p.keywords.map((k) => (
          <li key={k} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-foreground/85">{k}</li>
        ))}
      </ul>

      <Toc sections={legacy.sections} extra={extraToc} />
      <LegacySections page={legacy} />

      {/* Planet in signs */}
      {(p.slug === "sun" || point) && (
        <section id="signs" className="glass-card p-6 mb-6 scroll-mt-20" aria-labelledby="signs-h">
          <h2 id="signs-h" className="font-display text-xl font-semibold mb-1">{p.name} in the signs</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {p.slug === "sun" ? "Your Sun sign is your zodiac sign. Read the full profile for each." : `How ${p.name} behaves in each of the twelve signs.`}
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {signs.map((s) => (
              <li key={s.slug}>
                <Link
                  href={p.slug === "sun" ? signPath(s.slug) : placementPath(point!.slug, s.slug)}
                  className="block rounded-lg bg-secondary/30 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                >
                  {p.name} in {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Planet in houses */}
      {housePlanet && (
        <section id="houses" className="glass-card p-6 mb-6 scroll-mt-20" aria-labelledby="houses-h">
          <h2 id="houses-h" className="font-display text-xl font-semibold mb-1">{p.name} in the houses</h2>
          <p className="text-sm text-muted-foreground mb-4">Where in life {p.name === "Sun" || p.name === "Moon" ? `the ${p.name}` : p.name} does its work, house by house.</p>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {houses.map((h) => (
              <li key={h.number}>
                <Link
                  href={planetHousePath(p.slug as HousePlanetSlug, h.number as HouseNumber)}
                  className="block rounded-lg bg-secondary/30 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors"
                >
                  {p.name} in {ordinalHouse(h.number)} house
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Aspects */}
      {isPlanet && (
        <section id="aspects" className="glass-card p-6 mb-6 scroll-mt-20" aria-labelledby="aspects-h">
          <h2 id="aspects-h" className="font-display text-xl font-semibold mb-1">{p.name} aspects</h2>
          <p className="text-sm text-muted-foreground mb-4">Every major aspect {p.name} makes to the other planets.</p>
          <div className="space-y-4">
            {aspectTypes.map((t) => (
              <div key={t.slug}>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                  <span className="text-accent mr-1" aria-hidden="true">{t.glyph}</span>
                  {t.name}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {aspectsFrom(p.slug as PlanetSlug, t.slug).map((x) => (
                    <li key={x.slug}>
                      <Link href={pathOf(x)} className="inline-block rounded-md bg-secondary/40 px-2.5 py-1 text-xs hover:bg-secondary/70 transition-colors">
                        {x.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <CtaBanner
        title={`Where is your ${p.name}?`}
        body={`Your ${p.name} sign, house and aspects are unique to your birth moment. Skygram calculates your full birth chart for free and explains every placement.`}
      />

      <Faq items={faqs} title={`${p.name} FAQ`} />
      <AstroNote />

      <nav className="grid grid-cols-2 gap-3 mt-8" aria-label="More planets">
        <Link href={planetPath(prev.slug)} className="glass-card px-4 py-3 hover:border-primary/40 transition-colors">
          <span className="block text-xs text-muted-foreground">Previous</span>
          <span className="font-display font-semibold">{planetGlyph(prev)} {prev.name}</span>
        </Link>
        <Link href={planetPath(next.slug)} className="glass-card px-4 py-3 text-right hover:border-primary/40 transition-colors">
          <span className="block text-xs text-muted-foreground">Next</span>
          <span className="font-display font-semibold">{next.name} {planetGlyph(next)}</span>
        </Link>
      </nav>
    </article>
  );
}

function planetFaqs(p: Planet) {
  return [
    { q: `What does ${p.name} represent in astrology?`, a: `${p.name} governs ${p.governs}.` },
    { q: `How long does ${p.name} stay in a sign?`, a: `${p.perSign}. A full trip around the zodiac takes ${p.cycle.toLowerCase()}.` },
    { q: `How do I find my ${p.name} sign?`, a: `You need your birth date, time and place. Skygram calculates your full birth chart for free, including your ${p.name} sign, house and aspects.` },
  ];
}
