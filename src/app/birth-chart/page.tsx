import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Compass, Heart, MapPin, MessageCircle, Sparkles, Sun, Users } from "lucide-react";
import AstroNote from "@/components/AstroNote";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ExploreGrid from "@/components/legacy/ExploreGrid";
import { Button } from "@/components/ui/button";
import { appLink, siteConfig, siteLink } from "@/lib/site";

const title = "Free Birth Chart Calculator & Personality Reading";
const description =
  "Get your free birth chart (natal chart) with Sun, Moon and Rising signs, every planet, house and aspect, plus an AI-written personality reading. Just enter your birth date, time and place.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["free birth chart", "birth chart calculator", "natal chart", "free natal chart reading", "birth chart reading"],
  alternates: { canonical: "/birth-chart" },
  openGraph: { title, description, url: "/birth-chart" },
  twitter: { title, description },
};

const inChart = [
  { icon: Sun, title: "Sun, Moon & Rising", body: "Your big three: core identity, emotional needs and the way you meet the world.", href: "/zodiac" },
  { icon: Sparkles, title: "Every planet by sign", body: "Mercury to Pluto, and how each one expresses itself through its sign.", href: "/planets" },
  { icon: Compass, title: "The 12 houses", body: "Which areas of life each planet lights up, from money and home to career.", href: "/houses" },
  { icon: MessageCircle, title: "Aspects", body: "The angles between planets: where your chart flows and where it pulls.", href: "/aspects" },
];

const needs = [
  { icon: CalendarDays, title: "Birth date", body: "Sets the positions of the Sun and every planet." },
  { icon: Clock, title: "Birth time", body: "Sets your Rising sign and houses. Aim for the minute; a birth certificate is best." },
  { icon: MapPin, title: "Birth place", body: "Town or city, so the chart uses the right horizon and time zone." },
];

const readSteps = [
  { t: "Start with the big three", d: "Read your Sun, Moon and Rising sign together. They explain most of what people notice about you." },
  { t: "Look for emphasis", d: "Several planets in one sign, element or house point to a dominant theme in your life." },
  { t: "Read the personal planets", d: "Mercury (mind), Venus (love) and Mars (drive) describe everyday personality." },
  { t: "Check the tight aspects", d: "Aspects within 1–3° are the loudest dialogues in your chart. Start with those." },
  { t: "Add timing", d: "Transits and returns show when parts of your chart get activated. That's where astrology becomes practical." },
];

const features = [
  { icon: Sparkles, title: "AI personality reading", body: "A plain-English report on your chart, written for your placements rather than your Sun sign alone." },
  { icon: Users, title: "Compatibility with friends", body: "Add friends and compare full charts for romantic, friendship, work and family compatibility reports." },
  { icon: Heart, title: "Daily insights", body: "A short daily reading based on today's sky and your own chart." },
];

const faqs = [
  {
    q: "Is the birth chart really free?",
    a: "Yes. Creating a Skygram account and generating your natal chart and personal reading is free, with no credit card required.",
  },
  {
    q: "How accurate is a birth chart?",
    a: "The planet positions are calculated from astronomical data and are precise to a fraction of a degree. The chart is only as accurate as your birth time, though: a time that's off by an hour can change your Rising sign and houses. The interpretation is astrology, a symbolic tradition, so treat it as a tool for reflection rather than prediction.",
  },
  {
    q: "What if I don't know my exact birth time?",
    a: "You can still get your Sun sign, most of your Moon sign and all planet-to-planet aspects. Your Rising sign and houses need a birth time, so check your birth certificate, hospital records or ask family members. An approximate time is better than none.",
  },
  {
    q: "How quickly will I get my birth chart?",
    a: "Instantly. The chart is calculated as soon as you enter your birth details, and your personal reading is generated right after.",
  },
  {
    q: "What's the difference between a birth chart and a natal chart?",
    a: "Nothing: they're two names for the same thing, a map of where the planets were at the exact moment and place you were born.",
  },
  {
    q: "Is my personal information safe?",
    a: "Your birth data is used to calculate your chart and reports. You control whether your profile is public, and you can read exactly how data is handled in our privacy policy.",
  },
];

export default function BirthChartPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${siteConfig.name} Birth Chart Calculator`,
    url: siteLink("/birth-chart"),
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <JsonLd data={appLd} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Free Birth Chart", path: "/birth-chart" }]} />

      <header className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Free natal chart · Instant · No card needed</p>
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          Your <span className="gradient-text">Free Birth Chart</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-7">
          The exact moment you were born, mapped: your Sun, Moon and Rising signs, every planet, house and aspect, and an
          AI-written reading that explains what it all means for you.
        </p>
        <Button variant="cta" size="lg" className="h-auto min-h-12 whitespace-normal py-3" asChild>
          <a href={appLink("/register")}>
            Calculate my birth chart <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
        <p className="text-xs text-muted-foreground mt-3">Takes about a minute. You&apos;ll need your birth date, time and place.</p>
      </header>

      <section className="mb-12" aria-labelledby="in-h">
        <h2 id="in-h" className="font-display text-2xl font-semibold mb-4 text-center">What&apos;s in your birth chart</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {inChart.map((c) => (
            <Link key={c.title} href={c.href} className="glass-card p-5 hover:-translate-y-0.5 hover:border-primary/40 transition-all">
              <c.icon className="w-6 h-6 text-accent mb-3" aria-hidden="true" />
              <h3 className="font-display font-semibold mb-1">{c.title}</h3>
              <p className="text-sm text-foreground/75">{c.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6 mb-12">
        <section className="glass-card p-6" aria-labelledby="need-h">
          <h2 id="need-h" className="font-display text-2xl font-semibold mb-4">What you need</h2>
          <ul className="space-y-4">
            {needs.map((n) => (
              <li key={n.title} className="flex gap-3">
                <n.icon className="w-5 h-5 mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <span className="block font-medium">{n.title}</span>
                  <span className="block text-sm text-foreground/75">{n.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="glass-card p-6" aria-labelledby="why-h">
          <h2 id="why-h" className="font-display text-2xl font-semibold mb-4">Why go beyond your Sun sign</h2>
          <div className="space-y-3 text-foreground/80 leading-relaxed">
            <p>
              Your Sun sign is one planet out of ten. Two people born on the same day can feel completely different because
              their Moon, Rising sign and planet placements differ, and those depend on the exact time and place of birth.
            </p>
            <p>
              A birth chart shows the whole pattern: the parts of you that cooperate easily, the parts that pull against each
              other, and the areas of life where each theme plays out. It&apos;s the foundation for every other kind of
              astrology, from <Link href="/compatibility" className="text-accent hover:underline underline-offset-4">compatibility</Link>{" "}
              to <Link href="/astrology-charts" className="text-accent hover:underline underline-offset-4">transits and returns</Link>.
            </p>
          </div>
        </section>
      </div>

      <section className="mb-12" aria-labelledby="read-h">
        <h2 id="read-h" className="font-display text-2xl font-semibold mb-4 text-center">How to read your chart</h2>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {readSteps.map((s, i) => (
            <li key={s.t} className="glass-card p-5">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display font-semibold mt-1 mb-1">{s.t}</h3>
              <p className="text-sm text-foreground/75">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12" aria-labelledby="get-h">
        <h2 id="get-h" className="font-display text-2xl font-semibold mb-4 text-center">What you get on Skygram</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-5">
              <f.icon className="w-6 h-6 text-accent mb-3" aria-hidden="true" />
              <h3 className="font-display font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-foreground/75">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-3xl mx-auto">
        <CtaBanner title="Ready to see your chart?" body="Enter your birth details and get your full natal chart and personal reading in about a minute. Free." cta="Get my free birth chart" />
        <Faq items={faqs} title="Birth chart FAQ" />
        <ExploreGrid />
        <AstroNote />
      </div>
    </div>
  );
}
