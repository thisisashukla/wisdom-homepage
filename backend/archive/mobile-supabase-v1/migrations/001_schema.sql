-- Wisdom App — Supabase Schema
-- Run this in Supabase SQL Editor

-- ─── Extensions ──────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Enums ───────────────────────────────────────────────────────────────────
CREATE TYPE entry_point_type AS ENUM ('stuck', 'lost', 'anxious', 'empty', 'alone');
CREATE TYPE path_type         AS ENUM ('action', 'mind', 'heart');
CREATE TYPE interaction_type  AS ENUM ('glance', 'resonate', 'carry');
CREATE TYPE session_type_enum AS ENUM ('onboarding', 'daily', 'reentry', 'deepening', 'unlock_ceremony');
CREATE TYPE connection_type   AS ENUM ('vertical', 'cross_path');
CREATE TYPE card_type         AS ENUM ('quote', 'practice');
CREATE TYPE card_interaction  AS ENUM ('none', 'carried', 'dismissed');
CREATE TYPE category_type     AS ENUM ('motivational', 'philosophical', 'devotional', 'narrative');
CREATE TYPE content_mode_type AS ENUM ('standalone', 'narrative', 'arc');
CREATE TYPE arc_type_enum     AS ENUM ('buildup_payoff', 'elaboration', 'contrast', 'question_answer', 'list');
CREATE TYPE surface_response  AS ENUM ('deeper', 'same', 'moved_on');

-- ─── Users ────────────────────────────────────────────────────────────────────
CREATE TABLE users (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_point         entry_point_type NOT NULL,
  primary_path        path_type NOT NULL,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  last_active_at      TIMESTAMPTZ DEFAULT NOW(),
  arc_session_index   INT DEFAULT 0,
  last_session_at     TIMESTAMPTZ,
  is_paid             BOOL DEFAULT FALSE,
  paid_since          TIMESTAMPTZ
);

-- ─── Nodes ────────────────────────────────────────────────────────────────────
CREATE TABLE nodes (
  id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                        TEXT UNIQUE NOT NULL,
  display_name                TEXT NOT NULL,
  sanskrit_term               TEXT,
  sanskrit_transliteration    TEXT,
  path                        path_type NOT NULL,
  ring                        INT NOT NULL DEFAULT 1,
  position_angle              FLOAT NOT NULL DEFAULT 0,
  description                 TEXT,
  connection_text             TEXT,
  unlocks_after_node_id       UUID REFERENCES nodes(id),
  depth_to_show_sanskrit      INT DEFAULT 30
);

-- ─── Node Connections ─────────────────────────────────────────────────────────
CREATE TABLE node_connections (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_node_id            UUID NOT NULL REFERENCES nodes(id),
  to_node_id              UUID NOT NULL REFERENCES nodes(id),
  connection_type         connection_type NOT NULL,
  resonance_description   TEXT
);

-- ─── User Node State ──────────────────────────────────────────────────────────
CREATE TABLE user_node_states (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  node_id         UUID NOT NULL REFERENCES nodes(id),
  is_unlocked     BOOL DEFAULT FALSE,
  unlocked_at     TIMESTAMPTZ,
  depth_points    INT DEFAULT 0,
  UNIQUE(user_id, node_id)
);

-- ─── Arcs ─────────────────────────────────────────────────────────────────────
CREATE TABLE arcs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  arc_type        arc_type_enum NOT NULL,
  summary         TEXT,
  composite_quote TEXT,
  essence         TEXT,
  primary_node_id UUID REFERENCES nodes(id)
);

-- ─── Quotes ───────────────────────────────────────────────────────────────────
CREATE TABLE quotes (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  verse_id              TEXT UNIQUE,
  sanskrit_text         TEXT,
  transliteration       TEXT,
  simple_meaning        TEXT NOT NULL,
  simple_insight        TEXT,
  detailed_meaning      TEXT,
  modern_relevance      TEXT,
  insight               TEXT,
  essence               TEXT,
  widget_quote          TEXT,
  quote_variants        JSONB DEFAULT '[]',
  is_standalone_quote   BOOL DEFAULT TRUE,
  primary_node_id       UUID REFERENCES nodes(id),
  secondary_node_ids    UUID[] DEFAULT '{}',
  is_bridge_quote       BOOL DEFAULT FALSE,
  source                TEXT,
  chapter               TEXT,
  verse_number          TEXT,
  speaker               TEXT,
  deity                 TEXT,
  category              category_type,
  tone                  TEXT,
  content_mode          content_mode_type DEFAULT 'standalone',
  arc_id                UUID REFERENCES arcs(id),
  arc_role              TEXT,
  target_entry_points   entry_point_type[] DEFAULT '{}',
  depth_tier            TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ─── User Quote Interactions ──────────────────────────────────────────────────
CREATE TABLE user_quote_interactions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quote_id              UUID NOT NULL REFERENCES quotes(id),
  interacted_at         TIMESTAMPTZ DEFAULT NOW(),
  interaction_type      interaction_type NOT NULL,
  resonance_node_id     UUID REFERENCES nodes(id),
  is_carried_today      BOOL DEFAULT FALSE,
  depth_points_awarded  INT DEFAULT 0
);

-- ─── Sessions ─────────────────────────────────────────────────────────────────
-- screens is a JSONB array of screen definition objects
CREATE TABLE sessions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                TEXT UNIQUE NOT NULL,
  entry_point         entry_point_type NOT NULL,
  session_index       INT NOT NULL DEFAULT 0,
  session_type        session_type_enum NOT NULL,
  title               TEXT NOT NULL,
  estimated_minutes   INT DEFAULT 5,
  node_id             UUID REFERENCES nodes(id),
  screens             JSONB NOT NULL DEFAULT '[]'
);

-- ─── User Session State ───────────────────────────────────────────────────────
-- screen_responses stores verbatim user text — source for day 6 and monthly resurfacing
CREATE TABLE user_session_states (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id        UUID NOT NULL REFERENCES sessions(id),
  started_at        TIMESTAMPTZ DEFAULT NOW(),
  completed_at      TIMESTAMPTZ,
  is_complete       BOOL DEFAULT FALSE,
  screen_responses  JSONB DEFAULT '[]'
);

-- ─── User Reflection Surfaces ─────────────────────────────────────────────────
CREATE TABLE user_reflection_surfaces (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_session_state_id   UUID REFERENCES user_session_states(id),
  source_screen_index       INT NOT NULL,
  response_text             TEXT NOT NULL,
  node_id                   UUID REFERENCES nodes(id),
  written_at                TIMESTAMPTZ DEFAULT NOW(),
  surfaced_at               TIMESTAMPTZ,
  surface_response          surface_response,
  scheduled_surface_at      TIMESTAMPTZ
);

-- ─── Daily Cards ──────────────────────────────────────────────────────────────
CREATE TABLE daily_cards (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date              DATE NOT NULL,
  card_type         card_type NOT NULL,
  quote_id          UUID REFERENCES quotes(id),
  session_id        UUID REFERENCES sessions(id),
  was_opened        BOOL DEFAULT FALSE,
  interaction_type  card_interaction DEFAULT 'none',
  UNIQUE(user_id, date)
);

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_node_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quote_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_session_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reflection_surfaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE arcs ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_connections ENABLE ROW LEVEL SECURITY;

-- User data: own rows only
CREATE POLICY "users_self"      ON users              FOR ALL USING (auth.uid() = id);
CREATE POLICY "node_states_own" ON user_node_states   FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "interactions_own"ON user_quote_interactions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "sessions_own"    ON user_session_states FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "reflections_own" ON user_reflection_surfaces FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "cards_own"       ON daily_cards        FOR ALL USING (auth.uid() = user_id);

-- Content tables: public read
CREATE POLICY "nodes_read"    ON nodes          FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "quotes_read"   ON quotes         FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "sessions_read" ON sessions       FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "arcs_read"     ON arcs           FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "conn_read"     ON node_connections FOR SELECT TO anon, authenticated USING (true);

-- ─── Daily Card Selector Function ────────────────────────────────────────────
-- Returns the correct card for a user on a given date.
-- Logic: existing card → re-entry if idle >48h → session day → quote day
CREATE OR REPLACE FUNCTION get_or_create_daily_card(p_user_id UUID, p_date DATE)
RETURNS TABLE(card_type card_type, quote_id UUID, session_id UUID)
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  v_user          RECORD;
  v_card          RECORD;
  v_next_session  UUID;
  v_quote         UUID;
BEGIN
  SELECT * INTO v_user FROM users WHERE id = p_user_id;
  IF NOT FOUND THEN RETURN; END IF;

  -- Return existing card if already generated today
  SELECT dc.card_type, dc.quote_id, dc.session_id INTO v_card
  FROM daily_cards dc WHERE dc.user_id = p_user_id AND dc.date = p_date;
  IF FOUND THEN
    RETURN QUERY SELECT v_card.card_type, v_card.quote_id, v_card.session_id;
    RETURN;
  END IF;

  -- Re-entry: idle more than 48 hours
  IF v_user.last_session_at IS NOT NULL
     AND NOW() - v_user.last_session_at > INTERVAL '48 hours' THEN
    SELECT s.id INTO v_next_session
    FROM sessions s
    WHERE s.entry_point = v_user.entry_point AND s.session_type = 'reentry'
    LIMIT 1;
    IF FOUND THEN
      INSERT INTO daily_cards(user_id, date, card_type, session_id)
        VALUES (p_user_id, p_date, 'practice', v_next_session);
      RETURN QUERY SELECT 'practice'::card_type, NULL::UUID, v_next_session;
      RETURN;
    END IF;
  END IF;

  -- Session day (even arc index = session)
  IF v_user.arc_session_index % 2 = 0 THEN
    SELECT s.id INTO v_next_session
    FROM sessions s
    WHERE s.entry_point = v_user.entry_point
      AND s.session_index = v_user.arc_session_index
      AND s.session_type != 'reentry'
    LIMIT 1;
    IF FOUND THEN
      INSERT INTO daily_cards(user_id, date, card_type, session_id)
        VALUES (p_user_id, p_date, 'practice', v_next_session);
      RETURN QUERY SELECT 'practice'::card_type, NULL::UUID, v_next_session;
      RETURN;
    END IF;
  END IF;

  -- Quote day: highest-depth unlocked node, unseen in last 7 days
  SELECT q.id INTO v_quote
  FROM quotes q
  JOIN user_node_states uns ON q.primary_node_id = uns.node_id
  WHERE uns.user_id = p_user_id
    AND uns.is_unlocked = TRUE
    AND q.id NOT IN (
      SELECT uqi.quote_id FROM user_quote_interactions uqi
      WHERE uqi.user_id = p_user_id
        AND uqi.interacted_at > NOW() - INTERVAL '7 days'
    )
  ORDER BY uns.depth_points DESC, RANDOM()
  LIMIT 1;

  INSERT INTO daily_cards(user_id, date, card_type, quote_id)
    VALUES (p_user_id, p_date, 'quote', v_quote);
  RETURN QUERY SELECT 'quote'::card_type, v_quote, NULL::UUID;
END;
$$;

-- ─── Depth Points Helper ──────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION add_depth_points(
  p_user_id UUID,
  p_node_id UUID,
  p_points  INT
) RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO user_node_states(user_id, node_id, depth_points)
    VALUES (p_user_id, p_node_id, p_points)
  ON CONFLICT (user_id, node_id)
  DO UPDATE SET depth_points = user_node_states.depth_points + p_points;
END;
$$;
