import type { Point } from "../types";

export const rising: Point = {
  slug: "rising",
  name: "Rising",
  glyph: "AC",
  signLabel: "Rising sign",
  governs: "first impressions, appearance, personal style and your approach to life",
  intro:
    "Your Rising sign (Ascendant) is the zodiac sign rising on the eastern horizon at the exact moment you were born. It describes the face you show the world — first impressions, personal style and the lens through which you meet new situations.",
  duration: "about 2 hours each day",
  domain: "First impressions",
  byElement: {
    Fire: {
      expression: "A fire Rising comes across as warm, energetic and confident. People notice your enthusiasm first, and you tend to approach life head-on.",
      tip: "Your energy fills the room — leave space for quieter people to join in.",
    },
    Earth: {
      expression: "An earth Rising comes across as calm, capable and grounded. People sense your reliability immediately, and you approach life practically.",
      tip: "Let people see your playful side — you're warmer than your first impression.",
    },
    Air: {
      expression: "An air Rising comes across as friendly, curious and articulate. You make easy first impressions and approach life through conversation and ideas.",
      tip: "Let connections go deeper than charm — people want to know the real you.",
    },
    Water: {
      expression: "A water Rising comes across as gentle, perceptive and a little mysterious. You read the room instantly and approach life through feeling.",
      tip: "Protect your sensitivity in new environments — it's a gift, not a weakness.",
    },
  },
  signs: {
    aries: {
      blurb: "Aries Rising comes across as bold, energetic and direct. You meet life head-on, give off confident, sporty energy and are often the first to act in any group.",
      keywords: ["Bold", "Energetic", "Direct"],
      gifts: ["Instant confidence and presence", "Takes the lead naturally"],
      shadow: "Can seem impatient or combative",
    },
    taurus: {
      blurb: "Taurus Rising comes across as calm, grounded and pleasant. You have a steady, reassuring presence, a love of comfort and quality, and a naturally sensual style.",
      keywords: ["Calm", "Grounded", "Sensual"],
      gifts: ["Reassuring, steady presence", "Effortless, classic style"],
      shadow: "Can seem slow to warm up",
    },
    gemini: {
      blurb: "Gemini Rising comes across as chatty, curious and youthful. You're quick-witted and adaptable, with expressive gestures and an easy way of connecting with anyone.",
      keywords: ["Curious", "Chatty", "Youthful"],
      gifts: ["Effortless social ease", "Quick, witty first impression"],
      shadow: "Can seem scattered or restless",
    },
    cancer: {
      blurb: "Cancer Rising comes across as gentle, caring and approachable. You make people feel at ease, protect yourself with a soft shell and read emotions instantly.",
      keywords: ["Gentle", "Caring", "Intuitive"],
      gifts: ["Makes people feel safe", "Reads the room instantly"],
      shadow: "Can seem guarded or moody at first",
    },
    leo: {
      blurb: "Leo Rising comes across as warm, radiant and charismatic. You naturally draw attention, carry yourself with confidence and have a memorable personal style.",
      keywords: ["Radiant", "Charismatic", "Warm"],
      gifts: ["Magnetic, confident presence", "Makes a lasting first impression"],
      shadow: "Can seem attention-seeking",
    },
    virgo: {
      blurb: "Virgo Rising comes across as neat, thoughtful and composed. People notice your precision and helpfulness, and you tend to approach life carefully and analytically.",
      keywords: ["Composed", "Thoughtful", "Polished"],
      gifts: ["Capable, trustworthy impression", "Tidy, understated style"],
      shadow: "Can seem reserved or critical",
    },
    libra: {
      blurb: "Libra Rising comes across as charming, gracious and attractive. You're socially skilled, stylish and diplomatic, and you approach life seeking balance and harmony.",
      keywords: ["Charming", "Gracious", "Stylish"],
      gifts: ["Effortless charm and tact", "Refined personal style"],
      shadow: "Can seem indecisive or people-pleasing",
    },
    scorpio: {
      blurb: "Scorpio Rising comes across as intense, magnetic and mysterious. You have a powerful, penetrating presence and tend to reveal yourself slowly and selectively.",
      keywords: ["Magnetic", "Mysterious", "Intense"],
      gifts: ["Powerful, compelling presence", "Sees through people quickly"],
      shadow: "Can seem intimidating or secretive",
    },
    sagittarius: {
      blurb: "Sagittarius Rising comes across as upbeat, adventurous and open. You're friendly, funny and restless, with an infectious enthusiasm for life and learning.",
      keywords: ["Upbeat", "Adventurous", "Open"],
      gifts: ["Infectious optimism", "Easy, friendly energy"],
      shadow: "Can seem tactless or noncommittal",
    },
    capricorn: {
      blurb: "Capricorn Rising comes across as composed, capable and mature. You project competence and authority, often look put-together and grow more playful with age.",
      keywords: ["Composed", "Capable", "Mature"],
      gifts: ["Commands respect naturally", "Polished, professional presence"],
      shadow: "Can seem serious or distant",
    },
    aquarius: {
      blurb: "Aquarius Rising comes across as friendly, unique and a little unconventional. You have an original style, an open mind and an approachable yet independent air.",
      keywords: ["Original", "Friendly", "Independent"],
      gifts: ["Memorable, unconventional style", "Open-minded and accepting"],
      shadow: "Can seem aloof or hard to read",
    },
    pisces: {
      blurb: "Pisces Rising comes across as gentle, dreamy and compassionate. You have a soft, artistic aura, adapt easily to others and often seem otherworldly.",
      keywords: ["Dreamy", "Gentle", "Artistic"],
      gifts: ["Soft, compassionate presence", "Artistic, fluid style"],
      shadow: "Can seem elusive or easily influenced",
    },
  },
};
