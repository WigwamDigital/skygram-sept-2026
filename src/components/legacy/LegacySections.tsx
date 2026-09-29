import type { LegacyPage, LegacySection } from "@/lib/legacy";

/** Sanitised long-form HTML (built from our own migrated content, never user input). */
export function Prose({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`legacy-prose ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** "On this page" jump links for long articles. */
export function Toc({ sections, extra = [] }: { sections: Pick<LegacySection, "id" | "heading">[]; extra?: { id: string; heading: string }[] }) {
  const items = [...sections, ...extra];
  if (items.length < 4) return null;
  return (
    <nav aria-label="On this page" className="glass-card p-5 mb-6">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">On this page</p>
      <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
        {items.map((s, i) => (
          <li key={s.id} className="flex gap-2">
            <span className="font-mono text-xs text-muted-foreground/70 pt-0.5 w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
            <a href={`#${s.id}`} className="text-foreground/85 hover:text-accent transition-colors">
              {s.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Renders the body of a migrated page: intro + one glass card per H2 section. */
export default function LegacySections({ page, showIntro = true }: { page: LegacyPage; showIntro?: boolean }) {
  return (
    <>
      {showIntro && page.intro && (
        <section className="glass-card p-6 mb-6">
          <Prose html={page.intro} />
        </section>
      )}
      {page.sections.map((s) => (
        <section key={s.id} id={s.id} className="glass-card p-6 mb-6 scroll-mt-20" aria-labelledby={`${s.id}-h`}>
          <h2 id={`${s.id}-h`} className="font-display text-xl sm:text-2xl font-semibold mb-3">
            {s.heading}
          </h2>
          <Prose html={s.html} />
        </section>
      ))}
    </>
  );
}
