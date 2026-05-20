"use client";
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <nav>
      <Link href="/" className="nav-logo">
        Ashish <span>Sharma</span>
      </Link>
      <div className="nav-links">
        <a href="#for-who">Who I Help</a>
        <a href="#what-i-build">What I Build</a>
        <a href="#demo">Live Labs</a>
        <a href="#work">Work</a>
        <a href="#github">Repos</a>
        <a href="#contact">Contact</a>
        <a href="https://cal.com/ashish-sharma-2000" className="nav-cta">
          Book a Call
        </a>
      </div>
    </nav>
  );
}
