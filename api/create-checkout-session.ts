import Stripe from "stripe";
import { verifyToken } from "@clerk/backend";

function getBearerToken(req: any): string | null {
  const header = req.headers?.authorization || req.headers?.Authorization;
  if (!header || typeof header !== "string") return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

function getOrigin(req: any): string {
  return (
    req.headers?.origin ||
    req.headers?.Origin ||
    `https://${req.headers?.host}` ||
    ""
  );
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_EARLY_ACCESS_PRICE_ID;
    const clerkSecretKey = process.env.CLERK_SECRET_KEY;

    if (!stripeSecretKey) {
      return res.status(500).json({ error: "Missing STRIPE_SECRET_KEY" });
    }
    if (!priceId) {
      return res.status(500).json({ error: "Missing STRIPE_EARLY_ACCESS_PRICE_ID" });
    }
    if (!clerkSecretKey) {
      return res.status(500).json({ error: "Missing CLERK_SECRET_KEY" });
    }

    // Require signed-in user token
    const token = getBearerToken(req);
    if (!token) {
      return res.status(401).json({ error: "Missing Authorization token" });
    }

    const verified = await verifyToken(token, { secretKey: clerkSecretKey });
    const clerkUserId = (verified?.sub as string) || null;
    if (!clerkUserId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    console.log(
      "Creating checkout session for Clerk user:",
      clerkUserId,
      "price:",
      priceId
    );

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });

    const origin = getOrigin(req);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      // Helpful for linking in Stripe dashboard and logs
      client_reference_id: clerkUserId,

      line_items: [{ price: priceId, quantity: 1 }],

      // Store metadata on the subscription (used in subscription webhooks)
      subscription_data: {
        trial_period_days: 3,
        metadata: {
          clerkUserId,
          plan: "early_access",
        },
      },

      // Also store metadata on the Checkout Session (used in checkout.session.* events)
      metadata: {
        clerkUserId,
        plan: "early_access",
      },

      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return res.status(400).json({ error: error.message });
  }
}
