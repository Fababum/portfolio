import { createClient } from "@supabase/supabase-js";

// Load environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase client with storage key based on domain
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: `sb-${window.location.hostname}`,
    persistSession: window.location.hostname === "spiri.pages.dev",
  },
});

// Google OAuth login
export async function loginWithGoogle() {
  // Force clear any existing sessions first
  await supabase.auth.signOut();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      scopes:
        "openid email profile https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events",
      queryParams: {
        access_type: "offline", // Get refresh token
        prompt: "consent", // Force consent screen
      },
      redirectTo: "https://spiri.pages.dev/calendarai",
      skipBrowserRedirect: false,
    },
  });

  if (error) {
    console.error("OAuth Error:", error);
    alert("Failed to sign in. Please try again.");
  }
}

// Save Google access & refresh tokens to database
type SupabaseSession = {
  user: { id: string; email?: string | null };
  provider_token?: string | null;
  provider_refresh_token?: string | null;
  expires_in?: number | null;
};

export async function saveGoogleTokens(sessionOverride?: SupabaseSession | null) {
  try {
    // Get current session from Supabase Auth
    const sessionData =
      sessionOverride ?? (await supabase.auth.getSession()).data.session;

    // Check if user is logged in
    if (!sessionData) {
      console.error("No session found");
      return;
    }

    // Extract user data and tokens from session
    const user = sessionData.user;
    const accessToken = sessionData.provider_token; // Google Access Token
    const refreshToken = sessionData.provider_refresh_token; // Google Refresh Token
    const expiresIn = sessionData.expires_in || 3600; // Token expires in 1h

    if (!accessToken) {
      console.warn(
        "Google access token missing in session. Skipping token save."
      );
      return;
    }

    // Calculate token expiration time
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

    // Google Calendar scopes
    const scopes = [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar.events",
    ];

    // Save tokens to user_google_tokens table (upsert = insert or update)
    const payload: Record<string, unknown> = {
      user_id: user.id,
      email: user.email,
      access_token: accessToken,
      token_expires_at: expiresAt,
      scopes: scopes,
      updated_at: new Date().toISOString(),
    };

    if (refreshToken) {
      payload.refresh_token = refreshToken;
    }

    const { error } = await supabase.from("user_google_tokens").upsert(
      payload,
      {
        onConflict: "user_id", // Update if user_id already exists
      }
    );

    if (error) {
      console.error("Error saving tokens:", error);
    } else {
      console.log("Tokens saved successfully!");
    }
  } catch (error) {
    console.error("Unexpected error in saveGoogleTokens:", error);
  }
}

// Send message to n8n AI and return AI response
export async function sendToN8n(
  userMessage: string,
  sessionId: string
): Promise<string | null> {
  try {
    // Get session to retrieve user ID (for token lookup in n8n)
    const session = await supabase.auth.getSession();

    if (!session.data.session) {
      return "Error: Not logged in. Please sign in again.";
    }

    const userId = session.data.session.user.id;

    // Payload with message, sessionId and userId
    const payload = {
      message: userMessage,
      sessionId: sessionId, // Unique session ID from CalendarAI.tsx
      userId: userId, // User ID for token lookup in Supabase
    };

    const response = await fetch(
      "https://n8n.julianschwab.dev/webhook/calendarai/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    // Try to read response
    const responseText = await response.text();

    // If response is empty
    if (!responseText) {
      return "Error: Empty response from n8n";
    }

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("JSON Parse Error:", e);
      return `Error: Invalid response - ${responseText}`;
    }

    // Parse n8n response format
    if (Array.isArray(data) && data.length > 0) {
      const firstItem = data[0];

      // n8n sends respond_text field
      const aiResponse = firstItem.respond_text || firstItem.output;

      // If response contains actual text
      if (aiResponse && aiResponse.trim()) {
        return aiResponse.trim();
      }

      // If no valid response found, log entire object
      console.warn("No valid AI response found, Data:", firstItem);
      return "AI did not provide a response. Please try again.";
    }

    // Fallback for unexpected format
    console.warn("Unknown response format:", data);
    return "AI response could not be processed.";
  } catch (error) {
    console.error("Network error:", error);
    return `Network error: ${error}`;
  }
}
