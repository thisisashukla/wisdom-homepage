# corpus_viv_2: notes (66 Vivekananda passages)

## Method
- Crawled the Complete Works (vols 2 to 8) from wisdomlib.org (1,047 chapter pages, no bot challenge, allowed by robots.txt). I did not fetch ramakrishnavivekananda.info: it serves a bot-challenge page, so per the brief I left it alone, even though our `verified_with` fields cite it.
- Located every passage by word-level alignment against the CW text. **All 66 passages match the wisdomlib CW text word for word.** The only differences are diacritics (Mâyâ/Maya, Jagadambâ, Nyâyaratna) and one sentence left out, marked with an ellipsis, in `viv.6.strive_to_be_great`.
- I read each lecture or letter heading (date, place, addressee, editorial note) and the text on either side of each passage.
- Extra sources: a letter from Khetri, 27 Apr 1893 (Balaji Rao's son); a letter to John Fox, 1900 (Mohin = Mahendranath Datta); the CW vol. 8 editorial note on the Hale family; Shankara on Katha Up. 1.3.14 (wisdomlib); Gita 7.14 (vedabase); Wikipedia on J. J. Goodwin and Charlotte Sevier; Nikhilananda's biography (vivekananda.net).
- 28 of 66 entries have 2 or more sourced commentary notes. The rest have one, the context of the letter or lecture itself, because these texts have no classical commentary. For short letters and poems the surrounding text is the only real context.

## Data errors (fix)
1. **viv.8.soul_of_light: wrong timing.** The setting says the poem was written "days after" Captain Sevier died. He died on **28 Oct 1900** (Wikipedia). Vivekananda learned of it only on reaching Belur Math on **9 Dec 1900** (Nikhilananda). The letter is dated 26 Dec 1900, so it was written about two months after the death and 17 days after he heard. The full letter (CW vol. 6, Epistles II, CLXVII) also concerns his relief at the Math and an apology to Mrs Bull. Suggested setting: "Four lines closing a letter of 26 December 1900, written soon after he learned of Captain Sevier's death."
2. **viv.8.faith_totters / viv.8.never_never_never: duplicate content.** Both carry the identical `translation` text; only `line` differs. Also, CW itself dates the letter "9th July (Sept.?), 1894" while saying it concerns the Calcutta meeting of 5 Sept 1894. So "autumn 1894" is a fair reading, but the exact date is uncertain. Decide whether you want both entries, or trim each `translation` to its own sentences.
3. **Unsupported claims in `our_note` or `setting`:**
   - viv.4.servant_while_leading: "written as their group began to quarrel". The letter warns against bossing others and against gossip but never says the group was quarrelling.
   - viv.5.hero_in_silence: "to a disciple discouraged by the slow work in Madras". Not in the letter, which is about his work in America and Western generosity.
   - viv.5.great_convictions: "young men who doubted they could do anything" is interpretation.
   - viv.4.struggle_motto: "ten years of wandering poverty" is interpretation. The letter only says "the last ten years".
4. **Listener and setting details not in CW (unverified, not necessarily wrong):**
   - viv.4.education_religion: "Kidi" = Singaravelu Mudaliar is not stated in CW, and I could not confirm it elsewhere.
   - viv.7.neither_seek_nor_avoid and viv.7.thoughts_live: "notes by S. E. Waldo". The Inspired Talks pages I read do not name the recorder. The vol. 8 Jnana-Yoga discourses do name Waldo, so viv.8.comfort_no_test is confirmed.
   - Most Colombo-to-Almora lectures (Kumbakonam, Jaffna, Rameswaram, Madras, Calcutta, Lahore "Common Bases") carry no date in the CW text. Our months and years are plausible, and 12 Nov 1897 for "The Vedanta" is confirmed, but "28 February 1897" for the Calcutta reply was not confirmed in a source I read.
   - viv.6.essence_of_education and viv.6.power_of_detachment: called a "class talk", but CW files "Concentration and Breathing" under Lectures and Discourses, with no date or place.
5. **Missing `ref` (minor):** 48 entries have `ref` = "Swami Vivekananda" instead of a CW volume and section. `verified_ref` in the output gives each one.
6. **viv.4.agony_at_the_heart:** the stray closing quote after "teachest" is in the CW text itself, not our error. The listener note "who had lost his son" is **confirmed** by the Khetri letter of 27 Apr 1893. The CW heading itself says only "a severe domestic affliction".

## Cautions an editor should see
- **viv.6.nothing_lasts:** the very next sentences in the letter say "life is not eternal" and that he is thankful for it, and that he rejoices in his sufferings. Do not let the writer pull those lines in for a low-mood or depressed reader.
- **viv.6.glad_blunders / viv.6.behind_my_work** (letter of 18 Apr 1900): the surrounding passage speaks of the body falling away, nirvana and "I come, Mother". This could be read as a longing for death. Avoid it for anyone with suicidal thoughts.
- **Grief passages that call death an illusion:** viv.7.round_us_this_minute (written to a father whose 16-year-old daughter died) is followed at once by the claim that death is a lie and delusion. viv.5.soul_is_a_star raises rebirth and karma. viv.4.agony_at_the_heart speaks of "the Mother's hand that is striking". All are real condolence letters, but they need gentle framing in fresh grief.
- **viv.6.the_cup:** the first stanza says the dark drink is partly "your own brew" of past fault. Show only the third stanza, or frame carefully; it should not reach abuse victims.
- **Strength and weakness lines** (strength_is_life, reject_as_poison, whatever_you_think, be_not_afraid, live_for_others "more dead than alive", refuses_to_learn "already dead"): these can read as blame for people who are ill, depressed or anxious.
- **viv.4.praise_blame_one:** "let one kick this frame; say naught" must not be offered as acceptance of abuse. Later stanzas of the Song have monastic lines on women.
- **viv.8.come_good_come_evil:** comes from an exuberant postscript ("I enjoy the evil", "I was Judas"). It is shocking out of context.
- **viv.8.all_right_long_run:** dismisses Satan and sin as "nonsense". It may offend Christian and Muslim readers.
- **Weak standalone readings:** viv.3.hospitality_west is an autobiographical aside that leads into criticism of Indians. It is thin as a reading on its own.
- **Dated phrasing:** "weeping like a woman" (faith_totters / never_never_never).

## Sources with weak support
- dare_to_be_free, the Lahore and Jaffna single-line passages, early_violet, the_cup, weary_take_my_hand, lotus_bees, calm_of_heart, no_winter: the CW text only, with no independent commentary.
