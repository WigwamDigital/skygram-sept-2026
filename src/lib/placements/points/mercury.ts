import type { Point } from "../types";

export const mercury: Point = {
  slug: "mercury",
  name: "Mercury",
  glyph: "☿",
  signLabel: "Mercury sign",
  governs: "thinking, communication, learning, decision-making and everyday logistics",
  intro:
    "Mercury describes how your mind works — how you think, learn, speak and process information. Your Mercury sign explains your communication style and why some conversations flow effortlessly while others feel like translation.",
  duration: "about 3 to 4 weeks (longer during a retrograde)",
  domain: "Mind & communication",
  dignities: { domicile: ["gemini", "virgo"], exaltation: ["virgo"], detriment: ["sagittarius", "pisces"], fall: ["pisces"] },
  byElement: {
    Fire: {
      expression: "A fire Mercury thinks fast and speaks with conviction. Ideas come in flashes of inspiration, and you'd rather act on a hunch than wait for all the data.",
      tip: "Pause before you hit send — a second read catches what enthusiasm skips.",
    },
    Earth: {
      expression: "An earth Mercury thinks practically and methodically. You learn by doing, trust facts over theories and communicate in clear, useful terms.",
      tip: "Stay open to ideas that aren't proven yet — some of the best ones start as guesses.",
    },
    Air: {
      expression: "An air Mercury is quick, curious and social. You think out loud, connect ideas effortlessly and love a good debate.",
      tip: "Pick one idea and see it through before chasing the next one.",
    },
    Water: {
      expression: "A water Mercury thinks in feelings, images and impressions. You pick up on what's unspoken and remember how things felt more than what was said.",
      tip: "Write down your intuitions — clarity often comes when you see them on paper.",
    },
  },
  signs: {
    aries: {
      blurb: "Mercury in Aries thinks fast and speaks directly. You make quick decisions, enjoy lively debate and get straight to the point — patience with slow explanations isn't your strong suit.",
      keywords: ["Direct", "Quick", "Decisive"],
      gifts: ["Cuts through confusion fast", "Honest, no-nonsense communication"],
      shadow: "Speaking before thinking it through",
    },
    taurus: {
      blurb: "Mercury in Taurus thinks slowly, carefully and practically. Once you've made up your mind, you rarely change it, and you communicate in a calm, grounded and reassuring way.",
      keywords: ["Deliberate", "Practical", "Steady"],
      gifts: ["Thorough, reliable decisions", "Soothing, sensible voice"],
      shadow: "Stubbornly sticking to a view",
    },
    gemini: {
      blurb: "Mercury in Gemini is at home — witty, curious and endlessly talkative. You learn fast, juggle multiple ideas and can talk to anyone about anything.",
      keywords: ["Witty", "Curious", "Versatile"],
      gifts: ["Brilliant conversationalist", "Absorbs information quickly"],
      shadow: "Scattered focus and unfinished thoughts",
    },
    cancer: {
      blurb: "Mercury in Cancer thinks with the heart. Your memory is emotional and vivid, you communicate with care and you're highly attuned to tone and subtext.",
      keywords: ["Intuitive", "Sentimental", "Tactful"],
      gifts: ["Remembers what matters to people", "Speaks with warmth and empathy"],
      shadow: "Taking comments personally",
    },
    leo: {
      blurb: "Mercury in Leo speaks with confidence and flair. You're a natural storyteller and presenter, and you communicate with warmth, drama and conviction.",
      keywords: ["Expressive", "Confident", "Creative"],
      gifts: ["Inspiring public speaker", "Makes ideas memorable"],
      shadow: "Dominating the conversation",
    },
    virgo: {
      blurb: "Mercury in Virgo is both at home and exalted — precise, analytical and detail-oriented. You notice what others miss and excel at organising, editing and solving problems.",
      keywords: ["Precise", "Analytical", "Methodical"],
      gifts: ["Exceptional attention to detail", "Clear, helpful explanations"],
      shadow: "Over-criticising yourself and others",
    },
    libra: {
      blurb: "Mercury in Libra weighs every side before deciding. You're diplomatic, persuasive and graceful with words — a natural mediator who values fair and balanced conversation.",
      keywords: ["Diplomatic", "Balanced", "Persuasive"],
      gifts: ["Sees every perspective", "Resolves disagreements gracefully"],
      shadow: "Indecision when options feel equal",
    },
    scorpio: {
      blurb: "Mercury in Scorpio is a detective's mind — penetrating, strategic and private. You look beneath the surface, ask the hard questions and keep secrets well.",
      keywords: ["Probing", "Strategic", "Perceptive"],
      gifts: ["Sees through deception", "Deep, focused research"],
      shadow: "Suspicion or cutting words when threatened",
    },
    sagittarius: {
      blurb: "Mercury in Sagittarius is in detriment — a big-picture thinker who loves philosophy, travel and ideas. You're honest and enthusiastic, though details can slip through the cracks.",
      keywords: ["Philosophical", "Candid", "Enthusiastic"],
      gifts: ["Inspires with vision and optimism", "Refreshingly honest"],
      shadow: "Tactless bluntness and missed details",
    },
    capricorn: {
      blurb: "Mercury in Capricorn thinks strategically and communicates with authority. You're organised, realistic and structured, with a dry wit that surprises people.",
      keywords: ["Strategic", "Structured", "Realistic"],
      gifts: ["Excellent planner and organiser", "Speaks with credibility"],
      shadow: "Pessimism or rigid thinking",
    },
    aquarius: {
      blurb: "Mercury in Aquarius is original, inventive and ahead of its time. You think in systems, love unconventional ideas and aren't afraid to challenge the consensus.",
      keywords: ["Inventive", "Objective", "Unconventional"],
      gifts: ["Innovative problem-solving", "Clear, objective reasoning"],
      shadow: "Stubbornness about your own ideas",
    },
    pisces: {
      blurb: "Mercury in Pisces is in detriment and fall — imaginative, poetic and intuitive rather than linear. You think in images and feelings and often just know things without knowing why.",
      keywords: ["Imaginative", "Intuitive", "Poetic"],
      gifts: ["Creative, artistic expression", "Reads between the lines"],
      shadow: "Vagueness and difficulty with details",
    },
  },
};
