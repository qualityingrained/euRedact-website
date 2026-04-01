import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & Compliance — euRedact",
};

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-2 py-4 lg:py-0 lg:px-0">
      {label && (
        <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary text-center leading-tight max-w-28">
          {label}
        </span>
      )}
      {/* Vertical arrow on small screens, horizontal on lg */}
      <svg
        className="block lg:hidden text-white/30"
        width="24"
        height="40"
        viewBox="0 0 24 40"
        fill="none"
      >
        <path d="M12 0v34m0 0l-7-7m7 7l7-7" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg
        className="hidden lg:block text-white/30"
        width="60"
        height="24"
        viewBox="0 0 60 24"
        fill="none"
      >
        <path d="M0 12h54m0 0l-7-7m7 7l-7 7" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

export default function TrustPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-primary hero-pattern pt-32 py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-black text-5xl text-white tracking-tight">
            Security &amp; Compliance
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
            euRedact is built with privacy as a core architectural principle.
            Local processing, open-source rules, and zero data transmission
            give you full control over how personal data is handled.
          </p>
          <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-secondary" />
        </div>
      </section>

      {/* ===== ARCHITECTURE DIAGRAM ===== */}
      <section className="bg-primary px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-3xl font-black text-white tracking-tight">
            How Your Data Flows
          </h2>

          <div className="rounded-[3rem] border border-white/10 bg-primary p-8 lg:p-14">
            {/* Flow row */}
            <div className="flex flex-col items-center lg:flex-row lg:items-stretch lg:justify-between gap-2">
              {/* Your Application (left) */}
              <div className="glass flex flex-col items-center justify-center rounded-2xl p-6 text-center lg:w-44 shrink-0">
                <span className="material-symbols-outlined text-4xl text-white/60 mb-2">
                  integration_instructions
                </span>
                <span className="text-sm font-bold text-white">Your Application</span>
              </div>

              <Arrow />

              {/* euRedact SDK (Local) */}
              <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-secondary/60 bg-secondary/5 p-6 text-center lg:flex-1 max-w-sm">
                <span className="material-symbols-outlined text-4xl text-secondary mb-2">
                  shield
                </span>
                <span className="text-base font-black text-white mb-2">
                  euRedact SDK (Local)
                </span>
                <p className="text-xs leading-relaxed text-white/60">
                  Rule Engine detects: IBANs, BSNs, phones, emails, IDs
                </p>
              </div>

              <Arrow label="Structured PII removed" />

              {/* euRedact Cloud */}
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-indigo-500/60 bg-indigo-500/5 p-6 text-center lg:flex-1 max-w-sm">
                <span className="material-symbols-outlined text-4xl text-indigo-400 mb-2">
                  cloud
                </span>
                <span className="text-base font-black text-white mb-1">
                  euRedact Cloud
                </span>
                <span className="inline-block rounded-full bg-indigo-500/20 border border-indigo-400/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-300 mb-2">
                  Coming Soon
                </span>
                <p className="text-xs leading-relaxed text-white/60">
                  AI model detects: names, addresses, contextual PII
                </p>
              </div>

              <Arrow label="Redacted text returned" />

              {/* Your Application (right) */}
              <div className="glass flex flex-col items-center justify-center rounded-2xl p-6 text-center lg:w-44 shrink-0">
                <span className="material-symbols-outlined text-4xl text-white/60 mb-2">
                  integration_instructions
                </span>
                <span className="text-sm font-bold text-white">Your Application</span>
              </div>
            </div>

            {/* Callout */}
            <div className="mt-8 flex items-center justify-center gap-3 rounded-xl bg-secondary/10 px-6 py-4">
              <span className="material-symbols-outlined text-secondary text-xl">
                verified_user
              </span>
              <p className="text-sm font-semibold text-secondary">
                Structured PII never leaves your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMPLIANCE CARDS ===== */}
      <section className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-14 text-center text-3xl font-black text-primary tracking-tight">
            Why You Can Trust euRedact
          </h2>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* 100% Local */}
            <div className="rounded-[3rem] bg-white p-12 shadow-xl">
              <span className="material-symbols-outlined text-5xl text-secondary mb-4">
                lock
              </span>
              <h3 className="text-xl font-black text-primary mb-3">100% Local Processing</h3>
              <p className="text-on-surface-variant leading-relaxed">
                euRedact Rules runs entirely on your machine. No data is sent
                to any external server. Your text never leaves your infrastructure.
              </p>
            </div>

            {/* Open Source */}
            <div className="rounded-[3rem] bg-white p-12 shadow-xl">
              <span className="material-symbols-outlined text-5xl text-secondary mb-4">
                code
              </span>
              <h3 className="text-xl font-black text-primary mb-3">Open Source &amp; Auditable</h3>
              <p className="text-on-surface-variant leading-relaxed">
                The full rule engine is open source under Apache 2.0. Every regex
                pattern, checksum validator, and suppression rule is visible and
                auditable on GitHub.
              </p>
            </div>

            {/* No Vendor Lock-in */}
            <div className="rounded-[3rem] bg-white p-12 shadow-xl">
              <span className="material-symbols-outlined text-5xl text-secondary mb-4">
                swap_horiz
              </span>
              <h3 className="text-xl font-black text-primary mb-3">No Vendor Lock-in</h3>
              <p className="text-on-surface-variant leading-relaxed">
                euRedact is a library, not a service. Your redaction rules,
                custom patterns, and configuration are yours. No accounts, no
                API keys, no data retention.
              </p>
            </div>

            {/* Zero Dependencies */}
            <div className="rounded-[3rem] bg-white p-12 shadow-xl">
              <span className="material-symbols-outlined text-5xl text-secondary mb-4">
                package_2
              </span>
              <h3 className="text-xl font-black text-primary mb-3">Zero Required Dependencies</h3>
              <p className="text-on-surface-variant leading-relaxed">
                No external packages required in either Python or Node.js.
                Minimal attack surface, no transitive dependency risks, easy
                to audit and deploy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRIVACY ARCHITECTURE ===== */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-14 text-center text-3xl font-black text-primary tracking-tight">
            Privacy Architecture in Detail
          </h2>

          <div className="grid gap-16 lg:grid-cols-2">
            {/* Hash-Based Segment Routing */}
            <div className="flex gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary/10">
                <span className="material-symbols-outlined text-2xl text-secondary">
                  tag
                </span>
              </div>
              <div>
                <h3 className="text-lg font-black text-primary mb-2">
                  Hash-Based Segment Routing
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Text is split into segments and routed via one-way hashes.
                  The cloud model never sees the full document -- only isolated,
                  unlinkable fragments that cannot be reassembled server-side.
                </p>
              </div>
            </div>

            {/* Cross-Client Shuffling */}
            <div className="flex gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary/10">
                <span className="material-symbols-outlined text-2xl text-secondary">
                  shuffle
                </span>
              </div>
              <div>
                <h3 className="text-lg font-black text-primary mb-2">
                  Cross-Client Shuffling
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Segments from different clients are shuffled together in each
                  inference batch. Even if an attacker compromises a batch, no
                  single client&apos;s text can be isolated.
                </p>
              </div>
            </div>

            {/* Constrained JSON Output */}
            <div className="flex gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary/10">
                <span className="material-symbols-outlined text-2xl text-secondary">
                  data_object
                </span>
              </div>
              <div>
                <h3 className="text-lg font-black text-primary mb-2">
                  Constrained JSON Output
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  The model is constrained to emit only structured JSON with
                  entity labels and offsets -- never free-form text. This
                  eliminates the risk of the model echoing or leaking input
                  data.
                </p>
              </div>
            </div>

            {/* Graceful Offline Fallback */}
            <div className="flex gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary/10">
                <span className="material-symbols-outlined text-2xl text-secondary">
                  wifi_off
                </span>
              </div>
              <div>
                <h3 className="text-lg font-black text-primary mb-2">
                  Graceful Offline Fallback
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  When the cloud is unreachable, the SDK falls back to the local
                  rule engine automatically. Structured PII is still detected
                  with high precision -- your pipeline never stalls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST SIGNALS ===== */}
      <section className="bg-white px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              "Apache 2.0 Licensed",
              "Auditable by Construction",
              "No Data Retention",
              "SOC 2 (Roadmap)",
            ].map((badge) => (
              <span
                key={badge}
                className="rounded-full border-2 border-slate-200 bg-slate-50 px-6 py-3 text-sm font-black uppercase tracking-wider text-primary"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
