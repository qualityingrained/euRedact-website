"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "@/components/wordmark";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-code border-b border-white/10 h-16 flex items-center">
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="euRedact home" className="flex items-center">
            <Wordmark id="nav" className="h-7 w-auto text-white" />
          </Link>

          {/* Version and coverage, joined into one unit as in the design. The
              version string is the SDK's, and the claim tests hold it to the
              softwareVersion in layout.tsx and to the installed package. */}
          <div className="hidden sm:flex items-stretch font-mono text-[11.5px] tracking-[0.04em]">
            <span className="bg-brand text-white font-bold px-2.5 py-1.5 flex items-center">
              v0.3
            </span>
            <span className="border border-l-0 border-outline-variant text-on-surface-variant px-2.5 py-1.5 flex items-center whitespace-nowrap">
              31 countries
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-[0.2em]">
          <Link
            href="/demo"
            className="text-secondary hover:text-secondary-hover transition-colors"
          >
            Live Demo
          </Link>
          <Link
            href="/use-cases"
            className="text-on-surface-variant hover:text-white transition-colors"
          >
            Use Cases
          </Link>
          <Link
            href="/docs"
            className="text-on-surface-variant hover:text-white transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/blog"
            className="text-on-surface-variant hover:text-white transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/pricing"
            className="text-on-surface-variant hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="https://github.com/euRedact/euRedact"
            className="text-on-surface-variant hover:text-white transition-colors"
          >
            GitHub
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/docs"
            className="hidden md:block bg-secondary hover:bg-secondary-hover text-primary text-sm font-black px-6 py-2.5 rounded-lg transition-all hover:-translate-y-0.5 active:scale-95 duration-150 electric-glow uppercase tracking-wider"
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
        <div className="absolute top-16 left-0 w-full bg-code border-b border-white/10 md:hidden">
          <div className="px-6 py-6 flex flex-col gap-4">
            <Link
              href="/demo"
              className="text-secondary hover:text-secondary-hover font-bold text-sm uppercase tracking-[0.2em] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Live Demo
            </Link>
            <Link
              href="/use-cases"
              className="text-on-surface-variant hover:text-white font-bold text-sm uppercase tracking-[0.2em] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Use Cases
            </Link>
            <Link
              href="/docs"
              className="text-on-surface-variant hover:text-white font-bold text-sm uppercase tracking-[0.2em] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/blog"
              className="text-on-surface-variant hover:text-white font-bold text-sm uppercase tracking-[0.2em] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/pricing"
              className="text-on-surface-variant hover:text-white font-bold text-sm uppercase tracking-[0.2em] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="https://github.com/euRedact/euRedact"
              className="text-on-surface-variant hover:text-white font-bold text-sm uppercase tracking-[0.2em] transition-colors"
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
