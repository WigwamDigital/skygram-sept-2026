import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GuidePage from "@/components/legacy/GuidePage";
import ExploreGrid from "@/components/legacy/ExploreGrid";
import SignCard from "@/components/zodiac/SignCard";
import { clipDescription, mustLoadLegacy } from "@/lib/legacy";
import { elements as elementInfo } from "@/lib/zodiac";
import { pairPath } from "@/lib/compatibility";
import {
  elementName,
  elementOrder,
  elementPairPath,
  elementPath,
  elementSigns,
  elementSlugs,
  pairTone,
  parseElementSlug,
  type ElementSlug,
} from "@/lib/elements";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return elementSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!parseElementSlug(slug)) return {};
  const page = mustLoadLegacy("elements", slug);
  const path = `/elements/${slug}`;
  const description = clipDescription(page.description || page.subtitle || "");
  return {
    title: page.title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", title: page.title, description, url: path },
    twitter: { title: page.title, description },
  };
}

export default async function ElementSlugPage({ params }: Props) {
  const { slug } = await params;
  const route = parseElementSlug(slug);
  if (!route) notFound();
  const page = mustLoadLegacy("elements", slug);
  return route.kind === "element" ? <ElementPage e={route.element} slug={slug} /> : <PairPage a={route.a} b={route.b} slug={slug} page={page} />;
}

function PairLinks({ current, focus }: { current?: string; focus?: ElementSlug }) {
  const list = focus ? elementOrder.map((o) => ({ a: focus, b: o })) : [];
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {list.map(({ a, b }) => {
        const slug = `${a}-and-${b}`;
        return (
          <li key={slug}>
            <Link
              href={elementPairPath(a, b)}
              aria-current={slug === current ? "page" : undefined}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${slug === current ? "bg-primary/30" : "bg-secondary/30 hover:bg-secondary/60"}`}
            >
              {elementName(a)} &amp; {elementName(b)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function ElementPage({ e, slug }: { e: ElementSlug; slug: string }) {
  const page = mustLoadLegacy("elements", slug);
  const name = elementName(e);
  const signs = elementSigns(e);
  return (
    <GuidePage
      page={page}
      crumbs={[{ name: "Home", path: "/" }, { name: "Elements", path: "/elements" }, { name: `${name} Signs`, path: elementPath(e) }]}
      kicker={signs.map((s) => s.name).join(" · ")}
      title={<><span className="gradient-text">{name}</span> Signs</>}
      lead={page.subtitle ?? elementInfo[name].description}
      before={
        <section aria-label={`The ${name.toLowerCase()} signs`} className="grid grid-cols-3 gap-3 mb-6">
          {signs.map((s) => (
            <SignCard key={s.slug} sign={s} note={`${s.modality} · ${s.ruler}`} />
          ))}
        </section>
      }
      extraToc={[{ id: "pairings", heading: `${name} compatibility with each element` }]}
      after={
        <>
          <section id="pairings" className="glass-card p-6 mb-6 scroll-mt-20" aria-labelledby="pairings-h">
            <h2 id="pairings-h" className="font-display text-xl font-semibold mb-1">{name} compatibility with each element</h2>
            <p className="text-sm text-muted-foreground mb-4">How {name.toLowerCase()} signs get on with every element, in love, friendship and work.</p>
            <PairLinks focus={e} />
          </section>
          <ExploreGrid current="/elements" />
        </>
      }
      cta={{ title: `How much ${name.toLowerCase()} is in your chart?`, body: "Your element balance counts every planet, not just your Sun. Skygram calculates your full birth chart for free and shows which elements dominate." }}
      faqTitle={`${name} signs FAQ`}
    />
  );
}

function PairPage({ a, b, slug, page }: { a: ElementSlug; b: ElementSlug; slug: string; page: ReturnType<typeof mustLoadLegacy> }) {
  const A = elementName(a);
  const B = elementName(b);
  const aSigns = elementSigns(a);
  const bSigns = elementSigns(b);
  const signPairs = aSigns.flatMap((x) => bSigns.map((y) => ({ x, y }))).filter(({ x, y }, i, arr) =>
    arr.findIndex((o) => pairPath(o.x.slug, o.y.slug) === pairPath(x.slug, y.slug)) === i,
  );
  return (
    <GuidePage
      page={page}
      crumbs={[{ name: "Home", path: "/" }, { name: "Elements", path: "/elements" }, { name: `${A} & ${B}`, path: `/elements/${slug}` }]}
      kicker={pairTone(a, b)}
      title={<><span className="gradient-text">{A}</span> and <span className="gradient-text">{B}</span> Compatibility</>}
      lead={page.subtitle ?? `How ${a === b ? `two ${A.toLowerCase()} signs get` : `${A.toLowerCase()} signs (${aSigns.map((s) => s.name).join(", ")}) and ${B.toLowerCase()} signs (${bSigns.map((s) => s.name).join(", ")}) get`} along in love, friendship, work and daily life.`}
      before={
        <section aria-label="The signs involved" className="grid sm:grid-cols-2 gap-3 mb-6">
          {[{ n: A, e: a, signs: aSigns }, ...(a === b ? [] : [{ n: B, e: b, signs: bSigns }])].map((g) => (
            <Link key={g.n} href={elementPath(g.e)} className="glass-card p-4 hover:border-primary/40 transition-colors">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{g.n} signs</p>
              <p className="font-medium">{g.signs.map((s) => s.name).join(", ")}</p>
              <p className="text-xs text-foreground/70 mt-1">{elementInfo[g.n].description}</p>
            </Link>
          ))}
        </section>
      }
      extraToc={[{ id: "sign-pairs", heading: `${A}–${B} sign pairings` }]}
      after={
        <>
          <section id="sign-pairs" className="glass-card p-6 mb-6 scroll-mt-20" aria-labelledby="sign-pairs-h">
            <h2 id="sign-pairs-h" className="font-display text-xl font-semibold mb-1">{A}–{B} sign pairings</h2>
            <p className="text-sm text-muted-foreground mb-4">Every zodiac pairing between these elements, with full compatibility scores.</p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {signPairs.map(({ x, y }) => (
                <li key={pairPath(x.slug, y.slug)}>
                  <Link href={pairPath(x.slug, y.slug)} className="block rounded-lg bg-secondary/30 px-3 py-2 text-sm hover:bg-secondary/60 transition-colors">
                    {x.name} &amp; {y.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="glass-card p-6 mb-6" aria-labelledby="more-pairs-h">
            <h2 id="more-pairs-h" className="font-display text-xl font-semibold mb-3">More {A.toLowerCase()} pairings</h2>
            <PairLinks focus={a} current={slug} />
          </section>
        </>
      }
      cta={{ title: `Is it really ${A.toLowerCase()} and ${B.toLowerCase()}?`, body: "Element compatibility is a first read. Skygram compares every planet in two birth charts for a compatibility report that's actually about the two of you." }}
      faqTitle={`${A} and ${B} FAQ`}
    />
  );
}
