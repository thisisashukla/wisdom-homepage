-- ── Verse of the Day ─────────────────────────────────────────────────────────
-- Stores the daily curated Gita verse selected by the backend cron.
-- One row per calendar date (unique on date).
-- The backend writes via service_role; the frontend reads via anon.

CREATE TABLE IF NOT EXISTS verse_of_day (
    id          BIGSERIAL    PRIMARY KEY,
    date        DATE         NOT NULL UNIQUE,
    chapter     INT          NOT NULL,
    verse       INT          NOT NULL,
    -- UID format used in the verse index: "bhagwad_gita:18.66"
    verse_uid   TEXT         NOT NULL,
    -- Day-of-week context
    day_of_week TEXT         NOT NULL,  -- e.g. "Tuesday"
    deity       TEXT         NOT NULL,  -- e.g. "Mangal (Mars)"
    day_name_hi TEXT         NOT NULL,  -- e.g. "Mangalvar"
    -- AI-generated context strings
    date_context TEXT        NOT NULL,  -- why today is special
    why_chosen   TEXT        NOT NULL,  -- why this verse fits today
    story        TEXT        NOT NULL,  -- backstory of the verse
    -- Selection metadata
    themes      TEXT[]       NOT NULL DEFAULT '{}',
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_verse_of_day_date
    ON verse_of_day (date DESC);

-- Row-Level Security
ALTER TABLE verse_of_day ENABLE ROW LEVEL SECURITY;

-- Anyone (anon or authenticated) can read — the page is public.
CREATE POLICY "Public can read verse_of_day"
    ON verse_of_day
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Only the service role (backend cron) can insert / update.
CREATE POLICY "Service role full access"
    ON verse_of_day
    FOR ALL
    TO service_role
    USING (true);
