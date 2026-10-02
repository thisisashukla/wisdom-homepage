# Daily reflection backend

## Deploy

1. Link the Supabase project and apply `migrations/001_schema.sql`, then
   `migrations/002_daily_reflection_flow.sql`.
2. Enable anonymous authentication and Apple authentication in Supabase Auth.
3. Add function secrets:
   - `OPENAI_API_KEY`
   - `OPENAI_TEXT_MODEL` (optional; defaults to `gpt-5-mini`)
   - `OPENAI_TRANSCRIBE_MODEL` (optional; defaults to `gpt-4o-transcribe`)
   - `OPENAI_TTS_MODEL` and `OPENAI_TTS_VOICE` (optional)
   - `REVENUECAT_SECRET_API_KEY`
   - `REVENUECAT_WEBHOOK_AUTHORIZATION` (a long random bearer value)
   - `BACKFILL_AUTHORIZATION` (a different long random bearer value)
4. Deploy every directory under `functions/` except `_shared`.
5. Point a RevenueCat webhook at `/functions/v1/revenuecat-webhook` and send
   the exact `REVENUECAT_WEBHOOK_AUTHORIZATION` value in its Authorization
   header.
6. Configure the mobile build with `EXPO_PUBLIC_SUPABASE_URL` and either
   `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
7. POST to `backfill-quote-embeddings` with `BACKFILL_AUTHORIZATION` as the
   complete Authorization header until it returns `complete: true`. Re-run it
   whenever approved quote content is added or materially edited.

Without the two public mobile variables, the app deliberately uses its local
demo response so product and UI work can continue. Production builds should
always set them.

## Function contracts

- `reflection-stt`: authenticated base64 audio to transcript.
- `reflection-process`: transcript to analysis, hybrid quote retrieval, mirror,
  canonical verse, meaning, and a two-minute practice.
- `reflection-tts`: entitlement-gated spoken reflection.
- `reflection-discuss`: entitlement-gated, maximum three-turn follow-up.
- `weekly-insight`: Day-7 pattern, available with at least four completed days.
- `reflection-history`: the user's most recent 60 completed reflections.
- `sync-entitlement`: immediate RevenueCat-to-Supabase entitlement refresh.
- `revenuecat-webhook`: ongoing server-side entitlement updates.
- `backfill-quote-embeddings`: protected, batched embedding backfill for the
  approved wisdom corpus.

The language model never supplies canonical scripture text. It selects an ID
from retrieved approved records, and the API rehydrates the verse from the
database before returning it to the app.
