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
export const RECORDER_SRC = process.env.NEXT_PUBLIC_UMAMI_RECORDER_SRC ?? "";

export const analyticsEnabled = Boolean(ANALYTICS_SRC && ANALYTICS_WEBSITE_ID);

/*
  Session replay (Umami's recorder plugin) is a separate opt-in on top of
  analytics: it only loads when its own env var is set, and the privacy policy
  only describes it when it loads. The recording itself is only honest under
  the dashboard settings documented in ANALYTICS.md — mask level "strict" and
  a block selector of [data-norecord] — which cannot be enforced from here.
*/
export const replayEnabled = Boolean(analyticsEnabled && RECORDER_SRC);

/**
 * Inline loader for the recorder script. The tracker honours DNT via its
 * data-do-not-track attribute; the recorder documents no such option, so this
 * loader checks the signal itself — otherwise the policy's "nothing is
 * recorded at all" promise would be false for exactly the heaviest collection
 * we do. Written as a string for the same reason as the automation hook.
 */
export function recorderLoaderSource(): string {
  return `(function(){try{
if(navigator.doNotTrack==="1"||window.doNotTrack==="1")return;
var s=document.createElement("script");s.defer=true;
s.src=${JSON.stringify(RECORDER_SRC)};
s.setAttribute("data-website-id",${JSON.stringify(ANALYTICS_WEBSITE_ID)});
document.head.appendChild(s);
}catch(e){}})();`;
}

/** Host serving the analytics script, for display in the privacy policy. */
export function analyticsHost(): string | undefined {
  if (!ANALYTICS_SRC) return undefined;
  try {
    return new URL(ANALYTICS_SRC).host;
  } catch {
    return undefined;
  }
}

/* ── Telling crawlers apart from people ──────────────────────────────────────
  The tracker calls `window[AUTOMATION_HOOK](type, payload)` before every
  beacon, and sends whatever it returns. Ours tags obvious automation and
  returns the payload unchanged otherwise. It must never return a falsy value:
  the tracker treats that as "do not send", and the goal here is to *see*
  crawlers in the dashboard, not to exclude them.

  Two limits worth stating, because they bound what the resulting chart means:

  1. This can only label agents that run JavaScript. Everything that fetches
     the HTML without rendering it — curl, most scrapers, and the large-scale
     crawlers — never executes the tracker and is invisible to Umami whatever
     we do here. /api/send is POST-only, so there is no <noscript> pixel to
     fall back on. Umami's "bot" segment is therefore a floor, never a total.

  2. `navigator.webdriver` is trivially patched, and Playwright already does it
     by default. This catches naive automation and self-identifying crawlers;
     anything trying to blend in will pass as human.

  Every signal is a read of a property already implicit in the request. Nothing
  is stored on the device and nothing is fingerprinted, so this does not touch
  the no-consent position.
*/
export const AUTOMATION_HOOK = "euredactTagAutomation";

/** Tag applied to beacons that look automated. */
export const AUTOMATION_TAG = "automated";

/**
 * Source for the inline hook. Written as a string because it has to run before
 * the tracker's first beacon, ahead of React hydration.
 */
export function automationHookSource(): string {
  return `window.${AUTOMATION_HOOK}=function(t,p){try{
var n=navigator,u=n.userAgent||"";
if(n.webdriver===true||/bot|crawler|spider|slurp|headless|lighthouse|pingdom|gtmetrix/i.test(u)||!(n.languages&&n.languages.length)){p.tag=${JSON.stringify(AUTOMATION_TAG)};}
}catch(e){}
return p;};`;
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
  | "demo-redacted"
  | "playground-engaged"
  | "playground-redacted"
  | "coverage-filtered";

/*
  `playground-redacted` carries the ordinal of the run within this page load, so
  the property breakdown reads as a funnel: the count of `run: 3` is the number
  of visits that reached a third run. Paired with `playground-engaged`, which
  fires once, that gives both the average runs per engaged visit and how far
  people get before they stop.

  Capped so a held-down button cannot mint unbounded property values; at the cap
  the bucket means "this many or more", which blunts only the tail.
*/
export const PLAYGROUND_RUN_CAP = 10;

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
