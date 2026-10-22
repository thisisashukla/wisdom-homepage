-- Web funnel for wisdomquotes.in: Google sign-in leads and the ₹89/week
-- web plan subscription (Razorpay). Written only by the Next.js server with
-- the service-role key; RLS on with no policies so the anon key can't read.

create table if not exists public.web_users (
  uid           text primary key,            -- Firebase Auth uid
  email         text,
  name          text,
  platform      text,                        -- ios | android | desktop
  feeling       text,                        -- last feeling picked in the hero
  situation     text,                        -- last situation chip
  source        text,                        -- hero | gita-for/<slug> | verse page …
  created_at    timestamptz not null default now(),
  last_seen_at  timestamptz not null default now()
);

create table if not exists public.web_subscriptions (
  razorpay_subscription_id text primary key,
  uid           text not null,
  email         text,
  status        text not null,               -- created | authenticated | active | pending | halted | cancelled | completed
  current_end   timestamptz,                 -- end of the paid week
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists web_subscriptions_uid_idx on public.web_subscriptions (uid, updated_at desc);

alter table public.web_users enable row level security;
alter table public.web_subscriptions enable row level security;
