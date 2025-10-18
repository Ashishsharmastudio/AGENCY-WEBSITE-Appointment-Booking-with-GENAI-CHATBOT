"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Shield } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // If we’re on /admin, make the header dark
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 flex items-center justify-between px-6 py-3 rounded-2xl 
        backdrop-blur-md border shadow-lg transition-all duration-300
        ${isAdminPage ? "bg-black/10 text-black border-black/10" : "bg-white/10 text-white border-white/20"}
      `}
    >
      {/* Logo */}
      <Link href="/">
         <div className="flex items-center gap-2">
           <div className={`w-7 h-7 rounded-full ${isAdminPage ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-purple-500 to-cyan-400"}`} />
           <span className="font-semibold text-lg">Ashish-Agency</span>
         </div>
      </Link>
      {/* Navigation (optional hide for admin) */}
      {!isAdminPage && (
        <nav className="hidden md:flex gap-6 text-white/70 font-medium">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/services" className="hover:text-white transition">Services</Link>
          <Link href="/portfolio" className="hover:text-white transition">Portfolio</Link>
          <Link href="/blog" className="hover:text-white transition">Blog</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
          <Link href="/booking" className="hover:text-white transition">Booking</Link>
        </nav>
      )}

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className={`hidden md:flex w-9 h-9 items-center justify-center rounded-full ${
            isAdminPage ? "bg-black/10 text-black hover:bg-black/20" : "bg-white/10 text-white hover:bg-white/20"
          } transition`}
          title="Admin Panel"
        >
          <Shield size={18} />
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden w-9 h-9 flex items-center justify-center rounded-md ${
            isAdminPage ? "bg-black/10 text-black hover:bg-black/20" : "bg-white/10 text-white hover:bg-white/20"
          } transition`}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>
    </header>
  );
}
