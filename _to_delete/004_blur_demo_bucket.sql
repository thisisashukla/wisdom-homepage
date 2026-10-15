-- 004_blur_demo_bucket.sql
--
-- Creates the private Supabase Storage bucket used by the BlurAnything
-- /demo endpoint (backend/server/blur_demo/router.py).
--
-- Design:
--   * Bucket is PRIVATE. Anonymous access is not allowed. Every
--     download goes through a short-lived signed URL created by the
--     FastAPI backend at upload time.
--   * The FastAPI backend authenticates with the SUPABASE_SERVICE_ROLE
--     key, which bypasses row-level security by design — that's how the
--     backend is able to write here despite the deny-by-default RLS
--     policies below.
--   * There are NO policies granting `anon` or `authenticated` any
--     access. Every read/write must go through the service role.
--
-- Cleanup:
--   Objects can be pruned by a scheduled function that deletes rows
--   from storage.objects where `bucket_id = 'blur-demo'` and
--   `created_at < now() - interval '7 days'`. That policy isn't
--   included here — leaving it as a follow-up so this migration stays
--   just about the schema.

-- 1. Create the bucket if it doesn't already exist.
insert into storage.buckets (id, name, public)
values ('blur-demo', 'blur-demo', false)
on conflict (id) do nothing;

-- 2. Make sure the bucket stays private even if some other migration
--    flipped it. Idempotent.
update storage.buckets
   set public = false
 where id = 'blur-demo';

-- 3. Explicitly enable RLS on storage.objects if it isn't already
--    (Supabase enables it by default; this is defence in depth).
alter table storage.objects enable row level security;

-- 4. Wipe any pre-existing anon/authenticated policies on this
--    bucket — we intentionally grant NOTHING to those roles.
do $$
declare
  policy_name text;
begin
  for policy_name in
    select policyname
      from pg_policies
     where schemaname = 'storage'
       and tablename  = 'objects'
       and (qual  like '%blur-demo%'
         or with_check like '%blur-demo%')
  loop
    execute format('drop policy if exists %I on storage.objects', policy_name);
  end loop;
end $$;

-- 5. NO policies are added for anon / authenticated on purpose.
--    Every read is via a signed URL; every write is via the service
--    role (which bypasses RLS).

-- 6. Convenience index on created_at inside this bucket, so the
--    "delete stale demo outputs" cleanup query stays fast even once
--    the bucket has thousands of rows.
create index if not exists blur_demo_objects_created_at_idx
    on storage.objects (created_at)
 where bucket_id = 'blur-demo';
