/** The ten principal Upanishads (those Shankara commented on), plus the Shvetashvatara often added. reviewed: false. */
export type Principal = {
  id: string
  en: string
  hi: string
  veda: { en: string; hi: string }
  size: { en: string; hi: string }
  about: { en: string; hi: string }
  href?: string
}

export const PRINCIPAL: Principal[] = [
  { id: 'isha', en: 'Isha', hi: 'ईश', veda: { en: 'Shukla Yajur Veda', hi: 'शुक्ल यजुर्वेद' }, size: { en: '18 verses', hi: '18 मंत्र' }, about: { en: 'See the Lord in everything; work without clinging.', hi: 'सबमें ईश्वर को देखो, बिना लगाव के कर्म करो।' }, href: '/upanishads/isha' },
  { id: 'kena', en: 'Kena', hi: 'केन', veda: { en: 'Sama Veda', hi: 'सामवेद' }, size: { en: '4 sections, 35 verses', hi: '4 खंड, 35 मंत्र' }, about: { en: 'Who sends the mind out? The knower that cannot be known as an object.', hi: 'मन को कौन चलाता है? वह जानने वाला जिसे वस्तु की तरह नहीं जाना जा सकता।' } },
  { id: 'katha', en: 'Katha', hi: 'कठ', veda: { en: 'Krishna Yajur Veda', hi: 'कृष्ण यजुर्वेद' }, size: { en: '119 verses', hi: '119 मंत्र' }, about: { en: 'The boy Nachiketa asks Death what happens after death.', hi: 'बालक नचिकेता यमराज से पूछता है कि मृत्यु के बाद क्या होता है।' }, href: '/upanishads/katha' },
  { id: 'prashna', en: 'Prashna', hi: 'प्रश्न', veda: { en: 'Atharva Veda', hi: 'अथर्ववेद' }, size: { en: '6 questions', hi: '6 प्रश्न' }, about: { en: 'Six students bring six questions to the sage Pippalada.', hi: 'छह शिष्य ऋषि पिप्पलाद के पास छह प्रश्न लेकर आते हैं।' } },
  { id: 'mundaka', en: 'Mundaka', hi: 'मुण्डक', veda: { en: 'Atharva Veda', hi: 'अथर्ववेद' }, size: { en: '64 verses', hi: '64 मंत्र' }, about: { en: 'Higher and lower knowledge; the two birds; satyameva jayate.', hi: 'परा और अपरा विद्या, दो पक्षी, सत्यमेव जयते।' }, href: '/upanishads/satyameva-jayate' },
  { id: 'mandukya', en: 'Mandukya', hi: 'माण्डूक्य', veda: { en: 'Atharva Veda', hi: 'अथर्ववेद' }, size: { en: '12 verses', hi: '12 मंत्र' }, about: { en: 'Om, and the four states: waking, dream, deep sleep and the fourth.', hi: 'ॐ और चार अवस्थाएँ: जाग्रत, स्वप्न, सुषुप्ति और तुरीय।' }, href: '/upanishads/mandukya' },
  { id: 'taittiriya', en: 'Taittiriya', hi: 'तैत्तिरीय', veda: { en: 'Krishna Yajur Veda', hi: 'कृष्ण यजुर्वेद' }, size: { en: '3 chapters', hi: '3 वल्लियाँ' }, about: { en: 'Matru devo bhava; the five sheaths; Brahman as bliss.', hi: 'मातृदेवो भव, पाँच कोश, आनंद रूप ब्रह्म।' }, href: '/upanishads/matru-devo-bhava' },
  { id: 'aitareya', en: 'Aitareya', hi: 'ऐतरेय', veda: { en: 'Rig Veda', hi: 'ऋग्वेद' }, size: { en: '3 chapters, 33 verses', hi: '3 अध्याय, 33 मंत्र' }, about: { en: 'How the Self made the worlds; prajnanam brahma.', hi: 'आत्मा से सृष्टि कैसे हुई; प्रज्ञानं ब्रह्म।' }, href: '/upanishads/mahavakyas' },
  { id: 'chandogya', en: 'Chandogya', hi: 'छान्दोग्य', veda: { en: 'Sama Veda', hi: 'सामवेद' }, size: { en: '8 chapters', hi: '8 अध्याय' }, about: { en: 'Uddalaka teaches his son Shvetaketu: tat tvam asi.', hi: 'उद्दालक अपने पुत्र श्वेतकेतु को सिखाते हैं: तत्त्वमसि।' }, href: '/upanishads/tat-tvam-asi' },
  { id: 'brihadaranyaka', en: 'Brihadaranyaka', hi: 'बृहदारण्यक', veda: { en: 'Shukla Yajur Veda', hi: 'शुक्ल यजुर्वेद' }, size: { en: '6 chapters, the longest', hi: '6 अध्याय, सबसे लंबा' }, about: { en: 'Yajnavalkya and Maitreyi; neti neti; aham brahmasmi; asato ma.', hi: 'याज्ञवल्क्य और मैत्रेयी, नेति नेति, अहं ब्रह्मास्मि, असतो मा।' }, href: '/upanishads/aham-brahmasmi' },
]

export const SHVETASHVATARA = {
  en: 'The Shvetashvatara (Krishna Yajur Veda, 6 chapters) is often counted as the eleventh: it speaks of the Lord with devotion, and Shankara is traditionally said to have commented on it too.',
  hi: 'श्वेताश्वतर उपनिषद (कृष्ण यजुर्वेद, 6 अध्याय) को अक्सर ग्यारहवाँ गिना जाता है। इसमें भक्ति के साथ ईश्वर की बात है।',
}

export const GITA_DHYANAM = {
  sa: 'सर्वोपनिषदो गावो दोग्धा गोपालनन्दनः ।\nपार्थो वत्सः सुधीर्भोक्ता दुग्धं गीतामृतं महत् ॥',
  iast: 'sarvopaniṣado gāvo dogdhā gopālanandanaḥ |\npārtho vatsaḥ sudhīr bhoktā dugdhaṃ gītāmṛtaṃ mahat ||',
  ref: 'Gita Dhyanam, verse 4',
  en: 'All the Upanishads are the cows, and the one who milks them is Krishna, the cowherd’s son. Arjuna is the calf, the wise are the ones who drink, and the milk is the great nectar of the Gita.',
  hi: 'सारे उपनिषद गायें हैं, उन्हें दुहने वाले ग्वाले के बेटे श्रीकृष्ण हैं। अर्जुन बछड़ा है, समझदार लोग पीने वाले हैं, और दूध गीता का महान अमृत है।',
}
