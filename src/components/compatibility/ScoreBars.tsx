import { scoreLabels, type Pairing, type ScoreKey } from "@/lib/compatibility";

export default function ScoreBars({ scores }: { scores: Pairing["scores"] }) {
  return (
    <dl className="space-y-3 w-full">
      {(Object.keys(scoreLabels) as ScoreKey[]).map((k) => (
        <div key={k}>
          <div className="flex justify-between text-sm mb-1">
            <dt className="text-foreground/80">{scoreLabels[k]}</dt>
            <dd className="font-mono font-semibold">{scores[k]}</dd>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden" aria-hidden="true">
            <div className="h-full rounded-full bg-[image:var(--cta-gradient)]" style={{ width: `${scores[k]}%` }} />
          </div>
        </div>
      ))}
    </dl>
  );
}
