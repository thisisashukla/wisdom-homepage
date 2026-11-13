/**
 * Reading plans that cover the whole Gita or walk through it by length (as opposed to the topic
 * plans in lib/themePlans.ts). One source for the plan pages, the /reading-plans hub, the verse
 * map, the sitemap and llms.txt. Client safe: no import from ./gita (it reads the filesystem).
 *
 * Pages:
 *   /bhagavad-gita-in-30-days       THIRTY_DAYS, all 701 verses in 30 even days
 *   /bhagavad-gita-in-7-days        SEVEN_DAYS, the arc of the conversation in seven verses
 *   /bhagavad-gita-one-verse-a-day  VERSE_A_DAY, a month of mornings, one verse each
 *   /how-to-read-bhagavad-gita      the guide that points to all of them (TIME_PICKS)
 *   /read-gita-in-18-days           a chapter a day (data in lib/jayanti.ts)
 *
 * Reading times use the site-wide pace in lib/jayanti.ts (10 seconds a verse in English).
 * Copy rules: no em or en dashes, ranges are written "to".
 */

import { BG_COUNTS } from '@/lib/search/refs'

export const SECONDS_PER_VERSE = 10
export const minutesFor = (verses: number) => Math.max(1, Math.ceil((verses * SECONDS_PER_VERSE) / 60))

export type Ref = { ch: number; vs: number }
export const refId = (r: Ref) => `${r.ch}.${r.vs}`
export const parseRef = (s: string): Ref => {
  const [ch, vs] = s.split('.').map(Number)
  return { ch, vs }
}

/** A run of verses inside one chapter. */
export type Span = { ch: number; from: number; to: number }
export const spanCount = (s: Span) => s.to - s.from + 1
export const spanLabel = (s: Span) =>
  s.from === 1 && s.to === BG_COUNTS[s.ch - 1] ? `Chapter ${s.ch}` : `Chapter ${s.ch}, verses ${s.from} to ${s.to}`

// ── 30 days ──────────────────────────────────────────────────────────────────

export type ThirtyDay = {
  day: number
  span: Span
  /** What happens in the conversation that day, in one or two plain sentences. */
  line: string
  /** The verse to stop on. */
  stop: string
}

/**
 * All 701 verses in 30 days, 15 to 35 verses (3 to 6 minutes) a day. Long chapters split where the
 * conversation turns (2.31 duty, 2.54 Arjuna's question, 6.24 the restless mind, 11.32 "I am Time",
 * 18.41 work by nature, 18.63 the last word), so no day stops mid-thought.
 */
export const THIRTY_DAYS: ThirtyDay[] = [
  { day: 1, span: { ch: 1, from: 1, to: 27 }, stop: '1.1', line: 'Dhritarashtra asks Sanjaya what happened at Kurukshetra. The armies line up, the conches sound, and Arjuna asks Krishna to drive his chariot between the two sides.' },
  { day: 2, span: { ch: 1, from: 28, to: 47 }, stop: '1.47', line: 'Arjuna sees his teachers, his grandfather and his cousins across the field. He argues against the war, then sits down and lets his bow fall.' },
  { day: 3, span: { ch: 2, from: 1, to: 30 }, stop: '2.20', line: 'Arjuna asks Krishna to teach him. Krishna begins with the self in every body, which is never born and never dies.' },
  { day: 4, span: { ch: 2, from: 31, to: 53 }, stop: '2.47', line: 'Krishna turns to Arjuna’s duty, then to a mind that acts fully and lets the result go.' },
  { day: 5, span: { ch: 2, from: 54, to: 72 }, stop: '2.70', line: 'Arjuna asks how a person of steady wisdom speaks, sits and walks. Krishna answers with a portrait, and shows how one thought can slide into anger.' },
  { day: 6, span: { ch: 3, from: 1, to: 24 }, stop: '3.19', line: 'If knowledge is higher, why act at all? Krishna says no one can stay without acting for even a moment, and that he himself keeps acting.' },
  { day: 7, span: { ch: 3, from: 25, to: 43 }, stop: '3.35', line: 'The wise act for the good of the world. Arjuna asks what pushes a person into wrong, and Krishna names desire that turns into anger.' },
  { day: 8, span: { ch: 4, from: 1, to: 24 }, stop: '4.7', line: 'Krishna says he taught this yoga long ago and takes birth age after age when dharma declines. He explains action that does not bind.' },
  { day: 9, span: { ch: 4, from: 25, to: 42 }, stop: '4.38', line: 'Many kinds of offering, and knowledge as the purest of them. Krishna ends by telling Arjuna to cut through his doubt and stand up.' },
  { day: 10, span: { ch: 5, from: 1, to: 29 }, stop: '5.10', line: 'Giving up action or acting without attachment: both lead to the same place. A person can act and stay untouched, like a lotus leaf on water.' },
  { day: 11, span: { ch: 6, from: 1, to: 23 }, stop: '6.5', line: 'The self as its own friend and its own enemy. Then where to sit, and how to hold the body and the mind in meditation.' },
  { day: 12, span: { ch: 6, from: 24, to: 47 }, stop: '6.35', line: 'Arjuna says the mind is as hard to hold as the wind. Krishna agrees, names practice and letting go, and promises that no sincere effort is lost.' },
  { day: 13, span: { ch: 7, from: 1, to: 30 }, stop: '7.7', line: 'Krishna describes his lower and higher nature, and says all things are strung on him like pearls on a thread.' },
  { day: 14, span: { ch: 8, from: 1, to: 28 }, stop: '8.7', line: 'Arjuna asks seven questions, from what Brahman is to how Krishna is known at the time of death. Krishna answers with what a person remembers at the end.' },
  { day: 15, span: { ch: 9, from: 1, to: 19 }, stop: '9.4', line: 'Krishna calls this the royal knowledge. The whole universe rests in him, and he is the heat of the sun and the rain.' },
  { day: 16, span: { ch: 9, from: 20, to: 34 }, stop: '9.22', line: 'Those who lean on him alone are carried. He accepts even a leaf, a flower or a little water, offered with love.' },
  { day: 17, span: { ch: 10, from: 1, to: 18 }, stop: '10.8', line: 'Krishna says he is the source of everything. Arjuna asks to hear more, and says he never tires of these words.' },
  { day: 18, span: { ch: 10, from: 19, to: 42 }, stop: '10.20', line: 'Krishna lists his glories: among months Margashirsha, among rivers the Ganga, among the Pandavas Arjuna himself.' },
  { day: 19, span: { ch: 11, from: 1, to: 31 }, stop: '11.12', line: 'Arjuna asks to see Krishna’s universal form and is given the eyes to see it: the light of a thousand suns, then a form that frightens him.' },
  { day: 20, span: { ch: 11, from: 32, to: 55 }, stop: '11.32', line: 'Krishna says he is Time. Arjuna, shaken, asks him to take his familiar form again, and Krishna does.' },
  { day: 21, span: { ch: 12, from: 1, to: 20 }, stop: '12.13', line: 'Devotion. Krishna describes, quality by quality, the devotee who is dear to him.' },
  { day: 22, span: { ch: 13, from: 1, to: 35 }, stop: '13.28', line: 'The body is the field, and the one who knows it is the knower of the field. Krishna separates the two.' },
  { day: 23, span: { ch: 14, from: 1, to: 27 }, stop: '14.5', line: 'Sattva, rajas and tamas: how each one binds a person, and how to tell which one is at work.' },
  { day: 24, span: { ch: 15, from: 1, to: 20 }, stop: '15.7', line: 'The world as an ashvattha tree with its roots above. Every living being is Krishna’s own eternal part.' },
  { day: 25, span: { ch: 16, from: 1, to: 24 }, stop: '16.21', line: 'Two sets of qualities. Desire, anger and greed are the three gates to ruin.' },
  { day: 26, span: { ch: 17, from: 1, to: 28 }, stop: '17.3', line: 'Faith, food, sacrifice, austerity and giving, each in three kinds. A person is made of what they trust.' },
  { day: 27, span: { ch: 18, from: 1, to: 18 }, stop: '18.11', line: 'What giving up really means: let go of the fruit and keep the work. Then the five causes behind every action.' },
  { day: 28, span: { ch: 18, from: 19, to: 40 }, stop: '18.37', line: 'Knowledge, action, the doer, understanding, resolve and happiness, each in three kinds. Some happiness tastes like poison at first and nectar at the end.' },
  { day: 29, span: { ch: 18, from: 41, to: 62 }, stop: '18.47', line: 'Work that fits a person’s nature, done as worship. Krishna says the Lord lives in every heart, and asks Arjuna to take refuge there.' },
  { day: 30, span: { ch: 18, from: 63, to: 78 }, stop: '18.66', line: 'Krishna tells Arjuna to reflect and then choose, and gives his last word. Arjuna says his doubt is gone. Sanjaya ends the telling.' },
]

/** Weeks of the 30-day plan, for the day list's grouping. */
export const THIRTY_WEEKS = [
  { from: 1, to: 7, title: 'The question and the first answers', chapters: 'Chapters 1 to 3' },
  { from: 8, to: 14, title: 'Knowledge, renunciation and the mind', chapters: 'Chapters 4 to 8' },
  { from: 15, to: 21, title: 'Trust, glory, the vision and devotion', chapters: 'Chapters 9 to 12' },
  { from: 22, to: 30, title: 'Seeing clearly, and the last word', chapters: 'Chapters 13 to 18' },
]

// ── 7 days ───────────────────────────────────────────────────────────────────

export type SevenDay = {
  day: number
  verse: string
  title: string
  /** Where the conversation is when this verse is spoken. */
  context: string
  /** Why this is the verse to know from that stretch. */
  why: string
}

/** The arc of the whole conversation in seven verses: Arjuna's collapse to Arjuna standing up. */
export const SEVEN_DAYS: SevenDay[] = [
  {
    day: 1,
    verse: '1.47',
    title: 'A capable man who cannot act',
    context: 'The armies face each other at Kurukshetra. Arjuna asks Krishna to drive his chariot into the middle, sees his grandfather, his teacher and his cousins on the other side, and argues himself out of the war.',
    why: 'Everything Krishna says over the next 17 chapters answers this moment. The Gita opens on despair, so start here and read the rest as a reply.',
  },
  {
    day: 2,
    verse: '2.14',
    title: 'What comes and goes',
    context: 'Arjuna has asked to be taught. Early in his answer, Krishna points to heat and cold, pleasure and pain: they arrive through the senses and they pass.',
    why: 'The first thing Krishna gives a grieving man is a way to see a passing state as passing. Most of the Gita builds on that.',
  },
  {
    day: 3,
    verse: '2.47',
    title: 'Your part is the work',
    context: 'Still in chapter 2, Krishna moves from who Arjuna is to how he should act. This is the most quoted verse of the Gita.',
    why: 'It moves your attention from the result, which you cannot hold, to the action, which is yours. Krishna adds in the same breath: and don’t give up acting.',
  },
  {
    day: 4,
    verse: '2.62',
    title: 'How a thought becomes anger',
    context: 'Arjuna asks what a steady person is like. Krishna answers with the opposite too: dwelling on a thing, attachment, wanting, anger, confusion, ruin, link by link across 2.62 and 2.63.',
    why: 'Once you can see the chain, you can catch it at the first link, while it is still only a thought.',
  },
  {
    day: 5,
    verse: '6.5',
    title: 'Your own friend',
    context: 'Chapter 6 is about the mind and meditation. Before he gives any technique, Krishna says who has to do the lifting.',
    why: 'It puts the work and the kindness in the same hands: yours. Arjuna asks a few verses later how anyone holds a mind like the wind, and Krishna answers with practice and letting go (6.35).',
  },
  {
    day: 6,
    verse: '9.22',
    title: 'You are carried',
    context: 'Chapter 9, the royal knowledge. After five chapters on effort and discipline, Krishna speaks of those who think of him alone.',
    why: 'The Gita adds trust to effort here. The one who leans on Krishna does not carry everything alone.',
  },
  {
    day: 7,
    verse: '18.66',
    title: 'The last word, and Arjuna stands up',
    context: 'Chapter 18 gathers the whole teaching. Krishna tells Arjuna to reflect and then choose (18.63), and gives his last word. Seven verses later Arjuna answers: my confusion is gone, and I will act (18.73).',
    why: 'The arc that began on day 1 with a dropped bow ends with a man ready to act. That is the Gita in one week.',
  },
]

// ── One verse a day ──────────────────────────────────────────────────────────

export type MorningVerse = { day: number; verse: string; carry: string }

/** A month of mornings: thirty verses that follow the conversation in order, one line to carry each. */
export const VERSE_A_DAY: MorningVerse[] = [
  { day: 1, verse: '1.47', carry: 'Even Arjuna sat down. Start from where you actually are.' },
  { day: 2, verse: '2.7', carry: 'Asking for help is where the teaching begins.' },
  { day: 3, verse: '2.14', carry: 'Notice one feeling today that comes and then goes.' },
  { day: 4, verse: '2.20', carry: 'The part of you that matters most cannot be hurt by today.' },
  { day: 5, verse: '2.47', carry: 'Give one task your full attention and let its outcome be.' },
  { day: 6, verse: '2.48', carry: 'Do the work the same way, whether it goes well or badly.' },
  { day: 7, verse: '2.56', carry: 'Let a good moment be good, and a hard one be hard, without being carried off.' },
  { day: 8, verse: '2.62', carry: 'When irritation starts, look for the thought it started from.' },
  { day: 9, verse: '2.70', carry: 'A want can pass through you the way a river enters the sea.' },
  { day: 10, verse: '3.19', carry: 'Do what needs doing today, and hold the result loosely.' },
  { day: 11, verse: '3.35', carry: 'Your own path, walked unevenly, is still yours to walk.' },
  { day: 12, verse: '4.7', carry: 'When things fall apart, something steadying rises to meet it.' },
  { day: 13, verse: '4.38', carry: 'Understanding arrives with time. Keep showing up.' },
  { day: 14, verse: '5.10', carry: 'Be in the thick of it, and stay as untouched as a lotus leaf.' },
  { day: 15, verse: '6.5', carry: 'Speak to yourself today the way a good friend would.' },
  { day: 16, verse: '6.17', carry: 'Eat, work and sleep in balance. Calm begins there.' },
  { day: 17, verse: '6.35', carry: 'The mind wanders. Bring it back, once more, without scolding it.' },
  { day: 18, verse: '7.7', carry: 'Everything you meet today hangs on one thread.' },
  { day: 19, verse: '9.22', carry: 'Put one worry down. You do not have to carry all of it.' },
  { day: 20, verse: '9.26', carry: 'A small thing given with love is enough.' },
  { day: 21, verse: '10.20', carry: 'Look for the same presence in the people you meet today.' },
  { day: 22, verse: '11.12', carry: 'Let something be bigger than your plans for a moment.' },
  { day: 23, verse: '12.13', carry: 'Be friendly to everyone, and forgive one thing.' },
  { day: 24, verse: '13.28', carry: 'See the same life in a stranger as in yourself.' },
  { day: 25, verse: '15.7', carry: 'You are part of something that does not end.' },
  { day: 26, verse: '16.21', carry: 'Watch for wanting, anger and greed: three doors to keep shut.' },
  { day: 27, verse: '17.3', carry: 'What you trust is what you become. Choose it on purpose.' },
  { day: 28, verse: '18.37', carry: 'The hard thing now may be the one that brings ease later.' },
  { day: 29, verse: '18.66', carry: 'Let go of what you cannot hold, and take refuge.' },
  { day: 30, verse: '18.73', carry: 'Doubt clears. Stand up and act.' },
]

// ── The catalogue (hub cards, picker, sitemap) ───────────────────────────────

export type LengthPlanKey = 'verse-a-day' | 'seven' | 'eighteen' | 'thirty' | 'jayanti'

export type LengthPlan = {
  key: LengthPlanKey
  href: string
  title: string
  /** One line on what the reader does. */
  sub: string
  /** "1 minute a day", "4 to 13 minutes a day". */
  daily: string
  /** "30 mornings", "18 days". */
  span: string
  /** The verse map shape for its card. */
  shape: 'points' | 'chapters' | 'days'
  /** Card picture: the plan drawn on the verse map, no text (WebP, 1200x675). On the hub and the plan pages' "more plans" cards. */
  img: string
  /** The page's social preview image (titled), 1200x630. */
  og?: string
}

export const LENGTH_PLANS: LengthPlan[] = [
  {
    key: 'verse-a-day',
    href: '/bhagavad-gita-one-verse-a-day',
    title: 'One verse a day',
    sub: 'A month of mornings, one verse each, in the order they come in the Gita.',
    daily: '1 minute a day',
    span: '30 mornings',
    shape: 'points',
    img: '/plans/bhagavad-gita-one-verse-a-day-plan.webp',
    og: '/og/bhagavad-gita-one-verse-a-day.webp',
  },
  {
    key: 'seven',
    href: '/bhagavad-gita-in-7-days',
    title: 'The Gita in 7 days',
    sub: 'The whole conversation in seven verses, from the dropped bow to Arjuna standing up.',
    daily: '3 minutes a day',
    span: '7 days',
    shape: 'points',
    img: '/plans/bhagavad-gita-7-day-reading-plan.webp',
    og: '/og/bhagavad-gita-in-7-days.webp',
  },
  {
    key: 'thirty',
    href: '/bhagavad-gita-in-30-days',
    title: 'The whole Gita in 30 days',
    sub: 'All 700 verses in even daily readings, each with one verse to stop on.',
    daily: '3 to 6 minutes a day',
    span: '30 days',
    shape: 'days',
    img: '/plans/bhagavad-gita-30-day-reading-plan.webp',
    og: '/og/bhagavad-gita-in-30-days.webp',
  },
  {
    key: 'eighteen',
    href: '/read-gita-in-18-days',
    title: 'A chapter a day',
    sub: 'All 18 chapters in 18 days, with what each one covers.',
    daily: '4 to 13 minutes a day',
    span: '18 days',
    shape: 'chapters',
    img: '/plans/bhagavad-gita-18-day-reading-plan.webp',
    og: '/og/read-gita-in-18-days.webp',
  },
  {
    key: 'jayanti',
    href: '/gita-jayanti/reading-plan',
    title: 'Finish by Gita Jayanti',
    sub: 'Schedules that end on 20 December, from whatever day you start.',
    daily: 'Your pace',
    span: '3 to 18 days',
    shape: 'chapters',
    img: '/plans/gita-jayanti-reading-plan.webp',
    og: '/og/gita-jayanti-reading-plan.webp',
  },
]

export const lengthPlan = (key: LengthPlanKey) => LENGTH_PLANS.find((p) => p.key === key)!

/** "How much time do you have?" The picker on the hub and on the how-to-read guide. */
export const TIME_PICKS: { time: string; detail: string; plan: LengthPlanKey }[] = [
  { time: '1 minute', detail: 'One verse each morning for a month', plan: 'verse-a-day' },
  { time: '3 minutes, one week', detail: 'The arc of the whole Gita in seven verses', plan: 'seven' },
  { time: '5 minutes, one month', detail: 'Every verse, in 30 even readings', plan: 'thirty' },
  { time: '10 minutes', detail: 'A chapter a day, all 18', plan: 'eighteen' },
]

/** Verse-map shapes: which verses each plan lights, by day. */
export const thirtyDaySegments = () => THIRTY_DAYS.map((d) => ({ day: d.day, spans: [d.span] }))
export const eighteenDaySegments = () => BG_COUNTS.map((n, i) => ({ day: i + 1, spans: [{ ch: i + 1, from: 1, to: n }] }))
export const pointSegments = (verses: string[]) =>
  verses.map((v, i) => {
    const r = parseRef(v)
    return { day: i + 1, spans: [{ ch: r.ch, from: r.vs, to: r.vs }] }
  })

export const READING_PLAN_PATHS = ['/how-to-read-bhagavad-gita', ...LENGTH_PLANS.map((p) => p.href)]
