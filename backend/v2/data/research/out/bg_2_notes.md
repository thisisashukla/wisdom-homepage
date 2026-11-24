# bg_2 editor notes (Bhagavad Gita 6 to 18, 44 verses)

## Coverage and sources

- **Re-sourced 2026-11-23 (replaces the earlier Supersite-based draft):** every commentary gist was rewritten against archive.org full texts: Shankara (A. Mahadeva Sastri, 1901), Ramanuja (A. Govindacharya, 1898), Sridhara (Swami Vireswarananda) and Swami Sivananda. Vireswarananda and Sivananda are still in copyright, so they are paraphrased only. No Gita Supersite URL remains. Madhva (8 gists) and Chinmayananda (7) were dropped: Madhva's only public-domain English copy on hand (Subba Rau, 1906) is unreadable OCR, and Chinmayananda had been read only on the Supersite. Their places went to Sridhara or Sivananda where those were missing.
- Now 175 commentaries: Shankara 44, Ramanuja 44, Sridhara 44, Sivananda 43. 43 verses have 4 and bg.10.41 has 3, because Sivananda gives only a translation there.
- Each verse's comments were located by verse number in the four texts (chapter 13 follows their 34-verse numbering, so our bg.13.8 is their 13.7). The longest bhashyas (Shankara on 18.48 and 18.66) are read in full now, but each gist covers only the gloss on the verse itself, not Shankara's long excursus. Ramanuja's alternative reading of 18.66, cut off in the earlier draft, is now summarised.
- Vedabase is used only for the chapter 13 numbering.
- Rights: everything in `bg_2.json` is paraphrase. Don't feed raw text from the Vireswarananda or Sivananda editions to the writer LLM.

## Data errors (fix in our data)

`translation_ok` is set to false for bg.9.30, bg.18.14 and bg.18.63. In all three the problem is the `line`, not the translation. The other problems below are recorded in each entry's notes with `translation_ok` left true.

1. **bg.13.8: id and ref disagree.** The id is `bg.13.8` but the ref says "Bhagavad Gita 13.7". Both numbers are in real use:
   - 13.8 on Vedabase/Prabhupada, which counts Arjuna's question "prakṛtiṃ puruṣaṃ caiva" as 13.1.
   - 13.7 in our Gita Press-based ref and in all four commentary editions used (Sastri, Govindacharya, Vireswarananda, Sivananda).
   - Pick one convention and label it. Plan copy (success day 4) uses 13.8.
2. **bg.18.14: "setting" is wrong for adhiṣṭhāna.** This word appears in the line, in the prasang summary and in the fear-of-failure day 2 copy. Every commentator I read (Shankara, Ramanuja, Sridhara, Sivananda) glosses it as the body, the seat of action, not the surroundings. Also, "providence" for daivam is only one reading:
   - Shankara and Sridhara: the presiding powers that aid the senses.
   - Ramanuja: the Lord within.
   - "The unseen" (used in the line) is the safe wording.
3. **bg.18.63: the line says "I've told you all I know".** The verse doesn't say that. It says this knowledge, more secret than any secret, has been declared to you. Krishna then gives a further "most secret" word (18.64-66). Suggested line: "I have shared this deepest knowledge with you. Reflect on it fully, then do as you choose."
4. **bg.18.61: the misuse note misstates the second half.** It calls it "nature moving us". The commentators read it as the Lord moving beings through his māyā (Ramanuja: in keeping with their qualities). Sridhara presents this as Krishna's own view, going beyond "nature" and "karma". The advice to use only the first half on the card still stands.
5. **bg.9.30: the line drifts from the verse.** "The moment you turn ... count yourself among the good" makes the verdict instant and self-awarded. The verse says such a person *should be regarded* (mantavyaḥ) as good because his resolve is right, and 9.31 says he *soon becomes* righteous. The guilt day 4 copy ("is to be counted among the good, because their resolve is now right") is closer. Align the line with it.
6. **bg.6.40: "my friend" for tāta**, in both the translation and the line. Shankara and Sivananda gloss it as son (a disciple counts as a son), and Sridhara as an affectionate address. The losing-hope day 3 copy already says "my dear". Align the data.
7. **bg.9.27: line says "endure" for tapasyasi.** Tapas is chosen discipline, not suffering one undergoes. Use "practise".
8. **bg.12.13 translation and bg.14.24 line: "even in pain and pleasure" is ambiguous.** It reads as "even when in pain". The meaning is "the same in pain and pleasure" or "even-minded in pain and pleasure". Both verses are also grammatical fragments that finish in the next verse (12.14, 14.25).
9. **bg.18.30: "when to act and when to wait"** (in the line and the decision-making day 4 copy) stretches pravṛtti/nivṛtti. Shankara and Sivananda read the pair as the path of action vs the path of renunciation. Sridhara reads it as engaging in right action and refraining from wrong. Fine as an application, but it isn't the classical sense.
10. **Minor wording.**
    - 6.26 line and plan copy add "gently". The verse says "restrain", and Ramanuja says "with effort". Acceptable as a teaching emphasis.
    - 18.66 line says "Don't worry" for mā śucaḥ ("do not grieve").
    - The guilt day 6 copy calls 18.66 "Krishna's last counsel". He keeps speaking through 18.72, so "final teaching" is safer.
    - The 6.17 line's "work and play" stretches vihāra, which Shankara glosses as walking or moving about.
11. **Sanskrit formatting.**
    - The speaker tag runs into the verse in 6.35, 6.37, 6.40 and 18.73 (e.g. "श्री भगवानुवाचअसंशयं").
    - 6.32 has "सः योगी" where the sandhi requires "स योगी" (Gita Press prints "स योगी").
12. **Missing prasang (null):** bg.9.18, bg.12.7, bg.18.61. Suggested links are in each entry's `research_note`.
13. **FYI, not errors.**
    - 16.4: the earlier draft's 'atimāna' variant (in Shankara's and Ramanuja's texts) rested on the Supersite and is withdrawn. Govindacharya's Ramanuja glosses abhimāna, as Gita Press prints.
    - 18.65's first half nearly repeats 9.34.
    - 18.47's first half repeats 3.35, as the comparison day 5 copy correctly says.

Speakers, listeners and settings were all correct. Arjuna speaks 6.34, 6.37 and 18.73. Krishna's answer runs through 6.36. Sanjaya takes over from 18.74.

## Cautions an editor should see

- **Caste (18.46, 18.47, 18.48; also 17.20).** The classical readings are explicitly varna-based:
  - Shankara on 18.46 says "for each varna".
  - Sivananda says "according to his caste".
  - Sridhara applies 18.47-48 to Arjuna's warrior duty, including killing kin.
  - Ramanuja reads 18.47-48 differently again: karma yoga vs jnana yoga.
  - Our misuse note ("not caste or family script") is a modern reinterpretation. Keep it, but don't let readings claim the tradition says so.
  - On 17.20, the classical "worthy recipient" is a learned brahmin. Sridhara names a Brahmin outright. Use a modern need-based reading and say it is an application (the earlier draft credited this to Chinmayananda, who is now dropped).
- **Classical readings that could hurt a reader in distress.** These are recorded in the entries; keep them out of the writer's context for sensitive plans:
  - Ramanuja on 12.13 (loneliness day 6): those who hate and harm you do so under the Lord's direction, in keeping with your own past faults. This is dangerous for anyone being abused.
  - Ramanuja on 6.32 and 14.24: a son's birth or death seen with the same detachment. Not for grief.
- **Violence and fatalism.**
  - 11.33 (new-beginnings day 6) is the most violent verse in the group. The warriors are "already slain by me", and Ramanuja calls them wrongdoers marked for death. Keep readings on "rise and play your part". Never quote the second line.
  - 18.61's second half is the puppet/machine image.
  - 18.14 leads into 18.17 ("does not kill even if he kills"); don't extend the reading there.
  - The plan copy and misuse notes handle these well.
- **Grief and death imagery.**
  - 9.26 (grief day 6): the commentators read it strictly as offering to the Lord. The plan's link to memorial offerings (water, flowers, a lamp) is a gentle application and reads well, but it is an application.
  - 12.7 (devotion day 3) speaks of the "ocean of death", and our line adds "drowning".
  - 6.37 and 6.40 are classically about dying before the goal and about rebirth.
- **Guilt plan (9.30, 9.31, 18.66).** These can read as cheap absolution. The plan copy already pairs them with repair (amends, an act of repair, "once you've done your part"); keep that. 18.66 is among the most debated verses; Govindacharya notes it is the 'charama-śloka' of Ramanuja's school. Ramanuja's main reading keeps the disciplines and gives up their fruit, ownership and doership, not action. That supports our misuse note.
- **Other single-verse cautions.**
  - 6.17 (stress, running-on-empty): food-moderation framing for readers with disordered eating.
  - 9.22 (losing-hope day 4): avoid promising material outcomes. Ramanuja reads yoga-kṣema as reaching God and not returning to bondage, while Sridhara includes wealth.
  - 18.37 (joy, cant-get-started): "bitter first" must not become "endure harm".
  - 18.38: the classical tone is ascetic (Sridhara: pain here and hereafter; Shankara and Ramanuja mention hell); keep the plan's modern examples.
  - 6.34 (overthinking day 1) is Arjuna's objection, not the answer; the reading should signal that 6.35 answers it.
  - 18.48 sits in a new-beginnings plan; the day's note already says leaving a harmful place can be right.
