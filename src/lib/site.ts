export const siteConfig = {
  name: "Skygram.ai",
  shortName: "Skygram",
  description:
    "Skygram.ai - astrology AI app. Decode your natal chart, discover compatibility with friends, and get daily insights based on your birth chart.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://skygram.ai").replace(/\/$/, ""),
  appUrl: (process.env.NEXT_PUBLIC_APP_URL || "https://app.skygram.ai").replace(/\/$/, ""),
  ogImage: "/og-image.png",
  twitter: "@skygram_ai",
};

/** Build an absolute URL into the main React app (sign up, sign in, calculator…). */
export const appLink = (path = "/") => `${siteConfig.appUrl}${path.startsWith("/") ? path : `/${path}`}`;

/** Build an absolute URL on this site (canonicals, sitemap). */
export const siteLink = (path = "/") => `${siteConfig.url}${path === "/" ? "" : path}`;
