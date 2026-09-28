import type { SignSlug } from "@/lib/zodiac/types";

export type PlanetSlug =
  | "sun" | "moon" | "mercury" | "venus" | "mars"
  | "jupiter" | "saturn" | "uranus" | "neptune" | "pluto";

export type BodySlug = PlanetSlug | "north-node";

export type PlanetGroup = "Luminary" | "Personal planet" | "Social planet" | "Outer planet" | "Lunar node";

export interface Planet {
  slug: BodySlug;
  name: string;
  glyph: string;
  group: PlanetGroup;
  /** Three-word function, e.g. "Core · Will · Vitality" */
  function: [string, string, string];
  /** What it governs, in running text: "identity, vitality and purpose" */
  governs: string;
  keywords: string[];
  domicile: SignSlug[];
  /** Traditional ruler of these signs before the outer planets were discovered */
  traditionalDomicile?: SignSlug[];
  detriment: SignSlug[];
  exaltation: SignSlug[];
  fall: SignSlug[];
  /** Houses it is naturally associated with */
  naturalHouses: number[];
  /** Time to travel through the whole zodiac */
  cycle: string;
  /** Typical time spent in one sign */
  perSign: string;
  retrograde: string;
  /** How it tends to express when supported (trines, sextiles) */
  flow: string;
  /** How it tends to express under pressure (squares, oppositions) */
  friction: string;
  /** Its role when it touches someone else's chart */
  synastry: string;
}

export const planets: Planet[] = [
  {
    slug: "sun", name: "Sun", glyph: "☉", group: "Luminary",
    function: ["Core", "Will", "Vitality"],
    governs: "identity, vitality and conscious purpose",
    keywords: ["Identity", "Purpose", "Confidence", "Creativity", "Leadership"],
    domicile: ["leo"], detriment: ["aquarius"], exaltation: ["aries"], fall: ["libra"],
    naturalHouses: [5],
    cycle: "About 1 year", perSign: "About 30 days", retrograde: "Never retrograde",
    flow: "confident self-expression and a clear sense of direction",
    friction: "ego clashes, pride and the need to be seen at any cost",
    synastry: "the Sun person lights up and validates what they touch",
  },
  {
    slug: "moon", name: "Moon", glyph: "☽", group: "Luminary",
    function: ["Needs", "Mood", "Memory"],
    governs: "emotions, instincts, habits and the need for safety",
    keywords: ["Emotions", "Instinct", "Home", "Nurture", "Memory"],
    domicile: ["cancer"], detriment: ["capricorn"], exaltation: ["taurus"], fall: ["scorpio"],
    naturalHouses: [4],
    cycle: "About 27.3 days (29.5 days New Moon to New Moon)", perSign: "About 2.5 days", retrograde: "Never retrograde",
    flow: "emotional ease, good instincts and a feeling of being at home",
    friction: "moodiness, defensiveness and old emotional reflexes",
    synastry: "the Moon person feels emotionally met, soothed or stirred",
  },
  {
    slug: "mercury", name: "Mercury", glyph: "☿", group: "Personal planet",
    function: ["Mind", "Message", "Mapping"],
    governs: "thinking, speech, learning and everyday exchange",
    keywords: ["Communication", "Curiosity", "Logic", "Learning", "Trade"],
    domicile: ["gemini", "virgo"], detriment: ["sagittarius", "pisces"], exaltation: ["virgo"], fall: ["pisces"],
    naturalHouses: [3, 6],
    cycle: "About 1 year (it never strays more than 28° from the Sun)", perSign: "About 2–3 weeks, longer when retrograde",
    retrograde: "3–4 times a year, about 3 weeks each",
    flow: "quick understanding, clear words and useful ideas",
    friction: "overthinking, crossed wires and arguments about details",
    synastry: "conversation flows or snags; the Mercury person shapes how ideas are shared",
  },
  {
    slug: "venus", name: "Venus", glyph: "♀", group: "Personal planet",
    function: ["Bonding", "Taste", "Values"],
    governs: "love, attraction, pleasure, beauty and money",
    keywords: ["Love", "Attraction", "Harmony", "Beauty", "Values"],
    domicile: ["taurus", "libra"], detriment: ["scorpio", "aries"], exaltation: ["pisces"], fall: ["virgo"],
    naturalHouses: [2, 7],
    cycle: "About 1 year (never more than 47° from the Sun)", perSign: "About 4–5 weeks",
    retrograde: "About every 18 months, for roughly 6 weeks",
    flow: "warmth, charm, easy affection and good taste",
    friction: "people-pleasing, indulgence and tension between wanting and having",
    synastry: "the Venus person feels attracted and appreciative; this is classic romance glue",
  },
  {
    slug: "mars", name: "Mars", glyph: "♂", group: "Personal planet",
    function: ["Drive", "Boundaries", "Courage"],
    governs: "desire, energy, assertion and how you fight for what you want",
    keywords: ["Drive", "Action", "Desire", "Courage", "Competition"],
    domicile: ["aries"], traditionalDomicile: ["scorpio"], detriment: ["libra", "taurus"], exaltation: ["capricorn"], fall: ["cancer"],
    naturalHouses: [1, 8],
    cycle: "About 2 years", perSign: "About 6–7 weeks, up to 7 months around a retrograde",
    retrograde: "About every 26 months, for roughly 8–10 weeks",
    flow: "focused energy, healthy assertiveness and the courage to act",
    friction: "anger, impatience, rivalry and burnout",
    synastry: "the Mars person energises, pursues or provokes; sexual chemistry and friction live here",
  },
  {
    slug: "jupiter", name: "Jupiter", glyph: "♃", group: "Social planet",
    function: ["Growth", "Faith", "Opportunity"],
    governs: "growth, luck, belief, generosity and the big picture",
    keywords: ["Expansion", "Optimism", "Wisdom", "Abundance", "Travel"],
    domicile: ["sagittarius"], traditionalDomicile: ["pisces"], detriment: ["gemini", "virgo"], exaltation: ["cancer"], fall: ["capricorn"],
    naturalHouses: [9, 12],
    cycle: "About 12 years", perSign: "About 1 year", retrograde: "Once a year, for about 4 months",
    flow: "optimism, generosity and doors that open at the right time",
    friction: "excess, overpromising and taking on too much",
    synastry: "the Jupiter person encourages, teaches and expands the other",
  },
  {
    slug: "saturn", name: "Saturn", glyph: "♄", group: "Social planet",
    function: ["Structure", "Limits", "Mastery"],
    governs: "discipline, time, responsibility and long-term achievement",
    keywords: ["Discipline", "Structure", "Responsibility", "Maturity", "Endurance"],
    domicile: ["capricorn"], traditionalDomicile: ["aquarius"], detriment: ["cancer", "leo"], exaltation: ["libra"], fall: ["aries"],
    naturalHouses: [10, 11],
    cycle: "About 29.5 years (the Saturn return)", perSign: "About 2.5 years", retrograde: "Once a year, for about 4.5 months",
    flow: "patience, reliability and skill built over time",
    friction: "fear, pressure, delay and harsh self-criticism",
    synastry: "the Saturn person stabilises, commits or restricts; it is the glue of long-term bonds",
  },
  {
    slug: "uranus", name: "Uranus", glyph: "♅", group: "Outer planet",
    function: ["Shock", "Freedom", "Innovation"],
    governs: "change, freedom, originality and sudden awakenings",
    keywords: ["Freedom", "Innovation", "Rebellion", "Awakening", "Surprise"],
    domicile: ["aquarius"], detriment: ["leo"], exaltation: [], fall: [],
    naturalHouses: [11],
    cycle: "About 84 years", perSign: "About 7 years", retrograde: "Once a year, for about 5 months",
    flow: "inventiveness, independence and well-timed breakthroughs",
    friction: "restlessness, sudden upheaval and resistance to any limits",
    synastry: "the Uranus person electrifies and unsettles; exciting, but hard to pin down",
  },
  {
    slug: "neptune", name: "Neptune", glyph: "♆", group: "Outer planet",
    function: ["Vision", "Fog", "Surrender"],
    governs: "dreams, imagination, spirituality, compassion and illusion",
    keywords: ["Imagination", "Compassion", "Intuition", "Spirituality", "Illusion"],
    domicile: ["pisces"], detriment: ["virgo"], exaltation: [], fall: [],
    naturalHouses: [12],
    cycle: "About 165 years", perSign: "About 14 years", retrograde: "Once a year, for about 5 months",
    flow: "inspiration, empathy and artistic or spiritual sensitivity",
    friction: "confusion, escapism, idealising people and blurred boundaries",
    synastry: "the Neptune person idealises or enchants; magical, but check what is real",
  },
  {
    slug: "pluto", name: "Pluto", glyph: "♇", group: "Outer planet",
    function: ["Power", "Shadow", "Renewal"],
    governs: "power, intensity, transformation and what lies beneath the surface",
    keywords: ["Transformation", "Power", "Intensity", "Rebirth", "Depth"],
    domicile: ["scorpio"], detriment: ["taurus"], exaltation: [], fall: [],
    naturalHouses: [8],
    cycle: "About 248 years", perSign: "About 12–31 years (its orbit is elliptical)", retrograde: "Once a year, for about 5–6 months",
    flow: "psychological insight, resilience and the power to regenerate",
    friction: "control struggles, obsession and all-or-nothing crises",
    synastry: "the Pluto person transforms, fascinates or tries to control; bonds run deep",
  },
  {
    slug: "north-node", name: "North Node", glyph: "☊", group: "Lunar node",
    function: ["Direction", "Growth", "Purpose"],
    governs: "the direction of growth and the lessons you're reaching toward",
    keywords: ["Destiny", "Growth", "Direction", "Purpose", "Karma"],
    domicile: [], detriment: [], exaltation: [], fall: [],
    naturalHouses: [],
    cycle: "About 18.6 years (it moves backwards through the zodiac)", perSign: "About 18 months", retrograde: "Mean node is always retrograde",
    flow: "a sense of being on the right path",
    friction: "the pull of old, comfortable South Node habits",
    synastry: "the other person feels fated, as if they arrived to point you somewhere new",
  },
];

const bySlug = new Map(planets.map((p) => [p.slug, p]));

export const getPlanet = (slug: string) => bySlug.get(slug as BodySlug);
export function mustGetPlanet(slug: BodySlug): Planet {
  const p = bySlug.get(slug);
  if (!p) throw new Error(`Unknown planet: ${slug}`);
  return p;
}

/** The ten classical + modern planets (excludes the North Node). */
export const tenPlanets = planets.filter((p) => p.slug !== "north-node") as (Planet & { slug: PlanetSlug })[];

export const planetPath = (slug: BodySlug) => `/planets/${slug}`;

/** "the Sun", "the Moon", "Mercury" — luminaries and nodes take an article in running text. */
export const theName = (p: Pick<Planet, "slug" | "name">, capital = false) => {
  const needsArticle = p.slug === "sun" || p.slug === "moon" || p.slug === "north-node";
  if (!needsArticle) return p.name;
  return `${capital ? "The" : "the"} ${p.name}`;
};

/** Glyph with a text-presentation selector so it renders as a symbol, not an emoji. */
export const planetGlyph = (p: Pick<Planet, "glyph">) => `${p.glyph}︎`;
