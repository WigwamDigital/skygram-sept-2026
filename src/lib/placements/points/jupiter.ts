import type { Point } from "../types";

export const jupiter: Point = {
  slug: "jupiter",
  name: "Jupiter",
  glyph: "♃",
  signLabel: "Jupiter sign",
  governs: "growth, luck, optimism, wisdom, beliefs and abundance",
  intro:
    "Jupiter describes where and how you grow. Your Jupiter sign shows what brings you luck and opportunity, what you believe in, how you find meaning and where you tend to be generous — or overdo it.",
  duration: "about 12 to 13 months",
  domain: "Growth & luck",
  dignities: { domicile: ["sagittarius", "pisces"], exaltation: ["cancer"], detriment: ["gemini", "virgo"], fall: ["capricorn"] },
  byElement: {
    Fire: {
      expression: "A fire Jupiter grows through courage, leadership and bold risks. Luck tends to follow when you back yourself and go first.",
      tip: "Balance faith with preparation — the boldest bets still need a plan.",
    },
    Earth: {
      expression: "An earth Jupiter grows through patience, skill and material building. Abundance comes from steady effort that compounds over time.",
      tip: "Allow room for luck and generosity, not just hard work.",
    },
    Air: {
      expression: "An air Jupiter grows through ideas, learning and connection. Opportunities arrive through people, conversations and networks.",
      tip: "Commit to the best ideas instead of collecting them all.",
    },
    Water: {
      expression: "A water Jupiter grows through empathy, intuition and emotional wisdom. Generosity of spirit is your greatest source of abundance.",
      tip: "Protect your generosity with boundaries so it stays sustainable.",
    },
  },
  signs: {
    aries: {
      blurb: "Jupiter in Aries grows through courage and initiative. Luck favours you when you take the lead, start something new or back yourself when others hesitate.",
      keywords: ["Pioneering", "Confident", "Bold"],
      gifts: ["Lucky when taking initiative", "Inspires others to be brave"],
      shadow: "Overconfidence and impatience",
    },
    taurus: {
      blurb: "Jupiter in Taurus grows through patience, pleasure and steady building. You have a natural gift for attracting resources and enjoying the good things in life.",
      keywords: ["Abundant", "Patient", "Grounded"],
      gifts: ["Talent for building wealth", "Deep appreciation of life's pleasures"],
      shadow: "Overindulgence or materialism",
    },
    gemini: {
      blurb: "Jupiter in Gemini is in detriment — growth comes through learning, conversation and connection. Your curiosity opens doors, though focus can spread thin.",
      keywords: ["Curious", "Sociable", "Versatile"],
      gifts: ["Opportunities through networking", "Endless love of learning"],
      shadow: "Knowing a little about everything, a lot about nothing",
    },
    cancer: {
      blurb: "Jupiter in Cancer is exalted — generosity flows through care, family and emotional wisdom. You grow by nurturing others and create abundance through a strong sense of home.",
      keywords: ["Nurturing", "Generous", "Protective"],
      gifts: ["Big-hearted, protective generosity", "Emotional wisdom"],
      shadow: "Smothering or overprotective tendencies",
    },
    leo: {
      blurb: "Jupiter in Leo grows through creativity, confidence and joyful self-expression. You're magnanimous, warm and lucky when you share your gifts generously.",
      keywords: ["Magnanimous", "Creative", "Joyful"],
      gifts: ["Generous, warm leadership", "Creative success"],
      shadow: "Showiness or excess pride",
    },
    virgo: {
      blurb: "Jupiter in Virgo is in detriment — growth comes through service, skill and improvement. You find meaning in being useful and excel at perfecting systems.",
      keywords: ["Helpful", "Skilled", "Conscientious"],
      gifts: ["Growth through mastery", "Makes a real, practical difference"],
      shadow: "Getting lost in details and missing the big picture",
    },
    libra: {
      blurb: "Jupiter in Libra grows through partnership, fairness and beauty. Your luck often arrives through other people, and you have a gift for diplomacy and justice.",
      keywords: ["Fair", "Gracious", "Cooperative"],
      gifts: ["Opportunities through partnerships", "Natural diplomat"],
      shadow: "Relying too much on others' approval",
    },
    scorpio: {
      blurb: "Jupiter in Scorpio grows through depth, transformation and research. You find meaning in life's mysteries, and resources often come through shared or hidden channels.",
      keywords: ["Profound", "Resourceful", "Transformative"],
      gifts: ["Powerful capacity for renewal", "Insight into what others miss"],
      shadow: "Obsession or all-or-nothing extremes",
    },
    sagittarius: {
      blurb: "Jupiter in Sagittarius is at home — optimistic, philosophical and adventurous. Luck follows travel, study and faith, and you inspire others with your vision.",
      keywords: ["Optimistic", "Adventurous", "Wise"],
      gifts: ["Contagious faith and optimism", "Growth through travel and learning"],
      shadow: "Over-promising or preachiness",
    },
    capricorn: {
      blurb: "Jupiter in Capricorn is in its fall — growth comes through discipline, structure and hard-won achievement. Success builds slowly, but it lasts.",
      keywords: ["Ambitious", "Disciplined", "Pragmatic"],
      gifts: ["Lasting, well-earned success", "Excellent long-term planning"],
      shadow: "Pessimism about what's possible",
    },
    aquarius: {
      blurb: "Jupiter in Aquarius grows through innovation, community and ideals. You're lucky in groups and networks, and you find meaning in progress and helping humanity.",
      keywords: ["Visionary", "Humanitarian", "Progressive"],
      gifts: ["Opportunities through communities", "Future-focused vision"],
      shadow: "Idealism detached from reality",
    },
    pisces: {
      blurb: "Jupiter in Pisces is at home — compassionate, spiritual and imaginative. You grow through faith, empathy and creativity, and your generosity knows few limits.",
      keywords: ["Compassionate", "Spiritual", "Imaginative"],
      gifts: ["Boundless compassion", "Rich spiritual and creative life"],
      shadow: "Escapism or giving too much",
    },
  },
};
