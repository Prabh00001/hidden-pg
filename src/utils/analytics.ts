// src/utils/analytics.ts
type Payload = Record<string, unknown>;

export function track(event: string, payload: Payload = {}) {
  try {
    // GTM/GA4 friendly
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event, ...payload });

    // Optional beacon (no server yet, so noop). Keep for future endpoint.
    // const blob = new Blob([JSON.stringify({ event, ...payload })], { type: 'application/json' });
    // navigator.sendBeacon?.('/analytics', blob);
  } catch (_e) {
    // eslint-disable-next-line no-console
    console.debug('[track]', event, payload);
  }
}
export function trackGemOpen(id: string, title: string) {
  track?.("gem_open", { id, title });
}

export function trackGemClickWebsite(id: string, title: string, url: string) {
  track?.("gem_click_website", { id, title, url });
}

export function trackGemClickCall(id: string, title: string, phone: string) {
  track?.("gem_click_call", { id, title, phone });
}

export function trackGemClickDirections(id: string, title: string, mapsUrl: string) {
  track?.("gem_click_directions", { id, title, mapsUrl });
}
