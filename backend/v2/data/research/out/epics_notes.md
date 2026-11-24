# Editor notes: `epics` group (38 verses: 16 Mahabharata, 11 Valmiki Ramayana, 9 Ramcharitmanas)

All 38 verses have entries in `out/epics.json`. All 38 have at least 2 sourced notes or commentaries. One of them (vr.5.38.32) has two only because the second is a word-gloss page.

## 1. Reference / numbering errors

### Ramcharitmanas: 8 of 9 doha numbers are wrong
I checked each one against Manas Piyush (Gita Press, archive.org vols. 2, 4, 5, 6), which uses the standard Gita Press numbering. The chaupai indices are consistent: our "chaupai N" means lines 2N-1 and 2N. Only the doha numbers are off, and not by a fixed amount, so each one needs correcting by hand.

| our id | correct (Gita Press) |
|---|---|
| rcm.1.141.chaupai.3 | Bal 149.5-6 |
| rcm.2.163.doha.1 | Ayodhya doha 169 |
| rcm.3.7.chaupai.3 | Aranya 10.5-8 |
| rcm.4.15.chaupai.4 | Kishkindha 14.7-8 |
| rcm.5.6.chaupai.1 | Sundar 7.1-2 |
| rcm.5.13.chaupai.3 | Sundar 15.5-6 |
| rcm.5.44.chaupai.3 | Sundar 46.5-6 |
| rcm.6.19.chaupai.4 | Lanka 17.7-8 |
| rcm.6.79.chaupai.3 | Lanka 79.5-6: **correct** per Manas Piyush. Some editions put this passage before doha 80. |

### Valmiki Ramayana: 8 of 11 verse numbers are wrong
Southern numbering is from itihasa.io and Sanskrit Wikisource, plus valmikiramayan.net where I could reach it. CE = Baroda Critical Edition.

| our id | southern | CE / notes |
|---|---|---|
| vr.4.1.101 | 4.1.121 | **southern-only, not in CE** |
| vr.4.7.9 | 4.7.9 (ok) | CE 4.7.9 |
| vr.6.21.6 | 6.21.14-15 | CE 6.14.4-5 |
| vr.3.72.7 | 3.72.10 | CE 3.68.10 (3.72.7 is the line introducing Kabandha's speech) |
| vr.2.19.6 | 2.19.6 (ok) | line 2 is southern-only |
| vr.5.38.32 | 5.38.38 (valmikiramayan.net: 40) | line 2 is southern-only |
| vr.5.26.39 | 5.26.41 (valmikiramayan.net: 43) | CE 5.24.41 |
| vr.2.58.18 | 2.58.23 | **southern-only, not in CE** |
| vr.2.34.28 | 2.34.34 | CE 2.31.27 |
| vr.6.22.42 | 6.22.51 (Wikisource: 53) | line 1 is southern-only |
| vr.5.12.10 | 5.12.10 (ok) | CE 5.10.10 |

### Mahabharata: our ids are Kumbakonam numbering
I checked 14 of the 16 against the Kumbakonam text (vishvAsa/mahAbhAratam on GitHub) and all 14 match. The two Vana ids, 3.314 (Yaksha) and 3.297 (Savitri), could not be checked because those chapters are not in the digital Kumbakonam files. Each entry's `verified_ref` gives the BORI and Ganguli equivalents. The Ganguli sections our data marked as "inferred" are all correct (Vana XXVIII, Udyoga CXXXVI, Santi CLXXIII, Asvamedha LIII).

## 2. Speaker, listener and setting errors
- **rcm.1.141 (Bal 149): wrong listener.** "Vishnu" is incorrect. In the Manas, Brahma, Vishnu and Shiva had already come to Manu many times without his asking them for anything. The one who now offers the boon is the Supreme Lord in his own form (Ram, with Sita).
- **mbh.14.53.15: setting out of order.** When Krishna says "I tried hard for peace", Uttanka has only asked hopefully whether peace was made. His fury and threat to curse come straight after, as a reaction to this answer.
- **rcm.2.163 (Ayodhya 169): wrong prasang.** "What today asks" is Dasharatha's funeral. The next lines describe bathing the body, building the pyre on the Sarayu and the cremation. The prasang "Bharat refuses the throne" is a later scene.
- **vr.5.38.32: no prasang** in our data. It belongs with "Hanuman reaches Sita" (Sita's token and message).
- **mbh.5.36.37: prasang title is slightly off.** "Atreya and the Sadhyas" covers v.1-21 of the chapter. This verse comes later and is Vidura speaking in his own voice.
- **mbh.5.39.63 / 5.36.37: setting is loose.** Vidura Niti takes place on the sleepless night after Sanjaya returns from the Pandavas, before he delivers Yudhishthira's message in court the next day. "Before the peace talks" is only approximate.
- **vr.2.58.18 (2.58.23): nested narration.** The scene is Sumantra reporting Ram's parting message to Dasharatha, not Ram speaking directly.

## 3. Translation issues
- **mbh.12.81.11: our translation reverses the meaning.** The Sanskrit says Krishna can wish neither for one gambler's win nor for the other's loss. BORI reads "victory to one and no defeat to the other", and Ganguli has "invoking victory to both". Our version says he "cannot wish one victory without wishing the other defeat", which is the opposite image. Fix before using it on raising-kids.
- **vr.5.38.32: softened.** The Sanskrit asks for compassion shown in forceful action (or "you, mighty one, show compassion"). In context Sita is reproaching Ram for not yet punishing her abductor, and "great-hearted kindness" loses that.
- **mbh.13.161.45: a clause is missing.** The verse also says to perform an expiation if one does sleep past sunrise.
- **vr.4.1.101: word choice.** Utsaha is better rendered "resolute energy" or "drive" than "enthusiasm".
- **Typos in our Sanskrit:** mbh.12.81.6 has दहृयं for हृदयं. mbh.3.297.7 has व्यसंसाय for व्यवसाय.
- **Reading variants worth knowing:**
  - mbh.12.114.15: Kumbakonam "mahājane" (before a crowd) vs BORI/Ganguli "mahātmane" (slandering a great-souled person).
  - mbh.3.314.61: our "tṛṇāt" (more numerous than grass) is the vulgate reading. BORI has "nṛṇām" (what is most abundant among people: worry).
  - mbh.12.172.20: our wording matches the BORI appendix lines (*449), not its main text.

## 4. Verses with weak sources
- **Valmiki (all 11).** Commentary comes from itihasa.io's AI-generated syntheses of the Tilaka, Bhushana and Shiromani commentaries, which are not yet peer-reviewed. I cross-checked numbering with Sanskrit Wikisource. valmikiramayan.net itself has a bot challenge, so I used its sanskritdocuments.org mirror via WebFetch for 6.21, 5.26, 5.38 and 5.12. Those pages gave word glosses only, no commentary. vr.3.72.7's numbering rests on itihasa.io alone because the Wikisource page failed to load.
- **Mahabharata (all 16).** No classical commentary was usable: Nilakantha's Bharatabhavadipa is on archive.org only as unusable OCR. Each entry uses Ganguli's translation and footnotes plus the surrounding text (Kumbakonam, BORI). Ganguli was read from wisdomlib (raw text), except Vana CCCXI, which I read only as a WebFetch summary of sacred-texts.
- **Ramcharitmanas (all 9).** Read in Manas Piyush OCR. It compiles named traditional commentators (Pandit Ramkumar, Karunasindhu, Panjabiji, Vijayanand Tripathi, Pa. Pa. Pra., Baijnath and others), so these are the best-sourced entries. I did not use the IIT Kanpur Ramcharitmanas site: it now redirects to heritage.iitk.ac.in, which is on the do-not-use list.

## 5. Cautions an editor should see
- **Suicide-adjacent frame stories.** These verses are safe in themselves but should not be retold in full:
  - mbh.12.27.12 (someone-left:day2): Vyasa is consoling Yudhishthira, who has resolved to end his life.
  - mbh.12.178.26 (wanting-more:day2): Kashyapa has resolved to die after being humiliated, and the jackal argues against it.
  - vr.5.12.10 (keeping-a-resolve:day3): just before this verse, Hanuman considers fasting to death.
- **Lines that tell the reader not to grieve or weep:**
  - mbh.12.338.12 (someone-left:day6): the same passage says the wise do not shed tears.
  - vr.4.7.9 (work-feels-unsafe:day3): the next verses tell Rama to hold back his tears.
  - vr.4.1.101 (new-beginnings:**day1:see**): Lakshmana tells Rama to put his grief behind him. That is a poor fit for a "name what you feel" day.
- **far-from-parents plan.** In both vr.2.34.28 (day1_alt) and vr.2.58.18 (day6), Dasharatha dies of grief soon afterwards. In vr.5.26.39 (day3), the verses just before have Sita imagining her loved one dead. Also, near mbh.13.161.45 (day5) the same chapter says to obey parents without question and includes caste rules.
- **work-feels-unsafe:day6 (rcm.2.163).** The literal "task today" is cremating a father, so a purely work-themed reading would erase that.
- **hurt-by-someone-close:day2 (vr.6.21.6).** The verse sits inside an angry speech that praises force and threatens violence. The existing misuse note is good; keep it.
- **Verses others use to justify fighting or blame:**
  - mbh.3.28.6: Draupadi quotes it to argue for war.
  - mbh.3.32.58: the line just before talks about seeking out enemies' weak points.
  - mbh.12.81.6: in his reply, Narada partly blames Krishna for his own trouble.
  - rcm.5.44 (Sundar 46): the very next line says it is better to live in hell than among wicked company. That can read as blame for someone who cannot leave.
- **Caste-ranking content nearby** in mbh.12.178.26 and mbh.13.161.45. Do not carry it into the readings.
- **rcm.4.15 (Kishkindha 14).** One major commentator, Pandit Ramkumar, reads it as virtues arriving *without effort*. The "drop by drop" reading (Karunasindhu) fits the cant-get-started plan better.
