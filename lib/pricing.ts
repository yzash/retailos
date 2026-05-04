// Claude Sonnet pricing constants. Update when prices change.
// Per the PRD §11, the cost ticker math must be honest — these are the real published rates.
// Source: https://www.anthropic.com/pricing (verify before the show).
//
// As of build, Claude Sonnet 4.5 list prices (USD per 1M tokens):
//   input:  3.00
//   output: 15.00
// SGD/USD assumed at 1.36 — adjust at the booth if FX has moved materially.

export const SONNET_INPUT_USD_PER_MTOK = 3.0;
export const SONNET_OUTPUT_USD_PER_MTOK = 15.0;
export const USD_TO_SGD = 1.36;

export type TokenUsage = {
  input_tokens: number;
  output_tokens: number;
};

export function costSgd(usage: TokenUsage): number {
  const usd =
    (usage.input_tokens / 1_000_000) * SONNET_INPUT_USD_PER_MTOK +
    (usage.output_tokens / 1_000_000) * SONNET_OUTPUT_USD_PER_MTOK;
  return usd * USD_TO_SGD;
}

export function formatSgd(amount: number, decimals = 4): string {
  return `S$${amount.toFixed(decimals)}`;
}
