"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Calendar, Send } from "lucide-react";

export default function BookingPage() {
  const [form, setForm] = useState({
    service: "",
    date: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Strongly typed change handler
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Properly typed submit event
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("⏳ Booking your appointment...");

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Appointment booked successfully!");
        setForm({ service: "", date: "", message: "" });
      } else {
        setStatus(`❌ ${data.error || "Failed to book appointment."}`);
      }
    } catch {
      setStatus("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-6 pt-24 pb-16 text-white">
      <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Book an Appointment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Service Input */}
          <input
            type="text"
            name="service"
            placeholder="Service name"
            value={form.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-cyan-400 outline-none"
          />

          {/* Date Picker */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/20 px-4 py-3 rounded-lg">
            <Calendar className="text-cyan-400" />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="bg-transparent outline-none w-full text-white"
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            placeholder="Message (optional)"
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:border-cyan-400 outline-none resize-none"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-cyan-400 hover:opacity-90"
            }`}
          >
            <Send size={18} /> {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <p className="mt-4 text-center text-sm text-gray-300">{status}</p>
        )}
      </div>
    </section>
  );
}
