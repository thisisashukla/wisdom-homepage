# corpus_mbh_4: research notes

59 verses (Shanti 177 to Ashvamedhika 92). All 59 entries are filled. 57 have two or more sourced notes. The two with one note (12.210.16 and 13.43.45) are southern-only chapters that have no translation or commentary.

## Numbering: our ids follow the Kumbakonam (southern) edition

Every id in this group uses Kumbakonam numbering. None of them match the BORI critical edition. Our `verified_with` field cites Ganguli section numbers, which are a third system again. Each entry's `verified_ref` gives all three numbers. Chapter mapping:

| Ours (Kumbakonam) | BORI | Ganguli |
|---|---|---|
| 12.177 / 178 | 12.172 / 173 | Santi CLXXIX / CLXXX |
| 12.230 / 231 | 12.216 / 217 | Santi CCXXIII / CCXXIV |
| 12.268 | 12.254 | Santi CCLXII |
| 12.272 | 12.258 | Santi CCLXVI |
| 12.305 | 12.288 | Santi CCC |
| 12.337 / 338 | 12.316 / 317 | Santi CCCXXX / CCCXXXI |
| 13.9 / 10 / 11 | 13.6 / 7 / 5 | Anusasana VI / VII / V |
| 13.161 / 162 | 13.107 / 108 | Anusasana CIV / CV |
| 13.175 | 13.114 | Anusasana CXIII |
| 13.273 | 13.153 | Anusasana CLXVII |
| 14.12 / 13 | 14.12 / 13 | Asvamedha XII / XIII |
| 14.32 | 14.31 | Asvamedha XXXI (Telang's Anugita ch. XVI) |
| 14.52 / 66 | 14.51 / 65 | Asvamedha LII / LXVI |
| 14.92 | 14.93 | Asvamedha XC |

Four Ganguli section numbers marked "inferred" in our data are confirmed: 13.10 = VII, 14.12 = XII, 14.13.6 and 14.13.13 = XIII.

## Verses that are southern-only or partly so (label them carefully)

- **12.210.16** (Narada's prayer to Vishnu) and **13.43.45** (Vishnu to Garuda): the whole chapters are printed between insertion marks even in the Kumbakonam edition. They are not in BORI or Ganguli, and I found no commentary on either.
- **13.254.145** (Arjuna's prayer at the end of the Vishnu Sahasranama): this is part of the closing passage (Arjuna's request and the Lord's reply) that Kumbakonam also prints between insertion marks. It is not in BORI 13.135, not in Ganguli CXLIX, and not in the stotra text printed with Shankara's bhashya, which ends at verse 142. Present it as coming from the recited Sahasranama, not as epic narrative.
- **13.161.35** (the arrow of words): not in BORI 13.107. In the critical edition the verse belongs to Vidura's counsel (Udyoga). Ganguli's Anusasana does carry it.
- **13.161.119**: the sister with no protector, the teacher, and the learned or well-born person fallen poor appear only in the southern text. BORI and Ganguli list only an aged relative, a friend, and anyone who has become poor.
- **13.162.5**: our last sentence comes from a bracketed southern insertion.
- **13.273.39**: the first two lines (devotee, calm, owning nothing) are southern. BORI has only "give me leave" followed by "protect the Pandavas".
- **14.52.7**: the bracketed third line is a southern insertion. Our translation already brackets it.

## Translation errors (translation_ok = false)

1. **13.9.9**: our first half is reversed. The Sanskrit, Ganguli and the BORI translation all say a field sown without seed bears nothing, so destiny fails without effort. Ours says "seed sown without a field". The second half and the line are correct.
2. **13.161.36**: "lack of standing" fits no reading. Kumbakonam has satya-hīna (probably corrupt), BORI and Ganguli have sattva-hīna (lacking strength or spirit), and Manu 4.141 has jāti-hīna (low birth). Also, vayo'dhika means "the old", not "age". Don't let a fix bring back Manu's caste term.
3. **13.162.5**: the translation drops the condition the text gives, which is that open rebuke by the eldest gives envious outsiders their opening. Its last sentence rests on the southern insertion. A suggested rewrite is in the entry.
4. **12.272.23** (earlier agent): puruṣaṃ is a corruption of puṣpaṃ ("a flower is loosed from its stalk").
5. **12.305.14** (earlier agent): "itch to scheme" is not supported; the word means the surge of craving.
6. **12.305.32** (earlier agent): "the people one argues with" should be "the people one lives among".

## Other data fixes

- **13.162.15 our_note**: the ranking is wrong. This verse runs ācārya < upādhyāya < father < mother. Ganguli notes that this reverses Manu 2.145 for the first two.
- **13.162.6**: durvinaya means misconduct or indiscipline. "Arrogance" narrows it. BORI's second half is different (the eldest who degenerates destroys the family).
- **13.162.12 line**: "unequal shares plant resentment for a generation" is our gloss. The text is a sons-only partition rule.
- **12.338.22**: the second half is about impermanence ("what lasting thing should one dwell on?"). The line "don't spend it brooding" drifts.
- **14.13.13**: Ganguli's Bengal text reads differently (destroying desire by muttering prayers, not with a weapon). Don't cite Ganguli for the weapon wording; Kumbakonam and BORI support it.
- **14.32.12**: the listener field is empty. Fill it as "retold by a Brahmana to his wife, in Krishna's Anugita to Arjuna". The setting's "defeated every outer enemy" is close: Ambarisha says he conquered all foes and most faults, but not greed.
- **12.337.11**: Ganguli renders matsara as "pride". Ours ("envy") is the standard sense and BORI agrees, so no change is needed.
- **13.10.25 setting**: the chapter is about deeds following the doer. It is not a talk on ageing.
- **12.305.38 note** (earlier agent): within this Shanti passage the editions agree on the order. The difference is with Vidura's version.
- **Sanskrit typos to fix**: 12.338.13 vijñānam asāmarthyaṃ → vijñāna-sāmarthyaṃ; 13.43.45 nimagrānāṃ → nimagnānāṃ; 13.161.111 puruṣeṇi → puruṣeṇa; 13.161.119 nihsvaḥ → niḥsvāḥ; 13.254.145 viśālakṣa → viśālākṣa; 14.92.77 śruddhāpūtaiḥ → śraddhāpūtaiḥ; 12.305.8 vadeduśatiṃ → vaded ruśatīṃ; 12.305.9 niṣyatanti → niṣpatanti.

## Weak or thin sourcing

- No classical commentary (Nilakantha or another) was reachable for any verse in this group. The notes are Ganguli's translation and footnotes (some quote Nilakantha), the BORI text, and parallels: Vidura's counsel, Manu with Medhatithi, Shaunaka in the Vana Parva, Telang's Anugita, and the Bhagavata for 13.273 and 14.66. Modern readings come from Debroy's Open magazine column on the Kama Gita, Pradip Bhattacharya's essay on the Ashvamedha Parva, and Devdutt Pattanaik on the mongoose.
- Several second notes are the BORI critical-text translation on enjoylearningsanskrit.com. That is a translation, not a commentary, and its English reads as machine-assisted; treat it as a check on wording only. These entries: 12.178.12, 12.230.31, 12.337.11, 12.338.9, 12.338.15, 12.338.22, 13.11.26, 13.161.14, 13.161.119, 13.162.5, 13.162.6, 14.52.7.
- 12.210.16 and 13.43.45 rest on the Kumbakonam Sanskrit alone.
- Sites blocked by bot challenges were not used: sacred-texts.com, sanskritdocuments.org, and some swami-krishnananda.org pages. Ganguli was read on wisdomlib.

## Cautions for editors

- **14.66.15 (Kunti over the stillborn Parikshit)**: never serve it to readers dealing with pregnancy loss, stillbirth, infant loss or infertility. The miracle in the story can also hurt anyone whose loved one was not saved.
- **12.272.x (Chirakari)**: the story is a father ordering his son to kill his mother over suspected infidelity, after Indra seduced her in disguise. Keep it away from readers in unsafe homes, even though the mother verses are beautiful.
- **12.178.12 (the jackal and Kashyapa)**: the frame is a man resolving to end his life. It is not a response to suicidal thoughts. **13.273.39 (Bhishma's leave to die)** and **12.210.16 (a deathbed prayer)** need the same care.
- **Grief and "don't grieve" verses**: 12.338.9 (brooding gives two sorrows), 12.338.15, 12.338.22, 14.13.3 ("mine" is death), and 12.177.24 (the ajagara sage's fatalism) should not go on Day 1 of a grief plan or to anyone in fresh bereavement. Narada's wider speech tells Shuka not to shed tears at all.
- **12.338.13 (mind's pain healed by wisdom)**: pair it with explicit permission to seek mental health treatment.
- **Mother verses** (13.162.15, 12.272.28-31): painful for readers with maternal loss, estrangement, abuse, or infertility.
- **Longevity promises** (13.161.14, 13.161.119): avoid for readers grieving an early death or seriously ill.
- **13.161.111 and 13.162.4**: "don't provoke anger" and "overlook faults" must not reach readers living with abuse.
- **13.162.12**: the text gives inheritance to sons only. Don't present it as endorsing that.
- **14.12.15 ("fight alone")**: someone in a mental health crisis needs to reach out, so frame it as inner work, not isolation.
- **Devotional and sectarian verses** (12.210.16, 13.43.45, 13.254.145, 13.273.39, 14.52.7, 14.66.15) fit devotional plans better than general ones.
