/**
 * The ten famous-line pages. Editorial content written for Wisdom; every
 * meaning and note is unreviewed (reviewed: false) until the owner signs off
 * (lp/funnels/upanishads/REVIEW.md). Sanskrit comes from passages.json.
 */

export type LineHi = {
  title: string
  description: string
  h1: string
  quick: string
  meaning: string
  fullMeaning: string
  scene: string
  shankara: string
  others: string
  writingNote: string
  faq: { q: string; a: string }[]
}

export type FamousLine = {
  slug: string
  cardId: string
  passage: string
  /** Visible ref, one format: "Chandogya Upanishad 6.8.7" */
  ref: string
  refShort: string
  textName: string
  veda: string
  title: string
  description: string
  h1: string
  quick: string
  sa: string
  iast: string
  meaning: string
  /** English of the whole passage shown under "The whole passage". */
  fullMeaning: string
  who: string
  scene: string
  shankara: string
  others: string
  writing: { forms: { sa: string; iast: string; label: string }[]; note: string }
  gita: { c: number; v: number; note: string }[]
  textHref?: string
  related: string[]
  faq: { q: string; a: string }[]
  hi?: LineHi
  reviewed: false
}

export const LINES: FamousLine[] = [
  {
    slug: 'tat-tvam-asi',
    cardId: 'up-tat-tvam-asi',
    passage: 'chandogya.6.8.7',
    ref: 'Chandogya Upanishad 6.8.7',
    refShort: 'Chandogya 6.8.7',
    textName: 'Chandogya Upanishad',
    veda: 'Sama Veda',
    title: 'Tat Tvam Asi Meaning, Sanskrit and Source',
    description:
      'Tat tvam asi means "you are that". Chandogya Upanishad 6.8.7, Uddalaka to Shvetaketu. Sanskrit, plain English, Shankara’s reading, and a print-ready card.',
    h1: 'Tat tvam asi: you are that',
    quick:
      'Tat tvam asi ("you are that") is from the Chandogya Upanishad 6.8.7. The sage Uddalaka Aruni says it to his son Shvetaketu, and repeats it nine times through 6.16.3, each time after a plain example: honey, rivers, a seed, salt in water. "That" is the one Being behind everything; "you" is the listener.',
    sa: 'स आत्मा तत्त्वमसि श्वेतकेतो',
    iast: 'sa ātmā tat tvam asi śvetaketo',
    meaning: 'That is the Self. You are that, Shvetaketu.',
    fullMeaning:
      'That finest essence: all of this has it as its Self. That is the real. That is the Self. You are that, Shvetaketu. "Teach me more, sir," the son said. "Very well, my dear," said his father.',
    who: 'Uddalaka Aruni to his son Shvetaketu',
    scene:
      'Shvetaketu comes home at twenty-four after twelve years of study, sure of himself. His father asks whether he learned the teaching by which the unheard becomes heard and the unknown becomes known (6.1.3). He has not. So Uddalaka teaches him with things from the kitchen and the garden: a banyan seed split open until nothing is left to see, salt left overnight in water that tastes of salt from every side. Each lesson ends with the same sentence.',
    shankara:
      'Shankara reads it as a statement of identity. "That" is Being, the fine essence the chapter has been describing; "you" is the self of the one listening. Set aside what belongs only to the body and mind on both sides, and what remains is one.',
    others:
      'Ramanuja reads both words as naming Brahman: Brahman as the cause of the world, and Brahman as the inner Self of Shvetaketu, who is its body. Madhva’s school divides the words as sa ātmā atat tvam asi, "you are not that", and reads the refrain as the self depending on the Lord.',
    writing: {
      forms: [
        { sa: 'तत्त्वमसि', iast: 'tattvamasi', label: 'As the text prints it, joined' },
        { sa: 'तत् त्वम् असि', iast: 'tat tvam asi', label: 'Word by word' },
      ],
      note: 'Both forms are correct. Check the doubled त्त in तत्त्वम्; dropping one त is a common slip in tattoos. Download the card at full size and give the file to your artist so the strokes stay exact.',
    },
    gita: [{ c: 13, v: 2, note: 'Krishna: know me as the knower of the field in every field. Shankara reads it the way he reads tat tvam asi.' }],
    related: ['aham-brahmasmi', 'asato-ma-sadgamaya', 'purnamadah-purnamidam'],
    faq: [
      {
        q: 'What does tat tvam asi mean?',
        a: '"You are that." Tat means that, tvam means you, asi means are. In the Chandogya Upanishad "that" is the one Being everything comes from, and "you" is Shvetaketu, the person listening.',
      },
      {
        q: 'Where does tat tvam asi come from?',
        a: 'Chandogya Upanishad, chapter 6, first at 6.8.7. The Chandogya belongs to the Sama Veda. The sentence closes each of nine teachings, from 6.8.7 to 6.16.3.',
      },
      {
        q: 'Is tat tvam asi a mahavakya?',
        a: 'Yes. Tradition names four great sentences, one from each Veda, and tat tvam asi is the one from the Sama Veda.',
      },
      {
        q: 'How do I write tat tvam asi in Sanskrit for a tattoo?',
        a: 'In Devanagari it is तत्त्वमसि, as the text prints it, or तत् त्वम् असि word by word. Use the full-size card on this page as the reference file.',
      },
    ],
    reviewed: false,
  },
  {
    slug: 'satyameva-jayate',
    cardId: 'up-satyameva-jayate',
    passage: 'mundaka.3.1.6',
    ref: 'Mundaka Upanishad 3.1.6',
    refShort: 'Mundaka 3.1.6',
    textName: 'Mundaka Upanishad',
    veda: 'Atharva Veda',
    title: 'Satyameva Jayate Meaning and Source Verse',
    description:
      'Satyameva jayate means "truth alone wins". It is Mundaka Upanishad 3.1.6. Full Sanskrit verse, plain English, Shankara’s reading and a print card.',
    h1: 'Satyameva jayate: truth alone wins',
    quick:
      'Satyameva jayate ("truth alone wins") is from the Mundaka Upanishad 3.1.6, part of the Atharva Veda. The sage Angiras teaches it to the householder Shaunaka. The verse goes on: by truth the path of the gods is laid, on which sages climb to truth’s highest home. India took the line as its national motto.',
    sa: 'सत्यमेव जयते नानृतं',
    iast: 'satyam eva jayate nānṛtam',
    meaning: 'Truth alone wins, not falsehood.',
    fullMeaning:
      'Truth alone wins, not falsehood. By truth the path of the gods is laid out, the road on which the sages, their wishes met, climb to where truth has its highest home.',
    who: 'Angiras to Shaunaka',
    scene:
      'Shaunaka, a wealthy householder, comes to Angiras in the proper way and asks one question: what is it which, once known, makes all of this known (1.1.3)? The whole Upanishad answers him. By the third chapter Angiras is describing how the Self is found: by truth, discipline, right knowledge and a disciplined life (3.1.5). This line comes next.',
    shankara:
      'Shankara reads satya here as truthful living, the practice of the person who speaks and acts in truth. The truthful one prevails and the liar does not, and truth is the road the sages walked to the place where truth is kept.',
    others:
      'Every school keeps the plain sense. One detail people check: the Upanishad has jayate, "wins". Some editions print jayati, with the same meaning.',
    writing: {
      forms: [
        { sa: 'सत्यमेव जयते', iast: 'satyameva jayate', label: 'As on the State Emblem' },
        { sa: 'सत्यमेव जयते नानृतं', iast: 'satyam eva jayate nānṛtam', label: 'With the rest of the half-verse' },
      ],
      note: 'The State Emblem of India, adopted in 1950, carries सत्यमेव जयते in Devanagari under the Lion Capital. The verse continues with नानृतं, "not falsehood".',
    },
    gita: [{ c: 17, v: 15, note: 'Krishna on the discipline of speech: words that do not hurt, that are true, kind and helpful.' }],
    related: ['bhidyate-hridaya-granthih', 'matru-devo-bhava', 'uttishthata-jagrata'],
    faq: [
      {
        q: 'Satyameva jayate is taken from which Upanishad?',
        a: 'The Mundaka Upanishad, verse 3.1.6. The Mundaka belongs to the Atharva Veda.',
      },
      {
        q: 'What is the full verse of satyameva jayate?',
        a: 'सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः । येनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत् सत्यस्य परमं निधानम् ॥ Truth alone wins, not falsehood; by truth the path of the gods is laid, on which the sages climb to truth’s highest home.',
      },
      {
        q: 'Who made satyameva jayate famous?',
        a: 'Pandit Madan Mohan Malaviya is widely credited with popularising it during the freedom movement. It became the national motto of India with the State Emblem in 1950.',
      },
    ],
    hi: {
      title: 'सत्यमेव जयते का अर्थ और श्लोक, मुण्डक उपनिषद',
      description:
        'सत्यमेव जयते मुण्डक उपनिषद 3.1.6 से है। पूरा संस्कृत श्लोक, आसान हिंदी अर्थ, शंकराचार्य की व्याख्या और प्रिंट के लिए कार्ड।',
      h1: 'सत्यमेव जयते: जीत सत्य की ही होती है',
      quick:
        'सत्यमेव जयते ("सत्य की ही जीत होती है") मुण्डक उपनिषद 3.1.6 का वाक्य है, जो अथर्ववेद का उपनिषद है। ऋषि अंगिरा यह बात गृहस्थ शौनक को सिखाते हैं। श्लोक आगे कहता है कि सत्य से ही देवयान मार्ग बना है, जिस पर ऋषि सत्य के परम धाम तक पहुँचते हैं। यही भारत का राष्ट्रीय आदर्श वाक्य है।',
      meaning: 'जीत सत्य की ही होती है, झूठ की नहीं।',
      fullMeaning:
        'जीत सत्य की ही होती है, झूठ की नहीं। सत्य से ही देवताओं का मार्ग बिछा है, जिस पर ऋषि, जिनकी सब इच्छाएँ पूरी हो चुकी हैं, सत्य के सबसे ऊँचे धाम तक जाते हैं।',
      scene:
        'शौनक एक बड़े गृहस्थ थे। वे विधि से अंगिरा ऋषि के पास गए और एक ही सवाल पूछा: वह क्या है जिसे जान लेने पर सब कुछ जान लिया जाता है (1.1.3)? पूरा उपनिषद इसी का उत्तर है। तीसरे मुण्डक तक आते आते अंगिरा बताते हैं कि आत्मा सत्य, तप, सही ज्ञान और संयम से मिलता है (3.1.5)। उसके ठीक बाद यह श्लोक आता है।',
      shankara:
        'शंकराचार्य यहाँ सत्य का अर्थ सच्चा आचरण लेते हैं: जो सच बोलता और सच जीता है, वही जीतता है, झूठा नहीं। और सत्य ही वह रास्ता है जिस पर चलकर ऋषि उस जगह पहुँचे जहाँ सत्य रखा है।',
      others:
        'सभी आचार्य सीधा अर्थ ही मानते हैं। एक बात लोग अक्सर पूछते हैं: उपनिषद में "जयते" है। कुछ संस्करणों में "जयति" छपा है, अर्थ वही है।',
      writingNote:
        'राष्ट्रीय प्रतीक (1950) में अशोक स्तंभ के सिंहों के नीचे देवनागरी में सत्यमेव जयते लिखा है। श्लोक आगे "नानृतं" यानी "झूठ नहीं" कहता है।',
      faq: [
        { q: 'सत्यमेव जयते किस उपनिषद से लिया गया है?', a: 'मुण्डक उपनिषद, श्लोक 3.1.6 से। मुण्डक उपनिषद अथर्ववेद का है।' },
        {
          q: 'सत्यमेव जयते का पूरा श्लोक क्या है?',
          a: 'सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः । येनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत् सत्यस्य परमं निधानम् ॥',
        },
        {
          q: 'सत्यमेव जयते को लोकप्रिय किसने बनाया?',
          a: 'स्वतंत्रता आंदोलन के समय पंडित मदन मोहन मालवीय ने इसे लोगों तक पहुँचाया, ऐसा माना जाता है। 1950 में राष्ट्रीय प्रतीक के साथ यह भारत का आदर्श वाक्य बना।',
        },
      ],
    },
    reviewed: false,
  },
  {
    slug: 'asato-ma-sadgamaya',
    cardId: 'up-asato-ma-sadgamaya',
    passage: 'brihadaranyaka.1.3.28',
    ref: 'Brihadaranyaka Upanishad 1.3.28',
    refShort: 'Brihadaranyaka 1.3.28',
    textName: 'Brihadaranyaka Upanishad',
    veda: 'Shukla Yajur Veda',
    title: 'Asato Ma Sadgamaya Meaning and Source',
    description:
      'Asato ma sadgamaya, tamaso ma jyotirgamaya: Brihadaranyaka Upanishad 1.3.28. Sanskrit, meaning line by line, the Upanishad\u2019s own gloss, a print card.',
    h1: 'Asato ma sadgamaya: lead me from the unreal to the real',
    quick:
      'Asato ma sadgamaya ("lead me from the unreal to the real") is from the Brihadaranyaka Upanishad 1.3.28, in the Shukla Yajur Veda. It is a chant the patron of a Soma rite says under his breath while the priest sings. Its three lines ask to be led from unreal to real, darkness to light, death to the deathless.',
    sa: 'असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥',
    iast: 'asato mā sad gamaya | tamaso mā jyotir gamaya | mṛtyor mā’mṛtaṃ gamaya ||',
    meaning: 'Lead me from the unreal to the real. Lead me from darkness to light. Lead me from death to the deathless.',
    fullMeaning:
      'When the priest begins the chant, the patron should say: lead me from the unreal to the real, lead me from darkness to light, lead me from death to the deathless. The Upanishad explains: the unreal is death and the real is the deathless, so "from the unreal to the real" means "make me deathless". Darkness is death and light is the deathless, so it means the same. In "from death to the deathless" nothing is hidden.',
    who: 'The patron of a Soma rite, while the priest sings',
    scene:
      'There is no dialogue here. The passage gives instructions for a Soma rite: when the priest begins the purifying chant, the patron of the rite recites these three lines under his breath. Then the Upanishad explains its own words, and all three lines turn out to ask one thing: make me deathless.',
    shankara:
      'Shankara follows the Upanishad’s own explanation. Unreal, darkness and death name one condition, the self taken as small and mortal; real, light and the deathless name the other. The prayer asks to be lifted from the first into the second.',
    others:
      '"Om shanti shanti shanti", often sung after the three lines, is a later addition for chanting and is not in this passage.',
    writing: {
      forms: [
        { sa: 'असतो मा सद्गमय', iast: 'asato mā sad gamaya', label: 'First line' },
        { sa: 'तमसो मा ज्योतिर्गमय', iast: 'tamaso mā jyotir gamaya', label: 'Second line' },
        { sa: 'मृत्योर्माऽमृतं गमय', iast: 'mṛtyor mā’mṛtaṃ gamaya', label: 'Third line' },
      ],
      note: 'For calligraphy the three lines usually sit one under another, each closed with a single danda (।) and the last with a double (॥). The small mark ऽ in माऽमृतं shows a dropped अ; keep it.',
    },
    gita: [{ c: 13, v: 17, note: 'Krishna on the light of all lights, beyond darkness, set in every heart.' }],
    related: ['sahana-vavatu', 'purnamadah-purnamidam', 'tat-tvam-asi'],
    faq: [
      {
        q: 'What is the meaning of asato ma sadgamaya?',
        a: 'Lead me from the unreal to the real, from darkness to light, from death to the deathless. The Upanishad itself says all three lines mean "make me deathless".',
      },
      { q: 'Which Upanishad is asato ma sadgamaya from?', a: 'The Brihadaranyaka Upanishad, 1.3.28, in the Shukla Yajur Veda.' },
      {
        q: 'Is "Om shanti shanti shanti" part of it?',
        a: 'No. The shanti ending is added when the lines are chanted as a prayer; the Upanishad passage ends with the three lines and its explanation.',
      },
    ],
    hi: {
      title: 'असतो मा सद्गमय का अर्थ, बृहदारण्यक उपनिषद',
      description:
        'असतो मा सद्गमय, तमसो मा ज्योतिर्गमय, मृत्योर्मामृतं गमय: बृहदारण्यक उपनिषद 1.3.28। संस्कृत, हर पंक्ति का हिंदी अर्थ और प्रिंट कार्ड।',
      h1: 'असतो मा सद्गमय: असत्य से सत्य की ओर',
      quick:
        'असतो मा सद्गमय ("मुझे असत्य से सत्य की ओर ले चलो") बृहदारण्यक उपनिषद 1.3.28 का मंत्र है, जो शुक्ल यजुर्वेद का उपनिषद है। सोम यज्ञ में जब पुरोहित गान शुरू करता है, तब यजमान ये तीन पंक्तियाँ धीरे से जपता है: असत्य से सत्य, अंधेरे से रोशनी, और मृत्यु से अमृत की ओर।',
      meaning: 'मुझे असत्य से सत्य की ओर ले चलो। अंधेरे से रोशनी की ओर ले चलो। मृत्यु से अमृत की ओर ले चलो।',
      fullMeaning:
        'जब पुरोहित गान शुरू करे, तब यजमान कहे: मुझे असत्य से सत्य की ओर ले चलो, अंधेरे से रोशनी की ओर ले चलो, मृत्यु से अमृत की ओर ले चलो। उपनिषद खुद समझाता है: असत्य मृत्यु है और सत्य अमृत है, इसलिए इसका अर्थ है "मुझे अमर कर दो"। अंधेरा मृत्यु है और रोशनी अमृत, अर्थ वही है। "मृत्यु से अमृत की ओर" में कुछ छिपा नहीं है।',
      scene:
        'यहाँ कोई संवाद नहीं है। यह सोम यज्ञ की विधि है: पुरोहित जब पवमान स्तोत्र गाना शुरू करे, तब यज्ञ करवाने वाला ये तीन पंक्तियाँ मन में जपे। फिर उपनिषद खुद इनका अर्थ बताता है, और तीनों पंक्तियाँ एक ही बात माँगती हैं: मुझे अमृत तक ले चलो।',
      shankara:
        'शंकराचार्य उपनिषद की अपनी व्याख्या के साथ चलते हैं। असत्य, अंधेरा और मृत्यु एक ही हालत के नाम हैं, जब हम खुद को छोटा और मरने वाला मानते हैं। सत्य, रोशनी और अमृत दूसरी हालत के नाम हैं। प्रार्थना पहली से दूसरी तक उठाए जाने की है।',
      others: 'तीनों पंक्तियों के बाद जो "ॐ शान्तिः शान्तिः शान्तिः" गाया जाता है, वह बाद में जोड़ा गया है। उपनिषद के इस अंश में वह नहीं है।',
      writingNote:
        'सुलेख में तीनों पंक्तियाँ एक के नीचे एक लिखी जाती हैं, हर पंक्ति के बाद एक दंड (।) और आख़िर में दो (॥)। माऽमृतं में ऽ (अवग्रह) छूटे हुए अ का निशान है, उसे रखें।',
      faq: [
        {
          q: 'असतो मा सद्गमय का अर्थ क्या है?',
          a: 'मुझे असत्य से सत्य की ओर, अंधेरे से रोशनी की ओर, और मृत्यु से अमृत की ओर ले चलो। उपनिषद कहता है कि तीनों का एक ही अर्थ है: मुझे अमर कर दो।',
        },
        { q: 'असतो मा सद्गमय किस उपनिषद से है?', a: 'बृहदारण्यक उपनिषद 1.3.28 से, जो शुक्ल यजुर्वेद का उपनिषद है।' },
        { q: 'क्या "ॐ शान्तिः शान्तिः शान्तिः" इसका हिस्सा है?', a: 'नहीं। प्रार्थना के रूप में गाते समय शान्ति पाठ जोड़ा जाता है। उपनिषद में ये तीन पंक्तियाँ और उनकी व्याख्या ही है।' },
      ],
    },
    reviewed: false,
  },
  {
    slug: 'uttishthata-jagrata',
    cardId: 'up-uttishthata-jagrata',
    passage: 'katha.1.3.14',
    ref: 'Katha Upanishad 1.3.14',
    refShort: 'Katha 1.3.14',
    textName: 'Katha Upanishad',
    veda: 'Krishna Yajur Veda',
    title: 'Uttishthata Jagrata Meaning, Katha Upanishad',
    description:
      'Uttishthata jagrata prapya varan nibodhata: "arise, awake, go to the great teachers and learn". Katha Upanishad 1.3.14, Sanskrit, meaning and a print card.',
    h1: 'Uttishthata jagrata: arise, awake',
    quick:
      'Uttishthata jagrata prapya varan nibodhata ("arise, awake, go to the great teachers and learn") is from the Katha Upanishad 1.3.14. Yama, the god of death, says it while teaching the boy Nachiketa. The verse warns that the path is as sharp as a razor’s edge. Swami Vivekananda made it a call to India.',
    sa: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत । क्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति ॥',
    iast: 'uttiṣṭhata jāgrata prāpya varān nibodhata | kṣurasya dhārā niśitā duratyayā durgaṃ pathas tat kavayo vadanti ||',
    meaning: 'Arise. Awake. Go to the great teachers and learn. The wise say the path is as sharp as a razor’s edge, hard to cross and hard to walk.',
    fullMeaning: '',
    who: 'Yama to Nachiketa, and to everyone listening',
    scene:
      'Nachiketa has turned down every gift Death offered and asked only what happens after death. Yama has just described the body as a chariot and the senses as horses, and the ladder from the senses up to the Self. Then he turns, in the plural, to everyone listening.',
    shankara:
      'Shankara hears it addressed to all who sleep in not knowing the Self: get up and turn toward that knowledge, wake from the sleep of ignorance, go to the best teachers and understand. The razor’s edge is how hard the Self is to know, fine and easy to miss.',
    others:
      '"Arise, awake, and stop not till the goal is reached" is Vivekananda’s English. The last words are his; the Upanishad asks you to go and learn, then warns about the edge.',
    writing: {
      forms: [
        { sa: 'उत्तिष्ठत जाग्रत', iast: 'uttiṣṭhata jāgrata', label: 'Arise, awake' },
        { sa: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत', iast: 'uttiṣṭhata jāgrata prāpya varān nibodhata', label: 'The full first half' },
      ],
      note: 'Both verbs are plural: Yama is speaking to everyone, so उत्तिष्ठत (with त at the end) is correct. उत्तिष्ठ, without it, is the singular.',
    },
    gita: [{ c: 4, v: 34, note: 'Krishna: learn it by bowing, asking and serving; those who have seen the truth will teach you.' }],
    textHref: '/upanishads/katha#v1-3-14',
    related: ['tat-tvam-asi', 'bhidyate-hridaya-granthih', 'sahana-vavatu'],
    faq: [
      { q: 'Where is "uttishthata jagrata" from?', a: 'The Katha Upanishad, 1.3.14. Yama, the god of death, says it to Nachiketa.' },
      {
        q: 'Did Vivekananda write "arise, awake, and stop not till the goal is reached"?',
        a: 'That English is his, based on this verse. The Upanishad says arise, awake, go to the great teachers and learn, and adds that the path is as sharp as a razor’s edge.',
      },
    ],
    reviewed: false,
  },
  {
    slug: 'ishavasyam-idam-sarvam',
    cardId: 'up-ishavasyam-idam-sarvam',
    passage: 'isha.1',
    ref: 'Isha Upanishad 1',
    refShort: 'Isha 1',
    textName: 'Isha Upanishad',
    veda: 'Shukla Yajur Veda',
    title: 'Ishavasyam Idam Sarvam Meaning, Isha Upanishad 1',
    description:
      'Ishavasyam idam sarvam: the first verse of the Isha Upanishad. Sanskrit, plain English, Shankara’s reading of "covered by the Lord", and a print card.',
    h1: 'Ishavasyam idam sarvam: all this, covered by the Lord',
    quick:
      'Ishavasyam idam sarvam ("all this is to be covered by the Lord") is the first verse of the Isha Upanishad, which is chapter 40 of the Shukla Yajur Veda Samhita. It goes on: let go, and live by that letting go; do not reach for anyone’s wealth. The whole Upanishad is eighteen verses long.',
    sa: 'ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् । तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥',
    iast: 'īśā vāsyam idaṃ sarvaṃ yat kiñca jagatyāṃ jagat | tena tyaktena bhuñjīthā mā gṛdhaḥ kasyasvid dhanam ||',
    meaning: 'Cover all of this with the Lord, everything that moves in this moving world. Let it go, and sustain yourself that way. Do not reach for anyone’s wealth.',
    fullMeaning: '',
    who: 'No speaker; the Upanishad opens with it',
    scene:
      'There is no story. The Isha begins with this verse as an instruction. Its eighteen verses move from seeing the Lord in everything, to a full life of work that does not cling (verse 2), to the person who sees every being in the Self (verse 6), and close with a prayer at the hour of death.',
    shankara:
      'Shankara reads "cover" as a way of seeing: clothe every moving thing in the thought of the Lord, the Self, the way the scent of sandalwood covers a damp smell, and the sense of a separate world drops away. Tyaktena is renunciation, and bhunjitha means protect or sustain yourself by it. For him this verse is for the one ready to renounce; verse 2 is for the one who must keep working.',
    others:
      'Vedanta Desika, writing in Ramanuja’s line, reads ishavasyam as "to be dwelt in by the Lord": the world is his body and lives in him. Enjoy what he gives, and leave what belongs to another.',
    writing: {
      forms: [
        { sa: 'ईशा वास्यमिदं सर्वम्', iast: 'īśā vāsyam idaṃ sarvam', label: 'As the text has it' },
        { sa: 'ईशावास्यमिदं सर्वम्', iast: 'īśāvāsyam idaṃ sarvam', label: 'As often printed, joined' },
      ],
      note: 'The text prints ईशा वास्यम्: "by the Lord" and "to be covered". The joined ईशावास्यम् is also seen and gives the Upanishad its other name, Ishavasya.',
    },
    gita: [{ c: 5, v: 10, note: 'Krishna: one who acts, offering the work to Brahman and letting go of attachment, is untouched by wrong, as a lotus leaf by water.' }],
    textHref: '/upanishads/isha#v1',
    related: ['purnamadah-purnamidam', 'tat-tvam-asi', 'aham-brahmasmi'],
    faq: [
      { q: 'What does ishavasyam idam sarvam mean?', a: 'All of this, whatever moves in the world, is to be covered by the Lord. The verse continues: let it go and sustain yourself that way; do not reach for anyone’s wealth.' },
      { q: 'How long is the Isha Upanishad?', a: 'Eighteen verses, with the purnamadah invocation recited before and after. You can read it whole on our Isha page in one sitting.' },
    ],
    reviewed: false,
  },
  {
    slug: 'aham-brahmasmi',
    cardId: 'up-aham-brahmasmi',
    passage: 'brihadaranyaka.1.4.10',
    ref: 'Brihadaranyaka Upanishad 1.4.10',
    refShort: 'Brihadaranyaka 1.4.10',
    textName: 'Brihadaranyaka Upanishad',
    veda: 'Shukla Yajur Veda',
    title: 'Aham Brahmasmi Meaning and Source',
    description:
      'Aham brahmasmi means "I am Brahman". Brihadaranyaka Upanishad 1.4.10: the full passage, plain English, how Shankara and Ramanuja read it, and a print card.',
    h1: 'Aham brahmasmi: I am Brahman',
    quick:
      'Aham brahmasmi ("I am Brahman") is from the Brihadaranyaka Upanishad 1.4.10, in the Shukla Yajur Veda. In the beginning, the text says, Brahman knew itself as "I am Brahman" and so became all. Whoever knows the same, then or now, becomes all of this, and even the gods cannot stand in the way.',
    sa: 'अहं ब्रह्मास्मि',
    iast: 'ahaṃ brahmāsmi',
    meaning: 'I am Brahman.',
    fullMeaning:
      'In the beginning this was Brahman. It knew only itself: "I am Brahman." So it became all. Whoever among the gods woke to this became that, and so with the sages and with people. Seeing this, the sage Vamadeva said, "I was Manu, and the sun." Even now, whoever knows "I am Brahman" becomes all of this. Even the gods cannot stop him, for he becomes their Self. But one who worships another god, thinking "he is one and I am another", does not know.',
    who: 'The Upanishad, telling how things began',
    scene:
      'This comes in the Brihadaranyaka’s account of the beginning. Before anything else there was Brahman, and it knew only itself. The passage says the same knowing is open to gods, sages and people, and names the sage Vamadeva, who saw it. It ends with a warning about worship that keeps the god at a distance.',
    shankara:
      'Shankara reads the sentence as knowing what already is. Nothing new is gained: the self was always Brahman, and only ignorance hid it. "Became all" means the sense of being a limited someone fell away.',
    others:
      'Ramanuja reads "I" as reaching through the self to Brahman, who lives in it as its inner Self; the self is Brahman’s body and never the whole of Brahman. Madhva’s school reads the line as the self’s likeness to, and dependence on, Brahman.',
    writing: {
      forms: [{ sa: 'अहं ब्रह्मास्मि', iast: 'ahaṃ brahmāsmi', label: 'Two words' }],
      note: 'अहम् ends in म्, which becomes the dot (anusvara) before ब: अहं. In the text it runs on as वेदहं ब्रह्मास्मीति, "knew: I am Brahman".',
    },
    gita: [{ c: 7, v: 19, note: 'Krishna: after many births the one who knows reaches me, seeing that Vasudeva is all.' }],
    related: ['tat-tvam-asi', 'purnamadah-purnamidam', 'bhidyate-hridaya-granthih'],
    faq: [
      { q: 'Where does aham brahmasmi come from?', a: 'The Brihadaranyaka Upanishad, 1.4.10, in the Shukla Yajur Veda. It is counted among the four mahavakyas.' },
      { q: 'Does aham brahmasmi mean "I am God"?', a: 'Brahman is the one reality behind everything. Shankara reads the sentence as the self recognising it was never other than that; Ramanuja reads it as the self knowing Brahman as its inner Self.' },
    ],
    reviewed: false,
  },
  {
    slug: 'purnamadah-purnamidam',
    cardId: 'up-purnamadah-purnamidam',
    passage: 'shanti.purnamadah',
    ref: 'Isha Upanishad, invocation',
    refShort: 'Isha invocation',
    textName: 'Isha Upanishad',
    veda: 'Shukla Yajur Veda',
    title: 'Purnamadah Purnamidam Meaning and Source',
    description:
      'Om purnamadah purnamidam: the Isha Upanishad invocation, also Brihadaranyaka 5.1.1. Sanskrit, plain English, Shankara’s reading and a print card.',
    h1: 'Purnamadah purnamidam: that is whole, this is whole',
    quick:
      'Purnamadah purnamidam ("that is whole, this is whole") is the invocation of the Isha Upanishad and also opens the Brihadaranyaka Upanishad 5.1.1, both in the Shukla Yajur Veda. It says the whole comes out of the whole, and when the whole is taken from the whole, the whole remains.',
    sa: 'ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते । पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥',
    iast: 'oṃ pūrṇam adaḥ pūrṇam idaṃ pūrṇāt pūrṇam udacyate | pūrṇasya pūrṇam ādāya pūrṇam evāvaśiṣyate ||',
    meaning: 'That is whole. This is whole. From the whole, the whole comes out. Take the whole from the whole, and the whole is what remains.',
    fullMeaning: '',
    who: 'Recited before and after the Isha Upanishad',
    scene:
      'It is chanted at the start and end of the Isha, and of other texts of the Shukla Yajur Veda, as a peace chant. In the Brihadaranyaka it opens the fifth chapter and is followed at once by "Om, Brahman is space".',
    shankara:
      'Commenting on Brihadaranyaka 5.1.1, Shankara takes "that" as Brahman beyond every condition, and "this" as the same Brahman seen through name and form. Both are whole. The world comes out of Brahman without making it any less, and when knowledge removes the limiting forms, only the whole remains.',
    others: 'Other schools keep the image of fullness and read it as the Lord’s fullness, which loses nothing in making and holding the world.',
    writing: {
      forms: [
        { sa: 'पूर्णमदः पूर्णमिदम्', iast: 'pūrṇam adaḥ pūrṇam idam', label: 'First words' },
        { sa: 'पूर्णमेवावशिष्यते', iast: 'pūrṇam evāvaśiṣyate', label: 'Last words: the whole remains' },
      ],
      note: 'In the text the words are joined: पूर्णात्पूर्णमुदच्यते. The visarga (ः) after पूर्णमद is part of the word अदः, "that"; keep both dots.',
    },
    gita: [{ c: 9, v: 4, note: 'Krishna: this whole world is pervaded by me, in my unmanifest form.' }],
    textHref: '/upanishads/isha#invocation',
    related: ['ishavasyam-idam-sarvam', 'sahana-vavatu', 'asato-ma-sadgamaya'],
    faq: [
      { q: 'Where is purnamadah purnamidam from?', a: 'It is the invocation (shanti path) of the Isha Upanishad, and the opening of Brihadaranyaka Upanishad 5.1.1.' },
      { q: 'What does purnam mean?', a: 'Whole, full, lacking nothing. The verse uses it for both "that" (Brahman) and "this" (the world as it appears).' },
    ],
    reviewed: false,
  },
  {
    slug: 'sahana-vavatu',
    cardId: 'up-sahana-vavatu',
    passage: 'shanti.sahanavavatu',
    ref: 'Taittiriya Upanishad 2.1, invocation',
    refShort: 'Taittiriya invocation',
    textName: 'Taittiriya Upanishad',
    veda: 'Krishna Yajur Veda',
    title: 'Om Sahana Vavatu Meaning and Source',
    description:
      'Om saha navavatu, saha nau bhunaktu: the shanti mantra of the Taittiriya and Katha Upanishads. Sanskrit, meaning line by line, and a print card.',
    h1: 'Saha navavatu: may he protect us both',
    quick:
      'Saha navavatu ("may he protect us both") is a shanti mantra of the Krishna Yajur Veda. It opens the Katha Upanishad and the second and third chapters of the Taittiriya Upanishad. Teacher and student say it together before study: protect us, nourish us, let us work with strength, let our study shine, and let us never resent each other.',
    sa: 'ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै । तेजस्वि नावधीतमस्तु मा विद्विषावहै ॥',
    iast: 'oṃ saha nāv avatu | saha nau bhunaktu | saha vīryaṃ karavāvahai | tejasvi nāv adhītam astu mā vidviṣāvahai ||',
    meaning: 'May he protect us both. May he nourish us both. May we work together with strength. May what we study shine. May we never resent each other.',
    fullMeaning: '',
    who: 'Teacher and student, together',
    scene:
      '"Us both" (nau) is the teacher and the student, about to sit down to a lesson. The chant ends with peace said three times: om shanti shanti shanti.',
    shankara:
      'In the Taittiriya, Shankara explains the chant as a prayer to remove what stands in the way of learning. "He" is the Lord. The last line asks that no ill feeling arise between teacher and student through any fault in teaching or in learning.',
    others: 'The meaning is the same in every school. Chant books print it with the other Taittiriya shanti mantras; the words do not change.',
    writing: {
      forms: [
        { sa: 'ॐ सह नाववतु', iast: 'oṃ saha nāv avatu', label: 'Opening' },
        { sa: 'मा विद्विषावहै', iast: 'mā vidviṣāvahai', label: 'May we not resent each other' },
      ],
      note: 'नाववतु is नौ ("us two") and अवतु ("may he protect") joined. The verbs ending in -आवहै are dual: they are about exactly two people.',
    },
    gita: [{ c: 10, v: 9, note: 'Krishna on people who teach each other: their minds on me, they find joy in speaking of me together.' }],
    textHref: '/upanishads/katha#invocation',
    related: ['asato-ma-sadgamaya', 'purnamadah-purnamidam', 'matru-devo-bhava'],
    faq: [
      { q: 'Where does om sahana vavatu come from?', a: 'It is the shanti mantra of the Krishna Yajur Veda: it opens the Katha Upanishad and chapters 2 and 3 of the Taittiriya Upanishad.' },
      { q: 'Who is "us both"?', a: 'The teacher and the student. The verbs are in the dual, so they refer to exactly two people.' },
    ],
    reviewed: false,
  },
  {
    slug: 'matru-devo-bhava',
    cardId: 'up-matru-devo-bhava',
    passage: 'taittiriya.1.11.2',
    ref: 'Taittiriya Upanishad 1.11.2',
    refShort: 'Taittiriya 1.11.2',
    textName: 'Taittiriya Upanishad',
    veda: 'Krishna Yajur Veda',
    title: 'Matru Devo Bhava Meaning and Source',
    description:
      'Matru devo bhava, pitru devo bhava, acharya devo bhava, atithi devo bhava: Taittiriya Upanishad 1.11.2. Sanskrit, meaning and the teacher’s full advice.',
    h1: 'Matru devo bhava: let your mother be a god to you',
    quick:
      'Matru devo bhava ("let your mother be a god to you") is from the Taittiriya Upanishad 1.11.2, in the Krishna Yajur Veda. A teacher says it to students finishing their Vedic study, with pitru devo bhava, acharya devo bhava and atithi devo bhava: father, teacher and guest as gods too.',
    sa: 'मातृदेवो भव । पितृदेवो भव । आचार्यदेवो भव । अतिथिदेवो भव ।',
    iast: 'mātṛdevo bhava | pitṛdevo bhava | ācāryadevo bhava | atithidevo bhava |',
    meaning: 'Let your mother be a god to you. Let your father be a god to you. Let your teacher be a god to you. Let your guest be a god to you.',
    fullMeaning:
      'Do not neglect what you owe to the gods and the ancestors. Let your mother be a god to you. Let your father be a god to you. Let your teacher be a god to you. Let your guest be a god to you. Do the deeds that are blameless, and no others. Follow what we did well, and nothing else.',
    who: 'A teacher to his students on the day they leave',
    scene:
      'This is the teacher’s parting address, the eleventh section of the first chapter. It begins "speak the truth, follow dharma, do not neglect your study" (1.11.1) and goes on to the people a graduate should honour. It ends with plain advice: copy only our good conduct, give with faith and modesty, and when in doubt, act as wise and kind people around you act.',
    shankara:
      'Shankara says to honour mother, father, teacher and guest as you would a god. He adds that this teaching is for someone living a life of work; it clears the mind and readies it for the knowledge the later chapters give.',
    others: 'No school reads it differently. The guest line, atithi devo bhava, is also known as a slogan of Indian tourism.',
    writing: {
      forms: [
        { sa: 'मातृदेवो भव', iast: 'mātṛdevo bhava', label: 'Mother' },
        { sa: 'अतिथिदेवो भव', iast: 'atithidevo bhava', label: 'Guest' },
      ],
      note: 'One compound and one verb: मातृ + देवः becomes मातृदेवो before भव, "be".',
    },
    gita: [{ c: 17, v: 14, note: 'Krishna on the discipline of the body: honouring the gods, the twice-born, teachers and the wise.' }],
    related: ['sahana-vavatu', 'satyameva-jayate', 'uttishthata-jagrata'],
    faq: [
      { q: 'Matru devo bhava is from which Upanishad?', a: 'The Taittiriya Upanishad, 1.11.2, in the Krishna Yajur Veda.' },
      { q: 'What is the full line?', a: 'मातृदेवो भव । पितृदेवो भव । आचार्यदेवो भव । अतिथिदेवो भव ॥ Let your mother, your father, your teacher and your guest be gods to you.' },
    ],
    reviewed: false,
  },
  {
    slug: 'bhidyate-hridaya-granthih',
    cardId: 'up-bhidyate-hridaya-granthih',
    passage: 'mundaka.2.2.8',
    ref: 'Mundaka Upanishad 2.2.8',
    refShort: 'Mundaka 2.2.8',
    textName: 'Mundaka Upanishad',
    veda: 'Atharva Veda',
    title: 'Bhidyate Hridaya Granthih Meaning, Mundaka 2.2.8',
    description:
      'Bhidyate hridaya-granthih: the knot of the heart is loosened. Mundaka Upanishad 2.2.8, Sanskrit, plain English, Shankara’s reading and a print card.',
    h1: 'Bhidyate hridaya-granthih: the knot of the heart comes loose',
    quick:
      'Bhidyate hridaya-granthih ("the knot of the heart is loosened") is from the Mundaka Upanishad 2.2.8, in the Atharva Veda. Angiras tells Shaunaka that when the highest is seen, the knot of the heart comes undone, every doubt is cut, and past deeds lose their hold. The Bhagavata Purana quotes the verse.',
    sa: 'भिद्यते हृदयग्रन्थिश्छिद्यन्ते सर्वसंशयाः । क्षीयन्ते चास्य कर्माणि तस्मिन् दृष्टे परावरे ॥',
    iast: 'bhidyate hṛdayagranthiś chidyante sarvasaṃśayāḥ | kṣīyante cāsya karmāṇi tasmin dṛṣṭe parāvare ||',
    meaning: 'The knot of the heart comes loose, every doubt is cut away, and a person’s deeds wear out, once That is seen, the high and the low.',
    fullMeaning: '',
    who: 'Angiras to Shaunaka',
    scene:
      'The second chapter of the Mundaka has just made Om the bow, the self the arrow and Brahman the target (2.2.4). This verse says what happens to the one whose arrow lands.',
    shankara:
      'Shankara reads the knot as the desires lodged in the intellect, born of not knowing the Self. The doubts are doubts about what can be known. The deeds that wear out are those not yet bearing fruit; the ones that made this body run their course. Paravara is the one who is both cause and effect, high and low.',
    others: 'Ramanuja’s line, and the Bhagavata Purana (1.2.21), read the seeing as seeing the Lord, with the same release from doubt and deed.',
    writing: {
      forms: [
        { sa: 'भिद्यते हृदयग्रन्थिः', iast: 'bhidyate hṛdayagranthiḥ', label: 'The knot comes loose' },
        { sa: 'छिद्यन्ते सर्वसंशयाः', iast: 'chidyante sarvasaṃśayāḥ', label: 'Every doubt is cut' },
      ],
      note: 'In the verse the visarga of ग्रन्थिः becomes श् before छ: हृदयग्रन्थिश्छिद्यन्ते. Written alone, the word ends in ः.',
    },
    gita: [{ c: 4, v: 37, note: 'Krishna: as a fire turns wood to ash, the fire of knowledge turns all deeds to ash.' }],
    related: ['satyameva-jayate', 'tat-tvam-asi', 'aham-brahmasmi'],
    faq: [
      { q: 'Where is "bhidyate hridaya granthih" from?', a: 'Mundaka Upanishad 2.2.8. The Bhagavata Purana repeats it at 1.2.21 with a different last line.' },
      { q: 'What is the knot of the heart?', a: 'In Shankara’s reading, the desires lodged in the mind that come from not knowing the Self. When the Self is known, they come undone.' },
    ],
    reviewed: false,
  },
]

export const LINE_SLUGS = LINES.map((l) => l.slug)
export const HI_LINE_SLUGS = LINES.filter((l) => l.hi).map((l) => l.slug)
export const lineBySlug = (slug: string) => LINES.find((l) => l.slug === slug)
