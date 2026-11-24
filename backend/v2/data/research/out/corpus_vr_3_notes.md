# corpus_vr_3 notes (Valmiki Ramayana, 55 verses)

## Sources and method
- Primary: itihasa.io sarga pages (e.g. https://itihasa.io/ramayana/5/13), which carry the Southern Recension text, a verse-by-verse Baroda critical edition (CE) concordance, variant notes, and English syntheses of Rāma Varmā's Tilaka, Govindarāja's Bhūṣaṇa and Śivasahāya's Śiromaṇi. One sarga page carries every śloka and its commentary in the page data, so I fetched 55 sarga pages (34 used directly, the rest to locate shifted Yuddha sargas) rather than per-śloka pages (one per-śloka page, 5/13/43, was read to confirm the structure). No /api/ paths were fetched. The syntheses are AI-generated and not peer-reviewed; they are credited as "itihasa.io synthesis of ...".
- Cross-check: **valmikiramayan.net could not be used.** Every page returned a "One moment, please..." bot-challenge page or HTTP 500, and robots.txt returned "509 Bandwidth Limit Exceeded". Following the brief, I did not try to get around it. Instead, every verse was cross-checked against Hari Prasad Shastri's English translation on wisdomlib.org (chapter pages, no bot check). Shastri is probably still under copyright (1952), so it is paraphrased only. Shastri's chapter numbering matches itihasa's in all three kandas, which confirms the itihasa numbers below.
- Verses were found by matching our Sanskrit against the itihasa text with character trigrams. Every verse matched (most at 0.9 or above, the rest checked half-line by half-line).
- Every entry has at least 2 sourced commentary notes (55/55). But in each case those are itihasa.io's AI syntheses plus Shastri's translation: no human-written traditional commentary in English was read directly.

## 1. Systematic reference errors (most important)
**Only 11 of 55 ids match the itihasa.io / Shastri Southern Recension number exactly** (5.41.6, 5.55.3, 5.55.5, 6.1.12, 6.18.3, 6.34.11, 6.63.4/5, 6.65.4, 7.48.6, 7.53.4; 7.97.4 is close). The rest are 1 to 12 verses off, and in late Yuddha the sarga is off as well:
- **Yuddha Kanda sargas 101-127 in our data are three sargas behind** itihasa/Shastri (which have 131 Yuddha sargas). For example, our 6.109 is their 6.112, our 6.113 is 6.116, our 6.116 is 6.119, our 6.121 is 6.124, our 6.125 is 6.128, and our 6.127 is 6.130. Our 6.101.18 is their 6.102.22-23. Our sarga numbers probably follow a 128-sarga Yuddha edition (Gita Press style). I could not check that edition directly, so I cannot say whether the sargas are right *for that edition*, but the verse numbers inside sargas are off even where the sarga matches.
- **vr.6.18.31 ('sakṛd eva prapannāya ... etad vrataṃ mama') should be 6.18.33.** This is the best-known verse in the batch. It is conventionally cited as Yuddha 18.33, and itihasa also numbers it 33. Fix it before it reaches users.
- Within-sarga offsets: 5.13.x is +4 throughout (our 5.13.43 'vināśe bahavo doṣāḥ' = 5.13.47); 6.10.17 = 6.10.25; 6.59.131 = 6.59.143; 7.40.6/10/12 = 7.40.10/17/19-21; 7.49.10 = 7.49.16-17; 7.83.15 = 7.83.20.
- **Many ids bundle 2-3 ślokas** (5.13.54, 5.30.40, 5.55.10, 6.21.11, 6.113.29, 6.121.16, 6.127.38, 7.40.12, 7.48.14, 7.49.10, 7.72.14). Two of these mix speakers: 5.13.54 has the narrator and then Hanuman's 'namo 'stu rāmāya' prayer, and 7.49.10 has Valmiki and then the narrator.

Full mapping (our id | itihasa Southern Recension | Baroda CE):

| our id | itihasa.io | CE |
|---|---|---|
| vr.5.13.43 | 5.13.47 | CE 5.11.47. |
| vr.5.13.44 | 5.13.48 | CE 5.11.48. |
| vr.5.13.47 | 5.13.51 | CE 5.11.51. |
| vr.5.13.48 | 5.13.52 | CE 5.11.52. |
| vr.5.13.50 | 5.13.54 | CE 5.11.54. |
| vr.5.13.51 | 5.13.55 | CE 5.11.55. |
| vr.5.13.54 | 5.13.58-59 | CE 5.11.58-59. |
| vr.5.21.14 | 5.21.15 | CE 5.19.14. |
| vr.5.30.18 | 5.30.19 | CE 5.28.19. |
| vr.5.30.34 | 5.30.35 | CE 5.28.35. |
| vr.5.30.40 | 5.30.42-43 | CE 5.28.42-43. |
| vr.5.34.5 | 5.34.6 | CE 5.32.6. |
| vr.5.36.44 | 5.36.47 | CE 5.34.45. |
| vr.5.39.20 | 5.39.21 | CE 5.37.20. |
| vr.5.39.40 | 5.39.44 | CE 5.37.43. |
| vr.5.41.6 | 5.41.6 | CE 5.39.6. |
| vr.5.55.3 | 5.55.3 | CE 5.53.3. |
| vr.5.55.5 | 5.55.5 | Not in the Baroda critical edition |
| vr.5.55.10 | 5.55.10-11 | CE 5.53.6-7. |
| vr.6.1.12 | 6.1.12 | CE 6.1.11. |
| vr.6.10.17 | 6.10.25 | Not in the Baroda critical edition |
| vr.6.16.20 | 6.16.21 | CE 6.10.16. |
| vr.6.16.24 | 6.16.25 | CE 6.10.20 |
| vr.6.17.50 | 6.17.52 | CE 6.11.43. |
| vr.6.18.3 | 6.18.3 | CE 6.12.3. |
| vr.6.18.23 | 6.18.25 | CE 6.12.12. |
| vr.6.18.26 | 6.18.28 | CE 6.12.15. |
| vr.6.18.31 | 6.18.33 | CE 6.12.20. |
| vr.6.19.4 | 6.19.6cd-7ab |  |
| vr.6.21.11 | 6.21.20cd-22 | CE 6.14.10-12. |
| vr.6.34.11 | 6.34.11 | CE 6.25.11. |
| vr.6.59.131 | 6.59.143 | Not in the Baroda critical edition |
| vr.6.63.4 | 6.63.4 | CE 6.51.4. |
| vr.6.63.5 | 6.63.5 | CE 6.51.5. |
| vr.6.65.4 | 6.65.4 | CE 6.53.4. |
| vr.6.101.18 | 6.102.22cd-23ab | Not in the Baroda critical edition |
| vr.6.109.15 | 6.112.17 | Not in the Baroda critical edition |
| vr.6.109.23 | 6.112.25 | Not in the Baroda critical edition |
| vr.6.111.11 | 6.114.15cd-16ab | CE 6.99.9. |
| vr.6.113.29 | 6.116.44-46 | CE 6.101.35-37. |
| vr.6.116.10 | 6.119.10 | CE 6.104.10. |
| vr.6.121.16 | 6.124.18-19 | CE 6.109.17-18. |
| vr.6.125.12 | 6.128.17 | CE 6.113.16. |
| vr.6.127.38 | 6.130.54cd-55 | CE 6.115.43-44. |
| vr.7.40.6 | 7.40.10 | CE 7.39.11. |
| vr.7.40.10 | 7.40.17 | Not in the Baroda critical edition |
| vr.7.40.12 | 7.40.19-21 | CE 7.39.18 |
| vr.7.48.6 | 7.48.6 | CE 7.47.6. |
| vr.7.48.14 | 7.48.15cd-16ab | CE 7.47.12. |
| vr.7.49.10 | 7.49.16-17 | CE 7.48.12-13. |
| vr.7.53.4 | 7.53.4 | Not in the Baroda critical edition |
| vr.7.72.10 | 7.72.12 | CE 7.63.8. |
| vr.7.72.14 | 7.72.16-17 | CE 7.63.12-13. |
| vr.7.83.15 | 7.83.20 | CE 7.74.19 |
| vr.7.97.4 | 7.97.3ef-4 | CE 7.88.3 |

## 2. Verses not in the Baroda critical edition (southern-only)
5.55.5, 6.10.17 (=6.10.25), 6.19.4 (second half), 6.59.131 (=6.59.143), 6.101.18 (=6.102.22-23), 6.109.15 and **6.109.23 'maraṇāntāni vairāṇi'** (=6.112.17, 25), 7.40.10 (=7.40.17), 7.40.12 (the 'ekaikasyopakārasya' line), 7.53.4, and the first lines of 6.16.24 and 7.83.15. These are fine to use from the vulgate, but the app should never label them with CE numbers. The 'maraṇāntāni vairāṇi' finding will surprise people: itihasa marks the whole 6.112.20-25 block as absent from the CE.

## 3. Translation, setting and text problems
- **vr.5.13.43 (translation_ok=false)**: 'vināśe' means self-destruction. Hanuman has just weighed drowning or starving himself. 'Giving up brings many harms' hides this, and the line 'Giving up costs too much' turns a choice against suicide into a productivity slogan. Our note already flags this. Any reading must say plainly that he chooses to live, and must point to help.
- **vr.6.10.17 setting/note error**: our setting says Vibhishana spoke to Ravana 'privately'. The next verse in the text (6.10.26, 'svamantriṇāṃ madhye') and Shastri both say he spoke in front of the ministers.
- **vr.7.40.12 text**: our Sanskrit has 'śeṣasyehopakārāṇāṃ bhavāma ṛṇino vayam / madaṅge jīrṇatāṃ yātu...', which is not in itihasa's southern text. Shastri's translation has equivalents, so it comes from another southern version. Annotate the source edition.
- vr.5.30.40 (translation_ok=false, minor): the Sanskrit says Hanuman will deliver *Rama's* auspicious words, not 'words about Ram'.
- vr.5.55.10 'line' ('I won a small fight') adds a fight that is not in the verse.
- vr.6.1.12 'line' adds the hug, which is the next verse (6.1.13).
- vr.6.59.131 'line' ('Go and rest... come back when you're ready') reads as self-care advice. It is said to an enemy, together with a threat.
- vr.7.72.14 'line' leaves out the duty half (go back to your kingdom).
- vr.7.97.4: 'Please forgive me' is addressed to Valmiki, not to Sita.
- vr.5.36.44: the listener field is empty (it should be 'the reader').
- Unverified claims in our notes: Bharata repeating 'eti jīvantam ānandaḥ' (vr.5.34.5 note; vr.6.127.38 prasang) is not in the passages I read. The '5.12.10' cross-reference in vr.5.13.48 was not checked.

## 4. Cautions for editors (sensitive content)
- **Suicide context**: 5.13.43/44 (Hanuman considers drowning or starving himself; the nearby verses describe mass suicide of the monkeys), 5.34.5 (Sita had resolved to hang herself), 5.55.10 (Hanuman resolves to throw himself into fire right after), 6.116.10 (Sita says she would have ended her life; the fire ordeal follows), 7.48.6 (Sita thinks of drowning in the Ganga). These are protective verses if handled well, but each reading needs a gentle pointer to real help.
- **Grief-plan risk**: 6.109.15 ('no one has only victory') sits inside Rama's argument that a warrior killed in battle 'is not to be mourned'. Do not use it on Day 1 of a grief plan.
- **Abuse/coercion contexts**: 5.21.14 (refusing a captor), 6.34.11 (threats, fake severed head), 6.113.29 (compassion for one's tormentors): frame these as freedom from revenge, never as a duty to forgive or stay. 6.18.3/23/26 (refuge) are addressed to the powerful protector, not to the injured party.
- **Gender**: 6.116.10, 7.48.14 (the surrounding 'pati hi devatā nāryāḥ' line) and 7.97.4. Use Sita's protest; do not present the fire ordeal or wifely submission as a model. The classical commentators generally defend Rama (Tilaka on 7.97.4). Present that as their view, not the verse's.
- **Anger licence**: 6.21.11 ('shame on forbearance') must come with the three days of patience before it and Rama's restraint after.

## 5. Weak or thin sourcing
- No verse lacks commentary, but the classical-commentary content is only available through itihasa.io's AI syntheses. Several syntheses carry no commentator tag (6.34.11-12, 6.109.15/16 context, 6.112.24, 6.130.51-53), so I labelled them generically.
- vr.5.39.20, vr.6.19.4 and vr.7.53.4 have only adjacent-verse or brief commentary.
- vr.6.18.23: the dove story is told here only in outline (the Mahabharata version was not checked).
