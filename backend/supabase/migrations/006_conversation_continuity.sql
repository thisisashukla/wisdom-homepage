-- Conversation continuity: apply before deploying reflection-v6.
BEGIN;
ALTER TABLE reflection_threads DROP CONSTRAINT IF EXISTS reflection_threads_turn_count_check;
ALTER TABLE reflection_threads ADD CONSTRAINT reflection_threads_turn_count_check CHECK (turn_count >= 0);
ALTER TABLE reflection_messages DROP CONSTRAINT IF EXISTS reflection_messages_turn_index_check;
ALTER TABLE reflection_messages ADD CONSTRAINT reflection_messages_turn_index_check CHECK (turn_index >= 0);
ALTER TABLE reflection_threads ADD COLUMN IF NOT EXISTS conversation_state JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE reflection_messages ADD COLUMN IF NOT EXISTS source_uids TEXT[] NOT NULL DEFAULT '{}';
-- Old completed conversations can resume; deliberately closed ones stay closed.
UPDATE reflection_threads SET status = 'active' WHERE status = 'completed';
COMMIT;
