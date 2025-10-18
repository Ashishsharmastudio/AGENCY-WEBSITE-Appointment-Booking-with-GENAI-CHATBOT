"use client";

import Link from "next/link";
export default function Banner() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
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
      <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 blur-3xl opacity-30 animate-spin-slow top-1/4 left-10" />

      {/* Floating Cube */}
      <div className="absolute w-28 h-28 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl shadow-[0_0_40px_rgba(0,200,255,0.6)] animate-float top-1/3 right-1/4" />

      {/* Glassmorphic Content */}
      <div className="relative z-10 text-center px-8 py-12 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.2)] max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
          Elevating Brands <br /> Into the Future 🚀
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed">
          We craft immersive digital experiences with design, development, and
          strategy that feel truly next-gen.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <Link href="/contact">
          <button  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow-lg hover:shadow-cyan-400/50 transform hover:scale-105 transition">
            Start a Project
          </button>
          </Link>
          <Link href="/portfolio">
          <button className="px-8 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-white/20 hover:shadow-lg transform hover:scale-105 transition">
            View Portfolio
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
