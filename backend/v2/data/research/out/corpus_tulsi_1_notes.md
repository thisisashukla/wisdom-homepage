# corpus_tulsi_1: research notes

47 passages: Dohavali (15), Gitavali (5), Hanuman Bahuk (9), Kavitavali Uttar Kand (13), Vinaya Patrika (5).
All 47 have entries. 44 have 2 or more sourced commentaries. The 3 with one are tulsi_dv.143, tulsi_hb.40 and tulsi_kv.7.37.

## Sources used (all read as archive.org OCR full text, paraphrased only)
- Dohavali: Gita Press with Hanuman Prasad Poddar's Hindi bhavartha (two scans), plus Kali Prasad Shastri's *Kaumudi* tika.
- Kavitavali: Gita Press Hindi meaning (Indradev Narayan), plus Shrikant Sharan's *Siddhanta-tilak*. A scholarly study of how the Kavitavali was transmitted (Univ. of Sofia PDF) gave the structure and the Bahuk's link to it.
- Hanuman Bahuk: Gita Press tika by Mahavir Prasad Malaviya "Vaidya", plus Anjani Nandan Sharan's *Piyush-varshini*.
- Gitavali: Gita Press Hindi meaning, plus Shrikant Sharan's *Siddhanta-tilak*.
- Vinaya Patrika: Gita Press bhavartha, plus Murari Madhusudan Thakur's English rendering (the scan is stamped public domain; still paraphrased).
- Wikipedia's Tulsidas article gave background only (the works, the biography, the Bahuk's date).
- Not used: kavitakosh.org (blocked), Allchin's translations (copyright, not freely online). The Baijnath Kavitavali tika and the Vinai Piyoosh OCR were too garbled to cite.

## Data errors: wrong references (fix these)
| id | our ref | correct ref | evidence |
|---|---|---|---|
| tulsi_dv.101 | Dohavali 101 | **Dohavali 147** | Gita Press scan 2 prints 147 after the doha. GP doha 101 is "sankara priya mama drohi". Kaumudi has it as 146. |
| tulsi_dv.143 | Dohavali 143 | **Dohavali 175** | Gita Press scan 2 prints 175, and the Kaumudi index lists it as 175. GP doha 143 is "jani rama seva sarasa". |
| tulsi_dv.282 | Dohavali 282 | **Dohavali 277** | Both Gita Press and Kaumudi have 277. It opens the chataka series, and 278 follows it. |
| tulsi_kv.7.129 | Kavitavali 7.129 | **Kavitavali Uttar 127** | The Gita Press meaning ends at 127. Shrikant Sharan calls it "chhand 127, arata pala kripala". |
| tulsi_kv.7.182 | Kavitavali 7.182 | **Kavitavali Uttar 129** | It comes straight after 128 (Prahlad and the pillar). GP 182 is a lament about Kashi. |

The ids encode the wrong numbers. If the ids are kept, at least fix `ref`/`ref_label`. Note that the corrected kv 7.129 would clash with the current id tulsi_kv.7.129.

Refs that are incomplete but not wrong: tulsi_gv.2.52 should read "Gitavali, Ayodhya Kand 52". tulsi_vp.72 should read "Vinaya Patrika, pada 72". Neither has its number in the ref field. tulsi_kv.7.53, 7.57 and 7.73 lack "Uttar Kand" in the ref label, but the numbers are correct.

## Translation and line issues
- **tulsi_dv.152 (translation_ok = false):** our version reverses the causation. Both commentaries read it this way: when mind, speech and deeds are straight, every means that gives birth to love for Ram becomes straight and easy. Ours says straightness is born *of* love. Rewrite both the translation and the line.
- tulsi_dv.84: drops the conditional "if I am yours alone, then...", which both commentaries keep. Minor.
- tulsi_dv.95: there is a textual variant. Gita Press reads "ramahi daru" (fear Ram); Kaumudi reads "ramahi ura karu" (hold Ram in your heart). "Without conditions" for *nirupadhi* is fine; Gita Press glosses it as "without guile".
- tulsi_dv.96: Kaumudi reads "saba dosha" (all faults) where Gita Press has "guna dosha".
- tulsi_dv.528: our line adds "out of love". The doha's stated reason is "knows his own dharma".
- tulsi_vp.34: "very needy" softens *ati svarathi*. Gita Press and Thakur both give "very selfish/self-seeking".
- tulsi_kv.7.36: "I swear by Ram" follows Gita Press. Shrikant Sharan reads *saunha* as "turned toward Ram", not as an oath.
- tulsi_kv.7.67: "stubborn talker" is loose. The commentaries give "mischievous, a braggart/liar".
- tulsi_hb.40: Gita Press reads *ramapani paka* as "reformed by Ram's hands", not "made fit for Ram's hand". Minor.
- tulsi_hb.17: our line makes the name generic ("the one you trust"). In the verse it is Hanuman's name.
- tulsi_vp.69: the qualities listed belong to the **Name**, not to Ram himself. Writers should keep "the Name is...".
- tulsi_hb.34: the verse calls Hanuman "Bholanath", a Shiva epithet. The listener is still Hanuman.

## Cautions an editor should see
1. **tulsi_gv.6.7 (Ram after Lakshman falls):** "I will go with my brother" means following Lakshman into death. Shrikant Sharan glosses it as going with him to Yama's realm. Do not use this verse with readers who express hopelessness or suicidal thoughts. If it is used, include the rescue that follows (Hanuman and the herb). The pada before it is a list of self-blame (father, wife, Jatayu).
2. **tulsi_kv.7.53:** both the sequence (51 is about Yama's messengers) and Shrikant Sharan put this "where no one is with you" verse at death and after. our_note is right. Avoid it in fresh grief.
3. **tulsi_gv.2.52 (Kausalya with the little shoes):** very strong for empty-nest or separation grief. For a parent whose child has died it may be overwhelming, because Ram is alive and comes back in the story.
4. **Hanuman Bahuk 29, 30, 40:** these verses suggest that illness comes from "my own sin" or "a curse" (30), or that one is "reaping the fruit" of the past (40). They also contain bitter complaint, such as "you watch me die like a sparrow children play with" (29). Our excerpts keep only the tender halves, so writers should not call these verses serene. Never imply that illness is deserved. Keep the existing "not a substitute for medical care" misuse notes.
5. **tulsi_dv.424:** the verse explicitly approves fleeing and self-defence, and only discourages striking back. For abuse contexts, lead with the first half so it is not heard as "endure it".
6. **tulsi_dv.405 (betrayal):** the next doha (406) is harsh about people who trust betrayers. Don't pair the two.
7. **tulsi_dv.278 and 282 (chataka):** these could be heard as "keep waiting on someone who ignores you". The misuse note on 278 is good; add a similar one to 282.
8. **Disability and caste lists** (gv.5.42, vp.69: "eyes to the blind, limbs to the lame, lineage to the low-born"): the intent is inclusive, but the language frames disability as a lack.
9. **Prahlad verses (kv.7.48, 7.128):** a father tries to kill his child. Handle with care for survivors of parental abuse.
10. **tulsi_dv.143 / Dohavali 175:** the Ahalya story involves deception and a curse. Avoid retelling the details. The verse also promises wish-fulfilment, so soften that.
11. **Biography:** Shrikant Sharan disputes the popular claim that Tulsidas was "abandoned at birth" (on kv.7.73). Wikipedia records it from the hagiography *Mula Gosain Charita*. Writers should present it as tradition, not fact.

## Weak or missing sources
- tulsi_dv.143 (=175): only Gita Press could be read cleanly. The Kaumudi text for it was not found in the OCR.
- tulsi_hb.40: only Gita Press. The Piyush-varshini OCR for it was not found.
- tulsi_kv.7.37: only Gita Press. Shrikant Sharan's own comment was not found; I saw only a cross-reference to it.
- The OCR of the Gita Press Dohavali scan 1 and the Hanuman Bahuk is jumbled across page breaks, which is how the misnumberings were caught. Every corrected number was confirmed in a second edition.
