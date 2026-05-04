// Server-side route handler. PRD §11: API key never ships to the client bundle.
// The browser POSTs here; this route calls Anthropic.

import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { CONTEXT_AGENT_SYSTEM_PROMPT, buildContextPayload } from "@/lib/prompt";
import { customers } from "@/data/seed";
import {
  cachedBriefByCustomerId,
  cachedQaFallback,
} from "@/lib/cached-responses";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  customerId: string;
  mode: "brief" | "qa";
  question?: string;
};

// Streaming format: a sequence of NDJSON lines.
// Events:
//   { "type": "text", "delta": "..." }
//   { "type": "usage", "input_tokens": n, "output_tokens": n, "cached": false }
//   { "type": "done" }
// Cached fallback yields the same shape with cached:true and a synthetic chunked text.
function encode(obj: unknown): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(obj) + "\n");
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  const customer = customers.find((c) => c.id === body.customerId);
  if (!customer) {
    return new Response("Unknown customerId", { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";

  // No key configured → degrade to cached response so the booth never breaks.
  if (!apiKey) {
    return cachedStream(body, customer.id);
  }

  const client = new Anthropic({ apiKey });

  const userContent =
    body.mode === "qa" && body.question
      ? `Customer profile:\n${JSON.stringify(buildContextPayload(customer), null, 2)}\n\nAssociate question: ${body.question}\n\nAnswer the associate's question in 1-3 sentences using only facts from the profile. Be specific. No preamble.`
      : `Customer profile:\n${JSON.stringify(buildContextPayload(customer), null, 2)}\n\nProduce the SUGGEST / DELIGHT / AVOID brief now.`;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // PRD §7.3 — model, tokens, temperature, stream
        const resp = await client.messages.stream({
          model,
          max_tokens: 400,
          temperature: 0.3,
          system: CONTEXT_AGENT_SYSTEM_PROMPT,
          messages: [{ role: "user", content: userContent }],
        });

        for await (const event of resp) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(
              encode({ type: "text", delta: event.delta.text })
            );
          }
        }

        const final = await resp.finalMessage();
        const usage = final.usage;
        controller.enqueue(
          encode({
            type: "usage",
            input_tokens: usage.input_tokens,
            output_tokens: usage.output_tokens,
            cached: false,
          })
        );
        controller.enqueue(encode({ type: "done" }));
        controller.close();
      } catch (err) {
        // Network or API failure → degrade gracefully mid-stream.
        console.error("[context-agent] live call failed, falling back to cached:", err);
        const cached =
          body.mode === "qa"
            ? cachedQaFallback
            : cachedBriefByCustomerId[customer.id] ?? cachedQaFallback;

        // Chunk the cached text so the typewriter still feels alive.
        const chunks = chunk(cached.text, 6);
        for (const c of chunks) {
          controller.enqueue(encode({ type: "text", delta: c }));
          await sleep(18);
        }
        controller.enqueue(
          encode({
            type: "usage",
            input_tokens: cached.approx_usage.input_tokens,
            output_tokens: cached.approx_usage.output_tokens,
            cached: true,
          })
        );
        controller.enqueue(encode({ type: "done" }));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function cachedStream(body: Body, customerId: string) {
  const cached =
    body.mode === "qa"
      ? cachedQaFallback
      : cachedBriefByCustomerId[customerId] ?? cachedQaFallback;
  const stream = new ReadableStream({
    async start(controller) {
      const chunks = chunk(cached.text, 6);
      for (const c of chunks) {
        controller.enqueue(encode({ type: "text", delta: c }));
        await sleep(18);
      }
      controller.enqueue(
        encode({
          type: "usage",
          input_tokens: cached.approx_usage.input_tokens,
          output_tokens: cached.approx_usage.output_tokens,
          cached: true,
        })
      );
      controller.enqueue(encode({ type: "done" }));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function chunk(s: string, size: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < s.length; i += size) out.push(s.slice(i, i + size));
  return out;
}
function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
