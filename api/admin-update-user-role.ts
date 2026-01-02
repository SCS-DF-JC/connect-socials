import { clerkClient, verifyToken } from "@clerk/backend";

function getBearerToken(req: any): string | null {
  const header = req.headers?.authorization || req.headers?.Authorization;
  if (!header || typeof header !== "string") return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

function getClerkSessionCookie(req: any): string | null {
  const cookieHeader = req.headers?.cookie;
  if (!cookieHeader || typeof cookieHeader !== "string") return null;

  const match = cookieHeader.match(/(?:^|;\s*)__session=([^;]+)/);
  if (!match) return null;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

async function requireAdmin(req: any) {
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) throw new Error("Missing CLERK_SECRET_KEY");

  const token = getBearerToken(req) || getClerkSessionCookie(req);
  if (!token) {
    return {
      ok: false as const,
      status: 401,
      error: "Missing Authorization token",
      debug: {
        hasAuthHeader: Boolean(req.headers?.authorization || req.headers?.Authorization),
        hasCookieHeader: Boolean(req.headers?.cookie),
      },
    };
  }

  const verified = await verifyToken(token, { secretKey });

  const adminUserId = (verified?.sub as string) || null;
  if (!adminUserId) return { ok: false as const, status: 401, error: "Invalid token" };

  const adminUser = await clerkClient.users.getUser(adminUserId);
  const role = (adminUser.publicMetadata as any)?.role;

  if (role !== "admin") {
    return { ok: false as const, status: 403, error: "Admins only" };
  }

  return { ok: true as const, adminUserId };
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const auth = await requireAdmin(req);
    if (!auth.ok) return res.status(auth.status).json({ error: auth.error, debug: (auth as any).debug });

    const { userId, role } = req.body || {};
    const allowedRoles = ["admin", "early_access", "user"];

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Missing or invalid userId" });
    }

    if (!role || typeof role !== "string" || !allowedRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const updated = await clerkClient.users.updateUser(userId, {
      publicMetadata: { role },
    });

    return res.status(200).json({
      ok: true,
      user: {
        id: updated.id,
        role: updated.publicMetadata?.role ?? "user",
      },
    });
  } catch (err: any) {
    console.error("admin-update-user-role error:", err);
    return res.status(500).json({ error: err?.message || "Failed to update role" });
  }
}
