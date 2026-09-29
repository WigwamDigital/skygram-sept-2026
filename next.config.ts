import path from "node:path";
import type { NextConfig } from "next";

const SIGNS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
];

/** 301 reverse-order compatibility URLs (e.g. leo-and-aries → aries-and-leo) to the canonical page. */
const reversePairRedirects = SIGNS.flatMap((a, i) =>
  SIGNS.slice(i + 1).map((b) => ({
    source: `/compatibility/${b}-and-${a}`,
    destination: `/compatibility/${a}-and-${b}`,
    permanent: true,
  })),
);

/** Common alternative spellings for placement URLs → canonical pages. */
const placementRedirects = SIGNS.flatMap((s) => [
  { source: `/placements/sun-in-${s}`, destination: `/zodiac/${s}`, permanent: true },
  { source: `/placements/rising-in-${s}`, destination: `/placements/${s}-rising`, permanent: true },
  { source: `/placements/${s}-ascendant`, destination: `/placements/${s}-rising`, permanent: true },
]);

const PLANETS = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];
const ordinal = (n: number) => `${n}${n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th"}`;

/**
 * Old skygram.ai URL patterns → new URLs. Keeps rankings and backlinks from the previous site.
 * Old site: /signs/{sign}, /houses/{n}; a few one-off pages; and aspect links that used
 * "conjunction"/"opposition" in the slug (they 404'd on the old site but were linked internally).
 */
const legacyRedirects = [
  { source: "/signs/sample", destination: "/zodiac/aries", permanent: true },
  { source: "/signs", destination: "/zodiac", permanent: true },
  { source: "/signs/:sign", destination: "/zodiac/:sign", permanent: true },
  ...Array.from({ length: 12 }, (_, i) => ({
    source: `/houses/${i + 1}`,
    destination: `/houses/${ordinal(i + 1)}-house`,
    permanent: true,
  })),
  { source: "/compatibility/types", destination: "/astrology-charts", permanent: true },
  { source: "/compatibility/sample", destination: "/compatibility/aries-and-aquarius", permanent: true },
  { source: "/compatibility/zodiac-signs", destination: "/compatibility", permanent: true },
  ...["fire", "earth", "air", "water"].map((e) => ({ source: `/elements/${e}`, destination: `/elements/${e}-signs`, permanent: true })),
  ...PLANETS.flatMap((a) =>
    PLANETS.flatMap((b) => [
      { source: `/aspects/${a}-conjunction-${b}`, destination: `/aspects/${a}-conjunct-${b}`, permanent: true },
      { source: `/aspects/${a}-opposition-${b}`, destination: `/aspects/${a}-opposite-${b}`, permanent: true },
    ]),
  ),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the project root so Next doesn't pick up a parent folder's lockfile.
  turbopack: { root: path.join(__dirname) },
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [...legacyRedirects, ...reversePairRedirects, ...placementRedirects];
  },
};

export default nextConfig;
