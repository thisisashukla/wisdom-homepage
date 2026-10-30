# other-gitas funnel: owner review

Everything below was drafted for Wisdom on 30 Oct 2026 and carries `reviewed: false` in the data
(`frontend/src/content/funnels/other-gitas/ashtavakra.json`, `cards.json`). Nothing here is copied from Byrom,
Richards, Osho or any copyrighted translation. The corpus Hindi (licence unknown) and the corpus LLM English are not
published anywhere. Section A (the 40 indexed verse pages) matters most; start there.

To regenerate sections A to C after edits: `python3 scripts/funnels/other-gitas/build.py && python3 scripts/funnels/other-gitas/make_review.py` from `frontend/`.
Edit the English in `scripts/funnels/other-gitas/en_1.py`, `en_2.py`, `en_3.py`; notes in `show_1.py`, `show_2.py`; card lines in `cards_data.py`.

## Decisions to confirm first

1. **1.5** `viprādiko varṇaḥ`: rendered "a Brahmin or of any other varna" (the corpus draft said "learned scholar").
2. **2.10** `kanake kaṭakam`: "a bracelet into gold" (the corpus draft said "jewel"). Also 15.14 kaṭaka = bracelet.
3. **1.9, 1.10, 1.11** had no English in the corpus; ours is new. 1.11 ends "as you hold yourself, so you become" for `yā matiḥ sā gatir bhavet`, with `kiṃvadantī` rendered "the old saying".
4. **Speakers** follow the `uvāca` markers of the common text: Janaka speaks 1.1 and chapters 2, 4, 6, 7, 12, 13, 14, 19, 20; Ashtavakra the rest. The corpus speaker field was wrong for most of chapters 2, 6, 7, 12, 13, 14 and is ignored. One printed edition (esamskriti) gives **chapter 4** to Ashtavakra; we follow the editions that give it to Janaka. Please confirm against Nityaswarupananda.
5. **19.8** `trivarga` = the three aims of life (dharma, artha, kama). The corpus draft said "action, wisdom and devotion", which is wrong.
6. **9.6** `tārayati`: can mean crossing oneself or ferrying others; we kept "crosses the round of birth and death" and say both readings in the note.
7. **12.4** `he brahman`: kept as "O Brahman" (Janaka addressing his teacher). Some read it as "O Brahmin".
8. **20.13** `śivasya me`: "for me, the auspicious one". We avoided "Shiva" as a proper name here.
9. **1.15, 18.35** (practice as bondage): the notes say the traditional reading treats this as advice for a ripe student and link the contrast in BG 6.35. Check the tone is fair to practice.
10. **3.4** `upasthe 'tyanta-saṃsaktaḥ`: rendered "gripped by sexual craving". **17.14** `sānurāgāṃ striyaṃ`: "a woman full of desire"; it is about equanimity and not demeaning, but it has no card and no showcase page. No verse was excluded under the women rule; please confirm.
11. **Chapter titles** are our own plain English. Sanskrit chapter titles vary by edition and none is claimed.
12. **Commentary attributions** are kept general ("the Advaita reading", "commentators"). Specific claims to check: 1.1 links Janaka here to the Mahabharata debate story (tradition, not the text); 2.10 cites Chandogya 6.1 (clay); 15.8 cites the Vivekachudamani definition of shraddha, "traditionally attributed to Shankara"; 18.35 cites "everything is loved for the sake of the Self" (Brihadaranyaka 2.4.5); 17.3 sallaki = Boswellia. Please also check each note against Nityaswarupananda and Chinmayananda when you can; we did not have their texts open.
13. The disclosure line says "Commentary AI-drafted, human review pending." Switch it to the house line ("human-reviewed") in `src/lib/funnels/other-gitas/content.ts` (DISCLOSURE) once you have checked section A.

## Sanskrit corrections made to the corpus text (build.py FIXES)

| Verse | Corpus | Now | Why |
|---|---|---|---|
| 6.2 | वीचिसऽन्निभः | वीचिसन्निभः | stray avagraha |
| 7.4 | एतदेवाहमास्तितः | एतदेवाहमास्थितः | typo, matches 7.3 refrain |
| 11.8 | नाश्चर्यमिदं | नानाश्चर्यमिदं | missing syllable (metre) |
| 12.4 | ब्रह्मन्न् | ब्रह्मन् | doubled n |
| 13.6 | विहायास्मदहमासे | विहायास्मादहमासे | refrain of chapter 13 |
| 17.8, 17.12, 18.65 | जिघ्रन्न् | जिघ्रन् | doubled n |
| 18.90 | ब्रुवन्न् अपि | ब्रुवन्नपि | sandhi |
| 18.96 | किञ्चिन्न्न | किञ्चिन्न | typo |
| 19.1 | नाविधपरामर्श | नानाविधपरामर्श | missing syllable (metre) |
Zero-width joiners were removed everywhere (e.g. शृणु). Please spot-check 18.78 (`हानं क्व च न किञ्चन`), left as in the corpus.

## Facts on the hub, comparison and FAQ (checked 30 Oct 2026)

- 20 chapters, 298 verses: corpus count; matches the esamskriti edition's chapter markers.
- Dating range: Radhakamal Mukerjee about 500 to 400 BCE; J. L. Brockington 8th century CE (a follower of Shankara) or 14th century; Shantananda Puri: before Gaudapada (6th century CE). Source: en.wikipedia.org/wiki/Ashtavakra_Gita.
- Not part of the Mahabharata. The sage's story (curse by Kahoda, debate with Vandin/Bandi at Janaka's sacrifice, told by Lomasha in the Vana Parva). Source: en.wikipedia.org/wiki/Ashtavakra. Our text says "Bandi"; Wikipedia spells Vandin. Both are used.
- Ramana Maharshi, Ramakrishna, Vivekananda knew and quoted it (Wikipedia). Not used on the pages beyond the Ribhu Gita line.
- Bhagavad Gita date uses the house line ("roughly 400 BCE and 200 CE").

## /gitas entries: sources used

| Entry | Checked against | Confidence |
|---|---|---|
| Avadhuta | Wikipedia (Dattatreya, 8 ch, 289 verses, MSS 9th to 10th c.) | high |
| Anu | Wikipedia Anugita (Ashvamedhika Parva, ch 16 onward; Vaishampayana) | high |
| Brahmana | sanskritdocuments list (Ashvamedhika 21 to 34) and Wikipedia Anugita (husband and wife) | medium |
| Vyadha | Wikipedia (Vana Parva, Markandeya to Yudhishthira, Mithila) | high |
| Hamsa (MBh) | enjoylearningsanskrit BORI 12.288.2 (Bhishma: swan and Sadhyas); corpus frame | high |
| Uddhava | Wikipedia (Bhagavata 11, ch 6 to 29, ~1,100 verses, Shuka) | high |
| Hamsa (Bhagavata) | Wikipedia Uddhava Gita (subset at 11.13); Sanaka detail from the Bhagavata itself | medium, please confirm |
| Bhikshu | sanskritdocuments list (Bhagavata 11.23); Avanti detail from the Bhagavata | medium, please confirm |
| Kapila | sanskritdocuments list (Bhagavata 3.23 to 3.33), Devahuti | high |
| Gopi | sanskritdocuments list; Bhagavata 10.31 | high |
| Guru | Wikipedia (Skanda Purana or Vishvasara Tantra; Shiva and Parvati; 100 to 400+ verses) | high |
| Ribhu | Wikipedia (Shiva Rahasya part 6; Ribhu and Nidagha; ~2,000 verses; Ramana) | high |
| Devi | Wikipedia (Devi Bhagavata 7, last 10 ch; 507 verses; Brown: not before 13th c.) | high |
| Ganesha | Wikipedia (Ganesha Purana Krida Khanda 138 to 148; Varenya; 412 verses per Bailey) | high |
| Shiva | wisdomlib study (Padma Purana; Shiva to Rama; 16 chapters; Suta at Naimisha) | high |
| Ishvara | Wikipedia Kurma Purana (Uttara vibhaga, 11 ch) and hindupedia (Badarikashrama, sages) | high |
| Rama | Wikipedia Adhyatma Ramayana (Uttara Kanda ch 5; Rama to Lakshmana; 13th to 15th c.; Brahmanda Purana) | high |
| Pandava | hindupedia (anthology, most verses not in the MBh; 82 or 91 verses) | high |
| Mahamandal five | Dhish confirmed by its Hindi edition (per research brief); others "appear to belong" | medium: please confirm Vishnu, Shambhu, Shakti, Surya. sanskritdocuments lists a separate Surya Gita "from the Tattvasarayana" |

Left out for lack of a verified source: Vyasa Gita (Kurma), Yama Gita, Parashara Gita, Uttara Gita.

## A. The 40 showcase verses (indexed pages): translation, note, word meanings, commentary, Gita link

### 1.1 (Janaka)  [ ] checked

- Sanskrit: कथं ज्ञानमवाप्नोति कथं मुक्तिर्भविष्यति । वैराग्यं च कथं प्राप्तमेतद् ब्रूहि मम प्रभो ॥
- English: How does one come to know? How does freedom come about? And how is dispassion reached? Tell me this, my lord.
- What to notice: Janaka asks three things at once, and the whole text answers them in one stroke.
- Words: katham = how; jñānam = knowledge, knowing the Self; avāpnoti = one gains; muktiḥ = freedom, liberation; bhaviṣyati = will come about; vairāgyam = dispassion, the cooling of craving; prāptam = reached; etat = this; brūhi = tell; mama = me; prabho = O lord, O master
- Gita link (same): BG 4.34. Krishna tells Arjuna to learn from those who have seen the truth by asking them, and serving them.
- Commentary (183 words): The text opens with a king asking a young teacher three plain questions. Janaka of Mithila already has everything a person can want, and tradition links this conversation to the Mahabharata story in which the boy Ashtavakra wins a debate at Janaka's court. So the questions come from someone who has tried the usual answers. He asks about knowledge, freedom and dispassion as if they were separate goals with separate methods. The traditional reading is that Ashtavakra answers all three at once. From the next verse on he treats the three as one fact seen from three sides: when you know what you are, you are free, and craving loses its grip on its own. That is why the Ashtavakra Gita feels so short on instructions. It skips the ladder. Commentators in the Advaita line read Janaka here as the ideal student described in the Upanishads: mature, dispassionate already, and ready to hear the conclusion first. For a reader today, the useful part is the honesty of the question. His question is about what is true, more than about how to feel better.

### 1.2 (Ashtavakra)  [ ] checked

- Sanskrit: मुक्तिमिच्छसि चेत्तात विषयान् विषवत्त्यज । क्षमार्जवदयातोषसत्यं पीयूषवद् भज ॥
- English: If you want freedom, my child, leave the objects of the senses as you would leave poison. Take forgiveness, honesty, kindness, contentment and truth as you would take nectar.
- What to notice: The teacher's first answer is about conduct, before any talk of awareness.
- Words: muktim = freedom; icchasi = you want; cet = if; tāta = my child, dear one; viṣayān = objects of the senses; viṣavat = like poison; tyaja = leave, give up; kṣamā = forgiveness, patience; ārjava = straightforwardness, honesty; dayā = kindness; toṣa = contentment; satyam = truth; pīyūṣavat = like nectar; bhaja = take in, keep to
- Gita link (same): BG 16.2. Krishna's list of the qualities of a gentle nature includes truth, kindness and freedom from greed.
- Commentary (172 words): Ashtavakra calls the king tāta, the word a father uses for a child. Before he says anything about the Self, he gives an ethical instruction. Sense objects are to be left like poison, and five qualities are to be taken like nectar: forgiveness, honesty, kindness, contentment and truth. The image is precise. You do not argue with poison. You leave it in the cup. Nectar you drink. Traditional commentators note that the verse sets the ground for everything that follows. The later chapters say there is nothing to practise and nothing to give up, and readers who skip this verse sometimes take that as permission to drop ordinary decency. The Advaita tradition reads it the other way: a mind that keeps these five qualities becomes quiet enough to hear the teaching in 1.3 onward. Notice how ordinary the list is. Nothing exotic, nothing secret. Forgiveness and contentment are things you can practise at a family dinner or a difficult meeting today, and they are named here as the first step toward freedom.

### 1.3 (Ashtavakra)  [ ] checked

- Sanskrit: न पृथ्वी न जलं नाग्निर्न वायुर्द्यौर्न वा भवान् । एषां साक्षिणमात्मानं चिद्रूपं विद्धि मुक्तये ॥
- English: You are not earth, water, fire, air or space. To be free, know yourself as the witness of all these, made of awareness.
- What to notice: Every element is named and set aside, and what remains is the one who sees them.
- Words: na = not; pṛthvī = earth; jalam = water; agniḥ = fire; vāyuḥ = air; dyauḥ = sky, space; bhavān = you; eṣām = of these; sākṣiṇam = the witness; ātmānam = the Self; cidrūpam = whose form is awareness; viddhi = know; muktaye = for freedom
- Gita link (same): BG 13.2. Krishna calls the body the field and the one who knows it the knower of the field.
- Commentary (163 words): Indian philosophy describes the body and the physical world as built from five elements: earth, water, fire, air and space. Ashtavakra lists all five and says you are none of them. This is the method the Upanishads call neti neti, not this, not this. You remove what can be seen until only the seer is left. The key word is sākṣin, the witness. A witness in a court watches events without taking part in them, and that is the sense here. The Advaita teachers point out that whatever you can observe, including your body, your moods and your thoughts, stands in front of you as an object. The one observing cannot be one of those objects. The verse then adds cidrūpa, whose form is awareness, so the witness has content of its own: the plain fact of being aware. Ashtavakra presents this as the means to freedom, muktaye. He asks Janaka to notice what was always the case, with nothing new to believe.

### 1.4 (Ashtavakra)  [ ] checked

- Sanskrit: यदि देहं पृथक् कृत्य चिति विश्राम्य तिष्ठसि । अधुनैव सुखी शान्तो बन्धमुक्तो भविष्यसि ॥
- English: If you set the body apart and rest in awareness, you will be happy, at peace and free of bondage this very moment.
- What to notice: The verse promises freedom now, adhunā eva, with no waiting period.
- Words: yadi = if; deham = the body; pṛthak kṛtya = setting apart; citi = in awareness; viśrāmya = resting; tiṣṭhasi = you remain; adhunā eva = right now; sukhī = happy; śāntaḥ = at peace; bandhamuktaḥ = free of bondage; bhaviṣyasi = you will be
- Gita link (same): BG 5.21. Krishna describes the happiness found within by one who is not attached to outer contacts.
- Commentary (171 words): Two actions are named: set the body apart, and rest in awareness. Neither is a physical act. Setting the body apart means seeing it as something you have and use, the way you have a coat, instead of the thing you are. Resting in awareness means letting attention settle on the fact of being aware instead of running after each object. Then comes the startling phrase adhunā eva, right now. Most paths in the tradition speak of gradual purification over years or lifetimes. The Ashtavakra Gita, read by the Advaita teachers, says that freedom is the nature of the Self and so it cannot arrive later. It can only be recognised. The three results listed, happy, peaceful and unbound, are the same three things Janaka asked about in 1.1, in a different order. A reader trying this does not need a retreat. It can be done in a waiting room. Notice the body sitting there, notice that you are aware of it, and stay with the noticing for a few breaths.

### 1.5 (Ashtavakra)  [ ] checked

- Sanskrit: न त्वं विप्रादिको वर्णो नाश्रमी नाक्षगोचरः । असङ्गोऽसि निराकारो विश्वसाक्षी सुखी भव ॥
- English: You are not a Brahmin or of any other varna, you belong to no stage of life, and you are nothing the eyes can see. Unattached and formless, you are the witness of everything. Be happy.
- What to notice: Caste, stage of life and visible form are all named as things you are not.
- Words: tvam = you; vipra-ādikaḥ = a Brahmin or any other; varṇaḥ = varna, social class; āśramī = one in a stage of life; akṣa-gocaraḥ = within reach of the eyes and senses; asaṅgaḥ = unattached; asi = you are; nirākāraḥ = formless; viśva-sākṣī = witness of everything; sukhī bhava = be happy
- Gita link (same): BG 5.18. Krishna says the wise see the same Self in a learned Brahmin, a cow, an elephant, a dog and an outcaste.
- Commentary (169 words): The phrase vipra-ādiko varṇaḥ means a Brahmin or any of the other varnas. Ashtavakra is speaking to a Kshatriya king and tells him he is no varna at all. He adds that Janaka belongs to no āśrama, the four stages of student, householder, forest-dweller and renunciant, and that he is nothing the senses can grasp. These were the main ways a person was placed in society, and all of them belong to the body and its roles. The Advaita reading is consistent: such identities are real for social life and duty, and the Self they describe is untouched by them. The verse leaves dharma in place and says what you are underneath it. The teacher's own name sharpens the point. Ashtavakra means bent in eight places, and in the Mahabharata he is born with a body bent by his father's curse. Here that teacher tells a king that the body is not the person. The verse ends, as many do in this chapter, with a simple instruction: be happy.

### 1.6 (Ashtavakra)  [ ] checked

- Sanskrit: धर्माधर्मौ सुखं दुःखं मानसानि न ते विभो । न कर्तासि न भोक्तासि मुक्त एवासि सर्वदा ॥
- English: Right and wrong, pleasure and pain belong to the mind. They are not yours, all-pervading one. You are not the doer and not the one who enjoys. You are free, always.
- What to notice: Right and wrong are moved into the mind, along with pleasure and pain.
- Words: dharma-adharmau = right and wrong, merit and demerit; sukham = pleasure; duḥkham = pain; mānasāni = belonging to the mind; te = yours; vibho = O all-pervading one; kartā = doer; bhoktā = enjoyer, the one who experiences results; muktaḥ = free; eva = indeed; sarvadā = always
- Gita link (same): BG 13.32. Krishna says the Self, though dwelling in the body, does not act and is not stained.
- Commentary (169 words): This verse sounds dangerous until you read it with the tradition. Dharma and adharma here mean merit and demerit, the moral weight that actions leave behind. Ashtavakra places them in the mind along with pleasure and pain. He calls Janaka vibhu, all-pervading, and says the Self is neither the doer of actions nor the one who reaps their results. Advaita teachers are careful with this. The body and mind still act, and they still answer for what they do. Ethics stays in force at the level where action happens. What changes is the sense of who is acting. The Self is compared to light in a room: everything in the room is seen by it, and none of it belongs to it. The phrase mukta eva asi sarvadā, you are always free, is the heart of the verse. Freedom is described as a fact about you, present before any effort, which is why the next verses can say that the only bondage is a mistake about who you are.

### 1.7 (Ashtavakra)  [ ] checked

- Sanskrit: एको द्रष्टासि सर्वस्य मुक्तप्रायोऽसि सर्वदा । अयमेव हि ते बन्धो द्रष्टारं पश्यसीतरम् ॥
- English: You are the one seer of all, and you have always been free. Your only bondage is this: you see the seer as someone else.
- What to notice: Bondage is defined as one small error of seeing.
- Words: ekaḥ = one, alone; draṣṭā = seer; asi = you are; sarvasya = of everything; mukta-prāyaḥ = free in effect, as good as free; sarvadā = always; ayam eva = this alone; hi = indeed; te = your; bandhaḥ = bondage; draṣṭāram = the seer; paśyasi = you see; itaram = as someone else
- Commentary (165 words): Ashtavakra gives a definition of bondage that fits in half a line: you see the seer as someone other than yourself. In daily life we treat awareness as a property of a small person located behind the eyes. That person then seems to be one object among others, limited and exposed. The verse says this picture is the whole problem. There is one seer of everything, and it is what you are. The word mukta-prāya is unusual. Some commentators read it as free already, since prāya can mean in effect. Others read it as nearly free, meaning that the only thing between Janaka and freedom is this misreading. Both readings agree on the practical point. Nothing has to be built. One mistake has to be dropped. The Advaita teachers compare it to a man looking everywhere for a necklace he is wearing. When a friend points to his neck, he gains nothing new, and he stops searching. The verse invites the same kind of looking.

### 1.8 (Ashtavakra)  [ ] checked

- Sanskrit: अहं कर्तेत्यहंमानमहाकृष्णाहिदंशितः । नाहं कर्तेति विश्वासामृतं पीत्वा सुखी भव ॥
- English: You have been bitten by the great black snake of the thought 'I am the doer'. Drink the nectar of trust in 'I am not the doer', and be happy.
- What to notice: The thought 'I am the doer' is a snakebite, and the cure is something you drink.
- Words: aham kartā = I am the doer; iti = thus; ahaṃmāna = the pride of 'I'; mahā-kṛṣṇa-ahi = great black snake; daṃśitaḥ = bitten; na aham kartā = I am not the doer; viśvāsa = trust, conviction; amṛtam = nectar, the drink of deathlessness; pītvā = having drunk; sukhī bhava = be happy
- Gita link (same): BG 3.27. Krishna says actions are done by nature's qualities, and the one confused by ego thinks 'I am the doer'.
- Commentary (161 words): A snakebite was the classic emergency in old India, and the black cobra the deadliest snake. Ashtavakra uses that picture for ahaṅkāra, the conviction that I am the one doing everything. The poison works slowly. Every success becomes my success, every failure my failure, and the mind is never at rest. The antidote is named viśvāsa, which means trust or firm conviction. It is the thought 'I am not the doer', held until it becomes natural. The Advaita commentators link this with the Bhagavad Gita, where actions are said to be done by the qualities of nature while the confused self thinks it is the doer. Passivity is not the aim. Work still gets done, often better, because the worker is not carrying the weight of being its only cause. Someone who has prepared well for an interview, and then lets the outcome be, knows a small version of this. The verse asks for that ease to be extended to everything.

### 1.9 (Ashtavakra)  [ ] checked

- Sanskrit: एको विशुद्धबोधोऽहमिति निश्चयवह्निना । प्रज्वाल्याज्ञानगहनं वीतशोकः सुखी भव ॥
- English: 'I am the one pure awareness': let this certainty be a fire that burns down the forest of not knowing. Then be free of grief, and be happy.
- What to notice: Certainty is the fire, and ignorance is a whole forest, not a single tree.
- Words: ekaḥ = one; viśuddha-bodhaḥ = pure awareness; aham = I am; niścaya = certainty, firm conviction; vahninā = by the fire; prajvālya = having set ablaze; ajñāna-gahanam = the forest of not knowing; vīta-śokaḥ = free of grief; sukhī bhava = be happy
- Gita link (same): BG 4.37. Krishna says the fire of knowledge burns all actions to ash, as a blazing fire burns firewood.
- Commentary (168 words): Ignorance here is called gahana, a dense forest, the kind that is easy to get lost in and impossible to clear by hand. A fire clears it in one sweep. The fire is niścaya, a settled certainty: I am the one pure awareness. The tradition distinguishes between knowing something as information and knowing it with certainty. You can hear many times that you are awareness and still live as a frightened body. Niścaya is the point where the knowledge stops being an idea and becomes how you see. Advaita teachers say this certainty comes through hearing the teaching, reflecting on it until doubts are gone, and dwelling on it. Ashtavakra compresses all three into one image. The result named is vīta-śoka, free of grief. Grief is mentioned because it is the feeling that most tightly binds a person to the idea of being a limited self who can lose things. Burn the forest, and grief has nowhere to grow. The word niścaya returns many times in chapter 11.

### 1.10 (Ashtavakra)  [ ] checked

- Sanskrit: यत्र विश्वमिदं भाति कल्पितं रज्जुसर्पवत् । आनन्दपरमानन्दः स बोधस्त्वं सुखं भव ॥
- English: That in which this world appears, imagined like a snake on a rope, that joy beyond joy, that awareness: you are that. Be happy.
- What to notice: The world is compared to a snake seen on a rope, and the rope is you.
- Words: yatra = in which; viśvam idam = this world; bhāti = appears, shines; kalpitam = imagined, projected; rajju-sarpavat = like a snake on a rope; ānanda-paramānandaḥ = joy, the highest joy; saḥ = that; bodhaḥ = awareness; tvam = you; sukham = happily; bhava = be
- Commentary (162 words): The rope and the snake is the most famous example in Advaita. In dim light a coiled rope looks like a snake. The fear is real, the heartbeat is real, but nothing is there except rope. When a lamp is brought, the snake does not go anywhere. It was never there. Ashtavakra applies this to the world: it appears in awareness as the snake appears on the rope. The commentators are careful about what this claims. It allows the world its place in daily life and says that it has no being apart from the awareness in which it appears. The second half turns from the world to the reader. That awareness is ānanda, joy, and paramānanda, the highest joy, and you are it. So the instruction to be happy is less a command than a reminder. The verse pairs a large claim about the world with a personal one, and leaves the reader to notice that they are the same claim.

### 1.11 (Ashtavakra)  [ ] checked

- Sanskrit: मुक्ताभिमानी मुक्तो हि बद्धो बद्धाभिमान्यपि । किंवदन्तीह सत्येयं या मतिः सा गतिर्भवेत् ॥
- English: One who thinks 'I am free' is free. One who thinks 'I am bound' stays bound. The old saying is true: as you hold yourself, so you become.
- What to notice: The famous line yā matiḥ sā gatiḥ is quoted as a saying the listener already knows.
- Words: mukta-abhimānī = one who holds himself to be free; muktaḥ = free; hi = indeed; baddhaḥ = bound; baddha-abhimānī = one who holds himself to be bound; api = too; kiṃvadantī = a saying, a popular proverb; iha = here, in this world; satyā = true; iyam = this; yā matiḥ = whatever the conviction; sā gatiḥ = that is the outcome, the destination; bhavet = becomes
- Gita link (same): BG 17.3. Krishna says a person is made of his faith: as one's faith is, so one is.
- Commentary (177 words): This is the line most people quote from the Ashtavakra Gita, often without knowing its source. Ashtavakra presents the final phrase as a kiṃvadantī, a common saying, and says that here it holds true: yā matiḥ sā gatir bhavet, as your conviction, so your end. The first half applies it. One who takes himself to be free is free, and one who takes himself to be bound stays bound. Read quickly, this sounds like positive thinking. The tradition reads it more carefully. Mati here means the settled view of what you are, something deeper than a mood or an affirmation. Since the Self is already free, according to the previous verses, the only thing keeping a person bound is the view that he is bound. Change the view at its root and nothing else needs to change. Advaita teachers also use the verse as a warning. A person who keeps rehearsing his limitations, his failures and his bad luck builds a gati out of that mati. Where you settle your mind is where you end up living.

### 1.12 (Ashtavakra)  [ ] checked

- Sanskrit: आत्मा साक्षी विभुः पूर्ण एको मुक्तश्चिदक्रियः । असङ्गो निःस्पृहः शान्तो भ्रमात्संसारवानिव ॥
- English: The Self is the witness: all-pervading, whole, one, free, awareness itself, without action, unattached, without wanting, at peace. Only through error does it seem caught in worldly life.
- What to notice: Ten qualities of the Self are listed, and then one word explains why we miss them: bhramāt, through error.
- Words: ātmā = the Self; sākṣī = witness; vibhuḥ = all-pervading; pūrṇaḥ = whole, full; ekaḥ = one; muktaḥ = free; cit = awareness; akriyaḥ = without action; asaṅgaḥ = unattached; niḥspṛhaḥ = without wanting; śāntaḥ = at peace; bhramāt = through error; saṃsāravān iva = as if caught in worldly life
- Gita link (same): BG 13.23. Krishna names the Supreme Self in the body as the witness, the one who permits and sustains.
- Commentary (164 words): The verse is almost a list, and its rhythm is part of its meaning. The Self is the witness, all-pervading, whole, one, free, awareness, without action, unattached, without wanting, at peace. Each word answers a fear the ordinary self lives with. The small self feels incomplete, and the Self is pūrṇa, whole. It feels isolated, and the Self is vibhu, everywhere. It feels busy and pulled, and the Self is akriya and asaṅga, inactive and unattached. Then comes the hinge: bhramāt saṃsāravān iva, through error it seems to be caught in saṃsāra. The word iva, as if, carries the whole argument. In Advaita the Self was never bound and then rescued. The binding is an appearance, like the blue of the sky, which you can see clearly and which is not a property of space. Reading the list slowly, one word per breath, is a traditional way to use a verse like this. Each word is checked against your own experience before moving on.

### 1.13 (Ashtavakra)  [ ] checked

- Sanskrit: कूटस्थं बोधमद्वैतमात्मानं परिभावय । आभासोऽहं भ्रमं मुक्त्वा भावं बाह्यमथान्तरम् ॥
- English: Meditate on the Self as unchanging awareness, one without a second. Let go of the mistaken idea that you are a reflection, and of every sense of outside and inside.
- What to notice: The verse asks you to drop the idea that you are a reflection of awareness.
- Words: kūṭastham = unchanging, like an anvil; bodham = awareness; advaitam = one without a second; ātmānam = the Self; paribhāvaya = meditate on, dwell on; ābhāsaḥ aham = I am a reflection; bhramam = error; muktvā = letting go; bhāvam = notion, feeling; bāhyam = outer; atha = and; āntaram = inner
- Gita link (same): BG 12.3. Krishna describes the imperishable as all-pervading, unthinkable, unchanging, kūṭastha, steady and fixed.
- Commentary (176 words): Kūṭastha is the anvil in a blacksmith's shop. Everything is hammered on it, and it does not change shape. Ashtavakra uses it for the Self: unchanging awareness, one without a second. The instruction is paribhāvaya, dwell on this repeatedly. Then he names the error to drop: ābhāso 'ham, I am a reflection. Some Advaita schools explain the individual self as awareness reflected in the mind, like the sun reflected in a pot of water. The reflection moves when the water moves, and seems small and shaky. Ashtavakra tells Janaka not to identify with the reflection. Take your stand as the sun instead of its image in the pot. He adds a second thing to drop: the sense of outer and inner. We usually feel that we live inside and the world is outside. If awareness is one without a second, that border is also a construction. This verse is unusual in chapter 1 because it gives a practice, paribhāvaya. Even the Ashtavakra Gita, which later dismisses practice, allows this much: keep returning to what you are.

### 1.14 (Ashtavakra)  [ ] checked

- Sanskrit: देहाभिमानपाशेन चिरं बद्धोऽसि पुत्रक । बोधोऽहं ज्ञानखड्गेन तन्निकृत्य सुखी भव ॥
- English: My child, you have long been tied by the rope of 'I am the body'. Cut it with the sword of knowing 'I am awareness', and be happy.
- What to notice: Ashtavakra calls the king putraka, little son, while handing him a sword.
- Words: deha-abhimāna = the conviction 'I am the body'; pāśena = by the rope, the noose; ciram = for a long time; baddhaḥ asi = you have been bound; putraka = my son, dear child; bodhaḥ aham = I am awareness; jñāna-khaḍgena = with the sword of knowledge; tat = that; nikṛtya = cutting through; sukhī bhava = be happy
- Gita link (same): BG 4.42. Krishna tells Arjuna to cut the doubt in his heart with the sword of knowledge and stand up.
- Commentary (167 words): The noose in this verse is dehābhimāna, the settled feeling that I am this body. It is old, ciram, and it is tight. Ashtavakra calls Janaka putraka, little son, which is tender and also a little funny given that the speaker is the younger of the two. Then he hands him a sword: the knowledge 'I am awareness'. A sword is used once, cleanly. You do not untie a noose knot by knot when you can cut it. The Advaita teachers read this as the same point made in 1.9 with a fire: knowledge acts all at once, not by degrees. The body still exists and still needs care. What the sword cuts is the identification that makes every ache a threat to me. The sword image also appears in the Bhagavad Gita, where Krishna tells Arjuna to cut doubt with the sword of knowledge and stand up. There the result is action. Here the result is happiness. Both are what follows when the noose is gone.

### 1.15 (Ashtavakra)  [ ] checked

- Sanskrit: निःसङ्गो निष्क्रियोऽसि त्वं स्वप्रकाशो निरञ्जनः । अयमेव हि ते बन्धः समाधिमनुतिष्ठति ॥
- English: You are unattached and without action, shining by your own light, without stain. This is your bondage: you keep practising samadhi.
- What to notice: Practising samadhi is named as the bondage itself.
- Words: niḥsaṅgaḥ = unattached; niṣkriyaḥ = without action; asi = you are; sva-prakāśaḥ = shining by your own light; nirañjanaḥ = without stain; ayam eva = this alone; te bandhaḥ = your bondage; samādhim = samadhi, meditative absorption; anutiṣṭhati = you keep practising; hi = indeed
- Gita link (contrast): BG 6.35. Krishna tells Arjuna the restless mind is steadied by practice and dispassion, the step this verse assumes is behind you.
- Commentary (165 words): This is one of the verses that makes the Ashtavakra Gita different from most yoga texts. Samadhi, deep meditative absorption, is usually the goal of practice. Here Ashtavakra says your bondage is that you practise it. The reason is in the first line. You are unattached, actionless, self-luminous and stainless already. If you practise samadhi in order to become free, you have assumed you are not free, and the practice confirms the assumption every day. The commentators read this as a teaching for a particular kind of student, with no contempt for meditation, one like Janaka who is ready to hear the conclusion. For many people, practice is how the mind becomes calm enough to hear this at all, and the Bhagavad Gita says the mind is steadied by practice and dispassion. Ashtavakra is speaking about the last step, where the practitioner sees that the meditator, too, was an idea. The verse is a warning against turning freedom into a project with a finish line.

### 1.16 (Ashtavakra)  [ ] checked

- Sanskrit: त्वया व्याप्तमिदं विश्वं त्वयि प्रोतं यथार्थतः । शुद्धबुद्धस्वरूपस्त्वं मा गमः क्षुद्रचित्तताम् ॥
- English: In truth this world is pervaded by you and strung on you. Your nature is pure awareness. Do not fall into smallness of mind.
- What to notice: The world is said to be strung on you, the word used for beads on a thread.
- Words: tvayā = by you; vyāptam = pervaded; idam viśvam = this world; tvayi = in you; protam = strung, woven; yathārthataḥ = in truth; śuddha-buddha-svarūpaḥ = whose nature is pure awareness; tvam = you; mā gamaḥ = do not go into; kṣudra-cittatām = smallness of mind
- Gita link (same): BG 7.7. Krishna says all this is strung on him like pearls on a thread.
- Commentary (162 words): Prota means strung, as beads are strung on a thread, or woven, as threads run through cloth. Ashtavakra tells Janaka that the world is pervaded by him and strung on him. The thread does not show among the beads, yet nothing holds together without it. Then the verse turns personal: do not fall into kṣudra-cittatā, smallness of mind. The tradition reads this as the practical consequence of the teaching. If the whole world is strung on awareness, then pettiness, grudges and anxious self-concern are a strange way for awareness to behave. It is like a king worrying about a coin. The verse prescribes no effort to become large-minded. It reminds Janaka that he already is, and asks him not to forget it. The same image of beads on a thread appears in the Bhagavad Gita, where Krishna says all this is strung on him like pearls on a string. The two texts use one picture for one claim, from two different speakers.

### 1.17 (Ashtavakra)  [ ] checked

- Sanskrit: निरपेक्षो निर्विकारो निर्भरः शीतलाशयः । अगाधबुद्धिरक्षुब्धो भव चिन्मात्रवासनः ॥
- English: Need nothing, change not, be full and cool at heart, deep in understanding and unshaken. Let your one leaning be toward awareness alone.
- What to notice: The verse describes a person you could meet: cool, deep, unshaken.
- Words: nirapekṣaḥ = needing nothing; nirvikāraḥ = unchanging; nirbharaḥ = full, solid; śītala-āśayaḥ = cool at heart; agādha-buddhiḥ = of fathomless understanding; akṣubdhaḥ = unshaken; bhava = be; cinmātra-vāsanaḥ = with your one leaning toward awareness alone
- Gita link (same): BG 2.56. Krishna describes the one of steady wisdom, unshaken in sorrow and free of craving in pleasure.
- Commentary (161 words): Most of chapter 1 describes the Self. This verse describes how a person who knows it carries himself. Nirapekṣa means not depending on anything. Nirbhara means full, without hollow places that need filling. Śītalāśaya, cool at heart, is a lovely phrase in a hot country. It means the inner temperature stays even when things heat up. Agādha-buddhi, fathomless understanding, suggests deep water: you cannot touch the bottom with a stick. Akṣubdha, unshaken, is the word for a calm sea. The last phrase is the key to the others. Vāsanā usually means the habit-tendencies that pull the mind back to the same desires. Here Ashtavakra uses it in a good sense: let your one habit be awareness alone. The commentators read this as a concession to how minds work. Minds will lean somewhere, so let them lean toward their source. The portrait resembles the steady-minded person of the Bhagavad Gita's second chapter, who is neither shaken by sorrow nor hungry for pleasure.

### 1.18 (Ashtavakra)  [ ] checked

- Sanskrit: साकारमनृतं विद्धि निराकारं तु निश्चलम् । एतत्तत्त्वोपदेशेन न पुनर्भवसम्भवः ॥
- English: Know that what has form is unreal and what is formless is unmoving. Taught this truth, you do not come back to birth.
- What to notice: The verse sorts all things into two kinds, with form and without, and says which one is real.
- Words: sākāram = with form; anṛtam = unreal, untrue; viddhi = know; nirākāram = without form; tu = but, while; niścalam = unmoving, steady; etat = this; tattva-upadeśena = by teaching on what is real; na punaḥ = not again; bhava-sambhavaḥ = coming into existence, rebirth
- Gita link (same): BG 2.16. Krishna says the unreal has no being and the real never ceases to be.
- Commentary (175 words): Everything with a shape changes. The body grows and ages, mountains wear down, even stars burn out. Ashtavakra says what has form is anṛta, untrue, in the sense that it does not stay what it is. What has no form is niścala, unmoving. The Advaita reading uses a test from the Upanishads: the real is what does not change across past, present and future. By that test, forms fail and awareness passes, since it is present in waking, dream and deep sleep alike. The second line makes a large promise. Through this tattvopadeśa, teaching on what is real, there is no more coming into birth. The commentators explain that rebirth in this tradition follows identification with form. If you take yourself to be the formless, there is nothing to carry from one form to the next. A reader does not need to settle questions about rebirth to use the verse. Its first line is a lens for any loss. What has form was always going to change. What sees the change was never in danger.

### 1.19 (Ashtavakra)  [ ] checked

- Sanskrit: यथैवादर्शमध्यस्थे रूपेऽन्तः परितस्तु सः । तथैवाऽस्मिन् शरीरेऽन्तः परितः परमेश्वरः ॥
- English: As a mirror is present inside the image it holds and all around it, so the Supreme Lord is present inside this body and all around it.
- What to notice: The mirror is both inside the reflection and around it, and so is the Lord with the body.
- Words: yathā eva = just as; ādarśa = mirror; madhya-sthe = standing within; rūpe = in the image, the form; antaḥ = inside; paritaḥ = all around; tu = and; saḥ = it; tathā eva = in the same way; asmin śarīre = in this body; parameśvaraḥ = the Supreme Lord
- Gita link (same): BG 9.4. Krishna says all this is pervaded by him in his unmanifest form, and all beings rest in him.
- Commentary (175 words): Look at a face in a mirror. Where is the mirror? It is behind every point of the image, and it extends past the edges of the image too. The face seems to have depth and to be somewhere, but every part of it is mirror. Ashtavakra says the Supreme Lord is in this body the same way, inside it and all around it. The word chosen is parameśvara, the Supreme Lord, which shows that the Ashtavakra Gita, for all its austerity, does not avoid the language of devotion. The Advaita teachers read the mirror as awareness and the face as the body. The body seems solid and separate, but there is no point in it where awareness is absent, and awareness does not stop at the skin. A practical way to use this verse is to feel the body from inside for a moment, the breath and the weight, and then notice that the knowing of these sensations has no edge. The image is inside the mirror. The mirror is not inside the image.

### 1.20 (Ashtavakra)  [ ] checked

- Sanskrit: एकं सर्वगतं व्योम बहिरन्तर्यथा घटे । नित्यं निरन्तरं ब्रह्म सर्वभूतगणे तथा ॥
- English: As one all-pervading space is inside a pot and outside it, so Brahman, eternal and unbroken, is in every being.
- What to notice: Break the pot and the space inside does not go anywhere.
- Words: ekam = one; sarva-gatam = everywhere; vyoma = space, sky; bahiḥ = outside; antaḥ = inside; yathā = just as; ghaṭe = in a pot; nityam = eternal; nirantaram = unbroken, without gaps; brahma = Brahman; sarva-bhūta-gaṇe = in every host of beings; tathā = so
- Gita link (same): BG 9.6. Krishna compares all beings resting in him to the great wind that moves everywhere and stays within space.
- Commentary (171 words): The pot and the space is the second classic example in Advaita, alongside the rope and the snake. A clay pot seems to enclose a little space of its own. But the space inside and outside is one space, and when the pot breaks, nothing moves. The pot-space was never a separate thing. Ashtavakra applies this to Brahman, present in every being. Each body seems to hold a private self, and Brahman is one, eternal and nirantara, without gaps, inside and outside every creature. Chapter 1 ends here, having moved from Janaka's three questions to a picture of the whole of reality. The tradition draws two lessons from the verse. The first concerns death: when the pot breaks, the space is not harmed. The second concerns other people: the space in your pot and the space in your neighbour's pot are the same space. The Bhagavad Gita uses a related image, of the wind that moves everywhere and still rests in space, to say how all beings rest in the Lord.

### 2.1 (Janaka)  [ ] checked

- Sanskrit: अहो निरञ्जनः शान्तो बोधोऽहं प्रकृतेः परः । एतावन्तमहं कालं मोहेनैव विडम्बितः ॥
- English: How strange. I am spotless, at peace, awareness itself, beyond nature. All this time I have been fooled by delusion.
- What to notice: The student's first words after the teaching are a laugh at himself: all this time.
- Words: aho = how strange, ah; nirañjanaḥ = spotless; śāntaḥ = at peace; bodhaḥ = awareness; aham = I am; prakṛteḥ paraḥ = beyond nature; etāvantam kālam = all this time; mohena = by delusion; eva = only; viḍambitaḥ = fooled, made a mockery of
- Gita link (same): BG 18.73. Arjuna, at the end of the Gita, says his delusion is gone and his memory of who he is has returned.
- Commentary (162 words): Chapter 2 belongs to Janaka. He has heard nineteen verses from his teacher and something has turned over. He begins with aho, an exclamation of wonder that runs through the whole chapter. Then he says what he is: spotless, at peace, awareness, beyond nature. Prakṛti, nature, includes body and mind, so he is placing himself beyond both. The second line has a wry tone. Viḍambita means mocked or made a fool of. For all these years, he says, I have been fooled by delusion. The Advaita tradition values this verse as a picture of what recognition feels like from inside. There is no pride in it and no drama, only surprise that something so plain was missed for so long. Many people know a small version of this, the moment when a family quarrel that felt enormous suddenly looks like a misunderstanding. The rest of chapter 2 is Janaka testing the new view against everything he knows, and finding that it holds.

### 2.10 (Janaka)  [ ] checked

- Sanskrit: मत्तो विनिर्गतं विश्वं मय्येव लयमेष्यति । मृदि कुम्भो जले वीचिः कनके कटकं यथा ॥
- English: The world came out of me and will dissolve back into me, as a pot into clay, a wave into water, a bracelet into gold.
- What to notice: Three pairs, and each ornament or form dissolves back into what it was made of.
- Words: mattaḥ = from me; vinirgatam = come out; viśvam = the world; mayi eva = into me alone; layam eṣyati = will dissolve; mṛdi = into clay; kumbhaḥ = a pot; jale = into water; vīciḥ = a wave; kanake = into gold; kaṭakam = a bracelet
- Gita link (same): BG 9.7. Krishna says all beings return into his nature at the end of an age and come forth again at its start.
- Commentary (168 words): Janaka gives three examples, each a form and its material. A pot is clay given a shape. A wave is water in motion. A bracelet, kaṭaka, is gold bent into a ring. In each case the form has a name and a use, and in each case it returns to its material without any loss to the material. The clay was never less clay for being a pot. Janaka says the world comes out of him and returns into him in the same way. Advaita uses these examples, which go back to the Chandogya Upanishad's teaching that all clay things are only clay, to explain how one reality can appear as many things. The name and shape are real for use. You drink from the pot and wear the bracelet. But what they are made of is what they are. Applied to the self, the verse removes a fear. If you are the gold, the melting of a bracelet is a change of shape and not an ending.

### 2.25 (Janaka)  [ ] checked

- Sanskrit: मय्यनन्तमहाम्भोधावाश्चर्यं जीववीचयः । उद्यन्ति घ्नन्ति खेलन्ति प्रविशन्ति स्वभावतः ॥
- English: How wonderful. In me, the endless ocean, the waves of living beings rise, strike each other, play and sink back, by their own nature.
- What to notice: Living beings are waves that rise, collide, play and sink, by their own nature.
- Words: mayi = in me; ananta-mahā-ambhodhau = in the endless great ocean; āścaryam = wonder; jīva-vīcayaḥ = waves of living beings; udyanti = rise; ghnanti = strike each other; khelanti = play; praviśanti = enter back, sink; svabhāvataḥ = by their own nature
- Gita link (same): BG 2.70. Krishna compares the one at peace to the ocean, which stays still while rivers keep pouring in.
- Commentary (162 words): Chapter 2 ends with the ocean. Janaka sees himself as an endless ocean and living beings as its waves. The four verbs are worth reading slowly: they rise, they strike each other, they play, they sink back. That is a fair summary of any life, and of all lives together. The word ghnanti, they strike or even kill, is not softened. Waves crash into each other. People hurt each other. The verse does not pretend otherwise. What it adds is svabhāvataḥ, by their own nature. The waves do this because that is what waves do, and the ocean is not damaged by any of it. The Advaita reading is that this is how the knower looks at the world, with wonder, āścarya, and without being thrown about. The knower still feels for those who suffer, and sees their suffering from a depth it does not reach. The ocean returns in chapters 6, 7 and 15, each time with a slightly different lesson.

### 6.2 (Janaka)  [ ] checked

- Sanskrit: महोदधिरिवाहं स प्रपञ्चो वीचिसन्निभः । इति ज्ञानं तथैतस्य न त्यागो न ग्रहो लयः ॥
- English: I am like the great ocean. The world of many things is like a wave. Knowing this, there is nothing to give up, nothing to take and nothing to dissolve.
- What to notice: The same refrain closes all four verses of chapter 6: nothing to give up, take or dissolve.
- Words: mahā-udadhiḥ iva = like the great ocean; aham = I; saḥ = that; prapañcaḥ = the spread-out world of many things; vīci-sannibhaḥ = like a wave; iti = thus; jñānam = knowledge; tathā = so; etasya = of this; na tyāgaḥ = no giving up; na grahaḥ = no taking; layaḥ = dissolving
- Commentary (170 words): In chapter 5 Ashtavakra told Janaka four times to go to rest, layaṃ vraja, to dissolve. In chapter 6 the reply, in four verses, is that there is nothing to dissolve. This verse gives the ocean image. I am like the great ocean, and the world of many things is like a wave. Knowing this, there is no giving up, no taking and no dissolving. The refrain is the point. If the wave is water, you do not need to throw it away to reach the water, and you do not need to grab it either. Even dissolving it is unnecessary, since it is already nothing other than ocean. The Advaita teachers see chapter 6 as a refinement. Renunciation and absorption are useful ideas on the way, but they still assume a world standing apart from the Self. Once that assumption is gone, these efforts have no object. For a reader, the verse is an invitation to stop managing. Some days the waves are high. You are still the ocean.

### 7.1 (Janaka)  [ ] checked

- Sanskrit: मय्यनन्तमहाम्भोधौ विश्वपोत इतस्ततः । भ्रमति स्वान्तवातेन न ममास्त्यसहिष्णुता ॥
- English: In me, the endless ocean, the ship of the world drifts here and there, driven by its own wind. I am not troubled by it.
- What to notice: The ship of the world is moved by its own wind, and the ocean does not mind.
- Words: mayi = in me; ananta-mahā-ambhodhau = in the endless great ocean; viśva-potaḥ = the ship of the world; itastataḥ = here and there; bhramati = drifts, wanders; sva-anta-vātena = by the wind of its own mind; na = not; mama = for me; asti = there is; asahiṣṇutā = impatience, being troubled
- Commentary (173 words): In chapter 2 the ship of the world sank when the wind of the mind fell still. Here, in chapter 7, Janaka watches the ship drift here and there, pushed by its own wind, and says he feels no impatience about it. Asahiṣṇutā is the inability to bear something. Its absence is a calm tolerance, the kind a deep sea has toward the boats on its surface. The phrase svāntavātena can be read as by its own inner wind, the mind of each being. The world moves according to the minds within it. The ocean does not steer the ship. The Advaita reading draws a practical lesson. Much of our distress comes from wanting the world to move differently, and from feeling that it is our job to steer all of it. The knower still acts where action is his to take, and is not tormented by the drifting of everything else. Chapter 7 has five verses in this voice, each one Janaka settling more fully into the view his teacher gave him.

### 8.1 (Ashtavakra)  [ ] checked

- Sanskrit: तदा बन्धो यदा चित्तं किञ्चिद् वाञ्छति शोचति । किञ्चिन् मुञ्चति गृण्हाति किञ्चिद् दृष्यति कुप्यति ॥
- English: It is bondage when the mind wants something or grieves over something, lets go of something or grabs something, is pleased by something or angry at something.
- What to notice: Six movements of the mind are listed, and each one is called bondage.
- Words: tadā = then; bandhaḥ = bondage; yadā = when; cittam = the mind; kiñcit = something; vāñchati = wants; śocati = grieves; muñcati = lets go; gṛhṇāti = grabs; hṛṣyati = is delighted; kupyati = is angry
- Gita link (same): BG 2.62. Krishna traces how dwelling on objects breeds attachment, then desire, then anger.
- Commentary (161 words): Chapter 8 is four verses long and gives the clearest definition of bondage and freedom in the text. This first verse lists six movements: wanting, grieving, letting go, grabbing, delight and anger. The word kiñcit, something, repeats through the line. Bondage happens when the mind does any of these about something. Notice that letting go is on the list. Even renouncing something, if the mind grips the act of renouncing, is bondage. The Advaita commentators read the verse as a description of where bondage lives. Objects are neutral and the Self is free, so bondage can only live in the mind's reaching and recoiling. That makes the verse usable. The next time you feel pulled by a want or a grievance, you can name it: this is the movement Ashtavakra called bondage. Naming it will not end it. It does show you where it lives. The following verse gives the mirror image, the same six movements absent, and calls that freedom.

### 8.4 (Ashtavakra)  [ ] checked

- Sanskrit: यदा नाहं तदा मोक्षो यदाहं बन्धनं तदा । मत्वेति हेलया किञ्चिन्मा गृहाण विमुञ्च मा ॥
- English: When there is no 'I', there is freedom. When there is 'I', there is bondage. Knowing this, lightly, take nothing and drop nothing.
- What to notice: The word helayā, lightly or playfully, sets the tone for the whole instruction.
- Words: yadā = when; na aham = there is no 'I'; tadā = then; mokṣaḥ = freedom; aham = 'I'; bandhanam = bondage; matvā = having understood; iti = this; helayā = lightly, playfully; kiñcit = anything; mā gṛhāṇa = do not grab; vimuñca mā = do not drop
- Gita link (same): BG 2.71. Krishna says peace comes to one who lives without craving, without 'mine' and without 'I'.
- Commentary (161 words): The first line is as short as Sanskrit allows. When there is no I, there is freedom. When there is I, there is bondage. Aham here means the ego-sense, the small self that claims things, and not the Self of the earlier chapters. Then comes the instruction, and its most important word is helayā. It means lightly, easily, as if in play. Having seen this, says Ashtavakra, do not grab anything and do not drop anything, and do it lightly. The tradition reads helayā as a guard against turning the teaching into another strain. If you fight the ego with the ego, you have doubled it. If you try hard to neither grasp nor reject, you are grasping at non-grasping. The light touch is the method. It resembles holding a bird: too tight and you hurt it, too loose and it goes. With this verse the four-verse chapter ends, having said in four verses what some texts take volumes to say.

### 9.6 (Ashtavakra)  [ ] checked

- Sanskrit: कृत्वा मूर्तिपरिज्ञानं चैतन्यस्य न किं गुरुः । निर्वेदसमतायुक्त्या यस्तारयति संसृतेः ॥
- English: One who comes to know the nature of awareness through weariness with the world, evenness of mind and reasoning, and so crosses the round of birth and death: is he not a guru?
- What to notice: The verse asks a question and expects the answer yes: such a person is a guru.
- Words: kṛtvā = having gained; mūrti-parijñānam = full knowledge of the nature; caitanyasya = of awareness; na kim = is he not; guruḥ = a guru, a teacher; nirveda = weariness with the world; samatā = evenness of mind; yuktyā = by reasoning; yaḥ = who; tārayati = carries across; saṃsṛteḥ = from the round of birth and death
- Gita link (same): BG 4.34. Krishna says the wise who have seen the truth will teach you, if you approach them with humility and questions.
- Commentary (170 words): Chapter 9 is often titled nirveda, weariness with the world, and this verse explains how that weariness can become freedom. Three means are named: nirveda itself, samatā or evenness of mind, and yukti, reasoning. Through them a person comes to know the nature of awareness, mūrti meaning its true form. Such a person tārayati, carries across the river of saṃsāra. The verb can mean crossing oneself or ferrying others, and the commentators allow both. Then the question: is such a person not a guru? The verse widens the idea of a teacher. A guru here is defined by what they have understood and by their ability to cross. Title and lineage are not mentioned. This fits the story of the text, in which a boy with a bent body teaches a king. People searching 'Ashtavakra Gita 9.6' sometimes land on Bhagavad Gita 9.6, which is a different verse about all beings resting in God as the wind rests in space. The two texts agree on the role of the teacher.

### 11.5 (Ashtavakra)  [ ] checked

- Sanskrit: चिन्तया जायते दुःखं नान्यथेहेति निश्चयी । तया हीनः सुखी शान्तः सर्वत्र गलितस्पृहः ॥
- English: Sorrow is born of worry and of nothing else here. One who is sure of this is free of worry, happy, at peace, his wanting melted everywhere.
- What to notice: The verse names one source of sorrow, worry, and adds 'and nothing else here'.
- Words: cintayā = by worry, anxious thought; jāyate = is born; duḥkham = sorrow; na anyathā = not otherwise; iha = here; iti = thus; niścayī = one who is sure; tayā hīnaḥ = free of it; sukhī = happy; śāntaḥ = at peace; sarvatra = everywhere; galita-spṛhaḥ = with wanting melted away
- Gita link (same): BG 2.66. Krishna asks how there can be happiness for one who has no peace.
- Commentary (166 words): Chapter 11 has eight verses, each built around niścayī, one who is certain. This one names worry, cintā, as the source of sorrow, and says nānyatheha, not otherwise, here. The claim is strong. Events happen, losses happen, but the sorrow that lingers and spreads is made of thought turning over and over. Someone waiting for a medical result knows this: the hours of waiting often hurt more than the news. The Advaita commentators do not tell the reader to stop thinking by force, which rarely works. They point to certainty. One who is sure of this, who has seen it in his own experience, is freed of worry by that seeing. Then three results follow, as in many verses of this text: happy, peaceful, and with wanting melted, galita-spṛha. The image of melting is gentle. Desire is left to soften and run off once the heat of worry is gone. The verse is a good one to read slowly, more than once, on an anxious evening.

### 15.4 (Ashtavakra)  [ ] checked

- Sanskrit: न त्वं देहो न ते देहो भोक्ता कर्ता न वा भवान् । चिद्रूपोऽसि सदा साक्षी निरपेक्षः सुखं चर ॥
- English: You are not the body, and the body is not yours. You are not the doer or the enjoyer. You are awareness itself, always the witness, needing nothing. Move about at ease.
- What to notice: The verse begins with denials and ends with a walk: move about at ease.
- Words: na tvam dehaḥ = you are not the body; na te dehaḥ = the body is not yours; bhoktā = enjoyer; kartā = doer; bhavān = you; cidrūpaḥ = awareness itself; asi = you are; sadā = always; sākṣī = witness; nirapekṣaḥ = needing nothing; sukham = at ease; cara = move about, live
- Gita link (same): BG 2.20. Krishna says the Self is never born and never dies, and is not slain when the body is slain.
- Commentary (169 words): Chapter 15 returns to the themes of chapter 1, and this verse gathers the main points of chapter 1 into one line. You are not the body, and the body is not yours. You are neither doer nor enjoyer. You are awareness, always the witness, needing nothing. Then the instruction: sukhaṃ cara, move about at ease. Cara is a verb of walking, wandering, living one's life. It is a fitting end. The teaching sends Janaka back into his day with a lighter step, with no demand that he sit still forever. The phrase na te deha, the body is not yours, goes a step beyond na tvaṃ deha, you are not the body. Even ownership is denied. The Advaita reading is that the body belongs to nature and is used by awareness, the way a road is used by a traveller. The traveller does not own it and is not harmed when it ends. Readers who want one verse to memorise from the Ashtavakra Gita often choose this one.

### 15.7 (Ashtavakra)  [ ] checked

- Sanskrit: विश्वं स्फुरति यत्रेदं तरङ्गा इव सागरे । तत्त्वमेव न सन्देहश्चिन्मूर्ते विज्वरो भव ॥
- English: That in which this world shimmers like waves on the sea: you are that, without doubt. You who are awareness, let the fever go.
- What to notice: The line about waves on the sea, first used in 3.3 as a question, returns here as a plain statement.
- Words: viśvam = the world; sphurati = shimmers, flashes into view; yatra = in which; idam = this; taraṅgāḥ iva = like waves; sāgare = on the sea; tat = that; tvam eva = you are; na sandehaḥ = there is no doubt; cinmūrte = O form of awareness; vijvaraḥ = free of fever; bhava = be
- Commentary (165 words): In chapter 3 Ashtavakra used the first half of this verse to scold Janaka: you know you are that in which the world rises like waves, so why do you run about like a pauper? Here, in chapter 15, the same half-line comes back without the scolding. That in which the world shimmers like waves on the sea: you are that, without doubt. Sphurati is a lovely verb. It means to flash, to quiver into view, the way light catches on moving water. The world is pictured as that kind of flicker on the surface of awareness. Then Ashtavakra calls Janaka cinmūrti, form of awareness, and tells him to be vijvara, free of fever. Jvara is the ordinary word for fever, and it is used for the restless heat of craving and worry. The Advaita reading treats the verse as close to the great Upanishadic sayings, such as tat tvam asi, you are that. It is spoken with confidence. Na sandehaḥ, there is no doubt.

### 15.8 (Ashtavakra)  [ ] checked

- Sanskrit: श्रद्धस्व तात श्रद्धस्व नात्र मोऽहं कुरुष्व भोः । ज्ञानस्वरूपो भगवानात्मा त्वं प्रकृतेः परः ॥
- English: Trust, my child, trust. Do not be confused about this. You are the Self, made of knowledge, the Lord, beyond nature.
- What to notice: Ashtavakra repeats one word, śraddhasva, trust, as a father would.
- Words: śraddhasva = trust, have faith; tāta = my child; na atra = not here; moham = confusion; kuruṣva = make, fall into; bhoḥ = dear one; jñāna-svarūpaḥ = whose nature is knowledge; bhagavān = the Lord; ātmā = the Self; tvam = you; prakṛteḥ paraḥ = beyond nature
- Gita link (same): BG 4.39. Krishna says the one with trust, devoted and self-controlled, gains knowledge and soon reaches peace.
- Commentary (171 words): This verse has a tenderness rare in the text. Ashtavakra says śraddhasva twice, trust, trust, and calls Janaka tāta, child, and bhoḥ, an affectionate address. Śraddhā in the Vedanta tradition is not blind belief. The Vivekachudamani, traditionally attributed to Shankara, defines it as holding the words of the teacher and the scripture to be true, a working confidence that lets you test what you hear. Without it nothing can be learned, since you will not stay with a teaching long enough to see whether it is true. The content of what is to be trusted is large. You are the Self, whose nature is knowledge, the Lord, beyond nature. Bhagavān is a word usually reserved for God. Ashtavakra uses it for Janaka's own Self without hesitation. The Advaita teachers say this is where knowledge and devotion meet: the Lord you worship and the Self you are turn out to be one. The verse asks the reader for something modest, which is to stop arguing with the teaching long enough to look.

### 15.11 (Ashtavakra)  [ ] checked

- Sanskrit: त्वय्यनन्तमहाम्भोधौ विश्ववीचिः स्वभावतः । उदेतु वास्तमायातु न ते वृद्धिर्न वा क्षतिः ॥
- English: In you, the endless ocean, the wave of the world rises or sinks by its own nature. You neither grow nor shrink.
- What to notice: This is Janaka's own line from 7.2, given back to him by his teacher with 'I' changed to 'you'.
- Words: tvayi = in you; ananta-mahā-ambhodhau = in the endless great ocean; viśva-vīciḥ = the wave of the world; svabhāvataḥ = by its own nature; udetu = let it rise; vā = or; astam āyātu = let it sink; na te = not for you; vṛddhiḥ = growth; na vā kṣatiḥ = nor loss
- Gita link (same): BG 2.70. Krishna describes the ocean that stays unmoved while rivers pour into it, and the person at peace like it.
- Commentary (168 words): In chapter 7 Janaka said: in me, the endless ocean, the wave of the world rises or sinks by its own nature, and I neither grow nor shrink. Here Ashtavakra says the same line with one change. In you. The teacher hands the student's insight back to him, confirmed. The verb forms matter. Udetu and astam āyātu are imperatives of permission: let it rise, let it set. There is no command to stop the wave or to ride it, only permission for it to do what it does. Then: na te vṛddhir na vā kṣatiḥ, there is no growth and no loss for you. Advaita teachers use this verse to describe a calm that does not depend on outcomes. A good year and a bad year are both waves. The ocean is not richer after a high tide. Someone who has watched savings go up and down, or a career rise and stall, can test the verse against that experience and see whether the one watching ever changed.

### 15.14 (Ashtavakra)  [ ] checked

- Sanskrit: यत्त्वं पश्यसि तत्रैकस्त्वमेव प्रतिभाससे । किं पृथक् भासते स्वर्णात् कटकाङ्गदनूपुरम् ॥
- English: Whatever you see, you alone appear in it. Do bracelets, armlets and anklets appear as anything apart from the gold?
- What to notice: Bracelets, armlets and anklets are three shapes, and there is only one gold.
- Words: yat = whatever; tvam = you; paśyasi = see; tatra = there; ekaḥ = alone; tvam eva = you yourself; pratibhāsase = appear; kim = does; pṛthak = apart; bhāsate = appear; svarṇāt = from gold; kaṭaka = bracelet; aṅgada = armlet; nūpuram = anklet
- Gita link (same): BG 7.19. Krishna says the rare great soul is the one who sees that Vasudeva is all.
- Commentary (159 words): Indian households have long kept wealth as jewellery, and every family knows that a bracelet can be melted into an anklet without losing a gram of gold. Ashtavakra uses this everyday knowledge. Whatever you see, you alone appear there. Do the bracelet, the armlet and the anklet appear as something apart from the gold? Of course not. You may admire the shape, wear it on a different part of the body, call it by a different name, and the jeweller still weighs it as gold. The Advaita reading applies this to all experience. Trees, cities and people are different shapes, and what appears as all of them is awareness. The world keeps its variety, and a good jeweller cares a great deal about the shape. Beneath every difference there is a unity that is never lost. The example appeared in 2.10 with a single bracelet. Here three ornaments make the point that variety itself is no obstacle to oneness.

### 16.11 (Ashtavakra)  [ ] checked

- Sanskrit: हरो यद्युपदेष्टा ते हरिः कमलजोऽपि वा । तथापि न तव स्वाथ्यं सर्वविस्मरणादृते ॥
- English: Even if Shiva, Vishnu or lotus-born Brahma were your teacher, you would not be at ease until you forget it all.
- What to notice: Even the three highest gods as teachers would not be enough without forgetting.
- Words: haraḥ = Shiva; yadi = if; upadeṣṭā = teacher; te = your; hariḥ = Vishnu; kamalajaḥ = lotus-born, Brahma; api vā = or even; tathā api = even so; na = not; tava = your; svāsthyam = ease, resting in yourself; sarva-vismaraṇāt ṛte = without forgetting everything
- Gita link (same): BG 2.52. Krishna says that when your understanding crosses the thicket of confusion, you will grow indifferent to all you have heard and will hear.
- Commentary (162 words): Chapter 16 opens and closes with the same refrain: you will not be at ease until you forget everything. In this last verse Ashtavakra raises the stakes. Even if Shiva, Vishnu or Brahma were your teacher, it would not be enough. The word for ease is svāsthya, literally standing in oneself, the same root as the modern Hindi word for health. What is to be forgotten is everything learned, believed and held as a position. The Advaita reading is careful here. Ashtavakra quotes scripture and relies on it, and he names the gods with respect. His point is that knowledge held as information keeps you outside of what it describes. A person who has memorised every map of a city still has to put the maps away to walk its streets. The verse is useful for anyone who reads a great deal about spiritual matters, this page included. At some point the reading has to stop and the resting has to begin.

### 17.3 (Ashtavakra)  [ ] checked

- Sanskrit: न जातु विषयाः केऽपि स्वारामं हर्षयन्त्यमी । सल्लकीपल्लवप्रीतमिवेभं निम्बपल्लवाः ॥
- English: No objects ever please one who delights in the Self, as neem leaves do not please an elephant who loves sallaki leaves.
- What to notice: An elephant that loves sallaki leaves will not touch bitter neem.
- Words: na jātu = never; viṣayāḥ = objects of the senses; ke api = any; svārāmam = one who delights in the Self; harṣayanti = please; amī = these; sallakī-pallava = sallaki leaves, a tree elephants love; prītam = delighted by; iva = like; ibham = an elephant; nimba-pallavāḥ = neem leaves
- Gita link (same): BG 2.59. Krishna says even the taste for objects falls away once the highest has been seen.
- Commentary (162 words): Sallaki is the Indian frankincense tree, Boswellia, whose leaves elephants love. Neem leaves are bitter. An elephant that has its fill of sallaki will not bother with neem. Ashtavakra says sense objects are like neem to one who delights in the Self, svārāma. They are simply not interesting. The image avoids two common mistakes. It does not say the knower fights his desires, and it does not say objects are evil. Neem is a useful tree. It just has nothing to offer an elephant that has better food. The Advaita teachers read this as the natural end of desire, which comes from tasting something more satisfying. The Bhagavad Gita says the same thing in its second chapter: objects fall away from one who fasts, but the taste for them remains until the highest is seen. People searching for 'Ashtavakra Gita 17.3' often land on Bhagavad Gita 17.3, which is about faith shaping a person. This is the verse they were looking for.

### 18.1 (Ashtavakra)  [ ] checked

- Sanskrit: यस्य बोधोदये तावत्स्वप्नवद् भवति भ्रमः । तस्मै सुखैकरूपाय नमः शान्ताय तेजसे ॥
- English: I bow to that peace, that light, whose nature is joy alone, at whose dawning the error of the world becomes like a dream.
- What to notice: The hundred-verse chapter opens with a bow, before any argument.
- Words: yasya = whose; bodha-udaye = at the dawning of awareness; tāvat = then; svapnavat = like a dream; bhavati = becomes; bhramaḥ = error, the mistaken world; tasmai = to that; sukha-eka-rūpāya = whose one form is joy; namaḥ = I bow; śāntāya = to the peaceful; tejase = to the light
- Gita link (same): BG 2.69. Krishna says what is night for all beings is where the self-controlled one is awake.
- Commentary (167 words): Chapter 18 is a hundred verses long, a third of the whole text, and it is often titled the chapter of peace. It opens with a salutation, namaḥ. What is saluted has no name: it is that light, tejas, that peace, śānta, whose one form is joy, at whose dawning the error of the world becomes like a dream. Dreams are the tradition's favourite evidence. While dreaming, the dream world is fully real, with its fears and pleasures. On waking, nothing of it needs to be destroyed. It simply stops being taken as real. The verse says the same happens to the world when awareness dawns. The Advaita commentators note that the bow is directed at what Ashtavakra has been teaching all along, the Self, so the teacher bows to the student's own nature before speaking. A reader can use the verse the same way, as a short act of respect at the start of a day, directed at the awareness that is about to see it.

### 18.35 (Ashtavakra)  [ ] checked

- Sanskrit: शुद्धं बुद्धं प्रियं पूर्णं निष्प्रपञ्चं निरामयम् । आत्मानं तं न जानन्ति तत्राभ्यासपरा जनाः ॥
- English: People devoted to practice do not know the Self: pure, awake, dear, whole, beyond the spread of the world, untouched by sorrow.
- What to notice: Six qualities of the Self are listed, and then the surprise: those devoted to practice do not know it.
- Words: śuddham = pure; buddham = awake; priyam = dear, beloved; pūrṇam = whole; niṣprapañcam = beyond the spread of the world; nirāmayam = untouched by sorrow or sickness; ātmānam = the Self; tam = that; na jānanti = do not know; tatra = there; abhyāsa-parāḥ = devoted to practice; janāḥ = people
- Gita link (contrast): BG 6.35. Krishna tells Arjuna the restless mind is steadied by practice and dispassion, the step Ashtavakra treats as already behind his student.
- Commentary (172 words): The first line is a portrait of the Self in six words. Pure, awake, dear, whole, beyond the spread of the world, free of sickness. Priya, dear, is a striking choice. The Upanishads say that everything is loved for the sake of the Self, and here the Self itself is called the beloved. Then the second line turns: people devoted to practice do not know it. This is the same point made in 1.15 and repeated through chapter 18. If you practise in order to reach the Self, you have placed it somewhere else, at the end of the practice. Advaita teachers read the verse as aimed at a particular trap, where years of discipline become a way of postponing recognition. They do not read it as a ban on practice for everyone. The Bhagavad Gita takes a different emphasis and tells Arjuna that the restless mind is steadied by practice and dispassion. Many readers find both true at different stages. People searching for 'Ashtavakra samhita 18.35' are looking for this verse.

### 18.59 (Ashtavakra)  [ ] checked

- Sanskrit: सुखमास्ते सुखं शेते सुखमायाति याति च । सुखं वक्ति सुखं भुङ्क्ते व्यवहारेऽपि शान्तधीः ॥
- English: At ease he sits, at ease he sleeps, at ease he comes and goes, at ease he speaks, at ease he eats. Calm-minded, he is at ease even in daily dealings.
- What to notice: The word sukham, at ease, appears six times in two lines.
- Words: sukham = at ease, happily; āste = sits; śete = sleeps; āyāti = comes; yāti = goes; vakti = speaks; bhuṅkte = eats; vyavahāre api = even in everyday dealings; śānta-dhīḥ = one whose mind is calm
- Gita link (same): BG 5.8. Krishna says the one who knows the truth thinks 'I do nothing' while seeing, hearing, walking, sleeping and breathing.
- Commentary (159 words): After many verses of paradox and negation, chapter 18 offers this picture of ordinary life. At ease he sits, at ease he sleeps, at ease he comes and goes, at ease he speaks, at ease he eats. The word sukham opens each phrase, and the repetition is the meaning: the same ease runs through every activity. The last phrase is vyavahāre 'pi, even in vyavahāra, which means business, transactions, the give and take of daily life. The calm-minded person needs no quiet cave. He stays calm while paying bills and talking to neighbours. The Advaita reading treats this as the mark of a jīvanmukta, one free while living. Freedom shows itself in how a person eats lunch and answers questions. A reader can use the verse as a check during an ordinary day. Sitting, walking, speaking, eating: is there ease in it? The verse does not ask for different activities, only for a different quality in the same ones.

### 18.100 (Ashtavakra)  [ ] checked

- Sanskrit: न धावति जनाकीर्णं नारण्यमुपशान्तधीः । यथातथा यत्रतत्र सम एवावतिष्ठते ॥
- English: A mind at peace does not run to the crowd or to the forest. As it is, wherever it is, it stays the same.
- What to notice: The last verse of Ashtavakra's teaching refuses both the crowd and the forest.
- Words: na dhāvati = does not run; jana-ākīrṇam = to the crowd, the busy town; na araṇyam = nor to the forest; upaśānta-dhīḥ = one whose mind is at peace; yathā tathā = however it is; yatra tatra = wherever it is; samaḥ eva = the same; avatiṣṭhate = remains
- Gita link (same): BG 12.18. Krishna describes the one who is the same to friend and foe, in honour and dishonour, in heat and cold.
- Commentary (163 words): This is Ashtavakra's last word in the text. Chapters 19 and 20 belong to Janaka. Ashtavakra ends with a picture of where the peaceful mind lives, and the answer is nowhere in particular. It does not run to the crowded town and it does not run to the forest. Both directions were respected paths in old India. Some people sought engagement, others withdrew to hermitages. Ashtavakra declines both as escapes. Yathā tathā, however things are. Yatra tatra, wherever one is. The mind stays the same. The Advaita commentators read this as the fruit of the whole teaching. A person who knows the Self has no need to arrange circumstances, since peace does not come from them. For a reader, the verse removes a common excuse. Many of us think we would be calm somewhere else, after the move, after the project, away from the noise. Ashtavakra says the peaceful mind runs to neither. It stays where it is and is at peace there.

## B. Share cards (20): short meanings, English and Hindi

| Card | English | Hindi |
|---|---|---|
| ag-1-2 | If you want freedom, leave sense objects like poison and take forgiveness, honesty, kindness, contentment and truth like nectar. | मुक्ति चाहिए तो विषयों को ज़हर की तरह छोड़ो, और क्षमा, सरलता, दया, संतोष, सत्य को अमृत की तरह अपनाओ। |
| ag-1-3 | You are not earth, water, fire, air or space. Know yourself as the witness of these, made of awareness. | तुम न पृथ्वी हो, न जल, न अग्नि, न वायु, न आकाश। खुद को इन सबका साक्षी, चेतना जानो। |
| ag-1-4 | Set the body apart and rest in awareness, and you are happy, at peace and free right now. | शरीर को अलग देखो और चेतना में टिक जाओ, तो इसी पल सुखी, शांत और मुक्त हो। |
| ag-1-6 | You are not the doer and not the one who enjoys. You are free, always. | तुम न कर्ता हो, न भोक्ता। तुम हमेशा से मुक्त हो। |
| ag-1-8 | Bitten by the snake 'I am the doer', drink the nectar 'I am not the doer', and be happy. | 'मैं कर्ता हूँ' के काले साँप ने डसा है। 'मैं कर्ता नहीं' का अमृत पियो और सुखी रहो। |
| ag-1-11 | Think yourself free and you are free, bound and you are bound. As you hold yourself, so you become. | जो खुद को मुक्त माने वह मुक्त है, जो बंधा माने वह बंधा है। जैसी मति, वैसी गति। |
| ag-1-14 | Cut the old rope of 'I am the body' with the sword of 'I am awareness', and be happy. | 'मैं शरीर हूँ' की पुरानी रस्सी को 'मैं चेतना हूँ' की तलवार से काटो और सुखी रहो। |
| ag-1-16 | This whole world is strung on you. You are pure awareness. Do not fall into smallness of mind. | यह पूरा जगत तुम में पिरोया हुआ है। तुम शुद्ध चेतना हो, मन को छोटा मत करो। |
| ag-1-18 | What has form passes. What is formless does not move. Know this, and you are not born again. | जिसका आकार है वह टिकता नहीं, निराकार अचल है। यह जान लो तो फिर जन्म नहीं। |
| ag-2-1 | I am spotless, at peace, awareness itself. All this time I was fooled by delusion. | मैं निर्मल हूँ, शांत हूँ, चेतना हूँ। इतने समय तक मोह ने मुझे भरमाए रखा। |
| ag-2-25 | In me, the endless ocean, living beings rise like waves, collide, play and sink back by their own nature. | मुझ अनंत सागर में जीवों की लहरें उठती हैं, टकराती हैं, खेलती हैं और फिर समा जाती हैं। |
| ag-8-1 | It is bondage when the mind wants or grieves, grabs or lets go, is pleased or angry. | जब मन कुछ चाहता है, शोक करता है, पकड़ता है, छोड़ता है, खुश या नाराज़ होता है, वही बंधन है। |
| ag-8-4 | When there is no 'I', there is freedom. When there is 'I', there is bondage. Take nothing, drop nothing, lightly. | जब 'मैं' नहीं, तब मुक्ति। जब 'मैं' है, तब बंधन। सहज रहो, न कुछ पकड़ो, न छोड़ो। |
| ag-11-5 | Sorrow is born of worry and of nothing else. Know this, and be happy, at peace, free of wanting. | दुख चिंता से ही पैदा होता है। यह जान लो तो सुखी, शांत और इच्छा से मुक्त रहो। |
| ag-15-4 | You are not the body, not the doer. You are awareness, always the witness. Move about at ease. | तुम न शरीर हो, न कर्ता। तुम चेतना हो, सदा साक्षी। सुख से विचरो। |
| ag-15-8 | Trust, my child, trust. You are the Self, made of knowledge, beyond nature. | श्रद्धा रखो, बेटा, श्रद्धा रखो। तुम आत्मा हो, ज्ञानस्वरूप, प्रकृति से परे। |
| ag-15-11 | Let the wave of the world rise or fall in you, the endless ocean. You neither grow nor shrink. | तुम अनंत सागर हो। संसार की लहर उठे या गिरे, तुम न बढ़ते हो, न घटते हो। |
| ag-17-3 | Sense objects do not please one who delights in the Self, as neem leaves do not please an elephant. | आत्मा में रमने वाले को विषय नहीं लुभाते, जैसे सल्लकी खाने वाले हाथी को नीम के पत्ते। |
| ag-18-59 | At ease he sits, sleeps, comes and goes, speaks and eats. A calm mind is at ease in daily life. | वह सुख से बैठता है, सोता है, आता-जाता है, बोलता है, खाता है। शांत मन हर काम में सुखी है। |
| ag-18-100 | A mind at peace runs neither to the crowd nor to the forest. Wherever it is, it stays the same. | शांत मन न भीड़ की ओर भागता है, न जंगल की ओर। जहाँ भी हो, वैसा ही रहता है। |

## C. The other 258 verse translations (pages are noindex until notes exist)

| Ref | Speaker | Wisdom English |
|---|---|---|
| 2.2 | J | As I alone light up this body, so I light up the world. So the whole world is mine, or nothing is. |
| 2.3 | J | Now that I have let go of the world along with the body, through some skill in the teaching I see the supreme Self. |
| 2.4 | J | Waves, foam and bubbles are not different from water. In the same way the world, which comes out of the Self, is not different from the Self. |
| 2.5 | J | Looked at closely, a cloth is only thread. Looked at closely in the same way, this world is only the Self. |
| 2.6 | J | As sugar made from cane juice is filled with that juice, so the world, imagined in me, is filled with me through and through. |
| 2.7 | J | When the Self is not known, the world appears. When the Self is known, it does not. When the rope is not known, a snake appears. When it is known, the snake is gone. |
| 2.8 | J | Light is my own form. I am nothing other than that. When the world shines, it is I who shine. |
| 2.9 | J | How strange. Through not knowing, the imagined world appears in me, like silver in a shell, a snake in a rope, water in the sun's glare. |
| 2.11 | J | How wonderful I am. I bow to myself. I do not perish. Even when the whole world, from Brahma down to a blade of grass, perishes, I remain. |
| 2.12 | J | How wonderful I am. I bow to myself. Though I have a body, I am one. I go nowhere and come from nowhere. I stand pervading the world. |
| 2.13 | J | How wonderful I am. I bow to myself. No one is as able as I am: without touching it with a body, I have held up this world for all time. |
| 2.14 | J | How wonderful I am. I bow to myself. Nothing is mine, or everything that speech and mind can reach is mine. |
| 2.15 | J | Knowledge, the known and the knower: these three are not real. I am the spotless one in whom they appear through not knowing. |
| 2.16 | J | How strange. Duality is the root of sorrow, and there is no medicine for it except this: all that is seen is unreal, and I am one, pure awareness, without stain. |
| 2.17 | J | I am awareness alone. Through not knowing, I imagined limits on myself. Reflecting on this always, I rest in what has no divisions. |
| 2.18 | J | I have no bondage and no freedom. The error has ended, with nothing left to stand on. How strange: the world rests in me, and in truth it does not rest in me. |
| 2.19 | J | This world, body and all, is nothing: that is settled. The Self is pure awareness alone. So where could imagining take hold now? |
| 2.20 | J | Body, heaven and hell, bondage and freedom, and fear as well: all this is only imagining. What have I, who am awareness, to do with any of it? |
| 2.21 | J | How strange. Even in a crowd I see no second. It has become like a forest to me. What is there to cling to? |
| 2.22 | J | I am not the body, and the body is not mine. I am not the separate self. I am awareness. My bondage was this: the craving to keep living. |
| 2.23 | J | How strange. In me, the endless ocean, the many waves of the worlds rise at once when the wind of the mind blows. |
| 2.24 | J | In me, the endless ocean, when the wind of the mind falls still, the ship of the world sinks, by the bad luck of the trader on board, the separate self. |
| 3.1 | A | You have known the Self as one and indestructible, as it is. You know the Self and you are steady. How can you still take pleasure in piling up wealth? |
| 3.2 | A | How strange. Love for objects, which are a mistake, comes from not knowing the Self, as greed for silver springs up when a shell is not known for a shell. |
| 3.3 | A | You have known 'I am that in which the world rises like waves in the sea'. Why do you run about like someone poor? |
| 3.4 | A | Even after hearing that the Self is pure awareness and lovely beyond words, a person gripped by sexual craving grows clouded. |
| 3.5 | A | The sage knows the Self in every being and every being in the Self. It is strange that the sense of 'mine' still goes on in him. |
| 3.6 | A | Settled in the highest non-duality and set on freedom, he still falls under desire and is shaken by old habits of pleasure. That is strange. |
| 3.7 | A | He knows desire is the enemy of knowledge, he is weak, his last days are near, and still he longs for pleasure. That is strange. |
| 3.8 | A | He has turned from this world and the next, he can tell the lasting from the passing, he wants freedom, and yet he is afraid of freedom itself. That is strange. |
| 3.9 | A | Whether fed with pleasures or tormented, the steady one sees only the Self and is neither pleased nor angry. |
| 3.10 | A | He watches his own body acting as if it were someone else's. Praised or blamed, how could such a large-hearted person be shaken? |
| 3.11 | A | He sees this world as mere appearance and has lost all curiosity about it. How could the steady one be afraid, even when death is close? |
| 3.12 | A | The great one's mind wants nothing, even when nothing is left to hope for. Content in knowing the Self, with whom can he be compared? |
| 3.13 | A | Knowing by nature that what is seen is nothing, how would the steady one look at things as 'this to take' and 'this to throw away'? |
| 3.14 | A | For one who has dropped inner impurities, who is free of opposites and of wishes, a pleasure that comes on its own brings neither pain nor delight. |
| 4.1 | J | The steady one who knows the Self plays the game of experience. He has nothing in common with the confused, who carry the world like beasts of burden. |
| 4.2 | J | The state that Indra and all the gods long for, poor in their longing: the yogi stands there and does not grow excited. |
| 4.3 | J | Inwardly, one who knows That is not touched by merit or sin, as space is not touched by smoke, though smoke seems to fill it. |
| 4.4 | J | The great one has known this whole world as the Self. He lives as things come. Who could stop him? |
| 4.5 | J | Among the four kinds of beings, from Brahma down to a clump of grass, only the wise have the strength to give up both wanting and not wanting. |
| 4.6 | J | Rare is the one who knows the Self as one without a second, the Lord of the world. He does what he knows, and has no fear from anywhere. |
| 5.1 | A | You are tied to nothing. You are pure. What would you give up? Let this bundle of body and mind dissolve, and so go to rest. |
| 5.2 | A | The world rises from you like a bubble from the sea. Know the Self as one, and so go to rest. |
| 5.3 | A | Though seen, the world is unreal, and it does not exist in you, the spotless one: it is like the snake in the rope. Know this, and so go to rest. |
| 5.4 | A | The same in pain and pleasure, full, the same in hope and disappointment, the same in life and death: being so, go to rest. |
| 6.1 | J | I am endless like space. The world of nature is like a pot. Knowing this, there is nothing to give up, nothing to take and nothing to dissolve. |
| 6.3 | J | I am like the shell. The world is imagined, like the silver. Knowing this, there is nothing to give up, nothing to take and nothing to dissolve. |
| 6.4 | J | I am in every being, and every being is in me. Knowing this, there is nothing to give up, nothing to take and nothing to dissolve. |
| 7.2 | J | In me, the endless ocean, the wave of the world rises or sinks by its own nature. I neither grow nor shrink. |
| 7.3 | J | In me, the endless ocean, the world is only imagined. I am at complete peace and without form. In this alone I rest. |
| 7.4 | J | The Self is not in objects, and no object is in the Self, which is endless and spotless. So I am unattached, without craving, at peace. In this alone I rest. |
| 7.5 | J | How strange. I am awareness alone, and the world is like a magic show. So how, and where, could I imagine anything to reject or accept? |
| 8.2 | A | It is freedom when the mind does not want and does not grieve, does not let go and does not grab, is not pleased and is not angry. |
| 8.3 | A | It is bondage when the mind is attached to any one experience. It is freedom when the mind is attached to none. |
| 9.1 | A | Things done and things left undone, the pairs of opposites: when have they ever ended, and for whom? Knowing this, grow weary of it all, let go, and keep no vows. |
| 9.2 | A | My child, rare is the fortunate one whose wish to live, to enjoy and to know has been put out by watching how people live. |
| 9.3 | A | All this passes. It is spoiled by the three kinds of suffering, empty, worth little, fit to be left. Certain of this, one becomes still. |
| 9.4 | A | What time, what age of life is free of the pairs of opposites for anyone? Ignore them, live with what comes, and you reach the goal. |
| 9.5 | A | Seeing how great sages, saints and yogis differ in their views, who would not grow weary of it all and fall quiet? |
| 9.7 | A | See the changes of the elements as only the elements, as they are. That very moment you will be free of bondage and stand in your own nature. |
| 9.8 | A | Habit-tendencies are the world. So let all of them go. Dropping them is dropping the world. Then stay as you are, as things come. |
| 10.1 | A | Leave desire, which is your enemy, and wealth, which comes tangled with harm, and even dharma, which is the cause of both. Be indifferent to all of it. |
| 10.2 | A | Look on friends, land, money, houses, wife, gifts and other good fortune as a dream or a magic show lasting three or five days. |
| 10.3 | A | Wherever craving arises, know that the world is there. Take up mature dispassion, let craving go, and be happy. |
| 10.4 | A | Bondage is nothing but craving. Its end is called freedom. Simply by not clinging to the world, you find contentment again and again. |
| 10.5 | A | You are one, aware and pure. The world is inert and unreal. Not knowing is nothing either. So what is left that you still want to know? |
| 10.6 | A | Kingdoms, sons, wives, bodies and pleasures: you were attached to them, and still you lost them, birth after birth. |
| 10.7 | A | Enough of wealth, desire and even good deeds. In the thick forest of the world, the mind found no rest in them. |
| 10.8 | A | For how many births have you done hard and painful work with body, mind and speech? Stop now, at least today. |
| 11.1 | A | Becoming, ceasing and change come from the nature of things. One who is sure of this stays unchanged, free of distress, and comes to rest with ease. |
| 11.2 | A | 'God is the maker of all, and there is none besides him here': one who is sure of this, every wish melted inside, is at peace and clings to nothing. |
| 11.3 | A | Hard times and good times come in their season, by destiny. One who is sure of this is content, his senses at rest. He does not long and does not grieve. |
| 11.4 | A | Pleasure and pain, birth and death come by destiny. One who is sure of this sees nothing he must achieve, makes no strain, and is not stained even while acting. |
| 11.6 | A | 'I am not the body, the body is not mine, I am awareness': one who is sure of this has reached something like final freedom. He does not keep count of what he did and left undone. |
| 11.7 | A | 'From Brahma down to a clump of grass, it is all I': one who is sure of this has no wavering thought, is pure and at peace, and no longer worries about what he has and lacks. |
| 11.8 | A | This world of many wonders is nothing: one who is sure of this is free of tendencies, awareness alone, and comes to rest as if nothing were there. |
| 12.1 | J | First I lost patience with the body's work, then with long talk, then with thinking itself. So I rest as I am. |
| 12.2 | J | Sound and the other objects no longer pull at me, and the Self is no object to be seen. My heart is free of scatter and gathered. So I rest as I am. |
| 12.3 | J | Distraction comes from taking things as real, and effort is then made to reach samadhi. Seeing that this is how it goes, I rest as I am. |
| 12.4 | J | There is nothing to reject and nothing to take, so there is no joy and no sorrow. O Brahman, so I rest as I am. |
| 12.5 | J | A stage of life or none, meditation, the mind taking things up and dropping them: seeing these as my own imaginings, I rest as I am. |
| 12.6 | J | Doing rituals comes from not knowing, and so does stopping them. Knowing this truth fully, I rest as I am. |
| 12.7 | J | Thinking about the unthinkable is still a form of thought. So I have let that thinking go, and rest as I am. |
| 12.8 | J | Whoever has done this has done all there is to do. Whoever is like this by nature has done all there is to do. |
| 13.1 | J | The ease of owning nothing is rare even for one who wears only a loincloth. So I have left both giving up and taking, and live as it pleases me. |
| 13.2 | J | Here the body is strained, there the tongue grows tired, and there the mind. So I have left them and live at ease in what life is for. |
| 13.3 | J | Knowing as it is that nothing is ever done by the Self, I do whatever comes to be done and live as it pleases me. |
| 13.4 | J | Yogis who take themselves to be the body insist on action or on doing nothing. I am free of joining and parting, and live as it pleases me. |
| 13.5 | J | I gain nothing and lose nothing by standing, walking or lying down. So whether I stand, walk or sleep, I live as it pleases me. |
| 13.6 | J | Sleeping, I lose nothing. Striving, I win nothing. So I have dropped both loss and delight, and live as it pleases me. |
| 13.7 | J | Having seen many times how pleasure and the rest come and go in things, I have left good and bad behind, and live as it pleases me. |
| 14.1 | J | One whose mind is empty by nature, who thinks of things only by oversight, is like someone who has woken from sleep: his memories of the world have grown faint. |
| 14.2 | J | Where is wealth, where are friends, where are the thieves called sense objects, where is scripture, where is learning, now that my craving has melted away? |
| 14.3 | J | Now that I have known the witness, the supreme Self, the Lord, and hope for neither bondage nor freedom, I have no worry about being freed. |
| 14.4 | J | Empty of wavering thoughts within, moving freely outside like someone confused: such states are known only by those who share them. |
| 15.1 | A | A person of clear understanding is fulfilled by a teaching given in any way at all. Another may inquire his whole life and still stay confused. |
| 15.2 | A | Freedom is losing the taste for objects. Bondage is the taste for them. That is all there is to know. Now do as you wish. |
| 15.3 | A | This knowing of the truth turns the talker, the clever and the busy into someone silent, still and idle. So those who want enjoyment avoid it. |
| 15.5 | A | Liking and disliking belong to the mind, and the mind was never yours. You are free of wavering, awareness itself, unchanging. Move about at ease. |
| 15.6 | A | Know the Self in every being and every being in the Self. Free of 'I' and free of 'mine', be happy. |
| 15.9 | A | The body, wrapped in the qualities of nature, comes, stays and goes. The Self neither goes nor comes. Why grieve over it? |
| 15.10 | A | Let the body last to the end of the age or go today. What is gained or lost for you, who are awareness alone? |
| 15.12 | A | My child, you are awareness alone. This world is not separate from you. So who could imagine anything to reject or take, and how, and where? |
| 15.13 | A | In you, who are one, unchanging, at peace, a spotless sky of awareness, where is birth, where is action, where is the sense of 'I'? |
| 15.15 | A | Drop the division 'I am this, I am not that'. Be certain that all is the Self, make no more plans of the mind, and be happy. |
| 15.16 | A | Through your own not knowing, the world exists. In truth you alone are. There is no one apart from you, bound to the world or free of it. |
| 15.17 | A | 'This world is only an error, it is nothing': one who is sure of this is free of tendencies, awareness alone, and comes to rest as if nothing were there. |
| 15.18 | A | In the ocean of the world there was one, there is one, there will be one: you. You have no bondage and no freedom. Your work is done. Move about at ease. |
| 15.19 | A | You who are awareness, do not stir the mind with 'yes' and 'no'. Be still, and rest at ease in your own Self, which is joy itself. |
| 15.20 | A | Give up meditation altogether. Hold nothing in the heart. You are the Self, free already. What will you gain by thinking it over? |
| 16.1 | A | My child, you may recite many scriptures or hear them many times. Still you will not be at ease until you forget it all. |
| 16.2 | A | Wise one, you may enjoy, work or sit in samadhi. Even so, your mind will long most of all for the place where every wish has ended. |
| 16.3 | A | Everyone suffers from effort, and nobody sees it. By this teaching alone, the fortunate one finds rest. |
| 16.4 | A | The master idler, who finds even opening and closing his eyes a strain, has happiness. Nobody else has it. |
| 16.5 | A | When the mind is free of opposites like 'this is done, this is not done', it stops caring about dharma, wealth, pleasure and even freedom. |
| 16.6 | A | One who hates objects is dispassionate. One who craves them is attached. One who neither takes nor drops is neither dispassionate nor attached. |
| 16.7 | A | As long as wanting lives, which is a state without discernment, the sense of things to take and things to drop stays alive: the sprout of the tree of the world. |
| 16.8 | A | Activity breeds attachment, and holding back breeds aversion. So the wise one, free of opposites like a child, stays just as he is. |
| 16.9 | A | The attached person wants to leave the world to escape sorrow. One without attachment is free of sorrow and is not troubled even while living in it. |
| 16.10 | A | One who takes pride even in freedom and still calls the body his own is neither a knower nor a yogi. He only shares in sorrow. |
| 17.1 | A | He has the fruit of knowledge and the fruit of yoga practice who is content, whose senses are clear, and who delights in being alone. |
| 17.2 | A | One who knows what is real is never troubled here, for this whole round of worlds is filled by him alone. |
| 17.4 | A | One who does not dwell on pleasures he has had and does not long for those he has not had: such a person is rare. |
| 17.5 | A | Here we see people who want enjoyment and people who want freedom. Rare is the great soul who wants neither. |
| 17.6 | A | Rare is the large-hearted person who has no sense of taking or rejecting dharma, wealth, pleasure, freedom, life or death. |
| 17.7 | A | He has no wish for the world to end and no dislike of its going on. So the fortunate one lives at ease on whatever livelihood comes. |
| 17.8 | A | Fulfilled by this knowledge, his mind melted away, he lives at ease, seeing, hearing, touching, smelling, eating. |
| 17.9 | A | For one whose ocean of the world has dried up, the gaze is empty, action has no aim, the senses are idle. There is no wanting and no turning away. |
| 17.10 | A | He is not awake and not asleep, he neither opens nor closes his eyes. How wonderful: the free mind lives in the highest state wherever it is. |
| 17.11 | A | The free one is seen at ease everywhere, clear-hearted everywhere. Free of all tendencies, he shines everywhere. |
| 17.12 | A | Seeing, hearing, touching, smelling, eating, taking, speaking, walking, free of wanting and not wanting, the great soul is free. |
| 17.13 | A | He does not blame and does not praise, is not elated and is not angry, does not give and does not take. The free one has no taste for anything. |
| 17.14 | A | Whether he sees a woman full of desire or death standing near, the great soul stays unshaken and at ease. He is free. |
| 17.15 | A | In pleasure and pain, man and woman, good fortune and bad, the steady one, who sees the same everywhere, finds no difference. |
| 17.16 | A | In one whose round of births is worn out there is no cruelty and no pity, no arrogance and no meekness, no wonder and no agitation. |
| 17.17 | A | The free one neither hates objects nor craves them. With a mind always unattached, he takes what comes and what does not. |
| 17.18 | A | Gathered or scattered, good or bad: one whose mind is empty does not know these choices. He stays as if in final freedom. |
| 17.19 | A | Without 'mine', without 'I', certain that nothing is, every wish melted within, he does not act even while acting. |
| 17.20 | A | Free of the play of mind, confusion, dream and dullness, one whose mind has melted reaches a state nobody can name. |
| 18.2 | A | One may gain every kind of wealth and enjoy pleasures in plenty, yet nobody is happy without letting go of everything. |
| 18.3 | A | One whose inner self is scorched by the sun of duty and its pain: how can he be happy without the steady rain of the nectar of calm? |
| 18.4 | A | This world is only a thought. In the highest truth it is nothing. That which is real by nature, and which lights up both being and not-being, never stops being. |
| 18.5 | A | The place of the Self is near, and narrowing down does not gain it, for it is already yours: without thought, without effort, without change, without stain. |
| 18.6 | A | When confusion stops and one simply takes up one's own nature, people shine free of sorrow, their sight unveiled. |
| 18.7 | A | All this is only imagining. The Self is free and eternal. Knowing this, why would the steady one practise like a child? |
| 18.8 | A | Certain that the Self is Brahman and that being and not-being are imagined, what does the one without desire need to know, say or do? |
| 18.9 | A | 'I am this, I am not that': such thoughts fade for the yogi who is certain that all is the Self and has fallen silent. |
| 18.10 | A | For the yogi at peace there is no distraction and no focus, no heightened knowing and no dullness, no pleasure and no pain. |
| 18.11 | A | Ruling a kingdom or living on alms, gain or loss, among people or in the forest: it makes no difference to the yogi whose nature is free of wavering thought. |
| 18.12 | A | Where is dharma, where is pleasure, where is wealth, where is discernment, for the yogi free of opposites like 'this is done, this is not done'? |
| 18.13 | A | The yogi free while living has no duty left to do and no attachment in his heart. He lives as life comes. |
| 18.14 | A | Where is delusion, where is the world, where is meditation on That, where is freedom, for the great soul at rest past the edge of every intention? |
| 18.15 | A | One who has seen the world may try to deny it. But what does one without tendencies have to do? Seeing, he does not see. |
| 18.16 | A | One who has seen the supreme Brahman may think 'I am Brahman'. But what is left to think for one beyond thought, who sees no second? |
| 18.17 | A | One who has seen distraction in himself may work to stop it. The noble one is not distracted. With nothing to achieve, what would he do? |
| 18.18 | A | The steady one lives like other people and yet is unlike them. He sees no samadhi in himself, no distraction and no flaw. |
| 18.19 | A | The wise one, beyond being and not-being, content and free of tendencies, does nothing at all, though in other people's eyes he acts. |
| 18.20 | A | The steady one does not insist on acting or on holding back. He does whatever comes to be done and stays at ease. |
| 18.21 | A | Free of tendencies, leaning on nothing, moving freely, his ties undone, he is blown about by the wind of past impressions like a dry leaf. |
| 18.22 | A | One who is out of the round of the world has no joy and no gloom anywhere. With a mind always cool, he shines like one without a body. |
| 18.23 | A | The steady one who delights in the Self, cool and clear inside, has no wish to give anything up and feels no loss anywhere. |
| 18.24 | A | His mind is empty by nature and he acts as things come. Honour and dishonour do not reach the steady one the way they reach other people. |
| 18.25 | A | 'This act was done by the body, not by me, the pure Self': one who holds to this thought does not act even while acting. |
| 18.26 | A | He acts without announcing it, yet he is no fool. Free while living, happy and graced, he shines even while living a worldly life. |
| 18.27 | A | Worn out by endless reasoning, the steady one has come to rest. He does not imagine, does not know, does not hear, does not see. |
| 18.28 | A | With no samadhi and no distraction, he is neither one who wants freedom nor anything else. Having seen that all is imagined, the great soul lives as Brahman itself. |
| 18.29 | A | One who has the sense of 'I' inside acts even when he does nothing. The steady one free of 'I' does nothing, even when things are done. |
| 18.30 | A | The mind of the free one shines: not upset, not pleased, not the doer, without motion, without hope, without doubt. |
| 18.31 | A | The free one's mind does not set out to meditate or to act. It meditates and acts without a reason. |
| 18.32 | A | Hearing the truth as it is, a dull person is bewildered. A sharp one turns inward and may look like a dull one. |
| 18.33 | A | The confused work hard at concentration and control. The steady see nothing to do. They rest in their own state like people asleep. |
| 18.34 | A | With effort or without it, the confused do not find rest. The wise are at rest just by being sure of the truth. |
| 18.36 | A | The confused person does not gain freedom by repeated action, which is all practice is. The fortunate one, by knowing alone, stands free and unchanging. |
| 18.37 | A | The confused do not reach Brahman because they want to become it. The steady one, without even wanting it, has the nature of the supreme Brahman. |
| 18.38 | A | With no ground to stand on and restless to grasp, the confused keep the world going. The wise cut the root of this root of trouble. |
| 18.39 | A | The confused one does not find peace because he is trying to make himself peaceful. The steady one, sure of the truth, is always calm. |
| 18.40 | A | How can one who leans on what is seen see the Self? The steady do not see this and that. They see the Self that does not change. |
| 18.41 | A | Where is control of the mind for the confused one who forces it? For the steady one who delights in the Self, it comes naturally, always. |
| 18.42 | A | One person thinks things exist. Another thinks nothing exists. Rare is the one who thinks neither, and so stays undisturbed. |
| 18.43 | A | The dull-minded meditate on the Self as pure and one, but through confusion they do not know it, and stay unsatisfied all their lives. |
| 18.44 | A | The mind of one who wants freedom needs something to lean on. The mind of the free one leans on nothing and wants nothing, always. |
| 18.45 | A | Seeing the tigers of the senses' objects, frightened people looking for shelter rush into a cave to gain control and focus. |
| 18.46 | A | Seeing the lion without tendencies, the elephants of the senses' objects run off without a sound, or, if they cannot, stay and serve him like flatterers. |
| 18.47 | A | Free of doubt, his mind joined to the Self, he does not take up practices for freedom. Seeing, hearing, touching, smelling, eating, he lives at ease. |
| 18.48 | A | Clear-minded and settled just by hearing the truth, he does not look on right conduct, wrong conduct or indifference as his concern. |
| 18.49 | A | Whatever comes to be done, the straightforward one does it, good or bad. His actions are like a child's. |
| 18.50 | A | Through inner freedom one finds happiness. Through inner freedom one reaches the highest. Through inner freedom one comes to rest. Through inner freedom, the supreme state. |
| 18.51 | A | When one sees the Self as neither doer nor enjoyer, all the movements of the mind wear away. |
| 18.52 | A | The steady one's way of living shines, unbound and unforced. The forced calm of the confused, whose mind still wants, does not shine. |
| 18.53 | A | Steady ones, free of imagining, unbound, their minds set free, sometimes enjoy great pleasures and sometimes go into mountain caves. |
| 18.54 | A | When the steady one sees and honours a scholar of the Vedas, a deity, a holy place, a woman, a king or a loved one, no desire stirs in his heart. |
| 18.55 | A | Mocked and scorned by servants, sons, wives, grandsons and kin, the yogi is not shaken even a little. |
| 18.56 | A | Pleased, he is not pleased. Pained, he is not pained. Only those like him know such wondrous states. |
| 18.57 | A | Having duties is the world itself. The wise do not see it. They are empty of shape, without form, unchanging, untouched by pain. |
| 18.58 | A | The confused one, even doing nothing, is agitated and restless everywhere. The able one, even doing his work, stays undisturbed. |
| 18.60 | A | One who by nature feels no distress while dealing with the world like anyone else shines free of trouble, unstirred like a great lake. |
| 18.61 | A | Even the confused person's holding back becomes a kind of action. Even the steady one's action bears the fruit of holding back. |
| 18.62 | A | The confused often show dispassion toward their possessions. For one whose clinging to the body has melted, where is attachment, and where is dispassion? |
| 18.63 | A | The confused person's gaze is always caught up in thinking and not thinking. For one at rest in himself, even thinking about something is a way of not seeing it. |
| 18.64 | A | The sage who acts like a child, without desire in anything he begins, is pure, and is not stained even by the work he does. |
| 18.65 | A | Blessed is the one who knows the Self and stays the same in every state: seeing, hearing, touching, smelling, eating, with a mind free of thirst. |
| 18.66 | A | Where is the world, where is its appearance, where is the goal and where the means, for the steady one who is always like the sky, free of wavering thought? |
| 18.67 | A | Victorious is the one who has left all aims, who is the form of complete joy, and whose natural samadhi goes on unbroken. |
| 18.68 | A | What more is there to say? The great soul who knows the truth wants neither enjoyment nor freedom, and has no taste for anything, always, everywhere. |
| 18.69 | A | The duality of the world, beginning with the great principle of nature, is only names spreading out. Having dropped it, what is left to do for one who is pure awareness? |
| 18.70 | A | Certain that all this is born of error and nothing is, the pure one, whose shining nobody can see, comes to rest by his own nature. |
| 18.71 | A | For one whose form is pure shining, who does not see objects as real, where is rule, where is dispassion, where is giving up, where is calm? |
| 18.72 | A | For one who shines as the endless and does not see nature apart from himself, where is bondage, where is freedom, where is joy, where is grief? |
| 18.73 | A | In this world, which lasts as long as the intellect does, only illusion turns. The wise one, without 'mine', without 'I', without desire, shines. |
| 18.74 | A | For the sage who sees the Self as imperishable and free of pain, where is knowledge, where is the world, where is 'I am the body' or 'this is mine'? |
| 18.75 | A | If a dull-minded person drops practices like control of the mind, he at once starts on daydreams and chatter. |
| 18.76 | A | Even after hearing the truth, the dull one does not give up his confusion. He looks free of thought through outward effort, but inside he still longs for objects. |
| 18.77 | A | One whose actions have fallen away through knowledge, though others see him act, finds no occasion to do or say anything. |
| 18.78 | A | Where is darkness, where is light, where is loss, for the steady one who is always unchanging and fearless? There is nothing. |
| 18.79 | A | Where is patience, where is discernment, where is even fearlessness, for the yogi whose nature cannot be described and who has no separate nature? |
| 18.80 | A | There is no heaven, no hell, not even freedom while living. What more is there to say? In the yogi's sight, nothing at all is. |
| 18.81 | A | He does not pray for gain or grieve over loss. The steady one's cool mind is filled with nectar. |
| 18.82 | A | The one without desire does not praise the calm or blame the wicked. The same in sorrow and joy, content, he sees nothing he must do. |
| 18.83 | A | The steady one does not hate the world or long to see the Self. Free of joy and anger, he is not dead and he is not alive. |
| 18.84 | A | Without clinging fondness for children, wife and the rest, without desire for objects, without worry even about his own body, without expectations, the wise one shines. |
| 18.85 | A | The steady one is content everywhere, living on whatever falls his way, wandering where he likes and sleeping wherever the sun sets. |
| 18.86 | A | Let the body fall or rise. The great soul does not think about it. Resting on the ground of his own nature, he has forgotten the whole round of birth. |
| 18.87 | A | Owning nothing, moving freely, free of opposites, his doubts cut, unattached to anything, the wise one delights alone. |
| 18.88 | A | Without 'mine', the steady one shines. To him a clod, a stone and gold are the same. The knots of his heart are cut, and restlessness and dullness are shaken off. |
| 18.89 | A | He pays no special heed to anything and no tendency is left in his heart. Free and wholly content, with whom can he be compared? |
| 18.90 | A | Knowing, he does not know. Seeing, he does not see. Speaking, he does not speak. Who can be like this except one without tendencies? |
| 18.91 | A | Beggar or king, the one without desire shines, he whose ideas of good and bad in things have melted away. |
| 18.92 | A | Where is license, where is restraint, where is even settling the truth, for the yogi who is simplicity itself and has fulfilled his purpose? |
| 18.93 | A | What is felt inside by one who is content resting in the Self, without hope, his sorrows gone: how can it be told, and to whom? |
| 18.94 | A | Asleep, he is not in deep sleep. Dreaming, he is not lying down. Awake, he is not awake. The steady one is content at every step. |
| 18.95 | A | The knower has thoughts and is free of thought, has senses and is beyond them, has an intellect and is beyond it, has an 'I' and is free of it. |
| 18.96 | A | He is not happy and not unhappy, not detached and not attached, not one who wants freedom and not one who is free. He is not something and not nothing. |
| 18.97 | A | Distracted, he is not distracted. In samadhi, he is not in samadhi. In dullness, he is not dull. Learned, he is not learned. Blessed is he. |
| 18.98 | A | The free one rests in himself in every state, at peace with what is done and what is to be done, the same everywhere. Free of thirst, he does not recall what he did or left undone. |
| 18.99 | A | Praised, he is not pleased. Blamed, he is not angry. He does not shrink from death or cling to life. |
| 19.1 | J | With the tongs of knowing the truth, I have pulled from deep inside my heart the thorn of many kinds of opinion. |
| 19.2 | J | Where is dharma, where is pleasure, where is wealth, where is discernment, where is duality, where is even non-duality, for me who rest in my own greatness? |
| 19.3 | J | Where is past, where is future, where is even the present, where is place, where is even the eternal, for me who rest in my own greatness? |
| 19.4 | J | Where is the Self, where the not-Self, where good and bad, where worry and freedom from worry, for me who rest in my own greatness? |
| 19.5 | J | Where is dream, where is deep sleep, where is waking, where is the fourth state, where is even fear, for me who rest in my own greatness? |
| 19.6 | J | Where is far, where is near, where is outside, where is inside, where is gross, where is subtle, for me who rest in my own greatness? |
| 19.7 | J | Where is death, where is life, where are the worlds and worldly ways, where is dissolution, where is samadhi, for me who rest in my own greatness? |
| 19.8 | J | Enough talk of the three aims of life. Enough talk of yoga. Enough talk of knowledge too. I rest in the Self. |
| 20.1 | J | Where are the elements, where is the body, where are the senses, where is the mind, where is emptiness, where is despair, in my own spotless nature? |
| 20.2 | J | Where is scripture, where is knowledge of the Self, where is a mind without objects, where is contentment, where is freedom from thirst, for me who am always beyond the opposites? |
| 20.3 | J | Where is knowledge, where is not knowing, where is 'I', where is 'this', where is 'mine', where is bondage, where is freedom? How could my own nature have a form? |
| 20.4 | J | Where are the actions already bearing fruit, where is freedom while living, where even final freedom when the body falls, for me who am always without distinctions? |
| 20.5 | J | Where is the doer, where the enjoyer, where is stillness, where is stirring, where is direct knowing, where is its fruit, for me who am always without a separate nature? |
| 20.6 | J | Where is the world, where is the one who wants freedom, where is the yogi, where the knower, where the bound, where the free, in my own nature, which is one? |
| 20.7 | J | Where is creation, where is dissolution, where is the goal, where the means, where the one who strives, where success, in my own nature, which is one? |
| 20.8 | J | Where is the knower, the means of knowing, the known, or knowing itself? Where is anything, or nothing, for me who am always spotless? |
| 20.9 | J | Where is distraction, where is focus, where is understanding, where is dullness, where is joy, where is sorrow, for me who am always without action? |
| 20.10 | J | Where is this everyday world, where is the highest truth, where is happiness, where is sorrow, for me who am always beyond deliberation? |
| 20.11 | J | Where is maya, where is the world, where is liking or disliking, where is the separate self, where is that Brahman, for me who am always spotless? |
| 20.12 | J | Where is activity or rest, where is freedom or bondage, for me who am always unchanging, undivided and at home in myself? |
| 20.13 | J | Where is instruction, where is scripture, where is the disciple, where is the guru, where is the goal of life, for me, the auspicious one, free of every limit? |
| 20.14 | J | Where is being, where is not-being, where is one, where is two? What more is there to say? Nothing at all rises in me. |
