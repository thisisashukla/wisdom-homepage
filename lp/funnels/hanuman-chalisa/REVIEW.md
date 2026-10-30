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

## Share cards (showcase lines, check these first)

Each card meaning is at most 20 words. Images: /api/quote-card/<id>?format=post&lang=en

- **hc-d1** (Hanuman Chalisa, Doha 1): श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि । बरनउँ रघुबर बिमल जसु जो दायकु फल चारि ॥
  - EN: With the dust of my guru's feet I clean the mirror of my mind, then sing Rama's spotless glory.
  - HI: गुरु के चरणों की धूल से मन का दर्पण साफ़ करके मैं श्रीराम का निर्मल यश गाता हूँ।
- **hc-d2** (Hanuman Chalisa, Doha 2): बुद्धिहीन तनु जानिके सुमिरौं पवन-कुमार । बल बुधि बिद्या देहु मोहिं हरहु कलेस बिकार ॥
  - EN: Knowing my own limits, I remember Hanuman. Give me strength, understanding and knowledge, and take my troubles away.
  - HI: खुद को बुद्धिहीन जानकर मैं हनुमान जी को याद करता हूँ। मुझे बल, बुद्धि, विद्या दीजिए।
- **hc-1** (Hanuman Chalisa, Chaupai 1): जय हनुमान ज्ञान गुन सागर । जय कपीस तिहुँ लोक उजागर ॥
  - EN: Victory to Hanuman, ocean of wisdom and virtue, whose glory lights up the three worlds.
  - HI: ज्ञान और गुणों के सागर हनुमान जी की जय, जिनसे तीनों लोक उजले हैं।
- **hc-2** (Hanuman Chalisa, Chaupai 2): राम दूत अतुलित बल धामा । अंजनि-पुत्र पवनसुत नामा ॥
  - EN: Rama's messenger, home of strength beyond measure, known as Anjani's son and son of the Wind.
  - HI: श्रीराम के दूत, अपार बल के धाम, अंजनीपुत्र और पवनपुत्र।
- **hc-7** (Hanuman Chalisa, Chaupai 7): बिद्यावान गुनी अति चातुर । राम काज करिबे को आतुर ॥
  - EN: Learned, full of virtue and wise, always eager to do Rama's work.
  - HI: विद्वान, गुणी और चतुर, श्रीराम का काम करने को सदा तत्पर।
- **hc-11** (Hanuman Chalisa, Chaupai 11): लाय सजीवन लखन जियाये । श्रीरघुबीर हरषि उर लाये ॥
  - EN: You brought the sanjivani and revived Lakshmana. Rama held you to his heart with joy.
  - HI: आपने संजीवनी लाकर लक्ष्मण को जीवन दिया, श्रीराम ने खुश होकर गले लगाया।
- **hc-19** (Hanuman Chalisa, Chaupai 19): प्रभु मुद्रिका मेलि मुख माहीं । जलधि लाँघि गये अचरज नाहीं ॥
  - EN: With the Lord's ring in your mouth you leapt the ocean. That is no wonder.
  - HI: प्रभु की अँगूठी मुँह में रखकर आपने समुद्र लाँघ लिया, इसमें अचरज नहीं।
- **hc-20** (Hanuman Chalisa, Chaupai 20): दुर्गम काज जगत के जेते । सुगम अनुग्रह तुम्हरे तेते ॥
  - EN: However many hard tasks there are in the world, your grace makes every one of them easy.
  - HI: संसार के जितने कठिन काम हैं, आपकी कृपा से सब आसान हो जाते हैं।
- **hc-22** (Hanuman Chalisa, Chaupai 22): सब सुख लहै तुम्हारी सरना । तुम रच्छक काहू को डर ना ॥
  - EN: Whoever takes refuge in you finds every happiness. With you as protector, there is nothing to fear.
  - HI: जो आपकी शरण में आए, उसे सब सुख मिलते हैं। आप रक्षक हों तो कोई डर नहीं।
- **hc-26** (Hanuman Chalisa, Chaupai 26): संकट तें हनुमान छुड़ावै । मन क्रम बचन ध्यान जो लावै ॥
  - EN: Hanuman frees from trouble whoever keeps him in mind, in thought, deed and word.
  - HI: जो मन, कर्म और वचन से ध्यान करे, हनुमान जी उसे संकट से छुड़ाते हैं।
- **hc-36** (Hanuman Chalisa, Chaupai 36): संकट कटै मिटै सब पीरा । जो सुमिरै हनुमत बलबीरा ॥
  - EN: Troubles are cut away and pain ends for whoever remembers Hanuman, the strong hero.
  - HI: जो बलवीर हनुमान को याद करे, उसके संकट कटते हैं और पीड़ा मिटती है।
- **hc-d3** (Hanuman Chalisa, Closing doha): पवनतनय संकट हरन मंगल मूरति रूप । राम लखन सीता सहित हृदय बसहु सुर भूप ॥
  - EN: Son of the Wind, remover of trouble, form of blessing: live in my heart with Rama, Lakshmana and Sita.
  - HI: हे पवनपुत्र, संकट हरने वाले, श्रीराम, लक्ष्मण और सीता के साथ मेरे हृदय में बसिए।

## Every line (reviewed: false on all 43)

For each line check: the Awadhi against your Gita Press copy, the sung IAST, the English and Hindi meaning, the word glosses, the Ramayana note and its reference, and the variant notes.

### Doha 1 (share card): /hanuman-chalisa/doha-1-shri-guru-charan-saroj-raj

- Awadhi: श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि । बरनउँ रघुबर बिमल जसु जो दायकु फल चारि ॥
- Sung IAST: śrīguru caran saroj raj nij manu mukuru sudhāri / baranauṁ raghubar bimal jasu jo dāyaku phal cāri
- Scholarly IAST: śrīguru carana saroja raja nija manu mukuru sudhāri / baranauṁ raghubara bimala jasu jo dāyaku phala cāri
- EN: With the dust of my guru's lotus feet I polish the mirror of my mind. Then I sing the spotless glory of Rama, best of the Raghus, which gives all four fruits of life: dharma, wealth, fulfilment and freedom.
- HI: गुरु के चरण-कमलों की धूल से अपने मन का दर्पण साफ़ करके मैं श्रीराम का निर्मल यश गाता हूँ, जो धर्म, अर्थ, काम और मोक्ष, चारों फल देता है।
- Words: श्रीगुरु (śrīguru) = the revered guru; चरन (caran) = feet; सरोज (saroj) = lotus; रज (raj) = dust; निज (nij) = my own; मनु (manu) = mind; मुकुरु (mukuru) = mirror; सुधारि (sudhāri) = having polished; बरनउँ (baranauṁ) = I describe; रघुबर (raghubar) = best of the Raghus, Rama; बिमल (bimal) = spotless; जसु (jasu) = glory; जो (jo) = which; दायकु (dāyaku) = giver; फल (phal) = fruits; चारि (cāri) = four
- Ramayana: Tulsidas opens the Ayodhya Kand of his Ramcharitmanas with this same couplet, word for word, as the story turns to the plan to crown Rama.
  - Ramcharitmanas, Ayodhya Kand 2.1, doha 1 [rcm.2.1.doha.1]: श्री गुरु चरन सरोज रज निज मनु मुकुरु सुधारि। बरनउँ रघुबर बिमल जसु जो दायकु फल चारि॥
- Variant note: Rambhadracharya's Mahaviri prints निज मन मुकुर ... जस ... दायक, without the final u. The u endings are Awadhi and are what the Gita Press prints.

### Doha 2 (share card): /hanuman-chalisa/doha-2-buddhiheen-tanu-janike

- Awadhi: बुद्धिहीन तनु जानिके सुमिरौं पवन-कुमार । बल बुधि बिद्या देहु मोहिं हरहु कलेस बिकार ॥
- Sung IAST: buddhihīn tanu jānike sumirauṁ pavan-kumār / bal budhi bidyā dehu mohiṁ harahu kales bikār
- Scholarly IAST: buddhihīna tanu jānike sumirauṃ pavana-kumāra / bala budhi bidyā dehu mohiṃ harahu kalesa bikāra
- EN: Knowing myself to be short of understanding, I call to mind Hanuman, son of the Wind. Give me strength, understanding and knowledge, and take away my troubles and my faults.
- HI: खुद को बुद्धिहीन जानकर मैं पवनपुत्र हनुमान जी को याद करता हूँ। मुझे बल, बुद्धि और विद्या दीजिए, और मेरे क्लेश और मन के दोष दूर कीजिए।
- Words: बुद्धिहीन (buddhihīn) = short of understanding; तनु (tanu) = this self, this body; जानिके (jānike) = knowing; सुमिरौं (sumirauṁ) = I remember; पवन-कुमार (pavan-kumār) = son of the Wind; बल (bal) = strength; बुधि (budhi) = understanding; बिद्या (bidyā) = knowledge; देहु (dehu) = give; मोहिं (mohiṁ) = to me; हरहु (harahu) = take away; कलेस (kales) = troubles; बिकार (bikār) = faults of the mind
- Ramayana: none (page says the line does not retell one episode)
- Variant note: Many people sing बल बुद्धि बिद्या. The Gita Press prints बुधि, the Awadhi form, which keeps the metre. Some editions print कलेश for कलेस.

### Chaupai 1 (share card): /hanuman-chalisa/1-jai-hanuman-gyan-gun-sagar

- Awadhi: जय हनुमान ज्ञान गुन सागर । जय कपीस तिहुँ लोक उजागर ॥
- Sung IAST: jay hanumān jñān gun sāgar / jay kapīs tihuṁ lok ujāgar
- Scholarly IAST: jaya hanumāna jñāna guna sāgara / jaya kapīsa tihuṁ loka ujāgara
- EN: Victory to Hanuman, ocean of wisdom and virtue. Victory to the lord of the vanaras, whose glory lights up the three worlds.
- HI: ज्ञान और गुणों के सागर हनुमान जी की जय हो। तीनों लोकों में उजाला करने वाले वानरराज की जय हो।
- Words: जय (jay) = victory; हनुमान (hanumān) = Hanuman; ज्ञान (jñān) = wisdom; गुन (gun) = virtues; सागर (sāgar) = ocean; जय (jay) = victory; कपीस (kapīs) = lord of the vanaras; तिहुँ (tihuṁ) = three; लोक (lok) = worlds; उजागर (ujāgar) = who lights up, renowned in
- Ramayana: The Sundar Kand of the Manas opens with a Sanskrit verse to Hanuman that calls him first among the wise and a storehouse of every virtue.
  - Ramcharitmanas, Sundar Kand 5.1, shloka 3 [rcm.5.1.shloka.3]: अतुलितबलधामं हेमशैलाभदेहं दनुजवनकृशानुं ज्ञानिनामग्रगण्यम् । सकलगुणनिधानं वानराणामधीशं रघुपतिप्रियभक्तं वातजातं नमामि॥
- Variant note: Rambhadracharya's Mahaviri prints गुण for गुन. The sound and sense are the same.

### Chaupai 2 (share card): /hanuman-chalisa/2-ram-doot-atulit-bal-dhama

- Awadhi: राम दूत अतुलित बल धामा । अंजनि-पुत्र पवनसुत नामा ॥
- Sung IAST: rām dūt atulit bal dhāmā / añjani-putra pavansut nāmā
- Scholarly IAST: rāma dūta atulita bala dhāmā / aṃjani-putra pavanasuta nāmā
- EN: You are Rama's messenger, the home of strength beyond measure. You are known as Anjani's son and as the son of the Wind.
- HI: आप श्रीराम के दूत हैं और अपार बल के धाम हैं। आपको अंजनीपुत्र और पवनपुत्र के नाम से जाना जाता है।
- Words: राम (rām) = Rama's; दूत (dūt) = messenger; अतुलित (atulit) = beyond measure; बल (bal) = strength; धामा (dhāmā) = home, abode; अंजनि-पुत्र (añjani-putra) = son of Anjani; पवनसुत (pavansut) = son of the Wind; नामा (nāmā) = known as
- Ramayana: In the Valmiki Ramayana, Jambavan reminds Hanuman of his birth: his mother Anjana was the wife of Kesari, and the Wind god was his father. The Manas Sundar Kand calls him the home of matchless strength.
  - Valmiki Ramayana, Kishkindha Kanda 4.66.8 [vr.4.66.8]: अप्सराऽप्सरसां श्रेष्ठा विख्याता पुञ्जिकस्थला। अञ्जनेति परिख्याता पत्नी केसरिणो हरेः॥
  - Valmiki Ramayana, Kishkindha Kanda 4.66.24 [vr.4.66.24]: स त्वं केसरिणः पुत्रः क्षेत्रजो भीमविक्रमः॥
  - Ramcharitmanas, Sundar Kand 5.1, shloka 3 [rcm.5.1.shloka.3]: अतुलितबलधामं हेमशैलाभदेहं दनुजवनकृशानुं ज्ञानिनामग्रगण्यम् । सकलगुणनिधानं वानराणामधीशं रघुपतिप्रियभक्तं वातजातं नमामि॥

### Chaupai 7 (share card): /hanuman-chalisa/7-vidyavan-guni-ati-chatur

- Awadhi: बिद्यावान गुनी अति चातुर । राम काज करिबे को आतुर ॥
- Sung IAST: bidyāvān gunī ati cātur / rām kāj karibe ko ātur
- Scholarly IAST: bidyāvāna gunī ati cātura / rāma kāja karibe ko ātura
- EN: Learned, full of virtue and very wise, you are always eager to do Rama's work.
- HI: आप विद्वान हैं, गुणी हैं, बहुत चतुर हैं, और श्रीराम का काम करने को हमेशा तत्पर रहते हैं।
- Words: बिद्यावान (bidyāvān) = learned; गुनी (gunī) = full of virtue; अति (ati) = very; चातुर (cātur) = wise, clever; राम (rām) = Rama's; काज (kāj) = work; करिबे को (karibe ko) = to do; आतुर (ātur) = eager
- Ramayana: Over the ocean, the mountain Mainaka rises and offers him rest. Hanuman touches it, bows, and says there is no rest for him until Rama's work is done.
  - Ramcharitmanas, Sundar Kand 5.1, doha 1 [rcm.5.1.doha.1]: हनूमान तेहि परसा कर पुनि कीन्ह प्रनाम। राम काजु कीन्हें बिनु मोहि कहाँ बिश्राम॥

### Chaupai 11 (share card): /hanuman-chalisa/11-laye-sanjivan-lakhan-jiyaye

- Awadhi: लाय सजीवन लखन जियाये । श्रीरघुबीर हरषि उर लाये ॥
- Sung IAST: lāy sajīvan lakhan jiyāye / śrī raghubīr harṣi ur lāye
- Scholarly IAST: lāya sajīvana lakhana jiyāye / śrīraghubīra haraṣi ura lāye
- EN: You brought the sanjivani herb and revived Lakshmana. Rama, hero of the Raghus, held you to his heart with joy.
- HI: आपने संजीवनी लाकर लक्ष्मण जी के प्राण बचाए, और श्रीराम ने खुश होकर आपको गले लगा लिया।
- Words: लाय (lāy) = bringing; सजीवन (sajīvan) = the life-giving herb, sanjivani; लखन (lakhan) = Lakshmana; जियाये (jiyāye) = brought back to life; श्रीरघुबीर (śrī raghubīr) = Rama, hero of the Raghus; हरषि (harṣi) = with joy; उर (ur) = to the heart; लाये (lāye) = held
- Ramayana: When Lakshmana falls in battle, the physician Sushena names the herb on the mountain and Hanuman goes for it. When he returns, the Manas says Rama embraced Hanuman with joy, the words this line echoes.
  - Ramcharitmanas, Lanka Kand 6.55, doha 1 [rcm.6.55.doha.1]: राम पदारबिंद सिर नायउ आइ सुषेन। कहा नाम गिरि औषधी जाहु पवनसुत लेन॥
  - Ramcharitmanas, Lanka Kand 6.60, chaupai 10 [rcm.6.60.chaupai.10]: हरषि राम भेंटेउ हनुमाना। अति कृतग्य प्रभु परम सुजाना॥
- Variant note: Some editions read संजीवन or सँजीवनि for सजीवन.

### Chaupai 19 (share card): /hanuman-chalisa/19-prabhu-mudrika-meli-mukh-mahi

- Awadhi: प्रभु मुद्रिका मेलि मुख माहीं । जलधि लाँघि गये अचरज नाहीं ॥
- Sung IAST: prabhu mudrikā meli mukh māhīṁ / jaladhi lāṁghi gaye acaraj nāhīṁ
- Scholarly IAST: prabhu mudrikā meli mukha māhīṃ / jaladhi lāṁghi gaye acaraja nāhīṃ
- EN: With the Lord's ring in your mouth you leapt over the ocean. That is no wonder.
- HI: प्रभु की अँगूठी मुँह में रखकर आपने समुद्र लाँघ लिया, इसमें कोई अचरज नहीं।
- Words: प्रभु (prabhu) = the Lord's; मुद्रिका (mudrikā) = ring; मेलि (meli) = placing; मुख (mukh) = mouth; माहीं (māhīṁ) = in; जलधि (jaladhi) = the ocean; लाँघि (lāṁghi) = leaping over; गये (gaye) = went; अचरज (acaraj) = wonder; नाहीं (nāhīṁ) = no
- Ramayana: Before the search parties leave, Rama touches Hanuman's head and gives him his ring. At the ocean, Hanuman goes like Rama's unfailing arrow.
  - Ramcharitmanas, Kishkindha Kand 4.24, chaupai 5 [rcm.4.24.chaupai.5]: परसा सीस सरोरुह पानी। करमुद्रिका दीन्हि जन जानी॥
  - Ramcharitmanas, Sundar Kand 5.1, chaupai 4 [rcm.5.1.chaupai.4]: जिमि अमोघ रघुपति कर बाना। एही भाँति चलेउ हनुमाना॥

### Chaupai 20 (share card): /hanuman-chalisa/20-durgam-kaaj-jagat-ke-jete

- Awadhi: दुर्गम काज जगत के जेते । सुगम अनुग्रह तुम्हरे तेते ॥
- Sung IAST: durgam kāj jagat ke jete / sugam anugrah tumhare tete
- Scholarly IAST: durgama kāja jagata ke jete / sugama anugraha tumhare tete
- EN: However many hard tasks there are in the world, your grace makes every one of them easy.
- HI: संसार के जितने भी कठिन काम हैं, आपकी कृपा से सब आसान हो जाते हैं।
- Words: दुर्गम (durgam) = hard; काज (kāj) = tasks; जगत के (jagat ke) = in the world; जेते (jete) = as many as there are; सुगम (sugam) = easy; अनुग्रह (anugrah) = grace; तुम्हरे (tumhare) = your; तेते (tete) = that many
- Ramayana: none (page says the line does not retell one episode)

### Chaupai 22 (share card): /hanuman-chalisa/22-sab-sukh-lahai-tumhari-sarna

- Awadhi: सब सुख लहै तुम्हारी सरना । तुम रच्छक काहू को डर ना ॥
- Sung IAST: sab sukh lahai tumhārī sarnā / tum racchak kāhū ko ḍar nā
- Scholarly IAST: saba sukha lahai tumhārī saranā / tuma racchaka kāhū ko ḍara nā
- EN: Whoever takes refuge in you finds every happiness. With you as protector, there is nothing to fear.
- HI: जो आपकी शरण में आता है, उसे सब सुख मिलते हैं। आप रक्षक हों तो किसी का डर नहीं।
- Words: सब (sab) = every; सुख (sukh) = happiness; लहै (lahai) = finds; तुम्हारी (tumhārī) = your; सरना (sarnā) = refuge; तुम (tum) = you; रच्छक (racchak) = protector; काहू को (kāhū ko) = of anyone; डर (ḍar) = fear; ना (nā) = no
- Ramayana: none (page says the line does not retell one episode)
- Variant note: Rambhadracharya's Mahaviri reads लहहिं. Some printings run डर ना together as डरना; read it as two words, "no fear".

### Chaupai 26 (share card): /hanuman-chalisa/26-sankat-te-hanuman-chhudavai

- Awadhi: संकट तें हनुमान छुड़ावै । मन क्रम बचन ध्यान जो लावै ॥
- Sung IAST: saṅkaṭ teṁ hanumān chuṛāvai / man kram bacan dhyān jo lāvai
- Scholarly IAST: saṃkaṭa teṃ hanumāna chuṛāvai / mana krama bacana dhyāna jo lāvai
- EN: Hanuman frees from trouble whoever keeps him in mind, in thought, in deed and in word.
- HI: जो मन, कर्म और वचन से हनुमान जी का ध्यान करता है, हनुमान जी उसे संकट से छुड़ाते हैं।
- Words: संकट (saṅkaṭ) = trouble; तें (teṁ) = from; हनुमान (hanumān) = Hanuman; छुड़ावै (chuṛāvai) = frees; मन (man) = thought; क्रम (kram) = deed; बचन (bacan) = word; ध्यान (dhyān) = attention; जो (jo) = whoever; लावै (lāvai) = fixes on him
- Ramayana: none (page says the line does not retell one episode)

### Chaupai 36 (share card): /hanuman-chalisa/36-sankat-katai-mitai-sab-peera

- Awadhi: संकट कटै मिटै सब पीरा । जो सुमिरै हनुमत बलबीरा ॥
- Sung IAST: saṅkaṭ kaṭai miṭai sab pīrā / jo sumirai hanumat balbīrā
- Scholarly IAST: saṃkaṭa kaṭai miṭai saba pīrā / jo sumirai hanumata balabīrā
- EN: Troubles are cut away and all pain ends for whoever remembers Hanuman, the strong hero.
- HI: जो बलवीर हनुमान जी को याद करता है, उसके संकट कट जाते हैं और सारी पीड़ा मिट जाती है।
- Words: संकट (saṅkaṭ) = troubles; कटै (kaṭai) = are cut away; मिटै (miṭai) = ends; सब (sab) = all; पीरा (pīrā) = pain; जो (jo) = whoever; सुमिरै (sumirai) = remembers; हनुमत (hanumat) = Hanuman; बलबीरा (balbīrā) = the strong hero
- Ramayana: none (page says the line does not retell one episode)

### Closing doha (share card): /hanuman-chalisa/closing-doha-pavan-tanay-sankat-haran

- Awadhi: पवनतनय संकट हरन मंगल मूरति रूप । राम लखन सीता सहित हृदय बसहु सुर भूप ॥
- Sung IAST: pavantanay saṅkaṭ haran maṅgal mūrati rūp / rām lakhan sītā sahit hṛday basahu sur bhūp
- Scholarly IAST: pavanatanaya saṃkaṭa harana maṃgala mūrati rūpa / rāma lakhana sītā sahita hṛdaya basahu sura bhūpa
- EN: Son of the Wind, remover of trouble, whose very form is blessing: king among the gods, live in my heart with Rama, Lakshmana and Sita.
- HI: हे पवनपुत्र, संकट हरने वाले, मंगल की मूर्ति, हे देवताओं के राजा, आप श्रीराम, लक्ष्मण और सीता के साथ मेरे हृदय में बसिए।
- Words: पवनतनय (pavantanay) = son of the Wind; संकट (saṅkaṭ) = trouble; हरन (haran) = remover; मंगल (maṅgal) = blessing; मूरति (mūrati) = embodiment; रूप (rūp) = form; राम (rām) = Rama; लखन (lakhan) = Lakshmana; सीता (sītā) = Sita; सहित (sahit) = with; हृदय (hṛday) = heart; बसहु (basahu) = please live; सुर (sur) = of the gods; भूप (bhūp) = king
- Ramayana: none (page says the line does not retell one episode)
- Variant note: Some Gita Press printings spell लखन as लषन, the older spelling, read the same way.

### Chaupai 3: /hanuman-chalisa/3-mahabir-bikram-bajrangi

- Awadhi: महाबीर बिक्रम बजरंगी । कुमति निवार सुमति के संगी ॥
- Sung IAST: mahābīr bikram bajraṅgī / kumati nivār sumati ke saṅgī
- Scholarly IAST: mahābīra bikrama bajaraṃgī / kumati nivāra sumati ke saṃgī
- EN: Great hero, valiant, with a body as strong as the thunderbolt, you clear away bad thinking and stay beside good sense.
- HI: आप महावीर हैं, पराक्रमी हैं, आपका शरीर वज्र जैसा है। आप बुरी सोच दूर करते हैं और अच्छी सोच के साथी हैं।
- Words: महाबीर (mahābīr) = great hero; बिक्रम (bikram) = valiant; बजरंगी (bajraṅgī) = with limbs like the thunderbolt (vajra); कुमति (kumati) = bad thinking; निवार (nivār) = remover; सुमति (sumati) = good sense; के (ke) = of; संगी (saṅgī) = companion
- Ramayana: none (page says the line does not retell one episode)

### Chaupai 4: /hanuman-chalisa/4-kanchan-baran-biraj-subesa

- Awadhi: कंचन बरन बिराज सुबेसा । कानन कुंडल कुंचित केसा ॥
- Sung IAST: kañcan baran birāj subesā / kānan kuṇḍal kuñcit kesā
- Scholarly IAST: kaṃcana barana birāja subesā / kānana kuṃḍala kuṃcita kesā
- EN: Your colour is gold and your dress is fine. Rings shine in your ears and your hair is curled.
- HI: आपका रंग सोने जैसा है और वेश सुंदर है। कानों में कुंडल हैं और बाल घुँघराले हैं।
- Words: कंचन (kañcan) = gold; बरन (baran) = colour; बिराज (birāj) = shining; सुबेसा (subesā) = finely dressed; कानन (kānan) = in the ears; कुंडल (kuṇḍal) = earrings; कुंचित (kuñcit) = curly; केसा (kesā) = hair
- Ramayana: The Sundar Kand opening verse describes his body shining like a golden mountain, and in the Ashoka grove he shows Sita a body like a mountain of gold.
  - Ramcharitmanas, Sundar Kand 5.1, shloka 3 [rcm.5.1.shloka.3]: अतुलितबलधामं हेमशैलाभदेहं दनुजवनकृशानुं ज्ञानिनामग्रगण्यम् । सकलगुणनिधानं वानराणामधीशं रघुपतिप्रियभक्तं वातजातं नमामि॥
  - Ramcharitmanas, Sundar Kand 5.14, chaupai 4 [rcm.5.14.chaupai.4]: कनक भूधराकार सरीरा। समर भयंकर अतिबल बीरा॥

### Chaupai 5: /hanuman-chalisa/5-hath-bajra-aur-dhwaja-biraje

- Awadhi: हाथ बज्र औ ध्वजा बिराजै । काँधे मूँज जनेऊ साजै ॥
- Sung IAST: hāth bajra au dhvajā birājai / kāṁdhe mūṁj janeū sājai
- Scholarly IAST: hātha bajra au dhvajā birājai / kāṁdhe mūṁja janeū sājai
- EN: In your hands shine the thunderbolt and the flag. A sacred thread of munja grass sits on your shoulder.
- HI: आपके हाथों में वज्र और ध्वजा शोभा देते हैं, और कंधे पर मूँज का जनेऊ सजा है।
- Words: हाथ (hāth) = hand; बज्र (bajra) = thunderbolt, often read as his mace; औ (au) = and; ध्वजा (dhvajā) = flag; बिराजै (birājai) = shines; काँधे (kāṁdhe) = on the shoulder; मूँज (mūṁj) = munja grass; जनेऊ (janeū) = sacred thread; साजै (sājai) = adorns
- Ramayana: none (page says the line does not retell one episode)
- Variant note: Rambhadracharya's Mahaviri reads अरु for औ and छाजै for साजै. The sense does not change.

### Chaupai 6: /hanuman-chalisa/6-sankar-suvan-kesari-nandan

- Awadhi: संकर सुवन केसरीनंदन । तेज प्रताप महा जग बंदन ॥
- Sung IAST: saṅkar suvan kesarīnandan / tej pratāp mahā jag bandan
- Scholarly IAST: saṃkara suvana kesarīnaṃdana / teja pratāpa mahā jaga baṃdana
- EN: You come from Shiva and are the son of Kesari. Your radiance and might are vast, and the whole world bows to you.
- HI: आप शंकर के अंश और केसरी के पुत्र हैं। आपका तेज और प्रताप महान है, सारा जगत आपको प्रणाम करता है।
- Words: संकर (saṅkar) = Shiva; सुवन (suvan) = son, born of; केसरीनंदन (kesarīnandan) = son of Kesari; तेज (tej) = radiance; प्रताप (pratāp) = might; महा (mahā) = great; जग (jag) = the world; बंदन (bandan) = bowed to
- Ramayana: Valmiki has Jambavan tell Hanuman that he is the son of Kesari and, by birth, the son of the Wind.
  - Valmiki Ramayana, Kishkindha Kanda 4.66.24 [vr.4.66.24]: स त्वं केसरिणः पुत्रः क्षेत्रजो भीमविक्रमः॥
- Variant note: Rambhadracharya, in his Mahaviri commentary, reads शंकर स्वयं केसरीनंदन, "Shiva himself, as Kesari's son", since tradition holds Hanuman to be a form of Shiva. The Gita Press prints संकर सुवन.

### Chaupai 8: /hanuman-chalisa/8-prabhu-charitra-sunibe-ko-rasiya

- Awadhi: प्रभु चरित्र सुनिबे को रसिया । राम लखन सीता मन बसिया ॥
- Sung IAST: prabhu caritra sunibe ko rasiyā / rām lakhan sītā man basiyā
- Scholarly IAST: prabhu caritra sunibe ko rasiyā / rāma lakhana sītā mana basiyā
- EN: You love to hear the Lord's story. Rama, Lakshmana and Sita live in your heart.
- HI: प्रभु की कथा सुनने में आपको आनंद आता है। श्रीराम, लक्ष्मण और सीता आपके मन में बसते हैं।
- Words: प्रभु (prabhu) = the Lord's; चरित्र (caritra) = story, deeds; सुनिबे को (sunibe ko) = to hear; रसिया (rasiyā) = one who delights in; राम (rām) = Rama; लखन (lakhan) = Lakshmana; सीता (sītā) = Sita; मन (man) = heart; बसिया (basiyā) = dwelling
- Ramayana: In the Valmiki Ramayana's last book, Hanuman asks Rama that his love stay fixed on him, and that he may live on earth as long as Rama's story is told.
  - Valmiki Ramayana, Uttara Kanda 7.40.8 [vr.7.40.8]: यावद्रामकथा वीर चरिष्यति महीतले। तावच्छरीरे वत्स्यन्तु प्राणा मम न संशयः॥
- Variant note: Some Gita Press printings spell लखन as लषन, the older spelling, read the same way.
- Variant note: Some read the line the other way round: you live in the hearts of Rama, Lakshmana and Sita.

### Chaupai 9: /hanuman-chalisa/9-sukshma-roop-dhari-siyahi-dikhava

- Awadhi: सूक्ष्म रूप धरि सियहिं दिखावा । बिकट रूप धरि लंक जरावा ॥
- Sung IAST: sūkṣma rūp dhari siyahiṁ dikhāvā / bikaṭ rūp dhari laṅk jarāvā
- Scholarly IAST: sūkṣma rūpa dhari siyahiṃ dikhāvā / bikaṭa rūpa dhari laṃka jarāvā
- EN: Taking a tiny form, you showed yourself to Sita. Taking a fearsome form, you set Lanka on fire.
- HI: आपने छोटा रूप लेकर सीता जी को दर्शन दिए, और विकराल रूप लेकर लंका जला दी।
- Words: सूक्ष्म (sūkṣma) = tiny; रूप (rūp) = form; धरि (dhari) = taking; सियहिं (siyahiṁ) = to Sita; दिखावा (dikhāvā) = showed; बिकट (bikaṭ) = huge, fearsome; रूप (rūp) = form; धरि (dhari) = taking; लंक (laṅk) = Lanka; जरावा (jarāvā) = burned
- Ramayana: He enters Lanka in a form as small as a mosquito, later comes down from the tree to stand near Sita, and when his tail is set alight he grows huge yet light and leaps from roof to roof as the city burns.
  - Ramcharitmanas, Sundar Kand 5.3, chaupai 7 [rcm.5.3.chaupai.7]: मसक समान रूप कपि धरी। लंकहि चलेउ सुमिरि नरहरी॥
  - Ramcharitmanas, Sundar Kand 5.11, chaupai 10 [rcm.5.11.chaupai.10]: तब हनुमंत निकट चलि गयऊ। फिरि बैठीं मन बिसमय भयऊ॥
  - Ramcharitmanas, Sundar Kand 5.24, chaupai 1 [rcm.5.24.chaupai.1]: देह बिसाल परम हरुआई। मंदिर तें मंदिर चढ़ धाई॥

### Chaupai 10: /hanuman-chalisa/10-bhim-roop-dhari-asur-sanhare

- Awadhi: भीम रूप धरि असुर सँहारे । रामचंद्र के काज सँवारे ॥
- Sung IAST: bhīm rūp dhari asur saṁhāre / rāmcandra ke kāj saṁvāre
- Scholarly IAST: bhīma rūpa dhari asura saṁhāre / rāmacaṃdra ke kāja saṁvāre
- EN: Taking a terrible form, you destroyed the asuras and carried Rama's work through.
- HI: आपने भयंकर रूप लेकर राक्षसों का संहार किया और श्रीरामचंद्र के काम पूरे किए।
- Words: भीम (bhīm) = terrible; रूप (rūp) = form; धरि (dhari) = taking; असुर (asur) = asuras, the rakshasas; सँहारे (saṁhāre) = destroyed; रामचंद्र के (rāmcandra ke) = Ramachandra's; काज (kāj) = tasks; सँवारे (saṁvāre) = carried through
- Ramayana: In the Ashoka grove Ravana sends his son Akshay Kumar with an army. Hanuman pulls up a tree, strikes him down and roars.
  - Ramcharitmanas, Sundar Kand 5.16, chaupai 4 [rcm.5.16.chaupai.4]: पुनि पठयउ तेहिं अच्छकुमारा। चला संग लै सुभट अपारा॥

### Chaupai 12: /hanuman-chalisa/12-raghupati-kinhi-bahut-badai

- Awadhi: रघुपति कीन्ही बहुत बड़ाई । तुम मम प्रिय भरतहि सम भाई ॥
- Sung IAST: raghupati kīnhī bahut baṛāī / tum mam priya bharatahi sam bhāī
- Scholarly IAST: raghupati kīnhī bahuta baṛāī / tuma mama priya bharatahi sama bhāī
- EN: Rama, lord of the Raghus, praised you greatly: "You are as dear to me as my brother Bharata."
- HI: श्रीराम ने आपकी बहुत प्रशंसा की और कहा, तुम मुझे भरत जैसे प्यारे भाई हो।
- Words: रघुपति (raghupati) = lord of the Raghus, Rama; कीन्ही (kīnhī) = gave; बहुत (bahut) = much; बड़ाई (baṛāī) = praise; तुम (tum) = you; मम (mam) = my; प्रिय (priya) = dear; भरतहि सम (bharatahi sam) = equal to Bharata; भाई (bhāī) = brother
- Ramayana: At their first meeting in the Manas, Rama tells Hanuman he is twice as dear to him as Lakshmana.
  - Ramcharitmanas, Kishkindha Kand 4.4, chaupai 4 [rcm.4.4.chaupai.4]: सुनु कपि जियँ मानसि जनि ऊना। तैं मम प्रिय लछिमन ते दूना॥
- Variant note: Some editions print भरतहिं.

### Chaupai 13: /hanuman-chalisa/13-sahas-badan-tumharo-jas-gavai

- Awadhi: सहस बदन तुम्हरो जस गावैं । अस कहि श्रीपति कंठ लगावैं ॥
- Sung IAST: sahas badan tumharo jas gāvaiṁ / as kahi śrīpati kaṇṭh lagāvaiṁ
- Scholarly IAST: sahasa badana tumharo jasa gāvaiṃ / asa kahi śrīpati kaṃṭha lagāvaiṃ
- EN: "May the thousand-mouthed Shesha sing your glory," said Rama, lord of Shri, and he held you close.
- HI: हज़ार मुखों वाले शेषनाग तुम्हारा यश गाएँ, यह कहकर श्रीराम ने आपको गले लगा लिया।
- Words: सहस (sahas) = thousand; बदन (badan) = mouths, here Shesha, the thousand-headed serpent; तुम्हरो (tumharo) = your; जस (jas) = glory; गावैं (gāvaiṁ) = sing; अस (as) = so; कहि (kahi) = saying; श्रीपति (śrīpati) = lord of Shri, Rama; कंठ लगावैं (kaṇṭh lagāvaiṁ) = embraces
- Ramayana: When Hanuman returns with news of Sita, Valmiki has Rama say that an embrace is all he can give him in return.
  - Valmiki Ramayana, Yuddha Kanda 6.1.13 [vr.6.1.13]: एष सर्वस्वभूतस्तु परिष्वङ्गो हनूमत । मया कालमिमं प्राप्य दत्तस्तस्य महात्मनः॥

### Chaupai 14: /hanuman-chalisa/14-sanakadik-brahmadi-munisa

- Awadhi: सनकादिक ब्रह्मादि मुनीसा । नारद सारद सहित अहीसा ॥
- Sung IAST: sanakādik brahmādi munīsā / nārad sārad sahit ahīsā
- Scholarly IAST: sanakādika brahmādi munīsā / nārada sārada sahita ahīsā
- EN: Sanaka and his brothers, Brahma and the gods, the great sages, Narada and Saraswati, with Shesha, lord of serpents,
- HI: सनक आदि ऋषि, ब्रह्मा आदि देवता, बड़े-बड़े मुनि, नारद, सरस्वती और शेषनाग भी,
- Words: सनकादिक (sanakādik) = Sanaka and his brothers; ब्रह्मादि (brahmādi) = Brahma and the gods; मुनीसा (munīsā) = the great sages; नारद (nārad) = Narada; सारद (sārad) = Sharada, Saraswati; सहित (sahit) = with; अहीसा (ahīsā) = Shesha, lord of serpents
- Ramayana: none (page says the line does not retell one episode)

### Chaupai 15: /hanuman-chalisa/15-jam-kuber-digpal-jahan-te

- Awadhi: जम कुबेर दिगपाल जहाँ ते । कबि कोबिद कहि सके कहाँ ते ॥
- Sung IAST: jam kuber digpāl jahāṁ te / kabi kobid kahi sake kahāṁ te
- Scholarly IAST: jama kubera digapāla jahāṁ te / kabi kobida kahi sake kahāṁ te
- EN: Yama, Kubera and the guardians of the directions cannot tell your glory in full. How could poets and scholars?
- HI: यम, कुबेर और दिशाओं के रक्षक भी आपका यश पूरा नहीं कह पाते, तो कवि और विद्वान कैसे कहें।
- Words: जम (jam) = Yama; कुबेर (kuber) = Kubera; दिगपाल (digpāl) = guardians of the directions; जहाँ ते (jahāṁ te) = all of them; कबि (kabi) = poets; कोबिद (kobid) = scholars; कहि (kahi) = tell; सके (sake) = could; कहाँ ते (kahāṁ te) = how
- Ramayana: none (page says the line does not retell one episode)
- Variant note: Some editions, including Rambhadracharya's, read सकें.

### Chaupai 16: /hanuman-chalisa/16-tum-upkar-sugrivahi-kinha

- Awadhi: तुम उपकार सुग्रीवहिं कीन्हा । राम मिलाय राज पद दीन्हा ॥
- Sung IAST: tum upkār sugrīvahiṁ kīnhā / rām milāy rāj pad dīnhā
- Scholarly IAST: tuma upakāra sugrīvahiṃ kīnhā / rāma milāya rāja pada dīnhā
- EN: You did Sugriva a great kindness. You brought him to Rama and gave him back his kingdom.
- HI: आपने सुग्रीव पर उपकार किया। उन्हें श्रीराम से मिलाया और राजपद दिलाया।
- Words: तुम (tum) = you; उपकार (upkār) = a great kindness; सुग्रीवहिं (sugrīvahiṁ) = to Sugriva; कीन्हा (kīnhā) = did; राम (rām) = Rama; मिलाय (milāy) = bringing him to; राज (rāj) = king's; पद (pad) = place; दीन्हा (dīnhā) = gave
- Ramayana: Hanuman tells each side the other's story, and Rama and Sugriva seal their friendship with fire as witness.
  - Ramcharitmanas, Kishkindha Kand 4.5, doha 1 [rcm.4.5.doha.1]: तब हनुमंत उभय दिसि की सब कथा सुनाइ। पावक साखी देइ करि जोरी प्रीति दृढ़ाइ॥

### Chaupai 17: /hanuman-chalisa/17-tumharo-mantra-vibhishan-mana

- Awadhi: तुम्हरो मंत्र बिभीषन माना । लंकेस्वर भए सब जग जाना ॥
- Sung IAST: tumharo mantra bibhīṣan mānā / laṅkesvar bhae sab jag jānā
- Scholarly IAST: tumharo maṃtra bibhīṣana mānā / laṃkesvara bhae saba jaga jānā
- EN: Vibhishana took your counsel and became king of Lanka, as the whole world knows.
- HI: विभीषण ने आपकी सलाह मानी और लंका के राजा बने, यह सारा संसार जानता है।
- Words: तुम्हरो (tumharo) = your; मंत्र (mantra) = counsel; बिभीषन (bibhīṣan) = Vibhishana; माना (mānā) = heeded; लंकेस्वर (laṅkesvar) = lord of Lanka; भए (bhae) = became; सब (sab) = the whole; जग (jag) = world; जाना (jānā) = knows
- Ramayana: In Lanka, Hanuman meets Vibhishana and tells him how Rama always loves those who serve him.
  - Ramcharitmanas, Sundar Kand 5.6, chaupai 3 [rcm.5.6.chaupai.3]: सुनहु बिभीषन प्रभु कै रीती। करहिं सदा सेवक पर प्रीति॥

### Chaupai 18: /hanuman-chalisa/18-jug-sahastra-jojan-par-bhanu

- Awadhi: जुग सहस्र जोजन पर भानू । लील्यो ताहि मधुर फल जानू ॥
- Sung IAST: jug sahasra jojan par bhānū / līlyo tāhi madhur phal jānū
- Scholarly IAST: juga sahasra jojana para bhānū / līlyo tāhi madhura phala jānū
- EN: The sun stood thousands upon thousands of yojanas away, and you swallowed it, taking it for a sweet fruit.
- HI: हज़ारों योजन दूर के सूरज को आपने मीठा फल समझकर निगल लिया।
- Words: जुग (jug) = ages, a vast count; सहस्र (sahasra) = thousand; जोजन (jojan) = yojanas, an old measure of distance; पर (par) = away; भानू (bhānū) = the sun; लील्यो (līlyo) = swallowed; ताहि (tāhi) = it; मधुर (madhur) = sweet; फल (phal) = fruit; जानू (jānū) = taking it for
- Ramayana: Valmiki has Jambavan recall it: as a child Hanuman saw the rising sun, took it for a fruit and leapt into the sky to seize it.
  - Valmiki Ramayana, Kishkindha Kanda 4.66.16 [vr.4.66.16]: अभ्युत्थितं ततः सूर्यं बालो दृष्ट्वा महावने। फलं चेति जिघृक्षुस्त्वमुत्पत्याभ्युत्पतो दिवम्॥
- Variant note: Many printings show सहस्त्र, a common misspelling of सहस्र.

### Chaupai 21: /hanuman-chalisa/21-ram-duare-tum-rakhvare

- Awadhi: राम दुआरे तुम रखवारे । होत न आज्ञा बिनु पैसारे ॥
- Sung IAST: rām duāre tum rakhvāre / hot na ājñā binu paisāre
- Scholarly IAST: rāma duāre tuma rakhavāre / hota na ājñā binu paisāre
- EN: You guard Rama's door. No one enters without your leave.
- HI: आप श्रीराम के द्वार के रखवाले हैं। आपकी आज्ञा के बिना कोई भीतर नहीं जा सकता।
- Words: राम (rām) = Rama's; दुआरे (duāre) = at the door; तुम (tum) = you; रखवारे (rakhvāre) = guard; होत न (hot na) = there is no; आज्ञा (ājñā) = leave; बिनु (binu) = without; पैसारे (paisāre) = entry
- Ramayana: none (page says the line does not retell one episode)

### Chaupai 23: /hanuman-chalisa/23-aapan-tej-samharo-aapai

- Awadhi: आपन तेज सम्हारो आपै । तीनों लोक हाँक तें काँपै ॥
- Sung IAST: āpan tej samhāro āpai / tīnoṁ lok hāṁk teṁ kāṁpai
- Scholarly IAST: āpana teja samhāro āpai / tīnoṃ loka hāṁka teṃ kāṁpai
- EN: Only you can hold your own power. At your roar the three worlds tremble.
- HI: अपने तेज को आप ही सँभाल सकते हैं। आपकी एक हुंकार से तीनों लोक काँप उठते हैं।
- Words: आपन (āpan) = your own; तेज (tej) = power; सम्हारो (samhāro) = hold; आपै (āpai) = only you; तीनों (tīnoṁ) = all three; लोक (lok) = worlds; हाँक (hāṁk) = roar; तें (teṁ) = at; काँपै (kāṁpai) = tremble
- Ramayana: none (page says the line does not retell one episode)

### Chaupai 24: /hanuman-chalisa/24-bhoot-pisach-nikat-nahi-aavai

- Awadhi: भूत पिसाच निकट नहिं आवै । महाबीर जब नाम सुनावै ॥
- Sung IAST: bhūt pisāc nikaṭ nahiṁ āvai / mahābīr jab nām sunāvai
- Scholarly IAST: bhūta pisāca nikaṭa nahiṃ āvai / mahābīra jaba nāma sunāvai
- EN: Ghosts and evil spirits do not come near when someone speaks the name of the great hero.
- HI: जब कोई महावीर का नाम लेता है, तो भूत-पिशाच पास नहीं आते।
- Words: भूत (bhūt) = ghosts; पिसाच (pisāc) = evil spirits; निकट (nikaṭ) = near; नहिं (nahiṁ) = do not; आवै (āvai) = come; महाबीर (mahābīr) = the great hero; जब (jab) = when; नाम (nām) = name; सुनावै (sunāvai) = speaks
- Ramayana: none (page says the line does not retell one episode)

### Chaupai 25: /hanuman-chalisa/25-nasai-rog-harai-sab-peera

- Awadhi: नासै रोग हरै सब पीरा । जपत निरंतर हनुमत बीरा ॥
- Sung IAST: nāsai rog harai sab pīrā / japat nirantar hanumat bīrā
- Scholarly IAST: nāsai roga harai saba pīrā / japata niraṃtara hanumata bīrā
- EN: Illness is destroyed and every pain taken away for one who repeats the name of brave Hanuman without a break.
- HI: वीर हनुमान का नाम लगातार जपने से रोग मिटते हैं और सारी पीड़ा दूर होती है।
- Words: नासै (nāsai) = destroys; रोग (rog) = illness; हरै (harai) = takes away; सब (sab) = all; पीरा (pīrā) = pain; जपत (japat) = repeating; निरंतर (nirantar) = without a break; हनुमत (hanumat) = Hanuman; बीरा (bīrā) = the brave
- Ramayana: none (page says the line does not retell one episode)

### Chaupai 27: /hanuman-chalisa/27-sab-par-ram-tapasvi-raja

- Awadhi: सब पर राम तपस्वी राजा । तिन के काज सकल तुम साजा ॥
- Sung IAST: sab par rām tapasvī rājā / tin ke kāj sakal tum sājā
- Scholarly IAST: saba para rāma tapasvī rājā / tina ke kāja sakala tuma sājā
- EN: Rama, the ascetic king, is above all, and you carried out every one of his tasks.
- HI: तपस्वी राजा श्रीराम सबसे ऊपर हैं, और उनके सारे काम आपने ही पूरे किए।
- Words: सब पर (sab par) = above all; राम (rām) = Rama; तपस्वी (tapasvī) = ascetic; राजा (rājā) = king; तिन के (tin ke) = his; काज (kāj) = tasks; सकल (sakal) = all; तुम (tum) = you; साजा (sājā) = carried out
- Ramayana: none (page says the line does not retell one episode)
- Variant note: Rambhadracharya, in his Mahaviri commentary, reads सब पर राम राय सिरताजा, "Rama, crown of kings, is above all".

### Chaupai 28: /hanuman-chalisa/28-aur-manorath-jo-koi-lavai

- Awadhi: और मनोरथ जो कोइ लावै । सोइ अमित जीवन फल पावै ॥
- Sung IAST: aur manorath jo koi lāvai / soi amit jīvan phal pāvai
- Scholarly IAST: aura manoratha jo koi lāvai / soi amita jīvana phala pāvai
- EN: Whoever brings you any other wish receives it, and with it the boundless fruit of life.
- HI: जो कोई भी आपके पास कोई और इच्छा लेकर आता है, वह उसे पाता है, और साथ में जीवन का असीम फल भी।
- Words: और (aur) = any other; मनोरथ (manorath) = wish; जो कोइ (jo koi) = whoever; लावै (lāvai) = brings; सोइ (soi) = that very thing; अमित (amit) = boundless; जीवन (jīvan) = life's; फल (phal) = fruit; पावै (pāvai) = receives
- Ramayana: none (page says the line does not retell one episode)
- Variant note: Rambhadracharya's Mahaviri reads तासु for सोइ. Some printings have कोई for कोइ.

### Chaupai 29: /hanuman-chalisa/29-charon-jug-partap-tumhara

- Awadhi: चारों जुग परताप तुम्हारा । है परसिद्ध जगत उजियारा ॥
- Sung IAST: cāroṁ jug partāp tumhārā / hai parsiddh jagat ujiyārā
- Scholarly IAST: cāroṃ juga paratāpa tumhārā / hai parasiddha jagata ujiyārā
- EN: Your glory runs through all four ages, and its fame lights up the world.
- HI: चारों युगों में आपका प्रताप है। आपकी कीर्ति से सारा जगत उजला है।
- Words: चारों (cāroṁ) = all four; जुग (jug) = ages; परताप (partāp) = glory; तुम्हारा (tumhārā) = your; है (hai) = is; परसिद्ध (parsiddh) = famous; जगत (jagat) = the world; उजियारा (ujiyārā) = light
- Ramayana: none (page says the line does not retell one episode)
- Variant note: Rambhadracharya's Mahaviri reads चारिउ for चारों.

### Chaupai 30: /hanuman-chalisa/30-sadhu-sant-ke-tum-rakhvare

- Awadhi: साधु संत के तुम रखवारे । असुर निकंदन राम दुलारे ॥
- Sung IAST: sādhu sant ke tum rakhvāre / asur nikandan rām dulāre
- Scholarly IAST: sādhu saṃta ke tuma rakhavāre / asura nikaṃdana rāma dulāre
- EN: You protect the good and the saints. You destroy the asuras, and Rama holds you dear.
- HI: आप साधु-संतों के रखवाले हैं, राक्षसों का नाश करने वाले हैं, और श्रीराम के दुलारे हैं।
- Words: साधु (sādhu) = the good; संत (sant) = saints; के (ke) = of; तुम (tum) = you; रखवारे (rakhvāre) = protector; असुर (asur) = asuras; निकंदन (nikandan) = destroyer; राम (rām) = Rama's; दुलारे (dulāre) = beloved
- Ramayana: none (page says the line does not retell one episode)

### Chaupai 31: /hanuman-chalisa/31-ashta-siddhi-nau-nidhi-ke-data

- Awadhi: अष्ट सिद्धि नौ निधि के दाता । अस बर दीन जानकी माता ॥
- Sung IAST: aṣṭ siddhi nau nidhi ke dātā / as bar dīn jānakī mātā
- Scholarly IAST: aṣṭa siddhi nau nidhi ke dātā / asa bara dīna jānakī mātā
- EN: You can give the eight siddhis and the nine treasures. Mother Janaki gave you this boon.
- HI: आप आठ सिद्धियाँ और नौ निधियाँ देने वाले हैं। माता जानकी ने आपको यह वरदान दिया है।
- Words: अष्ट (aṣṭ) = eight; सिद्धि (siddhi) = yogic powers; नौ (nau) = nine; निधि (nidhi) = treasures; के (ke) = of; दाता (dātā) = giver; अस (as) = such a; बर (bar) = boon; दीन (dīn) = gave; जानकी (jānakī) = Janaki, Sita; माता (mātā) = mother
- Ramayana: In the Ashoka grove Sita blesses Hanuman: may he be ageless, deathless and a storehouse of virtue. The boon of siddhis and treasures is the Chalisa's own telling.
  - Ramcharitmanas, Sundar Kand 5.15, chaupai 2 [rcm.5.15.chaupai.2]: अजर अमर गुननिधि सुत होहू। करहुँ बहुत रघुनायक छोहू॥
- Variant note: Some editions, including Rambhadracharya's, read नव निधि and दीन्ह.

### Chaupai 32: /hanuman-chalisa/32-ram-rasayan-tumhare-pasa

- Awadhi: राम रसायन तुम्हरे पासा । सदा रहो रघुपति के दासा ॥
- Sung IAST: rām rasāyan tumhare pāsā / sadā raho raghupati ke dāsā
- Scholarly IAST: rāma rasāyana tumhare pāsā / sadā raho raghupati ke dāsā
- EN: You hold the elixir of devotion to Rama, and you remain forever the servant of the lord of the Raghus.
- HI: राम-भक्ति का रसायन आपके पास है, और आप सदा श्रीराम के सेवक बने रहते हैं।
- Words: राम (rām) = Rama's; रसायन (rasāyan) = elixir; तुम्हरे (tumhare) = you; पासा (pāsā) = have; सदा (sadā) = always; रहो (raho) = remain; रघुपति के (raghupati ke) = of Rama, lord of the Raghus; दासा (dāsā) = servant
- Ramayana: none (page says the line does not retell one episode)
- Variant note: Rambhadracharya, in his Mahaviri commentary, reads सादर हौ रघुपति के दासा, "you are Raghupati's servant, with reverence".

### Chaupai 33: /hanuman-chalisa/33-tumhare-bhajan-ram-ko-pavai

- Awadhi: तुम्हरे भजन राम को पावै । जनम जनम के दुख बिसरावै ॥
- Sung IAST: tumhare bhajan rām ko pāvai / janam janam ke dukh bisarāvai
- Scholarly IAST: tumhare bhajana rāma ko pāvai / janama janama ke dukha bisarāvai
- EN: By singing of you a person reaches Rama and leaves behind the sorrows of birth after birth.
- HI: आपका भजन करके मनुष्य श्रीराम को पाता है और जन्म-जन्म के दुख भूल जाता है।
- Words: तुम्हरे (tumhare) = your; भजन (bhajan) = worship, singing of you; राम को (rām ko) = Rama; पावै (pāvai) = reaches; जनम जनम (janam janam) = birth after birth; के (ke) = of; दुख (dukh) = sorrows; बिसरावै (bisarāvai) = leaves behind
- Ramayana: none (page says the line does not retell one episode)
- Variant note: Some printings read भावै: "singing of you pleases Rama".

### Chaupai 34: /hanuman-chalisa/34-ant-kaal-raghubar-pur-jai

- Awadhi: अंत काल रघुबर पुर जाई । जहाँ जन्म हरि-भक्त कहाई ॥
- Sung IAST: ant kāl raghubar pur jāī / jahāṁ janma hari-bhakt kahāī
- Scholarly IAST: aṃta kāla raghubara pura jāī / jahāṁ janma hari-bhakta kahāī
- EN: At the end that person goes to Rama's abode, and wherever they are born again they are known as a devotee of Hari.
- HI: अंत समय में वह श्रीराम के धाम जाता है, और जहाँ भी जन्म ले, हरिभक्त कहलाता है।
- Words: अंत (ant) = end; काल (kāl) = time; रघुबर (raghubar) = Rama's; पुर (pur) = abode; जाई (jāī) = goes to; जहाँ (jahāṁ) = wherever; जन्म (janma) = born; हरि-भक्त (hari-bhakt) = devotee of Hari; कहाई (kahāī) = is called
- Ramayana: none (page says the line does not retell one episode)
- Variant note: Rambhadracharya's Mahaviri prints हरि-भगत.

### Chaupai 35: /hanuman-chalisa/35-aur-devta-chitt-na-dharai

- Awadhi: और देवता चित्त न धरई । हनुमत सेइ सर्ब सुख करई ॥
- Sung IAST: aur devtā citt na dharaī / hanumat sei sarb sukh karaī
- Scholarly IAST: aura devatā citta na dharaī / hanumata sei sarba sukha karaī
- EN: Even one who keeps no other deity in mind finds every happiness by serving Hanuman.
- HI: किसी और देवता को मन में न भी रखे, तो भी हनुमान जी की सेवा से सब सुख मिलते हैं।
- Words: और (aur) = other; देवता (devtā) = deities; चित्त (citt) = mind; न (na) = not; धरई (dharaī) = holds; हनुमत (hanumat) = Hanuman; सेइ (sei) = serving; सर्ब (sarb) = every; सुख (sukh) = happiness; करई (karaī) = brings
- Ramayana: none (page says the line does not retell one episode)

### Chaupai 37: /hanuman-chalisa/37-jai-jai-jai-hanuman-gosai

- Awadhi: जै जै जै हनुमान गोसाईं । कृपा करहु गुरु देव की नाईं ॥
- Sung IAST: jai jai jai hanumān gosāīṁ / kṛpā karahu guru dev kī nāīṁ
- Scholarly IAST: jai jai jai hanumāna gosāīṃ / kṛpā karahu guru deva kī nāīṃ
- EN: Victory, victory, victory to you, Hanuman, my master. Be kind to me as a guru is kind.
- HI: हे स्वामी हनुमान जी, आपकी जय हो, जय हो, जय हो। गुरु की तरह मुझ पर कृपा कीजिए।
- Words: जै (jai) = victory; जै (jai) = victory; जै (jai) = victory; हनुमान (hanumān) = Hanuman; गोसाईं (gosāīṁ) = master, lord; कृपा (kṛpā) = kindness; करहु (karahu) = please show; गुरु (guru) = guru; देव (dev) = revered; की नाईं (kī nāīṁ) = like
- Ramayana: none (page says the line does not retell one episode)
- Variant note: Many sing जय जय जय. Rambhadracharya's Mahaviri prints गुरुदेव as one word.

### Chaupai 38: /hanuman-chalisa/38-jo-sat-bar-path-kar-koi

- Awadhi: जो सत बार पाठ कर कोई । छूटहि बंदि महा सुख होई ॥
- Sung IAST: jo sat bār pāṭh kar koī / chūṭahi bandi mahā sukh hoī
- Scholarly IAST: jo sata bāra pāṭha kara koī / chūṭahi baṃdi mahā sukha hoī
- EN: Whoever recites this a hundred times is freed from bondage and finds great joy.
- HI: जो कोई इसका सौ बार पाठ करे, वह बंधनों से छूट जाता है और उसे बड़ा सुख मिलता है।
- Words: जो (jo) = whoever; सत (sat) = a hundred; बार (bār) = times; पाठ (pāṭh) = recitation; कर (kar) = does; कोई (koī) = anyone; छूटहि (chūṭahi) = is freed; बंदि (bandi) = bondage; महा (mahā) = great; सुख (sukh) = joy; होई (hoī) = comes
- Ramayana: none (page says the line does not retell one episode)
- Variant note: Rambhadracharya's Mahaviri reads जो शत बार ... छुटहिं. Some popular printings read यह सत बार.

### Chaupai 39: /hanuman-chalisa/39-jo-yah-padhai-hanuman-chalisa

- Awadhi: जो यह पढ़ै हनुमान चलीसा । होय सिद्धि साखी गौरीसा ॥
- Sung IAST: jo yah paṛhai hanumān calīsā / hoy siddhi sākhī gaurīsā
- Scholarly IAST: jo yaha paṛhai hanumāna calīsā / hoya siddhi sākhī gaurīsā
- EN: Whoever reads this Hanuman Chalisa gains fulfilment. Shiva, lord of Gauri, is witness.
- HI: जो यह हनुमान चालीसा पढ़ता है, उसे सिद्धि मिलती है। इसके साक्षी स्वयं गौरीपति शिव हैं।
- Words: जो (jo) = whoever; यह (yah) = this; पढ़ै (paṛhai) = reads; हनुमान (hanumān) = Hanuman; चलीसा (calīsā) = the forty verses, the Chalisa; होय (hoy) = comes; सिद्धि (siddhi) = fulfilment; साखी (sākhī) = witness; गौरीसा (gaurīsā) = Shiva, lord of Gauri
- Ramayana: none (page says the line does not retell one episode)
- Variant note: The Gita Press and Rambhadracharya both print चलीसा, which keeps the metre. Most families sing चालीसा.

### Chaupai 40: /hanuman-chalisa/40-tulsidas-sada-hari-chera

- Awadhi: तुलसीदास सदा हरि चेरा । कीजै नाथ हृदय महँ डेरा ॥
- Sung IAST: tulsīdās sadā hari cerā / kījai nāth hṛday mahaṁ ḍerā
- Scholarly IAST: tulasīdāsa sadā hari cerā / kījai nātha hṛdaya mahaṁ ḍerā
- EN: Tulsidas is forever Hari's servant. Lord, make your home in my heart.
- HI: तुलसीदास सदा हरि के सेवक हैं। हे नाथ, मेरे हृदय में अपना डेरा बनाइए।
- Words: तुलसीदास (tulsīdās) = Tulsidas; सदा (sadā) = always; हरि (hari) = Hari's; चेरा (cerā) = servant; कीजै (kījai) = please make; नाथ (nāth) = Lord; हृदय (hṛday) = heart; महँ (mahaṁ) = in; डेरा (ḍerā) = your home
- Ramayana: none (page says the line does not retell one episode)

