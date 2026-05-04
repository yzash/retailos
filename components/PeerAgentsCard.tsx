"use client";

import { storeManagerSummary } from "@/data/seed";
import { useStore } from "@/lib/store";

export function PeerAgentsCard() {
  const peers = useStore((s) => s.peerFeed);
  return (
    <article className="hairline rounded-xl bg-white p-5" aria-label="Peer agents">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">Peer agents</h3>
        <span className="text-[11px] text-slate-500">5 agents reporting</span>
      </div>
      <div className="mt-3 rounded-lg bg-teal-50 px-3 py-2 text-xs text-teal-900 hairline border-teal-200">
        <div className="text-[10px] uppercase tracking-[0.18em] text-teal-700">
          Store Manager AI · daily summary · {storeManagerSummary.posted_at}
        </div>
        <div className="mt-1 leading-relaxed">{storeManagerSummary.message}</div>
      </div>
      <ul className="mt-3 space-y-1.5">
        {peers.map((e, i) => (
          <li
            key={`${e.time}-${i}`}
            className="flex items-center justify-between text-[12px]"
          >
            <span className="text-slate-700">
              <span className="font-medium text-charcoal">{e.agent}</span> · {e.message}
            </span>
            <span className="tabular-nums text-slate-400">{e.time}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
