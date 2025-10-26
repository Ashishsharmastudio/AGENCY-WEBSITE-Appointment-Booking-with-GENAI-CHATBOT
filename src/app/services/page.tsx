// src/app/services/page.tsx
"use client";

import {
  Code,
  Smartphone,
  Layers,
  Globe,
  Palette,
  Shield,
  Cpu,
  BarChart,
  Search,
  Rocket,
  Users,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      title: "Web Development",
      desc: "Custom websites & web apps built with Next.js, React, and TailwindCSS.",
      icon: <Code size={32} />,
      badge: "Popular",
    },
    {
      title: "Mobile Apps",
      desc: "Cross-platform mobile applications with smooth performance and modern UI/UX.",
      icon: <Smartphone size={32} />,
      badge: "Trending",
    },
    {
      title: "UI/UX Design",
      desc: "Intuitive, user-friendly, and visually appealing designs tailored to your brand.",
      icon: <Palette size={32} />,
      badge: "Creative",
    },
    {
      title: "Cloud & Hosting",
      desc: "Scalable cloud hosting solutions with AWS, Vercel, and Netlify for reliability.",
      icon: <Globe size={32} />,
      badge: "Pro",
    },
    {
      title: "System Architecture",
      desc: "Strong and maintainable architecture for enterprise-level solutions.",
      icon: <Layers size={32} />,
      badge: "Enterprise",
    },
    {
      title: "AI & Automation",
      desc: "Automating workflows and building AI-driven solutions for smarter businesses.",
      icon: <Cpu size={32} />,
      badge: "Next-Gen",
    },
    {
      title: "Cybersecurity",
      desc: "Robust security solutions to protect your data, apps, and infrastructure.",
      icon: <Shield size={32} />,
      badge: "Secure",
    },
    {
      title: "SEO & Marketing",
      desc: "Boost your online presence with SEO, ads, and data-driven marketing strategies.",
      icon: <Search size={32} />,
      badge: "Growth",
    },
    {
      title: "Analytics & Insights",
      desc: "Track user behavior and performance metrics with powerful analytics tools.",
      icon: <BarChart size={32} />,
      badge: "Data-Driven",
    },
  ];

  const workflow = [
    {
      step: "Discovery",
      desc: "We start by understanding your goals, challenges, and vision.",
      icon: <Users size={28} />,
    },
    {
      step: "Strategy",
      desc: "We design a roadmap and choose the right tech stack for your needs.",
      icon: <Rocket size={28} />,
    },
    {
      step: "Development",
      desc: "Our experts build, test, and iterate with clean and scalable code.",
      icon: <Code size={28} />,
    },
    {
      step: "Launch",
      desc: "We deploy your solution to production with reliability and speed.",
      icon: <Globe size={28} />,
    },
    {
      step: "Support",
      desc: "Post-launch, we provide continuous support and optimization.",
      icon: <Shield size={28} />,
    },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white pt-32 px-6 overflow-hidden">
      {/* Floating background orbs */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-ping"></div>

      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our <span className="text-cyan-400">Services</span>
        </h1>
        <p className="text-white/70">
          We provide complete end-to-end digital solutions that help your
          business scale with confidence. Explore our wide range of services.
        </p>
      </section>

      {/* Services Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
        {services.map((service, i) => (
          <div
            key={i}
            className="group relative p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl 
                       transition-all duration-500 hover:scale-105 hover:shadow-cyan-500/40"
          >
            {/* Badge */}
            <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              {service.badge}
            </span>

            {/* Icon */}
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-white mb-5">
              {service.icon}
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition">
              {service.title}
            </h3>
            <p className="text-white/70 text-sm mb-6">{service.desc}</p>

            {/* Book Appointment Button */}
            <a
              href="/booking"
              className="inline-block w-full text-center px-4 py-2 mt-auto rounded-lg 
                         bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium 
                         shadow-md hover:shadow-cyan-400/30 hover:scale-105 transition-all duration-300"
            >
              Book Appointment
            </a>
          </div>
        ))}
      </section>

      {/* How We Work Section */}
      <section className="relative z-10 max-w-6xl mx-auto mt-28 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          How We <span className="text-cyan-400">Work</span> with Clients
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto mb-12">
          Our professional approach ensures seamless collaboration and
          outstanding results. Here’s how we transform your ideas into success.
        </p>

        <div className="grid md:grid-cols-5 gap-8">
          {workflow.map((step, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-lg shadow-lg hover:shadow-cyan-400/30 transition"
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.step}</h3>
              <p className="text-sm text-white/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center max-w-2xl mx-auto mt-20 mb-20 relative z-10">
        <h2 className="text-3xl font-bold mb-4">🚀 Ready to build your next big idea?</h2>
        <p className="text-white/70 mb-6">
          Let’s work together to bring your vision to life. Contact our team
          today and get started.
        </p>
        <a
          href="/contact"
          className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 
                     text-white font-semibold shadow-lg hover:shadow-cyan-400/40 transition"
        >
          Get in Touch
        </a>
      </section>
    </main>
  );
}
