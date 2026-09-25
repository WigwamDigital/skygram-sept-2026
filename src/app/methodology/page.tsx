import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Star, Orbit, Scale, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Methodology",
  description: "How Skygram calculates astrological compatibility — synastry aspects, planet weights, orb tightness and five-category scoring, explained transparently.",
  alternates: { canonical: "/methodology" },
  openGraph: { title: "Our Methodology | Skygram.ai", description: "How Skygram calculates astrological compatibility — synastry aspects, planet weights, orb tightness and five-category scoring, explained transparently.", url: "/methodology" },
};


const aspects = [
  { name: "Conjunction", angle: "0°", effect: "Context-dependent fusion", points: "−1 to +4", color: "text-accent" },
  { name: "Trine", angle: "120°", effect: "Natural harmony", points: "+1.5 to +2", color: "text-green-400" },
  { name: "Sextile", angle: "60°", effect: "Gentle support", points: "+2", color: "text-blue-400" },
  { name: "Opposition", angle: "180°", effect: "Polarity — can attract or repel", points: "−4 to +2", color: "text-orange-400" },
  { name: "Square", angle: "90°", effect: "Friction & growth", points: "−5 to −1", color: "text-red-400" },
  { name: "Quincunx", angle: "150°", effect: "Awkward adjustment", points: "−2", color: "text-purple-400" },
];

const planetTiers = [
  { tier: "Core (×3)", planets: "Sun, Moon, Venus, Mars, Ascendant", desc: "Shape identity, emotions, love & drive" },
  { tier: "Social (×2)", planets: "Mercury, Jupiter, Saturn", desc: "Communication, growth & commitment" },
  { tier: "Generational (×1)", planets: "Uranus, Neptune, Pluto, North Node", desc: "Deeper karmic & transformative themes" },
];

const relationshipMods = [
  { type: "Romantic", emphasis: "Venus–Mars ×2, Moon–Venus ×1.5, Moon–Sun ×1.8, Moon–Moon ×1.3, Venus–Venus emotional cross-bonus, geometric mean weights, sigmoid k=0.14 offset=3.5, diminishing returns per planet" },
  { type: "Friendship", emphasis: "Mercury–Jupiter ×2, Mercury–Mercury ×1.5, Sun–Sun ×1.5, Moon–Moon ×1.3, geometric mean weights, sigmoid k=0.10 offset=6.5, softened negatives 0.7×" },
  { type: "Business", emphasis: "Saturn–Mars boosted ×2, Mercury–Saturn ×1.5" },
  { type: "Family", emphasis: "Moon–Moon boosted ×2, Saturn–Node ×1.5" },
];

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Link>
      </Button>

      <h1 className="font-display text-3xl font-bold mb-2 gradient-text">Our Methodology</h1>
      <p className="text-muted-foreground mb-10 max-w-xl">
        How Skygram calculates compatibility — transparently, mathematically, and rooted in real astrological tradition.
      </p>

      {/* Philosophy */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">Philosophy</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed">
          Skygram uses a <strong className="text-foreground">deterministic synastry algorithm</strong> — not AI guesswork — to score compatibility.
          We compute the actual angular relationships (aspects) between every planet in two birth charts, weight them by astrological significance,
          and normalize the result into a realistic score. Unlike simplistic systems, we score each planet-pair combination individually:
          a Venus–Moon conjunction is deeply nurturing, while a Saturn–Moon conjunction carries restriction.
          No positivity bias, no inflated numbers — just the geometry of the sky at the moment you were born.
        </p>
      </section>

      {/* Aspects */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Orbit className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">Planetary Aspects</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-4">
          When two planets sit at a specific angular distance, they form an <em>aspect</em> — an energetic relationship.
          Unlike flat scoring systems, we evaluate each aspect <strong className="text-foreground">contextually</strong>:
          the same aspect type (e.g. conjunction) scores differently depending on which planets are involved.
          A Venus–Mars opposition is magnetic attraction (+2), while a Saturn–Moon opposition is controlling (−3).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {aspects.map((a) => (
            <div key={a.name} className="flex items-center justify-between bg-secondary/30 rounded-lg px-4 py-2.5">
              <div>
                <span className={`font-semibold ${a.color}`}>{a.name}</span>
                <span className="text-muted-foreground text-xs ml-2">{a.angle}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground mr-2">{a.effect}</span>
                <span className="font-mono text-sm font-semibold text-foreground">{a.points}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Planet Weights */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">Planet Weights</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Not all planetary contacts are equal. A Sun–Moon connection carries far more weight than a Neptune–Pluto one.
          We assign multipliers based on how personally significant each planet is.
        </p>
        <div className="space-y-2">
          {planetTiers.map((t) => (
            <div key={t.tier} className="bg-secondary/30 rounded-lg px-4 py-3">
              <p className="font-semibold text-foreground text-sm">{t.tier}</p>
              <p className="text-accent text-sm">{t.planets}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Orb Tightness */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">Orb Tightness</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed">
           An aspect doesn't have to be exact to count — there's some leeway called the <em>orb</em>.
           A trine at exactly 120° is much stronger than one at 127°. We use a <strong className="text-foreground">steep power curve</strong> (exponent 1.5)
           to scale each aspect's contribution: a tight orb carries nearly full weight, while wide-orb aspects contribute
           very little. Only tight, meaningful aspects drive your score. Luminaries (Sun & Moon) get a wider orb (up to 8°),
           personal planets up to 6°, and outer planets only 3°.
        </p>
      </section>

      {/* Relationship Modifiers */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-display text-xl font-semibold">Relationship-Type Modifiers</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Different kinds of relationships depend on different planetary energies. A romantic pairing cares most
          about Venus and Mars; a business partnership cares about Saturn and Mercury.
        </p>
        <div className="space-y-2">
          {relationshipMods.map((r) => (
            <div key={r.type} className="bg-secondary/30 rounded-lg px-4 py-2.5 flex items-start gap-3">
              <span className="font-semibold text-foreground text-sm min-w-[80px]">{r.type}</span>
              <span className="text-muted-foreground text-sm">{r.emphasis}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Five-Category Scoring */}
      <section className="glass-card p-6 mb-6">
        <h2 className="font-display text-xl font-semibold mb-3">Five-Category Scoring</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Instead of pooling all aspects into one sum (which lets one strong cluster dominate), we split the score into
          <strong className="text-foreground"> five independent dimensions</strong>. The final score (0–100) is the sum of all five.
          To score highly overall, you need strong contacts across <em>every</em> dimension — not just one.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          <strong className="text-foreground">Category weights vary by relationship type.</strong> For example, in friendship reports,
          Communication is weighted higher (up to 25) while Attraction & Values is weighted lower (up to 10), because what matters
          in a friendship is fundamentally different from a romance. Romantic reports use equal 20-point categories.
        </p>
        <div className="space-y-2">
          {[
            { cat: "Emotional Bond", planets: "Moon–Sun, Moon–Moon, Moon–Venus, Moon–Saturn, Moon–Neptune, Moon–ASC, Venus–Sun & Venus–Venus (cross-bonus)", desc: "Attachment, safety, feeling seen and understood" },
            { cat: "Chemistry & Attraction", planets: "Venus–Mars, Venus–Venus, Venus–Sun, Moon–Mars", desc: "Polarity, sexual pull, magnetic chemistry" },
            { cat: "Communication", planets: "Mercury, Mercury–Jupiter, Mercury–Sun, Moon–Mercury", desc: "Mental flow, conflict style, intellectual rapport" },
            { cat: "Stability & Growth", planets: "Saturn, Jupiter, North Node, Moon–Jupiter", desc: "Longevity, stress tolerance, structural durability" },
            { cat: "Life Direction & Identity", planets: "Sun, Ascendant, Element Harmony, Moon–Sun", desc: "Purpose, worldview, shared meaning" },
          ].map((c) => (
            <div key={c.cat} className="bg-secondary/30 rounded-lg px-4 py-3">
              <p className="font-semibold text-foreground text-sm">{c.cat}</p>
              <p className="text-accent text-sm">{c.planets}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{c.desc}</p>
            </div>
          ))}
        </div>
         <p className="text-foreground/80 leading-relaxed mt-4">
           Within each category, raw aspect points are passed through a <strong className="text-foreground">sigmoid function</strong> that
           maps them to the category's max range. For romantic reports, k=0.14 with offset=3.5 means a zero raw score
           maps to ~35% (not 50%), so categories need genuinely positive contacts to score well. Romantic reports
           use a <strong className="text-foreground">geometric mean</strong> for planet weight combinations instead of a sum,
           preventing any single high-weight pair from dominating a category.
         </p>
         <div className="bg-secondary/30 rounded-lg px-4 py-3 mt-4 border border-accent/10">
           <p className="font-semibold text-foreground text-sm mb-1">Diminishing Returns</p>
           <p className="text-muted-foreground text-sm">
             Instead of hard-capping the number of aspects per planet, we keep <strong className="text-foreground">all aspects</strong> but
             apply diminishing returns with <strong className="text-foreground">separate positive and negative ladders</strong>:
             positive aspects decay at [1.0×, 0.8×, 0.65×, 0.5×, 0.35×] while negative aspects use a softer
             ladder [0.7×, 0.55×, 0.45×, 0.35×, 0.25×]. This prevents negatives from disproportionately dominating.
             Each planet's total negative contribution is also capped at −8 raw points per category.
           </p>
         </div>
         <div className="bg-secondary/30 rounded-lg px-4 py-3 mt-2 border border-accent/10">
           <p className="font-semibold text-foreground text-sm mb-1">Generational Aspect Dampening</p>
           <p className="text-muted-foreground text-sm">
             Outer planets (Uranus, Neptune, Pluto) move slowly and create aspects shared by entire generations.
             When an outer planet aspects Mercury, its contribution to Communication is reduced to <strong className="text-foreground">0.4×</strong> and
             capped at ±2 raw points. Similarly, negative outer-planet contributions to Growth are halved.
             Per-category negative floors prevent any single category from being completely zeroed out.
           </p>
         </div>
      </section>

      {/* Friendship-Specific Adjustments */}
      <section className="glass-card p-6 mb-6">
        <h2 className="font-display text-xl font-semibold mb-3">Friendship-Specific Scoring</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Friendship compatibility uses adjusted scoring that reflects how planetary aspects manifest differently in non-romantic bonds:
        </p>
         <div className="space-y-2">
           <div className="bg-secondary/30 rounded-lg px-4 py-2.5">
             <p className="font-semibold text-foreground text-sm">Geometric mean weights & shifted sigmoid</p>
             <p className="text-muted-foreground text-sm">Like romantic, friendship uses √(w1×w2) instead of w1+w2, and the sigmoid baseline (k=0.10, offset=6.5) requires genuinely positive contacts to score well.</p>
           </div>
           <div className="bg-secondary/30 rounded-lg px-4 py-2.5">
             <p className="font-semibold text-foreground text-sm">Granular planet bonuses</p>
             <p className="text-muted-foreground text-sm">Mercury–Jupiter ×2 (intellectual spark), Mercury–Mercury ×1.5, Sun–Sun ×1.5, Moon–Moon ×1.3, Sun–Mercury/Jupiter ×1.3, Moon–Venus ×1.2. No blanket Moon or Sun boosts.</p>
           </div>
           <div className="bg-secondary/30 rounded-lg px-4 py-2.5">
             <p className="font-semibold text-foreground text-sm">Softened negatives (0.7×)</p>
             <p className="text-muted-foreground text-sm">Negative aspects retain 70% of their weight — squares between friends are less painful than in romance, but still meaningful.</p>
           </div>
         </div>
      </section>

      {/* Continuous improvement */}
      <section className="glass-card p-6 border border-accent/20">
        <h2 className="font-display text-xl font-semibold mb-3 text-accent">Continuous Improvement</h2>
        <p className="text-foreground/80 leading-relaxed">
          Our methodology is not static. We continuously refine our aspect weights, orb allowances,
          and relationship modifiers based on <strong className="text-foreground">user feedback</strong> and
          input from <strong className="text-foreground">certified professional astrologers</strong>.
          If something doesn't resonate, let us know — your experience shapes how Skygram evolves.
        </p>
      </section>
    </div>
  );
}
