import sys, os, re
os.chdir(sys.argv[1])
p='05-copy.md'; s=open(p).read()
a=s.index('## hero'); b=s.index('## three-notes')
s=s[:a]+'''## hero
Revised 19 Oct, 23:00, on Ankur's Gate 2 feedback. The old hero had up to 9 tap targets and the vague line "what you're going through". Rules applied from the copywriting skill: one primary action above the fold; subheadline of 1–2 specific sentences; customer language; a CTA that names what they get.

Headline options:
1. **The Bhagavad Gita, tuned to your life.** ← chosen. Same line as the App Store and reels, so the message matches wherever people arrive from. The subtitle supplies the specifics.
2. Can't stop overthinking? Krishna answered that. (Specific, but covers one pain only.)
3. One verse from the Gita for the thing keeping you up tonight. (Specific, but long.)

- H1: The Bhagavad Gita, tuned to your life.
- Sub: Tell us what's keeping you up. Get the verse Krishna said about it, in Sanskrit and plain English.
- Button: Find my verse
- Under the button: Free. One question, about 30 seconds.
- After the tap (replaces the sub), the question: What's keeping you up?
- Answers (one tap, no second button): Overthinking / Waiting on a result / My boss / A breakup / Family or in-laws / Someone I lost / Everyone's ahead of me / Can't sleep / Far from home / Something else
- Gate: Sign in with Google to see your verse. / It's free. We don't post anything or send you marketing email.
- Removed from the hero: the eyebrow pill, the feeling row, "Just want to read? Start at 1.1", हिंदी में पढ़ें, Verse of the day. The reader path moves to a "Read the Gita" link in the mobile nav bar.

'''+s[b:]
s=s.replace("- H2: What Krishna said about the thing on your mind.","- H2: What Krishna said about overthinking, grief, failure and anger.")
s=s.replace("- H2: Tonight, take one verse with you.\n- Line: Pick what's on your mind. It takes under a minute.\n- Buttons: Find my verse · Start reading at 1.1","- H2: What's keeping you up tonight?\n- Line: One question. One verse from the Gita for it, in Sanskrit and plain English.\n- Button: Find my verse")
open(p,'w').write(s)
p='GATE-2.md'; s=open(p).read()
if 'Revision 1' not in s:
    s+='''
## Revision 1 (19 Oct, 23:00): Ankur's feedback
- "The user is confused": 4–9 buttons in the hero → exactly 1 (verified: the only tappable element in the hero is "Find my verse").
- "'What you're going through' is vague" → the headline is the app's line, "The Bhagavad Gita, tuned to your life"; the subtitle and question use the ICP's words ("keeping you up", "waiting on a result", "my boss", "a breakup").
- "Subtitle too long": 41 words → 17.
- Watch in Mixpanel: the hero used to send ~45% of clickers to 1.1. That path is now the mobile-nav "Read the Gita" link. Compare reader starts week over week.
'''
    open(p,'w').write(s)
print('lp patched')
