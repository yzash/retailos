"use client";

import { pricingExperiments } from "@/data/seed";
import { useStore } from "@/lib/store";

export function PricingCard() {
  const loopT = useStore((s) => s.loopT);
  // PRD §6: Pricing Agent posts at 0:55 — bump the lead row to look freshly fired.
  const fired = loopT >= 55;
  return (
    <article className="hairline rounded-xl bg-white p-5" aria-label="Pricing">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">Pricing</h3>
        <div className="text-[11px] text-slate-500">
          <span className="font-medium text-charcoal">Pricing AI</span> · 2 active
          experiments
        </div>
      </div>
      <ul className="mt-3 space-y-3">
        {pricingExperiments.map((p, i) => (
          <li
            key={p.sku}
            className={`hairline rounded-lg bg-warm-50 px-3 py-2.5 ${
              i === 0 && fired ? "ring-1 ring-teal-300" : ""
            }`}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-sm">{p.sku}</span>
              <span className="text-sm tabular-nums">
                <span className="text-slate-400 line-through">S${p.from_sgd}</span>{" "}
                <span className="font-semibold">→ S${p.to_sgd}</span>
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
              <span>demand +{p.demand_delta_pct}%</span>
              <span>{p.agent_note}</span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
