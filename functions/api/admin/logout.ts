// Admin Logout API - Invalidates session token
import { invalidateSession } from "../../utils/session";
import {
  RateLimiter,
  validateOrigin,
  getClientIdentifier,
  unauthorizedResponse,
} from "../../utils/security";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  ALLOWED_ORIGINS?: string;
}

interface LogoutRequest {
  sessionToken: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    // Security: Validate origin
    const allowedOrigins = context.env.ALLOWED_ORIGINS
      ? context.env.ALLOWED_ORIGINS.split(",")
      : ["localhost", "pages.dev"];

    if (!validateOrigin(context.request, allowedOrigins)) {
      return unauthorizedResponse();
    }

    // Security: Rate limiting
    const clientId = getClientIdentifier(context.request);
    if (
      RateLimiter.isRateLimited(clientId, { maxRequests: 10, windowMs: 60000 })
    ) {
      return RateLimiter.getRateLimitResponse();
    }

    const body = (await context.request.json()) as LogoutRequest;
    const { sessionToken } = body;

    if (!sessionToken) {
      return new Response(JSON.stringify({ error: "Session token required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Invalidate the session
    const success = await invalidateSession(sessionToken, context.env);

    if (!success) {
      return new Response(JSON.stringify({ error: "Failed to logout" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Logged out successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return new Response(JSON.stringify({ error: "Logout failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Handle OPTIONS for CORS
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
