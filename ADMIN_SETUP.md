# Admin Authentication Setup Guide

## Overview

Your admin dashboard now uses **secure database authentication** with:

- Passwords stored in Supabase (hashed with SHA-256)
- Setup key stored in database (hashed)
- No passwords or keys visible in the code!

## 🚀 Setup Steps

### 1. Create the Admin Tables in Supabase

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Open the file `database/admin_auth.sql` from this project
4. Copy and paste the SQL into the Supabase SQL Editor
5. Click **Run** to create the `admin_users` and `setup_config` tables

**Note**: The default setup key is `Sigma1234` (hashed in the database)

### 2. (Optional) Change the Setup Key

If you want to use a different setup key:

1. Visit: `https://your-domain.pages.dev/generate-setup-key.html`
2. Enter your desired setup key
3. Click "Generate Hash"
4. Copy the SQL query and run it in Supabase SQL Editor

### 3. Create Your First Admin Account

**Option A: Using the Web Interface (Recommended)**

1. After deploying, visit: `https://your-domain.pages.dev/admin-setup.html`
2. Fill in the form:
   - **Username**: Choose your admin username (e.g., `admin`)
   - **Password**: Choose a strong password (at least 8 characters)
   - **Setup Key**: Enter `Sigma1234` (or your custom key)
3. Click "Create Admin Account"
4. Once created, you can login at `/admin` with your credentials

**Option B: Using curl**

```bash
curl -X POST https://your-domain.pages.dev/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "YourStrongPassword123",
    "setupKey": "Sigma1234"
  }'
```

### 4. Login to Admin Dashboard

1. Visit: `https://your-domain.pages.dev/admin`
2. Enter your username and password
3. Your session will be saved in the browser, so you stay logged in even after refreshing!

## 🔒 Security Features

✅ **Password Hashing**: Passwords are hashed with SHA-256 before storage  
✅ **Setup Key in Database**: Setup key is hashed and stored in database
✅ **One-Time Setup**: Setup automatically locks after first admin is created
✅ **No Hardcoded Secrets**: All credentials stored securely in database  
✅ **Session Tokens**: Secure session management with localStorage  
✅ **Setup Protection**: Setup endpoint requires a secret key  
✅ **Database Security**: Row Level Security (RLS) enabled on Supabase

## 📝 Important Notes

### Setup Key

The setup key `FabianSetup2025` is currently hardcoded in `functions/api/admin/setup.ts`.

**For production, you should:**

1. Add it as a Cloudflare environment variable
2. Disable the setup endpoint after creating your account
3. Or delete the `functions/api/admin/setup.ts` file entirely

### How to Add Environment Variable:

1. Go to Cloudflare Dashboard → Your project
2. Navigate to **Settings** → **Environment Variables**
3. Add: `ADMIN_SETUP_KEY` = `YourSecretSetupKey`
4. Update `functions/api/admin/setup.ts` to use: `context.env.ADMIN_SETUP_KEY`

## 🗄️ Database Schema

The `admin_users` table contains:

- `id` - Auto-incrementing primary key
- `username` - Unique username
- `password_hash` - SHA-256 hashed password
- `created_at` - Account creation timestamp
- `last_login` - Last login timestamp
- `is_active` - Account status (true/false)

## 🛠️ API Endpoints

### POST `/api/admin/setup`

Create the first admin account

```json
{
  "username": "admin",
  "password": "YourPassword",
  "setupKey": "FabianSetup2025"
}
```

### POST `/api/admin/login`

Login with credentials

```json
{
  "username": "admin",
  "password": "YourPassword"
}
```

Returns:

```json
{
  "success": true,
  "username": "admin",
  "sessionToken": "abc123...",
  "lastLogin": "2025-10-02T12:00:00Z"
}
```

## 🔧 Troubleshooting

### "Invalid username or password"

- Double-check your credentials
- Make sure you ran the SQL setup in Supabase
- Verify the admin user was created successfully

### "Setup failed"

- Check that Supabase URL and keys are set in Cloudflare environment variables
- Verify the setup key is correct
- Check Cloudflare Functions logs for errors

### Still logged out after refresh

- Clear your browser's localStorage and try again
- Check browser console for errors
- Verify the login API is returning a sessionToken

## 📚 Files Modified

- `database/admin_auth.sql` - Database schema for admin users
- `functions/api/admin/login.ts` - Login API endpoint
- `functions/api/admin/setup.ts` - One-time setup endpoint
- `src/components/admin/admin.tsx` - Updated to use database auth
- `src/components/admin/admin.css` - Added error styling
- `public/admin-setup.html` - Web interface for setup

## 🎯 Next Steps

1. ✅ Run the SQL in Supabase
2. ✅ Create your admin account via `/admin-setup.html`
3. ✅ Login at `/admin`
4. ✅ Delete or disable the setup endpoint for security
5. ✅ Consider adding more security features (2FA, rate limiting, etc.)

---

**Need help?** Check the Cloudflare Functions logs or Supabase logs for error messages.
