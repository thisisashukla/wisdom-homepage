-- Onboarding /recommend/hook answers, keyed by a hash of the request (ai/hook_cache.py).
-- The same answers on the same screen give the same reading and the same Day 1 verse,
-- across Vercel instances. Only the hash of the note is kept, never the note itself.
-- Rows older than settings.hook_cache_ttl_days are ignored on read and pruned on write.
CREATE TABLE IF NOT EXISTS hook_cache (
    key             TEXT         PRIMARY KEY,
    response        JSONB        NOT NULL,
    library_version TEXT,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hook_cache_created_at ON hook_cache (created_at);

-- Service role only (it bypasses RLS); no policies, so anon and authenticated see nothing.
ALTER TABLE hook_cache ENABLE ROW LEVEL SECURITY;
