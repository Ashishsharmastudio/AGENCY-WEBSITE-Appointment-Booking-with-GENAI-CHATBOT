"use client";

import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 sm:px-8">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing Orb */}
      <div className="absolute w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 blur-3xl opacity-30 animate-spin-slow top-1/4 left-4 sm:left-10" />

      {/* Floating Cube */}
      <div className="absolute w-16 sm:w-28 h-16 sm:h-28 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl shadow-[0_0_40px_rgba(0,200,255,0.6)] animate-float top-[60%] sm:top-1/3 right-6 sm:right-1/4" />

      {/* Glassmorphic Content */}
      <div className="relative z-10 text-center px-4 sm:px-8 py-8 sm:py-12 rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)] max-w-3xl">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] leading-tight">
          Elevating Brands <br className="hidden sm:block" /> Into the Future 🚀
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/70 leading-relaxed">
          We craft immersive digital experiences through design, development,
          and strategy that feel truly next-gen.
        </p>

        {/* Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <Link href="/contact">
            <button className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow-lg hover:shadow-cyan-400/50 transform hover:scale-105 transition">
              Start a Project
            </button>
          </Link>
          <Link href="/portfolio">
            <button className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-white/20 hover:shadow-lg transform hover:scale-105 transition">
              View Portfolio
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
