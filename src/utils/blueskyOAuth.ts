// Bluesky OAuth utilities
const BLUESKY_STORAGE_KEY = "bluesky_credentials";

export interface BlueskyCredentials {
  username: string;
  password: string;
  connected: boolean;
}

export const saveBlueskyCredentials = (username: string, password: string): void => {
  const credentials: BlueskyCredentials = {
    username,
    password,
    connected: true,
  };
  localStorage.setItem(BLUESKY_STORAGE_KEY, JSON.stringify(credentials));
};

export const getBlueskyCredentials = (): BlueskyCredentials | null => {
  const stored = localStorage.getItem(BLUESKY_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const clearBlueskyCredentials = (): void => {
  localStorage.removeItem(BLUESKY_STORAGE_KEY);
};

export const isBlueskyConnected = (): boolean => {
  const credentials = getBlueskyCredentials();
  return credentials?.connected === true;
};