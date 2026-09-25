import { ChevronDown } from "lucide-react";
import JsonLd from "@/components/JsonLd";

export type FaqItem = { q: string; a: string };

/** Accessible, no-JS FAQ (native <details>) with FAQPage structured data. */
export default function Faq({ items, title = "Frequently asked questions" }: { items: FaqItem[]; title?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="mb-6" aria-labelledby="faq-heading">
      <JsonLd data={jsonLd} />
      <h2 id="faq-heading" className="font-display text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {items.map((f) => (
          <details key={f.q} className="group glass-card px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              <h3 className="text-base font-sans font-medium">{f.q}</h3>
              <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
