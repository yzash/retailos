"use client";

import { useEffect, useState } from "react";

export function TopBar() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = now
    ? now.toLocaleString("en-SG", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "";

  return (
    <header
      className="hairline-b flex items-center justify-between bg-white"
      style={{ height: 64 }}
    >
      <div className="flex items-baseline gap-3 pl-6">
        <span
          className="font-serif text-2xl tracking-tight"
          style={{ letterSpacing: "-0.01em" }}
        >
          Lumen <span className="text-teal-700">&amp;</span> Co.
        </span>
        <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
          Orchard Flagship
        </span>
      </div>
      <div className="text-sm tabular-nums text-slate-500">{fmt}</div>
      <div className="pr-6 flex items-center gap-3">
        <div className="text-right leading-tight">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
            retail<span className="text-teal-700">OS</span>
          </div>
          <div className="text-[9px] uppercase tracking-[0.18em] text-slate-400">
            by devx labs
          </div>
        </div>
        <span
          className="inline-block h-2 w-2 rounded-full bg-teal-700 animate-pulseDot"
          aria-hidden
        />
      </div>
    </header>
  );
}
