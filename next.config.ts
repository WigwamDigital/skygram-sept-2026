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

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the project root so Next doesn't pick up a parent folder's lockfile.
  turbopack: { root: path.join(__dirname) },
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [...reversePairRedirects, ...placementRedirects];
  },
};

export default nextConfig;
