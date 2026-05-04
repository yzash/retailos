"use client";

import { FootfallStrip } from "./FootfallStrip";
import { InventoryCard } from "./InventoryCard";
import { PricingCard } from "./PricingCard";
import { AlertsCard } from "./AlertsCard";
import { PeerAgentsCard } from "./PeerAgentsCard";

export function StoreOpsPane() {
  return (
    <div className="panel-scroll flex-1 min-h-0 overflow-y-auto">
      <div className="flex flex-col gap-5 p-6">
        <FootfallStrip />
        <div className="grid grid-cols-2 gap-5">
          <InventoryCard />
          <PricingCard />
          <AlertsCard />
          <PeerAgentsCard />
        </div>
      </div>
    </div>
  );
}
