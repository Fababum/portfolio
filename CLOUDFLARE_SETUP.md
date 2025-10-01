# Cloudflare Setup Instructions

## Setting up the GEMINI_API_KEY in Cloudflare

To keep your API key secure, you need to add it as an environment variable in Cloudflare Pages:

1. Go to your Cloudflare dashboard
2. Navigate to **Pages** > Select your project
3. Go to **Settings** > **Environment variables**
4. Add a new variable:
   - **Variable name:** `GEMINI_API_KEY`
   - **Value:** Your Gemini API key (AIzaSyDwE26vDiGDeczdU6pukOQBrml7pI1Lhm8)
   - **Environment:** Production (and Preview if needed)
5. Save the changes
6. Redeploy your site for the changes to take effect

## How it works

- The frontend calls `/api/chat` endpoint
- Cloudflare Pages Function (`functions/api/chat.ts`) handles the request
- The function uses the `GEMINI_API_KEY` from Cloudflare's secure environment
- Your API key is never exposed to the client-side code

## Important

- Never commit `.env` files with API keys to Git
- The API key is now stored securely in Cloudflare's environment variables
- The `.gitignore` file has been updated to exclude `.env` files
