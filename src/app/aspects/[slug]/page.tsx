import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AstroNote from "@/components/AstroNote";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import LegacySections, { Toc } from "@/components/legacy/LegacySections";
import { loadLegacy } from "@/lib/legacy";
import { siteConfig, siteLink } from "@/lib/site";
import { planetGlyph, planetPath, tenPlanets } from "@/lib/planets";
import {
  aspects,
  aspectTypePath,
  aspectTypes,
  aspectsFrom,
  canonicalAspectsOfType,
  generatedAspectBody,
  generatedAspectFaqs,
  getAspect,
  getAspectType,
  pathOf,
  reverseOf,
  siblingsOf,
  type Aspect,
  type AspectType,
} from "@/lib/aspects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...aspectTypes.map((t) => ({ slug: t.slug })), ...aspects.map((x) => ({ slug: x.slug }))];
}

/** Trim to a meta-description length on a word boundary. */
function clip(s: string, max = 158) {
  if (s.length <= max) return s;
  return `${s.slice(0, s.lastIndexOf(" ", max - 1)).replace(/[,;:—–-]$/, "")}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const type = getAspectType(slug);
  const x = type ? null : getAspect(slug);
  if (!type && !x) return {};
  const legacy = loadLegacy("aspects", slug);
  const path = `/aspects/${slug}`;
  const title = legacy?.title ?? (x ? `${x.title} Meaning in Astrology` : `${type!.name} Meaning in Astrology`);
  const description = clip(
    legacy?.summary ||
      (x
        ? `${x.phrase} (${x.type.angle}°) in astrology: what it means in the natal chart, in synastry and as a transit.`
        : `${type!.name} (${type!.angle}°) in astrology: ${type!.short}`),
  );
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", title, description, url: path },
    twitter: { title, description },
  };
}

export default async function AspectSlugPage({ params }: Props) {
  const { slug } = await params;
  const type = getAspectType(slug);
  if (type) return <AspectTypePage type={type} />;
  const x = getAspect(slug);
  if (!x) notFound();
  return <AspectPage x={x} />;
}

function natureTone(t: AspectType) {
  return t.nature === "Harmonious" ? "text-emerald-300" : t.nature === "Challenging" ? "text-orange-300" : "text-accent";
}

function AspectPage({ x }: { x: Aspect }) {
  const legacy = loadLegacy("aspects", x.slug);
  const useLegacyBody = legacy && !legacy.thin && legacy.sections.length > 0;
  const generated = useLegacyBody ? [] : generatedAspectBody(x);
  const faqs = legacy && legacy.faqs.length >= 2 ? legacy.faqs : generatedAspectFaqs(x);
  const path = pathOf(x);
  const lead = legacy?.summary || legacy?.subtitle || x.type.short;
  const reverse = reverseOf(x);
  const siblings = siblingsOf(x);

  const facts = [
    { label: "Planets", value: (
      <>
        <Link href={planetPath(x.a.slug)} className="hover:text-accent">{x.a.name}</Link>
        {!x.self && <> &amp; <Link href={planetPath(x.b.slug)} className="hover:text-accent">{x.b.name}</Link></>}
      </>
    ) },
    { label: "Aspect", value: <Link href={aspectTypePath(x.type.slug)} className="hover:text-accent">{x.type.name} {x.type.glyph}</Link> },
    { label: "Angle", value: `${x.type.angle}°` },
    { label: "Natal orb", value: x.type.orb },
    { label: "Nature", value: <span className={natureTone(x.type)}>{x.type.nature}</span> },
    { label: "Keyword", value: x.type.keyword },
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${x.title} Meaning in Astrology`,
    description: lead,
    about: { "@type": "Thing", name: `${x.title} (astrology aspect)` },
    mainEntityOfPage: siteLink(path),
    image: siteLink(`${path}/opengraph-image`),
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  const tocSections = useLegacyBody ? legacy!.sections : generated;

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <JsonLd data={articleLd} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Aspects", path: "/aspects" },
          { name: x.type.name, path: aspectTypePath(x.type.slug) },
          { name: x.title, path },
        ]}
      />

      <header className="text-center mb-8">
        <p className="font-display text-5xl sm:text-6xl text-accent leading-none mb-4 tracking-widest" aria-hidden="true">
          {planetGlyph(x.a)}
          <span className="text-foreground/60 mx-2 text-4xl sm:text-5xl align-middle">{x.type.glyph}</span>
          {planetGlyph(x.b)}
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {x.type.name} · {x.type.angle}° · <span className={natureTone(x.type)}>{x.type.nature}</span>
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">{x.a.name}</span> {x.type.verb[0].toUpperCase() + x.type.verb.slice(1)}{" "}
          <span className="gradient-text">{x.b.name}</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{lead}</p>
      </header>

      <section aria-label={`${x.title} quick facts`} className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {facts.map((f) => (
          <div key={f.label} className="glass-card px-4 py-3">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{f.label}</p>
            <p className="font-medium text-sm mt-0.5">{f.value}</p>
          </div>
        ))}
      </section>

      <Toc sections={tocSections} extra={[{ id: "related", heading: `More ${x.a.name} aspects` }]} />

      {useLegacyBody ? (
        <LegacySections page={legacy!} />
      ) : (
        generated.map((s) => (
          <section key={s.id} id={s.id} className="glass-card p-6 mb-6 scroll-mt-20" aria-labelledby={`${s.id}-h`}>
            <h2 id={`${s.id}-h`} className="font-display text-xl sm:text-2xl font-semibold mb-3">{s.heading}</h2>
            <div className="legacy-prose">
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
              {s.list && (
                <>
                  <h3>{s.list.title}</h3>
                  <ul>
                    {s.list.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </section>
        ))
      )}

      {/* Related aspects */}
      <section id="related" className="glass-card p-6 mb-6 scroll-mt-20" aria-labelledby="related-h">
        <h2 id="related-h" className="font-display text-xl font-semibold mb-1">
          {x.self ? `Other ${x.a.name}–${x.a.name} aspects` : `Other ${x.a.name}–${x.b.name} aspects`}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">The same two planets at different angles.</p>
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {siblings.map((s) => (
            <li key={s.slug}>
              <Link href={pathOf(s)} className="block rounded-lg bg-secondary/30 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors">
                <span className="block font-medium">{s.type.name} {s.type.glyph}</span>
                <span className={`block text-[11px] ${natureTone(s.type)}`}>{s.type.nature}</span>
              </Link>
            </li>
          ))}
        </ul>
        {reverse && (
          <p className="text-sm text-foreground/80 mb-6">
            Written the other way round:{" "}
            <Link href={pathOf(reverse)} className="text-accent hover:underline underline-offset-4">{reverse.title}</Link>
            {" "}— useful in synastry, where it matters whose planet is whose.
          </p>
        )}
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          {x.a.name} {x.type.verb} every planet
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {aspectsFrom(x.a.slug, x.type.slug).map((o) => (
            <li key={o.slug}>
              <Link
                href={pathOf(o)}
                aria-current={o.slug === x.slug ? "page" : undefined}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${o.slug === x.slug ? "bg-primary/30" : "bg-secondary/30 hover:bg-secondary/60"}`}
              >
                <span className="text-accent mr-1" aria-hidden="true">{planetGlyph(o.b)}</span>
                {o.b.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBanner
        title={`Do you have ${x.phrase}?`}
        body="Your birth chart lists every aspect between your planets, with exact orbs. Skygram calculates it for free, then compares it with friends' charts for AI compatibility reports."
      />

      <Faq items={faqs} title={`${x.title} FAQ`} />
      <AstroNote />
    </article>
  );
}

function AspectTypePage({ type }: { type: AspectType }) {
  const legacy = loadLegacy("aspects", type.slug);
  const path = aspectTypePath(type.slug);
  const lead = legacy?.summary || type.short;
  const list = canonicalAspectsOfType(type.slug);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${type.name} Aspect in Astrology`,
    description: lead,
    mainEntityOfPage: siteLink(path),
    image: siteLink(`${path}/opengraph-image`),
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <JsonLd data={articleLd} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Aspects", path: "/aspects" }, { name: type.name, path }]} />

      <header className="text-center mb-8">
        <span className="block font-display text-7xl text-accent leading-none mb-3" aria-hidden="true">{type.glyph}</span>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {type.angle}° · {type.signsApart} · <span className={natureTone(type)}>{type.nature}</span>
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          The <span className="gradient-text">{type.name}</span> Aspect
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{lead}</p>
      </header>

      <nav aria-label="Aspect types" className="flex flex-wrap justify-center gap-2 mb-8">
        {aspectTypes.map((t) => (
          <Link
            key={t.slug}
            href={aspectTypePath(t.slug)}
            aria-current={t.slug === type.slug ? "page" : undefined}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${t.slug === type.slug ? "border-primary bg-primary/30" : "border-primary/30 bg-primary/10 hover:bg-primary/20"}`}
          >
            {t.glyph} {t.name}
          </Link>
        ))}
      </nav>

      {legacy && <Toc sections={legacy.sections} extra={[{ id: "all", heading: `Every ${type.name.toLowerCase()} between planets` }]} />}
      {legacy && <LegacySections page={legacy} />}

      <section id="all" className="glass-card p-6 mb-6 scroll-mt-20" aria-labelledby="all-h">
        <h2 id="all-h" className="font-display text-xl sm:text-2xl font-semibold mb-1">Every {type.name.toLowerCase()} between planets</h2>
        <p className="text-sm text-muted-foreground mb-4">
          {list.length} planet pairings, Sun to Pluto. Pick one for its natal, synastry and transit meaning.
        </p>
        <div className="space-y-4">
          {tenPlanets.map((p) => {
            const row = list.filter((l) => l.a.slug === p.slug);
            if (!row.length) return null;
            return (
              <div key={p.slug}>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                  <span className="text-accent mr-1" aria-hidden="true">{planetGlyph(p)}</span>
                  {p.name}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {row.map((l) => (
                    <li key={l.slug}>
                      <Link href={pathOf(l)} className="inline-block rounded-md bg-secondary/40 px-2.5 py-1 text-xs hover:bg-secondary/70 transition-colors">
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBanner
        title={`Find the ${type.name.toLowerCase()}s in your chart`}
        body="Skygram calculates your full birth chart for free, with every aspect and its exact orb, then explains what it means for you."
      />
      {legacy && legacy.faqs.length > 0 && <Faq items={legacy.faqs} title={`${type.name} FAQ`} />}
    </article>
  );
}
