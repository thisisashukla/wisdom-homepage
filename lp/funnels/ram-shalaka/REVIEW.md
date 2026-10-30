# Ram Shalaka: owner review list

Everything below is `reviewed: false` in `frontend/src/content/funnels/ram-shalaka/ram-shalaka.json`. After you sign off, flip `reviewed` in the generator inputs (or in build-data.mjs) and rerun the build and check scripts.

## 1. Gita Press references to verify (blocking for showing doha numbers)

Our corpus numbers dohas differently from the Gita Press edition, so the pages show kand and scene names only. To show refs, match each line to the Gita Press Ramcharitmanas and send the numbers; one display format will then be used everywhere (suggest "बालकाण्ड 52.4" style).

| # | Line | Our data id | Gita Press ref |
|---|---|---|---|
| 5 | होइहि सोइ जो राम रचि राखा | rcm.1.48.chaupai.8 | Bal Kand 52 (given in the brief; confirm chaupai number) |
| 2 | प्रबिसि नगर कीजे सब काजा | rcm.5.4.chaupai.1 | to find (Sundar Kand, the chaupai right after doha 4, Lankini) |
| 7 | गरल सुधा रिपु करहिं मिताई | rcm.5.4.chaupai.1 (same unit as #2) | to find (same group as #2) |
| 1 | सुनु सिय सत्य असीस हमारी | rcm.1.224.chaupai.4 | to find (Bal Kand, Gauri's blessing in the garden) |
| 9 | सुफल मनोरथ होहुँ तुम्हारे | rcm.1.224.chaupai.6 | to find (Bal Kand, Vishwamitra's blessing after the garden) |
| 6 | मुद मंगलमय संत समाजू | rcm.1.2.chaupai.4 | to find (Bal Kand opening) |
| 4 | बिधि बस सुजन कुसंगत परहीं | rcm.1.3.chaupai.5 | to find (Bal Kand opening) |
| 3 | उघरहिं अंत न होइ निबाहू | rcm.1.7.chaupai.3 | to find (Bal Kand opening) |
| 8 | बरुन कुबेर सुरेस समीरा | rcm.6.104.chaupai.4 | to find (Lanka Kand, Mandodari's lament) |

## 2. Text questions found while building

- **Spelling variant, #9.** The grid spells "रामु लखनु सुनि भए सुखारे" (and the prototype agrees); our corpus has "भय सुखारे". Pages and the card use the grid reading "भए". Confirm against Gita Press.
- **Speaker metadata.** The corpus tags rcm.5.4.chaupai.1 (#2 and #7) as "Narrator"; the prototype and the pages say Lankini to Hanuman. The pages follow the prototype. Confirm.
- **Shared unit.** #2 and #7 are the two halves of one four-line unit. Both line pages show the same four lines, each with its own half marked as the shalaka answer.
- **#9 speaker.** Only the first half (सुफल मनोरथ होहुँ तुम्हारे) is Vishwamitra's blessing; the second half is narration. The page says "Vishwamitra, to Ram and Lakshman" as the prototype does.
- **IAST.** Answer halves use the prototype's IAST (ã, ũ for chandrabindu, ṛ for ड़/ढ़). The other halves are converted from the corpus IAST the same way; spot check them.

## 3. Showcase lines first: the nine records

Meanings, scenes, "for you" and sign lines are the prototype's approved drafts (still unreviewed against commentary). The line-page quick answers, the meanings of the other half of each unit, the Gita bridges and the shortened card meanings are new in this build.

### 5. होइहि सोइ जो राम रचि राखा। को करि तर्क बढ़ावै साखा॥
- Data id `rcm.1.48.chaupai.8` · page `/hi/ram-shalaka/hoihi-soi-jo-ram-rachi-rakha` · card `rs-5` · sign **sanshay** · Bal Kand, Sati's doubt · Lord Shiva
- IAST (answer): hoihi soi jo rāma raci rākhā, ko kari tarka baṛhāvai sākhā
- Meaning hi: जो राम ने रच रखा है वही होगा। तर्क करके बात की शाखाएँ कौन बढ़ाए।
- Meaning en: What Ram has ordained will come to pass. Why grow more branches by arguing?
- Scene hi: सती जी शिव जी के समझाने पर भी श्रीराम की परीक्षा लेने चली गईं। शिव जी ने तर्क छोड़ दिया, यह चौपाई कही, और राम-नाम जपने लगे।
- Scene en: Sati went to test Ram although Shiva had advised against it. Shiva stopped arguing, said this, and turned to chanting Ram's name.
- For you hi: जो आपके हाथ में था, कर लिया। अब परिणाम से बहस न करें, प्रतीक्षा करें और नाम जपें।
- For you en: You have done what was in your hands. Stop arguing with the outcome; wait, and remember the Name.
- Sign text: संशय · परिणाम प्रभु पर छोड़ें / Uncertain · leave the outcome to Ram
- Line page quick answer (hi, new): ‘होइहि सोइ जो राम रचि राखा’ श्रीरामचरितमानस के बालकाण्ड की चौपाई है, जिसे भगवान शिव सती जी के संशय के समय कहते हैं: जो राम ने रच रखा है वही होगा। श्रीराम शलाका प्रश्नावली में यह संशय का उत्तर है: अपना काम करके परिणाम प्रभु पर छोड़ें।
- Other half of the unit (corpus text): अस कहि लगे जपन हरिनामा। गईं सती जहँ प्रभु सुखधामा॥ / IAST: asa kahi lage japana harināmā, gaīṃ satī jahã prabhu sukhadhāmā
  - Our meaning hi: ऐसा कहकर शिव जी हरि का नाम जपने लगे, और सती जी वहाँ गईं जहाँ सुख के धाम प्रभु श्रीराम थे।
  - Our meaning en: Saying this, Shiva began to chant Hari's name, and Sati went to where Ram, the home of joy, was.
- Gita bridge (new): BG 2.47: गीता 2.47: कर्म पर तुम्हारा अधिकार है, फल पर कभी नहीं। / Gita 2.47: the work is yours to do, the result never was.

### 2. प्रबिसि नगर कीजे सब काजा। हृदयँ राखि कोसलपुर राजा॥
- Data id `rcm.5.4.chaupai.1` · page `/hi/ram-shalaka/prabisi-nagar-kije-sab-kaja` · card `rs-2` · sign **shubh** · Sundar Kand, the gate of Lanka · Lankini, to Hanuman
- IAST (answer): prabisi nagara kīje saba kājā, hṛdayã rākhi kosalapura rājā
- Meaning hi: नगर में प्रवेश करके, कोसलपुर के राजा श्रीराम को हृदय में रखकर सब काम कीजिए।
- Meaning en: Enter the city and do all your work, keeping the King of Kosala in your heart.
- Scene hi: हनुमान जी रात में लंका में प्रवेश कर रहे थे। द्वार पर लंकिनी ने रोका। उनके एक मुक्के से उसका अहंकार टूटा, और उसी ने यह कहकर उन्हें भीतर भेजा।
- Scene en: Hanuman was slipping into Lanka by night. Lankini, its guardian, blocked him. One blow broke her pride, and she herself sent him in with these words.
- For you hi: आरंभ करें। राम को हृदय में रखकर हर कदम उठाएँ।
- For you en: Begin. Take each step with Ram in your heart.
- Sign text: शुभ संकेत · आरंभ करें / Auspicious · begin
- Line page quick answer (hi, new): ‘प्रबिसि नगर कीजे सब काजा’ श्रीरामचरितमानस के सुन्दरकाण्ड की चौपाई है। लंका के द्वार पर लंकिनी हनुमान जी से कहती है कि नगर में प्रवेश करके, कोसलपुर के राजा श्रीराम को हृदय में रखकर सब काम कीजिए। श्रीराम शलाका प्रश्नावली में यह शुभ उत्तर है: काम आरंभ करें।
- Other half of the unit (corpus text): गरल सुधा रिपु करहिं मिताई। गोपद सिंधु अनल सितलाई॥ / IAST: garala sudhā ripu karahiṃ mitāī, gopada siṃdhu anala sitalāī
  - Our meaning hi: जिसके हृदय में राम हों, उसके लिए विष अमृत हो जाता है, शत्रु मित्र बन जाते हैं, समुद्र गाय के खुर जितना और आग शीतल हो जाती है।
  - Our meaning en: For one who holds Ram in the heart, poison turns to nectar, enemies turn friendly, the ocean shrinks to a calf's hoofprint and fire turns cool.
- Gita bridge (new): BG 8.7: गीता 8.7 में भी यही बात है: हर समय मेरा स्मरण करो और अपना कर्तव्य करो। / Gita 8.7 says the same: remember me at all times, and do your work.

### 1. सुनु सिय सत्य असीस हमारी। पूजिहि मन कामना तुम्हारी॥
- Data id `rcm.1.224.chaupai.4` · page `/hi/ram-shalaka/sunu-siya-satya-asis-hamari` · card `rs-1` · sign **shubh** · Bal Kand, the garden in Janakpur · Goddess Gauri, to Sita
- IAST (answer): sunu siya satya asīsa hamārī, pūjihi mana kāmanā tumhārī
- Meaning hi: हे सीता, हमारी सच्ची आशीष सुनो, तुम्हारी मनोकामना पूरी होगी।
- Meaning en: Listen, Sita, my blessing is true: the wish in your heart will be fulfilled.
- Scene hi: जनकपुर की पुष्पवाटिका में सीता जी गौरी माँ के मंदिर गईं और मन ही मन श्रीराम को माँगा। माँ की मूर्ति मुस्कुराई, उसकी माला खिसक कर गिरी, और यह आशीष मिली।
- Scene en: In Janakpur's garden, Sita went to Gauri's shrine and silently asked for Ram. The goddess smiled, her garland slipped down, and she gave this blessing.
- For you hi: जो आपने सच्चे मन से माँगा है, वह मिलेगा। अपनी प्रार्थना पर भरोसा रखें।
- For you en: What you asked for with a true heart will come. Trust your prayer.
- Sign text: शुभ संकेत · कार्य सिद्ध होगा / Auspicious · it will come through
- Line page quick answer (hi, new): ‘सुनु सिय सत्य असीस हमारी’ श्रीरामचरितमानस के बालकाण्ड की चौपाई है। जनकपुर की पुष्पवाटिका में माँ गौरी सीता जी को यह आशीष देती हैं कि उनकी मनोकामना पूरी होगी। श्रीराम शलाका प्रश्नावली में यह शुभ उत्तर है: जो सच्चे मन से माँगा है, वह मिलेगा।
- Other half of the unit (corpus text): नारद बचन सदा सुचि साचा। सो बरु मिलिहि जाहिं मनु राचा॥ / IAST: nārada bacana sadā suci sācā, so baru milihi jāhiṃ manu rācā
  - Our meaning hi: नारद जी के वचन सदा पवित्र और सच्चे हैं। जिस वर पर तुम्हारा मन रम गया है, वही तुम्हें मिलेगा।
  - Our meaning en: Narada's words are always pure and true. The one your heart has settled on is the groom you will receive.
- Gita bridge (new): BG 9.22: गीता 9.22 में श्रीकृष्ण कहते हैं कि जो अनन्य मन से उन्हें भजते हैं, उनका योगक्षेम वे स्वयं सँभालते हैं। / In Gita 9.22 Krishna says he carries the welfare of those who turn to him with an undivided heart.

### 9. सुफल मनोरथ होहुँ तुम्हारे। रामु लखनु सुनि भए सुखारे॥
- Data id `rcm.1.224.chaupai.6` · page `/hi/ram-shalaka/suphal-manorath-hohun-tumhare` · card `rs-9` · sign **shubh** · Bal Kand, the guru's blessing · Vishwamitra, to Ram and Lakshman
- IAST (answer): suphala manoratha hohũ tumhāre, rāmu lakhanu suni bhae sukhāre
- Meaning hi: तुम्हारे मनोरथ सफल हों। यह सुनकर राम और लक्ष्मण प्रसन्न हुए।
- Meaning en: May your hopes bear fruit. Hearing this, Ram and Lakshman were glad.
- Scene hi: उसी सुबह राम और लक्ष्मण गुरु विश्वामित्र की पूजा के लिए फूल लाए। गुरु ने फूल लेकर पूजा की और दोनों भाइयों को यह आशीष दी।
- Scene en: That same morning Ram and Lakshman brought flowers for their guru's worship. Vishwamitra accepted them and blessed the brothers.
- For you hi: आपकी मेहनत और सेवा देखी गई है। मनोरथ सफल होगा।
- For you en: Your effort and service have been seen. Your hope will bear fruit.
- Sign text: शुभ संकेत · मनोरथ सफल होगा / Auspicious · your hope will bear fruit
- Line page quick answer (hi, new): ‘सुफल मनोरथ होहुँ तुम्हारे’ श्रीरामचरितमानस के बालकाण्ड की चौपाई है। राम और लक्ष्मण के लाए फूलों से पूजा करके गुरु विश्वामित्र दोनों भाइयों को आशीष देते हैं कि उनके मनोरथ सफल हों। श्रीराम शलाका प्रश्नावली में यह शुभ उत्तर है: आपका मनोरथ सफल होगा।
- Other half of the unit (corpus text): सुमन पाइ मुनि पूजा कीन्ही। पुनि असीस दुहु भाइन्ह दीन्ही॥ / IAST: sumana pāi muni pūjā kīnhī, puni asīsa duhu bhāinha dīnhī
  - Our meaning hi: फूल पाकर मुनि ने पूजा की, फिर दोनों भाइयों को आशीर्वाद दिया।
  - Our meaning en: Receiving the flowers, the sage did his worship, then blessed both brothers.
- Gita bridge (new): BG 9.26: गीता 9.26: प्रेम से अर्पित पत्ता, फूल, फल या जल, मैं स्वीकार करता हूँ। / Gita 9.26: a leaf, a flower, a fruit or water, offered with love, I accept.

### 6. मुद मंगलमय संत समाजू। जो जग जंगम तीरथराजू॥
- Data id `rcm.1.2.chaupai.4` · page `/hi/ram-shalaka/mud-mangalmay-sant-samaju` · card `rs-6` · sign **shubh** · Bal Kand, praise of the company of saints · Goswami Tulsidas
- IAST (answer): muda maṃgalamaya saṃta samājū, jo jaga jaṃgama tīratharājū
- Meaning hi: संतों का समाज आनंद और मंगल से भरा है, जो संसार में चलता-फिरता तीर्थराज प्रयाग है।
- Meaning en: The company of saints is joy and blessing itself, a Prayag that walks the earth.
- Scene hi: मानस के आरंभ में तुलसीदास संत समाज की वंदना करते हैं। वे कहते हैं कि सत्संग चलता-फिरता प्रयागराज है, जिसमें राम-भक्ति गंगा की धारा है।
- Scene en: At the start of the Manas, Tulsidas honours the company of saints: a Prayag that walks, with devotion to Ram as its Ganga.
- For you hi: कार्य शुभ है। इसे अच्छे लोगों के साथ और उनकी सलाह से करें।
- For you en: The work is auspicious. Do it with good people and take their counsel.
- Sign text: शुभ संकेत · मंगल होगा / Auspicious · it will go well
- Line page quick answer (hi, new): ‘मुद मंगलमय संत समाजू’ श्रीरामचरितमानस के बालकाण्ड की चौपाई है, जिसमें तुलसीदास संतों के समाज को संसार में चलता-फिरता तीर्थराज प्रयाग कहते हैं। श्रीराम शलाका प्रश्नावली में यह शुभ उत्तर है: कार्य मंगलमय होगा, इसे अच्छे लोगों के साथ और उनकी सलाह से करें।
- Other half of the unit (corpus text): राम भक्ति जहँ सुरसरि धारा। सरसइ ब्रह्म बिचार प्रचारा॥ / IAST: rāma bhakti jahã surasari dhārā, sarasai brahma bicāra pracārā
  - Our meaning hi: उस संत समाज में राम-भक्ति गंगा की धारा है और ब्रह्म-विचार का प्रचार सरस्वती है।
  - Our meaning en: In it, devotion to Ram is the stream of the Ganga, and the spread of thought on Brahman is the Saraswati.
- Gita bridge (new): BG 4.34: गीता 4.34: जो तत्त्व को जानते हैं, उनके पास विनम्र होकर जाओ, प्रश्न करो और सेवा करो। / Gita 4.34: go to those who know, with humility, with questions and with service.

### 7. गरल सुधा रिपु करहिं मिताई। गोपद सिंधु अनल सितलाई॥
- Data id `rcm.5.4.chaupai.1` · page `/hi/ram-shalaka/garal-sudha-ripu-karahin-mitai` · card `rs-7` · sign **shubh** · Sundar Kand, the gate of Lanka · Lankini, to Hanuman
- IAST (answer): garala sudhā ripu karahiṃ mitāī, gopada siṃdhu anala sitalāī
- Meaning hi: जिसके हृदय में राम हों, उसके लिए विष अमृत हो जाता है, शत्रु मित्र बन जाते हैं, समुद्र गाय के खुर जितना और आग शीतल हो जाती है।
- Meaning en: For one who holds Ram in the heart, poison turns to nectar, enemies turn friendly, the ocean shrinks to a calf's hoofprint and fire turns cool.
- Scene hi: हनुमान जी को भीतर भेजते हुए लंकिनी आगे कहती है कि जिसके हृदय में राम बसते हैं, उसके लिए हर कठिनाई उलट जाती है।
- Scene en: Sending Hanuman in, Lankini goes on: for the one who carries Ram within, every hardship turns around.
- For you hi: रास्ते की बाधाएँ जितनी बड़ी दिखती हैं, उतनी हैं नहीं। मन स्थिर रखकर आगे बढ़ें।
- For you en: The obstacles are smaller than they look. Keep your mind steady and go on.
- Sign text: शुभ संकेत · बाधाएँ हटेंगी / Auspicious · obstacles will ease
- Line page quick answer (hi, new): ‘गरल सुधा रिपु करहिं मिताई’ श्रीरामचरितमानस के सुन्दरकाण्ड की चौपाई है। लंकिनी हनुमान जी से कहती है कि जिसके हृदय में राम हों, उसके लिए विष अमृत और शत्रु मित्र बन जाते हैं। श्रीराम शलाका प्रश्नावली में यह शुभ उत्तर है: रास्ते की बाधाएँ हटेंगी।
- Other half of the unit (corpus text): प्रबिसि नगर कीजे सब काजा। हृदयँ राखि कोसलपुर राजा॥ / IAST: prabisi nagara kīje saba kājā, hṛdayã rākhi kosalapura rājā
  - Our meaning hi: नगर में प्रवेश करके, कोसलपुर के राजा श्रीराम को हृदय में रखकर सब काम कीजिए।
  - Our meaning en: Enter the city and do all your work, keeping the King of Kosala in your heart.
- Gita bridge (new): BG 18.58: गीता 18.58: मुझमें मन लगाकर तुम मेरी कृपा से सारी कठिनाइयाँ पार कर जाओगे। / Gita 18.58: with your mind on me, by my grace you will cross every difficulty.
- Share card meaning shortened to 20 words (new): जिसके हृदय में राम हों, विष अमृत, शत्रु मित्र, समुद्र गाय का खुर और आग शीतल हो जाती है। / With Ram in the heart, poison turns to nectar, enemies to friends, the ocean to a hoofprint, fire to coolness.

### 4. बिधि बस सुजन कुसंगत परहीं। फनि मनि सम निज गुन अनुसरहीं॥
- Data id `rcm.1.3.chaupai.5` · page `/hi/ram-shalaka/bidhi-bas-sujan-kusangat-parahin` · card `rs-4` · sign **sanshay** · Bal Kand, on good and bad company · Goswami Tulsidas
- IAST (answer): bidhi basa sujana kusaṃgata parahīṃ, phani mani sama nija guna anusarahīṃ
- Meaning hi: विधि के वश सज्जन कुसंग में पड़ जाते हैं, पर साँप के फन की मणि की तरह अपना गुण नहीं छोड़ते।
- Meaning en: By fate, good people fall into bad company, yet like the gem in a serpent's hood they keep their own nature.
- Scene hi: मानस के आरंभ में तुलसीदास सत्संग और कुसंग की बात करते हैं। संयोग से सज्जन बुरी संगत में पड़ भी जाएँ, तो भी अपना स्वभाव नहीं छोड़ते।
- Scene en: In the opening of the Manas, Tulsidas speaks of good and bad company. Chance may place good people among the wrong ones, but they keep their nature.
- For you hi: इस काम से जुड़े लोगों को परखें। संगत ठीक न हो तो भी अपना स्वभाव न छोड़ें।
- For you en: Look closely at the people around this. Even if the company is wrong, keep your own nature.
- Sign text: संशय · संगत परखें / Uncertain · look at the company around it
- Line page quick answer (hi, new): ‘बिधि बस सुजन कुसंगत परहीं’ श्रीरामचरितमानस के बालकाण्ड की चौपाई है। तुलसीदास कहते हैं कि सज्जन संयोग से बुरी संगत में पड़ जाएँ, तो भी साँप के फन की मणि की तरह अपना गुण नहीं छोड़ते। श्रीराम शलाका प्रश्नावली में यह संशय का उत्तर है: संगत को परखें।
- Other half of the unit (corpus text): सठ सुधरहिं सतसंगति पाई। पारस परस कुधात सुहाई॥ / IAST: saṭha sudharahiṃ satasaṃgati pāī, pārasa parasa kudhāta suhāī
  - Our meaning hi: दुष्ट भी सत्संग पाकर सुधर जाते हैं, जैसे पारस के छूने से लोहा सोना बन जाता है।
  - Our meaning en: Even the wicked improve in good company, as iron turns to gold at the touch of the philosopher's stone.
- Gita bridge (new): BG 3.35: गीता 3.35: अपना धर्म, कम गुणों वाला हो तब भी, दूसरे के धर्म से श्रेष्ठ है। / Gita 3.35: your own dharma, even done imperfectly, is better than another's done well.
- Share card meaning shortened to 20 words (new): विधि के वश सज्जन कुसंग में पड़ें, तो भी साँप की मणि की तरह अपना गुण नहीं छोड़ते। / Good people may fall into bad company by fate, yet like a serpent's gem they keep their nature.

### 3. उघरहिं अंत न होइ निबाहू। कालनेमि जिमि रावन राहू॥
- Data id `rcm.1.7.chaupai.3` · page `/hi/ram-shalaka/ugharahin-ant-na-hoi-nibahu` · card `rs-3` · sign **ashubh** · Bal Kand, the opening · Goswami Tulsidas
- IAST (answer): ugharahiṃ anta na hoi nibāhū, kālanemi jimi rāvana rāhū
- Meaning hi: कपट अंत में खुल जाता है, उसका निबाह नहीं होता, जैसे कालनेमि, रावण और राहु का हुआ।
- Meaning en: Pretense is exposed in the end and cannot last, as it was with Kalanemi, Ravana and Rahu.
- Scene hi: तुलसीदास कहते हैं कि जो अच्छा वेश धरकर ठगते हैं, उनका कपट अंत में खुलता है। कालनेमि साधु बनकर हनुमान को रोकना चाहता था, राहु देवता बनकर अमृत पी गया, रावण साधु बनकर सीता को ले गया।
- Scene en: Tulsidas says those who wear a good disguise to deceive are exposed in the end. Kalanemi posed as a sage to stop Hanuman, Rahu as a god to drink nectar, Ravana as a monk to take Sita.
- For you hi: इस काम में कहीं कपट है, आपका या किसी और का। आगे बढ़ने से पहले उसे सुधारें।
- For you en: Somewhere in this there is pretense, yours or someone else's. Set it right before you go further.
- Sign text: अभी नहीं · रुकें और जाँचें / Not now · pause and look again
- Line page quick answer (hi, new): ‘उघरहिं अंत न होइ निबाहू’ श्रीरामचरितमानस के बालकाण्ड की चौपाई है, जिसमें तुलसीदास कहते हैं कि कपट अंत में खुल जाता है, जैसे कालनेमि, रावण और राहु का खुला। श्रीराम शलाका प्रश्नावली में यह ‘अभी नहीं’ का संकेत है: आगे बढ़ने से पहले कपट को पहचानें और सुधारें।
- Other half of the unit (corpus text): लखि सुबेष जग बंचक जेऊ। बेष प्रताप पूजिअहिं तेऊ॥ / IAST: lakhi subeṣa jaga baṃcaka jeū, beṣa pratāpa pūjiahiṃ teū
  - Our meaning hi: संसार में जो ठग सुंदर वेश बनाए रहते हैं, लोग वेश के प्रभाव से उनकी भी पूजा करते हैं।
  - Our meaning en: Cheats who wear a fine disguise are honoured by the world for the sake of the disguise.
- Gita bridge (new): BG 3.6: गीता 3.6 उसे मिथ्याचारी कहती है जो बाहर से संयम दिखाए और मन में विषयों का चिंतन करता रहे। / Gita 3.6 calls a person a pretender who shows restraint outside while the mind keeps dwelling on its objects.

### 8. बरुन कुबेर सुरेस समीरा। रन सन्मुख धरि काहुँ न धीरा॥
- Data id `rcm.6.104.chaupai.4` · page `/hi/ram-shalaka/barun-kuber-sures-samira` · card `rs-8` · sign **ashubh** · Lanka Kand, Mandodari's lament · Mandodari, over Ravana
- IAST (answer): baruna kubera suresa samīrā, rana sanmukha dhari kāhũ na dhīrā
- Meaning hi: वरुण, कुबेर, इंद्र और वायु, इनमें से कोई भी युद्ध में तुम्हारे सामने धैर्य न रख सका।
- Meaning en: Varuna, Kubera, Indra and Vayu: none of them could hold steady before you in battle.
- Scene hi: युद्ध के बाद मंदोदरी रावण के शरीर के पास विलाप करती है। वह याद करती है कि देवता भी उसके सामने टिक न सके, फिर भी राम से वैर ने सब छीन लिया।
- Scene en: After the war, Mandodari mourns over Ravana. She recalls that even the gods could not stand before him, and yet his enmity with Ram cost him everything.
- For you hi: ताक़त अकेली काफ़ी नहीं होती, रावण के पास सब था। पूछिए कि यह कार्य धर्म के अनुकूल है या नहीं।
- For you en: Strength alone is not enough; Ravana had all of it. Ask whether this is right, as well as whether you can.
- Sign text: अभी नहीं · रुकें और जाँचें / Not now · pause and look again
- Line page quick answer (hi, new): ‘बरुन कुबेर सुरेस समीरा’ श्रीरामचरितमानस के लंकाकाण्ड की चौपाई है। युद्ध के बाद मंदोदरी रावण के शरीर के पास कहती है कि वरुण, कुबेर, इंद्र और वायु भी उसके सामने टिक न सके। श्रीराम शलाका प्रश्नावली में यह ‘अभी नहीं’ का संकेत है: देखें कि काम धर्म के अनुकूल है या नहीं।
- Other half of the unit (corpus text): भुजबल जितेहु काल जम साईं। आजु परेहु अनाथ की नाईं॥ / IAST: bhujabala jitehu kāla jama sāīṃ, āju parehu anātha kī nāīṃ
  - Our meaning hi: हे स्वामी, तुमने अपनी भुजाओं के बल से काल और यम को भी जीत लिया था। आज तुम अनाथ की तरह पड़े हो।
  - Our meaning en: My lord, by the strength of your arms you conquered even Time and Yama. Today you lie here like one with no one.
- Gita bridge (new): BG 18.78: गीता 18.78: जहाँ योगेश्वर कृष्ण और धनुर्धर अर्जुन हैं, वहीं विजय है और वहीं नीति। / Gita 18.78: where Krishna and Arjuna stand together, there victory and right conduct are found.

## 4. Page copy (new, both languages)

Source: `frontend/scripts/funnels/ram-shalaka/copy.json` (`page`, `line`, `signNotes`, `ui`).

- **Quick answer** (`#quick-answer`, hi and en): says the grid is linked by tradition to Tulsidas and is printed with Gita Press, Gorakhpur editions. Check both claims are worded as you want them ("printed with", not "printed at the start of").
- **How to ask**: five steps and the three rules (clear mind, each question once, at most three a day). Check "उँगली या शलाका (तिनका)" for the shalaka.
- **FAQ** (6 questions, hi and en), especially the answer on "not now" chaupais and the one on where the prashnavali comes from (six chaupais from the Bal Kand, two from the Sundar Kand, one from the Lanka Kand).
- **Sign notes** (one line per sign, shown on line pages).
- **Sources and method** notes on the tool and line pages.
- **Ritual UI copy** is the prototype's, plus: the share sheet labels, the WhatsApp share text (chaupai, meaning, source, page URL; never the question), the expert-advice note (prototype wording) and the no-JS note.
- **NextStep lines**: iPhone "हर सुबह एक पंक्ति, आपके iPhone पर।" / "A line each morning, on your iPhone."; Android WhatsApp "हर सुबह मानस की एक पंक्ति, WhatsApp पर।" with the button "रोज़ एक चौपाई". The WhatsApp line promises a Manas line each morning: confirm the channel will carry one, or soften it.

## 5. Grid

The 225 cells are lifted unchanged from the prototype's ROWS array. `node scripts/funnels/ram-shalaka/check.mjs` passes: every one of the 225 start cells yields its chaupai under the ninth-square rule. A cell-by-cell check against a printed Gita Press copy is still worth doing once.
