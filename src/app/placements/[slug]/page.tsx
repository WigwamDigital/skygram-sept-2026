import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Compass, Lightbulb, Scale, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { siteConfig, siteLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { elementAccent, glyphText, signPath, type Element } from "@/lib/zodiac";
import {
  dignityLabel,
  dignityText,
  getPlacement,
  getPoint,
  placementFaqs,
  placementPath,
  placements,
  placementsForPoint,
  placementsForSign,
  pointPath,
  points,
  theName,
  type Placement,
  type Point,
} from "@/lib/placements";

type Props = { params: Promise<{ slug: string }> };

// Builds 7 point hubs (/placements/moon) + 84 placements (/placements/moon-in-aries, /placements/aries-rising).
export const dynamicParams = false;

export function generateStaticParams() {
  return [...points.map((p) => ({ slug: p.slug })), ...placements.map((p) => ({ slug: p.slug }))];
}

const pointHubTitle = (pt: Point) =>
  pt.slug === "rising" ? "Rising Signs: What Your Ascendant Says About You" : `${pt.name} Signs: What Your ${pt.name} Sign Says About You`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pt = getPoint(slug);
  if (pt) {
    const title = pointHubTitle(pt);
    const description = `${pt.intro.split(". ")[0]}. Explore ${pt.name === "Rising" ? "all 12 Rising signs" : `${pt.name} in all 12 signs`} — meanings, strengths and how to find yours.`;
    return {
      title,
      description,
      alternates: { canonical: pointPath(pt.slug) },
      openGraph: { title, description, url: pointPath(pt.slug) },
      twitter: { title, description },
    };
  }
  const pl = getPlacement(slug);
  if (!pl) return {};
  const title = pl.point.slug === "rising" ? `${pl.title} Meaning: Appearance, Personality & Traits` : `${pl.title} Meaning: Personality, Strengths & Challenges`;
  const description = `${pl.text.blurb.split(". ")[0]}. Learn what ${pl.title} means, its strengths, challenges and how to work with it.`;
  const path = placementPath(pl.point.slug, pl.sign.slug);
  return {
    title,
    description,
    keywords: [pl.title, `${pl.title} meaning`, `${pl.title} traits`, pl.point.signLabel],
    alternates: { canonical: path },
    openGraph: { type: "article", title, description, url: path },
    twitter: { title, description },
  };
}

function PointGlyph({ point, className }: { point: Point; className?: string }) {
  return (
    <span className={cn("font-display text-accent leading-none", point.slug === "rising" && "tracking-tight", className)} aria-hidden="true">
      {point.slug === "rising" ? "AC" : `${point.glyph}︎`}
    </span>
  );
}

function Section({ icon: Icon, title, children }: { icon: typeof Sparkles; title: string; children: React.ReactNode }) {
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

function Chip({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-block rounded-lg px-3 py-1.5 text-sm transition-colors",
        active ? "bg-primary/30 text-foreground" : "bg-secondary/40 hover:bg-secondary/70",
      )}
    >
      {children}
    </Link>
  );
}

/* ---------------------------------------------------------------- Placement page */

function PlacementView({ pl }: { pl: Placement }) {
  const { point, sign, text } = pl;
  const path = placementPath(point.slug, sign.slug);
  const el = point.byElement[sign.element];

  const facts = [
    { label: point.slug === "rising" ? "Shapes" : "Governs", value: point.domain },
    {
      label: "Sign",
      value: (
        <Link href={signPath(sign.slug)} className="hover:text-accent hover:underline underline-offset-4">
          {sign.name}
        </Link>
      ),
    },
    { label: "Element · Mode", value: `${sign.element} · ${sign.modality}` },
    {
      label: "Dignity",
      value: pl.dignities.length ? pl.dignities.map((d) => dignityLabel[d]).join(" & ") : point.slug === "rising" ? `Chart ruler: ${sign.ruler}` : "Peregrine (neutral)",
    },
    { label: point.slug === "rising" ? "Rises for" : "Time in sign", value: point.duration.replace(/ \(.*\)$/, "") },
    { label: "Keywords", value: text.keywords.join(", ") },
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${pl.title} Meaning`,
    description: text.blurb,
    about: { "@type": "Thing", name: `${pl.title} (astrology)` },
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
          { name: "Placements", path: "/placements" },
          { name: point.slug === "rising" ? "Rising signs" : `${point.name} signs`, path: pointPath(point.slug) },
          { name: pl.title, path },
        ]}
      />

      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <PointGlyph point={point} className="text-5xl sm:text-6xl" />
          <span className="text-2xl text-muted-foreground" aria-hidden="true">·</span>
          <span className="font-display text-5xl sm:text-6xl text-accent leading-none" aria-hidden="true">{glyphText(sign)}</span>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {point.signLabel} · {sign.element} · {sign.modality}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          {point.slug === "rising" ? (
            <>
              <span className="gradient-text">{sign.name}</span> Rising
            </>
          ) : (
            <>
              <span className="gradient-text">{point.name}</span> in <span className="gradient-text">{sign.name}</span>
            </>
          )}
        </h1>
        <ul className="flex flex-wrap justify-center gap-2" aria-label={`${pl.title} keywords`}>
          {text.keywords.map((k) => (
            <li key={k} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-foreground/85">{k}</li>
          ))}
        </ul>
      </header>

      <section aria-label={`${pl.title} quick facts`} className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {facts.map((f) => (
          <div key={f.label} className="glass-card px-4 py-3">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{f.label}</p>
            <p className="font-medium text-sm mt-0.5">{f.value}</p>
          </div>
        ))}
      </section>

      <Section icon={Sparkles} title={`What ${pl.title} means`}>
        <div className="space-y-3 text-foreground/80 leading-relaxed">
          <p className="text-foreground">{text.blurb}</p>
          <p>
            {point.slug === "rising"
              ? `Your Rising sign governs ${point.governs}.`
              : `In astrology, ${theName(point)} governs ${point.governs}.`}{" "}
            {point.intro.split(". ").slice(1).join(". ")}
          </p>
        </div>
      </Section>

      <Section icon={Compass} title={`How ${pl.title} shows up`}>
        <div className="space-y-3 text-foreground/80 leading-relaxed">
          <p>{el.expression}</p>
          <p>
            As a {sign.modality.toLowerCase()} sign, {sign.name} adds a {sign.modality === "Cardinal" ? "take-charge, initiating" : sign.modality === "Fixed" ? "steady, determined" : "flexible, adaptable"} quality,
            and its core traits — {sign.keywords.slice(0, 3).map((k) => k.toLowerCase()).join(", ")} — colour everything {point.slug === "rising" ? "about your first impression" : `${theName(point)} touches in your life`}.
          </p>
        </div>
      </Section>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold mb-3">Gifts</h2>
          <ul className="space-y-2 text-sm text-foreground/80">
            {text.gifts.map((g) => (
              <li key={g} className="flex gap-2">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-green-400" aria-hidden="true" />
                {g}
              </li>
            ))}
          </ul>
        </section>
        <section className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold mb-3">Growth edge</h2>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" aria-hidden="true" />
              {text.shadow}
            </li>
          </ul>
        </section>
      </div>

      <Section icon={Scale} title={point.slug === "rising" ? "Your chart ruler" : `Is ${pl.title} strong?`}>
        <p className="text-foreground/80 leading-relaxed">{dignityText(pl)}</p>
      </Section>

      <Section icon={Lightbulb} title={`Working with your ${pl.title}`}>
        <p className="text-foreground/80 leading-relaxed">{el.tip}</p>
      </Section>

      <CtaBanner
        title={`Do you have ${pl.title}?`}
        body={`Your ${point.signLabel} depends on your exact birth date${point.slug === "rising" || point.slug === "moon" ? ", time and place" : ""}. Skygram calculates your full natal chart for free — every planet, house and aspect.`}
        cta={`Find my ${point.signLabel}`}
      />

      <Faq items={placementFaqs(pl)} title={`${pl.title} FAQ`} />

      <section className="glass-card p-6 space-y-5" aria-label="Related placements">
        <div>
          <h2 className="font-display font-semibold mb-3">{point.slug === "rising" ? "Other Rising signs" : `${point.name} in other signs`}</h2>
          <ul className="flex flex-wrap gap-2">
            {placementsForPoint(point.slug).map((o) => (
              <li key={o.slug}>
                <Chip href={placementPath(o.point.slug, o.sign.slug)} active={o.slug === pl.slug}>{o.title}</Chip>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display font-semibold mb-3">Other placements in {sign.name}</h2>
          <ul className="flex flex-wrap gap-2">
            <li>
              <Chip href={signPath(sign.slug)}>Sun in {sign.name}</Chip>
            </li>
            {placementsForSign(sign.slug).map((o) => (
              <li key={o.slug}>
                <Chip href={placementPath(o.point.slug, o.sign.slug)} active={o.slug === pl.slug}>{o.title}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}

/* ---------------------------------------------------------------- Point hub page */

function PointHubView({ pt }: { pt: Point }) {
  const path = pointPath(pt.slug);
  const list = placementsForPoint(pt.slug);
  const label = pt.slug === "rising" ? "Rising sign" : `${pt.name} sign`;

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${pt.name === "Rising" ? "Rising signs" : `${pt.name} in the 12 signs`}`,
    itemListElement: list.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: siteLink(placementPath(p.point.slug, p.sign.slug)),
    })),
  };

  const faqs = [
    { q: `What is a ${label}?`, a: pt.intro },
    {
      q: `How long does ${pt.slug === "rising" ? "each Rising sign last" : `${theName(pt)} stay in a sign`}?`,
      a:
        pt.slug === "rising"
          ? "Each sign rises for about 2 hours as the Earth turns, so all 12 signs pass over the Ascendant every day."
          : `${theName(pt, true)} spends ${pt.duration} in each sign.`,
    },
    {
      q: `How do I find my ${label}?`,
      a: `You need your birth date${pt.slug === "rising" || pt.slug === "moon" ? ", exact birth time and birthplace" : " — and ideally your birth time and place"}. Skygram calculates your full natal chart for free, including your ${label}.`,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd data={itemListLd} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Placements", path: "/placements" },
          { name: pt.slug === "rising" ? "Rising signs" : `${pt.name} signs`, path },
        ]}
      />

      <header className="text-center mb-10">
        <PointGlyph point={pt} className="block text-6xl mb-3" />
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          {pt.slug === "rising" ? (
            <>
              <span className="gradient-text">Rising</span> Signs
            </>
          ) : (
            <>
              <span className="gradient-text">{pt.name}</span> Signs
            </>
          )}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{pt.intro}</p>
      </header>

      <section aria-label={`${label}s`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
        {list.map((p) => (
          <Link
            key={p.slug}
            href={placementPath(p.point.slug, p.sign.slug)}
            className="group glass-card relative overflow-hidden p-5 hover:border-primary/40 transition-colors"
          >
            <span className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-90 transition-opacity", elementAccent[p.sign.element])} aria-hidden="true" />
            <span className="relative flex items-center gap-3 mb-2">
              <span className="font-display text-3xl text-accent leading-none" aria-hidden="true">{glyphText(p.sign)}</span>
              <span>
                <span className="block font-display font-semibold">{p.title}</span>
                <span className="block text-xs text-muted-foreground">{p.text.keywords.join(" · ")}</span>
              </span>
            </span>
            <span className="relative block text-sm text-foreground/75 line-clamp-2">{p.text.blurb}</span>
          </Link>
        ))}
      </section>

      <section className="mb-12" aria-labelledby="elements-heading">
        <h2 id="elements-heading" className="font-display text-2xl font-semibold mb-4">{pt.name === "Rising" ? "Rising signs" : `${pt.name} signs`} by element</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {(Object.keys(pt.byElement) as Element[]).map((el) => (
            <div key={el} className="glass-card p-5">
              <h3 className="font-display text-lg font-semibold mb-1">{el}</h3>
              <p className="text-sm text-foreground/75">{pt.byElement[el].expression}</p>
            </div>
          ))}
        </div>
      </section>

      {pt.dignities && (
        <section className="mb-12" aria-labelledby="dignity-heading">
          <h2 id="dignity-heading" className="font-display text-2xl font-semibold mb-4">Where {theName(pt)} is strongest</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.keys(pt.dignities) as (keyof NonNullable<Point["dignities"]>)[]).map((d) => (
              <div key={d} className="glass-card p-4">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{dignityLabel[d]}</p>
                <p className="text-sm font-medium">
                  {pt.dignities![d].map((s) => list.find((p) => p.sign.slug === s)!.sign.name).join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-3xl mx-auto">
        <CtaBanner title={`What's your ${label}?`} cta={`Find my ${label}`} />
        <Faq items={faqs} title={`${label} FAQ`} />
        <nav aria-label="Other placements" className="glass-card p-6">
          <h2 className="font-display font-semibold mb-3">Explore other placements</h2>
          <ul className="flex flex-wrap gap-2">
            <li>
              <Chip href="/zodiac">Sun signs</Chip>
            </li>
            {points.map((p) => (
              <li key={p.slug}>
                <Chip href={pointPath(p.slug)} active={p.slug === pt.slug}>{p.slug === "rising" ? "Rising signs" : `${p.name} signs`}</Chip>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default async function PlacementsSlugPage({ params }: Props) {
  const { slug } = await params;
  const pt = getPoint(slug);
  if (pt) return <PointHubView pt={pt} />;
  const pl = getPlacement(slug);
  if (!pl) notFound();
  return <PlacementView pl={pl} />;
}

