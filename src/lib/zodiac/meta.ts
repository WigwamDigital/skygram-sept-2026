import type { SignSlug } from "./types";

/**
 * Lightweight sign metadata for client components (keeps long-form content out of the JS bundle).
 * Must stay in sync with the full sign data in ./signs — checked at build time in ./index.ts.
 */
export const signMeta: { slug: SignSlug; name: string; glyph: string; start: [number, number]; end: [number, number] }[] = [
  { slug: "aries", name: "Aries", glyph: "♈", start: [3, 21], end: [4, 19] },
  { slug: "taurus", name: "Taurus", glyph: "♉", start: [4, 20], end: [5, 20] },
  { slug: "gemini", name: "Gemini", glyph: "♊", start: [5, 21], end: [6, 20] },
  { slug: "cancer", name: "Cancer", glyph: "♋", start: [6, 21], end: [7, 22] },
  { slug: "leo", name: "Leo", glyph: "♌", start: [7, 23], end: [8, 22] },
  { slug: "virgo", name: "Virgo", glyph: "♍", start: [8, 23], end: [9, 22] },
  { slug: "libra", name: "Libra", glyph: "♎", start: [9, 23], end: [10, 22] },
  { slug: "scorpio", name: "Scorpio", glyph: "♏", start: [10, 23], end: [11, 21] },
  { slug: "sagittarius", name: "Sagittarius", glyph: "♐", start: [11, 22], end: [12, 21] },
  { slug: "capricorn", name: "Capricorn", glyph: "♑", start: [12, 22], end: [1, 19] },
  { slug: "aquarius", name: "Aquarius", glyph: "♒", start: [1, 20], end: [2, 18] },
  { slug: "pisces", name: "Pisces", glyph: "♓", start: [2, 19], end: [3, 20] },
];

type Meta = (typeof signMeta)[number];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const formatDay = ([m, d]: [number, number], short = false) =>
  `${short ? MONTHS[m - 1].slice(0, 3) : MONTHS[m - 1]} ${d}`;

export const dateRange = (s: Pick<Meta, "start" | "end">, short = false) =>
  `${formatDay(s.start, short)} – ${formatDay(s.end, short)}`;

/** Glyph with a text-presentation selector so it renders as a symbol, not an emoji. */
export const glyphText = (s: Pick<Meta, "glyph">) => `${s.glyph}︎`;

export const signPath = (slug: SignSlug) => `/zodiac/${slug}`;

/** Sun sign for a given month (1–12) and day. Tropical zodiac, standard cusp dates. */
export function signForDate(month: number, day: number): Meta {
  const md = month * 100 + day;
  for (const s of signMeta) {
    const start = s.start[0] * 100 + s.start[1];
    const end = s.end[0] * 100 + s.end[1];
    const inRange = start <= end ? md >= start && md <= end : md >= start || md <= end;
    if (inRange) return s;
  }
  return signMeta[9];
}

const order = (s: SignSlug) => signMeta.findIndex((x) => x.slug === s);

/** Canonical order: earlier sign in the zodiac first (Aries → Pisces). */
export function canonicalPair(x: SignSlug, y: SignSlug): [SignSlug, SignSlug] {
  return order(x) <= order(y) ? [x, y] : [y, x];
}

export const pairSlug = (x: SignSlug, y: SignSlug) => {
  const [a, b] = canonicalPair(x, y);
  return `${a}-and-${b}`;
};

export const pairPath = (x: SignSlug, y: SignSlug) => `/compatibility/${pairSlug(x, y)}`;
