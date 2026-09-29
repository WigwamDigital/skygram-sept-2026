import { loadLegacy, type LegacyPage } from "@/lib/legacy";
import type { HouseNumber } from "./types";

const ord = (n: number) => `${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"}`;

/** Long-form sections from the old /houses/{n} page (rulers, Ascendant by sign, transits…). */
export function houseExtras(n: HouseNumber): LegacyPage | null {
  const raw = loadLegacy("houses", String(n));
  if (!raw || raw.thin) return null;
  return {
    ...raw,
    intro: "",
    sections: raw.sections.map((s) => ({
      ...s,
      id: `more-${s.id}`,
      heading: s.heading
        .replace(/^\d+: what it really shows$/i, `What the ${ord(n)} house really shows`)
        .replace(/^FAQ$/i, `More questions about the ${ord(n)} house`),
    })),
  };
}

/** Reference sections from the old /houses hub: angles, house rulers, house systems, worked examples. */
export function housesHubExtras(): LegacyPage | null {
  return loadLegacy("houses", "_hub");
}
