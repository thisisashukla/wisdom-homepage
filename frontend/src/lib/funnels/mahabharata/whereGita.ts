/** Copy for /mahabharata/where-is-the-gita and its Hindi twin. reviewed: false. */

export type GitaLine = { c: number; v: number; deva: string; en: string; hi: string; speaker: { en: string; hi: string } }

/** Gita lines shown here. English is the site's own Gita translation; Hindi is ours. */
export const GITA_LINES: GitaLine[] = [
  {
    c: 1,
    v: 1,
    deva: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥',
    en: 'O Sanjaya, what did my sons and the sons of Pandu do, assembled on the holy field of Kurukshetra and eager for battle?',
    hi: 'संजय, धर्म की भूमि कुरुक्षेत्र में युद्ध के लिए जुटे मेरे बेटों और पांडु के बेटों ने क्या किया?',
    speaker: { en: 'Dhritarashtra to Sanjaya', hi: 'धृतराष्ट्र, संजय से' },
  },
  {
    c: 18,
    v: 75,
    deva: 'व्यासप्रसादाच्छ्रुतवानेतद्गुह्यमहं परम् ।\nयोगं योगेश्वरात्कृष्णात्साक्षात्कथयतः स्वयम् ॥',
    en: "By Vyasa's grace, I heard this supreme secret yoga directly from Krishna, the Lord of yoga, as he spoke it himself.",
    hi: 'व्यासजी की कृपा से मैंने यह परम गूढ़ योग सीधे योगेश्वर श्रीकृष्ण से, उन्हीं के कहते हुए सुना।',
    speaker: { en: 'Sanjaya to Dhritarashtra', hi: 'संजय, धृतराष्ट्र से' },
  },
]

export type Step = { title: string; text: string; gita?: boolean }
export type Echo = { lineId: string; c: number; v: number; why: string }

export type WhereCopy = {
  title: string
  description: string
  kicker: string
  h1: string
  quick: string
  sub: string
  stepsH: string
  stepsLede: string
  steps: Step[]
  startGita: string
  firstH: string
  firstLede: string
  readVerse: (c: number, v: number) => string
  chaptersH: string
  chaptersLede: string
  chapterLabel: (n: number) => string
  read18: string
  afterH: string
  afterLede: string
  echoesH: string
  echoesLede: string
  echoes: Echo[]
  faqH: string
  faq: { q: string; a: string }[]
  methodH: string
  method: string[]
  crumbs: { home: string; mbh: string; here: string }
}

export const EN: WhereCopy = {
  title: 'Where Is the Gita in the Mahabharata?',
  description:
    'The Bhagavad Gita is chapters 23 to 40 of the Bhishma Parva, book 6 of the Mahabharata. Who tells it, when, and what Arjuna asks after the war.',
  kicker: 'Bhishma Parva, the sixth of eighteen books',
  h1: 'Where the Gita sits in the Mahabharata',
  quick:
    "The Bhagavad Gita is chapters 23 to 40 of the Bhishma Parva, the sixth of the Mahabharata's eighteen books, in the Pune critical edition (chapters 25 to 42 in the vulgate that Nilakantha commented on). Sanjaya tells it to the blind king Dhritarashtra, starting from the king's own question at Gita 1.1 (MBh 6.23.1).",
  sub: 'Krishna speaks it on the first morning of the war, before a single arrow. The reader hears it later, on the night Bhishma falls.',
  stepsH: 'How book six unfolds',
  stepsLede: 'The Gita is told looking back. By the time Sanjaya tells it, Bhishma has already fallen.',
  steps: [
    { title: 'Vyasa offers the king sight', text: 'Before the battle, Vyasa offers blind Dhritarashtra the sight to watch it. He would rather not see his family die, so Vyasa gives the sight to his charioteer Sanjaya instead.' },
    { title: 'Bhishma has fallen', text: 'On the tenth day Sanjaya comes back from the field and tells the king that Bhishma lies on a bed of arrows. Dhritarashtra asks him to tell it all from the beginning.' },
    { title: 'Two armies at Kurukshetra', text: 'Sanjaya describes the armies drawn up on the field. The king asks what his sons and Pandu\'s sons did, and Sanjaya\'s answer is the Gita.' },
    { title: 'The Bhagavad Gita', text: 'Arjuna sees his teachers and kin in the other army, puts down his bow, and Krishna answers him across 700 verses. Chapters 23 to 40 in the critical edition, 25 to 42 in the vulgate.', gita: true },
    { title: 'Then the fighting starts', text: 'Yudhishthira walks unarmed to the Kaurava lines to ask his elders for their blessing. Yuyutsu, one of Dhritarashtra\'s sons, crosses over to the Pandavas. The battle begins.' },
  ],
  startGita: 'Start at Gita 1.1',
  firstH: 'The first question, and the last report',
  firstLede: 'The Gita begins with a blind king asking what happened and ends with the man who saw it for him.',
  readVerse: (c, v) => `Read Gita ${c}.${v}`,
  chaptersH: 'Eighteen chapters',
  chaptersLede: 'The Gita has 18 chapters. The epic has 18 books, and the war lasts 18 days. A chapter a day takes the same 18 days.',
  chapterLabel: (n) => `Chapter ${n}`,
  read18: 'Read the Gita in 18 days, a chapter a day',
  afterH: 'After the war, Arjuna asks to hear it again',
  afterLede:
    "In the Ashvamedhika Parva, with the war won, Arjuna admits that what Krishna told him has slipped away. Krishna says he cannot tell it the same way twice, and tells him an older story instead, the Anugita. We hold this book in Sanskrit.",
  echoesH: "The Gita's ideas elsewhere in the epic",
  echoesLede: 'Some of the Gita\'s lines turn up in other mouths, in books we hold in Sanskrit.',
  echoes: [
    { lineId: 'mbh.5.33.73', c: 16, v: 21, why: 'The same verse, word for word, in Vidura\'s counsel to Dhritarashtra.' },
    { lineId: 'mbh.5.34.65', c: 6, v: 5, why: 'The second half of Vidura\'s line is the second half of Krishna\'s 6.5.' },
    { lineId: 'mbh.3.32.3', c: 3, v: 8, why: 'Draupadi makes the case for action to Yudhishthira years before Krishna makes it to Arjuna.' },
    { lineId: 'mbh.3.31.2', c: 2, v: 47, why: 'Yudhishthira follows dharma without an eye on its reward, the stance of 2.47.' },
  ],
  faqH: 'Questions people ask',
  faq: [
    { q: 'Where is the Gita in the Mahabharata?', a: 'In the Bhishma Parva, the sixth book: chapters 23 to 40 in the Pune critical edition, chapters 25 to 42 in the vulgate that Nilakantha commented on and K. M. Ganguli translated.' },
    { q: 'Who narrates the Bhagavad Gita?', a: 'Sanjaya, to the blind king Dhritarashtra. Vyasa gave Sanjaya the sight to see the battle from afar, and Sanjaya says at the end that he heard it all by Vyasa\'s grace (Gita 18.75). Inside his account, Krishna speaks to Arjuna.' },
    { q: 'When in the story is the Gita spoken?', a: 'On the first morning of the war, between the two armies, before the fighting starts. Sanjaya tells it to the king later, after Bhishma falls on the tenth day.' },
    { q: 'How many verses does the Gita have?', a: '700 in the text the commentators follow, from Shankara on, across 18 chapters.' },
    { q: 'Is the Gita a later addition to the Mahabharata?', a: 'Scholars disagree. Some see it as composed with the battle books, others as added or expanded over time. Tradition and the commentators read it in its place in the Bhishma Parva, and the epic itself looks back to it after the war (MBh 14.17.6).' },
    { q: 'Did Arjuna forget the Gita?', a: 'He says so. After the war he tells Krishna that what he heard has slipped from his scattered mind (MBh 14.17.6). Krishna answers that he cannot repeat it in full the same way (MBh 14.17.12) and tells the Anugita instead.' },
  ],
  methodH: 'Sources and method',
  method: [
    'Bhishma Parva chapter numbers are given in both the Pune critical edition and the vulgate. Gita lines and their English come from our Gita pages.',
    'The Mahabharata Sanskrit on this page (books 3, 5 and 14) comes from a southern-recension text whose chapter numbers run close to the Kumbhakonam edition, so they can differ from the critical edition. The English is Wisdom\'s own, read with Nilakantha\'s commentary, with K. M. Ganguli\'s public-domain translation consulted.',
    'Wisdom translation, edited by Ankur Shukla.',
  ],
  crumbs: { home: 'Home', mbh: 'Mahabharata', here: 'Where is the Gita' },
}

export const HI: WhereCopy = {
  title: 'महाभारत में गीता कहाँ है?',
  description:
    'भगवद गीता महाभारत के छठे पर्व, भीष्म पर्व के अध्याय 23 से 40 में है। इसे कौन सुनाता है, कब, और युद्ध के बाद अर्जुन ने क्या माँगा।',
  kicker: 'भीष्म पर्व, अठारह में से छठा पर्व',
  h1: 'महाभारत में गीता कहाँ है',
  quick:
    'भगवद गीता महाभारत के अठारह पर्वों में से छठे, भीष्म पर्व के अध्याय 23 से 40 में है (पुणे के क्रिटिकल एडिशन में; नीलकंठ की टीका वाले पाठ में अध्याय 25 से 42)। इसे संजय अंधे राजा धृतराष्ट्र को सुनाते हैं, राजा के अपने सवाल से शुरू करके, जो गीता 1.1 (महाभारत 6.23.1) है।',
  sub: 'श्रीकृष्ण इसे युद्ध की पहली सुबह कहते हैं, पहला तीर चलने से पहले। पर सुनने वाले तक यह बाद में पहुँचती है, उस रात जब भीष्म गिर चुके हैं।',
  stepsH: 'छठा पर्व कैसे खुलता है',
  stepsLede: 'गीता पीछे मुड़कर सुनाई जाती है। जब संजय इसे सुनाते हैं, तब तक भीष्म गिर चुके होते हैं।',
  steps: [
    { title: 'व्यासजी राजा को दृष्टि देना चाहते हैं', text: 'युद्ध से पहले व्यासजी अंधे धृतराष्ट्र को युद्ध देखने की दृष्टि देना चाहते हैं। राजा अपने परिवार को मरते नहीं देखना चाहते, तो व्यासजी वह दृष्टि उनके सारथी संजय को दे देते हैं।' },
    { title: 'भीष्म गिर गए', text: 'दसवें दिन संजय रणभूमि से लौटकर बताते हैं कि भीष्म बाणों की शय्या पर हैं। धृतराष्ट्र कहते हैं, सब कुछ शुरू से सुनाओ।' },
    { title: 'कुरुक्षेत्र में दो सेनाएँ', text: 'संजय दोनों सेनाओं का हाल बताते हैं। राजा पूछते हैं कि उनके बेटों और पांडु के बेटों ने क्या किया, और संजय का जवाब ही गीता है।' },
    { title: 'भगवद गीता', text: 'अर्जुन सामने की सेना में अपने गुरुओं और रिश्तेदारों को देखकर धनुष रख देते हैं, और श्रीकृष्ण 700 श्लोकों में उत्तर देते हैं। क्रिटिकल एडिशन में अध्याय 23 से 40, नीलकंठ वाले पाठ में 25 से 42।', gita: true },
    { title: 'फिर युद्ध शुरू होता है', text: 'युधिष्ठिर बिना हथियार कौरव सेना की ओर जाकर अपने बड़ों से आशीर्वाद माँगते हैं। धृतराष्ट्र के बेटे युयुत्सु पांडवों की ओर आ जाते हैं। फिर लड़ाई शुरू होती है।' },
  ],
  startGita: 'गीता 1.1 से शुरू करें',
  firstH: 'पहला सवाल, और आख़िरी बात',
  firstLede: 'गीता एक अंधे राजा के सवाल से शुरू होती है और उस व्यक्ति की बात पर ख़त्म होती है जिसने राजा के लिए सब देखा।',
  readVerse: (c, v) => `गीता ${c}.${v} पढ़ें`,
  chaptersH: 'अठारह अध्याय',
  chaptersLede: 'गीता में 18 अध्याय हैं। महाभारत में 18 पर्व हैं और युद्ध 18 दिन चलता है। रोज़ एक अध्याय पढ़ें तो गीता भी 18 दिन में पूरी होती है।',
  chapterLabel: (n) => `अध्याय ${n}`,
  read18: '18 दिन में गीता पढ़ें, रोज़ एक अध्याय',
  afterH: 'युद्ध के बाद अर्जुन फिर से सुनना चाहते हैं',
  afterLede:
    'आश्वमेधिक पर्व में, युद्ध जीतने के बाद, अर्जुन मानते हैं कि श्रीकृष्ण ने जो कहा था वह उनसे छूट गया। श्रीकृष्ण कहते हैं कि वे उसे दोबारा उसी तरह नहीं कह सकते, और उसकी जगह एक पुरानी कथा सुनाते हैं, जिसे अनुगीता कहते हैं।',
  echoesH: 'महाभारत में और जगह गीता की बातें',
  echoesLede: 'गीता की कुछ पंक्तियाँ महाभारत में दूसरे लोगों के मुँह से भी आती हैं।',
  echoes: [
    { lineId: 'mbh.5.33.73', c: 16, v: 21, why: 'विदुर नीति में यही श्लोक, शब्दशः।' },
    { lineId: 'mbh.5.34.65', c: 6, v: 5, why: 'विदुर की बात का दूसरा आधा, गीता 6.5 का दूसरा आधा है।' },
    { lineId: 'mbh.3.32.3', c: 3, v: 8, why: 'द्रौपदी युधिष्ठिर से कर्म की बात कहती हैं, श्रीकृष्ण के अर्जुन से कहने से बरसों पहले।' },
    { lineId: 'mbh.3.31.2', c: 2, v: 47, why: 'युधिष्ठिर फल की इच्छा के बिना धर्म करते हैं, वही बात जो गीता 2.47 में है।' },
  ],
  faqH: 'लोग क्या पूछते हैं',
  faq: [
    { q: 'महाभारत में गीता कहाँ है?', a: 'छठे पर्व, भीष्म पर्व में: पुणे के क्रिटिकल एडिशन में अध्याय 23 से 40, और नीलकंठ की टीका वाले पाठ में अध्याय 25 से 42।' },
    { q: 'गीता कौन सुनाता है?', a: 'संजय, अंधे राजा धृतराष्ट्र को। व्यासजी ने संजय को दूर से युद्ध देखने की दृष्टि दी थी, और अंत में संजय कहते हैं कि उन्होंने यह सब व्यासजी की कृपा से सुना (गीता 18.75)। संजय की बात के भीतर श्रीकृष्ण अर्जुन से बोलते हैं।' },
    { q: 'कहानी में गीता कब कही जाती है?', a: 'युद्ध की पहली सुबह, दोनों सेनाओं के बीच, लड़ाई शुरू होने से पहले। संजय इसे राजा को बाद में सुनाते हैं, दसवें दिन भीष्म के गिरने के बाद।' },
    { q: 'गीता में कितने श्लोक हैं?', a: 'शंकराचार्य और उनके बाद के टीकाकार जिस पाठ को मानते हैं, उसमें 18 अध्यायों में 700 श्लोक।' },
    { q: 'क्या गीता बाद में जोड़ी गई?', a: 'विद्वानों की राय अलग-अलग है। कुछ इसे युद्ध वाले पर्वों के साथ रचा मानते हैं, कुछ बाद में जोड़ा या बढ़ाया गया। परंपरा और टीकाकार इसे भीष्म पर्व में ही पढ़ते हैं, और युद्ध के बाद महाभारत खुद इसकी याद करता है (महाभारत 14.17.6)।' },
    { q: 'क्या अर्जुन गीता भूल गए थे?', a: 'वे खुद यही कहते हैं। युद्ध के बाद वे श्रीकृष्ण से कहते हैं कि बिखरे मन से वह सब छूट गया (महाभारत 14.17.6)। श्रीकृष्ण कहते हैं कि वे उसे फिर उसी तरह पूरा नहीं कह सकते (महाभारत 14.17.12), और अनुगीता सुनाते हैं।' },
  ],
  methodH: 'स्रोत और तरीका',
  method: [
    'भीष्म पर्व के अध्याय नंबर क्रिटिकल एडिशन और नीलकंठ वाले पाठ, दोनों के हिसाब से दिए हैं। गीता के श्लोक हमारे गीता पेजों से हैं।',
    'इस पेज पर महाभारत के बाकी संस्कृत श्लोक (पर्व 3, 5 और 14) दक्षिणी पाठ से हैं, जिसके अध्याय नंबर कुंभकोणम संस्करण के करीब हैं और क्रिटिकल एडिशन से अलग हो सकते हैं। हिंदी अर्थ Wisdom के अपने हैं, नीलकंठ की टीका के साथ पढ़कर।',
    'Wisdom अनुवाद, संपादन: अंकुर शुक्ला।',
  ],
  crumbs: { home: 'होम', mbh: 'महाभारत', here: 'गीता कहाँ है' },
}
