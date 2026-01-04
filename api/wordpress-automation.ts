const N8N_WEBHOOK_URL = "https://n8n.smartcontentsolutions.co.uk/webhook/seo-content-publisher";

export default async function handler(req: any, res: any) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const body = req.body;

        if (!body) {
            return res.status(400).json({ success: false, error: 'No request body provided' });
        }

        // Create FormData for n8n (some n8n workflows expect form data)
        const formData = new FormData();

        // Add all text fields
        if (body.topic) formData.append('topic', body.topic);
        if (body.sections) formData.append('sections', body.sections);
        if (body.keywords) formData.append('keywords', body.keywords);
        if (body.location) formData.append('location', body.location);
        if (body.occupation) formData.append('occupation', body.occupation);
        if (body.audience) formData.append('audience', body.audience);
        if (body.tone) formData.append('tone', body.tone);
        if (body.wp_url) formData.append('wp_url', body.wp_url);
        if (body.wp_username) formData.append('wp_username', body.wp_username);
        if (body.wp_app_password) formData.append('wp_app_password', body.wp_app_password);

        // Handle image if present (base64 encoded from frontend)
        if (body.image && body.imageName) {
            try {
                const imageBuffer = Buffer.from(body.image, 'base64');
                const blob = new Blob([imageBuffer]);
                formData.append('image', blob, body.imageName);
            } catch (imgError) {
                console.warn('Failed to process image, continuing without it:', imgError);
            }
        }

        console.log('Forwarding request to n8n webhook:', N8N_WEBHOOK_URL);
        console.log('Request data:', {
            topic: body.topic,
            wp_url: body.wp_url,
            hasImage: !!body.image,
        });

        // Forward to n8n
        const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            body: formData,
        });

        const responseText = await n8nResponse.text();

        console.log('n8n response status:', n8nResponse.status);
        console.log('n8n response body:', responseText.substring(0, 500));

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');

        if (n8nResponse.ok) {
            return res.status(200).json({
                success: true,
                message: 'Request forwarded to n8n successfully',
                n8nResponse: responseText
            });
        } else {
            console.error('n8n webhook error:', n8nResponse.status, responseText);
            return res.status(n8nResponse.status).json({
                success: false,
                error: 'n8n webhook returned an error',
                status: n8nResponse.status,
                details: responseText
            });
        }
    } catch (error: any) {
        console.error('Error forwarding to n8n:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to forward request to n8n',
            details: error.message
        });
    }
}
