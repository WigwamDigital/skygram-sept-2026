import type { MetadataRoute } from "next";
import { siteLink } from "@/lib/site";
import { signPath, signs } from "@/lib/zodiac";
import { pairPath, pairings } from "@/lib/compatibility";
import { birthdayDates, datePath, monthNumbers, monthPath } from "@/lib/birthday";
import { sunMoonPath, sunMoons } from "@/lib/sunmoon";
import { housePath, houseNumbers, planetHousePath, planetInHouses } from "@/lib/houses";
import { placementPath, placements, pointPath, points } from "@/lib/placements";
import { aspectTypePath, aspectTypes, aspects, pathOf } from "@/lib/aspects";
import { planetPath, planets } from "@/lib/planets";
import { elementSlugs } from "@/lib/elements";
import { relationshipTypePath, relationshipTypes } from "@/lib/compatibility/types";

// All prerendered routes. Add new SSG collections (e.g. compatibility pairs) here.
const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/zodiac", changeFrequency: "monthly", priority: 0.9 },
  ...signs.map((s) => ({ path: signPath(s.slug), changeFrequency: "monthly" as const, priority: 0.8 })),
  { path: "/compatibility", changeFrequency: "monthly", priority: 0.9 },
  ...relationshipTypes.map((t) => ({ path: relationshipTypePath(t.slug), changeFrequency: "monthly" as const, priority: 0.8 })),
  ...pairings.map((p) => ({ path: pairPath(p.a.slug, p.b.slug), changeFrequency: "monthly" as const, priority: 0.7 })),
  { path: "/placements", changeFrequency: "monthly", priority: 0.9 },
  ...points.map((p) => ({ path: pointPath(p.slug), changeFrequency: "monthly" as const, priority: 0.8 })),
  ...placements.map((p) => ({ path: placementPath(p.point.slug, p.sign.slug), changeFrequency: "monthly" as const, priority: 0.7 })),
  { path: "/birthday", changeFrequency: "monthly", priority: 0.9 },
  ...monthNumbers.map((m) => ({ path: monthPath(m), changeFrequency: "monthly" as const, priority: 0.7 })),
  ...birthdayDates.map((d) => ({ path: datePath(d.month, d.day), changeFrequency: "monthly" as const, priority: 0.6 })),
  { path: "/sun-moon", changeFrequency: "monthly", priority: 0.9 },
  ...sunMoons.map((c) => ({ path: sunMoonPath(c.sun.slug, c.moon.slug), changeFrequency: "monthly" as const, priority: 0.7 })),
  { path: "/houses", changeFrequency: "monthly", priority: 0.9 },
  ...houseNumbers.map((n) => ({ path: housePath(n), changeFrequency: "monthly" as const, priority: 0.8 })),
  ...planetInHouses.map((p) => ({ path: planetHousePath(p.planet.slug, p.house.number), changeFrequency: "monthly" as const, priority: 0.7 })),
  { path: "/aspects", changeFrequency: "monthly", priority: 0.9 },
  ...aspectTypes.map((t) => ({ path: aspectTypePath(t.slug), changeFrequency: "monthly" as const, priority: 0.8 })),
  ...aspects.map((x) => ({ path: pathOf(x), changeFrequency: "monthly" as const, priority: 0.6 })),
  { path: "/planets", changeFrequency: "monthly", priority: 0.9 },
  ...planets.map((p) => ({ path: planetPath(p.slug), changeFrequency: "monthly" as const, priority: 0.8 })),
  { path: "/birth-chart", changeFrequency: "monthly", priority: 0.9 },
  { path: "/astrology", changeFrequency: "monthly", priority: 0.8 },
  { path: "/astrology-charts", changeFrequency: "monthly", priority: 0.8 },
  { path: "/elements", changeFrequency: "monthly", priority: 0.8 },
  ...elementSlugs.map((slug) => ({ path: `/elements/${slug}`, changeFrequency: "monthly" as const, priority: slug.endsWith("-signs") ? 0.7 : 0.6 })),
  { path: "/methodology", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return staticRoutes.map((r) => ({
    url: siteLink(r.path),
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
