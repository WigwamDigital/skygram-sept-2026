import type { Metadata } from "next";
import Link from "next/link";
import GuidePage from "@/components/legacy/GuidePage";
import { clipDescription, mustLoadLegacy, type LegacyPage } from "@/lib/legacy";
import { appLink } from "@/lib/site";
import { relationshipTypePath, relationshipTypes, type RelationshipType } from "@/lib/compatibility/types";

/**
 * The old pages were generated from a template with a bug: some headings and intros said
 * "Aspects" or "Romantic" instead of the page's own relationship type. Fix those labels here.
 */
function fixLabels(page: LegacyPage, label: string): LegacyPage {
  const fix = (s: string) => s.replace(/^(Aspects|Romantic|Friendship|Work|Family)(?=:| looks| explores| focuses)/, `${label} compatibility`);
  return {
    ...page,
    subtitle: page.subtitle ? fix(page.subtitle) : page.subtitle,
    sections: page.sections.map((s) => ({ ...s, heading: fix(s.heading) })),
  };
}

export function relationshipTypeMetadata(t: RelationshipType): Metadata {
  const page = mustLoadLegacy("compatibility-types", t);
  const path = relationshipTypePath(t);
  const description = clipDescription(page.description);
  return {
    title: page.title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", title: page.title, description, url: path },
    twitter: { title: page.title, description },
  };
}

export default function RelationshipTypePage({ type }: { type: RelationshipType }) {
  const info = relationshipTypes.find((r) => r.slug === type)!;
  const page = fixLabels(mustLoadLegacy("compatibility-types", type), info.label);
  const path = relationshipTypePath(type);
  return (
    <GuidePage
      page={page}
      crumbs={[{ name: "Home", path: "/" }, { name: "Compatibility", path: "/compatibility" }, { name: `${info.label} compatibility`, path }]}
      kicker="Synastry guide"
      title={<><span className="gradient-text">{info.label}</span> Compatibility in Astrology</>}
      lead={page.subtitle}
      before={
        <nav aria-label="Relationship types" className="flex flex-wrap justify-center gap-2 mb-8">
          {relationshipTypes.map((r) => (
            <Link
              key={r.slug}
              href={relationshipTypePath(r.slug)}
              aria-current={r.slug === type ? "page" : undefined}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${r.slug === type ? "border-primary bg-primary/30" : "border-primary/30 bg-primary/10 hover:bg-primary/20"}`}
            >
              {r.short}
            </Link>
          ))}
        </nav>
      }
      after={
        <section className="glass-card p-6 mb-6" aria-labelledby="pairs-h">
          <h2 id="pairs-h" className="font-display text-xl font-semibold mb-1">Check a zodiac pairing</h2>
          <p className="text-sm text-foreground/80">
            Sun-sign pairings are a quick first read. Browse all 78 on the{" "}
            <Link href="/compatibility" className="text-accent hover:underline underline-offset-4">compatibility chart</Link>, or learn how
            charts are compared in <Link href="/astrology-charts" className="text-accent hover:underline underline-offset-4">synastry and composite charts</Link>.
          </p>
        </section>
      }
      cta={{
        title: `Get a ${info.label.toLowerCase()} compatibility report`,
        body: "Add a friend, partner, colleague or family member on Skygram and get an AI compatibility report that compares every planet in both birth charts.",
        cta: "Try the compatibility calculator",
        href: appLink("/compatibility-calculator"),
      }}
      faqTitle={`${info.label} compatibility FAQ`}
    />
  );
}
