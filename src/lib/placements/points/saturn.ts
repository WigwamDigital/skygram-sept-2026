import type { Point } from "../types";

export const saturn: Point = {
  slug: "saturn",
  name: "Saturn",
  glyph: "♄",
  signLabel: "Saturn sign",
  governs: "discipline, responsibility, limits, fears, maturity and life lessons",
  intro:
    "Saturn describes your life lessons and where you must earn mastery. Your Saturn sign shows your deepest fears and insecurities, where you feel tested — and where, with patience and effort, you build your greatest strength.",
  duration: "about 2½ years",
  domain: "Lessons & discipline",
  dignities: { domicile: ["capricorn", "aquarius"], exaltation: ["libra"], detriment: ["cancer", "leo"], fall: ["aries"] },
  byElement: {
    Fire: {
      expression: "A fire Saturn tests confidence, identity and self-expression. The lesson is to build courage that comes from within rather than from reckless action.",
      tip: "Take measured risks — courage grows through small, repeated acts of bravery.",
    },
    Earth: {
      expression: "An earth Saturn tests security, work and resources. The lesson is to build stability patiently without letting fear of scarcity run your life.",
      tip: "Trust the progress you've already made — you're more secure than you feel.",
    },
    Air: {
      expression: "An air Saturn tests communication, relationships and ideas. The lesson is to think rigorously and commit to your views and your people.",
      tip: "Speak up even when your ideas feel unfinished — mastery comes through practice.",
    },
    Water: {
      expression: "A water Saturn tests emotional security and vulnerability. The lesson is to build healthy emotional boundaries without closing your heart.",
      tip: "Let trusted people see your feelings — vulnerability is a strength you can build.",
    },
  },
  signs: {
    aries: {
      blurb: "Saturn in Aries is in its fall — the lesson is learning to act with patience and self-trust. You may doubt your right to take the lead, but you develop quiet, disciplined courage.",
      keywords: ["Self-reliant", "Determined", "Tested"],
      gifts: ["Disciplined courage", "Hard-earned independence"],
      shadow: "Frustration or fear around asserting yourself",
    },
    taurus: {
      blurb: "Saturn in Taurus asks you to build security patiently. You may worry about money or stability, but you become exceptionally reliable, resourceful and grounded.",
      keywords: ["Prudent", "Enduring", "Practical"],
      gifts: ["Builds lasting security", "Remarkable endurance"],
      shadow: "Fear of scarcity or change",
    },
    gemini: {
      blurb: "Saturn in Gemini brings lessons around communication and learning. You may doubt your intelligence or voice, yet you develop a precise, serious and disciplined mind.",
      keywords: ["Precise", "Studious", "Thoughtful"],
      gifts: ["Rigorous, careful thinking", "Mastery through study"],
      shadow: "Self-doubt about speaking up",
    },
    cancer: {
      blurb: "Saturn in Cancer is in detriment — lessons revolve around emotional security and family. You may have taken on responsibility early, and you learn to build the safety you once needed.",
      keywords: ["Responsible", "Protective", "Guarded"],
      gifts: ["Creates stable, secure homes", "Emotional resilience"],
      shadow: "Walling off vulnerable feelings",
    },
    leo: {
      blurb: "Saturn in Leo is in detriment — the lesson is to shine without needing permission. You may fear being seen, yet you develop authentic, dignified confidence over time.",
      keywords: ["Dignified", "Committed", "Earnest"],
      gifts: ["Self-made, lasting confidence", "Responsible leadership"],
      shadow: "Fear of judgement or rejection",
    },
    virgo: {
      blurb: "Saturn in Virgo brings lessons around perfectionism, health and work. You're conscientious and highly skilled, and you learn that good enough is often exactly right.",
      keywords: ["Conscientious", "Methodical", "Diligent"],
      gifts: ["Exceptional craftsmanship", "Reliable work ethic"],
      shadow: "Perfectionism and worry",
    },
    libra: {
      blurb: "Saturn in Libra is exalted — you take relationships, fairness and commitment seriously. You learn to balance your needs with others' and build partnerships that endure.",
      keywords: ["Fair", "Committed", "Principled"],
      gifts: ["Strong sense of justice", "Lasting, balanced partnerships"],
      shadow: "Fear of being alone or of conflict",
    },
    scorpio: {
      blurb: "Saturn in Scorpio brings lessons around trust, control and intimacy. You face intense experiences that forge extraordinary emotional strength and self-mastery.",
      keywords: ["Resilient", "Controlled", "Deep"],
      gifts: ["Profound inner strength", "Mastery over hard emotions"],
      shadow: "Fear of betrayal or loss of control",
    },
    sagittarius: {
      blurb: "Saturn in Sagittarius asks you to build beliefs that are truly your own. You take learning and ethics seriously and develop hard-won, practical wisdom.",
      keywords: ["Principled", "Wise", "Earnest"],
      gifts: ["Grounded, practical wisdom", "Strong ethical compass"],
      shadow: "Rigid beliefs or cynicism",
    },
    capricorn: {
      blurb: "Saturn in Capricorn is at home — disciplined, ambitious and deeply responsible. You're built for long-term achievement and learn to balance duty with rest.",
      keywords: ["Disciplined", "Ambitious", "Masterful"],
      gifts: ["Natural authority and structure", "Achieves long-term goals"],
      shadow: "Workaholism or fear of failure",
    },
    aquarius: {
      blurb: "Saturn in Aquarius is at home — the lesson is to build structures that serve the future. You're principled, systematic and dedicated to your community and ideals.",
      keywords: ["Principled", "Systematic", "Visionary"],
      gifts: ["Builds lasting systems for change", "Loyal to community and ideals"],
      shadow: "Emotional detachment or rigidity",
    },
    pisces: {
      blurb: "Saturn in Pisces brings lessons around boundaries, faith and compassion. You learn to give structure to your dreams and turn empathy into sustainable service.",
      keywords: ["Compassionate", "Spiritual", "Devoted"],
      gifts: ["Gives form to dreams", "Compassion with boundaries"],
      shadow: "Feeling overwhelmed or without direction",
    },
  },
};
