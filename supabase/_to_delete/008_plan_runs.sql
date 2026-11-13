-- Every call to the plan endpoints (hook, preview, plan, replace, refine, depth, ask, legacy recommend), one row each:
-- what came in (the person's answers, never their words), what the backend did with it (the reading, flags,
-- timings, errors) and what went out (the verses and story chosen). Written by ai/run_log.py, always, with or
-- without a note and with or without AI consent.
--
-- Reconciling with Mixpanel: the phone or browser makes both ids and sends them in the request body (`client`):
--   onboarding_id  one per onboarding; also a Mixpanel super property on every event from that onboarding on
--   request_id     one per backend call; also on the Mixpanel event that reports it (Verses Generated, Plan Built,
--                  Plan Updated, Week Started)
-- distinct_id is Mixpanel's id for the person at the time of the call. The note text stays in raw_notes, joined
-- by request_id.
CREATE TABLE IF NOT EXISTS plan_runs (
    id                    BIGINT       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at            TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    -- who and where
    request_id            TEXT,
    onboarding_id         TEXT,
    distinct_id           TEXT,
    user_id               TEXT,                             -- Supabase uid (app) or Firebase uid (web)
    platform              TEXT,                             -- ios | android | web
    app_version           TEXT,
    context               TEXT,                             -- onboarding | home | new_situation | plan_update | week_start | day
    dev                   BOOLEAN      NOT NULL DEFAULT FALSE,
    country               TEXT,
    endpoint              TEXT         NOT NULL,            -- hook | preview | plan | replace | refine | depth | ask | recommend
    status                TEXT         NOT NULL,            -- ok | error
    http_status           INT,
    error                 TEXT,
    latency_ms            INT,
    -- inputs
    feeling               TEXT,
    emotion               TEXT,                             -- the word they kept on the feeling screen
    emotion_trail         TEXT[]       NOT NULL DEFAULT '{}',  -- every word they tapped there, in order
    age                   TEXT,
    stages                TEXT[]       NOT NULL DEFAULT '{}',
    phone_hours           INT,
    topic                 TEXT,
    follow                TEXT,
    ai_consent            BOOLEAN,
    has_note              BOOLEAN,
    note_withheld         BOOLEAN,                          -- they wrote something but declined AI, so it never left the phone
    note_source           TEXT,
    note_chars            INT,
    week                  INT,
    from_day              INT,
    correction            TEXT,
    hook_id_in            TEXT,                             -- the Day 1 verse the request asked to keep
    exclude_count         INT,
    -- processing
    reading_source        TEXT,                             -- llm | fallback | client | cache | legacy
    note_quality          TEXT,
    risk                  TEXT,
    stance                TEXT,
    mechanism             TEXT,
    confidence            REAL,
    situations            JSONB,
    flags                 TEXT[]       NOT NULL DEFAULT '{}',
    cache_hit             BOOLEAN,
    timings_ms            JSONB,
    library_version       TEXT,
    understanding_version INT,
    -- outputs
    hook_id               TEXT,
    verse_ids             TEXT[]       NOT NULL DEFAULT '{}',
    story_id              TEXT,
    days_count            INT,
    safety_kind           TEXT,
    out_kind              TEXT                              -- ask: answer | redirect | retune | safety
);

CREATE INDEX IF NOT EXISTS idx_plan_runs_created_at    ON plan_runs (created_at);
CREATE INDEX IF NOT EXISTS idx_plan_runs_request_id    ON plan_runs (request_id);
CREATE INDEX IF NOT EXISTS idx_plan_runs_onboarding_id ON plan_runs (onboarding_id, created_at);
CREATE INDEX IF NOT EXISTS idx_plan_runs_distinct_id   ON plan_runs (distinct_id);
CREATE INDEX IF NOT EXISTS idx_plan_runs_endpoint      ON plan_runs (endpoint, created_at);

ALTER TABLE plan_runs ENABLE ROW LEVEL SECURITY;      -- service role only, like raw_notes

-- raw_notes rows join their run and the person.
ALTER TABLE raw_notes ADD COLUMN IF NOT EXISTS request_id    TEXT;
ALTER TABLE raw_notes ADD COLUMN IF NOT EXISTS onboarding_id TEXT;
ALTER TABLE raw_notes ADD COLUMN IF NOT EXISTS distinct_id   TEXT;
ALTER TABLE raw_notes ADD COLUMN IF NOT EXISTS user_id       TEXT;
ALTER TABLE raw_notes ADD COLUMN IF NOT EXISTS platform      TEXT;
ALTER TABLE raw_notes ADD COLUMN IF NOT EXISTS country       TEXT;
ALTER TABLE raw_notes ADD COLUMN IF NOT EXISTS emotion       TEXT;
ALTER TABLE raw_notes ADD COLUMN IF NOT EXISTS dev           BOOLEAN NOT NULL DEFAULT FALSE;
CREATE INDEX IF NOT EXISTS idx_raw_notes_request_id    ON raw_notes (request_id);
CREATE INDEX IF NOT EXISTS idx_raw_notes_onboarding_id ON raw_notes (onboarding_id);

-- One row per onboarding: the answers from its first hook call, and how far the backend got.
CREATE OR REPLACE VIEW onboarding_runs
WITH (security_invoker = true) AS
SELECT
    r.onboarding_id,
    MIN(r.created_at)                                                          AS first_call_at,
    MAX(r.created_at)                                                          AS last_call_at,
    (ARRAY_AGG(r.platform      ORDER BY r.created_at))[1]                      AS platform,
    (ARRAY_AGG(r.country       ORDER BY r.created_at))[1]                      AS country,
    (ARRAY_AGG(r.distinct_id   ORDER BY r.created_at DESC))[1]                 AS distinct_id,
    (ARRAY_AGG(r.user_id       ORDER BY r.created_at DESC) FILTER (WHERE r.user_id IS NOT NULL))[1] AS user_id,
    BOOL_OR(r.dev)                                                             AS dev,
    (ARRAY_AGG(r.age           ORDER BY r.created_at) FILTER (WHERE r.endpoint = 'hook'))[1] AS age,
    (ARRAY_AGG(r.stages        ORDER BY r.created_at) FILTER (WHERE r.endpoint = 'hook'))[1] AS stages,
    (ARRAY_AGG(r.feeling       ORDER BY r.created_at) FILTER (WHERE r.endpoint = 'hook'))[1] AS feeling,
    (ARRAY_AGG(r.emotion       ORDER BY r.created_at) FILTER (WHERE r.endpoint = 'hook'))[1] AS emotion,
    (ARRAY_AGG(r.emotion_trail ORDER BY r.created_at) FILTER (WHERE r.endpoint = 'hook'))[1] AS emotion_trail,
    (ARRAY_AGG(r.ai_consent    ORDER BY r.created_at) FILTER (WHERE r.endpoint = 'hook'))[1] AS ai_consent,
    BOOL_OR(r.has_note)       FILTER (WHERE r.endpoint = 'hook')              AS wrote_note,
    BOOL_OR(r.note_withheld)  FILTER (WHERE r.endpoint = 'hook')              AS note_withheld,
    (ARRAY_AGG(r.reading_source ORDER BY r.created_at) FILTER (WHERE r.endpoint = 'hook' AND r.status = 'ok'))[1] AS reading_source,
    (ARRAY_AGG(r.hook_id       ORDER BY r.created_at DESC) FILTER (WHERE r.endpoint = 'hook' AND r.status = 'ok'))[1] AS hook_id,
    COUNT(*) FILTER (WHERE r.endpoint = 'hook')                               AS hook_calls,
    COUNT(*) FILTER (WHERE r.endpoint = 'hook' AND r.status = 'ok' AND r.hook_id IS NOT NULL) AS hook_ok,
    COUNT(*) FILTER (WHERE r.endpoint = 'preview' AND r.status = 'ok')        AS preview_ok,
    COUNT(*) FILTER (WHERE r.endpoint = 'plan' AND r.status = 'ok' AND COALESCE(r.days_count, 0) > 0) AS plan_ok,
    COUNT(*) FILTER (WHERE r.status = 'error')                                AS errors,
    COUNT(*)                                                                   AS calls
FROM plan_runs r
WHERE r.onboarding_id IS NOT NULL
GROUP BY r.onboarding_id;
