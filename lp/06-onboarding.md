# 06 · /start: the app's onboarding on the web

Source of truth for the copy is the Wisdom app (wisdom/app/screens/onboarding, branch v3). This page records the web flow and where it differs. Code: `frontend/src/components/onboarding/`, `frontend/src/app/start/`, `frontend/src/app/api/start/`.

## Who gets it
- iPhone: every "Create my 7-day Gita plan" opens the App Store (`CreatePlanLink`, `lib/app.ts → startUrl`).
- Android and computers: `/start` (noindex). `?s=<situation>` from the plan preview presets the feeling and sends the situation to the backend; `?ref=` records where they came from.

## Screens (copy as in the app unless marked web)
1. Splash: logo on the yellow field with three ripples, flies to its place. "One Gita verse a day, / tuned to your life." "Chosen for what's on your mind." Deck: Morning / Afternoon / Tonight worries struck through by the lotus, answered by 18.66, 2.47, 6.5. "Get started" · "I already have an account" (web: Google sign-in, then the questions).
2. "How old / are you?" "Every age has its own light." Five ages, paired portraits.
3. "Where are you / in life?" "Pick all that fit." Stages offered for the age.
4. "How much of your day / is on your phone?" "A rough guess is fine." Slider 1–12+, starts at 2.
5. "How are you feeling / today?" "Choose the one that feels truest right now." Restless, Stuck, Uneasy, Determined, Searching, Curious.
6. "Say it / in your own words." "Optional. The way you'd tell a friend." Example notes for this feeling × age × stage; mic (web: Web Speech API where the browser has it, else "Voice isn't available in this browser yet. Type it instead."); "Type it instead"; "Show me my verses".
7. Web: "Keep what / you've begun" "Sign in so your seven days stay yours." Rows: Your plan, and every verse you uncover · What you said, used once to choose your verses · Day 1 is free. No card to see it. "Continue with Google". "We don't post anything or send you marketing email." Skipped if already signed in.
8. "Finding / your verse." "Everything you shared is shaping this." Analysing your situation · Sifting 5,000 years of wisdom · Choosing your verse. "Show my verse" / "Try again". Safety lines shown as a sheet when the backend flags risk.
9. Verse headline from stage + feeling ("Working hard, / and a restless mind"); "We found a verse for exactly what you shared." Sand: "Brush away the sand / your verse is underneath". "What's really going on". "Show me my plan". (App plays a narration here; the web has no audio yet.)
10. "Your next / seven days" "One verse each morning: see it, steady it, act on it. On Day 7, a story ties it together." Week chip, timeline, seals. Web button: "Get all seven days" (app: "Notify me on Day 2").
11. Web paywall: "Get a plan / for your week". Day strip, "Day 1 is yours. Six more days are ready." Tile: Weekly ₹89 a week, "Cancel anytime". "Get all seven days". "₹89 a week. Your bank tells you before every charge. Cancel from your plan in one tap." Terms · Privacy · Maybe later → "Stop at / Day 1?" sheet: "Keep going" / "Stop at Day 1".
12. Web: the week. Paid: "Your seven / days", every day opens to its Sanskrit, what it says and what it says to them. Not paid: "Your first / day" with the button to get the rest.

## Data
- `/api/start/hook` (signed in): answers + note → `/recommend/hook`. The note is passed once, never stored.
- `/api/start/week` (signed in): `/recommend/plan` week 1 with the understanding and hook id. Returns Day 1 and a six-word glimpse of each later day, plus the full week sealed to the uid (`lib/server/seal.ts`, key `WEB_PLAN_SEAL_KEY`).
- `/api/start/unseal` (signed in, active ₹89 subscription or `WEB_PLAN_FREE=1`): opens it.
- The flow state lives in the browser (`localStorage: wisdom_start_v1`), so a returning visitor lands where they were.

## Events (Mixpanel)
Onboarding Viewed · Onboarding Step Completed {step, next, …answers} · Onboarding Signin Started/Completed · Verses Generated · Purchase Started/Completed/Cancelled (existing) · Onboarding Completed {outcome: day_1_only}.
