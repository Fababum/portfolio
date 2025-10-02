// Rate Limiting Middleware for Cloudflare Workers
// Prevents abuse and unauthorized API access

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private static limits = new Map<string, RateLimitRecord>();

  /**
   * Check if request should be rate limited
   * Returns true if request should be blocked
   */
  static isRateLimited(
    identifier: string,
    config: RateLimitConfig = { maxRequests: 10, windowMs: 60000 }
  ): boolean {
    const now = Date.now();
    const record = this.limits.get(identifier);

    // Clean up old records periodically
    if (this.limits.size > 10000) {
      this.cleanup();
    }

    if (!record || now > record.resetTime) {
      // Create new record
      this.limits.set(identifier, {
        count: 1,
        resetTime: now + config.windowMs,
      });
      return false;
    }

    if (record.count >= config.maxRequests) {
      return true; // Rate limited
    }

    // Increment count
    record.count++;
    return false;
  }

  /**
   * Clean up expired records
   */
  private static cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.limits.entries()) {
      if (now > record.resetTime) {
        this.limits.delete(key);
      }
    }
  }

  /**
   * Get rate limit response
   */
  static getRateLimitResponse(): Response {
    return new Response(
      JSON.stringify({
        error: "Too many requests. Please try again later.",
        code: "RATE_LIMIT_EXCEEDED",
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
}

/**
 * Validate Origin - Only allow requests from your domain
 */
export function validateOrigin(
  request: Request,
  allowedOrigins: string[]
): boolean {
  const origin = request.headers.get("Origin");
  const referer = request.headers.get("Referer");

  // If no origin/referer, it's likely a direct curl request
  if (!origin && !referer) {
    return false;
  }

  // Check if origin is in allowed list
  if (origin && allowedOrigins.some((allowed) => origin.includes(allowed))) {
    return true;
  }

  // Check referer as fallback
  if (referer && allowedOrigins.some((allowed) => referer.includes(allowed))) {
    return true;
  }

  return false;
}

/**
 * Get client identifier for rate limiting
 */
export function getClientIdentifier(request: Request): string {
  // Use CF-Connecting-IP header (Cloudflare provides this)
  const ip = request.headers.get("CF-Connecting-IP");
  const userAgent = request.headers.get("User-Agent") || "unknown";

  // Combine IP and user agent for identifier
  return `${ip || "no-ip"}_${userAgent.substring(0, 50)}`;
}

/**
 * Create unauthorized response
 */
export function unauthorizedResponse(): Response {
  return new Response(
    JSON.stringify({
      error:
        "Unauthorized access. This endpoint can only be accessed from the website.",
      code: "UNAUTHORIZED_ORIGIN",
    }),
    {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

/**
 * Validate request token (simple anti-CSRF)
 */
export function validateRequestToken(
  request: Request,
  expectedToken?: string
): boolean {
  if (!expectedToken) return true; // Skip if no token configured

  const token = request.headers.get("X-Request-Token");
  return token === expectedToken;
}
