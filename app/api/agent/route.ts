import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { AgentMessage } from "@/lib/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are the research assistant embedded in an e-commerce product trends dashboard. \
The dashboard lets a user search a keyword and shows Google Trends data pulled via SerpApi: interest over \
time, interest by region, related queries, and related topics. You are given a snapshot of what's currently \
on screen below. Use it to answer questions, spot product opportunities, explain what the data means, and \
suggest next keywords to research. Be concise and concrete. If the dashboard has no data yet, tell the user \
to search a keyword first.

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
