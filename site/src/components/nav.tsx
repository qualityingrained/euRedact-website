"use client";

import Link from "next/link";
import { useState } from "react";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-primary border-b border-white/10 h-16 flex items-center">
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-8 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black tracking-tighter text-white"
        >
          <span className="material-symbols-outlined text-secondary text-2xl">
            shield_lock
          </span>
          euRedact
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-[0.2em]">
          <Link
            href="/demo"
            className="text-secondary hover:text-emerald-300 transition-colors"
          >
            Live Demo
          </Link>
          <Link
            href="/docs"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/pricing"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="https://github.com/euRedact/euRedact"
            className="text-slate-400 hover:text-white transition-colors"
          >
            GitHub
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/docs"
            className="hidden md:block bg-secondary hover:bg-emerald-400 text-primary text-sm font-black px-6 py-2.5 rounded-lg transition-all hover:-translate-y-0.5 active:scale-95 duration-150 electric-glow uppercase tracking-wider"
          >
            Get Started
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-primary border-b border-white/10 md:hidden">
          <div className="px-6 py-6 flex flex-col gap-4">
            <Link
              href="/demo"
              className="text-secondary hover:text-emerald-300 font-bold text-sm uppercase tracking-[0.2em] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Live Demo
            </Link>
            <Link
              href="/docs"
              className="text-slate-400 hover:text-white font-bold text-sm uppercase tracking-[0.2em] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="text-slate-400 hover:text-white font-bold text-sm uppercase tracking-[0.2em] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="https://github.com/euRedact/euRedact"
              className="text-slate-400 hover:text-white font-bold text-sm uppercase tracking-[0.2em] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              GitHub
            </Link>
            <hr className="border-white/10" />
            <Link
              href="/docs"
              className="bg-secondary text-primary text-sm font-black px-6 py-2.5 rounded-lg text-center uppercase tracking-wider"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
