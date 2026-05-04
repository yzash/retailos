"use client";

import { customers } from "@/data/seed";
import { useStore } from "@/lib/store";

export function DevMenu() {
  const open = useStore((s) => s.devMenuOpen);
  const setOpen = useStore((s) => s.setDevMenuOpen);
  const setActive = useStore((s) => s.setActiveCustomer);
  const activeId = useStore((s) => s.activeCustomerId);
  const resetLoop = useStore((s) => s.resetLoop);
  const loopRunning = useStore((s) => s.loopRunning);
  const setLoopRunning = useStore((s) => s.setLoopRunning);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-label="Demo controls"
      className="fixed bottom-[80px] right-6 z-50 w-80 rounded-xl bg-white p-4 shadow-xl hairline"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
          Demo controls
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-slate-500 hover:text-charcoal"
          aria-label="Close demo controls"
        >
          ✕
        </button>
      </div>
      <div className="space-y-1">
        <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
          Active customer
        </div>
        <div className="grid grid-cols-1 gap-1">
          {customers.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActive(c.id);
                resetLoop();
              }}
              className={`flex items-center justify-between rounded-md px-3 py-2 text-sm hairline ${
                c.id === activeId ? "bg-teal-50 border-teal-300" : "bg-warm-50"
              }`}
            >
              <span>
                <span className="font-medium">{c.name}</span>
                <span className="ml-2 text-[11px] text-slate-500">
                  {c.tier}
                </span>
              </span>
              <span className="text-[11px] text-slate-500">{c.demo_angle.split(" — ")[0]}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={() => setLoopRunning(!loopRunning)}
          className="rounded-md bg-charcoal px-3 py-2 text-xs font-medium text-white"
        >
          {loopRunning ? "Pause loop (P)" : "Resume loop (P)"}
        </button>
        <button
          onClick={() => resetLoop()}
          className="rounded-md hairline bg-warm-50 px-3 py-2 text-xs font-medium text-charcoal"
        >
          Reset loop
        </button>
      </div>
      <div className="mt-3 text-[11px] leading-relaxed text-slate-500">
        Open with <kbd className="rounded bg-slate-100 px-1">⌘</kbd>+
        <kbd className="rounded bg-slate-100 px-1">Shift</kbd>+
        <kbd className="rounded bg-slate-100 px-1">D</kbd>. Press
        <kbd className="mx-1 rounded bg-slate-100 px-1">P</kbd> anywhere to pause/resume.
      </div>
    </div>
  );
}
