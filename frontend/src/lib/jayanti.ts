/**
 * Gita Jayanti 2026 cluster: shared facts, reading-time maths and the
 * 18-day guide content. Pages: /gita-jayanti, /read-gita-in-18-days,
 * /gita-jayanti/reading-plan, /gita-jayanti/which-chapter-to-read.
 */

export const JAYANTI_DATE_LABEL = 'Sunday, 20 December 2026'

/** Reading pace used for every time on these pages. */
export const SECONDS_PER_VERSE_EN = 10
export const SECONDS_PER_VERSE_SA = 15

export const minutesEn = (verses: number) => Math.max(1, Math.ceil((verses * SECONDS_PER_VERSE_EN) / 60))
export const minutesSa = (verses: number) => Math.max(1, Math.ceil((verses * SECONDS_PER_VERSE_SA) / 60))

/** "about 2 hours" style label for long readings. */
export const hoursLabel = (min: number) => {
  if (min < 60) return `${min} min`
  const h = Math.round(min / 30) / 2
  return `${h % 1 === 0 ? h : h.toFixed(1)} hours`
}

/** UTC-safe ISO date for day n (1-based) of a run that starts on `start`. */
export const runIso = (start: [number, number, number], n: number) =>
  new Date(Date.UTC(start[0], start[1], start[2] + n - 1)).toISOString().slice(0, 10)

export const fmtDay = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
}

/** One line on what happens in each chapter, and the verse we show from it. */
export const CHAPTER_GUIDE: Record<number, { line: string; verse: number }> = {
  1: {
    line: 'The armies line up at Kurukshetra. Arjuna asks Krishna to drive the chariot between them, sees his grandfather Bhishma and his teacher Drona on the other side, and puts down his bow.',
    verse: 47,
  },
  2: {
    line: 'Krishna starts to answer. He speaks of the self that is never born and never dies, of doing your own work without holding on to the result, and ends with a portrait of a person whose mind stays steady.',
    verse: 47,
  },
  3: {
    line: 'Arjuna asks why he should act at all if knowledge is higher. Krishna says nobody can stay without acting for even a moment, and explains how to work without being bound by it.',
    verse: 19,
  },
  4: {
    line: 'Krishna says he taught this yoga long ago to Vivasvan, and explains why he takes birth age after age.',
    verse: 7,
  },
  5: {
    line: 'Arjuna asks which is better, giving up action or acting without attachment. Krishna says both lead to the same place, and that of the two, acting without attachment is better.',
    verse: 10,
  },
  6: {
    line: 'Meditation: where to sit and how to hold the body and the mind. Arjuna says the mind is as hard to hold as the wind, and Krishna answers him.',
    verse: 35,
  },
  7: {
    line: 'Krishna describes his lower and higher nature, and says all things are strung on him like pearls on a thread.',
    verse: 7,
  },
  8: {
    line: 'Arjuna asks seven questions, from what Brahman is to how Krishna is known at the time of death. Krishna answers with what a person remembers at the end.',
    verse: 7,
  },
  9: {
    line: 'Krishna calls this the royal knowledge, and says he accepts even a leaf or a little water offered with love.',
    verse: 26,
  },
  10: {
    line: 'Arjuna asks where he should look for Krishna. Krishna lists his glories: among months Margashirsha, among rivers the Ganga, among the Pandavas Arjuna himself.',
    verse: 20,
  },
  11: {
    line: 'Arjuna asks to see Krishna’s universal form and is given the eyes to see it. What he sees frightens him, and he asks Krishna to take his familiar form again.',
    verse: 32,
  },
  12: {
    line: 'Devotion. Krishna describes, quality by quality, the devotee who is dear to him.',
    verse: 13,
  },
  13: {
    line: 'The body is the field, and the one who knows it is the knower of the field. Krishna separates the two.',
    verse: 28,
  },
  14: {
    line: 'Sattva, rajas and tamas: how each one binds a person, and how to tell which one is at work.',
    verse: 5,
  },
  15: {
    line: 'The world as an ashvattha tree with its roots above. Krishna names himself Purushottama, beyond both the perishable and the imperishable.',
    verse: 1,
  },
  16: {
    line: 'Two sets of qualities, daivi and asuri. Krishna names desire, anger and greed as the three gates to ruin.',
    verse: 21,
  },
  17: {
    line: 'Faith, food, sacrifice, austerity and giving, each described in three kinds.',
    verse: 3,
  },
  18: {
    line: 'Krishna gathers the teaching together, tells Arjuna to reflect on it and then choose, and Arjuna says his doubts are gone and he will act.',
    verse: 63,
  },
}

export type ClusterKey = 'hub' | 'eighteen' | 'plan' | 'which'

export const CLUSTER: { key: ClusterKey; href: string; title: string; dek: string }[] = [
  {
    key: 'hub',
    href: '/gita-jayanti',
    title: 'Gita Jayanti 2026',
    dek: 'The date, the Ekadashi tithi timings and a countdown to Sunday, 20 December.',
  },
  {
    key: 'eighteen',
    href: '/read-gita-in-18-days',
    title: 'Read the Gita in 18 days',
    dek: 'One chapter a day: what each one covers, a verse from it, and how long it takes.',
  },
  {
    key: 'plan',
    href: '/gita-jayanti/reading-plan',
    title: 'Gita Jayanti reading plan',
    dek: 'Finish by 20 December, whether you start today, on 12 December or on the day itself.',
  },
  {
    key: 'which',
    href: '/gita-jayanti/which-chapter-to-read',
    title: 'Which chapter to read on Gita Jayanti',
    dek: 'What to read with two minutes, fifteen, half an hour or the whole day.',
  },
]
