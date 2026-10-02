-- Snapshot each practice so a replacement reflection cannot rewrite its outcome.
CREATE TABLE IF NOT EXISTS reflection_practice_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reflection_id UUID NOT NULL REFERENCES daily_reflections(id) ON DELETE CASCADE,
  practice_key TEXT NOT NULL CHECK (length(practice_key) = 64),
  practice TEXT NOT NULL CHECK (length(practice) BETWEEN 1 AND 400),
  reflection_date DATE NOT NULL,
  outcome TEXT NOT NULL CHECK (outcome IN ('helped', 'did_not_help', 'not_tried')),
  note TEXT NOT NULL DEFAULT '' CHECK (length(note) <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (reflection_id, practice_key)
);
CREATE INDEX IF NOT EXISTS practice_feedback_user_date_idx
  ON reflection_practice_feedback(user_id, reflection_date DESC);
ALTER TABLE reflection_practice_feedback ENABLE ROW LEVEL SECURITY;
-- Only the API may write after checking ownership, date and practice revision.
CREATE POLICY practice_feedback_read_own ON reflection_practice_feedback
  FOR SELECT USING (auth.uid() = user_id);
REVOKE ALL ON reflection_practice_feedback FROM anon, authenticated;
GRANT SELECT ON reflection_practice_feedback TO authenticated;
GRANT ALL ON reflection_practice_feedback TO service_role;
