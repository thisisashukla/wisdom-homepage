# corpus_vr_2 notes (57 Valmiki Ramayana verses: Aranya, Kishkindha, Sundara)

## Sources and method
- Each verse was found by matching our Sanskrit against the Mūla-pāṭha on the itihasa.io sarga pages, and its per-śloka page was read (Southern-recension numbering, Baroda critical-edition concordance, variants, and syntheses of Govindarāja's Bhūṣaṇa, Rāma Varmā's Tilaka and Śivasahāya's Śiromaṇi). No /api/ paths were fetched.
- **valmikiramayan.net could not be used.** Every request returned HTTP 509 (bandwidth limit exceeded) or a "One moment, please" bot-check page. Per the brief I did not try to get around it. sacred-texts.com (Griffith) also showed a Cloudflare challenge. The cross-check is H. P. Shastri's prose translation (1952) on wisdomlib.org. It was reachable, but it is a translation, not a commentary, and sometimes abridges or skips single verses.
- itihasa.io syntheses are AI-generated and not peer-reviewed. Every commentary entry is labelled "itihasa.io synthesis of <commentator>". Where the site's note is not tied to a named commentator (4.28.62, 5.1.201, 5.13.19-21), the `who` field says so.
- All 57 entries have 2 or more commentary/source notes. Most have at least two itihasa syntheses plus Shastri. These 24 have one itihasa synthesis plus Shastri (exactly two notes): 3.41.20, 3.50.15, 3.66.5, 3.66.9, 3.66.17, 3.74.12, 3.74.22, 4.7.10, 4.22.4, 4.24.9, 4.27.29, 4.28.62, 4.35.9, 4.66.28, 5.1.91, 5.11.27, 5.11.30, 5.11.31, 5.11.34, 5.13.17, 5.13.18, 5.13.19, 5.13.20, 5.13.35. (Some of those syntheses report more than one commentator in a single note.)

## Data errors

### 1. Verse numbering is inconsistent across the whole group
Only 15 of the 57 ids match the Southern/Gita Press count (itihasa.io). The rest are off by 1 to 55 verses and also do not follow the critical edition (CE). Examples: 3.9.19 is really 3.9.23, 5.1.146 is really 5.1.201, and the 5.11.x set is about 11 lower than Gita Press. Our own ref_label for 5.11.26 already says "Gita Press 5.11.37", which agrees with itihasa. The Southern and CE number for every verse is in `verified_ref`. Suggest we re-key to the Southern/Gita Press number and store the CE number alongside it.

| our id | Southern (itihasa ≈ Gita Press) | Baroda CE |
|---|---|---|
| 3.9.19 | 3.9.23 | — (Southern only) |
| 3.9.26 | 3.9.31 | 3.8.27 |
| 3.10.17 | 3.10.20cd-21ab | 3.9.20 |
| 3.43.6 | 3.43.7-8 | 3.41.6-7 |
| 3.50.15 / .18 | 3.50.18 / .21 | 3.48.17 / .20 |
| 3.65.4 | 3.65.6 | 3.61.6 (line 2 only) |
| 3.66.5 / .9 / .17 | 3.66.6 / .11 / .19 | — / 3.62.10 / 3.62.18 |
| 3.74.12 / .22 | 3.74.17-18 / .27 | 3.70.13 / — |
| 4.2.16 | 4.2.17 | 4.2.16 |
| 4.3.19 | 4.3.31 | — |
| 4.10.6 | 4.10.6cd-7ab | — |
| 4.15.22 | 4.15.25cd-26 | 4.15.22 (+ Southern line) |
| 4.27.24 / .29 | 4.27.34 / .39 | 4.26.9 / — |
| 4.29.7 | 4.29.14 | 4.28.13 |
| 4.32.15 | 4.32.16 | 4.31.16 |
| 4.33.39 | 4.33.51 | — |
| 4.35.9 | 4.35.11 | 4.34.11 |
| 4.49.6 | 4.49.8 | 4.48.8 |
| 4.66.28 | 4.66.34 | 4.65.32 |
| 5.1.91 / .94 / .146 | 5.1.128 / .131 / .201 | 5.1.114 / .117 / .180 |
| 5.11.26-34 | 5.11.37-45 | 5.9.34-42 |
| 5.13.17 / .18 / .19 / .20 / .21 | 5.13.18 / .19-20 / .21 / .22 / .23 | 5.11.18-23 |
| 5.13.35 / .40 / .41 | 5.13.38 / .44 / .45 | 5.11.38 / .44 / .45 |

These 15 ids match: 3.41.20, 4.7.10, 4.7.14, 4.8.8, 4.15.7, 4.22.3, 4.22.4, 4.22.23, 4.24.9, 4.28.62, 4.32.7, 4.36.20, 4.62.13, 4.66.7, 5.13.3.

### 2. Southern-only verses (not in the critical edition)
These are not in the Baroda CE, wholly or in part: 3.9.19, 3.65.4 (line 1), 3.66.5, 3.74.12 (line 1), 3.74.22, 4.3.19, 4.10.6, 4.15.22 (last line), 4.24.9, 4.27.29, 4.33.39. 3.66.5 is also missing from the Govindarāja and Śivasahāya texts, so only Tilaka comments on it. If we ever cite "critical edition", these need a flag.

### 3. Translations that misstate the verse (translation_ok = false)
- **vr.4.49.6**: our translation says "once you sink into deep despair, you cannot rise again." The verse says that even after falling into deep despondency, it is not right to sit idle with our eyes shut (Govindarāja), or to lose our drive (Śivasahāya). Our version says the opposite of hope and could hurt a depressed reader. Our own our_note already gives the correct sense.
- **vr.5.13.35**: "I will not go from this city of Kishkindha." It should read "from here (Lanka) to the city of Kishkindha." Hanuman is in Lanka.
- **vr.3.65.4**: "Surely we can find out whose chariot this is" overreaches. Both itihasa and Shastri read it as "we do not yet know whose broken chariot this is."
- **vr.5.13.17**: "I will be blamed" is a narrowing. The doṣa is the harm that follows: Rama dies if told, and the master is deceived if not told (Tilaka).
- Minor: 5.13.3 ("again", "for the welfare of Rama") is loose but not misleading.

### 4. Sanskrit typos in our `sanskrit` field (checked against itihasa.io)
3.10.17 त्वा→त्वया; 3.66.5 आश्वसिही→आश्वसिहि; 3.66.9 धर्मों→धर्मौ; 4.7.10 नौ ले→नौर्जले; 4.22.3 किल्वषात्→किल्बिषात्; 4.22.4 सौहार्दै→सौहार्दं; 4.27.24 शोचते→शोचतो, हिते→हि ते; 4.27.29 प्रावृटकालो→प्रावृट्कालो, सराष्ट्र→सराष्ट्रं; 4.29.7 महतोऽप्यान्न→महतोऽप्यर्थान्न; 4.35.9 रोषश्य→रोषस्य; 5.1.91 प्रीतिमनाः→प्रीतमनाः; 5.1.94 कार्यकाले→कार्यकालो; 5.1.146 दाक्ष्य→दाक्ष्यं; 5.11.31 सुव्यवस्थिम्→सुव्यवस्थितम्; 5.13.17 कथं न→कथं नु; 5.13.20 दशरथात्मौ→दशरथात्मजौ; 5.13.35 मैथिली→मैथिलीं. Stray danda/number marks in 4.2.16, 4.66.7, 5.11.29, 5.13.41. 4.15.7 has मुक्तामिव where itihasa has भुक्तामिव ("worn"). The commentators read भुक्ताम्, which is what our English already translates.

### 5. Note corrections
- **vr.3.74.12** our_note says "Valmiki does not mention tasted berries." That is true of the verse text. But itihasa.io reports that Govindarāja and Rāma Varmā both record the fruit-tasting tradition in their commentary on this verse, with Tilaka citing the Padma Purāṇa. Suggest: "Valmiki's verse does not mention tasting; the classical commentators record it as tradition."
- **vr.3.9.19** setting calls the hermit "gentle". In the text he is a devout ascetic whom Indra deliberately tempted by leaving the sword in his keeping.
- our_note is empty for 5.11.30, 5.11.32, 5.11.34 and all of 5.13.x. Suggested notes are in the entries' research_note fields where useful.
- `prasang` is null for 3.66.9, 3.66.17 and 3.74.22. They belong with "Ram's grief and Lakshman's counsel" and "Shabari's long wait".

## Cautions for editors
1. **Sundara 5.13 is a suicide passage.** In 5.13.36-46 (Southern) Hanuman weighs a pyre, fasting to death and drowning. Only in 5.13.47 does he conclude that self-destruction brings many evils and that one who lives attains good. All nine 5.13 verses here sit inside that passage. 5.13.21 is itself about Rama giving up his life on hearing bad news. 5.13.40 directly follows a verse about drowning. Do not use any of them in grief, despair or crisis plans unless the reading is anchored to 5.13.47, which we do not hold yet. Suggest adding 5.13.47 (CE 5.11.47) to the library.
2. **"Do not grieve" verses** (3.66.5, 3.66.9, 4.7.10, 4.7.14, 4.27.24). In context the loved one (Sita) is alive and can be recovered, and the speakers are urging action. They do not fit Day 1 of a bereavement plan. In Shastri's rendering, Lakshmana's same speech says it is unworthy of Rama to grieve "even if Sita is dead". Keep that line out. 4.7.10 calls the grieving "foolish" (bāliśa).
3. **Patience/endurance verses** (4.32.15, 4.33.39, 4.28.62). Each depends on the condition that the hurting or lapsing person means well and that the reader really was at fault or is the stronger party. They must not be served to someone in an abusive situation. Our misuse fields for these are good; keep them.
4. **5.11 (Hanuman in Ravana's harem).** These verses are about integrity of mind, but the scene involves looking at sleeping, partly unclothed women (Tilaka). This is low-value for general plans and could feed scrupulosity. 5.11.32 has little standalone use.
5. **Fights and deaths follow good counsel that is ignored.** Vali (4.15.7, 4.15.22) and Jatayu (3.50.18) die. Vali's last words (4.22.x) are a deathbed scene. Take care with readers who lost someone in the middle of a quarrel or estrangement.
6. **4.62.13 (Sampati)** is a strong "you are still needed" verse for the sidelined, ill or disabled. But Sampati wanted to die before this (Shastri), so frame it around purpose.

## Weak spots
- 4.3.19 and 5.1.146: Shastri's text could not be matched to the verse wording, so the sourcing is essentially itihasa.io only (two syntheses for 4.3.19, one named and one unnamed note for 5.1.146).
- 3.66.5: only one classical commentator exists for this verse.
- Nothing was cross-checked against valmikiramayan.net's word-by-word notes, because the site was unavailable.
