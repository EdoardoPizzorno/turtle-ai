import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navbarRef = useRef(null);

  useEffect(() => {
    if (!navbarRef.current) return;

    gsap.set(navbarRef.current, {
      y: -120,
      opacity: 0,
      visibility: "hidden",
    });

    gsap.to(navbarRef.current, {
      y: 0,
      opacity: 1,
      visibility: "visible",
      duration: 1.2,
      ease: "power3.out",
      delay: 1,
    });
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-gradient-to-b from-white/90 to-white/70 border-b border-emerald-400/30"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3.5">
        <div className="font-extrabold tracking-wide text-emerald-600 text-xl">
          TurtleAI
        </div>
        <nav className="hidden md:flex items-center gap-4.5">
          <a href="#markets" className="text-slate-700 text-sm hover:text-emerald-600 transition-all">Markets</a>
          <a href="#analytics" className="text-slate-700 text-sm hover:text-emerald-600 transition-all">Analytics</a>
          <a href="#pricing" className="text-slate-700 text-sm hover:text-emerald-600 transition-all">Pricing</a>
          <a href="#docs" className="text-slate-700 text-sm hover:text-emerald-600 transition-all">Docs</a>
        </nav>
        <a
          href="#app"
          className="px-3.5 py-2 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-500 text-white font-bold border border-emerald-500/30 shadow-md shadow-emerald-400/25 hover:brightness-110 transition-all"
        >
          Launch App
        </a>
      </div>
    </nav>
  );
}
