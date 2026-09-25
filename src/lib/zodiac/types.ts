export type Element = "Fire" | "Earth" | "Air" | "Water";
export type Modality = "Cardinal" | "Fixed" | "Mutable";

export type SignSlug =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export interface ZodiacSign {
  slug: SignSlug;
  name: string;
  /** Unicode glyph, e.g. ♈ */
  glyph: string;
  /** What the sign is represented by, e.g. "The Ram" */
  symbol: string;
  /** Inclusive tropical date range as [month, day] (month 1–12) */
  start: [number, number];
  end: [number, number];
  element: Element;
  modality: Modality;
  /** Modern ruling planet */
  ruler: string;
  /** Traditional ruler, when it differs from the modern one */
  traditionalRuler?: string;
  /** Natural house in the zodiac wheel (1–12) */
  house: number;
  opposite: SignSlug;
  keywords: string[];
  /** One-line hook used in hero + meta descriptions */
  tagline: string;
  overview: string[];
  strengths: string[];
  challenges: string[];
  love: string[];
  friendship: string;
  career: string;
  careerPaths: string[];
  /** Traditionally harmonious signs, strongest first */
  bestMatches: SignSlug[];
  /** Traditionally challenging (growth-oriented) matches */
  challengingMatches: SignSlug[];
}
