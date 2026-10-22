import sys, os
root = sys.argv[1]
def edit(path, pairs):
    p = os.path.join(root, path); s = open(p).read()
    for a, b in pairs:
        if a not in s and b in s:
            continue
        assert a in s, f"{path}: {a[:80]}"
        s = s.replace(a, b)
    open(p, 'w').write(s)
OLD = 'Start my reading plan'; CTA = 'Create my 7-day Gita plan'
SUB_OLD = 'Tell us what&apos;s on your mind. Get a 7-day reading plan from the Gita for it: one verse a day, in Sanskrit and plain English.'
SUB = 'Seven verses from the Gita, picked for your situation and explained for your life. One a day.'
p = os.path.join(root, 'frontend/src/app/page.tsx'); s = open(p).read()
s = s.replace(SUB_OLD, SUB).replace(f'>{OLD}</a>', f'>{CTA}</a>')
s = s.replace("<p>Tell us what&apos;s on your mind. Your first verse is ready in about 30 seconds.</p>",
              "<p>Pick what&apos;s weighing on you. Your first verse is ready in 30 seconds.</p>")
s = s.replace("Or get a 7-day reading plan from the Gita for what's on your mind.\"",
              "Or get seven Gita verses picked for your situation, one a day.\"")
s = s.replace("You tell us what's on your mind in one tap.", "You tell us what's weighing on you in one tap.")
open(p, 'w').write(s)
edit('frontend/src/lib/homeSchemas.ts', [("You tell us what's on your mind in one tap.", "You tell us what's weighing on you in one tap.")])
edit('frontend/src/components/funnel/GetAppButton.tsx', [("{ios ? 'Get the app' : 'Start my plan'}", "{ios ? 'Get the app' : 'Create my plan'}")])
edit('frontend/src/components/MobileNavToggle.tsx', [(f"label: '{OLD}' }},", f"label: '{CTA}' }},")])
edit('frontend/src/components/funnel/VerseFunnelCTA.tsx', [
  ("verseHead: (c: number, v: number) => `Is ${c}.${v} speaking to something in your life? Get a 7-day reading plan for it.`,",
   "verseHead: (c: number, v: number) => `Is ${c}.${v} speaking to something in your life? Get seven verses picked for your situation.`,"),
  ("head: \"Get a 7-day Gita reading plan for what's on your mind.\",", "head: 'Seven Gita verses, picked for your situation and explained for your life.',"),
  ("sub: 'One verse a day, in Sanskrit and plain English. Day 1 is free.',", "sub: 'One a day, with the Sanskrit. Day 1 is free.',"),
  (f"cta: '{OLD}',", f"cta: '{CTA}',"),
  ("verseHead: (c: number, v: number) => `क्या ${c}.${v} आपके जीवन की किसी बात से जुड़ता है? उसके लिए 7 दिन की पठन योजना पाएं।`,",
   "verseHead: (c: number, v: number) => `क्या ${c}.${v} आपके जीवन की किसी बात से जुड़ता है? अपनी स्थिति के लिए चुने गए सात श्लोक पाएं।`,"),
  ("head: 'आपके मन की बात के लिए गीता की 7 दिन की पठन योजना।',", "head: 'गीता के सात श्लोक, आपकी स्थिति के लिए चुने और आपके जीवन के लिए समझाए गए।',"),
  ("sub: 'रोज़ एक श्लोक, संस्कृत और सरल अर्थ के साथ। पहला दिन मुफ़्त।',", "sub: 'रोज़ एक, संस्कृत के साथ। पहला दिन मुफ़्त।',"),
  ("cta: 'मेरी पठन योजना शुरू करें',", "cta: 'मेरी 7 दिन की गीता योजना बनाएं',"),
])
edit('frontend/src/components/gita/GitaAppCTA.tsx', [(f'"{OLD}" for everyone', f'"{CTA}" for everyone')])
edit('frontend/src/lib/app.ts', [(' * The one question the website asks ("What\'s on your mind?"), in the', ' * The one question the website asks ("What\'s weighing on you?"), in the')])
edit('frontend/src/app/gita-for/page.tsx', [('<h2 className="heading">Get a 7-day reading plan for <em>your</em> situation.</h2>', '<h2 className="heading">Seven verses, picked for <em>your</em> situation.</h2>')])
edit('frontend/src/app/gita-for/[slug]/page.tsx', [('<h2 className="heading">A 7-day reading plan for <em>your</em> {page.label.toLowerCase()}.</h2>', '<h2 className="heading">Seven verses, picked for <em>your</em> {page.label.toLowerCase()}.</h2>')])

p = os.path.join(root, 'lp/05-copy.md'); s = open(p).read()
s = s.replace("- Sub: Tell us what's on your mind. Get a 7-day reading plan from the Gita for it: one verse a day, in Sanskrit and plain English.", "- Sub: Seven verses from the Gita, picked for your situation and explained for your life. One a day.")
s = s.replace(f"- Button: {OLD}\n- Under the button: Day 1 is free. One question, about 30 seconds.\n- After the tap (replaces the sub), the question: What's on your mind?",
              f"- Button: {CTA}\n- Under the button: Day 1 is free. One question, 30 seconds.\n- After the tap (replaces the sub), the question: What's weighing on you?")
s = s.replace("- Line: Tell us what's on your mind. Your first verse is ready in about 30 seconds.", "- Line: Pick what's weighing on you. Your first verse is ready in 30 seconds.")
s = s.replace(OLD, CTA).replace("You tell us what's on your mind in one tap.", "You tell us what's weighing on you in one tap.")
open(p, 'w').write(s)
p = os.path.join(root, 'lp/02-brand-voice.md'); s = open(p).read()
s = s.replace(f"| **CTA: direct** | **{OLD}** (identical everywhere; nav: \"Start my plan\") |", f"| **CTA: direct** | **{CTA}** (identical everywhere; nav: \"Create my plan\") |")
open(p, 'w').write(s)
p = os.path.join(root, 'lp/GATE-2.md'); s = open(p).read()
if 'Revision 3' not in s:
    s += f'''
## Revision 3 (19 Oct, 23:27): Ankur's feedback
- Subtitle → "Seven verses from the Gita, picked for your situation and explained for your life. One a day." It spells out what "tuned" means (picked for your situation, explained for your life) and leads with the outcome, not an instruction.
  - Also considered: B, "Your boss, a breakup, a result you're waiting on. Seven Gita verses for it, explained for your life." (too narrow); C, "Your situation in. Seven Gita verses out, one a day, explained for your life." (reads like a spec).
- Button → "{CTA}" (Ankur's "create" direction, made specific). Nav: "Create my plan".
- The question after the tap → "What's weighing on you?"
'''
    open(p, 'w').write(s)
print('p6 done')
