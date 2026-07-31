import Script from "next/script";
import {
  ANALYTICS_SRC,
  ANALYTICS_WEBSITE_ID,
  AUTOMATION_HOOK,
  automationHookSource,
  analyticsEnabled,
} from "@/lib/analytics";

/*
  Loads the self-hosted Umami tracker, or nothing at all when unconfigured.

  data-do-not-track honours the visitor's browser DNT signal, which we opt into
  deliberately: euRedact's argument is that people should not have to trust a
  vendor's good intentions, and that applies to our own marketing site.

  data-exclude-hash keeps the fragment out of the recorded URL. /docs/coverage
  links each entity type to its own anchor, so without this every deep link
  arrives as a separate page — /docs/coverage#PASSPORT reported apart from
  /docs/coverage — and the page's real traffic is split across dozens of rows.
  It also means an anchor can never carry anything into the URL we record.

  data-before-send names a function the tracker calls with every beacon. Ours
  labels obvious automation so bot and human traffic can be told apart in the
  dashboard. It never returns falsy, so it can never drop a beacon — the point
  is to see crawlers, not to exclude them.
*/
export function AnalyticsScript() {
  if (!analyticsEnabled) return null;

  return (
    <>
      {/*
        A plain inline <script>, not next/script: it is emitted into the static
        HTML and runs the moment the parser reaches it, which is the only way to
        guarantee the hook exists before the tracker's *first* beacon. That
        beacon is the one that matters here — a crawler often sends exactly one,
        so losing the race would leave precisely the traffic we want to label
        untagged. next/script's beforeInteractive would also work but is
        unsupported outside pages/_document.
      */}
      <script dangerouslySetInnerHTML={{ __html: automationHookSource() }} />
      <Script
        src={ANALYTICS_SRC}
        data-website-id={ANALYTICS_WEBSITE_ID}
        data-do-not-track="true"
        data-exclude-hash="true"
        data-before-send={AUTOMATION_HOOK}
        strategy="afterInteractive"
      />
    </>
  );
}
