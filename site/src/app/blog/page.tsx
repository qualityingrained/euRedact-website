"use client";

import { useState } from "react";

type Category =
  | "All"
  | "Technical"
  | "GDPR & Compliance"
  | "Product Updates"
  | "Benchmarks"
  | "Use Cases";

interface Post {
  title: string;
  category: Exclude<Category, "All">;
  date: string;
  readTime: string;
  excerpt: string;
}

const posts: Post[] = [
  {
    category: "Technical",
    title: "How Our Two-Pass Rule Engine Eliminates False Positives",
    date: "Mar 28, 2026",
    readTime: "8 min",
    excerpt:
      "Our detection pipeline uses a two-pass approach: broad pattern matching followed by structural validation...",
  },
  {
    category: "GDPR & Compliance",
    title: "PII Redaction Under GDPR Article 4(5): A Developer's Guide",
    date: "Mar 20, 2026",
    readTime: "12 min",
    excerpt:
      "Article 4(5) defines pseudonymisation as processing personal data in such a manner...",
  },
  {
    category: "Benchmarks",
    title: "euRedact vs. Presidio vs. AWS Comprehend on EU Data",
    date: "Mar 15, 2026",
    readTime: "10 min",
    excerpt:
      "We ran all three tools against 147,300 synthetic European PII records...",
  },
  {
    category: "Product Updates",
    title: "v0.1.0 — 31 Countries, 99.1% Recall, 4,700 FP",
    date: "Mar 10, 2026",
    readTime: "5 min",
    excerpt:
      "Today we're releasing euRedact v0.1.0 with support for 31 European countries...",
  },
  {
    category: "Use Cases",
    title: "Pre-processing Documents for LLM Training with euRedact",
    date: "Mar 5, 2026",
    readTime: "7 min",
    excerpt:
      "Before feeding European documents into LLM training pipelines, PII must be removed...",
  },
  {
    category: "Technical",
    title: "Unicode Normalization: Why Your Regex Misses Müller",
    date: "Feb 28, 2026",
    readTime: "6 min",
    excerpt:
      "When processing German text, a regex for 'ü' might miss 'ü' encoded as u+0308...",
  },
];

const categories: Category[] = [
  "All",
  "Technical",
  "GDPR & Compliance",
  "Product Updates",
  "Benchmarks",
  "Use Cases",
];

const categoryColors: Record<Exclude<Category, "All">, string> = {
  Technical: "bg-indigo-100 text-indigo-700",
  "GDPR & Compliance": "bg-emerald-100 text-emerald-700",
  "Product Updates": "bg-amber-100 text-amber-700",
  Benchmarks: "bg-sky-100 text-sky-700",
  "Use Cases": "bg-violet-100 text-violet-700",
};

export default function BlogPage() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* ── Header ── */}
      <section className="bg-primary hero-pattern pt-32 py-16">
        <div className="mx-auto max-w-7xl px-8">
          <h1 className="font-black text-5xl text-white">Blog</h1>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl">
            Technical deep-dives, GDPR guides, and product updates.
          </p>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <div className="bg-white border-b border-slate-200 py-6 px-8">
        <div className="mx-auto max-w-7xl flex gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm transition-colors ${
                active === cat
                  ? "bg-secondary text-primary font-black"
                  : "bg-slate-100 text-slate-500 font-bold hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Blog Grid ── */}
      <section className="mx-auto max-w-7xl py-20 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filtered.map((post) => (
            <article
              key={post.title}
              className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-10 hover:-translate-y-2 transition-transform"
            >
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${categoryColors[post.category]}`}
              >
                {post.category}
              </span>

              <h2 className="mt-4 font-black text-xl text-primary">
                {post.title}
              </h2>

              <p className="mt-2 text-xs uppercase tracking-widest text-slate-400 font-black">
                {post.date} &middot; {post.readTime}
              </p>

              <p className="mt-3 text-slate-500 line-clamp-2">
                {post.excerpt}
              </p>

              <a
                href="#"
                className="mt-4 inline-block text-secondary font-black"
              >
                Read more &rarr;
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ── Newsletter Signup ── */}
      <section className="mx-auto max-w-7xl px-8 pb-20">
        <div className="bg-accent-indigo rounded-[3rem] p-16 text-center">
          <h2 className="font-black text-3xl text-white mb-4">Stay Updated</h2>
          <p className="text-slate-300 mb-8">
            Get notified about new features and GDPR guides.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="you@company.com"
              className="bg-white/10 text-white placeholder:text-white/40 border border-white/20 rounded-xl px-6 py-4 flex-1 max-w-md w-full focus:outline-none focus:border-secondary"
            />
            <button className="bg-secondary text-primary font-black rounded-xl px-8 py-4 hover:brightness-110 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
