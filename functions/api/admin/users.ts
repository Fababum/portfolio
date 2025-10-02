// Admin API Handler using Supabase with Security
import { getSupabaseClient } from "../../utils/supabase";
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

export async function onRequestGet(context: { request: Request; env: Env }) {
  try {
    // Security: Validate origin
    const allowedOrigins = context.env.ALLOWED_ORIGINS
      ? context.env.ALLOWED_ORIGINS.split(",")
      : ["localhost", "pages.dev"];

    if (!validateOrigin(context.request, allowedOrigins)) {
      return unauthorizedResponse();
    }

    // Security: Rate limiting (stricter for admin endpoints)
    const clientId = getClientIdentifier(context.request);
    if (
      RateLimiter.isRateLimited(clientId, { maxRequests: 10, windowMs: 60000 })
    ) {
      return RateLimiter.getRateLimitResponse();
    }

    // Security: Validate session token
    const url = new URL(context.request.url);
    const sessionToken = url.searchParams.get("sessionToken");

    if (!sessionToken) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const supabase = getSupabaseClient(context.env);

    // Get all users
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*")
      .order("last_visit", { ascending: false });

    if (usersError) throw usersError;

    // Get recent visits
    const { data: visits, error: visitsError } = await supabase
      .from("visits")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(100);

    if (visitsError) throw visitsError;

    return new Response(
      JSON.stringify({
        users: users || [],
        visits: visits || [],
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Admin API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch admin data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
