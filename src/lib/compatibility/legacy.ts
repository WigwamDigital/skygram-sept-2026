import { loadLegacy, type LegacyPage } from "@/lib/legacy";
import type { SignSlug } from "@/lib/zodiac";

const SKIP = /^(contents|run your charts|related links)/i;

/**
 * The old site had a separate long-form article for each order of a pair (aries-and-leo and
 * leo-and-aries). The reverse URL now redirects to the canonical page, so we show the richer of
 * the two articles here. Old 0–10 sub-scores are removed: the page's own scores replace them.
 */
export function pairGuide(a: SignSlug, b: SignSlug): LegacyPage | null {
  const candidates = [loadLegacy("compatibility-pairs", `${a}-and-${b}`), loadLegacy("compatibility-pairs", `${b}-and-${a}`)]
    .filter((p): p is LegacyPage => p !== null)
    .sort((x, y) => y.words - x.words);
  const page = candidates[0];
  if (!page) return null;
  return {
    ...page,
    intro: "",
    sections: page.sections
      .filter((s) => !SKIP.test(s.heading))
      .map((s) => ({
        ...s,
        id: `guide-${s.id}`,
        html: s.html.replace(/<p><strong>[^<]{2,40}<\/strong>\s*[\d.]+\s*\/\s*10\s*<\/p>/g, ""),
      }))
      .filter((s) => s.html.trim().length > 0),
  };
}
