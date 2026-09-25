import type { Point } from "../types";

export const venus: Point = {
  slug: "venus",
  name: "Venus",
  glyph: "♀",
  signLabel: "Venus sign",
  governs: "love, attraction, beauty, pleasure, values and money",
  intro:
    "Venus describes how you love and what you find beautiful. Your Venus sign reveals your romantic style, what attracts you, how you show affection and what you value — in relationships, style and money.",
  duration: "about 4 to 5 weeks (longer during a retrograde)",
  domain: "Love & values",
  dignities: { domicile: ["taurus", "libra"], exaltation: ["pisces"], detriment: ["scorpio", "aries"], fall: ["virgo"] },
  byElement: {
    Fire: {
      expression: "A fire Venus loves boldly and playfully. You're drawn to confidence and excitement, and you show affection through enthusiasm, grand gestures and adventure.",
      tip: "Let love deepen past the thrill of the chase — steadiness can be exciting too.",
    },
    Earth: {
      expression: "An earth Venus loves through loyalty, touch and tangible care. You're attracted to reliability and you show love by showing up, consistently.",
      tip: "Say the words as well as doing the deeds — partners like to hear it too.",
    },
    Air: {
      expression: "An air Venus falls for minds first. Conversation, wit and shared ideas are your love language, and you need room to breathe in a relationship.",
      tip: "Let yourself be emotionally seen, not just intellectually admired.",
    },
    Water: {
      expression: "A water Venus loves deeply, romantically and intuitively. You crave emotional intimacy and show affection through care, devotion and understanding.",
      tip: "Keep your own identity inside the relationship — merging completely can leave you depleted.",
    },
  },
  signs: {
    aries: {
      blurb: "Venus in Aries is in detriment — a passionate pursuer who loves the thrill of the chase. You fall fast, love boldly and are attracted to confidence, spontaneity and a little challenge.",
      keywords: ["Passionate", "Direct", "Spontaneous"],
      gifts: ["Fearless in going after love", "Keeps romance exciting"],
      shadow: "Losing interest once the chase is over",
    },
    taurus: {
      blurb: "Venus in Taurus is at home — sensual, loyal and devoted. You love through touch, comfort and consistency, and you have a refined appreciation for beauty, food and quality.",
      keywords: ["Sensual", "Loyal", "Devoted"],
      gifts: ["Steady, dependable affection", "Creates beauty and comfort"],
      shadow: "Possessiveness or resistance to change",
    },
    gemini: {
      blurb: "Venus in Gemini is attracted to wit and conversation. You flirt with words, need variety and mental stimulation and want a partner who is also your best friend.",
      keywords: ["Flirtatious", "Playful", "Curious"],
      gifts: ["Keeps love fun and fresh", "Great communicator in relationships"],
      shadow: "Restlessness or fear of commitment",
    },
    cancer: {
      blurb: "Venus in Cancer loves with tenderness and loyalty. You seek emotional security, express affection through nurturing and dream of building a home with someone.",
      keywords: ["Tender", "Nurturing", "Devoted"],
      gifts: ["Deeply caring and protective partner", "Creates a sense of home"],
      shadow: "Clinginess or moodiness when insecure",
    },
    leo: {
      blurb: "Venus in Leo loves generously and theatrically. You want romance with sparkle — grand gestures, admiration and loyalty — and you give just as lavishly as you receive.",
      keywords: ["Romantic", "Generous", "Loyal"],
      gifts: ["Wholehearted, generous devotion", "Makes a partner feel special"],
      shadow: "Needing constant admiration",
    },
    virgo: {
      blurb: "Venus in Virgo is in its fall — love is shown through acts of service and thoughtful attention. You're discerning, loyal and practical, and you express affection by helping.",
      keywords: ["Thoughtful", "Devoted", "Discerning"],
      gifts: ["Notices and meets real needs", "Reliable, grounded affection"],
      shadow: "Being overly critical of partners or yourself",
    },
    libra: {
      blurb: "Venus in Libra is at home — romantic, charming and partnership-oriented. You value harmony, fairness and beauty, and you're a natural at courtship and making relationships feel elegant.",
      keywords: ["Charming", "Romantic", "Harmonious"],
      gifts: ["Graceful, considerate partner", "Strong sense of fairness in love"],
      shadow: "People-pleasing or avoiding conflict",
    },
    scorpio: {
      blurb: "Venus in Scorpio is in detriment — love is intense, all-or-nothing and deeply loyal. You crave emotional and physical intimacy, and trust is the foundation of every bond.",
      keywords: ["Intense", "Magnetic", "Loyal"],
      gifts: ["Profound emotional depth", "Unwavering loyalty"],
      shadow: "Jealousy and possessiveness",
    },
    sagittarius: {
      blurb: "Venus in Sagittarius loves freedom, adventure and honesty. You're attracted to people who expand your world, and you need a partner who is also a travel buddy and philosopher.",
      keywords: ["Adventurous", "Honest", "Free-spirited"],
      gifts: ["Brings fun and growth to love", "Refreshingly honest affection"],
      shadow: "Commitment can feel like a cage",
    },
    capricorn: {
      blurb: "Venus in Capricorn takes love seriously. You're loyal, patient and committed, attracted to ambition and stability, and you show love by building a secure future together.",
      keywords: ["Committed", "Loyal", "Mature"],
      gifts: ["Serious, long-term devotion", "Dependable through anything"],
      shadow: "Reserve that can read as coldness",
    },
    aquarius: {
      blurb: "Venus in Aquarius loves unconventionally. Friendship comes first, independence matters and you're drawn to people who are unique, intelligent and a little unusual.",
      keywords: ["Unconventional", "Friendly", "Independent"],
      gifts: ["Accepts partners exactly as they are", "Keeps love open-minded"],
      shadow: "Emotional distance when things get intense",
    },
    pisces: {
      blurb: "Venus in Pisces is exalted — the most romantic, compassionate and selfless placement. You love unconditionally, dream of soulmate connection and express affection through tenderness and creativity.",
      keywords: ["Romantic", "Compassionate", "Dreamy"],
      gifts: ["Unconditional, selfless love", "Deeply romantic imagination"],
      shadow: "Idealising partners or losing yourself in love",
    },
  },
};
