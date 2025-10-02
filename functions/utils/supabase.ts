// Supabase client utility
import { createClient } from "@supabase/supabase-js";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

export function getSupabaseClient(env: Env) {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase URL and Key are required");
  }

  return createClient(url, key);
}
