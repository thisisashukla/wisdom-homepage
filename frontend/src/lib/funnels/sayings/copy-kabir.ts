/** Page copy for the Kabir pages (Wisdom's own words, reviewed: false). */

import type { FoundIn, KabirTheme } from './data'

export const KAB_PATH = '/hi/kabir-ke-dohe'
export const KAB_PATH_EN = '/kabir-dohe-in-english'
export const dohaPath = (slug: string) => `${KAB_PATH}/${slug}`

export const KAB_THEME: Record<KabirTheme, { hi: string; en: string; introHi: string; introEn: string }> = {
  guru: { hi: 'गुरु पर दोहे', en: 'On the guru', introHi: 'गुरु पूर्णिमा और शिक्षक दिवस पर सबसे ज़्यादा भेजे जाने वाले दोहे।', introEn: 'The dohe people send on Guru Purnima and Teachers\' Day.' },
  vani: { hi: 'बोली और व्यवहार', en: 'Speech and conduct', introHi: 'कैसे बोलें, कैसे बरतें, और आलोचना को कैसे लें।', introEn: 'How to speak, how to behave, and what to do with criticism.' },
  samay: { hi: 'समय और जीवन', en: 'Time and life', introHi: 'जो आज है वह कल नहीं रहेगा। कबीर यह बात कई तरह से कहते हैं।', introEn: 'Today will not come again. Kabir says it a dozen ways.' },
  prem: { hi: 'प्रेम और भक्ति', en: 'Love and devotion', introHi: 'किताबों से आगे का प्रेम, और भीतर बसे राम।', introEn: 'Love beyond books, and the Ram who lives inside you.' },
  sach: { hi: 'सच और दिखावा', en: 'Truth and show', introHi: 'माला, मूर्ति और जाति के दिखावे पर कबीर की सीधी बात।', introEn: 'Kabir on beads, idols and caste, said plainly.' },
}

export const FOUND_SHORT: Record<FoundIn, { hi: string; en: string }> = {
  granthavali: { hi: 'कबीर ग्रंथावली में', en: 'In the Kabir Granthavali' },
  'kavita-kaumudi': { hi: 'कविता-कौमुदी (1917) में', en: 'In Kavita-Kaumudi (1917)' },
  sung: { hi: 'गायन परंपरा से', en: 'From the sung tradition' },
}

export const KAB_HUB = {
  hi: {
    title: 'कबीर के दोहे अर्थ सहित: 50 प्रसिद्ध दोहे',
    description: 'कबीर के 50 प्रसिद्ध दोहे, आसान हिंदी और अंग्रेज़ी अर्थ, कठिन शब्दों के अर्थ, और हर दोहा किस संग्रह में मिलता है। कॉपी करें या स्टेटस बनाएं।',
    h1: 'कबीर के दोहे, अर्थ सहित',
    promise: 'पचास दोहे जो लोग सबसे ज़्यादा खोजते और भेजते हैं। किसी भी रेखांकित शब्द पर टैप करें, उसका अर्थ वहीं दिखेगा।',
    quick:
      'कबीर के सबसे मशहूर दोहे, जैसे "गुरु गोविंद दोऊ खड़े" और "बुरा जो देखन मैं चला", रामनरेश त्रिपाठी की कविता-कौमुदी (1917) में छपे मिलते हैं। यहाँ 50 दोहे हैं: हर एक का आसान हिंदी अर्थ, अंग्रेज़ी अर्थ, कठिन शब्दों के अर्थ, और यह कि दोहा किस संग्रह में मिलता है।',
    faq: [
      { q: 'कबीर का सबसे प्रसिद्ध दोहा कौन सा है?', a: '"गुरु गोविंद दोऊ खड़े, काके लागूँ पाँय। बलिहारी गुरु आपने, जिन गोविंद दिया बताय॥" गुरु पूर्णिमा पर यह सबसे ज़्यादा भेजा जाता है। इसका मतलब है कि भगवान तक पहुँचाने वाले गुरु को पहले प्रणाम।' },
      { q: 'कबीर के दोहे किस भाषा में हैं?', a: 'कबीर की भाषा को सधुक्कड़ी कहते हैं: इसमें अवधी, ब्रज, खड़ी बोली, राजस्थानी और पंजाबी के शब्द मिले हुए हैं। इसीलिए एक ही दोहे के कई रूप मिलते हैं।' },
      { q: 'साखी और दोहा में क्या फ़र्क है?', a: 'कबीर ग्रंथावली में उनके दोहों को साखी कहा गया है, यानी साक्षी: जो खुद देखा, वही कहा। छंद के हिसाब से ये दोहे ही हैं।' },
      { q: 'क्या ये सभी दोहे सच में कबीर के हैं?', a: 'कबीर ने खुद कुछ नहीं लिखा। उनके दोहे सदियों तक गाकर आगे बढ़े और बाद में संग्रहों में लिखे गए। इसलिए हर दोहे के साथ हमने लिखा है कि वह कहाँ मिलता है: कबीर ग्रंथावली, कविता-कौमुदी (1917), या गायन परंपरा।' },
      { q: 'कबीर जयंती 2027 में कब है?', a: 'कबीर जयंती ज्येष्ठ पूर्णिमा को मनाई जाती है। 2027 में यह 18 जून को है।' },
      { q: 'गुरु पूर्णिमा 2027 पर कौन सा दोहा भेजें?', a: 'गुरु पूर्णिमा 18 जुलाई 2027 को है। "गुरु गोविंद दोऊ खड़े" और "गुरु कुम्हार सिष कुंभ है" सबसे ज़्यादा पसंद किए जाते हैं।' },
    ],
  },
  en: {
    title: 'Kabir Dohe in English: 50 Dohas With Meaning',
    description: 'Fifty of Kabir\'s best known dohe in the original, with plain English meanings, word meanings and where each one is found. Copy or share any line.',
    h1: 'Kabir\'s dohe in English',
    promise: 'Fifty dohe in Kabir\'s own words, each with a plain English meaning. Tap an underlined word to see what it means.',
    quick:
      'Kabir\'s best known doha, "Guru Govind dou khade", asks whom to bow to first, the guru or God, and answers: the guru, who showed the way to God. It is in Kavita-Kaumudi (1917). Below are 50 dohe in the original with our English meanings and where each one is found.',
    faq: [
      { q: 'Who was Kabir?', a: 'A weaver-poet of Varanasi in the fifteenth century. His short two-line verses, the dohe or sakhis, were sung for centuries before anyone wrote them down. Hindus and Muslims both claim him.' },
      { q: 'What language did Kabir write in?', a: 'He did not write; he sang. His language, called Sadhukkadi, mixes Awadhi, Braj, Khari Boli, Rajasthani and Punjabi. That is why one doha can turn up in several spellings.' },
      { q: 'What is the meaning of "Pothi padh padh jag mua"?', a: 'The world wore itself out reading books and no one became wise. Whoever learns the two and a half letters of "prem" (love) is the learned one.' },
      { q: 'When is Kabir Jayanti in 2027?', a: 'Kabir Jayanti falls on Jyeshtha Purnima, which is 18 June 2027. Guru Purnima, when his guru dohe are shared most, is 18 July 2027.' },
    ],
  },
}
