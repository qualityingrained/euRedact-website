import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — euRedact",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-primary hero-pattern pt-32 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-black text-5xl text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 leading-relaxed">
            Last updated: April 2026
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl prose prose-slate">
          <h2 className="font-black text-2xl text-primary mb-4">euRedact Rules (Open Source SDK)</h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            euRedact Rules runs entirely on your machine. No data is transmitted
            to any external server. We do not collect, store, or process any text
            you redact using the SDK. There is no telemetry, no analytics, and no
            network calls.
          </p>

          <h2 className="font-black text-2xl text-primary mb-4">Website</h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            This website (euredact.dev) is hosted on GitHub Pages. We do not use
            cookies or third-party analytics. The live demo runs entirely in your
            browser using WebAssembly — no text is sent to any server.
          </p>

          <h2 className="font-black text-2xl text-primary mb-4">euRedact Cloud (Coming Soon)</h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            When the cloud tier launches, a separate privacy policy will detail
            how text is processed, what data is retained (if any), and what
            safeguards are in place. A Data Processing Agreement (DPA) will be
            available for all cloud tier customers.
          </p>

          <h2 className="font-black text-2xl text-primary mb-4">Contact</h2>
          <p className="text-on-surface-variant leading-relaxed">
            For privacy-related inquiries, contact us at{" "}
            <a href="mailto:contact@euredact.eu" className="text-secondary font-bold hover:underline">
              contact@euredact.eu
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}
