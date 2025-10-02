// Update User Status API using Supabase
import { getSupabaseClient } from "../../utils/supabase";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

interface UpdateStatusRequest {
  userId: string;
  status: "active" | "blacklisted" | "whitelisted";
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
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
