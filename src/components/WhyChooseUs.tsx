"use client";

import {
  ShieldCheck,
  Zap,
  Users,
  Award,
  Globe,
  Cpu,
} from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Globe className="w-10 h-10 text-blue-400" />,
      title: "Global Reach",
      desc: "We work with clients across the USA, UK, and Europe, delivering solutions tailored to diverse markets.",
    },
    {
      icon: <Cpu className="w-10 h-10 text-pink-400" />,
      title: "Cutting-Edge Tech",
      desc: "We use the latest technologies in web, SaaS, and app development to keep you ahead of competition.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-green-400" />,
      title: "Secure & Reliable",
      desc: "Every project is built with security and scalability at its core, ensuring long-term stability.",
    },
    {
      icon: <Zap className="w-10 h-10 text-yellow-400" />,
      title: "Fast Execution",
      desc: "Our agile process guarantees rapid delivery without compromising on quality or detail.",
    },
    {
      icon: <Users className="w-10 h-10 text-purple-400" />,
      title: "Dedicated Team",
      desc: "Our expert developers and designers work closely with you as true partners in success.",
    },
    {
      icon: <Award className="w-10 h-10 text-red-400" />,
      title: "Proven Success",
      desc: "Trusted by startups and enterprises, we’ve delivered 100+ successful projects worldwide.",
    },
  ];

  return (
    <section className="relative z-10 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-white mb-6">
          Why Choose Our Agency?
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          We’re not just another dev company — we’re your long-term digital partner, 
          helping you scale with innovation and strategy.
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-xl hover:scale-105 transition duration-500 flex flex-col items-center text-center"
            >
              {reason.icon}
              <h3 className="text-xl font-semibold text-white mt-4 mb-2">
                {reason.title}
              </h3>
              <p className="text-gray-400 text-sm">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
