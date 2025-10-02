// Track User Visits API using Supabase with Security
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
  ALLOWED_ORIGINS?: string; // Comma-separated list of allowed domains
}

interface TrackVisitRequest {
  userId: string;
  isReturning: boolean;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    // Security: Validate origin to prevent curl abuse
    const allowedOrigins = context.env.ALLOWED_ORIGINS
      ? context.env.ALLOWED_ORIGINS.split(",")
      : ["localhost", "pages.dev", "your-domain.com"]; // Add your actual domain

    if (!validateOrigin(context.request, allowedOrigins)) {
      console.warn("Blocked request from unauthorized origin");
      return unauthorizedResponse();
    }

    // Security: Rate limiting to prevent abuse
    const clientId = getClientIdentifier(context.request);
    if (
      RateLimiter.isRateLimited(clientId, { maxRequests: 20, windowMs: 60000 })
    ) {
      console.warn(`Rate limit exceeded for client: ${clientId}`);
      return RateLimiter.getRateLimitResponse();
    }

    const body = (await context.request.json()) as TrackVisitRequest;
    const { userId, isReturning } = body;

    const ip =
      context.request.headers.get("CF-Connecting-IP") ||
      context.request.headers.get("X-Forwarded-For") ||
      "unknown";

    const supabase = getSupabaseClient(context.env);

    // Insert visit record
    const { error: visitError } = await supabase.from("visits").insert({
      user_id: userId,
      is_returning: isReturning,
      ip_address: ip,
    });

    if (visitError) throw visitError;

    // Check if user exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();

    // Don't track visits from blacklisted users
    if (existingUser?.status === "blacklisted") {
      return new Response(
        JSON.stringify({ success: false, message: "User is blacklisted" }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    if (existingUser) {
      // Update existing user
      const { error: updateError } = await supabase
        .from("users")
        .update({
          visit_count: existingUser.visit_count + 1,
          last_visit: new Date().toISOString(),
        })
        .eq("user_id", userId);

      if (updateError) throw updateError;
    } else {
      // Create new user
      const { error: insertError } = await supabase.from("users").insert({
        user_id: userId,
        visit_count: 1,
        status: "active",
      });

      if (insertError) throw insertError;
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Track visit error:", error);
    return new Response(JSON.stringify({ error: "Failed to track visit" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
