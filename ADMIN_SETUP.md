# Admin Authentication Setup Guide

## Overview

Your admin dashboard uses **secure database authentication** with passwords stored in Supabase (hashed with SHA-256).

## 🚀 Simple Setup (3 Steps)

### Step 1: Run SQL in Supabase

1. Go to your **Supabase dashboard**
2. Click **SQL Editor**
3. Copy ALL the content from `database/schema.sql`
4. Paste it in the SQL Editor
5. Click **Run**

✅ Done! This creates all tables AND your admin account.

### Step 2: Login

1. Go to: `https://your-domain.pages.dev/admin`
2. Login with the credentials you set in the SQL

### Step 3: Security Notes

**IMPORTANT**: Before pushing to GitHub:

- Make sure you've changed the default credentials in `database/schema.sql`
- Never commit actual passwords or password hashes to a public repository
- The SQL file should have placeholder values like `YOUR_USERNAME_HERE` and `YOUR_PASSWORD_HASH_HERE`## � Security Features

✅ **Password Hashing**: SHA-256 hashed passwords
✅ **Session Management**: Stays logged in after refresh
✅ **Database Security**: Row Level Security enabled
✅ **No Hardcoded Passwords**: Everything in database

## 🔧 Troubleshooting

### "Invalid username or password"

- Make sure you ran the SQL in Supabase with your credentials
- Check that the SQL completed without errors
- Verify you're using the username and password you set in the SQL

### Still logged out after refresh

- Clear browser cache and try again
- Check browser console for errors (F12)

### Can't login at all

- Go to Supabase → Table Editor → admin_users
- Verify the admin user exists
- Check `is_active` is set to `true`

## 📚 What the SQL does:

- Creates `users` table (visitor tracking)
- Creates `visits` table (visit history)
- Creates `admin_users` table (admin login)
- Prompts you to add your own admin credentials
- Sets up all indexes and security policies

---

**That's it!** After running the SQL with your credentials, login at `/admin`.
