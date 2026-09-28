import type { Metadata } from "next";
import Link from "next/link";
import GuidePage from "@/components/legacy/GuidePage";
import ExploreGrid from "@/components/legacy/ExploreGrid";
import { clipDescription, mustLoadLegacy } from "@/lib/legacy";
import { elements as elementInfo } from "@/lib/zodiac";
import { elementName, elementOrder, elementPairPath, elementPath, elementSigns, pairTone } from "@/lib/elements";

const hub = mustLoadLegacy("elements", "_hub");
// The old hub's link lists are replaced by the cards and matrix below.
const page = { ...hub, sections: hub.sections.filter((s) => !/^(explore by element|element compatibility)/i.test(s.heading)) };
const title = "Astrology Elements: Fire, Earth, Air & Water Signs Explained";
const description = clipDescription(hub.description);

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/elements" },
  openGraph: { title, description, url: "/elements" },
  twitter: { title, description },
};

const extraFaqs = [
  {
    q: "Which elements are compatible?",
    a: "Traditionally fire pairs best with air (air feeds fire) and earth with water (water nourishes earth). Signs of the same element also understand each other easily. Fire–water and earth–air pairings have the most contrast to work with.",
  },
];

export default function ElementsHubPage() {
  return (
    <GuidePage
      page={page}
      crumbs={[{ name: "Home", path: "/" }, { name: "Elements", path: "/elements" }]}
      kicker="Fire · Earth · Air · Water"
      title={<>The Four <span className="gradient-text">Elements</span></>}
      lead={hub.subtitle}
      before={
        <section aria-label="The four elements" className="grid sm:grid-cols-2 gap-3 mb-6">
          {elementOrder.map((e) => (
            <Link key={e} href={elementPath(e)} className="glass-card p-5 hover:-translate-y-0.5 hover:border-primary/40 transition-all">
              <h2 className="font-display text-xl font-semibold mb-1">{elementName(e)} signs</h2>
              <p className="text-sm text-accent mb-2">{elementSigns(e).map((s) => s.name).join(" · ")}</p>
              <p className="text-sm text-foreground/75">{elementInfo[elementName(e)].description}</p>
            </Link>
          ))}
        </section>
      }
      extraToc={[{ id: "matrix", heading: "Element compatibility" }]}
      after={
        <>
          <section id="matrix" className="glass-card p-6 mb-6 scroll-mt-20 overflow-x-auto" aria-labelledby="matrix-h">
            <h2 id="matrix-h" className="font-display text-xl sm:text-2xl font-semibold mb-1">Element compatibility</h2>
            <p className="text-sm text-muted-foreground mb-4">Pick a pairing for love, friendship and work dynamics.</p>
            <table className="w-full border-separate border-spacing-1 text-sm">
              <thead>
                <tr>
                  <th className="sr-only">Element</th>
                  {elementOrder.map((e) => (
                    <th key={e} scope="col" className="font-medium text-muted-foreground pb-1">{elementName(e)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {elementOrder.map((row) => (
                  <tr key={row}>
                    <th scope="row" className="text-left font-medium pr-2">{elementName(row)}</th>
                    {elementOrder.map((col) => (
                      <td key={col} className="p-0">
                        <Link
                          href={elementPairPath(row, col)}
                          title={pairTone(row, col)}
                          className="flex h-10 items-center justify-center rounded-md bg-secondary/40 hover:bg-primary/40 transition-colors text-xs"
                        >
                          {elementName(row)} &amp; {elementName(col)}
                        </Link>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <ExploreGrid current="/elements" />
        </>
      }
      cta={{ title: "Find your element balance", body: "Count every planet, not just the Sun. Skygram calculates your full birth chart for free and shows which elements shape you most." }}
      faqTitle="Elements FAQ"
      extraFaqs={extraFaqs}
    />
  );
}
