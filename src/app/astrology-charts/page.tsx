import type { Metadata } from "next";
import GuidePage from "@/components/legacy/GuidePage";
import ExploreGrid from "@/components/legacy/ExploreGrid";
import { clipDescription, mustLoadLegacy } from "@/lib/legacy";
import { appLink } from "@/lib/site";

const page = mustLoadLegacy("guides", "astrology-charts");
const title = page.title;
const description = clipDescription(page.description);

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/astrology-charts" },
  openGraph: { type: "article", title, description, url: "/astrology-charts" },
  twitter: { title, description },
};

export default function AstrologyChartsPage() {
  return (
    <GuidePage
      page={page}
      crumbs={[{ name: "Home", path: "/" }, { name: "Astrology Charts", path: "/astrology-charts" }]}
      kicker="Natal · Synastry · Composite · Transits · Returns"
      title={<>Types of <span className="gradient-text">Astrology Charts</span></>}
      lead="Every astrology chart is a map of the sky for a moment and a place. What changes is the question: who you are, what happens between two people, or what's coming up. Here's what each chart is for and when to use it."
      after={<ExploreGrid current="/astrology-charts" />}
      cta={{
        title: "Start with your natal chart",
        body: "Every other chart builds on it. Skygram calculates yours for free, then compares it with friends' charts for synastry-based compatibility reports.",
        href: appLink("/register"),
      }}
      faqTitle="Astrology charts FAQ"
    />
  );
}
