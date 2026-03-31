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
            v0.1 — Now supporting 32 European countries
          </div>

          {/* Headline */}
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.85]">
            European PII <br />
            <span className="text-secondary">Redaction.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-slate-300 leading-relaxed mb-14 font-medium">
            Open-source SDK that detects and redacts structured PII
            across 32 European countries. Available for Python and Node.js.{" "}
            <br className="hidden md:block" />
            Local-only, deterministic, zero data leakage.
          </p>

          <HeroCodeBlock />
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { value: ">99%", label: "Recall Rate" },
            { value: "32", label: "Countries" },
            { value: "0.02ms", label: "Per Page (~500 words)" },
            { value: "<2%", label: "False Positives" },
          ].map((m) => (
            <div key={m.label} className="text-center group cursor-default">
              <div className="text-6xl font-black text-primary mb-3 transition-transform group-hover:-translate-y-1">
                {m.value}
              </div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-[0.25em]">
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
                  "Sending unredacted data to US-based LLMs creates GDPR compliance debt. euRedact ensures PII never leaves your jurisdiction.",
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
                  "Stop building custom regex for 32 countries. One library covers the entire continent with consistent performance.",
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
              { icon: "verified", label: "Secure Output", sublabel: "Cleaned, GDPR-ready data.", accent: false, comingSoon: false },
            ].map((step) => (
              <div key={step.label} className="relative group z-10">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-28 h-28 rounded-[2rem] flex items-center justify-center shadow-2xl mb-8 ${
                      step.accent
                        ? "bg-secondary electric-glow border border-secondary/50"
                        : "bg-white/5 border border-white/10 group-hover:border-secondary transition-colors"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-5xl ${
                        step.accent ? "text-primary" : "text-secondary"
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
                "100% local execution — zero data leakage",
                "31 European country configurations",
                "25+ Structured PII entity types with checksum validation",
                "Secret & API key detection (AWS, GitHub, Stripe, ...)",
                "Custom pattern support",
                "Pseudonymization mode",
                "0.02ms per page — zero dependencies",
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
                { icon: "done", text: "Dynamic pseudonymization" },
                { icon: "done", text: "99.9% SLA uptime" },
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

      {/* ── COMPARISON TABLE ── */}
      <section className="py-32 px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-5xl font-black text-white tracking-tight mb-6">
              How euRedact Compares
            </h2>
            <p className="text-slate-400 font-bold text-lg max-w-2xl">
              The only PII detection SDK purpose-built for European data.
            </p>
            <div className="w-20 h-1.5 bg-secondary rounded-full mt-6" />
          </div>

          {/* Table */}
          <div className="bg-primary rounded-[3rem] p-6 md:p-10 border border-white/10 overflow-x-auto">
            <table className="w-full text-sm border-separate border-spacing-x-1.5 border-spacing-y-0 min-w-[900px]">
              <colgroup>
                <col className="w-[18%]" />
                <col className="w-[16%]" />
                <col className="w-[16%]" />
                <col className="w-[16%]" />
                <col className="w-[17%]" />
                <col className="w-[17%]" />
              </colgroup>
              <thead>
                <tr>
                  <th className="pb-5 pr-2 text-left text-slate-400 font-black uppercase tracking-widest text-[10px] align-bottom">
                    Feature
                  </th>
                  <th className="pb-5 px-3 text-center rounded-t-2xl bg-secondary/10 align-bottom">
                    <div className="text-secondary font-black text-[11px] uppercase tracking-wider">
                      euRedact Rules
                    </div>
                  </th>
                  <th className="pb-5 px-3 text-center rounded-t-2xl bg-secondary/5 align-bottom">
                    <div className="text-secondary font-black text-[11px] uppercase tracking-wider mb-1">
                      euRedact Cloud
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[9px] font-black uppercase tracking-widest">
                      Coming Soon
                    </span>
                  </th>
                  <th className="pb-5 px-3 text-center bg-white/5 rounded-t-2xl align-bottom">
                    <div className="text-slate-400 font-bold text-[11px]">Presidio</div>
                  </th>
                  <th className="pb-5 px-3 text-center bg-white/5 rounded-t-2xl align-bottom">
                    <div className="text-slate-400 font-bold text-[11px]">AWS Comprehend</div>
                  </th>
                  <th className="pb-5 px-3 text-center bg-white/5 rounded-t-2xl align-bottom">
                    <div className="text-slate-400 font-bold text-[11px]">Azure AI Language</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {/* Row 1: EU National ID Formats */}
                <tr>
                  <td className="py-4 pr-2 text-white font-bold text-sm border-b border-white/5">EU National ID Formats</td>
                  <td className="py-4 px-3 text-center bg-secondary/10 border-b border-white/5">
                    <span className="text-secondary font-black">32 countries</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-secondary/5 border-b border-white/5">
                    <span className="text-secondary font-bold">32 countries</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="text-red-400 font-bold">None built-in</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="text-amber-400 font-bold">UK + India only</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="text-amber-400 font-bold">Limited</span>
                  </td>
                </tr>

                {/* Row 2: EU-Specific Validators */}
                <tr>
                  <td className="py-4 pr-2 text-white font-bold text-sm border-b border-white/5">
                    EU-Specific Validators
                    <span className="block text-slate-500 text-[11px] font-medium mt-0.5">BSN, NIR, Steuer-ID, etc.</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-secondary/10 border-b border-white/5">
                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-secondary/5 border-b border-white/5">
                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="material-symbols-outlined text-red-400/60 text-lg">cancel</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="material-symbols-outlined text-red-400/60 text-lg">cancel</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="material-symbols-outlined text-red-400/60 text-lg">cancel</span>
                  </td>
                </tr>

                {/* Row 3: Contextual PII */}
                <tr>
                  <td className="py-4 pr-2 text-white font-bold text-sm border-b border-white/5">
                    Contextual PII
                    <span className="block text-slate-500 text-[11px] font-medium mt-0.5">names, addresses</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-secondary/10 border-b border-white/5">
                    <span className="text-slate-500 font-bold">&mdash;</span>
                    <span className="block text-slate-600 text-[10px] mt-0.5">rule engine only</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-secondary/5 border-b border-white/5">
                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                    <span className="block text-slate-400 text-[10px] mt-0.5">Fine-tuned model</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="text-slate-400 font-bold">spaCy NER</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="material-symbols-outlined text-secondary/60 text-lg">check_circle</span>
                    <span className="block text-slate-500 text-[10px] mt-0.5">EN + ES only</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="material-symbols-outlined text-secondary/60 text-lg">check_circle</span>
                    <span className="block text-slate-500 text-[10px] mt-0.5">Limited EU langs</span>
                  </td>
                </tr>

                {/* Row 4: Published EU Benchmark */}
                <tr>
                  <td className="py-4 pr-2 text-white font-bold text-sm border-b border-white/5">Published EU Benchmark</td>
                  <td className="py-4 px-3 text-center bg-secondary/10 border-b border-white/5">
                    <span className="text-secondary font-black">99.1% recall</span>
                    <span className="block text-slate-400 text-[10px] mt-0.5">147K records</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-secondary/5 border-b border-white/5">
                    <span className="text-slate-400 font-bold italic">98&ndash;99% target</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="text-slate-500 italic">None</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="text-slate-500 italic">None EU-specific</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="text-slate-500 italic">None EU-specific</span>
                  </td>
                </tr>

                {/* Row 5: Processing Location */}
                <tr>
                  <td className="py-4 pr-2 text-white font-bold text-sm border-b border-white/5">Processing Location</td>
                  <td className="py-4 px-3 text-center bg-secondary/10 border-b border-white/5">
                    <span className="text-secondary font-black inline-flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-sm">lock</span>
                      100% local
                    </span>
                  </td>
                  <td className="py-4 px-3 text-center bg-secondary/5 border-b border-white/5">
                    <span className="text-secondary font-bold">Local + EU cloud</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="text-secondary/60 font-bold">Local</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="text-amber-400 font-bold">US cloud</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="text-amber-400 font-bold">Cloud</span>
                  </td>
                </tr>

                {/* Row 6: EU Languages */}
                <tr>
                  <td className="py-4 pr-2 text-white font-bold text-sm border-b border-white/5">EU Languages</td>
                  <td className="py-4 px-3 text-center bg-secondary/10 border-b border-white/5">
                    <span className="text-secondary font-bold">32 countries</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-secondary/5 border-b border-white/5">
                    <span className="text-secondary font-bold">32 + multilingual</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="text-slate-400 font-bold">Custom setup</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="text-red-400 font-bold">EN + ES</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 border-b border-white/5">
                    <span className="text-amber-400 font-bold">~8 languages</span>
                  </td>
                </tr>

                {/* Row 7: Price */}
                <tr>
                  <td className="py-4 pr-2 text-white font-bold text-sm">Price</td>
                  <td className="py-4 px-3 text-center bg-secondary/10 rounded-b-2xl">
                    <span className="text-secondary font-black">Free</span>
                    <span className="block text-slate-400 text-[10px] mt-0.5">Apache 2.0</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-secondary/5 rounded-b-2xl">
                    <span className="text-white font-bold">From &euro;79/mo</span>
                    <span className="block mt-1">
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[9px] font-black uppercase tracking-widest">
                        Soon
                      </span>
                    </span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 rounded-b-2xl">
                    <span className="text-white font-bold">Free</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 rounded-b-2xl">
                    <span className="text-slate-400 font-bold">Pay-per-use</span>
                  </td>
                  <td className="py-4 px-3 text-center bg-white/5 rounded-b-2xl">
                    <span className="text-slate-400 font-bold">Pay-per-use</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Verifiable benchmark callout */}
          <div className="bg-accent-indigo rounded-[2rem] p-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-secondary text-3xl">
                verified_user
              </span>
              <p className="text-indigo-200 font-medium max-w-2xl">
                euRedact Rules benchmarks are independently verifiable — our full test suite of{" "}
                <span className="text-white font-bold">147,300 records across 32 countries</span> is open source.
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
