import Link from "next/link";
import { Sparkles, Users, Star, ArrowRight } from "lucide-react";
import SignCard from "@/components/zodiac/SignCard";
import { signs } from "@/lib/zodiac";
import { Button } from "@/components/ui/button";
import { appLink, siteConfig } from "@/lib/site";

const features = [
  { icon: Sparkles, title: "Natal Chart", desc: "Discover your planetary positions, houses, and aspects." },
  { icon: Users, title: "Compatibility", desc: "AI-powered synastry reports with friends." },
  { icon: Star, title: "Daily Insights", desc: "Personalized horoscope based on your birth chart." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="flex items-center justify-center px-4 py-20 sm:py-28">
        <div className="max-w-2xl text-center">
          <span className="text-5xl mb-4 block" aria-hidden="true">🔭</span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Skygram</span>
            <span className="text-muted-foreground">.ai</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Decode the stars. Understand your connections. AI-powered astrology for the modern soul.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="cta" size="lg" asChild>
              <a href={appLink("/register")}>
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <a href={appLink("/login")}>Sign In</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 pb-20" aria-label="Features">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-6 text-center">
              <f.icon className="w-8 h-8 text-accent mx-auto mb-3" aria-hidden="true" />
              <h2 className="font-display font-semibold mb-1">{f.title}</h2>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zodiac signs */}
      <section className="px-4 pb-20" aria-labelledby="signs-heading">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 id="signs-heading" className="font-display text-3xl font-bold mb-2">
              Explore the <span className="gradient-text">zodiac</span>
            </h2>
            <p className="text-muted-foreground">Traits, love style and best matches for every sign.</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {signs.map((s) => (
              <SignCard key={s.slug} sign={s} compact />
            ))}
          </div>
          <p className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
            <Link href="/zodiac" className="text-sm text-accent hover:underline underline-offset-4">
              All about the 12 zodiac signs →
            </Link>
            <Link href="/compatibility" className="text-sm text-accent hover:underline underline-offset-4">
              Zodiac compatibility chart →
            </Link>
            <Link href="/placements" className="text-sm text-accent hover:underline underline-offset-4">
              Moon, Venus &amp; Rising signs →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
