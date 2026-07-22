/*
  Self-hosted Umami analytics.

  Everything here is inert unless both env vars are set at build time, so an
  unconfigured build makes no analytics request at all and the privacy policy
  renders without an analytics section. See ANALYTICS.md.

  The `process.env.NEXT_PUBLIC_*` references must stay literal: Next.js inlines
  them textually at build time, so destructuring or dynamic lookup silently
  yields undefined in the browser bundle.
*/

export const ANALYTICS_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC ?? "";
export const ANALYTICS_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? "";

export const analyticsEnabled = Boolean(ANALYTICS_SRC && ANALYTICS_WEBSITE_ID);

/** Host serving the analytics script, for display in the privacy policy. */
export function analyticsHost(): string | undefined {
  if (!ANALYTICS_SRC) return undefined;
  try {
    return new URL(ANALYTICS_SRC).host;
  } catch {
    return undefined;
  }
}

/*
  Conversion events we record. Kept as a closed set so the dashboard has a
  stable vocabulary and so it is obvious, in one place, exactly what is
  measured — this list is what the privacy policy describes.
*/
export type AnalyticsEvent =
  | "waitlist-opened"
  | "waitlist-submitted"
  | "blog-subscribed"
  | "demo-redacted";

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

/**
 * Record a conversion event. No-ops when analytics is unconfigured, when the
 * script has not loaded, or when the visitor blocks it — never throws, because
 * a failed metric must not break a signup.
 */
export function trackEvent(
  event: AnalyticsEvent,
  data?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  try {
    window.umami?.track(event, data);
  } catch {
    // Analytics must never surface an error to the visitor.
  }
}
