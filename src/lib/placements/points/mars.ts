import type { Point } from "../types";

export const mars: Point = {
  slug: "mars",
  name: "Mars",
  glyph: "♂",
  signLabel: "Mars sign",
  governs: "drive, ambition, energy, desire, anger and how you take action",
  intro:
    "Mars describes how you go after what you want. Your Mars sign reveals your drive and ambition, how you handle conflict and anger, what motivates you and your style of desire and attraction.",
  duration: "about 6 to 7 weeks (months during a retrograde)",
  domain: "Drive & desire",
  dignities: { domicile: ["aries", "scorpio"], exaltation: ["capricorn"], detriment: ["libra", "taurus"], fall: ["cancer"] },
  byElement: {
    Fire: {
      expression: "A fire Mars acts instantly and passionately. You're competitive, courageous and energised by a challenge, with anger that flares fast and fades fast.",
      tip: "Channel energy into sport or bold projects so it doesn't spill into arguments.",
    },
    Earth: {
      expression: "An earth Mars works steadily and persistently. You pace yourself, build toward long-term goals and rarely give up once committed.",
      tip: "Don't let caution stop you from starting — momentum builds once you move.",
    },
    Air: {
      expression: "An air Mars fights with words and ideas. You're motivated by concepts and people, and you prefer negotiation and debate to confrontation.",
      tip: "Turn ideas into action with a clear first step and a deadline.",
    },
    Water: {
      expression: "A water Mars acts from emotion and intuition. Your drive is fuelled by feeling, and you tend to work indirectly — steady, strategic and quietly determined.",
      tip: "Name anger when you feel it, rather than letting it simmer under the surface.",
    },
  },
  signs: {
    aries: {
      blurb: "Mars in Aries is at home — bold, competitive and courageous. You act fast, love a challenge and have enormous energy, though patience and follow-through take practice.",
      keywords: ["Bold", "Competitive", "Energetic"],
      gifts: ["Fearless initiative", "Rapid, decisive action"],
      shadow: "Short temper and impatience",
    },
    taurus: {
      blurb: "Mars in Taurus is in detriment — slow to start but impossible to stop. You work steadily toward tangible goals, with remarkable stamina and a sensual, patient approach to desire.",
      keywords: ["Persistent", "Steady", "Sensual"],
      gifts: ["Incredible endurance", "Builds lasting results"],
      shadow: "Stubbornness and slow-burning anger",
    },
    gemini: {
      blurb: "Mars in Gemini fights with words. You're mentally restless, juggle many projects at once and are motivated by learning, variety and quick wins.",
      keywords: ["Restless", "Clever", "Versatile"],
      gifts: ["Quick-thinking multitasker", "Wins arguments with wit"],
      shadow: "Scattered energy and unfinished projects",
    },
    cancer: {
      blurb: "Mars in Cancer is in its fall — drive is fuelled by emotion and the instinct to protect. You fight hardest for family and home, and you tend to approach conflict indirectly.",
      keywords: ["Protective", "Emotional", "Tenacious"],
      gifts: ["Fierce defender of loved ones", "Tenacious when it matters"],
      shadow: "Passive-aggression instead of direct anger",
    },
    leo: {
      blurb: "Mars in Leo acts with confidence, pride and creative fire. You're driven by recognition and self-expression, and you lead with courage and generosity.",
      keywords: ["Confident", "Dramatic", "Courageous"],
      gifts: ["Inspiring, charismatic leadership", "Creative drive"],
      shadow: "Pride that won't back down",
    },
    virgo: {
      blurb: "Mars in Virgo channels energy into precision, skill and service. You're efficient, hard-working and methodical, and you excel at improving systems.",
      keywords: ["Efficient", "Skilled", "Diligent"],
      gifts: ["Meticulous, high-quality work", "Tireless problem-solver"],
      shadow: "Nervous energy and nitpicking",
    },
    libra: {
      blurb: "Mars in Libra is in detriment — you prefer diplomacy to confrontation and act best in partnership. You're driven by fairness and can be a powerful advocate for others.",
      keywords: ["Diplomatic", "Fair", "Cooperative"],
      gifts: ["Fights for justice and fairness", "Excellent negotiator"],
      shadow: "Avoiding necessary conflict",
    },
    scorpio: {
      blurb: "Mars in Scorpio is at home — intense, strategic and relentless. Your drive is deep and focused, desire runs powerfully and you never forget a slight.",
      keywords: ["Intense", "Strategic", "Relentless"],
      gifts: ["Unmatched focus and willpower", "Thrives in a crisis"],
      shadow: "Vengefulness or control",
    },
    sagittarius: {
      blurb: "Mars in Sagittarius is driven by adventure, freedom and big goals. You're enthusiastic, restless and at your best when chasing something inspiring.",
      keywords: ["Adventurous", "Enthusiastic", "Bold"],
      gifts: ["Contagious enthusiasm", "Takes big, brave leaps"],
      shadow: "Overcommitting and burning out",
    },
    capricorn: {
      blurb: "Mars in Capricorn is exalted — disciplined, ambitious and strategic. You play the long game, work harder than almost anyone and channel energy into lasting achievement.",
      keywords: ["Disciplined", "Ambitious", "Strategic"],
      gifts: ["Relentless, focused ambition", "Masterful self-control"],
      shadow: "Workaholism and rigidity",
    },
    aquarius: {
      blurb: "Mars in Aquarius is driven by ideals and innovation. You fight for causes, work best with autonomy and bring unconventional energy to everything you pursue.",
      keywords: ["Rebellious", "Idealistic", "Inventive"],
      gifts: ["Champions change and progress", "Innovative approach to problems"],
      shadow: "Contrarian streak or detachment",
    },
    pisces: {
      blurb: "Mars in Pisces acts from intuition and compassion. Your energy ebbs and flows, you're motivated by dreams and ideals and you often work best behind the scenes.",
      keywords: ["Intuitive", "Gentle", "Imaginative"],
      gifts: ["Driven by compassion and meaning", "Creative, flexible approach"],
      shadow: "Avoiding confrontation or drifting",
    },
  },
};
