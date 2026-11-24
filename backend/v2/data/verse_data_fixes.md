# Verse data fixes (from the verse research, 24 Nov 2026)

For fixing the source verse DB. Nothing here was changed in the corpus. Built from `data/research/out/*.json` (the `verified_ref`, `attribution_ok/_note`, `translation_ok/_note` fields) and the editor notes `*_notes.md`; `data/verse_context.json` carries the same flags (`data_flags`) so the prompts already steer around them. "In plans" = used in `data/plans.json` (fix these first).

## Severity 1: shown to users and wrong

### 1a. Translation or plain line misstates the verse (68; 8 in plans)

Some are flagged for the `line` only (the research says so at the start of the note).

| verse | in plans | what is wrong (research note, trimmed) |
|---|---|---|
| bg.1.29 | work-feels-unsafe:d1 | Our Sanskrit and ref cover 1.29 and 1.30, but the English renders only 1.29 (limbs, mouth, trembling, hair). It leaves out 1.30: the Gandiva bow slipping from his hand, his skin burning, being unable to stand, and his mind seeming to spin. Add the second... |
| bg.18.14 | fear-of-failure:d2 | Flagged false for the LINE (the translation itself is acceptable). Translation acceptable ('the seat' for adhiṣṭhāna is right). Two issues in our data: (1) the line and prasang call adhiṣṭhāna 'the setting', but every commentator read here (Shankara, Ramanuja, Sridhara, Sivananda) glosses it as the... |
| bg.18.63 | decision-making:d5 | Flagged false for the LINE (the translation itself is acceptable). Translation fine. Line error: 'I've told you all I know' is not in the verse, which says 'thus this knowledge, more secret than all secrets, has been declared to you by me'. Krishna also goes... |
| bg.2.50 | fear-of-failure:d5 | 'Casts off both good and bad results' misstates sukṛta-duṣkṛte, which means good and bad deeds: merit and sin (Shankara), accumulated good and evil deeds (Ramanuja), work leading to heaven and hell (Sridhara). Suggest 'casts off both good and bad deeds (merit and demerit) here in... |
| bg.9.30 | guilt:d4 | Flagged false for the LINE (the translation itself is acceptable). Translation fine. Line shifts the verse: 'count yourself among the good' and 'the moment you turn' make it self-assessment and instant. The verse says such a person 'should be regarded' (mantavyaḥ) as good because his... |
| bh.niti.87 | someone-left:d3, too-heavy:d4 | Our Sanskrit does not match the GRETIL text it cites. GRETIL reads 'kṣīṇo 'py upacīyate punaś candraḥ / ... santapyante na duḥkheṣu' (not consumed in their sorrows); Kosambi reads '... na vidhureṣu' (in misfortunes); Kale's translation ('not troubled in this world when plunged in misery')... |
| bh.vairagya.82 | gratitude:d1 | Minor: 'for long' belongs to the poet's reflection, not to the mind looking outward. Kale, Wortham and Madhavananda all read it as 'though I have pondered it for a long time, I do not know what noble austerity has ripened into this', with the mind... |
| up_mundaka.3.1.4 | running-on-empty:d4 | Two loose spots. (1) 'Does not talk over others' and the line 'the wise stop arguing' are modern glosses of na ativadi. Shankara: he does not talk of anything other than the Self. Madhva (Vasu tr.): he no longer claims 'I am the doer' and... |
| ashtavakra.1.17 | - | 'Self-reliant' for nirbhara is not supported. Nityaswarupananda has 'devoid of bulk and form', Richards 'formless', Baijnath (1904) 'ever full'. Suggest 'full' or 'weightless'. Commentators read the first half as a description ('you are...') and only the last word as a command; our all-imperative 'Be...' is... |
| ashtavakra.1.8 | - | The translation is accurate. The line and misuse note change 'I am not the doer' into 'not the ONLY doer'. Both commentators deny doership to the Self entirely (the body-mind acts). It works as pastoral advice, but readings should not attribute 'only' to the verse. |
| ashtavakra.16.1 | - | Narrowed. The Sanskrit says no abiding in oneself 'without forgetting everything' (sarvavismaraṇāt ṛte). Our translation ('until you forget them all') and line ('set them all down') limit 'all' to the scriptures. Nityaswarupananda and Richards both have 'forget all / everything'. Suggest: 'you will not be... |
| ashtavakra.18.98 | - | 'Even everywhere' is garbled; samaḥ sarvatra means 'the same everywhere'. Kṛtakartavya-nirvṛta has two readings: 'done with what needed doing' (ours) or 'free of the idea of done and to-be-done' (Nityaswarupananda, Richards; Jalim Singh: content about past and future tasks). Suggest: 'at ease in any state,... |
| avadhuta.3.34 | - | The translation omits the refrain's last line, which the verse ends on: 'I am the nectar of knowledge, of one taste, vast as the sky' (jñānāmṛtaṃ samarasaṃ gaganopamo 'ham). Our setting also says Dattatreya speaks 'to a grieving friend'; Paramananda reads it as addressed to... |
| bg.1.28 | - | Our translation turns Sanjaya's description ('filled with deep pity, despairing, he said this') into Arjuna's first-person 'I am overcome with pity and sorrow'. Arjuna's own sentence only begins in this verse ('Krishna, seeing these my own people standing here, eager to fight...') and is completed... |
| bg.10.1 | - | Minor. 'Prīyamāṇāya' means 'to you who are delighted (by hearing)'; Shankara (Sastri) says Arjuna delights in the words as if drinking nectar. Govindacharya's Ramanuja renders it '(My) beloved', explaining 'because you delight in hearing my greatness', so 'dear to me' has some support in Ramanuja,... |
| bg.4.21 | - | 'Without hope' for nirāśīḥ is misleading and risky in a wellbeing app: commentators read it as free of desire or longing for fruit (Shankara: one from whom desires have gone; Ramanuja: without longing for results), not hopelessness. Suggest 'Free of craving, mind and body controlled,... |
| bg.7.18 | - | Translation is fine; the line is not. The verse calls the jñānī, the one who knows/the wise devotee, 'my very self'. The line says 'The one who loves me is my very self', which swaps knowledge for love; Ramanuja's jñānī is a devotee, but even... |
| bh.vairagya.29 | - | First half is fine. The second half is garbled: the Sanskrit asks for whose sake the Creator made Meru, that great store of riches whose golden glory stays within itself, and ends 'Meru does not please me' (Madhavananda, Wortham, Joglekar). Ours ('for whom did fate... |
| bh.vairagya.51 | - | Our Sanskrit reads 'mānadhanātidūram' (very far apart in honour and wealth), and Madhavananda and Vivekananda translate a great or infinite difference between ascetic and king. Our English says the gap 'is not wide', which follows Telang/Joglekar's variant reading (vocative 'mānada', 'not very far'). Either change... |
| mbh.12.138.46 | - | Only the first half is translated. The second half says: my life now rests on my enemy, the cat. Without it the maxim loses its point (an emergency alliance with a natural enemy). BORI reads śreyān ("better") and apaṇḍitam. |
| mbh.12.172.18 | - | The translation drops the final clause "kṛtaghne nāsti niṣkṛtiḥ" (for the ungrateful there is no expiation), which is the point Bhishma stresses (expiations exist for grave sins, none for ingratitude). The line reorders the logic, making trust the cause of the other losses. |
| mbh.12.174.16 | - | Omits the third line of our own Sanskrit: if dharma is done, there is fame here and happiness after death. Otherwise accurate. |
| mbh.12.174.20 | - | 'Attached to his little comforts' misreads 'īhā-sukha-āsakta'. Nilakantha glosses īhā as craving; the phrase means caught up in the pleasure of wanting and striving. Suggest: 'while a person is caught up in the pleasure of planning and striving, death takes him'. The line is fine. |
| mbh.12.27.49 | - | Our second half-line ("na punar vai samāgamaḥ", no reunion) is a variant not found in BORI or Ganguli. BORI: for all born beings neither fortnights nor nights come back; Ganguli likewise lists years, months, fortnights, days and nights. Our "do not meet again in the... |
| mbh.12.272.23 | - | Our Sanskrit reads 'puruṣaṃ' and the translation follows it ('a grown person is freed from his bonds'). That word is a corruption: the digital Kumbakonam text has the garbled 'puraṣpaṃ', the BORI text reads 'puṣpaṃ' (flower), and Ganguli translates 'flower'. Correct sense: 'A flower is... |
| mbh.12.305.14 | - | Minor: 'the itch to scheme' is not supported. The Kumbakonam gloss reads vidhitsā as a special thirst, the surge of craving (from dhe, to drink), and Ganguli renders it 'thirst'. Suggest 'the surge of craving'. The verse also says 'him I call a brāhmaṇa and... |
| mbh.12.305.32 | - | 'The people one argues with' follows the Kumbakonam word saṃvivadate but misleads: BORI reads 'lives with' and Ganguli translates 'dwells with'; even saṃvivadate can mean 'converses with'. Suggest 'the people one lives among'. The rest, and the line, are accurate. |
| mbh.12.81.11 | - | Our translation reverses the sense. The Kumbakonam line 'naikasya jayam āśaṃse dvitīyasya parājayam' means 'I wish neither for the victory of one nor for the defeat of the other'; the BORI text reads 'I wish for victory to one and no defeat to the other',... |
| mbh.13.161.36 | - | Two problems. (1) 'Vayo'dhikān' means those advanced in years, the old, not 'age' generally; better 'for being old'. (2) The last item: our 'lack of standing' matches no reading. Kumbakonam has satyahīnān ('lacking truth', probably a corruption), BORI and Ganguli have sattvahīnān ('lacking strength or... |
| mbh.13.162.5 | - | Our translation's last sentence ('Those who stay close are not divided') comes only from the bracketed southern insertion, and the first part drops the condition that Ganguli makes clear: it is open, direct correction by the eldest that gives envious outsiders their opening. Ganguli: if... |
| mbh.13.9.9 | - | First half reversed: the Sanskrit (uptaṃ kṣetram bījaṃ vinā) says a field sown/tilled without seed bears nothing, i.e. effort without destiny; Ganguli and the BORI translation both read it so. Ours says 'seed sown without a field'. The second half (effort = field, destiny =... |
| mbh.3.28.27 | - | Our translation ('even badly') follows the vulgate reading aparādhe garīyasi, which Ganguli also renders as a grave wrong. The BORI critical text reads aparādhe 'garīyasi, i.e. 'when the offence is NOT grave'. Debroy's critical-edition rendering (as quoted in Swarajya) likewise limits it to crimes 'not... |
| mbh.3.314.112 | - | Overstated. The question is 'what makes one a Brahmin: birth, conduct, study or learning?' Yudhishthira says conduct (vṛtta). Ganguli reads the verse conditionally: readers and teachers of scripture, if given to vices (vyasanin), are fools; the learned one is the one who acts rightly. Ours... |
| mbh.3.314.121 | - | Incomplete. The Yaksha asks two things: who is a person (puruṣa), and who possesses all wealth (sarvadhanī). In BORI and Ganguli, Yudhishthira first says a person is one whose good deeds' fame touches heaven and earth, and then that the one for whom pleasant/unpleasant, joy/sorrow,... |
| mbh.5.27.26 | - | Incomplete: drops the last quarter, 'knowing this, do not wage war' (BORI: evaṃ vidvān naiva yuddhaṃ kuruṣva). That clause is the point of the verse: the truth about mortality is being used as an argument for giving up a just claim. Add: 'Knowing this, do... |
| mbh.5.33.42 | - | First clause disputed. 'saṃsārayati kṛtyāni' (literally 'makes his affairs go around') is rendered by both Ganguli ('divulges his projects') and Dutt ('gives out his intended acts') as broadcasting one's plans, not as dragging tasks out. Slowness is already the third clause. Suggested: 'He lets his... |
| mbh.5.43.61 | - | Reading conflict. Our text (Wikisource vulgate) reads 'maunān na sa munir bhavati ... svalakṣaṇaṃ tu yo veda', 'not by silence ... who knows his own nature'. The BORI critical text and Telang (following Shankara's text) read 'maunād dhi sa munir bhavati ... akṣaraṃ tat tu... |
| mbh.5.71.92 | - | MISREAD. 'tava droheṇa' (BORI 'tava rodhena') here means 'with harm (or confinement) coming to you', not 'by betraying you'. Yudhishthira is begging Krishna not to go to the hostile Kaurava court, because no gain, not even godhood or lordship of the gods, would please the... |
| rcm.3.35.chaupai.3 | - | Incomplete. Our text has two lines, but the translation renders only the first. The second line ('puni prabhu gae sarobar tira, pampa nama subhaga gambhira') says: then the Lord went to the shore of the lake called Pampa, lovely and deep. It starts the next... |
| rcm.4.8.chaupai.1 | - | First line misstated. 'Tinhahi bilokat pataka bhari' is literally 'just looking at them is a great sin'; Pt. Ramkumar explains it as contact with a great sinner. Our 'commit a grave wrong just by being seen' reverses the sense: it is the one who looks... |
| rcm.5.46.chaupai.1 | - | Two issues. (1) Manas Piyush reads line 3 as Ram setting aside the refugee's pride, delusion and deceit (overlooking them), not as the refugee giving them up first; our translation takes the second reading. Both are possible, but the editor should know. (2) The final... |
| rcm.6.62.chaupai.4 | - | Our Awadhi text drops a word: the standard reading is 'सुनु सुत भयउ कालबस रावन' (Manas Piyush prints 'सुत'). Our English already says 'Listen, son', so only the sanskrit field needs fixing. Manas Piyush explains 'सुत' as affection: an elder brother speaks to a younger... |
| rcm.7.4.chaupai.6 | - | One error. 'बार बार बूझी कुसलाता' means Bharat asked Hanuman again and again about everyone's welfare. Manas Piyush explains this as love, or asking after Ram, Sita, Lakshman and the army one by one. Our 'He asked again and again after everyone's welfare' reads as... |
| shambhu_gita.2.43 | - | 'Gentle power' for sāttvikī is too loose. In context sāttvikī means the sattva-quality power that arises from the balance of attraction (rāga, rajas) and repulsion (dveṣa, tamas), 2.43-44. Better: 'My sattvic power, whose form is dharma...'. |
| shambhu_gita.4.83 | - | Two problems. (1) 'jnani-sannidhau' does not mean the effort is 'made in the company of the wise'; the edition's own Hindi renders the point as how the effort 'is regarded' (by the wise), i.e. 'in the judgement of the wise'. (2) The verse is half... |
| sur.vp.250 | - | Mistranslation following the text error: 'you have always given your devotees what is undying' should be 'you have always given your devotees fearlessness (abhaya)'. Fix both the Braj text and the English. The line ('You never once delayed. You are easy to reach...') is fine. |
| tulsi_dv.152 | - | Our translation reverses the causation. Both commentaries read: with straight mind, speech and deeds, all the means that give birth to love for Raghubar become straight/easy. Ours says straightness is born OF love. Suggested: 'A straight mind, straight words, straight deeds: then every way to... |
| tulsi_vp.150 | - | Stanza 2 is mistranslated. 'नातो बड़े समर्थ सों इक ओर किधौं हूँ' is a question: is my bond with so great a master one-sided? (Poddar, Viyogi Hari and Thakur all read it so). Our 'On one side is my bond with the great and mighty... |
| tulsi_vp.227 | - | Stanza 3's last line is slightly off. 'नाम-प्रसाद लहत रसाल-फल अब हौं बबुर बहेरे' = by the name's grace I now get mangoes from babul and bahera trees (Poddar, Viyogi Hari, Thakur): the same thorny trees that gave nothing now yield mangoes (Viyogi Hari: people... |
| tulsi_vp.257 | - | Second line is slightly misread. 'आपको भले हैं सब, आपनेको कोऊ कहूँ' = everyone is good to themselves (seeks their own good), and only someone, somewhere, is good to their own dependants (Poddar, Viyogi Hari, Thakur all read it so). Our 'Everyone is good to... |
| tulsi_vp.76 | - | First half is right. The last clause 'बोलि सेबक-सुखद, सदा बिरद बहत हौं' is read by both Poddar and Viyogi Hari with Tulsidas as subject: since that day he has always worn the Lord's badge/insignia (the Vaishnava marks: kanthi, tilak, the name) that gladdens devotees.... |
| up_brihadaranyak.283 | - | Disputed key word. Our 'live like a child' / 'childlike simplicity' follows Müller, Hume and Deussen for bālya. Both Shankara and Madhva read bālya as 'strength' (from bala): Shankara, the strength of Self-knowledge; Madhva, strength of reasoning. Müller's footnote flags the passage as obscure and... |
| up_brihadaranyak.473 | - | Two issues. (1) 'Let go of ignorance' follows Müller and Hume ('dispelled its ignorance') but Shankara reads avidyāṃ gamayitvā as 'making the body senseless', and our own our_note says so; translation and note contradict each other. Madhva reads it as the Lord making the soul... |
| up_brihadaranyak.474 | - | Same issue as 4.4.3: 'letting go of ignorance' (Müller/Hume) vs Shankara's 'making the body senseless'; our_note follows Shankara. Also our translation drops the end of the verse: the new form is that of ancestors, gandharvas, gods, Prajapati, Brahma or other beings, according to one's deeds... |
| up_kath.1.1.6 | - | The words are rendered literally, but our translation and line lose the point Shankara draws: look at how our forefathers acted and how good people act now (none broke his word); since a mortal ripens and falls like grain, what is gained by falsehood? So... |
| up_kaushitaki.3 | - | The father's middle sentence is misread. Our 'We have studied the Veda and take what others give us' loses 'sadasi' (in his hall/assembly). Müller: only after learning the proper portion of the Veda in Chitra's own dwelling shall we obtain what others give us. Cowell:... |
| up_taittiriya.103 | - | 'Sukṛtam' is mistranslated as 'well made'. In context (2.7 begins: Brahman made itself by itself, hence it is called su-kṛtam, 'self-made') it means 'that which is self-made', the self-caused (Mahadeva Sastri: 'the self-cause'). Suggested: 'That which is self-made is indeed the essence (rasa). Having found... |
| vr.1.63.9 | - | Two issues. (1) 'As if they were a single day and night' slightly misstates: the Sanskrit (ahorātrāpadeśena) says ten years passed under the guise of days and nights, i.e. unnoticed, as if just a day and night. Acceptable as a paraphrase. (2) 'This obstacle came... |
| vr.2.112.19 | - | Minor: 'from desire or greed' takes kāma as desire; Govindarāja reads 'kāmāt' as 'out of affection (sneha)' for Bharata, which makes the line gentler: whether she did it from love for you or from greed. Our 'line' ('out of wanting or greed') is fine; the... |
| vr.2.22.24 | - | Mild overstatement of doubt: the Sanskrit flatly says the forest is the greater good ('vanavāso mahodayaḥ'); our 'may be the greater blessing' hedges. Also 'reversal of fortune' renders 'lakṣmyā viparyaye' (reversal of royal fortune); our Sanskrit has 'lakṣyā', a typo for 'lakṣmyā'. |
| vr.2.77.21 | - | Our translation inserts the list of the three pairs (hunger and thirst, grief and confusion, old age and death) as if in the verse. The verse says only 'three pairs'; the list is Govindarāja's and Śiromaṇi's gloss. Our note already says so; the translation should... |
| vr.3.65.4 | - | Second half overreaches. 'nanu jānāmi kasyāyam' is read by itihasa.io as 'I do not (yet) know whose this chariot is', and Shastri likewise says it is not yet known; Govindaraja's text reads 'na tu'. Suggest: 'Whose broken war-chariot this is, we do not yet know.'... |
| vr.4.49.6 | - | Second half misstated. The Sanskrit says that, having fallen into deep despondency, it is not proper (for us) to 'close our eyes' (sit idle) — Govindaraja — or to lose our drive — Shivasahaya. Our 'once you sink into deep despair, you cannot rise again'... |
| vr.5.13.17 | - | Slight misstatement: 'doṣa' here is the harm that follows (Rama's death if told; deceiving the master if not), not personal blame. Suggest: 'If I report it, harm follows; if I don't, that is wrong too. What should I do? The way seems perilous.' Sanskrit typo:... |
| vr.5.13.35 | - | Misstates the place: the Sanskrit says he will not go from here (Lanka) to the city of Kishkindha, not 'from this city of Kishkindha'. Fix: 'I will not go back from here to Kishkindha, for I cannot face Sugriva without Maithili.' Sanskrit typo: 'मैथिली' should... |
| vr.5.13.43 | - | 'Vināśe' here means self-destruction, i.e. ending one's own life (Hanuman has just weighed drowning himself or fasting to death), not 'giving up' in general. The rest of the translation is sound, though 'saṃgamaḥ' means union with good fortune or with the people he hopes for... |
| vr.5.30.40 | - | Minor: the Sanskrit says he will deliver Rama's own auspicious, dharma-filled words ('vacanāni' of Rama, 'samarpayan' = handing over), not 'good and true words about Ram'. In the narrative he in fact recites Rama's story (5.31), and the prior verse speaks of praising Rama, so... |
| yv.6a.29.111 | - | Incomplete sentence. 'Tanoti caishyato bijam' completes v.110b: remembering you is the fruit of past merit, the watering of present merit, and sows the seed of future merit (the commentator: of what is yet to be done). Our translation ends 'Holding the great wish-jewel of remembering... |

### 1b. Misattribution, wrong speaker/listener or setting (34; 4 in plans)

| verse | in plans | what is wrong |
|---|---|---|
| bg.2.7 | decision-making:d1, first-week-with-the-gita:d2 | The speaker and listener fields (Arjuna to Krishna) are right, but the setting sentence reads 'Krishna to Arjuna, who has collapsed…'. This verse is Arjuna's plea to Krishna. Fix the setting to something like 'Arjuna, in tears and refusing to fight, asks Krishna to teach... |
| bg.4.17 | decision-making:d3 | Speaker and listener are right, but the setting is wrong for this verse. 'Krishna reveals the ancient lineage of this teaching and why he comes into the world' describes 4.1–8. Verse 4.17 sits in 4.16–18, where Krishna says even the wise are confused about what... |
| mbh.14.53.15 | hurt-by-someone-close:d4 | Krishna to the sage Uttanka is correct, but the setting is out of order: when Krishna says this, Uttanka has only asked, hopefully, whether Krishna made peace between the cousins. Uttanka's rage and threat to curse come immediately after, in response to this answer. |
| rcm.1.141.chaupai.3 | not-good-enough:d1 | Listener is wrong. In the Manas, Brahma, Vishnu and Shiva had come to Manu many times and he did not ask them for anything; the one who now stands before Manu and Shatarupa and offers the boon is the Supreme Lord in his own form... |
| bg.1.28 | - | Mixed speakers. The first half (kṛpayā parayāviṣṭo viṣīdann idam abravīt) is Sanjaya narrating to Dhritarashtra; only the second half, after 'arjuna uvāca', is Arjuna speaking to Krishna. Govindacharya's translation of Ramanuja's text makes this explicit (Arjuna, overcome by compassion, became sad and spoke). Our Sanskrit... |
| bg.3.11 | - | Krishna is quoting. In 3.10-12 Krishna reports what Prajapati, the creator, said to the first beings when he created them along with sacrifice; Govindacharya's Ramanuja and Vireswarananda's Sridhara print these verses as Prajapati's quoted words. So the words are Prajapati's, addressed to humankind, relayed by... |
| dheesh_gita.1.4 | - | Speaker Suta is correct, but he is addressing his teacher Vyasa, not 'Shaunaka and the sages'. He reports what he once heard from Vyasa and asks Vyasa to recite the Dhisha Gita. |
| mbh.12.175.11 | - | Disputed. The text says a brahmin told Bhishma what Shamyaka had sung; Nilakantha (followed by Ganguli) takes the reciter to be someone other than Shamyaka. Safer: 'Verses of Shamyaka, as recited to Bhishma'. Name: Śamyāka in BORI and Wikisource; Śampāka is a variant reading; Ganguli... |
| mbh.12.175.22 | - | As for 12.175.11: verses of Shamyaka, recited to Bhishma by a brahmin whom Nilakantha takes to be someone else. |
| mbh.12.176.63 | - | Speaker error. Bodhya only lists his six teachers; this gloss on the osprey is introduced with 'Bhishma said' in Wikisource, in BORI's star passage and in Ganguli ('Bhishma continued'). Correct to Bhishma, to Yudhishthira. Listener: Yayati in the vulgate, Nahusha in BORI. |
| mbh.12.176.67 | - | Same speaker error as 12.176.63: the gloss is spoken by Bhishma, not Bodhya. Listener Yayati (vulgate) or Nahusha (BORI). |
| mbh.12.25.31 | - | Speaker is Vyasa, not Senajit. In BORI 12.26.29 Vyasa closes the quotation ("thus spoke the wise Senajit"); verses 30-31 are Vyasa's own summary. Ganguli agrees: the line "This is what Senajit said" comes before this verse. Listener Yudhishthira is correct. |
| mbh.3.133.13 | - | Speaker correct (the hawk, Indra in disguise), but the listener in this passage is King Ushinara, not Shibi (BORI 3.130.17-19, 3.131.22, 26; Ganguli CXXX-CXXXI). The tale is told by the sage Lomasha to Yudhishthira at the Jala and Upajala rivers. The version with Shibi Aushinara... |
| mbh.3.183.5 | - | Wrong speaker. Yudhishthira asks the question (3.178.3: which is weightier, giving or truth, harmlessness or kind speech?) and the serpent Nahusha answers with this verse. Fix: speaker 'Nahusha (as the serpent)', listener 'Yudhishthira'. Our_note ('Yudhishthira on the relative weight of virtues') should also be corrected. |
| mbh.3.57.15 | - | Wrong speaker. This is Damayanti speaking to Nala's charioteer Varshneya (BORI 3.57.11-13; Ganguli LX), inside the sage Brihadashva's narration to Yudhishthira. Fix: speaker 'Damayanti', listener 'Varshneya, Nala's charioteer'; nested in Brihadashva's tale to Yudhishthira. |
| rcm.5.4.chaupai.1 | - | Line 1 is Lankini. In Manas Piyush the second line runs into the next (the one on whom Ram looks with grace) and is read as Kakbhushundi's narratorial aside to Garuda, not Lankini's words. |
| rcm.5.44.chaupai.4 | - | Manas Piyush (Pt. Ramkumar) reads line 7 ('better to live in hell...') as Ram speaking to Vibhishan, continuing Ram's questions about living among the wicked; Vibhishan's reply starts at line 8. Our data gives the whole verse to Vibhishan. |
| rcm.7.126.chaupai.3 | - | Manas Piyush says plainly that from here on these are Tulsidas's own words, as he closes his own frame of the dialogue. So the speaker is Tulsidas and the listener the reader (his own mind). Our 'Shiva / Tulsidas → Parvati / the reader' should... |
| sur.bgs.315 | - | Speaker needs a note: the tika's prasang says the gopis send this message to Krishna, pointing to Radha's state, and the last line says 'Surdas: Radha laments'. So it is Radha's plea voiced through the gopis, not clearly Radha's own words. Suggest speaker 'the gopis,... |
| sur.bgs.9 | - | Speaker (Krishna) is right. Listener needs fixing: the 'pathik' (traveller) is Uddhava, about to leave Mathura for Braj; the 1977 tika glosses it this way. The message is for Yashoda AND Nanda (one line asks Uddhava to clasp Nanda's feet and ask him to look... |
| sur.vp.2 | - | Reference error: the ref_label says Sur Vinay Patrika 2, but both Gita Press scans place 'नाथ अनाथनि ही के संगी' at pada 22 (the 1955 index lists it at 22; the other scan shows it between 21 and 23). Traditional attribution to Surdas via the... |
| sur.vp.220 | - | Reference error: the index of the Gita Press edition lists 'जैसे राखहु तैसे रहौं' at pada 230, and the pada sits between 229 and 231 in the body. The id sur.vp.220 and ref_label should be corrected to 230. Traditional attribution to Surdas via the vulgate... |
| sur.vp.250 | - | Text error: our sanskrit has 'भक्तनि अमर दियौ' (gave the undying), but both Gita Press scans and the NPS Sursagar read 'भक्तनि अभै दियौ' (gave fearlessness). Traditional attribution to Surdas via the vulgate Sursagar; the pada is in the Nagari Pracharini Sabha Sursagar (Vajpeyi ed.,... |
| sur.vp.423 | - | Reference error: both Gita Press scans index this pada at 43 and it sits between padas 42 and 44; the edition has no pada 423. Fix the id/ref_label. Traditional attribution to Surdas via the vulgate Sursagar; the pada is in the Nagari Pracharini Sabha Sursagar... |
| tulsi_dv.101 | - | Wrong reference: this is Dohavali 147 (Gita Press), not 101. |
| tulsi_dv.143 | - | Wrong reference: this is Dohavali 175 (Gita Press), not 143. |
| tulsi_dv.282 | - | Wrong reference: this is Dohavali 277 (Gita Press and Kaumudi tika), not 282. Setting ('opening of the chataka dohas') is right. |
| tulsi_kv.7.129 | - | Wrong reference: this line is Kavitavali Uttar Kand 127 (Gita Press; Shrikant Sharan cites 'chhand 127, arata pala kripala'), not 129. |
| tulsi_kv.7.182 | - | Wrong reference: this is Kavitavali Uttar Kand 129, not 182. |
| up_chhandogya.612 | - | The narrator/Upanishad (Prajapati's teaching begins only at 8.7). Listed as 'Prajapati's teaching (narrator)'; better just 'narrator'. |
| up_narayana.16 | - | Reference and speaker are both wrong: it is a devotional dhyana verse of uncertain origin, not Upanishadic text. Our own our_note already says it is 'appended to printed editions and is not part of the Upanishad's own text'; the ref should not present it as... |
| vr.1.2.36 | - | Speaker is not the narrator: in itihasa.io (and Griffith, Book I canto 2) the line is spoken by Valmiki's disciples, who keep chanting the verse and say to one another, astonished, that the grief has become a śloka. Suggest speaker 'Valmiki's disciples', listener 'one another'. |
| vr.2.82.11 | - | Speaker Bharata is right, but the listener is Vasishtha, the family priest, who has just urged him (before the assembled ministers and people) to accept the throne. The 'you' in 'you ought to declare what is right' is singular, addressed to Vasishtha. Suggest listener 'Vasishtha,... |
| vr.5.13.54 | - | Mixed speakers: the first verse (58) is the narrator, the second (59, 'namo 'stu rāmāya...') is Hanuman's own salutation. Our record lists only the narrator. |

### 1c. Texts presented as older than they are

- **Dheesh, Shakti, Shambhu, Surya and Vishnu Gitas** (27 verses): early-20th-century Bharat Dharma Mahamandal publications; their own 1989 preface calls them previously unpublished sectarian texts, and no older manuscript tradition was found. Label them as such; never call them ancient scripture. All their refs are also off by 1-4 (the printed editions number speaker lines).
- **up_narayana.16** is a devotional dhyana verse appended to printed editions, not Upanishad text; reference and speaker are both wrong.
- **up_maha.113** is near word-for-word Yoga Vasishtha 1.17.8; the Maha Upanishad ref is unverified.
- **vishnu_gita.1.98** reworks Bhartrihari, Vairagya-shataka 31 (now used in its place in not-good-enough).
- **Bhartrihari:** vairagya.82, vairagya.44, niti.87 and niti.106 sit in Kosambi's doubtful block; niti.53 and niti.58 are floating verses also in the Hitopadesha / Chanakya collections.
- **viv.6.one_thing_at_a_time** comes from class-talk notes (recorder and date unknown): attribute as such.

## Severity 2: wrong reference (users see the ref)

264 verses where the research says our id/ref is wrong (not merely numbered differently by another edition): rcm 200, vr 22, hans_gita 10, shakti_gita 8, dheesh_gita 5, shambhu_gita 5, mbh 3, tulsi_dv 3, bg 2, tulsi_kv 2, sur 1, surya_gita 1, tulsi_vp 1, vishnu_gita 1.

Systematic causes, to fix in bulk:

- **Ramcharitmanas (rcm):** doha numbers differ from Gita Press / Manas Piyush, not by a fixed offset (often by 2 in Bal Kand); chaupai indices are fine. Each needs correcting by hand from the table.
- **Valmiki Ramayana (vr):** our ids are roughly Southern-recension but several point at a neighbouring verse; many verses are Southern-only (not in the Baroda critical edition). Show the Southern number and note CE where it exists.
- **Mahabharata (mbh):** our ids are Kumbakonam numbering, which matches neither BORI nor Ganguli; that is a convention, not an error, but label it ('Kumbakonam ed.'). The rows below are real errors (matches no edition, or BORI appendix-only passages). The Hamsa Gita is BORI 12.288 / Ganguli CCC, not our 12.305.
- **Bhagavad Gita ch.13:** our ids use the 35-verse count (Arjuna's question as 13.1) while refs use the 34-verse Gita Press count (bg.13.8 is shown as 13.7). Pick one. Also bg.11.41 and bg.12.6 each contain two verses (11.41-42, 12.6-7) and bg.11.42 duplicates 11.42.
- **Mahamandal gitas:** off by 1-4 (see 1c). **Bhartrihari:** bh.niti.105/106/107 follow Wortham/Kale, the rest GRETIL.

| verse | in plans | correct reference per the research |
|---|---|---|
| vr.6.22.42 | not-good-enough:d6 | Southern recension 6.22.51 (itihasa.io); Sanskrit Wikisource numbers it 6.22.53. First line southern-only; second line = Baroda Critical Edition 6.15.13. Our id 6.22.42 matches neither; correct to 6.22.51 (note variant 53). |
| bg.11.41 | - | Bhagavad Gita 11.41 (same in all editions checked). DATA ERROR: our record's id is bg.11.41 but its ref is '11.41–42' and its sanskrit and translation contain both 11.41 and 11.42, while a separate record bg.11.42 repeats 11.42. |
| bg.12.6 | - | Bhagavad Gita 12.6-7. DATA ERROR: the record's id and ref say 12.6, but its sanskrit and translation contain both 12.6 and 12.7 (12.6 alone is an incomplete relative clause; 12.7 carries the promise). Set ref to 'Bhagavad Gita 12.6–7' or... |
| dheesh_gita.1.4 | - | Dheesh (Dhisha) Gita 1.5-6 in both Bharat Dharma Mahamandal editions read (the printed numbering counts the speaker line 'suta uvaca' as 1). Our '1.4-5' is off by one. |
| dheesh_gita.1.42 | - | Dheesh Gita 1.45 in both Mahamandal editions (1.42 there is the speaker line 'rishaya ucuh'). Our ref is off by three. |
| dheesh_gita.1.46 | - | Dheesh Gita 1.50-51 in both Mahamandal editions. Our '1.46-47' is off by four. |
| dheesh_gita.4.19 | - | Dheesh Gita 4.21 in both Mahamandal editions (chapter 4, 'Dharma-vijnana-nirupana'). Our '4.19' is off by two. |
| dheesh_gita.7.27 | - | Dheesh Gita 7.28 (chapter 7, 'Virat-svarupa-varnana') in both Mahamandal editions. Our '7.27' is off by one. |
| hans_gita.10 | - | Mahabharata 12.288.10 (BORI critical edition, Mokshadharma, Hamsa Gita). Ganguli/Roy translation: Santi Parva section CCC (300). Our data's '12.305.10' matches neither; the verse number within the chapter (10) is correct. |
| hans_gita.11 | - | Mahabharata 12.288.11 (BORI critical edition, Mokshadharma, Hamsa Gita). Ganguli/Roy translation: Santi Parva section CCC (300). Our data's '12.305.11' matches neither; the verse number within the chapter (11) is correct. |
| hans_gita.17 | - | Mahabharata 12.288.17 (BORI critical edition, Mokshadharma, Hamsa Gita). Ganguli/Roy translation: Santi Parva section CCC (300). Our data's '12.305.17' matches neither; the verse number within the chapter (17) is correct. |
| hans_gita.21 | - | Mahabharata 12.288.21 (BORI critical edition, Mokshadharma, Hamsa Gita). Ganguli/Roy translation: Santi Parva section CCC (300). Our data's '12.305.21' matches neither; the verse number within the chapter (21) is correct. |
| hans_gita.25 | - | Mahabharata 12.288.25 (BORI critical edition, Mokshadharma, Hamsa Gita). Ganguli/Roy translation: Santi Parva section CCC (300). Our data's '12.305.25' matches neither; the verse number within the chapter (25) is correct. |
| hans_gita.26 | - | Mahabharata 12.288.26 (BORI critical edition, Mokshadharma, Hamsa Gita). Ganguli/Roy translation: Santi Parva section CCC (300). Our data's '12.305.26' matches neither; the verse number within the chapter (26) is correct. Near-parallel in Manusmriti 2.162-163 (verified on wisdomlib, Ganganath Jha's edition): 2.162b... |
| hans_gita.31 | - | Mahabharata 12.288.31 (BORI critical edition, Mokshadharma, Hamsa Gita). Ganguli/Roy translation: Santi Parva section CCC (300). Our data's '12.305.31' matches neither; the verse number within the chapter (31) is correct. |
| hans_gita.40 | - | Mahabharata 12.288.40 (BORI critical edition, Mokshadharma, Hamsa Gita). Ganguli/Roy translation: Santi Parva section CCC (300). Our data's '12.305.40' matches neither; the verse number within the chapter (40) is correct. A near-identical pair appears in the Yaksha Prashna, but only as... |
| hans_gita.42 | - | Mahabharata 12.288.42 (BORI critical edition, Mokshadharma, Hamsa Gita). Ganguli/Roy translation: Santi Parva section CCC (300). Our data's '12.305.42' matches neither; the verse number within the chapter (42) is correct. |
| hans_gita.7 | - | Mahabharata 12.288.7 (BORI critical edition, Mokshadharma, Hamsa Gita). Ganguli/Roy translation: Santi Parva section CCC (300). Our data's '12.305.7' matches neither; the verse number within the chapter (7) is correct. |
| mbh.12.145.5 | - | Not in the BORI constituted text: BORI star passage 374, after 12.142.24. Ganguli, Santi Parva section CXLVI (wisdomlib) includes it. Our chapter number 145 matches neither. |
| mbh.3.314.65 | - | BORI critical edition 3.297.44-45; Ganguli Vana Parva sec. CCCXI. Our numbering (3.314.65) matches neither. |
| mbh.5.133.17 | - | Mahabharata 5.131.15 in the BORI critical edition; Ganguli, Udyoga Parva section CXXXIII (wisdomlib). Our id 5.133.17 matches neither BORI chapter nor verse; it follows another edition's numbering. |
| rcm.1.102.chaupai.2 | - | Ramcharitmanas, Bal Kand 108, chaupai 2 (Gita Press; Manas Piyush 'doha 108, half-lines 3-4'). NOT 1.102. |
| rcm.1.109.chaupai.5 | - | Ramcharitmanas, Bal Kand 116, chaupai 1 (Gita Press; Manas Piyush cites '116. 1' and numbers the half-lines 1-2). NOT 1.109 and NOT chaupai 5. |
| rcm.1.112.chaupai.2 | - | Ramcharitmanas, Bal Kand 119, chaupai 2 (Gita Press; Manas Piyush 'doha 119, half-lines 3-4'). NOT 1.112. |
| rcm.1.113.chaupai.1 | - | Ramcharitmanas, Bal Kand 120, chaupai 1 (Gita Press; Manas Piyush cites '1. 120. 1'). NOT 1.113. |
| rcm.1.127.chaupai.1 | - | Ramcharitmanas, Bal Kand 133, chaupai 1 (Gita Press; Manas Piyush 'doha 133, half-lines 1-2'). NOT 1.127. |
| rcm.1.135.sortha.1 | - | Ramcharitmanas, Bal Kand soratha 142 (Gita Press; Manas Piyush 'soratha 142'). NOT 1.135. |
| rcm.1.153.sortha.1 | - | Ramcharitmanas, Bal Kand soratha 161 (ख), the second closing verse of doha-group 161 (Gita Press; Manas Piyush prints it under 161). NOT 1.153. |
| rcm.1.180.chhand.4 | - | Ramcharitmanas, Bal Kand 192, chhand stanza 4 (the 'bhae pragat kripala' birth hymn; Gita Press; Manas Piyush 'doha 192, half-lines 7-8'). NOT 1.180. |
| rcm.1.186.doha.1 | - | Ramcharitmanas, Bal Kand doha 198 (Gita Press; Manas Piyush prints '198'). NOT 1.186. |
| rcm.1.19.chaupai.3 | - | Ramcharitmanas, Bal Kand 21, chaupai 3 (Gita Press; Manas Piyush 'doha 21, half-lines 5-6'). NOT 1.19: our id and label are off by two. |
| rcm.1.19.doha.1 | - | Ramcharitmanas, Bal Kand doha 21 (Gita Press; Manas Piyush 'doha 21'). NOT 1.19: our id and label are off by two. |
| rcm.1.196.chaupai.3 | - | Ramcharitmanas, Bal Kand 208, chaupai 3 (Gita Press; Manas Piyush 'doha 208, half-lines 5-6'). NOT 1.196. |
| rcm.1.247.chaupai.1 | - | Ramcharitmanas, Bal Kand 261, chaupais 1-2 (Gita Press; Manas Piyush 'doha 261, half-lines 1-4'). NOT 1.247, and our text covers two chaupais, not one. |
| rcm.1.25.chaupai.3 | - | Ramcharitmanas, Bal Kand 27, chaupai 3 (Gita Press; Manas Piyush 'doha 27, half-lines 5-6'). NOT 1.25: our id and label are off by two. |
| rcm.1.25.chaupai.4 | - | Ramcharitmanas, Bal Kand 27, chaupai 4 (Gita Press; Manas Piyush 'doha 27, half-lines 7-8'). NOT 1.25: our id and label are off by two. |
| rcm.1.258.doha.1 | - | Ramcharitmanas, Bal Kand doha 274 (Gita Press; Manas Piyush '274'). NOT 1.258. |
| rcm.1.26.chaupai.1 | - | Ramcharitmanas, Bal Kand 28, chaupai 1 (Gita Press; Manas Piyush cites it as '28. 1'). NOT 1.26: our id and label are off by two. |
| rcm.1.26.chaupai.2 | - | Ramcharitmanas, Bal Kand 28, chaupai 2 (Gita Press; Manas Piyush 'doha 28, half-lines 3-4'). NOT 1.26: our id and label are off by two. |
| rcm.1.26.doha.1 | - | Ramcharitmanas, Bal Kand doha 28 (क), the first of two dohas numbered 28 (Gita Press). NOT 1.26: our id and label are off by two. |
| rcm.1.260.doha.1 | - | Ramcharitmanas, Bal Kand doha 276 (Gita Press; Manas Piyush '276'). NOT 1.260. |
| rcm.1.261.doha.1 | - | Ramcharitmanas, Bal Kand doha 277 (Gita Press; Manas Piyush '277'). NOT 1.261. |
| rcm.1.262.chaupai.1 | - | Ramcharitmanas, Bal Kand 278, chaupai 1 (Gita Press; Manas Piyush 'doha 278, half-lines 1-2'). NOT 1.262. |
| rcm.1.27.chaupai.2 | - | Ramcharitmanas, Bal Kand 29, chaupai 2 (Gita Press; Manas Piyush 'doha 29, half-lines 3-4'). NOT 1.27: our id and label are off by two. |
| rcm.1.27.chaupai.3 | - | Ramcharitmanas, Bal Kand 29, chaupai 3 (Gita Press; Manas Piyush 'doha 29, half-lines 5-6'). NOT 1.27: our id and label are off by two. |
| rcm.1.318.chaupai.3 | - | Ramcharitmanas, Bal Kand 338, chaupai 3 (Gita Press; Manas Piyush 'doha 338, half-lines 5-6'). NOT 1.318. |
| rcm.1.54.chaupai.1 | - | Ramcharitmanas, Bal Kand 58, chaupai 1 (Gita Press; Manas Piyush 'doha 58, half-lines 1-2'). NOT 1.54. |
| rcm.1.54.chaupai.2 | - | Ramcharitmanas, Bal Kand 58, chaupai 2 (Gita Press; Manas Piyush 'doha 58, half-lines 3-4'). NOT 1.54. |
| rcm.1.54.sortha.1 | - | Ramcharitmanas, Bal Kand soratha 57 (ख), the second of the two closing verses of doha-group 57 (Gita Press; Manas Piyush prints it as 57). NOT 1.54. It comes just BEFORE 58.1-2 in the text, not after. |
| rcm.1.58.chaupai.3 | - | Ramcharitmanas, Bal Kand 62, chaupai 3 (Gita Press; Manas Piyush 'doha 62, half-lines 5-6'). NOT 1.58. |
| rcm.1.66.chaupai.2 | - | Ramcharitmanas, Bal Kand 70, chaupai 2 (Gita Press; Manas Piyush 'doha 70, half-lines 3-4'). NOT 1.66. |
| rcm.1.67.doha.1 | - | Ramcharitmanas, Bal Kand doha 71 (Gita Press; Manas Piyush 'doha 71'). NOT 1.67. |
| rcm.1.70.doha.1 | - | Ramcharitmanas, Bal Kand doha 74 (Gita Press; Manas Piyush 'doha 74'). NOT 1.70. |
| rcm.1.72.chaupai.1 | - | Ramcharitmanas, Bal Kand 76, chaupai 1 (Gita Press; Manas Piyush 'doha 76, half-lines 1-2'). NOT 1.72. |
| rcm.1.74.chaupai.3 | - | Ramcharitmanas, Bal Kand 78, second half of chaupai 3 plus chaupai 4 (Gita Press; Manas Piyush 'doha 78, half-lines 6-8'). NOT 1.74. Our text starts mid-chaupai: the half-line before it is 'कहत बचन मनु अति सकुचाई। हँसिहहु सुनि हमारि जड़ताई॥'. |
| rcm.1.76.chaupai.3 | - | Ramcharitmanas, Bal Kand 80, chaupai 3 (Gita Press; Manas Piyush 'doha 80, half-lines 5-6'). NOT 1.76. |
| rcm.1.76.doha.1 | - | Ramcharitmanas, Bal Kand doha 80 (Gita Press; Manas Piyush 'doha 80'). NOT 1.76. |
| rcm.2.11.chaupai.3 | - | Ramcharitmanas, Ayodhya Kand doha 10, chaupai 3-4 (Gita Press; Manas Piyush vol. 4 'doha 10, half-lines 5-8'). NOT 2.11. |
| rcm.2.127.doha.1 | - | Ramcharitmanas, Ayodhya Kand doha 131 (Gita Press; Manas Piyush prints it as 131). NOT 2.127: our id and label are off by four. |
| rcm.2.146.chaupai.3 | - | Ramcharitmanas, Ayodhya Kand 150, chaupais 3-4 (Gita Press; Manas Piyush prints the four lines as 150.5-8). NOT 2.146, and our text covers two chaupais, not one. |
| rcm.2.159.chaupai.3 | - | Ramcharitmanas, Ayodhya Kand 165, chaupai 3 (Gita Press; Manas Piyush 165.5-6). NOT 2.159: our id and label are off by six. |
| rcm.2.165.chaupai.4 | - | Ramcharitmanas, Ayodhya Kand 171, chaupai 4 (Gita Press; Manas Piyush 171.7-8). NOT 2.165. |
| rcm.2.165.doha.1 | - | Ramcharitmanas, Ayodhya Kand doha 171 (Gita Press; Manas Piyush 171). NOT 2.165. |
| rcm.2.170.chaupai.7 | - | Ramcharitmanas, Ayodhya Kand 177, chaupai 3 (Gita Press; Manas Piyush 177.5-6). NOT 2.170 and NOT chaupai 7: both numbers in our id are wrong. |
| rcm.2.176.chaupai.2 | - | Ramcharitmanas, Ayodhya Kand 183, chaupai 2 (Gita Press; Manas Piyush 183.3-4). NOT 2.176. |
| rcm.2.185.chaupai.4 | - | Ramcharitmanas, Ayodhya Kand 192, chaupai 4 (Gita Press; Manas Piyush 192.7-8). NOT 2.185. |
| rcm.2.196.doha.1 | - | Ramcharitmanas, Ayodhya Kand doha 204 (Gita Press; Manas Piyush 204). NOT 2.196: our id and label are off by eight. |
| rcm.2.197.chaupai.4 | - | Ramcharitmanas, Ayodhya Kand 205, chaupai 4 (Gita Press; Manas Piyush 205.7-8). NOT 2.197. |
| rcm.2.198.doha.1 | - | Ramcharitmanas, Ayodhya Kand doha 206 (Gita Press; Manas Piyush 206). NOT 2.198. |
| rcm.2.204.chaupai.4 | - | Ramcharitmanas, Ayodhya Kand 212, chaupai 4 (Gita Press; Manas Piyush 212.7-8). NOT 2.204. |
| rcm.2.211.chaupai.2 | - | Ramcharitmanas, Ayodhya Kand 219, chaupai 2 (Gita Press; Manas Piyush 219.3-4). NOT 2.211. |
| rcm.2.212.chaupai.1 | - | Ramcharitmanas, Ayodhya Kand 220, chaupai 1 (Gita Press; Manas Piyush 220.1-2). NOT 2.212. |
| rcm.2.222.chaupai.2 | - | Ramcharitmanas, Ayodhya Kand 231, chaupai 2 (Gita Press; Manas Piyush 231.3-4). NOT 2.222. |
| rcm.2.225.chaupai.1 | - | Ramcharitmanas, Ayodhya Kand 234, chaupai 1 (Gita Press; Manas Piyush 234.1-2). NOT 2.225: our id and label are off by nine. |
| rcm.2.225.chaupai.3 | - | Ramcharitmanas, Ayodhya Kand 234, chaupai 3 (Gita Press; Manas Piyush 234.5-6). NOT 2.225. |
| rcm.2.23.chaupai.2 | - | Ramcharitmanas, Ayodhya Kand doha 22, chaupai 2 (lines 3-4) (Gita Press; Manas Piyush vol. 4 'doha 22 (1-3)' and '(4-7)'). NOT 2.23. |
| rcm.2.235.chaupai.1 | - | Ramcharitmanas, Ayodhya Kand 244, chaupai 1 (Gita Press; Manas Piyush 244.1-2). NOT 2.235: our id and label are off by nine. |
| rcm.2.235.chaupai.4 | - | Ramcharitmanas, Ayodhya Kand 244, chaupai 4 plus doha 244 (Gita Press; Manas Piyush 244.7-8 and doha 244). NOT 2.235. Our text runs one chaupai and the doha together. |
| rcm.2.247.chaupai.1 | - | Ramcharitmanas, Ayodhya Kand 258, chaupai 1 (Gita Press; Manas Piyush 258.1-2). NOT 2.247: our id and label are off by eleven. |
| rcm.2.249.chaupai.4 | - | Ramcharitmanas, Ayodhya Kand 260, chaupai 4 (Gita Press; Manas Piyush 260.7-8). NOT 2.249. |
| rcm.2.252.chaupai.3 | - | Ramcharitmanas, Ayodhya Kand 263, chaupai 3 (Gita Press; Manas Piyush 263.5-6). NOT 2.252. |
| rcm.2.253.chaupai.1 | - | Ramcharitmanas, Ayodhya Kand 264, chaupai 1 (Gita Press; Manas Piyush 264.1-2). NOT 2.253: our id and label are off by eleven. |
| rcm.2.256.chaupai.2 | - | Ramcharitmanas, Ayodhya Kand 267, chaupai 2 (Gita Press; Manas Piyush 267.3-4). NOT 2.256: our id and label are off by eleven. |
| rcm.2.271.chaupai.3 | - | Ramcharitmanas, Ayodhya Kand 283, chaupai 3 (Gita Press; Manas Piyush 283.5-6). NOT 2.271: our id and label are off by twelve. |
| rcm.2.280.chaupai.4 | - | Ramcharitmanas, Ayodhya Kand 293, chaupai 4 (Gita Press; Manas Piyush 293.7-8). NOT 2.280: our id and label are off by thirteen. |
| rcm.2.281.chaupai.1 | - | Ramcharitmanas, Ayodhya Kand 294, chaupai 1 (Gita Press; Manas Piyush 294.1-2). NOT 2.281. |
| rcm.2.285.chaupai.1 | - | Ramcharitmanas, Ayodhya Kand 298, chaupais 1-4 (Gita Press; Manas Piyush 298.1-8, half-lines numbered separately). NOT 2.285, and our text is four chaupais, not one. Manas Piyush prints the start as 'prabhu pitu matu suhrid gur swami' as we do. |
| rcm.2.285.doha.1 | - | Ramcharitmanas, Ayodhya Kand doha 298 (Gita Press; Manas Piyush 298). NOT 2.285. |
| rcm.2.286.chaupai.2 | - | Ramcharitmanas, Ayodhya Kand 299, chaupai 2 (Gita Press; Manas Piyush 299.3-4). NOT 2.286. |
| rcm.2.287.chaupai.1 | - | Ramcharitmanas, Ayodhya Kand 300, chaupai 1 (Gita Press; Manas Piyush 300.1-2). NOT 2.287. |
| rcm.2.290.doha.1 | - | Ramcharitmanas, Ayodhya Kand doha 304 (Gita Press; Manas Piyush 304). NOT 2.290: our id and label are off by fourteen. |
| rcm.2.292.chaupai.4 | - | Ramcharitmanas, Ayodhya Kand 306, chaupai 4 (Gita Press; Manas Piyush 306.7-8). NOT 2.292. |
| rcm.2.293.chaupai.4 | - | Ramcharitmanas, Ayodhya Kand 307, chaupai 4 (Gita Press; Manas Piyush 307.7-8). NOT 2.293. |
| rcm.2.301.doha.1 | - | Ramcharitmanas, Ayodhya Kand doha 315 (Gita Press; Manas Piyush 315). NOT 2.301: our id and label are off by fourteen. |
| rcm.2.310.chaupai.4 | - | Ramcharitmanas, Ayodhya Kand 324, chaupai 4 (Gita Press; Manas Piyush 324.7-8). NOT 2.310. |
| rcm.2.54.chaupai.2 | - | Ramcharitmanas, Ayodhya Kand doha 55, chaupai 2 (lines 3-4) (Gita Press; Manas Piyush vol. 4 'doha 55, half-lines 3-4'). NOT 2.54. |
| rcm.2.56.chaupai.1 | - | Ramcharitmanas, Ayodhya Kand doha 57, chaupai 1 (lines 1-2) (Gita Press; Manas Piyush vol. 4 'doha 57 (1-3)'). NOT 2.56. |
| rcm.2.74.chaupai.3 | - | Ramcharitmanas, Ayodhya Kand doha 75, chaupai 3 (lines 5-6) (Gita Press; Manas Piyush vol. 4 'doha 75, half-lines 5-6'). NOT 2.74. |
| rcm.3.13.chaupai.6 | - | Ramcharitmanas, Aranya Kand 16, chaupai 6 (Gita Press; Manas Piyush 16.11-12). NOT 3.13: our id and label are off by three. |
| rcm.3.13.doha.1 | - | Ramcharitmanas, Aranya Kand doha 16 (Gita Press; Manas Piyush 16). NOT 3.13. |
| rcm.3.26.doha.1 | - | Ramcharitmanas, Aranya Kand doha 30 (Gita Press; Manas Piyush 30). NOT 3.26: our id and label are off by four. |
| rcm.3.27.chaupai.5 | - | Ramcharitmanas, Aranya Kand 31, chaupai 5 (Gita Press; Manas Piyush 31.9-10). NOT 3.27: our id and label are off by four. |
| rcm.3.29.chaupai.1 | - | Ramcharitmanas, Aranya Kand 33, chaupai 1 (Gita Press; Manas Piyush 33.1-2, where Shiva sums up the Jatayu episode). NOT 3.29: our id and label are off by four. |
| rcm.3.31.chaupai.2 | - | Ramcharitmanas, Aranya Kand 35, chaupai 2 (Gita Press; Manas Piyush 35.3-4). NOT 3.31: our id and label are off by four. |
| rcm.3.32.chaupai.2 | - | Ramcharitmanas, Aranya Kand 36, chaupai 2 (Gita Press; Manas Piyush 36.3-4). NOT 3.32: our id and label are off by four. |
| rcm.3.32.chaupai.3 | - | Ramcharitmanas, Aranya Kand 36, chaupai 3 (Gita Press; Manas Piyush 36.5-6). NOT 3.32. |
| rcm.3.32.chaupai.4 | - | Ramcharitmanas, Aranya Kand 36, chaupai 4 (Gita Press; Manas Piyush 36.7-8). NOT 3.32. |
| rcm.3.34.doha.1 | - | Ramcharitmanas, Aranya Kand doha 38 (ka), the first of two dohas numbered 38 (Gita Press; Manas Piyush prints both under 38). NOT 3.34: our id and label are off by four. |
| rcm.3.35.chaupai.3 | - | Ramcharitmanas, Aranya Kand 39, chaupai 3 (Gita Press; Manas Piyush 39.5-6). NOT 3.35: our id and label are off by four. |
| rcm.3.38.chaupai.2 | - | Ramcharitmanas, Aranya Kand 42, chaupais 2-3 (Gita Press; Manas Piyush 42.3-6). NOT 3.38: our id and label are off by four, and our text runs two chaupais. |
| rcm.3.39.chaupai.2 | - | Ramcharitmanas, Aranya Kand 43, chaupais 2-3 (Gita Press; Manas Piyush 43.3-6). NOT 3.39: our id and label are off by four, and our text runs two chaupais. |
| rcm.3.39.chaupai.4 | - | Ramcharitmanas, Aranya Kand 43, chaupais 4-5 (Gita Press; Manas Piyush 43.7-10). NOT 3.39: our id and label are off by four, and our text runs two chaupais. |
| rcm.3.42.chaupai.1 | - | Ramcharitmanas, Aranya Kand 46, chaupai 1 (Gita Press; Manas Piyush 46.1-2). NOT 3.42: our id and label are off by four. |
| rcm.3.7.chaupai.7 | - | Ramcharitmanas, Aranya Kand 10, chaupai 7 (Gita Press; Manas Piyush 10.13-14). NOT 3.7: our id and label are off by three. |
| rcm.4.12.chaupai.2 | - | Ramcharitmanas, Kishkindha Kand doha 11, chaupai lines 3-6 (Gita Press / Manas Piyush). Our id says doha 12: off by one. The text spans two chaupais. |
| rcm.4.15.chaupai.2 | - | Ramcharitmanas, Kishkindha Kand doha 14, chaupai lines 3-4 (Gita Press / Manas Piyush). Our id says doha 15: off by one. |
| rcm.4.15.chaupai.3 | - | Ramcharitmanas, Kishkindha Kand doha 14, chaupai lines 5-6 (Gita Press / Manas Piyush). Our id says doha 15: off by one. |
| rcm.4.17.chaupai.2 | - | Ramcharitmanas, Kishkindha Kand doha 16, chaupai lines 3-4 (Gita Press / Manas Piyush). Our id says doha 17: off by one. |
| rcm.4.17.chaupai.4 | - | Ramcharitmanas, Kishkindha Kand doha 16, chaupai lines 7-8 (Gita Press / Manas Piyush). Our id says doha 17: off by one. |
| rcm.4.21.chaupai.4 | - | Ramcharitmanas, Kishkindha Kand doha 20, chaupai lines 7-8 (Gita Press / Manas Piyush). Our id says doha 21: off by one. The text reads बिषय (our data has विषय, a spelling variant). |
| rcm.4.29.chaupai.2 | - | Ramcharitmanas, Kishkindha Kand doha 28, chaupai lines 3-4 (Gita Press / Manas Piyush). Our id says doha 29: off by one. |
| rcm.4.30.chaupai.1 | - | Ramcharitmanas, Kishkindha Kand doha 29, chaupai lines 1-2 (Gita Press / Manas Piyush). Our id says doha 30: off by one. |
| rcm.4.30.chaupai.2 | - | Ramcharitmanas, Kishkindha Kand doha 29, chaupai lines 3-4 (Gita Press / Manas Piyush). Our id and label say 4.30: off by one. |
| rcm.4.4.chaupai.1 | - | Ramcharitmanas, Kishkindha Kand 3, chaupai 1 (Gita Press; Manas Piyush 3.1-2). NOT 4.4: our id and label are off by one (one too high). |
| rcm.4.4.chaupai.2 | - | Ramcharitmanas, Kishkindha Kand 3, chaupai 2 (Gita Press; Manas Piyush 3.3-4). NOT 4.4: our id and label are off by one. |
| rcm.4.4.chaupai.3 | - | Ramcharitmanas, Kishkindha Kand 3, chaupai 3 (Gita Press; Manas Piyush 3.5-6). NOT 4.4: our id and label are off by one. |
| rcm.4.4.chaupai.4 | - | Ramcharitmanas, Kishkindha Kand 3, chaupai 4 (Gita Press; Manas Piyush 3.7-8). NOT 4.4: our id and label are off by one. |
| rcm.4.6.chaupai.4 | - | Ramcharitmanas, Kishkindha Kand 5, chaupai 4 (Gita Press; Manas Piyush 5.7-8). NOT 4.6: our id and label are off by one. |
| rcm.4.8.chaupai.1 | - | Ramcharitmanas, Kishkindha Kand 7, chaupai 1 (Gita Press; Manas Piyush 7.1-2). NOT 4.8: our id and label are off by one. |
| rcm.4.8.chaupai.10 | - | Ramcharitmanas, Kishkindha Kand doha 7, chaupai lines 19-20 (Gita Press / Manas Piyush). Our id says doha 8: off by one. |
| rcm.4.8.chaupai.2 | - | Ramcharitmanas, Kishkindha Kand doha 7, chaupai lines 3-4 (Gita Press / Manas Piyush numbering). Our id says doha 8: off by one. |
| rcm.4.8.chaupai.3 | - | Ramcharitmanas, Kishkindha Kand doha 7, chaupai lines 5-6 (Gita Press / Manas Piyush). Our id says doha 8: off by one. |
| rcm.4.8.chaupai.4 | - | Ramcharitmanas, Kishkindha Kand doha 7, chaupai lines 7-8 (Gita Press / Manas Piyush). Our id says doha 8: off by one. |
| rcm.5.12.chaupai.1 | - | Ramcharitmanas, Sundar Kand doha 14, chaupai lines 1-2 (Gita Press / Manas Piyush). Our id says doha 12: off by two. |
| rcm.5.12.chaupai.5 | - | Ramcharitmanas, Sundar Kand doha 14, chaupai lines 9-10 (Gita Press / Manas Piyush). Our id says doha 12: off by two. |
| rcm.5.13.chaupai.4 | - | Ramcharitmanas, Sundar Kand doha 15, chaupai lines 7-8 (Gita Press / Manas Piyush). Our id says doha 13: off by two. |
| rcm.5.13.chaupai.5 | - | Ramcharitmanas, Sundar Kand doha 15, chaupai lines 9-10 (Gita Press / Manas Piyush). Our id says doha 13: off by two. |
| rcm.5.14.doha.1 | - | Ramcharitmanas, Sundar Kand doha 16 (Gita Press / Manas Piyush). Our id says doha 14: off by two. |
| rcm.5.20.doha.1 | - | Ramcharitmanas, Sundar Kand doha 22 (Gita Press / Manas Piyush). Our id says doha 20: off by two. |
| rcm.5.21.chaupai.3 | - | Ramcharitmanas, Sundar Kand doha 23, chaupai lines 5-6 (Gita Press / Manas Piyush). Our id says doha 21: off by two. |
| rcm.5.25.chaupai.2 | - | Ramcharitmanas, Sundar Kand doha 27, chaupai lines 3-4 (Gita Press / Manas Piyush). Our id says doha 25: off by two. |
| rcm.5.28.doha.1 | - | Ramcharitmanas, Sundar Kand doha 30 (Gita Press / Manas Piyush). Our id says doha 28: off by two. |
| rcm.5.3.doha.1 | - | Ramcharitmanas, Sundar Kand doha 4 (Gita Press / Manas Piyush). Our id says doha 3: off by one. |
| rcm.5.30.chaupai.1 | - | Ramcharitmanas, Sundar Kand doha 32, chaupai lines 1-2 (Gita Press / Manas Piyush). Our id says doha 30: off by two. |
| rcm.5.30.chaupai.2 | - | Ramcharitmanas, Sundar Kand doha 32, chaupai lines 3-4 (Gita Press / Manas Piyush). Our id says doha 30: off by two. |
| rcm.5.31.chaupai.5 | - | Ramcharitmanas, Sundar Kand doha 33, chaupai line 9 (Gita Press / Manas Piyush). Our id says doha 31: off by two. A single line (two charans), the last before the doha. |
| rcm.5.32.chaupai.1 | - | Ramcharitmanas, Sundar Kand doha 34, chaupai lines 1-2 (Gita Press / Manas Piyush). Our id says doha 32: off by two. |
| rcm.5.35.doha.1 | - | Ramcharitmanas, Sundar Kand doha 37 (Gita Press / Manas Piyush). Our id says doha 35: off by two. Dohavali 524 has the same doha with the order 'mantri, guru, vaid'. |
| rcm.5.36.chaupai.4 | - | Ramcharitmanas, Sundar Kand doha 38, chaupai lines 7-8 (Gita Press / Manas Piyush). Our id says doha 36: off by two. |
| rcm.5.38.chaupai.3 | - | Ramcharitmanas, Sundar Kand doha 40, chaupai lines 5-6 (Gita Press / Manas Piyush). Our id says doha 38: off by two. |
| rcm.5.39.chaupai.4 | - | Ramcharitmanas, Sundar Kand doha 41, chaupai lines 7-8 (Gita Press / Manas Piyush). Our id says doha 39: off by two. |
| rcm.5.39.doha.1 | - | Ramcharitmanas, Sundar Kand doha 41 (Gita Press / Manas Piyush). Our id says doha 39: off by two. |
| rcm.5.4.chaupai.1 | - | Ramcharitmanas, Sundar Kand doha 5, chaupai lines 1-2 (Gita Press / Manas Piyush). Our id says doha 4: off by one. |
| rcm.5.41.chaupai.4 | - | Ramcharitmanas, Sundar Kand doha 43, chaupai lines 7-8 (Gita Press / Manas Piyush). Our id says doha 41: off by two. |
| rcm.5.42.chaupai.1 | - | Ramcharitmanas, Sundar Kand doha 44, chaupai lines 1-2 (Gita Press / Manas Piyush). Our id says doha 42: off by two. |
| rcm.5.42.chaupai.2 | - | Ramcharitmanas, Sundar Kand doha 44, chaupai lines 3-4 (Gita Press / Manas Piyush). Our id says doha 42: off by two. |
| rcm.5.42.chaupai.3 | - | Ramcharitmanas, Sundar Kand doha 44, chaupai lines 5-6 (Gita Press / Manas Piyush). Our id says doha 42: off by two. |
| rcm.5.42.chaupai.4 | - | Ramcharitmanas, Sundar Kand doha 44, chaupai lines 7-8 (Gita Press / Manas Piyush). Our id says doha 42: off by two. |
| rcm.5.43.doha.1 | - | Ramcharitmanas, Sundar Kand doha 45 (Gita Press / Manas Piyush). Our id says doha 43: off by two. Ravana's sarcastic echo of the phrase 'श्रवन सुजसु सुनि' in doha 53 is a different doha. |
| rcm.5.44.chaupai.4 | - | Ramcharitmanas, Sundar Kand doha 46, chaupai lines 7-8 (Gita Press / Manas Piyush). Our id says doha 44: off by two. |
| rcm.5.45.chaupai.4 | - | Ramcharitmanas, Sundar Kand doha 47, chaupai lines 7-8 (Gita Press / Manas Piyush). Our id says doha 45: off by two. |
| rcm.5.47.chaupai.3 | - | Ramcharitmanas, Sundar Kand doha 49, chaupai lines 5-6 (Gita Press / Manas Piyush). Our id says doha 47: off by two. |
| rcm.5.48.chaupai.4 | - | Ramcharitmanas, Sundar Kand doha 50, chaupai lines 7-8 (Gita Press / Manas Piyush). Our id says doha 48: off by two. |
| rcm.5.6.chaupai.2 | - | Ramcharitmanas, Sundar Kand doha 7, chaupai lines 3-4 (Gita Press / Manas Piyush). Our id says doha 6: off by one. |
| rcm.5.6.doha.1 | - | Ramcharitmanas, Sundar Kand doha 7 (Gita Press / Manas Piyush). Our id says doha 6: off by one. |
| rcm.6.110.doha.1 | - | Ramcharitmanas, Lanka Kand doha 115 (ka), Gita Press / Manas Piyush numbering. Our ref says 110: off by five. |
| rcm.6.111.doha.1 | - | Ramcharitmanas, Lanka Kand doha 116 (first of the two-doha pair numbered 116), Gita Press / Manas Piyush. Our ref says 111: off by five. |
| rcm.6.111.doha.2 | - | Ramcharitmanas, Lanka Kand doha 116 (second half of the pair; Manas Piyush prints both under ॥116॥). Our ref says 111: off by five. |
| rcm.6.112.chaupai.3 | - | Ramcharitmanas, Lanka Kand doha 117, chaupai 3 (Manas Piyush half-lines 5-6), Gita Press numbering. Our ref says 112: off by five. |
| rcm.6.12.chaupai.3 | - | Ramcharitmanas, Lanka Kand doha 10, chaupai lines 5-6 (Gita Press / Manas Piyush). Our id says doha 12: off by two. |
| rcm.6.19.doha.1 | - | Ramcharitmanas, Lanka Kand doha 18 (Gita Press / Manas Piyush). Our id says doha 19: off by one. |
| rcm.6.62.chaupai.4 | - | Ramcharitmanas, Lanka Kand doha 63, chaupai 4 (Manas Piyush half-lines 7-8), Gita Press numbering. Our id/ref_label say doha 62: off by one against Gita Press / Manas Piyush. |
| rcm.6.76.chaupai.1 | - | Ramcharitmanas, Lanka Kand doha 77, chaupai 1 (Manas Piyush half-lines 1-2), Gita Press numbering. Our ref says 76: off by one. |
| rcm.6.8.chaupai.3 | - | Ramcharitmanas, Lanka Kand doha 6, chaupai lines 5-6 (Gita Press / Manas Piyush). Our id says doha 8: off by two. |
| rcm.7.10.chaupai.4 | - | Ramcharitmanas, Uttar Kand doha 8, chaupai 4 (Manas Piyush half-lines 7-8), Gita Press numbering. Our id says doha 10: off by two. |
| rcm.7.104.doha.3 | - | Ramcharitmanas, Uttar Kand doha 108: the first of the two dohas Manas Piyush prints together as ॥108 (ख)॥, Gita Press numbering. Our id says '104 doha 3': off by four. |
| rcm.7.106.chaupai.1 | - | Ramcharitmanas, Uttar Kand doha 110, chaupai 1 (Manas Piyush half-lines 1-2), Gita Press numbering. Our id says doha 106: off by four. |
| rcm.7.107.chaupai.8 | - | Ramcharitmanas, Uttar Kand doha 111, chaupai 8 (Manas Piyush half-lines 15-16), Gita Press numbering. Our id says doha 107: off by four. |
| rcm.7.108.doha.2 | - | Ramcharitmanas, Uttar Kand doha 112 (second of the pair printed as ॥112॥), Gita Press / Manas Piyush. Our ref says 108: off by four. |
| rcm.7.116.chaupai.1 | - | Ramcharitmanas, Uttar Kand doha 120, chaupais 1-2 (Manas Piyush half-lines 1-4), Gita Press numbering. Our id says doha 116: off by four. |
| rcm.7.116.chaupai.9 | - | Ramcharitmanas, Uttar Kand doha 120, chaupai 9 (Manas Piyush half-lines 17-18), Gita Press numbering. Our id says doha 116: off by four. |
| rcm.7.117.chaupai.11 | - | Ramcharitmanas, Uttar Kand doha 121, chaupai 11 (Manas Piyush half-lines 21-22), Gita Press numbering. Our id says doha 117: off by four. |
| rcm.7.117.chaupai.15 | - | Ramcharitmanas, Uttar Kand doha 121, chaupai 15 (Manas Piyush half-lines 29-30), Gita Press numbering. Our id says doha 117: off by four. |
| rcm.7.117.chaupai.17 | - | Ramcharitmanas, Uttar Kand doha 121, chaupai 17 (Manas Piyush half-lines 33-34), Gita Press numbering. Our id says doha 117: off by four. |
| rcm.7.117.chaupai.6 | - | Ramcharitmanas, Uttar Kand doha 121, chaupai 6 (Manas Piyush half-lines 11-12), Gita Press numbering. Our id says doha 117: off by four. |
| rcm.7.117.chaupai.7 | - | Ramcharitmanas, Uttar Kand doha 121, chaupai 7 (Manas Piyush half-lines 13-14), Gita Press numbering. Our id says doha 117: off by four. |
| rcm.7.12.chaupai.1 | - | Ramcharitmanas, Uttar Kand doha 10, chaupai 1 (Manas Piyush half-lines 1-2), Gita Press numbering. Our id says doha 12: off by two. |
| rcm.7.121.doha.2 | - | Ramcharitmanas, Uttar Kand doha 125 (second doha of the pair printed as ॥125॥), Gita Press / Manas Piyush. Our ref says 121: off by four. |
| rcm.7.126.chaupai.3 | - | Ramcharitmanas, Uttar Kand doha 130, chaupai 3 (Manas Piyush half-lines 5-6), Gita Press numbering. Our id says doha 126: off by four. |
| rcm.7.126.doha.1 | - | Ramcharitmanas, Uttar Kand doha 130 (ka), Gita Press / Manas Piyush. Our ref says 126: off by four. |
| rcm.7.126.doha.2 | - | Ramcharitmanas, Uttar Kand doha 130 (kha), Gita Press / Manas Piyush. The last doha of the poem (only closing Sanskrit shlokas follow). Our ref says 126: off by four. |
| rcm.7.20.chaupai.2 | - | Ramcharitmanas, Uttar Kand doha 18, chaupai 2 (Manas Piyush half-lines 3-4), Gita Press numbering. Our id says doha 20: off by two. |
| rcm.7.22.chaupai.2 | - | Ramcharitmanas, Uttar Kand doha 20, chaupai 2 (Manas Piyush half-lines 3-4), Gita Press numbering. Our id says doha 22: off by two. |
| rcm.7.3.chaupai.1 | - | Ramcharitmanas, Uttar Kand doha 1, chaupai 1 (Manas Piyush half-lines 1-2): the first chaupai after the opening doha, Gita Press numbering. Our id/ref say doha 3: off by two. |
| rcm.7.3.doha.1 | - | Ramcharitmanas, Uttar Kand doha 1 (ka), Gita Press / Manas Piyush. Our ref says doha 3: off by two. |
| rcm.7.39.chaupai.4 | - | Ramcharitmanas, Uttar Kand doha 37, chaupai 4 (Manas Piyush half-lines 7-8), Gita Press numbering. Our id says doha 39: off by two. Growse's translation places the sandalwood lines just before his 'Doha 38' (sandal on the gods' heads, axe heated... |
| rcm.7.4.chaupai.6 | - | Ramcharitmanas, Uttar Kand doha 2, chaupais 6-7 (Manas Piyush half-lines 11-14), Gita Press numbering. Our id says doha 4 chaupai 6: off by two, and the text spans two Gita Press chaupais. |
| rcm.7.4.chaupai.8 | - | Ramcharitmanas, Uttar Kand doha 2, chaupai 8 (Manas Piyush half-lines 15-16), Gita Press numbering. Our id says doha 4: off by two. |
| rcm.7.40.chaupai.1 | - | Ramcharitmanas, Uttar Kand doha 38, chaupai 1 (Manas Piyush half-lines 1-2), Gita Press numbering. Our id says doha 40: off by two. |
| rcm.7.40.chaupai.4 | - | Ramcharitmanas, Uttar Kand doha 38, chaupai 4 (Manas Piyush half-lines 7-8) and doha 38, Gita Press numbering. Our id says doha 40: off by two. |
| rcm.7.41.chaupai.2 | - | Ramcharitmanas, Uttar Kand doha 39, chaupai 2 (Manas Piyush half-lines 3-4), Gita Press numbering. Our id says doha 41: off by two. |
| rcm.7.43.chaupai.1 | - | Ramcharitmanas, Uttar Kand doha 41, chaupai 1 (Manas Piyush half-lines 1-2; Manas Piyush itself cross-cites it as '41.1'), Gita Press numbering. Our id says doha 43: off by two. |
| rcm.7.45.chaupai.3 | - | Ramcharitmanas, Uttar Kand doha 43, chaupai 3 (Manas Piyush half-lines 5-6), Gita Press numbering. Our id says doha 45: off by two. |
| rcm.7.46.chaupai.3 | - | Ramcharitmanas, Uttar Kand doha 44, chaupais 3-4 (Manas Piyush half-lines 5-8), Gita Press numbering. Our id says doha 46: off by two. |
| rcm.7.48.chaupai.1 | - | Ramcharitmanas, Uttar Kand doha 46, chaupai 1 (Manas Piyush half-lines 1-2), Gita Press numbering. Our id says doha 48: off by two. |
| rcm.7.48.chaupai.2 | - | Ramcharitmanas, Uttar Kand doha 46, chaupai 2 (Manas Piyush half-lines 3-4), Gita Press numbering. Our id says doha 48: off by two. |
| rcm.7.48.chaupai.3 | - | Ramcharitmanas, Uttar Kand doha 46, chaupai 3 (Manas Piyush half-lines 5-6), Gita Press numbering. Our id says doha 48: off by two. |
| rcm.7.6.chaupai.2 | - | Ramcharitmanas, Uttar Kand doha 4, chaupais 2-3 (Manas Piyush half-lines 3-6), Gita Press numbering. Our id says doha 6: off by two. |
| rcm.7.69.chaupai.4 | - | Ramcharitmanas, Uttar Kand doha 70, chaupai 4 (Manas Piyush half-lines 7-8), Gita Press numbering. Our id says doha 69: off by one. |
| rcm.7.7.chaupai.4 | - | Ramcharitmanas, Uttar Kand doha 5, chaupai 4 (Manas Piyush half-lines 7-8), Gita Press numbering. Our id says doha 7: off by two. |
| rcm.7.7.chhand.2 | - | Ramcharitmanas, Uttar Kand doha 5, chhand 2 (Manas Piyush 'दोहा 5, छन्द (2)'), Gita Press numbering. Our ref says 7: off by two. |
| rcm.7.70.chaupai.2 | - | Ramcharitmanas, Uttar Kand doha 71, chaupai 2 (Manas Piyush half-lines 3-4), Gita Press numbering. Our id says doha 70: off by one. |
| rcm.7.72.chaupai.2 | - | Ramcharitmanas, Uttar Kand doha 73, chaupais 2-3 (Manas Piyush half-lines 3-6), Gita Press numbering. Our id says doha 72 chaupai 2: off by one, and the text covers two Gita Press chaupais. |
| rcm.7.73.chaupai.3 | - | Ramcharitmanas, Uttar Kand doha 74, chaupai 3 (Manas Piyush half-lines 5-6), Gita Press numbering. Our id says doha 73: off by one. |
| rcm.7.73.chaupai.4 | - | Ramcharitmanas, Uttar Kand doha 74, chaupai 4 (Manas Piyush half-lines 7-8) and doha 74 (ka), Gita Press numbering. Our id says doha 73: off by one. |
| rcm.7.8.chhand.1 | - | Ramcharitmanas, Uttar Kand doha 6, chhand (Manas Piyush 'दोहा 6 (छन्द)'), Gita Press numbering. Our ref says 8: off by two. |
| rcm.7.85.chaupai.5 | - | Ramcharitmanas, Uttar Kand doha 86, chaupai 5 (Manas Piyush half-lines 9-10), Gita Press numbering. Our id says doha 85: off by one. |
| rcm.7.86.doha.1 | - | Ramcharitmanas, Uttar Kand doha 87 (ka), the doha before the soratha that ends section 87, Gita Press / Manas Piyush. Our ref says 86: off by one. |
| rcm.7.87.chaupai.4 | - | Ramcharitmanas, Uttar Kand doha 88, chaupai 4 (Manas Piyush half-lines 7-8), Gita Press numbering. Our id says doha 87: off by one. |
| rcm.7.87.sortha.5 | - | Ramcharitmanas, Uttar Kand doha 89: the second soratha of the pair numbered 89 (Manas Piyush prints both under ॥89॥), Gita Press numbering. Our id says '87 sortha 5', which matches neither the doha number nor Gita Press's soratha numbering. Growse's... |
| rcm.7.95.chaupai.4 | - | Ramcharitmanas, Uttar Kand doha 99, chaupai 4 (Manas Piyush half-lines 7-8), Gita Press numbering. Our id says doha 95: off by four. |
| shakti_gita.1.39 | - | Shakti Gita 1.42-43 in the Mahamandal editions read (1916 and 1957 agree; 1.40 there is the speaker line 'the gods said'). Our '1.39-40' is off by three. The printed Mahamandal editions number speaker lines ('devā ūcuḥ ॥1॥' etc.) as verses,... |
| shakti_gita.1.47 | - | Shakti Gita 1.50-51 in the Mahamandal editions (1916 and 1957 agree). Our '1.47-48' is off by three. The printed Mahamandal editions number speaker lines ('devā ūcuḥ ॥1॥' etc.) as verses, so their numbers run ahead of ours. |
| shakti_gita.1.51 | - | Shakti Gita 1.54 in the 1957 Mahamandal edition. Our '1.51' is off by three. The printed Mahamandal editions number speaker lines ('devā ūcuḥ ॥1॥' etc.) as verses, so their numbers run ahead of ours. |
| shakti_gita.5.133 | - | Shakti Gita 5.135 in the 1957 Mahamandal edition (the Devi Anugraha English also numbers it 135). Our '5.133' is off by two. |
| shakti_gita.5.137 | - | Shakti Gita 5.139 in the 1957 Mahamandal edition (Devi Anugraha English also 139). Our '5.137' is off by two. |
| shakti_gita.6.149 | - | Shakti Gita 6.151-152 in the 1957 Mahamandal edition, the penultimate verses of chapter 6 (6.153 closes). Our '6.149-150' is off by two. |
| shakti_gita.6.27 | - | Shakti Gita 6.29 in the 1957 Mahamandal edition (Devi Anugraha English numbers it 30). Our '6.27' is off by two. |
| shakti_gita.7.118 | - | Shakti Gita 7.122 in the 1957 and 1916 Mahamandal editions (chapter 7, vision of the cosmic form). Our '7.118' is off by four. It echoes Bhagavad Gita 9.18 (verified on vedabase.net). |
| shambhu_gita.2.43 | - | Shambhu Gita 2.45 in the Mahamandal edition read. Our '2.43' is off by two. |
| shambhu_gita.6.75 | - | Shambhu Gita 6.77 in the Mahamandal edition read. Our '6.75' is off by two. |
| shambhu_gita.7.53 | - | Shambhu Gita 7.56 in the Mahamandal edition read (chapter on the Shiva-linga). Our '7.53' is off by three. |
| shambhu_gita.7.65 | - | Shambhu Gita 7.69-70 in the Mahamandal edition read. Our '7.65-66' is off by four. |
| shambhu_gita.7.80 | - | Shambhu Gita 7.84 in the Mahamandal edition read. Our '7.80' is off by four. |
| sur.vp.423 | - | Sur Vinay Patrika (Gita Press) pada 43, NOT 423 (the Gita Press book has about 309 padas). Closing couplet of 'जाकौ मन लाग्यौ नँदलालहि, ताहि और नहिं भावै'. NPS Sursagar skandha 2, pada 10. |
| surya_gita.7.54 | - | Surya Gita 7.56 in the 1967 Mahamandal edition (chapter 7, 'Jivanmukta-lakshana-nirupana'). Our '7.54' is off by two. |
| tulsi_dv.101 | - | Dohavali 147 in Gita Press (both scans) and 146 in Kali Prasad Shastri. NOT 101: Gita Press doha 101 is 'sankara priya mama drohi...' on Shiva-Ram unity. |
| tulsi_dv.143 | - | Dohavali 175 in Gita Press (scan 2 prints the number) and 175 in Kali Prasad Shastri's index. NOT 143: Gita Press doha 143 is 'jani rama seva sarasa...' (Brahma became Jambavan, Shiva became Hanuman). |
| tulsi_dv.282 | - | Dohavali 277 in Gita Press (scan 2 prints the number) and 277 in Kali Prasad Shastri. NOT 282. |
| tulsi_kv.7.129 | - | Kavitavali, Uttar Kand 127 (Gita Press, whose meaning for this line ends at 127; Shrikant Sharan refers to it as chhand 127). NOT 129: chhand 129 is 'antarajamihu ten bade...' (our tulsi_kv.7.182). |
| tulsi_kv.7.182 | - | Kavitavali, Uttar Kand 129 (Gita Press, meaning ends '129'; Shrikant Sharan, after 128). NOT 182: Gita Press 182 is a lament on Kashi's plight in the Kali age. |
| tulsi_vp.128 | - | DATA ERROR: this is Vinaya Patrika pada 138, not 128. Haritoshini prints it as (138), Thakur as 138, and in the Gita Press 2001 scan it follows pada 137. (Thakur's pada 128 is a different song, 'O my mind, remember... |
| vishnu_gita.1.58 | - | Vishnu Gita 1.61 in the 1919 Mahamandal edition. Our '1.58' is off by three. |
| vr.1.64.15 | - | Southern recension (itihasa.io) 1.64.16 + 1.64.17. Line 1 is 1.64.16 = Baroda critical edition 1.63.15 (last verse of CE sarga 63); line 2 is 1.64.17, Southern-only (not in the CE). Our id 1.64.15 is one verse early. |
| vr.2.22.2 | - | Southern recension (itihasa.io) 2.22.3-4, both marked Southern-only (not in the Baroda critical edition). Our id 2.22.2 points to a different verse in itihasa.io's numbering. |
| vr.3.43.6 | - | Valmiki Ramayana 3.43.7-8 (Southern, itihasa.io) = Baroda CE 3.41.6-7. Our text is two ślokas; id 3.43.6 is off by one. |
| vr.3.66.5 | - | Valmiki Ramayana 3.66.6 (Southern, itihasa.io). Southern-only verse, absent in Baroda CE; itihasa notes it is also missing from the Govindaraja and Shivasahaya texts and commented only by Tilaka. Our id 3.66.5 is off by one. |
| vr.4.32.15 | - | Valmiki Ramayana 4.32.16 (Southern, itihasa.io) = Baroda CE 4.31.16. Our id 4.32.15 is off by one. |
| vr.5.11.26 | - | Valmiki Ramayana 5.11.37 (Southern, itihasa.io; same as Gita Press per our ref) = Baroda CE 5.9.34. Our id 5.11.26 matches neither. |
| vr.5.11.27 | - | Valmiki Ramayana 5.11.38 (Southern, itihasa.io) = Baroda CE 5.9.35. Our id 5.11.27 matches neither. |
| vr.5.11.29 | - | Valmiki Ramayana 5.11.40 (Southern, itihasa.io) = Baroda CE 5.9.37. Our id 5.11.29 matches neither. |
| vr.5.11.30 | - | Valmiki Ramayana 5.11.41 (Southern, itihasa.io) = Baroda CE 5.9.38. Our id 5.11.30 matches neither. |
| vr.5.11.31 | - | Valmiki Ramayana 5.11.42 (Southern, itihasa.io) = Baroda CE 5.9.39. Our id 5.11.31 matches neither. |
| vr.5.11.32 | - | Valmiki Ramayana 5.11.43 (Southern, itihasa.io) = Baroda CE 5.9.40. Our id 5.11.32 matches neither. |
| vr.5.11.34 | - | Valmiki Ramayana 5.11.45 (Southern, itihasa.io) = Baroda CE 5.9.42. Our id 5.11.34 matches neither. |
| vr.5.13.17 | - | Valmiki Ramayana 5.13.18 (Southern, itihasa.io) = Baroda CE 5.11.18. Our id 5.13.17 is off by one. |
| vr.5.13.18 | - | Valmiki Ramayana 5.13.19-20 (Southern, itihasa.io) = Baroda CE 5.11.19-20. Our text is two ślokas; id 5.13.18 is off by one. |
| vr.5.13.43 | - | Valmiki Ramayana 5.13.47 (Southern Recension as on itihasa.io); Baroda critical edition 5.11.47. Our id 5.13.43 is off by four. |
| vr.5.13.44 | - | Valmiki Ramayana 5.13.48 (Southern Recension, itihasa.io); Baroda critical edition 5.11.48. Our id 5.13.44 is off by four. |
| vr.5.13.47 | - | Valmiki Ramayana 5.13.51 (Southern Recension, itihasa.io); Baroda critical edition 5.11.51. Our id 5.13.47 is off by four. |
| vr.5.13.48 | - | Valmiki Ramayana 5.13.52 (Southern Recension, itihasa.io); Baroda critical edition 5.11.52. Our id 5.13.48 is off by four. |
| vr.5.13.50 | - | Valmiki Ramayana 5.13.54 (Southern Recension, itihasa.io); Baroda critical edition 5.11.54. Our id 5.13.50 is off by four. |
| vr.5.13.51 | - | Valmiki Ramayana 5.13.55 (Southern Recension, itihasa.io); Baroda critical edition 5.11.55. Our id 5.13.51 is off by four. |
| vr.5.13.54 | - | Valmiki Ramayana 5.13.58-59 (two verses; Southern Recension, itihasa.io); Baroda critical edition 5.11.58-59. Our id 5.13.54 is off by four and covers two verses. |

Also wrong but not caught by the table's pattern (from `epics_notes.md`): vr.6.21.6 is 6.21.14-15 (CE 6.14.4-5); vr.3.72.7 is 3.72.10; vr.5.38.32 is 5.38.38; vr.5.26.39 is 5.26.41; vr.2.58.18 is 2.58.23 (Southern-only); vr.2.34.28 is 2.34.34; vr.6.22.42 is 6.22.51; vr.4.1.101 is 4.1.121 (Southern-only); bh.niti.106 is GRETIL 1.105; tulsi_vp.128 is pada 138.

## Severity 3: Sanskrit, settings and smaller text issues (from the editor notes)

- Sanskrit typos: mbh.12.81.6 दहृयं -> हृदयं; mbh.3.297.7 व्यसंसाय -> व्यवसाय; Hamsa 21 धनेभ्य -> घनेभ्य; bg 13.1 स्वास्थं -> स्वास्थ्यं; missing spaces at speaker labels and half-verse joins in bg.1.47, 3.36, 3.37, 2.7, 2.20, 2.22, 2.70 (affects display and TTS). More OCR typos in the Mahamandal texts: see each entry's `translation_note`.
- bh.niti.87: our Sanskrit does not match the GRETIL text it cites (repeats 'loke'; loses 'not consumed by their sorrows').
- kabir.kk.66: ours is a later popular form; NPS Granthavali reads differently; 'always' is added in our translation.
- Settings: bg.2.7 has the speaker backwards; bg.4.17's setting belongs to 4.1-8; bg.1.29 says Arjuna collapses (that is 1.47); mbh.14.53.15 setting out of order; rcm.2.163 has the wrong prasang (it is Dasharatha's funeral); vr.5.38.32 has no prasang; viv.7.want_a_bit_of_peace was written from Camp Taylor, not Los Angeles; viv.5.ridicule_opposition is letter XLVII.
- Lines that overstate (translation_ok true, but worth rewording): up_chhandogya.582 (reverses the logic), yv.2.9.33 ('never by force'), yv.1.12.15, yv.2.7.17, up_brihadaranyak.477, bg.5.18 (renders a caste slur-term as 'an outcast'), bg.3.35 misuse note (presents the modern anti-caste reading as the commentators').
- Plan headings left over from replaced verses: gratitude day 1 ('The taste in water', from bg.7.8) and losing-hope day 2 ('Stand up', from bg.2.3).

## Severity 4: missing or thin research fields

- No commentary found at all: up_narayana.16.
- Every commentary withheld from the prompts because the cautions warn about that commentator (25): ashtavakra.17.1, dheesh_gita.1.4, dheesh_gita.1.42, dheesh_gita.1.46, dheesh_gita.4.19, dheesh_gita.7.27, rcm.7.86.doha.1, shakti_gita.1.47, shakti_gita.1.51, shakti_gita.5.133, shakti_gita.5.137, shakti_gita.6.149, shakti_gita.6.27, shakti_gita.7.118, shambhu_gita.2.43, shambhu_gita.6.75, shambhu_gita.6.91, shambhu_gita.7.53, shambhu_gita.7.65, shambhu_gita.7.80, surya_gita.7.54, up_brihadaranyak.387, up_chhandogya.308, up_chhandogya.498, vishnu_gita.1.58. Worth a human look: the core teaching and practical reading still reach the writer.
- Empty `cautions`: 360 verses (11 in plans: bg.2.67, bg.3.19, bg.4.17, bg.5.10, bg.17.16, bg.18.26, bg.18.30, bg.18.63, bg.18.65, vr.6.22.42, rcm.6.79.chaupai.3).
- Empty `not_for`: 161 verses (1 in plans: rcm.6.79.chaupai.3).
- Empty `misreadings`: 32 verses.
- Thin sourcing (see each notes file's 'weak sources' section): Valmiki commentary is itihasa.io's AI synthesis (labelled as such everywhere); Mahabharata has no usable classical commentary (Ganguli + context); Mahamandal gitas have only the edition's Hindi; yv.1.12.22 context only.
