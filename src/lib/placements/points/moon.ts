import type { Point } from "../types";

export const moon: Point = {
  slug: "moon",
  name: "Moon",
  glyph: "☽",
  signLabel: "Moon sign",
  governs: "emotions, instincts, comfort, memory and your inner world",
  intro:
    "The Moon describes your emotional nature — how you feel, what makes you feel safe and how you instinctively react when life gets hard. Where your Sun sign is who you're becoming, your Moon sign is who you are when no one is watching.",
  duration: "about 2½ days",
  domain: "Emotions",
  dignities: { domicile: ["cancer"], exaltation: ["taurus"], detriment: ["capricorn"], fall: ["scorpio"] },
  byElement: {
    Fire: {
      expression: "A fire Moon processes feelings through action. Emotions arrive fast, burn bright and pass quickly — you'd rather do something than sit with a mood.",
      tip: "Give big feelings a physical outlet, then circle back to name what was underneath them.",
    },
    Earth: {
      expression: "An earth Moon finds safety in routine, the body and tangible comfort. You process emotions slowly and show care through practical help.",
      tip: "Let yourself feel before you fix — not every emotion needs a solution.",
    },
    Air: {
      expression: "An air Moon processes feelings by talking and thinking them through. You need to understand an emotion before you can settle it.",
      tip: "Notice when analysing a feeling becomes a way of avoiding it — sometimes it just needs to be felt.",
    },
    Water: {
      expression: "A water Moon feels everything deeply and intuitively. Emotional tides run strong, and you absorb the moods of the people around you.",
      tip: "Protect your energy with clear boundaries and regular time alone to reset.",
    },
  },
  signs: {
    aries: {
      blurb: "Moon in Aries feels things instantly and honestly. Emotions flare up and burn out quickly, and you need independence and action to feel emotionally safe — sitting still with a problem feels worse than tackling it head-on.",
      keywords: ["Passionate", "Impulsive", "Brave"],
      gifts: ["Emotional honesty — you never hide how you feel", "Quick recovery from setbacks"],
      shadow: "Reacting before you've processed what you actually feel",
    },
    taurus: {
      blurb: "Moon in Taurus is exalted — one of the most emotionally steady placements. You find security in comfort, routine and the physical world, and you're a calm, reassuring presence for others.",
      keywords: ["Steady", "Sensual", "Loyal"],
      gifts: ["Emotional stability that others lean on", "A talent for creating comfort"],
      shadow: "Resisting change even when it would help you",
    },
    gemini: {
      blurb: "Moon in Gemini processes feelings through words. You need to talk things out, and variety and conversation keep your mood light — though you may intellectualise emotions rather than sit with them.",
      keywords: ["Curious", "Chatty", "Adaptable"],
      gifts: ["Can name and explain feelings clearly", "Lifts others' moods with humour"],
      shadow: "Overthinking emotions instead of feeling them",
    },
    cancer: {
      blurb: "Moon in Cancer is at home — deeply intuitive, nurturing and emotionally rich. Family, home and belonging are central to your wellbeing, and you care for others instinctively.",
      keywords: ["Nurturing", "Intuitive", "Protective"],
      gifts: ["Deep emotional intelligence", "Makes everyone feel at home"],
      shadow: "Retreating into your shell when hurt",
    },
    leo: {
      blurb: "Moon in Leo needs to feel seen, appreciated and loved out loud. You're warm, generous and expressive with feelings, and creativity or play is often how you recharge emotionally.",
      keywords: ["Warm", "Expressive", "Proud"],
      gifts: ["Generous, big-hearted affection", "Brings joy and play to hard times"],
      shadow: "Feeling wounded when you're overlooked",
    },
    virgo: {
      blurb: "Moon in Virgo finds calm in order, usefulness and a well-kept routine. You show love by helping, and you feel best when life is organised — though worry can become your default emotional state.",
      keywords: ["Caring", "Practical", "Analytical"],
      gifts: ["Shows love through thoughtful acts of service", "Calm problem-solver in a crisis"],
      shadow: "Anxiety and self-criticism when things feel out of control",
    },
    libra: {
      blurb: "Moon in Libra needs harmony, partnership and beauty to feel at peace. You're emotionally attuned to others and dislike conflict — sometimes at the cost of voicing your own needs.",
      keywords: ["Harmonious", "Romantic", "Diplomatic"],
      gifts: ["Soothes tension and restores balance", "Deeply considerate of others' feelings"],
      shadow: "Suppressing your own feelings to keep the peace",
    },
    scorpio: {
      blurb: "Moon in Scorpio is in its fall — emotions run incredibly deep and private. You feel with total intensity, need complete trust to open up and have a powerful capacity for emotional transformation.",
      keywords: ["Intense", "Private", "Loyal"],
      gifts: ["Unshakeable emotional loyalty", "Can sit with pain others can't"],
      shadow: "Holding on to hurt, jealousy or control",
    },
    sagittarius: {
      blurb: "Moon in Sagittarius needs freedom, adventure and meaning to feel emotionally well. You bounce back with optimism and humour, though you may run from heavier feelings.",
      keywords: ["Optimistic", "Free", "Honest"],
      gifts: ["Resilient, hopeful outlook", "Helps others see the bigger picture"],
      shadow: "Avoiding emotional heaviness by staying on the move",
    },
    capricorn: {
      blurb: "Moon in Capricorn is in detriment — emotions are held with restraint and responsibility. You find security in achievement and self-reliance, and you often mature emotionally early.",
      keywords: ["Reserved", "Responsible", "Resilient"],
      gifts: ["Calm and composed under pressure", "Dependable in every emergency"],
      shadow: "Treating vulnerability as weakness",
    },
    aquarius: {
      blurb: "Moon in Aquarius processes emotions with a little distance. You need space, friendship and freedom to be yourself, and you often care more easily for groups and causes than for your own feelings.",
      keywords: ["Independent", "Friendly", "Detached"],
      gifts: ["Clear-headed in emotional situations", "Accepting of everyone's differences"],
      shadow: "Detaching from feelings instead of expressing them",
    },
    pisces: {
      blurb: "Moon in Pisces is deeply empathetic, imaginative and emotionally porous. You feel what others feel, need creative or spiritual outlets and require quiet time to recover from the world.",
      keywords: ["Empathetic", "Dreamy", "Compassionate"],
      gifts: ["Boundless compassion", "Rich creative and intuitive inner life"],
      shadow: "Absorbing others' emotions until you're overwhelmed",
    },
  },
};
