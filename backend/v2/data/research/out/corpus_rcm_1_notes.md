# corpus_rcm_1 notes (Ramcharitmanas, Bal Kand + Ayodhya Kand, 59 verses)

All 59 entries are filled. Every entry has 2 to 5 commentaries with a source URL (59 of 59 have 2 or more).
The first 44 (Bal Kand) are from the previous agent; I kept them and only added `not_for` to five that lacked it
(1.26.chaupai.1, 1.26.doha.1, 1.72.chaupai.1, 1.109.chaupai.5, 1.113.chaupai.1). I wrote the 15 Ayodhya Kand entries (2.11 to 2.99).

## Sources used
- **Manas Piyush** (Gita Press, the large compilation of Ramcharitmanas tikas: Pt. Ramkumar, Baijnath, Vijayanand Tripathi,
  Manas Mayank, Paramahamsa/Prajnananand, Panjabiji, Vinayaki tika and others). Archive.org OCR, vols 1-4
  (gp0087 to gp0090). Ayodhya Kand is vol. 4: https://archive.org/details/gp0090-manas-piyush-part-4
- **Growse**, *The Ramayana of Tulsi Das* (1883; 6th ed.), public domain, archive.org in.ernet.dli.2015.125813. Used to cross-check translations.
- Gita Press-numbered Awadhi text (hindu-devotional-texts on unpkg, from the public-domain WirelessAlien dataset). Used for numbering.
- I did not use the IIT Kanpur Gita Supersite: it blocks AI agents.

## Data errors

### 1. Most of our Ramcharitmanas references are not Gita Press numbers (systemic)
49 of the 59 ids and `ref_label`s do not match Gita Press doha numbering. Only 10 match (8 Bal Kand, 2 Ayodhya Kand).
- **Bal Kand:** the gap grows through the book. It goes from +2 (1.19 → 21, 1.26 → 28) to +4 (1.54 → 58, 1.76 → 80),
  then +7 (1.109.5 → 116.1), +12 (1.180 → 192) and +20 (1.318 → 338). These match Gita Press:
  1.1 sortha 4, 1.3.4, 1.3.5, 1.6 doha, 1.8.1, 1.8.6, 1.8.7 and 1.15.2.
- **Ayodhya Kand:** the gap is 0 to 3. Matches: 2.42.1 and 2.42 doha. Off by one: 2.11 → 10, 2.23 → 22, 2.50 → 51,
  2.54 → 55, 2.55 → 56, 2.56 → 57, 2.67 → 68, 2.73 → 74, 2.74 → 75. Off by two or three: 2.90 → 92, 2.91 → 93,
  2.93 → 95, 2.99 → 102.
- **Likely cause:** in Ayodhya Kand our numbers match Growse's doha headings: Doha 50 (elephant), 55 (Kausalya),
  67, 73 (Sumitra), 90 (Lakshman Gita), 93 (Sumantra) and 99 (Kevat). The data was probably keyed to Growse or another
  non-Gita Press edition. In Bal Kand our numbers don't match Growse either (Growse calls 1.6 "Doha 7"), so that source is unclear.
- **Fix:** renumber all rcm ids/labels to Gita Press. Each entry's `verified_ref` gives the correct number.
  Users who look a verse up in a Gita Press Manas will not find it at our number.
- 2.11.chaupai.3 actually covers Gita Press 10, half-lines 5-8 (two chaupais). 1.247.chaupai.1 covers 261.1-2.
  1.74.chaupai.3 covers 78.3-4. 1.26.doha.1 is 28 (क). 1.54.sortha.1 is 57 (ख). 1.153.sortha.1 is 161 (ख).

### 2. Text and setting errors
- **rcm.2.42.doha.1:** our Awadhi text reads "सहज **सकल**". Gita Press, Manas Piyush and the dataset all read "सहज **सरल**".
  Our translation already follows सरल, so fix only the text.
- **rcm.2.67.chaupai.4:** the setting says Ram, Sita *and Lakshman* take leave. Lakshman is not in this scene (he is with Sumitra at 74-75).
  The "lovely pair" Kausalya means is Ram and Sita.
- **rcm.2.93.chaupai.3:** it is attached to prasang `rcm.p.nishad_lakshman`, but the verse is Ram talking to Sumantra the next morning.
  It needs its own prasang (Sumantra sent back).
- **rcm.2.56.chaupai.1:** prasang is null. It belongs with `rcm.p.ram_kausalya`.
- **rcm.2.11.chaupai.3:** the last line is Tulsidas's own prayer, not Ram's thought. Our translation marks this correctly.
  Keep it that way in readings.
- **Earlier entries:** 1.15.chaupai.2 is Tulsidas speaking, with Shiva and Parvati as the ones he bows to, not listeners.
  1.196.chaupai.3's setting ("late in life") comes from the wider story, not this verse.

### 3. Translation shades for the writer
These are not errors.
- **2.55 doha:** "झूठ सनेहु" has two readings. Ours is "I won't insist out of false affection". Several Manas Piyush commentators
  read it as self-reproach: "my love must be false since I still live".
- **2.56.1:** "गोसाईं" may name Narayan as a protector rather than address Ram (Vijayanand Tripathi, whom Manas Piyush prefers).
- **2.11 last line:** Growse renders कुटिलाई as "unworthy suspicion". Most tikas read it as crookedness or selfishness.

## Weak sources
- All 59 entries rest mainly on one compilation, Manas Piyush, whose many named tikakars give the range of views.
  Growse is the independent cross-check for most Ayodhya entries. No modern scholarly English commentary was used.
- 1.262.chaupai.1 has only two commentary notes specific to the line.
- I read the Manas Piyush OCR as Hindi text. The OCR is noisy in places, but the passages cited were legible.

## Cautions for an editor
- **2.90.2 and 2.91.1 (Lakshman Gita):** "no one gives you joy or sorrow; you live out your own karma". This can read as victim-blaming
  to someone who was abused or assaulted, or who was bereaved through someone else's fault. Never pair it with those plans or with fresh grief.
  The dream metaphor ("all is a dream") can feel dismissive of real loss.
- **2.67.4 and 2.56.1:** a mother's fear of dying before the reunion, with the "fish without water" image. Dasharath does die.
  Avoid for readers whose parent died while they were away.
- **2.93.3:** the next line says disgrace is worse than a million deaths. Don't quote it for readers dealing with shame or suicidal thoughts.
- **2.42.1 and 2.50 doha:** "losing the throne felt like freedom". This can sound like toxic positivity after a forced job loss or eviction.
- **2.99.3 (Kevat):** "paid in full without money". Don't frame it as refusing wages. It would land badly for underpaid workers.
- **Bal Kand, carried over from the earlier entries:**
  - Self-harm and eating-disorder risks: 1.70 doha and 1.76.3 (extreme fasting, "let the body go but not the resolve").
  - Sati's self-immolation: in the background of 1.54-1.72.
  - Infant and mother imagery, which can hurt readers facing infertility or loss: 1.180 chhand and 1.186 doha.
  - "Regret is useless": 1.247.1, harsh for anyone who arrived too late for a death.
  - Misogynistic framing next to 1.54.1 ("women by nature foolish", in doha 57 क).
- **Grief plans:** none of these verses is in a plan yet (`used_in` is empty). If any goes into a grief plan, keep 2.90.2 and 2.91.1
  off Day 1. 2.55 doha (blessing a child's leaving) and 1.318.3 (Janaka weeps at Sita's departure) are the gentlest
  choices for "letting go" plans.
