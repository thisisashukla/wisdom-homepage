#!/usr/bin/env python3
"""Builds src/content/funnels/hanuman-chalisa/chalisa.json and cards.json.

Text: the Gita Press reading (booklets 695 and 2121, plus a third Gita Press scan),
diffed against Rambhadracharya's Mahaviri (Hindi, mool only), Kavita Kosh and
vignanam. Witness copies: lp/funnels/hanuman-chalisa/witnesses/. Every variant
decision is in lp/funnels/hanuman-chalisa/REVIEW.md.

Meanings, glosses and notes are Wisdom's own wording (reviewed: false).
Ramayana references are checked against the sanscripts corpus
(wisdom_kb/out/verses.jsonl) when it is reachable; the script fails on a
reference it cannot find.

Run from frontend/:  python3 scripts/funnels/hanuman-chalisa/build_chalisa.py
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from translit import scholarly, sung  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
FRONTEND = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
OUT_DIR = os.path.join(FRONTEND, 'src', 'content', 'funnels', 'hanuman-chalisa')
CORPUS = os.path.expanduser('~/mnt/sanscripts/wisdom_kb/out/verses.jsonl')

# ── Sung-IAST corrections where the schwa rule gets a word wrong ───────────
SUNG_FIX = {
    'अंजनि-पुत्र': 'añjani-putra',
    'सुमिरौं': 'sumirauṁ',
    'कुमति': 'kumati',
    'सुमति': 'sumati',
    'जनेऊ': 'janeū',
    'बजरंगी': 'bajraṅgī',
    'केसरीनंदन': 'kesarīnandan',
    'बिद्यावान': 'bidyāvān',
    'करिबे': 'karibe',
    'सुनिबे': 'sunibe',
    'सियहिं': 'siyahiṁ',
    'सजीवन': 'sajīvan',
    'श्रीरघुबीर': 'śrī raghubīr',
    'रघुबीर': 'raghubīr',
    'भरतहि': 'bharatahi',
    'सनकादिक': 'sanakādik',
    'ब्रह्मादि': 'brahmādi',
    'सुग्रीवहिं': 'sugrīvahiṁ',
    'लंकेस्वर': 'laṅkesvar',
    'अनुग्रह': 'anugrah',
    'पैसारे': 'paisāre',
    'निरंतर': 'nirantar',
    'हनुमत': 'hanumat',
    'तपस्वी': 'tapasvī',
    'मनोरथ': 'manorath',
    'परताप': 'partāp',
    'परसिद्ध': 'parsiddh',
    'उजियारा': 'ujiyārā',
    'निकंदन': 'nikandan',
    'रसायन': 'rasāyan',
    'बिसरावै': 'bisarāvai',
    'हरि-भक्त': 'hari-bhakt',
    'बलबीरा': 'balbīrā',
    'गोसाईं': 'gosāīṁ',
    'नाईं': 'nāīṁ',
    'तुलसीदास': 'tulsīdās',
    'पवनतनय': 'pavantanay',
    'पवन-कुमार': 'pavan-kumār',
    'पवनसुत': 'pavansut',
    'बुद्धिहीन': 'buddhihīn',
    'सरोज': 'saroj',
    'बिमल': 'bimal',
    'दिगपाल': 'digpāl',
    'उपकार': 'upkār',
    'मुद्रिका': 'mudrikā',
    'अचरज': 'acaraj',
    'रखवारे': 'rakhvāre',
    'रच्छक': 'racchak',
    'सम्हारो': 'samhāro',
    'जरावा': 'jarāvā',
    'दिखावा': 'dikhāvā',
    'सँहारे': 'saṁhāre',
    'सँवारे': 'saṁvāre',
    'मंगल': 'maṅgal',
    'मूरति': 'mūrati',
    'रामचंद्र': 'rāmcandra',
    'चलीसा': 'calīsā',
    'अतुलित': 'atulit',
    'उजागर': 'ujāgar',
    'छुड़ावै': 'chuṛāvai',
    'दायकु': 'dāyaku',
    'बरनउँ': 'baranauṁ',
    'रघुपति': 'raghupati',
    'श्रीपति': 'śrīpati',
    'छूटहि': 'chūṭahi',
    'बसहु': 'basahu',
    'हरहु': 'harahu',
    'करहु': 'karahu',
    'सहस्र': 'sahasra',
    'जलधि': 'jaladhi',
    'जानकी': 'jānakī',
    'अष्ट': 'aṣṭ',
    'सर्ब': 'sarb',
    'चित्त': 'citt',
    'प्रिय': 'priya',
}


def sung_line(line: str) -> str:
    words = []
    for tok in line.split():
        if tok in ('।', '॥'):
            continue
        words.append(SUNG_FIX.get(tok) or sung(tok))
    return ' '.join(words)


def schol_line(line: str) -> str:
    return scholarly(line)


# ── The text ───────────────────────────────────────────────────────────────
# Each unit: id, kind, n (chaupai number, or doha number), slug words, two halves,
# words "deva=gloss" in order, meaning en/hi, ramayana, variants, card.

UNITS = []


def U(**kw):
    UNITS.append(kw)


U(id='hc.d1', kind='doha', n=1, slug='doha-1-shri-guru-charan-saroj-raj',
  lines=['श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि ।', 'बरनउँ रघुबर बिमल जसु जो दायकु फल चारि ॥'],
  words='श्रीगुरु=the revered guru|चरन=feet|सरोज=lotus|रज=dust|निज=my own|मनु=mind|मुकुरु=mirror|सुधारि=having polished|बरनउँ=I describe|रघुबर=best of the Raghus, Rama|बिमल=spotless|जसु=glory|जो=which|दायकु=giver|फल=fruits|चारि=four',
  en="With the dust of my guru's lotus feet I polish the mirror of my mind. Then I sing the spotless glory of Rama, best of the Raghus, which gives all four fruits of life: dharma, wealth, fulfilment and freedom.",
  hi='गुरु के चरण-कमलों की धूल से अपने मन का दर्पण साफ़ करके मैं श्रीराम का निर्मल यश गाता हूँ, जो धर्म, अर्थ, काम और मोक्ष, चारों फल देता है।',
  ram=dict(en='Tulsidas opens the Ayodhya Kand of his Ramcharitmanas with this same couplet, word for word, as the story turns to the plan to crown Rama.', refs=['rcm.2.1.doha.1']),
  variants=['Rambhadracharya\'s Mahaviri prints निज मन मुकुर ... जस ... दायक, without the final u. The u endings are Awadhi and are what the Gita Press prints.'],
  card="With the dust of my guru's feet I clean the mirror of my mind, then sing Rama's spotless glory.",
  card_hi='गुरु के चरणों की धूल से मन का दर्पण साफ़ करके मैं श्रीराम का निर्मल यश गाता हूँ।')

U(id='hc.d2', kind='doha', n=2, slug='doha-2-buddhiheen-tanu-janike',
  lines=['बुद्धिहीन तनु जानिके सुमिरौं पवन-कुमार ।', 'बल बुधि बिद्या देहु मोहिं हरहु कलेस बिकार ॥'],
  words='बुद्धिहीन=short of understanding|तनु=this self, this body|जानिके=knowing|सुमिरौं=I remember|पवन-कुमार=son of the Wind|बल=strength|बुधि=understanding|बिद्या=knowledge|देहु=give|मोहिं=to me|हरहु=take away|कलेस=troubles|बिकार=faults of the mind',
  en='Knowing myself to be short of understanding, I call to mind Hanuman, son of the Wind. Give me strength, understanding and knowledge, and take away my troubles and my faults.',
  hi='खुद को बुद्धिहीन जानकर मैं पवनपुत्र हनुमान जी को याद करता हूँ। मुझे बल, बुद्धि और विद्या दीजिए, और मेरे क्लेश और मन के दोष दूर कीजिए।',
  ram=None,
  variants=['Many people sing बल बुद्धि बिद्या. The Gita Press prints बुधि, the Awadhi form, which keeps the metre. Some editions print कलेश for कलेस.'],
  card='Knowing my own limits, I remember Hanuman. Give me strength, understanding and knowledge, and take my troubles away.',
  card_hi='खुद को बुद्धिहीन जानकर मैं हनुमान जी को याद करता हूँ। मुझे बल, बुद्धि, विद्या दीजिए।')

U(id='hc.c1', kind='chaupai', n=1, slug='1-jai-hanuman-gyan-gun-sagar',
  lines=['जय हनुमान ज्ञान गुन सागर ।', 'जय कपीस तिहुँ लोक उजागर ॥'],
  words='जय=victory|हनुमान=Hanuman|ज्ञान=wisdom|गुन=virtues|सागर=ocean|जय=victory|कपीस=lord of the vanaras|तिहुँ=three|लोक=worlds|उजागर=who lights up, renowned in',
  en='Victory to Hanuman, ocean of wisdom and virtue. Victory to the lord of the vanaras, whose glory lights up the three worlds.',
  hi='ज्ञान और गुणों के सागर हनुमान जी की जय हो। तीनों लोकों में उजाला करने वाले वानरराज की जय हो।',
  ram=dict(en='The Sundar Kand of the Manas opens with a Sanskrit verse to Hanuman that calls him first among the wise and a storehouse of every virtue.', refs=['rcm.5.1.shloka.3']),
  variants=['Rambhadracharya\'s Mahaviri prints गुण for गुन. The sound and sense are the same.'],
  card='Victory to Hanuman, ocean of wisdom and virtue, whose glory lights up the three worlds.',
  card_hi='ज्ञान और गुणों के सागर हनुमान जी की जय, जिनसे तीनों लोक उजले हैं।')

U(id='hc.c2', kind='chaupai', n=2, slug='2-ram-doot-atulit-bal-dhama',
  lines=['राम दूत अतुलित बल धामा ।', 'अंजनि-पुत्र पवनसुत नामा ॥'],
  words='राम=Rama\'s|दूत=messenger|अतुलित=beyond measure|बल=strength|धामा=home, abode|अंजनि-पुत्र=son of Anjani|पवनसुत=son of the Wind|नामा=known as',
  en="You are Rama's messenger, the home of strength beyond measure. You are known as Anjani's son and as the son of the Wind.",
  hi='आप श्रीराम के दूत हैं और अपार बल के धाम हैं। आपको अंजनीपुत्र और पवनपुत्र के नाम से जाना जाता है।',
  ram=dict(en='In the Valmiki Ramayana, Jambavan reminds Hanuman of his birth: his mother Anjana was the wife of Kesari, and the Wind god was his father. The Manas Sundar Kand calls him the home of matchless strength.', refs=['vr.4.66.8', 'vr.4.66.24', 'rcm.5.1.shloka.3']),
  variants=[],
  card="Rama's messenger, home of strength beyond measure, known as Anjani's son and son of the Wind.",
  card_hi='श्रीराम के दूत, अपार बल के धाम, अंजनीपुत्र और पवनपुत्र।')

U(id='hc.c3', kind='chaupai', n=3, slug='3-mahabir-bikram-bajrangi',
  lines=['महाबीर बिक्रम बजरंगी ।', 'कुमति निवार सुमति के संगी ॥'],
  words='महाबीर=great hero|बिक्रम=valiant|बजरंगी=with limbs like the thunderbolt (vajra)|कुमति=bad thinking|निवार=remover|सुमति=good sense|के=of|संगी=companion',
  en='Great hero, valiant, with a body as strong as the thunderbolt, you clear away bad thinking and stay beside good sense.',
  hi='आप महावीर हैं, पराक्रमी हैं, आपका शरीर वज्र जैसा है। आप बुरी सोच दूर करते हैं और अच्छी सोच के साथी हैं।',
  ram=None, variants=[])

U(id='hc.c4', kind='chaupai', n=4, slug='4-kanchan-baran-biraj-subesa',
  lines=['कंचन बरन बिराज सुबेसा ।', 'कानन कुंडल कुंचित केसा ॥'],
  words='कंचन=gold|बरन=colour|बिराज=shining|सुबेसा=finely dressed|कानन=in the ears|कुंडल=earrings|कुंचित=curly|केसा=hair',
  en='Your colour is gold and your dress is fine. Rings shine in your ears and your hair is curled.',
  hi='आपका रंग सोने जैसा है और वेश सुंदर है। कानों में कुंडल हैं और बाल घुँघराले हैं।',
  ram=dict(en='The Sundar Kand opening verse describes his body shining like a golden mountain, and in the Ashoka grove he shows Sita a body like a mountain of gold.', refs=['rcm.5.1.shloka.3', 'rcm.5.14.chaupai.4']),
  variants=[])

U(id='hc.c5', kind='chaupai', n=5, slug='5-hath-bajra-aur-dhwaja-biraje',
  lines=['हाथ बज्र औ ध्वजा बिराजै ।', 'काँधे मूँज जनेऊ साजै ॥'],
  words='हाथ=hand|बज्र=thunderbolt, often read as his mace|औ=and|ध्वजा=flag|बिराजै=shines|काँधे=on the shoulder|मूँज=munja grass|जनेऊ=sacred thread|साजै=adorns',
  en='In your hands shine the thunderbolt and the flag. A sacred thread of munja grass sits on your shoulder.',
  hi='आपके हाथों में वज्र और ध्वजा शोभा देते हैं, और कंधे पर मूँज का जनेऊ सजा है।',
  ram=None,
  variants=['Rambhadracharya\'s Mahaviri reads अरु for औ and छाजै for साजै. The sense does not change.'])

U(id='hc.c6', kind='chaupai', n=6, slug='6-sankar-suvan-kesari-nandan',
  lines=['संकर सुवन केसरीनंदन ।', 'तेज प्रताप महा जग बंदन ॥'],
  words='संकर=Shiva|सुवन=son, born of|केसरीनंदन=son of Kesari|तेज=radiance|प्रताप=might|महा=great|जग=the world|बंदन=bowed to',
  en='You come from Shiva and are the son of Kesari. Your radiance and might are vast, and the whole world bows to you.',
  hi='आप शंकर के अंश और केसरी के पुत्र हैं। आपका तेज और प्रताप महान है, सारा जगत आपको प्रणाम करता है।',
  ram=dict(en='Valmiki has Jambavan tell Hanuman that he is the son of Kesari and, by birth, the son of the Wind.', refs=['vr.4.66.24']),
  variants=['Rambhadracharya, in his Mahaviri commentary, reads शंकर स्वयं केसरीनंदन, "Shiva himself, as Kesari\'s son", since tradition holds Hanuman to be a form of Shiva. The Gita Press prints संकर सुवन.'])

U(id='hc.c7', kind='chaupai', n=7, slug='7-vidyavan-guni-ati-chatur',
  lines=['बिद्यावान गुनी अति चातुर ।', 'राम काज करिबे को आतुर ॥'],
  words='बिद्यावान=learned|गुनी=full of virtue|अति=very|चातुर=wise, clever|राम=Rama\'s|काज=work|करिबे को=to do|आतुर=eager',
  en="Learned, full of virtue and very wise, you are always eager to do Rama's work.",
  hi='आप विद्वान हैं, गुणी हैं, बहुत चतुर हैं, और श्रीराम का काम करने को हमेशा तत्पर रहते हैं।',
  ram=dict(en="Over the ocean, the mountain Mainaka rises and offers him rest. Hanuman touches it, bows, and says there is no rest for him until Rama's work is done.", refs=['rcm.5.1.doha.1']),
  variants=[],
  card="Learned, full of virtue and wise, always eager to do Rama's work.",
  card_hi='विद्वान, गुणी और चतुर, श्रीराम का काम करने को सदा तत्पर।')

U(id='hc.c8', kind='chaupai', n=8, slug='8-prabhu-charitra-sunibe-ko-rasiya',
  lines=['प्रभु चरित्र सुनिबे को रसिया ।', 'राम लखन सीता मन बसिया ॥'],
  words="प्रभु=the Lord's|चरित्र=story, deeds|सुनिबे को=to hear|रसिया=one who delights in|राम=Rama|लखन=Lakshmana|सीता=Sita|मन=heart|बसिया=dwelling",
  en="You love to hear the Lord's story. Rama, Lakshmana and Sita live in your heart.",
  hi='प्रभु की कथा सुनने में आपको आनंद आता है। श्रीराम, लक्ष्मण और सीता आपके मन में बसते हैं।',
  ram=dict(en="In the Valmiki Ramayana's last book, Hanuman asks Rama that his love stay fixed on him, and that he may live on earth as long as Rama's story is told.", refs=['vr.7.40.8']),
  variants=['Some Gita Press printings spell लखन as लषन, the older spelling, read the same way.', 'Some read the line the other way round: you live in the hearts of Rama, Lakshmana and Sita.'])

U(id='hc.c9', kind='chaupai', n=9, slug='9-sukshma-roop-dhari-siyahi-dikhava',
  lines=['सूक्ष्म रूप धरि सियहिं दिखावा ।', 'बिकट रूप धरि लंक जरावा ॥'],
  words='सूक्ष्म=tiny|रूप=form|धरि=taking|सियहिं=to Sita|दिखावा=showed|बिकट=huge, fearsome|रूप=form|धरि=taking|लंक=Lanka|जरावा=burned',
  en='Taking a tiny form, you showed yourself to Sita. Taking a fearsome form, you set Lanka on fire.',
  hi='आपने छोटा रूप लेकर सीता जी को दर्शन दिए, और विकराल रूप लेकर लंका जला दी।',
  ram=dict(en='He enters Lanka in a form as small as a mosquito, later comes down from the tree to stand near Sita, and when his tail is set alight he grows huge yet light and leaps from roof to roof as the city burns.', refs=['rcm.5.3.chaupai.7', 'rcm.5.11.chaupai.10', 'rcm.5.24.chaupai.1']),
  variants=[])

U(id='hc.c10', kind='chaupai', n=10, slug='10-bhim-roop-dhari-asur-sanhare',
  lines=['भीम रूप धरि असुर सँहारे ।', 'रामचंद्र के काज सँवारे ॥'],
  words="भीम=terrible|रूप=form|धरि=taking|असुर=asuras, the rakshasas|सँहारे=destroyed|रामचंद्र के=Ramachandra's|काज=tasks|सँवारे=carried through",
  en="Taking a terrible form, you destroyed the asuras and carried Rama's work through.",
  hi='आपने भयंकर रूप लेकर राक्षसों का संहार किया और श्रीरामचंद्र के काम पूरे किए।',
  ram=dict(en="In the Ashoka grove Ravana sends his son Akshay Kumar with an army. Hanuman pulls up a tree, strikes him down and roars.", refs=['rcm.5.16.chaupai.4']),
  variants=[])

U(id='hc.c11', kind='chaupai', n=11, slug='11-laye-sanjivan-lakhan-jiyaye',
  lines=['लाय सजीवन लखन जियाये ।', 'श्रीरघुबीर हरषि उर लाये ॥'],
  words='लाय=bringing|सजीवन=the life-giving herb, sanjivani|लखन=Lakshmana|जियाये=brought back to life|श्रीरघुबीर=Rama, hero of the Raghus|हरषि=with joy|उर=to the heart|लाये=held',
  en='You brought the sanjivani herb and revived Lakshmana. Rama, hero of the Raghus, held you to his heart with joy.',
  hi='आपने संजीवनी लाकर लक्ष्मण जी के प्राण बचाए, और श्रीराम ने खुश होकर आपको गले लगा लिया।',
  ram=dict(en='When Lakshmana falls in battle, the physician Sushena names the herb on the mountain and Hanuman goes for it. When he returns, the Manas says Rama embraced Hanuman with joy, the words this line echoes.', refs=['rcm.6.55.doha.1', 'rcm.6.60.chaupai.10']),
  variants=['Some editions read संजीवन or सँजीवनि for सजीवन.'],
  card='You brought the sanjivani and revived Lakshmana. Rama held you to his heart with joy.',
  card_hi='आपने संजीवनी लाकर लक्ष्मण को जीवन दिया, श्रीराम ने खुश होकर गले लगाया।')

U(id='hc.c12', kind='chaupai', n=12, slug='12-raghupati-kinhi-bahut-badai',
  lines=['रघुपति कीन्ही बहुत बड़ाई ।', 'तुम मम प्रिय भरतहि सम भाई ॥'],
  words='रघुपति=lord of the Raghus, Rama|कीन्ही=gave|बहुत=much|बड़ाई=praise|तुम=you|मम=my|प्रिय=dear|भरतहि सम=equal to Bharata|भाई=brother',
  en='Rama, lord of the Raghus, praised you greatly: "You are as dear to me as my brother Bharata."',
  hi='श्रीराम ने आपकी बहुत प्रशंसा की और कहा, तुम मुझे भरत जैसे प्यारे भाई हो।',
  ram=dict(en='At their first meeting in the Manas, Rama tells Hanuman he is twice as dear to him as Lakshmana.', refs=['rcm.4.4.chaupai.4']),
  variants=['Some editions print भरतहिं.'])

U(id='hc.c13', kind='chaupai', n=13, slug='13-sahas-badan-tumharo-jas-gavai',
  lines=['सहस बदन तुम्हरो जस गावैं ।', 'अस कहि श्रीपति कंठ लगावैं ॥'],
  words='सहस=thousand|बदन=mouths, here Shesha, the thousand-headed serpent|तुम्हरो=your|जस=glory|गावैं=sing|अस=so|कहि=saying|श्रीपति=lord of Shri, Rama|कंठ लगावैं=embraces',
  en='"May the thousand-mouthed Shesha sing your glory," said Rama, lord of Shri, and he held you close.',
  hi='हज़ार मुखों वाले शेषनाग तुम्हारा यश गाएँ, यह कहकर श्रीराम ने आपको गले लगा लिया।',
  ram=dict(en='When Hanuman returns with news of Sita, Valmiki has Rama say that an embrace is all he can give him in return.', refs=['vr.6.1.13']),
  variants=[])

U(id='hc.c14', kind='chaupai', n=14, slug='14-sanakadik-brahmadi-munisa',
  lines=['सनकादिक ब्रह्मादि मुनीसा ।', 'नारद सारद सहित अहीसा ॥'],
  words='सनकादिक=Sanaka and his brothers|ब्रह्मादि=Brahma and the gods|मुनीसा=the great sages|नारद=Narada|सारद=Sharada, Saraswati|सहित=with|अहीसा=Shesha, lord of serpents',
  en='Sanaka and his brothers, Brahma and the gods, the great sages, Narada and Saraswati, with Shesha, lord of serpents,',
  hi='सनक आदि ऋषि, ब्रह्मा आदि देवता, बड़े-बड़े मुनि, नारद, सरस्वती और शेषनाग भी,',
  ram=None, variants=[])

U(id='hc.c15', kind='chaupai', n=15, slug='15-jam-kuber-digpal-jahan-te',
  lines=['जम कुबेर दिगपाल जहाँ ते ।', 'कबि कोबिद कहि सके कहाँ ते ॥'],
  words='जम=Yama|कुबेर=Kubera|दिगपाल=guardians of the directions|जहाँ ते=all of them|कबि=poets|कोबिद=scholars|कहि=tell|सके=could|कहाँ ते=how',
  en='Yama, Kubera and the guardians of the directions cannot tell your glory in full. How could poets and scholars?',
  hi='यम, कुबेर और दिशाओं के रक्षक भी आपका यश पूरा नहीं कह पाते, तो कवि और विद्वान कैसे कहें।',
  ram=None, variants=['Some editions, including Rambhadracharya\'s, read सकें.'])

U(id='hc.c16', kind='chaupai', n=16, slug='16-tum-upkar-sugrivahi-kinha',
  lines=['तुम उपकार सुग्रीवहिं कीन्हा ।', 'राम मिलाय राज पद दीन्हा ॥'],
  words='तुम=you|उपकार=a great kindness|सुग्रीवहिं=to Sugriva|कीन्हा=did|राम=Rama|मिलाय=bringing him to|राज=king\'s|पद=place|दीन्हा=gave',
  en='You did Sugriva a great kindness. You brought him to Rama and gave him back his kingdom.',
  hi='आपने सुग्रीव पर उपकार किया। उन्हें श्रीराम से मिलाया और राजपद दिलाया।',
  ram=dict(en="Hanuman tells each side the other's story, and Rama and Sugriva seal their friendship with fire as witness.", refs=['rcm.4.5.doha.1']),
  variants=[])

U(id='hc.c17', kind='chaupai', n=17, slug='17-tumharo-mantra-vibhishan-mana',
  lines=['तुम्हरो मंत्र बिभीषन माना ।', 'लंकेस्वर भए सब जग जाना ॥'],
  words='तुम्हरो=your|मंत्र=counsel|बिभीषन=Vibhishana|माना=heeded|लंकेस्वर=lord of Lanka|भए=became|सब=the whole|जग=world|जाना=knows',
  en='Vibhishana took your counsel and became king of Lanka, as the whole world knows.',
  hi='विभीषण ने आपकी सलाह मानी और लंका के राजा बने, यह सारा संसार जानता है।',
  ram=dict(en="In Lanka, Hanuman meets Vibhishana and tells him how Rama always loves those who serve him.", refs=['rcm.5.6.chaupai.3']),
  variants=[])

U(id='hc.c18', kind='chaupai', n=18, slug='18-jug-sahastra-jojan-par-bhanu',
  lines=['जुग सहस्र जोजन पर भानू ।', 'लील्यो ताहि मधुर फल जानू ॥'],
  words='जुग=ages, a vast count|सहस्र=thousand|जोजन=yojanas, an old measure of distance|पर=away|भानू=the sun|लील्यो=swallowed|ताहि=it|मधुर=sweet|फल=fruit|जानू=taking it for',
  en='The sun stood thousands upon thousands of yojanas away, and you swallowed it, taking it for a sweet fruit.',
  hi='हज़ारों योजन दूर के सूरज को आपने मीठा फल समझकर निगल लिया।',
  ram=dict(en='Valmiki has Jambavan recall it: as a child Hanuman saw the rising sun, took it for a fruit and leapt into the sky to seize it.', refs=['vr.4.66.16']),
  variants=['Many printings show सहस्त्र, a common misspelling of सहस्र.'])

U(id='hc.c19', kind='chaupai', n=19, slug='19-prabhu-mudrika-meli-mukh-mahi',
  lines=['प्रभु मुद्रिका मेलि मुख माहीं ।', 'जलधि लाँघि गये अचरज नाहीं ॥'],
  words="प्रभु=the Lord's|मुद्रिका=ring|मेलि=placing|मुख=mouth|माहीं=in|जलधि=the ocean|लाँघि=leaping over|गये=went|अचरज=wonder|नाहीं=no",
  en="With the Lord's ring in your mouth you leapt over the ocean. That is no wonder.",
  hi='प्रभु की अँगूठी मुँह में रखकर आपने समुद्र लाँघ लिया, इसमें कोई अचरज नहीं।',
  ram=dict(en="Before the search parties leave, Rama touches Hanuman's head and gives him his ring. At the ocean, Hanuman goes like Rama's unfailing arrow.", refs=['rcm.4.24.chaupai.5', 'rcm.5.1.chaupai.4']),
  variants=[],
  card="With the Lord's ring in your mouth you leapt the ocean. That is no wonder.",
  card_hi='प्रभु की अँगूठी मुँह में रखकर आपने समुद्र लाँघ लिया, इसमें अचरज नहीं।')

U(id='hc.c20', kind='chaupai', n=20, slug='20-durgam-kaaj-jagat-ke-jete',
  lines=['दुर्गम काज जगत के जेते ।', 'सुगम अनुग्रह तुम्हरे तेते ॥'],
  words='दुर्गम=hard|काज=tasks|जगत के=in the world|जेते=as many as there are|सुगम=easy|अनुग्रह=grace|तुम्हरे=your|तेते=that many',
  en='However many hard tasks there are in the world, your grace makes every one of them easy.',
  hi='संसार के जितने भी कठिन काम हैं, आपकी कृपा से सब आसान हो जाते हैं।',
  ram=None, variants=[],
  card='However many hard tasks there are in the world, your grace makes every one of them easy.',
  card_hi='संसार के जितने कठिन काम हैं, आपकी कृपा से सब आसान हो जाते हैं।')

U(id='hc.c21', kind='chaupai', n=21, slug='21-ram-duare-tum-rakhvare',
  lines=['राम दुआरे तुम रखवारे ।', 'होत न आज्ञा बिनु पैसारे ॥'],
  words="राम=Rama's|दुआरे=at the door|तुम=you|रखवारे=guard|होत न=there is no|आज्ञा=leave|बिनु=without|पैसारे=entry",
  en="You guard Rama's door. No one enters without your leave.",
  hi='आप श्रीराम के द्वार के रखवाले हैं। आपकी आज्ञा के बिना कोई भीतर नहीं जा सकता।',
  ram=None, variants=[])

U(id='hc.c22', kind='chaupai', n=22, slug='22-sab-sukh-lahai-tumhari-sarna',
  lines=['सब सुख लहै तुम्हारी सरना ।', 'तुम रच्छक काहू को डर ना ॥'],
  words='सब=every|सुख=happiness|लहै=finds|तुम्हारी=your|सरना=refuge|तुम=you|रच्छक=protector|काहू को=of anyone|डर=fear|ना=no',
  en='Whoever takes refuge in you finds every happiness. With you as protector, there is nothing to fear.',
  hi='जो आपकी शरण में आता है, उसे सब सुख मिलते हैं। आप रक्षक हों तो किसी का डर नहीं।',
  ram=None,
  variants=['Rambhadracharya\'s Mahaviri reads लहहिं. Some printings run डर ना together as डरना; read it as two words, "no fear".'],
  card='Whoever takes refuge in you finds every happiness. With you as protector, there is nothing to fear.',
  card_hi='जो आपकी शरण में आए, उसे सब सुख मिलते हैं। आप रक्षक हों तो कोई डर नहीं।')

U(id='hc.c23', kind='chaupai', n=23, slug='23-aapan-tej-samharo-aapai',
  lines=['आपन तेज सम्हारो आपै ।', 'तीनों लोक हाँक तें काँपै ॥'],
  words='आपन=your own|तेज=power|सम्हारो=hold|आपै=only you|तीनों=all three|लोक=worlds|हाँक=roar|तें=at|काँपै=tremble',
  en='Only you can hold your own power. At your roar the three worlds tremble.',
  hi='अपने तेज को आप ही सँभाल सकते हैं। आपकी एक हुंकार से तीनों लोक काँप उठते हैं।',
  ram=None, variants=[])

U(id='hc.c24', kind='chaupai', n=24, slug='24-bhoot-pisach-nikat-nahi-aavai',
  lines=['भूत पिसाच निकट नहिं आवै ।', 'महाबीर जब नाम सुनावै ॥'],
  words='भूत=ghosts|पिसाच=evil spirits|निकट=near|नहिं=do not|आवै=come|महाबीर=the great hero|जब=when|नाम=name|सुनावै=speaks',
  en='Ghosts and evil spirits do not come near when someone speaks the name of the great hero.',
  hi='जब कोई महावीर का नाम लेता है, तो भूत-पिशाच पास नहीं आते।',
  ram=None, variants=[])

U(id='hc.c25', kind='chaupai', n=25, slug='25-nasai-rog-harai-sab-peera',
  lines=['नासै रोग हरै सब पीरा ।', 'जपत निरंतर हनुमत बीरा ॥'],
  words='नासै=destroys|रोग=illness|हरै=takes away|सब=all|पीरा=pain|जपत=repeating|निरंतर=without a break|हनुमत=Hanuman|बीरा=the brave',
  en='Illness is destroyed and every pain taken away for one who repeats the name of brave Hanuman without a break.',
  hi='वीर हनुमान का नाम लगातार जपने से रोग मिटते हैं और सारी पीड़ा दूर होती है।',
  ram=None, variants=[])

U(id='hc.c26', kind='chaupai', n=26, slug='26-sankat-te-hanuman-chhudavai',
  lines=['संकट तें हनुमान छुड़ावै ।', 'मन क्रम बचन ध्यान जो लावै ॥'],
  words='संकट=trouble|तें=from|हनुमान=Hanuman|छुड़ावै=frees|मन=thought|क्रम=deed|बचन=word|ध्यान=attention|जो=whoever|लावै=fixes on him',
  en='Hanuman frees from trouble whoever keeps him in mind, in thought, in deed and in word.',
  hi='जो मन, कर्म और वचन से हनुमान जी का ध्यान करता है, हनुमान जी उसे संकट से छुड़ाते हैं।',
  ram=None, variants=[],
  card='Hanuman frees from trouble whoever keeps him in mind, in thought, deed and word.',
  card_hi='जो मन, कर्म और वचन से ध्यान करे, हनुमान जी उसे संकट से छुड़ाते हैं।')

U(id='hc.c27', kind='chaupai', n=27, slug='27-sab-par-ram-tapasvi-raja',
  lines=['सब पर राम तपस्वी राजा ।', 'तिन के काज सकल तुम साजा ॥'],
  words='सब पर=above all|राम=Rama|तपस्वी=ascetic|राजा=king|तिन के=his|काज=tasks|सकल=all|तुम=you|साजा=carried out',
  en='Rama, the ascetic king, is above all, and you carried out every one of his tasks.',
  hi='तपस्वी राजा श्रीराम सबसे ऊपर हैं, और उनके सारे काम आपने ही पूरे किए।',
  ram=None,
  variants=['Rambhadracharya, in his Mahaviri commentary, reads सब पर राम राय सिरताजा, "Rama, crown of kings, is above all".'])

U(id='hc.c28', kind='chaupai', n=28, slug='28-aur-manorath-jo-koi-lavai',
  lines=['और मनोरथ जो कोइ लावै ।', 'सोइ अमित जीवन फल पावै ॥'],
  words='और=any other|मनोरथ=wish|जो कोइ=whoever|लावै=brings|सोइ=that very thing|अमित=boundless|जीवन=life\'s|फल=fruit|पावै=receives',
  en='Whoever brings you any other wish receives it, and with it the boundless fruit of life.',
  hi='जो कोई भी आपके पास कोई और इच्छा लेकर आता है, वह उसे पाता है, और साथ में जीवन का असीम फल भी।',
  ram=None,
  variants=['Rambhadracharya\'s Mahaviri reads तासु for सोइ. Some printings have कोई for कोइ.'])

U(id='hc.c29', kind='chaupai', n=29, slug='29-charon-jug-partap-tumhara',
  lines=['चारों जुग परताप तुम्हारा ।', 'है परसिद्ध जगत उजियारा ॥'],
  words='चारों=all four|जुग=ages|परताप=glory|तुम्हारा=your|है=is|परसिद्ध=famous|जगत=the world|उजियारा=light',
  en='Your glory runs through all four ages, and its fame lights up the world.',
  hi='चारों युगों में आपका प्रताप है। आपकी कीर्ति से सारा जगत उजला है।',
  ram=None, variants=['Rambhadracharya\'s Mahaviri reads चारिउ for चारों.'])

U(id='hc.c30', kind='chaupai', n=30, slug='30-sadhu-sant-ke-tum-rakhvare',
  lines=['साधु संत के तुम रखवारे ।', 'असुर निकंदन राम दुलारे ॥'],
  words="साधु=the good|संत=saints|के=of|तुम=you|रखवारे=protector|असुर=asuras|निकंदन=destroyer|राम=Rama's|दुलारे=beloved",
  en='You protect the good and the saints. You destroy the asuras, and Rama holds you dear.',
  hi='आप साधु-संतों के रखवाले हैं, राक्षसों का नाश करने वाले हैं, और श्रीराम के दुलारे हैं।',
  ram=None, variants=[])

U(id='hc.c31', kind='chaupai', n=31, slug='31-ashta-siddhi-nau-nidhi-ke-data',
  lines=['अष्ट सिद्धि नौ निधि के दाता ।', 'अस बर दीन जानकी माता ॥'],
  words='अष्ट=eight|सिद्धि=yogic powers|नौ=nine|निधि=treasures|के=of|दाता=giver|अस=such a|बर=boon|दीन=gave|जानकी=Janaki, Sita|माता=mother',
  en='You can give the eight siddhis and the nine treasures. Mother Janaki gave you this boon.',
  hi='आप आठ सिद्धियाँ और नौ निधियाँ देने वाले हैं। माता जानकी ने आपको यह वरदान दिया है।',
  ram=dict(en='In the Ashoka grove Sita blesses Hanuman: may he be ageless, deathless and a storehouse of virtue. The boon of siddhis and treasures is the Chalisa\'s own telling.', refs=['rcm.5.15.chaupai.2']),
  variants=['Some editions, including Rambhadracharya\'s, read नव निधि and दीन्ह.'])

U(id='hc.c32', kind='chaupai', n=32, slug='32-ram-rasayan-tumhare-pasa',
  lines=['राम रसायन तुम्हरे पासा ।', 'सदा रहो रघुपति के दासा ॥'],
  words="राम=Rama's|रसायन=elixir|तुम्हरे=you|पासा=have|सदा=always|रहो=remain|रघुपति के=of Rama, lord of the Raghus|दासा=servant",
  en="You hold the elixir of devotion to Rama, and you remain forever the servant of the lord of the Raghus.",
  hi='राम-भक्ति का रसायन आपके पास है, और आप सदा श्रीराम के सेवक बने रहते हैं।',
  ram=None,
  variants=['Rambhadracharya, in his Mahaviri commentary, reads सादर हौ रघुपति के दासा, "you are Raghupati\'s servant, with reverence".'])

U(id='hc.c33', kind='chaupai', n=33, slug='33-tumhare-bhajan-ram-ko-pavai',
  lines=['तुम्हरे भजन राम को पावै ।', 'जनम जनम के दुख बिसरावै ॥'],
  words='तुम्हरे=your|भजन=worship, singing of you|राम को=Rama|पावै=reaches|जनम जनम=birth after birth|के=of|दुख=sorrows|बिसरावै=leaves behind',
  en='By singing of you a person reaches Rama and leaves behind the sorrows of birth after birth.',
  hi='आपका भजन करके मनुष्य श्रीराम को पाता है और जन्म-जन्म के दुख भूल जाता है।',
  ram=None, variants=['Some printings read भावै: "singing of you pleases Rama".'])

U(id='hc.c34', kind='chaupai', n=34, slug='34-ant-kaal-raghubar-pur-jai',
  lines=['अंत काल रघुबर पुर जाई ।', 'जहाँ जन्म हरि-भक्त कहाई ॥'],
  words="अंत=end|काल=time|रघुबर=Rama's|पुर=abode|जाई=goes to|जहाँ=wherever|जन्म=born|हरि-भक्त=devotee of Hari|कहाई=is called",
  en="At the end that person goes to Rama's abode, and wherever they are born again they are known as a devotee of Hari.",
  hi='अंत समय में वह श्रीराम के धाम जाता है, और जहाँ भी जन्म ले, हरिभक्त कहलाता है।',
  ram=None, variants=['Rambhadracharya\'s Mahaviri prints हरि-भगत.'])

U(id='hc.c35', kind='chaupai', n=35, slug='35-aur-devta-chitt-na-dharai',
  lines=['और देवता चित्त न धरई ।', 'हनुमत सेइ सर्ब सुख करई ॥'],
  words='और=other|देवता=deities|चित्त=mind|न=not|धरई=holds|हनुमत=Hanuman|सेइ=serving|सर्ब=every|सुख=happiness|करई=brings',
  en='Even one who keeps no other deity in mind finds every happiness by serving Hanuman.',
  hi='किसी और देवता को मन में न भी रखे, तो भी हनुमान जी की सेवा से सब सुख मिलते हैं।',
  ram=None, variants=[])

U(id='hc.c36', kind='chaupai', n=36, slug='36-sankat-katai-mitai-sab-peera',
  lines=['संकट कटै मिटै सब पीरा ।', 'जो सुमिरै हनुमत बलबीरा ॥'],
  words='संकट=troubles|कटै=are cut away|मिटै=ends|सब=all|पीरा=pain|जो=whoever|सुमिरै=remembers|हनुमत=Hanuman|बलबीरा=the strong hero',
  en='Troubles are cut away and all pain ends for whoever remembers Hanuman, the strong hero.',
  hi='जो बलवीर हनुमान जी को याद करता है, उसके संकट कट जाते हैं और सारी पीड़ा मिट जाती है।',
  ram=None, variants=[],
  card='Troubles are cut away and pain ends for whoever remembers Hanuman, the strong hero.',
  card_hi='जो बलवीर हनुमान को याद करे, उसके संकट कटते हैं और पीड़ा मिटती है।')

U(id='hc.c37', kind='chaupai', n=37, slug='37-jai-jai-jai-hanuman-gosai',
  lines=['जै जै जै हनुमान गोसाईं ।', 'कृपा करहु गुरु देव की नाईं ॥'],
  words='जै=victory|जै=victory|जै=victory|हनुमान=Hanuman|गोसाईं=master, lord|कृपा=kindness|करहु=please show|गुरु=guru|देव=revered|की नाईं=like',
  en='Victory, victory, victory to you, Hanuman, my master. Be kind to me as a guru is kind.',
  hi='हे स्वामी हनुमान जी, आपकी जय हो, जय हो, जय हो। गुरु की तरह मुझ पर कृपा कीजिए।',
  ram=None,
  variants=['Many sing जय जय जय. Rambhadracharya\'s Mahaviri prints गुरुदेव as one word.'])

U(id='hc.c38', kind='chaupai', n=38, slug='38-jo-sat-bar-path-kar-koi',
  lines=['जो सत बार पाठ कर कोई ।', 'छूटहि बंदि महा सुख होई ॥'],
  words='जो=whoever|सत=a hundred|बार=times|पाठ=recitation|कर=does|कोई=anyone|छूटहि=is freed|बंदि=bondage|महा=great|सुख=joy|होई=comes',
  en='Whoever recites this a hundred times is freed from bondage and finds great joy.',
  hi='जो कोई इसका सौ बार पाठ करे, वह बंधनों से छूट जाता है और उसे बड़ा सुख मिलता है।',
  ram=None,
  variants=['Rambhadracharya\'s Mahaviri reads जो शत बार ... छुटहिं. Some popular printings read यह सत बार.'])

U(id='hc.c39', kind='chaupai', n=39, slug='39-jo-yah-padhai-hanuman-chalisa',
  lines=['जो यह पढ़ै हनुमान चलीसा ।', 'होय सिद्धि साखी गौरीसा ॥'],
  words='जो=whoever|यह=this|पढ़ै=reads|हनुमान=Hanuman|चलीसा=the forty verses, the Chalisa|होय=comes|सिद्धि=fulfilment|साखी=witness|गौरीसा=Shiva, lord of Gauri',
  en='Whoever reads this Hanuman Chalisa gains fulfilment. Shiva, lord of Gauri, is witness.',
  hi='जो यह हनुमान चालीसा पढ़ता है, उसे सिद्धि मिलती है। इसके साक्षी स्वयं गौरीपति शिव हैं।',
  ram=None,
  variants=['The Gita Press and Rambhadracharya both print चलीसा, which keeps the metre. Most families sing चालीसा.'])

U(id='hc.c40', kind='chaupai', n=40, slug='40-tulsidas-sada-hari-chera',
  lines=['तुलसीदास सदा हरि चेरा ।', 'कीजै नाथ हृदय महँ डेरा ॥'],
  words="तुलसीदास=Tulsidas|सदा=always|हरि=Hari's|चेरा=servant|कीजै=please make|नाथ=Lord|हृदय=heart|महँ=in|डेरा=your home",
  en="Tulsidas is forever Hari's servant. Lord, make your home in my heart.",
  hi='तुलसीदास सदा हरि के सेवक हैं। हे नाथ, मेरे हृदय में अपना डेरा बनाइए।',
  ram=None, variants=[])

U(id='hc.d3', kind='doha', n=3, slug='closing-doha-pavan-tanay-sankat-haran',
  lines=['पवनतनय संकट हरन मंगल मूरति रूप ।', 'राम लखन सीता सहित हृदय बसहु सुर भूप ॥'],
  words='पवनतनय=son of the Wind|संकट=trouble|हरन=remover|मंगल=blessing|मूरति=embodiment|रूप=form|राम=Rama|लखन=Lakshmana|सीता=Sita|सहित=with|हृदय=heart|बसहु=please live|सुर=of the gods|भूप=king',
  en='Son of the Wind, remover of trouble, whose very form is blessing: king among the gods, live in my heart with Rama, Lakshmana and Sita.',
  hi='हे पवनपुत्र, संकट हरने वाले, मंगल की मूर्ति, हे देवताओं के राजा, आप श्रीराम, लक्ष्मण और सीता के साथ मेरे हृदय में बसिए।',
  ram=None,
  variants=['Some Gita Press printings spell लखन as लषन, the older spelling, read the same way.'],
  card='Son of the Wind, remover of trouble, form of blessing: live in my heart with Rama, Lakshmana and Sita.',
  card_hi='हे पवनपुत्र, संकट हरने वाले, श्रीराम, लक्ष्मण और सीता के साथ मेरे हृदय में बसिए।')

KAND = {'1': 'Bal Kand', '2': 'Ayodhya Kand', '3': 'Aranya Kand', '4': 'Kishkindha Kand', '5': 'Sundar Kand', '6': 'Lanka Kand', '7': 'Uttar Kand'}
KANDA = {'1': 'Bala Kanda', '2': 'Ayodhya Kanda', '3': 'Aranya Kanda', '4': 'Kishkindha Kanda', '5': 'Sundara Kanda', '6': 'Yuddha Kanda', '7': 'Uttara Kanda'}


def ref_label(rid: str) -> str:
    p = rid.split('.')
    if p[0] == 'rcm':
        return f'Ramcharitmanas, {KAND[p[1]]} {p[1]}.{p[2]}, {p[3]} {p[4]}'
    if p[0] == 'vr':
        return f'Valmiki Ramayana, {KANDA[p[1]]} {p[1]}.{p[2]}.{p[3]}'
    raise ValueError(rid)


def load_corpus(ids):
    found = {}
    if not os.path.exists(CORPUS):
        print('corpus not reachable, skipping ref check', file=sys.stderr)
        return None
    want = set(ids)
    with open(CORPUS, encoding='utf-8') as f:
        for line in f:
            if not want:
                break
            d = json.loads(line)
            if d.get('id') in want:
                found[d['id']] = d.get('sanskrit', '')
                want.discard(d['id'])
    return found


REF_PICK = {
    'rcm.4.24.chaupai.5': 'करमुद्रिका',
    'rcm.5.1.chaupai.4': 'अमोघ',
    'rcm.5.6.chaupai.3': 'सुनहु बिभीषन',
    'rcm.5.11.chaupai.10': 'तब हनुमंत',
    'rcm.5.14.chaupai.4': 'कनक भूधराकार',
    'vr.4.66.8': 'अञ्जनेति',
    'vr.7.40.8': 'यावद्रामकथा',
}


def first_pada(text: str, rid: str = '') -> str:
    """The couplet of a corpus record that the reference is about (records can hold two)."""
    t = re.sub(r"[!']+", '', re.sub(r'\s+', ' ', text)).strip()
    parts = [p.strip() + ' ॥' for p in t.split('॥') if p.strip()]
    if not parts:
        return t
    pick = REF_PICK.get(rid)
    if pick:
        for p in parts:
            if pick in p:
                return p.replace(' ॥', '॥')
    return parts[0].replace(' ॥', '॥')


def label(u, lang):
    if u['kind'] == 'chaupai':
        return f"Chaupai {u['n']}" if lang == 'en' else f"चौपाई {u['n']}"
    if u['id'] == 'hc.d3':
        return 'Closing doha' if lang == 'en' else 'अंतिम दोहा'
    return f"Doha {u['n']}" if lang == 'en' else f"दोहा {u['n']}"


def words_count(s: str) -> int:
    return len(re.findall(r"[A-Za-zĀ-ɏḀ-ỿ'’]+", s))


def quick_answer(u, sung_first, ram_en):
    lab = label(u, 'en')
    lead = f'"{sung_first}" is {lab.lower() if lab.startswith("Closing") else lab} of the Hanuman Chalisa, which Tulsidas wrote in Awadhi. It means: {u["en"]}'
    extra = []
    if ram_en:
        extra.append(ram_en)
    extra.append('Read it slowly, one half at a time, and say the Awadhi aloud.')
    text = lead
    for e in extra:
        if words_count(text) >= 40:
            break
        cand = f'{text} {e}'
        if words_count(cand) > 60:
            continue
        text = cand
    return text


def main():
    all_refs = [r for u in UNITS if u.get('ram') for r in u['ram']['refs']]
    corpus = load_corpus(all_refs)
    if corpus is not None:
        missing = [r for r in all_refs if r not in corpus]
        if missing:
            sys.exit(f'refs not in corpus: {missing}')

    assert len(UNITS) == 43, len(UNITS)
    order_ids = ['hc.d1', 'hc.d2'] + [f'hc.c{i}' for i in range(1, 41)] + ['hc.d3']
    assert [u['id'] for u in UNITS] == order_ids

    out = []
    problems = []
    for pos, u in enumerate(UNITS, start=1):
        toks = [t for ln in u['lines'] for t in ln.split() if t not in ('।', '॥')]
        pairs = [p.split('=', 1) for p in u['words'].split('|')]
        gloss_words = [p[0] for p in pairs]
        # glosses may join two tokens with a space (e.g. करिबे को)
        joined = ' '.join(gloss_words)
        if joined != ' '.join(toks):
            problems.append(f"{u['id']}: gloss words {joined!r} != text {' '.join(toks)!r}")
        words = []
        for w, g in pairs:
            words.append({
                'w': w,
                'iast': ' '.join(SUNG_FIX.get(x) or sung(x) for x in w.split()),
                'gloss': g,
            })
        sung_lines = [sung_line(ln) for ln in u['lines']]
        schol_lines = [schol_line(ln) for ln in u['lines']]
        ram = None
        if u.get('ram'):
            ram = {
                'en': u['ram']['en'],
                'refs': [{'id': r, 'label': ref_label(r), 'text': first_pada(corpus[r], r) if corpus else ''} for r in u['ram']['refs']],
            }
        qa = quick_answer(u, sung_lines[0], u['ram']['en'] if u.get('ram') else None)
        n_q = words_count(qa)
        if n_q < 40 or n_q > 60:
            problems.append(f"{u['id']}: quick answer {n_q} words")
        rec = {
            'id': u['id'],
            'pos': pos,
            'kind': u['kind'],
            'n': u['n'],
            'label': {'en': label(u, 'en'), 'hi': label(u, 'hi')},
            'slug': u['slug'],
            'awadhi': u['lines'],
            'iast': sung_lines,
            'iastScholarly': schol_lines,
            'words': words,
            'meaning': {'en': u['en'], 'hi': u['hi']},
            'quick': qa,
            'ramayana': ram,
            'variants': u.get('variants', []),
            'audio': None,
            'learnDay': (pos - 1) // 4 + 1,
            'cardId': f"hc-{u['slug'].split('-', 1)[0] if u['kind'] == 'chaupai' else u['id'].split('.')[1]}" if u.get('card') else None,
            'reviewed': False,
        }
        out.append(rec)
    for p in problems:
        print('PROBLEM', p, file=sys.stderr)
    if problems:
        sys.exit(1)

    # slugs unique, lowercase, <= 60 chars
    slugs = [r['slug'] for r in out]
    assert len(set(slugs)) == len(slugs)
    for s in slugs:
        assert re.fullmatch(r'[a-z0-9-]+', s) and len(s) <= 60, s

    doc = {
        'title': {'en': 'Hanuman Chalisa', 'hi': 'हनुमान चालीसा'},
        'author': 'Goswami Tulsidas',
        'language': 'Awadhi',
        'edition': 'Gita Press, Gorakhpur (Shri Hanuman Chalisa, booklets 695 and 2121), orthography normalised',
        'editionShort': 'Gita Press reading',
        'iastNote': 'IAST is written as the Chalisa is sung, with the short a dropped at word ends and where singers drop it. A full scholarly IAST is kept in iastScholarly.',
        'updated': '2026-10-30',
        'units': out,
    }
    os.makedirs(OUT_DIR, exist_ok=True)
    with open(os.path.join(OUT_DIR, 'chalisa.json'), 'w', encoding='utf-8') as f:
        json.dump(doc, f, ensure_ascii=False, indent=1)
        f.write('\n')

    cards = []
    for u, r in zip(UNITS, out):
        if not u.get('card'):
            continue
        en = u['card']
        hi = u['card_hi']
        assert words_count(en) <= 20, (u['id'], words_count(en))
        assert len(hi.split()) <= 22, (u['id'], len(hi.split()))
        cards.append({
            'id': r['cardId'],
            'source': 'other',
            'sourceName': {'en': f"Hanuman Chalisa, {r['label']['en']}", 'hi': f"हनुमान चालीसा, {r['label']['hi']}"},
            'speaker': {'en': 'Tulsidas', 'hi': 'तुलसीदास'},
            'sanskritLine': ' '.join(u['lines']),
            'iast': ' / '.join(r['iast']),
            'meaning': {'en': en, 'hi': hi},
            'unit': r['id'],
            'href': f"/hanuman-chalisa/{r['slug']}",
            'reviewed': False,
        })
    assert len(cards) == 12, len(cards)
    with open(os.path.join(OUT_DIR, 'cards.json'), 'w', encoding='utf-8') as f:
        json.dump(cards, f, ensure_ascii=False, indent=1)
        f.write('\n')
    print(f'wrote {len(out)} units, {len(cards)} cards')


if __name__ == '__main__':
    main()
