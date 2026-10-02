# Wisdom shared backend

This FastAPI service is the single backend for both products:

- **Website endpoints:** `/api/v1/intent`, `/api/v1/search`, `/api/v1/rag`,
  `/api/v1/audio/*`, and `/api/v1/verse-of-day`.
- **Mobile app endpoints:** `/api/v1/app/reflections/*`,
  `/api/v1/app/reflection-cycles/*`, and `/api/v1/app/entitlements/*`.
- **Provider webhooks:** `/api/v1/webhooks/*`.

Both surfaces use the same canonical `verses` table and BGE-M3 retrieval
index. Mobile user data is authenticated with a Supabase access token. The
service-role key remains server-only.

## Local run

1. Copy `.env.example` to `.env` and supply the required values.
2. Install `requirements.txt`.
3. From this directory run `uvicorn main:app --host 0.0.0.0 --port 8000 --reload`.

## Database

The complete Supabase project lives in `backend/supabase`. From the
`wisdom-homepage` repository root, use the Supabase CLI with `--workdir backend`
so migrations are discovered from `backend/supabase/migrations`.

Apply migrations in filename order and enable anonymous plus Apple login in
Supabase Auth for the mobile app.

## Client configuration

The website uses `NEXT_PUBLIC_BACKEND_URL`. The mobile app uses
`EXPO_PUBLIC_WISDOM_API_URL` for this FastAPI service and
`EXPO_PUBLIC_SUPABASE_URL` plus `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for
authentication only.

RevenueCat should send webhooks to
`/api/v1/webhooks/revenuecat`, using the exact
`REVENUECAT_WEBHOOK_AUTHORIZATION` value as its Authorization header.

## Practice feedback

Migration `005_practice_feedback.sql` adds private, revision-specific practice
outcomes. Apply it before deploying this backend version. Mobile endpoints:

- `GET /api/v1/app/practice-follow-up?timezone=UTC`
- `PUT /api/v1/app/reflections/{id}/practice-feedback`

Writes validate the authenticated owner, an earlier local date, and the exact
practice text. Outcomes inform daily guidance, discussion, and newly generated
weekly insights; the original practice snapshot remains intact if a reflection
is replaced. A user can correct an answer without creating duplicates.

Run `python -m unittest discover -s tests -v` from this directory. The opt-in
`scripts/smoke_practice_loop.py --run-live --env-file <backend-env-file>` exercises
the running API and database using temporary accounts; `--generate` also makes
one real model request. Its cleanup removes only accounts created by that run.

## Conversational guide (v6)

Apply `006_conversation_continuity.sql` before deploying the updated mobile API.
It replaces the database's three-turn limit with non-negative turn indexes,
adds bounded conversation state and source IDs, and permits previously completed
threads to resume. Explicitly closed threads remain closed. No production migration
is run by the evaluation scripts.

Both experiences use `prompts/companion.py` for voice and `ai/conversation.py` for
turn planning, evidence-backed working memory, selective retrieval and grounding.
`/rag` now accepts optional history, conversation_state and candidate references;
the server resolves canonical source text rather than trusting client translations.
It returns source_verses and conversation_state. `/rag/stream` sends these in the
validated final event; raw deltas are provisional and must not be presented as
verified answers.

Mobile reflections may return `quote: null`, empty practice and empty teaser.
Discussions have optional sources/questions, a suggested pause (`complete`) rather
than a forced stop, and `maxTurns: null`. Reopen with the authenticated
`GET /api/v1/app/reflections/{id}/discussion` endpoint. Deploy the matching mobile
client to render these optional fields and allow continuation.

Starter story episodes live in `ai/episodes.py`: Gita 1.28–30, 2.7–9 and 6.33–36.
They are checked against the supplied corpus and unavailable if their source checks
fail. Add further episodes only after checking complete passages and interpretation
limits. Do not manufacture story material from isolated verse search hits.

Validation:

- `python -m unittest discover -s tests -v` (no providers).
- `python scripts/eval_conversation.py --run-live --output /tmp/conversation.json`
  (synthetic conversation fixtures; configured provider and local retrieval).
- `python scripts/eval_mobile_conversation.py --run-live --output /tmp/mobile.json`
  (real mobile prompts and five follow-ups; synthetic in-memory database).
- `PGLITE_MODULE=/path/to/pglite/dist/index.js node scripts/check_conversation_migration.mjs`
  (temporary local PostgreSQL; never the live database).

Run live suites sequentially: each loads the embedding model. Review the complete
saved exchanges using `evals/conversation_cases.json`; successful JSON/source-ID
checks alone do not establish warmth, usefulness, or philosophical accuracy.
Semantic grounding uses a model check plus one bounded rewrite; it is not a
substitute for scripture scholarship or ongoing conversation evaluation.
