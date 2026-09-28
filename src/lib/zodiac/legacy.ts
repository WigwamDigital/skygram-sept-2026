import { loadLegacy, type LegacyPage } from "@/lib/legacy";
import type { SignSlug } from "./types";

/** Sections from the old /signs/{sign} pages that the new sign page doesn't already cover. */
const SIGN_SKIP = /^(quick facts|quick compatibility|explore more)/i;

export interface SignExtras {
  page: LegacyPage;
  tarot: string | null;
  body: string | null;
}

export function signExtras(slug: SignSlug): SignExtras | null {
  const raw = loadLegacy("signs", slug);
  if (!raw) return null;
  const facts = raw.sections.find((s) => /^quick facts/i.test(s.heading))?.html ?? "";
  const tarot = facts.match(/Tarot<\/td><td>(?:<em>)?([^<]+)/)?.[1]?.trim() ?? null;
  // Old intro line: "Cardinal Fire • Ruled by Mars • Head, muscles"
  const introText = raw.intro.replace(/<[^>]+>/g, "");
  const body = introText.split("•").map((s) => s.trim()).find((s, i) => i === 2 && s.length < 60) ?? null;
  return {
    tarot,
    body,
    page: {
      ...raw,
      intro: "",
      sections: raw.sections.filter((s) => !SIGN_SKIP.test(s.heading)).map((s) => ({ ...s, id: `more-${s.id}` })),
    },
  };
}

/** Reference sections from the old /signs hub (rulerships, house echoes, decans…). */
export function zodiacHubExtras(): LegacyPage | null {
  const raw = loadLegacy("signs", "_hub");
  if (!raw) return null;
  return {
    ...raw,
    sections: raw.sections.filter((s) => !/^(sign-by-sign guides|faq)$/i.test(s.heading.trim())),
  };
}
