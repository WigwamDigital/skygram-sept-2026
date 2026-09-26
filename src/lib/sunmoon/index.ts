import { signs, type SignSlug, type ZodiacSign } from "@/lib/zodiac";
import { getPlacementFor, type Placement } from "@/lib/placements";
import { elementReadings, modalityReadings, offsetReadings } from "./content";

export interface SunMoon {
  slug: string;
  sun: ZodiacSign;
  moon: ZodiacSign;
  moonPlacement: Placement;
  title: string;
  /** Signs from Sun to Moon going forward around the zodiac (0–11). */
  offset: number;
  relation: (typeof offsetReadings)[number];
  elementText: string;
  modalityText: string;
  /** Strengths / growth edges chosen so each combination surfaces a different mix. */
  gifts: string[];
  tensions: string[];
}

export const sunMoonSlug = (sun: SignSlug, moon: SignSlug) => `${sun}-sun-${moon}-moon`;
export const sunMoonPath = (sun: SignSlug, moon: SignSlug) => `/sun-moon/${sunMoonSlug(sun, moon)}`;


function build(sun: ZodiacSign, moon: ZodiacSign, si: number, mi: number): SunMoon {
  const offset = (mi - si + 12) % 12;
  const moonPlacement = getPlacementFor("moon", moon.slug);
  return {
    slug: sunMoonSlug(sun.slug, moon.slug),
    sun,
    moon,
    moonPlacement,
    title: `${sun.name} Sun ${moon.name} Moon`,
    offset,
    relation: offsetReadings[offset],
    elementText: elementReadings[`${sun.element}-${moon.element}`],
    modalityText: modalityReadings[`${sun.modality}-${moon.modality}`],
    gifts: [sun.strengths[mi % sun.strengths.length], ...moonPlacement.text.gifts],
    tensions: [sun.challenges[si % sun.challenges.length], moonPlacement.text.shadow],
  };
}

/** All 144 Sun × Moon combinations, Sun sign major. */
export const sunMoons: SunMoon[] = signs.flatMap((sun, si) => signs.map((moon, mi) => build(sun, moon, si, mi)));

const bySlug = new Map(sunMoons.map((c) => [c.slug, c]));
export const getSunMoon = (slug: string) => bySlug.get(slug);
export const getSunMoonFor = (sun: SignSlug, moon: SignSlug) => bySlug.get(sunMoonSlug(sun, moon))!;

export const sunMoonsForSun = (s: SignSlug) => sunMoons.filter((c) => c.sun.slug === s);
export const sunMoonsForMoon = (s: SignSlug) => sunMoons.filter((c) => c.moon.slug === s);

export function sunMoonFaqs(c: SunMoon) {
  const { sun, moon, relation } = c;
  const same = sun.slug === moon.slug;
  const reverse = getSunMoonFor(moon.slug, sun.slug);
  return [
    {
      q: `What does ${c.title} mean?`,
      a: `${c.title} describes someone whose core identity is ${sun.name} and whose emotional nature is ${moon.name}. ${c.elementText}`,
    },
    {
      q: `Is ${sun.name} Sun ${moon.name} Moon a harmonious combination?`,
      a: same
        ? `Yes, in the sense that Sun and Moon agree with each other. A double ${sun.name} rarely feels torn between what it wants and what it needs, but both the sign's strengths and its blind spots are doubled.`
        : `The two signs form a ${relation.name.toLowerCase().replace(/ \(.*\)/, "")} (${relation.angle}). ${relation.text} This is a sign-level reading — the exact degrees of your Sun and Moon refine it.`,
    },
    {
      q: `How do I find my Moon sign?`,
      a: `The Moon changes sign every two to three days, so you need your birth date, and ideally your birth time and place, to know your Moon sign for certain. Skygram calculates it for free as part of your natal chart.`,
    },
    {
      q: `What is the difference between a Sun sign and a Moon sign?`,
      a: `Your Sun sign describes your core identity and how you shine. Your Moon sign describes your emotional nature — what makes you feel safe and how you react when things get hard.`,
    },
    ...(same
      ? []
      : [
          {
            q: `Is ${c.title} the same as ${reverse.title}?`,
            a: `No. The two signs are the same, but the roles are swapped. With a ${sun.name} Sun, ${sun.name} is your outward identity and ${moon.name} is your inner emotional world; with a ${moon.name} Sun it is the other way round, which usually feels quite different.`,
          },
        ]),
  ];
}
