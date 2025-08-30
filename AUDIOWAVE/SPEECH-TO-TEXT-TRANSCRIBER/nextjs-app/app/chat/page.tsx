"use client";

import { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const handleSend = async () => {
    if (message.trim() === "") return;

    // user ka message show
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    const userMsg = message;
    setMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", content: "Error: Could not connect." }]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Chat messages */}
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          backgroundColor: "rgba(255,255,255,0.1)",
          padding: "1rem",
          borderRadius: "12px",
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: "0.5rem" }}>
            <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.content}
          </div>
        ))}
      </div>

      {/* Input + button */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{
            padding: "0.7rem 1rem",
            borderRadius: "12px",
            border: "1px solid #4CAF50",
            width: "70%",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "0.7rem 1.5rem",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
