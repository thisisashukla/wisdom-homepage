-- Web plans v2 (project "Wisdom App"; applied 2026-11-14 as migration `web_plans_v2_unlock_and_lookup`).
-- Days open on their morning (the page gets open days in full, later days as a six-word glimpse), a Day 8
-- "week complete" email, age and life stage kept for the next plan, and a lookup by account so a signed-in
-- visitor finds their plan on any device.

alter table public.web_plans add column if not exists age text;
alter table public.web_plans add column if not exists stages text[] not null default '{}';

-- A day is open once its morning has come or its email went (Day 1 always).
create or replace function private.web_plan_unlocked(p_start date, p_tz text, p_hour smallint, p_sent smallint) returns int
language sql stable set search_path = '' as $$
  select least(8, greatest(1, private.web_plan_due_day(p_start, p_tz, p_hour), p_sent::int))
$$;
revoke all on function private.web_plan_unlocked(date, text, smallint, smallint) from public, anon, authenticated;

drop function if exists public.web_plan_create(text, text, text, text, text, jsonb, jsonb, text, text, text, text);
create or replace function public.web_plan_create(
  p_secret text, p_uid text, p_email text, p_name text, p_tz text, p_days jsonb, p_weeks jsonb,
  p_hook_id text, p_source text, p_situation text, p_feeling text, p_age text default null, p_stages text[] default '{}'
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
  insert into public.web_plans (uid, email, name, tz, start_date, week_title, weeks, days, days_hash, hook_id, source, situation, feeling, age, stages)
  values (left(p_uid, 128), lower(left(p_email, 254)), left(p_name, 120), v_tz, (now() at time zone v_tz)::date,
          coalesce(p_weeks, '[]'::jsonb)->>0, coalesce(p_weeks, '[]'::jsonb), p_days, v_hash,
          left(p_hook_id, 80), left(p_source, 80), left(p_situation, 40), left(p_feeling, 20),
          left(p_age, 12), coalesce(p_stages[1:6], '{}'))
  returning token into v_token;
  return v_token;
end $$;

-- The plan as the page may show it: open days in full, later days as a sealed glimpse (first six words).
create or replace function private.web_plan_json(w public.web_plans) returns jsonb
language sql stable set search_path = '' as $$
  with u as (select private.web_plan_unlocked(w.start_date, w.tz, w.send_hour, w.last_sent_day) as n)
  select jsonb_build_object(
    'days', (
      select coalesce(jsonb_agg(
        case when (d->>'day')::int <= u.n then d || jsonb_build_object('locked', false)
             else jsonb_build_object(
               'day', (d->>'day')::int, 'beat', d->>'beat', 'phase', d->>'phase', 'locked', true,
               'line', array_to_string((regexp_split_to_array(coalesce(d->'story'->>'title', d->>'line', ''), '\s+'))[1:6], ' '))
        end order by (d->>'day')::int), '[]'::jsonb)
      from jsonb_array_elements(w.days) d),
    'unlocked', least(u.n, 7),
    'complete', u.n >= 8,
    'weeks', w.weeks, 'week', w.week, 'weekTitle', w.week_title,
    'startDate', w.start_date, 'tz', w.tz, 'sendHour', w.send_hour,
    'today', greatest(1, ((now() at time zone w.tz)::date - w.start_date) + 1),
    'readDays', to_jsonb(w.read_days), 'feedback', w.feedback, 'status', w.status,
    'lastSentDay', w.last_sent_day,
    'name', nullif(split_part(coalesce(w.name, ''), ' ', 1), ''),
    'email', left(w.email, 2) || '…@' || split_part(w.email, '@', 2),
    'age', w.age, 'stages', to_jsonb(w.stages))
  from u
$$;
revoke all on function private.web_plan_json(public.web_plans) from public, anon, authenticated;

create or replace function public.web_plan_get(p_token text) returns jsonb
language sql stable security definer set search_path = '' as $$
  select private.web_plan_json(w) from public.web_plans w
  where length(p_token) = 48 and w.token = p_token
  limit 1
$$;

-- Server, for a signed-in visitor: their latest plan (not one they replaced), with its token.
create or replace function public.web_plan_for_uid(p_secret text, p_uid text) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare r jsonb;
begin
  if not private.web_plans_ok(p_secret) then raise exception 'forbidden' using errcode = '42501'; end if;
  select private.web_plan_json(w) || jsonb_build_object('token', w.token) into r
    from public.web_plans w
   where w.uid = p_uid and w.status <> 'replaced'
   order by w.created_at desc limit 1;
  return r;
end $$;

-- Mornings 2 to 7, then Day 8 = the "week complete" email.
create or replace function public.web_plans_claim(p_secret text, p_limit int default 40)
returns table (token text, email text, name text, day int, days jsonb, week_title text)
language plpgsql security definer set search_path = '' as $$
#variable_conflict use_column
begin
  if not private.web_plans_ok(p_secret) then raise exception 'forbidden' using errcode = '42501'; end if;
  update public.web_plans p set status = 'done', updated_at = now()
   where p.status = 'active' and private.web_plan_due_day(p.start_date, p.tz, p.send_hour) > 9;
  return query
  with due as (
    select p.id, least(private.web_plan_due_day(p.start_date, p.tz, p.send_hour), 8) as d
      from public.web_plans p
     where p.status = 'active' and p.last_sent_day < 8
       and private.web_plan_due_day(p.start_date, p.tz, p.send_hour) > p.last_sent_day
     order by p.created_at
     limit greatest(1, least(p_limit, 200))
     for update of p skip locked
  )
  update public.web_plans p
     set last_sent_day = due.d, last_sent_at = now(), updated_at = now(),
         status = case when due.d >= 8 then 'done' else p.status end
    from due
   where p.id = due.id
  returning p.token, p.email, p.name, due.d::int, p.days, p.week_title;
end $$;

revoke all on function public.web_plan_create(text, text, text, text, text, jsonb, jsonb, text, text, text, text, text, text[]) from public;
revoke all on function public.web_plan_for_uid(text, text) from public;
grant execute on function public.web_plan_create(text, text, text, text, text, jsonb, jsonb, text, text, text, text, text, text[]) to anon, authenticated, service_role;
grant execute on function public.web_plan_for_uid(text, text) to anon, authenticated, service_role;
grant execute on function public.web_plan_get(text) to anon, authenticated, service_role;
