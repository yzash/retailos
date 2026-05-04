"use client";

import { footfall, demandForecast } from "@/data/seed";
import { useStore } from "@/lib/store";

export function FootfallStrip() {
  const live = useStore((s) => s.footfallNow);
  return (
    <article
      className="hairline rounded-xl bg-white px-5 py-4"
      aria-label="Footfall strip"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Footfall
          </div>
          <div className="text-2xl font-semibold tabular-nums">{live}</div>
          <div className="text-xs text-slate-500">in store now</div>
        </div>
        <div className="text-xs text-slate-500">
          <span className="font-medium text-charcoal">Demand Forecast</span> ·
          peak expected at {demandForecast.peak_time} (+
          {demandForecast.peak_lift_pct}%)
        </div>
      </div>
      <Sparkline data={footfall.map((p) => p.count)} />
    </article>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const w = 600;
  const h = 36;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = Math.max(1, max - min);
  const step = w / Math.max(1, data.length - 1);
  const pts = data
    .map((v, i) => `${(i * step).toFixed(2)},${(h - ((v - min) / range) * h).toFixed(2)}`)
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="mt-3 h-9 w-full"
      aria-hidden
    >
      <polyline
        fill="none"
        stroke="#0F766E"
        strokeWidth="1.5"
        points={pts}
      />
      <polyline
        fill="rgba(15,118,110,0.08)"
        stroke="none"
        points={`0,${h} ${pts} ${w},${h}`}
      />
    </svg>
  );
}
