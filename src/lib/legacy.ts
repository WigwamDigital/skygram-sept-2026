import fs from "node:fs";
import path from "node:path";
import { appLink } from "@/lib/site";

/**
 * Long-form content migrated from the previous skygram.ai site (aspects, planets, elements, guides…).
 * Stored as sanitised JSON in /content/legacy/<section>/<slug>.json and read at build time only —
 * every page that uses it is statically generated, so nothing here ships to the browser.
 */
export interface LegacySection {
  id: string;
  heading: string;
  /** Sanitised HTML: p, ul/ol/li, h3/h4, table, strong/em, a, span.chip, div.chips, div.lc */
  html: string;
}

export interface LegacyPage {
  /** Path on the old site */
  oldPath: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  kicker: string | null;
  subtitle: string | null;
  /** Short summary paragraph from the old page hero */
  summary: string | null;
  intro: string;
  sections: LegacySection[];
  faqs: { q: string; a: string }[];
  words: number;
  /** The old page only carried a generic template + summary; the new page supplies its own body. */
  thin: boolean;
}

export type LegacySectionName =
  | "aspects"
  | "planets"
  | "elements"
  | "guides"
  | "compatibility-types"
  | "compatibility-pairs"
  | "signs"
  | "houses";

const ROOT = path.join(process.cwd(), "content", "legacy");

/** Headings that were navigation on the old site; the new templates provide their own. */
const NAV_HEADING = /^(contents|table of contents|on this page|explore more|related links|related pages|explore more guides)\b/i;

const cache = new Map<string, LegacyPage | null>();

export function loadLegacy(section: LegacySectionName, slug: string): LegacyPage | null {
  const key = `${section}/${slug}`;
  if (cache.has(key)) return cache.get(key)!;
  const file = path.join(ROOT, section, `${slug}.json`);
  let page: LegacyPage | null = null;
  if (fs.existsSync(file)) {
    const raw = JSON.parse(fs.readFileSync(file, "utf8")) as LegacyPage;
    page = {
      ...raw,
      title: raw.title.replace(/\s*[|–-]\s*Skygram(\.ai)?\s*$/i, ""),
      intro: resolveLinks(raw.intro),
      sections: raw.sections
        .filter((s) => !NAV_HEADING.test(s.heading.trim()))
        .map((s) => ({ ...s, heading: tidyHeading(s.heading), html: resolveLinks(s.html) })),
    };
  }
  cache.set(key, page);
  return page;
}

export function mustLoadLegacy(section: LegacySectionName, slug: string): LegacyPage {
  const p = loadLegacy(section, slug);
  if (!p) throw new Error(`Missing legacy content: ${section}/${slug}`);
  return p;
}

/** Drop decorative suffixes like "(tap for deep dives)" and emoji from old headings. */
function tidyHeading(h: string) {
  return h
    .replace(/\s*\((tap|click)[^)]*\)\s*$/i, "")
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]️?/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** APP:/path → main app URL; external links open safely in a new tab. */
function resolveLinks(html: string) {
  return html
    .replace(/href="APP:([^"]*)"/g, (_, p: string) => `href="${appLink(p || "/")}"`)
    .replace(/<a href="(https?:\/\/(?!app\.skygram\.ai)[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');
}

/** Trim text to meta-description length on a word boundary. */
export function clipDescription(s: string, max = 158) {
  if (s.length <= max) return s;
  return `${s.slice(0, s.lastIndexOf(" ", max - 1)).replace(/[,;:—–-]$/, "")}…`;
}
