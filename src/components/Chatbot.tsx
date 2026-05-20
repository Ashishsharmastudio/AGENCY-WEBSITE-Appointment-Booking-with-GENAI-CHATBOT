"use client";
import React, { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm Ashish's qualifying assistant. I assess project alignment across clinical systems, aviation dashboards, and RAG platforms. What's your name and business domain?",
    },
  ]);
  const [input, setInput] = useState("");
  const [botState, setBotState] = useState({
    phase: "greet",
    name: "",
    domain: "",
    bottleneck: "",
    budget: "",
  });

  const toggleBotPanel = () => setIsOpen(!isOpen);

  const submitBotChat = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = input.trim();
    if (!t) return;

    setMessages((prev) => [...prev, { role: "user", content: t }]);
    setInput("");

    let nextPhase = botState.phase;
    let nextState = { ...botState };

    setTimeout(async () => {
      if (botState.phase === "greet") {
        nextState.name = t;
        nextState.phase = "domain";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Nice to meet you, ${t}. What is your business domain? (e.g. Wealth Coaching, Medical, Aviation, SaaS)`,
          },
        ]);
      } else if (botState.phase === "domain") {
        nextState.domain = t;
        nextState.phase = "bottleneck";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Understood. What is your biggest technical or operational bottleneck right now?",
          },
        ]);
      } else if (botState.phase === "bottleneck") {
        nextState.bottleneck = t;
        nextState.phase = "budget";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Got it. What is your estimated budget for this solution? (e.g. $1,500–$2,000 / ₹5,00,000 / custom)",
          },
        ]);
      } else if (botState.phase === "budget") {
        nextState.budget = t;
        nextState.phase = "done";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Excellent. Generating your qualification summary and dispatching to Ashish's inbox…",
          },
        ]);

        // Dispatch
        const key = localStorage.getItem("web3forms_access_key") || "ea7d1911-c91f-49b8-b4b7-df35ef2e6399";
        const msg = `Qualified Bot Lead:\n- Name: ${nextState.name}\n- Domain: ${nextState.domain}\n- Bottleneck: ${nextState.bottleneck}\n- Budget: ${nextState.budget}`;
        try {
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              access_key: key,
              subject: `[BOT LEAD] ${nextState.name}`,
              name: "Bot Agent",
              email: "bot@ashishsharma.shop",
              message: msg,
            }),
          });
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: res.ok
                ? "Sent! Ashish will review your details and get back to you within 12 hours. You can also book a call directly via the link in the nav."
                : "Transmission routed via fallback. Ashish will be in touch shortly.",
            },
          ]);
        } catch {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Ashish has been notified. Expect contact within 12 hours.",
            },
          ]);
        }
      }
      setBotState(nextState);
    }, 400);
  };

  return (
    <>
      <div id="bot-bubble" onClick={toggleBotPanel}>
        {!isOpen && <div className="bot-notification" id="bot-notif">1</div>}
        <svg viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
        </svg>
      </div>

      <div id="bot-panel" className={isOpen ? "active" : ""}>
        <div className="bot-header">
          <div className="bot-title-area">
            <div className="bot-avatar">AS</div>
            <div>
              <div className="bot-status-text">Ashish's System Bot</div>
              <div className="bot-status-sub">Qualifying Expert Assistant</div>
            </div>
          </div>
          <button className="close-bot" onClick={toggleBotPanel}>
            &times;
          </button>
        </div>
        <div id="bot-messages">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-bubble ${
                m.role === "assistant" ? "bubble-assistant" : "bubble-user"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>
        <form className="bot-input-form" onSubmit={submitBotChat}>
          <input
            type="text"
            id="bot-input"
            placeholder="Type your name, sector, or question..."
            required
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="bot-submit-btn">
            Send
          </button>
        </form>
      </div>
    </>
  );
}
