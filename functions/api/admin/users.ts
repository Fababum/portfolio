// Admin API Handler using Supabase
import { getSupabaseClient } from "../../utils/supabase";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

export async function onRequestGet(context: { env: Env }) {
  try {
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
