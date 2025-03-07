-- Add summary column to cvs table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cvs' AND column_name = 'summary') THEN
    ALTER TABLE cvs ADD COLUMN summary TEXT;
  END IF;
END $$;
