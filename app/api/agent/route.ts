import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { AgentMessage } from "@/lib/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are a resale/flipping advisor embedded in "Resell Radar", a dashboard a reseller \
uses to decide whether an item is worth buying to flip. The dashboard searches Google Trends data via SerpApi \
(interest over time, interest by region, related queries/topics) and computes a rules-based BUY/WATCH/SKIP \
verdict from demand momentum, position vs. peak, breakout signals, and overall search volume — that verdict \
carries no price information, it is purely about demand. You're given a snapshot of what's on screen below, \
including that verdict and its reasons, and whether the item is already on the user's watchlist (with any cost \
they've entered).

Your job: help the user decide, fast. Agree or push back on the computed verdict using what you know about \
resale markets, seasonality, and typical demand patterns for that kind of item. If they've entered a cost, \
reason qualitatively about whether it's worth it — be explicit that you're estimating from general knowledge, \
not live marketplace comps, since no pricing API is connected. Flag seasonal risk (e.g. buying holiday stock \
in January). Suggest related keywords worth checking next when relevant. Be concise, concrete, and decisive — \
talk like a sharp reselling friend, not a generic assistant. If the dashboard has no item selected yet, tell \
the user to search one first.

Dashboard context:
`;

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY is not configured." }, { status: 500 });
  }

  try {
    const { messages, context } = (await req.json()) as {
      messages: AgentMessage[];
      context: string;
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages is required" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      max_completion_tokens: 700,
      messages: [
        { role: "system", content: SYSTEM_PROMPT + context },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const reply = response.choices[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
