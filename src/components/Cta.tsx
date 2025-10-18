"use client";

import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="relative z-10 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-24 px-6">
      <div className="max-w-5xl mx-auto text-center bg-white/5 backdrop-blur-lg border border-white/10 p-12 rounded-3xl shadow-2xl">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Build Your Next Big Project?
        </h2>
        <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
          Whether it’s a SaaS product, a mobile app, or a full-stack website, 
          our team is here to turn your vision into reality. Let’s grow together.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition shadow-lg hover:shadow-blue-500/40"
          >
            Get a Free Consultation
          </Link>
          <Link
            href="/portfolio"
            className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition"
          >
            View Our Work
          </Link>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="w-72 h-72 bg-blue-500/30 rounded-full blur-3xl absolute top-10 left-10 animate-pulse"></div>
        <div className="w-72 h-72 bg-purple-500/30 rounded-full blur-3xl absolute bottom-10 right-10 animate-pulse"></div>
      </div>
    </section>
  );
}
