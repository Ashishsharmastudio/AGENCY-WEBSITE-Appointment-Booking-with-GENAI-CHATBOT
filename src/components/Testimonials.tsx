"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Michael Johnson",
      role: "CEO, TechNova (USA)",
      feedback:
        "Outstanding work! The SaaS platform they built for us exceeded expectations in performance and design.",
      image: "/clients/michael.jpg",
    },
    {
      name: "Emily Carter",
      role: "Founder, BrightEcom (UK)",
      feedback:
        "Our e-commerce store was redesigned beautifully. The modern look has increased customer trust and sales.",
      image: "/clients/emily.webp",
    },
    {
      name: "Lucas Müller",
      role: "CTO, AppVision (Germany)",
      feedback:
        "A highly professional agency. They delivered a mobile app with flawless API integration on time and on budget.",
      image: "/clients/Lucas.avif",
    },
    {
      name: "Sophia Anderson",
      role: "Marketing Director, CloudEdge (USA)",
      feedback:
        "They transformed our website into a modern, user-friendly platform. Customer engagement has gone up significantly.",
      image: "/clients/sophia.jpg",
    },
    {
      name: "James Wilson",
      role: "Co-Founder, FintechPro (UK)",
      feedback:
        "Superb full-stack development service. They built us a secure and scalable fintech solution that works flawlessly.",
      image: "/clients/james.webp",
    },
    {
      name: "Clara Rossi",
      role: "Product Manager, WebCore (Italy)",
      feedback:
        "Great collaboration! Their team was quick, efficient, and delivered exactly what we envisioned for our SaaS product.",
      image: "/clients/clara.webp",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative z-10 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold text-white mb-6">
          Trusted by Global Clients
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Companies across the USA, UK, and Europe rely on us to deliver
          powerful digital solutions that drive results.
        </p>

        {/* Slider */}
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 px-4"
                style={{ flex: "0 0 100%" }} // 1 card per slide
              >
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-4 border-white/20 mb-4 overflow-hidden relative">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <p className="text-gray-300 italic mb-4">“{t.feedback}”</p>
                  <h3 className="text-lg font-semibold text-white">{t.name}</h3>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full ${
                  current === idx ? "bg-white" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
