"use client";
import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Message = { sender: "user" | "bot"; text: string };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      const botMsg: Message = {
        sender: "bot",
        text: data.reply || "Something went wrong.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = {
        sender: "bot",
        text: "Network error. Try again later.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-cyan-400 p-4 rounded-full shadow-lg hover:scale-110 transition z-50"
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={26} className="text-white" />
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-[420px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col text-white z-50">
          <div className="flex justify-between items-center px-4 py-3 border-b border-white/20">
            <h3 className="font-semibold">💬 Gemini Assistant</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ✖
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
            {messages.length === 0 && (
              <p className="text-center text-gray-400 mt-8">
                Hi! 👋 I’m your AI assistant.
                <br />
                Ask me anything about our services.
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-purple-500 to-cyan-400"
                      : "bg-white/10 border border-white/20"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <p className="text-center text-gray-400 italic">Thinking...</p>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            className="flex p-3 border-t border-white/20"
          >
            <input
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="text-cyan-400 hover:text-white transition"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
