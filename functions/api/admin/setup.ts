// Admin Setup API - Create initial admin user
// This should only be called once to set up the first admin
import { getSupabaseClient } from "../../utils/supabase";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

interface SetupRequest {
  username: string;
  password: string;
  setupKey: string; // Secret key to prevent unauthorized setup
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const body = (await context.request.json()) as SetupRequest;
    const { username, password, setupKey } = body;

    // Verify setup key (you should set this in Cloudflare env variables)
    const SETUP_KEY = "FabianSetup2025"; // Change this!
    if (setupKey !== SETUP_KEY) {
      return new Response(JSON.stringify({ error: "Invalid setup key" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Username and password are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const supabase = getSupabaseClient(context.env);

    // Check if admin already exists
    const { data: existing } = await supabase
      .from("admin_users")
      .select("id")
      .eq("username", username)
      .single();

    if (existing) {
      return new Response(
        JSON.stringify({ error: "Admin user already exists" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create admin user
    const { error } = await supabase.from("admin_users").insert({
      username,
      password_hash: passwordHash,
      is_active: true,
    });

    if (error) throw error;

    return new Response(
      JSON.stringify({
        success: true,
        message: "Admin user created successfully",
        username,
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
    console.error("Setup error:", error);
    return new Response(JSON.stringify({ error: "Setup failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
