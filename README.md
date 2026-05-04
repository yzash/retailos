# retailOS Booth Demo

AWS Summit Singapore 2026 · devx labs · *Reimagining Retail for the Agentic Era*

A high-fidelity, demo-grade simulation of the retailOS Associate App, built per the PRD in `retailOS_booth_demo_PRD.md`. Live Anthropic inference for the Customer Context Agent; everything else is scripted.

## Run it on the booth laptop in under 5 minutes

```bash
# 1. Clone / pull the repo onto the booth laptop
# 2. Add the API key
cp .env.example .env.local
# edit .env.local and paste the ANTHROPIC_API_KEY

# 3. Install + run
npm install
npm run dev

# 4. Open http://localhost:3000 and project to the 27"+ display
```

## Keyboard shortcuts (presenter)

| Keys | What |
|---|---|
| `P` | Pause / resume the 90-second loop (presenter mode) |
| `⌘ / Ctrl` + `Shift` + `D` | Open the dev menu (customer switcher, reset) |
| `⌘ / Ctrl` + `Shift` + `R` | Hard reset the loop |

You can also drag the journey timeline to scrub manually, and type questions into the Context Agent's input field.

## What's real vs. simulated

Per PRD §4.2:

| Agent | Real vs. simulated |
|---|---|
| **Customer Context Agent** | **Real** — every brief is a Claude inference; the cost ticker uses real token counts. |
| Inventory Agent | Scripted from `data/seed.ts`. |
| Pricing Agent | Scripted (2 staged events). |
| Store Manager AI | Scripted daily summary. |
| Demand Forecast | Scripted 30s loop. |
| Loyalty AI | Scripted lookup from seed. |

This is documented in code comments so a future devx engineer running the demo knows what's wired live.

## Graceful degradation

Booth WiFi is hostile. If the Anthropic API fails or the network drops:

- The route handler streams a pre-recorded response from `lib/cached-responses.ts`.
- The agent message is rendered with a small `cached` badge.
- The cost ticker still ticks (with conservative approximate token counts).
- **The demo never shows an error.** Test this before showtime by killing WiFi or clearing the API key.

## Structure

```
app/
  layout.tsx                     # root layout, fonts, metadata
  page.tsx                       # mounts <Booth />
  globals.css                    # palette tokens, hairlines, caret
  api/context-agent/route.ts     # server-side Claude streaming + cache fallback
components/
  Booth.tsx                      # top-bar + 45/55 split + bottom strip
  TopBar.tsx                     # Lumen & Co. + retailOS watermark + clock
  CustomerPane.tsx               # left 45% (header + journey + agent)
  CustomerHeaderCard.tsx
  JourneyTimeline.tsx            # 14-day scrubber, auto-play + manual drag
  ContextAgent.tsx               # streaming typewriter + Q&A input
  StoreOpsPane.tsx               # right 55% (footfall + 2x2 grid)
  FootfallStrip.tsx
  InventoryCard.tsx              # amber pulse on linen-shirt-Sand-M
  PricingCard.tsx
  AlertsCard.tsx
  PeerAgentsCard.tsx
  BottomStrip.tsx                # inference cost ticker
  DemoLoop.tsx                   # 90s choreography per PRD §6
  DevMenu.tsx                    # customer switcher (⌘+Shift+D)
  QrCorner.tsx                   # mock QR slot per PRD §12 (4)
data/
  seed.ts                        # all customers, inventory (24+ SKUs), footfall, peer log
lib/
  pricing.ts                     # Sonnet token rates, USD→SGD
  prompt.ts                      # Context Agent system prompt + payload shape
  cached-responses.ts            # offline fallback briefs for all 3 customers
  store.ts                       # Zustand store
```

## Booth-hardening checklist (run before showtime)

- [ ] WiFi off → Context Agent renders cached response with `cached` badge, no errors.
- [ ] Invalid API key → same.
- [ ] At booth resolution (1080p+ projector), nothing is clipped.
- [ ] Run a 10-minute live session — average cost per inference < S$0.001.
- [ ] All three customers (Priya / Marcus / Aisha) brief coherently.
- [ ] 5 ad-hoc questions work for the hero customer.

## Open items flagged from PRD §12

The current build proceeds with the documented defaults:

1. Brand "Lumen & Co." — kept as-is.
2. Currency — SGD only.
3. Languages — out of scope for v1.
4. QR code — placeholder rendered bottom-left; replace the SVG in `components/QrCorner.tsx` with the real meeting-booking QR before go-live.
