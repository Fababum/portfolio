// Session Token Validation Utility
import { getSupabaseClient } from "./supabase";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

interface SessionValidationResult {
  valid: boolean;
  adminId?: number;
  username?: string;
  error?: string;
}

/**
 * Validates a session token against the database
 * @param sessionToken - The session token to validate
 * @param env - Environment variables
 * @returns SessionValidationResult
 */
export async function validateSessionToken(
  sessionToken: string,
  env: Env
): Promise<SessionValidationResult> {
  if (!sessionToken) {
    return { valid: false, error: "No session token provided" };
  }

  try {
    const supabase = getSupabaseClient(env);

    // Check if session exists and is valid
    const { data: session, error: sessionError } = await supabase
      .from("admin_sessions")
      .select("id, admin_id, expires_at, is_active")
      .eq("session_token", sessionToken)
      .eq("is_active", true)
      .single();

    if (sessionError || !session) {
      return { valid: false, error: "Invalid session token" };
    }

    // Check if session has expired
    const expiresAt = new Date(session.expires_at);
    if (expiresAt < new Date()) {
      // Mark session as inactive
      await supabase
        .from("admin_sessions")
        .update({ is_active: false })
        .eq("id", session.id);

      return { valid: false, error: "Session expired" };
    }

    // Update last_used_at
    await supabase
      .from("admin_sessions")
      .update({ last_used_at: new Date().toISOString() })
      .eq("id", session.id);

    // Get admin user details
    const { data: admin, error: adminError } = await supabase
      .from("admin_users")
      .select("id, username, is_active")
      .eq("id", session.admin_id)
      .eq("is_active", true)
      .single();

    if (adminError || !admin) {
      return { valid: false, error: "Admin user not found or inactive" };
    }

    return {
      valid: true,
      adminId: admin.id,
      username: admin.username,
    };
  } catch (error) {
    console.error("Session validation error:", error);
    return { valid: false, error: "Session validation failed" };
  }
}

/**
 * Invalidates a session token (logout)
 * @param sessionToken - The session token to invalidate
 * @param env - Environment variables
 */
export async function invalidateSession(
  sessionToken: string,
  env: Env
): Promise<boolean> {
  try {
    const supabase = getSupabaseClient(env);

    const { error } = await supabase
      .from("admin_sessions")
      .update({ is_active: false })
      .eq("session_token", sessionToken);

    return !error;
  } catch (error) {
    console.error("Session invalidation error:", error);
    return false;
  }
}

/**
 * Invalidates all sessions for an admin user
 * @param adminId - The admin user ID
 * @param env - Environment variables
 */
export async function invalidateAllUserSessions(
  adminId: number,
  env: Env
): Promise<boolean> {
  try {
    const supabase = getSupabaseClient(env);

    const { error } = await supabase
      .from("admin_sessions")
      .update({ is_active: false })
      .eq("admin_id", adminId)
      .eq("is_active", true);

    return !error;
  } catch (error) {
    console.error("Session invalidation error:", error);
    return false;
  }
}
