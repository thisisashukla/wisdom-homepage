# corpus_bg_2 notes (Bhagavad Gita 5.19 to 12.19, 62 verses)

## Status
- All 62 entries filled, same order as the input. 42 have 4 sourced commentaries and 20 have 3, so all 62 have at least 2.
- Commentaries are sourced only from archive.org full texts, and every gist was checked against them:
  - Shankara: A. Mahadeva Sastri, 1901, public domain. https://archive.org/details/bhagavadgitawith00maharich
  - Ramanuja: A. Govindacharya, 1898, public domain. https://archive.org/details/gita-bhasya
  - Sridhara: Swami Vireswarananda, Ramakrishna Math, 1972, in copyright. https://archive.org/details/bhagavad-gita-with-gloss-from-sridhar-swami-by-swami-vireshvaranand-ramakrishna-math
  - Swami Sivananda: Divine Life Society, in copyright. https://archive.org/details/the-bhagavad-gita-swami-sivananda
- The earlier draft cited the Gita Supersite (heritage.iitk.ac.in) for 54 entries. All those links are gone. 18 gists from Madhva (12) and Abhinavagupta (6) were dropped. They had been read only on the Supersite, and I found no public-domain English edition to check them against. The affected entries say so in `research_note`.
- Entries 12.11 to 12.19 (8 verses) were new in this pass. The other 54 kept their earlier analysis. Their gists were checked against the texts above and about 40 were reworded or shortened to stay within 40 words or to match the public-domain wording.

## Cautions on sources
- Sridhara (Vireswarananda) and Sivananda are **in-copyright** books hosted on archive.org. They are used for paraphrase only. If the editor wants public-domain sources only, drop those gists: every entry still has Shankara and Ramanuja.
- Sastri's 1901 Shankara is sometimes abridged against the Sanskrit bhashya. Example: on 12.15 it glosses only *harsha* (joy). The `our_note` claim that Shankara glosses *amarsha* as "intolerance" comes from the Sanskrit or a modern translation, not from Sastri.
- The OCR in all four texts is noisy. Several verse locations were confirmed by hand: Shankara 12.3-9, 12.13-19 and 11.41-42; Ramanuja 7.1, 10.9, 6.20-23 and 6.33-34; Sridhara 6.1 and 12.3-4.

## Data errors (wrong setting, line or record)
- **bg.12.8 setting is wrong.** It says Krishna "begins his ladder with the simplest instruction". 12.8 is the highest and hardest rung; 12.9-11 are the easier fallbacks.
- **bg.12.4 setting is wrong.** It describes the ladder of practices, but 12.3-4 are about those who worship the formless Imperishable, who "also reach me". The verse also completes a sentence that starts in 12.3.
- **bg.7.18 line misstates the verse.** "The one who loves me is my very self" should be "the one who knows me" (jñānī). The misuse text ("Grace doesn't erase responsibility...") looks copied from another record.
- **bg.11.41 record duplicates bg.11.42.** Its translation covers 11.41-42 together. Either cut it to 11.41 or turn it into a range record and retire 11.42.
- **bg.12.19 line:** "rooted in steadiness, not status" drops *aniketa* (without a fixed home), and no commentator reads it as being about status. Suggest: "not tied to home or comfort, steady in mind".
- **bg.10.1 line:** "because you are dear to me" makes being dear the reason. The verse says "to you who delight (in hearing)". Govindacharya's Ramanuja does render it "(My) beloved", so this is minor.
- **bg.12.17 line:** "letting go of good and bad outcomes". All four commentators read *śubhāśubha* as good and bad deeds (merit and demerit), not outcomes.
- **Lines that soften rebirth:** bg.6.43 and bg.6.45 turn "former body / many births" into "this life / a long time". These are applications; label them as such.
- **bg.8.6 and bg.8.8 lines** generalise a teaching about the moment of death into "thought shapes who you become". This is a fair extension, but it is not the plain sense.
- **Sanskrit field runs the speaker label into the verse** ("...उवाच" with no break): bg.6.1, 6.33, 7.1, 10.1, 11.50, 11.51, 12.2.
- **prasang is null** for 16 verses: bg.6.39, 7.1, 7.7, 7.14, 7.18, 8.14, 9.6, 9.17, 10.1, 11.42, 11.50, 11.51, 11.54, 12.2, 12.6, 12.8.
- **misuse is empty** for 48 of 62 verses. Suggested text is in `research_note` for 12.14 and 12.16.
- **bg.12.15 our_note:** see the Sastri caution above. "Ramanuja: feelings directed at others" is roughly supported by Govindacharya.
- **Incomplete sentences:** 5.28 (starts in 5.27), 6.20 and 6.22 (main clause is in 6.23), 12.4 (starts in 12.3), 12.18 (ends in 12.19). A reading built on one of these alone needs the neighbouring verse.

## Cautions for readings (grief and distress)
- **bg.6.22:** Ramanuja's own example of the sorrow that does not shake the yogi is the death of good sons. Never use it for a bereaved parent or early in a grief plan.
- **bg.12.17:** "does not grieve". Ramanuja names the loss of wife, son or wealth. Not for fresh grief.
- **bg.8.6 and 8.7:** the last thought at death decides what follows. This can make a bereaved reader fear a loved one "failed" at the end (sudden death, dementia, sedation). Sridhara notes that the dying cannot make an effort, which is why the teaching asks for lifelong practice. Use with great care, and never in suicidal or end-of-life contexts.
- **Rebirth frame:** 5.19, 6.43, 6.44 and 6.45. Do not turn these into "you will meet again".
- **Caste language:** 5.19 continues 5.18 ("dog-eater"), and Shankara and Sridhara debate Gautama's rules on honouring brahmins. 7.11 (Sridhara: permitted desire is "within marriage, for a child") is narrow and traditional. 8.7 (Sivananda: "fight" means the duties of one's caste) should not be carried into modern readings.
- **Abuse risk:** "the same in honour and dishonour" and "not shaken by the world" (6.7, 6.9, 12.15, 12.18-19) must not be framed as "put up with mistreatment". Sivananda on 12.13 and 12.16 praises not being troubled "even if beaten"; do not use those lines.
- **Violent imagery:** 11.24 sits beside the crushing imagery of 11.26-30. Pair it with 11.49-51, where Krishna reassures Arjuna.
- **Homelessness:** 12.19 *aniketa* is literal homelessness for Shankara, Sridhara and Sivananda. It may land badly with someone facing housing insecurity.
- **Karma framing:** Sivananda on 12.14 says contentment comes from seeing what happens as the fruit of past actions, which can feel blaming to someone suffering.
