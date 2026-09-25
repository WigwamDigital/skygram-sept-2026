import type { MetadataRoute } from "next";
import { siteLink } from "@/lib/site";
import { signPath, signs } from "@/lib/zodiac";
import { pairPath, pairings } from "@/lib/compatibility";
import { placementPath, placements, pointPath, points } from "@/lib/placements";

// All prerendered routes. Add new SSG collections (e.g. compatibility pairs) here.
const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/zodiac", changeFrequency: "monthly", priority: 0.9 },
  ...signs.map((s) => ({ path: signPath(s.slug), changeFrequency: "monthly" as const, priority: 0.8 })),
  { path: "/compatibility", changeFrequency: "monthly", priority: 0.9 },
  ...pairings.map((p) => ({ path: pairPath(p.a.slug, p.b.slug), changeFrequency: "monthly" as const, priority: 0.7 })),
  { path: "/placements", changeFrequency: "monthly", priority: 0.9 },
  ...points.map((p) => ({ path: pointPath(p.slug), changeFrequency: "monthly" as const, priority: 0.8 })),
  ...placements.map((p) => ({ path: placementPath(p.point.slug, p.sign.slug), changeFrequency: "monthly" as const, priority: 0.7 })),
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
