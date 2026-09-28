import type { Metadata } from "next";
import GuidePage from "@/components/legacy/GuidePage";
import ExploreGrid from "@/components/legacy/ExploreGrid";
import { clipDescription, mustLoadLegacy } from "@/lib/legacy";

const page = mustLoadLegacy("guides", "astrology");
const title = page.title;
const description = clipDescription(page.description);

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/astrology" },
  openGraph: { type: "article", title, description, url: "/astrology" },
  twitter: { title, description },
};

export default function AstrologyGuidePage() {
  return (
    <GuidePage
      page={page}
      crumbs={[{ name: "Home", path: "/" }, { name: "Astrology", path: "/astrology" }]}
      kicker="Beginner's guide"
      title={<>What Is <span className="gradient-text">Astrology</span>?</>}
      lead={page.summary}
      after={<ExploreGrid current="/astrology" />}
      faqTitle="Astrology FAQ"
    />
  );
}
