"use client";

import { motion } from "framer-motion";
import { Users, Rocket, Heart, Award } from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutPage() {
  // Floating background circles
  const [circles, setCircles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setCircles(arr);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-6 pt-24 pb-16">
      {/* Animated background circles */}
      {circles.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-full bg-purple-500/20 blur-3xl"
          style={{ width: 200, height: 200, top: c.y, left: c.x }}
          animate={{
            y: [c.y, c.y + 40, c.y],
            x: [c.x, c.x + 30, c.x],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Hero Section */}
      <div className="relative text-center max-w-4xl mx-auto mb-16 z-10">
        <motion.h1
          className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.h1>
        <motion.p
          className="text-gray-300 mt-6 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          We are a team of dreamers, creators, and innovators, crafting
          extraordinary digital experiences that inspire the future.
        </motion.p>
      </div>

      {/* Who We Are with Fade-up Animation */}
      <motion.div
        className="max-w-5xl mx-auto text-center mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-white mb-4">Who We Are</h2>
        <p className="text-gray-300 text-lg">
          Our agency builds scalable web apps, stunning designs, and unforgettable
          user journeys. With clients across the USA, UK, and beyond, we blend
          innovation and reliability.
        </p>
      </motion.div>

      {/* Our Values with Hover Tilt */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-24 z-10">
        {[
          { icon: <Users size={32} />, title: "Collaboration", text: "Teamwork creates magic." },
          { icon: <Rocket size={32} />, title: "Innovation", text: "We explore future tech." },
          { icon: <Heart size={32} />, title: "Passion", text: "We love our craft." },
          { icon: <Award size={32} />, title: "Excellence", text: "Quality at every step." },
        ].map((value, idx) => (
          <motion.div
            key={idx}
            className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-lg shadow-lg p-8 text-center text-white cursor-pointer transform transition hover:rotate-1 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4 text-cyan-400">{value.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
            <p className="text-gray-300 text-sm">{value.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Timeline / Journey */}
      <div className="relative max-w-5xl mx-auto mb-32">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Our Journey
        </h2>

        <div className="relative border-l-4 border-purple-500/50 ml-6">
          {[
            { year: "2018", text: "Founded with a vision to innovate." },
            { year: "2020", text: "Expanded to global clients." },
            { year: "2023", text: "Awarded as top digital agency." },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              className={`mb-12 ml-6 flex items-start gap-6 ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse mr-6"
                }`}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Circle with year */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg">
                  {step.year}
                </div>
                <span className="absolute w-4 h-4 rounded-full bg-cyan-400 -left-10 top-1/2 transform -translate-y-1/2 animate-pulse"></span>
              </div>

              {/* Text box */}
              <div className="rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 max-w-md shadow-md">
                <p className="text-gray-300 text-lg">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


      {/* Team with Flip Animation */}
      {/* <div className="max-w-6xl mx-auto text-center z-10">
        <h2 className="text-4xl font-bold text-white mb-10">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "Alice Johnson",
              role: "Lead Designer",
              image: "https://source.unsplash.com/300x300/?woman,designer",
            },
            {
              name: "David Smith",
              role: "Full Stack Developer",
              image: "https://source.unsplash.com/300x300/?man,developer",
            },
            {
              name: "Sophia Lee",
              role: "Project Manager",
              image: "https://source.unsplash.com/300x300/?woman,manager",
            },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              className="relative group perspective"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.3 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
             
                <div className="absolute inset-0 rounded-xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-lg shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={240}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-gray-400 text-sm">{member.role}</p>
                  </div>
                </div>
                
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 text-white p-6 rotate-y-180 backface-hidden flex items-center justify-center">
                  <p className="text-lg font-medium">
                    {member.name} is passionate about creating amazing digital solutions
                    and leading projects to success.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div> */}
    </section>
  );
}
