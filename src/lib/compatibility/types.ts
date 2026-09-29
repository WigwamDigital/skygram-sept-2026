/** Relationship-type guides migrated from the old /compatibility/{type} pages. */
export type RelationshipType = "romantic" | "friendship" | "work" | "family";

export const relationshipTypes: { slug: RelationshipType; label: string; short: string; blurb: string }[] = [
  { slug: "romantic", label: "Romantic", short: "Love & romance", blurb: "Attraction, attachment, trust and how a relationship lasts." },
  { slug: "friendship", label: "Friendship", short: "Friendship", blurb: "Shared humour, loyalty, timing and group dynamics." },
  { slug: "work", label: "Work", short: "Work & career", blurb: "Collaboration, decision-making, pace and leadership." },
  { slug: "family", label: "Family", short: "Family", blurb: "Parents and children, siblings and the home system." },
];

export const relationshipTypePath = (t: RelationshipType) => `/compatibility/${t}`;
