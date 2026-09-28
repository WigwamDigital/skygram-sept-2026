import AstroNote from "@/components/AstroNote";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq, { type FaqItem } from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import LegacySections, { Toc } from "@/components/legacy/LegacySections";
import type { LegacyPage } from "@/lib/legacy";
import { siteConfig, siteLink } from "@/lib/site";

/** Standard long-form article built around migrated content: hero, TOC, sections, CTA, FAQ. */
export default function GuidePage({
  page,
  crumbs,
  kicker,
  title,
  lead,
  glyph,
  before,
  after,
  extraToc = [],
  cta,
  faqTitle = "Frequently asked questions",
  extraFaqs = [],
  note = true,
}: {
  page: LegacyPage;
  crumbs: Crumb[];
  kicker?: string;
  title: React.ReactNode;
  lead?: string | null;
  glyph?: string;
  /** Rendered between the hero and the migrated sections */
  before?: React.ReactNode;
  /** Rendered after the migrated sections, before the CTA */
  after?: React.ReactNode;
  extraToc?: { id: string; heading: string }[];
  cta?: { title?: string; body?: string; cta?: string; href?: string };
  faqTitle?: string;
  extraFaqs?: FaqItem[];
  note?: boolean;
}) {
  const path = crumbs[crumbs.length - 1].path;
  const faqs = [...page.faqs, ...extraFaqs];
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: lead ?? page.description,
    mainEntityOfPage: siteLink(path),
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <JsonLd data={articleLd} />
      <Breadcrumbs items={crumbs} />

      <header className="text-center mb-8">
        {glyph && (
          <span className="block font-display text-6xl text-accent leading-none mb-3 animate-float" aria-hidden="true">
            {glyph}
          </span>
        )}
        {kicker && <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{kicker}</p>}
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3">{title}</h1>
        {lead && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{lead}</p>}
      </header>

      {before}
      <Toc sections={page.sections} extra={extraToc} />
      <LegacySections page={page} />
      {after}

      <CtaBanner {...cta} />
      {faqs.length > 0 && <Faq items={faqs} title={faqTitle} />}
      {note && <AstroNote />}
    </article>
  );
}
