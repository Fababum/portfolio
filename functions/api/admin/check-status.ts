// Check User Status API
import { getSupabaseClient } from "../../utils/supabase";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  try {
    const url = new URL(context.request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "userId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabase = getSupabaseClient(context.env);

    const { data: user } = await supabase
      .from("users")
      .select("status")
      .eq("user_id", userId)
      .single();

    return new Response(
      JSON.stringify({
        status: user?.status || "active",
        isBlocked: user?.status === "blacklisted",
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
    console.error("Check status error:", error);
    return new Response(
      JSON.stringify({ status: "active", isBlocked: false }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
