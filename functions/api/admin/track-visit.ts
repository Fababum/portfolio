// Track User Visits API using Supabase
import { getSupabaseClient } from "../../utils/supabase";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

interface TrackVisitRequest {
  userId: string;
  isReturning: boolean;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
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
