# corpus_rcm_4: research notes (59 Ramcharitmanas verses, Lanka Kand 62 to Uttar Kand 126)

## Sources used
- **Manas Piyush** (Gita Press; compiled by Anjaninandan Sharan), vol. 6 (Sundar and Lanka) and vol. 7 (Uttar), read in the archive.org OCR text:
  - https://archive.org/details/gp0092-manas-piyush-part-6
  - https://archive.org/details/gp0093-manas-piyush-part-7

  Each verse was read in place, with its prose meaning and the gathered notes: Pt. Ramkumar's tippani, Vijayanand Tripathi, Baijnath, Panjabi ji, Karunasindhu, Ram Shankar Sharan, Pt. Ram Vallabhasharan, Manas Mayank, Ramayan Pradip, Gaud ji, Prajnananand Swami, Vir Kavi and others. All 59 entries have 2 or more commentator gists, each paraphrased.
- **F. S. Growse**, *The Ramayana of Tulsi Das* (6th ed., public domain, archive.org in.ernet.dli.2015.125813). Used to cross-check the translation of a few verses (6.62, 7.39, 7.87.8, 7.87 soratha).
- **Not used:** ramcharitmanas.iitk.ac.in now redirects to heritage.iitk.ac.in (the Gita Supersite successor), which the brief bars, so I did not fetch it.
- **Weakness:** every commentary gist comes through one compilation. It gathers many traditional tikas, but they are all as Manas Piyush selects them. The Hindi OCR is noisy, and the commentator abbreviations were expanded according to Manas Piyush's own conventions (for example, a "टिप्पणी" is Pt. Ramkumar's).

## 1. Systematic data error: doha numbers do not match Gita Press
Our ids and ref_labels use a doha numbering that matches neither Gita Press / Manas Piyush nor Growse. The chaupai number within a doha usually matches the Gita Press convention (one chaupai = two half-lines). The doha number drifts:

| our ref | Gita Press / Manas Piyush |
|---|---|
| Lanka 62.4 | 63.4 |
| Lanka 76.1 | 77.1 |
| Lanka 110 doha | 115 (ka) |
| Lanka 111 dohas | 116 |
| Lanka 112.3 | 117.3 |
| Uttar 3.1 / 3 doha | 1.1 / 1 (ka) |
| Uttar 4.6 | 2.6-7 |
| Uttar 4.8 | 2.8 |
| Uttar 6.2 | 4.2-3 |
| Uttar 7.4 | 5.4 |
| Uttar 7 chhand 2 | 5 chhand 2 |
| Uttar 8 chhand | 6 chhand |
| Uttar 10.4 | 8.4 |
| Uttar 12.1 | 10.1 |
| Uttar 20.2 | 18.2 |
| Uttar 22.2 | 20.2 |
| Uttar 39.4 | 37.4 |
| Uttar 40.1 / 40.4 | 38.1 / 38.4 + doha |
| Uttar 41.2 | 39.2 |
| Uttar 43.1 | 41.1 |
| Uttar 45.3 | 43.3 |
| Uttar 46.3 | 44.3-4 |
| Uttar 48.1-3 | 46.1-3 |
| Uttar 61.2 | 61.2 (matches) |
| Uttar 68.6 | 69.2 (chaupai number also wrong) |
| Uttar 69.4 | 70.4 |
| Uttar 70.2 | 71.2 |
| Uttar 72.2 | 73.2-3 |
| Uttar 73.3 / 73.4 | 74.3 / 74.4 + doha 74 (ka) |
| Uttar 83.3 | 84.3 |
| Uttar 85.5 | 86.5 |
| Uttar 86.1 / 86.2 / 86 doha | 87.1-2 / 87.2-3 / 87 (ka) |
| Uttar 87.4 | 88.4 |
| Uttar 87.8 | 89.4 (chaupai number also wrong) |
| Uttar 87 "sortha 5" | second soratha of 89 (Growse labels it "Soratha 5") |
| Uttar 95.4 | 99.4 |
| Uttar 104 doha 3 | 108 (kha pair) |
| Uttar 106.1 | 110.1 |
| Uttar 107.8 | 111.8 |
| Uttar 108 doha 2 | 112 |
| Uttar 116.1 / 116.9 | 120.1-2 / 120.9 |
| Uttar 117.6 / .7 / .11 / .15 / .17 | 121.6 / .7 / .11 / .15 / .17 |
| Uttar 121 doha 2 | 125 |
| Uttar 126.3 / 126 dohas | 130.3 / 130 (ka, kha) |

The offset in Uttar runs from -2 (early) through 0 (at 61) to +4 (from about 95 on), so it is not a simple shift. Someone should identify which edition our numbering came from and re-key the ids or ref_labels to Gita Press. Each entry's `verified_ref` gives the Gita Press location.

Several entries cover two Gita Press chaupais: 7.4.6, 7.6.2, 7.46.3, 7.72.2, 7.86.1, 7.86.2 and 7.116.1.

## 2. Specific data errors
- **rcm.6.62.chaupai.4:** the Awadhi drops "सुत". It should read "सुनु **सुत** भयउ कालबस रावन". Our English already has "Listen, son".
- **rcm.7.73.chaupai.3:** the Awadhi drops the first syllable. "नहु राम कर" should read "**सु**नहु राम कर सहज सुभाऊ".
- **rcm.7.4.chaupai.6:** our "He asked again and again after everyone's welfare" reads as if Ram asked. It is Bharat who keeps asking Hanuman (out of love), before saying "what can I give you". Rephrase.
- **rcm.7.86.chaupai.1 / rcm.7.86.chaupai.2:** the two entries overlap by a full chaupai ("कोउ सर्बग्य धर्मरत कोई… कोउ पितु भगत…"). The English of chaupai.1 ends mid-sentence ("..."). Merge them, or split at Gita Press 87.1-2 and 87.3.
- **rcm.7.126.chaupai.3:** speaker. Manas Piyush says explicitly that from here on the words are Tulsidas's own, as he closes his frame of the dialogue. Use Tulsidas → the reader, not "Shiva / Tulsidas → Parvati / the reader".
- **rcm.7.7.chaupai.4:** Manas Piyush glosses the thrill and tears as belonging to both dark-skinned brothers. Our version says "Ram's dark body". Minor.
- **rcm.7.87.chaupai.8:** the closing simile "जल कै चिकनाई" (water's slickness) is rendered "oil does not stay on water". Growse renders it much the same, so this is defensible, but Manas Piyush reads it as water's slickness, which does not last. Optional fix.
- **rcm.7.117.chaupai.17:** "गरह" is disputed. Readings include goitre or throat disease (majority), seizure by spirits or planets, dysentery and gout. "Throat ailments" is acceptable.
- **rcm.7.43.chaupai.1:** the listener is Bharat specifically (addressed as भाई/तात), with the brothers present. Minor.
- **rcm.7.86.doha.1:** "man, woman or of any gender" for पुरुष नपुंसक नारि is a fair modern rendering but freer than the text ("napunsaka" = neither man nor woman).

## 3. Cautions an editor should see
- **7.3.chaupai.1 and 7.3.doha.1 (Bharat's last day):** Bharat says he cannot live past the deadline. The Adhyatma Ramayana parallel cited in Manas Piyush has him preparing to enter fire. Don't use these for a reader with any risk of self-harm, and don't import that detail.
- **7.73.chaupai.4 (mother lancing the boil):** a Manas Piyush gloss reads suffering as God giving the "immediate fruit" of a fault. The existing misuse line is essential. It is unsafe for grief, illness or abuse.
- **7.68.chaupai.6 ("had I not been confused I'd never have met you"):** it is the voice of someone already relieved. It lands as "your pain is a blessing" if given to someone still suffering.
- **7.117.chaupai.15 and .17 (diseases of the mind):** these are moral and emotional "diseases", not clinical mental illness. They also use leprosy, TB and skin disease as images of vice. Avoid with chronically ill readers, and never imply that a mental illness is a moral failing.
- **7.117.chaupai.7 ("no sorrow like poverty"):** this can deepen despair in financial crisis. Pair it with its second half (the joy of good company).
- **7.46.chaupai.3 (human body as a boat):** the next lines call one who wastes the gift a self-slayer (आत्महन). Keep them out.
- **7.95.chaupai.4 and 7.117.chaupai.11:** hell and rebirth-as-punishment language (slanderers reborn as frogs, crows, bats) sits right next to these lines.
- **7.86.doha.1, 7.86.chaupai.1 and 7.126.doha.2:** gender. Manas Piyush's own notes explain the father parable's "sons, not daughters" with era-bound views, and one gloss ranks eligibility as man full, woman half, napunsaka none. 7.126.doha.2 uses "as a woman is dear to a lustful man". Use neutral paraphrase.
- **7.85.chaupai.5 ("अति नीच"):** caste language of its time. Render as "lowly", and keep caste terms out of the reading.
- **7.6.chaupai.2 (Ayodhya dearer than heaven):** the birthplace theme is politically charged. Keep the reading to home and belonging.
- **7.39.chaupai.4 (sandalwood and axe), 7.12.chaupai.1 (comforting Kaikeyi) and 7.104.doha.3 (pleading for the student who wronged him):** all risk being heard as "victims should endure or comfort those who harm them". Use the existing misuse line on 7.39, and add similar ones to the other two.
- **7.48.chaupai.2 ("hopes on men"):** it can discourage asking for help. The existing misuse note is good.

## 4. Verses with weaker sourcing
None lack commentary. The thinnest (2 to 3 gists, mostly from Manas Piyush's compiler notes plus one named commentator) are 6.110 doha, 7.83.3, 7.85.5, 7.86.2, 7.87.4 and 7.116.9. All are still adequately sourced.
