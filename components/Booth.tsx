"use client";

import { TopBar } from "./TopBar";
import { CustomerPane } from "./CustomerPane";
import { StoreOpsPane } from "./StoreOpsPane";
import { BottomStrip } from "./BottomStrip";
import { DemoLoop } from "./DemoLoop";
import { DevMenu } from "./DevMenu";
import { QrCorner } from "./QrCorner";

export function Booth() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-warm-50 text-charcoal">
      <TopBar />
      <div className="flex-1 flex min-h-0">
        <section
          className="hairline-r flex flex-col min-h-0"
          style={{ width: "45%" }}
          aria-label="Customer Context"
        >
          <CustomerPane />
        </section>
        <section
          className="flex flex-col min-h-0"
          style={{ width: "55%" }}
          aria-label="Store Operations"
        >
          <StoreOpsPane />
        </section>
      </div>
      <BottomStrip />
      <DemoLoop />
      <DevMenu />
      <QrCorner />
    </div>
  );
}
