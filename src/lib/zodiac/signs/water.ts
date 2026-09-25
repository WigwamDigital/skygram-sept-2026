import type { ZodiacSign } from "../types";

export const cancer: ZodiacSign = {
  slug: "cancer",
  name: "Cancer",
  glyph: "♋",
  symbol: "The Crab",
  start: [6, 21],
  end: [7, 22],
  element: "Water",
  modality: "Cardinal",
  ruler: "Moon",
  house: 4,
  opposite: "capricorn",
  keywords: ["Nurturing", "Intuitive", "Loyal", "Protective", "Emotional", "Home-loving"],
  tagline: "Intuitive, nurturing and fiercely protective of the people they love.",
  overview: [
    "Cancer is the cardinal water sign ruled by the Moon, and it begins at the summer solstice. Like the Crab with its protective shell, Cancerians have a tough exterior that guards an incredibly tender, caring heart.",
    "They are deeply intuitive and emotionally intelligent, often sensing what others need before a word is said. Home, family and belonging are central to their happiness, and they create safe, welcoming spaces wherever they go.",
    "The Cancer lesson is emotional boundaries. Their sensitivity lets them feel everything, including other people's moods, and they can retreat into their shell when hurt. When they learn to express needs directly, their care becomes a source of strength rather than exhaustion.",
  ],
  strengths: [
    "Deeply caring and nurturing",
    "Strong intuition and emotional intelligence",
    "Loyal and protective of loved ones",
    "Creates warm, welcoming environments",
    "Remembers what matters to people",
  ],
  challenges: [
    "Moodiness that shifts with circumstances",
    "Taking things personally",
    "Retreating instead of addressing conflict",
    "Holding on to the past",
  ],
  love: [
    "Cancer loves deeply and seeks emotional security above all. They show affection through care: home-cooked meals, thoughtful check-ins and making their partner feel truly at home.",
    "They need a partner who is patient, consistent and emotionally open. Once they feel safe, Cancer is one of the most devoted, romantic and nurturing partners in the zodiac.",
  ],
  friendship:
    "Cancer friends are the ones who feel like family. They remember the details of your life, show up with soup when you're sick and hold long-standing friendships close. They value emotional honesty and a small, trusted circle.",
  career:
    "Cancer thrives in roles centred on care, protection and community. Their intuition makes them excellent at reading people, and they do best in supportive environments where they feel valued and emotionally safe.",
  careerPaths: ["Nursing & caregiving", "Psychology & counselling", "Hospitality", "Early education", "Real estate", "Social work"],
  bestMatches: ["scorpio", "pisces", "taurus", "virgo"],
  challengingMatches: ["aries", "libra"],
};

export const scorpio: ZodiacSign = {
  slug: "scorpio",
  name: "Scorpio",
  glyph: "♏",
  symbol: "The Scorpion",
  start: [10, 23],
  end: [11, 21],
  element: "Water",
  modality: "Fixed",
  ruler: "Pluto",
  traditionalRuler: "Mars",
  house: 8,
  opposite: "taurus",
  keywords: ["Intense", "Passionate", "Perceptive", "Loyal", "Resourceful", "Transformative"],
  tagline: "Intense, perceptive and transformative — nothing about Scorpio is surface-level.",
  overview: [
    "Scorpio is the fixed water sign ruled by Pluto (and traditionally by Mars). It is the sign of depth, transformation and emotional truth. Scorpios are drawn to what lies beneath the surface — in people, in situations and in themselves.",
    "They are passionate, perceptive and fiercely loyal. Scorpios read people with uncanny accuracy and aren't afraid of the intense conversations others avoid. Their focus and resourcefulness make them formidable when they commit to something.",
    "The Scorpio lesson is trust and release. Their protective instincts can show up as secrecy, control or holding on to old hurts. When Scorpio learns to let go, they embody the sign's greatest gift: the ability to transform and rise renewed.",
  ],
  strengths: [
    "Emotionally deep and passionate",
    "Highly perceptive and intuitive",
    "Intensely loyal and protective",
    "Resourceful and determined",
    "Unafraid of difficult truths",
  ],
  challenges: [
    "Jealousy and possessiveness",
    "Secretiveness or difficulty trusting",
    "Holding grudges",
    "All-or-nothing thinking",
  ],
  love: [
    "Scorpio doesn't do casual when it comes to the heart. They seek soul-level connection, emotional honesty and intense loyalty. Once they commit, they are all in — passionate, devoted and fiercely protective.",
    "Trust is everything. A partner who is honest, emotionally brave and comfortable with depth will discover a Scorpio's softer, deeply tender side that few others ever see.",
  ],
  friendship:
    "Scorpio has a few close friends rather than many acquaintances. They're the friend who keeps your secrets, sees through anyone who wrongs you and tells you the truth even when it's hard. Loyalty is the currency of their friendships.",
  career:
    "Scorpio excels in roles that require focus, investigation and emotional resilience. They're drawn to work that uncovers hidden truths or helps people through transformation. Give them a mystery to solve and they won't stop until it's cracked.",
  careerPaths: ["Psychology & therapy", "Investigative research", "Surgery & medicine", "Finance & investment", "Forensics", "Crisis management"],
  bestMatches: ["cancer", "pisces", "virgo", "capricorn"],
  challengingMatches: ["leo", "aquarius"],
};

export const pisces: ZodiacSign = {
  slug: "pisces",
  name: "Pisces",
  glyph: "♓",
  symbol: "The Fish",
  start: [2, 19],
  end: [3, 20],
  element: "Water",
  modality: "Mutable",
  ruler: "Neptune",
  traditionalRuler: "Jupiter",
  house: 12,
  opposite: "virgo",
  keywords: ["Compassionate", "Imaginative", "Intuitive", "Artistic", "Gentle", "Empathetic"],
  tagline: "Compassionate, imaginative and deeply intuitive — the zodiac's dreamer.",
  overview: [
    "Pisces is the mutable water sign ruled by Neptune (and traditionally by Jupiter). As the last sign of the zodiac, Pisces carries a little of every sign before it, which gives it remarkable empathy and a sense of connection to something larger.",
    "Pisceans are imaginative, gentle and deeply intuitive. They feel what others feel, often express themselves best through art, music or story, and have a natural compassion that makes people feel understood without explanation.",
    "The Pisces lesson is grounding. Their sensitivity and idealism can lead them to escape into daydreams or absorb other people's problems. With healthy boundaries and practical routines, their vision and empathy become a real force for healing.",
  ],
  strengths: [
    "Deep compassion and empathy",
    "Rich imagination and creativity",
    "Strong intuition",
    "Gentle, accepting and non-judgemental",
    "Adaptable and emotionally generous",
  ],
  challenges: [
    "Escapism when life feels overwhelming",
    "Difficulty setting boundaries",
    "Idealising people or situations",
    "Indecision and avoidance",
  ],
  love: [
    "Pisces is the zodiac's great romantic. They love with their whole heart and dream of a soulmate connection built on tenderness, creativity and emotional understanding.",
    "They need a partner who is kind, emotionally present and gently grounding. With someone who honours their sensitivity, Pisces is an endlessly affectionate, devoted and imaginative partner.",
  ],
  friendship:
    "Pisces friends are the best listeners you'll ever have. They're supportive, non-judgemental and often the first person people confide in. They value friends who are kind, creative and willing to share both laughter and feelings.",
  career:
    "Pisces thrives where creativity, compassion and intuition are valued. They excel in the arts and in healing professions. Rigid, highly competitive environments drain them; purpose-driven work with room for imagination lets them flourish.",
  careerPaths: ["Music & film", "Art & illustration", "Therapy & healing arts", "Nonprofit & charity work", "Photography", "Spiritual coaching"],
  bestMatches: ["cancer", "scorpio", "taurus", "capricorn"],
  challengingMatches: ["gemini", "sagittarius"],
};
