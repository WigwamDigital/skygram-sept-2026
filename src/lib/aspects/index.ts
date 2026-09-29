import { tenPlanets, theName, type Planet, type PlanetSlug } from "@/lib/planets";

export type AspectTypeSlug = "conjunction" | "sextile" | "square" | "trine" | "opposition";
export type AspectVerb = "conjunct" | "sextile" | "square" | "trine" | "opposite";
export type AspectNature = "Blending" | "Harmonious" | "Challenging";

export interface AspectType {
  slug: AspectTypeSlug;
  verb: AspectVerb;
  name: string;
  glyph: string;
  angle: number;
  /** Signs apart on the zodiac wheel */
  signsApart: string;
  /** Typical natal orb */
  orb: string;
  nature: AspectNature;
  keyword: string;
  /** One-sentence definition used on cards and meta descriptions */
  short: string;
}

/** The five major (Ptolemaic) aspects, in order of angle. */
export const aspectTypes: AspectType[] = [
  {
    slug: "conjunction", verb: "conjunct", name: "Conjunction", glyph: "☌", angle: 0, signsApart: "Same sign (usually)",
    orb: "8–10°", nature: "Blending", keyword: "Fusion",
    short: "Two planets at the same degree merge their energies, creating intensity and focus, for better or worse.",
  },
  {
    slug: "sextile", verb: "sextile", name: "Sextile", glyph: "⚹", angle: 60, signsApart: "Two signs",
    orb: "4–6°", nature: "Harmonious", keyword: "Opportunity",
    short: "Planets 60° apart cooperate easily. It's an opening that rewards you when you act on it.",
  },
  {
    slug: "square", verb: "square", name: "Square", glyph: "□", angle: 90, signsApart: "Three signs",
    orb: "6–8°", nature: "Challenging", keyword: "Friction",
    short: "Planets 90° apart pull against each other. The tension is uncomfortable but drives growth and achievement.",
  },
  {
    slug: "trine", verb: "trine", name: "Trine", glyph: "△", angle: 120, signsApart: "Four signs (same element)",
    orb: "6–8°", nature: "Harmonious", keyword: "Flow",
    short: "Planets 120° apart, usually in the same element, flow together. It marks natural talent and ease.",
  },
  {
    slug: "opposition", verb: "opposite", name: "Opposition", glyph: "☍", angle: 180, signsApart: "Six signs (opposite)",
    orb: "8–10°", nature: "Challenging", keyword: "Polarity",
    short: "Planets 180° apart face each other. It creates polarity that plays out through relationships and needs balance.",
  },
];

const typeBySlug = new Map(aspectTypes.map((t) => [t.slug, t]));
const typeByVerb = new Map(aspectTypes.map((t) => [t.verb, t]));
export const getAspectType = (slug: string) => typeBySlug.get(slug as AspectTypeSlug);
export const aspectTypePath = (slug: AspectTypeSlug) => `/aspects/${slug}`;

export interface Aspect {
  slug: string;
  a: Planet & { slug: PlanetSlug };
  b: Planet & { slug: PlanetSlug };
  type: AspectType;
  /** "Sun Trine Jupiter" */
  title: string;
  /** "Sun trine Jupiter" for running text */
  phrase: string;
  /** Same planet on both sides (only possible between two charts or by transit/return) */
  self: boolean;
}

export const aspectSlug = (a: PlanetSlug, v: AspectVerb, b: PlanetSlug) => `${a}-${v}-${b}`;
export const aspectPath = (a: PlanetSlug, v: AspectVerb, b: PlanetSlug) => `/aspects/${aspectSlug(a, v, b)}`;
export const pathOf = (x: Pick<Aspect, "a" | "b" | "type">) => aspectPath(x.a.slug, x.type.verb, x.b.slug);

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** "a trine", "an opposition" */
const an = (word: string) => `${/^[aeiou]/i.test(word) ? "an" : "a"} ${word}`;

/** Every ordered planet pair × every major aspect (10 × 10 × 5 = 500), matching the old URL set. */
export const aspects: Aspect[] = tenPlanets.flatMap((a) =>
  tenPlanets.flatMap((b) =>
    aspectTypes.map((type) => ({
      slug: aspectSlug(a.slug, type.verb, b.slug),
      a,
      b,
      type,
      title: `${a.name} ${cap(type.verb)} ${b.name}`,
      phrase: `${a.name} ${type.verb} ${b.name}`,
      self: a.slug === b.slug,
    })),
  ),
);

const aspectBySlug = new Map(aspects.map((x) => [x.slug, x]));
export const getAspect = (slug: string) => aspectBySlug.get(slug);
export const getAspectFor = (a: PlanetSlug, v: AspectVerb, b: PlanetSlug) => aspectBySlug.get(aspectSlug(a, v, b))!;

/** Other aspects between the same two planets (same order). */
export const siblingsOf = (x: Aspect) => aspectTypes.filter((t) => t !== x.type).map((t) => getAspectFor(x.a.slug, t.verb, x.b.slug));

/** The same aspect written the other way round, e.g. Jupiter trine Sun for Sun trine Jupiter. */
export const reverseOf = (x: Aspect) => (x.self ? null : getAspectFor(x.b.slug, x.type.verb, x.a.slug));

/** All aspects a planet makes (as the first planet) of a given type. */
export const aspectsFrom = (p: PlanetSlug, t: AspectTypeSlug) => {
  const type = typeBySlug.get(t)!;
  return tenPlanets.map((b) => getAspectFor(p, type.verb, b.slug));
};

/** Every aspect of a given type, as unordered pairs in chart order (Sun first), for hub listings. */
export const canonicalAspectsOfType = (t: AspectTypeSlug) => {
  const type = typeBySlug.get(t)!;
  return tenPlanets.flatMap((a, i) => tenPlanets.slice(i).map((b) => getAspectFor(a.slug, type.verb, b.slug)));
};

export const verbToType = (v: string) => typeByVerb.get(v as AspectVerb);

/* ------------------------------------------------------------------------------------------------
 * Written-from-data body for combinations the old site never covered in depth (61 thin pages)
 * or at all (5 pages). Hand-tuned phrasing per aspect nature and planet speed.
 * ---------------------------------------------------------------------------------------------- */

const transitLength: Record<PlanetSlug, string> = {
  sun: "about two to three days around exactness",
  moon: "a few hours",
  mercury: "two to four days, longer if Mercury is retrograde",
  venus: "three to five days",
  mars: "about a week, much longer around a Mars retrograde",
  jupiter: "several weeks, often in up to three passes when Jupiter turns retrograde",
  saturn: "a few months, usually in three passes over the best part of a year",
  uranus: "one to two years, in repeated passes",
  neptune: "around two years, in repeated passes",
  pluto: "two years or more, in repeated passes",
};

const natureLead: Record<AspectNature, (a: string, b: string, t: AspectType) => string> = {
  Blending: (a, b) =>
    `A conjunction fuses two planets into one signal. ${a} and ${b} can't act separately here: every time one is activated, the other comes along. The result is concentrated and hard to miss, and whether it feels like a gift or a knot depends on the sign, the house and how the two planets get along by nature.`,
  Harmonious: (a, b, t) =>
    t.slug === "trine"
      ? `A trine lets energy move without friction. ${a} and ${b} support each other so naturally that the talent they create can feel like it isn't a talent at all. The gift is ease; the risk is coasting on it.`
      : `A sextile is a friendly, low-key link. ${a} and ${b} cooperate as soon as you make a move, so this aspect rewards initiative: the opportunity is real, but it rarely arrives by itself.`,
  Challenging: (a, b, t) =>
    t.slug === "square"
      ? `A square puts two planets at cross purposes. ${a} and ${b} want different things at the same time, and the friction pushes you to act, build and adjust. It is uncomfortable, but squares are behind much of what people actually achieve.`
      : `An opposition sets two planets on either side of the chart. ${a} and ${b} pull in opposite directions, and the tension often shows up through other people who seem to play one side. The work is balance: holding both needs instead of swinging between them.`,
};

export interface GeneratedSection {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: { title: string; items: string[] };
}

/** Body sections for an aspect page when the old site had no real content for it. */
export function generatedAspectBody(x: Aspect): GeneratedSection[] {
  const { a, b, type } = x;
  const A = theName(a, true);
  const aName = theName(a);
  const bName = theName(b);
  const phrase = x.phrase;
  const sections: GeneratedSection[] = [];

  sections.push({
    id: "meaning",
    heading: `What ${phrase} means`,
    paragraphs: [
      `${A} governs ${a.governs}. ${cap(bName)} governs ${b.governs}. When they form ${an(type.name.toLowerCase())} (${type.angle}°), those themes are tied together in a ${type.nature === "Challenging" ? "dynamic, demanding" : type.nature === "Harmonious" ? "supportive" : "concentrated"} way.`,
      natureLead[type.nature](aName.replace(/^the /, "The "), bName, type),
    ],
  });

  if (!x.self) {
    const gift = type.nature === "Challenging"
      ? `Handled well, this aspect turns tension into drive: ${aName} keeps pushing, and ${bName} makes the push earn real results. Many people with it become unusually capable in exactly the area it describes.`
      : `At its best it brings ${a.flow}, backed by ${b.flow}.`;
    const edge = type.nature === "Harmonious"
      ? `Because it comes easily, it can be taken for granted. The growth edge is to use it on purpose rather than waiting for it to show up.`
      : `Under stress it can show up as ${a.friction}, colliding with ${b.friction}.`;
    sections.push({
      id: "natal",
      heading: `${phrase} in the natal chart`,
      paragraphs: [gift, edge, `Read it through the signs and houses involved: the sign says how it behaves and the house says where in life it plays out. The tighter the orb (within ${type.orb} for ${an(type.name.toLowerCase())}), the louder it is.`],
      list: {
        title: type.nature === "Challenging" ? "Ways to work with it" : "Ways to make the most of it",
        items:
          type.nature === "Challenging"
            ? [
                `Name the two needs at play: ${a.function[0].toLowerCase()} (${a.name}) and ${b.function[0].toLowerCase()} (${b.name}).`,
                `Give each planet its own time and outlet instead of forcing a compromise that satisfies neither.`,
                `Notice the situations that trigger the tension; they are usually where the biggest growth is.`,
              ]
            : [
                `Treat it as a strength to build on deliberately, not a background perk.`,
                `Pair the ease with structure, such as deadlines, practice or accountability.`,
                `Look at which houses the two planets rule; that shows where the aspect pays off.`,
              ],
      },
    });
  }

  sections.push({
    id: "synastry",
    heading: `${phrase} in synastry`,
    paragraphs: [
      x.self
        ? `When one person's ${a.name} is ${type.verb} the other's ${a.name}, both people share the same planetary function. ${type.nature === "Challenging" ? `You approach ${a.governs.split(",")[0]} from different angles, which can spark growth or rivalry.` : `You recognise each other's approach to ${a.governs.split(",")[0]}, which builds easy understanding.`}`
        : `In relationship astrology, one person's ${a.name} ${type.verb} the other's ${b.name} links two different needs: ${a.synastry}, while ${b.synastry}.`,
      type.nature === "Challenging"
        ? `The attraction or bond can be strong, but so can the friction. It works best when both people name what they need instead of expecting the other to guess.`
        : type.nature === "Harmonious"
          ? `This is one of the aspects that makes a connection feel easy. Alone it won't hold a relationship together, but it smooths the everyday rhythm.`
          : `Conjunctions between charts are some of the most noticeable contacts. The two people feel each other strongly, for better or worse, and the rest of the synastry decides which.`,
    ],
  });

  sections.push({
    id: "transit",
    heading: `Transit ${phrase}`,
    paragraphs: [
      `When transiting ${a.name} forms ${an(type.name.toLowerCase())} to your natal ${b.name}, the themes of ${bName} (${b.governs}) are ${type.nature === "Challenging" ? "tested and pushed" : type.nature === "Harmonious" ? "supported and eased" : "switched on"} by ${aName}. The effect lasts ${transitLength[a.slug]}.`,
      type.nature === "Challenging"
        ? `Use the window to fix what isn't working rather than to force outcomes. What gets built under pressure now tends to last.`
        : `Use the window to start, ask and act. Harmonious transits pass quickly and reward the people who move while they're open.`,
    ],
  });

  return sections;
}

export function generatedAspectFaqs(x: Aspect) {
  const { a, b, type } = x;
  const faqs = [
    {
      q: `Is ${x.phrase} a good aspect?`,
      a:
        type.nature === "Harmonious"
          ? `It's traditionally counted as a harmonious aspect. ${cap(theName(a))} and ${theName(b)} work together easily, though easy aspects still need to be used on purpose to pay off.`
          : type.nature === "Challenging"
            ? `It's a challenging aspect, not a bad one. The tension between ${theName(a)} and ${theName(b)} is uncomfortable but often drives growth, effort and achievement.`
            : `A conjunction is neutral. It intensifies both planets, and whether that feels easy or difficult depends on the planets, the sign and the rest of the chart.`,
    },
    {
      q: `What orb is used for ${x.phrase}?`,
      a: `Most astrologers allow about ${type.orb} for ${an(type.name.toLowerCase())} in the natal chart, a little more when the Sun or Moon is involved. For transits and synastry a tighter orb of 1–3° gives the clearest results.`,
    },
    {
      q: `How do I know if I have ${x.phrase}?`,
      a: `You need your full birth chart, calculated from your date, time and place of birth. Skygram calculates it for free and lists every aspect in your chart.`,
    },
  ];
  return faqs;
}
