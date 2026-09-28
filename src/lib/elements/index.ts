import { elements as elementInfo, mustGetSign, type Element, type SignSlug, type ZodiacSign } from "@/lib/zodiac";

export type ElementSlug = "fire" | "earth" | "air" | "water";

export const elementOrder: ElementSlug[] = ["fire", "earth", "air", "water"];

export const elementName = (e: ElementSlug) => (e[0].toUpperCase() + e.slice(1)) as Element;

export const elementSigns = (e: ElementSlug): ZodiacSign[] => elementInfo[elementName(e)].signs.map((s: SignSlug) => mustGetSign(s));

export const elementPath = (e: ElementSlug) => `/elements/${e}-signs`;
export const elementPairPath = (a: ElementSlug, b: ElementSlug) => `/elements/${a}-and-${b}`;

/** Every ordered element pairing (16), matching the old URL set — both orders had their own articles. */
export const elementPairs = elementOrder.flatMap((a) => elementOrder.map((b) => ({ a, b, slug: `${a}-and-${b}` })));

export type ElementRoute = { kind: "element"; element: ElementSlug } | { kind: "pair"; a: ElementSlug; b: ElementSlug };

export function parseElementSlug(slug: string): ElementRoute | null {
  const one = slug.match(/^(fire|earth|air|water)-signs$/);
  if (one) return { kind: "element", element: one[1] as ElementSlug };
  const two = slug.match(/^(fire|earth|air|water)-and-(fire|earth|air|water)$/);
  if (two) return { kind: "pair", a: two[1] as ElementSlug, b: two[2] as ElementSlug };
  return null;
}

export const elementSlugs = [...elementOrder.map((e) => `${e}-signs`), ...elementPairs.map((p) => p.slug)];

/** How two elements traditionally combine. */
export function pairTone(a: ElementSlug, b: ElementSlug) {
  if (a === b) return "Same element: instant understanding, shared blind spots";
  const set = new Set([a, b]);
  if ((set.has("fire") && set.has("air")) || (set.has("earth") && set.has("water"))) return "Complementary: each element feeds the other";
  return "Contrasting: different tempos that can balance or clash";
}
