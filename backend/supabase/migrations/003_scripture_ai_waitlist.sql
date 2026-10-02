-- ── Scripture AI Waitlist ──────────────────────────────────────────────────
-- Stores waitlist sign-ups for the upcoming Ask Scripture AI feature.
-- Captures email, the user's query-type interests, and acquisition source.
-- One row per unique email (upsert on conflict updates interests + updated_at).

CREATE TABLE IF NOT EXISTS scripture_ai_waitlist (
    id           BIGSERIAL    PRIMARY KEY,
    email        TEXT         NOT NULL UNIQUE,
    interests    TEXT[]       NOT NULL DEFAULT '{}',  -- e.g. ['verse','guidance','topic']
    source       TEXT         NOT NULL DEFAULT 'unknown',  -- mp_location of the join trigger
    ua           TEXT,        -- user-agent for dedup/bot detection
    ref          TEXT,        -- HTTP referer
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sai_waitlist_created
    ON scripture_ai_waitlist (created_at DESC);

-- Row-Level Security
ALTER TABLE scripture_ai_waitlist ENABLE ROW LEVEL SECURITY;

-- Only service role (backend) can read/write — emails are PII.
CREATE POLICY "Service role full access on scripture_ai_waitlist"
    ON scripture_ai_waitlist
    FOR ALL
    TO service_role
    USING (true);

-- Upsert helper: on duplicate email, update interests and timestamp.
-- Usage: INSERT INTO scripture_ai_waitlist (...) VALUES (...) ON CONFLICT (email) DO UPDATE ...
-- (handled in application layer, but documented here for reference)
