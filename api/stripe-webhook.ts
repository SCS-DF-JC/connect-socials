import Stripe from "stripe";
import { clerkClient } from "@clerk/backend";

/**
 * Stripe requires the *raw request body* for signature verification.
 * We read the Node.js request stream into a Buffer.
 */
async function readRawBody(req: any): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

function safeRoleUpdate(targetRole: string, currentRole: string | undefined) {
  // Never downgrade an admin via webhook.
  if (currentRole === "admin") return null;
  return targetRole;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey) {
    return res.status(500).json({ error: "Missing STRIPE_SECRET_KEY" });
  }
  if (!webhookSecret) {
    return res.status(500).json({ error: "Missing STRIPE_WEBHOOK_SECRET" });
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });

  let event: Stripe.Event;

  try {
    const rawBody = await readRawBody(req);
    const sig = req.headers["stripe-signature"];

    if (!sig || typeof sig !== "string") {
      return res.status(400).json({ error: "Missing Stripe-Signature header" });
    }

    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error("Stripe webhook signature verification failed:", err?.message || err);
    return res.status(400).send(`Webhook Error: ${err?.message || "Invalid signature"}`);
  }

  try {
    switch (event.type) {
      /**
       * Fires when checkout completes successfully.
       * We stored clerkUserId in:
       * - session.metadata.clerkUserId
       * - session.client_reference_id (also set to clerkUserId)
       */
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const clerkUserId =
          (session.metadata?.clerkUserId as string | undefined) ||
          (session.client_reference_id as string | undefined);

        if (!clerkUserId) {
          console.warn("checkout.session.completed: missing clerkUserId");
          break;
        }

        const user = await clerkClient.users.getUser(clerkUserId);
        const currentRole = (user.publicMetadata as any)?.role as string | undefined;

        const nextRole = safeRoleUpdate("early_access", currentRole);
        if (!nextRole) break;

        await clerkClient.users.updateUser(clerkUserId, {
          publicMetadata: {
            ...(user.publicMetadata || {}),
            role: nextRole,
          },
        });

        console.log(`Granted early_access to ${clerkUserId}`);
        break;
      }

      /**
       * Fires when a subscription is deleted/cancelled.
       * We stored clerkUserId in subscription_data.metadata.clerkUserId during Checkout creation,
       * so it should appear here as subscription.metadata.clerkUserId.
       */
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;

        const clerkUserId = (sub.metadata?.clerkUserId as string | undefined) || undefined;

        if (!clerkUserId) {
          console.warn("customer.subscription.deleted: missing clerkUserId in subscription metadata");
          break;
        }

        const user = await clerkClient.users.getUser(clerkUserId);
        const currentRole = (user.publicMetadata as any)?.role as string | undefined;

        const nextRole = safeRoleUpdate("user", currentRole);
        if (!nextRole) break;

        await clerkClient.users.updateUser(clerkUserId, {
          publicMetadata: {
            ...(user.publicMetadata || {}),
            role: nextRole,
          },
        });

        console.log(`Revoked early_access (set to user) for ${clerkUserId}`);
        break;
      }

      /**
       * Optional (recommended): keeps roles correct if subscription status changes
       * (past_due, unpaid, canceled, etc.)
       */
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const clerkUserId = (sub.metadata?.clerkUserId as string | undefined) || undefined;

        if (!clerkUserId) break;

        const status = sub.status; // active, trialing, canceled, past_due, unpaid, etc.

        const user = await clerkClient.users.getUser(clerkUserId);
        const currentRole = (user.publicMetadata as any)?.role as string | undefined;

        const shouldHaveAccess = status === "active" || status === "trialing";
        const desiredRole = shouldHaveAccess ? "early_access" : "user";

        const nextRole = safeRoleUpdate(desiredRole, currentRole);
        if (!nextRole) break;

        // Only write if it actually changes (keeps logs clean)
        if (currentRole !== nextRole) {
          await clerkClient.users.updateUser(clerkUserId, {
            publicMetadata: {
              ...(user.publicMetadata || {}),
              role: nextRole,
            },
          });
          console.log(`Role sync for ${clerkUserId}: ${currentRole} -> ${nextRole} (status=${status})`);
        }

        break;
      }

      default:
        // Ignore anything else
        break;
    }

    // Stripe expects a 2xx quickly.
    return res.status(200).json({ received: true });
  } catch (err: any) {
    console.error("Webhook handler error:", err?.message || err);
    return res.status(500).json({ error: "Webhook handler failed" });
  }
}
