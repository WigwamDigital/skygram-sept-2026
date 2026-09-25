import { mustGetSign, signs, type SignSlug, type ZodiacSign } from "@/lib/zodiac";
import type { Point, PointSlug, PlacementText } from "./types";
import { moon } from "./points/moon";
import { mercury } from "./points/mercury";
import { venus } from "./points/venus";
import { mars } from "./points/mars";
import { jupiter } from "./points/jupiter";
import { saturn } from "./points/saturn";
import { rising } from "./points/rising";

export type { Point, PointSlug, PlacementText } from "./types";

/** Personal & social points in chart order. Sun-in-sign is covered by /zodiac/[sign]. */
export const points: Point[] = [moon, mercury, venus, mars, jupiter, saturn, rising];

const byPoint = new Map(points.map((p) => [p.slug, p]));
export const getPoint = (slug: string) => byPoint.get(slug as PointSlug);

export type Dignity = "domicile" | "exaltation" | "detriment" | "fall";

export interface Placement {
  slug: string;
  point: Point;
  sign: ZodiacSign;
  text: PlacementText;
  title: string;
  dignities: Dignity[];
}

/** "moon-in-aries", or "aries-rising" for the Ascendant. */
export const placementSlug = (p: PointSlug, s: SignSlug) => (p === "rising" ? `${s}-rising` : `${p}-in-${s}`);
export const placementPath = (p: PointSlug, s: SignSlug) => `/placements/${placementSlug(p, s)}`;
export const pointPath = (p: PointSlug) => `/placements/${p}`;

/** "the Moon" / "Venus" — the Moon takes an article in running text. */
export const theName = (pt: Point, capital = false) =>
  pt.slug === "moon" ? (capital ? "The Moon" : "the Moon") : pt.name;

const titleFor = (point: Point, sign: ZodiacSign) =>
  point.slug === "rising" ? `${sign.name} Rising` : `${point.name} in ${sign.name}`;

function dignitiesFor(point: Point, s: SignSlug): Dignity[] {
  if (!point.dignities) return [];
  return (Object.keys(point.dignities) as Dignity[]).filter((d) => point.dignities![d].includes(s));
}

export const placements: Placement[] = points.flatMap((point) =>
  signs.map((sign) => ({
    slug: placementSlug(point.slug, sign.slug),
    point,
    sign,
    text: point.signs[sign.slug],
    title: titleFor(point, sign),
    dignities: dignitiesFor(point, sign.slug),
  })),
);

const byPlacement = new Map(placements.map((p) => [p.slug, p]));
export const getPlacement = (slug: string) => byPlacement.get(slug);
export const getPlacementFor = (p: PointSlug, s: SignSlug) => byPlacement.get(placementSlug(p, s))!;

export const placementsForPoint = (p: PointSlug) => placements.filter((x) => x.point.slug === p);
export const placementsForSign = (s: SignSlug) => placements.filter((x) => x.sign.slug === s);

export const dignityLabel: Record<Dignity, string> = {
  domicile: "Domicile (at home)",
  exaltation: "Exalted",
  detriment: "Detriment",
  fall: "Fall",
};

export function dignityText(pl: Placement): string {
  const { point, sign } = pl;
  if (point.slug === "rising") {
    return `The Ascendant has no traditional dignity, but ${sign.name}'s ruling planet, ${sign.ruler}, becomes your chart ruler — its sign and house add a lot of detail to how your ${sign.name} Rising plays out.`;
  }
  if (pl.dignities.length === 0) {
    return `${theName(point, true)} has no traditional dignity or debility in ${sign.name}, so how it expresses depends more on its house, aspects and the rest of your chart.`;
  }
  const parts: Record<Dignity, string> = {
    domicile: `${theName(point, true)} is at home (in domicile) in ${sign.name}, a sign it rules — its energy flows naturally and strongly here.`,
    exaltation: `${theName(point, true)} is exalted in ${sign.name}, a traditional position of honour where its best qualities are amplified.`,
    detriment: `${theName(point, true)} is in detriment in ${sign.name}, opposite a sign it rules. Its energy works in less familiar ways — a challenge, but also a source of unusual strengths.`,
    fall: `${theName(point, true)} is in its fall in ${sign.name}, opposite its exaltation. It has to work harder to express itself, which often builds hard-won skill.`,
  };
  return pl.dignities.map((d) => parts[d]).join(" ");
}

export function placementFaqs(pl: Placement) {
  const { point, sign, text, title } = pl;
  const findIt =
    point.slug === "rising"
      ? "Your Rising sign changes roughly every two hours, so you need your exact birth time and birthplace to calculate it."
      : point.slug === "moon"
        ? "The Moon changes sign every two to three days, so you need your birth date — and ideally your birth time — to know your Moon sign for sure."
        : `You need your birth date (and ideally time and place) to find where ${theName(point)} was when you were born.`;
  return [
    { q: `What does ${title} mean?`, a: text.blurb },
    {
      q: `Is ${title} a good placement?`,
      a: `${dignityText(pl)} No placement is purely good or bad — every one has gifts, like ${text.gifts[0].toLowerCase()}, and growth edges, like ${text.shadow.toLowerCase()}.`,
    },
    {
      q: point.slug === "rising" ? `How long does ${sign.name} stay on the Ascendant?` : `How long does ${theName(point)} stay in ${sign.name}?`,
      a:
        point.slug === "rising"
          ? `The Ascendant moves through all 12 signs every day, spending about 2 hours in each — which is why an accurate birth time matters so much.`
          : `${theName(point, true)} spends ${point.duration} in each sign, including ${sign.name}.`,
    },
    {
      q: `How do I find my ${point.signLabel}?`,
      a: `${findIt} Skygram calculates your full natal chart for free — including your ${point.signLabel} — from your birth details.`,
    },
  ];
}

export { mustGetSign };
