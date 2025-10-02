interface CloudflareContext {
  request: Request;
  env: {
    GEMINI_API_KEY: string;
    GEMINI_API_KEY2: string;
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    ALLOWED_ORIGINS?: string;
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

    // Get allowed origins from environment variable or use defaults
    const allowedOriginsEnv =
      context.env.ALLOWED_ORIGINS || "localhost,pages.dev";
    const allowedOrigins = allowedOriginsEnv
      .split(",")
      .map((domain: string) => {
        if (domain.includes("localhost")) {
          return [`http://localhost:5173`, `http://localhost:4173`];
        }
        return [`https://${domain}`, `http://${domain}`];
      })
      .flat();

    const isValidOrigin =
      origin &&
      allowedOrigins.some((allowed: string) => origin.startsWith(allowed));
    const isValidReferer =
      referer &&
      allowedOrigins.some((allowed: string) => referer.startsWith(allowed));

    if (!isValidOrigin && !isValidReferer) {
      return new Response(JSON.stringify({ error: "Unauthorized access" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { message, userId } = await context.request.json();

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Invalid message" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if user is blacklisted
    if (userId && context.env.SUPABASE_URL && context.env.SUPABASE_ANON_KEY) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(
          context.env.SUPABASE_URL,
          context.env.SUPABASE_ANON_KEY
        );

        const { data: user } = await supabase
          .from("users")
          .select("status")
          .eq("user_id", userId)
          .single();

        if (user?.status === "blacklisted") {
          return new Response(
            JSON.stringify({
              error:
                "Access denied. Your account has been restricted. Please contact the administrator if you believe this is an error.",
            }),
            {
              status: 403,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      } catch (dbError) {
        console.error("Error checking user status:", dbError);
        // Continue if database check fails (don't block legitimate users)
      }
    }

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

    // System prompt to guide the chatbot's behavior
    const systemPrompt = `You are a friendly assistant on Fabian Spiri's portfolio website. Your role is to:

1. Answer questions ONLY about Fabian Spiri and his work
2. Always speak positively and professionally about Fabian
3. Use information from his portfolio: He's a full-stack developer at Swisscom, skilled in React, TypeScript, NestJS, Prisma, Java, and Python
4. His projects include: Abuse (cybersecurity tool), CodemiX2 (learning fundamentals app), and Apps Team (NestJS/Prisma project)
5. Contact: fabian.spiri@gmx.ch, LinkedIn, GitHub: @Fababum, YouTube: @Fababum

If someone asks:
- Questions about Fabian's skills/projects/experience → Answer positively and informatively
- Negative or inappropriate questions → Respond: "I'm here to help you learn about Fabian's amazing work and skills! Let's keep things positive. What would you like to know about his projects or experience?"
- Off-topic questions (not about Fabian) → Respond: "I'm specifically designed to answer questions about Fabian Spiri and his portfolio. What would you like to know about his skills, projects, or experience?"

Keep responses concise, friendly, and enthusiastic about Fabian's work!`;

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
              role: "user",
              parts: [
                {
                  text: systemPrompt + "\n\nUser question: " + message,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          },
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
