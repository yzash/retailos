"use client";

// PRD §12 (4) — mock a QR slot in the corner. A real QR ships post-build.
// Rendered as a tasteful, monochrome SVG placeholder so the layout shows the slot.

export function QrCorner() {
  return (
    <div
      className="pointer-events-none fixed bottom-[72px] left-6 z-30 flex items-end gap-2"
      aria-label="Book a meeting"
    >
      <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden>
        <rect width="56" height="56" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
        {/* faux QR pattern */}
        {Array.from({ length: 49 }).map((_, i) => {
          const x = (i % 7) * 7 + 4;
          const y = Math.floor(i / 7) * 7 + 4;
          // deterministic pseudo-pattern
          const on = ((i * 97) ^ (i >> 1)) % 3 !== 0;
          return on ? (
            <rect key={i} x={x} y={y} width={5} height={5} fill="#0F172A" />
          ) : null;
        })}
        {/* corner registration marks */}
        <rect x={4} y={4} width={14} height={14} fill="none" stroke="#0F172A" strokeWidth={2} />
        <rect x={38} y={4} width={14} height={14} fill="none" stroke="#0F172A" strokeWidth={2} />
        <rect x={4} y={38} width={14} height={14} fill="none" stroke="#0F172A" strokeWidth={2} />
      </svg>
      <div className="leading-tight">
        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
          Talk to the team
        </div>
        <div className="text-xs font-medium text-charcoal">retailos.devx.app</div>
      </div>
    </div>
  );
}
