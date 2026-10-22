# Gate 2: copy

Status: run once on Ankur's instruction. 05-copy.md is the source of truth, and the implementation must match it (checked with scripts/copy_check.py). Points to confirm:
1. H1: "The Bhagavad Gita verse for what you're going through." (Alternative #2, "Can't stop overthinking?…", scored higher but narrows the page to one pain.)
2. The three-notes section shows real, unedited backend output for three test notes, labelled as such.
3. Price language: "Your bank tells you before every charge." This relies on RBI e-mandate pre-debit notices; confirm Razorpay subscriptions are set up as an e-mandate.
4. Tele-MANAS 14416 appears in the FAQ and the footer.

## Revision 1 (19 Oct, 23:00): Ankur's feedback
- "The user is confused": 4–9 buttons in the hero → exactly 1 (verified: the only tappable element in the hero is "Find my verse").
- "'What you're going through' is vague" → the headline is the app's line, "The Bhagavad Gita, tuned to your life"; the subtitle and question use the ICP's words ("keeping you up", "waiting on a result", "my boss", "a breakup").
- "Subtitle too long": 41 words → 17.
- Watch in Mixpanel: the hero used to send ~45% of clickers to 1.1. That path is now the mobile-nav "Read the Gita" link. Compare reader starts week over week.

## Revision 2 (19 Oct, 23:16): Ankur's feedback
- "Keeping you up" assumed night-time distress → "what's on your mind", which holds at any hour.
- The offer is a 7-day reading plan, not a single verse. Subtitle, button, closing band, the CTA block on other pages and the FAQ all now promise the plan. The revealed verse is labelled "Day 1".
- Button: "Find my verse" → "Start my reading plan" (action + what they get). The line under it, "Day 1 is free", is true on every device.

## Revision 3 (19 Oct, 23:27): Ankur's feedback
- Subtitle → "Seven verses from the Gita, picked for your situation and explained for your life. One a day." It spells out what "tuned" means (picked for your situation, explained for your life) and leads with the outcome, not an instruction.
  - Also considered: B, "Your boss, a breakup, a result you're waiting on. Seven Gita verses for it, explained for your life." (too narrow); C, "Your situation in. Seven Gita verses out, one a day, explained for your life." (reads like a spec).
- Button → "Create my 7-day Gita plan" (Ankur's "create" direction, made specific). Nav: "Create my plan".
- The question after the tap → "What's weighing on you?"

## Revision 4 (19 Oct): section 2
- Ankur: "it is full of text and any user would skip over it." What engages the ICP after the hero is seeing their own situation answered; what we want is for them to create a plan. The intersection is the plan itself: pick a situation, see the real 7-day week, create yours.
- three-notes (about 250 words) → plan-preview (about 40 words of our copy; the rest is the product's own output). The button hands the tab's situation to the hero widget, so one tap goes straight to Day 1 (or the Google gate off iPhone).
- Correction found while building it: the plan is not seven Gita verses. Day 1 is always from the Gita (a hard rule in backend/ai/planner.py); days 2–7 draw on the Upanishads, Yoga Vasishtha, Ramayana and other texts, at most two per text. Subtitle, meta description, the CTA block (English and Hindi) and the share text now say "starting with the Gita". The button keeps "Gita plan": the plan opens with the Gita and follows its arc.
- The hero answers now match what the backend plans for: "Waiting on a result" was planned as something that failed ("It didn't work out"); "A breakup" was planned as a relationship ("My relationship"). The echo after Day 1 uses a phrase per answer ("A 7-day plan for someone you lost"), fixing "someone i lost".
- Lines in the preview are never truncated, to keep the sources section's promise.

## Revision 5 (19 Oct): section 3
- Ankur: "do the same for the next section." Same three questions.
- What it was saying: how the week is structured (now shown by plan-preview, so redundant), plus where to get it and the price (still needed).
- What engages the visitor after seeing a plan: "can I get this on my phone, and what's the catch?" The answer differs by device, and showing Lock Screen and audio to an Android visitor spends attention on things they can't have.
- What we want: the one action that fits their device.
- Intersection: one switch, preset to their device. One price, three facts, one button. The web side shows the note screen as it really looks, because writing in your own words is what the ₹89 buys.
- About 140 words of body copy → about 70, split across two panels, so a visitor reads about 35.
- The section keeps id="app" so existing #app links still land here. Mixpanel section name: home_seven_days → home_devices.

## Revision 6 (19–20 Oct): no sign-in on the homepage; the app's onboarding on the web
- Ankur: "do not put the google sign in on the homepage itself. when the user clicks on the create my plan button then take them to app download if they are ios or through a similar onboarding as the app if they are android or windows. use the same onboarding with same copy icons and animations… once onboarding is done ask them to sign up using google."
- Every "Create my 7-day Gita plan" on the site (hero, plan preview, devices, final band, nav, mobile menu, the block on verse/chapter/blog pages, /gita-for, /app) now goes to the App Store on iPhone and to /start everywhere else. The inline widget with its Google gate is gone from the homepage and /gita-for.
- /start ports wisdom v3's onboarding screen for screen: splash (logo field, ripples, the worry deck with the lotus strike) → age → stage → phone hours → feeling → say it in your own words (voice through the browser where it can, or typed) → Google sign-up ("Keep what you've begun") → finding your verse → the verse under sand → your next seven days → paywall (₹89 a week) → the week. Copy, icons (Phosphor, as in WIcon), portraits, springs and durations are the app's. See 06-onboarding.md.
- Where the web differs from the app, and why: sign-up sits after the questions and before the verse is chosen (the verse is chosen for the account, and the ₹89 week is tied to it); there is no notifications screen (no Lock Screen on the web), so the week's button reads "Get all seven days"; the paywall sells the week, not a trial.
- The week is built before payment so it can be shown, but only Day 1 and how each later day begins leave the server; the whole week comes back sealed to the user (AES-GCM, uid-bound) and opens after payment.
- Hero fine print: "One question, 30 seconds" was no longer true → "Day 1 is free. A few questions, about two minutes." Final band likewise.
