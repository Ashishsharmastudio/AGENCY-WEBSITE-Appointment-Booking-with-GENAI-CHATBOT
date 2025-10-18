"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";


export default function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      title: "E-Commerce Website",
      description: "A modern store with cart & payment gateway.",
      image: "/Eccommerce.png",
    },
    {
      title: "SaaS Dashboard",
      description: "Analytics dashboard with charts & authentication.",
      image: "/Saas.png",
    },
    {
      title: "Mobile App",
      description: "Cross-platform mobile app with sleek UI.",
      image: "/Apps.png",
    },
    {
      title: "Corporate Website",
      description: "Responsive site built with Next.js & Tailwind CSS.",
      image: "/Corporate.png",
    },
    {
      title: "AI Chatbot Integration",
      description:
        "Smart assistant powered by machine learning for customer support.",
      image: "/Chatbot.png",
    },
    {
      title: "Full-Stack Web Platform",
      description:
        "End-to-end solution with secure APIs and cloud deployment.",
      image: "/Fullstack.png",
    },
  ];

  // Auto-scroll with smooth animation
  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    const scrollAmount = slider.clientWidth; // one full viewport width
    const totalSlides = Math.ceil(projects.length / 3); // 3 cards per page
    let index = 0;

    const interval = setInterval(() => {
      if (!slider) return;
      index = (index + 1) % totalSlides;
      setActiveIndex(index);

      slider.scrollTo({
        left: index * scrollAmount,
        behavior: "smooth",
      });
    }, 4000); // 4s per slide

    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <section className="relative z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold text-white mb-6">
          Our Recent Projects
        </h2>
        <p className="text-gray-400 mb-12">
          Here’s a glimpse of what we’ve built for our amazing clients.
        </p>

        {/* Auto Scroll Slider */}
        <div
  ref={scrollRef}
  className="flex gap-8 overflow-x-hidden overflow-y-hidden scroll-smooth no-scrollbar"
>
  {projects.map((project, index) => (
    <div
      key={index}
      className="min-w-[90%] sm:min-w-[45%] md:min-w-[30%] relative group rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:scale-105 transform transition duration-500"
    >
      {/* Project Image */}
      <div className="w-full h-64 relative">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:opacity-70 transition duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 30vw"
          priority={index < 3}
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
        <h3 className="text-2xl font-semibold text-white mb-3 drop-shadow-lg">
          {project.title}
        </h3>
        <p className="text-gray-200 text-sm max-w-xs drop-shadow-md px-3">
          {project.description}
        </p>
      </div>
    </div>
  ))}
</div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(projects.length / 3) }).map(
            (_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full ${
                  activeIndex === i ? "bg-white" : "bg-gray-500"
                }`}
              ></span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
