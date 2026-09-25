import type { Element, Modality, SignSlug, ZodiacSign } from "./types";
import { aries, leo, sagittarius } from "./signs/fire";
import { taurus, virgo, capricorn } from "./signs/earth";
import { gemini, libra, aquarius } from "./signs/air";
import { cancer, scorpio, pisces } from "./signs/water";
import { dateRange, signForDate as metaSignForDate, signMeta } from "./meta";

export type { Element, Modality, SignSlug, ZodiacSign } from "./types";

/** All 12 signs in zodiac order (Aries → Pisces). */
export const signs: ZodiacSign[] = [
  aries, taurus, gemini, cancer, leo, virgo,
  libra, scorpio, sagittarius, capricorn, aquarius, pisces,
];

const bySlug = new Map(signs.map((s) => [s.slug, s]));

export function getSign(slug: string): ZodiacSign | undefined {
  return bySlug.get(slug as SignSlug);
}

export function mustGetSign(slug: SignSlug): ZodiacSign {
  const s = bySlug.get(slug);
  if (!s) throw new Error(`Unknown sign: ${slug}`);
  return s;
}

export { dateRange, formatDay, glyphText, signPath } from "./meta";

/** Full sign data for a date — see signForDate in ./meta for the lightweight version. */
export function signForDate(month: number, day: number): ZodiacSign {
  return mustGetSign(metaSignForDate(month, day).slug);
}

// Guard: lightweight client metadata must match the full sign data.
for (const [i, m] of signMeta.entries()) {
  const s = signs[i];
  if (s.slug !== m.slug || s.name !== m.name || s.glyph !== m.glyph || String(s.start) !== String(m.start) || String(s.end) !== String(m.end)) {
    throw new Error(`zodiac/meta.ts is out of sync with sign data for ${s.slug}`);
  }
}

export function neighbours(slug: SignSlug) {
  const i = signs.findIndex((s) => s.slug === slug);
  return {
    prev: signs[(i + 11) % 12],
    next: signs[(i + 1) % 12],
  };
}

export const elements: Record<Element, { description: string; signs: SignSlug[] }> = {
  Fire: {
    description: "Passionate, energetic and action-oriented. Fire signs lead with enthusiasm and courage.",
    signs: ["aries", "leo", "sagittarius"],
  },
  Earth: {
    description: "Grounded, practical and reliable. Earth signs build steadily and value what is real and lasting.",
    signs: ["taurus", "virgo", "capricorn"],
  },
  Air: {
    description: "Intellectual, social and communicative. Air signs live in ideas, conversation and connection.",
    signs: ["gemini", "libra", "aquarius"],
  },
  Water: {
    description: "Emotional, intuitive and empathetic. Water signs feel deeply and navigate life through intuition.",
    signs: ["cancer", "scorpio", "pisces"],
  },
};

export const modalities: Record<Modality, string> = {
  Cardinal: "Cardinal signs begin each season. They are initiators — quick to start and eager to lead.",
  Fixed: "Fixed signs fall mid-season. They are stabilisers — steady, determined and loyal.",
  Mutable: "Mutable signs close each season. They are adapters — flexible, versatile and open to change.",
};

export const elementAccent: Record<Element, string> = {
  Fire: "from-orange-400/25 to-pink-500/10",
  Earth: "from-emerald-400/20 to-lime-400/5",
  Air: "from-sky-400/20 to-violet-400/10",
  Water: "from-blue-500/25 to-cyan-400/5",
};

export function signFaqs(s: ZodiacSign) {
  const best = s.bestMatches.map((m) => mustGetSign(m).name);
  const opposite = mustGetSign(s.opposite).name;
  return [
    {
      q: `What are the ${s.name} zodiac sign dates?`,
      a: `${s.name} season runs from ${dateRange(s)} in the tropical zodiac. Exact start and end times shift by a day in some years, so people born on a cusp should check their full birth chart.`,
    },
    {
      q: `What element and modality is ${s.name}?`,
      a: `${s.name} is a ${s.modality.toLowerCase()} ${s.element.toLowerCase()} sign. ${elements[s.element].description} ${modalities[s.modality]}`,
    },
    {
      q: `What planet rules ${s.name}?`,
      a: s.traditionalRuler
        ? `${s.name} is ruled by ${s.ruler} in modern astrology and by ${s.traditionalRuler} in traditional astrology.`
        : `${s.name} is ruled by ${s.ruler}.`,
    },
    {
      q: `Who is ${s.name} most compatible with?`,
      a: `${s.name} traditionally gets along best with ${best.slice(0, -1).join(", ")} and ${best[best.length - 1]}. Real compatibility depends on the whole chart — Moon, Venus, Mars and Ascendant — not just Sun signs.`,
    },
    {
      q: `What is the opposite sign of ${s.name}?`,
      a: `${s.name}'s opposite sign is ${opposite}. Opposite signs sit 180° apart on the zodiac wheel and often attract each other because each has what the other is learning.`,
    },
  ];
}
