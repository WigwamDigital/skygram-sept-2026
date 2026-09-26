import type { PlanetName } from "./types";

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

/** Days per month. February is 29 so Leap Day gets a page. */
export const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const monthLore: { birthstone: string; flower: string; season: string }[] = [
  { birthstone: "Garnet", flower: "Carnation", season: "deep winter in the northern hemisphere and high summer in the southern" },
  { birthstone: "Amethyst", flower: "Violet", season: "the last stretch of northern winter and the end of southern summer" },
  { birthstone: "Aquamarine", flower: "Daffodil", season: "the month of the March equinox — spring in the northern hemisphere and autumn in the southern" },
  { birthstone: "Diamond", flower: "Sweet pea", season: "mid-spring in the north and mid-autumn in the south" },
  { birthstone: "Emerald", flower: "Lily of the valley", season: "late spring in the north and late autumn in the south" },
  { birthstone: "Pearl", flower: "Rose", season: "the month of the June solstice — summer in the northern hemisphere and winter in the southern" },
  { birthstone: "Ruby", flower: "Larkspur", season: "high summer in the north and deep winter in the south" },
  { birthstone: "Peridot", flower: "Gladiolus", season: "late summer in the north and late winter in the south" },
  { birthstone: "Sapphire", flower: "Aster", season: "the month of the September equinox — autumn in the northern hemisphere and spring in the southern" },
  { birthstone: "Opal", flower: "Marigold", season: "mid-autumn in the north and mid-spring in the south" },
  { birthstone: "Topaz", flower: "Chrysanthemum", season: "late autumn in the north and late spring in the south" },
  { birthstone: "Turquoise", flower: "Narcissus", season: "the month of the December solstice — winter in the northern hemisphere and summer in the southern" },
];

/** Chaldean decan rulers: the seven classical planets in descending order of orbit, cycling from Mars at 0° Aries. */
export const decanPlanets: PlanetName[] = ["Mars", "Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter"];

export const planetFlavour: Record<PlanetName, { adds: string; effect: string }> = {
  Mars: {
    adds: "drive, courage and a direct approach",
    effect: "Mars makes this stretch of the sign more assertive and action-minded — these are people who move first and think about the details on the way.",
  },
  Sun: {
    adds: "vitality, confidence and a need to be seen",
    effect: "The Sun lends a natural presence and a strong sense of self, which astrologers read as a natural presence, a strong sense of self and pride in one's work.",
  },
  Venus: {
    adds: "charm, warmth and an eye for beauty",
    effect: "Venus softens the sign's edges and makes relationships, taste and pleasure more central to how these people move through life.",
  },
  Mercury: {
    adds: "curiosity, quick thinking and verbal agility",
    effect: "Mercury sharpens the mind here — expect a restless curiosity, a love of talking things through and a knack for picking up new skills fast.",
  },
  Moon: {
    adds: "sensitivity, intuition and emotional depth",
    effect: "The Moon adds a tidal, feeling-led quality, so moods, memory and the need for a safe emotional home matter more than the sign alone would suggest.",
  },
  Saturn: {
    adds: "discipline, patience and a serious streak",
    effect: "Saturn brings structure and a long view. People from this decan often mature early and are willing to work slowly toward something that lasts.",
  },
  Jupiter: {
    adds: "optimism, generosity and big-picture thinking",
    effect: "Jupiter widens the sign's horizons, adding faith in the future, a generous streak and an appetite for growth, travel and learning.",
  },
};

/** Numerology-style readings of the day of the month you were born on (1–31). */
export const dayNumberMeaning: Record<number, string> = {
  1: "The 1 is the number of beginnings. Numerologists link a 1st-of-the-month birthday to independence, initiative and a preference for doing things your own way.",
  2: "The 2 is the number of partnership. A birthday on the 2nd is read in numerology as diplomatic, cooperative and tuned in to what other people need.",
  3: "The 3 is the number of expression. A 3rd-of-the-month birthday is associated with creativity, humour and an easy way with words and people.",
  4: "The 4 is the number of structure. Birthdays on the 4th are linked to reliability, practical skill and a preference for building things step by step.",
  5: "The 5 is the number of change. A 5th-of-the-month birthday is read as adventurous, curious and restless when life stays the same for too long.",
  6: "The 6 is the number of care. Numerologists tie the 6th to responsibility, loyalty to family and friends, and a strong sense of home and harmony.",
  7: "The 7 is the number of inquiry. A birthday on the 7th is read in numerology as reflective, analytical and drawn to the questions beneath the surface.",
  8: "The 8 is the number of ambition. Birthdays on the 8th are linked to drive, a head for resources and the stamina to pursue big goals.",
  9: "The 9 is the number of completion. A 9th-of-the-month birthday is associated with compassion, idealism and a wish to leave things better than you found them.",
  10: "The 10 combines the 1's initiative with a full cycle's experience. A birthday on the 10th is read as self-reliant, ambitious and quietly resilient.",
  11: "The 11 is a master number in numerology, tied to intuition and inspiration. An 11th-of-the-month birthday is linked to idealism, sensitivity and a strong inner compass.",
  12: "The 12 marks a complete cycle — twelve months, twelve signs. Birthdays on the 12th are read as expressive, sociable and good at seeing how the pieces fit together.",
  13: "The 13 is widely considered unlucky in Western folklore, but numerologists generally read it differently: it reduces to 4, and is linked with hard work, transformation and rebuilding from scratch.",
  14: "The 14 pairs the 1's independence with the 4's discipline. A 14th-of-the-month birthday is associated with freedom-seeking that still has a practical backbone.",
  15: "The 15 sits at the middle of the month and is tied to magnetism and generosity. Birthdays on the 15th are read as warm, charming and drawn to caring roles.",
  16: "The 16 is linked to introspection and hard-won insight. A birthday on the 16th is read in numerology as thoughtful, private and quietly perceptive.",
  17: "The 17 is associated with poise and self-command. Numerologists read 17th-of-the-month birthdays as analytical, dignified and good at long-range planning.",
  18: "The 18 combines ambition with compassion. A birthday on the 18th is linked to leadership that is motivated by a wish to help other people succeed.",
  19: "The 19 carries the 1's independence and the 9's idealism. Birthdays on the 19th are read as determined, original and driven by personal conviction.",
  20: "The 20 is a number of sensitivity and cooperation. A 20th-of-the-month birthday is associated with tact, intuition and a gift for bringing people together.",
  21: "The 21 is tied to sociability and self-expression. Birthdays on the 21st are read as charismatic, optimistic and at ease in a crowd.",
  22: "The 22 is a master number linked to large-scale building. A 22nd-of-the-month birthday is associated with practical vision and the patience to see big plans through.",
  23: "The 23 is associated with versatility and quick wits. A birthday on the 23rd is read in numerology as adaptable, communicative and hard to pin down.",
  24: "The 24 is a number of devotion and domestic warmth. Birthdays on the 24th are linked to dependability, generosity and strong ties to the people closest to you.",
  25: "The 25 blends analysis with intuition. A 25th-of-the-month birthday is read as perceptive, curious and inclined to trust a well-tested hunch.",
  26: "The 26 is tied to practical leadership and material sense. Numerologists read 26th birthdays as responsible, organised and good at managing resources.",
  27: "The 27 is associated with vision and humanitarian instincts. A birthday on the 27th is linked to creativity, empathy and a wish to serve something bigger than yourself.",
  28: "The 28 is a number of independence and leadership. Birthdays on the 28th are read as self-directed, resourceful and comfortable taking responsibility.",
  29: "The 29 is tied to intuition and emotional intensity. A 29th-of-the-month birthday is associated with sensitivity, imagination and a strong pull toward meaning.",
  30: "The 30 is associated with creativity and communication. Birthdays on the 30th are read as expressive, sociable and quick to find the fun in a situation.",
  31: "The 31 combines the 3's expressiveness with the 1's initiative. A birthday on the 31st is linked to practical creativity and the drive to turn ideas into results.",
};

export const ordinalWord = ["first", "second", "third"] as const;

export const ordinal = (n: number) => {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10 > 3 ? 0 : n % 10] ?? "th"}`;
};
