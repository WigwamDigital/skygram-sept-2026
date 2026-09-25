"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pairPath, signMeta as signs } from "@/lib/zodiac/meta";
import type { SignSlug } from "@/lib/zodiac/types";

const selectCls =
  "h-11 w-full rounded-xl border border-input bg-secondary/40 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

export default function PairPicker({ initialA = "aries", initialB = "leo" }: { initialA?: SignSlug; initialB?: SignSlug }) {
  const [a, setA] = useState<SignSlug>(initialA);
  const [b, setB] = useState<SignSlug>(initialB);

  return (
    <div className="glass-card p-6">
      <h2 className="font-display text-xl font-semibold mb-1">Check two signs</h2>
      <p className="text-sm text-muted-foreground mb-4">Pick your sign and theirs.</p>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 mb-4">
        <label className="sr-only" htmlFor="pp-a">Your sign</label>
        <select id="pp-a" className={selectCls} value={a} onChange={(e) => setA(e.target.value as SignSlug)}>
          {signs.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select>
        <Heart className="w-4 h-4 text-pink-cta" aria-hidden="true" />
        <label className="sr-only" htmlFor="pp-b">Their sign</label>
        <select id="pp-b" className={selectCls} value={b} onChange={(e) => setB(e.target.value as SignSlug)}>
          {signs.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select>
      </div>
      <Button variant="cta" className="w-full" asChild>
        <Link href={pairPath(a, b)}>
          See compatibility <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
}
