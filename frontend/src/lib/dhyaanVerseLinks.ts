/**
 * dhyaanVerseLinks.ts
 *
 * Chapter 6 meditation verses (6.10 to 6.26) mapped to the Dhyaan practice guide
 * that puts each one to work, on dhyaan.wisdomquotes.in/learn. Each guide already
 * cites its verse, so the link runs both ways. Rendered by the verse page's
 * "Go deeper" rows after the blog links.
 *
 * Rules: one guide per verse; CTA says what the reader will do or feel, no dashes.
 */
import type { BlogLink } from './blogVerseLinks'

const DHYAAN_LEARN = 'https://dhyaan.wisdomquotes.in/learn'
const ICON = '/dhyaan-assets/icon.webp'

const GUIDES = {
  'silent-meditation': 'Silent meditation',
  dhyana: 'Dhyana',
  'dhyana-mudra': 'Dhyana mudra',
  trataka: 'Trataka',
  'falling-asleep-during-meditation': 'Falling asleep during meditation',
  'is-my-meditation-working': 'Is my meditation working?',
  'meditation-without-streaks': 'Meditating without streaks',
  'how-long-should-you-meditate': 'How long should you meditate?',
} as const

type Guide = keyof typeof GUIDES

const SIT_IN_SILENCE = 'Find your seat and sit in silence, the way Krishna describes →'
const WHAT_DHYANA_ASKS = 'What dhyana asks of you each time you sit →'

const VERSE_GUIDE: Record<string, [Guide, string]> = {
  '6-10': ['silent-meditation', SIT_IN_SILENCE],
  '6-11': ['silent-meditation', SIT_IN_SILENCE],
  '6-12': ['dhyana', WHAT_DHYANA_ASKS],
  '6-13': ['dhyana-mudra', 'Hold your body, head and hands still, as 6.13 asks →'],
  '6-14': ['silent-meditation', SIT_IN_SILENCE],
  '6-15': ['dhyana', WHAT_DHYANA_ASKS],
  '6-16': ['falling-asleep-during-meditation', 'Nodding off when you sit? Find your middle path →'],
  '6-17': ['falling-asleep-during-meditation', 'Nodding off when you sit? Find your middle path →'],
  '6-18': ['dhyana', WHAT_DHYANA_ASKS],
  '6-19': ['trataka', 'Rest your gaze on a still flame, the lamp of 6.19 →'],
  '6-20': ['dhyana', WHAT_DHYANA_ASKS],
  '6-21': ['is-my-meditation-working', 'Notice the quiet signs your sitting is changing you →'],
  '6-22': ['is-my-meditation-working', 'Notice the quiet signs your sitting is changing you →'],
  '6-23': ['meditation-without-streaks', 'Keep sitting with a steady heart, free of streaks and guilt →'],
  '6-24': ['dhyana', WHAT_DHYANA_ASKS],
  '6-25': ['how-long-should-you-meditate', 'Go slowly, step by step. How long to sit each day →'],
  '6-26': ['silent-meditation', 'Mind wandered again? Bring it back gently, every time →'],
}

export function getDhyaanLinksForVerse(chapter: number, verse: number): BlogLink[] {
  const hit = VERSE_GUIDE[`${chapter}-${verse}`]
  if (!hit) return []
  const [slug, cta] = hit
  return [{ slug, title: GUIDES[slug], cta, image: ICON, href: `${DHYAAN_LEARN}/${slug}`, source: 'dhyaan' }]
}
