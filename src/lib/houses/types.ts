export type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type HousePlanetSlug = "sun" | "moon" | "mercury" | "venus" | "mars" | "jupiter" | "saturn";
export type HouseKind = "angular" | "succedent" | "cadent";

export interface HouseText {
  /** 2 hand-written sentences on this exact planet-in-house placement */
  blurb: string;
  keywords: [string, string, string];
  /** The growth edge of the placement */
  shadow: string;
}

export interface HousePlanetText {
  slug: HousePlanetSlug;
  name: string;
  glyph: string;
  /** What the planet governs, e.g. "identity, vitality and purpose" */
  governs: string;
  houses: Record<HouseNumber, HouseText>;
}
