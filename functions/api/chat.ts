interface CloudflareContext {
  request: Request;
  env: {
    GEMINI_API_KEY: string;
    GEMINI_API_KEY2: string;
  };
}

// Simple rate limiting using IP-based tracking
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: Request): string {
  const ip =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For") ||
    "unknown";
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(key);

  if (!limit) {
    rateLimitMap.set(key, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (now > limit.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + 60000 });
    return true;
  }

  if (limit.count >= 5) {
    // Max 5 requests per minute
    return false;
  }

  limit.count++;
  return true;
}

// Clean up old entries periodically
function cleanupRateLimits() {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

export async function onRequestPost(context: CloudflareContext) {
  try {
    const clientIP = getRateLimitKey(context.request);

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({
          error: "Too many requests. Please wait a minute before trying again.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }

    // Verify Origin header to prevent direct API calls
    const origin = context.request.headers.get("Origin");
    const referer = context.request.headers.get("Referer");
    const allowedOrigins = [
      "https://spiri.pages.dev",
      "http://localhost:5173",
      "http://localhost:4173",
    ];

    const isValidOrigin =
      origin && allowedOrigins.some((allowed) => origin.startsWith(allowed));
    const isValidReferer =
      referer && allowedOrigins.some((allowed) => referer.startsWith(allowed));

    if (!isValidOrigin && !isValidReferer) {
      return new Response(JSON.stringify({ error: "Unauthorized access" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { message } = await context.request.json();

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Invalid message" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Additional validation: check message length
    if (message.length > 1000) {
      return new Response(
        JSON.stringify({ error: "Message too long. Maximum 1000 characters." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Block suspicious patterns (automated bot detection)
    const suspiciousPatterns = [
      /curl/i,
      /postman/i,
      /automated/i,
      /bot.*test/i,
    ];

    if (suspiciousPatterns.some((pattern) => pattern.test(message))) {
      return new Response(
        JSON.stringify({ error: "Suspicious activity detected" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const apiKey = context.env.GEMINI_API_KEY || context.env.GEMINI_API_KEY2;

    if (!apiKey) {
      console.error(
        "GEMINI_API_KEY or GEMINI_API_KEY2 is not set in Cloudflare environment"
      );
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Clean up old rate limit entries
    cleanupRateLimits();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Failed to get response from AI" }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in chat function:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
