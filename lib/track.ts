export type TrackPayload = Record<string, unknown>;

const TRACK_KEY = "opcn-events";

export function track(eventName: string, payload: TrackPayload = {}) {
  const event = {
    eventName,
    payload,
    ts: Date.now(),
  };

  console.log("[track]", eventName, payload);

  if (typeof window === "undefined") return;

  try {
    const current = window.localStorage.getItem(TRACK_KEY);
    const parsed = current ? (JSON.parse(current) as unknown[]) : [];
    parsed.push(event);
    window.localStorage.setItem(TRACK_KEY, JSON.stringify(parsed));
  } catch {
    // noop
  }
}