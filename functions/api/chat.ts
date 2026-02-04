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

function getRateLimitKey(request: Request): string | null {
  const ip =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For") ||
    request.headers.get("X-Real-IP");
  const userAgent = request.headers.get("User-Agent") || "";

  if (!ip) {
    return null;
  }

  return `${ip}:${userAgent}`;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(key);
  const maxRequests = 120;

  if (!limit) {
    rateLimitMap.set(key, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (now > limit.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + 60000 });
    return true;
  }

  if (limit.count >= maxRequests) {
    // Max requests per minute
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

    // Check rate limit only if we can identify the client
    if (clientIP && !checkRateLimit(clientIP)) {
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
        },
      );
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
          context.env.SUPABASE_ANON_KEY,
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
            },
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
        },
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
        },
      );
    }

    const apiKey = context.env.GEMINI_API_KEY || context.env.GEMINI_API_KEY2;

    if (!apiKey) {
      console.error(
        "GEMINI_API_KEY or GEMINI_API_KEY2 is not set in Cloudflare environment",
      );
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Clean up old rate limit entries
    cleanupRateLimits();

    // System prompt to guide the chatbot's behavior
    const systemPrompt = `You are a friendly and knowledgeable assistant on Fabian Spiri's portfolio website. Your primary role is to help visitors learn about Fabian and his work.

ABOUT FABIAN SPIRI:
- Full-stack developer at Swisscom
- Skills: React, TypeScript, NestJS, Prisma, Java, Python, and modern web technologies
- Projects:
  * Abuse: Cybersecurity tool for security analysis
  * CodemiX2: Interactive learning app for programming fundamentals
  * Apps Team: Enterprise project using NestJS and Prisma
- Contact: fabian.spiri@gmx.ch
- GitHub: @Fababum
- YouTube: @Fababum
- LinkedIn: Available on portfolio

HOW TO RESPOND:

1. PRIMARY FOCUS - Questions about Fabian:
   - Answer enthusiastically and professionally about his skills, projects, and experience
   - Highlight his strengths and achievements
   - Provide specific examples when possible

2. GENERAL QUESTIONS (programming, tech, career advice):
   - Answer briefly and helpfully
   - Try to relate the answer back to Fabian's expertise when relevant
   - Example: "That's a great question! [Brief answer]. In fact, Fabian uses [related technology] in his work at Swisscom..."

3. CASUAL/GREETING MESSAGES:
   - Respond naturally and friendly
   - Gently guide the conversation toward learning about Fabian
   - Example: "Hi! I'm happy to chat with you. I'm here to help you learn about Fabian's work. What would you like to know?"

4. OFF-TOPIC or INAPPROPRIATE:
   - For completely unrelated topics: "I'm specifically designed to help with questions about Fabian and his portfolio. However, I can also answer general programming questions! What would you like to know?"
   - For negative/inappropriate questions: "I'm here to help you learn about Fabian's work and skills in a positive way. What aspects of his projects or experience would you like to explore?"

GUIDELINES:
- Keep responses concise (2-4 sentences for general questions, more detail for Fabian-specific questions)
- Be friendly, professional, and enthusiastic
- Always maintain a positive tone about Fabian
- Don't pretend to be Fabian - you're his assistant
- If unsure about Fabian's details, focus on what you know or suggest asking about his documented projects`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
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
      },
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", response.status, errorData);
      const errorMessage =
        response.status === 429
          ? "AI provider rate limit reached. Please try again shortly."
          : "Failed to get response from AI";
      return new Response(
        JSON.stringify({
          error: errorMessage,
          source: "provider",
          providerStatus: response.status,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        },
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
      },
    );
  }
}
