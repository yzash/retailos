"use client";

import { useStore } from "@/lib/store";

export function AlertsCard() {
  const alerts = useStore((s) => s.alerts);
  // Always-on baseline alert so the card is never empty.
  const baseline = [
    {
      id: "fitting-3",
      text: "Fitting room 3 occupied 14 min — check in",
      ts: "14:09",
      primary: "Check in",
    },
  ];
  const visible = [...alerts, ...baseline].slice(0, 4);
  return (
    <article className="hairline rounded-xl bg-white p-5" aria-label="Alerts">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">Alerts</h3>
        <span className="text-[11px] text-slate-500">{visible.length} active</span>
      </div>
      <ul className="mt-3 space-y-2">
        {visible.map((a) => (
          <li
            key={a.id}
            className="flex items-center justify-between rounded-lg bg-warm-50 px-3 py-2 hairline animate-fadeIn"
          >
            <div className="min-w-0">
              <div className="truncate text-sm">{a.text}</div>
              <div className="text-[11px] text-slate-500">{a.ts}</div>
            </div>
            {a.primary && (
              <button className="rounded-full border border-teal-700 px-2.5 py-1 text-[11px] font-medium text-teal-800 hover:bg-teal-50">
                {a.primary}
              </button>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
