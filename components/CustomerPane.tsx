"use client";

import { CustomerHeaderCard } from "./CustomerHeaderCard";
import { JourneyTimeline } from "./JourneyTimeline";
import { ContextAgent } from "./ContextAgent";

export function CustomerPane() {
  return (
    <div className="panel-scroll flex-1 min-h-0 overflow-y-auto">
      <div className="flex flex-col gap-5 p-6">
        <CustomerHeaderCard />
        <JourneyTimeline />
        <ContextAgent />
      </div>
    </div>
  );
}
