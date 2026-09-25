import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, UserCheck, Scale, AlertTriangle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Skygram.ai, the AI-powered astrology and compatibility app.",
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms of Service | Skygram.ai", description: "The terms that govern your use of Skygram.ai, the AI-powered astrology and compatibility app.", url: "/terms" },
};


export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Link>
      </Button>

      <h1 className="font-display text-3xl font-bold mb-2 gradient-text">Terms of Service</h1>
      <p className="text-muted-foreground mb-10 max-w-xl">
        The short version: be kind, have fun, and remember that the stars suggest — they don't dictate.
      </p>

      {/* Service Description */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">What Skygram Is</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed">
          Skygram provides astrology-based insights for <strong className="text-foreground">entertainment and self-reflection</strong>.
          We calculate natal charts and compatibility reports using astronomical data and traditional astrological frameworks.
          Our service is designed to inspire curiosity and conversation — not to replace professional advice of any kind.
        </p>
      </section>

      {/* User Responsibilities */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <UserCheck className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">Your Responsibilities</h2>
        </div>
        <ul className="space-y-2 text-foreground/80 text-sm">
          <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Provide accurate birth data for meaningful readings</li>
          <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Only add friends who you have a genuine connection with</li>
          <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Use the platform respectfully — no harassment, spam, or misuse</li>
          <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Keep your account credentials secure</li>
          <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Do not impersonate others or create accounts with false information</li>
        </ul>
      </section>

      {/* Intellectual Property */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">Intellectual Property</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed">
          The reports and readings generated for you are <strong className="text-foreground">yours to keep and share</strong> as you wish.
          Our scoring algorithms, methodology, branding, and platform design remain the intellectual property of Skygram.
          You may not reverse-engineer, scrape, or commercially redistribute our algorithm or scoring system.
        </p>
      </section>

      {/* Limitation of Liability */}
      <section className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">Limitation of Liability</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed">
          Astrology is <strong className="text-foreground">not professional advice</strong>. Skygram's readings should not be used
          as a substitute for medical, psychological, financial, or legal counsel. We provide the service "as is"
          and make no guarantees about the accuracy or applicability of astrological interpretations.
          We are not liable for decisions made based on our readings.
        </p>
      </section>

      {/* Account & Termination */}
      <section className="glass-card p-6 border border-accent/20">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-semibold">Account & Termination</h2>
        </div>
        <p className="text-foreground/80 leading-relaxed">
          You may delete your account at any time. We reserve the right to suspend or terminate accounts that
          violate these terms. Upon termination, your data will be deleted in accordance with our{" "}
          <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
        </p>
      </section>

      <p className="text-xs text-muted-foreground mt-8 text-center">Last updated: February 2026</p>
    </div>
  );
}
