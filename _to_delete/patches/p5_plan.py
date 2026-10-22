import sys, os, re
root = sys.argv[1]
def edit(path, pairs):
    p = os.path.join(root, path); s = open(p).read()
    for a, b in pairs:
        if a not in s and b in s:
            continue
        assert a in s, f"{path}: {a[:70]}"
        s = s.replace(a, b)
    open(p, 'w').write(s)

CTA = 'Start my reading plan'
edit('frontend/src/app/page.tsx', [
  ('Tell us what&apos;s keeping you up. Get the verse Krishna said about it, in Sanskrit and plain English.',
   'Tell us what&apos;s on your mind. Get a 7-day reading plan from the Gita for it: one verse a day, in Sanskrit and plain English.'),
  ('"The Bhagavad Gita verse for what you\'re going through"', '"The Bhagavad Gita, tuned to your life"'),
  ("Or tell us what you're going through and get the verse that speaks to it.\"",
   "Or get a 7-day reading plan from the Gita for what's on your mind.\""),
  ('data-mp-location="home_notes_find_verse">Find my verse</a>', f'data-mp-location="home_notes_find_verse">{CTA}</a>'),
  ('data-mp-location="home_app_section_web_plan">Find my verse</a>', f'data-mp-location="home_app_section_web_plan">{CTA}</a>'),
  ('data-mp-location="final_cta_find_verse">Find my verse</a>', f'data-mp-location="final_cta_find_verse">{CTA}</a>'),
  ('<div className="eyebrow">After your verse</div>', '<div className="eyebrow">Your reading plan</div>'),
  ('<h2 className="heading">Then, one verse a day <em>for a week.</em></h2>', '<h2 className="heading">How the <em>seven days</em> work.</h2>'),
  ("<h2>What&apos;s keeping you <em>up tonight?</em></h2>", "<h2>Start with <em>Day 1, free.</em></h2>"),
  ("<p>One question. One verse from the Gita for it, in Sanskrit and plain English.</p>",
   "<p>Tell us what&apos;s on your mind. Your first verse is ready in about 30 seconds.</p>"),
  ("    q: 'How does Wisdom pick a verse for me?',\n    a: \"You pick how you feel and, if you like, what it's about. Wisdom matches that against a library of 1,743 verses from the Gita, Ramayana, Mahabharata and Upanishads, and shows the one that speaks to it, with the Sanskrit. On Android and computers you sign in with Google first; on iPhone it opens straight away.\",",
   "    q: 'How does the reading plan work?',\n    a: \"You tell us what's on your mind in one tap. Wisdom picks seven verses for it from a library of 1,743 across the Gita, Ramayana, Mahabharata and Upanishads: one a day, each with the Sanskrit and what it means for you. Day 1 opens straight away and is free. On iPhone the rest of week 1 is free in the app; on Android and computers it's ₹89 a week, and you sign in with Google first.\","),
])
edit('frontend/src/lib/homeSchemas.ts', [
  ("name: 'How does Wisdom pick a verse for me?',", "name: 'How does the Wisdom reading plan work?',"),
])
p = os.path.join(root, 'frontend/src/lib/homeSchemas.ts'); s = open(p).read()
s = re.sub(r"(name: 'How does the Wisdom reading plan work\?',\n\s*acceptedAnswer: \{ '@type': 'Answer', text: )(['\"]).*?\2( \})",
           lambda m: m.group(1) + repr("You tell us what's on your mind in one tap. Wisdom picks seven verses for it from a library of 1,743 across the Gita, Ramayana, Mahabharata and Upanishads: one a day, each with the Sanskrit and what it means for you. Day 1 is free. On iPhone the rest of week 1 is free in the app; on Android and computers it is ₹89 a week.") + m.group(3), s, flags=re.S)
open(p, 'w').write(s)

edit('frontend/src/components/funnel/YourVerse.tsx', [
  ("            Find my verse\n          </button>\n          <p className=\"yv-fine yv-intro-fine\">Free. One question, about 30 seconds.</p>",
   f"            {CTA}\n          </button>\n          <p className=\"yv-fine yv-intro-fine\">Day 1 is free. One question, about 30 seconds.</p>"),
  ("<p className=\"yv-q\" id={`yv-q-${source}`}>What&apos;s keeping you up?</p>", "<p className=\"yv-q\" id={`yv-q-${source}`}>What&apos;s on your mind?</p>"),
  ("              <div className=\"yv-card-ref\">\n                {verse.ref}", "              <div className=\"yv-card-ref\">\n                {verse.id === result.hook?.id ? 'Day 1 · ' : ''}{verse.ref}"),
  ("?? 'what is keeping you up').toLowerCase()", "?? 'what is on your mind').toLowerCase()"),
  ("Find the Gita verse for what you're going through: ${url}", "Get a 7-day Gita reading plan for what's on your mind: ${url}"),
  ("Finding your verse<span", "Building your plan<span"),
])
edit('frontend/src/components/funnel/GetAppButton.tsx', [("{ios ? 'Get the app' : 'Find my verse'}", "{ios ? 'Get the app' : 'Start my plan'}")])
edit('frontend/src/components/MobileNavToggle.tsx', [("{ href: '/#your-verse', label: 'Find my verse' },", "{ href: '/#your-verse', label: 'Start my reading plan' },")])
edit('frontend/src/components/funnel/VerseFunnelCTA.tsx', [
  ("verseHead: (c: number, v: number) => `Is ${c}.${v} about you? Find the verse for what you're going through.`,",
   "verseHead: (c: number, v: number) => `Is ${c}.${v} speaking to something in your life? Get a 7-day reading plan for it.`,"),
  ("head: \"Find the Gita verse for what you're going through.\",", "head: \"Get a 7-day Gita reading plan for what's on your mind.\","),
  ("sub: \"Tap what's on your mind and read the verse that speaks to it, in Sanskrit and plain English.\",", "sub: 'One verse a day, in Sanskrit and plain English. Day 1 is free.',"),
  ("cta: 'Find my verse',", f"cta: '{CTA}',"),
  ("verseHead: (c: number, v: number) => `क्या ${c}.${v} आपके बारे में है? अपनी स्थिति के लिए श्लोक पाएं।`,", "verseHead: (c: number, v: number) => `क्या ${c}.${v} आपके जीवन की किसी बात से जुड़ता है? उसके लिए 7 दिन की पठन योजना पाएं।`,"),
  ("head: 'आज आप जिस बात से गुज़र रहे हैं, उसके लिए गीता का श्लोक पाएं।',", "head: 'आपके मन की बात के लिए गीता की 7 दिन की पठन योजना।',"),
  ("sub: 'बताइए आप कैसा महसूस कर रहे हैं। आपके जीवन के लिए चुना गया एक श्लोक, संस्कृत और अर्थ के साथ।',", "sub: 'रोज़ एक श्लोक, संस्कृत और सरल अर्थ के साथ। पहला दिन मुफ़्त।',"),
  ("cta: 'मेरा श्लोक दिखाएं →',", "cta: 'मेरी पठन योजना शुरू करें',"),
])
edit('frontend/src/components/gita/GitaAppCTA.tsx', [('funnel block: "Find my verse" for everyone', 'funnel block: "Start my reading plan" for everyone')])
edit('frontend/src/app/gita-for/page.tsx', [('<h2 className="heading">Get the verse for <em>your</em> situation.</h2>', '<h2 className="heading">Get a 7-day reading plan for <em>your</em> situation.</h2>')])
edit('frontend/src/app/gita-for/[slug]/page.tsx', [('<h2 className="heading">Get the verse for <em>your</em> {page.label.toLowerCase()}.</h2>', '<h2 className="heading">A 7-day reading plan for <em>your</em> {page.label.toLowerCase()}.</h2>')])
edit('frontend/src/lib/app.ts', [(' * The one question the website asks ("What\'s keeping you up?"), in the', ' * The one question the website asks ("What\'s on your mind?"), in the')])

# lp source of truth
p = os.path.join(root, 'lp/05-copy.md'); s = open(p).read()
s = s.replace("- Sub: Tell us what's keeping you up. Get the verse Krishna said about it, in Sanskrit and plain English.",
              "- Sub: Tell us what's on your mind. Get a 7-day reading plan from the Gita for it: one verse a day, in Sanskrit and plain English.")
s = s.replace("- Button: Find my verse\n- Under the button: Free. One question, about 30 seconds.\n- After the tap (replaces the sub), the question: What's keeping you up?",
              "- Button: Start my reading plan\n- Under the button: Day 1 is free. One question, about 30 seconds.\n- After the tap (replaces the sub), the question: What's on your mind?\n- Revealed verse is labelled \"Day 1\" so it matches the promise.")
s = s.replace("- H2: What's keeping you up tonight?\n- Line: One question. One verse from the Gita for it, in Sanskrit and plain English.\n- Button: Find my verse",
              "- H2: Start with Day 1, free.\n- Line: Tell us what's on your mind. Your first verse is ready in about 30 seconds.\n- Button: Start my reading plan")
s = s.replace("- Eyebrow: After your verse\n- H2: Then, one verse a day for a week.", "- Eyebrow: Your reading plan\n- H2: How the seven days work.")
s = s.replace("- Link: Find my verse", "- Link: Start my reading plan")
s = s.replace("Button: Find my verse", "Button: Start my reading plan")
s = s.replace("2. How does Wisdom pick a verse for me? You pick how you feel and, if you like, what it's about. Wisdom matches that against a library of 1,743 verses from the Gita, Ramayana, Mahabharata and Upanishads, and shows the one that speaks to it, with the Sanskrit. On Android and computers you sign in with Google first; on iPhone it opens straight away.",
              "2. How does the reading plan work? You tell us what's on your mind in one tap. Wisdom picks seven verses for it from a library of 1,743 across the Gita, Ramayana, Mahabharata and Upanishads: one a day, each with the Sanskrit and what it means for you. Day 1 opens straight away and is free. On iPhone the rest of week 1 is free in the app; on Android and computers it's ₹89 a week, and you sign in with Google first.")
open(p, 'w').write(s)
p = os.path.join(root, 'lp/02-brand-voice.md'); s = open(p).read()
s = s.replace("| **CTA: direct** | **Find my verse** (identical everywhere) |", "| **CTA: direct** | **Start my reading plan** (identical everywhere; nav: \"Start my plan\") |")
open(p, 'w').write(s)
p = os.path.join(root, 'lp/GATE-2.md'); s = open(p).read()
if 'Revision 2' not in s:
    s += '''
## Revision 2 (19 Oct, 23:16): Ankur's feedback
- "Keeping you up" assumed night-time distress → "what's on your mind", which holds at any hour.
- The offer is a 7-day reading plan, not a single verse. Subtitle, button, closing band, the CTA block on other pages and the FAQ all now promise the plan. The revealed verse is labelled "Day 1".
- Button: "Find my verse" → "Start my reading plan" (action + what they get). The line under it, "Day 1 is free", is true on every device.
'''
    open(p, 'w').write(s)
print('p5 done')
