"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store";

const LOOP_LENGTH = 90; // seconds

// PRD §6 — choreography. Side-effects keyed to seconds within the loop.
type Beat = {
  t: number;
  fn: () => void;
};

export function DemoLoop() {
  const loopRunning = useStore((s) => s.loopRunning);
  const setLoopRunning = useStore((s) => s.setLoopRunning);
  const setLoopT = useStore((s) => s.setLoopT);
  const resetLoop = useStore((s) => s.resetLoop);
  const customer = useStore((s) => s.customer());
  const setInventoryPulse = useStore((s) => s.setInventoryPulse);
  const setFootfallNow = useStore((s) => s.setFootfallNow);
  const pushAlert = useStore((s) => s.pushAlert);
  const pushPeer = useStore((s) => s.pushPeer);
  const setDevMenuOpen = useStore((s) => s.setDevMenuOpen);

  const tickRef = useRef<number | null>(null);
  const lastBeatRef = useRef<number>(-1);

  // Build beats fresh each render so they capture the latest customer
  const beats: Beat[] = [
    { t: 0, fn: () => {
        resetLoop();
        setFootfallNow(32);
        // Store Manager AI daily summary — already in peer card baseline at 09:00.
      } },
    { t: 5, fn: () => {
        setInventoryPulse(true);
      } },
    { t: 12, fn: () => {
        pushAlert({
          id: `vip-${Date.now()}`,
          text: `VIP customer entering — ${customer.name}`,
          ts: nowHHMM(),
          primary: "Greet",
        });
      } },
    { t: 30, fn: () => {
        // Hero moment 2 — fire the Context Agent inference.
        const fire = (window as any).__retailos_fireBrief as (() => void) | undefined;
        if (fire) fire();
      } },
    { t: 55, fn: () => {
        pushPeer({
          agent: "Pricing AI",
          message: "Vanilla candle 200g: -8%, demand sensing",
          time: nowHHMM(),
        });
      } },
    { t: 65, fn: () => {
        pushPeer({
          agent: "Loyalty AI",
          message: `${customer.name} eligible for tier-up reward`,
          time: nowHHMM(),
        });
      } },
    { t: 75, fn: () => {
        setFootfallNow(47);
      } },
  ];

  useEffect(() => {
    if (!loopRunning) {
      if (tickRef.current) {
        window.clearInterval(tickRef.current);
        tickRef.current = null;
      }
      return;
    }
    const startMs = performance.now();
    const startT = useStore.getState().loopT;
    tickRef.current = window.setInterval(() => {
      const elapsed = (performance.now() - startMs) / 1000;
      const t = (startT + elapsed) % LOOP_LENGTH;
      // Detect wrap-around to fire t=0 beat
      const prev = useStore.getState().loopT;
      if (t < prev) {
        lastBeatRef.current = -1;
      }
      setLoopT(t);
      // Fire any beats we've crossed
      for (const b of beats) {
        if (b.t > lastBeatRef.current && b.t <= t) {
          b.fn();
          lastBeatRef.current = b.t;
        }
      }
    }, 100);
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
      tickRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loopRunning, customer.id]);

  // Keyboard shortcuts: P to toggle presenter mode, Cmd+Shift+D for dev menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inField =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          (target as any).isContentEditable);
      if (inField) return;

      if (e.key.toLowerCase() === "p" && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
        setLoopRunning(!useStore.getState().loopRunning);
      }
      if (
        e.key.toLowerCase() === "d" &&
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey
      ) {
        e.preventDefault();
        setDevMenuOpen(!useStore.getState().devMenuOpen);
      }
      if (e.key.toLowerCase() === "r" && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        resetLoop();
        lastBeatRef.current = -1;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setLoopRunning, setDevMenuOpen, resetLoop]);

  // Tiny presenter-mode badge in the bottom-right of the screen.
  if (loopRunning) return null;
  return (
    <div className="pointer-events-none fixed bottom-[72px] right-6 z-40">
      <div className="rounded-full bg-charcoal px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white shadow-lg">
        Presenter mode · loop paused (P to resume)
      </div>
    </div>
  );
}

function nowHHMM(): string {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function pad(n: number) {
  return n.toString().padStart(2, "0");
}
