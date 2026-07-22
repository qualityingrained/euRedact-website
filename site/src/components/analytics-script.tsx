import Script from "next/script";
import {
  ANALYTICS_SRC,
  ANALYTICS_WEBSITE_ID,
  analyticsEnabled,
} from "@/lib/analytics";

/*
  Loads the self-hosted Umami tracker, or nothing at all when unconfigured.

  data-do-not-track honours the visitor's browser DNT signal, which we opt into
  deliberately: euRedact's argument is that people should not have to trust a
  vendor's good intentions, and that applies to our own marketing site.
*/
export function AnalyticsScript() {
  if (!analyticsEnabled) return null;

  return (
    <Script
      src={ANALYTICS_SRC}
      data-website-id={ANALYTICS_WEBSITE_ID}
      data-do-not-track="true"
      strategy="afterInteractive"
    />
  );
}
