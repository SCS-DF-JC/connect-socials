// src/utils/blueskyOAuth.ts

export interface BlueskyAuthData {
  did: string;
  accessJwt: string;
  refreshJwt: string;
  handle: string;
}

export const BLUESKY_AUTH_KEY = "bluesky_auth_data";

export function saveBlueskyAuthData(data: BlueskyAuthData) {
  localStorage.setItem(BLUESKY_AUTH_KEY, JSON.stringify(data));
}

export function getBlueskyAuthData(): BlueskyAuthData | null {
  const raw = localStorage.getItem(BLUESKY_AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearBlueskyAuthData() {
  localStorage.removeItem(BLUESKY_AUTH_KEY);
}

export function isBlueskyConnected(): boolean {
  return !!localStorage.getItem(BLUESKY_AUTH_KEY);
}

// Start Bluesky "OAuth" (really just a POST to n8n)
export async function initiateBlueskyAuth(username: string, appPassword: string, userId: string) {
  const webhook = "https://scs-ltd.app.n8n.cloud/webhook/oauth-bluesky";

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      appPassword,
      user_id: userId,
    }),
  });

  if (!res.ok) throw new Error("Bluesky login failed");

  const json = await res.json();
  saveBlueskyAuthData(json);
  return json;
}
