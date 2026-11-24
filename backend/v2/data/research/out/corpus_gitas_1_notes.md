# corpus_gitas_1: Ashtavakra Gita (56 verses): editor notes

## What was used
- **Swami Nityaswarupananda, *Astavakra Samhita* (Advaita Ashrama, 1940)**: word-by-word gloss, translation and verse notes. Read via the Ambuda proofing text: https://ambuda.org/proofing/ashtavakra-samhita/download/text. Paraphrased only, since the book is still in print.
- **Rai Bahadur Babu Jalim Singh, *Ashtavakra Gita bhasha-tika* (Hindi, 1903)**: anvaya and bhavartha for every verse. Read from the archive.org OCR of item in.ernet.dli.2015.540253.
- **John Richards' translation (1994, wisdomlib)**: used for translation checks and context.
- **Lala Baijnath's 1904 translation (archive.org)**: used for one rendering check (1.17).
- Every entry has two commentary items (Nityaswarupananda and Jalim Singh). **54 of 56 have two substantive notes.** For 8.1 and 18.59, Nityaswarupananda adds no note to his translation, so only Jalim Singh comments.

## Source limits
- There is **no classical Sanskrit bhashya by a major acharya** on this text. Vishveshvara's tika exists (Naval Kishore 1896; Mumukshu Bhavan scans on archive.org), but its OCR is unreadable, so it was not used.
- Swami Chinmayananda's commentary appears on archive.org only as what looks like an unauthorised scan, so it was not used. Swami Shantananda Puri's *Instant Self-Awareness* (2004) was checked; it is mostly translation, with no notes on these verses.
- Both commentaries were read as **noisy OCR**. The gists are reliable, but check exact wording against print before quoting.
- `practical_reading` fields are editorial applications drawn from the commentaries, **not quotes from modern teachers**.
- Jalim Singh is a traditional Vedantin and sometimes sectarian. Examples: 9.5 is an anti-Nyaya polemic, and in 1.5 he says varna duties are "for the ignorant". Use his framing with care.

## Data errors
1. **8.1 holds two verses.** The Sanskrit and translation are 8.1 (bondage) plus 8.2 (freedom). The reference should be 8.1–2.
2. **Sanskrit typos:**
   - 3.1: `तवात्मज्ञानस्य` should be `तवात्मज्ञस्य` (the extra syllable breaks the metre; both editions agree).
   - 8.1: `दृष्यति` should be `हृष्यति`, and `गृण्हाति` should be `गृह्णाति`.
   - 13.1: `स्वास्थं` should be `स्वास्थ्यं`.
   - 15.8: `मोऽहं` should be `मोहं`. As written it reads like "so 'ham" and changes the sense.
   - 17.4: `तदृशो` should be `तादृशो`.
   - 18.61: `प्रवृत्ति रुपजायते` should be `प्रवृत्तिरुपजायते`.
   - 11.3: `वान्छति` is a variant spelling of `वाञ्छति`.
3. **Translations or lines that misstate the verse** (`translation_ok: false`):
   - **16.1**: "forget them all" (the scriptures) narrows *sarva-vismaraṇa*, "forgetting everything".
   - **1.17**: "self-reliant" for *nirbhara* has no support. Translators give "formless / without bulk" or "ever full".
   - **18.98**: "even everywhere" is garbled; *samaḥ sarvatra* means "the same everywhere".
   - **1.8**: the line and misuse note say "not the *only* doer". The verse, and both commentators, deny doership to the Self entirely.
4. **Smaller wording drifts** (flagged in `translation_note`):
   - 9.1 merges "done/undone" with "pairs of opposites", and renders *tyāgapara* as "become free".
   - 9.5's line adds "fighting over opinions".
   - 15.4's line adds "achievements".
   - 1.5's line has "what others can see".
   - 15.9: "made of nature's qualities"; commentators read *guṇāḥ* as the senses.
   - 18.11: "ruling a kingdom"; all three translators read *svārājya* as "dominion of heaven".
   - 18.81: "pray for".
   - 3.3: "beggar".
5. **Setting error, 13 entries (all chapter 18):** "the long closing chapter" is wrong. Chapter 18 is the longest chapter and Ashtavakra's last discourse, but Janaka's chapters 19–20 follow it.
6. **5.4 has no prasang** (null).
7. **`our_note` checks:**
   - 17.1: "not counsel to the lonely" is a guardrail. Jalim Singh reads *ekākī* as literal solitude for renunciates; Nityaswarupananda reads it metaphysically.
   - 18.2: "the text does not specify" what renunciation means; Jalim Singh does specify an inner, cognitive renunciation.
   - 10.8 and 10.7: the misuse notes ("rest, not quitting obligations"; "not against good deeds") are softer than both commentators, who endorse withdrawing from worldly action and call dharma worthless as a goal.
   - 18.3: Nityaswarupananda calls ordinary duty "slavery in the form of virtue". Don't pass that to caregivers.

## Cautions for plan building
- **Death and suicide-adjacent verses. Never show to a reader with suicidal thoughts or self-harm:** 5.4 ("equal in life and death… dissolve now"), 15.10 ("let the body go even today"), 18.99 ("neither clings to life"), 10.8 ("now, at last, stop"), 3.11, 17.7, 15.9.
- **Verses that question grieving. Not for early grief days:** 8.1 (grieving listed as bondage; Jalim Singh names grief for dead loved ones), 15.9 ("why grieve?"), 11.1, 3.11 ("the world is illusion").
- **Abuse-sensitive verses:** 18.55 (unmoved by family scorn), 16.9 (don't flee the world), 1.2 (forgiveness), 9.4 (accept life's swings). Each needs its boundary guardrail.
- **Karma or "your thinking" as blame:** 11.3 (destiny / past karma), 1.11 ("believe you're bound and you are").
- **Dissociation risk:** 1.4, 3.10, 8.4, 15.4 ("set the body apart", "see your body as another's", "no I").
- **Other sensitive topics:** caste (1.5); loneliness (17.1); dismissal of duty (18.3, 9.1, 10.7, 10.8).
- **Overall:** the text is radical Advaita. It repeatedly says the world is illusion and that the sage has no duties, which lands badly in acute distress. Its best fit is "steady" and "act" days for people who are not in crisis.

## Clusters that fit new plans
- **Overthinking / rumination:** 11.5, 15.19, 18.98, 18.39, 17.4.
- **Burnout / obligations:** 9.1, 9.4, 10.7, 10.8, 13.3, 18.3, 18.20, 18.58, 18.61.
- **Criticism / people-pleasing:** 3.10, 18.99, 18.81, 18.55 (with guardrail).
- **Money, status, enough:** 3.1, 3.3, 13.1, 18.2, 18.11, 18.91, 10.3, 15.2.
- **Identity and self-worth:** 1.5, 1.16, 2.14, 15.4, 15.5, 15.8, 1.8 (fix the line first).
- **Spiritual seekers:** 9.5, 15.1, 16.1 (fix the translation), 16.10, 17.1.
