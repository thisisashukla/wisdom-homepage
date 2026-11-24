# up_yv_gitas: editor notes (30 verses: Upanishads, Yoga Vasishtha, Ashtavakra and the Mahamandal gitas)

## Status
- All 30 entries are filled, in input order. 10 were already filled by the earlier run and were kept. 20 were filled in this run. One more, vishnu_gita.1.60, was enriched: it had no commentary items.
- Every entry has at least two sourced notes. But not all of these are classical commentary:
  - **Upanishads.** Real bhashyas. Shankara via Sitarama Sastri, Ganganatha Jha, Madhavananda and the GRETIL Sanskrit (Aitareya). Madhva via S. C. Vasu (Katha, Mundaka). Lokeswarananda for the Chandogya. Müller SBE 1 and 15 for translation checks.
  - **Yoga Vasishtha.** One classical commentary, Anandabodhendra's Tatparya-prakasha (Nirnaya Sagar ed. 1937, archive.org OCR). The second note is chapter context from Mitra's 1891 translation.
    - **yv.1.12.22 has no commentary.** The Tatparya-prakasha page for it is missing from the OCR. Both notes are context: Mitra and the Sanskrit on Wikisource.
  - **Shambhu, Surya and Vishnu Gitas.** No commentary exists. The notes are the edition's own Hindi translation plus the surrounding Sanskrit. For vishnu_gita.1.98 the second note is Bhartrihari, the source the verse is reworked from.
  - **Ashtavakra 16.2.** Nityaswarupananda (1940) and Jalim Singh's Hindi tika (1903).

## Data errors
1. **shambhu_gita.4.83: translation wrong** (`translation_ok: false`).
   - *Jnani-sannidhau* means "in the judgement of the wise". It does not mean the effort is "made in the company of the wise".
   - "Is the better one" belongs to the next verse; the verse itself is half a sentence.
   - Suggested fix is in the entry. Prasang is null.
   - The verse is about the ancestors' cosmic role, not parenting. Using it in a parenting plan is an analogy; say so.
2. **up_maha.113: reference unverified.**
   - The verse is near word-for-word **Yoga Vasishtha 1.17.8**: Rama's lament on craving (Mokshopaya numbering 1.16.8).
   - No reachable Maha Upanishad text: sanskritdocuments.org shows a Cloudflare challenge.
   - Confirm "Maha Upanishad 3.22, Nidagha to Ribhu" against a print edition, or re-attribute it to the YV.
3. **Numbering offsets in the Mahamandal gitas.** These editions count speaker lines ("X uvaca") as verses. Our numbers drop them. Keep one convention and note it.
   - surya_gita.3.36 is 3.40 in the 1967 ed.
   - vishnu_gita.1.98 is 1.104 in the 1919 ed.
   - shambhu_gita.4.83 is 4.85 in the 1920 and 1989 eds.
   - vishnu_gita.1.60 is 1.63 (noted earlier).
4. **Lines that overstate or shift the verse.** These are `translation_ok: true` with a note.
   - **up_chhandogya.582.** The line "Understand the joy, and action follows" reverses the logic. The text says we act for expected happiness, so happiness must be investigated. That leads to 7.23: no happiness in the finite. Shankara also reads "action" in 7.21 as sense control and concentration.
   - **yv.2.9.33.** The line "never by force" overstates. The verse says "by strenuous effort", and the verse before it (9.32) says to move the child-mind *forcibly*. The commentary's version: settle and soothe it, then rein it in gradually, not abruptly (citing Gita 6.25).
   - **yv.1.12.15.** "What has anyone gained?" Both the commentator and Mitra read it as "what is *lost* to anyone?" (nothing).
   - **yv.2.7.17.** "The speaker is heard": the Sanskrit only says the speaker speaks.
   - **up_brihadaranyak.477.** "Whatever deed he does, that he becomes". The clause means he *attains or reaps* that (Madhavananda, Müller). The "becomes" idea is earlier in the verse.
   - **yv.1.16.22.** Anandabodhendra's image is a child who drops his *studies* the moment he gets a toy, not a child tiring of a toy. His version fits the cant-get-started plan even better.
   - **ashtavakra.16.2.** Jalim Singh reads it positively: a mind free of hope is at peace, whatever you do. Our translation follows Nityaswarupananda. Both are traditional.
   - **up_mundaka.3.1.2.** "The content lord": Shankara has "worshipped". The Madhva translator's "ever-content" supports ours.
5. **vishnu_gita.1.98 reworks Bhartrihari, Vairagya-shataka 31.** That verse is the famous list of fears ending "dispassion alone is fearless". Consider crediting it.
6. **Attribution checks that passed:**
   - yv.1.10.19: the speaker is Rama's servant, reporting to Dasharatha.
   - surya_gita: Surya and the seven sages, per the edition's preface.
   - shambhu_gita: Shiva and the Pitris.
   - up_brihadaranyak.477: Yajnavalkya to Janaka. Within the verse, "a person is made of desire" is a view he cites ("they say").

## Weak or thin sourcing
- **up_maha.113.** Notes are from commentaries on the Yoga Vasishtha parallel, not the Maha Upanishad.
- **yv.1.12.22.** Context only; no commentary read.
- **shambhu_gita.4.83, surya_gita.3.36, vishnu_gita.1.60, vishnu_gita.1.98.** Edition Hindi plus context only. These are early-20th-century Bharat Dharma Mahamandal publications, with no manuscript tradition or classical commentary found. Label them as such in the app.
- **Yoga Vasishtha.** Anandabodhendra's glosses are brief: one line, for 2.7.17 and 1.10.19. The Mokshopaya-tika (Bhaskarakantha) on Sanskrit Wikisource could add a second commentary for the Vairagya chapters. The Wikisource API was intermittent, and the tika was used only for up_maha.113.
- **Sites not used because of bot checks:**
  - sanskritdocuments.org
  - sacred-texts.com: Müller was read from archive.org instead.
  - swami-krishnananda.org
  - Gita Supersite: not touched, per the brief.

## Cautions for plan editors
- **too-heavy:day2 and nothing-matters:day4 (up_mundaka.3.1.2).** Shankara's own examples of grief are a dead son and a dead wife. Don't quote the bhashya. Say sorrow "eases", not "ends".
- **raising-kids:day3 and day5 (Aitareya 2.1.2-3).**
  - The text is father- and son-centred, and the passage moves on to the parent's death (third birth).
  - Müller notes some manuscripts open this chapter by asking pregnant women to leave.
  - Sensitive for pregnancy loss, infertility and bereaved parents.
  - The core line "she who nourishes must be nourished" is sound. Shankara names the husband as the one who must care for her.
- **nothing-matters plan (yv.1.12.15, yv.1.10.19, yv.2.14.50, ashtavakra.16.2, surya_gita.3.36, up_chhandogya.526).** Several verses validate withdrawal or disenchantment.
  - yv.1.10.19 describes classic depression signs; keep its existing "talk to someone or a doctor" note.
  - Rama's lament chapters and YV 2.14 contain harsh lines that must not be quoted near these verses. Examples: "better a frog in mud than a man without inquiry" (2.14.46); "a stone heart" (2.14.51).
  - The plan should clearly point to help for anyone with suicidal thoughts.
- **keeping-a-resolve and wanting-more (YV 2.7).** The same chapter calls fate "a consolation for weak minds" (2.7.15) and says people go to hell for lack of effort (2.7.9). Quote only the chosen verses. Effort framing can feel like blame for readers who are ill or exhausted.
- **cant-get-started:day2 (up_chhandogya.582).** Fix the line, or it reads as a productivity hack and could blame people who feel no joy in anything (anhedonia).
- **Late gitas.** These are early-20th-century texts; don't present them as ancient scripture.
