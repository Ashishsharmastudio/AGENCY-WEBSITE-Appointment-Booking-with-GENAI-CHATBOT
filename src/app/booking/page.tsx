"use client";

import React, { useEffect, useMemo, useState, ChangeEvent, FormEvent, Suspense } from "react";
import dynamic from "next/dynamic";
import { Calendar, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import "./booking.css";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-6 py-10 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400 mx-auto"></div>
        <p className="mt-4 text-cyan-300">Loading booking form...</p>
      </div>
    </div>
  );
}

// Booking form component that uses useSearchParams
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
      { name: "China", code: "+86", flag: "🇨🇳" },
      { name: "Singapore", code: "+65", flag: "🇸🇬" },
      { name: "Italy", code: "+39", flag: "🇮🇹" },
      { name: "Spain", code: "+34", flag: "🇪🇸" },
      { name: "Brazil", code: "+55", flag: "🇧🇷" },
      { name: "Mexico", code: "+52", flag: "🇲🇽" },
      { name: "Russia", code: "+7", flag: "🇷🇺" },
      { name: "South Africa", code: "+27", flag: "🇿🇦" },
      { name: "New Zealand", code: "+64", flag: "🇳🇿" },
      { name: "Nepal", code: "+977", flag: "🇳🇵" },
      { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
      { name: "Pakistan", code: "+92", flag: "🇵🇰" },
      { name: "Sri Lanka", code: "+94", flag: "🇱🇰" },
      { name: "Thailand", code: "+66", flag: "🇹🇭" },
      { name: "Indonesia", code: "+62", flag: "🇮🇩" },
      { name: "Philippines", code: "+63", flag: "🇵🇭" },
      { name: "Vietnam", code: "+84", flag: "🇻🇳" },
      { name: "Malaysia", code: "+60", flag: "🇲🇾" },
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
      className="relative w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 z-10"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Book an Appointment
        </h1>
        <p className="text-gray-300 mt-3 text-sm sm:text-base">
          Schedule your service with our expert team. We&apos;ll reach out shortly!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-300">Full Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full rounded-lg px-4 py-3 bg-white/10 border border-white/30 outline-none text-white placeholder-gray-400"
          />
        </div>

        {/* Country + Mobile */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-300">Mobile Number *</label>
          <div className="flex gap-3 items-center">
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              className="w-40 rounded-lg px-3 py-3 bg-white/10 border border-white/30 outline-none text-white custom-scrollbar"
            >
              {countryCodes.map((c) => (
                <option key={`${c.name}-${c.code}`} value={c.code}>
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
              className="flex-1 rounded-lg px-4 py-3 bg-white/10 border border-white/30 outline-none text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-300">Email Address *</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you&apos;re@example.com"
            className="w-full rounded-lg px-4 py-3 bg-white/10 border border-white/30 outline-none text-white placeholder-gray-400"
          />
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-300">Service *</label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            required
            className="w-full rounded-lg px-4 py-3 bg-white/10 border border-white/30 outline-none text-white custom-scrollbar"
            size={1}
          >
            <option value="">Select a Service</option>
            <option value="Web Development">
              Web Development — Custom websites &amp; web apps built with Next.js, React, and TailwindCSS.
            </option>
            <option value="Mobile Apps">
              Mobile Apps — Cross-platform mobile applications with smooth performance and modern UI/UX.
            </option>
            <option value="UI/UX Design">
              UI/UX Design — Intuitive, user-friendly, and visually appealing designs tailored to your brand.
            </option>
            <option value="Cloud & Hosting">
              Cloud &amp; Hosting — Scalable cloud hosting solutions with AWS, Vercel, and Netlify for reliability.
            </option>
            <option value="System Architecture">
              System Architecture — Strong and maintainable architecture for enterprise-level solutions.
            </option>
            <option value="AI & Automation">
              AI &amp; Automation — Automating workflows and building AI-driven solutions for smarter businesses.
            </option>
            <option value="Cybersecurity">
              Cybersecurity — Robust security solutions to protect your data, apps, and infrastructure.
            </option>
            <option value="SEO & Marketing">
              SEO &amp; Marketing — Boost your online presence with SEO, ads, and data-driven marketing strategies.
            </option>
            <option value="Analytics & Insights">
              Analytics &amp; Insights — Track user behavior and performance metrics with powerful analytics tools.
            </option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-300">Preferred Date *</label>
          <div className="flex items-center gap-3 bg-white/10 border border-white/30 px-4 py-3 rounded-lg">
            <Calendar className="text-cyan-400" />
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              min={minDate || undefined}
              className="bg-transparent outline-none w-full text-white"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-cyan-300">Additional Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={3}
            placeholder="Any special requirements or details..."
            className="w-full rounded-lg px-4 py-3 bg-white/10 border border-white/30 outline-none text-white placeholder-gray-400 resize-none"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-black ${
              loading ? "bg-gray-500" : "bg-gradient-to-r from-purple-400 to-cyan-300"
            }`}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Send size={18} />
              {loading ? "Booking..." : "Book Appointment"}
            </span>
          </button>
        </div>

        {status && <p className="mt-2 text-center text-sm text-gray-300">{status}</p>}
      </form>
    </MotionDiv>
  );
}

// Main page component with Suspense boundary
export default function BookingPage() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-6 py-10 text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <Suspense fallback={<LoadingFallback />}>
        <BookingForm />
      </Suspense>
    </section>
  );
}
