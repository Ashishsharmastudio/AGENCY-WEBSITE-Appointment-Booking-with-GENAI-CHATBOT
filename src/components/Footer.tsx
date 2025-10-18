"use client";

import { Facebook, Twitter, Linkedin, Github, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#070818] via-[#0a0b22] to-[#090a18] text-gray-300 py-24 px-6 border-t border-white/10">
      {/* 🌌 Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* glowing orbs */}
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl top-0 left-20 animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl bottom-0 right-20 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl top-1/2 left-1/3 animate-[bounce_10s_infinite]" />
      </div>

      {/* 🌠 Floating Dots */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* 🌟 Footer Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left relative z-10">
        {/* 🪩 Brand */}
        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-transparent hover:border-cyan-400/50 hover:shadow-[0_0_30px_#06b6d4a0] transition-all duration-500">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Ashish Agency
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Crafting high-performance websites, AI solutions, and SaaS dashboards that transform businesses into digital powerhouses.
          </p>
        </div>

        {/* ⚙️ Quick Links */}
        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-transparent hover:border-purple-400/50 hover:shadow-[0_0_25px_#a855f7a0] transition-all duration-500">
          <h3 className="text-lg font-semibold text-white mb-5">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Services", href: "/services" },
              { name: "Portfolio", href: "/portfolio" },
              { name: "About Us", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="group relative flex items-center gap-2 text-gray-400 hover:text-white transition duration-300"
                >
                  <span className="absolute left-0 h-[1px] w-0 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-6 transition-all"></span>
                  <span className="pl-6 group-hover:pl-7 transition-all">
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 💬 Social Icons */}
        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-transparent hover:border-blue-400/50 hover:shadow-[0_0_25px_#3b82f6a0] transition-all duration-500">
          <h3 className="text-lg font-semibold text-white mb-5">Connect With Us</h3>
          <div className="flex justify-center md:justify-start space-x-6">
            {[
              { icon: <Facebook />, color: "hover:text-blue-400" },
              { icon: <Twitter />, color: "hover:text-sky-400" },
              { icon: <Linkedin />, color: "hover:text-blue-500" },
              { icon: <Github />, color: "hover:text-gray-100" },
              { icon: <Mail />, color: "hover:text-red-400" },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                className={`text-gray-400 ${item.color} transition transform hover:scale-125 hover:drop-shadow-[0_0_10px_#00ffff80]`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 🧠 Bottom Bar */}
      <div className="mt-16 pt-6 border-t border-white/10 text-center text-gray-500 text-sm tracking-wide">
        © {new Date().getFullYear()} ashish Agency. Designed & developed with ❤️ using Next.js + Tailwind.
      </div>
    </footer>
  );
}

