import Stripe from "stripe";
import { clerkClient } from "@clerk/backend";

/**
 * API Endpoint to manually sync role after successful payment.
 * This is crucial for:
 * 1. Localhost development where webhooks can't reach
 * 2. Instant access provisioning without waiting for webhook delays
 */

async function readJsonBody(req: any): Promise<any> {
    if (req.body && typeof req.body === "object") return req.body;
    if (req.body && typeof req.body === "string") {
        try {
            return JSON.parse(req.body);
        } catch {
            return null;
        }
    }

    try {
        const chunks: Buffer[] = [];
        for await (const chunk of req) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }
        if (chunks.length === 0) return null;
        const text = Buffer.concat(chunks).toString("utf8");
        return JSON.parse(text);
    } catch {
        return null;
    }
}

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const body = await readJsonBody(req);
        const { sessionId, userId } = body;

        if (!sessionId || !userId) {
            return res.status(400).json({ error: "Missing sessionId or userId" });
        }

        // Initialize Stripe
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeSecretKey) {
            return res.status(500).json({ error: "Stripe not configured" });
        }

        const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });

        // Retrieve the session from Stripe to verify payment
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Verify the customer actually paid
        if (session.payment_status !== "paid" && session.payment_status !== "no_payment_required") {
            // no_payment_required is for trials
            return res.status(400).json({ error: "Payment not completed" });
        }

        // Verify the user ID matches the one in metadata (security check)
        const clerkUserId = session.metadata?.clerkUserId;
        if (clerkUserId !== userId) {
            return res.status(403).json({ error: "Session does not belong to this user" });
        }

        // If we get here, payment is valid. Grant the role immediately.
        const user = await clerkClient.users.getUser(userId);

        // Only update if not already admin
        const currentRole = (user.publicMetadata?.role as string);
        if (currentRole !== "admin") {
            await clerkClient.users.updateUser(userId, {
                publicMetadata: {
                    ...(user.publicMetadata || {}),
                    role: "early_access",
                    stripeCustomerId: session.customer as string,
                    subscriptionId: session.subscription as string,
                    planName: session.metadata?.planName || "Early Access",
                    subscriptionStatus: "active"
                }
            });
            console.log(`[Sync] Manually granted early_access to ${userId}`);
        } else {
            console.log(`[Sync] Skipped - User is admin`);
        }

        return res.status(200).json({ success: true, role: "early_access" });

    } catch (err: any) {
        console.error("Sync error:", err);
        return res.status(500).json({ error: err.message || "Failed to sync role" });
    }
}
