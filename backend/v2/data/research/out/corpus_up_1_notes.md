# corpus_up_1 notes (58 Upanishad verses)

All 58 verses have an entry in `corpus_up_1.json`, in input order. 39 have two or more sourced commentaries; 19 have one.

## Sources used
- **Shankara on the Brihadaranyaka:** Swami Madhavananda's translation, per-section pages on wisdomlib.org (the-brihadaranyaka-upanishad).
- **Shankara on the Chandogya:** Ganganatha Jha's 1942 translation on wisdomlib.org (chandogya-upanishad-shankara-bhashya).
- **Madhva on the Chandogya:** S. C. Vasu's translation on wisdomlib.org (chandogya-upanishad-madhva-commentary).
- **Madhva on the Brihadaranyaka:** S. C. Vasu, Sacred Books of the Hindus vol. 14 (1916), full text from archive.org (sacredbooksofthehindusvol14brahadaranyakopanisahdpart2_202002). The OCR is noisy, so I read only the passages I could find cleanly.
- **Swami Krishnananda's Brihadaranyaka discourses** (swami-krishnananda.org): pages for 4.2, 4.4 (parts b and c) and 5.1. After those, the site showed a bot check, so I stopped using it, as the brief requires.
- **Scholarly translations for checking wording:** Hume (1921, archive.org) and Müller SBE 15 (local copy). Müller's footnote on 3.5.1 is counted as a commentary for that verse.
- **Adhyatma:** K. Narayanasvami Aiyar, *Thirty Minor Upanishads* (1914, archive.org), plus the Vivekachudamani parallels in Madhavananda's translation on wisdomlib.
- **Aitareya:** Shankara's Sanskrit commentary (GRETIL file).
- **Not used:** sanskritdocuments.org (showed a Cloudflare check) and the Gita Supersite.

## Data errors and translation problems (fix these)
1. **Brihadaranyaka 3.5.1 (`up_brihadaranyak.283`), translation_ok = false.** Our translation says "live like a child" / "childlike simplicity" for *bālya*. That follows Müller and Hume. Shankara and Madhva both read *bālya* as "strength" (of Self-knowledge, or of reasoning). Our own `our_note` follows Shankara, so translation and note contradict each other. Müller's footnote says the passage is obscure and possibly corrupt. Suggested wording: "rest in the strength that knowing gives (some translate: live like a child)".
2. **Brihadaranyaka 4.4.3 and 4.4.4 (`.473`, `.474`), translation_ok = false.** Our translation says "letting go of ignorance" for *avidyāṃ gamayitvā*, following Müller and Hume. Shankara reads it as "making the body senseless", and our `our_note` says the same, so again they contradict each other. In 4.4.4 our text also drops the end of the verse: the new form is that of ancestors, gods and others, according to one's deeds and knowledge. The "newer, more beautiful form" line should not reach a grieving reader as a promise.
3. **Brihadaranyaka 2.4.5 (`.191`) is cut before its point.** We give only the husband, wife and sons clauses. The verse ends by saying the Self is to be seen, heard about, reflected on and meditated on. Without that ending it reads as "all love is selfish". Madhva rejects the selfish reading outright: the beloved is dear by the will of the Lord. Include the ending or paraphrase it.
4. **"tat tvam asi" (Chandogya 6.8.7 `.498`, and the refrain in `.508` and 6.9-6.16).** Madhva splits the words as *atat tvam asi*, "you are not that" (the Lord), which is the opposite of the Advaita reading. Readings in the app should not present the identity reading as the only one.
5. **Chandogya 8.3.2 (`.612`).** The speaker field "Prajapati's teaching (narrator)" is wrong: Prajapati only enters at 8.7, so this is the narrator. The translation gives only the second half of the verse. The first half says living and dead loved ones, and whatever one longs for, are found in the self in the heart. That half is relevant to grief plans, but it should not be turned into a promise of reunion.
6. **Brihadaranyaka 1.4.16 (`.92`) is partial.** The verse first covers offerings to gods, sages and ancestors, and ends with "all beings wish him safe". Shankara frames it as the life of the ritual householder, not the knower.
7. **Brihadaranyaka 4.4.14 (`.488`) has two readings.** Ours: "while here we may know it" (Hume). Shankara: "we have somehow known it" (a thanksgiving), which `our_note` follows. Both are defensible.
8. **Chandogya 4.4.2 (`.304`).** `our_note` says "the tradition does not read unknown paternity here". That is Shankara's reading (her husband's house; the father died early), not the whole tradition. Many modern scholars read her as not knowing the father. Say "Shankara reads...".
9. **Chandogya 4.4.5 (`.308`).** Our translation adds "true" ("no one but a *true* brahmin"); the Sanskrit only says a non-brahmin could not say this. Both Shankara and Madhva explain the line in caste terms; Madhva adds that shudras are not straightforward. Do not carry that reasoning into readings.
10. **Brihadaranyaka 1.3.28 (`.56`).** It is the sacrificer who mutters the prayer, while the Prastotri priest chants. The verse glosses all three lines itself as "make me immortal".
11. **Numbering notes.**
    - Brihadaranyaka 3.9.28 (`.387`) is the 4th of 7 verses under that number (often cited 3.9.28.4).
    - Chandogya 1.1.10 is 1.1.8 in Madhva's edition.
    - Jha prints Chandogya 4.4.3-4, 5.3.5-6 and 5.11.5-6 as single units.
    - wisdomlib mislabels Jha's chapter 8 sections as "Section 7.x", and Madhavananda's 1.3.28 heading as "1.13.28".
    - All Brihadaranyaka numbers are the Kanva recension.
12. **Adhyatma verse numbers (15, 47, 53-54) are not independently verified.** sanskritdocuments was blocked, and Aiyar's translation is unnumbered prose, though the order fits. The same verses are Vivekachudamani 324, 440 and 451-452 (Madhavananda numbering). `our_note` for `.22` is correct that the moss verse is in the Vivekachudamani section on heedlessness (*pramāda*). In VC 440 the last word differs: *jīvanmukta-lakṣaṇaḥ*.
13. **Chandogya 1.1.10 (`.10`) is about a ritual.** The verse concerns the rite chanted with Om. Applying it to everyday acts done "with knowledge and faith" is a modern extension, so mark it as such.

## Weak or thin sourcing (one commentary only)
- **Only Shankara was read** for 21 verses:
  - Brihadaranyaka: `.92`, `.188`, `.189`, `.323`, `.332`, `.334`, `.387`, `.418`, `.429`, `.474`, `.501`
  - Chandogya: `.309`, `.393`, `.423`, `.489`, `.518`, `.521`, `.585`
  - Aitareya: `.34` (Shankara's Sanskrit commentary only)
- **Next step for the Brihadaranyaka verses:** Madhva's gloss exists for most of them in SBH vol. 14 but was not extracted. For Aitareya, Müller SBE 1 (Aitareya Aranyaka II.5) is unchecked.
- **Shankara's gloss is very short** (one or two lines) for Chandogya 3.17.4 and 7.21.1, and Brihadaranyaka 2.4.3.
- **Adhyatma (3 verses):** no classical commentary was found. The two "commentaries" for each are Aiyar's surrounding translation and the Vivekachudamani parallel with Madhavananda's note, labelled as such in `who`.

## Cautions for the editor
- **Death and rebirth.** Several verses turn on death or rebirth and should not open a grief plan:
  - Brihadaranyaka 3.9.28 (`.387`), 4.4.3-4 (`.473`, `.474`), 4.4.14 (`.488`, "great loss... go only to sorrow")
  - Chandogya 6.11.3 (`.508`), 6.15.1 (`.518`, a vivid deathbed scene: relatives asking "do you know me?"), 8.12.1 (`.655`)
  - Aitareya 2.1.4 (`.34`, the parent's death as "third birth")
  - Brihadaranyaka 3.8.10 (`.332`, dying without knowledge is "pitiable")
- **Caste.** In Chandogya 4.4 (`.304`-`.309`) the commentators rely on caste. Present the story as truth outweighing birth.
- **Gender.** Brihadaranyaka 1.4.3 (`.63`, "space filled by the wife", each person half of a pair) and 1.4.16 (`.92`) are framed around men. Maitreyi (`.189`) should be framed as making her own choice, not as a model of a wife giving up property.
- **Infertility and the childless.** Brihadaranyaka 3.5.1 (`.283`) treats the wish for sons as just another craving. Aitareya 2.1.4 (`.34`) centres on a son taking the father's place.
- **Disability.** Chandogya 8.9.1 (`.641`) uses blindness and lameness as examples of loss.
- **Fasting.** Chandogya 6.7.5-6 (`.489`) is a 15-day fast experiment. Do not present it as advice.
- **Trial by ordeal.** Chandogya 6.16 (`.521`) could hurt someone wrongly accused.
- **Karma.** Adhyatma 53-54 (`.60`) talks about prarabdha karma. It can sound like blame to someone who is ill or suffering an injustice.
- **Equanimity under abuse.** Adhyatma 47 (`.54`), staying the same "when harassed by the wicked", must not read as advice to put up with abuse.
- **Body.** Brihadaranyaka 4.4.12 (`.486`) and Chandogya 8.12.1 (`.655`) can sound dismissive to readers in chronic pain. Chandogya 8.8.4 (`.639`) can be used to shame people about their appearance.
