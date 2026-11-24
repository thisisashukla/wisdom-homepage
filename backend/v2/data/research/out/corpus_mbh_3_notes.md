# corpus_mbh_3: Mahabharata, Udyoga (Vidula) + Shanti Parva 7-176 (62 verses): editor notes

## What was used
- **K. M. Ganguli's English translation**, read section by section on wisdomlib (it was reachable, with no bot challenge). This is the vulgate text. Its footnotes often report what Nilakantha says.
- **BORI critical edition**: the GRETIL e-texts of the Udyoga and Shanti parvans, including star passages. Every verse was matched against it.
- **Sanskrit Wikisource** (महाभारतम्-12-शांतिपर्व-173 to 176): vulgate text with short Sanskrit commentary notes. These notes match what Ganguli credits to Nilakantha, for example that Shamyaka's verses were recited by someone else and that sāraṅga means bee. On that basis they are cited as Nilakantha's Bhāratabhāvadīpa. The match is our inference; the page does not name the commentator.
- **Parallels**:
  - Bhagavata Purana 11.8.44, 11.9.2 and 11.9.13 (Vedabase): Pingala, the osprey, the arrow-maker.
  - Vyasa's bhashya on Yoga Sutra 2.42 (wisdomlib, Rama Prasada translation), which quotes the "sixteenth part" verse.
  - Naomi Appleton's University of Edinburgh resource on Janaka (Mahajanaka Jataka) for the "Mithila burns" verse.
  - Earlier entries also use Kautilya (Pritchett) and mahabharataonline.
- All gists are paraphrases. No Prabhupada or Gita Press English wording was copied.

## Coverage
- All 62 entries are filled, in input order.
  - The first 44 come from the earlier run. They were checked and kept as they were.
  - The last 18 (Senajit, Pingala, Medhavin, Shamyaka, Manki, Janaka, Bodhya: 12.173 to 12.176) are new.
- Every entry has at least 2 sourced `commentaries`.
  - For the 18 new entries, at least one interpretive source sits beside Ganguli and BORI: Nilakantha's notes or a Bhagavata or Yoga Sutra parallel.
  - Many of the earlier 44 rest only on Ganguli plus a BORI textual note. The thinnest are 5.133-135 (Vidula) and 12.80-12.84 (Rajadharma friendship verses).

## Numbering
- For 12.173-12.176, our ids match the Sanskrit Wikisource vulgate numbering exactly. BORI is 5 chapters lower: 173 = BORI 168, 174 = 169, 175 = 170, 176 = 171.
- Ganguli is 1 section higher: 173 = CLXXIV, 174 = CLXXV, 175 = CLXXVI, 176 = CLXXVII up to Manki. Janaka's verse and Bodhya fall in CLXXVIII.
- `verified_with` for 12.175.x said "section number inferred from data offset". It is now confirmed as CLXXVI.

## Data errors (new entries)
1. **Speaker wrong for 12.176.63 (osprey) and 12.176.67 (arrow-maker).**
   - Bodhya only names his six teachers (176.61).
   - The explanations of each teacher are introduced with "Bhishma said" in three places: Wikisource (bracketed as an insertion), BORI (star passage 475, outside the constituted text) and Ganguli ("Bhishma continued").
   - Fix: change the speaker to Bhishma, to Yudhishthira.
   - Listener: Yayati son of Nahusha is right for the vulgate. BORI reads Nahusha himself.
2. **Prasang "Bodhya's teachers" lists "the deer".** Nilakantha and Ganguli take sāraṅga as the bee. Also, `our_note` calls the Bhagavata parallel the "Avadhuta Gita". It is the Bhagavata's brahmin and his teachers (Book 11, ch. 7-9), not the separate text of that name.
3. **12.175.11 and 12.175.22 (Shamyaka): attribution is disputed.**
   - The text says a brahmin told Bhishma what Shamyaka had sung. Nilakantha, followed by Ganguli, takes the reciter to be someone else.
   - Our setting says he "lost everything". The text describes a renunciant suffering from hunger, poor clothes and (per Ganguli) a bad wife, not someone who lost a fortune.
   - The name is Śamyāka in BORI and Wikisource. Śampāka is a variant reading.
4. **12.173.42: edition variant changes the meaning.** BORI 12.168.31 says "hundreds of occasions for JOY". Our "fear" is the vulgate reading, which BORI has at 12.317.2 and Vana 3.2.15. Our line ("don't let them ALL in") also softens the verse.
5. **12.174.20: translation misreads one word.** "Attached to his little comforts" misreads īhā-sukha-āsakta, which Nilakantha glosses as craving. It should say "caught up in the pleasure of wanting and striving". `translation_ok` is false.
6. **12.174.16: translation omits the third line** (dharma brings fame here and happiness hereafter). `translation_ok` is false.
7. **12.176.67: Sanskrit typo** copied from Wikisource. कश्चिदिपावासक्तमानसः should be कश्चिदिषावासक्तमानसः. BORI has iṣāv āhitamānasaḥ.
8. **12.173.64 setting adds "waiting all night".** The Mahabharata says only that the courtesan was left without her lover at the place of meeting. Check that detail against the Bhagavata telling before using it.
9. **12.174.9**: "falling like arrows" is an interpretive gloss. The verse calls the nights amogha ("unfailing"). The third line is a BORI manuscript addition.
10. **Smaller edition variants**, none of which change the sense:
    - 173.41: dveṣyam for apriyam.
    - 173.53: BORI lacks "when it is lost".
    - 174.35: BORI has "no strength like knowledge" for "no austerity like truth".
    - 175.22: sukhī bhava.
    - 176.43: kṣamamāṇānām.
    - 176.56: bata for iva.

## Data errors carried from the earlier 44 entries (see each entry)
- **12.25.31**: the speaker should be Vyasa (to Yudhishthira), not Senajit.
- **Translations that drop half the verse**:
  - **12.27.49**: our second half-line is a weak variant ("no reunion").
  - **12.138.46**: the second half-verse is missing.
  - **12.172.18**: the "no expiation for the ungrateful" clause is missing.
- **Sanskrit typos**:
  - **5.133.21**: आजानेयकतं, सत्वं.
  - **12.81.22**: लधूनि, शमयस्य.
  - **12.84.5**: भुकुटी.
  - **12.104.57**: स्वत्मानैव.
  - **12.114.8**: प्रकृत्या should be प्राकृतो.
- **Lines that overreach**:
  - **12.104.57**: "given time".
  - **12.172.21**: "Money comes and goes".
  - **12.145.5**: the guest frame is lost.
  - **12.17.4**: an added imperative.
- **12.46.14**: Ganguli section is XLVIII, not XLVII.
- **Not in the critical text** (late or manuscript-only): 12.46.125, 12.46.127, 12.144.12, 12.144.13, 12.145.5, 12.172.21, 12.176.63, 12.176.67.

## Cautions for editors (new entries)
- **Senajit verses (12.173.21-53)** are a consolation addressed to a father whose son has just died. The frame calls him deluded and says one should not feel affection for children because separation is certain.
  - 12.173.42 labels the overwhelmed person mūḍha.
  - 12.173.53 can be heard as "your grief is possessiveness".
  - Do not use these for bereaved parents early in grief, even though that is their original audience.
- **12.173.64 (Pingala)**: nairāśya means "freedom from expectation", but in modern Hindi निराशा means despair. A depressed reader can hear "hopelessness is the highest happiness". Avoid for anyone showing hopelessness. Handle Pingala (a courtesan) without moralising.
- **12.175.22 ("let go of everything and be happy")**: never show to a reader who mentions self-harm or not wanting to live.
- **Medhavin verses (12.174.x)** are death-centred and urgent. They can feed health anxiety and guilt in burnt-out or bereaved readers. The "work" they urge is the highest good (śreyas), not productivity.
- **12.176.43 (Manki's vow of forgiveness)** is a renunciant's vow addressed to Desire. Do not offer it to someone being abused or harassed.
- **12.176.56 ("if Mithila burns, nothing of mine burns")** would wound someone who has lost a home to fire or disaster.
- **12.175.11 (praise of having nothing)** can sound glib to readers in financial hardship.
