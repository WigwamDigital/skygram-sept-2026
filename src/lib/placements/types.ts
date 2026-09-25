import type { Element, SignSlug } from "@/lib/zodiac/types";

export type PointSlug = "moon" | "mercury" | "venus" | "mars" | "jupiter" | "saturn" | "rising";

export interface PlacementText {
  /** 2–3 hand-written sentences on this exact placement */
  blurb: string;
  keywords: [string, string, string];
  gifts: [string, string];
  shadow: string;
}

export interface Point {
  slug: PointSlug;
  name: string;
  glyph: string;
  /** "Moon sign", "Venus sign", "Rising sign" */
  signLabel: string;
  /** Short list of what it governs */
  governs: string;
  /** 2–3 sentence intro used on hub + placement pages */
  intro: string;
  /** Plain-language "how long it stays in a sign" */
  duration: string;
  /** Headline life area for section titles, e.g. "Emotions", "Love & values" */
  domain: string;
  /** Traditional essential dignities (Rising has none) */
  dignities?: {
    domicile: SignSlug[];
    exaltation: SignSlug[];
    detriment: SignSlug[];
    fall: SignSlug[];
  };
  /** How this point expresses through each element */
  byElement: Record<Element, { expression: string; tip: string }>;
  /** Hand-written text for each sign */
  signs: Record<SignSlug, PlacementText>;
}
