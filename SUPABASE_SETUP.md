# Supabase Setup Guide for Portfolio Admin Dashboard

## Step 1: Create a Supabase Account
1. Go to https://supabase.com
2. Sign up for a free account
3. Create a new project (choose a region close to you)

## Step 2: Run the SQL Schema
1. In your Supabase project, go to the **SQL Editor**
2. Open the file `database/schema.sql` from this project
3. Copy the entire SQL content
4. Paste it into the Supabase SQL Editor
5. Click **Run** to create the tables

## Step 3: Get Your Supabase Credentials
1. In Supabase, go to **Project Settings** → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## Step 4: Configure Cloudflare Environment Variables
1. Go to your Cloudflare Dashboard
2. Navigate to **Workers & Pages** → Your portfolio project
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:
   - **Name:** `SUPABASE_URL`  
     **Value:** Your Project URL from Step 3
   - **Name:** `SUPABASE_ANON_KEY`  
     **Value:** Your Anon Key from Step 3

## Step 5: Deploy Your Changes
1. Push your updated code to GitHub:
   ```bash
   git add .
   git commit -m "Switch to Supabase database"
   git push
   ```
2. Cloudflare will automatically redeploy your site

## Step 6: Test the Admin Dashboard
1. Visit your site at `https://yourdomain.pages.dev`
2. Navigate to `/admin`
3. Login with password: `FabianAdmin2025`
4. You should see the admin dashboard with user tracking

## What's Better with Supabase?
✅ **No KV Namespace setup needed** - Just SQL tables  
✅ **Better querying** - SQL is more powerful than key-value storage  
✅ **Built-in dashboard** - View and manage data directly in Supabase  
✅ **Real-time features** - Supabase supports realtime subscriptions  
✅ **Free tier** - Up to 500MB database + 2GB bandwidth per month  
✅ **Automatic backups** - Database is backed up daily  

## Database Structure
Your database now has two tables:

### `users` Table
- `user_id`: Unique identifier from cookie
- `visit_count`: Number of visits
- `first_visit`: Timestamp of first visit
- `last_visit`: Timestamp of last visit
- `status`: active/blacklisted/whitelisted

### `visits` Table
- `user_id`: Which user visited
- `timestamp`: When they visited
- `is_returning`: New or returning visitor
- `ip_address`: Their IP address

## Optional: View Data in Supabase
1. Go to **Table Editor** in Supabase
2. Select `users` or `visits` table
3. View, edit, or delete records directly
4. Export data to CSV if needed

## Troubleshooting
- **"Supabase URL and Key are required"**: Check environment variables in Cloudflare
- **CORS errors**: Make sure you're using the public anon key, not the service role key
- **No data showing**: Check browser console for errors, ensure SQL schema was run
