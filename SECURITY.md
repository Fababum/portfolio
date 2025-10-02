# API Security Documentation

## 🛡️ Security Measures Against Unauthorized Access

This portfolio implements multiple security layers to prevent unauthorized API access, including protection against curl requests and other abuse.

## 🔒 Implemented Protections

### 1. Session Token Authentication

**Prevents**: Unauthorized access to admin endpoints, curl abuse
**How it works**:

- Login generates a secure session token (SHA-256 hash)
- Token stored in localStorage and sent with each admin request
- All admin endpoints validate the session token
- Invalid/missing token returns 401 Unauthorized

**Protected Endpoints**:

- `/api/admin/users` - Requires `sessionToken` in query params
- `/api/admin/update-status` - Requires `sessionToken` in request body
- `/api/admin/track-visit` - Origin validation only

**Example blocked request**:

```bash
# Curl without session token
curl -X POST https://your-site.pages.dev/api/admin/update-status \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","status":"whitelisted"}'
# ❌ Returns 401: Authentication required
```

### 2. Origin Validation

**Prevents**: Direct curl requests, unauthorized domains
**How it works**:

- Checks `Origin` and `Referer` headers
- Only allows requests from your approved domains
- Blocks requests without proper headers (like curl)

**Blocked**:

```bash
curl -X POST https://your-site.pages.dev/api/admin/track-visit
# ❌ Returns 403 Unauthorized
```

**Allowed**:

- Requests from your website ✅
- Requests with proper origin headers ✅

### 2. Rate Limiting

**Prevents**: Brute force attacks, API abuse, DDoS attempts

**Limits per endpoint**:

- `/api/admin/login`: 3 attempts per 5 minutes
- `/api/admin/update-status`: 5 requests per minute
- `/api/admin/users`: 10 requests per minute
- `/api/admin/track-visit`: 20 requests per minute

**Blocked after limit**:

```json
{
  "error": "Too many requests. Please try again later.",
  "code": "RATE_LIMIT_EXCEEDED"
}
```

### 3. IP + User Agent Tracking

**Prevents**: Bypassing rate limits with multiple accounts

**How it works**:

- Combines IP address and User-Agent
- Creates unique identifier per client
- Tracks requests per identifier

### 4. CORS Headers

**Prevents**: Cross-site request forgery (CSRF)

**Configuration**:

- Restricts allowed origins
- Validates preflight requests
- Sets secure headers

## 🔧 Configuration

### Set Allowed Origins in Cloudflare

1. Go to **Cloudflare Dashboard** → Your Project
2. Navigate to **Settings** → **Environment Variables**
3. Add variable:
   ```
   Name: ALLOWED_ORIGINS
   Value: localhost,pages.dev,yourdomain.com
   ```

**Important**: Add your actual domain without protocol:

- ✅ `yourdomain.com`
- ✅ `example.pages.dev`
- ❌ `https://yourdomain.com` (remove https://)

### Testing Origin Validation

**Will be blocked:**

```bash
# Direct curl (no origin)
curl -X POST https://your-site.pages.dev/api/admin/track-visit \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","isReturning":false}'
# ❌ 403 Unauthorized Origin
```

**Will work:**

```bash
# With proper origin header
curl -X POST https://your-site.pages.dev/api/admin/track-visit \
  -H "Content-Type: application/json" \
  -H "Origin: https://your-site.pages.dev" \
  -d '{"userId":"test","isReturning":false}'
# ✅ Works (if not rate limited)
```

## 📊 Protected Endpoints

| Endpoint                   | Rate Limit | Origin Check | Auth Required | Notes                     |
| -------------------------- | ---------- | ------------ | ------------- | ------------------------- |
| `/api/admin/login`         | 3/5min     | ❌           | ❌            | Generates session token   |
| `/api/admin/users`         | 10/min     | ✅           | ✅            | Requires sessionToken     |
| `/api/admin/update-status` | 5/min      | ✅           | ✅            | Requires sessionToken     |
| `/api/admin/track-visit`   | 20/min     | ✅           | ❌            | Origin validation only    |
| `/api/admin/check-status`  | 15/min     | ✅           | ❌            | Origin validation only    |
| `/api/chat`                | 10/min     | ❌           | ❌            | Public API (rate limited) |

## 🚨 Response Codes

### 403 Forbidden

```json
{
  "error": "Unauthorized access. This endpoint can only be accessed from the website.",
  "code": "UNAUTHORIZED_ORIGIN"
}
```

**Cause**: Request origin not in allowed list

### 429 Too Many Requests

```json
{
  "error": "Too many requests. Please try again later.",
  "code": "RATE_LIMIT_EXCEEDED"
}
```

**Cause**: Rate limit exceeded
**Retry-After**: Check header for wait time

## 🔐 Additional Security Recommendations

### 1. Add Authentication Headers

For extra security, add custom headers:

```typescript
fetch("/api/admin/users", {
  headers: {
    "X-Request-Token": "your-secret-token",
  },
});
```

### 2. Enable Cloudflare WAF

- Go to Cloudflare Dashboard
- Security → WAF
- Enable rules for your API paths

### 3. Use Cloudflare Access

For admin endpoints, consider:

- Cloudflare Access rules
- IP whitelist
- Zero Trust security

### 4. Monitor Logs

Check Cloudflare Functions logs for:

- Repeated 403 errors (attack attempts)
- 429 errors (abuse patterns)
- Unusual traffic patterns

## 🛠️ Troubleshooting

### "Unauthorized access" error on your own site

**Cause**: Domain not in ALLOWED_ORIGINS
**Solution**:

1. Check `ALLOWED_ORIGINS` environment variable
2. Add your domain (including `.pages.dev`)
3. Redeploy

### Rate limit too strict for testing

**Temporary solution**:

```typescript
// In security.ts, increase limits temporarily
if (RateLimiter.isRateLimited(clientId, {
  maxRequests: 1000, // Higher limit for testing
  windowMs: 60000
}))
```

**Production solution**: Keep strict limits

### Need to test with curl

Add Origin header:

```bash
curl -X POST https://your-site.pages.dev/api/... \
  -H "Origin: https://your-site.pages.dev" \
  -H "Referer: https://your-site.pages.dev/" \
  ...
```

## 📈 Security Best Practices

1. ✅ **Always validate origin** for sensitive endpoints
2. ✅ **Use rate limiting** to prevent abuse
3. ✅ **Monitor logs** for attack patterns
4. ✅ **Keep dependencies updated**
5. ✅ **Use HTTPS only** (enforced by Cloudflare)
6. ✅ **Rotate admin credentials** regularly
7. ✅ **Enable Cloudflare security features**

## 🔍 Detection & Response

**Signs of attack:**

- Multiple 403 errors from same IP
- Rapid 429 errors
- Unusual traffic spikes
- Login attempts with common passwords

**Response:**

1. Check Cloudflare Firewall Events
2. Temporarily block suspicious IPs
3. Increase rate limits if needed
4. Enable additional Cloudflare protection

## 📚 Related Files

- `functions/utils/security.ts` - Core security utilities
- `functions/api/admin/*.ts` - Protected endpoints
- `.env` - Configuration (not committed)

---

**Remember**: Security is layered. These measures significantly reduce attack surface but should be combined with Cloudflare's built-in security features for maximum protection.
