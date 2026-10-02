-- Shared Wisdom backend: mobile daily reflections
-- Applies after 002_verses.sql and reuses its canonical `verses` corpus.

CREATE TABLE IF NOT EXISTS reflection_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  first_cycle_started_on DATE,
  save_voice_entries BOOL NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_entitlements (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_pro BOOL NOT NULL DEFAULT FALSE,
  product_id TEXT,
  expires_at TIMESTAMPTZ,
  source TEXT NOT NULL DEFAULT 'revenuecat',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reflection_cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  starts_on DATE NOT NULL,
  ends_on DATE NOT NULL,
  timezone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'qualified', 'completed')),
  completed_days INT NOT NULL DEFAULT 0 CHECK (completed_days BETWEEN 0 AND 7),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, starts_on)
);

CREATE UNIQUE INDEX IF NOT EXISTS one_active_reflection_cycle_per_user
  ON reflection_cycles(user_id) WHERE status IN ('active', 'qualified');

CREATE TABLE IF NOT EXISTS daily_reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cycle_id UUID NOT NULL REFERENCES reflection_cycles(id) ON DELETE CASCADE,
  local_date DATE NOT NULL,
  client_request_id TEXT NOT NULL,
  input_mode TEXT NOT NULL DEFAULT 'voice'
    CHECK (input_mode IN ('voice', 'text', 'chip')),
  status TEXT NOT NULL DEFAULT 'created'
    CHECK (status IN ('created', 'transcribing', 'processing', 'ready', 'failed')),
  transcript TEXT,
  private_summary TEXT,
  theme TEXT,
  analysis JSONB NOT NULL DEFAULT '{}'::JSONB,
  verse_uid TEXT REFERENCES verses(uid),
  mirror TEXT,
  meaning TEXT,
  practice TEXT,
  discussion_teaser TEXT,
  helpfulness TEXT CHECK (helpfulness IN ('helped', 'not_quite')),
  correction_reason TEXT,
  tts_status TEXT NOT NULL DEFAULT 'not_requested'
    CHECK (tts_status IN ('not_requested', 'processing', 'ready', 'failed')),
  prompt_version TEXT NOT NULL DEFAULT 'reflection-v2',
  retrieval_version TEXT NOT NULL DEFAULT 'shared-bge-m3-v1',
  model_version TEXT,
  error_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, local_date),
  UNIQUE(user_id, client_request_id)
);

CREATE INDEX IF NOT EXISTS daily_reflections_cycle_idx
  ON daily_reflections(cycle_id, local_date);
CREATE INDEX IF NOT EXISTS daily_reflections_user_created_idx
  ON daily_reflections(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS reflection_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reflection_id UUID NOT NULL UNIQUE REFERENCES daily_reflections(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'completed', 'closed')),
  turn_count INT NOT NULL DEFAULT 0 CHECK (turn_count BETWEEN 0 AND 3),
  final_summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS reflection_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES reflection_threads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  question TEXT,
  turn_index INT NOT NULL CHECK (turn_index BETWEEN 0 AND 3),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS reflection_messages_thread_idx
  ON reflection_messages(thread_id, created_at);

CREATE TABLE IF NOT EXISTS weekly_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cycle_id UUID NOT NULL UNIQUE REFERENCES reflection_cycles(id) ON DELETE CASCADE,
  week_sentence TEXT NOT NULL,
  recurring_pattern TEXT NOT NULL,
  verse_uid TEXT REFERENCES verses(uid),
  next_week_practice TEXT NOT NULL,
  evidence_reflection_ids UUID[] NOT NULL DEFAULT '{}',
  prompt_version TEXT NOT NULL DEFAULT 'weekly-v2',
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  viewed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS user_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pattern_key TEXT NOT NULL,
  summary TEXT NOT NULL,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  evidence_count INT NOT NULL DEFAULT 1,
  confidence FLOAT NOT NULL DEFAULT 0.5 CHECK (confidence BETWEEN 0 AND 1),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'dismissed')),
  UNIQUE(user_id, pattern_key)
);

ALTER TABLE reflection_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflection_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflection_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflection_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY reflection_profiles_own ON reflection_profiles
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY user_entitlements_read_own ON user_entitlements
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY reflection_cycles_own ON reflection_cycles
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY daily_reflections_own ON daily_reflections
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY reflection_threads_own ON reflection_threads
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY reflection_messages_own ON reflection_messages
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY weekly_insights_own ON weekly_insights
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY user_memories_own ON user_memories
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
