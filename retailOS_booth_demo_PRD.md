# retailOS Booth Demo — Product Requirements Document

**Event:** AWS Summit Singapore 2026
**Owner:** Yash Makhija, Managing Partner, devx labs
**Demo theme:** Reimagining Retail for the Agentic Era
**Audience:** Retail executives, CIOs, CDOs, AWS field teams, partner ecosystem
**Build target:** Claude Code, end-to-end
**Status:** Build-ready

---

## 0. How to use this PRD

This document is the single source of truth for building the retailOS booth demo. Read sections 1–4 end-to-end before writing code. Sections 5–11 are the build spec. Section 12 is the seed data spec — implement exactly as written; do not regenerate fixtures from your own imagination.

If something is ambiguous, default to: **does this make a busy executive at a booth stop walking?** If yes, build it. If no, cut it.

---

## 1. Strategic context

### 1.1 Why this demo exists

devx labs is speaking on the future of retail at AWS Summit Singapore 2026. The keynote thesis is that retailers do not have a customer problem — they have a stack problem. retailOS is the answer: an AI-native, agentic operating system for omnichannel retail, built from first principles on AWS, not retrofitted onto legacy SaaS.

The booth demo is the proof. After the talk, executives walk to the booth thinking: *"Sounds good, but show me."* The demo has 60 seconds to convert curiosity into a meeting.

### 1.2 What the demo must communicate

Three messages, in order of priority:

1. **One identity, one brain, zero broken journeys.** The same shopper across store, WhatsApp, marketplace, and back to store — the system knows them everywhere.
2. **AI in the associate's ear.** A Customer Context Agent that whispers real-time guidance to the store associate: who this person is, what they bought, what to mention, what to upsell, how to delight them. This is the wow.
3. **AI-native, not AI-enabled.** The demo runs on real Anthropic Claude inference. Every action is a real LLM call. Inference cost is shown live to land the AWS + AMD economics story.

### 1.3 What the demo must NOT do

- It must not look like a generic SaaS dashboard. If it could be mistaken for Shopify Plus, Salesforce Commerce, or Lightspeed, the design has failed.
- It must not require a live internet connection to demo the journey replay. Anthropic API calls for the Context Agent require connectivity, but the journey timeline must work offline if WiFi at the venue dies.
- It must not depend on user input during the wow moment. The associate-side scenario auto-plays. Humans are unreliable; the venue WiFi is unreliable; the demo flow must not be.

### 1.4 Persona and POV

**The screen at the booth shows a Store Associate's view inside a multi-brand fashion + lifestyle retail concept called "Lumen & Co."** A retailOS Associate App, running on what would normally be a tablet at the storefront. The view splits into two panes:

- **Left pane — Customer Context:** identity, history, live signals, the Context Agent's running commentary
- **Right pane — Store Ops:** inventory, footfall, alerts, peer agents reporting in

A presenter at the booth narrates while the demo auto-plays. The presenter can also interact: tap "Restock alert," type a question to the Context Agent, scrub the journey timeline.

---

## 2. The hero moments

The demo is built around two hero moments. Everything else supports them.

### 2.1 Hero moment 1 — Cross-channel journey replay

**The setup:** A customer named Priya walks into the Lumen & Co. flagship store in Orchard Road. The associate's tablet recognizes her. The Context Agent starts narrating.

**The reveal:** The presenter taps "Show Priya's journey." A horizontal timeline scrubs through her last 14 days:

- **Day -14, Store (ION Orchard):** Browsed linen shirts, didn't buy, tried size M.
- **Day -10, WhatsApp:** Asked about a sustainable cotton tote. Conversational AI handled it.
- **Day -7, Lazada:** Bought a candle (Lumen home line) — Rs 1,800.
- **Day -3, Email:** Opened the new arrivals newsletter, clicked into the linen collection.
- **Day -1, Instagram:** Saved a post featuring the new oversized linen shirt.
- **Day 0, NOW:** Standing in the store, two meters from the linen rack.

One identity stitched across six touchpoints. One inventory pool. One loyalty wallet. The presenter says: *"This is what omnichannel was supposed to mean. Now it actually does."*

### 2.2 Hero moment 2 — Customer Context Agent (live)

**The setup:** Priya is at the rack. The Context Agent's pane on the left is streaming.

**The reveal — live LLM inference, real Claude calls:**

```
[Context Agent · 14:23:07]
Priya is a 4-visit customer, last purchase 7 days ago (Lazada — vanilla candle, Rs 1,800).
She browsed linen shirts on her last store visit but didn't buy. She saved an Instagram
post yesterday featuring the new oversized linen shirt in sand. We have her size (M)
in stock — 3 units, last replenished 2 days ago.

→ SUGGEST: Mention the sand colorway just came in. She saved it on Instagram.
→ DELIGHT: She's a vanilla candle buyer — the new linen-scented candle pairs naturally.
→ AVOID: Don't push the loyalty signup, she's already a member (Tier: Silver).
```

The presenter then types a question into the agent: *"What size did she try last time?"* The agent answers in real time. *"What's a good cross-sell?"* It answers. The audience watches a real LLM reason over a real customer profile, in under two seconds, costing fractions of a cent. **That is the wow.**

### 2.3 Why these two together

Hero 1 proves the architecture (one customer, one brain). Hero 2 proves the economics and the magic (AI-native, real inference, in the associate's ear). Together they earn the right to the AWS + AMD price-performance story — because if every interaction is an AI call, inference economics *are* the business model.

---

## 3. Brand and design language

The demo must look like devx labs, not like a generic admin panel. Anchor the design in the doctrine.

### 3.1 Visual identity

- **Palette:** White base, deep teal as primary accent (`#0F766E` or close), charcoal for text (`#0F172A`), warm neutrals for surfaces (`#FAFAF7`). Use the "white/teal" devx brand identity referenced in the company doctrine.
- **Typography:** Inter or similar geometric sans for UI; a serif (e.g., Fraunces, Playfair) reserved for the **store brand "Lumen & Co."** so the retail brand and the retailOS chrome are visually distinct. This signals "retailOS sits inside any brand" — important.
- **Surface treatment:** Generous whitespace, hairline borders (1px, slate-200), no heavy drop shadows. Feels like considered software, not a CRUD panel.
- **Motion:** Purposeful. The Context Agent text streams in (typewriter effect, ~30ms per character). The journey timeline scrubs smoothly. Inventory numbers tick when an event fires. No bouncing, no spinners that linger.

### 3.2 Layout

A single full-screen view, no global nav. Top bar shows store identity ("Lumen & Co. · Orchard Flagship · Powered by retailOS"). Below it, the two-pane split:

- **Left pane (45% width):** Customer Context panel
- **Right pane (55% width):** Store Ops panel
- **Bottom strip (60px tall, full width):** Inference cost ticker + agent activity log

### 3.3 Tone of microcopy

Crisp, executive, no exclamation points. "3 units in stock" not "Only 3 left!". "Suggest mentioning the sand colorway" not "Try this!". Read the speaker notes for voice — that's the register.

### 3.4 The retailOS watermark

Top-right corner of the chrome: a small, monochrome `retailOS` wordmark with "by devx labs" beneath. Always visible. The booth visitor must not forget what they are looking at.

---

## 4. System architecture (what we are actually building)

This is a single-page web application designed to run on a laptop at the booth, projected to a 27"+ display. It is not a production system. It is a high-fidelity, demo-grade simulation that uses real Anthropic API calls for the Context Agent.

### 4.1 Stack

- **Framework:** Next.js 14 (App Router), TypeScript, React Server Components where appropriate
- **Styling:** Tailwind CSS, with a custom theme matching the devx palette
- **Animation:** Framer Motion for layout transitions; a small custom hook for the typewriter streaming effect
- **State:** Zustand for client-side demo state. No backend database — all data is seeded in-memory from a `/data/seed.ts` file.
- **LLM integration:** Anthropic Messages API (`claude-sonnet-4-5` or successor). The API key is loaded from a local `.env.local` file. **The presenter's laptop must have the key. Do not bake it into the bundle.**
- **Deployment:** `next dev` on the laptop. No Vercel deploy needed for the booth. (A Vercel preview is fine for rehearsal.)

### 4.2 Six agents — what's real vs. simulated

The doctrine and the keynote reference six retailOS agents: **Customer Context, Inventory, Pricing, Store Manager, Demand Forecast, Loyalty**. Build them as follows:

| Agent | Behavior in demo | Implementation |
|---|---|---|
| Customer Context | Streams real, live commentary about the active customer | **Real Anthropic API calls.** Each suggestion is a Claude inference. |
| Inventory | Reports SKU levels, fires restock alerts | Scripted: triggered by timeline events from seed data. |
| Pricing | Reports price changes on demand-sensed SKUs | Scripted: 2 fake events fire during the demo loop. |
| Store Manager | Posts a daily summary at start of demo loop | Scripted: pre-written summary, displayed at t=0. |
| Demand Forecast | Reports predicted footfall and category demand | Scripted: numbers update on a 30-second loop. |
| Loyalty | Confirms tier, points balance, available rewards | Scripted: looked up from seed data when customer is active. |

This is honest: the keynote audience will accept that ops agents are simulated *if the Customer Context Agent is demonstrably real*. The real one is the wow; the rest is supporting cast. **Do not hide this distinction internally** — comment the code so future devx folks running the demo know what's real.

### 4.3 The journey replay engine

A timeline scrubber component. Bound to a `journey` array in seed data — each event has timestamp, channel, action, metadata. The scrubber animates a playhead across the timeline. As the playhead crosses an event, the event card animates in, the corresponding channel icon pulses, and the Customer Context panel updates with the new context.

The replay can be:
- **Auto-played** (default at booth — 30 second loop)
- **Manual-scrubbed** (presenter drags the playhead for deep-dive conversations)

### 4.4 Inference cost ticker

A small bottom-strip element. Every Anthropic API call increments the ticker. Show:
- Cumulative inference count (e.g., "Inferences today: 1,247")
- Cumulative cost in SGD with four decimals (e.g., "S$0.8421")
- Average cost per inference (e.g., "S$0.0007 / inference")

Use real token counts returned from the Anthropic API to calculate cost. Use Claude Sonnet pricing constants in a config file (`/lib/pricing.ts`) so they can be updated. **This earns the AWS + AMD slide its credibility — every visitor literally watches inference cost.**

### 4.5 What runs offline vs. online

| Feature | Online required | Why |
|---|---|---|
| Journey replay | No | Pre-seeded data |
| Store ops pane | No | Pre-seeded data |
| Cost ticker | No (uses cached values) | Pre-seeded data |
| **Context Agent live commentary** | **Yes** | Real Claude inference |
| Context Agent ad-hoc Q&A | Yes | Real Claude inference |

**Failure mode:** If the Anthropic API fails or the network drops, the Context Agent must gracefully degrade. Show a pre-recorded canned response (cached from a successful run) and a small badge `cached`. The demo never breaks. **Implement this; do not skip it.** Booth WiFi is hostile.

---

## 5. Screen specification

### 5.1 Top bar (height: 64px)

Left: Lumen & Co. logo (text, serif font), "Orchard Flagship" subdued.
Center: Time + date (live clock, formatted "Sat, 04 May · 14:23")
Right: retailOS wordmark (small, monochrome) + `by devx labs` underneath in micro-type.

### 5.2 Left pane — Customer Context (width: 45%)

Vertical stack, scrollable:

**5.2.1 Customer header card**
- Avatar (initials in a teal circle, no photo — synthetic identity)
- Name + loyalty tier badge ("Priya R. · Silver Member")
- Membership since, lifetime value, last purchase date
- 3 micro-stats in a row: visits this year, avg order value, channels used

**5.2.2 Journey timeline**
- Horizontal scrubber, 14 days wide
- Event markers at exact day positions, color-coded by channel
- Hover/tap an event → expands to event card showing channel, action, value
- A "play" button that auto-plays the journey in 30 seconds
- A "now" anchor at the right edge

**5.2.3 Context Agent panel (the hero)**
- Title bar: "Customer Context Agent · Live"
- A pulsing teal dot when the agent is active
- Streaming text area with typewriter effect
- Three icons after each agent message: 👁 Suggest · ✨ Delight · ⛔ Avoid (these match the structured output from the LLM call)
- An input field at the bottom: "Ask the Context Agent…" — for presenter to type live questions

### 5.3 Right pane — Store Ops (width: 55%)

A 2x2 grid of cards, plus a footfall strip across the top.

**5.3.1 Footfall strip (top, full pane width)**
- Live count: "47 in store now"
- Trend sparkline for the last 60 minutes
- Demand Forecast Agent annotation: "Peak expected at 16:00 (+38%)"

**5.3.2 Inventory card (top-left of grid)**
- Top 5 SKUs by velocity
- Each row: SKU name, units in stock, sparkline, status dot (green/amber/red)
- One row pulsing amber: "Linen Shirt — Sand — M : 3 units · Restock recommended"
- Inventory Agent timestamp: "Last sync 12 sec ago"

**5.3.3 Pricing card (top-right)**
- 2 active price experiments
- "Vanilla candle 200g: S$24 → S$22 (demand +12%)"
- Pricing Agent: "Holding for 24h, then re-evaluate"

**5.3.4 Alerts card (bottom-left)**
- Live alert feed
- Most recent: "VIP customer entering — Priya R. · 14:23"
- One older: "Fitting room 3 occupied 14 min — check in"
- Each alert has a single primary action button

**5.3.5 Peer agents card (bottom-right)**
- Compact list of the other 5 agents reporting in
- Each shows agent name, last action, time
- Example rows:
  - Store Manager AI · "Daily summary posted" · 09:00
  - Loyalty AI · "12 reward claims processed" · 14:18
  - Demand Forecast · "Forecast updated" · 14:00

### 5.4 Bottom strip (height: 60px)

Three sections, evenly spaced:

- **Left:** "Inferences today: 1,247" with a small upward arrow
- **Center:** "Cumulative cost: S$0.8421" with the AMD logo and "AWS EC2 · 4th-Gen EPYC" subtitle
- **Right:** "Avg per inference: S$0.0007" with a tiny "<S$0.001" badge

The cost numbers tick up live whenever the Context Agent fires.

---

## 6. The demo loop (the choreography)

The demo runs on a 90-second loop, designed to be picked up at any point by a passing executive.

| Time | Event | Pane affected |
|---|---|---|
| 0:00 | Loop reset. Store Manager AI summary posts. Footfall: 32. | Right (Peer agents, Footfall) |
| 0:05 | Inventory Agent: "Linen shirt M — 3 units" alert pulses amber. | Right (Inventory) |
| 0:12 | Alerts card: "VIP customer entering — Priya R." | Right (Alerts) |
| 0:14 | Customer header card populates (Priya R., Silver, 4 visits). | Left (Customer header) |
| 0:16 | Journey timeline auto-scrubs from Day -14 to Day 0. | Left (Timeline) |
| 0:30 | Context Agent fires: full live commentary streams (real Claude call). | Left (Context Agent) |
| 0:50 | Cost ticker updates with token usage from the call. | Bottom strip |
| 0:55 | Pricing Agent posts: "Vanilla candle 200g: -8%, demand sensing." | Right (Pricing) |
| 1:05 | Loyalty Agent: "Priya is eligible for a tier-up reward." | Right (Peer agents) |
| 1:15 | Footfall ticks up to 47. | Right (Footfall) |
| 1:30 | Loop resets. | All |

**Manual mode:** A keyboard shortcut (`P` for "presenter mode") pauses the loop. The presenter can then scrub the timeline manually and type questions to the Context Agent. Pressing `P` again resumes the loop.

---

## 7. The Customer Context Agent — implementation detail

This is the most important component. Build it carefully.

### 7.1 Prompt design

The system prompt for the Context Agent must be tight, fast, and structured. Target: <2 second time-to-first-token, <4 second total response.

```
You are the Customer Context Agent inside retailOS — an AI-native retail operating
system by devx labs. You are deployed on a tablet held by a store associate at
Lumen & Co., a multi-brand fashion and lifestyle retailer.

Your job: when a known customer enters the store, give the associate a 60-second
brief that helps them deliver a delightful, personalized experience without being
intrusive.

You will receive a customer profile in JSON. Respond with three short blocks,
each prefixed with one of:
  → SUGGEST: (a specific thing to mention or show)
  → DELIGHT: (a specific way to make this interaction memorable)
  → AVOID: (a specific thing not to do — e.g., don't push loyalty signup if member)

Constraints:
- Be specific. Reference exact products, dates, channels, sizes, prices.
- Be concise. Each block: 1-2 sentences max.
- Be tonally neutral. The associate is a professional. No hype.
- Do not fabricate. Only use facts from the profile.
- Do not greet, sign off, or add preamble. Output only the three blocks.
```

### 7.2 The customer payload (what gets sent to Claude)

```typescript
{
  customer: {
    name: "Priya R.",
    tier: "Silver",
    member_since: "2023-11-04",
    lifetime_value_sgd: 1240,
    last_purchase: { date: "2026-04-27", channel: "Lazada", item: "Vanilla candle 200g", value_sgd: 18 },
    visits_ytd: 4,
    avg_order_value_sgd: 87
  },
  journey_last_14_days: [
    { day_offset: -14, channel: "store", location: "ION Orchard", action: "browsed linen shirts, tried size M, did not purchase" },
    { day_offset: -10, channel: "whatsapp", action: "asked about sustainable cotton tote" },
    { day_offset: -7,  channel: "lazada", action: "purchased vanilla candle 200g for S$18" },
    { day_offset: -3,  channel: "email", action: "opened new arrivals newsletter, clicked linen collection" },
    { day_offset: -1,  channel: "instagram", action: "saved post: oversized linen shirt in sand" },
    { day_offset: 0,   channel: "store", action: "entered Orchard flagship 14:23, currently 2m from linen rack" }
  ],
  store_context: {
    location: "Orchard Flagship",
    inventory_signals: [
      { sku: "Oversized linen shirt — Sand — M", units: 3, status: "low" },
      { sku: "Linen-scented candle 150g", units: 18, status: "ok", note: "new arrival" }
    ],
    associate_capacity: "available",
    queue_at_fitting: 0
  }
}
```

### 7.3 The Anthropic API call

- Model: `claude-sonnet-4-5` (latest as of build date — verify at build time)
- max_tokens: 400
- temperature: 0.3 (we want consistent, professional output, not creative)
- Stream: true (so the typewriter effect is real, not faked)
- Token usage from response → updates cost ticker

### 7.4 Caching for graceful degradation

On first successful call for the demo customer (Priya), cache the full response in `/lib/cached-responses.ts`. If the API fails on a subsequent call, render the cached response with a small `cached` badge in the corner. **The demo never shows an error. Ever.**

### 7.5 Ad-hoc Q&A mode

When the presenter types into the input field, fire a follow-up call with the same customer payload as context, plus their question. Same model, same temperature. Stream the response. Update the cost ticker.

Suggested example prompts the presenter might use (test these):
- "What size did she try last time?"
- "What's a natural cross-sell?"
- "Has she ever bought home goods in store?"
- "Is she likely to convert today?"

---

## 8. Seed data spec

Implement exactly. Three customer personas (one is the hero, two are switchable from a dev menu for variety).

### 8.1 Hero customer — Priya R.

Use the JSON payload in §7.2 verbatim. This is the customer for the default demo loop.

### 8.2 Alternate customer 1 — Marcus T.

```
- 32yo, Tier: Gold, member since 2022
- LTV: S$3,420
- Last purchase: Linen blazer in store, 9 days ago, S$240
- 8 visits YTD, AOV S$220
- Journey signal: in-store visit today, browsing knitwear
- Channel mix: heavy in-store, light digital
- Demo angle: "the loyalist" — Context Agent will suggest a private styling appointment
```

### 8.3 Alternate customer 2 — Aisha K.

```
- 26yo, Tier: Bronze (signed up last week)
- LTV: S$95 (just one purchase)
- Last purchase: scented candle online, 6 days ago, S$22
- 1 visit YTD, AOV S$95
- Journey signal: first-ever store visit, 2 minutes in
- Demo angle: "the new convert" — Context Agent will suggest a low-pressure intro to home goods, AVOID asking for loyalty signup (already a member)
```

### 8.4 Inventory seed (24 SKUs minimum)

Create at least 24 SKUs across two product lines:

- **Apparel:** Linen shirts (4 colors × 4 sizes), oversized cotton tee (3 colors × 3 sizes), linen blazer (2 colors × 3 sizes), summer pants (2 cuts × 3 sizes)
- **Home & lifestyle:** Vanilla candle (3 sizes), linen-scented candle (2 sizes), ceramic vases (3 styles), cotton totes (2 colors)

For each: SKU id, name, color, size, price (SGD), units in stock (range 0–48), velocity (units/week), status (`ok` / `low` / `out`).

Mark **at least 2 SKUs as low** so the inventory card has visible amber alerts.

### 8.5 Footfall seed

A 60-minute rolling array of footfall counts. Should trend gently upward across the demo loop, peaking around 47, with realistic minute-to-minute variance (±3).

### 8.6 Other agent activity log

Pre-canned messages for the Peer Agents card. At least 8 entries spanning the last 6 hours so the card doesn't look thin:

- Store Manager AI · "Daily summary posted" · 09:00
- Demand Forecast · "Updated. Peak +38% at 16:00." · 14:00
- Loyalty AI · "12 reward claims processed" · 14:18
- Inventory AI · "Replenishment order draft prepared" · 13:42
- Pricing AI · "2 demand-sensed price moves staged" · 13:30
- Store Manager AI · "Staffing update: 4 on floor" · 12:00
- Inventory AI · "Cycle count complete — Section B" · 11:15
- Loyalty AI · "Birthday rewards queue: 8 members this week" · 10:45

---

## 9. Build phases

### Phase 1 — Foundation (target: 1 day)
- Next.js + Tailwind + Zustand scaffold
- Theme tokens (palette, typography, spacing) in Tailwind config
- Top bar + two-pane layout + bottom strip — empty shells
- Seed data file with all three customers, inventory, footfall, peer agent log

### Phase 2 — Static panels (target: 1 day)
- Customer header card
- Inventory card, Pricing card, Alerts card, Peer agents card
- Footfall strip (static — no animation yet)
- Wire panels to seed data

### Phase 3 — The journey replay (target: 1 day)
- Horizontal timeline component
- Event cards with channel icons
- Auto-play scrubber + manual drag

### Phase 4 — Customer Context Agent (target: 1.5 days)
- Anthropic API integration with streaming
- Prompt + payload assembly
- Typewriter render of streaming response
- Parsing of SUGGEST / DELIGHT / AVOID structure
- Ad-hoc Q&A input
- Caching layer for graceful degradation

### Phase 5 — The choreography (target: 0.5 day)
- 90-second demo loop, scripted timing per §6
- Presenter mode (`P` keypress) to pause/resume
- Customer switcher (dev menu, hidden behind `Cmd+Shift+D`)

### Phase 6 — Cost ticker + polish (target: 0.5 day)
- Token-based cost calculation
- Live ticker animation
- Final motion polish, microcopy review, logo placements

### Phase 7 — Booth-hardening (target: 0.5 day, must not skip)
- Test with WiFi off → graceful degradation works
- Test with API key invalid → graceful degradation works
- Test on the actual presenter laptop, at booth resolution
- Build a one-page "How to run the demo" README for the booth team

**Total estimate: 6 days for one engineer. Ideal: 4 days for two.**

---

## 10. Acceptance criteria

The demo is accepted when:

1. A passing executive can stop, watch for 30 seconds, and walk away understanding the cross-channel-one-identity story without anyone speaking.
2. A presenter can run a 90-second narrated demo from a hard reset, hitting every beat in §6, in under 2 minutes including reset.
3. The Customer Context Agent fires real Claude inference and renders structured output in under 4 seconds end-to-end.
4. The presenter can ask 5 different ad-hoc questions to the Context Agent and get coherent, customer-specific answers each time.
5. The demo gracefully degrades when the network is disabled — no error states are visible to the audience.
6. The cost ticker shows a real, sub-S$0.001 average cost per inference after a 10-minute demo session.
7. A devx team member who has never seen the code can launch the demo with `npm run dev`, an `.env.local` containing one key, and a README — and have it running in under 5 minutes.
8. The visual design passes the "could this be Shopify Plus?" test. It cannot.

---

## 11. Engineering guardrails

- **No real customer data, ever.** Every customer is synthetic. The doctrine on honesty applies: do not imply this is a live store unless explicitly framed as a simulation.
- **No Anthropic API key in the bundle.** Server-side route handler only (`/app/api/context-agent/route.ts`). The client calls our route, our route calls Anthropic.
- **No telemetry on the booth laptop.** Don't ship analytics. The booth is a demo machine, not a tracked surface.
- **Cost ticker uses real token counts.** Do not fake the math — the credibility of the AWS + AMD slide depends on this being honest.
- **Comment what's real vs. simulated** in the code. Future devx folks running this demo should know exactly what's wired live.
- **Use semantic HTML and ARIA roles.** A booth presenter may need to project this on a large display, and we should not produce inaccessible code even for a demo.

---

## 12. Open items the build team should flag back

These are not blockers, but raise them with Yash before resolving:

1. **The exact retail brand name** — "Lumen & Co." is a placeholder. If devx wants to use a real existing accelerator brand (e.g., a fictional one tied to retailOS messaging), confirm before going to print.
2. **Currency display** — SGD is the default. If the booth audience is mixed APAC, we may want a currency toggle. Default to SGD for AWS Summit Singapore.
3. **Two more languages?** — A "show this in Bahasa / Mandarin" toggle would be a flex for SEA executives. Out of scope for v1 but flag if time permits.
4. **A printable QR code** — At the end of the loop, show a QR that takes the visitor to a one-pager about retailOS + a meeting booking link. Out of scope for the build but mock it in the corner so we have a slot.

---

## 13. Appendix — what good looks like

A passing CIO from a regional retail group stops at the booth at 14:30. They watch the journey timeline scrub once. They lean in for the Context Agent. The presenter types: *"What did she buy last quarter?"* and Claude answers in two seconds. The CIO points at the cost ticker and asks, "*That's per inference?*" The presenter says yes, that's AWS EC2 with 4th-Gen AMD EPYC, and that's why retailOS unit economics work. The CIO says: *"Send me your team's calendar."*

That's the demo.

---

**End of PRD.**
