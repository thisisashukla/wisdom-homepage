/** Shared copy for the scene hub (EN and HI twins) and its FAQ. */

import { SCENES } from './data'

const both = SCENES.filter((s) => s.lamps.valmiki.state === 'lit' && s.lamps.tulsidas.state === 'lit').length
const tulsidasOnly = SCENES.filter((s) => s.lamps.valmiki.state === 'dark' && (s.lamps.tulsidas.state === 'lit' || s.lamps.tulsidas.state === 'partial')).length
const neither = SCENES.filter((s) => s.lamps.valmiki.state === 'dark' && s.lamps.tulsidas.state === 'dark').length

const NUM_EN = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const HUB_COUNTS = { total: SCENES.length, both, tulsidasOnly, neither }

export const HUB_QUICK = {
  en: `Ramayana: Part 1 reportedly covers Bal, Ayodhya and Aranya Kand, up to Sita's abduction. Here are ${NUM_EN[SCENES.length]} of its best-known scenes, checked against Valmiki's Sanskrit Ramayana and Tulsidas's Ramcharitmanas, each with the verse reference. ${cap(NUM_EN[both])} are in both texts, ${NUM_EN[tulsidasOnly]} come from Tulsidas alone, and ${NUM_EN[neither]}, Shabari's tasted berries, is in neither.`,
  hi: `खबरों के मुताबिक "रामायण: पार्ट 1" बालकाण्ड, अयोध्याकाण्ड और अरण्यकाण्ड को, सीता हरण तक, दिखाती है। यहाँ उसके ${SCENES.length} जाने-माने दृश्यों को वाल्मीकि की संस्कृत रामायण और तुलसीदास के रामचरितमानस से मिलाया गया है, हर एक के साथ श्लोक या चौपाई का संदर्भ है। ${both} दृश्य दोनों ग्रंथों में हैं, ${tulsidasOnly} सिर्फ़ तुलसीदास के यहाँ, और ${neither}, शबरी के जूठे बेर, किसी में नहीं।`,
}

export const HUB_FAQ = {
  en: [
    {
      q: 'Which Ramayana is the film Ramayana: Part 1 based on?',
      a: 'The makers have not published a list of the texts they used, and press reports on the credits name screenwriter Shridhar Raghavan for the story. Several scenes people know best, like Kevat at the river and the Lakshman Rekha, come from Tulsidas or later tellings, so a film that shows them is drawing on more than Valmiki.',
    },
    {
      q: "Is the Lakshman Rekha in Valmiki's Ramayana?",
      a: 'No. In Aranya Kanda, sarga 45, Lakshman leaves Sita with a blessing for the forest spirits to protect her. Tulsidas mentions the line once, through Mandodari in Lanka Kand.',
    },
    {
      q: 'Did Ahalya turn to stone in the original Ramayana?',
      a: "Valmiki has no stone: Gautama's curse leaves her unseen in the hermitage, living on air, until Ram arrives (Bala Kanda, sargas 48 and 49). The stone body is in Tulsidas's Bal Kand.",
    },
    {
      q: 'Did Shabari give Ram berries she had tasted?',
      a: 'Neither Valmiki (Aranya Kanda, sarga 74) nor Tulsidas (Aranya Kand, doha 34) says so. Both have her offer Ram forest fruit and roots; the tasted berries come from later devotional retellings.',
    },
    {
      q: 'How much of the Ramayana does Part 1 cover?',
      a: "Reports say Part 1 ends around Sita's abduction, with Hanuman arriving only at the climax. In the texts that is Valmiki's Bala, Ayodhya and Aranya Kandas and the same three kands of the Ramcharitmanas.",
    },
  ],
  hi: [
    {
      q: '"रामायण: पार्ट 1" किस रामायण पर आधारित है?',
      a: 'फ़िल्म बनाने वालों ने अपने स्रोत ग्रंथों की सूची नहीं दी है। क्रेडिट पर छपी खबरों में कहानी के लिए पटकथा लेखक श्रीधर राघवन का नाम है। केवट और लक्ष्मण रेखा जैसे कई जाने-माने दृश्य तुलसीदास या बाद की कथाओं से आते हैं, इसलिए जो फ़िल्म इन्हें दिखाए, वह सिर्फ़ वाल्मीकि पर नहीं टिकी।',
    },
    {
      q: 'क्या वाल्मीकि रामायण में लक्ष्मण रेखा है?',
      a: 'नहीं। अरण्यकाण्ड, सर्ग 45 में लक्ष्मण सीता को वन देवताओं की रक्षा में छोड़कर जाते हैं। तुलसीदास लंकाकाण्ड में मंदोदरी के मुँह से एक बार इसका ज़िक्र करते हैं।',
    },
    {
      q: 'क्या मूल रामायण में अहल्या पत्थर बनी थी?',
      a: 'वाल्मीकि में नहीं। गौतम के श्राप से वह आश्रम में अदृश्य रहकर हवा पर जीती है, जब तक राम नहीं आते (बालकाण्ड, सर्ग 48 और 49)। पत्थर का शरीर तुलसीदास के बालकाण्ड में है।',
    },
    {
      q: 'क्या शबरी ने राम को जूठे बेर खिलाए थे?',
      a: 'न वाल्मीकि (अरण्यकाण्ड, सर्ग 74) ऐसा कहते हैं, न तुलसीदास (अरण्यकाण्ड, दोहा 34)। दोनों में शबरी राम को वन के फल-मूल देती हैं। जूठे बेर बाद की भक्ति-कथाओं से आए हैं।',
    },
    {
      q: 'पहला भाग रामायण का कितना हिस्सा दिखाता है?',
      a: 'खबरों के मुताबिक पहला भाग सीता हरण के आसपास खत्म होता है और हनुमान आखिर में आते हैं। ग्रंथ में यह वाल्मीकि के बाल, अयोध्या और अरण्य काण्ड हैं, और रामचरितमानस के भी यही तीन काण्ड।',
    },
  ],
}
