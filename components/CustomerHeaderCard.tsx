"use client";

import { useStore } from "@/lib/store";

export function CustomerHeaderCard() {
  const customer = useStore((s) => s.customer());
  const loopT = useStore((s) => s.loopT);
  const visible = loopT >= 14 || loopT === 0; // PRD §6: customer header populates at 0:14

  return (
    <article
      className={`hairline rounded-xl bg-white p-5 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-40"
      }`}
      aria-label="Customer header"
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: "#0F766E" }}
          aria-hidden
        >
          <span className="text-lg font-semibold tracking-wide">
            {customer.initials}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-charcoal">{customer.name}</h2>
            <TierBadge tier={customer.tier} />
          </div>
          <div className="mt-0.5 text-xs text-slate-500">
            Member since{" "}
            {new Date(customer.member_since).toLocaleDateString("en-SG", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}{" "}
            · LTV S${customer.lifetime_value_sgd.toLocaleString()} · Last purchase{" "}
            {customer.last_purchase.item} (
            {new Date(customer.last_purchase.date).toLocaleDateString("en-SG", {
              month: "short",
              day: "2-digit",
            })}
            )
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="Visits YTD" value={customer.visits_ytd.toString()} />
        <Stat label="Avg order value" value={`S$${customer.avg_order_value_sgd}`} />
        <Stat label="Channels used" value={customer.channels_used.toString()} />
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="hairline rounded-lg bg-warm-50 px-3 py-2">
      <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      <div className="mt-0.5 text-base font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const palette: Record<string, string> = {
    Bronze: "bg-amber-50 text-amber-800 border-amber-200",
    Silver: "bg-slate-50 text-slate-700 border-slate-200",
    Gold: "bg-yellow-50 text-yellow-800 border-yellow-200",
    Platinum: "bg-teal-50 text-teal-800 border-teal-200",
  };
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${
        palette[tier] ?? palette.Silver
      }`}
    >
      {tier} member
    </span>
  );
}
