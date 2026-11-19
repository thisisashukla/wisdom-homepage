-- Signed-in readers on wisdomquotes.in (project "Wisdom App", same pattern as 009_web_plans.sql).
--
--  web_reading: a reader's Gita progress (the wq_reading store from lib/readingProgress.ts: last verse, read
--               bitset, saved verses with their save/unsave times), so it follows them to any device. The site
--               merges devices (lib/readingMerge.ts) and writes the merged copy back.
--  web_daily:   one Gita verse each morning by email, around 7 in the reader's time zone. The verse after the
--               one they last read or were sent, so the emails carry them through the Gita from where they are.
--               Paused while they have a 7-day plan running (that plan already sends a morning email).
--
-- Written only through the functions below (RLS on, no policies). Secret-guarded functions check Vault's
-- 'web_plans_secret' (WEB_PLANS_SECRET on Vercel); the unsubscribe function takes the row's token.

create table if not exists public.web_reading (
  uid         text primary key,                      -- Firebase uid
  data        jsonb not null default '{}'::jsonb,    -- { v, last, read, saved, st }
  updated_at  timestamptz not null default now()
);
alter table public.web_reading enable row level security;

create table if not exists public.web_daily (
  id              uuid primary key default gen_random_uuid(),
  token           text not null unique default encode(extensions.gen_random_bytes(24), 'hex'),
  uid             text not null unique,
  email           text not null,
  name            text,
  tz              text not null default 'Asia/Kolkata',
  send_hour       smallint not null default 7 check (send_hour between 0 and 23),
  lang            text not null default 'en' check (lang in ('en', 'hi')),
  source          text,                                -- where they signed up (dwell_card, …)
  status          text not null default 'active' check (status in ('active', 'unsubscribed')),
  last_sent_date  date,                                -- the reader's local date of the last email
  last_sent_ref   text,                                -- "2.47"
  last_sent_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists web_daily_active_idx on public.web_daily (created_at) where status = 'active';
alter table public.web_daily enable row level security;

-- ── Reading progress ─────────────────────────────────────────────────────────

create or replace function public.web_reading_get(p_secret text, p_uid text) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
begin
  if not private.web_plans_ok(p_secret) then raise exception 'forbidden' using errcode = '42501'; end if;
  return (select r.data from public.web_reading r where r.uid = p_uid);
end $$;

create or replace function public.web_reading_put(p_secret text, p_uid text, p_data jsonb) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.web_plans_ok(p_secret) then raise exception 'forbidden' using errcode = '42501'; end if;
  if coalesce(p_uid, '') = '' or jsonb_typeof(p_data) is distinct from 'object' or length(p_data::text) > 32000 then
    raise exception 'invalid_reading' using errcode = '22023';
  end if;
  insert into public.web_reading (uid, data, updated_at) values (left(p_uid, 128), p_data, now())
  on conflict (uid) do update set data = excluded.data, updated_at = now();
end $$;

-- ── Daily verse email ────────────────────────────────────────────────────────

-- Turn the morning verse on or off for a signed-in reader. Returns { status, token }.
-- Turning it on today sends the first one tomorrow morning.
create or replace function public.web_daily_set(
  p_secret text, p_uid text, p_email text, p_name text, p_tz text, p_lang text, p_on boolean, p_source text
) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_tz text; v_row public.web_daily;
begin
  if not private.web_plans_ok(p_secret) then raise exception 'forbidden' using errcode = '42501'; end if;
  if coalesce(p_uid, '') = '' then raise exception 'invalid_uid' using errcode = '22023'; end if;
  if not coalesce(p_on, false) then
    update public.web_daily set status = 'unsubscribed', updated_at = now() where uid = p_uid returning * into v_row;
    return jsonb_build_object('status', coalesce(v_row.status, 'off'), 'token', v_row.token);
  end if;
  if coalesce(p_email, '') = '' then raise exception 'invalid_email' using errcode = '22023'; end if;
  v_tz := case when exists (select 1 from pg_catalog.pg_timezone_names z where z.name = p_tz) then p_tz else 'Asia/Kolkata' end;
  insert into public.web_daily (uid, email, name, tz, lang, source, last_sent_date)
  values (left(p_uid, 128), lower(left(p_email, 254)), left(p_name, 120), v_tz,
          case when p_lang = 'hi' then 'hi' else 'en' end, left(p_source, 80), (now() at time zone v_tz)::date)
  on conflict (uid) do update
     set email = excluded.email, name = coalesce(excluded.name, public.web_daily.name), tz = excluded.tz,
         lang = excluded.lang, status = 'active',
         last_sent_date = case when public.web_daily.status = 'active' then public.web_daily.last_sent_date else excluded.last_sent_date end,
         updated_at = now()
  returning * into v_row;
  return jsonb_build_object('status', v_row.status, 'token', v_row.token);
end $$;

create or replace function public.web_daily_status(p_secret text, p_uid text) returns text
language plpgsql stable security definer set search_path = '' as $$
begin
  if not private.web_plans_ok(p_secret) then raise exception 'forbidden' using errcode = '42501'; end if;
  return coalesce((select d.status from public.web_daily d where d.uid = p_uid), 'off');
end $$;

-- Cron: claim every reader whose morning verse is due (their local hour has reached send_hour and today's has
-- not gone), skipping anyone with a 7-day plan still sending. Claimed rows are marked sent for today.
create or replace function public.web_daily_claim(p_secret text, p_limit int default 40)
returns table (token text, uid text, email text, name text, lang text, local_date date, prev_date date,
               last_sent_ref text, last_sent_at timestamptz, reading jsonb)
language plpgsql security definer set search_path = '' as $$
#variable_conflict use_column
begin
  if not private.web_plans_ok(p_secret) then raise exception 'forbidden' using errcode = '42501'; end if;
  return query
  with due as (
    select d.id, (now() at time zone d.tz)::date as today, d.last_sent_date as prev
      from public.web_daily d
     where d.status = 'active'
       and extract(hour from (now() at time zone d.tz)) >= d.send_hour
       and (d.last_sent_date is null or d.last_sent_date < (now() at time zone d.tz)::date)
       and not exists (select 1 from public.web_plans p where p.uid = d.uid and p.status = 'active' and p.last_sent_day < 7)
     order by d.created_at
     limit greatest(1, least(p_limit, 200))
     for update of d skip locked
  )
  update public.web_daily d
     set last_sent_date = due.today, updated_at = now()
    from due
   where d.id = due.id
  returning d.token, d.uid, d.email, d.name, d.lang, due.today, due.prev, d.last_sent_ref, d.last_sent_at,
            (select r.data from public.web_reading r where r.uid = d.uid);
end $$;

-- Cron: the email went; remember which verse.
create or replace function public.web_daily_sent(p_secret text, p_token text, p_ref text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.web_plans_ok(p_secret) then raise exception 'forbidden' using errcode = '42501'; end if;
  update public.web_daily set last_sent_ref = left(p_ref, 12), last_sent_at = now(), updated_at = now() where token = p_token;
end $$;

-- Cron: the send failed; give the day back so the next run tries again.
create or replace function public.web_daily_unclaim(p_secret text, p_token text, p_prev date) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.web_plans_ok(p_secret) then raise exception 'forbidden' using errcode = '42501'; end if;
  update public.web_daily set last_sent_date = p_prev, updated_at = now() where token = p_token;
end $$;

-- Anyone holding the token (the email's link): stop the morning verse.
create or replace function public.web_daily_unsubscribe(p_token text) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if length(p_token) <> 48 then return false; end if;
  update public.web_daily set status = 'unsubscribed', updated_at = now() where token = p_token and status = 'active';
  return found;
end $$;

revoke all on function public.web_reading_get(text, text) from public;
revoke all on function public.web_reading_put(text, text, jsonb) from public;
revoke all on function public.web_daily_set(text, text, text, text, text, text, boolean, text) from public;
revoke all on function public.web_daily_status(text, text) from public;
revoke all on function public.web_daily_claim(text, int) from public;
revoke all on function public.web_daily_sent(text, text, text) from public;
revoke all on function public.web_daily_unclaim(text, text, date) from public;
revoke all on function public.web_daily_unsubscribe(text) from public;
grant execute on function public.web_reading_get(text, text) to anon, authenticated, service_role;
grant execute on function public.web_reading_put(text, text, jsonb) to anon, authenticated, service_role;
grant execute on function public.web_daily_set(text, text, text, text, text, text, boolean, text) to anon, authenticated, service_role;
grant execute on function public.web_daily_status(text, text) to anon, authenticated, service_role;
grant execute on function public.web_daily_claim(text, int) to anon, authenticated, service_role;
grant execute on function public.web_daily_sent(text, text, text) to anon, authenticated, service_role;
grant execute on function public.web_daily_unclaim(text, text, date) to anon, authenticated, service_role;
grant execute on function public.web_daily_unsubscribe(text) to anon, authenticated, service_role;

-- ── The morning verse emails ─────────────────────────────────────────────────
-- Every 30 minutes, offset from the plan emails' job. Timing is decided by web_daily_claim.
select cron.unschedule(jobid) from cron.job where jobname = 'web-daily-verse-email';
select cron.schedule(
  'web-daily-verse-email',
  '15,45 * * * *',
  $cron$
  select net.http_post(
    url := 'https://wisdomquotes.in/api/daily/cron',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'web_plans_secret' limit 1)
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 60000
  );
  $cron$
);
