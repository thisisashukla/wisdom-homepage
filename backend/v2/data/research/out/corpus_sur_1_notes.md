# corpus_sur_1: notes for the editor

44 entries written: 3 Bhramargeet-Saar, 39 Sursagar vinaya padas, 2 Surya Gita. Every entry has at least 2 sourced notes.

## Sources used
- **Sur-Vinay-Patrika, Gita Press** (Hindi bhavartha; archive.org lists the translator as Sudarshan Singh). I used two scans: `HindiBookSurVinayPatrikaByGitaPress` (main) and the 1955 printing `jUnv_sur-vinay-patrika-...-1955`. I checked our numbering against the book's own index and its pada headers.
- **Sursagar, Nagari Pracharini Sabha, vol. 1** (ed. Nanda Dulare Vajpeyi, 1950; archive.org `FTtm_sur-sagar-vol-1...`). I used it to cross-check the Braj text and to get NPS pada numbers. Its numbering restarts with each skandha. Where the OCR could not find a pada, I left the NPS number out.
- **Bhramargeet-Saar with tika**, Kala Mandir, Delhi, 1977 (archive.org `HindiBookBhramarGeetSaarBySoorDasJi`). It follows Shukla's selection and numbering. I could not find Shukla's own 1926 edition online, so the Bhramargeet glosses here come from this 1977 tika, not from Shukla.
- **e-PG Pathshala (INFLIBNET)** module on Shukla's Bhramargeet-Saar: background on the frame story.
- **Shri Surya Gita**, Bharat Dharma Mahamandal, Varanasi, 2nd ed. 1967 (archive.org `FMLr_shri-surya-gita-1967...`), with its Hindi translation.
- Attribution background: the Asian Review of Books review of Hawley's *Into Sur's Ocean*, an NEH Humanities note on the Murty edition, and the Murty Classical Library page for *Sur's Ocean*. Also Hindupedia on the other Surya Gita, and vedabase for the Gita parallels (6.34, 9.26).
- Not used: kavitakosh.org, because its robots.txt blocks ClaudeBot and anthropic-ai.

## Data errors (please fix)
1. **sur.vp.423 has the wrong pada number. It should be Sur Vinay Patrika 43.** Both Gita Press scans list "जाकौ मन लाग्यौ नँदलालहि" at 43, between 42 and 44. The edition has only about 309 padas, so there is no pada 423. (NPS: skandha 2, pada 10.)
2. **sur.vp.220 has the wrong pada number. It should be 230.** The index lists "जैसे राखहु तैसे रहौं" at 230, and the body shows it between 229 and 231. Gita Press pada 220 is a different song ("तब बिलंब नहिं कियौ").
3. **sur.vp.2 has the wrong pada number. It should be 22.** "नाथ अनाथनि ही के संगी" is pada 22 in both scans. Pada 2 is "बंदौं चरन-सरोज तिहारे". (NPS: 1.21.)
4. **sur.vp.250 has a text error and a translation error.** Our text reads "भक्तनि **अमर** दियौ" and we translate it as "given your devotees what is undying". Both Gita Press scans and the NPS edition read "**अभै**" (abhaya, fearlessness). Fix the Braj text and the English to "given your devotees fearlessness".
5. **sur.bgs.315 has the wrong speaker.** The tika's prasang says the gopis send this message, pointing to Radha's condition, and the last line says "Surdas: Radha laments". The speaker is better given as "the gopis, for Radha" than as Radha herself.
6. **sur.bgs.9 has an imprecise listener.** The "traveller" (pathik) is Uddhava, as the tika glosses it. The message is for Nanda as well as Yashoda: one line asks Uddhava to touch Nanda's feet about the cows.
7. **sur.vp.32 has a truncated text.** The Braj breaks off at "विसंभर साहब,". The rest of the line is "जो कल्पै सो काँचो" (whoever frets is unripe). Either complete it or end the excerpt cleanly.
8. **Surya Gita numbering differs from the printed edition.** Our 6.60 is printed 6.68 and our 6.64 is printed 6.73 in the 1967 edition, which counts speaker headings ("ऋषय ऊचुः", "सूर्य उवाच") as verses. Our numbers match if those headings are skipped. Give both numbers in the ref.
9. **The `verified_with` boilerplate is wrong for the vinaya entries.** Many vinaya entries say "or Shukla 1926 glosses (Bhramargeet)", but Shukla's book covers only the Bhramargeet. Also, the `ref` field for vp.1, 2, 18, 107, 167, 220, 236, 256 and 271 has no pada number (only `ref_label` does), unlike the other entries.

Small wording points, flagged inside the entries:
- vp.76: "helper" softens चेरो (servant). "Steward" would be closer.
- vp.219: गुरुजन means teachers or saints, not simply "elders".
- vp.295: the setting describes "one who has tasted Hari", but the pada is advice on how to *seek* Hari-rasa.
- vp.256: the list of rescues is longer than the setting says. It also covers Jarasandha's prisoners and Rahu.
- vp.301: पान is specifically the betel leaf.

## Attribution and reliability
- **Surdas (all 42 sur.* entries).** Every pada is in the vulgate Sursagar tradition. I confirmed each one's place in Gita Press's Sur-Vinay-Patrika, and most also in the NPS Sursagar. But per Bryant and Hawley (via the Murty Library and the Asian Review of Books), only a few hundred poems (433) can be traced to Sur's own era, out of a corpus that grew to about 10,000. The NEH note gives 239 "with certainty". I could not check which of our padas are in that early layer, because the Murty edition is not freely online. Present them as "from the Surdas tradition (Sursagar)", not as certainly by the historical Surdas. That Surdas was born blind is tradition, not verified biography (NEH).
- **No classical commentary exists for these padas.** The Gita Press preface says no tika of Surdas's padas had been printed before its own. So for the vinaya padas the "commentaries" are (a) the Gita Press Hindi bhavartha and (b) the rest of the pada itself. This is thinner than for the Gita or Ramayana: in effect, one interpretive voice per pada.
- **Surya Gita.** The Bharat Dharma Mahamandal edition's own preface says the text was "obtained" by the Mahamandal's research department, as one of five sectarian Gitas (Vishnu, Surya, Devi, Ganesha, Shiva). It gives no manuscript details. The frame narrator is Vyasa. I found no independent scholarly dating. Treat it as a text first published by the Mahamandal in the early 20th century, not as an attested Puranic Gita. **Name clash:** Hindupedia describes a different Surya Gita, in 5 chapters, a dialogue between Aruna and Surya that forms part of the Gurujnana-vasistha-tattvasarayana. Don't mix the two up.

## Cautions for readings and plans
- **Death and breath:** bgs.315 ("who knows when the breath may leave"), vp.215 (grace "at the end"), vp.71 (fear of Yama), vp.281 (old age and decline).
- **Womb, birth and breastfeeding imagery:** vp.170 and vp.297. Sensitive after pregnancy loss or infertility.
- **Sati imagery:** vp.125. The chatak couplet sits in a pada that also praises a wife burning on her husband's pyre, and the moth in the flame. Never quote or extend those lines.
- **Sectarian edges in unquoted lines:** vp.236 (other gods called "beggars") and vp.300 (worshipping other gods is "digging a well beside the Ganga"). Keep readings to the quoted lines.
- **Renunciant advice:** vp.297 opens by telling the devotee to drop attachment to wife and children and not to worry about food. Our existing misuse note covers this; keep it.
- **Heavy self-abasement:** the full texts of vp.167 and vp.173 are long confessions ("like a dog after scraps", faults that would fill the earth). For readers with shame or depression, use only the quoted lines.
- **"He always comes" promises** (vp.11, 18, 37, 250, 256) can hurt someone whose prayers in a crisis seemed unanswered, or who has been harmed. Frame them as companionship and inner safety, not guarantees.
- **Isolation lines** (vp.18, 229, 270: "no one else feels your pain" or "no one else in the world") should be paired with a nudge toward human support, especially for lonely or at-risk readers.
- **vp.1 and disability.** Grace "makes the blind see and the lame climb mountains". Avoid implying that cure is the goal, or that disability reflects weak faith.
- **bgs.9 and adoption.** Yashoda calls herself a mere "dhai" (wet-nurse) and Krishna is hurt by it. This touches adoptive and foster sensitivities.
