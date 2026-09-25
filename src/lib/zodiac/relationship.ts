import type { SignSlug } from "./types";

/** What each sign brings to a relationship, and what it needs back. */
export const relationshipTraits: Record<SignSlug, { gives: string; needs: string }> = {
  aries: {
    gives: "courage, energy and a willingness to fight for the relationship",
    needs: "independence, excitement and a partner who can keep pace",
  },
  taurus: {
    gives: "loyalty, patience and a comforting, sensual presence",
    needs: "stability, trust and time to warm up",
  },
  gemini: {
    gives: "curiosity, humour and endless conversation",
    needs: "mental stimulation, variety and freedom to socialise",
  },
  cancer: {
    gives: "tenderness, intuition and a true sense of home",
    needs: "emotional security, reassurance and loyalty",
  },
  leo: {
    gives: "warmth, generosity and wholehearted devotion",
    needs: "appreciation, admiration and plenty of affection",
  },
  virgo: {
    gives: "attentive care, practical support and thoughtful loyalty",
    needs: "reliability, respect and patience with their reserve",
  },
  libra: {
    gives: "romance, fairness and a talent for harmony",
    needs: "true partnership, balance and open communication",
  },
  scorpio: {
    gives: "passion, depth and unshakeable loyalty",
    needs: "honesty, trust and real emotional intensity",
  },
  sagittarius: {
    gives: "optimism, adventure and refreshing honesty",
    needs: "freedom, growth and a partner who shares the journey",
  },
  capricorn: {
    gives: "commitment, stability and long-term vision",
    needs: "respect, patience and shared goals",
  },
  aquarius: {
    gives: "originality, friendship and an open mind",
    needs: "space, intellectual connection and acceptance",
  },
  pisces: {
    gives: "compassion, imagination and romantic devotion",
    needs: "gentleness, emotional presence and a steady anchor",
  },
};
