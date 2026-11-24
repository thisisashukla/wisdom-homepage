# corpus_bg_3: notes (Bhagavad Gita 13.9 to 18.78, 61 verses)

## What was done
- 10 entries that were empty (18.45, 18.49, 18.53, 18.54, 18.56, 18.57, 18.58, 18.62, 18.64, 18.78) were researched and written from scratch.
- The other 51 entries had been sourced entirely from the Gita Supersite (heritage.iitk.ac.in), which we may not use. Every commentary gist was checked again against public-domain or freely hosted archive.org texts and rewritten where the wording or content differed. Sources were replaced with:
  - Shankara: A. Mahadeva Sastri, 2nd ed. 1901, https://archive.org/details/bhagavadgitawith00maharich
  - Ramanuja: A. Govindacharya, 1898, https://archive.org/details/gita-bhasya
  - Sridhara: Swami Vireswarananda, Ramakrishna Math 1972, https://archive.org/details/bhagavad-gita-with-gloss-from-sridhar-swami-by-swami-vireshvaranand-ramakrishna-math (under copyright; paraphrased only)
  - Swami Sivananda (Divine Life Society), https://archive.org/details/the-bhagavad-gita-swami-sivananda (modern; paraphrased only)
- Fields that relied on Gambhirananda's or Adidevananda's translations (seen only on the Supersite) were rewritten from the archive texts (13.33, 15.15, 18.28, 18.35).
- Result: 61/61 entries filled. All 61 have 2 or more sourced commentaries (60 have four; 16.15 has three because Sastri prints no Shankara comment on it). There are no Supersite URLs left.

## Data errors
1. **Chapter 13 numbering is inconsistent within each record.** For all six ch.13 verses, `id` uses the 35-verse count (Arjuna's opening question counted as 13.1) but `ref` uses the 34-verse count used by Gita Press and the classical commentaries: bg.13.9 = 13.8, 13.25 = 13.24, 13.26 = 13.25, 13.28 = 13.27, 13.29 = 13.28, 13.33 = 13.32. Both counts are valid, but the app should use one and state it. Each `verified_ref` records both.
2. **The Sanskrit field runs the speaker tag into the verse** in bg.14.22 ("श्री भगवानुवाचप्रकाशं") and bg.16.1 ("श्री भगवानुवाचअभयं"). Split them or remove the tag.
3. **our_note attributes things to Shankara that his text doesn't say:**
   - 13.25: the ranking of the three paths into "best / middling / others" comes from Anandagiri's footnotes (marked "A." in Mahadeva Sastri), not from Shankara.
   - 13.33: "not touched by the body's actions and their fruits" belongs to the neighbouring verse. On this verse Shankara says only that the self, like space, is not soiled.
   - 16.1: "fearlessness is first" is just list order. Shankara calls fearlessness, purity and steadfastness in knowledge and yoga together the divine nature "par excellence".
   - 15.7: "a mode of the Lord" is Ramanuja's general doctrine. It is not in his comment on this verse, which says "an eternal portion".
   - 17.8: "know your guna by your taste in food" is not in any of the four commentaries on this verse.
4. **Lines and translations that overstate or shift the meaning:** 16.17 (the line says "give for show"; the verse is about sacrifices/worship done for show); 17.21 (the line says it "isn't really giving"; the verse calls it a lower, rajasic kind of giving); 16.5 (the line turns a reassurance to Arjuna into a promise to every reader); 14.8 (the line adds "too much" to sleep); 16.1 (the line drops sacrifice and austerity and turns jñāna-yoga-vyavasthiti into "steady learning"); 16.2 (the line drops renunciation and peace); 18.23 (niyatam rendered "steady"; it means obligatory); 18.78 (the line "wisdom and skilled effort together" is a modern allegory, and "steady justice" is loose for nīti).
5. **18.45 misuse field:** "'your own work' means the work that fits your nature, not birth" is a modern reading. Shankara, Ramanuja, Sridhara and Sivananda all read svakarma as varṇa duty in 18.41-48. Keep the misuse guard, but don't present it as what the commentaries say.

## Weak or partial sources
- 16.15 and 17.19: Mahadeva Sastri gives only the verse, with no Shankara comment. 16.15 has no Shankara gist. On 17.19 the gist says plainly that it reflects his rendering of the verse.
- 18.27 and 18.28: the OCR of the cited archive scan is unreadable on these pages. Shankara's comment was read in a cleaner OCR of the same 1901 edition that the earlier agent had downloaded. Its archive.org item was not identified, so the cited URL is the bhagavadgitawith00maharich scan of the same edition.
- Shankara's comments are very short in Sastri on 14.8, 17.8, 18.32 and 18.39. The gists say so.
- Govindacharya's 1898 English is archaic and sometimes odd (e.g. "Rajasa-Purpose" printed in the 18.35 comment where tamasic is meant). The gists follow the sense.
- Sridhara via Vireswarananda and Sivananda are copyrighted. Everything from them is paraphrased.

## Cautions for editors (corpus use)
- **Grief / bereavement:** 13.9 (reflect on the "evil" of death and disease), 18.54 ("neither grieves" describes the realised person, not a rule), 14.25 (Ramanuja's even-mindedness at a son's birth or death), 15.5 (Sridhara names attachment to children as the fault to overcome) and 18.49 (Shankara: unattached to children and spouse) should not go into early days of a grief plan.
- **Self-harm language:** 13.29's "slayer of the self" and Sridhara's citation of the sunless worlds; 17.19's self-torture, where Sivananda lists graphic self-mortifications. Never use these with a reader who mentions self-harm.
- **Depression, burnout and illness:** 14.8, 14.13, 18.28, 18.35 and 18.39 name sleep, sloth, despondency and inertia as tamas. Sivananda's tone is harsh ("must be destroyed at all costs"; the tamasic person as "sinful"). Never imply that a struggling reader is tamasic.
- **Memory loss:** 15.15. Shankara and Sivananda tie the loss of memory to sin. Keep it away from dementia or brain-injury contexts.
- **Misuse as licence or control:** 18.56 (Shankara and Sivananda say grace covers even forbidden acts; leave this out), 18.58 ("you will perish" if you don't listen; can be used to demand obedience), 18.62 (Ramanuja: refuge means carrying out the Lord's directions, including the war).
- **Caste:** 18.45 sits inside the varṇa passage (see data error 5). 16.15 is about pride of birth.
- **Triumphalism:** 18.78's victory language can sting someone who has just failed.
