# corpus_bg_1: notes for editors (62 verses, Bhagavad Gita 1.28 to 5.12)

## What changed in this pass
- The earlier draft had 50 entries, all sourced from the Gita Supersite (heritage.iitk.ac.in), which we must not use. All 50 were re-sourced. Each commentary gist was checked against, and rewritten from, archive.org copies of:
  - Shankara, tr. A. Mahadeva Sastri (1901): https://archive.org/details/bhagavadgitawith00maharich
  - Ramanuja, tr. A. Govindacharya (1898): https://archive.org/details/gita-bhasya
  - Sridhara Swami, tr. Swami Vireswarananda (1972, still in copyright; paraphrased only): https://archive.org/details/bhagavad-gita-with-gloss-from-sridhar-swami-by-swami-vireshvaranand-ramakrishna-math
  - Swami Sivananda (Divine Life Society, 2012 printing, in copyright; paraphrased only): https://archive.org/details/the-bhagavad-gita-swami-sivananda
- Gists that only the Supersite supported (Madhusudana Sarasvati, Abhinavagupta, Madhva, and the Gambhirananda/Adidevananda translations) were dropped, and so were the claims built on them in other fields. Each affected entry's `research_note` says so. The 1906 Madhva bhashya on archive.org is unusable OCR.
- The 12 empty entries (4.18, 4.20, 4.21, 4.24, 4.38-4.41, 5.2, 5.3, 5.11, 5.12) were researched and written in full.
- Result: all 62 entries have 2 or more sourced commentaries (56 have 4, 6 have 3). No entry cites iitk.

## Data errors (fix in our data)
1. **bg.1.28: wrong speaker and wrong translation.** The first half ("kṛpayā parayāviṣṭo viṣīdann idam abravīt") is Sanjaya's narration. Arjuna's words begin only after "arjuna uvāca", which our Sanskrit puts at the start of the verse. Our English makes Sanjaya's description into Arjuna saying "I am overcome with pity and sorrow". Numbering also differs by edition: Shankara's and Sridhara's texts end 1.27 with the "kṛpayā" half, so their 1.28 is "seeing these kinsmen... my limbs fail".
2. **bg.4.21: "Without hope" for nirāśīḥ.** All the commentaries read it as being free of craving or longing for results, not as hopelessness. In a wellbeing app this could read as endorsing despair. Suggested: "Free of craving, mind and body controlled...". translation_ok is set to false.
3. **bg.3.11: speaker.** In 3.10-12 Krishna is quoting Prajapati's words to the first beings. Govindacharya's Ramanuja and Sridhara present them as Prajapati's speech. Speaker should be "Prajapati (quoted by Krishna)", or the setting should say so.
4. **Wrong `setting` text:**
   - 2.6, 2.8 and 3.2 are Arjuna speaking, but their settings describe Krishna speaking.
   - 4.18's setting describes 4.1-11 (lineage and avatars). The verse belongs to 4.16-23, the discussion of action and inaction.
5. **bg.5.2: Sanskrit formatting.** "श्री भगवानुवाच" runs into the verse with no break.
6. **Interpretive glosses in our translations or lines:**
   - 3.42 "higher than the body" is Shankara's gloss and is not in the Sanskrit. Ramanuja reads saḥ ("that beyond the intellect") as desire, not the self.
   - 3.38 "wisdom" for idam follows Shankara. Ramanuja reads it as "the world of creatures".
   - 4.11's line "Every path... leads to me" goes beyond the verse and the commentaries.
   - 4.20's line "leaning on no one's approval" narrows nirāśraya.
   - 2.3 "unmanliness": suggest "loss of nerve".
7. **our_note claims that could not be verified once the Supersite was dropped:**
   - 3.38: Madhusudana reads the three images as three grades of covering.
   - 2.11: "gentle irony". It is not in any commentary checked; the smile is in 2.10.
   - 4.24: "recited before meals". This is common practice but not stated in the sources read.
   - 5.2: our_note's Ramanuja summary ("easier, safer") comes from 5.3-6, not from his gloss on 5.2.

## Weak or thin sourcing
- Sridhara's gloss on 4.24 is missing from the archive.org OCR (a page appears to have been skipped). That entry has 3 commentaries.
- Shankara has no commentary on chapter 1 or on 2.1-2.10. For 1.28, 2.2, 2.6 and 2.8 his 2.10 introduction is cited instead and labelled that way. For 2.3, Sivananda stands in.
- Sivananda's notes on 2.2-2.8 are mostly bare translation.
- All four sources are Advaita, Vishishtadvaita or Advaita-leaning, so there is no Dvaita (Madhva) or Kashmir Shaiva voice in this batch now.
- The Sridhara and Sivananda editions are in copyright and were paraphrased only.

## Cautions before using these verses in plans
- **Grief.** 2.11, 2.25, 2.26, 2.27, 2.28 and 2.30 all tell the listener not to grieve. None should go on an early day of a grief plan.
  - 2.27 relies on rebirth.
  - 2.28: Shankara quotes a consolation line ("he is not yours, nor you his") that sounds cold to the newly bereaved.
  - 2.72 mentions the hour of death and could worry the bereaved about a loved one's last moments.
- **Doubt and faith.** 4.40 calls the doubter "most sinful" and says he "perishes" (Shankara; Sridhara reads this as failing to reach the goal). It is risky for readers with anxiety or OCD-type doubt, faith crises, or experience of spiritual abuse. 4.39 makes faith a condition.
- **Detachment from family.** 2.57 ("unattached even to sons", per Sridhara) and 1.28 (a war against kin) can wound parents, caregivers or people estranged from family.
- **Caste and ritual.**
  - 4.7: Shankara and Ramanuja define the dharma that declines as the varna-ashrama order.
  - 3.13 and 3.11 concern Vedic household rites.
  - 2.3's "unmanliness" is gendered.
  - Keep modern readings free of caste.
- **Pressure to keep going.** 5.2, 3.5, 3.4 and 4.20 can sound like "never stop" to someone burnt out. 5.12's "let go of the fruit" can read as "don't ask for fair pay". The misuse note on 5.12 is right; apply the same idea to 4.20 and 4.21.
- **Purity language.** 4.38, 5.11 and 3.13 ("purifier", "sin") can land badly with readers carrying shame or scrupulosity.
- **Paradox and abstraction.** 4.18, 4.24, 2.16 and 2.69 are hard to apply in a crisis. Pair them with a concrete practice.
