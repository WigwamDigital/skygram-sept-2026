import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { siteLink } from "@/lib/site";

export type Crumb = { name: string; path: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: siteLink(c.path),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
      <JsonLd data={jsonLd} />
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-foreground/80">{c.name}</span>
              ) : (
                <Link href={c.path} className="hover:text-foreground transition-colors">{c.name}</Link>
              )}
              {!last && <ChevronRight className="w-3 h-3 opacity-50" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
