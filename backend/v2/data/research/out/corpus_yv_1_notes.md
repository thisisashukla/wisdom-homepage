# corpus_yv_1 notes (45 Yoga Vasishtha verses, Vairagya and Mumukshu prakaranas)

## Sources used
- Nirnaya Sagar text with Anandabodhendra Sarasvati's Tatparya-prakasha, Pansikar ed. 1937, Part 1 (archive.org `HSgy_yoga-vasishtha-of-valmiki-with-vasistha-maha-ramayana-tatparya-prakasha-part-1-e`, CC0 scan). Every verse was found in it, and its sarga and verse numbers match our ids. This is the only classical commentary.
- V. L. Mitra's English translation, vol. I, 1891 (archive.org `in.ernet.dli.2015.62046`). Every verse was located in it.
- Both are OCR text: the Sanskrit commentary is often printed in two columns that get interleaved, and parts are garbled. Where I could not cleanly separate a gloss for a verse, I said so and used the surrounding Sanskrit text instead, labelled "Context in the Sanskrit text".
- No wisdomlib, Gita Supersite or kavitakosh pages were used.

All 45 entries have 2 sourced notes (one Anandabodhendra or Sanskrit-context note plus one Mitra note). None has 3. The YV has no second classical commentary, and I did not add modern copyrighted abridgements.

## Data errors / corrections
1. **yv.1.31.17: `our_note` overstates.** It says Rama "is not asking to renounce". Mitra reads the second half as asking for a way to escape misery *either by engaging in affairs or by renouncing them*. The same sarga then ends (vv. 21-26) with Rama vowing to stop eating and drinking, stop all action, and give up his body if he gets no answer. Reword the note to say he leaves both options open.
2. **yv.1.11.37: `prasang` is null.** Link it to the "Rama comes home from his pilgrimage" story. The speaker, Vishvamitra, is correct: in this sarga the king speaks at vv. 29-31, Vasishtha at 32-33 and Vishvamitra at 34-37.
3. **yv.1.16.25: the line softens the image.** Anandabodhendra glosses *cikitsyam* as "to be removed like a disease", but our line says "Tend to it with care", which sounds like nurturing. Suggested line: "Your world rises and falls with your mind. Treat it like an illness that needs steady care." Also, *tasmin sati* means "when it exists", not "while it is active". This is minor.
4. **yv.1.17.43: "worry" can mislead modern readers.** The commentary glosses *cintā* as dwelling on sense objects, citing Gita 2.62. It does not mean anxiety. Our note already says this, but the translation and line use "worry" without qualification. The line also says "most sorrow" where the verse says "all".
5. **yv.2.5.20: the commentator parses the second half differently.** For Anandabodhendra, the people fortune turns away from are those who have not looked at the best examples, such as Vishvamitra, who succeeded by effort. Our translation has "those who look only to the unseen". Ours is a possible reading, but it isn't his. "Burnt-out minds" also carries a modern clinical sense; "defeated" or "ruined minds" would avoid it.
6. **yv.2.5.12: the example is medical.** In the commentary, yesterday's fault is like indigestion, cured by today's fasting. Our translation says "good deeds", where *guṇaiḥ* means good qualities or remedies.
7. **Mitra's numbering differs in places.** Our numbers follow the Sanskrit and are correct: 2.4.12 is Mitra's v. 13; 2.7.21 is Mitra's v. 31 (his ch. VII is renumbered); 2.13.72 is Mitra's v. 73; 1.30.17 is Mitra's v. 16. Mitra also loses or misreads things in a few places: at 2.6.18 he drops *anudvegavān* ("the calm one wins"); at 2.5.5 he calls the two rams "fortune and exertion", where the Sanskrit makes both of them effort.
8. **The `ref` field is just "Yoga Vasishtha" for most verses.** Only `ref_label` carries the prakarana and verse. yv.1.11.37 has a full ref, so the field is inconsistent.
9. **yv.1.26.39: "buddha" means "the awakened/wise one".** Mitra translates it "really intelligent", and the commentary says such awakening is very rare. Don't present it as the historical Buddha.
10. **yv.1.30.17: our setting mentions King Janaka, but this verse doesn't.** Janaka belongs to the wider run of Rama's questions. That's fine for the setting, but don't put him in the verse's mouth.

## Weak sourcing
For these verses I found no legible commentary gloss for the verse itself, so the second note is the surrounding Sanskrit text or narrative: 1.10.9, 1.26.21, 1.27.19, 1.30.17, 1.31.17, 2.6.2 (gloss is only the opening word), 2.6.21, 2.13.53, 2.13.64 and 2.13.72. The commentary on 2.6.18 is partly garbled. In Mitra, the text of 2.13.78 is cut off at a page break.

## Editor cautions (special care for corpus use)
- **Vairagya 31 context (1.31.7, 1.31.17).** The chapter ends with Rama threatening to starve and give up his body. Never quote or summarise that context to a distressed reader.
- **1.26.11 ("the self strikes the self").** Keep it away from anyone with self-harm history or suicidal thoughts.
- **1.10.9 and Rama's withdrawal generally.** His symptoms (not eating, withdrawal, neglecting duties) overlap with depression. Readings must not suggest these need only spiritual reframing.
- **2.5.30 (idleness fills the earth with poor, beast-like men).** Read literally, this blames poverty on laziness. Keep it out of general plans, as our note already says.
- **The effort-vs-fate cluster (2.4.12, 2.4.17, 2.5.20, 2.6.1-3, 2.7.21) can wound.** It's harsh on fatalism and can feel like blame to people who are grieving, ill, disabled or suffering losses no effort could prevent. Always pair it with 2.6.21 (don't torment yourself over what was beyond your power). 2.6.21 itself mentions death and says not to weep daily, which is risky on Day 1 of a grief plan.
- **1.28.17 and 1.14.10 talk about our own passing and the worthlessness of "mere living".** Avoid them for fresh grief or for anyone saying their life lacks value.
- **2.13.53 ("even an enemy becomes a friend").** Must not be served as advice to stay calm with an abuser.
- **2.13.64 (calm makes food taste sweet).** Avoid for readers with eating disorders.
- **Rama's lament (sargas 13-29) is the question, not the book's answer.** Verses from it should be paired with Vasishtha's later teaching. Most of them are bleak when read alone.
