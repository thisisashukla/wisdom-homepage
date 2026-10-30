# Hanuman Chalisa funnel: owner review

Everything generated for this funnel carries `reviewed: false` in `frontend/src/content/funnels/hanuman-chalisa/chalisa.json` and `cards.json`. Check the share cards first, then the text decisions, then each line.

To regenerate after edits: change `frontend/scripts/funnels/hanuman-chalisa/build_chalisa.py`, then run `python3 scripts/funnels/hanuman-chalisa/build_chalisa.py` and `python3 scripts/funnels/hanuman-chalisa/review_sheet.py` from `frontend/`.

## 1. How the text was assembled

Witnesses (copies in `lp/funnels/hanuman-chalisa/witnesses/`):

| Witness | What it is | Use |
|---|---|---|
| GP 695 | Gita Press, Gorakhpur, *Shri Hanuman Chalisa* booklet 695, Internet Archive OCR | Base reading |
| GP Shastrawadi | A second Gita Press printing, Internet Archive OCR | Confirms GP 695 line by line |
| GP 2121 | Gita Press *Sachitra Shri Hanuman Chalisa* 2121, OCR (noisy) | Spot checks (चलीसा, महावीर/महाबीर) |
| Mahaviri | Rambhadracharya's *Mahaviri* (Hindi, 2021), mool lines only, OCR | Variant source; commentary not used or quoted |
| Kavita Kosh | Typed wiki text (popular reading) | Independent typed witness |
| vignanam | Typed, Sanskritised South Indian transcription | Shows popular variants (शंकर स्वयं, यह शत) |

Hindi Wikisource was checked first, as asked: it has **no Hanuman Chalisa page** (MediaWiki API search and a direct title fetch on hi.wikisource, sa.wikisource and en.wikisource all came back empty or 404 on 30 Oct 2026). The two Gita Press scans plus the Mahaviri and Kavita Kosh replace it as independent witnesses.

The Gita Press scans agree on every reading below except where OCR garbled a glyph; OCR noise was resolved against the second Gita Press scan, not against the web texts.

## 2. Variant decisions (the published text follows the Gita Press in every case)

| Line | Published (Gita Press) | Other readings seen | Decision and note on the page |
|---|---|---|---|
| Doha 1 | निज मनु मुकुरु ... जसु ... दायकु | Mahaviri: निज मन मुकुर ... जस ... दायक | Keep the Awadhi u endings. Note on page. Manas Ayodhya Kand 2.1 has the same couplet with the u endings. |
| Doha 2 | बल बुधि बिद्या; कलेस | Popular: बल बुद्धि; कलेश | Keep बुधि (metre, Gita Press). Note on page. |
| Chaupai 1 | गुन | Mahaviri: गुण | Spelling only. Note on page. |
| Chaupai 5 | हाथ बज्र औ ध्वजा बिराजै ... साजै | Mahaviri: अरु ... छाजै; Kavita Kosh: और | Keep औ, साजै. Note on page. |
| Chaupai 6 | संकर सुवन केसरीनंदन | Mahaviri: शंकर स्वयं केसरीनंदन; vignanam marks it too | Keep Gita Press. Note names Rambhadracharya. **Owner call**: some devotees now prefer स्वयं. |
| Chaupai 8 | राम लखन सीता मन बसिया | Two Gita Press scans print लषन here | Orthography normalised to लखन (as in chaupai 11 and the closing doha of the same booklet, and in the Mahaviri). Note says some Gita Press printings spell it लषन. Also notes the other way of reading the line. |
| Chaupai 11 | लाय सजीवन | Kavita Kosh: संजीवन; Mahaviri: सँजीवनि | Keep सजीवन. Note on page. |
| Chaupai 12 | भरतहि | Mahaviri: भरतहिं | Note on page. |
| Chaupai 15 | कहि सके | Mahaviri, Kavita Kosh: सकें | Keep सके (both Gita Press scans). Note on page. |
| Chaupai 18 | जुग सहस्र जोजन | Every OCR and Kavita Kosh show सहस्त्र | Published सहस्र. OCR routinely reads स्र as स्त्र, and सहस्त्र is a common misspelling. **Check against a physical Gita Press copy.** URL slug keeps the searched spelling `jug-sahastra`. |
| Chaupai 22 | लहै ... डर ना | Mahaviri: लहहिं; Kavita Kosh: डरना | Keep. Note on page. |
| Chaupai 24 | महाबीर | GP 2121 OCR: महावीर | Two Gita Press scans read महाबीर. Keep. |
| Chaupai 27 | सब पर राम तपस्वी राजा | Mahaviri: सब पर राम राय सिरताजा | Keep Gita Press. Note names Rambhadracharya. |
| Chaupai 28 | जो कोइ लावै। सोइ अमित | Mahaviri: तासु अमित; Kavita Kosh: कोई | Keep. Note on page. |
| Chaupai 29 | चारों जुग | Mahaviri: चारिउ | Keep. Note on page. |
| Chaupai 31 | नौ निधि ... अस बर दीन | Mahaviri: नव निधि ... दीन्ह | Keep (both Gita Press scans read दीन). Note on page. |
| Chaupai 32 | सदा रहो रघुपति के दासा | Mahaviri: सादर हौ रघुपति के दासा | Keep Gita Press. Note names Rambhadracharya. |
| Chaupai 33 | राम को पावै | Popular (Patrika): भावै | Keep. Note on page. |
| Chaupai 34 | हरि-भक्त | Mahaviri: हरि-भगत | Keep. Note on page. |
| Chaupai 37 | जै जै जै ... गुरु देव की नाईं | Mahaviri, popular: जय जय जय; गुरुदेव | Keep. Note on page. |
| Chaupai 38 | जो सत बार ... छूटहि | Mahaviri: जो शत बार ... छुटहिं; popular: यह सत बार | Keep. Note on page and on /how-many-times. |
| Chaupai 39 | हनुमान चलीसा | Popular singing: चालीसा | **Owner call.** All three Gita Press scans and the Mahaviri print चलीसा (it keeps the 16-matra metre). Published चलीसा with a note that most families sing चालीसा. If this looks like a typo to visitors, switch the text to चालीसा and keep the note the other way round. |
| Closing doha | राम लखन सीता सहित | One Gita Press scan: लषन | Normalised to लखन. Note on page. |

OCR-resolved words (no Gita Press OCR has them letter for letter; the reading comes from the rhyme, the second scan and the typed witnesses): c5 बिराजै (OCR बिराजे; rhymes with साजै), c13 गावैं, c19 माहीं / लाँघि (OCR माहां / लाँधि), c25 हरै (OCR है), c39 पढ़ै (OCR पढ़े), c40 महँ (OCR महे), c18 सहस्र (see table). Worth a glance against a printed copy.

Rambhadracharya is cited by name only, with his Awadhi readings. Nothing from R. K. Misra's English Mahaviri, or from the Mahaviri's Hindi commentary, is quoted or paraphrased.

## 3. IAST

- Default IAST is the **sung** form (schwa dropped): `jay hanumān jñān gun sāgar`. Said once on the hub and in the FAQ.
- A full scholarly IAST is in `iastScholarly` on every unit (not shown yet). To switch the site, swap `iast` and `iastScholarly` in `build_chalisa.py`'s output, or change the components to read `iastScholarly`.
- The sung form comes from a schwa-deletion rule plus hand fixes (`SUNG_FIX` in the build script). Check these by ear: `añjani-putra`, `pavansut`, `bajraṅgī`, `rāmcandra`, `śrī raghubīr`, `sahasra`, `jaladhi`, `citt`, `sarb`, `janma` (sung "janam" by many), `sūkṣma` (often sung "sūkṣam"), `aṣṭ siddhi`.
- Anusvara is written as the nasal it is sung as (kañcan, saṅkaṭ, kuṇḍal); candrabindu as ṁ.

## 4. Meanings and notes to check most carefully

- **Chaupai 6** "You come from Shiva and are the son of Kesari." Keeps both traditional senses (Shiva's own form, Kesari's son) without choosing the Mahaviri reading.
- **Chaupai 8** follows the reading "Rama, Lakshmana and Sita live in your heart"; the note gives the reverse reading.
- **Chaupai 13** reads सहस बदन as Shesha, the thousand-headed serpent, with Rama speaking.
- **Chaupai 18** gives no number for the distance. The popular "yuga x sahasra x yojana = distance to the sun" arithmetic is left out on purpose.
- **Chaupai 24, 25, 36, 38, 39** are the Chalisa's own promises. They are translated as the text says them. No page adds any benefit beyond the text.
- **Chaupai 31** says the boon of siddhis and nidhis is the Chalisa's own telling; the Manas reference is Sita's blessing in 5.15.
- **Chaupai 12** note: the Manas has Rama call Hanuman twice as dear as Lakshmana (4.4); the Chalisa's "dear as Bharata" has no exact Manas line we found, so the page says what the Manas does say.
- **Doha 1** EN meaning names the four fruits as "dharma, wealth, fulfilment and freedom" (artha, kama, moksha). Check you like those words.

## 5. Ramayana references

- Every reference was checked against `sanscripts/wisdom_kb/out/verses.jsonl` by the build script (it fails on a missing id). Labels use that corpus's numbering: "Ramcharitmanas, Sundar Kand 5.24, chaupai 1" and "Valmiki Ramayana, Kishkindha Kanda 4.66.16".
- **Numbering may differ from the Gita Press Manas by a doha** (for example, the ring is often cited as Kishkindha 23 and "sunu kapi tohi samān upakārī" as Sundar 32 in Gita Press). The pages say so in "Sources and method". If you want Gita Press numbers, change `ref_label()` in the build script.
- The Valmiki record `vr.7.40.8` in the corpus holds several shlokas; the quoted line ("yāvad rāmakathā...") is the one meant.
- Lines with no single episode (marked "Ramayana: none" below) say so plainly instead of inventing one.

## 6. Other generated copy to check

- Hub FAQ (6 answers), how-many-times FAQ (6) and its "What families keep" list (custom, stated as custom), Jayanti FAQ (3) and the 7-day plan.
- Dates: Hanuman Jayanti Tue 20 Apr 2027 (Chaitra Purnima), Tamil Hanumath Jayanthi Thu 7 Jan 2027, Kali Chaudas Sat 7 Nov 2026, all per Drik Panchang as given in the brief. Weekdays were computed, not looked up. No tithi times are given.
- "One recitation takes 6 to 10 minutes": an estimate. Adjust if you time it differently.
- Hindi hub: all Hindi meanings (43) and the Hindi FAQ are our own. Hindi IAST note is not shown on the Hindi page (Devanagari is the default there).
- Gita bridges (gold links): Doha 1 to BG 4.34, Chaupai 22 to 18.66, Chaupai 33 to 7.19, Chaupai 34 to 8.5, hub to 1.20 (kapi-dhvaja). Check each one-line reason.
- Copy audit false positives in the data: "in the world" (c20), "on earth" (c8 Ramayana note), "no other deity" (c35) are translations, flagged by the superlative regex.

## 7. Not published

- Tulsidas's Hanuman Bahuk (`bhakti_poetry_corpus.jsonl`, text `tulsi_hb`) is noisy OCR and was not used.
- No audio. Every unit has `audio: null`; the line page renders an `<audio>` element only when it is set.
