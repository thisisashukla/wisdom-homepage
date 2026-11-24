# corpus_rcm_2: notes for the editor (59 Ramcharitmanas verses)

## Sources used
- Manas Piyush (ed. Anjani Nandan Sharan, Gita Press), vol. 4 (Ayodhya) and vol. 5 (Aranya, Kishkindha), archive.org OCR text:
  - https://archive.org/download/gp0090-manas-piyush-part-4/Manas%20Piyush%204_djvu.txt
  - https://archive.org/download/gp0091-manas-piyush-part-5/Manas%20Piyush%205_djvu.txt
  These volumes print the verse and its Gita Press-style Hindi meaning, then notes from many named commentators (Pt. Ramkumar, Panjabi ji, Vaijnath, Pandeyji, Dinji, Gaud ji, Vijayanand Tripathi, Prajnananand Saraswati, Shila, Kharra, Nange Paramhans and others). Every `commentaries` item names the commentator as Manas Piyush reports them.
- Verse text and doha numbering check: the WirelessAlien Ramcharitmanas dataset as packaged on unpkg (hindu-devotional-texts@0.7.0, ayodhya/aranya/kishkindha-kand.js). Its segment numbers match Manas Piyush and Gita Press.
- Every verse has 2 to 4 commentaries (40 have 3, 10 have 4, 9 have 2).

## 1. Data errors

### A. Doha numbers are wrong on 58 of 59 verses (systematic)
Our ids and ref labels use a doha count that drifts away from the Gita Press / Manas Piyush numbering. The chaupai position inside each group is usually right. Only `rcm.3.2.sortha.1` matches. Correct references:

| our id | correct (Gita Press) |
|---|---|
| rcm.2.127.doha.1 | Ayodhya doha 131 |
| rcm.2.146.chaupai.3 | Ayodhya 150.3-4 (two chaupais) |
| rcm.2.159.chaupai.3 | Ayodhya 165.3 |
| rcm.2.165.chaupai.4 | Ayodhya 171.4 |
| rcm.2.165.doha.1 | Ayodhya doha 171 |
| rcm.2.170.chaupai.7 | Ayodhya 177.**3** (the chaupai number is wrong too) |
| rcm.2.176.chaupai.2 | Ayodhya 183.2 |
| rcm.2.185.chaupai.4 | Ayodhya 192.4 |
| rcm.2.196.doha.1 | Ayodhya doha 204 |
| rcm.2.197.chaupai.4 | Ayodhya 205.4 |
| rcm.2.198.doha.1 | Ayodhya doha 206 |
| rcm.2.204.chaupai.4 | Ayodhya 212.4 |
| rcm.2.211.chaupai.2 | Ayodhya 219.2 |
| rcm.2.212.chaupai.1 | Ayodhya 220.1 |
| rcm.2.222.chaupai.2 | Ayodhya 231.2 |
| rcm.2.225.chaupai.1 / .3 | Ayodhya 234.1 / 234.3 |
| rcm.2.235.chaupai.1 | Ayodhya 244.1 |
| rcm.2.235.chaupai.4 | Ayodhya 244.4 plus doha 244 |
| rcm.2.247.chaupai.1 | Ayodhya 258.1 |
| rcm.2.249.chaupai.4 | Ayodhya 260.4 |
| rcm.2.252.chaupai.3 | Ayodhya 263.3 |
| rcm.2.253.chaupai.1 | Ayodhya 264.1 |
| rcm.2.256.chaupai.2 | Ayodhya 267.2 |
| rcm.2.271.chaupai.3 | Ayodhya 283.3 |
| rcm.2.280.chaupai.4 | Ayodhya 293.4 |
| rcm.2.281.chaupai.1 | Ayodhya 294.1 |
| rcm.2.285.chaupai.1 | Ayodhya 298.1-4 (four chaupais) |
| rcm.2.285.doha.1 | Ayodhya doha 298 |
| rcm.2.286.chaupai.2 | Ayodhya 299.2 |
| rcm.2.287.chaupai.1 | Ayodhya 300.1 |
| rcm.2.290.doha.1 | Ayodhya doha 304 |
| rcm.2.292.chaupai.4 | Ayodhya 306.4 |
| rcm.2.293.chaupai.4 | Ayodhya 307.4 |
| rcm.2.301.doha.1 | Ayodhya doha 315 |
| rcm.2.310.chaupai.4 | Ayodhya 324.4 |
| rcm.3.2.sortha.1 | Aranya soratha 2 (correct) |
| rcm.3.7.chaupai.7 | Aranya 10.7 |
| rcm.3.13.chaupai.6 / doha.1 | Aranya 16.6 / doha 16 |
| rcm.3.26.doha.1 | Aranya doha 30 |
| rcm.3.27.chaupai.5 | Aranya 31.5 |
| rcm.3.29.chaupai.1 | Aranya 33.1 |
| rcm.3.31.chaupai.2 | Aranya 35.2 |
| rcm.3.32.chaupai.2 / .3 / .4 | Aranya 36.2 / 36.3 / 36.4 |
| rcm.3.34.doha.1 | Aranya doha 38 (ka) |
| rcm.3.35.chaupai.3 | Aranya 39.3 |
| rcm.3.38.chaupai.2 | Aranya 42.2-3 (two chaupais) |
| rcm.3.39.chaupai.2 | Aranya 43.2-3 (two chaupais) |
| rcm.3.39.chaupai.4 | Aranya 43.4-5 (two chaupais) |
| rcm.3.42.chaupai.1 | Aranya 46.1 |
| rcm.4.4.chaupai.1-4 | Kishkindha 3.1-4 |
| rcm.4.6.chaupai.4 | Kishkindha 5.4 |
| rcm.4.8.chaupai.1 | Kishkindha 7.1 |

The offset grows through Ayodhya (+4 to +14), is +3/+4 in Aranya and -1 in Kishkindha. The ids were probably built from a segment index, not the printed doha numbers. corpus_rcm_1 found the same drift in Bal Kand. Fix the ids and labels across the whole rcm family, not just this batch. 28 of our labels have no number at all ("Ramcharitmanas · Ayodhya Kand").

### B. Texts longer than the label says
`2.146.3`, `2.285.1` (four chaupais), `2.235.4` (chaupai plus doha), `3.38.2`, `3.39.2`, `3.39.4` each cover more than one chaupai.

### C. Translation problems
- **rcm.3.35.chaupai.3**: the translation covers only the first line. The second line ("then the Lord went to the shore of Pampa lake, lovely and deep") is narration that starts the next scene. Drop it from the text or translate it. (translation_ok = false)
- **rcm.4.8.chaupai.1**: "commit a grave wrong just by being seen" reverses the sense. The line means that even to *look at* someone unmoved by a friend's pain is a grave wrong. (translation_ok = false)
- **rcm.2.287.chaupai.1**: the translation says "against your will" but the setting says "against his father's order". Manas Piyush ties 'rajayasu' to "the Lord's and father's words" (298.5). Make the two agree.
- **rcm.2.310.chaupai.4**: the translation misses the point of the image (bees are said not to settle on champak flowers). Pt. Ramkumar applies the "vomit" simile to other devotees, not to Bharat and Ayodhya's wealth, which is Ram's.
- **rcm.2.235.chaupai.4**: it is Ram's mind that is "soaked in devotion" to Kaikeyi as mother, not her mind that he soothes.

### D. Wrong prasang, setting or speaker
- **rcm.2.222.chaupai.2**: prasang is `rcm.p.dasharath_promise` (Kaikeyi's boons). It belongs to Lakshman's anger at Bharat's approach to Chitrakoot.
- rcm.2.197.chaupai.4: Manas Piyush names the voice from mid-Triveni as Saraswati.
- rcm.3.2.sortha.1, 3.7.7, 3.29.1, 4.4.3: the narrative voice in the Manas frame is Shiva to Parvati, not "Tulsidas to the reader". Minor.
- rcm.4.8.chaupai.1: the fire oath was two dohas earlier (Kishkindha 4); these lines come after Sugriva tells of Bali.
- rcm.2.290.doha.1: by doha 304 Bharat has finished his confession and asked Ram to decide; the setting "Bharat blames himself" is a little early.

## 2. Verses with thinner sourcing
All commentary comes from one compendium (Manas Piyush), though from different named commentators. These have only 2 items, or notes that are mostly the meaning: rcm.2.170.chaupai.7, 2.212.chaupai.1, 2.285.doha.1, 2.286.chaupai.2, 2.290.doha.1, 2.293.chaupai.4, 4.4.chaupai.4. The OCR is imperfect in places, but every gist was checked against readable text.

## 3. Cautions for writers and plan builders
- **Self-harm risk:** rcm.3.27.chaupai.5 ("leave this body and go to my abode") is said to a dying hero. Keep it out of any plan or reading for someone in despair.
- **Fate and karma framed as comfort** (2.146.3, 2.159.3, 2.165.doha, 2.235.4, 2.252.3, 2.198.doha) can feel dismissive in fresh grief. 2.146.3 was spoken to a king who then died of grief. Its "fools rejoice and wail" stings a crying reader. Not for Day 1 of a grief plan.
- **"You reap what you sow"** (2.211.2) must never be aimed at someone who is suffering. The next line in the Manas softens it.
- **Shabari (3.31.2)**: the first half is caste and gender self-abasement. Never show it without Ram's reply. Manas Piyush's older notes (Kharra, Pt. Ramkumar) restate caste rankings; don't carry them into readings.
- **Misogyny next door:** 3.34.doha is followed by "desire's only weapon is woman", and 3.39.4 by a doha calling woman a form of maya. Don't pair them, and don't quote those neighbours.
- **"The refusal was protection"** (3.39.2) is risky for anyone recently bereaved or harmed.
- **Excusing harm:** 2.198.doha ("Saraswati clouded Kaikeyi's mind") and 2.235.4 ("blame no one") could read as excusing an abuser. They are good for shame about a relative's past act, bad for someone currently being harmed.
- **Violence and death:** 3.2.sortha (Jayant loses an eye) and 3.26.doha (Jatayu's deathbed).
- **Self-abasement lines** (2.176.2, 2.225.1, 2.285.1 "no one is as low as me") can reinforce harsh self-criticism.

## 4. Useful pairings noticed
- 2.127.doha (Ayodhya 131) and 3.13.doha (Aranya 16): the heart that wants nothing is Ram's own home. Manas Piyush links them.
- 2.185.4 (Guha) and 2.222.2 (sky-voice to Lakshman): both are about not acting in haste.
- 3.39.2 and 4.4.2: the mother-and-child image of reliance, which Manas Piyush cross-references.
- 3.32.3 must always run with 3.32.4, because it ends mid-sentence.
