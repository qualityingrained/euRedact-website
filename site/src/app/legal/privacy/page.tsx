import type { Metadata } from "next";
import { analyticsEnabled, analyticsHost } from "@/lib/analytics";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy — euRedact",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last updated: July 2026"
      />

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-3xl prose prose-slate">
          <h2 className="font-black text-2xl text-on-surface mb-4">euRedact Rules (Open Source SDK)</h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            euRedact Rules runs entirely on your machine. No data is transmitted
            to any external server. We do not collect, store, or process any text
            you redact using the SDK. There is no telemetry, no analytics, and no
            network calls.
          </p>

          <h2 className="font-black text-2xl text-on-surface mb-4">Website</h2>
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
            Browsing this website sends no data to third parties. Fonts, icons,
            and the map on our homepage are served from this website rather than
            from a content delivery network, and we do not use any IP
            geolocation service — the homepage code example is chosen from your
            browser&apos;s own language settings, which are never sent to us.
            {analyticsEnabled && (
              <>
                {" "}
                The only request outside this site is to our own analytics
                server, described below; it is infrastructure we operate
                ourselves, not a third-party service.
              </>
            )}
          </p>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            The live demo runs entirely in your browser: it loads our
            open-source JavaScript package and redacts locally, so no text you
            enter into it is sent to any server.
          </p>

          {analyticsEnabled && (
            <>
              <h2 className="font-black text-2xl text-on-surface mb-4">
                Website Analytics
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                To understand which pages are useful, we run{" "}
                <a
                  href="https://umami.is/"
                  className="text-secondary font-bold hover:underline"
                >
                  Umami
                </a>
                , an open-source analytics tool, on our own infrastructure
                {analyticsHost() ? ` (${analyticsHost()})` : ""}. We chose it so
                that visitor data stays with us: it is not Google Analytics, and
                no analytics provider receives your data.
              </p>
              <ul className="text-on-surface-variant leading-relaxed mb-6 list-disc pl-6 space-y-2">
                <li>
                  <strong>No cookies, no fingerprinting.</strong> Nothing is
                  stored on your device and you are not tracked across sites or
                  across visits.
                </li>
                <li>
                  <strong>No IP addresses stored.</strong> Umami derives an
                  anonymous, rotating identifier from a hash of your IP address
                  and browser, and discards the address itself. We cannot
                  identify you from it.
                </li>
                <li>
                  <strong>What we record:</strong> the page you viewed, the site
                  that referred you, your country, and your browser and device
                  type — all in aggregate. We also count seven actions: opening
                  and submitting the waitlist form, subscribing to the blog,
                  running the demo, interacting with the homepage playground,
                  running a redaction in it, and filtering the
                  detection-coverage table. The demo event records only how many
                  items were detected, never the text you entered; the
                  playground events record nothing but the fact that you used it
                  and how many times you pressed the button, never the text; the
                  coverage event records only which filter you picked from the
                  buttons on that page. We also label a
                  visit as automated when it is obviously a bot — a
                  self-identifying crawler or an automated browser — so that
                  crawler traffic can be told apart from human traffic in our
                  own statistics. That label is derived from your browser&rsquo;s
                  own properties and is not stored on your device.
                </li>
                <li>
                  <strong>We honour Do Not Track.</strong> If your browser sends
                  a Do Not Track signal, nothing is recorded at all.
                </li>
                <li>
                  <strong>Legal basis:</strong> our legitimate interest in
                  understanding how our website is used (Art. 6(1)(f) GDPR). As
                  the data is aggregate and cannot identify you, we do not ask
                  for consent, and there is no cookie banner.
                </li>
                <li>
                  <strong>Retention:</strong> aggregate statistics are kept for
                  up to 24 months. They are never sold or shared.
                </li>
              </ul>
            </>
          )}

          <h2 className="font-black text-2xl text-on-surface mb-4">
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

          <h2 className="font-black text-2xl text-on-surface mb-4">
            euRedact Cloud{" "}
            <span className="align-middle bg-pii-highlight/15 text-pii-highlight text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              Coming Soon
            </span>
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            When the cloud tier launches, a separate privacy policy will detail
            how text is processed, what data is retained (if any), and what
            safeguards are in place. A Data Processing Agreement (DPA) will be
            available for all cloud tier customers.
          </p>

          <h2 className="font-black text-2xl text-on-surface mb-4">Contact</h2>
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
