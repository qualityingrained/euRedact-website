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
            Last updated: July 2026
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
            This website (euredact.dev) is hosted on GitHub Pages, operated by
            GitHub, Inc. We set no cookies and use no third-party analytics.
            However, GitHub automatically logs technical data when you visit —
            including your IP address, browser user agent, and the pages you
            request — as part of serving and securing the site. This processing
            is carried out by GitHub as our hosting provider; see the{" "}
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
              className="text-secondary font-bold hover:underline"
            >
              GitHub Privacy Statement
            </a>
            . Our legal basis is our legitimate interest in operating a secure,
            functioning website (Art. 6(1)(f) GDPR).
          </p>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            The live demo runs entirely in your browser: it loads our
            open-source JavaScript package and redacts locally, so no text you
            enter into it is sent to any server. Fonts and icons are served from
            this website, not from a third-party CDN.
          </p>

          <h2 className="font-black text-2xl text-primary mb-4">
            Waitlist &amp; Blog Subscription
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            If you join the cloud tier waitlist or subscribe to the blog, we
            collect the email address you submit, together with any optional
            information you choose to provide in the form.
          </p>
          <ul className="text-on-surface-variant leading-relaxed mb-6 list-disc pl-6 space-y-2">
            <li>
              <strong>Purpose:</strong> to notify you when the euRedact cloud
              tier launches, and to send blog updates if you subscribed to them.
              We do not use your address for any other marketing, and we do not
              sell or share it.
            </li>
            <li>
              <strong>Legal basis:</strong> your consent (Art. 6(1)(a) GDPR),
              given when you submit the form. You can withdraw it at any time by
              emailing us, with no effect on processing carried out beforehand.
            </li>
            <li>
              <strong>Processor:</strong> form submissions are handled by
              Formspree, Inc. (United States), which stores the submission and
              forwards it to us. Your email address is therefore transferred to
              and stored in the United States. See the{" "}
              <a
                href="https://formspree.io/legal/privacy-policy/"
                className="text-secondary font-bold hover:underline"
              >
                Formspree Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Retention:</strong> until the cloud tier launches and we
              have notified you, until you unsubscribe or ask us to delete your
              address, or after 24 months of inactivity — whichever comes first.
            </li>
          </ul>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            You have the right to access, rectify, erase, restrict, or port your
            data, and to object to processing. To exercise any of these, email
            us at the address below. You also have the right to lodge a
            complaint with your supervisory authority — in Belgium, the{" "}
            <a
              href="https://www.gegevensbeschermingsautoriteit.be/"
              className="text-secondary font-bold hover:underline"
            >
              Data Protection Authority
            </a>
            .
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
