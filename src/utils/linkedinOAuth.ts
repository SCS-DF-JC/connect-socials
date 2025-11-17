// ===============================
// LinkedIn OAuth (N8N + NON-PKCE Version for Standalone Apps)
// ===============================

export interface LinkedInAuthData {
  access_token: string;
  expires_in: number;
  refresh_token: string | null;
  linkedin_user_id: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  emailAddress: string;
}

export const LINKEDIN_AUTH_STORAGE_KEY = "linkedin_auth_data";

// N8N Webhook URL
const N8N_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

// LinkedIn OAuth App settings
const LINKEDIN_CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/linkedin/callback`;

// =========================================
// Helper: Generate random state
// =========================================
function generateState(length = 32) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

// ======================================================
// STEP 1: Redirect user to LinkedIn OAuth (NO PKCE)
// ======================================================
export async function initiateLinkedInAuth(userId: string) {
  const state = generateState();

  // Store state + user ID
  localStorage.setItem("linkedin_oauth_state", state);
  localStorage.setItem("linkedin_user_id", userId);

  const authUrl =
    "https://www.linkedin.com/oauth/v2/authorization" +
    `?response_type=code` +
    `&client_id=${encodeURIComponent(LINKEDIN_CLIENT_ID)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=${encodeURIComponent("openid profile email w_member_social")}` +
    `&state=${state}`;

  window.location.href = authUrl;
}

// ======================================================
// STEP 2: LinkedIn redirects user → Your frontend → N8N
// ======================================================
export async function completeLinkedInAuth() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const returnedState = params.get("state");

  const storedState = localStorage.getItem("linkedin_oauth_state");
  const userId = localStorage.getItem("linkedin_user_id");

  if (!code) throw new Error("No authorization code returned from LinkedIn");
  if (returnedState !== storedState)
    throw new Error("Invalid OAuth state value");

  // Clear temporary state
  localStorage.removeItem("linkedin_oauth_state");

  // Call N8N workflow
  const res = await fetch(`${N8N_URL}/oauth-callback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provider: "linkedin",
      code,
      state: returnedState,
      user_id: userId,
      redirect_uri: REDIRECT_URI, // IMPORTANT: Must match LinkedIn app
    }),
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("OAuth callback failed");
  }

  const data = await res.json();
  const authData = data.linkedin_auth_data;

  if (!authData) throw new Error("Invalid response from OAuth callback");

  saveLinkedInAuthData(authData);

  return authData;
}

// ======================================================
// Local Storage Helpers
// ======================================================
export function saveLinkedInAuthData(data: LinkedInAuthData): void {
  localStorage.setItem(LINKEDIN_AUTH_STORAGE_KEY, JSON.stringify(data));
}

export function getLinkedInAuthData(): LinkedInAuthData | null {
  const stored = localStorage.getItem(LINKEDIN_AUTH_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function isLinkedInConnected(): boolean {
  return localStorage.getItem(LINKEDIN_AUTH_STORAGE_KEY) !== null;
}

export function clearLinkedInAuthData(): void {
  localStorage.removeItem(LINKEDIN_AUTH_STORAGE_KEY);
}
