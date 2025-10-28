"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

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

  // ✅ Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsPerView(1);
      else if (width < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Auto-scroll logic
  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    const scrollAmount = slider.clientWidth;
    const totalSlides = Math.ceil(projects.length / cardsPerView);
    let index = 0;

    const interval = setInterval(() => {
      if (!slider) return;
      index = (index + 1) % totalSlides;
      setActiveIndex(index);

      slider.scrollTo({
        left: index * scrollAmount,
        behavior: "smooth",
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [cardsPerView, projects.length]);

  return (
    <section className="relative z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center overflow-hidden">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
          Our Recent Projects
        </h2>
        <p className="text-gray-400 mb-10 sm:mb-12 text-sm sm:text-base">
          Here’s a glimpse of what we’ve built for our amazing clients.
        </p>

        {/* ✅ Responsive Auto Scroll Slider */}
        <div
          ref={scrollRef}
          className="flex gap-6 sm:gap-8 overflow-x-hidden scroll-smooth snap-x snap-mandatory no-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overflowY: "hidden",
          }}
        >
          <style jsx>{`
            /* Hide scrollbar (WebKit) */
            ::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {projects.map((project, index) => (
            <div
              key={index}
              className="min-w-[85%] sm:min-w-[48%] lg:min-w-[30%] snap-start relative group rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:scale-105 transform transition duration-500"
            >
              {/* Project Image */}
              <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain p-4 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 30vw"
                  priority={index < 3}
                />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 bg-black/50 backdrop-blur-md px-3 text-center">
                <h3 className="text-lg sm:text-2xl font-semibold text-white mb-1 sm:mb-2 drop-shadow-lg">
                  {project.title}
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm max-w-xs drop-shadow-md">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(projects.length / cardsPerView) }).map(
            (_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full transition ${
                  activeIndex === i ? "bg-white scale-110" : "bg-gray-500"
                }`}
              ></span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
