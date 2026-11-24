# corpus_up_2: research notes

58 verses: Chhandogya 1, Dakshinamurti 1, Devi 7, Isha 5, Katha 16, Katharudra 1, Kaushitaki 4, Maha 23.
All 58 have entries in `corpus_up_2.json`, in input order.

## Sources used

- **Katha and Isha.** Shankara, translated by S. Sitarama Sastri (1905). Madhva, translated by Srisa Chandra Vasu (1909). Both read on wisdomlib, one page per verse or chapter.
- **Chhandogya 8.15.1.**
  - Shankara, translated by Ganganath Jha (archive.org, *The Chhandogya Upanishad* vol. 4).
  - Swami Lokeswarananda (wisdomlib). His page is cut off part-way.
  - Max Müller, SBE 1.
- **Kaushitaki.**
  - E. B. Cowell's 1861 translation. Its notes summarise Shankarananda's commentary (archive.org).
  - Müller, SBE 1.
- **Maha Upanishad.**
  - The Sanskrit text on Sanskrit Wikisource (महोपनिषत्). It carries its own verse numbers, and all verse numbers were checked against it.
  - T. R. Srinivasa Ayyangar, *Samanya Vedanta Upanishads* (Adyar, 1941). The translation says it closely follows Upanishad Brahmayogin's commentary, and its glosses in round brackets come from it (archive.org).
  - A. G. Krishna Warrier's Adyar translation, on the sites.google "Upanishad Scripts" mirror.
  - Yoga Vasishtha parallels in Vihari-Lala Mitra's translation, vol. 1 (archive.org in.ernet.dli.2015.62046).
- **Dakshinamurti.** Ayyangar, *Saiva Upanishads* (Adyar, 1953), which also follows Brahmayogin. P. R. Ramachander's translation.
- **Devi.**
  - Warrier's Adyar translation.
  - Wikipedia's scholarly summary.
  - For the Durga Suktam verse only: Swami Vimalananda's gloss, as quoted on the Advaita-l list, and an NIOS lesson.
- **Katharudra.** A. A. Ramanathan's Adyar translation only.
- **Copyright.** Warrier, Ramanathan, Ramachander, Lokeswarananda, Ayyangar and Vimalananda may still be under copyright. Everything from them is paraphrased.
- **Not used.**
  - sanskritdocuments.org, sacred-texts.com (Mahadeva Sastri's Dakshinamurti) and kamakotimandali.com: blocked by bot checks or broken.
  - Adyar's Sakta Upanishads volumes on archive.org: unreadable OCR.

**Commentary count.**
- 57 of 58 entries have 2 or more sourced items in `commentaries`. That count includes translations used as surrounding text, scholarly summaries and Yoga Vasishtha parallels, each labelled as such in `who`.
- Only 21 entries have two separate commentators in the strict sense: Chhandogya, Isha ×5, Katha ×11 and Kaushitaki ×4.
- The 23 Maha verses and Dakshinamurti have one classical commentary (Brahmayogin, through Ayyangar), plus translations and parallels.
- The Devi verses have no classical commentary.
- Katharudra has one source only.

## Data errors (fix before publishing)

1. **up_maha.165: wrong verse number.** It should be Maha Upanishad **4.18**, not 4.17. In the Wikisource text, 4.17 is the line before ("Listen, Nidagha: noble souls are born..."). Our Sanskrit (*nāpadi glānim āyānti...*) is 4.18. It also needs 4.17 for its subject ("they").
2. **Devi Upanishad numbering does not match Warrier's 32-verse Adyar division.**
   - Our 15 is Warrier's 15 plus 16 ("Whoever knows this crosses grief" is a separate verse 16 there).
   - Our 16 is Warrier's 17 plus the start of 18.
   - Our 19 opens with *tām ahaṃ praṇaumi nityam*, which Warrier puts at the end of 18.
   - Our 29 and 30 are the two halves of Warrier's 28.
   - Our 9 and 25 match.
   - Our numbers probably come from sanskritdocuments.org, which could not be checked. Pick one edition and say which.
3. **up_kaushitaki.3 (Kaushitaki 1.1): mistranslation.** The father's line "We have studied the Veda and take what others give us" drops *sadasi* (in his hall). Müller reads it as: only after learning the Veda in Chitra's own dwelling shall we receive what others give. Cowell reads: we will go to his house, study there and gain the knowledge from him. Suggested fix: "Let us study in his own hall and receive what he gives. Come, let us both go."
4. **up_kath.1.1.6: translation and line miss the point.** In Shankara's reading the verse argues for keeping one's word: our forefathers and good men never broke theirs, life is as short as a crop, so falsehood gains nothing. Our translation ("how those after us will fare") and line ("we ripen, fall and spring up again") turn it into a general meditation on rebirth. That is nearer Madhva's translator, but it loses the truth-keeping argument. Add it, or flag that readings differ.
5. **up_kath.1.1.5: line and note.**
   - The line "What can Death really do with me today?" sounds defiant. Both commentators read it as puzzled reflection: what purpose of Yama's would I serve?
   - The alternative in our_note ("many have died before me and many will after") is not this verse in either commentary. It belongs to Madhva's reading of 1.1.6.
6. **up_devi.9: unchecked reference.** our_note's "Taittiriya Aranyaka 10.1" is not confirmed. The source we read says only that the Durga Suktam is in the Mahanarayana Upanishad, the last book of the Taittiriya Aranyaka. Check the anuvaka number.
7. **Nidagha and Ribhu: kinship stated as fact.** Our data calls Ribhu "his teacher". The Sanskrit (3.1-2) says only that Nidagha, permitted by his father, went on pilgrimage and on returning bowed to Ribhu. Ayyangar, following Brahmayogin, glosses Ribhu as Nidagha's **father**. "Teacher" is fine in practice, but don't state the kinship as fact.
8. **up_maha.106 (3.15): two readings.** *bhāro vivekinaḥ śāstram* can be read with or without an unwritten avagraha.
   - Our version ("to the undiscerning") follows Warrier and Mitra's Yoga Vasishtha parallel.
   - Ayyangar/Brahmayogin read: to the fully discerning, scripture is a burden.
   - Not an error, but the editor should know.
9. **Translations that pick one school without saying so (editorial, not errors):**
   - Isha 1 "enjoy by letting go" is the popular modern reading. Shankara reads "protect yourself by renunciation". Madhva reads "enjoy what He has given".
   - Isha 18 "true wealth" is Madhva's reading (the wealth of liberation). Shankara reads it as the fruits of one's deeds.
   - Katha 1.2.23 "reached by the one it chooses" is the grace reading. Shankara reads the opposite direction.
   - Katha 2.1.1: Madhva reads *vyatṛṇat* as "subdued", meaning the Lord turns the senses inward.
   - Kaushitaki 3.7 renders *prajñā* as "attention", a modern gloss. Müller has "self-conscious knowledge".
10. **Confirmations.**
    - **up_maha.104 (3.13):** our reading *mananenopajīvati* is the Mahopanishad text's own, followed by both Adyar translations. our_note can drop its "uncertain" caveat. The different Yoga Vasishtha wording belongs to the parallel text.
    - **Bonus for the up_yv_gitas batch:** **up_maha.113 is confirmed as Mahopanishad 3.22** in the Wikisource text. The earlier batch had left it unverified.
11. **Minor wording.**
    - up_maha.255 drops *dūram* ("far"). Ayyangar reads it as: the saving boat, one's own mind, stands far off from the drowning.
    - up_kath.1.3.3 omits the last line of 1.3.4 (the self joined to body, senses and mind is called "the enjoyer").
12. **Dakshinamurti numbering.** "26-27" is consistent with Ayyangar's block 26-32. Ramachander's online version numbers the same passage 9. Ayyangar (following Brahmayogin) also reads the fire-stick image differently from our Sanskrit. Not an error.

## Verses with weak sources

- **up_katharudra.17.** One translation only (Ramanathan, Adyar). No Sanskrit edition or commentary reachable, so the numbering is unconfirmed.
- **Devi ×7.** No classical commentary reachable. Brahmayogin's commentary exists (Adyar Sakta Upanishads volumes on archive.org) but its OCR is unreadable. Readings rest on Warrier's translation, the Wikipedia summary and, for verse 9 only, Durga Suktam glosses.
- **Maha ×23.** One classical commentator (Brahmayogin), reached only through Ayyangar's translation. Warrier's translation and the Yoga Vasishtha parallels add context.
- **Chhandogya 8.15.1.** Lokeswarananda's page breaks off part-way through.

## Cautions for the editor

- **Never pull adjacent verses.**
  - Maha 3.39-48, in Nidagha's lament, is a long misogynistic passage about women's bodies.
  - Katharudra verse 3 lists starvation, drowning or entering fire for the renunciant.
  - Kaushitaki 3.8's next lines say the self makes some do good and others do evil, which sounds fatalistic.
- **"Don't grieve" verses: keep off early grief days.**
  - Isha 7 ("what sorrow?") and Katha 1.2.22 ("the wise do not grieve").
  - Maha 4.111 ("clinging is sorrow") and Maha 4.72 ("not mine").
  - Maha 5.170 ("let go of what is lost") is about worldly transactions. Never apply it to a lost person.
- **Self-harm-adjacent wording.**
  - Maha 3.15: "the body is a burden".
  - Devi 30: *bhava-bhīta*, fear of samsara. Our line "Frightened by life" could be heard as hopelessness about living. Suggest "weary of the round of the world".
- **Death and parent rites.**
  - Kaushitaki 2.15 is a deathbed rite.
  - Katha 1.1.4 has a father "giving" his son to Death.
  - Isha 15 and 18 are deathbed prayers in Shankara's reading.
  - Handle these with care for the bereaved, the estranged and anyone caring for a dying parent.
- **Bleak laments.** Maha 3.53 and the rest of Nidagha's lament (3.13-3.23) are deliberately despairing; the answer comes in chapter 4. Pair lament verses with Ribhu's replies (for example 3.20 with 4.2-3 or 4.106-107). Avoid them for readers who are depressed.
- **Grace and effort verses.**
  - Katha 1.2.23 ("the one it chooses") may sound exclusionary.
  - Maha 4.106-107 ("no one else can carry you over") can sound isolating in a crisis.
  - Maha 5.88 ("who would not succeed?") can add pressure to someone burnt out.
- **Theology and framing.** The Devi verses are explicitly Shakta devotional; frame them as prayers to borrow. Chhandogya 8.15.1 and Katharudra are framed for male Vedic students and renunciants; widen gently.
