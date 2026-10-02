# Archived mobile backend

`mobile-supabase-v1` is the superseded Edge Function implementation moved out
of the React Native repository during backend consolidation. It is retained
only as migration history and must not be deployed alongside the active
FastAPI routes.

The active mobile backend is implemented in `backend/server/reflections.py`
and `backend/server/entitlements.py`; its live database schema is
`backend/supabase/migrations/004_mobile_daily_reflections.sql`.
