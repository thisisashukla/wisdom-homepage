-- Web reading plans from wisdomquotes.in/start (project "Wisdom App"). Applied 2026-11-14 as
-- migrations `web_plans` and `web_plans_cron`.
--
-- One row per signed-in person's week, so the week can reach them one day each morning by email and
-- open on any device by its token (/plan?t=…). Written only through the functions below (RLS on, no
-- policies). Secret-guarded functions check the Vault secret 'web_plans_secret', which holds the same
-- value as WEB_PLANS_SECRET on Vercel. Create it once (not in this file):
--   select vault.create_secret('<64 hex chars>', 'web_plans_secret', 'Shared with WEB_PLANS_SECRET on Vercel');

create table if not exists public.web_plans (
  id            uuid primary key default gen_random_uuid(),
  token         text not null unique default encode(extensions.gen_random_bytes(24), 'hex'),
  uid           text not null,                       -- Firebase uid (Google sign-in on the site)
  email         text not null,
  name          text,
  tz            text not null default 'Asia/Kolkata',
  send_hour     smallint not null default 7 check (send_hour between 0 and 23),
  start_date    date not null,                       -- Day 1, in tz
  week          smallint not null default 1,
  week_title    text,
  weeks         jsonb not null default '[]'::jsonb,
  days          jsonb not null,                      -- FullDay[] as /api/start/week builds it
  days_hash     text not null,
  hook_id       text,
  source        text,                                -- ?ref= of the CTA
  situation     text,
  feeling       text,
  last_sent_day smallint not null default 0,         -- 1 once the welcome (Day 1) email went
  last_sent_at  timestamptz,
  read_days     smallint[] not null default '{}',
  feedback      jsonb not null default '{}'::jsonb,  -- {"3": "helped" | "not_for_me"}
  status        text not null default 'active' check (status in ('active','done','replaced','unsubscribed')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists web_plans_active_idx on public.web_plans (created_at) where status = 'active';
create index if not exists web_plans_uid_idx on public.web_plans (uid, created_at desc);
alter table public.web_plans enable row level security;

create schema if not exists private;

create or replace function private.web_plans_ok(p_secret text) returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce(
    length(p_secret) >= 32 and p_secret = (select s.decrypted_secret from vault.decrypted_secrets s where s.name = 'web_plans_secret' limit 1),
    false)
$$;

-- The plan day whose morning email is due now (0 before Day 1's send hour).
create or replace function private.web_plan_due_day(p_start date, p_tz text, p_hour smallint) returns int
language sql stable set search_path = '' as $$
  select ((now() at time zone p_tz)::date - p_start) + 1
         - case when extract(hour from (now() at time zone p_tz)) < p_hour then 1 else 0 end
$$;

revoke all on function private.web_plans_ok(text) from public, anon, authenticated;
revoke all on function private.web_plan_due_day(date, text, smallint) from public, anon, authenticated;

-- Server: save the week at sign-in. Returns the plan's token. Same person + same week again → same token.
create or replace function public.web_plan_create(
  p_secret text, p_uid text, p_email text, p_name text, p_tz text, p_days jsonb, p_weeks jsonb,
  p_hook_id text, p_source text, p_situation text, p_feeling text
) returns text
language plpgsql security definer set search_path = '' as $$
declare v_tz text; v_hash text; v_token text;
begin
  if not private.web_plans_ok(p_secret) then raise exception 'forbidden' using errcode = '42501'; end if;
  if coalesce(p_uid, '') = '' or coalesce(p_email, '') = '' or jsonb_typeof(p_days) is distinct from 'array' or jsonb_array_length(p_days) = 0 then
    raise exception 'invalid_plan' using errcode = '22023';
  end if;
  v_tz := case when exists (select 1 from pg_catalog.pg_timezone_names z where z.name = p_tz) then p_tz else 'Asia/Kolkata' end;
  v_hash := md5(p_days::text);
  select w.token into v_token from public.web_plans w
   where w.uid = p_uid and w.days_hash = v_hash and w.status in ('active', 'done', 'unsubscribed')
   order by w.created_at desc limit 1;
  if v_token is not null then return v_token; end if;
  update public.web_plans set status = 'replaced', updated_at = now() where uid = p_uid and status = 'active';
  insert into public.web_plans (uid, email, name, tz, start_date, week_title, weeks, days, days_hash, hook_id, source, situation, feeling)
  values (left(p_uid, 128), lower(left(p_email, 254)), left(p_name, 120), v_tz, (now() at time zone v_tz)::date,
          coalesce(p_weeks, '[]'::jsonb)->>0, coalesce(p_weeks, '[]'::jsonb), p_days, v_hash,
          left(p_hook_id, 80), left(p_source, 80), left(p_situation, 40), left(p_feeling, 20))
  returning token into v_token;
  return v_token;
end $$;

-- Server: an email for p_day went out (the welcome email is Day 1).
create or replace function public.web_plan_mark_sent(p_secret text, p_token text, p_day int) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.web_plans_ok(p_secret) then raise exception 'forbidden' using errcode = '42501'; end if;
  update public.web_plans
     set last_sent_day = greatest(last_sent_day, least(p_day, 7)), last_sent_at = now(), updated_at = now()
   where token = p_token;
end $$;

-- Cron: claim every plan whose next morning email is due and mark it sent (a failed send is unclaimed).
create or replace function public.web_plans_claim(p_secret text, p_limit int default 40)
returns table (token text, email text, name text, day int, days jsonb, week_title text)
language plpgsql security definer set search_path = '' as $$
#variable_conflict use_column
begin
  if not private.web_plans_ok(p_secret) then raise exception 'forbidden' using errcode = '42501'; end if;
  -- More than a day past the week's end with mornings unsent (an outage): close it quietly.
  update public.web_plans p set status = 'done', updated_at = now()
   where p.status = 'active' and private.web_plan_due_day(p.start_date, p.tz, p.send_hour) > 8;
  return query
  with due as (
    select p.id, least(private.web_plan_due_day(p.start_date, p.tz, p.send_hour), 7) as d
      from public.web_plans p
     where p.status = 'active' and p.last_sent_day < 7
       and private.web_plan_due_day(p.start_date, p.tz, p.send_hour) > p.last_sent_day
     order by p.created_at
     limit greatest(1, least(p_limit, 200))
     for update of p skip locked
  )
  update public.web_plans p
     set last_sent_day = due.d, last_sent_at = now(), updated_at = now(),
         status = case when due.d >= 7 then 'done' else p.status end
    from due
   where p.id = due.id
  returning p.token, p.email, p.name, due.d::int, p.days, p.week_title;
end $$;

create or replace function public.web_plans_unclaim(p_secret text, p_token text, p_day int) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.web_plans_ok(p_secret) then raise exception 'forbidden' using errcode = '42501'; end if;
  update public.web_plans
     set last_sent_day = p_day - 1, status = case when status = 'done' then 'active' else status end, updated_at = now()
   where token = p_token and last_sent_day = p_day;
end $$;

-- Anyone holding the token (the email links): read the plan.
create or replace function public.web_plan_get(p_token text) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'days', w.days, 'weeks', w.weeks, 'week', w.week, 'weekTitle', w.week_title,
    'startDate', w.start_date, 'tz', w.tz, 'sendHour', w.send_hour,
    'today', greatest(1, ((now() at time zone w.tz)::date - w.start_date) + 1),
    'readDays', to_jsonb(w.read_days), 'feedback', w.feedback, 'status', w.status,
    'lastSentDay', w.last_sent_day,
    'name', nullif(split_part(coalesce(w.name, ''), ' ', 1), ''),
    'email', left(w.email, 2) || '…@' || split_part(w.email, '@', 2))
  from public.web_plans w
  where length(p_token) = 48 and w.token = p_token
  limit 1
$$;

-- Anyone holding the token: mark a day read and/or record "helped" / "not for me".
create or replace function public.web_plan_mark(p_token text, p_day int, p_read boolean default true, p_feedback text default null)
returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if p_day is null or p_day < 1 or p_day > 7 or length(p_token) <> 48 then return false; end if;
  update public.web_plans
     set read_days = case when coalesce(p_read, false) and not (p_day::smallint = any (read_days)) then array_append(read_days, p_day::smallint) else read_days end,
         feedback  = case when p_feedback in ('helped', 'not_for_me') then feedback || jsonb_build_object(p_day::text, p_feedback) else feedback end,
         updated_at = now()
   where token = p_token;
  return found;
end $$;

-- Anyone holding the token: stop the morning emails (one-click unsubscribe).
create or replace function public.web_plan_unsubscribe(p_token text) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if length(p_token) <> 48 then return false; end if;
  update public.web_plans set status = 'unsubscribed', updated_at = now()
   where token = p_token and status in ('active', 'done');
  return found;
end $$;

revoke all on function public.web_plan_create(text, text, text, text, text, jsonb, jsonb, text, text, text, text) from public;
revoke all on function public.web_plan_mark_sent(text, text, int) from public;
revoke all on function public.web_plans_claim(text, int) from public;
revoke all on function public.web_plans_unclaim(text, text, int) from public;
revoke all on function public.web_plan_get(text) from public;
revoke all on function public.web_plan_mark(text, int, boolean, text) from public;
revoke all on function public.web_plan_unsubscribe(text) from public;
grant execute on function public.web_plan_create(text, text, text, text, text, jsonb, jsonb, text, text, text, text) to anon, authenticated, service_role;
grant execute on function public.web_plan_mark_sent(text, text, int) to anon, authenticated, service_role;
grant execute on function public.web_plans_claim(text, int) to anon, authenticated, service_role;
grant execute on function public.web_plans_unclaim(text, text, int) to anon, authenticated, service_role;
grant execute on function public.web_plan_get(text) to anon, authenticated, service_role;
grant execute on function public.web_plan_mark(text, int, boolean, text) to anon, authenticated, service_role;
grant execute on function public.web_plan_unsubscribe(text) to anon, authenticated, service_role;

-- ── Migration web_plans_cron: the morning emails ─────────────────────────────────────────────
-- Every 30 minutes (so half-hour time zones like IST get theirs between 7:00 and 7:30), call the
-- site's sender with the shared secret. The site decides nothing about timing: web_plans_claim does.
create extension if not exists pg_net;
create extension if not exists pg_cron;

select cron.unschedule(jobid) from cron.job where jobname = 'web-plans-daily-email';
select cron.schedule(
  'web-plans-daily-email',
  '5,35 * * * *',
  $cron$
  select net.http_post(
    url := 'https://wisdomquotes.in/api/plan/cron',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'web_plans_secret' limit 1)
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 60000
  );
  $cron$
);
