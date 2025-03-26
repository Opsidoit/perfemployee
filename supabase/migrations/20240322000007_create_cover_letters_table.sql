-- Create cover_letters table if it doesn't exist
CREATE TABLE IF NOT EXISTS cover_letters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT,
  company TEXT,
  position TEXT,
  recipient TEXT,
  key_skills TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE cover_letters ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own cover letters" ON cover_letters;
CREATE POLICY "Users can view their own cover letters"
  ON cover_letters FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own cover letters" ON cover_letters;
CREATE POLICY "Users can insert their own cover letters"
  ON cover_letters FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own cover letters" ON cover_letters;
CREATE POLICY "Users can update their own cover letters"
  ON cover_letters FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own cover letters" ON cover_letters;
CREATE POLICY "Users can delete their own cover letters"
  ON cover_letters FOR DELETE
  USING (auth.uid() = user_id);

-- Enable realtime
alter publication supabase_realtime add table cover_letters;