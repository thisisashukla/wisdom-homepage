"""p8: pipeline records for the plan preview (Revision 4). Idempotent. Usage: python3 p8_lp_docs.py <repo root>"""
import os, sys
R = sys.argv[1]
L = lambda f: os.path.join(R, 'lp', f)

def sub(path, old, new):
    s = open(path, encoding='utf-8').read()
    if new in s:
        return
    assert old in s, f'{path}: missing {old[:60]!r}'
    open(path, 'w', encoding='utf-8').write(s.replace(old, new, 1))
    print('edited', path)

# 04-structure
sub(L('04-structure.md'),
    '| three-notes | Show the tuning is real, not canned | Guide: authority | AI slop; "generic quotes" | — | Unedited backend output for 2.47 | No | 120 + 3 cards | Notes and replies as cards (real text) |',
    '| plan-preview | Let them see the week they would get, then create theirs | Guide: authority + plan | AI slop; "generic quotes"; "what is a plan?" | — | Four real week-1 plans, shown as returned | Create my 7-day Gita plan (hands the situation to the hero) | 40 + data | Tabbed card: Day 1 open, days 2–7 on a thread |')
sub(L('04-structure.md'),
    '- **"Wisdom for iPhone" three-card block**',
    '- **three-notes** (19 Oct, Revision 4): about 250 words of strangers\' notes about one verse. It argued "tuned" instead of showing it, and had no action. Replaced by plan-preview: the visitor taps their own situation and sees the real week, which is the thing the button creates.\n- **"Wisdom for iPhone" three-card block**')

# 05-copy
C = L('05-copy.md')
sub(C, '- Sub: Seven verses from the Gita, picked for your situation and explained for your life. One a day.',
       '- Sub: Seven verses picked for your situation, starting with the Gita. Each one explained for your life.')
sub(C, '- Answers (one tap, no second button): Overthinking / Waiting on a result / My boss / A breakup / Family or in-laws',
       "- Answers (one tap, no second button): Overthinking / It didn't work out / My boss / My relationship / Family or in-laws")
sub(C, 'Day 7 is a story from the Gita, the Ramayana or the Mahabharata.',
       'Day 7 is a story from the Ramayana, the Mahabharata or the Yoga Vasishtha.')
s = open(C, encoding='utf-8').read()
if '## plan-preview' not in s:
    a = s.index('## three-notes')
    b = s.index('## seven-days')
    s = s[:a] + """## plan-preview
- Eyebrow: Real plans
- H2: Pick one. See all seven days.
- Tabs: Overthinking / It didn't work out / My relationship / Someone I lost (same words as the hero's answers)
- [VISUAL: the selected plan, from frontend/src/lib/samplePlans.ts | Day 1 open (Sanskrit, line, "For you"), days 2–7 as phase · source · line on a gold thread, Day 7 the story | real backend output, never edited]
- Button: Create my 7-day Gita plan
- Under the button: Yours is made for what you tell it. Day 1 is free.
- Footnote: Real plans Wisdom made on 19 Oct 2026, one tap each, shown as returned. Day 1 is always from the Gita.

""" + s[b:]
    open(C, 'w', encoding='utf-8').write(s)
    print('edited', C)

# GATE-2
G = L('GATE-2.md')
s = open(G, encoding='utf-8').read()
if '## Revision 4' not in s:
    s = s.rstrip('\n') + """

## Revision 4 (19 Oct): section 2
- Ankur: "it is full of text and any user would skip over it." What engages the ICP after the hero is seeing their own situation answered; what we want is for them to create a plan. The intersection is the plan itself: pick a situation, see the real 7-day week, create yours.
- three-notes (about 250 words) → plan-preview (about 40 words of our copy; the rest is the product's own output). The button hands the tab's situation to the hero widget, so one tap goes straight to Day 1 (or the Google gate off iPhone).
- Correction found while building it: the plan is not seven Gita verses. Day 1 is always from the Gita (a hard rule in backend/ai/planner.py); days 2–7 draw on the Upanishads, Yoga Vasishtha, Ramayana and other texts, at most two per text. Subtitle, meta description, the CTA block (English and Hindi) and the share text now say "starting with the Gita". The button keeps "Gita plan": the plan opens with the Gita and follows its arc.
- The hero answers now match what the backend plans for: "Waiting on a result" was planned as something that failed ("It didn't work out"); "A breakup" was planned as a relationship ("My relationship"). The echo after Day 1 uses a phrase per answer ("A 7-day plan for someone you lost"), fixing "someone i lost".
- Lines in the preview are never truncated, to keep the sources section's promise.
"""
    open(G, 'w', encoding='utf-8').write(s)
    print('edited', G)

# copy_check: tab labels are a list, not a sentence
sub(L('scripts/copy_check.py'),
    'SKIP = {"Headline options", "Tiles",',
    'SKIP = {"Headline options", "Tiles", "Tabs",')
print('p8 done')
