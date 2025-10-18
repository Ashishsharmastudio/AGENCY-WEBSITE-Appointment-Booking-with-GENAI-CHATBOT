"use client";

import { ShieldCheck, Zap, Users, Award } from "lucide-react";

export default function AboutCompany() {
  const highlights = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
      title: "Trusted & Reliable",
      desc: "Delivering projects with transparency and trust at every step.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Fast & Efficient",
      desc: "Quick turnarounds without compromising on quality.",
    },
    {
      icon: <Users className="w-8 h-8 text-green-400" />,
      title: "Client-Centric",
      desc: "We listen, adapt, and build exactly what your business needs.",
    },
    {
      icon: <Award className="w-8 h-8 text-purple-400" />,
      title: "Quality First",
      desc: "Clean code, scalable design, and industry best practices.",
    },
  ];

  return (
    <section className="relative z-10 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold text-white mb-6">
          Why Choose Our Agency?
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          We’re not just developers — we’re your digital partners.  
          Our mission is to craft powerful, scalable, and modern digital solutions  
          that help your business grow and stand out.
        </p>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
