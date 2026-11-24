# bg_1 editor notes: Bhagavad Gita, chapters 1–6 (44 verses)

All 44 verses have entries in `out/bg_1.json`, in input order. Each has 3 or 4 sourced commentaries: 36 have four and 8 have three.

## How this was researched

| Commentator | Edition used (full text read on archive.org) | Status |
|---|---|---|
| Shankara (Advaita) | A. Mahadeva Sastri, 2nd ed. 1901: https://archive.org/details/bhagavadgitawith00maharich | Public domain |
| Ramanuja (Vishishtadvaita) | A. Govindacharya, 1898: https://archive.org/details/gita-bhasya | Public domain |
| Sridhara (Subodhini) | Swami Vireswarananda (Ramakrishna Math): https://archive.org/details/bhagavad-gita-with-gloss-from-sridhar-swami-by-swami-vireshvaranand-ramakrishna-math | Copyright, paraphrased only |
| Swami Sivananda (modern) | DLS 14th ed. 2012: https://archive.org/details/the-bhagavad-gita-swami-sivananda | Copyright, paraphrased only |
| Prabhupada (once, for 1.29) | Vedabase: https://vedabase.io/en/library/bg/1/29/ | Also used Vedabase to check chapter-1 numbering |

- **Gita Supersite.** `gitasupersite.iitk.ac.in` now redirects to `heritage.iitk.ac.in/SBG/<chapter>.<verse>`. The new site is a JavaScript app, its pages carry a `noai` robots meta tag, and its robots.txt disallows `ClaudeBot` and `anthropic-ai`. I did not scrape it. If you want its Madhva, Vallabha or other commentaries, a person should read them there.
- **wisdomlib.** It now shows a Cloudflare challenge to scripts, and I did not try to get around it.
- **Madhva is not covered.**
  - The only public-domain English edition (S. Subba Rau, 1906, on archive.org) has unusable OCR.
  - bhagavad-gita.org carries Madhva, Sridhara, Ramanuja and Kesava in English, but its file numbering is offset. For example, `verse-02-47.html` is actually 2.48, and its Ramanuja section on that page belongs to 2.49. I did not rely on it.
- **Paraphrase.** Every gist is my own paraphrase. The few quoted words are from the public-domain Sastri and Govindacharya translations, plus at most one short phrase from a copyrighted source per entry, each under 12 words.

## Data errors (fix in source data)

1. **bg.2.7: setting has the speaker backwards.** The setting says "Krishna to Arjuna, who has collapsed…", but the verse is Arjuna's plea to Krishna. The speaker and listener fields are correct.
   - Suggested setting: "Arjuna, in tears and refusing to fight, asks Krishna to teach him."
2. **bg.4.17: setting belongs to a different passage.** "Krishna reveals the ancient lineage of this teaching and why he comes into the world" describes 4.1–8. Verse 4.17 sits in 4.16–18, which is about what action, wrong action and inaction really are, and how even the wise are confused about it.
3. **bg.1.29: translation covers only half the ref.** The ref is 1.29–30 and the Sanskrit includes 1.30, but the English stops at 1.29. It leaves out the bow slipping from his hand, his skin burning, being unable to stand, and his mind reeling. Either add the second half or narrow the ref and Sanskrit to 1.29.
4. **bg.2.50: "good and bad results" is wrong.** sukṛta-duṣkṛte means good and bad deeds (merit and demerit), and all four commentators read it that way.
   - The line "Yoga is skill in action: doing the work well…" also leans towards the modern 'excellence at work' reading. In every commentary the 'skill' is acting so that the action does not bind you.
5. **bg.3.35: the misuse note presents a modern reading as the verse's meaning.** The note says svadharma is "not the role birth assigned… it's your own nature and calling". The classical commentators disagree:
   - Shankara, Sridhara and Sivananda read svadharma as the duty of one's station. For Arjuna, that is a warrior's duty to fight.
   - Sridhara and Shankara add that another's duty leads to hell.
   - Ramanuja reads it as karma-yoga, the path that suits you, versus the harder path of knowledge.

   Keep the anti-caste stance, but say it is the app's modern application, not the commentators' reading.
6. **bg.5.18: caste wording.**
   - The line renders śvapāka ('dog-cooker', a slur-term for people treated as outcastes) as "an outcast", which reads as endorsing the category.
   - Shankara and Sivananda rank the beings by guṇa and put the outcaste with the animals as tamasic. Shankara's comment then discusses a law about not eating such people's food.
   - Ramanuja's reading (every self is equal because all share consciousness) is the safe one to lead with. Reword the line.
7. **Minor setting issues.**
   - bg.1.29 says Arjuna "collapses" here; he actually collapses at 1.47.
   - bg.5.29's "describing meditation" fits 5.27–28; 5.29 is the closing statement that follows them.
8. **Sanskrit formatting.** Spaces are missing at speaker labels and half-verse joins, which matters for display and text-to-speech:
   - "सञ्जय उवाचएवमुक्त्वा" (1.47), "अर्जुन उवाचअथ" (3.36), "श्री भगवानुवाचकाम" (3.37)
   - "स्वभावःपृच्छामि" (2.7), "पुराणोन" (2.20), "विहायनवानि" (2.22), "प्रतिष्ठंसमुद्रमापः" and "सर्वेस" (2.70)

   The wording itself checks out.
9. **Chapter-1 numbering differs by edition.** Gita Press, Shankara, Ramanuja and Sivananda all number as our data does. Vedabase (Prabhupada) differs:
   - Our 1.29–30 is its 1.28b–1.30a.
   - Our 1.47 is its 1.46, because its chapter 1 has 46 verses.

   Vireswarananda's Sridhara edition also shifts the chapter-1 half-verses. Chapters 2–6 number the same in every edition checked.
10. **Smaller translation notes** (details in each entry's `translation_note`):
    - 2.7: prapannam means "who has taken refuge", not "I have come to you".
    - 4.42: the translation drops ātmanaḥ (the doubt is "about the self").
    - 5.24: "one with Brahman" is the Advaita reading; Ramanuja reads "Brahman-like".
    - 5.10: Ramanuja reads brahman there as matter (prakṛti).
    - 2.40: "this practice" specifically means karma-yoga.
    - 2.13: the line ("the next change") hides that the verse is about death.
    - 2.67: the verse is about the senses pulling the mind outward, not anxious rumination, so applying it to overthinking is an extension.

## Cautions an editor should see

- **The grief plan's days 1–4 all come from 2.11–2.30.** The verses are 2.20, 2.22, 2.13 and 2.23.
  - That passage's stated conclusion is "therefore you should not grieve" (2.11, 2.25, 2.27).
  - Its original job is to reassure Arjuna that killing in battle does not destroy the self.
  - **Day 2 (2.22) is the sharpest problem.** Ramanuja says a warrior's death in a righteous war is cause for "unmixed rejoicing", and Sridhara says there is "no room for grief". The worn-out-clothes image also fits badly with the death of a child or young person, or a sudden death.
  - **Day 1 (2.20) is meant to name the feeling**, but the metaphysics can land as a dismissal.
  - I recommend a validating frame on every day of this run, and possibly a non-chapter-2 verse on Day 1.
- **6.5 is used on comparison day 1, losing-hope day 5 and first-week day 5.** Shankara says outward friends are obstacles for a seeker, and Sivananda says worldly friends are really enemies. Do not let either view through. Ramanuja's reading (the mind is the self's friend or foe) is the useful one.
- **fear-of-failure day 3 uses 2.40.** It is not a promise that worldly effort always pays off. Shankara and Sivananda explicitly contrast it with farming and medicine, where effort can fail.
- **comparison day 2 uses 3.35.** It carries the caste problem above and the line "better is death in one's own duty".
- **success day 6 uses 5.18.** It carries the caste wording problem above.
- **The guilt plan uses 3.36, 4.36 and 4.37.** The 'sin' language is strong (3.37 calls desire "greatly sinful", 4.36 says "most sinful of all sinners"). On the useful side, Shankara, Sridhara and Sivananda all say knowledge does not erase prārabdha karma (consequences already in motion), which supports the plan's message that amends still matter.
- **work-feels-unsafe day 1 uses 1.29.** The Gita's arc pushes Arjuna to stand and fight. Do not let that become "stay in an unsafe workplace".
- **anger day 5 uses 5.23.**
  - Shankara reads "before release from the body" as "up to the point of death".
  - One of Sridhara's alternative readings likens the steady person to a corpse unmoved by mourners or the pyre.
  - Avoid both with distressed readers.
- **Other blame-prone verses:**
  - 2.66 (stress day 2) can read as "stressed people are undisciplined".
  - At 4.42, Shankara and Sivananda call doubt "most sinful".
  - 2.65 promises that "all sorrows end".
  - Frame these as cause and effect, not judgement.
- **4.34 (first-week day 6) uses guru-devotion language** (prostration, service, perfect faith). Stress discernment in choosing a teacher.
- **Theism.**
  - 3.30 and 5.29: "me" is Krishna. Our lines say "something higher" and "the divine", which is acceptable but should not erase the theism.
  - 3.20 (nothing-matters day 6) tells the reader to "keep working for the world". Offer that gently to a possibly depressed reader.

## Verses with thinner sourcing

- **Shankara has no verse comment on chapter 1 or on 2.7.** For 1.29, 1.47 and 2.7 I used his introduction at 2.10, which covers 1.2–2.9.
- **Sridhara only glosses words at 1.29**, so I used Prabhupada (Vedabase) instead.
- **Sivananda gives only a translation**, with no commentary, at 1.29, 1.47, 2.7, 2.22, 3.36 and 4.17. Each of these still has 3 commentaries.
- **No verse lacks sources.**
