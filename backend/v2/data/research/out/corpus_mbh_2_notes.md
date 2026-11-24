# corpus_mbh_2 notes (Udyoga Parva: Vidura Niti, Sanatsujatiya, Yudhishthira's case for peace, Draupadi, Krishna's embassy, Gandhari, Vidula)

62/62 verses filled, in input order. Every entry has 2 or more sourced notes. For all 62, at least two of those are translations or commentary (not only the critical-text context).

## Sources used
- K. M. Ganguli translation (wisdomlib, "the-mahabharata-mohan"). It follows the vulgate but numbers some chapters differently (Yudhishthira's speech is LXXII, Draupadi's plea is LXXXII).
- M. N. Dutt prose translation (archive.org, Calcutta vulgate). Its verse numbers were used to check ours.
- BORI critical edition (GRETIL e-text) and the vulgate Sanskrit on Sanskrit Wikisource. Our refs follow the Wikisource numbering.
- K. T. Telang, Sanatsujatiya (SBE 8, on wisdomlib). His notes report Shankara's and Nilakantha's commentaries. This is the only classical commentary we could reach in this group.
- Sri Aurobindo's "Vidula", a free verse paraphrase. Dhammapada (Thanissaro) for the Buddhist parallels to 71.67 and 71.71.
- No English Nilakantha for the Udyoga narrative turned up. For non-Sanatsujatiya verses the "commentaries" are translators' renderings plus critical-text context, labelled as such in `who`.

## Data errors (fix before use)
1. **mbh.5.71.92 mistranslated.** `tava droheṇa` (BORI `tava rodhena`) means "if harm (or captivity) came to you", not "by betraying you". Yudhishthira is begging Krishna not to walk into the hostile Kaurava court. Ganguli and Dutt both say "if any ill/mischief be done to you". Rewrite the translation and the line ("betraying a friend" is wrong).
2. **mbh.5.43.61 reading conflict.** Our text says "not by silence (maunān na) ... who knows his own nature (svalakṣaṇam)". BORI and Telang/Shankara say the opposite for the first half: "by mauna one DOES become a muni (maunād dhi), not by living in the forest; the best muni knows the Imperishable (akṣaram)". Ganguli supports our negative reading. Sanatsujata has just defined mauna as the Self, so soften the line "Silence and retreat don't make you wise", or note the variant.
3. **mbh.5.81.26 wrong prasang.** It is linked to `mbh.p.k.draupadi_kamyaka` (Krishna visits the exiles in Kamyaka forest, Vana Parva). The verse is Draupadi's plea in the Pandava camp before the embassy (Udyoga; vulgate 81, Ganguli LXXXII, BORI 80). Speaker and listener are correct.
4. **mbh.5.42.35 not in the critical Sanatsujatiya.** BORI treats it as an insertion here (5.42.24*252) and at 5.33.17*170. It is constituted text only at Adi 1.68.26, where Shakuntala says it to Dushyanta. Our line follows the Adi Parva social sense ("pretending to be someone you're not"). In the Sanatsujatiya, Shankara reads it as mistaking the body or doer for the self. our_note already says this; editors should cite Adi 1.68.26 if they want the social reading.
5. **mbh.5.129.44 Sanskrit.** `महामात्यस्य` (copied from Wikisource) should be `सहामात्यस्य` ("you together with your ministers"). That is what BORI, Dutt, Ganguli and our own translation say.
6. **mbh.5.129.29 reading.** The vulgate's `dveṣyarūpeṇa yojayet` ("as an adversary") is BORI's `deśarūpeṇa yo jayet` ("as one conquers a territory"). The same verse is in the Vidura Niti (vulgate 34.58 / BORI 34.55) and could be cross-linked.
7. **mbh.5.95.46.** The first half is a BORI insertion (*428). It is Krishna relaying the Pandavas' message. "Treated you as a father" blurs a guru/disciple framing. The line generalises the Pandavas' "if we stray" into a rule about parents.
8. **Sanskrit fields spanning more than the translation:** 71.67 and 71.71 (three half-verses each), 95.48, 71.26 (drops "poverty is a man's death"). Details are in each entry's translation_note. In 71.71 the trailing half-line in context means "otherwise there is no peace except by annihilating one side". Trim it from the Sanskrit.
9. **Line additions not in the verse:** 71.37's "Be gentle with yourself", 39.51's "Be that friend" and 133.7 are fine as reading prompts but are not the text.
10. **Earlier entries (by the previous agent), still standing:**
    - 33.42: the first clause means "broadcasts his plans", not "drags tasks out" (translation_ok false).
    - 36.5: the forbearer gains the insulter's merit; the line's "keeps their worth" is off.
    - 36.68: `avyādhija` is "not born of illness".
    - Sanskrit typos at 33.29 (`चार्थं`), 33.97 (`घृणी`), 33.106 (`गुणाः`) and 40.2 (`संत्यजत्यनुपाक्रुष्ट`).
    - 33.119: two readings differ.
    - Vulgate numbers for ch. 35 (35.51, 35.60, 35.61, 35.79) could not be confirmed: the Wikisource ch. 35 page uses critical numbering. The BORI numbers in those entries are reliable.

## Interpolations (fine to use; don't present as the critical text)
- 33.55-56: the "forgiveness is the greatest strength" half
- 33.96-97: the "six joys"
- 39.6: "loss that brings gain"; see the caution below
- 40.18: second line
- 42.35
- 95.46: first half

## Cautions for editors
- **mbh.5.133.14 (Vidula's torch).** It makes light of clinging to life, and the surrounding verses urge the son to fight even to death and ask "why do you live?". Never serve it to a reader expressing despair or suicidal thoughts. 133.7 is the safe, constructive verse from the same speech. Quote it alone; the speech around it is harsh and gendered shaming.
- **mbh.5.39.6.** In context, the "loss that brings gain" is abandoning the newborn Duryodhana. Not for bereaved parents.
- **Grief, money and blame:**
  - 71.26 and 71.28 sit in a passage calling poverty death and listing people who choose death in poverty. Keep them away from readers in financial crisis.
  - 71.38 ("blames everyone but himself") can read as victim-blaming.
- **Abuse and bystanders:**
  - 81.26 recalls Draupadi's assault in the sabha. It is a demand for justice, not a model of silent endurance.
  - 95.48 (onlookers share guilt) can wound someone who froze.
  - 71.67 and 71.71 (peace) and 129.44 ("half is enough") must not be turned on someone being harmed or cheated.
- **Death and rebirth framing:** 42.4 redefines death as heedlessness, and 40.22 is about crossing births. Not for fresh grief.
- **Control language:** 129.27 and 129.29 ("treat yourself as an enemy") should not go to readers with harsh self-criticism or eating-disorder histories.

## Weakly sourced
- No verse is unsourced.
- Weakest: 34.19 and 34.43 (absent from Ganguli's abridged section; Dutt and BORI only) and 43.61 (Dutt's rendering not located in the OCR text).
- For non-Sanatsujatiya verses, the material is translations plus critical-text context, not classical commentary.
