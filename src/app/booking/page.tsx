"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  ChangeEvent,
  FormEvent,
  Suspense,
} from "react";
import dynamic from "next/dynamic";
import { Calendar, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import "./booking.css";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-6 py-10 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400 mx-auto"></div>
        <p className="mt-4 text-cyan-300 text-sm sm:text-base">
          Loading booking form...
        </p>
      </div>
    </div>
  );
}

function BookingForm() {
  const searchParams = useSearchParams();

  const countryCodes = useMemo(
    () => [
      { name: "India", code: "+91", flag: "🇮🇳" },
      { name: "United States", code: "+1-US", flag: "🇺🇸" },
      { name: "Canada", code: "+1-CA", flag: "🇨🇦" },
      { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
      { name: "Australia", code: "+61", flag: "🇦🇺" },
      { name: "Germany", code: "+49", flag: "🇩🇪" },
      { name: "France", code: "+33", flag: "🇫🇷" },
      { name: "UAE", code: "+971", flag: "🇦🇪" },
      { name: "Japan", code: "+81", flag: "🇯🇵" },
      { name: "Singapore", code: "+65", flag: "🇸🇬" },
    ],
    []
  );

  const [form, setForm] = useState({
    name: "",
    countryCode: "+91",
    mobile: "",
    email: "",
    address: "",
    service: "",
    date: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
    const svc = searchParams.get("service");
    if (svc) setForm((p) => ({ ...p, service: svc }));
  }, [searchParams]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("⏳ Booking your appointment...");

    try {
      const normalizedCountry = form.countryCode.replace(/-.*$/, "");
      const fullMobile = `${normalizedCountry}${form.mobile}`;
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, mobile: fullMobile }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Appointment booked successfully!");
        setForm({
          name: "",
          countryCode: "+91",
          mobile: "",
          email: "",
          address: "",
          service: "",
          date: "",
          message: "",
        });
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
    <MotionDiv
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="relative w-full mt-15 max-w-lg sm:max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 z-10"
    >
      <div className="text-center mb-6  sm:mb-8">
        <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Book an Appointment
        </h1>
        <p className="text-gray-300 mt-2 sm:mt-3 text-sm sm:text-base px-1">
          Schedule your service with our expert team. We’ll reach out shortly!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-300">
            Full Name *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full rounded-lg px-4 py-3 bg-white/10 border border-white/30 outline-none text-white placeholder-gray-400 text-sm sm:text-base"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-300">
            Mobile Number *
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              className="w-full sm:w-40 rounded-lg px-3 py-3 bg-white/10 border border-white/30 outline-none text-white text-sm sm:text-base custom-scrollbar"
            >
              {countryCodes.map((c) => (
                <option key={c.name} value={c.code}>
                  {c.flag} {c.name} ({c.code.replace(/-.*$/, "")})
                </option>
              ))}
            </select>

            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              placeholder="Enter your mobile number"
              className="w-full flex-1 rounded-lg px-4 py-3 bg-white/10 border border-white/30 outline-none text-white placeholder-gray-400 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-300">
            Email Address *
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full rounded-lg px-4 py-3 bg-white/10 border border-white/30 outline-none text-white placeholder-gray-400 text-sm sm:text-base"
          />
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-300">
            Service *
          </label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            required
            className="w-full rounded-lg px-4 py-3 bg-white/10 border border-white/30 outline-none text-white text-sm sm:text-base custom-scrollbar"
          >
            <option value="">Select a Service</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Apps">Mobile Apps</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Cloud & Hosting">Cloud & Hosting</option>
            <option value="AI & Automation">AI & Automation</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-300">
            Preferred Date *
          </label>
          <div className="flex items-center gap-3 bg-white/10 border border-white/30 px-3 sm:px-4 py-3 rounded-lg">
            <Calendar className="text-cyan-400 w-5 h-5" />
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              min={minDate || undefined}
              className="bg-transparent outline-none w-full text-white text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-300">
            Additional Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={3}
            placeholder="Any special requirements or details..."
            className="w-full rounded-lg px-4 py-3 bg-white/10 border border-white/30 outline-none text-white placeholder-gray-400 text-sm sm:text-base resize-none"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-black ${
              loading
                ? "bg-gray-500"
                : "bg-gradient-to-r from-purple-400 to-cyan-300"
            }`}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Send size={18} />
              {loading ? "Booking..." : "Book Appointment"}
            </span>
          </button>
        </div>

        {status && (
          <p className="mt-2 text-center text-sm text-gray-300">{status}</p>
        )}
      </form>
    </MotionDiv>
  );
}

export default function BookingPage() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 sm:px-6 py-10 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 sm:w-32 h-20 sm:h-32 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-24 sm:w-40 h-24 sm:h-40 bg-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <Suspense fallback={<LoadingFallback />}>
        <BookingForm />
      </Suspense>
    </section>
  );
}
