/** Page copy for the Vivekananda hub, its theme pages and its fact checks (Wisdom's own words, reviewed: false). */

import type { VivTheme } from './data'

export const VIV_PATH = '/vivekananda-quotes'
export const VIV_PATH_HI = '/hi/vivekananda-quotes'
export const vivThemePath = (t: VivTheme) => `${VIV_PATH}/${t}`
export const vivCheckPath = (slug: string) => `${VIV_PATH}/did-he-say/${slug}`

export const VIV_THEME_COPY: Record<VivTheme, {
  label: string
  labelHi: string
  title: string
  description: string
  h1: string
  promise: string
  quick: string
  faq: { q: string; a: string }[]
}> = {
  students: {
    label: 'For students',
    labelHi: 'विद्यार्थियों के लिए',
    title: 'Vivekananda Quotes for Students, With Sources',
    description: 'Swami Vivekananda quotes for students, each checked against his Complete Works with the volume and work. Copy, share or save as an image.',
    h1: 'Vivekananda quotes for students',
    promise: 'Lines he spoke to young people about focus, strength and learning, each one checked against his Complete Works.',
    quick:
      'Swami Vivekananda told students to take up one idea and give it their whole life (Raja Yoga, Complete Works vol 1) and to build strength first: "Be strong, my young friends; that is my advice to you" (vol 3). These lines are checked against volumes 1 to 8, with the volume and work on each.',
    faq: [
      { q: 'What did Vivekananda say to students?', a: 'In his Madras lecture on Vedanta in Indian life (vol 3) he told the young to get strong first: "Be strong, my young friends; that is my advice to you." In Raja Yoga (vol 1) he asked them to take up one idea and make it their life.' },
      { q: 'Did he really say football would bring you nearer to Heaven than the Gita?', a: 'Yes. "You will be nearer to Heaven through football than through the study of the Gita" is in the same Madras lecture (vol 3). He goes on: "You will understand the Gita better with your biceps, your muscles, a little stronger." He was asking for strength, and he quoted the Gita all his life.' },
      { q: 'When is National Youth Day?', a: 'National Youth Day falls on 12 January, Swami Vivekananda\'s birth anniversary (born 12 January 1863). India has marked it since 1985.' },
    ],
  },
  education: {
    label: 'On education',
    labelHi: 'शिक्षा पर',
    title: 'Vivekananda Quotes on Education, Checked',
    description: 'What Swami Vivekananda said about education, from his Complete Works: the perfection already in man, five ideas made your life, man-making.',
    h1: 'Vivekananda quotes on education',
    promise: 'His lines on teaching and learning, with the lecture or letter each one comes from.',
    quick:
      '"Education is the manifestation of the perfection already in man" is from What We Believe In (Complete Works vol 4). In The Future of India (vol 3) he adds that five ideas made into your life and character are more education than a memorised library. Each line below carries its volume and work.',
    faq: [
      { q: 'What is Vivekananda\'s definition of education?', a: '"Education is the manifestation of the perfection already in man." It opens a short piece called What We Believe In, in Complete Works vol 4. Teaching, for him, draws out what is already there.' },
      { q: 'Where does "man-making education" come from?', a: 'From My Plan of Campaign (vol 3): "It is a man-making religion that we want. It is man-making theories that we want. It is man-making education all round that we want." In The Powers of the Mind (vol 2) he says the ideal of all education should be "this man-making".' },
      { q: 'Which Vivekananda line suits Teachers\' Day?', a: '"The only true teacher is he who can immediately come down to the level of the student" (My Master, vol 4). Teachers\' Day in India is 5 September.' },
    ],
  },
  'fear-and-strength': {
    label: 'Fear and strength',
    labelHi: 'डर और ताकत',
    title: 'Vivekananda Quotes on Strength and Fear, Sourced',
    description: 'Swami Vivekananda on strength, weakness and fear, from his Complete Works. Each line shows its volume and work, and the shared versions he never said.',
    h1: 'Vivekananda on fear and strength',
    promise: 'The lines people reach for before something hard, each one traced to the lecture where he said it.',
    quick:
      '"This is the great fact: strength is life, weakness is death" is from Work and Its Secret (Complete Works vol 2). "Be not afraid of anything. You will do marvellous work" is from his Calcutta address (vol 3). The longer shared versions add lines from other works; the checks below show which.',
    faq: [
      { q: 'Did Vivekananda say "Strength is life, weakness is death"?', a: 'Yes, in Work and Its Secret (vol 2). The popular version adds "Expansion is life, contraction is death. Love is life, hatred is death", which comes from a different work, his Reply to the Calcutta Address (vol 4).' },
      { q: 'What did he say the greatest sin is?', a: 'In class notes taken by a disciple (vol 7) he says: "The greatest sin is to think yourself weak." In Practical Vedanta (vol 2): "If there is sin, this is the only sin, to say that you are weak, or others are weak."' },
      { q: 'Which Gita verse did he say holds the whole Gita?', a: 'Gita 2.3, where Krishna tells Arjuna to drop his faint heart and stand up. In Thoughts on the Gita (vol 4) he says that reading this one verse gives the merit of reading the whole Gita.' },
    ],
  },
  'work-and-success': {
    label: 'Work and success',
    labelHi: 'काम और सफलता',
    title: 'Vivekananda Quotes on Work and Success, Sourced',
    description: 'Swami Vivekananda on work, failure and success, from Karma Yoga and his letters. Every line carries its Complete Works volume and work.',
    h1: 'Vivekananda on work and success',
    promise: 'What he said about doing the work, failing, and being misunderstood along the way.',
    quick:
      '"Each work has to pass through these stages, ridicule, opposition, and then acceptance" is from a letter to the Maharaja of Khetri (Complete Works vol 5). "The great secret of true success" line is from Work and Its Secret (vol 2). His Karma Yoga rests on Gita 2.47: do the work, leave the result.',
    faq: [
      { q: 'Did Vivekananda say "ridicule, opposition, and then acceptance"?', a: 'Yes, in a letter to the Maharaja of Khetri printed in Complete Works vol 5: "Each work has to pass through these stages, ridicule, opposition, and then acceptance. Each man who thinks ahead of his time is sure to be misunderstood."' },
      { q: 'What is the secret of success according to Vivekananda?', a: 'In Work and Its Secret (vol 2): "the man who asks for no return, the perfectly unselfish man, is the most successful." In a letter (vol 6) he names purity, patience and perseverance, "and, above all, love".' },
      { q: 'Which Gita verse is behind his Karma Yoga?', a: 'Gita 2.47. He quotes it as "To work we have the right, but not to the fruits thereof" in Karma in Its Effect on Character (vol 1).' },
    ],
  },
}

export const VIV_HUB = {
  en: {
    title: 'Vivekananda Quotes: 61 Lines Checked Against His Works',
    description: 'Swami Vivekananda quotes checked against his Complete Works, vols 1 to 8, each with its volume and work. Plus nine popular lines he never said as written.',
    h1: 'Vivekananda quotes, checked against his own words',
    promise: 'Every line here is checked against his Complete Works. Tap the source on any card to read the paragraph it comes from.',
    quick:
      'Swami Vivekananda\'s best known line, "Arise, awake, and stop not till the goal is reached", is from his Calcutta address of 1897 (Complete Works vol 3), adapted from Katha Upanishad 1.3.14. Below are 61 lines checked against volumes 1 to 8, each with its volume and work, and nine popular lines he never said as written.',
    faq: [
      { q: 'Where can I read Vivekananda\'s quotes in the original?', a: 'In The Complete Works of Swami Vivekananda, published by Advaita Ashrama, Mayavati (nine volumes). Every card on this page names the volume and the lecture, letter or class note, and links to the full text.' },
      { q: 'Is "Arise, awake, and stop not till the goal is reached" his own line?', a: 'He said it in his reply to the Calcutta address (vol 3) and in Jnana Yoga (vol 2). It adapts Katha Upanishad 1.3.14, "uttiṣṭhata jāgrata prāpya varān nibodhata": arise, awake, and learn by going to the great ones.' },
      { q: 'Did Vivekananda say "Talk to yourself once in a day"?', a: 'No. It is not in the Complete Works (vols 1 to 8), and a phrase search of Wikisource across all volumes, including vol 9, finds nothing. The same goes for "Take risks in your life" and "In a day, when you don\'t come across any problems".' },
      { q: 'When is National Youth Day, and why is it linked to Vivekananda?', a: 'National Youth Day is 12 January, his birth anniversary. He was born on 12 January 1863 in Calcutta. India has marked the day since 1985.' },
      { q: 'What happened on 11 September 1893?', a: 'He gave his first address at the World\'s Parliament of Religions in Chicago, opening with "Sisters and Brothers of America". The addresses are in Complete Works vol 1.' },
      { q: 'When did Swami Vivekananda die?', a: 'On 4 July 1902, at Belur Math, aged 39. Many people share his lines on 4 July each year.' },
    ],
  },
  hi: {
    title: 'स्वामी विवेकानंद के अनमोल वचन, मूल स्रोत के साथ',
    description: 'स्वामी विवेकानंद के 61 विचार, कम्प्लीट वर्क्स से जाँचे हुए, हर एक का हिंदी अर्थ और खंड। साथ में वे पंक्तियाँ जो उन्होंने ऐसे कभी नहीं कहीं।',
    h1: 'स्वामी विवेकानंद के अनमोल वचन, उन्हीं के शब्दों में',
    promise: 'हर पंक्ति उनकी कम्प्लीट वर्क्स से मिलाई गई है। मूल अंग्रेज़ी के साथ हमारा हिंदी अर्थ। किसी भी कार्ड पर स्रोत दबाएं और वह अनुच्छेद पढ़ें।',
    quick:
      'स्वामी विवेकानंद का सबसे मशहूर वचन "उठो, जागो, और लक्ष्य मिलने तक मत रुको" 1897 में कलकत्ता के अभिनंदन के उत्तर में कहा गया (कम्प्लीट वर्क्स खंड 3)। यह कठोपनिषद 1.3.14 से लिया गया है। यहाँ खंड 1 से 8 से जाँचे गए 61 वचन हैं, और नौ ऐसी पंक्तियाँ जो उन्होंने ऐसे नहीं कहीं।',
    faq: [
      { q: 'विवेकानंद के विचार मूल रूप में कहाँ पढ़ें?', a: 'अद्वैत आश्रम, मायावती से छपी "द कम्प्लीट वर्क्स ऑफ़ स्वामी विवेकानंद" में (नौ खंड)। हर कार्ड पर खंड और व्याख्यान या पत्र का नाम है, और पूरे पाठ का लिंक भी।' },
      { q: 'उठो, जागो वाली पंक्ति कहाँ से है?', a: 'यह कठोपनिषद 1.3.14 का वचन है: "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत"। स्वामीजी ने इसे कलकत्ता के अभिनंदन के उत्तर (खंड 3) और ज्ञान योग (खंड 2) में दोहराया।' },
      { q: 'क्या स्वामीजी ने कहा था "दिन में एक बार खुद से बात करो"?', a: 'नहीं। यह पंक्ति कम्प्लीट वर्क्स के खंड 1 से 8 में नहीं है, और विकिसोर्स पर सभी खंडों (खंड 9 सहित) में खोजने पर भी नहीं मिलती।' },
      { q: 'राष्ट्रीय युवा दिवस कब है?', a: '12 जनवरी को, स्वामी विवेकानंद की जयंती पर। उनका जन्म 12 जनवरी 1863 को कलकत्ता में हुआ था। भारत 1985 से यह दिन मनाता है।' },
      { q: '11 सितंबर 1893 को क्या हुआ था?', a: 'शिकागो की विश्व धर्म संसद में स्वामीजी का पहला भाषण, जो "Sisters and Brothers of America" से शुरू हुआ। ये भाषण कम्प्लीट वर्क्स खंड 1 में हैं।' },
      { q: 'स्वामी विवेकानंद की पुण्यतिथि कब है?', a: '4 जुलाई। 4 जुलाई 1902 को बेलूर मठ में 39 वर्ष की आयु में उन्होंने देह त्यागी।' },
    ],
  },
}

export const THEME_INTRO: Record<VivTheme, { en: string; hi: string }> = {
  students: { en: 'For exam weeks, first jobs and the year you are deciding what to become.', hi: 'परीक्षा के दिनों, पहली नौकरी और आगे क्या बनना है, उस साल के लिए।' },
  education: { en: 'What he thought teaching and learning are for.', hi: 'पढ़ने-पढ़ाने का असली मकसद, उनकी नज़र में।' },
  'fear-and-strength': { en: 'For the night before something you are afraid of.', hi: 'किसी डराने वाले काम से पहले की रात के लिए।' },
  'work-and-success': { en: 'For the work in front of you, and the days it goes badly.', hi: 'सामने वाले काम के लिए, और उन दिनों के लिए जब वह बिगड़ जाए।' },
}
