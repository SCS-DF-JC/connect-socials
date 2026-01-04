// Increase the body size limit for this API route
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

const N8N_WEBHOOK_URL = "https://n8n.smartcontentsolutions.co.uk/webhook/seo-content-publisher";

export default async function handler(req: any, res: any) {
    // Set CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
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

        // Create FormData for n8n (n8n workflows expect form data)
        // IMPORTANT: n8n requires ALL fields to be present, even if empty
        const formData = new FormData();

        // Always append all required fields (use empty string if not provided)
        formData.append('topic', body.topic || '');
        formData.append('sections', body.sections || '3');
        formData.append('keywords', body.keywords || '');
        formData.append('location', body.location || '');
        formData.append('occupation', body.occupation || '');
        formData.append('audience', body.audience || '');
        formData.append('tone', body.tone || 'Professional');
        formData.append('wp_url', body.wp_url || '');
        formData.append('wp_username', body.wp_username || '');
        formData.append('wp_app_password', body.wp_app_password || '');

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
            location: body.location,
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
