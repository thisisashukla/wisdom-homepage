# corpus_mbh_1: Mahabharata, Vana Parva + two Udyoga verses (62 verses): editor notes

## What was used
- **K. M. Ganguli's English translation (1883-96)**, read section by section on the ibiblio/SriPedia mirror of sacred-texts (and the Project Gutenberg text). This is the vulgate (Nilakantha-type) text, so it includes passages the critical edition removes.
- **BORI critical edition** (GRETIL e-text of the Aranyaka and Udyoga parvans, including the appendices and star passages). Every verse was matched against it by n-gram search, so each `verified_ref` gives the critical number or the appendix location.
- **Other sources, where they exist:**
  - Swami Vivekananda: Karma Yoga for the Vyadha Gita; Jnana Yoga "Maya and Illusion" for the Yaksha's "wonder".
  - Swami Harshananda's Concise Encyclopedia entry on the Yakṣapraśna (Hindupedia), which also mentions Nilakantha.
  - Caitanya-caritamrta Madhya 17.186 (Vedabase), which quotes "tarko 'pratiṣṭhaḥ".
  - Bibek Debroy's Open magazine column on the Yaksha episode.
  - Medhatithi on Manu, for the Manu parallels.
  - Abhinav Agarwal's Swarajya columns on forgiveness and on Savitri.
  - Wikipedia summaries of scholarship on Savitri and on the Udyoga Parva.
- All gists are paraphrases. No classical Sanskrit commentary (such as Nilakantha's Bhāratabhāvadīpa) could be reached online in a usable form.

## Coverage
- All 62 entries are filled. The first 41 come from the earlier run and were kept as they were; the last 21 (Savitri, Yaksha Prashna, Udyoga) are new.
- Every entry has at least 2 `commentaries` items. In 37 entries, though, those 2 are only Ganguli's translation plus a BORI textual note. **Only 25 entries have two or more independent interpretive sources.** The thinnest are:
  - the Draupadi–Yudhishthira debate verses (3.29.x, 3.31-32.x);
  - the Nahusha answers (3.183.x);
  - most of the Vyadha Gita verses;
  - the Durvasa episode (3.264.x);
  - the Yaksha definitions passage (3.314.89, 91, 93, 97, 112, 114, 120).

## Data errors

### 1. Reference numbering (whole file)
- None of our ids match the BORI critical edition, except 5.27.26. Our chapter numbers run 1 to 17 ahead of BORI (for example, Savitri is our 3.298, BORI 3.281; Yaksha is our 3.314, BORI 3.297), and our verse numbers are usually 2 to 3 higher.
- Our ids also don't match Ganguli's section numbers: Savitri is sec. CCXCV and Yaksha is sec. CCCXI.
- Vedabase cites "tarko 'pratiṣṭhaḥ" as Vana 313.117; ours is 314.119.
- Each `verified_ref` gives the BORI number. If the app shows references, add a critical-edition reference or label ours as "vulgate".

### 2. Wrong speaker or listener (`attribution_ok: false`)
- **3.57.15:** the speaker is Damayanti and the listener is Varshneya (Nala's charioteer), not as recorded.
- **3.133.13:** the hawk speaks to King Ushinara, not Shibi. The Shibi version is a separate telling at BORI 3.197.
- **3.183.5:** Nahusha (as the serpent) answers Yudhishthira; it is not Yudhishthira speaking. Fix our_note as well.
- **3.58.30:** our Sanskrit blends Damayanti's line with part of Nala's reply.

### 3. Translations that misstate or truncate the verse (`translation_ok: false`)
- **3.28.27 (Prahlada on forgiving a former benefactor):** our translation follows the vulgate "even when the offence is grave". BORI reads "when the offence is *not* grave", and that reading matters for anyone being pressed to excuse serious harm. Use the critical reading.
- **3.314.112 ("yaḥ kriyāvān sa paṇḍitaḥ"):**
  - Our translation calls all readers and teachers "addicts and fools". The passage (and Ganguli) says scholars who are given to vice are fools, and that the one who acts rightly is learned.
  - The setting is also wrong: the question is what makes someone a Brahmin (birth, conduct, study or learning), not what makes a person learned.
- **3.314.121:**
  - The Yaksha asks two things: who is a person, and who has every wealth (*sarvadhanī*). Our translation collapses the answer into "a true person".
  - It also drops the critical text's first answer, that a person lives on in the fame of their good deeds.
- **5.27.26 (Sanjaya):** we drop the last quarter-verse, "knowing this, do not go to war". That clause is the point: Sanjaya is using a truth about mortality to argue the wronged side out of its just claim, and Yudhishthira and Krishna reject the argument.

### 4. Readings that differ from the critical text (translation follows our Sanskrit, but the source is uncertain)
- **3.314.65:** our Sanskrit has "vidyā", so the line says learning is the traveller's friend. BORI reads *sārtha* (a companion or caravan), and so does Ganguli. Our "learning" line rests on a vulgate or popular reading.
- **3.314.120 ("the news"):** our first line ("earth the pot, sky the lid") is not the BORI-appendix reading, which is "in this cauldron of great delusion"; Ganguli follows BORI. I could not find a printed source for our line.
- **3.264.10:** ours reads "you who give a way to the helpless"; BORI's appendix reads it as a plea, "be the way of the helpless".
- **3.183.43:** ours has *jñāna-nityatā*; BORI has *dāna-nityatā*.

### 5. Verses that are not in the critical text at all
- **The Durvasa episode (3.264.8, 10, 11, 40, 44)** is in BORI Appendix I No. 25.
- **Most of the famous Yaksha Prashna lines are in BORI Appendix I No. 32**, a later insertion: 3.314.89, 91, 93, 97, 112, 114, 116 ("kim āścaryam"), 119 ("mahājano yena gataḥ") and 120 ("kālaḥ pacati").
- These verses are traditional and much loved, but the app should not cite them as critical-edition text.

### 6. Sanskrit typos
- **3.29.12:** दूयोरेष should be द्वयोरेष.
- **3.29.20:** वस्तु should be यस्तु.
- **3.31.2:** चराम्भुत should be चराम्युत.
- **3.58.30:** द्व्रवीमि should be द्ब्रवीमि.
- **3.183.33:** विमानन should be विमानेन.
- **3.192.43:** विक्लबोसि should be विक्लवोऽसि.
- **3.298.44:** सौहदात् should be सौहृदात्, and विशेपेण should be विशेषेण.
- **3.314.65:** आतुरस् च should be आतुरस्य च, and भिषङ्भित्रं should be भिषङ्मित्रं.
- **3.314.79:** लोमं should be लोभं.
- **3.314.89:** द्वन्द्वसहिष्णुत्वंहीर् should be द्वन्द्वसहिष्णुत्वं ह्रीर्.
- **3.314.91:** सुखैपित्वम् should be सुखैषित्वम्.
- **3.314.114:** प्रीयो should be प्रियो.
- **3.314.120:** पिघानं should be पिधानं.
- **3.314.121:** यस् should be यस्य.
- **Missing word breaks:** 3.314.71, 116, 119, 121.

### 7. Smaller notes
- **3.213.43:** our line ("good things keep finding their way to you") overstates the verse into a promise of reward.
- **3.183.5:** the second sentence of our translation renders the next verses, not this one.
- **3.31.2:** the second verse is only partly translated.
- **3.234.14:** "and watched" is an addition to the verse.
- **3.314.71:** *dākṣya* is rendered three ways by translators: competence, integrity, liberality.
- **3.314.132:** *ānṛśaṃsya* literally means "non-cruelty". "Kindness" is acceptable, but "not being cruel" or "compassion" is closer.

## Cautions for editors

### Verses that could be turned on someone who was wronged
These would land badly if read as "swallow it" or "let it go":
- the forgiveness cluster (3.28.27-28, 3.29.x);
- 3.210.46;
- 3.298.50 ("help without expecting return"), which can be hard on burnt-out caregivers;
- 5.27.26, Sanjaya's plea for peace on behalf of the side that did wrong.

The epic itself argues against one-sided readings here: Draupadi and Bhima answer Yudhishthira, and Krishna answers Sanjaya.

### Mortality and grief
- These verses face death directly: 3.314.65, 116, 120 and 121, and 5.27.26.
- The Savitri verses are set at a husband's death, and the story ends with him restored to life. That ending can sting for widowed readers.
- 3.314.79 ("drop anger and you do not grieve") must not read as blame for grieving.

### Caste
- 3.314.112 sits in a passage that ranks a badly behaved Veda scholar below a Shudra. 3.183.x (Nahusha) also discusses caste.
- Keep readings on conduct over credentials, and do not reproduce the caste comparisons.

### Gender
- 3.58.30 and 3.234.14 frame the wife as "medicine" for her husband or as a servant to him; our gender-neutral lines help.
- 3.314.65 ("the spouse is the friend at home") can sting for widowed, separated or single readers.

### Self-harm
- 3.133.13 (the king cuts his own flesh) needs care for readers at risk of self-harm.

### Insomnia
- 5.33.14 (Vidura's list of the sleepless) mixes victims with thieves. Don't present insomnia as a moral diagnosis.

## Weak or missing sources
- **Yaksha definitions (3.314.89, 91, 93, 97, 114, 120):** only Ganguli and the BORI apparatus were available.
- **Durvasa verses (3.264.x):** only Ganguli and the BORI apparatus were available.
- **Source of our 3.314.120 first line:** unverified.
- Prekshaa, openedition and a Vidura Niti PDF on archive.org returned bot checks or errors and were not used.
