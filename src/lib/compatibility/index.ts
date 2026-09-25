import { mustGetSign, signs, type SignSlug, type ZodiacSign } from "@/lib/zodiac";
import { relationshipTraits } from "@/lib/zodiac/relationship";
import { pairSlug } from "@/lib/zodiac/meta";
import {
  aspectDynamics,
  elementDynamics,
  ELEMENT_ORDER,
  modalityDynamics,
  MODALITY_ORDER,
  type AspectDynamic,
  type ElementDynamic,
  type ModalityDynamic,
} from "./data";
import { taglines } from "./taglines";

export type ScoreKey = "love" | "friendship" | "communication" | "trust" | "longTerm";

export const scoreLabels: Record<ScoreKey, string> = {
  love: "Love & romance",
  friendship: "Friendship",
  communication: "Communication",
  trust: "Trust",
  longTerm: "Long-term potential",
};

export interface Pairing {
  slug: string;
  a: ZodiacSign;
  b: ZodiacSign;
  same: boolean;
  tagline: string;
  aspect: AspectDynamic;
  element: ElementDynamic;
  modality: ModalityDynamic;
  scores: Record<ScoreKey, number> & { overall: number };
  verdict: string;
  strengths: string[];
  challenges: string[];
}

const index = (s: SignSlug) => signs.findIndex((x) => x.slug === s);

export { canonicalPair, pairPath, pairSlug } from "@/lib/zodiac/meta";

const clamp = (n: number) => Math.max(30, Math.min(97, Math.round(n)));

const verdictFor = (n: number) =>
  n >= 85 ? "Excellent match" : n >= 75 ? "Great match" : n >= 65 ? "Good match" : n >= 55 ? "Workable match" : "Challenging match";

function buildPairing(aSlug: SignSlug, bSlug: SignSlug): Pairing {
  const a = mustGetSign(aSlug);
  const b = mustGetSign(bSlug);
  const slug = `${aSlug}-and-${bSlug}`;

  const dist = Math.abs(index(aSlug) - index(bSlug));
  const aspect = aspectDynamics[Math.min(dist, 12 - dist)];

  const [e1, e2] = [a.element, b.element].sort((x, y) => ELEMENT_ORDER.indexOf(x) - ELEMENT_ORDER.indexOf(y));
  const element = elementDynamics[`${e1}-${e2}`];

  const [m1, m2] = [a.modality, b.modality].sort((x, y) => MODALITY_ORDER.indexOf(x) - MODALITY_ORDER.indexOf(y));
  const modality = modalityDynamics[`${m1}-${m2}`];

  // Traditional match lists nudge the score.
  let trad = 0;
  if (a.bestMatches.includes(bSlug) || b.bestMatches.includes(aSlug)) trad += 5;
  if (a.challengingMatches.includes(bSlug) || b.challengingMatches.includes(aSlug)) trad -= 5;

  const base = aspect.base + trad;
  const m = element.mods;
  const cat = {
    love: clamp(base + m.love),
    friendship: clamp(base + m.friendship),
    communication: clamp(base + m.communication + (a.ruler === "Mercury" || b.ruler === "Mercury" ? 3 : 0)),
    trust: clamp(base + m.trust + (m1 === "Fixed" || m2 === "Fixed" ? 2 : 0)),
    longTerm: clamp(base + m.longTerm + (m1 === "Mutable" && m2 === "Mutable" ? -3 : 0)),
  };
  const overall = clamp((cat.love + cat.friendship + cat.communication + cat.trust + cat.longTerm) / 5);

  return {
    slug,
    a,
    b,
    same: aSlug === bSlug,
    tagline: taglines[slug],
    aspect,
    element,
    modality,
    scores: { ...cat, overall },
    verdict: verdictFor(overall),
    strengths: [aspect.strength, ...element.strengths, modality.strength],
    challenges: [aspect.challenge, ...element.challenges, modality.challenge],
  };
}

/** All 78 unique pairings (including same-sign pairs), in zodiac order. */
export const pairings: Pairing[] = signs.flatMap((a, i) => signs.slice(i).map((b) => buildPairing(a.slug, b.slug)));

const bySlug = new Map(pairings.map((p) => [p.slug, p]));

export const getPairing = (slug: string) => bySlug.get(slug);

export const getPairingFor = (x: SignSlug, y: SignSlug) => bySlug.get(pairSlug(x, y))!;

/** Every pairing that involves the given sign, ordered by the partner's zodiac position. */
export const pairingsFor = (s: SignSlug) =>
  signs.map((partner) => ({ partner, pairing: getPairingFor(s, partner.slug) }));

export const traitsOf = (s: ZodiacSign) => relationshipTraits[s.slug];

export const pairTitle = (p: Pairing) => `${p.a.name} and ${p.b.name} Compatibility`;

export function pairFaqs(p: Pairing) {
  const { a, b, scores } = p;
  return [
    {
      q: `Are ${a.name} and ${b.name} compatible?`,
      a: `${a.name} and ${b.name} are a ${p.verdict.toLowerCase()}, with a Sun-sign compatibility score of ${scores.overall}/100. ${p.tagline} As a ${p.aspect.name.toLowerCase()} pairing (${p.aspect.angle} apart), ${p.aspect.text.charAt(0).toLowerCase()}${p.aspect.text.slice(1)}`,
    },
    {
      q: `Are ${a.name} and ${b.name} good in a relationship?`,
      a: `Their love score is ${scores.love}/100. ${p.element.love}`,
    },
    {
      q: `Can ${a.name} and ${b.name} be friends?`,
      a: `Yes — their friendship score is ${scores.friendship}/100. ${p.element.friendship}`,
    },
    {
      q: `What is the biggest challenge for ${a.name} and ${b.name}?`,
      a: `The main challenge is ${p.element.challenges[0].toLowerCase()}. ${p.element.tip}`,
    },
    {
      q: `Does Sun-sign compatibility tell the whole story?`,
      a: `No. Sun signs describe core identity, but real compatibility (synastry) compares every planet in both birth charts — especially the Moon, Venus, Mars and Ascendant. Skygram calculates this full-chart score for you and a partner or friend.`,
    },
  ];
}
