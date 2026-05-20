"use client";

import { Code, Smartphone, Layers, Globe } from "lucide-react";
import { Cpu, ShoppingCart, Layout, ShoppingBag } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Web Development",
      desc: "Responsive websites built with Next.js & Tailwind CSS.",
      icon: <Globe className="w-10 h-10 text-cyan-400" />,
    },
    {
      title: "SaaS Platforms",
      desc: "Custom SaaS solutions with scalable architecture.",
      icon: <Layers className="w-10 h-10 text-purple-400" />,
    },
    {
      title: "Mobile Apps",
      desc: "Cross-platform apps with smooth performance.",
      icon: <Smartphone className="w-10 h-10 text-pink-400" />,
    },
    {
      title: "Full-Stack Solutions",
      desc: "From frontend to backend, we deliver end-to-end systems.",
      icon: <Code className="w-10 h-10 text-blue-400" />,
    },
    {
      title: "AI & Automation",
      desc: "Integrating AI models and automation tools to supercharge your business processes.",
      icon: <Cpu className="w-10 h-10 text-indigo-400" />,
    },
    {
      title: "E-Commerce Development",
      desc: "Tailored e-commerce platforms optimized for performance and sales.",
      icon: <ShoppingCart className="w-10 h-10 text-emerald-400" />,
    },
    {
      title: "WordPress Development",
      desc: "Custom themes, plugins, and CMS solutions tailored to your brand.",
      icon: <Layout className="w-10 h-10 text-orange-400" />,
    },
    {
      title: "Shopify Development",
      desc: "High-performing e-commerce stores optimized for sales and scalability.",
      icon: <ShoppingBag className="w-10 h-10 text-pink-400" />,
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#24243e] to-[#0f0c29] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Everything you need to bring your digital vision to life
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.1)] 
                         transition transform hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] animate-float-slow"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {/* Icon */}
              <div className="mb-5">{service.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Glow Orb */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 blur-3xl opacity-20 animate-spin-slow"></div>
    </section>
  );
}
