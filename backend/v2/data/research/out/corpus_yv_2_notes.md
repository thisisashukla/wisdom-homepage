# corpus_yv_2: notes (45 Yoga Vasishtha verses)

## Sources used
- Sanskrit text and verse numbers: sa.wikisource Yoga Vasishtha (Nirnaya Sagar text). All 45 verse numbers matched our ids by automated word matching against the chapter pages.
- Anandabodhendra Sarasvati, *Tatparya-prakasha*: Nirnaya Sagar 1937 (Pansikar), Part 1, archive.org `HSgy_...part-1-e` (Vairagya to Upashama); Motilal 1984 reprint, Part 2, archive.org `eafw_...part-2...` (Nirvana). Both are OCR; the glosses are often short or missing for single verses.
- Vihari-Lala Mitra (1891-99) translation: vol. 1 `in.ernet.dli.2015.62046`, vol. 2 `yogavasishthamah0002unse`, vol. 3 `yoga-vasishtha-maharamayana-vol-3` and Gutenberg 46531 (`theyogavasishtha46531gut`), vol. 4 `in.ernet.dli.2015.96046`. Mitra's verse numbers line up with the Sanskrit everywhere except Upashama 24, where he paraphrases freely.
- Every entry has at least 2 sourced notes: one is an Anandabodhendra gloss, the other Mitra's text of the same chapter. Where Anandabodhendra's gloss on the verse itself could not be found in the OCR (5.10.9, 5.36.1, 6a.115.43, and several Bhushunda verses), I used his chapter introduction or his gloss on the nearby verses, and said so in the entry.

## Data errors
1. **yv.6a.29.111: incomplete translation, wrong verse range (translation_ok = false).** "Tanoti caishyato bijam" finishes the sentence that starts at v.110b ("Remembering you is the fruit of past merit and the watering of present merit, and it sows the seed of the future"). The sentence ends at v.113a ("…I have set my foot on the head of all calamities"). Our translation stops at "I…". Fix: change the passage to 110b-113a and finish the sentence.
2. **yv.5.9.59: the setting gets the meaning wrong.** "I'm struck down, ruined, dead" is Janaka's old cry about his own spiritual lostness. The next verse says "I am awake; I have seen the thief, the mind, that has long slain me". The verse is about awakening, not grief for someone who died. Change the setting from "stop replaying his losses", and don't use it in a grief plan.
3. **yv.5.10.9: the note on what follows is wrong.** Janaka does not get up when the doorkeeper calls. He keeps reflecting and says the kingdom is pointless (10.10-12). He only rises to his duties, without the sense of being the doer, at the start of ch.11.
4. **yv.5.21.10: the reading is disputed.** Anandabodhendra reads the two ablative compounds as active: the fortitude of someone who has given up all wealth and pushed kin away. Our reading ("everything blocked, relatives let go of you") follows Mitra, who also adds "reliance in God", which is not in the Sanskrit. Our reading is defensible. Editors should still know about the commentator's version.
5. **yv.5.24.19: "this" needs its referent.** It is the yukti of vv.17-18: complete lack of interest in sense objects. That is the method for taming the mind. Our note says "mastering the mind", which is the goal, not the thing that is hard and then easy.
6. **yv.5.21.6: "worry" narrows the word.** In this chapter about desire, both the commentator and Mitra take "chinta" to mean dwelling on sense objects or craving. "Brooding" covers both meanings.
7. **yv.2.15.19: Sanskrit typo.** Our data and wikisource read वक्रं ("crooked"). The sense needs वक्त्रं ("face"), and Mitra has "countenance". Check against a better print.
8. **Missing prasang** (null) for yv.3.16.50 (belongs to the Lila prasang), yv.5.41.3 (Prahlada), yv.5.61.2 and yv.5.64.33 (Suraghu, then a general sermon), and yv.6b.44.32 (tree of samadhi).
9. **ref_label/ref are inconsistent.** Some use "Upashama 9.46-47" and others "5.31.35". yv.5.9.46 covers verses 46-47 under a single-verse id.
10. **yv.6a.115.43**: our_note says this verse answers Rama's question at 1.31.17. I did not check this.
11. Mitra gives "maha-tyagi" (6a.115.1) as "bounty". That is a mistranslation. Our "renouncer" is correct.

## Cautions for editors
- **yv.6a.93.29 / 93.43 (Chudala).** The verse is Kumbha's answer to Shikhidhvaja, who has just stood up to throw himself off a cliff to complete his "total renunciation" (93.15-17). Kumbha stops him: the body is innocent and destroying it is not renunciation. Our setting leaves this out. The passage protects against self-harm, but it must not be used casually or with any falling imagery. For anyone with thoughts of self-harm, it needs explicit protective framing and crisis resources.
- **yv.5.43.25 (and the 5.43 chapter).** The passage is openly polemical. Vaishnava bhakti is called a device for people who avoid effort (v.20). A person who has not mastered the mind is called a "forest donkey" (v.24). The conch-bearing form is called secondary (vv.27-28). Our misuse note ("not a dismissal of prayer") is good guidance for readers but softer than the text. Don't quote the surrounding verses in a devotional plan.
- **yv.6a.115.26.** The verse just before (v.25) calls old age, death, calamity and poverty "delightful". The commentator explains: delightful because seen as Brahman. Avoid quoting it to anyone going through those.
- **Death and grief.** 2.16.3 says death feels "like a festival". 3.16.24 says immortality is never won. 3.16.50 shows a widow near death from grief. None of these should open a grief plan without framing. In 3.16.50 the story's later "restoration" must not read as a promise that the dead return.
- **5.9.46** ("misfortunes are fortunes"). The commentator means hardship that leads to dispassion and awakening. It should not be offered as first comfort in a crisis.
- **5.21.10.** "Only your own courage lifts you out" can deepen isolation. Pair it with the point that accepting help is fine. It is not for suicidal or abuse situations.
- **Bhushunda's refrain "so I live long, free of illness"** (6a.26.x). Don't let it suggest that sick people worried themselves into illness.
- **Theistic verses** (5.31.x, 5.33.19, 6a.29.x) name Vishnu or Shiva. In the Yoga Vasishtha, devotion leads into knowledge of the Self (5.31.39-40, 5.43.4-6), and readings should keep that arc.

## Weak or thin sources
- Anandabodhendra says little or nothing on: 2.15.11, 3.16.24, 5.10.9, 5.24.19 (gloss on neighbouring verses only), 5.36.1, 6a.26.12/18/34, 6a.29.108, 6a.115.43. Where his gloss on the verse was missing, the entry uses Mitra plus his chapter-level or neighbouring-verse comments.
- I found no modern scholarly commentary on these specific verses. Venkatesananda's abridgement is under copyright and was not used.
