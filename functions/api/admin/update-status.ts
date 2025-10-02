// Update User Status API using Supabase with Security
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

interface UpdateStatusRequest {
  userId: string;
  status: "active" | "blacklisted" | "whitelisted";
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
      RateLimiter.isRateLimited(clientId, { maxRequests: 5, windowMs: 60000 })
    ) {
      return RateLimiter.getRateLimitResponse();
    }

    const body = (await context.request.json()) as UpdateStatusRequest;
    const { userId, status } = body;

    if (!userId || !status) {
      return new Response(
        JSON.stringify({ error: "userId and status are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const supabase = getSupabaseClient(context.env);

    // Update user status
    const { data, error } = await supabase
      .from("users")
      .update({ status })
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, user: data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Update status error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update user status" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
