"use client";

import { create } from "zustand";
import {
  customers,
  heroCustomerId,
  type CustomerProfile,
  type PeerEvent,
  peerActivity,
} from "@/data/seed";

export type AgentMessage = {
  id: string;
  text: string;
  cached: boolean;
  // tokens are streamed; we update text progressively
  streaming: boolean;
};

export type CostState = {
  inferences: number;
  cumulativeSgd: number;
  // a baseline so the booth doesn't open with a zero count — feels lived-in.
  baselineInferences: number;
  baselineSgd: number;
};

type Store = {
  // Active customer
  activeCustomerId: string;
  setActiveCustomer: (id: string) => void;
  customer: () => CustomerProfile;

  // Loop control
  loopT: number; // seconds within the 90s loop, 0..90
  loopRunning: boolean;
  setLoopRunning: (v: boolean) => void;
  setLoopT: (t: number) => void;
  resetLoop: () => void;

  // Agent commentary
  agentMessages: AgentMessage[];
  pushAgentMessage: (m: AgentMessage) => void;
  appendAgentText: (id: string, chunk: string) => void;
  finalizeAgentMessage: (id: string) => void;

  // Cost ticker
  cost: CostState;
  recordInference: (sgd: number) => void;

  // Footfall live count (animates during the loop)
  footfallNow: number;
  setFootfallNow: (n: number) => void;

  // Inventory pulse trigger (true while the linen-shirt-sand-M alert is firing)
  inventoryPulse: boolean;
  setInventoryPulse: (v: boolean) => void;

  // Peer agent activity feed (mostly static, can append dynamic loop events)
  peerFeed: PeerEvent[];
  pushPeer: (e: PeerEvent) => void;

  // Alerts feed
  alerts: { id: string; text: string; ts: string; primary?: string }[];
  pushAlert: (a: { id: string; text: string; ts: string; primary?: string }) => void;

  // Dev menu visibility
  devMenuOpen: boolean;
  setDevMenuOpen: (v: boolean) => void;
};

export const useStore = create<Store>((set, get) => ({
  activeCustomerId: heroCustomerId,
  setActiveCustomer: (id) => set({ activeCustomerId: id }),
  customer: () =>
    customers.find((c) => c.id === get().activeCustomerId) ?? customers[0],

  loopT: 0,
  loopRunning: true,
  setLoopRunning: (v) => set({ loopRunning: v }),
  setLoopT: (t) => set({ loopT: t }),
  resetLoop: () =>
    set({
      loopT: 0,
      agentMessages: [],
      inventoryPulse: false,
      footfallNow: 32,
      alerts: [],
    }),

  agentMessages: [],
  pushAgentMessage: (m) => set((s) => ({ agentMessages: [...s.agentMessages, m] })),
  appendAgentText: (id, chunk) =>
    set((s) => ({
      agentMessages: s.agentMessages.map((m) =>
        m.id === id ? { ...m, text: m.text + chunk } : m
      ),
    })),
  finalizeAgentMessage: (id) =>
    set((s) => ({
      agentMessages: s.agentMessages.map((m) =>
        m.id === id ? { ...m, streaming: false } : m
      ),
    })),

  cost: {
    inferences: 0,
    cumulativeSgd: 0,
    // The booth opens looking like a system that's been running today.
    baselineInferences: 1240,
    baselineSgd: 0.8378,
  },
  recordInference: (sgd) =>
    set((s) => ({
      cost: {
        ...s.cost,
        inferences: s.cost.inferences + 1,
        cumulativeSgd: s.cost.cumulativeSgd + sgd,
      },
    })),

  footfallNow: 32,
  setFootfallNow: (n) => set({ footfallNow: n }),

  inventoryPulse: false,
  setInventoryPulse: (v) => set({ inventoryPulse: v }),

  peerFeed: peerActivity,
  pushPeer: (e) => set((s) => ({ peerFeed: [e, ...s.peerFeed].slice(0, 12) })),

  alerts: [],
  pushAlert: (a) => set((s) => ({ alerts: [a, ...s.alerts].slice(0, 6) })),

  devMenuOpen: false,
  setDevMenuOpen: (v) => set({ devMenuOpen: v }),
}));

export function totalInferences(s: Store) {
  return s.cost.baselineInferences + s.cost.inferences;
}
export function totalCostSgd(s: Store) {
  return s.cost.baselineSgd + s.cost.cumulativeSgd;
}
export function avgCostSgd(s: Store) {
  const n = totalInferences(s);
  if (n === 0) return 0;
  return totalCostSgd(s) / n;
}
