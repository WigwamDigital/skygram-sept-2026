import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  // Content-heavy SEO pages use plain apostrophes/quotes in JSX text.
  { rules: { "react/no-unescaped-entities": "off" } },
  { ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"] },
];

export default config;
