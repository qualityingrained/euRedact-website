import { HeroCodeBlock } from "./hero-code-block";
import { EuropeMap } from "./europe-map";
import { WaitlistButton } from "@/components/waitlist-button";

export default function Page() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-primary hero-pattern overflow-hidden pt-48 pb-32 px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Version badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-black tracking-widest uppercase mb-12 border border-secondary/30">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            v0.2 — Now supporting 31 European countries
          </div>

          {/* Headline */}
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.85]">
            European PII <br />
            <span className="text-secondary">Redaction.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-slate-300 leading-relaxed mb-14 font-medium">
            Open-source SDK that detects and redacts structured PII
            across 31 European countries. Available for Python and Node.js.{" "}
            <br className="hidden md:block" />
            Local-only and deterministic — the SDK makes no network calls.
          </p>

          <HeroCodeBlock />
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: "98.3%", label: "Recall Rate", note: true },
            { value: "31", label: "Countries", note: false },
            { value: "0.3ms", label: "Per Page", note: true },
            { value: "1.1%", label: "False Positives", note: true },
          ].map((m) => (
            <div key={m.label} className="text-center group cursor-default">
              <div className="text-4xl md:text-6xl font-black text-primary mb-3 transition-transform group-hover:-translate-y-1">
                {m.value}
                {m.note && (
                  <a
                    href="#accuracy-note"
                    aria-label="See measurement note"
                    className="text-lg md:text-2xl align-super text-slate-400 hover:text-secondary transition-colors"
                  >
                    *
                  </a>
                )}
              </div>
              <div className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.25em]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-32 px-8 bg-accent-indigo text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full hero-pattern opacity-5" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
              The European PII Problem
            </h2>
            <div className="w-24 h-2 bg-secondary rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: "cloud_off",
                title: "Cloud API Risks",
                description:
                  "Sending unredacted data to US-based LLMs creates GDPR compliance debt. euRedact detects and redacts structured PII locally, before your data leaves your infrastructure.",
              },
              {
                icon: "extension",
                title: "Localization Gaps",
                description:
                  "US tools miss localized patterns like German Tax IDs or Dutch BSNs. We focus exclusively on the European regulatory landscape.",
              },
              {
                icon: "bolt",
                title: "Slow Development",
                description:
                  "Stop building custom regex for 31 countries. One library covers the entire continent with consistent performance.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group p-12 bg-white/5 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-secondary/50"
              >
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-10 shadow-lg electric-glow">
                  <span className="material-symbols-outlined text-primary text-4xl">
                    {card.icon}
                  </span>
                </div>
                <h3 className="text-3xl font-black text-white mb-6">{card.title}</h3>
                <p className="text-slate-300 text-lg leading-relaxed font-medium">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="text-5xl font-black text-white mb-6">
              Processing Architecture
            </h2>
            <div className="w-20 h-1.5 bg-secondary rounded-full" />
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Connector line behind the icons */}
            <div className="hidden md:block absolute top-14 left-[12.5%] right-[12.5%] h-[2px] bg-secondary/30" />

            {[
              { icon: "terminal", label: "Input", sublabel: "Raw logs or user text.", accent: false, comingSoon: false },
              { icon: "memory", label: "Local Engine", sublabel: "Deterministic pattern matching.", accent: true, comingSoon: false },
              { icon: "psychology", label: "AI Model", sublabel: "Contextual AI analysis.", accent: false, comingSoon: true },
              { icon: "verified", label: "Redacted Output", sublabel: "Detected PII replaced with placeholders.", accent: false, comingSoon: false },
            ].map((step) => (
              <div key={step.label} className="relative group z-10">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-28 h-28 rounded-[2rem] flex items-center justify-center shadow-2xl mb-8 ${
                      step.accent
                        ? "bg-secondary electric-glow border border-secondary/50"
                        : "bg-slate-950 border border-white/10 group-hover:border-secondary transition-colors"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined ${
                        step.accent ? "text-primary text-6xl" : "text-secondary text-6xl"
                      }`}
                    >
                      {step.icon}
                    </span>
                  </div>
                  <div className={`font-black text-2xl uppercase tracking-wider mb-2 ${step.accent ? "text-secondary" : ""}`}>
                    {step.label}
                  </div>
                  <div className="text-base text-slate-400 font-medium leading-relaxed">
                    {step.sublabel}
                  </div>
                  {step.comingSoon && (
                    <div className="mt-3 inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-400 text-[10px] font-black uppercase tracking-widest border border-amber-400/30">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPLOYMENT OPTIONS ── */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <h2 className="text-5xl font-black text-primary mb-6">Deployment Options</h2>
          <div className="w-20 h-1.5 bg-secondary rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Rules Core */}
          <div className="p-16 bg-slate-50 rounded-[3rem] border-2 border-slate-200 flex flex-col shadow-xl hover:shadow-2xl transition-all">
            <div className="mb-12">
              <div className="inline-block px-4 py-1.5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                Open Source SDK
              </div>
              <h3 className="text-5xl font-black text-primary mb-4">Rules Core</h3>
              <p className="text-slate-500 font-bold text-xl">Apache 2.0 local redaction.</p>
            </div>
            <ul className="space-y-6 mb-16 flex-grow">
              {[
                "100% local execution — no network calls",
                "31 European country configurations",
                "27 Structured PII entity types with checksum validation",
                "Secret & API key detection (AWS, GitHub, Stripe, ...)",
                "Custom pattern support",
                "Referential integrity mode",
                "0.3ms per page (Node) — zero dependencies",
                "Python & Node.js / TypeScript",
              ].map((f) => (
                <li key={f} className="flex items-center gap-4 text-slate-800 font-bold text-lg">
                  <span className="material-symbols-outlined text-secondary font-black">done</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="/docs/quickstart"
              className="block w-full py-5 rounded-2xl border-4 border-primary text-primary font-black uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-all text-center"
            >
              Install via pip / npm
            </a>
          </div>

          {/* Cloud Neural */}
          <div className="p-16 bg-primary rounded-[3rem] border-4 border-secondary/50 flex flex-col relative overflow-hidden shadow-2xl opacity-75">
            <div className="absolute top-10 right-[-45px] bg-amber-400 text-primary text-[10px] font-black px-16 py-2 rotate-45 shadow-lg">
              COMING SOON
            </div>
            <div className="mb-12">
              <div className="inline-block px-4 py-1.5 rounded-full bg-amber-400/80 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm">
                Coming Soon
              </div>
              <h3 className="text-5xl font-black text-white mb-4">Cloud Neural</h3>
              <p className="text-slate-400 font-bold text-xl">
                Contextual AI detection — coming soon.
              </p>
            </div>
            <ul className="space-y-6 mb-16 flex-grow">
              {[
                { icon: "auto_awesome", text: "Everything in Core, plus:" },
                { icon: "done", text: "Fine-tuned Privacy LLM" },
                { icon: "done", text: "Referential integrity" },
                { icon: "done", text: "EU-hosted infrastructure" },
                { icon: "done", text: "Dedicated support" },
              ].map((f) => (
                <li key={f.text} className="flex items-center gap-4 text-white font-bold text-lg">
                  <span className="material-symbols-outlined text-secondary font-black">
                    {f.icon}
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>
            <WaitlistButton className="w-full py-5 rounded-2xl bg-secondary/60 text-primary font-black uppercase tracking-widest text-sm hover:bg-secondary transition-all shadow-xl cursor-pointer">
              Join Waitlist
            </WaitlistButton>
          </div>
        </div>
      </section>

      {/* ── BENCHMARK & CLOUD TIER ── */}
      <section className="py-32 px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          {/* Verifiable benchmark callout */}
          <div className="bg-accent-indigo rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-secondary text-3xl">
                verified_user
              </span>
              <p className="text-indigo-200 font-medium max-w-2xl">
                euRedact Rules benchmarks are independently verifiable — our full test suite of{" "}
                <span className="text-white font-bold">152,300 records across 31 countries</span> is open source.
              </p>
            </div>
            <a
              href="https://github.com/euRedact/euRedact"
              className="shrink-0 inline-flex items-center gap-2 text-secondary font-black text-sm uppercase tracking-wider hover:text-emerald-400 transition-colors"
            >
              View on GitHub
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
          </div>

          {/* Cloud tier highlight */}
          <div className="bg-secondary/5 border border-secondary/20 rounded-[2rem] p-8 mt-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-4">
              <div className="flex gap-1 shrink-0 mt-1">
                <span className="material-symbols-outlined text-secondary text-2xl">cloud</span>
                <span className="material-symbols-outlined text-secondary text-2xl">auto_awesome</span>
              </div>
              <div>
                <h3 className="text-white font-black text-lg mb-2">
                  euRedact Cloud — Coming Soon
                </h3>
                <p className="text-slate-400 font-medium leading-relaxed max-w-2xl">
                  Rules catch structured PII locally. The cloud tier adds a fine-tuned model
                  for contextual detection — names, addresses, and implied identifiers that
                  patterns can&apos;t reach. Structured PII is stripped before anything leaves your device.
                </p>
              </div>
            </div>
            <WaitlistButton className="shrink-0 bg-secondary text-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-emerald-400 hover:scale-105 transition-all electric-glow text-center cursor-pointer">
              Join the Waitlist &rarr;
            </WaitlistButton>
          </div>
        </div>
      </section>

      {/* ── EUROPE MAP ── */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-5xl font-black text-primary mb-4">Built for Europe</h2>
          <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-xs">
            Regulatory coverage across the continent
          </p>
        </div>

        <EuropeMap />
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto bg-primary rounded-[4rem] p-20 md:p-32 text-center relative overflow-hidden shadow-2xl electric-glow">
          <div className="absolute inset-0 hero-pattern opacity-10" />
          <div className="relative z-10">
            <h2 className="text-6xl md:text-8xl font-black text-white mb-12 tracking-tighter leading-none">
              Redaction in <br />{" "}
              <span className="text-secondary">30 Seconds.</span>
            </h2>
            <div className="max-w-md mx-auto mb-16">
              <div className="bg-black/60 rounded-2xl p-6 flex items-center justify-between border-2 border-secondary/30 group cursor-pointer hover:border-secondary transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-secondary font-mono font-black">$</span>
                  <span className="text-white font-mono font-bold tracking-tight text-lg">
                    pip install euredact
                  </span>
                </div>
                <span className="material-symbols-outlined text-secondary transition-colors">
                  content_copy
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <a
                href="/demo"
                className="w-full md:w-auto bg-secondary text-primary px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-emerald-400 hover:scale-105 transition-all shadow-2xl text-center flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-2xl">play_circle</span>
                Try Live Demo
              </a>
              <a
                href="/docs"
                className="text-white hover:text-secondary font-black tracking-widest text-sm uppercase transition-all flex items-center gap-2"
              >
                Documentation{" "}
                <span className="material-symbols-outlined">arrow_outward</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
