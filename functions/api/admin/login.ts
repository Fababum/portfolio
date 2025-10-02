// Admin Login API with password verification and Security
import { getSupabaseClient } from "../../utils/supabase";
import { RateLimiter, getClientIdentifier } from "../../utils/security";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

// Simple password hashing using Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    // Security: Strict rate limiting for login attempts (prevent brute force)
    const clientId = getClientIdentifier(context.request);
    if (
      RateLimiter.isRateLimited(clientId, { maxRequests: 10, windowMs: 300000 })
    ) {
      // 10 attempts per 5 minutes
      console.warn(`Login rate limit exceeded for: ${clientId}`);
      return new Response(
        JSON.stringify({
          error: "Too many login attempts. Please try again in 5 minutes.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", "Retry-After": "300" },
        }
      );
    }

    const body = (await context.request.json()) as LoginRequest;
    const { username, password } = body;

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

    // Hash the provided password
    const passwordHash = await hashPassword(password);

    // Check if user exists with matching password
    const { data: admin, error } = await supabase
      .from("admin_users")
      .select("id, username, is_active, last_login")
      .eq("username", username)
      .eq("password_hash", passwordHash)
      .eq("is_active", true)
      .single();

    if (error || !admin) {
      return new Response(
        JSON.stringify({ error: "Invalid username or password" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Reset rate limit on successful login
    RateLimiter.resetLimit(clientId);

    // Update last login time
    await supabase
      .from("admin_users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", admin.id);

    // Generate a session token
    const sessionToken = await hashPassword(
      `${admin.id}-${Date.now()}-${Math.random()}`
    );

    // Store session token in database with 24-hour expiration
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Get client info for session tracking
    const ipAddress =
      context.request.headers.get("CF-Connecting-IP") || "unknown";
    const userAgent = context.request.headers.get("User-Agent") || "unknown";

    const { error: sessionError } = await supabase
      .from("admin_sessions")
      .insert({
        admin_id: admin.id,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString(),
        ip_address: ipAddress,
        user_agent: userAgent,
      });

    if (sessionError) {
      console.error("Failed to create session:", sessionError);
      console.error("Session error details:", JSON.stringify(sessionError));
      // Don't fail login - return success but log the error
      // This ensures login still works even if session table has issues
    } else {
      console.log("Session created successfully for admin:", admin.id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        username: admin.username,
        sessionToken,
        lastLogin: admin.last_login,
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
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Login failed" }), {
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
