import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — euRedact",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-primary hero-pattern pt-32 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-black text-5xl text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 leading-relaxed">
            Last updated: April 2026
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl prose prose-slate">
          <h2 className="font-black text-2xl text-primary mb-4">euRedact Rules (Open Source)</h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            euRedact Rules is released under the Apache 2.0 License. You may use,
            modify, and distribute it freely under the terms of that license. The
            full license text is available in the{" "}
            <a
              href="https://github.com/euRedact/euRedact/blob/main/LICENSE"
              className="text-secondary font-bold hover:underline"
            >
              GitHub repository
            </a>.
          </p>

          <h2 className="font-black text-2xl text-primary mb-4">No Warranty</h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            euRedact is provided &quot;as is&quot; without warranty of any kind.
            While we strive for high accuracy, PII detection is inherently
            imperfect. You are responsible for validating that euRedact meets
            your compliance requirements before using it in production.
          </p>

          <h2 className="font-black text-2xl text-primary mb-4">euRedact Cloud (Coming Soon)</h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            Separate terms of service will apply to the paid cloud tier when it
            launches. These will include a Data Processing Agreement (DPA),
            service level terms, and data handling procedures.
          </p>

          <h2 className="font-black text-2xl text-primary mb-4">Contact</h2>
          <p className="text-on-surface-variant leading-relaxed">
            For questions about these terms, contact us at{" "}
            <a href="mailto:contact@euredact.eu" className="text-secondary font-bold hover:underline">
              contact@euredact.eu
            </a>.
          </p>
        </div>
      </section>
    </>
  );
}
