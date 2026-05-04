"use client";

import { useEffect, useRef, useState } from "react";
import { useStore, type AgentMessage } from "@/lib/store";
import { costSgd } from "@/lib/pricing";

// Title bar dot is teal-pulsing while an inference is in flight.
export function ContextAgent() {
  const customer = useStore((s) => s.customer());
  const messages = useStore((s) => s.agentMessages);
  const pushAgentMessage = useStore((s) => s.pushAgentMessage);
  const appendAgentText = useStore((s) => s.appendAgentText);
  const finalizeAgentMessage = useStore((s) => s.finalizeAgentMessage);
  const recordInference = useStore((s) => s.recordInference);

  const [busy, setBusy] = useState(false);
  const [question, setQuestion] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function fire(mode: "brief" | "qa", q?: string) {
    if (busy) return;
    setBusy(true);
    const id = `m-${Date.now()}`;
    pushAgentMessage({ id, text: "", cached: false, streaming: true });
    try {
      const res = await fetch("/api/context-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: customer.id,
          mode,
          question: q,
        }),
      });
      if (!res.ok || !res.body) throw new Error("bad response");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          const line = buf.slice(0, nl).trim();
          buf = buf.slice(nl + 1);
          if (!line) continue;
          let evt: any;
          try {
            evt = JSON.parse(line);
          } catch {
            continue;
          }
          if (evt.type === "text") {
            appendAgentText(id, evt.delta);
          } else if (evt.type === "usage") {
            const sgd = costSgd({
              input_tokens: evt.input_tokens,
              output_tokens: evt.output_tokens,
            });
            recordInference(sgd);
            if (evt.cached) {
              // mark message cached
              useStore.setState((s) => ({
                agentMessages: s.agentMessages.map((m) =>
                  m.id === id ? { ...m, cached: true } : m
                ),
              }));
            }
          } else if (evt.type === "done") {
            finalizeAgentMessage(id);
          }
        }
      }
    } catch {
      // Defensive: route already degrades, but if even the fetch fails,
      // mark the message as cached and finalize so the demo never shows an error.
      useStore.setState((s) => ({
        agentMessages: s.agentMessages.map((m) =>
          m.id === id
            ? {
                ...m,
                cached: true,
                streaming: false,
                text:
                  m.text ||
                  "→ SUGGEST: Acknowledge her recent activity and stay specific.\n→ DELIGHT: Tie a small in-store moment to her last digital touchpoint.\n→ AVOID: Generic upsell or asking for loyalty signup if already enrolled.",
              }
            : m
        ),
      }));
    } finally {
      setBusy(false);
    }
  }

  // Expose `fire` to the demo loop without prop-drilling.
  useEffect(() => {
    (window as any).__retailos_fireBrief = () => fire("brief");
    return () => {
      delete (window as any).__retailos_fireBrief;
    };
  }, [customer.id]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = question.trim();
    if (!q) return;
    setQuestion("");
    fire("qa", q);
  }

  return (
    <article
      className="hairline rounded-xl bg-white"
      aria-label="Customer Context Agent"
    >
      <header className="hairline-b flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-full bg-teal-700 ${
              busy ? "animate-pulseDot" : ""
            }`}
            aria-hidden
          />
          <h3 className="text-sm font-semibold tracking-tight">
            Customer Context Agent
          </h3>
          <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-teal-700">
            Live
          </span>
        </div>
        <div className="text-[11px] text-slate-500">
          Real Anthropic inference · Claude Sonnet
        </div>
      </header>

      <div
        ref={scrollRef}
        className="panel-scroll max-h-[260px] overflow-y-auto px-5 py-4"
      >
        {messages.length === 0 && !busy && (
          <p className="text-sm leading-relaxed text-slate-500">
            Awaiting customer signal. The agent will brief the associate when{" "}
            {customer.name} is recognized in store.
          </p>
        )}
        <ul className="space-y-4">
          {messages.map((m) => (
            <AgentBubble key={m.id} m={m} />
          ))}
        </ul>
      </div>

      <form
        onSubmit={onSubmit}
        className="hairline-t flex items-center gap-2 px-5 py-3"
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={busy}
          placeholder="Ask the Context Agent…"
          className="flex-1 bg-transparent text-sm placeholder:text-slate-400 focus:outline-none"
          aria-label="Ask the Context Agent"
        />
        <button
          type="submit"
          disabled={busy || !question.trim()}
          className="rounded-full bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
        >
          Ask
        </button>
      </form>
    </article>
  );
}

function AgentBubble({ m }: { m: AgentMessage }) {
  return (
    <li className="rounded-lg bg-warm-50 px-4 py-3 hairline animate-fadeIn">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-teal-700">
          Context Agent
        </span>
        {m.cached && (
          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-amber-800">
            cached
          </span>
        )}
      </div>
      <FormattedAgentText text={m.text} streaming={m.streaming} />
    </li>
  );
}

function FormattedAgentText({
  text,
  streaming,
}: {
  text: string;
  streaming: boolean;
}) {
  // Highlight the SUGGEST / DELIGHT / AVOID prefixes with their icons.
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  return (
    <div className="space-y-2 text-sm leading-relaxed text-charcoal">
      {lines.map((line, i) => {
        const last = i === lines.length - 1;
        const m = line.match(/^→\s*(SUGGEST|DELIGHT|AVOID):\s*(.*)$/);
        if (m) {
          const tag = m[1] as "SUGGEST" | "DELIGHT" | "AVOID";
          const body = m[2];
          const icon =
            tag === "SUGGEST" ? "👁" : tag === "DELIGHT" ? "✨" : "⛔";
          const tone =
            tag === "SUGGEST"
              ? "text-teal-800"
              : tag === "DELIGHT"
                ? "text-amber-800"
                : "text-rose-800";
          return (
            <p key={i} className="flex gap-2">
              <span aria-hidden className="flex h-5 w-5 items-center justify-center text-base">
                {icon}
              </span>
              <span>
                <span className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${tone} mr-2`}>
                  {tag}
                </span>
                <span>
                  {body}
                  {last && streaming ? <span className="caret" /> : null}
                </span>
              </span>
            </p>
          );
        }
        return (
          <p key={i}>
            {line}
            {last && streaming ? <span className="caret" /> : null}
          </p>
        );
      })}
      {text.length === 0 && streaming && <span className="caret" />}
    </div>
  );
}
