import Stripe from "stripe";
import { clerkClient } from "@clerk/backend";

/**
 * API endpoint to create a Stripe Customer Portal session
 * Allows users to manage their subscription (cancel, update payment method, etc.)
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
        if (!body?.userId) {
            return res.status(400).json({ error: "Missing userId" });
        }

        const { userId } = body;

        // Get user from Clerk to find their Stripe Customer ID
        const user = await clerkClient.users.getUser(userId);
        const stripeCustomerId = (user.publicMetadata as any)?.stripeCustomerId;

        if (!stripeCustomerId) {
            return res.status(404).json({
                error: "No Stripe customer found. You may not have an active subscription."
            });
        }

        // Initialize Stripe
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeSecretKey) {
            return res.status(500).json({ error: "Stripe not configured" });
        }

        const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });

        // Create Portal Session
        // Returns to the account page after exiting portal
        const session = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5173"}/account`,
        });

        return res.status(200).json({ url: session.url });
    } catch (err: any) {
        console.error("Portal session error:", err);
        return res.status(500).json({
            error: err?.message || "Failed to create portal session"
        });
    }
}
