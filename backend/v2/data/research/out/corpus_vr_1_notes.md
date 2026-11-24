# corpus_vr_1: research notes (57 Valmiki Ramayana verses, Bala + Ayodhya)

## Method and sources
- Main source: itihasa.io sarga pages (`/ramayana/<kanda>/<sarga>`), one fetch per sarga. Each page has the Southern-recension text, Baroda critical-edition (CE) mapping, collation notes and syntheses of Tilaka, Govindarāja's Bhūṣaṇa and Śivasahāya's Śiromaṇi. I located every verse by fuzzy-matching our Sanskrit against all verses in the sarga and its neighbours (and searched further where needed). I did not fetch /api/ paths.
- itihasa.io's translations and commentary syntheses are AI-generated (Gemini) and not peer-reviewed. Every `who` field says "itihasa.io synthesis of ...". All gists are my paraphrases.
- Second source: Griffith's verse translation (Project Gutenberg #24869, read from archive.org). I used it to check the content and canto of Bala verses and some Ayodhya ones (1.2, 1.21/23, 1.33/34, 1.44, 1.53, 1.63, 1.64, 1.77, 2.1). It is a translation, not a commentary, so it is listed under `sources` only.
- **valmikiramayan.net and sacred-texts.com could not be used.** Both returned a JavaScript bot-challenge page ("One moment, please..." / "Just a moment...") to a plain fetch. Under the brief's rule I did not try to get around it. One WebFetch of a valmikiramayan.net page happened before I saw the challenge (verse 1.2.16). It agreed with itihasa.io, but I did not rely on it. As a result, the cross-check against a second commentary-bearing source the caller asked for was **not** done. wisdomlib was not tried because the brief says it shows a Cloudflare check.
- itihasa.io names the Tilaka's author inconsistently: "Rāma Varmā" on most pages, "Nāgojī/Nāgeśa Bhaṭṭa's Tilaka" on later Ayodhya pages (2.29, 2.82 onward). I kept each page's label. Authorship of the Tilaka is disputed, so an editor may want to standardise to plain "Tilaka".

## Numbering: the biggest data issue
Only **16 of 57** ids match itihasa.io's Southern numbering exactly. The others are off by 1 to 8 verses, and a few are in the wrong sarga:
- **vr.2.101.14** ("na doṣaṃ tvayi paśyāmi"): itihasa.io **2.104.17**, CE 2.97.17. Wrong sarga by three.
- **vr.2.103.10** ("purā prekṣya suvṛttaṃ māṃ"): itihasa.io **2.102.13**, CE 2.95.17.
- **vr.1.2.36** ("samākṣaraiś caturbhir yaḥ"): itihasa.io **1.2.40**, CE 1.2.39. In itihasa.io, 1.2.36 is Brahma's "yāvat sthāsyanti girayaḥ".
- Within-sarga offsets: 1.44.10 is really 1.44.12; 1.53.9 is 1.53.11cd-12; 1.63.9 is 1.63.11cd-12ab; 1.64.15 is 1.64.16-17; 1.77.20 is 1.77.26cd-27; 2.7.27 is 2.7.35; 2.8.8 is 2.8.9; 2.19.32 is 2.19.33; 2.21.46 is 2.21.48; 2.22.2 is 2.22.3-4; 2.22.24 is 2.22.29; 2.23.9 is 2.23.17; 2.24.20 is 2.24.23-25 (composite); 2.25.2 is 2.25.3; 2.30.9 is 2.30.10; 2.44.9 is 2.44.10; 2.44.17 is 2.44.21; 2.46.22 is 2.46.23; 2.58.14 is 2.58.19; 2.62.13 is 2.62.14; 2.62.14 is 2.62.15; 2.63.11 is 2.63.12; 2.64.9 is 2.64.10; 2.64.19 is 2.64.23; 2.72.25 is 2.72.29; 2.72.27 is 2.72.31; 2.75.15 is 2.75.20; 2.77.21 is 2.77.23; 2.82.11 is 2.82.12; 2.97.12 is 2.97.14; 2.100.16 is 2.100.18; 2.100.17 is 2.100.19; 2.100.20 is 2.100.22; 2.100.51 is 2.100.59; 2.105.13 is 2.105.16; 2.105.21 is 2.105.24; 2.105.23 is 2.105.26-27; 2.109.8 is 2.109.9.
- Our ids may follow another Southern-style edition, such as Gita Press or the Dutt edition (`verified_with` cites a Dutt-edition English). **I could not check this:** I had no Gita Press or Dutt text with verse numbers. Most offsets are small and in one direction, which fits an edition difference. The three wrong-sarga cases above look like real errors whatever the edition. Each entry's `verified_ref` gives the itihasa.io Southern number and the CE number.

## Southern-only verses (not in the Baroda critical edition)
vr.1.21.21; vr.1.64.15 (second line); vr.2.21.46; vr.2.22.2; vr.2.22.24; vr.2.24.20 (parts); vr.2.25.2; vr.2.40.8 (first line; "rāmaṃ daśarathaṃ viddhi" itself is in the CE); vr.2.44.17; vr.2.58.14; vr.2.97.4; vr.2.97.7; vr.2.115.17 (first line). These are fine to use, but label them if the app ever says "critical edition".

## Speaker, listener and setting errors
- **vr.1.2.36**: the speaker is **Valmiki's disciples**, speaking to one another as they chant the verse in wonder, not the narrator. Both itihasa.io and Griffith (Book I canto 2) confirm this.
- **vr.2.82.11**: the listener is **Vasishtha** (the singular "you ought to declare dharma" is addressed to him), with the assembly present. It is not addressed to "the assembly".
- **vr.2.46.22, our_note**: it says "atmakrita is best taken as suffering caused by the prince himself". All three commentators read it the other way: *ātmakṛtāt* is the citizens' own self-caused trouble, and *ātmanā* is the sorrow caused by the prince. The translation also merges the two halves.
- **vr.1.33.8, setting**: it says the daughters "refused to curse" Vayu. I found no statement of that in the passages I read; they say only that the daughters showed forbearance toward a god.

## Translations that misstate or over-read the verse
- **vr.2.77.21**: the translation inserts the list "hunger and thirst, grief and confusion, old age and death". The verse says only "three pairs"; the list is a gloss by Govindarāja and Śiromaṇi (Tilaka gives different pairs). Mark it as a gloss.
- **vr.2.22.24**: "the forest **may be** the greater blessing" hedges. The verse states outright that forest life is the greater good.
- **vr.1.63.9**: "and I did not see it" is added. The verse opens mid-line and leaves out the preceding half-line, which says the gods plotted to rob his austerity.
- **vr.2.112.19**: "from desire or greed": Govindarāja reads *kāmāt* as "out of affection" for Bharata. "Love or greed" is closer and kinder.
- Smaller points: vr.2.21.46 ("hold your sorrow gently") is softer than "restrain your grief". vr.2.72.25 "performed my father's last rites" follows Tilaka only; Śiromaṇi reads "tended him in his last illness".

## Sanskrit transcription slips in our data (itihasa.io reading in brackets)
1.53.9 parityāgamayaṃ (parityāgam arheyaṃ); 2.11.3 pratijñā (pratijñāṃ); 2.22.24 lakṣyā (lakṣmyā); 2.23.9 vipatrārthaḥ (vipannārthaḥ); 2.25.2 dharma (dharmaṃ); 2.44.9 dharmaghnaḥ (gharmaghnaḥ, "heat-dispelling", which our English already follows); 2.62.13 dharme (dharmaṃ); 2.100.17 madodayam (mahodayam); 2.100.20 arthakṛccheṣu / kuryāniḥśreyasaṃ (arthakṛcchreṣu / kuryān niḥśreyasaṃ); 2.101.14 jananī (jananīṃ); 2.109.8 anvayaṃ (tv ayaṃ). Stray verse numbers are embedded in vr.2.30.9 and vr.2.63.7.
Real variant readings, not errors: 1.2.16 tasyetthaṃ/tasyaivaṃ; 2.84.9 yadi tuṣṭas/yadā 'duṣṭas (Tilaka notes both); 2.105.21 astamite 'hani/ravau; 2.105.23 vasūni/dhanāni.

## Cautions an editor should see
- **vr.1.33.8 (kṣamā hymn)**: the daughters were harmed by Vayu after refusing him. Praising their forbearance can read as praising silent endurance of sexual violence. Keep it out of any plan touching abuse or harassment, and never use it to counsel a woman to tolerate mistreatment.
- **Gender-role context**: in vr.2.24.20, the adjacent Southern-only verses 2.24.25-28 teach that a wife's highest duty is serving her husband, and Tilaka elaborates on them. vr.2.58.14 asks the wronged queen to defer to Kaikeyi and serve the king "like a god". vr.2.101.14 is followed by a verse granting elders authority over wives and sons. vr.1.77.20: don't turn Govindarāja's "Sita loved twice as much" into a prescription.
- **Grief verses that tell the reader not to grieve or to rise**: vr.2.21.46, vr.2.44.17, vr.2.77.21, vr.2.105.13, vr.2.105.21, vr.2.105.23, vr.2.22.2, vr.2.22.24. Use them after the first days or with framing. Govindarāja says Ram's impermanence verses are meant to "remove grief"; readings should not instruct a mourner to stop.
- **Child-loss and death**: vr.2.64.9 (the blind father speaking to his son, who is already dead) and vr.2.64.19 belong to the story of the hermit boy killed by Dasharatha. vr.2.100.51 says the tears of the falsely accused "destroy the sons" of an unjust ruler, which could feed a "my loss is punishment" belief. Keep all three away from bereaved parents.
- **vr.2.23.9 (effort beats fate)**: Lakshman says this in rage, just before threatening violence, and Ram rejects acting on it. It can also blame people whose setbacks they cannot control (illness, disability).
- **Manipulators' words quoted as warnings**: vr.2.8.8 (Manthara) and vr.2.11.3 (Kaikeyi's trap). Readings must frame them as diagnostic, not as counsel.
- **vr.2.63.7 and vr.2.63.11**: Dasharatha's self-blame over an accidental killing can deepen guilt in readers who caused harm by accident.
- **vr.2.84.9**: Guha's gifts include fish and meat. Skip that detail for a vegetarian audience.

## Weak or thin sourcing
- Ten verses have only one commentary note on itihasa.io: 1.2.36, 1.21.21, 2.8.8, 2.21.46, 2.22.2, 2.22.24, 2.30.9, 2.44.17, 2.62.14, 2.97.12.
- Several "two-commentator" entries partly rely on notes about an adjacent verse in the same passage; each `who` field says so (e.g. 1.2.16, 2.1.10, 2.62.13, 2.64.9, 2.63.11, 2.100.17, 2.100.20). vr.2.64.9 has no commentary on the verse itself.
- Some entries rest on one shared note that itihasa.io attributes to "all three commentators" (2.46.22, 2.21.46, 2.64.19). I listed them as separate commentators only where the page names each.
- Claims in our notes that I could not verify from a page I read: 2.40.8, "tradition counts it among the finest verses"; 2.105.13, "a widely repeated subhāṣita". Our note's claim that Govindarāja gives Vaishnava readings of 2.40.8/9 **is** confirmed.
