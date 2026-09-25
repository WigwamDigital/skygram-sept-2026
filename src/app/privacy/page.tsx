import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Eye, Cookie, Database, Trash2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Skygram.ai protects your birth data: encryption, what others can see, cookies, data retention and deletion.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy Policy | Skygram.ai", description: "How Skygram.ai protects your birth data: encryption, what others can see, cookies, data retention and deletion.", url: "/privacy" },
};


export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Link>
      </Button>

      <h1 className="font-display text-3xl font-bold mb-2 gradient-text">Privacy Policy</h1>
      <p className="text-muted-foreground mb-10 max-w-xl">
        Your data is yours. Here's exactly how we handle it.
      </p>

      {/* Data Safety */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">Data Safety</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed">
          All data is <strong className="text-foreground">encrypted in transit</strong> using TLS and{" "}
          <strong className="text-foreground">encrypted at rest</strong> in our database. Your birth data is stored
          securely and is <strong className="text-foreground">never shared with third parties</strong>, advertisers,
          or data brokers — under any circumstances.
        </p>
      </section>

      {/* Birth Data Privacy */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">Birth Data Privacy</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-3">
          We know birth data is sensitive. Here's exactly what others can see:
        </p>
        <div className="space-y-2">
          <div className="bg-secondary/30 rounded-lg px-4 py-3">
            <p className="font-semibold text-foreground text-sm">Friends</p>
            <p className="text-muted-foreground text-sm">Can see your birth <em>date</em> and sun sign. <strong className="text-foreground">Never</strong> your birth time or birth place.</p>
          </div>
          <div className="bg-secondary/30 rounded-lg px-4 py-3">
            <p className="font-semibold text-foreground text-sm">Non-friends</p>
            <p className="text-muted-foreground text-sm">Can only see your sun sign on your public profile (if enabled). Nothing else.</p>
          </div>
          <div className="bg-secondary/30 rounded-lg px-4 py-3">
            <p className="font-semibold text-foreground text-sm">Skygram team</p>
            <p className="text-muted-foreground text-sm">We never manually access individual birth data. It's used exclusively by our algorithms to generate your readings.</p>
          </div>
        </div>
      </section>

      {/* No Tracking */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Cookie className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">No Tracking, No Cookies</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed">
          Skygram does <strong className="text-foreground">not use marketing cookies</strong>, analytics trackers,
          or any form of behavioral tracking. We don't monitor your clicks, browsing patterns, or activity within the app.
          We don't build advertising profiles. We don't sell or share your usage data with anyone.
          The only cookies we use are strictly necessary for keeping you logged in.
        </p>
      </section>

      {/* What We Store */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">What We Store</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed mb-3">
          We store only what's needed to generate your astrological readings:
        </p>
        <ul className="space-y-1.5 text-foreground/80 text-sm">
          <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Your email address (for authentication)</li>
          <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Birth date, time, and location (for chart calculation)</li>
          <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Your natal chart (computed from birth data)</li>
          <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Reports and horoscopes you generate</li>
          <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Your friends list and compatibility reports</li>
        </ul>
        <p className="text-foreground/80 leading-relaxed mt-3">
          That's it. No browsing history, no device fingerprints, no location tracking.
        </p>
      </section>

      {/* Romantic Privacy */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-pink-400" />
          <h2 className="font-display text-xl font-semibold">Romantic Report Privacy</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed">
          Romantic compatibility reports are <strong className="text-foreground">completely private</strong>.
          If you generate a romantic report about someone, they will <strong className="text-foreground">never know</strong> — 
          they cannot see it, and there is no notification. Both parties must independently create a romantic report
          to see their own version. Other report types (Friendship, Business, Family) remain visible to both parties.
        </p>
      </section>

      {/* Data Deletion */}
      <section className="glass-card p-6 border border-accent/20">
        <div className="flex items-center gap-2 mb-3">
          <Trash2 className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">Data Deletion</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed">
          You can request complete deletion of your account and all associated data at any time.
          Contact us and we'll remove everything — your profile, birth data, charts, reports, and friendships.
          No questions asked, no data retained.
        </p>
      </section>

      <p className="text-xs text-muted-foreground mt-8 text-center">Last updated: February 2026</p>
    </div>
  );
}
