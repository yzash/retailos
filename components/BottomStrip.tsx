"use client";

import { useStore, totalCostSgd, totalInferences, avgCostSgd } from "@/lib/store";
import { formatSgd } from "@/lib/pricing";

export function BottomStrip() {
  const inferences = useStore((s) => totalInferences(s));
  const cumSgd = useStore((s) => totalCostSgd(s));
  const avg = useStore((s) => avgCostSgd(s));

  return (
    <footer
      className="hairline-t bg-white"
      style={{ height: 60 }}
      aria-label="Inference cost ticker"
    >
      <div className="grid h-full grid-cols-3 items-center px-6">
        <div className="flex items-center gap-2">
          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Inferences today
          </div>
          <div className="text-base font-semibold tabular-nums">
            {inferences.toLocaleString()}
          </div>
          <span className="text-emerald-600 text-xs" aria-hidden>↑</span>
        </div>
        <div className="flex flex-col items-center justify-center leading-tight">
          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Cumulative cost
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold tabular-nums">
              {formatSgd(cumSgd, 4)}
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              · AWS EC2 · 4th-Gen <span className="font-semibold text-charcoal">AMD EPYC</span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Avg / inference
          </div>
          <div className="text-base font-semibold tabular-nums">
            {formatSgd(avg, 4)}
          </div>
          <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-teal-700">
            &lt; S$0.001
          </span>
        </div>
      </div>
    </footer>
  );
}
