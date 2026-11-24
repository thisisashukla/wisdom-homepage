# corpus_up_3 notes (57 Upanishad verses)

All 57 input verses have an entry in `corpus_up_3.json`, in input order. 53 have 2 or more sourced commentaries, 3 have one (up_maha.536, up_shiv_sankalp.1, up_shiv_sankalp.6) and 1 has none (up_narayana.16).

## Sources used
- **Mundaka:** Shankara, tr. S. Sitarama Sastri (1905), and Madhva, tr. S. C. Vasu (1909), both on wisdomlib.org, one page per verse or chapter.
- **Prashna:** Shankara, tr. S. Sitarama Sastri, and Madhva, tr. Vasu, both on wisdomlib.
- **Taittiriya:** A. Mahadeva Sastri (1903) on wisdomlib, which covers Shankara, Sureshvara's Vartika (marked "(S.)") and Sayana. Per his preface, Sayana is printed unmarked in smaller type after Shankara. The online text loses the type size, so I attributed unmarked paragraphs that follow Shankara's gloss to Sayana. Treat that attribution as a best reading. The gists marked as Sureshvara are reliable.
- **Shvetashvatara:**
  - E. Röer (1853, archive.org 10248668bsb). His translation follows Shankara, and his notes report Shankara's glosses.
  - Max Müller, SBE 15 (archive.org upanishads02ml). His notes cite Shankara, Shankarananda and Vijnanatman.
  - Siddheshwar Varma (1916, archive.org in.ernet.dli.2015.282382), with notes on the commentators.
  - I found no public-domain full English translation of Shankara's Shvetashvatara bhashya. Gambhirananda's translation is under copyright and was not used.
- **Maitri:** Müller SBE 15, with notes drawing on Ramatirtha, and T. R. Srinivasa Ayyangar's Adyar translation (1941, archive.org in.ernet.dli.2015.56840), which follows Upanishad-brahma-yogin.
- **Maha, Niralamba and Skanda:** the same Adyar translation (Upanishad-brahma-yogin). It may still be under copyright, so it is paraphrased only.
- **Maitreya, Niralamba, Skanda, Narayana and Amritabindu:** K. Narayanasvami Aiyar, *Thirty Minor Upanishads* (1914), on wisdomlib.
- **Shiva Sankalpa:** R. T. H. Griffith, *Texts of the White Yajurveda* (1899), archive.org.
- **Maha 6.71 parallel:** Yoga Vasishtha, Pansikar edition with the Tatparya-prakasha commentary (archive.org), searched as Sanskrit OCR.
- **Not used:** sacred-texts.com and sanskritdocuments.org both returned Cloudflare bot challenges. The Gita Supersite was not touched.

## Data errors (fix in the data)
1. **up_narayana.16: wrong text and reference.** "Shantakaram bhujagashayanam" is not in the Narayana Upanishad. Aiyar's translation of that Upanishad has five short prose sections, so there is no "16-17". It is the dhyana verse recited before the Vishnu Sahasranama, and I could not verify where it originally comes from. Our own our_note already says it is not part of the Upanishad. Re-label it, e.g. "Traditional Vishnu dhyana shloka". attribution_ok is false, and the entry has no commentaries.
2. **up_taittiriya.103: mistranslation.** "Yad vai tat sukṛtam" means "that which is self-made (self-caused)", following the opening of 2.7, where Brahman made itself. It does not mean "that which is well made". Suggested: "That which is self-made is indeed the essence; having found that essence, one becomes joyful." translation_ok is false. Our our_note is already correct.
3. **up_taittiriya.158: corrupted Sanskrit.** The field begins with two stray section headings, "सदाचारप्रदर्शनम् । ब्रह्मानन्दानुभवः", and lacks a space before "न कञ्चन". The verse proper is given in the entry.
4. **up_maitrayani.8 and up_maitrayani.13: mixed numbering.** Both lines are in Müller's Maitri 1.4: the gnats, and then the frog in the well at the end of the same paragraph. Our refs say 1.4 and 1.7. "1.7" matches the Adyar recension's paragraphs 1.2-7, so pick one numbering system. Likewise, the three mind verses (up_maitrayani.78, .80 and .86) are 6.34 (3), (5) and (11) in Müller but Prapathaka IV.3 in the shorter Adyar recension.
5. **up_shwetashwetar.3.20: mixed readings.** Our Sanskrit combines the Katha reading "akratuḥ" with the Shvetashvatara reading "īśam". Müller and Röer both say the Shvetashvatara reads "akratum", which describes the Lord as desireless rather than the seer as free of grasping. Our translation follows the Katha reading. Varma also records "by the clarity of the senses" as an alternative to "by the Creator's grace".
6. **up_shwetashwetar.3.17: variant reading.** "Suhṛt" (friend) is a variant. Müller and Röer read "śaraṇaṃ bṛhat" (great refuge or support), and Varma lists "friend" as another reading. Our our_note mentions this, so keep the caveat whenever the reading calls God "friend".
7. **up_taittiriya.54: softened and generalised.** "Bhiyā deyam" is literally "give with fear": Shankara says with fear, Sayana says fear of sin. Our "give with respect" softens it; "with humility" or "with awe" is closer. "Better than us" leaves out the text's "brahmanas". The Sanskrit also starts with the tail ("no itarāṇi") of the previous sentence.
8. **up_taittiriya.149: translation longer than the Sanskrit.** The translation includes "breath rests in the body", which is the next clause and is not in our Sanskrit field.
9. **up_shiv_sankalp.1 and .6: source and listener.** These are Vajasaneyi Samhita 34.1 and 34.6. The listener should be "his own mind (in prayer)" rather than "God".
10. **up_maha.536 and .539: unconfirmed verse numbers.** I could confirm only that both are in Maha Upanishad ch. 6, in the Adyar translation's 6.66-82 block, spoken by Ribhu to Nidagha. The exact numbers 6.68 and 6.71 were not confirmed, because the Sanskrit source was behind a bot challenge. The Yoga Vasishtha parallel (Upashama 5.18.61) has the same first line ("ayaṃ bandhur ayaṃ neti...") but a different second half, without "vasudhaiva kuṭumbakam".
11. **Niralamba numbering.** Ours matches the Adyar numbering (jati = 10, svarga/naraka = 16-17). Aiyar numbers them as questions 21 and 28-29.
12. **Paraphrase lines that pick one school or drop key words:**
    - up_mundaka.3.2.8 ("merge in the highest") follows Shankara only. Madhva says the freed soul keeps its identity.
    - up_mundaka.2.2.4's line leaves out Om and Brahman.
    - up_mundaka.3.2.4's line leaves out "by these means".

## Verses with weak or thin sources
- **up_narayana.16:** no commentary, and its origin is unverified.
- **up_maha.536:** only Upanishad-brahma-yogin via the Adyar translation. This Upanishad has no other classical commentary.
- **up_shiv_sankalp.1 and .6:** only Griffith's notes. I did not consult the Sanskrit commentaries of Uvata and Mahidhara.
- **Maitreya 2.1-2.2:** I found no commentary on the Maitreya Upanishad itself. The second voice is Upanishad-brahma-yogin on the identical verses in the Skanda Upanishad (Adyar vv. 10-12), which is a useful cross-reference.
- **Taittiriya:** every commentary is Advaita (Shankara, Sureshvara, Sayana). I found no Ramanuja or Madhva commentary on the Taittiriya online in this pass.
- **Shvetashvatara:** Shankara's views come second-hand, through Röer's and Müller's notes.
- **Prashna and Mundaka:** the Madhva "gists" are often the translator Vasu's notes, not Madhva's own bhashya, and are labelled that way. Vasu's notes sometimes take a Theosophical turn.

## Cautions for editors
- **Death and decay:** up_maitrayani.8 (the whole world perishing; the surrounding passage describes the body in disgusting terms), up_mundaka.3.2.8 (often read at funerals), up_shwetashwetar.4.15 (the noose of death), up_prashn.23 (life leaving the body) and up_taittiriya.125 (Shankara places this regret at the approach of death).
- **Children and family:**
  - up_shwetashwetar.4.22 asks Rudra not to harm "our little ones". It could devastate bereaved parents.
  - up_taittiriya.50 ("do not cut off the line of your family") and the full list in up_taittiriya.43 (begetting) can hurt readers facing infertility or who are child-free. Shankara even mentions rites to obtain a son.
  - up_taittiriya.52 (treat your parents as gods) is hard for abuse survivors. Pair it with up_taittiriya.53, which says to follow elders only in their good conduct, as Sayana's Parashurama example shows.
- **Mind-blame risk:** the Maitri 6.34 mind verses (up_maitrayani.78, .80, .86) can sound like "your suffering is in your head". Keep them away from readers with depression, OCD or trauma, or frame them gently.
- **Weakness:** up_mundaka.3.2.4 ("not won by the weak") can wound depressed or chronically ill readers. "Strength" there is inner resolve.
- **Caste:** up_niralamb.13 is a strong anti-caste verse, but it must not be used to deny lived discrimination. up_mundaka.1.2.12, up_taittiriya.54 and up_taittiriya.56 name brahmanas in the original, so keep the readings inclusive.
- **Absolution misuse:** up_taittiriya.125 (freedom from regret) must not read as excusing someone who has harmed others and not made amends.
- **Sectarian framing:** up_skand.1 and up_maitreya.24 are strongly non-dual ("I am Shiva"). up_narayana.16 is a Vaishnava devotional verse, not Upanishad.
