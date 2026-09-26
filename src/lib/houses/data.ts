import type { HouseKind, HouseNumber } from "./types";

export interface House {
  number: HouseNumber;
  /** "1st house" */
  name: string;
  /** e.g. "House of Self" */
  title: string;
  kind: HouseKind;
  themes: string[];
  summary: string;
  /** The question this house answers about your life */
  question: string;
}

export const houses: House[] = [
  {
    number: 1, name: "1st house", title: "House of Self", kind: "angular",
    themes: ["Identity", "Appearance", "First impressions", "Personal style", "New beginnings"],
    summary: "The 1st house begins at your Ascendant, or Rising sign. It describes how you meet the world: your physical presence, your instinctive approach and the first impression you make.",
    question: "Who am I, and how do I come across?",
  },
  {
    number: 2, name: "2nd house", title: "House of Values", kind: "succedent",
    themes: ["Money", "Possessions", "Self-worth", "Earning", "Comfort"],
    summary: "The 2nd house covers what you own, earn and value. It shows your relationship with money and material security, and how you build a sense of self-worth that doesn't depend on other people.",
    question: "What do I value, and what do I have?",
  },
  {
    number: 3, name: "3rd house", title: "House of Communication", kind: "cadent",
    themes: ["Communication", "Siblings", "Learning", "Short trips", "Neighbours"],
    summary: "The 3rd house governs everyday thinking and exchange: how you talk, learn, write and get around your local world. It also describes your early education and your relationships with siblings and neighbours.",
    question: "How do I think and communicate?",
  },
  {
    number: 4, name: "4th house", title: "House of Home", kind: "angular",
    themes: ["Home", "Family", "Roots", "Childhood", "Private life"],
    summary: "The 4th house sits at the base of the chart and describes your roots. It covers your home, family and childhood, the private self that only close people see, and what you need to feel that you belong.",
    question: "Where do I come from, and where do I feel at home?",
  },
  {
    number: 5, name: "5th house", title: "House of Joy", kind: "succedent",
    themes: ["Creativity", "Romance", "Children", "Play", "Self-expression"],
    summary: "The 5th house is the house of pleasure and creative self-expression. It covers romance and dating, children, hobbies and anything you do simply because it makes you feel alive.",
    question: "What brings me joy, and how do I express myself?",
  },
  {
    number: 6, name: "6th house", title: "House of Service", kind: "cadent",
    themes: ["Daily routine", "Work", "Health", "Service", "Habits"],
    summary: "The 6th house covers the daily practice of life: your work routines, health habits and the way you take care of other people. It's where astrology looks at the practical details that keep everything running.",
    question: "How do I work, and how do I look after myself?",
  },
  {
    number: 7, name: "7th house", title: "House of Partnership", kind: "angular",
    themes: ["Marriage", "Partnerships", "Contracts", "Close friends", "Open enemies"],
    summary: "The 7th house begins at the Descendant, the point opposite your Ascendant. It describes one-to-one relationships, including marriage, business partnerships and the qualities you look for in other people.",
    question: "How do I relate to others one-to-one?",
  },
  {
    number: 8, name: "8th house", title: "House of Transformation", kind: "succedent",
    themes: ["Shared money", "Intimacy", "Loss and rebirth", "Inheritance", "Psychology"],
    summary: "The 8th house deals with what is shared and what is hidden: joint finances, deep intimacy, loss and the changes that strip you back to what is real. It is the house of transformation.",
    question: "What do I share, and how do I change?",
  },
  {
    number: 9, name: "9th house", title: "House of Meaning", kind: "cadent",
    themes: ["Travel", "Higher education", "Philosophy", "Belief", "Publishing"],
    summary: "The 9th house looks outward to the wider world. It covers long journeys, higher learning, religion and philosophy, and the beliefs that give your life direction and meaning.",
    question: "What do I believe, and what do I want to explore?",
  },
  {
    number: 10, name: "10th house", title: "House of Career", kind: "angular",
    themes: ["Career", "Reputation", "Ambition", "Authority", "Public image"],
    summary: "The 10th house sits at the top of the chart, around the Midheaven. It describes your career, public reputation and the legacy you build, along with your relationship to authority and achievement.",
    question: "What do I want to achieve, and how am I seen?",
  },
  {
    number: 11, name: "11th house", title: "House of Community", kind: "succedent",
    themes: ["Friends", "Groups", "Hopes", "Networks", "Causes"],
    summary: "The 11th house covers friendship, communities and the goals you share with other people. It describes the groups you belong to and what you hope the future will hold.",
    question: "Who are my people, and what do I hope for?",
  },
  {
    number: 12, name: "12th house", title: "House of the Unconscious", kind: "cadent",
    themes: ["Solitude", "Subconscious", "Spirituality", "Endings", "Hidden strengths"],
    summary: "The 12th house is the most private part of the chart. It covers the unconscious, solitude, spirituality and anything that works behind the scenes, including hidden strengths and hidden fears.",
    question: "What is hidden, and what do I need to let go of?",
  },
];

export const kindText: Record<HouseKind, { label: string; text: string }> = {
  angular: {
    label: "Angular",
    text: "Angular houses (1st, 4th, 7th and 10th) sit on the four main points of the chart. Traditional astrology treats planets here as the most prominent and influential, because they sit on the chart's key points.",
  },
  succedent: {
    label: "Succedent",
    text: "Succedent houses (2nd, 5th, 8th and 11th) follow the angular houses and are about building, sustaining and securing what has been started. Astrologers read planets here as working steadily, with results that show over time.",
  },
  cadent: {
    label: "Cadent",
    text: "Cadent houses (3rd, 6th, 9th and 12th) come before the angular houses and are about learning, adjusting and preparing. Traditional astrology treats these as the least prominent houses, and planets here are read as working more quietly and adaptively than those in angular houses.",
  },
};
