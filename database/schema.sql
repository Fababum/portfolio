-- Supabase SQL Schema for Portfolio Admin Dashboard
-- Run this in your Supabase SQL Editor

-- Create users table to track visitor information
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  visit_count INTEGER DEFAULT 1,
  first_visit TIMESTAMPTZ DEFAULT NOW(),
  last_visit TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'blacklisted', 'whitelisted')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create visits table to track each individual visit
CREATE TABLE IF NOT EXISTS visits (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  is_returning BOOLEAN DEFAULT FALSE,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_user_id ON users(user_id);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_last_visit ON users(last_visit DESC);
CREATE INDEX IF NOT EXISTS idx_visits_user_id ON visits(user_id);
CREATE INDEX IF NOT EXISTS idx_visits_timestamp ON visits(timestamp DESC);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- Create policies for API access (you can make these more restrictive)
-- For now, allowing all operations (you should add authentication later)
CREATE POLICY "Allow all operations on users" ON users
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on visits" ON visits
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Optional: Create a view for user statistics
CREATE OR REPLACE VIEW user_stats AS
SELECT 
  u.user_id,
  u.visit_count,
  u.first_visit,
  u.last_visit,
  u.status,
  COUNT(v.id) as total_visits,
  MAX(v.timestamp) as latest_visit
FROM users u
LEFT JOIN visits v ON u.user_id = v.user_id
GROUP BY u.user_id, u.visit_count, u.first_visit, u.last_visit, u.status
ORDER BY u.last_visit DESC;

-- Grant access to the view
GRANT SELECT ON user_stats TO anon, authenticated;
