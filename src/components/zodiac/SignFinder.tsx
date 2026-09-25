"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dateRange, glyphText, signForDate, signPath } from "@/lib/zodiac/meta";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS_IN = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const selectCls =
  "h-11 rounded-xl border border-input bg-secondary/40 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

export default function SignFinder() {
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const safeDay = Math.min(day, DAYS_IN[month - 1]);
  const sign = signForDate(month, safeDay);

  return (
    <div className="glass-card p-6">
      <h2 className="font-display text-xl font-semibold mb-1">What&apos;s my zodiac sign?</h2>
      <p className="text-sm text-muted-foreground mb-4">Pick your birthday to find your Sun sign.</p>
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <label className="sr-only" htmlFor="sf-month">Birth month</label>
        <select id="sf-month" className={selectCls} value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
        </select>
        <label className="sr-only" htmlFor="sf-day">Birth day</label>
        <select id="sf-day" className={selectCls} value={safeDay} onChange={(e) => setDay(Number(e.target.value))}>
          {Array.from({ length: DAYS_IN[month - 1] }, (_, i) => i + 1).map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <Link href={signPath(sign.slug)} className="group flex items-center gap-4 rounded-xl bg-secondary/40 px-4 py-3 hover:bg-secondary/60 transition-colors" aria-live="polite">
        <span className="font-display text-4xl text-accent leading-none" aria-hidden="true">{glyphText(sign)}</span>
        <span className="flex-1">
          <span className="block font-display font-semibold">You&apos;re a {sign.name}</span>
          <span className="block text-xs text-muted-foreground">{dateRange(sign)}</span>
        </span>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </Link>
      <p className="text-xs text-muted-foreground mt-3">Born on a cusp? Your exact Sun sign depends on your birth time and place — your full chart on Skygram settles it.</p>
    </div>
  );
}
