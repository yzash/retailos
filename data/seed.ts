// Seed data per PRD §8. Implement exactly as written; do not regenerate from imagination.
// Everything in this file is synthetic. No real customer data, ever.

export type Channel =
  | "store"
  | "whatsapp"
  | "lazada"
  | "email"
  | "instagram"
  | "shopify"
  | "tiktok";

export type JourneyEvent = {
  day_offset: number;
  channel: Channel;
  location?: string;
  action: string;
  value_sgd?: number;
};

export type CustomerProfile = {
  id: string;
  name: string;
  initials: string;
  age?: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  member_since: string;
  lifetime_value_sgd: number;
  last_purchase: {
    date: string;
    channel: Channel;
    item: string;
    value_sgd: number;
  };
  visits_ytd: number;
  avg_order_value_sgd: number;
  channels_used: number;
  journey_last_14_days: JourneyEvent[];
  store_context: {
    location: string;
    inventory_signals: { sku: string; units: number; status: "ok" | "low" | "out"; note?: string }[];
    associate_capacity: "available" | "busy";
    queue_at_fitting: number;
  };
  // For dev menu copywriting only — not sent to the model.
  demo_angle: string;
};

// 8.1 Hero customer — Priya R. (verbatim from §7.2)
export const priya: CustomerProfile = {
  id: "priya",
  name: "Priya R.",
  initials: "PR",
  tier: "Silver",
  member_since: "2023-11-04",
  lifetime_value_sgd: 1240,
  last_purchase: {
    date: "2026-04-27",
    channel: "lazada",
    item: "Vanilla candle 200g",
    value_sgd: 18,
  },
  visits_ytd: 4,
  avg_order_value_sgd: 87,
  channels_used: 5,
  journey_last_14_days: [
    {
      day_offset: -14,
      channel: "store",
      location: "ION Orchard",
      action: "browsed linen shirts, tried size M, did not purchase",
    },
    {
      day_offset: -10,
      channel: "whatsapp",
      action: "asked about sustainable cotton tote",
    },
    {
      day_offset: -7,
      channel: "lazada",
      action: "purchased vanilla candle 200g for S$18",
      value_sgd: 18,
    },
    {
      day_offset: -3,
      channel: "email",
      action: "opened new arrivals newsletter, clicked linen collection",
    },
    {
      day_offset: -1,
      channel: "instagram",
      action: "saved post: oversized linen shirt in sand",
    },
    {
      day_offset: 0,
      channel: "store",
      action: "entered Orchard flagship 14:23, currently 2m from linen rack",
    },
  ],
  store_context: {
    location: "Orchard Flagship",
    inventory_signals: [
      { sku: "Oversized linen shirt — Sand — M", units: 3, status: "low" },
      { sku: "Linen-scented candle 150g", units: 18, status: "ok", note: "new arrival" },
    ],
    associate_capacity: "available",
    queue_at_fitting: 0,
  },
  demo_angle:
    "the hero — cross-channel journey, Silver loyalist, watch the Context Agent stitch six touchpoints",
};

// 8.2 Marcus T.
export const marcus: CustomerProfile = {
  id: "marcus",
  name: "Marcus T.",
  initials: "MT",
  age: 32,
  tier: "Gold",
  member_since: "2022-06-18",
  lifetime_value_sgd: 3420,
  last_purchase: {
    date: "2026-04-25",
    channel: "store",
    item: "Linen blazer — Stone — L",
    value_sgd: 240,
  },
  visits_ytd: 8,
  avg_order_value_sgd: 220,
  channels_used: 3,
  journey_last_14_days: [
    {
      day_offset: -12,
      channel: "store",
      location: "Orchard Flagship",
      action: "private styling appointment, tried two blazers",
    },
    {
      day_offset: -9,
      channel: "store",
      location: "Orchard Flagship",
      action: "purchased linen blazer Stone L for S$240",
      value_sgd: 240,
    },
    {
      day_offset: -6,
      channel: "email",
      action: "opened tailoring care guide",
    },
    {
      day_offset: -2,
      channel: "shopify",
      action: "viewed merino crewneck collection, abandoned cart",
    },
    {
      day_offset: 0,
      channel: "store",
      action: "entered Orchard flagship 14:23, browsing knitwear",
    },
  ],
  store_context: {
    location: "Orchard Flagship",
    inventory_signals: [
      { sku: "Merino crewneck — Charcoal — L", units: 4, status: "ok" },
      { sku: "Linen blazer — Navy — L", units: 1, status: "low" },
    ],
    associate_capacity: "available",
    queue_at_fitting: 0,
  },
  demo_angle:
    "the loyalist — Gold tier, Context Agent should suggest a private styling appointment",
};

// 8.3 Aisha K.
export const aisha: CustomerProfile = {
  id: "aisha",
  name: "Aisha K.",
  initials: "AK",
  age: 26,
  tier: "Bronze",
  member_since: "2026-04-27",
  lifetime_value_sgd: 95,
  last_purchase: {
    date: "2026-04-28",
    channel: "shopify",
    item: "Scented candle — Bergamot 150g",
    value_sgd: 22,
  },
  visits_ytd: 1,
  avg_order_value_sgd: 95,
  channels_used: 2,
  journey_last_14_days: [
    {
      day_offset: -7,
      channel: "instagram",
      action: "followed @lumenandco after candle ad",
    },
    {
      day_offset: -6,
      channel: "shopify",
      action: "purchased scented candle Bergamot 150g for S$22",
      value_sgd: 22,
    },
    {
      day_offset: -6,
      channel: "email",
      action: "signed up for loyalty (Bronze)",
    },
    {
      day_offset: 0,
      channel: "store",
      action: "first-ever store visit, 2 minutes in",
    },
  ],
  store_context: {
    location: "Orchard Flagship",
    inventory_signals: [
      { sku: "Linen-scented candle 150g", units: 18, status: "ok", note: "new arrival" },
      { sku: "Ceramic vase — Sand — Small", units: 6, status: "ok" },
    ],
    associate_capacity: "available",
    queue_at_fitting: 0,
  },
  demo_angle:
    "the new convert — first-ever store visit, Context Agent should suggest a low-pressure intro to home goods and AVOID asking for loyalty signup (already a member)",
};

export const customers: CustomerProfile[] = [priya, marcus, aisha];
export const heroCustomerId = "priya";

// 8.4 Inventory seed (24+ SKUs across two product lines)
export type Sku = {
  id: string;
  name: string;
  line: "Apparel" | "Home & Lifestyle";
  color?: string;
  size?: string;
  price_sgd: number;
  units: number;
  velocity: number; // units / week
  status: "ok" | "low" | "out";
};

const apparel: Sku[] = [
  // Linen shirts (4 colors × 4 sizes)
  ...["Sand", "Sage", "White", "Indigo"].flatMap((color) =>
    ["S", "M", "L", "XL"].map<Sku>((size) => {
      const isHero = color === "Sand" && size === "M";
      return {
        id: `linen-shirt-${color.toLowerCase()}-${size.toLowerCase()}`,
        name: `Oversized linen shirt — ${color} — ${size}`,
        line: "Apparel" as const,
        color,
        size,
        price_sgd: 89,
        units: isHero ? 3 : color === "Indigo" && size === "S" ? 2 : 14 + ((color.length + size.length) % 12),
        velocity: 9,
        status: isHero ? "low" : color === "Indigo" && size === "S" ? "low" : "ok",
      };
    })
  ),
  // Oversized cotton tee (3 colors × 3 sizes)
  ...["Bone", "Charcoal", "Olive"].flatMap((color) =>
    ["S", "M", "L"].map<Sku>((size) => ({
      id: `cotton-tee-${color.toLowerCase()}-${size.toLowerCase()}`,
      name: `Oversized cotton tee — ${color} — ${size}`,
      line: "Apparel",
      color,
      size,
      price_sgd: 42,
      units: 18 + ((color.length * size.length) % 10),
      velocity: 14,
      status: "ok",
    }))
  ),
  // Linen blazer (2 colors × 3 sizes)
  ...["Stone", "Navy"].flatMap((color) =>
    ["M", "L", "XL"].map<Sku>((size) => ({
      id: `linen-blazer-${color.toLowerCase()}-${size.toLowerCase()}`,
      name: `Linen blazer — ${color} — ${size}`,
      line: "Apparel",
      color,
      size,
      price_sgd: 240,
      units: color === "Navy" && size === "L" ? 1 : 6 + ((color.length + size.length) % 5),
      velocity: 4,
      status: color === "Navy" && size === "L" ? "low" : "ok",
    }))
  ),
  // Summer pants (2 cuts × 3 sizes)
  ...["Wide", "Tapered"].flatMap((cut) =>
    ["S", "M", "L"].map<Sku>((size) => ({
      id: `summer-pants-${cut.toLowerCase()}-${size.toLowerCase()}`,
      name: `Summer pants — ${cut} — ${size}`,
      line: "Apparel",
      size,
      price_sgd: 110,
      units: 8 + ((cut.length + size.length) % 7),
      velocity: 6,
      status: "ok",
    }))
  ),
];

const home: Sku[] = [
  // Vanilla candle (3 sizes)
  ...["100g", "200g", "350g"].map<Sku>((size) => ({
    id: `vanilla-candle-${size}`,
    name: `Vanilla candle ${size}`,
    line: "Home & Lifestyle",
    size,
    price_sgd: size === "100g" ? 14 : size === "200g" ? 22 : 36,
    units: size === "200g" ? 28 : 19,
    velocity: 22,
    status: "ok",
  })),
  // Linen-scented candle (2 sizes)
  ...["150g", "300g"].map<Sku>((size) => ({
    id: `linen-candle-${size}`,
    name: `Linen-scented candle ${size}`,
    line: "Home & Lifestyle",
    size,
    price_sgd: size === "150g" ? 24 : 38,
    units: size === "150g" ? 18 : 11,
    velocity: 17,
    status: "ok",
  })),
  // Ceramic vases (3 styles)
  ...["Sand", "Bone", "Charcoal"].map<Sku>((style) => ({
    id: `vase-${style.toLowerCase()}`,
    name: `Ceramic vase — ${style}`,
    line: "Home & Lifestyle",
    color: style,
    price_sgd: 68,
    units: style === "Charcoal" ? 0 : 9,
    velocity: 3,
    status: style === "Charcoal" ? "out" : "ok",
  })),
  // Cotton totes (2 colors)
  ...["Natural", "Sage"].map<Sku>((color) => ({
    id: `tote-${color.toLowerCase()}`,
    name: `Cotton tote — ${color}`,
    line: "Home & Lifestyle",
    color,
    price_sgd: 28,
    units: 24,
    velocity: 11,
    status: "ok",
  })),
];

export const inventory: Sku[] = [...apparel, ...home];

// Top 5 by velocity for the inventory card
export const topInventoryRows: Sku[] = [...inventory]
  .sort((a, b) => b.velocity - a.velocity)
  .slice(0, 5);

// 8.5 Footfall seed — 60 minutes, gentle upward trend, peak ~47, ±3 variance
function buildFootfall(): { minute: number; count: number }[] {
  const out: { minute: number; count: number }[] = [];
  let count = 28;
  for (let i = 0; i < 60; i++) {
    // small upward drift + bounded random-ish variance
    const drift = (47 - count) * 0.08;
    const variance = ((Math.sin(i * 0.7) + Math.cos(i * 1.3)) * 1.5);
    count = Math.max(20, Math.min(50, count + drift + variance));
    out.push({ minute: i, count: Math.round(count) });
  }
  // Anchor the last value near the peak so the demo lands cleanly.
  out[out.length - 1].count = 47;
  return out;
}
export const footfall = buildFootfall();

// 8.6 Peer agent activity — 8 entries spanning ~6 hours
export type PeerEvent = {
  agent: "Store Manager AI" | "Demand Forecast" | "Loyalty AI" | "Inventory AI" | "Pricing AI";
  message: string;
  time: string; // HH:MM
};

export const peerActivity: PeerEvent[] = [
  { agent: "Store Manager AI", message: "Daily summary posted", time: "09:00" },
  { agent: "Loyalty AI", message: "Birthday rewards queue: 8 members this week", time: "10:45" },
  { agent: "Inventory AI", message: "Cycle count complete — Section B", time: "11:15" },
  { agent: "Store Manager AI", message: "Staffing update: 4 on floor", time: "12:00" },
  { agent: "Pricing AI", message: "2 demand-sensed price moves staged", time: "13:30" },
  { agent: "Inventory AI", message: "Replenishment order draft prepared", time: "13:42" },
  { agent: "Demand Forecast", message: "Updated. Peak +38% at 16:00.", time: "14:00" },
  { agent: "Loyalty AI", message: "12 reward claims processed", time: "14:18" },
];

// Pricing experiments shown on the Pricing card
export type PricingExperiment = {
  sku: string;
  from_sgd: number;
  to_sgd: number;
  demand_delta_pct: number;
  agent_note: string;
};
export const pricingExperiments: PricingExperiment[] = [
  {
    sku: "Vanilla candle 200g",
    from_sgd: 24,
    to_sgd: 22,
    demand_delta_pct: 12,
    agent_note: "Holding for 24h, then re-evaluate",
  },
  {
    sku: "Cotton tote — Natural",
    from_sgd: 32,
    to_sgd: 28,
    demand_delta_pct: 7,
    agent_note: "Sustained — promoting to permanent",
  },
];

// Static daily summary posted at t=0 by Store Manager AI
export const storeManagerSummary = {
  posted_at: "09:00",
  message:
    "Yesterday: S$48,210 in sales · 312 transactions · linen shirts +18% WoW. Today: 4 on floor, 1 stylist on call, 2 SKUs flagged for restock.",
};

// Static daily forecast for the Demand Forecast Agent on the footfall strip
export const demandForecast = {
  peak_time: "16:00",
  peak_lift_pct: 38,
};
