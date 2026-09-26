import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Home, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import AstroNote from "@/components/AstroNote";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { siteConfig, siteLink } from "@/lib/site";
import { glyphText, signPath } from "@/lib/zodiac";
import {
  getHouseBySlug,
  getPlanetInHouse,
  housePath,
  houseNumbers,
  houseSlug,
  kindText,
  naturalSign,
  planetHouseFaqs,
  planetHousePath,
  planetInHouses,
  planetInHousesForHouse,
  planetInHousesForPlanet,
  type House,
  type PlanetInHouse,
} from "@/lib/houses";

type Props = { params: Promise<{ slug: string }> };

// Only real house and planet-in-house pages are built; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...houseNumbers.map((n) => ({ slug: houseSlug(n) })), ...planetInHouses.map((p) => ({ slug: p.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const pih = getPlanetInHouse(slug);
  if (pih) {
    const sign = naturalSign(pih.house.number);
    const title = `${pih.title}: Meaning, Traits & Interpretation`;
    const description = `${pih.text.blurb.split(". ")[0]}. The ${pih.house.name} (${pih.house.title.toLowerCase()}) covers ${pih.house.themes.slice(0, 3).join(", ").toLowerCase()} and links with ${sign.name}. Strengths and growth edges explained.`;
    const path = planetHousePath(pih.planet.slug, pih.house.number);
    return {
      title,
      description,
      keywords: [pih.title, `${pih.planet.name} in ${pih.house.number}th house`, `${pih.planet.name} ${pih.house.name}`, `${pih.planet.name} house meaning`],
      alternates: { canonical: path },
      openGraph: { type: "article", title, description, url: path },
      twitter: { title, description },
    };
  }
  const house = getHouseBySlug(slug);
  if (!house) return {};
  const title = `${house.name[0].toUpperCase()}${house.name.slice(1)} in Astrology: ${house.title}, Meaning & Planets`;
  const description = `The ${house.name} in astrology is the ${house.title.toLowerCase()}. ${house.summary.split(". ")[0]}. See what each planet means here.`;
  return {
    title,
    description,
    alternates: { canonical: housePath(house.number) },
    openGraph: { title, description, url: housePath(house.number) },
    twitter: { title, description },
  };
}

export default async function HousePage({ params }: Props) {
  const slug = (await params).slug;
  const pih = getPlanetInHouse(slug);
  if (pih) return <PlanetInHousePage x={pih} />;
  const house = getHouseBySlug(slug);
  if (house) return <HouseHubPage house={house} />;
  notFound();
}

function PlanetInHousePage({ x }: { x: PlanetInHouse }) {
  const { planet, house, text } = x;
  const sign = naturalSign(house.number);
  const path = planetHousePath(planet.slug, house.number);
  const siblingsSamePlanet = planetInHousesForPlanet(planet.slug);
  const siblingsSameHouse = planetInHousesForHouse(house.number);
  const faqs = planetHouseFaqs(x);
  const prev = house.number === 1 ? 12 : house.number - 1;
  const next = house.number === 12 ? 1 : house.number + 1;
  const prevX = siblingsSamePlanet.find((s) => s.house.number === prev)!;
  const nextX = siblingsSamePlanet.find((s) => s.house.number === next)!;
  const signPage = planet.slug === "sun" ? "/zodiac" : `/placements/${planet.slug}`;

  const facts: { label: string; value: string }[] = [
    { label: "Planet", value: `${planet.name} ${planet.glyph}` },
    { label: "House", value: `${house.name} · ${house.title.replace("House of ", "")}` },
    { label: "House type", value: kindText[house.kind].label },
    { label: "Natural sign", value: `${sign.name} ${glyphText(sign)}` },
    { label: "Governs", value: planet.governs },
    { label: "Keywords", value: text.keywords.join(", ") },
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${x.title}: Meaning, Traits & Interpretation`,
    description: text.blurb,
    about: { "@type": "Thing", name: `${x.title} (astrology)` },
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
          { name: "Houses", path: "/houses" },
          { name: house.name[0].toUpperCase() + house.name.slice(1), path: housePath(house.number) },
          { name: planet.name, path },
        ]}
      />

      <header className="text-center mb-8">
        <span className="block font-display text-6xl text-accent leading-none mb-3" aria-hidden="true">
          {planet.glyph}
        </span>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {house.title} · {kindText[house.kind].label} house
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">{planet.name}</span> in the {house.name}
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">{text.blurb.split(". ").slice(0, 1)[0]}.</p>
      </header>

      <section aria-label={`${x.title} quick facts`} className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
        {facts.map((f) => (
          <div key={f.label} className="glass-card px-4 py-3">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{f.label}</p>
            <p className="font-medium text-sm mt-0.5">{f.value}</p>
          </div>
        ))}
      </section>

      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-accent" aria-hidden="true" />
          <h2 className="font-display text-xl font-semibold">What {x.title} means</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed">{text.blurb}</p>
        <div className="grid sm:grid-cols-2 gap-4 mt-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Keywords</p>
            <ul className="flex flex-wrap gap-2">
              {text.keywords.map((k) => (
                <li key={k} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-foreground/85">{k}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Growth edge</p>
            <p className="text-sm text-foreground/80 flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" aria-hidden="true" />
              {text.shadow}
            </p>
          </div>
        </div>
      </section>

      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Home className="w-5 h-5 text-accent" aria-hidden="true" />
          <h2 className="font-display text-xl font-semibold">About the {house.name}</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-3">{house.summary}</p>
        <p className="text-sm text-foreground/75 mb-3">
          <strong className="text-foreground">The question it asks:</strong> {house.question}
        </p>
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Themes</p>
        <ul className="flex flex-wrap gap-2 mb-3">
          {house.themes.map((t) => (
            <li key={t} className="rounded-lg bg-secondary/40 px-3 py-1.5 text-sm">{t}</li>
          ))}
        </ul>
        <Link href={housePath(house.number)} className="text-sm text-accent underline-offset-4 hover:underline">
          All planets in the {house.name}
        </Link>
      </section>

      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Check className="w-5 h-5 text-accent" aria-hidden="true" />
          <h2 className="font-display text-xl font-semibold">How strong is {planet.name} here?</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-3">{kindText[house.kind].text}</p>
        <p className="text-foreground/80 leading-relaxed">
          The {house.name} corresponds to{" "}
          <Link href={signPath(sign.slug)} className="text-accent underline-offset-4 hover:underline">{sign.name}</Link>, ruled by {sign.ruler}
          {sign.traditionalRuler ? ` (traditionally ${sign.traditionalRuler})` : ""}.{" "}
          {x.rulesHouse
            ? `Modern astrologers often see this as a natural fit, because ${planet.name} rules ${sign.name}. Traditional astrology judges a planet's strength differently, by its dignity in the sign it occupies and by which house it takes its "joy" in.`
            : `${planet.name} doesn't rule ${sign.name}, so it is read as bringing its own style of ${planet.governs} to the house's themes.`}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          House systems differ slightly, and the sign on the cusp of your {house.name} adds detail. Your full natal chart shows the exact picture.
        </p>
      </section>

      <AstroNote />

      <CtaBanner
        title={`Find your ${planet.name} house`}
        body={`Your ${planet.name} house depends on your exact birth time and place. Get your free natal chart on Skygram to see every planet in its house and sign.`}
      />

      <Faq items={faqs} title={`${x.title} FAQ`} />

      <section className="glass-card p-6 mb-6" aria-label="Related placements">
        <h2 className="font-display text-lg font-semibold mb-3">{planet.name} in every house</h2>
        <ul className="flex flex-wrap gap-1.5 mb-6">
          {siblingsSamePlanet.map((s) => (
            <li key={s.slug}>
              <Link
                href={planetHousePath(s.planet.slug, s.house.number)}
                aria-current={s.slug === x.slug ? "page" : undefined}
                className="inline-block rounded-md bg-secondary/40 px-2.5 py-1 text-xs hover:bg-secondary/70 transition-colors aria-[current=page]:bg-primary/30"
              >
                {s.house.name}
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="font-display text-lg font-semibold mb-3">Every planet in the {house.name}</h2>
        <ul className="flex flex-wrap gap-1.5 mb-4">
          {siblingsSameHouse.map((s) => (
            <li key={s.slug}>
              <Link
                href={planetHousePath(s.planet.slug, s.house.number)}
                aria-current={s.slug === x.slug ? "page" : undefined}
                className="inline-block rounded-md bg-secondary/40 px-2.5 py-1 text-xs hover:bg-secondary/70 transition-colors aria-[current=page]:bg-primary/30"
              >
                {s.planet.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={signPage} className="text-sm text-accent underline-offset-4 hover:underline">
          {planet.name} in the signs
        </Link>
      </section>

      <nav className="grid grid-cols-2 gap-3" aria-label="Adjacent houses">
        <Link href={planetHousePath(planet.slug, prevX.house.number)} className="glass-card px-4 py-3 hover:border-primary/40 transition-colors">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="w-3 h-3" aria-hidden="true" /> Previous house
          </span>
          <span className="font-display font-semibold">{planet.name} in the {prevX.house.name}</span>
        </Link>
        <Link href={planetHousePath(planet.slug, nextX.house.number)} className="glass-card px-4 py-3 text-right hover:border-primary/40 transition-colors">
          <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            Next house <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </span>
          <span className="font-display font-semibold">{planet.name} in the {nextX.house.name}</span>
        </Link>
      </nav>
    </article>
  );
}

function HouseHubPage({ house }: { house: House }) {
  const sign = naturalSign(house.number);
  const path = housePath(house.number);
  const entries = planetInHousesForHouse(house.number);
  const cap = house.name[0].toUpperCase() + house.name.slice(1);
  const prev = (house.number === 1 ? 12 : house.number - 1) as House["number"];
  const next = (house.number === 12 ? 1 : house.number + 1) as House["number"];
  const prevHouse = getHouseBySlug(houseSlug(prev))!;
  const nextHouse = getHouseBySlug(houseSlug(next))!;

  const faqs = [
    {
      q: `What does the ${house.name} represent in astrology?`,
      a: `${house.summary} Its themes include ${house.themes.join(", ").toLowerCase()}.`,
    },
    {
      q: `What sign rules the ${house.name}?`,
      a: `The ${house.name} is naturally associated with ${sign.name}, ruled by ${sign.ruler}${sign.traditionalRuler ? ` (traditionally ${sign.traditionalRuler})` : ""}. In your own chart, the sign on the cusp of the ${house.name} may be different, and it colours how the house shows up.`,
    },
    {
      q: `Is the ${house.name} angular, succedent or cadent?`,
      a: `The ${house.name} is ${kindText[house.kind].label.toLowerCase()}. ${kindText[house.kind].text}`,
    },
    {
      q: `How do I find my ${house.name}?`,
      a: `Houses are calculated from your exact birth time and place. Skygram calculates them for free as part of your natal chart.`,
    },
  ];

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Planets in the ${house.name}`,
    itemListElement: entries.map((e, i) => ({ "@type": "ListItem", position: i + 1, name: e.title, url: siteLink(planetHousePath(e.planet.slug, e.house.number)) })),
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <JsonLd data={itemListLd} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Houses", path: "/houses" }, { name: cap, path }]} />

      <header className="text-center mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {house.title} · {kindText[house.kind].label}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          The <span className="gradient-text">{cap}</span> in Astrology
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">{house.summary}</p>
      </header>

      <section className="glass-card p-6 mb-6">
        <h2 className="font-display text-xl font-semibold mb-3">{cap} at a glance</h2>
        <ul className="flex flex-wrap gap-2 mb-4">
          {house.themes.map((t) => (
            <li key={t} className="rounded-lg bg-secondary/40 px-3 py-1.5 text-sm">{t}</li>
          ))}
        </ul>
        <p className="text-sm text-foreground/80 mb-2">
          <strong className="text-foreground">The question it asks:</strong> {house.question}
        </p>
        <p className="text-sm text-foreground/80 mb-2">
          <strong className="text-foreground">Natural sign:</strong>{" "}
          <Link href={signPath(sign.slug)} className="text-accent underline-offset-4 hover:underline">{sign.name} {glyphText(sign)}</Link>, ruled by {sign.ruler}.
        </p>
        <p className="text-sm text-foreground/80">
          <strong className="text-foreground">{kindText[house.kind].label}.</strong> {kindText[house.kind].text}
        </p>
      </section>

      <section className="mb-6" aria-labelledby="planets-heading">
        <h2 id="planets-heading" className="font-display text-2xl font-semibold mb-4">Planets in the {house.name}</h2>
        <div className="space-y-3">
          {entries.map((e) => (
            <Link
              key={e.slug}
              href={planetHousePath(e.planet.slug, e.house.number)}
              className="glass-card block p-5 hover:-translate-y-0.5 hover:border-primary/40 transition-all"
            >
              <h3 className="font-display text-lg font-semibold mb-1">
                <span className="text-accent mr-2" aria-hidden="true">{e.planet.glyph}</span>
                {e.title}
              </h3>
              <p className="text-sm text-foreground/75">{e.text.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <AstroNote />

      <CtaBanner title={`See what's in your ${house.name}`} body="Your houses depend on your exact birth time and place. Get your free natal chart on Skygram to see which planets sit where." />
      <Faq items={faqs} title={`${cap} FAQ`} />

      <nav className="grid grid-cols-2 gap-3 mt-8" aria-label="Adjacent houses">
        <Link href={housePath(prevHouse.number)} className="glass-card px-4 py-3 hover:border-primary/40 transition-colors">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="w-3 h-3" aria-hidden="true" /> Previous house
          </span>
          <span className="font-display font-semibold">{prevHouse.name}</span>
        </Link>
        <Link href={housePath(nextHouse.number)} className="glass-card px-4 py-3 text-right hover:border-primary/40 transition-colors">
          <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            Next house <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </span>
          <span className="font-display font-semibold">{nextHouse.name}</span>
        </Link>
      </nav>
    </div>
  );
}
