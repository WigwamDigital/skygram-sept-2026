import type { Element, Modality } from "@/lib/zodiac";

/**
 * How the Moon sign sits relative to the Sun sign, counted forward around the zodiac
 * (Moon sign position − Sun sign position, 0–11). Written for one person's inner chart,
 * and directional: offset 1 and offset 11 are the same angle but read differently.
 */
export const offsetReadings: { name: string; angle: string; text: string; tip: string }[] = [
  {
    name: "Conjunction",
    angle: "same sign",
    text: "Sun and Moon share a sign, so what you want and what you need point the same way. Astrologers read this as little inner tug-of-war and a person who comes across as very much one thing — though the sign's strengths and blind spots are both doubled.",
    tip: "Ask a friend who is very different from you for a second opinion when you feel certain.",
  },
  {
    name: "Semi-sextile (Moon one sign ahead)",
    angle: "30° apart",
    text: "Your Moon sits in the very next sign after your Sun, which means the two share neither element nor modality. Your emotional needs can feel like they belong to the next chapter of the zodiac — a step ahead of how you present yourself, and slightly hard to explain.",
    tip: "Give the feeling side of you its own time and space instead of expecting it to follow your plans.",
  },
  {
    name: "Sextile (Moon two signs ahead)",
    angle: "60° apart",
    text: "Sun and Moon are in friendly, compatible elements, so head and heart cooperate more than they argue. Astrologers read this as what you want to do and what feels right being easy to line up with a little effort.",
    tip: "The cooperation is easy, so it is easy to take for granted. Make deliberate use of it.",
  },
  {
    name: "Square (Moon three signs ahead)",
    angle: "90° apart",
    text: "Sun and Moon have different elements and pull in different directions. There is often a sense of inner friction between who you are becoming and what makes you feel safe, and that friction tends to be a source of drive.",
    tip: "Notice which side you default to under stress, and consciously give the other one a vote.",
  },
  {
    name: "Trine (Moon four signs ahead)",
    angle: "120° apart",
    text: "Sun and Moon share an element, so identity and emotional instinct speak the same language. This is a naturally harmonious pairing that tends to feel comfortable from the inside — sometimes too comfortable to change.",
    tip: "Comfort is the gift and the risk. Pick one thing a year that stretches you.",
  },
  {
    name: "Quincunx (Moon five signs ahead)",
    angle: "150° apart",
    text: "Sun and Moon share no element or modality, so they need constant small adjustments to work together. Astrologers often describe this pairing as feeling like two different people, each with its own set of preferences.",
    tip: "Stop trying to reconcile the two sides. Treat them as a partnership that needs regular check-ins.",
  },
  {
    name: "Opposition (Moon six signs ahead)",
    angle: "180° apart",
    text: "Your Sun and Moon sit at opposite ends of the same axis, like two poles of one theme. You feel pulled between two ways of being and often learn to balance them by swinging from one to the other before finding the middle.",
    tip: "Look for the shared theme of the two signs — the balance point is usually there.",
  },
  {
    name: "Quincunx (Moon five signs behind)",
    angle: "150° apart",
    text: "Sun and Moon share no element or modality, and the Moon sits behind the Sun in the zodiac. Emotional habits can feel like they come from an older, more instinctive part of you that your conscious identity has moved away from.",
    tip: "Revisit the comforts you outgrew — some of them still nourish you.",
  },
  {
    name: "Trine (Moon four signs behind)",
    angle: "120° apart",
    text: "Sun and Moon share an element, and the Moon sits behind the Sun. The combination feels familiar and nourishing: your emotional roots and your present identity draw on the same temperament, so it is easy to feel at home in yourself.",
    tip: "Use the ease to take on something bigger than your comfort zone.",
  },
  {
    name: "Square (Moon three signs behind)",
    angle: "90° apart",
    text: "Sun and Moon have different elements and pull against each other, with the Moon behind the Sun. Old emotional patterns can resurface when you push toward new goals, and working with them rather than against them is where the growth is.",
    tip: "When old habits show up, ask what they are protecting before deciding to override them.",
  },
  {
    name: "Sextile (Moon two signs behind)",
    angle: "60° apart",
    text: "Sun and Moon are in friendly, compatible elements, and the Moon sits behind the Sun. You draw on emotional instincts that support your identity rather than fight it, which often gives a quiet, dependable confidence.",
    tip: "Trust the quiet instinct that keeps repeating — it usually knows something.",
  },
  {
    name: "Semi-sextile (Moon one sign behind)",
    angle: "30° apart",
    text: "Your Moon sits in the sign directly before your Sun, so they share no element or modality. Your emotional side can feel like the sign you grew out of — familiar but not quite the way you present now — and it may take time to feel that the two belong together.",
    tip: "Let your inner life move at its own pace instead of the pace of your goals.",
  },
];

/** Keyed "SunElement-MoonElement". Directional: a Fire Sun with Water Moon differs from a Water Sun with Fire Moon. */
export const elementReadings: Record<`${Element}-${Element}`, string> = {
  "Fire-Fire": "Fire on fire: you feel and act at the same speed. Enthusiasm and temper are both quick, and you rarely stay stuck in a mood for long.",
  "Fire-Earth": "A fire Sun wants to leap, but an earth Moon needs to feel secure first. You may look bold on the outside while quietly weighing the practical risks on the inside.",
  "Fire-Air": "A fire Sun with an air Moon: feelings feed ideas and ideas feed action. Astrologers read this as working through emotions by talking and moving, with a restless, sociable and optimistic core.",
  "Fire-Water": "Outwardly bold, inwardly tender. A fire Sun with a water Moon shows confidence on the surface, with a deep sensitivity underneath that few people see.",
  "Earth-Fire": "An earth Sun with a fire Moon looks steady and measured, but the emotional life underneath is quick and passionate. Patience in public, fireworks in private.",
  "Earth-Earth": "Earth on earth: grounded in identity and emotional needs alike. Security, routine and physical comfort matter on every level, and change lands best when introduced gradually.",
  "Earth-Air": "An earth Sun with an air Moon pairs practical goals with a restless, curious emotional side. You may need to talk a problem through before you can act on it.",
  "Earth-Water": "You build with your hands and feel with your whole body. An earth Sun with a water Moon makes practical care and emotional depth reinforce each other.",
  "Air-Fire": "An air Sun with a fire Moon: a thinking identity with an impulsive heart. Ideas turn into feelings, and feelings into action, faster than you can debate them.",
  "Air-Earth": "An air Sun with an earth Moon has an open, curious mind and a heart that wants stability. You explore many ideas but need a settled base to come home to.",
  "Air-Air": "Air on air: you live in ideas at every level. You're good at seeing every side of an issue, though feelings can end up discussed and analysed more than felt.",
  "Air-Water": "Head and heart speak different languages: logic for the outer world, deep intuition for the inner one. When the two learn to translate for each other, this pairing is unusually perceptive.",
  "Water-Fire": "A water Sun with a fire Moon: a sensitive, intuitive identity with a fiery emotional response. You feel a lot and react fast, then wonder why.",
  "Water-Earth": "A water Sun with an earth Moon is deeply feeling but emotionally grounded. You absorb the mood in a room, then settle it with practical comfort.",
  "Water-Air": "A water Sun with an air Moon is intuitive at the core but copes by talking and rationalising. You can explain feelings well while you are still working out what they are.",
  "Water-Water": "Water on water: intuition and emotional depth run through everything. Boundaries and time alone matter a great deal, because you absorb the moods around you.",
};

/** Keyed "SunModality-MoonModality". */
export const modalityReadings: Record<`${Modality}-${Modality}`, string> = {
  "Cardinal-Cardinal": "Both Sun and Moon are initiators, so you start things by identity and by instinct alike — and can find it hard to stay with anything once the first push is over.",
  "Cardinal-Fixed": "Your Sun starts things while your Moon wants to hold on: bold plans on the surface with a deep need for stability and loyalty underneath.",
  "Cardinal-Mutable": "Your Sun leads while your Moon adapts. You are driven on the outside and flexible on the inside, with moods that are easily shaped by the people around you.",
  "Fixed-Cardinal": "A steady identity with an instinct to start fresh: you look constant from the outside, yet your emotional needs can push you into making changes.",
  "Fixed-Fixed": "Steady and stubborn at every level. Loyalty is a real strength, but changing your mind — or your feelings — takes deliberate effort.",
  "Fixed-Mutable": "Determined on the surface, adaptable underneath. You hold firm to your goals while your emotions bend to fit the room.",
  "Mutable-Cardinal": "A flexible identity with a self-starting heart: adaptable in how you present yourself, with emotional needs that push you into action.",
  "Mutable-Fixed": "Flexible on the surface with a Moon that needs consistency. You adapt to almost everything while quietly holding on to the few things that never change.",
  "Mutable-Mutable": "Adaptable at every level. That is a gift when circumstances shift, but you may struggle to settle on what you truly want.",
};
