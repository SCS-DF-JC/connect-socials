// src/utils/sendToWebhook.ts

const WEBHOOK_URL = import.meta.env.VITE_N8N_POST_WEBHOOK;

export default async function postWebhook(formData: FormData) {
  if (!WEBHOOK_URL) {
    console.error("❌ Missing VITE_N8N_POST_WEBHOOK env variable!");
    return { success: false, error: "Webhook URL missing" };
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: formData, // send FormData directly
    });

    const text = await response.text();

    // Try to return JSON if possible
    try {
      return JSON.parse(text);
    } catch {
      return { raw: text };
    }
  } catch (err: any) {
    console.error("❌ Error sending post:", err);
    return {
      success: false,
      error: err.message || "Unknown error occurred",
    };
  }
}
