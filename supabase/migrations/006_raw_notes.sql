-- The person's own words (onboarding note, "Update my plan" words) as the app sent them, with the
-- reading they got and the verses chosen for them (ai/note_store.py). For studying and evaluating
-- verse selection against real inputs.
-- Only stored when the person allowed AI (ai: true); with ai: false the note never reaches the server's logic.
CREATE TABLE IF NOT EXISTS raw_notes (
    id              BIGINT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    endpoint        TEXT         NOT NULL,            -- hook | preview | plan | refine | recommend
    note            TEXT         NOT NULL,            -- raw, exactly as received
    note_source     TEXT,                             -- voice | text
    feeling         TEXT,
    age             TEXT,
    stages          TEXT[]       NOT NULL DEFAULT '{}',
    phone_hours     INT,
    topic           TEXT,
    follow          TEXT,
    week            INT,
    from_day        INT,
    correction      TEXT,
    reading_source  TEXT,                             -- llm | fallback | client | cache
    note_quality    TEXT,
    risk            TEXT,
    stance          TEXT,
    mechanism       TEXT,
    situations      JSONB,
    verse_ids       TEXT[]       NOT NULL DEFAULT '{}', -- verses and stories chosen, in response order
    library_version TEXT
);

CREATE INDEX IF NOT EXISTS idx_raw_notes_created_at ON raw_notes (created_at);
CREATE INDEX IF NOT EXISTS idx_raw_notes_endpoint   ON raw_notes (endpoint, created_at);

-- Service role only (it bypasses RLS); no policies, so anon and authenticated see nothing.
ALTER TABLE raw_notes ENABLE ROW LEVEL SECURITY;
