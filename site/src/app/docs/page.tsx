import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation — euRedact",
  description:
    "Get started with euRedact — the open-source European PII redaction SDK for Python and Node.js.",
};

const cards = [
  {
    href: "/docs/quickstart",
    icon: "rocket_launch",
    title: "Quickstart",
    description:
      "Get up and running in 30 seconds with Python or Node.js.",
    accent: true,
  },
  {
    href: "/docs/python",
    icon: "code",
    title: "Python SDK",
    description:
      "Full API reference for the euredact Python package. Sync and async support.",
  },
  {
    href: "/docs/nodejs",
    icon: "javascript",
    title: "Node.js SDK",
    description:
      "Full API reference for the euredact npm package. Zero dependencies, 86KB.",
  },
  {
    href: "https://github.com/euRedact/euRedact",
    icon: "code",
    title: "GitHub Repository",
    description:
      "Browse the source code, open issues, and contribute to the project.",
    external: true,
  },
];

export default function DocsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary hero-pattern py-20">
        <div className="mx-auto max-w-4xl px-8">
          <h1 className="font-black text-5xl text-white tracking-tight">
            Documentation
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed max-w-2xl">
            Everything you need to integrate European PII redaction into your
            application. Available as open-source SDKs for Python and Node.js.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-white py-16 px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2">
            {cards.map((card) => {
              const inner = (
                <div
                  className={`group rounded-[2rem] border-2 p-10 transition-all hover:-translate-y-1 hover:shadow-xl ${
                    card.accent
                      ? "border-secondary/30 bg-secondary/5"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${
                      card.accent ? "bg-secondary/20" : "bg-secondary/10"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl text-secondary">
                      {card.icon}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-primary mb-2 flex items-center gap-2">
                    {card.title}
                    {card.external && (
                      <span className="material-symbols-outlined text-base text-slate-400">
                        arrow_outward
                      </span>
                    )}
                  </h2>
                  <p className="text-on-surface-variant leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );

              return card.external ? (
                <a key={card.title} href={card.href}>
                  {inner}
                </a>
              ) : (
                <Link key={card.title} href={card.href}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick install */}
      <section className="bg-slate-50 py-16 px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-black text-3xl text-primary mb-8 tracking-tight">
            Install in One Command
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-[#1E293B] rounded-xl px-6 py-4 flex items-center gap-3 border border-white/10">
              <span className="text-secondary font-mono font-black text-sm">$</span>
              <code className="text-white font-mono font-bold text-sm">
                pip install euredact
              </code>
            </div>
            <div className="bg-[#1E293B] rounded-xl px-6 py-4 flex items-center gap-3 border border-white/10">
              <span className="text-secondary font-mono font-black text-sm">$</span>
              <code className="text-white font-mono font-bold text-sm">
                npm install euredact
              </code>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
