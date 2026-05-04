// PRD §7.4 — graceful degradation. If Anthropic is unreachable, fall back to a
// pre-recorded response so the demo never shows an error to the audience.
// These were authored to match the SUGGEST / DELIGHT / AVOID structure exactly.

export type CachedResponse = {
  text: string;
  // Conservative, plausible token counts so the cost ticker still moves honestly-ish
  // when we're degraded. Marked "cached" in the UI so a curious viewer can tell.
  approx_usage: { input_tokens: number; output_tokens: number };
};

export const cachedBriefByCustomerId: Record<string, CachedResponse> = {
  priya: {
    text:
      "→ SUGGEST: Mention the oversized linen shirt in sand just landed in her size. She saved that exact post on Instagram yesterday and tried the linen fit at ION two weeks ago.\n" +
      "→ DELIGHT: She's a vanilla candle buyer — the new linen-scented candle (150g, just arrived) is a natural pairing and a low-pressure way to extend the visit.\n" +
      "→ AVOID: Don't pitch the loyalty signup — she's already Silver since November 2023.",
    approx_usage: { input_tokens: 480, output_tokens: 110 },
  },
  marcus: {
    text:
      "→ SUGGEST: Offer to pull a private styling slot — he came in twice for blazers and abandoned a merino crewneck cart on Tuesday. The Charcoal L is in stock.\n" +
      "→ DELIGHT: Acknowledge his tailoring care guide click and offer a complimentary fit check on the blazer he bought nine days ago.\n" +
      "→ AVOID: Don't push the new arrivals broadcast — he buys deliberately, and his channels are heavy in-store.",
    approx_usage: { input_tokens: 460, output_tokens: 105 },
  },
  aisha: {
    text:
      "→ SUGGEST: Walk her gently to the home & lifestyle table — she bought a Bergamot candle online last week and the linen-scented 150g is a near-perfect bridge SKU.\n" +
      "→ DELIGHT: This is her first-ever store visit; offer a hand-written thank-you card with her order if she purchases today.\n" +
      "→ AVOID: Do not ask her to sign up for loyalty — she enrolled at Bronze last week.",
    approx_usage: { input_tokens: 420, output_tokens: 100 },
  },
};

// Generic Q&A fallback used when ad-hoc questions can't reach the API.
export const cachedQaFallback: CachedResponse = {
  text:
    "Cached response — network unavailable. Based on the customer profile loaded, the associate's best move is to stay specific to what's been seen across her recent channel activity and avoid generic upsell.",
  approx_usage: { input_tokens: 320, output_tokens: 60 },
};
