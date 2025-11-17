import { LinkedInAuthData } from './linkedinOAuth';

const N8N_WEBHOOK_URL = 'https://scs-ltd.app.n8n.cloud/webhook/fc5a796d-740c-434a-9d39-050e6a9f9548';

export async function sendAuthDataToWebhook(authData: LinkedInAuthData): Promise<boolean> {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        platform: 'linkedin',
        linkedin_auth_data: authData,
      }),
    });

    if (!response.ok) {
      console.error('Failed to send data to webhook:', response.status);
      return false;
    }

    console.log('Successfully sent auth data to n8n webhook');
    return true;
  } catch (error) {
    console.error('Error sending data to webhook:', error);
    return false;
  }
}
