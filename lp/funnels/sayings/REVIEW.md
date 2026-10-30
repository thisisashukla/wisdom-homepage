# Sayings funnel: owner review (generated 30 Oct 2026)

Every meaning, gloss and note below is Wisdom's own draft and carries `reviewed: false` in the data. Edit the picks files in `frontend/scripts/funnels/sayings/` (viv_picks.py, kabir_picks.py, chanakya_picks.py), rerun the builders, then set `reviewed: true` by hand if you want to track it. Showcase lines (share cards) come first.

## 0. Calls that need your decision first

1. **"You have to grow from the inside out"**: the brief expected a paraphrase of vol 2 (Ideal of a Universal Religion). The corpus has it almost word for word (98.4) as no. 20 of *Sayings and Utterances*, CW vol 5 (a compiled list, record `viv.5.sayings_and_utterances.p20`). We marked it **In his words**, with the vol 2 lecture line ("There is no other teacher to you than your own soul") shown as the source of the thought. Flip to Paraphrase in `build_vivekananda.py` (OVR) if you prefer to trust only lectures and letters.
2. **Bengali-translated records**: excluded from the hub, but two fact checks rest on them and are marked In his words with a "translated from Bengali" note: "All love is expansion" (vol 6 letter LXXI) and "Be a hero. Always say, I have no fear" (vol 7, Conversations and Dialogues, recorded by Sharat Chandra Chakravarty). Gita 2.3 in the bridge also cites *Thoughts on the Gita* (vol 4), which is a Bengali translation.
3. **Comfort is no test of truth** scored 89.6 (just under 90) because the original has "on the contrary" in the middle; it is marked Paraphrase by the rule. Consider In his words.
4. **Kabir NCERT pages** (class 8 Malhar ch 5, class 10 Sparsh ch 1) were **not built**: ncert.nic.in refuses fetches (robots). Exam mode was not built either.
5. **Chanakya numbering**: the parquet's verse numbers differ from the numbering in `src/content/quotes/sayings.json` in places (e.g. sayings.json `cn-8-13` "शान्तितुल्यं तपो नास्ति" is 8.14 in the parquet). Our seals follow the parquet. The parquet's `english_translation` column is misaligned with its Sanskrit in chapters 6, 8 and 14 (and maybe others), so every meaning here is written from the Sanskrit.
6. **Kabir typo fixes** (evident Wikisource/Kavitakosh typing errors) are listed per doha in section 3. One is a reading change: पानी केरा बुदबुदा "ज्यों सारा परभात" changed to "ज्यों तारा परभात", following Kavita-Kaumudi 1917.

## 1. Share cards (45)

| id | line | meaning (en) | meaning (hi) |
|---|---|---|---|
| viv-arise-awake | Arise, awake, and stop not till the goal is reached. | Get up, stay awake to what matters, and keep going until you reach what you set out for. | उठो, जागो, और जब तक लक्ष्य न मिल जाए, रुको मत। |
| viv-take-up-one-idea | Take up one idea. Make that one idea your life, think of it, dream of it, live on that ide | Pick one aim and give it your whole mind, day and night, until it becomes your life. | एक लक्ष्य चुनो और उसी को अपना जीवन बना लो। उसी को सोचो, उसी के सपने देखो। |
| viv-one-thing-at-a-time | Do one thing at a time and while doing it put your whole soul into it to the exclusion of  | Give the task in front of you all of yourself, and let everything else wait. | एक समय में एक ही काम करो, और उसमें पूरा मन लगा दो। |
| viv-learn-everything-good | Learn everything that is good from others, but bring it in, and in your own way absorb it; | Take the good from everyone, make it your own, and stay yourself. | दूसरों से हर अच्छी बात सीखो, उसे अपने ढंग से अपनाओ, पर खुद दूसरों जैसे मत बनो। |
| viv-education-manifestation | Education is the manifestation of the perfection already in man. | Teaching draws out what is already whole inside a person. It does not pour it in. | शिक्षा उस पूर्णता को बाहर लाना है जो इंसान के भीतर पहले से है। |
| viv-grow-from-inside-out | You have to grow from inside out. None can teach you, none can make you spiritual. There i | Growth starts inside you. Others can help, but your own self is the real teacher. | तुम्हें भीतर से बढ़ना है। कोई तुम्हें सिखा नहीं सकता। तुम्हारी अपनी आत्मा ही तुम्हारी गुरु है। |
| viv-strength-is-life | Strength is life, weakness is death. | Strength keeps you alive inside. Weakness slowly kills. | ताकत ही जीवन है, कमज़ोरी ही मौत है। |
| viv-reject-as-poison | Anything that makes you weak physically, intellectually, and spiritually, reject as poison | Whatever weakens your body, mind or spirit, drop it like poison. It cannot be true. | जो चीज़ तुम्हें शरीर, बुद्धि या आत्मा से कमज़ोर करे, उसे ज़हर समझकर छोड़ दो। |
| viv-powers-already-ours | All the powers in the universe are already ours. It is we who have put our hands before ou | The strength you are looking for is already yours. Take your hands off your eyes. | दुनिया की सारी शक्तियाँ पहले से हमारी हैं। हमने ही आँखों पर हाथ रखकर अंधेरे का रोना रोया है। |
| viv-nothing-impossible | Never think there is anything impossible for the soul. It is the greatest heresy to think  | Never tell yourself something is impossible for you. That thought is the real error. | कभी मत सोचो कि आत्मा के लिए कुछ भी असंभव है। ऐसा सोचना सबसे बड़ा पाप है। |
| viv-be-not-afraid | Be not afraid of anything. You will do marvellous work. The moment you fear, you are nobod | Drop the fear and you will do great work. The moment fear takes over, you shrink. | किसी चीज़ से मत डरो। तुम अद्भुत काम करोगे। जिस पल डरे, उसी पल तुम कुछ नहीं रहे। |
| viv-whatever-you-think | Whatever you think, that you will be. If you think yourselves weak, weak you will be; if y | You become what you keep thinking you are. Think of yourself as strong. | जैसा सोचोगे, वैसे बन जाओगे। खुद को कमज़ोर सोचोगे तो कमज़ोर बनोगे, मज़बूत सोचोगे तो मज़बूत। |
| viv-stand-up-be-bold | Stand up, be bold, be strong. Take the whole responsibility on your own shoulders, and kno | Stand up and own your life. You shape what happens to you next. | उठो, हिम्मत करो, मज़बूत बनो। पूरी ज़िम्मेदारी अपने कंधों पर लो। अपना भाग्य तुम खुद बनाते हो। |
| viv-believe-god-yourself | You cannot believe in God until you believe in yourself. | Trust in God begins with trust in yourself. | जब तक खुद पर विश्वास नहीं, तब तक ईश्वर पर विश्वास नहीं हो सकता। |
| viv-all-power-within | All power is within you; you can do anything and everything. | Every power you need is in you. You can do what you set out to do. | सारी शक्ति तुम्हारे भीतर है। तुम कुछ भी और सब कुछ कर सकते हो। |
| viv-secret-of-success | The great secret of true success, of true happiness, then, is this: the man who asks for n | The person who gives without asking anything back ends up the most successful. | सच्ची सफलता और सच्चे सुख का राज़: जो बदले में कुछ नहीं माँगता, वही सबसे सफल है। |
| viv-ridicule-opposition-acceptance | Each work has to pass through these stages, ridicule, opposition, and then acceptance. | Good work gets laughed at, then fought, then accepted. Keep going through the first two. | हर काम तीन दौर से गुज़रता है: पहले मज़ाक, फिर विरोध, और फिर स्वीकार। |
| viv-never-mind-failures | Never mind failures; they are quite natural, they are the beauty of life, these failures. | Do not worry about failing. Failures are natural, and they give life its shape. | असफलताओं की परवाह मत करो। वे स्वाभाविक हैं, वे ही जीवन की सुंदरता हैं। |
| viv-great-gymnasium | This world is the great gymnasium where we come to make ourselves strong. | Life is a training ground. Its hard days are there to make you stronger. | यह दुनिया एक बड़ा व्यायामशाला है, जहाँ हम खुद को मज़बूत बनाने आते हैं। |
| viv-live-for-others | They alone live who live for others, the rest are more dead than alive. | A life lived for others is the one that counts as lived. | जो दूसरों के लिए जीते हैं, वही सच में जीते हैं। बाकी जीते हुए भी मरे समान हैं। |
| kab-guru-govind-dou-khade | गुरु गोविंद दोऊ खड़े काके लागू पाँय। बलिहारी गुरु आपने जिन गोविंद दिया बताय॥ | If guru and God both stood before me, I would bow to the guru first. He showed me God. | गुरु और भगवान दोनों सामने हों तो पहले गुरु को प्रणाम, क्योंकि उन्होंने ही भगवान तक पहुँचाया। |
| kab-pothi-padh-padh-jag-mua | पोथी पढ़-पढ़ जग मुआ, पंडित भया न कोय। ढाई आखर प्रेम का, पढ़ै सो पंडित होय॥ | The world died reading books and no one became wise. Learn the two and a half letters of love. | किताबें पढ़-पढ़कर दुनिया थक गई, कोई ज्ञानी न बना। प्रेम के ढाई अक्षर पढ़ ले, वही ज्ञानी है। |
| kab-kal-kare-so-aaj-kar | काल करे सो आज कर, आज करे सो अब। पल में प्रलय होएगी, बहुरि करेगा कब॥ | Do tomorrow's work today and today's work now. The end can come in a moment. | कल का काम आज करो, आज का अभी। पल भर में सब खत्म हो सकता है, फिर कब करोगे। |
| kab-dheere-dheere-re-mana | धीरे-धीरे रे मना, धीरे सब कुछ होय। माली सींचे सौ घड़ा, ॠतु आए फल होय॥ | Slowly, mind, everything comes slowly. Water the tree a hundred times, it fruits in its season. | मन, धीरज रखो। माली सौ घड़े पानी डाले, फल तो मौसम आने पर ही लगेगा। |
| kab-bura-jo-dekhan-main-chala | बुरा जो देखन मैं चला बुरा न मिलिया कोय। जो दिल खोजौं आपना मुझसा बुरा न कोय॥ | I went looking for a bad person and found none. When I searched my own heart, no one was worse. | मैं बुरा आदमी ढूँढने निकला, कोई न मिला। अपने भीतर झाँका तो मुझसे बुरा कोई नहीं था। |
| kab-aisi-bani-boliye | ऐसी बानी बोलिये मन का आपा खोय। औरन को सीतल करै आपहुँ सीतल होय॥ | Speak words that drop your ego. They cool the one who hears them, and cool you too. | ऐसी बात बोलो जिसमें अहंकार न हो। वह सुनने वाले को ठंडक दे और तुम्हें भी। |
| kab-bada-hua-to-kya-hua | बड़ा हुआ तो क्या हुआ जैसे पेड़ खजूर। पंछी को छाया नहीं फल लागे अति दूर॥ | What use is being tall like a date palm? No shade for birds, and its fruit hangs out of reach. | खजूर के पेड़ जैसा बड़ा होने से क्या फ़ायदा। न पंछी को छाया, न फल किसी की पहुँच में। |
| kab-sai-itna-dijiye | साईं इतना दीजिये, जा में कुटुम समाय। मैं भी भूखा न रहूँ, साधु ना भूखा जाय॥ | Lord, give me just enough for my family, so neither I nor a guest at my door goes hungry. | भगवान, बस इतना देना कि परिवार पल जाए। न मैं भूखा रहूँ, न द्वार पर आया साधु। |
| kab-mala-pherat-jug-bhaya | माला फेरत जुग भया, फिरा न मन का फेर। कर का मन का डार दें, मन का मनका फेर॥ | Ages spent turning prayer beads, and the mind never turned. Drop the beads, turn the mind. | माला फेरते युग बीत गया, मन नहीं बदला। हाथ की माला छोड़ो, मन के मनके फेरो। |
| kab-jati-na-poochho-sadhu-ki | जाति न पूछो साधु की, पूछ लीजिये ज्ञान। मोल करो तरवार का, पड़ा रहन दो म्यान॥ | Do not ask a sage his caste, ask what he knows. Value the sword, let the sheath lie. | साधु की जाति मत पूछो, उसका ज्ञान पूछो। मोल तलवार का होता है, म्यान का नहीं। |
| kab-dukh-mein-sumiran-sab-kare | दुख में सुमरिन सब करे, सुख में करे न कोय। जो सुख में सुमरिन करे, दुख काहे को होय॥ | Everyone remembers God in pain, no one in comfort. Remember Him in comfort and pain will not come. | दुख में सब भगवान को याद करते हैं, सुख में कोई नहीं। सुख में याद करें तो दुख क्यों आए। |
| kab-kasturi-kundal-base | कस्तूरी कुन्डल बसे, म्रग ढूंढे बन माहिं। ऐसे घट-घट राम है, दुनिया देखे नाहिं॥ | The musk is in the deer's own navel, yet it searches the forest. Ram lives in every heart. | कस्तूरी हिरन की नाभि में है, पर वह जंगल में ढूँढता है। वैसे ही राम हर दिल में है। |
| kab-nindak-niyare-rakhiye | निंदक नियारे राखिये, आंगन कुटि छबाय। बिन पाणी बिन सबुना, निरमल करै सुभाय॥ | Keep your critic close, give him a hut in your courtyard. Without soap or water he cleans your nature. | आलोचक को पास रखो, आँगन में कुटिया बनाकर। वह बिना पानी-साबुन तुम्हारा स्वभाव साफ़ करता है। |
| kab-chalti-chakki-dekh-ke | चलती चक्की देख के, दिया कबीरा रोय। दुइ पट भीतर आइके, साबित बचा न कोय॥ | Kabir wept at the turning millstones. Between the two stones, no grain comes out whole. | चलती चक्की देखकर कबीर रो पड़े। दो पाटों के बीच आकर कोई दाना साबुत नहीं बचता। |
| kab-mati-kahe-kumhar-se | माटी कहे कुम्हार से, तु क्या रौंदे मोय। एक दिन ऐसा आएगा, मैं रौंदूंगी तोय॥ | The clay tells the potter: you knead me today. One day I will lie over you. | मिट्टी कुम्हार से कहती है: आज तू मुझे रौंद रहा है, एक दिन मैं तुझे रौंदूँगी। |
| chk-1-12 | आतुरे व्यसने प्राप्ते दुर्भिक्षे शत्रुसङ्कटे । राजद्वारे श्मशाने च यस्तिष्ठति स बान्धवः ॥ | Your own is whoever stands by you in illness, trouble, famine, attack, in court and at the cremation ground. | सच्चा अपना वही है जो बीमारी, मुसीबत, अकाल, दुश्मन के हमले, कचहरी और श्मशान में साथ खड़ा रहे। |
| chk-2-5 | परोक्षे कार्यहन्तारं प्रत्यक्षे प्रियवादिनम् । वर्जयेत्तादृशं मित्रं विषकुम्भं पयोमुखम् ॥ | Drop the friend who is sweet to your face and works against you behind your back: poison under milk. | जो पीठ पीछे काम बिगाड़े और सामने मीठा बोले, उसे छोड़ दो। वह ऊपर दूध, भीतर ज़हर का घड़ा है। |
| chk-4-18 | कः कालः कानि मित्राणि को देशः कौ व्ययागमौ । कश्चाहं का च मे शक्तिरिति चिन्त्यं मुहुर्मुहुः | Ask yourself often: the time, your friends, the place, money in and out, and your own strength. | बार-बार सोचो: समय कैसा है, मित्र कौन हैं, जगह कैसी है, आमदनी-खर्च कितना है, मेरी ताकत कितनी है। |
| chk-6-16 | प्रभूतं कार्यमल्पं वा यन्नरः कर्तुमिच्छति । सर्वारम्भेण तत्कार्यं सिंहादेकं प्रचक्षते ॥ | Big or small, put your full strength into whatever you set out to do. Learn this from the lion. | काम छोटा हो या बड़ा, जो करना है उसे पूरी ताकत से करो। यह शेर से सीखो। |
| chk-7-12 | नात्यन्तं सरलैर्भाव्यं गत्वा पश्य वनस्थलीम् । छिद्यन्ते सरलास्तत्र कुब्जास्तिष्ठन्ति पादपा | Do not be too straight. In a forest the straight trees are cut first and the crooked ones stand. | ज़रूरत से ज़्यादा सीधे मत बनो। जंगल में जाकर देखो, सीधे पेड़ काटे जाते हैं और टेढ़े खड़े रहते हैं। |
| chk-16-6 | गुणैरुत्तमतां याति नोच्चैरासनसंस्थिताः । प्रासादशिखरस्थोऽपि काकः किं गरुडायते ॥ | Greatness comes from your qualities, not your seat. A crow on a palace roof does not become Garuda. | इंसान गुणों से बड़ा बनता है, ऊँची कुर्सी से नहीं। महल की चोटी पर बैठा कौआ गरुड़ नहीं बन जाता। |
| chk-15-6 | अन्यायोपार्जितं द्रव्यं दश वर्षाणि तिष्ठति । प्राप्ते चैकादशे वर्षे समूलं तद्विनश्यति ॥ | Money made unjustly stays ten years. In the eleventh it goes, taking the principal with it. | गलत तरीके से कमाया धन दस साल टिकता है। ग्यारहवें साल वह जड़ समेत चला जाता है। |
| chk-2-13 | श्लोकेन वा तदर्धेन तदर्धार्धाक्षरेण वा । अबन्ध्यं दिवसं कुर्याद्दानाध्ययनकर्मभिः ॥ | Learn something each day, a verse, half a verse, even one letter. Let no day go empty. | हर दिन कुछ सीखो: एक श्लोक, आधा, चौथाई या एक अक्षर ही सही। कोई दिन खाली न जाए। |
| chk-10-3 | सुखार्थी चेत्त्यजेद्विद्यां विद्यार्थी चेत्त्यजेत्सुखम् । सुखार्थिनः कुतो विद्या सुखं विद् | Want comfort, give up study. Want to learn, give up comfort. Whoever chases comfort never gets learning. | आराम चाहिए तो पढ़ाई छोड़ो, पढ़ना है तो आराम छोड़ो। आराम चाहने वाले को विद्या कहाँ। |
| chk-13-2 | गते शोको न कर्तव्यो भविष्यं नैव चिन्तयेत् । वर्तमानेन कालेन वर्तयन्ति विचक्षणाः ॥ | Grieve no more for the past, worry no more over the future; the wise live in the present. | बीते का शोक मत करो, आने वाले की चिंता मत करो। समझदार लोग वर्तमान में जीते हैं। |

## 2. Vivekananda

### 2a. Hub lines (61): Hindi meaning (all) and plain English note (card lines)

- **arise-awake** (students, fear-and-strength; CW vol 3, Address of Welcome Presented at Calcutta and Reply, Lecture): "Arise, awake, and stop not till the goal is reached."
  - hi: उठो, जागो, और जब तक लक्ष्य न मिल जाए, रुको मत।
  - en: Get up, stay awake to what matters, and keep going until you reach what you set out for.
- **take-up-one-idea** (students, work-and-success; CW vol 1, Pratyahara and Dharana, Lecture): "Take up one idea. Make that one idea your life, think of it, dream of it, live on that idea."
  - hi: एक लक्ष्य चुनो और उसी को अपना जीवन बना लो। उसी को सोचो, उसी के सपने देखो।
  - en: Pick one aim and give it your whole mind, day and night, until it becomes your life.
- **one-thing-at-a-time** (students, work-and-success; CW vol 6, On Raja-yoga, Class notes by a disciple): "Do one thing at a time and while doing it put your whole soul into it to the exclusion of all else."
  - hi: एक समय में एक ही काम करो, और उसमें पूरा मन लगा दो।
  - en: Give the task in front of you all of yourself, and let everything else wait.
- **learn-everything-good** (students, education; CW vol 3, The Common Bases of Hinduism, Lecture): "Learn everything that is good from others, but bring it in, and in your own way absorb it; do not become others."
  - hi: दूसरों से हर अच्छी बात सीखो, उसे अपने ढंग से अपनाओ, पर खुद दूसरों जैसे मत बनो।
  - en: Take the good from everyone, make it your own, and stay yourself.
- **refuses-to-learn** (students, education; CW vol 3, The Common Bases of Hinduism, Lecture): "We have indeed many things to learn from others, yea, that man who refuses to learn is already dead."
  - hi: हमें दूसरों से बहुत कुछ सीखना है। जो सीखने से इनकार करता है, वह जीते जी मरा हुआ है।
- **be-strong-young-friends** (students, fear-and-strength; CW vol 3, Vedanta in its Application to Indian Life, Lecture): "Be strong, my young friends; that is my advice to you."
  - hi: मेरे युवा मित्रो, मज़बूत बनो। तुम्हें मेरी यही सलाह है।
  - en: His first advice to the young: build strength, in body and in mind.
- **football-gita** (students, fear-and-strength; CW vol 3, Vedanta in its Application to Indian Life, Lecture): "You will be nearer to Heaven through football than through the study of the Gita."
  - hi: गीता पढ़ने से पहले शरीर मज़बूत करो। फ़ुटबॉल से तुम स्वर्ग के ज़्यादा करीब पहुँचोगे।
- **gita-better-with-biceps** (students, fear-and-strength; CW vol 3, Vedanta in its Application to Indian Life, Lecture): "You will understand the Gita better with your biceps, your muscles, a little stronger."
  - hi: थोड़ी मज़बूत बाँहों और मांसपेशियों के साथ तुम गीता को बेहतर समझोगे।
- **dare-to-be-free** (students, fear-and-strength; CW vol 3, The Free Soul, Lecture): "Dare to be free, dare to go as far as your thought leads, and dare to carry that out in your life."
  - hi: आज़ाद होने का साहस करो। जहाँ तक तुम्हारा विचार ले जाए, वहाँ तक जाओ और उसे जीवन में उतारो।
  - en: Think freely, follow your thought to its end, and then live by it.
- **young-men-wanted** (students; CW vol 3, My Plan of Campaign, Lecture): "Strong, vigorous, believing young men, sincere to the backbone, are wanted."
  - hi: ज़रूरत है मज़बूत, जोशीले, खुद पर भरोसा रखने वाले और रीढ़ तक सच्चे युवाओं की।
- **servant-then-master** (students, work-and-success; CW vol 3, Vedantism, Lecture): "Always first learn to be a servant, and then you will be fit to be a master."
  - hi: पहले सेवा करना सीखो, तभी तुम नेतृत्व के लायक बनोगे।
- **books-parrots** (students, education; CW vol 4, The First Steps, Lecture): "By reading books we become parrots; no one becomes learned by reading books."
  - hi: सिर्फ़ किताबें रटने से हम तोते बन जाते हैं। किताबें पढ़ लेने भर से कोई ज्ञानी नहीं बनता।
- **education-manifestation** (education, students; CW vol 4, What We Believe in, Writing): "Education is the manifestation of the perfection already in man."
  - hi: शिक्षा उस पूर्णता को बाहर लाना है जो इंसान के भीतर पहले से है।
  - en: Teaching draws out what is already whole inside a person. It does not pour it in.
- **grow-from-inside-out** (education, students; CW vol 5, Sayings and Utterances, Sayings and Utterances): "You have to grow from inside out. None can teach you, none can make you spiritual. There is no other teacher but your own soul."
  - hi: तुम्हें भीतर से बढ़ना है। कोई तुम्हें सिखा नहीं सकता। तुम्हारी अपनी आत्मा ही तुम्हारी गुरु है।
  - en: Growth starts inside you. Others can help, but your own self is the real teacher.
- **five-ideas** (education, students; CW vol 3, The Future of India, Lecture): "If you have assimilated five ideas and made them your life and character, you have more education than any man who has got by heart a whole library"
  - hi: पाँच विचार भी अगर जीवन और चरित्र में उतर जाएं, तो वह पूरी लाइब्रेरी रटने से बड़ी शिक्षा है।
  - en: Five ideas you live by count for more than a library you memorised.
- **man-making** (education; CW vol 2, The Powers of the Mind, Lecture): "The ideal of all education, all training, should be this man-making."
  - hi: हर शिक्षा और हर ट्रेनिंग का एक ही लक्ष्य होना चाहिए: अच्छा इंसान बनाना।
- **make-the-man-grow** (education; CW vol 2, The Powers of the Mind, Lecture): "The end and aim of all training is to make the man grow."
  - hi: हर सीख का असली मकसद इंसान को भीतर से बड़ा करना है।
- **true-teacher** (education; CW vol 4, My Master, Lecture): "The only true teacher is he who can immediately come down to the level of the student"
  - hi: सच्चा शिक्षक वही है जो तुरंत विद्यार्थी के स्तर पर उतरकर उसकी नज़र से देख सके।
- **truth-thousand-ways** (education; CW vol 5, Sayings and Utterances, Sayings and Utterances): "Truth can be stated in a thousand different ways, yet each one can be true."
  - hi: सच हज़ार तरीकों से कहा जा सकता है, और हर तरीका सच हो सकता है।
  - en: The same truth can be said in many ways, and each way can still be right.
- **world-gives-up-secrets** (education, students; CW vol 1, Introductory, Lecture): "The world is ready to give up its secrets if we only know how to knock, how to give it the necessary blow."
  - hi: दुनिया अपने राज़ खोलने को तैयार है, बस हमें सही ढंग से दस्तक देना आना चाहिए।
- **bring-out-the-power** (education, work-and-success; CW vol 1, Karma in its Effect on Character, Lecture): "You must remember that all work is simply to bring out the power of the mind which is already there, to wake up the soul."
  - hi: हर काम का मकसद मन की उस ताकत को जगाना है जो पहले से हमारे भीतर है।
- **fool-buys-books** (education; CW vol 1, Karma in its Effect on Character, Lecture): "A fool may buy all the books in the world, and they will be in his library; but he will be able to read only those that he deserves to"
  - hi: मूर्ख दुनिया भर की किताबें खरीद ले, पर वह वही पढ़ पाएगा जिसके वह लायक है।
- **essentials** (education; CW vol 3, Reply to the Address of Welcome at Madura, Lecture): "We have first to learn the distinction between the essentials and the non-essentials in everything."
  - hi: सबसे पहले हमें हर बात में ज़रूरी और गैर-ज़रूरी का फ़र्क समझना है।
- **strength-is-life** (fear-and-strength; CW vol 2, Work and its Secret, Lecture): "Strength is life, weakness is death."
  - hi: ताकत ही जीवन है, कमज़ोरी ही मौत है।
  - en: Strength keeps you alive inside. Weakness slowly kills.
- **reject-as-poison** (fear-and-strength, students; CW vol 3, My Plan of Campaign, Lecture): "Anything that makes you weak physically, intellectually, and spiritually, reject as poison; there is no life in it, it cannot be true."
  - hi: जो चीज़ तुम्हें शरीर, बुद्धि या आत्मा से कमज़ोर करे, उसे ज़हर समझकर छोड़ दो।
  - en: Whatever weakens your body, mind or spirit, drop it like poison. It cannot be true.
- **powers-already-ours** (fear-and-strength; CW vol 2, Practical Vedanta, Lecture): "All the powers in the universe are already ours. It is we who have put our hands before our eyes and cry that it is dark."
  - hi: दुनिया की सारी शक्तियाँ पहले से हमारी हैं। हमने ही आँखों पर हाथ रखकर अंधेरे का रोना रोया है।
  - en: The strength you are looking for is already yours. Take your hands off your eyes.
- **nothing-impossible** (fear-and-strength; CW vol 2, Practical Vedanta, Lecture): "Never think there is anything impossible for the soul. It is the greatest heresy to think so."
  - hi: कभी मत सोचो कि आत्मा के लिए कुछ भी असंभव है। ऐसा सोचना सबसे बड़ा पाप है।
  - en: Never tell yourself something is impossible for you. That thought is the real error.
- **greatest-sin-weak** (fear-and-strength; CW vol 7, Recorded by Miss S. E. Waldo (a Disciple), Class notes by a disciple): "The greatest sin is to think yourself weak"
  - hi: खुद को कमज़ोर समझना सबसे बड़ा पाप है।
  - en: Calling yourself weak does more harm than any mistake you have made.
- **never-tell-weak** (fear-and-strength; CW vol 2, Practical Vedanta, Lecture): "Never tell yourselves or others that you are weak."
  - hi: न खुद से कहो, न दूसरों से कि तुम कमज़ोर हो।
- **be-not-afraid** (fear-and-strength; CW vol 3, Address of Welcome Presented at Calcutta and Reply, Lecture): "Be not afraid of anything. You will do marvellous work. The moment you fear, you are nobody."
  - hi: किसी चीज़ से मत डरो। तुम अद्भुत काम करोगे। जिस पल डरे, उसी पल तुम कुछ नहीं रहे।
  - en: Drop the fear and you will do great work. The moment fear takes over, you shrink.
- **fearlessness-heaven** (fear-and-strength; CW vol 3, Address of Welcome Presented at Calcutta and Reply, Lecture): "It is fearlessness that brings heaven even in a moment."
  - hi: निडरता एक पल में स्वर्ग ले आती है।
- **faith-in-yourselves** (fear-and-strength, students; CW vol 3, The Mission of the Vedanta, Lecture): "Have faith in yourselves, and stand up on that faith and be strong; that is what we need."
  - hi: खुद पर भरोसा रखो, उसी भरोसे पर खड़े हो और मज़बूत बनो।
- **believe-in-yourselves** (fear-and-strength; CW vol 3, My Plan of Campaign, Lecture): "What we want is strength, so believe in yourselves."
  - hi: हमें ताकत चाहिए, इसलिए खुद पर विश्वास करो।
- **strength-within** (fear-and-strength; CW vol 2, The Cosmos: the Microcosm, Lecture): "All the strength and succour you want is within yourselves."
  - hi: जो ताकत और सहारा तुम ढूँढ रहे हो, वह तुम्हारे भीतर ही है।
  - en: The strength and help you are waiting for are already inside you.
- **infinite-strength** (fear-and-strength; CW vol 4, The Preparation, Lecture): "You must be strong; you have infinite strength within you."
  - hi: तुम्हें मज़बूत होना है। तुम्हारे भीतर असीम ताकत है।
- **whatever-you-think** (fear-and-strength, students; CW vol 3, Vedantism, Lecture): "Whatever you think, that you will be. If you think yourselves weak, weak you will be; if you think yourselves strong, strong you will be"
  - hi: जैसा सोचोगे, वैसे बन जाओगे। खुद को कमज़ोर सोचोगे तो कमज़ोर बनोगे, मज़बूत सोचोगे तो मज़बूत।
  - en: You become what you keep thinking you are. Think of yourself as strong.
- **stand-up-be-bold** (fear-and-strength, work-and-success; CW vol 2, The Cosmos: the Microcosm, Lecture): "Stand up, be bold, be strong. Take the whole responsibility on your own shoulders, and know that you are the creator of your own destiny."
  - hi: उठो, हिम्मत करो, मज़बूत बनो। पूरी ज़िम्मेदारी अपने कंधों पर लो। अपना भाग्य तुम खुद बनाते हो।
  - en: Stand up and own your life. You shape what happens to you next.
- **atheist-himself** (fear-and-strength; CW vol 2, Practical Vedanta, Lecture): "The old religions said that he was an atheist who did not believe in God. The new religion says that he is the atheist who does not believe in himself."
  - hi: पुराने धर्म कहते थे, जो ईश्वर को नहीं मानता वह नास्तिक है। नया धर्म कहता है, जो खुद को नहीं मानता वह नास्तिक है।
  - en: Faith starts with yourself. Not trusting yourself is the real lack of faith.
- **believe-god-yourself** (fear-and-strength; CW vol 5, Sayings and Utterances, Sayings and Utterances): "You cannot believe in God until you believe in yourself."
  - hi: जब तक खुद पर विश्वास नहीं, तब तक ईश्वर पर विश्वास नहीं हो सकता।
  - en: Trust in God begins with trust in yourself.
- **all-power-within** (fear-and-strength, students; CW vol 3, The Work Before Us, Lecture): "All power is within you; you can do anything and everything."
  - hi: सारी शक्ति तुम्हारे भीतर है। तुम कुछ भी और सब कुछ कर सकते हो।
  - en: Every power you need is in you. You can do what you set out to do.
- **true-to-your-nature** (fear-and-strength; CW vol 1, Mohammed, Lecture): "The greatest religion is to be true to your own nature."
  - hi: अपने स्वभाव के प्रति सच्चे रहना ही सबसे बड़ा धर्म है।
- **every-thought-weakens** (fear-and-strength; CW vol 2, Immortality, Lecture): "Know that every thought and word that weakens you in this world is the only evil that exists."
  - hi: जो विचार और जो शब्द तुम्हें कमज़ोर करे, दुनिया में बस वही बुराई है।
- **rivet-a-chain** (fear-and-strength; CW vol 2, The Freedom of the Soul, Lecture): "As soon as you say, "I am bound," "I am weak," "I am helpless," woe unto you; you rivet one more chain upon yourself."
  - hi: जैसे ही तुम कहते हो "मैं बंधा हूँ", "मैं कमज़ोर हूँ", तुम अपने ऊपर एक और ज़ंजीर कस लेते हो।
- **secret-of-success** (work-and-success; CW vol 2, Work and its Secret, Lecture): "The great secret of true success, of true happiness, then, is this: the man who asks for no return, the perfectly unselfish man, is the most successful."
  - hi: सच्ची सफलता और सच्चे सुख का राज़: जो बदले में कुछ नहीं माँगता, वही सबसे सफल है।
  - en: The person who gives without asking anything back ends up the most successful.
- **ridicule-opposition-acceptance** (work-and-success; CW vol 5, Epistles, First Series, XLVII, Letter): "Each work has to pass through these stages, ridicule, opposition, and then acceptance."
  - hi: हर काम तीन दौर से गुज़रता है: पहले मज़ाक, फिर विरोध, और फिर स्वीकार।
  - en: Good work gets laughed at, then fought, then accepted. Keep going through the first two.
- **purity-patience-perseverance** (work-and-success; CW vol 6, Epistles, Second Series, LI, Letter): "Purity, patience, and perseverance are the three essentials to success and, above all, love."
  - hi: सफलता के लिए तीन चीज़ें ज़रूरी हैं: पवित्रता, धैर्य और लगन। और सबसे ऊपर प्रेम।
  - en: Clean intent, patience and persistence win in the end, and love matters most.
- **never-mind-failures** (work-and-success, students; CW vol 2, God in Everything, Lecture): "Never mind failures; they are quite natural, they are the beauty of life, these failures."
  - hi: असफलताओं की परवाह मत करो। वे स्वाभाविक हैं, वे ही जीवन की सुंदरता हैं।
  - en: Do not worry about failing. Failures are natural, and they give life its shape.
- **responsible-for-what-we-are** (work-and-success; CW vol 1, Karma in its Effect on Character, Lecture): "We are responsible for what we are; and whatever we wish ourselves to be, we have the power to make ourselves."
  - hi: हम जो हैं, उसके ज़िम्मेदार हम खुद हैं। जो बनना चाहें, वह बनने की ताकत भी हमारे पास है।
  - en: You made yourself what you are, and you can make yourself what you want to be.
- **work-like-a-master** (work-and-success; CW vol 1, The Secret of Work, Lecture): "You should work like a master and not as a slave; work incessantly, but do not do slave's work."
  - hi: मालिक की तरह काम करो, गुलाम की तरह नहीं। लगातार काम करो, पर बंधकर नहीं।
- **do-not-trouble-result** (work-and-success; CW vol 1, Karma in its Effect on Character, Lecture): "If you want to do a great or a good work, do not trouble to think what the result will be."
  - hi: अगर कोई बड़ा या अच्छा काम करना है, तो नतीजे की चिंता मत करो।
- **duty-next-to-us** (work-and-success; CW vol 1, What Is Duty?, Lecture): "The only way to rise is by doing the duty next to us, and thus gathering strength go on until we reach the highest state."
  - hi: ऊपर उठने का एक ही रास्ता है: जो काम सामने है, उसे करो और ताकत जुटाते हुए आगे बढ़ो।
- **hold-on-to-your-ideas** (work-and-success; CW vol 5, Epistles, First Series, LIV, Letter): "Hold on to your own ideas with strength and purity, and whatever obstructions may now be in your way, the world is bound to listen to you in the long run."
  - hi: अपने विचारों को ताकत और सच्चाई से थामे रहो। रुकावटें जो भी हों, दुनिया आखिर में सुनेगी।
- **ask-nothing** (work-and-success; CW vol 2, Work and its Secret, Lecture): "Ask nothing; want nothing in return. Give what you have to give"
  - hi: कुछ मत माँगो, बदले में कुछ मत चाहो। जो देना है, दे दो।
- **neither-seek-nor-avoid** (work-and-success; CW vol 7, Recorded by Miss S. E. Waldo (a Disciple), Class notes by a disciple): "Neither seek nor avoid, take what comes."
  - hi: न किसी चीज़ के पीछे भागो, न उससे बचो। जो आए, उसे स्वीकार करो।
  - en: Do not chase things or run from them. Meet what comes.
- **great-gymnasium** (work-and-success, fear-and-strength; CW vol 5, Sayings and Utterances, Sayings and Utterances): "This world is the great gymnasium where we come to make ourselves strong."
  - hi: यह दुनिया एक बड़ा व्यायामशाला है, जहाँ हम खुद को मज़बूत बनाने आते हैं।
  - en: Life is a training ground. Its hard days are there to make you stronger.
- **condemn-none** (work-and-success; CW vol 2, Practical Vedanta, Lecture): "Condemn none; if you can stretch out a helping hand, do so. If you cannot, fold your hands, bless your brothers, and let them go their own way."
  - hi: किसी को दोषी मत ठहराओ। मदद कर सको तो करो, न कर सको तो हाथ जोड़कर उन्हें उनके रास्ते जाने दो।
- **live-for-others** (work-and-success; CW vol 4, Our Duty to the Masses, Writing): "They alone live who live for others, the rest are more dead than alive."
  - hi: जो दूसरों के लिए जीते हैं, वही सच में जीते हैं। बाकी जीते हुए भी मरे समान हैं।
  - en: A life lived for others is the one that counts as lived.
- **heart-and-brain** (work-and-success; CW vol 1, Steps to Realisation, Lecture): "When there is conflict between the heart and the brain, let the heart be followed"
  - hi: जब दिल और दिमाग में टकराव हो, तो दिल की सुनो।
- **thoughts-made-us** (work-and-success, students; CW vol 7, Recorded by Miss S. E. Waldo (a Disciple), Class notes by a disciple): "We are what our thoughts have made us; so take care of what you think. Words are secondary. Thoughts live, they travel far."
  - hi: हम वही हैं जो हमारे विचारों ने हमें बनाया है। इसलिए सोच का ध्यान रखो।
  - en: Your thoughts build who you are. Watch them, they go further than words.
- **fire-that-warms** (work-and-success; CW vol 2, Realisation, Lecture): "The fire that warms us can also consume us; it is not the fault of the fire."
  - hi: जो आग हमें गर्मी देती है, वही जला भी सकती है। इसमें आग का दोष नहीं।
- **great-results-patience** (work-and-success, students; CW vol 5, Epistles, First Series, XLIII, Letter): "Great results are attained only by great patience, great courage, and great attempts."
  - hi: बड़े नतीजे बड़े धैर्य, बड़ी हिम्मत और बड़ी कोशिश से ही मिलते हैं।

### 2b. Fact checks (44)

- **not-found** (53.6) `day-without-problems-wrong-path`: "In a day, when you don't come across any problems, you can be sure that you are travelling in a wrong path."
  - note en: Searched vols 1 to 8 with a fuzzy match, and Wikisource (all volumes, including vol 9) by phrase. No passage comes close.
  - note hi: खंड 1 से 8 में फ़ज़ी मिलान से और विकिसोर्स पर सभी खंडों (खंड 9 सहित) में खोजा। कोई अंश इसके पास भी नहीं।
- **not-found** (52.3) `talk-to-yourself-once-a-day`: "Talk to yourself once in a day, otherwise you may miss meeting an excellent person in this world."
  - note en: Searched vols 1 to 8 with a fuzzy match, and Wikisource (all volumes, including vol 9) by phrase. No passage comes close.
  - note hi: खंड 1 से 8 में फ़ज़ी मिलान से और विकिसोर्स पर सभी खंडों (खंड 9 सहित) में खोजा। कोई अंश इसके पास भी नहीं।
- **not-found** (54.2) `take-risks-lead-guide`: "Take risks in your life. If you win, you can lead. If you lose, you can guide."
  - note en: Searched vols 1 to 8 with a fuzzy match, and Wikisource (all volumes, including vol 9) by phrase. No passage comes close.
  - note hi: खंड 1 से 8 में फ़ज़ी मिलान से और विकिसोर्स पर सभी खंडों (खंड 9 सहित) में खोजा। कोई अंश इसके पास भी नहीं।
- **not-found** (54.7) `mind-is-intensely-eager`: "If the mind is intensely eager, everything can be accomplished, mountains can be crumbled into atoms."
  - note en: Searched vols 1 to 8 with a fuzzy match, and Wikisource (all volumes, including vol 9) by phrase. No passage comes close.
  - note hi: खंड 1 से 8 में फ़ज़ी मिलान से और विकिसोर्स पर सभी खंडों (खंड 9 सहित) में खोजा। कोई अंश इसके पास भी नहीं।
- **paraphrase** (71.2) `be-not-afraid-of-anything`: "Be not afraid of anything. You will do marvellous work. It is fearlessness that brings heaven even in a moment." -> CW vol 3, Address of Welcome Presented at Calcutta and Reply: "Be not afraid of anything. You will do marvellous work. The moment you fear, you are nobody."
  - note en: The first two sentences are his, word for word. The last one comes from later in the same paragraph, where he says "it is fearlessness that brings heaven even in a moment."
  - note hi: पहले दो वाक्य हूबहू उनके हैं। आखिरी वाक्य उसी अनुच्छेद में आगे आता है।
- **paraphrase** (80.2) `strength-is-life-weakness-is-death`: "Strength is life, weakness is death. Expansion is life, contraction is death. Love is life, hatred is death." -> CW vol 2, Work and its Secret: "Strength is life, weakness is death."
  - note en: Two works stitched together. "Strength is life, weakness is death" is from Work and Its Secret (vol 2). "Expansion is life, contraction is death. Love is life, and hatred is death" is from Reply to the Calcutta Address (vol 4).
  - note hi: यह दो अलग जगहों की पंक्तियाँ जोड़कर बना है। पहला हिस्सा खंड 2 से है, बाकी खंड 4 के कलकत्ता अभिनंदन के उत्तर से।
- **paraphrase** (89.6) `comfort-is-no-test-of-truth`: "Comfort is no test of truth. Truth is often far from being comfortable." -> CW vol 8, Jnana Yoga - IV: "Comfort" is no test of truth; on the contrary, truth is often far from being "comfortable"
  - note en: Close to his words in class notes taken by a disciple (vol 8, Jnana Yoga IV). The original has "on the contrary" in the middle.
  - note hi: यह खंड 8 में एक शिष्य के लिखे नोट्स से है। मूल में बीच में "on the contrary" है।
- **paraphrase** (78.8) `believe-in-yourself-and-the-world-will-be-at-your-feet`: "Believe in yourself and the world will be at your feet." -> CW vol 6, Epistles, Second Series, XLVII: "Let people say whatever they like, stick to your own convictions, and rest assured, the world will be at your feet."
  - note en: A short form of a line in one of his Bengali letters (vol 6, in translation), which goes on: "Have faith in yourself first."
  - note hi: यह उनके एक बांग्ला पत्र (खंड 6, अनुवाद) की पंक्ति का छोटा रूप है।
- **paraphrase** (72.3) `you-are-the-creator-of-your-own-destiny`: "Stand up and fight, you are the creator of your destiny; the world is yours." -> CW vol 2, The Cosmos: the Microcosm: "Stand up, be bold, be strong. Take the whole responsibility on your own shoulders, and know that you are the creator of "
  - note en: A reworded version of a line in The Microcosm (vol 2). "Stand up and fight" and "the world is yours" are not in it.
  - note hi: यह खंड 2 के "The Microcosm" की एक पंक्ति का बदला हुआ रूप है।
- **in-his-words** (100.0) `arise-awake-stop-not`: "Arise, awake, and stop not till the goal is reached." -> CW vol 3, Address of Welcome Presented at Calcutta and Reply: "Arise, awake, and stop not till the goal is reached"
- **in-his-words** (100.0) `take-up-one-idea`: "Take up one idea. Make that one idea your life; think of it, dream of it, live on that idea." -> CW vol 1, Pratyahara and Dharana: "Take up one idea. Make that one idea your life, think of it, dream of it, live on that idea"
- **in-his-words** (98.4) `grow-from-the-inside-out`: "You have to grow from the inside out. None can teach you, none can make you spiritual. There is no other teacher but your own soul." -> CW vol 5, Sayings and Utterances: "You have to grow from inside out. None can teach you, none can make you spiritual. There is no other teacher but your ow"
  - note en: The shared version adds "the" before "inside out". The line is no. 20 in Sayings and Utterances (vol 5), a compiled list. The lecture behind it, The Ideal of a Universal Religion (vol 2), says: "There is no other teacher to you than your own soul."
  - note hi: यह पंक्ति खंड 5 के "Sayings and Utterances" में क्रमांक 20 पर है। खंड 2 के व्याख्यान में यही बात कही गई है: "तुम्हारी अपनी आत्मा के सिवा तुम्हारा कोई गुरु नहीं।"
- **in-his-words** (100.0) `conflict-between-heart-and-brain`: "In a conflict between the heart and the brain, follow your heart." -> CW vol 8, The Religion of Love: "In a conflict between the heart and the brain follow your heart"
- **in-his-words** (100.0) `all-power-is-within-you`: "All power is within you; you can do anything and everything." -> CW vol 3, The Work Before Us: "All power is within you; you can do anything and everything"
- **in-his-words** (92.9) `secret-of-true-success`: "The great secret of true success, of true happiness, is this: the man or woman who asks for no return, the perfectly unselfish person, is the most successful." -> CW vol 2, Work and its Secret: "The great secret of true success, of true happiness, then, is this: the man who asks for no return, the perfectly unself"
  - note en: The lecture says "the man who asks for no return, the perfectly unselfish man". Shared copies often change it to "the man or woman".
  - note hi: मूल व्याख्यान में "the man who asks for no return" है। शेयर होने वाली कॉपी में अक्सर "man or woman" कर दिया जाता है।
- **in-his-words** (100.0) `greatest-religion-true-to-your-nature`: "The greatest religion is to be true to your own nature. Have faith in yourselves." -> CW vol 1, Mohammed: "The greatest religion is to be true to your own nature. Have faith in yourselves"
- **in-his-words** (100.0) `greatest-sin-think-yourself-weak`: "The greatest sin is to think yourself weak." -> CW vol 7, Recorded by Miss S. E. Waldo (a Disciple): "The greatest sin is to think yourself weak"
- **in-his-words** (100.0) `reject-it-as-poison`: "Anything that makes you weak physically, intellectually and spiritually, reject as poison." -> CW vol 3, My Plan of Campaign: "Anything that makes you weak physically, intellectually, and spiritually, reject as poison"
- **in-his-words** (97.9) `we-are-what-our-thoughts-made-us`: "We are what our thoughts have made us; so take care about what you think. Words are secondary. Thoughts live; they travel far." -> CW vol 7, Recorded by Miss S. E. Waldo (a Disciple): "We are what our thoughts have made us; so take care of what you think. Words are secondary. Thoughts live, they travel f"
- **in-his-words** (100.0) `dare-to-be-free`: "Dare to be free, dare to go as far as your thought leads, and dare to carry that out in your life." -> CW vol 3, The Free Soul: "Dare to be free, dare to go as far as your thought leads, and dare to carry that out in your life"
- **in-his-words** (100.0) `they-alone-live-who-live-for-others`: "They alone live who live for others, the rest are more dead than alive." -> CW vol 4, Our Duty to the Masses: "They alone live who live for others, the rest are more dead than alive"
- **in-his-words** (56.6) `all-love-is-expansion`: "All love is expansion, all selfishness is contraction. Love is therefore the only law of life." -> CW vol 6, Epistles, Second Series, LXXI: "All expansion is life, all contraction is death. All love is expansion, all selfishness is contraction. Love is therefor"
  - note en: From a letter he wrote in Bengali, printed in English translation in vol 6. The wording is the translator's; the thought is his.
  - note hi: यह उनके बांग्ला में लिखे एक पत्र से है, जिसका अंग्रेज़ी अनुवाद खंड 6 में छपा है।
- **in-his-words** (100.0) `believe-in-god-until-you-believe-in-yourself`: "You cannot believe in God until you believe in yourself." -> CW vol 5, Sayings and Utterances: "You cannot believe in God until you believe in yourself"
- **in-his-words** (100.0) `neither-seek-nor-avoid`: "Neither seek nor avoid, take what comes." -> CW vol 7, Recorded by Miss S. E. Waldo (a Disciple): "Neither seek nor avoid, take what comes"
- **in-his-words** (100.0) `fire-that-warms-us`: "The fire that warms us can also consume us; it is not the fault of the fire." -> CW vol 2, Realisation: "The fire that warms us can also consume us; it is not the fault of the fire"
- **in-his-words** (100.0) `learn-everything-good-from-others`: "Learn everything that is good from others, but bring it in, and in your own way absorb it; do not become others." -> CW vol 3, The Common Bases of Hinduism: "Learn everything that is good from others, but bring it in, and in your own way absorb it; do not become others"
- **in-his-words** (100.0) `do-one-thing-at-a-time`: "Do one thing at a time, and while doing it put your whole soul into it to the exclusion of all else." -> CW vol 6, On Raja-yoga: "Do one thing at a time and while doing it put your whole soul into it to the exclusion of all else"
- **in-his-words** (100.0) `if-you-think-yourselves-weak`: "Whatever you think, that you will be. If you think yourselves weak, weak you will be; if you think yourselves strong, strong you will be." -> CW vol 3, Vedantism: "Whatever you think, that you will be. If you think yourselves weak, weak you will be; if you think yourselves strong, st"
- **in-his-words** (100.0) `we-are-responsible-for-what-we-are`: "We are responsible for what we are, and whatever we wish ourselves to be, we have the power to make ourselves." -> CW vol 1, Karma in its Effect on Character: "We are responsible for what we are; and whatever we wish ourselves to be, we have the power to make ourselves"
- **in-his-words** (100.0) `ridicule-opposition-acceptance`: "Each work has to pass through these stages, ridicule, opposition, and then acceptance." -> CW vol 5, Epistles, First Series, XLVII: "Each work has to pass through these stages, ridicule, opposition, and then acceptance"
- **in-his-words** (100.0) `ask-nothing-want-nothing`: "Ask nothing; want nothing in return. Give what you have to give; it will come back to you, but do not think of that now." -> CW vol 2, Work and its Secret: "Ask nothing; want nothing in return. Give what you have to give; it will come back to you, but do not think of that now"
- **in-his-words** (97.9) `world-is-a-great-gymnasium`: "The world is the great gymnasium where we come to make ourselves strong." -> CW vol 5, Sayings and Utterances: "This world is the great gymnasium where we come to make ourselves strong"
- **in-his-words** (100.0) `education-is-manifestation-of-perfection`: "Education is the manifestation of the perfection already in man." -> CW vol 4, What We Believe in: "Education is the manifestation of the perfection already in man"
- **in-his-words** (100.0) `all-the-powers-in-the-universe`: "All the powers in the universe are already ours. It is we who have put our hands before our eyes and cry that it is dark." -> CW vol 2, Practical Vedanta: "All the powers in the universe are already ours. It is we who have put our hands before our eyes and cry that it is dark"
- **in-his-words** (100.0) `stand-up-be-bold-be-strong`: "Stand up, be bold, be strong. Take the whole responsibility on your own shoulders, and know that you are the creator of your own destiny." -> CW vol 2, The Cosmos: the Microcosm: "Stand up, be bold, be strong. Take the whole responsibility on your own shoulders, and know that you are the creator of "
- **in-his-words** (100.0) `atheist-who-does-not-believe-in-himself`: "The old religions said that he was an atheist who did not believe in God. The new religion says that he is the atheist who does not believe in himself." -> CW vol 2, Practical Vedanta: "The old religions said that he was an atheist who did not believe in God. The new religion says that he is the atheist w"
- **in-his-words** (62.2) `be-a-hero-i-have-no-fear`: "Be a hero. Always say, I have no fear." -> CW vol 7, Conversations and Dialogues: "Be a hero. Always say, "I have no fear." Tell this to everybody"
  - note en: Recorded in Bengali by a disciple, Sharat Chandra Chakravarty, in Conversations and Dialogues, and printed in English translation in vol 7.
  - note hi: यह बात एक शिष्य ने बांग्ला में दर्ज की थी। इसका अंग्रेज़ी अनुवाद खंड 7 की "Conversations and Dialogues" में है।
- **in-his-words** (100.0) `never-think-anything-impossible`: "Never think there is anything impossible for the soul. It is the greatest heresy to think so." -> CW vol 2, Practical Vedanta: "Never think there is anything impossible for the soul. It is the greatest heresy to think so"
- **in-his-words** (100.0) `purity-patience-perseverance`: "Purity, patience, and perseverance are the three essentials to success and, above all, love." -> CW vol 6, Epistles, Second Series, LI: "Purity, patience, and perseverance are the three essentials to success and, above all, love"
- **in-his-words** (100.0) `condemn-none`: "Condemn none: if you can stretch out a helping hand, do so. If you cannot, fold your hands, bless your brothers, and let them go their own way." -> CW vol 2, Practical Vedanta: "Condemn none; if you can stretch out a helping hand, do so. If you cannot, fold your hands, bless your brothers, and let"
- **in-his-words** (100.0) `each-soul-is-potentially-divine`: "Each soul is potentially divine. The goal is to manifest this divinity within by controlling nature, external and internal." -> CW vol 1, Concentration: its Practice: "Each soul is potentially divine. The goal is to manifest this Divinity within, by controlling nature, external and inter"
- **in-his-words** (100.0) `truth-can-be-stated-in-a-thousand-ways`: "Truth can be stated in a thousand different ways, yet each one can be true." -> CW vol 5, Sayings and Utterances: "Truth can be stated in a thousand different ways, yet each one can be true"
- **in-his-words** (100.0) `world-ready-to-give-up-its-secrets`: "The world is ready to give up its secrets if we only know how to knock, how to give it the necessary blow." -> CW vol 1, Introductory: "The world is ready to give up its secrets if we only know how to knock, how to give it the necessary blow"
- **in-his-words** (100.0) `never-mind-failures`: "Never mind failures; they are quite natural, they are the beauty of life, these failures." -> CW vol 2, God in Everything: "Never mind failures; they are quite natural, they are the beauty of life, these failures"

### 2c. Gita bridge ("Lines Swamiji lived by")

- Gita 2.3 `क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते ।`: his words "If one reads this one Shloka" (CW vol 4, Thoughts on the Gita, translated from Bengali)
  - en: He says this one verse holds the whole message of the Gita: get up, and drop the faint heart.
  - hi: वे कहते हैं कि इस एक श्लोक में पूरी गीता का संदेश है: कमज़ोरी छोड़ो और उठो।
- Gita 2.47 `कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।`: his words "To work we have the right, but not to the fruits thereof" (CW vol 1, Karma in its Effect on Character)
  - en: The verse he builds Karma Yoga on: do the work, leave the result.
  - hi: कर्मयोग की नींव यही श्लोक है: काम करो, फल की चिंता छोड़ो।
- Gita 2.40 `स्वल्पमप्यस्य धर्मस्य त्रायते महतो भयात् ॥`: his words "Even the least bit done of this religion saves from great fear" (CW vol 3, The Sages of India)
  - en: Even a small start on this path protects you from great fear.
  - hi: इस रास्ते पर छोटा सा कदम भी बड़े डर से बचा लेता है।
- Gita 4.7 `यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।`: his words "Whenever virtue subsides and immorality abounds, I take human form." (CW vol 1, Mohammed)
  - en: Krishna's promise to return whenever dharma falls, which he quotes in several lectures.
  - hi: जब-जब धर्म घटता है, कृष्ण लौटने का वचन देते हैं। स्वामीजी ने इसे कई व्याख्यानों में दोहराया।
- Gita 2.23 `नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः ।`: his words "This Self, weapons cannot pierce, nor fire can burn, water cannot wet, nor air can dry up." (CW vol 3, The Vedanta)
  - en: The Self no weapon can cut. He uses it to tell people they are stronger than they think.
  - hi: आत्मा को कोई शस्त्र नहीं काट सकता। स्वामीजी इससे बताते हैं कि हम सोच से ज़्यादा मज़बूत हैं।
- Gita 13.29 `समं पश्यन्हि सर्वत्र समवस्थितमीश्वरम् ।`: his words "Thus seeing the same Lord equally present everywhere, the sage does not injure the Self by the self" (CW vol 3, The Sages of India)
  - en: Seeing the same Lord in everyone, you stop harming yourself by harming others.
  - hi: सब में एक ही ईश्वर को देखने वाला दूसरों को चोट पहुँचाकर खुद को चोट नहीं पहुँचाता।

Page copy (titles, quick answers, FAQs) is in `frontend/src/lib/funnels/sayings/copy-viv.ts`. Check the dates: 12 Jan 1863 birth, National Youth Day since 1985, 11 Sep 1893 Chicago, 4 Jul 1902 death.

## 3. Kabir (50 dohe)

- **guru-govind-dou-khade** [guru; found in: kavita-kaumudi; record kabir.kk.1]
  - गुरु गोविंद दोऊ खड़े काके लागू पाँय। बलिहारी गुरु आपने जिन गोविंद दिया बताय॥
  - roman: guru goviṁd doū khaṛe kāke lāgū pāṁy balihārī guru āpane jin goviṁd diyā batāy
  - hi: गुरु और भगवान दोनों सामने हों तो पहले गुरु को प्रणाम, क्योंकि उन्होंने ही भगवान तक पहुँचाया।
  - en: If guru and God both stood before me, I would bow to the guru first. He showed me God.
  - words: गोविंद = भगवान / God; काके = किसके / whose; पाँय = पैर / feet; बलिहारी = न्योछावर / I give myself to; बताय = दिखा दिया / showed
- **pothi-padh-padh-jag-mua** [prem; found in: kavita-kaumudi; record kabir.kkdv.210]
  - पोथी पढ़-पढ़ जग मुआ, पंडित भया न कोय। ढाई आखर प्रेम का, पढ़ै सो पंडित होय॥
  - roman: pothī paṛh-paṛh jag muā, paṁḍit bhayā na koy ḍhāī ākhar prem kā, paṛhai so paṁḍit hoy
  - hi: किताबें पढ़-पढ़कर दुनिया थक गई, कोई ज्ञानी न बना। प्रेम के ढाई अक्षर पढ़ ले, वही ज्ञानी है।
  - en: The world died reading books and no one became wise. Learn the two and a half letters of love.
  - words: पोथी = किताब, ग्रंथ / scripture, book; मुआ = मर गया / died; पंडित = ज्ञानी / learned one; आखर = अक्षर / letters
  - typo fixed: ढ़ाई -> ढाई, पंड़ित -> पंडित
- **kal-kare-so-aaj-kar** [samay; found in: kavita-kaumudi; record kabir.kkdv.24]
  - काल करे सो आज कर, आज करे सो अब। पल में प्रलय होएगी, बहुरि करेगा कब॥
  - roman: kāl kare so āj kar, āj kare so ab pal meṁ pralay hoegī, bahuri karegā kab
  - hi: कल का काम आज करो, आज का अभी। पल भर में सब खत्म हो सकता है, फिर कब करोगे।
  - en: Do tomorrow's work today and today's work now. The end can come in a moment.
  - words: काल = कल / tomorrow; प्रलय = अंत, विनाश / the end; बहुरि = फिर / then, again
- **dheere-dheere-re-mana** [samay; found in: sung; record kabir.kkdv.12]
  - धीरे-धीरे रे मना, धीरे सब कुछ होय। माली सींचे सौ घड़ा, ॠतु आए फल होय॥
  - roman: dhīre-dhīre re manā, dhīre sab kuch hoy mālī sīṁce sau ghaṛā, ṝtu āe phal hoy
  - hi: मन, धीरज रखो। माली सौ घड़े पानी डाले, फल तो मौसम आने पर ही लगेगा।
  - en: Slowly, mind, everything comes slowly. Water the tree a hundred times, it fruits in its season.
  - words: मना = मन / mind; सींचे = पानी दे / waters; ॠतु = मौसम / season
- **bura-jo-dekhan-main-chala** [vani; found in: kavita-kaumudi; record kabir.kk.146]
  - बुरा जो देखन मैं चला बुरा न मिलिया कोय। जो दिल खोजौं आपना मुझसा बुरा न कोय॥
  - roman: burā jo dekhan maiṁ calā burā na miliyā koy jo dil khojauṁ āpanā mujhasā burā na koy
  - hi: मैं बुरा आदमी ढूँढने निकला, कोई न मिला। अपने भीतर झाँका तो मुझसे बुरा कोई नहीं था।
  - en: I went looking for a bad person and found none. When I searched my own heart, no one was worse.
  - words: देखन = देखने / to look for; मिलिया = मिला / found; खोजौं = खोजा / searched
- **aisi-bani-boliye** [vani; found in: kavita-kaumudi; record kabir.kk.120]
  - ऐसी बानी बोलिये मन का आपा खोय। औरन को सीतल करै आपहुँ सीतल होय॥
  - roman: aisī bānī boliye man kā āpā khoy auran ko sītal karai āpahuṁ sītal hoy
  - hi: ऐसी बात बोलो जिसमें अहंकार न हो। वह सुनने वाले को ठंडक दे और तुम्हें भी।
  - en: Speak words that drop your ego. They cool the one who hears them, and cool you too.
  - words: बानी = वाणी, बोली / speech; आपा = अहंकार / ego; औरन = दूसरों / others; सीतल = ठंडा, शांत / cool, calm
- **bada-hua-to-kya-hua** [vani; found in: kavita-kaumudi; record kabir.kk.150]
  - बड़ा हुआ तो क्या हुआ जैसे पेड़ खजूर। पंछी को छाया नहीं फल लागे अति दूर॥
  - roman: baṛā huā to kyā huā jaise peṛ khajūr paṁchī ko chāyā nahīṁ phal lāge ati dūr
  - hi: खजूर के पेड़ जैसा बड़ा होने से क्या फ़ायदा। न पंछी को छाया, न फल किसी की पहुँच में।
  - en: What use is being tall like a date palm? No shade for birds, and its fruit hangs out of reach.
  - words: खजूर = खजूर का पेड़ / date palm; पंछी = पक्षी / bird; अति = बहुत / very
- **sai-itna-dijiye** [prem; found in: kavita-kaumudi; record kabir.kkdv.8]
  - साईं इतना दीजिये, जा में कुटुम समाय। मैं भी भूखा न रहूँ, साधु ना भूखा जाय॥
  - roman: sāīṁ itanā dījiye, jā meṁ kuṭum samāy maiṁ bhī bhūkhā na rahūṁ, sādhu nā bhūkhā jāy
  - hi: भगवान, बस इतना देना कि परिवार पल जाए। न मैं भूखा रहूँ, न द्वार पर आया साधु।
  - en: Lord, give me just enough for my family, so neither I nor a guest at my door goes hungry.
  - words: साईं = स्वामी, भगवान / Lord; कुटुम = परिवार / family; समाय = समा जाए / fits, is provided for
- **mala-pherat-jug-bhaya** [sach; found in: sung; record kabir.kkdv.3]
  - माला फेरत जुग भया, फिरा न मन का फेर। कर का मन का डार दें, मन का मनका फेर॥
  - roman: mālā pherat jug bhayā, phirā na man kā pher kar kā man kā ḍār deṁ, man kā manakā pher
  - hi: माला फेरते युग बीत गया, मन नहीं बदला। हाथ की माला छोड़ो, मन के मनके फेरो।
  - en: Ages spent turning prayer beads, and the mind never turned. Drop the beads, turn the mind.
  - words: माला = जप की माला / rosary; जुग = युग / an age; फेर = चक्कर, बदलाव / turning; मनका = माला का दाना / bead
- **jati-na-poochho-sadhu-ki** [sach; found in: kavita-kaumudi; record kabir.kk.78]
  - जाति न पूछो साधु की, पूछ लीजिये ज्ञान। मोल करो तरवार का, पड़ा रहन दो म्यान॥
  - roman: jāti na pūcho sādhu kī, pūch lījiye jñān mol karo taravār kā, paṛā rahan do myān
  - hi: साधु की जाति मत पूछो, उसका ज्ञान पूछो। मोल तलवार का होता है, म्यान का नहीं।
  - en: Do not ask a sage his caste, ask what he knows. Value the sword, let the sheath lie.
  - words: साधु = संत / holy person; मोल = कीमत / price; तरवार = तलवार / sword; म्यान = तलवार का खोल / sheath
- **dukh-mein-sumiran-sab-kare** [prem; found in: kavita-kaumudi; record kabir.kkdv.1]
  - दुख में सुमरिन सब करे, सुख में करे न कोय। जो सुख में सुमरिन करे, दुख काहे को होय॥
  - roman: dukh meṁ sumarin sab kare, sukh meṁ kare na koy jo sukh meṁ sumarin kare, dukh kāhe ko hoy
  - hi: दुख में सब भगवान को याद करते हैं, सुख में कोई नहीं। सुख में याद करें तो दुख क्यों आए।
  - en: Everyone remembers God in pain, no one in comfort. Remember Him in comfort and pain will not come.
  - words: सुमरिन = याद, स्मरण / remembering God; काहे = क्यों / why
- **kasturi-kundal-base** [prem; found in: kavita-kaumudi; record kabir.kkdv.169]
  - कस्तूरी कुन्डल बसे, म्रग ढूंढे बन माहिं। ऐसे घट-घट राम है, दुनिया देखे नाहिं॥
  - roman: kastūrī kunḍal base, mrag ḍhūṁḍhe ban māhiṁ aise ghaṭ-ghaṭ rām hai, duniyā dekhe nāhiṁ
  - hi: कस्तूरी हिरन की नाभि में है, पर वह जंगल में ढूँढता है। वैसे ही राम हर दिल में है।
  - en: The musk is in the deer's own navel, yet it searches the forest. Ram lives in every heart.
  - words: कस्तूरी = हिरन की सुगंध / musk; कुन्डल = नाभि / navel; म्रग = हिरन / deer; घट = शरीर, दिल / body, heart
  - typo fixed: ढ़ूंढ़े -> ढूंढे
- **nindak-niyare-rakhiye** [vani; found in: kavita-kaumudi; record kabir.kkdv.421]
  - निंदक नियारे राखिये, आंगन कुटि छबाय। बिन पाणी बिन सबुना, निरमल करै सुभाय॥
  - roman: niṁdak niyāre rākhiye, āṁgan kuṭi chabāy bin pāṇī bin sabunā, niramal karai subhāy
  - hi: आलोचक को पास रखो, आँगन में कुटिया बनाकर। वह बिना पानी-साबुन तुम्हारा स्वभाव साफ़ करता है।
  - en: Keep your critic close, give him a hut in your courtyard. Without soap or water he cleans your nature.
  - words: निंदक = बुराई करने वाला / critic; नियारे = पास / near; कुटि = कुटिया / hut; सबुना = साबुन / soap; सुभाय = स्वभाव / nature
- **chalti-chakki-dekh-ke** [samay; found in: sung; record kabir.kkdv.187]
  - चलती चक्की देख के, दिया कबीरा रोय। दुइ पट भीतर आइके, साबित बचा न कोय॥
  - roman: calatī cakkī dekh ke, diyā kabīrā roy dui paṭ bhītar āike, sābit bacā na koy
  - hi: चलती चक्की देखकर कबीर रो पड़े। दो पाटों के बीच आकर कोई दाना साबुत नहीं बचता।
  - en: Kabir wept at the turning millstones. Between the two stones, no grain comes out whole.
  - words: चक्की = आटा पीसने की चक्की / grinding mill; पट = पाट, पत्थर / millstone; साबित = साबुत, पूरा / whole
- **mati-kahe-kumhar-se** [samay; found in: kavita-kaumudi; record kabir.kkdv.18]
  - माटी कहे कुम्हार से, तु क्या रौंदे मोय। एक दिन ऐसा आएगा, मैं रौंदूंगी तोय॥
  - roman: māṭī kahe kumhār se, tu kyā rauṁde moy ek din aisā āegā, maiṁ rauṁdūṁgī toy
  - hi: मिट्टी कुम्हार से कहती है: आज तू मुझे रौंद रहा है, एक दिन मैं तुझे रौंदूँगी।
  - en: The clay tells the potter: you knead me today. One day I will lie over you.
  - words: माटी = मिट्टी / clay, earth; रौंदे = पैरों से कुचले / treads; मोय = मुझे / me; तोय = तुझे / you
- **pani-kera-budbuda** [samay; found in: kavita-kaumudi; record kabir.kkdv.211]
  - पानी केरा बुदबुदा, अस मानस की जात। देखत ही छिप जाएगा, ज्यों तारा परभात॥
  - roman: pānī kerā budabudā, as mānas kī jāt dekhat hī chip jāegā, jyoṁ tārā parabhāt
  - hi: इंसान का जीवन पानी के बुलबुले जैसा है। जैसे सुबह होते ही तारा छिप जाता है, वैसे ही चला जाएगा।
  - en: A human life is a bubble on water. It vanishes the way stars fade at dawn.
  - words: केरा = का / of; बुदबुदा = बुलबुला / bubble; मानस = मनुष्य / human; परभात = सुबह / dawn
  - typo fixed: ज्यों सारा परभात -> ज्यों तारा परभात
- **tinka-kabahu-na-nindiye** [vani; found in: kavita-kaumudi; record kabir.kkdv.2]
  - तिनका कबहुँ न निंदिये, जो पाँयन तर होय। कबहुँ उड़ आँखिन परे, पीर घनेरी होय॥
  - roman: tinakā kabahuṁ na niṁdiye, jo pāṁyan tar hoy kabahuṁ uṛ āṁkhin pare, pīr ghanerī hoy
  - hi: पैरों के नीचे पड़े तिनके को भी छोटा मत समझो। उड़कर आँख में पड़े तो बहुत दर्द देता है।
  - en: Never scorn the straw under your feet. If it flies into your eye, it hurts badly.
  - words: तिनका = घास का टुकड़ा / straw; निंदिये = बुराई करें / scorn; तर = नीचे / under; पीर = दर्द / pain; घनेरी = बहुत / great
- **saat-samand-ki-masi-karaun** [prem; found in: granthavali; record kabir.sdg.सम्रथाई.2]
  - सात समंद की मसि करौं, लेखनि सब बनराइ। धरती सब कागद करौं, तऊ हरि गुण लिख्या न जाइ॥
  - roman: sāt samaṁd kī masi karauṁ, lekhani sab banarāi dharatī sab kāgad karauṁ, taū hari guṇ likhyā na jāi
  - hi: सातों समुद्र की स्याही, सारे जंगल की कलम, धरती का कागज़, फिर भी हरि के गुण न लिखे जाएं।
  - en: Make ink of the seven seas, pens of every forest, paper of the earth, and God's qualities still go unwritten.
  - words: समंद = समुद्र / sea; मसि = स्याही / ink; लेखनि = कलम / pen; बनराइ = जंगल / forest; कागद = कागज़ / paper
- **jahan-daya-tah-dharm-hai** [vani; found in: kavita-kaumudi; record kabir.kk.145]
  - जहाँ दया तह धर्म है जहाँ लोभ तह पाप। जहाँ क्रोध तह काल है जहाँ छिमा तहाँ आप॥
  - roman: jahāṁ dayā tah dharm hai jahāṁ lobh tah pāp jahāṁ krodh tah kāl hai jahāṁ chimā tahāṁ āp
  - hi: जहाँ दया है वहाँ धर्म, जहाँ लालच वहाँ पाप। जहाँ गुस्सा वहाँ नाश, जहाँ माफ़ी वहाँ भगवान।
  - en: Where there is kindness there is dharma, where greed, sin. Anger brings ruin. Where there is forgiveness, God is there.
  - words: तह = वहाँ / there; लोभ = लालच / greed; काल = मौत, नाश / death, ruin; छिमा = क्षमा, माफ़ी / forgiveness; आप = स्वयं भगवान / God himself
- **guru-kumhar-sish-kumbh-hai** [guru; found in: sung; record kabir.kkdv.439]
  - गुरु कुम्हार सिष कुंभ है, गढ़ि-गढ़ि काढ़ै खोट। अन्तर हाथ सहार दै, बाहर बाहै चोट॥
  - roman: guru kumhār siṣ kuṁbh hai, gaṛhi-gaṛhi kāṛhai khoṭ antar hāth sahār dai, bāhar bāhai coṭ
  - hi: गुरु कुम्हार है, शिष्य घड़ा। भीतर हाथ से सहारा देता है, बाहर से चोट करके कमियाँ निकालता है।
  - en: The guru is a potter, the student a pot. One hand supports from inside while the other taps out flaws.
  - words: सिष = शिष्य / student; कुंभ = घड़ा / pot; गढ़ि = गढ़कर, बनाकर / shaping; खोट = कमी / flaw; बाहै = मारे / strikes
- **mangan-maran-saman-hai** [sach; found in: sung; record kabir.kkdv.25]
  - माँगन मरण समान है, मति माँगो कोई भीख। माँगन से तो मरना भला, यह सतगुरु की सीख॥
  - roman: māṁgan maraṇ samān hai, mati māṁgo koī bhīkh māṁgan se to maranā bhalā, yah sataguru kī sīkh
  - hi: माँगना मरने जैसा है, किसी से भीख मत माँगो। माँगने से मरना अच्छा, यही गुरु की सीख है।
  - en: Begging is like dying, so ask no one for alms. Better to die than to beg, the guru teaches.
  - words: माँगन = माँगना / begging; मरण = मौत / death; मति = मत / do not; सीख = शिक्षा / teaching
- **sanch-barabar-tap-nahin** [sach; found in: kavita-kaumudi; record kabir.kkdv.320]
  - सांच बराबर तप नहीं, झूठ बराबर पाप। जाके हिरदै में सांच है, ताके हिरदै हरि आप॥
  - roman: sāṁc barābar tap nahīṁ, jhūṭh barābar pāp jāke hiradai meṁ sāṁc hai, tāke hiradai hari āp
  - hi: सच जैसी कोई तपस्या नहीं, झूठ जैसा कोई पाप नहीं। जिसके दिल में सच है, उसमें भगवान रहते हैं।
  - en: No penance equals truth, no sin equals a lie. God lives in the heart that holds truth.
  - words: सांच = सच / truth; तप = तपस्या / penance; हिरदै = दिल / heart
- **loot-sake-to-loot-le** [prem; found in: sung; record kabir.kkdv.9]
  - लूट सके तो लूट ले, राम नाम की लूट। पाछे फिरे पछताओगे, प्राण जाहिं जब छूट॥
  - roman: lūṭ sake to lūṭ le, rām nām kī lūṭ pāche phire pachatāoge, prāṇ jāhiṁ jab chūṭ
  - hi: राम नाम खुला बँट रहा है, जितना ले सको ले लो। प्राण छूटने पर पछताओगे।
  - en: Ram's name is free for the taking, take all you can. You will regret it when life slips away.
  - words: लूट = खुली बाँट / free for all; पाछे = बाद में / later; प्राण = जान / life breath
- **prem-na-badi-upjai** [prem; found in: kavita-kaumudi; record kabir.kkdv.64]
  - प्रेम न बाड़ी ऊपजै, प्रेम न हाट बिकाय। राजा-परजा जेहि रुचें, शीश देई ले जाय॥
  - roman: prem na bāṛī ūpajai, prem na hāṭ bikāy rājā-parajā jehi ruceṁ, śīś deī le jāy
  - hi: प्रेम न खेत में उगता है, न बाज़ार में बिकता है। राजा हो या प्रजा, सिर देकर ले जाए।
  - en: Love grows in no field and sells in no market. King or subject, pay with your ego.
  - words: बाड़ी = खेत, बगीचा / garden; हाट = बाज़ार / market; परजा = प्रजा, आम लोग / subjects; शीश = सिर, अहंकार / head, ego
- **raat-ganvai-soy-ke** [samay; found in: kavita-kaumudi; record kabir.kkdv.230]
  - रात गंवाई सोय के, दिवस गंवाया खाय। हीरा जन्म अनमोल था, कौड़ी बदले जाए॥
  - roman: rāt gaṁvāī soy ke, divas gaṁvāyā khāy hīrā janm anamol thā, kauṛī badale jāe
  - hi: रात सोने में और दिन खाने में गँवा दिया। हीरे जैसा अनमोल जन्म कौड़ी के भाव चला गया।
  - en: Nights lost to sleep, days to eating. A life worth a diamond went for a shell.
  - words: गंवाई = खो दी / wasted; दिवस = दिन / day; कौड़ी = सबसे छोटा सिक्का / a cowrie shell, almost nothing
  - typo fixed: कौंड़ी -> कौड़ी
- **achhe-din-pachhe-gaye** [samay; found in: kavita-kaumudi; record kabir.kk.18]
  - आछे दिन पाछे गये गुरु से किया न हेत। अब पछतावा क्या करै चिड़ियाँ चुग गई खेत॥
  - roman: āche din pāche gaye guru se kiyā na het ab pachatāvā kyā karai ciṛiyāṁ cug gaī khet
  - hi: अच्छे दिन बीत गए, गुरु से प्रेम नहीं किया। अब पछताने से क्या, चिड़िया खेत चुग गई।
  - en: The good days passed and I never loved the guru. Why regret now? The birds have eaten the field.
  - words: आछे = अच्छे / good; पाछे = पीछे / behind; हेत = प्रेम / love; चुग = दाना खा लेना / pecked clean
- **tera-sai-tujh-mein** [prem; found in: sung; record kabir.kkdv.95]
  - तेरा साँई तुझमें, ज्यों पहुपन में बास। कस्तूरी का हिरन ज्यों, फिर-फिर ढ़ूँढ़त घास॥
  - roman: terā sāṁī tujhameṁ, jyoṁ pahupan meṁ bās kastūrī kā hiran jyoṁ, phir-phir ṛhūṁṛhat ghās
  - hi: तेरा भगवान तुझमें है, जैसे फूल में खुशबू। कस्तूरी वाला हिरन फिर भी घास में ढूँढता फिरता है।
  - en: Your Lord is in you, like fragrance in a flower. Still, like the musk deer, you search the grass.
  - words: साँई = स्वामी, भगवान / Lord; पहुपन = फूलों / flowers; बास = खुशबू / fragrance
- **jyon-til-mahi-tel-hai** [prem; found in: sung; record kabir.kkdv.69]
  - ज्यों तिल मांही तेल है, ज्यों चकमक में आग। तेरा सांई तुझमें, बस जाग सके तो जाग॥
  - roman: jyoṁ til māṁhī tel hai, jyoṁ cakamak meṁ āg terā sāṁī tujhameṁ, bas jāg sake to jāg
  - hi: जैसे तिल में तेल और चकमक में आग, वैसे ही भगवान तुझमें है। जाग सके तो जाग।
  - en: Like oil in sesame and fire in flint, your Lord is in you. Wake up if you can.
  - words: तिल = तिल का बीज / sesame seed; मांही = में / inside; चकमक = आग वाला पत्थर / flint
- **kabira-aap-thagaiye** [vani; found in: kavita-kaumudi; record kabir.kkdv.175]
  - कबिरा आप ठगाइए, और न ठगिए कोय। आप ठगे सुख होत है, और ठगे दुख होय॥
  - roman: kabirā āp ṭhagāie, aur na ṭhagie koy āp ṭhage sukh hot hai, aur ṭhage dukh hoy
  - hi: खुद ठगे जाना ठीक, किसी को मत ठगो। खुद ठगे गए तो सुख मिलता है, दूसरे को ठगा तो दुख।
  - en: Let yourself be cheated, but cheat no one. Being cheated brings peace, cheating brings grief.
  - words: ठगाइए = ठगे जाइए / be cheated; ठगिए = ठगिए, धोखा दीजिए / cheat
- **sheelvant-sabse-bada** [vani; found in: sung; record kabir.kkdv.16]
  - शीलवन्त सबसे बड़ा, सब रतनन की खान। तीन लोक की सम्पदा, रही शील में आन॥
  - roman: śīlavant sabase baṛā, sab ratanan kī khān tīn lok kī sampadā, rahī śīl meṁ ān
  - hi: अच्छे स्वभाव वाला सबसे बड़ा है, वह सारे रत्नों की खान है। तीनों लोकों की दौलत शील में है।
  - en: The person of good character is greatest, a mine of every jewel. The wealth of three worlds lies in it.
  - words: शीलवन्त = अच्छे स्वभाव वाला / person of good character; रतनन = रत्नों / jewels; सम्पदा = दौलत / wealth
- **jo-toku-kanta-buvai** [vani; found in: kavita-kaumudi; record kabir.kkdv.190]
  - जो तोकूं काँटा बुवै, ताहि बोय तू फूल। तोकू फूल के फूल है, बाँकू है तिरशूल॥
  - roman: jo tokūṁ kāṁṭā buvai, tāhi boy tū phūl tokū phūl ke phūl hai, bāṁkū hai tiraśūl
  - hi: जो तुम्हारे लिए काँटे बोए, तुम उसके लिए फूल बोओ। तुम्हें फूल मिलेंगे, उसे काँटे।
  - en: If someone sows thorns for you, sow flowers for them. You reap flowers, they reap the thorns.
  - words: तोकूं = तुझे / for you; बुवै = बोए / sows; तिरशूल = काँटा, दुख / thorn, pain
- **pahan-puje-hari-milen** [sach; found in: kavita-kaumudi; record kabir.kkdv.212]
  - पाहन पूजे हरि मिलें, तो मैं पूजौं पहार। याते ये चक्की भली, पीस खाय संसार॥
  - roman: pāhan pūje hari mileṁ, to maiṁ pūjauṁ pahār yāte ye cakkī bhalī, pīs khāy saṁsār
  - hi: पत्थर पूजने से भगवान मिलें तो मैं पहाड़ पूजूँ। उससे तो चक्की भली, जिसका पिसा दुनिया खाती है।
  - en: If worshipping a stone found God, I would worship a mountain. Better the grinding stone that feeds the world.
  - words: पाहन = पत्थर / stone; पहार = पहाड़ / mountain; याते = इससे तो / rather than this
- **aaye-hain-so-jayenge** [samay; found in: kavita-kaumudi; record kabir.kkdv.144]
  - आए हैं सो जाएँगे, राजा रंक फकीर। एक सिंहासन चढ़ि चले, एक बाँधि जंजीर॥
  - roman: āe haiṁ so jāeṁge, rājā raṁk phakīr ek siṁhāsan caṛhi cale, ek bāṁdhi jaṁjīr
  - hi: जो आया है वह जाएगा, राजा हो, गरीब हो या फ़कीर। कोई सिंहासन पर जाता है, कोई ज़ंजीर में।
  - en: All who come will go, king, pauper or fakir. One leaves on a throne, another in chains.
  - words: रंक = गरीब / poor; फकीर = साधु / mendicant
- **guru-bin-gyan-na-upjai** [guru; found in: sung; record kabir.kkdv.444]
  - गुरु बिन ज्ञान न उपजै, गुरु बिन मिलै न मोष। गुरु बिन लखै न सत्य को, गुरु बिन मिटे न दोष॥
  - roman: guru bin jñān na upajai, guru bin milai na moṣ guru bin lakhai na saty ko, guru bin miṭe na doṣ
  - hi: गुरु बिना न ज्ञान आता है, न मुक्ति मिलती है, न सच दिखता है, न दोष मिटते हैं।
  - en: Without a guru no knowledge, no freedom. Without a guru you do not see truth or lose your faults.
  - words: उपजै = पैदा हो / arises; मोष = मोक्ष / liberation; लखै = देखे / sees
- **man-maila-tan-ujra** [sach; found in: sung; record kabir.kkdv.649]
  - मन मैला तन ऊजरा, बगुला कपटी अंग। तासों तो कौवा भला, तन मन एकहि रंग॥
  - roman: man mailā tan ūjarā, bagulā kapaṭī aṁg tāsoṁ to kauvā bhalā, tan man ekahi raṁg
  - hi: मन मैला और तन उजला, बगुले जैसा कपटी। उससे कौआ भला, जिसका तन और मन एक रंग का है।
  - en: Dirty mind, bright body, like the deceitful heron. The crow is better, one colour inside and out.
  - words: मैला = गंदा / dirty; ऊजरा = उजला, सफ़ेद / white; बगुला = सफ़ेद पक्षी / heron; कपटी = धोखेबाज़ / deceitful
- **birchha-kabahu-na-phal-bhakhai** [vani; found in: sung; record kabir.kkdv.571]
  - बिरछा कबहुँ न फल भखै, नदी न अंचय नीर। परमारथ के कारने, साधु धरा शरीर॥
  - roman: birachā kabahuṁ na phal bhakhai, nadī na aṁcay nīr paramārath ke kārane, sādhu dharā śarīr
  - hi: पेड़ अपना फल नहीं खाता, नदी अपना पानी नहीं पीती। संत दूसरों के भले के लिए शरीर धरते हैं।
  - en: A tree never eats its fruit, a river never drinks its water. Saints live for the good of others.
  - words: बिरछा = पेड़ / tree; भखै = खाए / eats; अंचय = पिए / drinks; परमारथ = दूसरों की भलाई / the good of others
- **durlabh-manush-janm-hai** [samay; found in: sung; record kabir.kkdv.22]
  - दुर्लभ मानुष जन्म है, देह न बारम्बार। तरुवर ज्यों पत्ती झड़े, बहुरि न लागे डार॥
  - roman: durlabh mānuṣ janm hai, deh na bārambār taruvar jyoṁ pattī jhaṛe, bahuri na lāge ḍār
  - hi: मनुष्य जन्म मुश्किल से मिलता है, बार-बार नहीं। जैसे झड़ा पत्ता फिर डाल पर नहीं लगता।
  - en: A human birth is rare and does not come again, as a fallen leaf never returns to the branch.
  - words: दुर्लभ = मुश्किल से मिलने वाला / rare; तरुवर = पेड़ / tree; डार = डाल / branch
- **sadhu-aisa-chahiye** [vani; found in: kavita-kaumudi; record kabir.kkdv.58]
  - साधु ऐसा चाहिए, जैसा सूप सुभाय। सार-सार को गहि रहे, थोथ देइ उड़ाय॥
  - roman: sādhu aisā cāhie, jaisā sūp subhāy sār-sār ko gahi rahe, thoth dei uṛāy
  - hi: सज्जन सूप जैसा हो: काम की बात रख ले और बेकार भूसा उड़ा दे।
  - en: Be like a winnowing basket: keep the grain, let the husk blow away.
  - words: सूप = अनाज फटकने वाला / winnowing basket; सुभाय = स्वभाव / nature; सार = असली चीज़ / essence; थोथ = भूसा, खोखली चीज़ / chaff
- **jab-main-tha-tab-hari-nahin** [prem; found in: granthavali; record kabir.sdg.विरह.14]
  - जब मैं था तब हरि नहीं, अब हरि हैं मैं नाहिं। सब अंधियारा मिटि गया, जब दीपक देख्या माहिं॥
  - roman: jab maiṁ thā tab hari nahīṁ, ab hari haiṁ maiṁ nāhiṁ sab aṁdhiyārā miṭi gayā, jab dīpak dekhyā māhiṁ
  - hi: जब तक "मैं" था, हरि नहीं थे। अब हरि हैं, "मैं" नहीं। भीतर दीपक देखा तो सारा अंधेरा मिट गया।
  - en: While I was there, God was not. Now God is and I am gone; the lamp within ended the dark.
  - words: हरि = भगवान / God; अंधियारा = अंधेरा / darkness; माहिं = भीतर / within
- **maya-mari-na-man-mara** [samay; found in: sung; record kabir.kkdv.17]
  - माया मरी न मन मरा, मर-मर गए शरीर। आशा तृष्णा न मरी, कह गए दास कबीर॥
  - roman: māyā marī na man marā, mar-mar gae śarīr āśā tṛṣṇā na marī, kah gae dās kabīr
  - hi: न माया मरी, न मन। शरीर मर-मरकर बदलते रहे, पर उम्मीद और प्यास कभी नहीं मरी।
  - en: Neither illusion nor mind died. Bodies died again and again, but hope and craving never did.
  - words: माया = मोह, भ्रम / illusion; तृष्णा = प्यास, लालसा / craving
- **aavat-gari-ek-hai** [vani; found in: kavita-kaumudi; record kabir.kkdv.142]
  - आवत गारी एक है, उलटन होय अनेक। कह कबीर नहिं उलटिये, वही एक की एक॥
  - roman: āvat gārī ek hai, ulaṭan hoy anek kah kabīr nahiṁ ulaṭiye, vahī ek kī ek
  - hi: आई हुई गाली एक होती है, पलटकर दो तो अनेक हो जाती हैं। मत पलटो, तो एक की एक रहेगी।
  - en: An insult comes as one. Throw it back and it multiplies. Do not return it, and it stays one.
  - words: आवत = आती हुई / coming; गारी = गाली / insult; उलटन = पलटकर देना / returning it
- **lali-mere-lal-ki** [prem; found in: kavita-kaumudi; record kabir.kk.114]
  - लाली मेरे लाल की जित देखों तित लाल। लाली देखन मैं गई मैं भी हो गई लाल॥
  - roman: lālī mere lāl kī jit dekhoṁ tit lāl lālī dekhan maiṁ gaī maiṁ bhī ho gaī lāl
  - hi: मेरे प्रिय की लाली जहाँ देखूँ वहीं है। उसे देखने गई तो मैं भी उसी रंग में रंग गई।
  - en: My Beloved's red is everywhere I look. I went to see it and turned red myself.
  - words: लाली = लाल रंग, प्रेम की चमक / redness, glow; लाल = प्रिय (भगवान) / the Beloved; जित = जहाँ / wherever; तित = वहाँ / there
- **kabir-jo-din-aaj-hai** [samay; found in: sung; record kabir.kkdv.765]
  - कबीर जो दिन आज है, सो दिन नहीं काल। चेति सकै तो चेत ले, मीच परी है ख्याल॥
  - roman: kabīr jo din āj hai, so din nahīṁ kāl ceti sakai to cet le, mīc parī hai khyāl
  - hi: जो दिन आज है वह कल नहीं रहेगा। संभल सको तो संभल जाओ, मौत ताक में बैठी है।
  - en: Today will not be here tomorrow. Wake up while you can, death keeps watch.
  - words: काल = आने वाला कल / tomorrow; चेति = सचेत होकर / waking up; मीच = मौत / death
- **kabir-yah-sansar-hai** [samay; found in: sung; record kabir.kkdv.767]
  - कबीर यह संसार है, जैसा सेमल फूल। दिन दस के व्यवहार में, झूठे रंग न भूल॥
  - roman: kabīr yah saṁsār hai, jaisā semal phūl din das ke vyavahār meṁ, jhūṭhe raṁg na bhūl
  - hi: यह दुनिया सेमल के फूल जैसी है, सुंदर पर खोखली। दस दिन के झूठे रंग में मत भूलो।
  - en: This world is a silk cotton flower, bright and empty. Do not lose yourself in ten days of false colour.
  - words: सेमल = रूई वाला लाल फूल / silk cotton flower; व्यवहार = लेन-देन / dealings
- **kabir-sangat-sadhu-ki** [guru; found in: kavita-kaumudi; record kabir.kk.81]
  - कबीर संगत साधु की ज्यों गंधी का बास। जो कछु गंधी दे नहीं तो भी बास सुबास॥
  - roman: kabīr saṁgat sādhu kī jyoṁ gaṁdhī kā bās jo kachu gaṁdhī de nahīṁ to bhī bās subās
  - hi: सज्जनों का साथ इत्र वाले की दुकान जैसा है। वह कुछ न भी दे, तो भी खुशबू मिल जाती है।
  - en: Good company is like a perfumer's shop. Even if he gives you nothing, you leave fragrant.
  - words: संगत = साथ / company; गंधी = इत्र बेचने वाला / perfumer; बास = खुशबू / fragrance
- **aag-jo-lagi-samudra-mein** [prem; found in: sung; record kabir.kkdv.106]
  - आग जो लागी समुद्र में, धुआँ न प्रकट होय। सो जाने जो जरमुआ, जाकी लाई होय॥
  - roman: āg jo lāgī samudr meṁ, dhuāṁ na prakaṭ hoy so jāne jo jaramuā, jākī lāī hoy
  - hi: समुद्र में लगी आग का धुआँ नहीं दिखता। उसे वही जानता है जो उसमें जल रहा है, या जिसने लगाई।
  - en: A fire in the sea shows no smoke. Only the one burning, or the one who lit it, knows.
  - words: प्रकट = दिखाई देना / visible; जरमुआ = जलकर मरा / the one burnt; लाई = लगाई / lit
- **karta-tha-so-kyon-kiya** [samay; found in: sung; record kabir.kkdv.168]
  - करता था सो क्यों किया, अब कर क्यों पछिताय। बोया पेड़ बबूल का, आम कहाँ से खाय॥
  - roman: karatā thā so kyoṁ kiyā, ab kar kyoṁ pachitāy boyā peṛ babūl kā, ām kahāṁ se khāy
  - hi: जो किया वह क्यों किया, अब पछताते क्यों हो। बबूल बोया है तो आम कहाँ से खाओगे।
  - en: Why do it, then regret it now? Plant a thorn tree and you will not eat mangoes.
  - words: पछिताय = पछताना / regret; बबूल = काँटेदार पेड़ / thorny acacia
- **durbal-ko-na-sataiye** [vani; found in: kavita-kaumudi; record kabir.kkdv.31]
  - दुर्बल को न सताइए, जाकी मोटी हाय। बिना जीव की हाय से, लोहा भस्म हो जाय॥
  - roman: durbal ko na satāie, jākī moṭī hāy binā jīv kī hāy se, lohā bhasm ho jāy
  - hi: कमज़ोर को मत सताओ, उसकी हाय बहुत भारी होती है। बेजान खाल की धौंकनी से भी लोहा पिघल जाता है।
  - en: Do not torment the weak; their sigh is heavy. Even a lifeless bellows of hide can melt iron.
  - words: दुर्बल = कमज़ोर / weak; हाय = आह, दुख की साँस / sigh of pain; भस्म = राख / ash
  - typo fixed: जाकि -> जाकी
- **sabte-laghutai-bhali** [vani; found in: sung; record kabir.kkdv.87]
  - सबते लघुताई भली, लघुता ते सब होय। जैसे दूज का चन्द्रमा, शीश नवे सब कोय॥
  - roman: sabate laghutāī bhalī, laghutā te sab hoy jaise dūj kā candramā, śīś nave sab koy
  - hi: सबसे भली है विनम्रता, छोटेपन से सब होता है। दूज के चाँद को सब सिर झुकाते हैं।
  - en: Humility is best, everything comes from it. Everyone bows to the slender second-day moon.
  - words: लघुताई = छोटापन, विनम्रता / humility; दूज = अमावस के बाद का दूसरा दिन / second day of the moon; नवे = झुकाए / bows
  - typo fixed: जौसे -> जैसे
- **sukhiya-sab-sansar-hai** [prem; found in: granthavali, kavita-kaumudi; record kabir.sdg.विरह.12]
  - सुखिया सब संसार है, खावै और सौवे। दुखिया दास कबीर है, जागे अरु रौवे॥
  - roman: sukhiyā sab saṁsār hai, khāvai aur sauve dukhiyā dās kabīr hai, jāge aru rauve
  - hi: सारी दुनिया सुखी है, खाती है और सोती है। दुखी तो कबीर है, जो जागता है और रोता है।
  - en: The whole world is happy, it eats and sleeps. Only Kabir is sad, awake and weeping for God.
  - words: सुखिया = सुखी / content; दुखिया = दुखी / sorrowful; रौवे = रोए / weeps

### 3a. Lines that mention नारी / नारि / कामिनी (15, all reviewed)

- **keep** kabir.kk.31: इक दिन ऐसा होयगा कोउ काहू का नाहिं। घर की नारी को कहै तन की नारी जाहि॥ (नारी here is the pulse (nadi) as well as the wife: a line on death, nothing against women.)
- **keep** kabir.kk.76: गांठी दाम न बांधई, नहिं नारी सों नेह। कह कबीर ता साध के, हम चरनन की खेह॥ (Describes a renunciant who keeps no money and no attachment. Aimed at the ascetic, not at women.)
- **exclude** kabir.kk.155: पर नारी पैनी छुरी मत कोइ लाबो अंग। रावन के दस सिर गये पर नारी के संग॥ (casts another man's wife as a "sharp knife", so the woman is the danger; the verse blames her, not the man's conduct.)
- **keep** kabir.kkdv.182: गाँठि न थामहिं बाँध ही, नहिं नारी सो नेह। कह कबीर वा साधु की, हम चरनन की खेह॥ (Variant of kk.76. Kept for the same reason.)
- **keep** kabir.kkdv.277: परनारी का राचणौ, जिसकी लहसण की खानि। खूणैं बेसिर खाइय, परगट होइ दिवानि॥ (Warns a man against chasing another's wife; the fault named is his.)
- **keep** kabir.kkdv.288: परनारी राता फिरैं, चोरी बिढ़िता खाहिं। दिवस चारि सरसा रहै, अति समूला जाहिं॥ (Men who chase other men's wives and live by theft come to ruin. Aimed at the men.)
- **keep** kabir.kkdv.377: गाँठी दाम न बांधई, नहिं नारी सों नेह। कह कबीर ता साध की, हम चरनन की खेह॥ (Variant of kk.76. Kept for the same reason.)
- **keep** kabir.kkdv.384: हैवर गैवर सघन धन, छत्रपती की नारि। तास पटेतर ना तुलै, हरिजन की पनिहारि॥ (Praises the water-carrier in a devotee's home over an emperor's queen. Honours a working woman.)
- **keep** kabir.kkdv.387: क्यूं नृप-नारी नींदिये, क्यूं पनिहारी कौ मान। वा माँग सँवारे पील कौ, या नित उठि सुमिरैराम॥ (Contrasts the queen's vanity with the water-carrier's remembrance of Ram. About devotion; kept, not featured.)
- **exclude** kabir.kkdv.517: कबीर गुरु की भक्ति बिन, नारी कूकरी होय। गली-गली भूँकत फिरै, टूक न डारै कोय॥ (says a woman without devotion to the guru becomes a dog barking from lane to lane. Demeaning.)
- **keep** kabir.kkdv.575: हयबर गयबर सधन धन, छत्रपति की नारि। तासु पटतरा न तुले, हरिजन की परिहारिन॥ (Variant of kkdv.384. Kept.)
- **keep** kabir.kkdv.576: क्यों नृपनारि निन्दिये, पनिहारी को मान। वह माँग सँवारे पीववहित, नित वह सुमिरे राम॥ (Variant of kkdv.387. Kept, not featured.)
- **keep** kabir.kkdv.619: जुवा चोरी मुखबिरी, ब्याज बिरानी नारि। जो चाहै दीदार को, इतनी वस्तु निवारि॥ (A list of a man's vices to give up (gambling, theft, usury, another's wife). Aimed at his conduct; kept, not featured.)
- **keep** kabir.kkdv.628: आसन तो इकान्त करैं, कामिनी संगत दूर। शीतल सन्त शिरोमनी, उनका ऐसा नूर॥ (Describes a renunciant who keeps away from worldly company. Ascetic discipline; kept, not featured.)
- **keep** kabir.kkdv.827: एक दिन ऐसा होयगा, कोय काहु का नाहिं। घर की नारी को कहै, तन की नारी जाहिं॥ (Same line as kk.31: the pulse leaves the body. Kept.)

Misfiled Rahim doha excluded: kabir.kkdv.241 (क्षमा बड़े न को उचित है, छोटे को उत्पात। कहा विष्णु का घटि गया, जो भुगु मारीलात॥). Famous dohe missing from the corpus and therefore not on the page: अति का भला न बोलना, जिन खोजा तिन पाइयाँ, मन के हारे हार है, हम घर जाल्या आपणाँ (NCERT), पखापखी के कारणैं (NCERT), प्रेमी ढूँढ़त मैं फिरौं (NCERT). Near-duplicates in the source set at 0.85 similarity: 84.

Roman transliteration is machine-made (word-final schwa dropped). Check a few for readability.

## 4. Chanakya Niti (61 verses)

- **1.12** [log, card] आतुरे व्यसने प्राप्ते दुर्भिक्षे शत्रुसङ्कटे । राजद्वारे श्मशाने च यस्तिष्ठति स बान्धवः ॥
  - hi: सच्चा अपना वही है जो बीमारी, मुसीबत, अकाल, दुश्मन के हमले, कचहरी और श्मशान में साथ खड़ा रहे।
  - en: Your own is whoever stands by you in illness, trouble, famine, attack, in court and at the cremation ground.
- **2.5** [log, card] परोक्षे कार्यहन्तारं प्रत्यक्षे प्रियवादिनम् । वर्जयेत्तादृशं मित्रं विषकुम्भं पयोमुखम् ॥
  - hi: जो पीठ पीछे काम बिगाड़े और सामने मीठा बोले, उसे छोड़ दो। वह ऊपर दूध, भीतर ज़हर का घड़ा है।
  - en: Drop the friend who is sweet to your face and works against you behind your back: poison under milk.
- **2.6** [log] न विश्वसेत्कुमित्रे च मित्रे चापि न विश्वसेत् । कदाचित्कुपितं मित्रं सर्वं गुह्यं प्रकाशयेत् ॥
  - hi: बुरे मित्र पर भरोसा मत करो, और अच्छे मित्र पर भी आँख मूँदकर नहीं। नाराज़ होकर वह सारे राज़ खोल सकता है।
- **2.19** [log] दुराचारी दुरादृष्टिर्दुरावासी च दुर्जनः । यन्मैत्री क्रियते पुंभिर्नरः शीघ्रं विनश्यति ॥
  - hi: जिसका आचरण बुरा, नज़र बुरी और ठिकाना बुरा हो, उससे दोस्ती करने वाला जल्दी बर्बाद होता है।
- **3.4** [log] दुर्जनस्य च सर्पस्य वरं सर्पो न दुर्जनः । सर्पो दंशति काले तु दुर्जनस्तु पदे पदे ॥
  - hi: दुष्ट और साँप में साँप बेहतर है। साँप समय आने पर डसता है, दुष्ट हर कदम पर।
- **1.16** [log] विषादप्यमृतं ग्राह्यममेध्यादपि काञ्चनम् । अमित्रादपि सद्वृत्तं बालादपि सुभाषितम् ॥
  - hi: ज़हर से भी अमृत ले लो, गंदगी से भी सोना। दुश्मन से भी अच्छा आचरण और बच्चे से भी अच्छी बात सीख लो।
  - en: Take nectar even from poison, gold even from dirt, good conduct even from a rival, good words even from a child.
- **7.10** [log] अनुलोमेन बलिनं प्रतिलोमेन दुर्जनम् । आत्मतुल्यबलं शत्रुं विनयेन बलेन वा ॥
  - hi: ताकतवर से उसके अनुकूल चलकर निपटो, दुष्ट से उलटकर, और बराबर वाले से विनम्रता या ताकत से।
- **14.4** [log] बहूनां चैव सत्त्वानां समवायो रिपुञ्जयः । वर्षाधाराधरो मेघस्तृणैरपि निवार्यते ॥
  - hi: बहुत से लोग मिल जाएं तो दुश्मन हार जाता है। तिनके मिलकर भी बारिश की धार रोक लेते हैं।
- **9.2** [log] परस्परस्य मर्माणि ये भाषन्ते नराधमाः । त एव विलयं यान्ति वल्मीकोदरसर्पवत् ॥
  - hi: जो एक-दूसरे की कमज़ोर नस का भेद खोलते हैं, वे बाँबी में घुसे साँप की तरह खुद नष्ट होते हैं।
- **14.9** [log] दूरस्थोऽपि न दूरस्थो यो यस्य मनसि स्थितः । यो यस्य हृदये नास्ति समीपस्थोऽपि दूरतः ॥
  - hi: जो मन में बसा है वह दूर रहकर भी पास है। जो दिल में नहीं, वह पास रहकर भी दूर है।
- **16.14** [log] प्रियवाक्यप्रदानेन सर्वे तुष्यन्ति जन्तवः । तस्मात्तदेव वक्तव्यं वचने का दरिद्रता ॥
  - hi: मीठे बोल से सब खुश होते हैं, इसलिए मीठा ही बोलो। बोलने में कंजूसी कैसी।
- **12.14** [log] मातृवत्परदारेषु परद्रव्येषु लोष्ट्रवत् । आत्मवत्सर्वभूतेषु यः पश्यति स पण्डितः ॥
  - hi: जो पराई स्त्री को माँ समान, पराए धन को मिट्टी समान और सबको अपने समान देखे, वही ज्ञानी है।
  - en: Wise is the one who sees another's wife as a mother, another's wealth as clay, and every being as himself.
- **4.18** [kaam, card] कः कालः कानि मित्राणि को देशः कौ व्ययागमौ । कश्चाहं का च मे शक्तिरिति चिन्त्यं मुहुर्मुहुः ॥
  - hi: बार-बार सोचो: समय कैसा है, मित्र कौन हैं, जगह कैसी है, आमदनी-खर्च कितना है, मेरी ताकत कितनी है।
  - en: Ask yourself often: the time, your friends, the place, money in and out, and your own strength.
- **2.7** [kaam] मनसा चिन्तितं कार्यं वाचा नैव प्रकाशयेत् । मन्त्रेण रक्षयेद्गूढं कार्ये चापि नियोजयेत् ॥
  - hi: मन में सोचा काम ज़ुबान पर मत लाओ। सलाह से उसे छिपाकर रखो और चुपचाप पूरा करो।
  - en: Do not speak the plan in your mind. Guard it with counsel and carry it out without telling anyone.
- **3.11** [kaam] उद्योगे नास्ति दारिद्र्यं जपतो नास्ति पातकम् । मौनेन कलहो नास्ति नास्ति जागरिते भयम् ॥
  - hi: मेहनत करने वाले के यहाँ गरीबी नहीं, जप करने वाले पर पाप नहीं, चुप रहने वाले से झगड़ा नहीं, जागने वाले को डर नहीं।
  - en: Effort leaves no room for poverty, japa none for sin, silence none for quarrels, alertness none for fear.
- **3.13** [kaam] को हि भारः समर्थानां किं दूरं व्यवसायिनाम् । को विदेशः सुविद्यानां कः परः प्रियवादिनाम् ॥
  - hi: समर्थ के लिए कौन सा बोझ भारी, मेहनती के लिए कौन सी जगह दूर, विद्वान के लिए कौन सा देश पराया।
- **6.16** [kaam, card] प्रभूतं कार्यमल्पं वा यन्नरः कर्तुमिच्छति । सर्वारम्भेण तत्कार्यं सिंहादेकं प्रचक्षते ॥
  - hi: काम छोटा हो या बड़ा, जो करना है उसे पूरी ताकत से करो। यह शेर से सीखो।
  - en: Big or small, put your full strength into whatever you set out to do. Learn this from the lion.
- **6.18** [kaam] प्रत्युत्थानं च युद्धं च संविभागं च बन्धुषु । स्वयमाक्रम्य भुक्तं च शिक्षेच्चत्वारि कुक्कुटात् ॥
  - hi: मुर्गे से चार बातें सीखो: समय पर उठना, डटकर लड़ना, अपनों में बाँटना, और अपनी मेहनत का खाना।
- **6.21** [kaam] सुश्रान्तोऽपि वहेद्भारं शीतोष्णं न च श्यति । सन्तुष्टश्चरते नित्यं त्रीणि शिक्षेच्च गर्दभात् ॥
  - hi: गधे से तीन बातें सीखो: थककर भी बोझ ढोना, सर्दी-गर्मी की परवाह न करना, और हमेशा संतुष्ट रहना।
- **7.12** [kaam, card] नात्यन्तं सरलैर्भाव्यं गत्वा पश्य वनस्थलीम् । छिद्यन्ते सरलास्तत्र कुब्जास्तिष्ठन्ति पादपाः ॥
  - hi: ज़रूरत से ज़्यादा सीधे मत बनो। जंगल में जाकर देखो, सीधे पेड़ काटे जाते हैं और टेढ़े खड़े रहते हैं।
  - en: Do not be too straight. In a forest the straight trees are cut first and the crooked ones stand.
- **13.7** [kaam] अनागतविधाता च प्रत्युत्पन्नमतिस्तथा । द्वावेतौ सुखमेधेते यद्भविष्यो विनश्यति ॥
  - hi: जो आगे की तैयारी रखे और मौके पर सूझ से काम ले, वह सुखी रहता है। "जो होगा देखा जाएगा" वाला डूबता है।
- **14.18** [kaam] तावन्मौनेन नीयन्ते कोकिलैश्चैव वासराः । यावत्सर्वजनानन्ददायिनी वाक्प्रवर्तते ॥
  - hi: कोयल तब तक चुप रहकर दिन बिताती है, जब तक उसकी आवाज़ सबको खुश करने लायक न हो जाए।
- **7.1** [kaam] अर्थनाशं मनस्तापं गृहे दुश्चरितानि च । वञ्चनं चापमानं च मतिमान्न प्रकाशयेत् ॥
  - hi: समझदार इंसान पैसे का नुकसान, मन का दुख, घर की बुरी बातें, धोखा और अपमान किसी को नहीं बताता।
- **16.6** [kaam, card] गुणैरुत्तमतां याति नोच्चैरासनसंस्थिताः । प्रासादशिखरस्थोऽपि काकः किं गरुडायते ॥
  - hi: इंसान गुणों से बड़ा बनता है, ऊँची कुर्सी से नहीं। महल की चोटी पर बैठा कौआ गरुड़ नहीं बन जाता।
  - en: Greatness comes from your qualities, not your seat. A crow on a palace roof does not become Garuda.
- **6.17** [kaam] इन्द्रियाणि च संयम्य रागद्वेषविवर्जितः । समदुःखसुखः शान्तः तत्त्वज्ञः साधुरुच्यते ॥
  - hi: जो इंद्रियों को साधे, राग और द्वेष से दूर रहे, सुख-दुख में एक जैसा और शांत रहे, वही सज्जन है।
- **1.7** [dhan] आपदर्थे धनं रक्षेच्छ्रीमतां कुत आपदः । कदाचिच्चलते लक्ष्मीः सञ्चितोऽपि विनश्यति ॥
  - hi: बुरे वक्त के लिए धन बचाकर रखो। अमीर पर भी मुसीबत आती है, और लक्ष्मी जाने लगे तो जमा पूँजी भी घटती है।
  - en: Save money for bad times. Trouble reaches the rich too, and when fortune turns, savings melt.
- **7.14** [dhan] उपार्जितानां वित्तानां त्याग एव हि रक्षणम् । तडागोदरसंस्थानां परीवाह इवाम्भसाम् ॥
  - hi: कमाए हुए धन की रक्षा उसे सही जगह खर्च करने से होती है, जैसे बहता पानी तालाब को साफ़ रखता है।
- **15.6** [dhan, card] अन्यायोपार्जितं द्रव्यं दश वर्षाणि तिष्ठति । प्राप्ते चैकादशे वर्षे समूलं तद्विनश्यति ॥
  - hi: गलत तरीके से कमाया धन दस साल टिकता है। ग्यारहवें साल वह जड़ समेत चला जाता है।
  - en: Money made unjustly stays ten years. In the eleventh it goes, taking the principal with it.
- **16.11** [dhan] अतिक्लेशेन यद्द्रव्यमतिलोभेन यत्सुखम् । शत्रूणां प्रणिपातेन ते ह्यर्था मा भवन्तु मे ॥
  - hi: जो धन बहुत कष्ट से, धर्म तोड़कर या दुश्मन के आगे झुककर मिले, वह मुझे नहीं चाहिए।
- **8.1** [dhan] अधमा धनमिच्छन्ति धनमानौ च मध्यमाः । उत्तमा मानमिच्छन्ति मानो हि महतां धनम् ॥
  - hi: नीच लोग सिर्फ़ धन चाहते हैं, मध्यम लोग धन और मान, उत्तम लोग सिर्फ़ मान। मान ही बड़ों का धन है।
- **5.11** [dhan] दारिद्र्यनाशनं दानं शीलं दुर्गतिनाशनम् । अज्ञाननाशिनी प्रज्ञा भावना भयनाशिनी ॥
  - hi: दान से गरीबी मिटती है, अच्छे आचरण से दुर्गति, समझ से अज्ञान, और सोच-विचार से डर।
- **7.2** [dhan] धनधान्यप्रयोगेषु विद्यासङ्ग्रहणे तथा । आहारे व्यवहारे च त्यक्तलज्जः सुखी भवेत् ॥
  - hi: लेन-देन, पढ़ाई, खाने और व्यवहार में जो शर्म छोड़ देता है, वह सुखी रहता है।
- **16.20** [dhan] पुस्तकस्था तु या विद्या परहस्तगतं धनं । कार्यकाले समुत्पन्ने न सा विद्या न तद्धनम् ॥
  - hi: किताब में बंद ज्ञान और दूसरे के हाथ में गया धन, ज़रूरत के वक्त न ज्ञान काम आता है, न धन।
- **5.7** [dhan] आलस्योपगता विद्या परहस्तगतं धनम् । अल्पबीजं हतं क्षेत्रं हतं सैन्यमनायकम् ॥
  - hi: आलस से विद्या, दूसरे के हाथ गया धन, कम बीज वाला खेत और बिना नेता की सेना, चारों बर्बाद होते हैं।
- **2.13** [vidya, card] श्लोकेन वा तदर्धेन तदर्धार्धाक्षरेण वा । अबन्ध्यं दिवसं कुर्याद्दानाध्ययनकर्मभिः ॥
  - hi: हर दिन कुछ सीखो: एक श्लोक, आधा, चौथाई या एक अक्षर ही सही। कोई दिन खाली न जाए।
  - en: Learn something each day, a verse, half a verse, even one letter. Let no day go empty.
- **4.5** [vidya] कामधेनुगुणा विद्या ह्यकाले फलदायिनी । प्रवासे मातृसदृशी विद्या गुप्तं धनं स्मृतम् ॥
  - hi: विद्या कामधेनु जैसी है, हर मौसम फल देती है। परदेस में माँ जैसी पालती है, यह छिपा हुआ धन है।
- **5.8** [vidya] अभ्यासाद्धार्यते विद्या कुलं शीलेन धार्यते । गुणेन ज्ञायते त्वार्यः कोपो नेत्रेण गम्यते ॥
  - hi: विद्या अभ्यास से टिकती है, कुल अच्छे स्वभाव से। सज्जन गुण से पहचाना जाता है, गुस्सा आँखों से।
- **8.20** [vidya] विद्वान्प्रशस्यते लोके विद्वान् सर्वत्र पूज्यते । विद्यया लभते सर्वं विद्या सर्वत्र पूज्यते ॥
  - hi: विद्वान की हर जगह तारीफ़ और इज़्ज़त होती है। विद्या से सब कुछ मिलता है।
- **10.1** [vidya] धनहीनो न हीनश्च धनिकः स सुनिश्चयः । विद्यारत्नेन हीनो यः स हीनः सर्ववस्तुषु ॥
  - hi: जिसके पास धन नहीं, वह गरीब नहीं। जिसके पास विद्या रूपी रत्न नहीं, वह हर तरह से गरीब है।
- **10.3** [vidya, card] सुखार्थी चेत्त्यजेद्विद्यां विद्यार्थी चेत्त्यजेत्सुखम् । सुखार्थिनः कुतो विद्या सुखं विद्यार्थिनः कुतः ॥
  - hi: आराम चाहिए तो पढ़ाई छोड़ो, पढ़ना है तो आराम छोड़ो। आराम चाहने वाले को विद्या कहाँ।
  - en: Want comfort, give up study. Want to learn, give up comfort. Whoever chases comfort never gets learning.
- **10.9** [vidya] यस्य नास्ति स्वयं प्रज्ञा शास्त्रं तस्य करोति किम् । लोचनाभ्यां विहीनस्य दर्पणः किं करिष्यति ॥
  - hi: जिसकी अपनी समझ नहीं, शास्त्र उसका क्या करेंगे। अंधे के लिए शीशा किस काम का।
- **13.17** [vidya] खनित्वा हि खनित्रेण भूतले वारि विन्दति । तथा गुरुगतां विद्यां शुश्रूषुरधिगच्छति ॥
  - hi: जैसे फावड़े से खोदकर पानी मिलता है, वैसे ही सेवा करने वाला शिष्य गुरु का ज्ञान पाता है।
- **12.22** [vidya] जलबिन्दुनिपातेन क्रमशः पूर्यते घटः । स हेतुः सर्वविद्यानां धर्मस्य च धनस्य च ॥
  - hi: बूँद-बूँद से घड़ा भरता है। विद्या, धर्म और धन भी ऐसे ही धीरे-धीरे जुड़ते हैं।
  - en: Drop by drop the pot fills. Learning, dharma and wealth gather the same way.
- **5.15** [vidya] विद्या मित्रं प्रवासे च भार्या मित्रं गृहेषु च । व्याधितस्यौषधं मित्रं धर्मो मित्रं मृतस्य च ॥
  - hi: परदेस में विद्या मित्र है, घर में जीवनसाथी, बीमार के लिए दवा, और मरने के बाद धर्म।
- **3.14** [vidya] एकेनापि सुवृक्षेण पुष्पितेन सुगन्धिना । वासितं तद्वनं सर्वं सुपुत्रेण कुलं यथा ॥
  - hi: एक ही फूलों वाला खुशबूदार पेड़ पूरे जंगल को महका देता है, वैसे ही एक अच्छी संतान पूरे कुल को।
- **13.2** [man, card] गते शोको न कर्तव्यो भविष्यं नैव चिन्तयेत् । वर्तमानेन कालेन वर्तयन्ति विचक्षणाः ॥
  - hi: बीते का शोक मत करो, आने वाले की चिंता मत करो। समझदार लोग वर्तमान में जीते हैं।
  - en: Grieve no more for the past, worry no more over the future; the wise live in the present.
- **6.7** [man] कालः पचति भूतानि कालः संहरते प्रजाः । कालः सुप्तेषु जागर्ति कालो हि दुरतिक्रमः ॥
  - hi: समय सबको पकाता है, सबको मिटाता है। सब सो जाएं, समय जागता रहता है। उसे कोई पार नहीं कर सकता।
- **6.9** [man] स्वयं कर्म करोत्यात्मा स्वयं तत्फलमश्नुते । स्वयं भ्रमति संसारे स्वयं तस्माद्विमुच्यते॥
  - hi: इंसान खुद कर्म करता है, खुद फल भोगता है। खुद संसार में भटकता है और खुद ही छूटता है।
- **5.12** [man] नास्ति कामसमो व्याधिर्नास्ति मोहसमो रिपुः । नास्ति कोपसमो वह्निर्नास्ति ज्ञानात्परं सुखम् ॥
  - hi: वासना जैसी कोई बीमारी नहीं, मोह जैसा कोई दुश्मन नहीं, क्रोध जैसी कोई आग नहीं, ज्ञान से बड़ा कोई सुख नहीं।
- **5.19** [man] सत्येन धार्यते पृथ्वी सत्येन तपते रविः । सत्येन वाति वायुश्च सर्वं सत्ये प्रतिष्ठितम् ॥
  - hi: सत्य से धरती टिकी है, सत्य से सूरज तपता है, सत्य से हवा चलती है। सब सत्य पर टिका है।
- **5.20** [man] चला लक्ष्मीश्चलाः प्राणाश्चले जीवितमन्दिरे । चलाचले च संसारे धर्म एको हि निश्चलः ॥
  - hi: धन चंचल है, प्राण चंचल हैं, जीवन और घर भी। इस बदलती दुनिया में बस धर्म स्थिर है।
- **13.6** [man] यस्य स्नेहो भयं तस्य स्नेहो दुःखस्य भाजनम् । स्नेहमूलानि दुःखानि तानि त्यक्त्वा वसेत् सुखम् ॥
  - hi: जिससे मोह है, उसी से डर है। मोह दुख का बर्तन है। मोह छोड़ो तो सुख से जियो।
- **13.14** [man] ईप्सितं मनसः सर्वं कस्य सम्पद्यते सुखम् । दैवायत्तं यतः सर्वं तस्मात्सन्तोषमाश्रयेत् ॥
  - hi: मन की हर इच्छा किसकी पूरी होती है। सब कुछ भाग्य के हाथ में है, इसलिए संतोष रखो।
- **12.12** [man] अनित्यानि शरीराणि विभवो नैव शाश्वतः । नित्यं संनिहितो मृत्युः कर्तव्यो धर्मसङ्ग्रहः ॥
  - hi: शरीर हमेशा नहीं रहता, धन भी नहीं। मौत हमेशा पास है, इसलिए अच्छे काम अभी करो।
- **4.4** [man] यावत्स्वस्थो ह्ययं देहो यावन्मृत्युश्च दूरतः । तावदात्महितं कुर्यात्प्राणान्ते किं करिष्यति ॥
  - hi: जब तक शरीर स्वस्थ है और मौत दूर है, तब तक अपना भला कर लो। आखिरी साँस पर क्या करोगे।
- **14.7** [man] उत्पन्नपश्चात्तापस्य बुद्धिर्भवति यादृशी । तादृशी यदि पूर्वं स्यात्कस्य न स्यान्महोदयः ॥
  - hi: पछतावे के बाद जो समझ आती है, वह पहले आ जाए तो किसकी तरक्की न हो।
- **7.17** [man] अत्यन्तकोपः कटुका च वाणी दरिद्रता च स्वजनेषु वैरम् । नीचप्रसंगः कुलहीनसेवा चिह्नानि देहे नरकस्थितानाम् ॥
  - hi: बहुत गुस्सा, कड़वी बोली, अपनों से बैर, बुरी संगत: ऐसे इंसान का जीवन धरती पर ही नरक है।
- **15.1** [man] यस्य चित्तं द्रवीभूतं कृपया सर्वजन्तुषु । तस्य ज्ञानेन मोक्षेण किं जटाभस्मलेपनैः ॥
  - hi: जिसका मन सब जीवों के लिए दया से पिघलता है, उसे जटा, भस्म या दिखावे की क्या ज़रूरत।
- **17.15** [man] परोपकरणं येषां जागर्ति हृदये सताम् । नश्यन्ति विपदस्तेषां सम्पदः स्युः पदे पदे ॥
  - hi: जिन सज्जनों के दिल में दूसरों की भलाई जागती है, उनकी मुसीबतें मिटती हैं और कदम-कदम पर संपत्ति मिलती है।
- **12.11** [man] सत्यं माता पिता ज्ञानं धर्मो भ्राता दया सखा । शान्तिः पत्नी क्षमा पुत्रः षडेते मम बान्धवाः ॥
  - hi: सत्य मेरी माँ है, ज्ञान पिता, धर्म भाई, दया मित्र, शांति जीवनसाथी, क्षमा पुत्र। यही मेरे छह अपने हैं।
- **1.8** [man] यस्मिन्देशे न सम्मानो न वृत्तिर्न च बान्धवाः । न च विद्यागमोऽप्यस्ति वासं तत्र न कारयेत् ॥
  - hi: जहाँ न इज़्ज़त हो, न रोज़गार, न अपने लोग, न सीखने का मौका, वहाँ मत रहो।

### 4a. Situation picker

- नई नौकरी या नया काम (A new job): 4.18, 2.7, 14.18
- कोई प्रतिद्वंद्वी (A rival): 7.10, 1.16, 14.4
- पैसे की बात (Money): 1.7, 7.14, 15.6
- दोस्त ने साथ छोड़ा (A friend who let you down): 1.12, 2.5, 2.6

### 4b. "चाणक्य ने यह नहीं कहा"

- When the entire opposition unites, understand that the king is honest. / जब पूरा विपक्ष एक हो जाए, तो समझ लेना कि राजा ईमानदार है।: चाणक्य नीति के 342 श्लोकों में ऐसा कुछ नहीं है। Factly ने भी जाँचकर इसे गलत तरीके से चाणक्य के नाम बताया। अर्थशास्त्र एकजुट विरोधियों से निपटने की बात करता है, राजा की ईमानदारी साबित करने की नहीं।
- Before you start some work, always ask yourself three questions: why am I doing it, what the results might be, and will I be successful. / कोई भी काम शुरू करने से पहले खुद से तीन सवाल पूछो: मैं यह क्यों कर रहा हूँ, इसका नतीजा क्या होगा, और क्या मैं सफल होऊँगा।: यह पंक्ति चाणक्य नीति में नहीं है। सबसे करीबी असली श्लोक 4.18 है, जो समय, मित्र, जगह, आमदनी-खर्च और अपनी ताकत पर बार-बार सोचने को कहता है।
- A person should not be too honest. Straight trees are cut first and honest people are screwed first. / ज़्यादा ईमानदार मत बनो। सीधे पेड़ पहले काटे जाते हैं।: पहला आधा हिस्सा सच में है: श्लोक 7.12 कहता है कि बहुत सीधे मत बनो, जंगल में सीधे पेड़ कटते हैं। "ईमानदार" शब्द और आखिरी हिस्सा बाद में जोड़ा गया है। मूल में "सरल" है, यानी सीधा, भोला।

### 4c. Verses that mention women (73 by Sanskrit keyword; 33 excluded)

- 1.4: not-featured
- 1.5: not-featured
- 1.6: not-featured
- 1.11: not-featured
- 1.15: exclude (Tells men never to trust women, grouped with rivers, armed men and horned beasts.)
- 1.17: exclude (Claims women have double the appetite and eight times the lust of men.)
- 2.1: exclude (Lists lying, rashness, deceit, stupidity, greed, uncleanliness and cruelty as women's "natural" flaws.)
- 2.3: not-featured
- 2.4: not-featured
- 2.11: not-featured
- 2.14: not-featured
- 2.15: exclude (Says a woman in another's house is quickly ruined.)
- 2.17: exclude (Uses the prostitute leaving a poor man as a model of who abandons whom.)
- 2.20: not-featured
- 3.3: not-featured
- 3.9: not-featured
- 4.5: featured
- 4.8: exclude (Lists a widowed daughter among things that burn a man.)
- 4.10: not-featured
- 4.11: not-featured
- 4.13: not-featured
- 4.16: exclude (Tells a man to abandon a wife with an angry face.)
- 4.17: exclude (Reduces women's ageing to a lack of sex.)
- 5.1: not-featured
- 5.6: not-featured
- 5.9: not-featured
- 5.14: exclude (Calls a woman a straw to the man who has conquered desire.)
- 5.15: featured
- 5.21: exclude (Names the flower-seller woman the most cunning among women.)
- 5.23: not-featured
- 6.3: exclude (Says a woman is purified by her menses.)
- 6.4: exclude (A wandering king, priest or yogi is honoured; a wandering woman is "ruined".)
- 6.10: not-featured
- 6.11: exclude (Calls a beautiful wife an enemy in the house.)
- 6.13: not-featured
- 6.15: not-featured
- 7.11: exclude (Reduces women's strength to beauty, youth and sweetness.)
- 8.9: exclude (Says women without husbands are lost.)
- 8.10: not-featured
- 8.14: not-featured
- 8.17: not-featured
- 8.21: exclude (Repeats 6.11.)
- 9.11: exclude (Puts talk about women alongside gambling and theft.)
- 9.12: exclude (Lists a wife among things improved by being pressed or beaten.)
- 10.4: exclude (Asks what women would not do, implying they are capable of anything bad.)
- 10.14: not-featured
- 10.17: not-featured
- 11.17: not-featured
- 12.1: not-featured
- 12.3: exclude (Recommends cunning toward women.)
- 12.5: not-featured
- 12.11: featured
- 12.13: not-featured
- 12.14: featured
- 12.17: not-featured
- 12.18: exclude (Says deceit is to be learned from women.)
- 14.3: not-featured
- 14.11: exclude (Groups women with kings and fire as things to keep at a calculated distance.)
- 14.12: exclude (Groups women with fire, snakes and fools as things that can take life.)
- 14.16: exclude (Describes a woman as a corpse, an object of lust or meat.)
- 15.5: not-featured
- 16.1: not-featured
- 16.2: exclude (Says no woman's heart is faithful to one man.)
- 16.3: exclude (Mocks a man who believes a woman loves him.)
- 16.4: exclude (Asks whose mind has not been broken by women.)
- 16.12: exclude (Compares wealth used by all to a prostitute.)
- 16.13: not-featured
- 17.1: exclude (Uses women who conceive by lovers as a simile for shame.)
- 17.6: not-featured
- 17.9: exclude (Says a wife who fasts without her husband's leave shortens his life and goes to hell.)
- 17.10: exclude (Says a woman is purified only by her husband's foot-water.)
- 17.14: exclude (Says a woman robs a man of strength at once.)
- 17.19: exclude (Lists the prostitute among those who cannot feel another's pain.)

Featured verses that mention women, kept on purpose: 12.14 (another's wife as one's mother), 5.15 (a wife is a friend at home), 4.5 (learning is like a mother abroad), 12.11 (peace is my wife). The "not-featured" ones are neither excluded nor shown; the brief's figure of about 80 includes looser English matches.
