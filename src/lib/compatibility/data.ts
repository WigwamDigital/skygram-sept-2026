import type { Element, Modality } from "@/lib/zodiac";

export type ScoreMods = { love: number; friendship: number; communication: number; trust: number; longTerm: number };

export interface ElementDynamic {
  summary: string;
  love: string;
  friendship: string;
  communication: string;
  strengths: [string, string];
  challenges: [string, string];
  tip: string;
  mods: ScoreMods;
}

/** Key: two elements sorted in Fire → Earth → Air → Water order, joined by "-". */
export const elementDynamics: Record<string, ElementDynamic> = {
  "Fire-Fire": {
    summary:
      "Two fire signs create instant chemistry. There's enthusiasm, spontaneity and a shared appetite for life — but also two tempers and two egos that both want to lead.",
    love: "Romance is exciting and physical, with plenty of playful competition. The challenge is keeping passion from turning into power struggles.",
    friendship: "As friends, they're the ones planning the next adventure — loud, loyal and always up for something new.",
    communication: "Conversations are direct and fast. Both say what they mean, which keeps things honest, but arguments can flare quickly when neither slows down to listen.",
    strengths: ["Instant chemistry and shared enthusiasm", "Spontaneous, adventurous energy"],
    challenges: ["Competing egos and power struggles", "Quick tempers when both feel unheard"],
    tip: "Take turns leading, and channel competitive energy into shared goals rather than against each other.",
    mods: { love: 6, friendship: 6, communication: 0, trust: -4, longTerm: -4 },
  },
  "Earth-Earth": {
    summary:
      "Two earth signs share a practical, grounded outlook. They value loyalty, effort and security, and they build something solid together — though life can slip into routine.",
    love: "Love grows slowly and steadily, expressed through actions, touch and reliability rather than big declarations.",
    friendship: "Friendship is dependable and low-drama: they show up for each other and enjoy simple pleasures together.",
    communication: "Communication is practical and to the point. They talk plans, budgets and logistics easily, but may need to make an effort to share feelings.",
    strengths: ["Shared values around loyalty and security", "Practical teamwork that gets things done"],
    challenges: ["Falling into routine or complacency", "Stubbornness when both dig in"],
    tip: "Schedule some spontaneity — new experiences keep a stable bond from going stale.",
    mods: { love: 0, friendship: 2, communication: -2, trust: 8, longTerm: 8 },
  },
  "Air-Air": {
    summary:
      "Two air signs connect through the mind. Conversation flows, ideas multiply and there's a light, social energy — though emotions may be discussed more than felt.",
    love: "Romance is playful and intellectual, built on banter and shared interests. They need to make room for vulnerability, not just ideas.",
    friendship: "As friends they're a natural fit: endless chats, shared social circles and constant curiosity.",
    communication: "This is where they shine. Talking is effortless, debates are fun and they rarely run out of things to say.",
    strengths: ["Effortless communication", "Shared curiosity and social life"],
    challenges: ["Avoiding deeper emotional needs", "Inconsistency or overthinking"],
    tip: "Balance talking with feeling — check in about emotions, not just ideas and plans.",
    mods: { love: -2, friendship: 8, communication: 8, trust: -4, longTerm: -4 },
  },
  "Water-Water": {
    summary:
      "Two water signs understand each other on an intuitive level. The emotional bond is deep and tender, though moods can amplify and boundaries can blur.",
    love: "Love is romantic, protective and deeply felt. They sense each other's needs without words — but both still need to voice them.",
    friendship: "Friendship is soulful and supportive — the kind of friend who just knows when something's wrong.",
    communication: "Much of their communication is unspoken. They read each other well, but may avoid saying hard things directly to keep the peace.",
    strengths: ["Deep emotional understanding", "Intuitive care and loyalty"],
    challenges: ["Moods feeding off each other", "Avoiding direct conflict"],
    tip: "Say what you need out loud — intuition is powerful, but it isn't a substitute for clear words.",
    mods: { love: 6, friendship: 2, communication: -4, trust: 6, longTerm: 4 },
  },
  "Fire-Earth": {
    summary:
      "Fire wants to move fast; earth wants to build carefully. This pairing blends vision with follow-through, but the difference in pace can cause friction.",
    love: "Attraction can be strong — fire brings excitement, earth brings sensuality and security — but fire may feel held back and earth may feel rushed.",
    friendship: "As friends they balance each other: one dreams up the plan, the other makes it real.",
    communication: "Fire speaks in bursts of enthusiasm; earth prefers facts and time to think. Patience on both sides keeps conversations productive.",
    strengths: ["Vision paired with practical follow-through", "Complementary strengths"],
    challenges: ["Different pace and appetite for risk", "Impatience versus stubbornness"],
    tip: "Agree on a shared pace: fire brings the spark, earth decides how to make it last.",
    mods: { love: 0, friendship: 0, communication: -4, trust: 0, longTerm: 2 },
  },
  "Fire-Air": {
    summary:
      "Air feeds fire. This is one of the zodiac's most naturally energising combinations — lively, social, optimistic and full of ideas turned into action.",
    love: "Romance is fun, flirtatious and adventurous. Both value freedom, so the relationship rarely feels suffocating.",
    friendship: "A brilliant friendship: fire brings the plans, air brings the people and the ideas.",
    communication: "Conversation is lively and inspiring. Air gives fire new ideas; fire gives air the push to act on them.",
    strengths: ["Mutually energising and optimistic", "Shared love of freedom and fun"],
    challenges: ["Can skim over emotional depth", "Both may avoid routine responsibilities"],
    tip: "Make time for slower, deeper conversations so the relationship grows roots as well as wings.",
    mods: { love: 4, friendship: 8, communication: 6, trust: -2, longTerm: -2 },
  },
  "Fire-Water": {
    summary:
      "Fire and water create steam. There's powerful attraction and emotional intensity, but fire's directness can hurt water, and water's moods can dampen fire.",
    love: "Love is passionate and dramatic. It works best when fire learns gentleness and water learns to speak up.",
    friendship: "As friends they bring out each other's courage and compassion — if they respect their different ways of handling feelings.",
    communication: "Fire says it straight; water hears the tone behind the words. Misunderstandings happen when bluntness meets sensitivity.",
    strengths: ["Intense passion and emotional depth", "Courage meets compassion"],
    challenges: ["Bluntness versus sensitivity", "Different ways of handling conflict"],
    tip: "Fire: soften the delivery. Water: say what hurts instead of withdrawing.",
    mods: { love: 4, friendship: -2, communication: -6, trust: -4, longTerm: -4 },
  },
  "Earth-Air": {
    summary:
      "Earth lives in the practical, air in the abstract. Together they can turn ideas into reality — but they may struggle to understand each other's priorities.",
    love: "Romance needs effort: air wants stimulation and variety, earth wants consistency and physical closeness.",
    friendship: "As friends they complement each other well — the thinker and the doer.",
    communication: "Air loves to explore possibilities; earth wants to know what's realistic. When they respect both modes, planning together is a strength.",
    strengths: ["Ideas meet practical execution", "Different perspectives that broaden both"],
    challenges: ["Different emotional languages", "Stability versus the need for variety"],
    tip: "Respect each other's strengths: earth grounds air's ideas, air keeps earth's world fresh.",
    mods: { love: -4, friendship: 2, communication: 0, trust: -2, longTerm: 0 },
  },
  "Earth-Water": {
    summary:
      "Water nourishes earth. This is a naturally supportive pairing — secure, loyal and emotionally sustaining, with a shared love of home and commitment.",
    love: "Love is tender and devoted. Earth offers security, water offers emotional depth, and both value loyalty above all.",
    friendship: "Friendship is steady and caring — the kind that lasts decades.",
    communication: "Communication is gentle and supportive. Earth offers practical solutions; water offers emotional insight. Together they feel understood.",
    strengths: ["Emotional security and loyalty", "Shared focus on home and commitment"],
    challenges: ["Can become insular or overly cautious", "Earth's practicality may feel cold to water"],
    tip: "Keep inviting new experiences in — comfort is lovely, but growth needs a little risk.",
    mods: { love: 4, friendship: 2, communication: -2, trust: 8, longTerm: 8 },
  },
  "Air-Water": {
    summary:
      "Air thinks, water feels. This combination is imaginative and intriguing, but each can misunderstand the other's way of processing life.",
    love: "Romance can be dreamy and creative, but air may seem detached to water, and water may seem overwhelming to air.",
    friendship: "As friends they share imagination and empathy — if they respect each other's emotional styles.",
    communication: "Air wants to analyse; water wants to be felt. Conversations go best when air validates before problem-solving.",
    strengths: ["Imagination and creativity", "Empathy meets perspective"],
    challenges: ["Logic versus emotion", "Feeling misunderstood"],
    tip: "Air: validate feelings before solving problems. Water: explain what you feel so air can understand.",
    mods: { love: -2, friendship: 0, communication: -2, trust: -4, longTerm: -4 },
  },
};

export interface ModalityDynamic {
  text: string;
  strength: string;
  challenge: string;
}

/** Key: two modalities sorted Cardinal → Fixed → Mutable, joined by "-". */
export const modalityDynamics: Record<string, ModalityDynamic> = {
  "Cardinal-Cardinal": {
    text: "Both are cardinal signs — natural initiators. They share drive and ambition, but may compete over who leads.",
    strength: "Shared drive to start new things",
    challenge: "Competing to be in charge",
  },
  "Fixed-Fixed": {
    text: "Both are fixed signs — steady and loyal, but neither likes to bend. Commitment is strong; compromise takes work.",
    strength: "Deep, lasting loyalty",
    challenge: "Stalemates when both refuse to budge",
  },
  "Mutable-Mutable": {
    text: "Both are mutable signs — flexible, curious and easy-going, though the relationship may lack direction or follow-through.",
    strength: "Adaptable and easy to be around",
    challenge: "Drifting without clear direction",
  },
  "Cardinal-Fixed": {
    text: "Cardinal energy starts things and fixed energy sustains them — productive, as long as the fixed partner doesn't feel pushed and the cardinal partner doesn't feel stalled.",
    strength: "One starts, the other sustains",
    challenge: "Push versus resistance",
  },
  "Cardinal-Mutable": {
    text: "Cardinal leads and mutable adapts. It's an easy division of roles, as long as the mutable partner still has a voice.",
    strength: "A natural leader-and-adapter rhythm",
    challenge: "One partner's needs can get overlooked",
  },
  "Fixed-Mutable": {
    text: "Fixed brings consistency, mutable brings flexibility. They can balance each other beautifully — or frustrate each other with rigidity versus unpredictability.",
    strength: "Stability balanced with flexibility",
    challenge: "Rigidity versus unpredictability",
  },
};

export interface AspectDynamic {
  name: string;
  angle: string;
  text: string;
  strength: string;
  challenge: string;
  base: number;
}

/** Indexed by distance between the signs around the wheel (0–6). */
export const aspectDynamics: AspectDynamic[] = [
  {
    name: "Conjunction",
    angle: "0°",
    text: "Same sign — a mirror match. You understand each other instinctively, including each other's flaws.",
    strength: "Instinctive mutual understanding",
    challenge: "Shared blind spots are magnified",
    base: 74,
  },
  {
    name: "Semi-sextile",
    angle: "30°",
    text: "Neighbouring signs — very different energies side by side. Each has what the other lacks, which can be intriguing or irritating.",
    strength: "Each fills the other's gaps",
    challenge: "Little natural common ground",
    base: 58,
  },
  {
    name: "Sextile",
    angle: "60°",
    text: "Sextile signs — friendly, compatible elements that support each other easily. A relaxed, cooperative connection.",
    strength: "Easy, friendly cooperation",
    challenge: "Needs effort to deepen beyond comfort",
    base: 80,
  },
  {
    name: "Square",
    angle: "90°",
    text: "Square signs — different elements and clashing priorities. Friction is common, but so are growth and strong chemistry.",
    strength: "Dynamic chemistry and growth",
    challenge: "Regular friction and misunderstandings",
    base: 54,
  },
  {
    name: "Trine",
    angle: "120°",
    text: "Trine signs — same element, same basic temperament. One of the most naturally harmonious pairings in astrology.",
    strength: "Natural harmony and a shared temperament",
    challenge: "Can become too comfortable",
    base: 88,
  },
  {
    name: "Quincunx",
    angle: "150°",
    text: "Quincunx signs — no shared element or modality. The relationship requires constant adjustment, but it can be deeply educational.",
    strength: "Pushes both to grow in new ways",
    challenge: "Frequent adjustment and misunderstanding",
    base: 50,
  },
  {
    name: "Opposition",
    angle: "180°",
    text: "Opposite signs — two ends of the same axis. Strong attraction and complementary strengths, with a constant need for balance.",
    strength: "Magnetic attraction and complementary strengths",
    challenge: "Pulling in opposite directions",
    base: 72,
  },
];

export const ELEMENT_ORDER: Element[] = ["Fire", "Earth", "Air", "Water"];
export const MODALITY_ORDER: Modality[] = ["Cardinal", "Fixed", "Mutable"];
