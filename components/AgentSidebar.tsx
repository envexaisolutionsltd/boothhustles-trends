"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AgentMessage, SearchHistoryItem, TrendRecord } from "@/lib/types";
import { buildDashboardContext } from "@/lib/agentContext";

interface AgentSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  trend: TrendRecord | null;
  history: SearchHistoryItem[];
  roiPct: number | null;
}

export function AgentSidebar({ isOpen, onToggle, trend, history, roiPct }: AgentSidebarProps) {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, sending]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const nextMessages: AgentMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          context: buildDashboardContext(trend, history, roiPct),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Agent request failed.");
      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        onClick={onToggle}
        aria-label={isOpen ? "Close research assistant" : "Open research assistant"}
        className={
          "fixed top-1/2 z-30 -translate-y-1/2 rounded-l-lg border border-r-0 border-hairline bg-surface px-2 py-4 text-xs font-semibold text-ink-secondary shadow-sm transition-[right] duration-300 " +
          (isOpen ? "right-[340px] sm:right-[380px]" : "right-0")
        }
        style={{ writingMode: "vertical-rl" }}
      >
        {isOpen ? "Close" : "Agent"}
      </button>

      <aside
        className={
          "fixed right-0 top-0 z-20 flex h-screen w-[340px] flex-col border-l border-hairline bg-surface transition-transform duration-300 sm:w-[380px] " +
          (isOpen ? "translate-x-0" : "translate-x-full")
        }
      >
        <div className="border-b border-hairline px-4 py-4">
          <h2 className="text-sm font-semibold text-ink">Research assistant</h2>
          <p className="mt-0.5 text-xs text-ink-muted">
            Knows what&apos;s on your dashboard right now.
          </p>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.length === 0 && (
            <p className="text-sm text-ink-muted">
              Ask about {trend ? `"${trend.keyword}"` : "trend data"} — opportunities, what the numbers
              mean, or what to search next.
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                "max-w-[90%] rounded-lg px-3 py-2 text-sm " +
                (m.role === "user"
                  ? "ml-auto bg-series-1 text-white"
                  : "bg-ink-muted/10 text-ink")
              }
            >
              {m.content}
            </div>
          ))}
          {sending && <p className="text-xs text-ink-muted">Thinking…</p>}
          {error && <p className="text-xs text-critical">{error}</p>}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 border-t border-hairline p-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the assistant…"
            className="w-full rounded-md border border-hairline bg-background px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-series-1"
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            className="shrink-0 rounded-md bg-series-1 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </aside>
    </>
  );
}
