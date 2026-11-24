# corpus_rcm_3: notes for the editor (59 Ramcharitmanas verses, Kishkindha, Sundar, Lanka)

## Sources used
- Manas Piyush (Gita Press, ed. Anjaninandan Sharan), vol. 5 (Aranya + Kishkindha) and vol. 6 (Sundar + Lanka), archive.org full text:
  - https://archive.org/details/gp0091-manas-piyush-part-5 (txt: .../Manas%20Piyush%205_djvu.txt)
  - https://archive.org/details/gp0092-manas-piyush-part-6 (txt: .../Manas%20Piyush%206_djvu.txt)
  Manas Piyush gathers many commentators per line: Pt. Ramkumar's tippani, Panjabiji, Swami Prajnananand (P. P. Pra.), Vijayanand Tripathi, Baijnath, Manas Tattva Sudha, Manas Mayank, Lala Bhagwandin (Deenji), Ramdas Gaud, Ramshankar Sharan and others. Commentaries in the JSON name the commentator Manas Piyush quotes. The text is OCR, so a few spellings were read through noise.
- F. S. Growse, *The Ramayana of Tulsi Das*, 6th ed. (public domain): https://archive.org/details/in.ernet.dli.2015.125813 (used for Kishkindha verses).
- Text and Gita Press numbering checked against the WirelessAlien/Ramcharitmanas dataset (Gita Press text, doha-numbered): https://github.com/WirelessAlien/Ramcharitmanas
- Every verse has 2 or more sourced commentary notes. No IIT Kanpur or wisdomlib pages were used.

## 1. Systematic numbering error (affects 53 of 59 ids)
Our doha numbers do not match the Gita Press / Manas Piyush numbering:
- **Kishkindha:** every id is one too high (4.8 is really 4.7; 4.12 is 4.11; 4.15 is 4.14; 4.17 is 4.16; 4.21 is 4.20; 4.29 is 4.28; 4.30 is 4.29). **rcm.4.31.chaupai.3 cannot exist**: Kishkindha Kand has only 30 dohas. Jambavant's lines are 4.30.
- **Sundar:** 5.1 and 5.2 are correct; 5.3 to 5.6 are one too low (Lankini's doha is 5.4, Vibhishan's verses are 5.7); from 5.12 onward every id is **two** too low (5.12 is 5.14 ... 5.56 is 5.58). rcm.5.55.doha.1 already notes "Gita Press 5.57" in its label; the other ids need the same fix.
- **Lanka:** 6.8 is 6.6; 6.12 is 6.10; 6.19.doha.1 is 6.18; **6.19.sortha.3 is sortha 6.17(kha)**; 6.34.doha.2 (34 kha) is correct in Gita Press, but Manas Piyush numbers it 33; 6.60.chaupai.2 matches Manas Piyush but current Gita Press prints it under doha 61.
- **Chaupai numbering convention:** our "chaupai N" counts pairs of lines. Gita Press and Manas Piyush number each line (ardhali) separately, so our chaupai 2 is Gita Press lines 3-4. Labels like "Kishkindha 8 (chaupai 2)" will not match a printed Gita Press reference. Recommend switching to Gita Press line numbers (e.g. "Kishkindha 7.3-4").
- Several "single verses" span 2 to 3 chaupais (4.12.c2, 5.46.c1, 5.46.c3, 5.56.c1).

## 2. Attribution / speaker errors
- **rcm.5.44.chaupai.4** ("Better to live in hell than the company of the wicked"): Manas Piyush (Pt. Ramkumar) reads line 7 as **Ram's** words to Vibhishan, continuing Ram's questions about how he kept his dharma among the wicked; only line 8 ("Now that I have seen your feet...") is Vibhishan. Our data gives both to Vibhishan.
- **rcm.5.4.chaupai.1** (Lankini's blessing): line 1 is Lankini. Manas Piyush reads line 2 ("poison turns to nectar...") with line 3 ("...for one on whom Ram looks with grace") as an aside by the narrator Kakbhushundi to **Garuda** (reading गरुड as vocative). Our translation also drops the condition in line 3.
- **rcm.5.39.chaupai.4**: line 7 is **Shiva** speaking to Uma; only line 8 is Vibhishan. The translation marks this; the speaker field does not.
- **rcm.5.31.chaupai.5** ("All of it was your glory"): prasang is set to "Hanuman speaks plainly to Ravana", but it is spoken to **Ram** after Hanuman's return.
- **rcm.6.12.chaupai.3**: second line is narration (Ravana going off admiring his arms), not Prahasta. Prahasta as Ravana's son is right for the Manas; in Valmiki he is Ravana's commander.
- **rcm.5.32.chaupai.1** and **rcm.5.13.chaupai.4**: second line is narration (Shiva to Bhavani / the narrator), fine but worth tagging.

## 3. Translation / data notes
- **rcm.5.46.chaupai.1**: the text ends with line 4 (mother, father, brother ... family), which is the start of the next sentence (gathering the threads of attachment). Our translation ends on a dangling colon. Manas Piyush also reads line 3 as Ram overlooking the refugee's pride and deceit, not the refugee first giving them up. Merge with rcm.5.46.chaupai.3 or trim line 4.
- **rcm.5.46.chaupai.3** depends on that list; "all of these" means nothing shown alone.
- **rcm.4.8.chaupai.10**: our_note says the tradition reads this as kshanik (passing) vairagya. The Manas Piyush pages I read treat Sugriva's knowledge as real and explain Ram's smile as maya spread to get the work done and his promise kept. I could not source the "passing" label. Growse reads the second line as a dream-fight simile; Pt. Ramkumar as "I'd be ashamed to fight him even in a dream". Both are attested.
- **rcm.5.42.chaupai.3**: "fault-finding" for छिद्र is loose; in कपट छल छिद्र it means looking for weak spots to exploit (scheming).
- **rcm.4.17.chaupai.2**: Swami Prajnananand offers an alternative reading (greed dries up contentment), worth knowing.
- **rcm.4.21.chaupai.4**: text should read बिषय (Gita Press), not विषय.
- **rcm.5.35.doha.1**: Dohavali 524 has the same doha with a different order (mantri, guru, vaid).
- **rcm.4.30.chaupai.2** and several Sundar verses have prasang = null; they belong to existing prasangs (Sampati; Hanuman and Sita; Vibhishan's refuge).

## 4. Cautions for plan builders
- **rcm.4.12.chaupai.2 (Ram consoles Tara):** tells a widow over her husband's body not to weep, and calls the body "very lowly". Do not use early in a grief plan. Swami Prajnananand notes Tara got only "knowledge", not firm knowledge.
- **rcm.5.55.doha.1 / rcm.5.56.chaupai.1 ("bhay binu hoi na priti"):** widely misused to justify fear-based control in families. The commentary stresses three days of patience, anger shown in words but not felt, and immediate forgiveness. Do not use for relationships or parenting.
- **rcm.5.39.chaupai.4 (Vibhishan kicked, still wishes his brother well):** risky for anyone facing domestic violence. Pt. Ramkumar himself limits "good for harm" to saints and says in a king or warrior it is a fault. Vibhishan leaves at once.
- **rcm.5.30.chaupai.1 / .2:** "can one devoted to me meet calamity?" can imply that suffering shows weak faith. Pair them, and avoid for people in acute hardship.
- **rcm.5.28.doha.1:** about why Sita does not die; anyone with suicidal thoughts needs direct support, not only this image.
- **rcm.4.17.chaupai.4:** "unwise householder without money" can shame readers in financial distress.
- **rcm.5.6.chaupai.2, 5.6.doha.1, 5.45.chaupai.4:** strong self-abasement ("low by birth", "never did a good deed"). Keep the emphasis on the welcome, not the self-contempt; birth language can echo caste.
- **rcm.5.42.chaupai.1 (refuge even for the gravest sinner):** commentators (Ramshankar Sharan, Ramdas Gaud) say it does not cover planned wrongdoing with "repent later", and it is for real repentance. Don't use it to pressure victims to forgive.
- **rcm.6.60.chaupai.2:** a lament over a gravely injured brother. Mention that Lakshman is revived if used near illness or vigil.
- **rcm.5.1.doha.1 ("no rest until the work is done"):** can feed burnout; our misuse note is good.

## 5. Weak or thin sourcing
- All entries rest mainly on Manas Piyush (one compendium, many commentators) plus Growse for some Kishkindha verses. I did not get a second independent modern commentary (e.g. Hanuman Prasad Poddar's Gita Press tika) for Sundar and Lanka verses.
- The Sundar mangalacharan shloka (rcm.5.1.shloka.2) is not in the text dataset; it was checked only in Manas Piyush.
