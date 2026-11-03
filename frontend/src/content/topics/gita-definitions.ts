/**
 * Hand-written one-sentence definitions for the Bhagavad Gita topic hubs
 * (/gita/topic/[slug] and /hi/gita/topic/[slug]).
 *
 * Lives outside src/content/gita/ because that folder is regenerated at
 * prebuild by scripts/build-gita-content.mjs. Keep it hand-edited.
 *
 * kind:
 *   term        a Sanskrit concept; the sentence defines it as the Gita uses it
 *   theme       an English theme; the sentence says what the Gita teaches on it
 *   collection  a person, place or set of verses; the sentence says what is here
 *
 * Copy rules: plain, one sentence, sectarian-neutral, no dashes.
 * Verse numbers are only cited where the verse says exactly that.
 */

export type GitaTopicKind = 'term' | 'theme' | 'collection'

export type GitaTopicDefinition = {
  kind: GitaTopicKind
  /** Devanagari / Hindi name used in Hindi titles, H1 and breadcrumbs. */
  hi: string
  /** English definition sentence (first paragraph + meta description). */
  en: string
  /** Hindi definition sentence. */
  hiDef: string
  /** Latin name kept once in the Hindi <title> where Hinglish queries land (GSC). */
  latinInHiTitle?: string
}

export const GITA_TOPIC_DEFINITIONS: Record<string, GitaTopicDefinition> = {
  kurukshetra: {
    kind: 'collection',
    hi: 'कुरुक्षेत्र',
    en: 'Kurukshetra is the battlefield where the Gita is spoken; its first verse calls it dharmakshetra, the field of dharma.',
    hiDef: 'कुरुक्षेत्र वह युद्धभूमि है जहाँ गीता कही गई; पहले ही श्लोक में इसे धर्मक्षेत्र कहा गया है।',
  },
  bhakti: {
    kind: 'term',
    hi: 'भक्ति',
    en: 'Bhakti is loving devotion to God; in the Gita Krishna asks for it in every act and calls the devotee dear to him.',
    hiDef: 'भक्ति ईश्वर के प्रति प्रेमपूर्ण समर्पण है; गीता में कृष्ण इसे हर कर्म में माँगते हैं और भक्त को अपना प्रिय कहते हैं।',
  },
  'karma-yoga': {
    kind: 'term',
    hi: 'कर्मयोग',
    en: 'Karma yoga is the path of action: doing your work fully while giving up attachment to its results.',
    hiDef: 'कर्मयोग कर्म का मार्ग है: अपना काम पूरी लगन से करना और उसके फल की आसक्ति छोड़ देना।',
  },
  arjuna: {
    kind: 'collection',
    hi: 'अर्जुन',
    en: 'Arjuna is the Pandava warrior whose doubt on the battlefield starts the Gita; he asks the questions and Krishna answers.',
    hiDef: 'अर्जुन पाण्डव योद्धा हैं जिनके युद्धभूमि पर उठे संशय से गीता शुरू होती है; प्रश्न वे पूछते हैं, उत्तर कृष्ण देते हैं।',
  },
  vairagya: {
    kind: 'term',
    hi: 'वैराग्य',
    en: 'Vairagya is dispassion, freedom from craving for sense objects; the Gita pairs it with practice as the way to steady the mind.',
    hiDef: 'वैराग्य इन्द्रियों के विषयों की लालसा से मुक्ति है; गीता इसे अभ्यास के साथ मन को वश में करने का उपाय बताती है।',
  },
  vishwarupa: {
    kind: 'term',
    hi: 'विश्वरूप',
    en: 'Vishwarupa is the universal form Krishna reveals to Arjuna in Chapter 11, holding all worlds, beings and time within it.',
    hiDef: 'विश्वरूप वह विराट रूप है जो कृष्ण अध्याय 11 में अर्जुन को दिखाते हैं, जिसमें सभी लोक, प्राणी और काल समाए हैं।',
  },
  manas: {
    kind: 'term',
    hi: 'मन',
    en: 'Manas is the mind, the restless seat of thought and desire; Krishna says practice and dispassion can steady it.',
    hiDef: 'मन (मनस्) विचार और इच्छा का चंचल स्थान है; कृष्ण कहते हैं कि अभ्यास और वैराग्य से इसे वश में किया जा सकता है।',
  },
  gunas: {
    kind: 'term',
    hi: 'त्रिगुण',
    en: 'The gunas are the three qualities of nature, sattva, rajas and tamas, which the Gita says shape every mind, action and thing.',
    hiDef: 'गुण प्रकृति के तीन गुण हैं, सत्त्व, रजस् और तमस्; गीता के अनुसार हर मन, कर्म और वस्तु इन्हीं से बनती है।',
  },
  vibhuti: {
    kind: 'term',
    hi: 'विभूति',
    en: 'Vibhuti means divine glory; in Chapter 10 Krishna names the finest in each class of things as his own glory.',
    hiDef: 'विभूति का अर्थ है दिव्य ऐश्वर्य; अध्याय 10 में कृष्ण हर वर्ग की श्रेष्ठ वस्तु को अपनी विभूति बताते हैं।',
  },
  moksha: {
    kind: 'term',
    hi: 'मोक्ष',
    en: 'Moksha is liberation from the cycle of birth and death; the Gita describes it as reaching Krishna or Brahman, with no return.',
    hiDef: 'मोक्ष जन्म और मृत्यु के चक्र से मुक्ति है; गीता इसे कृष्ण या ब्रह्म की प्राप्ति कहती है, जहाँ से लौटना नहीं होता।',
  },
  shraddha: {
    kind: 'term',
    hi: 'श्रद्धा',
    en: 'Shraddha is faith, the trust a person lives by; the Gita says a person is made of their shraddha.',
    hiDef: 'श्रद्धा वह विश्वास है जिसके सहारे मनुष्य जीता है; गीता कहती है कि मनुष्य श्रद्धामय है, जैसी श्रद्धा वैसा वह।',
  },
  yajna: {
    kind: 'term',
    hi: 'यज्ञ',
    en: 'Yajna is sacrifice or offering; the Gita widens it from fire ritual to any action offered without selfish motive.',
    hiDef: 'यज्ञ का अर्थ है अर्पण; गीता इसे अग्नि के अनुष्ठान से आगे हर उस कर्म तक ले जाती है जो स्वार्थ के बिना अर्पित हो।',
  },
  prakriti: {
    kind: 'term',
    hi: 'प्रकृति',
    en: 'Prakriti is material nature, the source of body, mind and the three gunas; the Gita sets it apart from purusha, the conscious knower.',
    hiDef: 'प्रकृति वह भौतिक स्वभाव है जिससे शरीर, मन और तीनों गुण बनते हैं; गीता इसे पुरुष, यानी चेतन ज्ञाता, से अलग बताती है।',
  },
  krishna: {
    kind: 'collection',
    hi: 'श्रीकृष्ण',
    en: "Krishna is the speaker of the Gita: Arjuna's charioteer and friend, who reveals himself as the Lord of all beings.",
    hiDef: 'श्रीकृष्ण गीता के वक्ता हैं: अर्जुन के सारथी और सखा, जो स्वयं को सब प्राणियों के ईश्वर के रूप में प्रकट करते हैं।',
    latinInHiTitle: 'Krishna',
  },
  dhyana: {
    kind: 'term',
    hi: 'ध्यान',
    en: "Dhyana is meditation, holding the mind steady on one object; the Gita's sixth chapter gives the seat, posture and method.",
    hiDef: 'ध्यान मन को एक लक्ष्य पर स्थिर रखने का अभ्यास है; गीता का छठा अध्याय इसका आसन, मुद्रा और विधि बताता है।',
  },
  buddhi: {
    kind: 'term',
    hi: 'बुद्धि',
    en: 'Buddhi is the intellect, the faculty that judges and decides; the Gita asks for a buddhi that stays steady and fixed on one aim.',
    hiDef: 'बुद्धि वह शक्ति है जो विचार करके निर्णय लेती है; गीता ऐसी बुद्धि माँगती है जो स्थिर रहे और एक लक्ष्य पर टिकी रहे।',
  },
  sattva: {
    kind: 'term',
    hi: 'सत्त्व',
    en: 'Sattva is the guna of light, clarity and goodness; it brings knowledge and calm, yet the Gita says it binds through attachment to happiness.',
    hiDef: 'सत्त्व प्रकाश, स्पष्टता और शुद्धता का गुण है; यह ज्ञान और शांति देता है, पर गीता कहती है कि सुख की आसक्ति से यह भी बाँधता है।',
  },
  'cosmic-form': {
    kind: 'term',
    hi: 'विराट रूप',
    en: "The cosmic form is Krishna's universal vision in Chapter 11: countless faces, arms and worlds, with time consuming all.",
    hiDef: 'विराट रूप अध्याय 11 में कृष्ण का वह दर्शन है जिसमें अनगिनत मुख, भुजाएँ और लोक हैं, और काल सबको निगल रहा है।',
  },
  jnana: {
    kind: 'term',
    hi: 'ज्ञान',
    en: 'Jnana is knowledge; in the Gita it is the understanding that tells the eternal Self apart from the changing body and world.',
    hiDef: 'ज्ञान वह समझ है जिससे नित्य आत्मा और बदलते शरीर व संसार का भेद पहचाना जाता है।',
  },
  equanimity: {
    kind: 'theme',
    hi: 'समता',
    en: 'The Gita teaches equanimity as staying even in pleasure and pain, gain and loss; Krishna calls this evenness yoga.',
    hiDef: 'गीता समता को सुख और दुःख, लाभ और हानि में एक-सा रहना बताती है; कृष्ण इसी समभाव को योग कहते हैं।',
  },
  kama: {
    kind: 'term',
    hi: 'काम',
    en: 'Kama is desire; Krishna names it, with anger, as the enemy born of rajas that covers knowledge.',
    hiDef: 'काम इच्छा या कामना है; कृष्ण इसे क्रोध के साथ रजोगुण से उत्पन्न वह शत्रु बताते हैं जो ज्ञान को ढक लेता है।',
  },
  surrender: {
    kind: 'theme',
    hi: 'समर्पण',
    en: "The Gita teaches surrender as giving every act and its result to God; Krishna's last call is to take refuge in him alone.",
    hiDef: 'गीता समर्पण को हर कर्म और उसका फल ईश्वर को सौंपना बताती है; कृष्ण का अंतिम आह्वान है कि केवल उनकी शरण लो।',
  },
  tapas: {
    kind: 'term',
    hi: 'तप',
    en: 'Tapas is austerity, disciplined effort that purifies; the Gita describes tapas of body, speech and mind.',
    hiDef: 'तप वह अनुशासित साधना है जो शुद्ध करती है; गीता शरीर, वाणी और मन के तप का वर्णन करती है।',
  },
  rajas: {
    kind: 'term',
    hi: 'रजस्',
    en: 'Rajas is the guna of passion and activity; the Gita says it springs from craving and binds through attachment to action.',
    hiDef: 'रजस् राग और क्रियाशीलता का गुण है; गीता के अनुसार यह तृष्णा से उपजता है और कर्म की आसक्ति से बाँधता है।',
  },
  battlefield: {
    kind: 'collection',
    hi: 'युद्धभूमि',
    en: 'These are the Gita verses set on the battlefield: the two armies at Kurukshetra, the conches, and Arjuna setting down his bow.',
    hiDef: 'ये गीता के युद्धभूमि वाले श्लोक हैं: कुरुक्षेत्र में दो सेनाएँ, शंखनाद, और वह क्षण जब अर्जुन धनुष रख देते हैं।',
  },
  attachment: {
    kind: 'theme',
    hi: 'आसक्ति',
    en: 'The Gita teaches that attachment to results is what binds; the same work done without attachment leads to freedom.',
    hiDef: 'गीता सिखाती है कि फल की आसक्ति ही बाँधती है; आसक्ति छोड़कर किया गया वही कर्म मुक्ति की ओर ले जाता है।',
  },
  kshetrajna: {
    kind: 'term',
    hi: 'क्षेत्रज्ञ',
    en: 'Kshetrajna is the knower of the field, the awareness that knows the body; Krishna says he is the knower in all fields.',
    hiDef: 'क्षेत्रज्ञ क्षेत्र को जानने वाला है, यानी शरीर को जानने वाली चेतना; कृष्ण कहते हैं कि सब क्षेत्रों में क्षेत्रज्ञ वे ही हैं।',
  },
  indriya: {
    kind: 'term',
    hi: 'इन्द्रिय',
    en: 'Indriyas are the senses and organs of action; the Gita warns they can carry the mind away and asks that they be held in check.',
    hiDef: 'इन्द्रियाँ ज्ञान और कर्म के साधन हैं; गीता चेताती है कि ये मन को खींच ले जाती हैं, इसलिए इन्हें वश में रखना चाहिए।',
  },
  delusion: {
    kind: 'term',
    hi: 'मोह',
    en: 'Delusion, moha in Sanskrit, is confusion about what is real and what to do; it grips Arjuna at the start and is gone by 18.73.',
    hiDef: 'मोह वह भ्रम है जो सत्य और कर्तव्य को धुंधला कर देता है; आरम्भ में अर्जुन इसी में हैं और 18.73 में यह नष्ट होता है।',
  },
  tamas: {
    kind: 'term',
    hi: 'तमस्',
    en: 'Tamas is the guna of darkness and inertia; the Gita says it binds through carelessness, laziness and sleep.',
    hiDef: 'तमस् अंधकार और जड़ता का गुण है; गीता के अनुसार यह प्रमाद, आलस्य और निद्रा से बाँधता है।',
  },
  sanjaya: {
    kind: 'collection',
    hi: 'संजय',
    en: 'Sanjaya is the narrator of the Gita; by the grace of Vyasa he sees the dialogue and reports it to the blind king Dhritarashtra.',
    hiDef: 'संजय गीता के कथावाचक हैं; व्यास की कृपा से वे यह संवाद देखते हैं और अंधे राजा धृतराष्ट्र को सुनाते हैं।',
  },
  'self-mastery': {
    kind: 'theme',
    hi: 'आत्मसंयम',
    en: 'The Gita teaches self-mastery as lifting yourself by your own effort; a mind brought under control is your friend, an unruled one your enemy.',
    hiDef: 'गीता आत्मसंयम को अपने प्रयास से अपना उद्धार करना बताती है; वश में किया मन मित्र है और बेलगाम मन शत्रु।',
  },
  viveka: {
    kind: 'term',
    hi: 'विवेक',
    en: 'Viveka is discernment, telling the real from the unreal and the lasting from the passing, as Krishna teaches from Chapter 2.',
    hiDef: 'विवेक सत्य और असत्य, नित्य और अनित्य में भेद करने की क्षमता है, जिसे कृष्ण दूसरे अध्याय से सिखाते हैं।',
  },
  'indriya-nigraha': {
    kind: 'term',
    hi: 'इन्द्रिय-निग्रह',
    en: 'Indriya nigraha is restraint of the senses: drawing them back from their objects as a tortoise draws in its limbs.',
    hiDef: 'इन्द्रिय-निग्रह इन्द्रियों पर संयम है: उन्हें विषयों से वैसे समेट लेना जैसे कछुआ अपने अंग समेटता है।',
  },
  nishkama: {
    kind: 'term',
    hi: 'निष्काम',
    en: 'Nishkama means free of desire; in the Gita it describes action done as duty, with no craving for its fruit.',
    hiDef: 'निष्काम का अर्थ है कामना से रहित; गीता में यह वह कर्म है जो कर्तव्य मानकर, फल की इच्छा के बिना किया जाए।',
  },
  discipline: {
    kind: 'theme',
    hi: 'अनुशासन',
    en: 'The Gita ties discipline to moderation in food, sleep and work, and to steady practice; it says yoga is possible only this way.',
    hiDef: 'गीता अनुशासन को भोजन, नींद और कर्म में संयम तथा नियमित अभ्यास से जोड़ती है; इसी से योग सधता है।',
  },
  renunciation: {
    kind: 'theme',
    hi: 'संन्यास और त्याग',
    en: 'The Gita calls giving up desire-driven acts sannyasa, and giving up the fruits of all acts tyaga; both are its forms of renunciation.',
    hiDef: 'गीता के अनुसार कामना से किए कर्म छोड़ना संन्यास है, और सभी कर्मों का फल छोड़ना त्याग है।',
  },
  dharma: {
    kind: 'term',
    hi: 'धर्म',
    en: "Dharma is right duty, what you ought to do given your nature and role; Krishna says your own dharma is better than another's.",
    hiDef: 'धर्म वह कर्तव्य है जो अपने स्वभाव और भूमिका के अनुसार उचित है; कृष्ण कहते हैं कि अपना धर्म दूसरे के धर्म से श्रेष्ठ है।',
  },
  tyaga: {
    kind: 'term',
    hi: 'त्याग',
    en: 'Tyaga is relinquishment; the Gita defines it as giving up the fruits of all actions while still doing the actions.',
    hiDef: 'त्याग का अर्थ है छोड़ना; गीता इसे कर्म करते हुए सभी कर्मों के फल को छोड़ देना बताती है।',
  },
  kshetra: {
    kind: 'term',
    hi: 'क्षेत्र',
    en: 'Kshetra means the field: the body and all that can be known, which Chapter 13 sets apart from the one who knows it.',
    hiDef: 'क्षेत्र का अर्थ है खेत; गीता में यह शरीर और सारा ज्ञेय जगत है, जिसे अध्याय 13 उसके ज्ञाता से अलग करता है।',
  },
  'arjuna-vishada': {
    kind: 'term',
    hi: 'अर्जुन विषाद',
    en: "Arjuna vishada is Arjuna's despair: seeing his own kin in both armies, he drops his bow, and this grief opens the Gita.",
    hiDef: 'अर्जुन विषाद अर्जुन का वह शोक है जो दोनों सेनाओं में अपने स्वजनों को देखकर उठता है; इसी से गीता आरम्भ होती है।',
  },
  'arjuna-prayer': {
    kind: 'collection',
    hi: 'अर्जुन की स्तुति',
    en: "These are Arjuna's prayers and praises to Krishna, mostly in Chapters 10 and 11, spoken as he comes to see who Krishna is.",
    hiDef: 'ये अर्जुन की प्रार्थनाएँ और स्तुतियाँ हैं, अधिकतर अध्याय 10 और 11 में, जब वे कृष्ण का स्वरूप पहचानते हैं।',
  },
  purushottama: {
    kind: 'term',
    hi: 'पुरुषोत्तम',
    en: 'Purushottama means the Supreme Person; in 15.18 Krishna takes the name as one beyond the perishable and above the imperishable.',
    hiDef: 'पुरुषोत्तम का अर्थ है उत्तम पुरुष; 15.18 में कृष्ण कहते हैं कि वे क्षर से परे और अक्षर से भी उत्तम हैं।',
  },
  'jnana-yoga': {
    kind: 'term',
    hi: 'ज्ञानयोग',
    en: 'Jnana yoga is the path of knowledge: freedom through understanding the Self as distinct from the body and its actions.',
    hiDef: 'ज्ञानयोग ज्ञान का मार्ग है: आत्मा को शरीर और कर्म से अलग जानकर मुक्ति पाना।',
  },
  duty: {
    kind: 'theme',
    hi: 'कर्तव्य',
    en: 'The Gita teaches that you should do the work that is yours without clinging to results, and that giving up action is no way out.',
    hiDef: 'गीता सिखाती है कि जो काम तुम्हारा है उसे फल की आसक्ति के बिना करो; कर्म छोड़ देना कोई रास्ता नहीं।',
  },
  samatva: {
    kind: 'term',
    hi: 'समत्व',
    en: 'Samatva is evenness of mind in success and failure; in 2.48 Krishna says this evenness is called yoga.',
    hiDef: 'समत्व सफलता और असफलता में मन की समानता है; 2.48 में कृष्ण कहते हैं कि यही समत्व योग कहलाता है।',
  },
  'dhyana-yoga': {
    kind: 'term',
    hi: 'ध्यानयोग',
    en: 'Dhyana yoga is the yoga of meditation taught in Chapter 6: a clean seat, a still body, and the mind settled in the Self.',
    hiDef: 'ध्यानयोग अध्याय 6 में बताया गया ध्यान का योग है: शुद्ध आसन, स्थिर शरीर, और आत्मा में टिका हुआ मन।',
  },
  sharanagati: {
    kind: 'term',
    hi: 'शरणागति',
    en: 'Sharanagati is taking refuge in God; in 18.66 Krishna asks Arjuna to set aside all dharmas and come to him alone for shelter.',
    hiDef: 'शरणागति ईश्वर की शरण लेना है; 18.66 में कृष्ण कहते हैं कि सब धर्मों को छोड़कर केवल मेरी शरण में आओ।',
  },
  awe: {
    kind: 'collection',
    hi: 'विस्मय',
    en: "These verses show Arjuna's awe at the universal form: hair on end, he bows and asks Krishna to forgive his old familiarity.",
    hiDef: 'ये श्लोक विश्वरूप देखकर अर्जुन का विस्मय दिखाते हैं: रोमांचित होकर वे प्रणाम करते हैं और सखा-भाव की भूलों की क्षमा माँगते हैं।',
  },
  duryodhana: {
    kind: 'collection',
    hi: 'दुर्योधन',
    en: 'Duryodhana is the Kaurava prince leading the army against the Pandavas; in Chapter 1 he reviews both armies with his teacher Drona.',
    hiDef: 'दुर्योधन कौरव राजकुमार है जो पाण्डवों के विरुद्ध सेना का नेतृत्व करता है; अध्याय 1 में वह गुरु द्रोण से दोनों सेनाओं की बात करता है।',
  },
  sannyasa: {
    kind: 'term',
    hi: 'संन्यास',
    en: 'Sannyasa is renunciation; in 6.1 Krishna calls a sannyasi the one who does his duty without depending on its fruit.',
    hiDef: 'संन्यास का अर्थ है त्याग; 6.1 में कृष्ण कहते हैं कि संन्यासी वह है जो फल का आश्रय लिए बिना कर्तव्य कर्म करता है।',
  },
  akshara: {
    kind: 'term',
    hi: 'अक्षर',
    en: 'Akshara means the imperishable; the Gita uses it for unchanging reality, and in Chapter 15 for the imperishable purusha.',
    hiDef: 'अक्षर का अर्थ है जिसका नाश न हो; गीता इसे अविनाशी सत्य के लिए, और अध्याय 15 में अक्षर पुरुष के लिए प्रयोग करती है।',
  },
  'nishkama-karma': {
    kind: 'term',
    hi: 'निष्काम कर्म',
    en: 'Nishkama karma is action done without desire for its fruit; 2.47 states it: your right is to the work, never to its results.',
    hiDef: 'निष्काम कर्म फल की इच्छा के बिना किया गया कर्म है; 2.47 कहता है: तुम्हारा अधिकार कर्म पर है, फल पर कभी नहीं।',
  },
  adharma: {
    kind: 'term',
    hi: 'अधर्म',
    en: 'Adharma is the opposite of dharma, the decline of right order; Krishna says he appears age after age when adharma rises.',
    hiDef: 'अधर्म धर्म का उलटा है, सही व्यवस्था का पतन; कृष्ण कहते हैं कि जब अधर्म बढ़ता है, वे युग-युग में प्रकट होते हैं।',
  },
  atman: {
    kind: 'term',
    hi: 'आत्मा',
    en: 'Atman is the Self, the conscious, unborn and undying reality in every being, which weapons cannot cut and fire cannot burn.',
    hiDef: 'आत्मा हर प्राणी में स्थित चेतन, अजन्मा और अविनाशी सत्य है, जिसे न शस्त्र काट सकते हैं, न अग्नि जला सकती है।',
  },
  'akshara-brahma': {
    kind: 'term',
    hi: 'अक्षर ब्रह्म',
    en: 'Akshara Brahma is the imperishable Brahman; Chapter 8 calls it the supreme reality and teaches remembering it at the time of death.',
    hiDef: 'अक्षर ब्रह्म अविनाशी ब्रह्म है; अध्याय 8 इसे परम सत्य कहता है और मृत्यु के समय इसके स्मरण की शिक्षा देता है।',
  },
  krodha: {
    kind: 'term',
    hi: 'क्रोध',
    en: 'Krodha is anger; Krishna traces it back to desire and shows how it leads to delusion, lost memory and ruin (2.62-63).',
    hiDef: 'क्रोध गुस्सा है; कृष्ण बताते हैं कि यह कामना से जन्मता है और मोह, स्मृति-भ्रम और बुद्धि-नाश तक ले जाता है (2.62-63)।',
  },
  sankhya: {
    kind: 'term',
    hi: 'सांख्य',
    en: 'Sankhya, in the Gita, is the path of discriminating knowledge: understanding the Self as distinct from body and nature.',
    hiDef: 'गीता में सांख्य विवेकपूर्ण ज्ञान का मार्ग है: आत्मा को शरीर और प्रकृति से अलग समझना।',
  },
  karma: {
    kind: 'term',
    hi: 'कर्म',
    en: 'Karma is action; the Gita teaches that no one can stay without acting, and that action binds only when done with attachment.',
    hiDef: 'कर्म का अर्थ है क्रिया; गीता कहती है कि कोई भी कर्म किए बिना नहीं रह सकता, और कर्म आसक्ति से किया जाए तभी बाँधता है।',
    latinInHiTitle: 'Karma',
  },
  'krishna-teaching': {
    kind: 'collection',
    hi: 'कृष्ण का उपदेश',
    en: "These verses gather key statements of Krishna's teaching, from the undying Self in Chapter 2 to giving up attachment in Chapter 18.",
    hiDef: 'ये श्लोक कृष्ण के उपदेश के मुख्य कथन हैं, अध्याय 2 की अविनाशी आत्मा से लेकर अध्याय 18 में आसक्ति के त्याग तक।',
  },
  'karma-sannyasa': {
    kind: 'term',
    hi: 'कर्मसंन्यास',
    en: 'Karma sannyasa is renouncing action; in 5.2 Krishna says it and karma yoga both lead to freedom, and karma yoga is better.',
    hiDef: 'कर्मसंन्यास कर्म का त्याग है; 5.2 में कृष्ण कहते हैं कि संन्यास और कर्मयोग दोनों कल्याण देते हैं, पर कर्मयोग श्रेष्ठ है।',
  },
  bhagavan: {
    kind: 'term',
    hi: 'भगवान्',
    en: 'Bhagavan means the Blessed Lord, one who holds every divine quality; the Gita uses it for Krishna as the source of all beings.',
    hiDef: 'भगवान् का अर्थ है सब दिव्य गुणों से युक्त ईश्वर; गीता में यह कृष्ण के लिए आता है, जो सब प्राणियों के मूल हैं।',
  },
  manifestation: {
    kind: 'theme',
    hi: 'ईश्वर की अभिव्यक्ति',
    en: 'The Gita teaches that Krishna is the source of all beings, and that whatever has glory or power comes from a spark of his splendour.',
    hiDef: 'गीता सिखाती है कि कृष्ण सब प्राणियों के मूल हैं, और जो कुछ भी ऐश्वर्य या शक्ति से युक्त है, वह उनके तेज के अंश से है।',
  },
  dana: {
    kind: 'term',
    hi: 'दान',
    en: 'Dana is giving; the Gita calls a gift sattvic when given as duty, at the right time and place, to a worthy person, expecting nothing back.',
    hiDef: 'दान देने का कर्म है; गीता उस दान को सात्त्विक कहती है जो कर्तव्य मानकर, उचित समय और स्थान पर, सुपात्र को, बदले की आशा बिना दिया जाए।',
  },
  omnipresence: {
    kind: 'theme',
    hi: 'सर्वव्यापकता',
    en: 'The Gita teaches that Krishna pervades the whole universe in his unmanifest form, and that all beings rest in him.',
    hiDef: 'गीता सिखाती है कि कृष्ण अपने अव्यक्त रूप से सारे जगत में व्याप्त हैं, और सब प्राणी उनमें स्थित हैं।',
  },
  ahankara: {
    kind: 'term',
    hi: 'अहंकार',
    en: "Ahankara is the ego, the sense of 'I am the doer'; the Gita says the gunas do all acts, but one deluded by ego thinks he does them.",
    hiDef: "अहंकार 'मैं कर्ता हूँ' का भाव है; गीता कहती है कि सब कर्म गुण करते हैं, पर अहंकार से मोहित व्यक्ति स्वयं को कर्ता मानता है।",
  },
  'karma-phala': {
    kind: 'term',
    hi: 'कर्मफल',
    en: 'Karma phala is the fruit of action, its result; the Gita teaches acting without making the result your motive (2.47).',
    hiDef: 'कर्मफल कर्म का परिणाम है; गीता सिखाती है कि फल को कर्म का कारण मत बनाओ (2.47)।',
  },
  brahman: {
    kind: 'term',
    hi: 'ब्रह्म',
    en: 'Brahman is the ultimate reality in the Gita: imperishable, beyond being and non-being, and the ground of all that exists.',
    hiDef: 'ब्रह्म गीता में परम सत्य है: अविनाशी, सत् और असत् से परे, और जो कुछ है उस सबका आधार।',
    latinInHiTitle: 'Brahman',
  },
  clarity: {
    kind: 'theme',
    hi: 'स्पष्टता',
    en: 'The Gita ties clarity to knowing the Self as eternal and to a sattvic understanding that sees what to do and what to avoid.',
    hiDef: 'गीता स्पष्टता को आत्मा की नित्यता जानने और उस सात्त्विक बुद्धि से जोड़ती है जो जानती है कि क्या करना है और क्या नहीं।',
  },
  grief: {
    kind: 'theme',
    hi: 'शोक',
    en: "Krishna answers Arjuna's grief by teaching that the Self is eternal, so the wise grieve neither for the living nor for the dead.",
    hiDef: 'अर्जुन के शोक का उत्तर कृष्ण यह सिखाकर देते हैं कि आत्मा नित्य है, इसलिए ज्ञानी न जीवितों का शोक करते हैं, न मृतों का।',
  },
  avyakta: {
    kind: 'term',
    hi: 'अव्यक्त',
    en: 'Avyakta means the unmanifest; the Gita uses it for what the senses cannot perceive: the Self, the source of creation, and the formless divine.',
    hiDef: 'अव्यक्त का अर्थ है जो प्रकट न हो; गीता इसे आत्मा, सृष्टि के स्रोत और निराकार ईश्वर के लिए प्रयोग करती है।',
  },
  'kshetra-kshetrajna': {
    kind: 'term',
    hi: 'क्षेत्र-क्षेत्रज्ञ',
    en: 'Kshetra and kshetrajna are the field and its knower: the body with all that is known, and the awareness that knows it (Chapter 13).',
    hiDef: 'क्षेत्र और क्षेत्रज्ञ यानी खेत और उसका ज्ञाता: शरीर सहित सब कुछ जो जाना जाता है, और उसे जानने वाली चेतना (अध्याय 13)।',
  },
}

export const gitaTopicDefinition = (slug: string): GitaTopicDefinition | null =>
  GITA_TOPIC_DEFINITIONS[slug] ?? null

const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase())

/** Join a definition with a closing sentence, keeping the whole under `max`. */
const fitDescription = (lead: string, tails: string[], max: number): string => {
  for (const tail of tails) {
    const s = `${lead} ${tail}`
    if (s.length <= max) return s
  }
  return lead
}

/** English hub <title> (the root layout appends " | Wisdom"). */
export const gitaTopicTitleEn = (slug: string, label: string, count: number): string => {
  const cap = titleCase(label)
  const kind = gitaTopicDefinition(slug)?.kind ?? 'term'
  if (kind === 'theme') return `What the Bhagavad Gita Says About ${cap}: ${count} Verses`
  if (kind === 'collection') return `${cap} in the Bhagavad Gita: ${count} Verses with Meaning`
  return `${cap} in the Bhagavad Gita: Meaning and ${count} Verses`
}

/** English meta description: the definition first, then what the page holds. */
export const gitaTopicDescriptionEn = (slug: string, label: string, count: number): string => {
  const def = gitaTopicDefinition(slug)
  if (!def) {
    return `${count} Bhagavad Gita verses on ${label}, with Sanskrit, Hindi and English meaning.`
  }
  return fitDescription(def.en, [
    `${count} verses with Sanskrit and meaning.`,
    `${count} Sanskrit verses with meaning.`,
    `${count} verses with meaning.`,
    `${count} verses.`,
  ], 155)
}

/** Hindi display name for a slug (falls back to the English label). */
export const gitaTopicHiName = (slug: string, label: string): string =>
  gitaTopicDefinition(slug)?.hi ?? label

/** Hindi hub <title>, Devanagari first. */
export const gitaTopicTitleHi = (slug: string, label: string, count: number): string => {
  const def = gitaTopicDefinition(slug)
  const name = def?.hi ?? titleCase(label)
  const latin = def?.latinInHiTitle ? ` (${def.latinInHiTitle})` : ''
  const kind = def?.kind ?? 'term'
  if (kind === 'theme') return `${name} पर गीता के ${count} श्लोक, अर्थ सहित${latin}`
  if (kind === 'collection') return `गीता में ${name}: ${count} श्लोक अर्थ सहित${latin}`
  return `गीता में ${name}: अर्थ और ${count} श्लोक${latin}`
}

/** Hindi meta description: the Hindi definition first. */
export const gitaTopicDescriptionHi = (slug: string, label: string, count: number): string => {
  const def = gitaTopicDefinition(slug)
  if (!def) {
    return `${label} पर भगवद् गीता के ${count} श्लोक, संस्कृत और हिन्दी अर्थ सहित।`
  }
  return fitDescription(def.hiDef, [
    `गीता के ${count} श्लोक, संस्कृत और हिन्दी अर्थ सहित।`,
    `${count} श्लोक, अर्थ सहित।`,
    `${count} श्लोक।`,
  ], 145)
}
