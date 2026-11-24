# corpus_viv_1: notes (66 Vivekananda passages, CW vols 1 and 2)

## Method
- I reused the crawl from corpus_viv_2 (wisdomlib Complete Works, vols 2 to 9) and added vol. 1 (wisdomlib doc1595944 to doc1595999, 56 pages, no bot challenge, allowed by robots.txt). I did not fetch ramakrishnavivekananda.info, which our `verified_with` field cites, because it shows a bot check. sacred-texts.com returned 403 (Cloudflare), so I didn't use it.
- I located every passage by word-level alignment against the CW text. **All 66 match the CW text word for word.** All 15 omissions are marked with an ellipsis. I read each chapter's headnote (date, place, recorder) and the text on either side of each passage.
- Extra sources: Wikipedia on the *Karma Yoga* book (delivered in New York, Dec 1895 to Jan 1896, taken down by J. J. Goodwin, published Feb 1896) and the *Raja Yoga* book (published July 1896); sanskritdocuments.org on the Shiva Mahimna Stotra, v. 7; vedabase.io on Gita 2.3, 2.47, 4.11, 6.38 and 6.40; wisdomlib on Shankara's commentary on Katha Up. 1.3.14 and on Mahabharata Vana Parva sec. 214 (Ganguli); IntraText (Max Müller) on Svetasvatara 2.5; and parallel passages elsewhere in CW (Pavhari Baba sketch, Colombo lecture, Christ the Messenger, Inspired Talks, Sadhanas, Unity in Diversity, Gita III, On Indian Women, Madras notes, Lahore lecture, letter to Diwanji).
- **All 66 entries have 2 or more sourced notes.** 57 of them rely only on CW: the lecture context plus a parallel passage elsewhere in CW, because these texts have no classical commentary. 9 entries carry an outside source as a commentary (Gita, Katha/Shankara, Mahimna, Mahabharata, Svetasvatara, publication data). 35 list an outside source in `sources`, mostly the Wikipedia dating of Karma-Yoga and Raja-Yoga.

## Data errors (fix)
1. **viv.1.potentially_divine, wrong placement.** The setting says "closing summary of his commentary on Patanjali". In CW it is the motto printed at the end of the Raja-Yoga **Preface** (signed "The Author"). It is repeated mid-book in the commentary on **Yoga Sutra II.25**. It is not the close of the book.
2. **viv.1.suppress_anger, wrong book.** The setting says "book 2". The passage is in **Book I** ("Concentration: Its Spiritual Uses"), in the commentary on **sutra I.33**, the four attitudes of friendliness, compassion, gladness and indifference. Our note's word "ojas" does not appear in the passage; the text says only "higher powers".
3. **viv.2.nothing_is_lost, wrong setting.** The setting says "just before quoting Gita 6.40", but the passage itself contains the Gita paraphrase. Arjuna's question is 6.37 to 6.38 (the cloud simile is 6.38), Krishna's answer is 6.40, and the next birth is 6.41 to 6.43. The listener "Audience (lecture)" should be "Class at the Home of Truth, Los Angeles", as CW states.
4. **viv.2.mistakes_made_me, misleading omission.** The ellipsis drops his own sentence saying he does not mean you should go and commit mistakes on purpose. Our `misuse` field relies on that warning. Restore it in `translation`.
5. **viv.1.without_approbation, attribution unclear.** The passage sits inside what he introduces as readings from the Mahanirvana Tantra on the householder. CW has no quotation marks, so these sentences may be his paraphrase of the Tantra rather than his own comment. I did not check the Tantra itself.
6. **Minor setting fixes:**
   - viv.1.sneers_ridicule: not at the "end of chapter 2"; it is about three-quarters through, just before the closing story.
   - viv.2.eyes_of_love: not the exact "closing words"; it comes a few sentences before the end.
   - viv.1.five_minutes ("closing chapter 7") is fine.
   - viv.1.end_and_means: Karma-Yoga does not name the yogi. "Pavhari Baba" is well supported by CW vol. 4's sketch of his life, which quotes the same secret of work (love the means as if it were the end). viv.2.means_and_end's unnamed "great man" is very likely the same person.
7. **Details not stated in CW (unverified, not necessarily wrong):**
   - "The Real Nature of Man": "1896" (CW says only "Delivered in London").
   - "Hints on Practical Spirituality": "1900" (CW gives the Home of Truth, Los Angeles, with no year).
   - "The Ideal of a Universal Religion": "America" (CW gives no place or date).
   - Raja-Yoga listeners: "New York" (neither the Preface nor Wikipedia says where).
   - Karma-Yoga "1895–96, New York" is confirmed by Wikipedia. The CW chapters carry no date.
8. **Confirmed:** all Parliament dates (11, 15, 19 and 27 Sept 1893), the Practical Vedanta dates (10, 12, 17 and 18 Nov 1896), God in Everything (27 Oct 1896), Realisation (29 Oct 1896), Cosmos: Microcosm (26 Jan 1896), Pasadena (28 Jan 1900), Work and its Secret (4 Jan 1900), and Gita II (San Francisco, 28 May 1900, Ida Ansell). Mohammed is "25 March 1900, San Francisco Bay Area" in CW, which is consistent with our setting. streams_to_sea = Shiva Mahimna Stotra v. 7 is confirmed: CW's Colombo lecture names the hymn, and sanskritdocuments has the verse. The razor_edge note (Katha 1.3.14; "stop not till the goal is reached" is his expansion) is confirmed. He also drops the "approach the best teachers" clause.
9. **Missing `ref`:** 65 of 66 entries have `ref` = "Swami Vivekananda". `verified_ref` gives the volume, work and chapter for each.

## Cautions an editor should see
- **Surrounding text that could hurt a depressed or self-harm-risk reader. Never pull it in:**
  - unknown_heroes: the sentences just before say the only way beyond death is to give up the love of life.
  - fear_of_death: says living this little life is "death, simply death".
  - five_minutes: we all die and the world forgets us in five minutes.
  - help_from_within: preceded by "hope for nothing from anyone" and crying to "imaginary beings". It can discourage reaching out for help.
  - hands_before_eyes: followed by "we who are fools cry that we are weak".
- **Domestic abuse:** forbear and duty_sweet_love are followed at once by lines saying a chaste, loving wife can conquer a brutal husband, and blaming jealous wives. Never use them for anyone in an abusive relationship.
- **Blame and "weakness" lines:**
  - creator_of_destiny is preceded by "say, this misery that I am suffering is of my own doing".
  - make_ourselves uses the language of "deserving".
  - sneers_ridicule: "fear is a sign of weakness".
  - weakness_as_forgiveness: Arjuna's "unmanliness", and "laziness and cowardice".
  - remedy_weakness and not_hate_ourselves ("the gate to degeneration has already opened").

  These can read as blame for people who are depressed, anxious, abused or ill. remedy_weakness has its own counterweight: he says medicine is needed.
- **Grief:**
  - love_no_pain: "if it does not [bring bliss], it is not love". It can tell a bereaved reader that their pain shows their love was false.
  - witness: preceded by "millions pass out of it every year; the world does not feel it".
  - dependent_on_me: the nurse image of leaving the children without a pang. It can hurt bereaved parents and carers.
  - nothing_is_lost and never_mind_failures assume rebirth.
- **Isolation and obsession:** take_up_one_idea is followed by advice to avoid all company. angels_unawares says to "leave no place in the mind for anything else". wait_and_watch warns that hideous thoughts may surface; that is risky unguided for OCD or trauma, and the Preface itself says to learn with a teacher.
- **Caste:** in no_duty_ugly the butcher next says "my birth placed me in these circumstances". Frame it around dignity of work, not birth.
- **Offence:**
  - come_up_lions: calling a man a sinner is a "standing libel".
  - unknown_heroes (elided line): Buddhas and Christs are "second-rate heroes".
  - true_to_nature: "be not an imitation of Jesus, but be Jesus".
  - reason_not_authority: "two hundred millions of gods" and the Catholic exchange.
  - atheist_himself: uses "atheist" as a charge.
- **Transcripts:** true_to_nature and weakness_as_forgiveness come from Ida Ansell's shorthand, with gaps marked by dots in CW. They are not polished text.

## Sources with weak support
- None is source-less. For 57 entries the second note is a parallel passage in CW, not independent scholarship. There is no classical commentary on these lectures. The outside sources are used only where a scripture is quoted (the Gita, Katha, Svetasvatara, Mahimna, Mahabharata).
