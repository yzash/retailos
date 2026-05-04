"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import type { Channel, JourneyEvent } from "@/data/seed";

const channelMeta: Record<
  Channel,
  { label: string; icon: string; tone: string }
> = {
  store: { label: "Store", icon: "◧", tone: "#0F766E" },
  whatsapp: { label: "WhatsApp", icon: "✉", tone: "#16A34A" },
  lazada: { label: "Lazada", icon: "▲", tone: "#7C3AED" },
  email: { label: "Email", icon: "✱", tone: "#0EA5E9" },
  instagram: { label: "Instagram", icon: "◉", tone: "#DB2777" },
  shopify: { label: "Shopify", icon: "◆", tone: "#65A30D" },
  tiktok: { label: "TikTok", icon: "♪", tone: "#0F172A" },
};

export function JourneyTimeline() {
  const customer = useStore((s) => s.customer());
  const loopT = useStore((s) => s.loopT);
  const loopRunning = useStore((s) => s.loopRunning);

  // Auto-scrub from Day -14 to Day 0 between loop t=16 and t=30 (PRD §6).
  const autoT = useMemo(() => {
    if (loopT < 16) return -14;
    if (loopT >= 30) return 0;
    const p = (loopT - 16) / (30 - 16);
    return -14 + p * 14;
  }, [loopT]);

  const [manualT, setManualT] = useState<number | null>(null);
  const playheadDay = manualT ?? autoT;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<JourneyEvent | null>(null);

  // Reset manual scrub when loop resumes.
  useEffect(() => {
    if (loopRunning) setManualT(null);
  }, [loopRunning]);

  function pctForDay(day: number): number {
    // -14 -> 0%, 0 -> 100%
    return ((day + 14) / 14) * 100;
  }

  function onTrackClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    setManualT(-14 + pct * 14);
  }

  return (
    <article className="hairline rounded-xl bg-white p-5" aria-label="Journey timeline">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">
          Journey · last 14 days
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span>{customer.journey_last_14_days.length} touchpoints</span>
          <button
            onClick={() => setManualT(null)}
            className="rounded-full hairline bg-warm-50 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-600 hover:bg-warm-100"
          >
            Play
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        onClick={onTrackClick}
        className="relative mt-5 h-20 cursor-pointer select-none"
        role="slider"
        aria-valuemin={-14}
        aria-valuemax={0}
        aria-valuenow={Math.round(playheadDay)}
      >
        {/* Track */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-200" />
        {/* Day markers */}
        {[-14, -10, -7, -3, -1, 0].map((d) => (
          <div
            key={d}
            className="absolute top-[calc(50%+10px)] -translate-x-1/2 text-[10px] text-slate-400 tabular-nums"
            style={{ left: `${pctForDay(d)}%` }}
          >
            {d === 0 ? "now" : `D${d}`}
          </div>
        ))}
        {/* Events */}
        {customer.journey_last_14_days.map((e, i) => {
          const m = channelMeta[e.channel];
          const left = pctForDay(e.day_offset);
          const reached = e.day_offset <= playheadDay + 0.0001;
          return (
            <button
              key={i}
              onMouseEnter={() => setHovered(e)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(e)}
              onBlur={() => setHovered(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-white text-xs shadow-sm transition-transform"
              style={{
                left: `${left}%`,
                top: "50%",
                backgroundColor: reached ? m.tone : "#CBD5E1",
                transform: `translate(-50%, -50%) scale(${reached ? 1 : 0.9})`,
              }}
              aria-label={`${m.label} on day ${e.day_offset}: ${e.action}`}
            >
              <span aria-hidden>{m.icon}</span>
            </button>
          );
        })}
        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-px bg-teal-700"
          style={{ left: `${pctForDay(playheadDay)}%` }}
        >
          <div className="absolute -top-1 -translate-x-1/2 h-2 w-2 rotate-45 bg-teal-700" />
        </div>
      </div>

      {/* Active event card */}
      <ActiveEventCard
        event={hovered ?? activeEvent(customer.journey_last_14_days, playheadDay)}
      />
    </article>
  );
}

function activeEvent(events: JourneyEvent[], day: number): JourneyEvent | null {
  // Pick the latest event that has been crossed.
  const crossed = events.filter((e) => e.day_offset <= day + 0.0001);
  if (!crossed.length) return null;
  return crossed[crossed.length - 1];
}

function ActiveEventCard({ event }: { event: JourneyEvent | null }) {
  if (!event) return null;
  const m = channelMeta[event.channel];
  return (
    <div className="mt-4 flex items-start gap-3 rounded-lg bg-warm-50 px-3 py-2.5 hairline animate-fadeIn">
      <span
        className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-white text-[11px]"
        style={{ backgroundColor: m.tone }}
        aria-hidden
      >
        {m.icon}
      </span>
      <div className="flex-1 text-sm leading-relaxed">
        <div className="flex items-center gap-2">
          <span className="font-medium">{m.label}</span>
          <span className="text-xs text-slate-500">
            {event.day_offset === 0
              ? "today"
              : `${Math.abs(event.day_offset)} ${
                  Math.abs(event.day_offset) === 1 ? "day" : "days"
                } ago`}
            {event.location ? ` · ${event.location}` : ""}
          </span>
        </div>
        <div className="text-slate-700">{event.action}</div>
      </div>
      {typeof event.value_sgd === "number" && (
        <div className="text-sm font-semibold tabular-nums">
          S${event.value_sgd}
        </div>
      )}
    </div>
  );
}
