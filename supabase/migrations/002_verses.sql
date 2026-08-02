-- ── Verses index (pgvector) + audio storage ──────────────────────────────────
-- Ships the retrieval corpus into Supabase so /search can drop the in-memory
-- numpy index and query pgvector directly. Also adds an audio_url column so
-- the backend can serve pre-generated Sanskrit recitation and lazily fill
-- in missing verses via /api/v1/audio/generate.
--
-- Assumes pgvector is enabled in the project (Supabase → Database → Extensions).

CREATE EXTENSION IF NOT EXISTS vector;

-- ── verses ──────────────────────────────────────────────────────────────────
-- One row per verse in the retrieval corpus. `embedding` is the BGE-M3
-- enriched-doc vector (1024 dims, L2-normalised — cosine == 1 - inner product).
-- `audio_url` is nullable: populated when vagdhenu has produced audio for
-- this verse. `audio_timestamps` is optional word-level karaoke data.

CREATE TABLE IF NOT EXISTS verses (
    id                  BIGSERIAL       PRIMARY KEY,

    -- Retrieval identity
    uid                 TEXT            NOT NULL UNIQUE,   -- "bhagwad_gita:18.66"
    scripture           TEXT            NOT NULL,          -- "bhagwad_gita"
    verse_id            TEXT            NOT NULL DEFAULT '', -- "18.66"
    ord                 INT             NOT NULL DEFAULT 0, -- from source `order`

    -- Verse content
    verse_sanskrit      TEXT            NOT NULL DEFAULT '',
    verse_hindi         TEXT            NOT NULL DEFAULT '',
    english_translation TEXT            NOT NULL DEFAULT '',
    essence             TEXT            NOT NULL DEFAULT '',
    simple_meaning      TEXT            NOT NULL DEFAULT '',
    insight             TEXT            NOT NULL DEFAULT '',
    modern_relevance    TEXT            NOT NULL DEFAULT '',
    speaker             TEXT            NOT NULL DEFAULT '',
    tags                TEXT[]          NOT NULL DEFAULT '{}',

    -- Prosody (used by vagdhenu when generating audio; defaults to anushtubh
    -- for the Gita where most verses are anushtubh-meter).
    meter               TEXT            NOT NULL DEFAULT 'anushtubh',

    -- Retrieval vector
    embedding           vector(1024)    NOT NULL,

    -- Audio (nullable — filled on-demand by /api/v1/audio/generate)
    audio_url           TEXT            NULL,
    audio_timestamps    JSONB           NULL,    -- [{word, start, end}, ...] if karaoke available
    audio_generated_at  TIMESTAMPTZ     NULL,

    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- ── Indexes ──────────────────────────────────────────────────────────────────
-- IVFFlat approximate NN over cosine. `lists` should scale with sqrt(N):
-- for ~18k rows, 130 is a reasonable choice. Rebuild with more lists after
-- the corpus grows meaningfully (2× growth → double the lists).

CREATE INDEX IF NOT EXISTS idx_verses_embedding
    ON verses USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 130);

CREATE INDEX IF NOT EXISTS idx_verses_scripture ON verses (scripture);
CREATE INDEX IF NOT EXISTS idx_verses_ord       ON verses (scripture, ord);
CREATE INDEX IF NOT EXISTS idx_verses_uid       ON verses (uid);
-- Partial index for "does this verse have audio yet?" queries (cheap because
-- most rows will still be NULL on day 1).
CREATE INDEX IF NOT EXISTS idx_verses_audio_missing
    ON verses (uid) WHERE audio_url IS NULL;

-- Auto-bump updated_at on any change (audio_url flip, meter fix, etc.).
CREATE OR REPLACE FUNCTION verses_set_updated_at()
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_verses_updated_at ON verses;
CREATE TRIGGER trg_verses_updated_at
    BEFORE UPDATE ON verses
    FOR EACH ROW
    EXECUTE FUNCTION verses_set_updated_at();

-- ── Similarity search RPC ────────────────────────────────────────────────────
-- supabase-py cannot express pgvector's `<=>` operator in a normal PostgREST
-- query, so retrieval goes through a SECURITY DEFINER RPC. The RPC:
--   - accepts a 1024-dim query embedding
--   - optionally filters by scripture (empty array = no filter)
--   - returns the top `match_count` rows with cosine similarity in [0, 1]
--     (cosine similarity = 1 - cosine distance, and pgvector's <=> returns
--     the distance)
--
-- Score is normalised so the FastAPI backend keeps the same [0, 1] contract
-- the numpy index used.

CREATE OR REPLACE FUNCTION match_verses(
    query_embedding vector(1024),
    match_count     INT DEFAULT 40,
    filter_scriptures TEXT[] DEFAULT NULL
)
    RETURNS TABLE (
        uid                 TEXT,
        scripture           TEXT,
        verse_id            TEXT,
        ord                 INT,
        verse_sanskrit      TEXT,
        verse_hindi         TEXT,
        english_translation TEXT,
        essence             TEXT,
        simple_meaning      TEXT,
        insight             TEXT,
        modern_relevance    TEXT,
        speaker             TEXT,
        tags                TEXT[],
        meter               TEXT,
        audio_url           TEXT,
        audio_timestamps    JSONB,
        similarity          FLOAT4
    )
    LANGUAGE plpgsql
    STABLE
AS $$
BEGIN
    RETURN QUERY
    SELECT
        v.uid, v.scripture, v.verse_id, v.ord,
        v.verse_sanskrit, v.verse_hindi, v.english_translation,
        v.essence, v.simple_meaning, v.insight, v.modern_relevance,
        v.speaker, v.tags, v.meter,
        v.audio_url, v.audio_timestamps,
        (1 - (v.embedding <=> query_embedding))::float4 AS similarity
    FROM verses v
    WHERE
        filter_scriptures IS NULL
        OR array_length(filter_scriptures, 1) IS NULL
        OR v.scripture = ANY(filter_scriptures)
    ORDER BY v.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- ── Direct-lookup helper for verse-ref fast-path ─────────────────────────────
-- The backend's regex fast-path already hits the DB via a normal SELECT, but
-- exposing this as an RPC keeps the "search" access pattern consistent and
-- avoids two different code paths client-side.

CREATE OR REPLACE FUNCTION get_verse_by_uid(target_uid TEXT)
    RETURNS TABLE (
        uid                 TEXT,
        scripture           TEXT,
        verse_id            TEXT,
        ord                 INT,
        verse_sanskrit      TEXT,
        verse_hindi         TEXT,
        english_translation TEXT,
        essence             TEXT,
        simple_meaning      TEXT,
        insight             TEXT,
        modern_relevance    TEXT,
        speaker             TEXT,
        tags                TEXT[],
        meter               TEXT,
        audio_url           TEXT,
        audio_timestamps    JSONB
    )
    LANGUAGE sql
    STABLE
AS $$
    SELECT
        v.uid, v.scripture, v.verse_id, v.ord,
        v.verse_sanskrit, v.verse_hindi, v.english_translation,
        v.essence, v.simple_meaning, v.insight, v.modern_relevance,
        v.speaker, v.tags, v.meter,
        v.audio_url, v.audio_timestamps
    FROM verses v
    WHERE v.uid = target_uid;
$$;

-- ── Row-Level Security ───────────────────────────────────────────────────────
-- Public reads (the /search endpoint is unauthenticated and returns verse
-- content directly). Only service_role can write.

ALTER TABLE verses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read verses"
    ON verses
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Service role full access on verses"
    ON verses
    FOR ALL
    TO service_role
    USING (true);

-- The RPCs run as SECURITY INVOKER by default (respect the caller's RLS),
-- and match_verses only reads — that's fine under the SELECT policy above.

-- ── Storage bucket for generated audio ───────────────────────────────────────
-- Public bucket so <audio src=...> works without signed URLs. Content type is
-- audio/wav (vagdhenu emits WAV). We reuse the existing `wisdom-homepage`
-- bucket used by the Gita audio player — no new bucket creation needed if
-- that bucket already exists. Uncomment the INSERT below to create it in a
-- fresh Supabase project.

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('wisdom-homepage', 'wisdom-homepage', true)
-- ON CONFLICT (id) DO NOTHING;

-- Storage policies: anyone can read; only service_role writes.
-- (These are the standard defaults for a public bucket; only add them if
-- your project has custom storage RLS turned on.)

-- CREATE POLICY "Public can read generated audio"
--     ON storage.objects
--     FOR SELECT TO anon, authenticated
--     USING (bucket_id = 'wisdom-homepage' AND (storage.foldername(name))[1] = 'audio');
--
-- CREATE POLICY "Service role can write audio"
--     ON storage.objects
--     FOR INSERT TO service_role
--     WITH CHECK (bucket_id = 'wisdom-homepage' AND (storage.foldername(name))[1] = 'audio');
