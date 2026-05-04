"use client";

import { topInventoryRows } from "@/data/seed";
import { useStore } from "@/lib/store";

export function InventoryCard() {
  const pulse = useStore((s) => s.inventoryPulse);
  return (
    <article className="hairline rounded-xl bg-white p-5" aria-label="Inventory">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">Inventory</h3>
        <div className="text-[11px] text-slate-500">
          <span className="font-medium text-charcoal">Inventory AI</span> · last sync
          12 sec ago
        </div>
      </div>
      <ul className="mt-3 divide-y divide-slate-100">
        {topInventoryRows.map((row) => {
          const isHero =
            row.id === "linen-shirt-sand-m" || row.name.includes("Sand — M");
          const showPulse = isHero && pulse;
          const dot =
            row.status === "out"
              ? "bg-rose-500"
              : row.status === "low"
                ? "bg-amber-500"
                : "bg-emerald-500";
          return (
            <li
              key={row.id}
              className={`flex items-center justify-between gap-3 py-2.5 px-2 -mx-2 rounded-md ${
                showPulse ? "animate-amberPulse" : ""
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`inline-block h-2 w-2 rounded-full ${dot}`} aria-hidden />
                <div className="min-w-0">
                  <div className="truncate text-sm">{row.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {row.units} units · vel {row.velocity}/wk · S${row.price_sgd}
                  </div>
                </div>
              </div>
              <MiniBars seed={row.velocity} />
            </li>
          );
        })}
      </ul>
      <div className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-900 hairline border-amber-200">
        Linen shirt — Sand — M : 3 units · Restock recommended
      </div>
    </article>
  );
}

function MiniBars({ seed }: { seed: number }) {
  const bars = [4, 6, 5, 8, 7, 9, seed].map((v) => Math.min(12, v));
  return (
    <svg viewBox="0 0 70 18" className="h-4 w-16" aria-hidden>
      {bars.map((v, i) => (
        <rect
          key={i}
          x={i * 10}
          y={18 - v * 1.4}
          width={6}
          height={v * 1.4}
          fill="#0F766E"
          opacity={0.55 + i * 0.05}
        />
      ))}
    </svg>
  );
}
