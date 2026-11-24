# corpus_gitas_2: editor notes (56 verses)

Covers the Ashtavakra (1), Avadhuta (14), Dheesh (5), Hamsa (10), Rama (10), Shakti (8), Shambhu (6), Surya (1) and Vishnu (1) gitas.

## Sources used

- **Ashtavakra Gita.** Swami Nityaswarupananda's *Astavakra Samhita*, read from the Ambuda proofing text. Jalim Singh's Hindi tika (1903), read from archive.org in.ernet.dli.2015.540253.
- **Avadhuta Gita.**
  - Swami Paramananda's *Paramanandi* Hindi bhasha-tika, Khemraj (archive.org avadhuta-gita-with-paramananda-tika-khemraj). This is a 2018 reprint that says the publisher reserves rights, so it is paraphrased only.
  - Kannoo Mal's English translation with introduction (archive.org Avadhuta_Gita_with_English_Translation). It is a translation, with no notes on individual verses.
  - Hari Prasad Shastri's selection (archive.org AvadhutGitaHariPrasadShastri).
  - Bhagavata 11.11.29-32 with the BBT purport, from vedabase.net. This is copyright, so it is paraphrased.
- **Hamsa Gita.**
  - BORI critical text of Shanti Parva, from the GRETIL e-text.
  - K. M. Ganguli's translation in P. C. Roy's edition, vol. 9 (archive.org mahabharata-vol-9), section CCC. Its footnotes pass on Nilakantha's glosses.
  - Manusmriti 2.162-163 with Medhatithi's commentary, Ganganath Jha's translation on wisdomlib.
  - BORI book 3 for the Yaksha parallel.
- **Rama Gita (Adhyatma Ramayana, Uttara 5).**
  - Lala Baij Nath's 1913 translation with notes (archive.org TheAdhyatmaRamayana).
  - An anonymous Sanskrit tika in a Nepali printed Rama Gita (archive.org qtju-ramagita-adhyatma-ramayana-uttara-kanda-satika-san). The OCR is noisy and only some verses are legible.
  - The Gita Press Adhyatma Ramayana, used to check numbering.
- **Dheesh, Shakti, Shambhu, Surya and Vishnu gitas.**
  - The Bharat Dharma Mahamandal editions on archive.org, each with the publisher's own Hindi rendering: Dhisha 1st edition and the 1989 2nd edition; Shakti 1957, with a 1916 scan used for a numbering cross-check; Shambhu, the Kashi scan; Surya 1967; Vishnu 1919.
  - The Devi Anugraha Foundation's English Shakti Gita (archive.org sri-shakti-gita-english) was checked. Its Sanskrit and readings are garbled; for example, at 7.122 it prints the Bhagavad Gita's *sākṣī*. Do not use it as a source.
- **Not used:**
  - Gita Supersite, as the brief requires.
  - sacred-texts.com, which returned a Cloudflare challenge.
  - vedabase.io, which renders client-side. vedabase.net was used instead.

## Data errors

1. **All 10 Hamsa Gita references are wrong.** Our "Shanti 12.305.x" matches no edition I checked. The Hamsa Gita is **BORI 12.288**, and it is section **CCC (300)** in Ganguli/Roy. The verse numbers within the chapter (7, 10, 11, 17, 21, 25, 26, 31, 40, 42) are correct against BORI 12.288.
2. **All 21 Mahamandal-gita references are off by 1 to 4** against every printed edition read. The likely cause is that the printed editions number speaker lines (e.g. "devā ūcuḥ ॥1॥") as verses. Mapping (ours → printed):
   - **Dheesh:** 1.4-5 → 1.5-6; 1.42 → 1.45; 1.46-47 → 1.50-51; 4.19 → 4.21; 7.27 → 7.28.
   - **Shakti:** 1.39-40 → 1.42-43; 1.47-48 → 1.50-51; 1.51 → 1.54; 5.133 → 5.135; 5.137 → 5.139; 6.27 → 6.29; 6.149-150 → 6.151-152; 7.118 → 7.122.
   - **Shambhu:** 2.43 → 2.45; 6.75 → 6.77; 6.91-92 → 6.92-94; 7.53 → 7.56; 7.65-66 → 7.69-70; 7.80 → 7.84.
   - **Surya:** 7.54 → 7.56.
   - **Vishnu:** 1.58 → 1.61.

   Decide whether to adopt printed numbering or to state which convention we use.
3. **Avadhuta 1.68** is 1.67 in both editions read (Paramananda and Kannoo Mal).
4. **Dheesh 1.4 listener is wrong.** Suta is speaking to his guru **Vyasa**, not "Shaunaka and the sages".
5. **Avadhuta 3.34 setting and translation.**
   - The setting "a grieving friend" is not in the text. Paramananda reads "friend" as Dattatreya's own mind; Kannoo Mal reads it as the heart.
   - The translation also drops the verse's closing refrain line, "I am the nectar of knowledge, of one taste, like the sky" (`translation_ok: false`).
6. **Shambhu 2.43: "gentle power" misstates sāttvikī.** In context, sāttvikī means the sattva-power that arises from the balance of attraction (rajas) and repulsion (tamas). Suggested wording: "My sattvic power" (`translation_ok: false`).
7. **Surya 7.54 setting.**
   - The verse describes the **videha-mukta** (one beyond mind). The next verse concedes that the jivanmukta still meets pain from prarabdha karma.
   - The listeners are "the great sages" (maharṣayaḥ). "Seven sages" is not stated in the passage I read.
8. **Shambhu 7.65-66: the Sanskrit is cut mid-sentence.** The last half-line begins the thought finished in 7.71. Also, the "easy way" it announces is remembering Shiva's vibhutis, which are listed from 7.72.
9. **Avadhuta 2.2 our_note.** Our_note says the verse is "a statement about the text". Both sources read apply it to the guru instead (do not judge a teacher by poetic skill).
10. **Hamsa 21:** the Sanskrit has "धनेभ्य" (from riches). The simile needs "घनेभ्य" (from clouds), and Ganguli translates it as clouds. The GRETIL e-text has the same error, so check a printed edition.
11. **Variant readings to note** (our text follows the vulgate):
    - Hamsa 10: our *pratihṛṣyate* (stays cheerful) against BORI *pratimṛṣyate* (bears it).
    - Hamsa 25, first line: our "nābudhān garhayed budhaḥ" against BORI "abudhād vardhate budhaḥ".
12. **Hamsa 42** drops "among brahmanas". Acceptable, but it widens the original audience.
13. **Sanskrit OCR typos.** Details are in each entry's `translation_note`. Most are in the Mahamandal texts:
    - Dheesh 7.27: शक्तचा, सिया, वयमा
    - Shakti 1.39: विमोदिता, वांगमनोधियाम, तवां
    - Shakti 1.47: गुणाश्रयायच्छसि
    - Shakti 1.51: अनन्यभक्सैव, पादपद्यमे
    - Shakti 5.133: गृणीता, मयुक्ताः
    - Shakti 6.27: नानाप्रकारेस्
    - Shakti 6.149: भक्तानचं
    - Shakti 7.118: प्रभवालयस्थानं
    - Shambhu 6.91: अर्थाणि, बाञ्छिताः
    - Shambhu 7.80: भक्तया
    - Surya 7.54: अमनस्कस्यं, संकल्पान, and an unclear first word
    - Vishnu 1.58: आपि
14. **Rama Gita naming and frame.**
    - Ids 5 and 61 use "Ram"/"Lakshman"; the others use "Rama"/"Lakshmana".
    - 61 is not the last verse; 5.62 follows.
    - The whole Rama Gita is narrated by Shiva to Parvati.
    - Verse 3 has Sita (as Lakshmi) present, so "alone" is approximate.
15. **Dheesh 1.42 and Shakti 5.137** are accurate as renderings but depend on adjacent verses. See the notes in those entries.

## our_note claims checked

- **Confirmed:**
  - Avadhuta 8.4, 8.2 and 8.3 are Bhagavata **11.11.29, 11.11.30 and 11.11.31** (vedabase.net). The "recalled" tags can be removed.
  - Shakti 7.118 replaces the Bhagavad Gita 9.18's *sākṣī* with *mātā*.
  - Shambhu 6.91 echoes the Bhagavad Gita 7.16.
- **Corrected:**
  - Hamsa 26 is a **close parallel** to Manusmriti 2.162-163, not the same verse. Medhatithi also says the point is equanimity, not seeking disrespect.
  - Hamsa 40's Yaksha Prashna parallel exists only as a **star passage (3.297 *1383)** outside the BORI critical text, and it reads *tamasā*.
- **Not re-verified:**
  - The Gita parallels in Avadhuta 2.24, Shakti 5.133 and Rama 35.
  - The Upanishad identifications in Shambhu 6.75 (Chandogya 7.1.3, Shvetashvatara 6.11). The Mahamandal Hindi does label them as scriptural sayings.
  - Gita Press chapter numbering for the Hamsa Gita.

## Weak or thin sources

- **Dheesh, Shakti, Shambhu, Surya and Vishnu gitas (21 verses): no classical commentary exists.** The only gloss is the publisher's own Hindi rendering, so each entry has one sourced note (plus a Gita parallel where noted).
  - The Mahamandal's own 1989 preface calls these five gitas "previously unpublished" sectarian texts. I found no older manuscript tradition, and their date and authorship are unverified.
  - The app should not present them as ancient Puranic scripture.
- **Hamsa Gita:** the commentary is Ganguli's translation with occasional Nilakantha footnotes (7, 42), plus BORI textual checks. Medhatithi on Manu adds a real second voice for 26.
- **Avadhuta Gita:** Paramananda is the only verse-by-verse commentary. Kannoo Mal comments only in his introduction (used for 2.1-2), and the BBT purport covers 8.2-8.4.
- **Rama Gita:** this is the strongest group, with Baij Nath's notes plus the Sanskrit tika. The tika was illegible for 5 and 39.
- **Count:** 38 of 56 entries have two or more commentary items. About 12 have two independent interpretive commentaries:
  - Avadhuta 2.1, 2.2, 8.2, 8.3 and 8.4
  - Rama Gita 24, 34, 35, 46, 52, 58 and 61

  The rest pair one commentary with a translation reading or a textual check. 18 entries have a single source.

## Cautions for editors

- **Avadhuta 3.34 ("Why do you weep, friend?")** should never be used in a grief plan's early days. With our current setting ("to a grieving friend") it reads as rebuking mourners.
- **Vishnu 1.58:** the very next verse (printed 1.62) says God cures forgetfulness through calamity sent as discipline. Do not pair the two for a suffering reader.
- **Surya 7.54** ("suffering comes from the mind") is not for readers with pain, illness, grief or depression.
- **The Hamsa insult verses (10, 11, 17, 25, 26)** describe an ideal of character. They must not be read as telling abuse or bullying victims to absorb mistreatment. For 26, use Medhatithi's framing.
- **Other verses that need care:**
  - Avadhuta 8.6 ("free of the noose of hope") with hopeless readers.
  - Shakti 6.149 ("merging") with suicidal readers.
  - Avadhuta 2.1 (take wisdom from any teacher) with readers in exploitative guru relationships.
  - Avadhuta 8.2 ("eats moderately") with readers who have eating disorders.
- **Shambhu 7.80 (sacred embrace)** sits in a vibhuti list whose neighbouring verse (7.82) names lust-free sexual union among reverent acts. Be aware of this when quoting the context.
