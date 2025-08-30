import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "No message provided." }, { status: 400 });
    }

    // Call local Ollama llama3 model
    const r = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: message,
        stream: false
      }),
    });

    if (!r.ok) {
      const t = await r.text();
      console.error("Ollama error:", r.status, t);
      return NextResponse.json({ reply: `Ollama error (${r.status}).` }, { status: 500 });
    }

    const data = await r.json();
    return NextResponse.json({ reply: data.response });
  } catch (e) {
    console.error("API route crash:", e);
    return NextResponse.json({ reply: "Server crashed." }, { status: 500 });
  }
}
