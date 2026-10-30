/**
 * Copy and editorial lists for the other-gitas funnel. Client-safe (no JSON import).
 * Facts here were checked on 30 Oct 2026 against Wikipedia, sanskritdocuments.org's list of Gitas,
 * hindupedia and wisdomlib; see lp/funnels/other-gitas/REVIEW.md for what still needs the owner's eye.
 */

export type Faq = { q: string; a: string }

export const HUB_QUICK =
  'The Ashtavakra Gita is a Sanskrit dialogue between the sage Ashtavakra and King Janaka of Mithila about the Self. It has 20 chapters and 298 verses in the common text. It stands on its own, outside the Mahabharata, and scholars date it anywhere from about 500 BCE to the 14th century CE.'

export const HUB_FAQ: Faq[] = [
  {
    q: 'How many chapters and verses does the Ashtavakra Gita have?',
    a: 'Twenty chapters and 298 verses in the common text. Chapter 18 alone has 100 verses, a third of the whole. Chapters 5, 6, 8 and 14 have only four verses each.',
  },
  {
    q: 'Who are the speakers?',
    a: 'Two people. King Janaka of Mithila asks the opening question in 1.1, and the sage Ashtavakra answers. Ashtavakra teaches in chapters 1, 3, 5, 8 to 11 and 15 to 18. Janaka speaks chapters 2, 6, 7, 12, 13, 14, 19 and 20, describing what he has seen. Editions differ on chapter 4; we follow those that give it to Janaka.',
  },
  {
    q: 'Is the Ashtavakra Gita part of the Mahabharata?',
    a: "No. It is an independent text, also called the Ashtavakra Samhita. The sage Ashtavakra does appear in the Mahabharata: in the Vana Parva, the sage Lomasha tells the Pandavas how the boy Ashtavakra defeated the court debater Bandi at King Janaka's sacrifice. The Gita itself is not in the epic.",
  },
  {
    q: 'When was it written?',
    a: 'Nobody knows. Radhakamal Mukerjee placed it around 500 to 400 BCE. J. L. Brockington placed it much later, in the 8th century CE among followers of Shankara, or in the 14th century. Others argue it predates Gaudapada, around the 6th century CE. The text gives no date and names no author.',
  },
  {
    q: 'What does it teach?',
    a: 'That you are already free. You are the witness of body and mind, and bondage is only the belief that you are bound (1.11). It is a text of Advaita Vedanta and follows the path of knowledge, with almost no instruction on ritual, devotion or practice.',
  },
  {
    q: 'Where should I start reading?',
    a: 'Read chapter 1 first: twenty verses that hold the whole teaching. Then chapter 15, where Ashtavakra says it again in different words, and then chapter 18 at your own pace. If you want one verse a day, the seven-mornings plan on this site picks seven.',
  },
  {
    q: 'Which translation do you use?',
    a: "The English here is Wisdom's own, made from the Sanskrit and read with the traditional Advaita commentaries. We used Lala Baij Nath's 1907 translation, which is in the public domain, as a reference. Every note is marked as reviewed or not.",
  },
]

export const COMPARE_QUICK =
  'The Bhagavad Gita is Krishna teaching Arjuna on a battlefield inside the Mahabharata, in 700 verses that join action, devotion and knowledge. The Ashtavakra Gita is a separate text of 298 verses in which the sage Ashtavakra tells King Janaka he is already free. Start with the Bhagavad Gita unless the Ashtavakra already speaks to you.'

export const COMPARE_ROWS: { label: string; bg: string; ag: string }[] = [
  { label: 'Setting', bg: 'The battlefield of Kurukshetra, just before the war, in a chariot between two armies.', ag: "King Janaka's court in Mithila. No battle and no crisis, only a question." },
  { label: 'Speakers', bg: 'Krishna and Arjuna, reported by Sanjaya to the blind king Dhritarashtra.', ag: 'The sage Ashtavakra and King Janaka, with no narrator.' },
  { label: 'Where it sits', bg: 'Inside the Mahabharata, in the Bhishma Parva.', ag: 'A standalone text, outside the Mahabharata, also called the Ashtavakra Samhita.' },
  { label: 'Length', bg: '18 chapters, 700 verses.', ag: '20 chapters, 298 verses. Chapter 18 alone has 100.' },
  { label: 'Path', bg: 'Karma, bhakti and jnana together: act without clinging to results, love God, know the Self.', ag: 'Jnana alone: know that you are the witness, and freedom is already the case.' },
  { label: 'What it asks of you', bg: 'Do your duty, offer the results, practise steadily, take refuge in Krishna.', ag: 'See what you are. Ashtavakra says practice itself can become the bondage (1.15, 18.35).' },
  { label: 'Date', bg: 'Composed between roughly 400 BCE and 200 CE, by most scholarly estimates.', ag: 'Unknown. Estimates run from about 500 BCE to the 14th century CE.' },
  { label: 'Start here if', bg: 'You have a decision, a duty or a grief in front of you, or you are new to these texts.', ag: 'You have read some Vedanta, you meditate, or the line "as you hold yourself, so you become" stopped you.' },
]

export const COMPARE_FAQ: Faq[] = [
  {
    q: 'Which should I read first?',
    a: 'For most people, the Bhagavad Gita. It starts with a person in trouble and teaches through his situation, so it meets you where you are. The Ashtavakra Gita assumes a student like Janaka who is already settled and ready for the conclusion.',
  },
  {
    q: 'Do they disagree?',
    a: 'On method more than on the goal. Both say the Self is unborn and untouched by action. The Bhagavad Gita tells Arjuna the mind is steadied by practice and dispassion (6.35). The Ashtavakra Gita warns that people devoted to practice miss the Self (18.35). Traditional teachers read these as advice for different stages.',
  },
  {
    q: 'Is the Ashtavakra Gita part of the Mahabharata like the Bhagavad Gita?',
    a: "No. The Bhagavad Gita is chapters of the Mahabharata's Bhishma Parva. The Ashtavakra Gita is a separate work. The sage Ashtavakra appears in the Mahabharata's Vana Parva, in the story of his debate at Janaka's court, but this Gita is not part of the epic.",
  },
  {
    q: 'Which is older?',
    a: 'Probably the Bhagavad Gita, though neither can be dated exactly. Even the scholar who dated the Ashtavakra Gita earliest, Radhakamal Mukerjee, placed it just after the Bhagavad Gita. Others place it a thousand years or more later.',
  },
  {
    q: 'Do they share any verses or ideas?',
    a: 'They share images and claims. Both use space that stays unstained, the ocean that does not move, and beads on a thread. Ashtavakra Gita 3.5 and 15.6 echo Bhagavad Gita 6.29 almost word for word: the Self in every being and every being in the Self.',
  },
]

/** Same thread pairs shown on the comparison page: [Ashtavakra ref, Gita chapter, Gita verse, one line]. */
export const THREADS: { ag: string; c: number; v: number; line: string }[] = [
  { ag: '1.8', c: 3, v: 27, line: "'I am the doer' is the error in both: a snakebite for Ashtavakra, the mark of a confused mind for Krishna." },
  { ag: '1.11', c: 17, v: 3, line: 'As you hold yourself, so you become. Krishna says a person is made of their faith.' },
  { ag: '1.20', c: 9, v: 6, line: 'Both use space: one space in every pot, one sky holding all the wind.' },
  { ag: '17.3', c: 2, v: 59, line: 'Desire fades when something better is tasted, an elephant leaving neem for sallaki.' },
  { ag: '18.59', c: 5, v: 8, line: 'Seeing, hearing, eating, sleeping, at ease and with no sense of doing.' },
  { ag: '18.35', c: 6, v: 35, line: 'Where they part: Krishna prescribes practice; Ashtavakra warns that practice can hide the Self.' },
]

/** The famous lines: 20 verses that also have share cards (ids ag-c-v). */
export const FAMOUS = ['1.11', '1.3', '1.4', '1.8', '15.4', '8.4', '1.6', '1.14', '1.16', '1.18', '2.1', '2.25', '8.1', '11.5', '15.8', '15.11', '17.3', '18.59', '18.100', '1.2']

export const QUOTES_QUICK =
  "The line people quote most often from the Ashtavakra Gita is 1.11: as you hold yourself, so you become. Below are twenty of its best-known verses, each with the Sanskrit, Wisdom's own plain English and a link to the full verse with word meanings and commentary."

export const START_HERE: { key: string; why: string }[] = [
  { key: '1.3', why: 'The method in one verse: set aside what you can see, and notice the one who sees.' },
  { key: '1.11', why: 'The line people quote, and the reason the text works at all.' },
  { key: '15.4', why: 'Chapter 1 gathered into a single verse you can memorise.' },
  { key: '18.59', why: 'What freedom looks like on an ordinary day.' },
]

export type PlanDay = { day: number; key: string; title: string; practice: string }
export const PLAN: PlanDay[] = [
  { day: 1, key: '1.3', title: 'Notice the one who notices', practice: 'Before you get up, notice five things: the sheet, the air, a sound, your breath, a thought. Then notice what is aware of all five.' },
  { day: 2, key: '1.4', title: 'Rest for three breaths', practice: 'Sit for three breaths before you reach for anything. Let attention rest on the plain fact of being aware.' },
  { day: 3, key: '1.8', title: 'Put down the weight of doing', practice: 'Before your first task, say once: I will do my part. Then do it, and leave the result where it belongs.' },
  { day: 4, key: '1.11', title: 'Hear what you call yourself', practice: "Catch one sentence today that starts 'I am the kind of person who'. Ask whether it is true, or only repeated." },
  { day: 5, key: '8.4', title: 'Hold it lightly', practice: 'Pick one thing you are gripping today, a plan or a grievance, and hold it the way you would hold a small bird.' },
  { day: 6, key: '15.11', title: 'Let the wave be a wave', practice: 'When the day brings a high or a low, say the last words of the verse to yourself: no growth, no loss.' },
  { day: 7, key: '18.59', title: 'At ease in ordinary things', practice: 'Eat one meal today with nothing else going on, and see whether the ease the verse describes is already there.' },
]

export const PLAN_QUICK =
  'Seven mornings with the Ashtavakra Gita: one verse a day, read aloud in Sanskrit and in plain English, with one small thing to try. It starts with 1.3, you are the witness, and ends with 18.59, at ease in ordinary life. Each morning takes about three minutes.'

/** NextStep lines for this funnel. The app holds Gita lines, so the iPhone line promises only that. */
export const NEXT_COPY = {
  app: { line: 'Keep one line from the Bhagavad Gita on your Lock Screen, a new one each morning.', cta: 'Get one line each morning' },
  whatsapp: { line: 'One short line each morning, on WhatsApp.', cta: 'Join' },
  email: { line: "Seven mornings of short readings from the Bhagavad Gita, chosen for what you're going through, by email.", cta: 'Send my week' },
}

export const SOURCES_NOTE =
  "Sanskrit from the common text of the Ashtavakra Gita, also called the Ashtavakra Samhita. Where our source had obvious typing errors we restored the standard reading and listed each change in our review notes. IAST is generated from the Devanagari. The English, the word meanings and the notes are Wisdom's own, written in the Advaita tradition of Shankara's school, the line followed by commentators such as Swami Nityaswarupananda and Swami Chinmayananda, with Lala Baij Nath's public-domain translation of 1907 as a reference."

export const DISCLOSURE = 'Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human review pending.'
