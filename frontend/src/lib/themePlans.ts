/**
 * Topic reading plans ("theme plans"): seven fixed, reviewed verses per topic, Gita first.
 * Content lives in src/content/plans/<slug>.json and renders on /gita-for/<slug>.
 * Static imports only (no fs), so this module is safe in middleware (edge) too.
 */
import overthinking from '@/content/plans/overthinking.json'
import stress from '@/content/plans/stress.json'
import fearOfFailure from '@/content/plans/fear-of-failure.json'
import grief from '@/content/plans/grief.json'
import anger from '@/content/plans/anger.json'
import losingHope from '@/content/plans/losing-hope.json'
import guilt from '@/content/plans/guilt.json'
import comparison from '@/content/plans/comparison.json'
import decisionMaking from '@/content/plans/decision-making.json'
import loneliness from '@/content/plans/loneliness.json'
import gratitude from '@/content/plans/gratitude.json'
import success from '@/content/plans/success.json'
import newBeginnings from '@/content/plans/new-beginnings.json'
import devotion from '@/content/plans/devotion.json'
import joy from '@/content/plans/joy.json'

export type PlanPhase = 'see' | 'understand' | 'steady' | 'act' | 'story'

export type PlanStory = { title: string; source: string; body: string; lesson: string }

export type PlanDay = {
  day: number
  phase: PlanPhase
  heading: string
  /** [chapter, verse] of the Gita verse for verse days. */
  ref?: number[]
  /** Our own English for the verse, one line. */
  line?: string
  forYou: string
  today: string
  /** Misuse guard shown under the day, when the verse is easy to misread. */
  note?: string
  story?: PlanStory
  /** A verse from another text (story steps): our own English, never machine-written. */
  verse?: { sanskrit: string; line: string; ref: string }
  /** Gita verse a story day points to, if any. */
  anchor?: number[]
}

export type ThemePlan = {
  slug: string
  label: string
  title: string
  description: string
  h1: string
  subtitle: string
  keywords: string[]
  intro: string
  crisis?: boolean
  image: { src: string; srcGlobal: string; fallback: string; alt: string; altGlobal: string }
  days: PlanDay[]
  faq: { q: string; a: string }[]
}

export const THEME_PLANS: ThemePlan[] = [
  overthinking, stress, fearOfFailure, grief, anger, losingHope, guilt, comparison, decisionMaking, loneliness,
  gratitude, success, newBeginnings, devotion, joy,
] as ThemePlan[]

export const THEME_SLUGS = THEME_PLANS.map((p) => p.slug)

export const themePlanBySlug = (slug: string): ThemePlan | undefined => THEME_PLANS.find((p) => p.slug === slug)

export const PHASE_LABEL: Record<PlanPhase, string> = {
  see: 'See it',
  understand: "What's underneath",
  steady: 'Steady',
  act: 'Do',
  story: 'A story',
}

/** First-published date of the plan pages (for schema and sitemap). */
export const THEME_PLANS_PUBLISHED = '2026-10-29'

/** Further reading on the site, per plan. Every path here exists under src/app. */
export const THEME_READING: Record<string, { href: string; label: string }[]> = {
  overthinking: [
    { href: '/blogs/bhagavad-gita-on-anxiety', label: 'What the Bhagavad Gita says about anxiety' },
    { href: '/gita/chapter/6', label: 'Chapter 6: the mind and meditation' },
  ],
  stress: [
    { href: '/blogs/sthitaprajna-bhagavad-gita', label: 'Sthitaprajna: the person of steady mind' },
    { href: '/blogs/bhagavad-gita-anxiety-mental-peace', label: 'The Gita on anxiety and mental peace' },
  ],
  'fear-of-failure': [
    { href: '/gita/chapter/2/verse/47', label: 'Karmanye Vadhikaraste (2.47) explained' },
    { href: '/blogs/nishkama-karma-bhagavad-gita', label: 'Nishkama karma: acting without craving results' },
  ],
  grief: [
    { href: '/blogs/bhagavad-gita-on-death-and-the-soul', label: 'The Bhagavad Gita on death and the soul' },
    { href: '/blogs/atman-not-soul-bhagavad-gita', label: 'Why atman is not quite "soul"' },
  ],
  anger: [
    { href: '/blogs/sthitaprajna-bhagavad-gita', label: 'Sthitaprajna: the person of steady mind' },
    { href: '/blogs/sattva-rajas-tamas-three-gunas-bhagavad-gita', label: 'Sattva, rajas and tamas: the three gunas' },
  ],
  'losing-hope': [
    { href: '/gita/chapter/2', label: 'Chapter 2: where Krishna begins' },
    { href: '/blogs/bhagavad-gita-for-beginners', label: 'The Bhagavad Gita for beginners' },
  ],
  guilt: [
    { href: '/blogs/bhagavad-gita-karma-meaning', label: 'What karma means in the Gita' },
    { href: '/gita/chapter/9', label: 'Chapter 9: the royal secret' },
  ],
  comparison: [
    { href: '/blogs/dharma-meaning-bhagavad-gita', label: 'What dharma means in the Gita' },
    { href: '/blogs/ahankara-meaning-bhagavad-gita', label: 'Ahankara: the ego that keeps score' },
  ],
  'decision-making': [
    { href: '/blogs/dharma-meaning-bhagavad-gita', label: 'What dharma means in the Gita' },
    { href: '/gita/chapter/18', label: 'Chapter 18: the final teaching' },
  ],
  loneliness: [
    { href: '/blogs/krishna-three-paths-bhagavad-gita', label: "Krishna's three paths" },
    { href: '/gita/chapter/12', label: 'Chapter 12: the path of devotion' },
  ],
  gratitude: [
    { href: '/gita/chapter/15', label: 'Chapter 15: the supreme person' },
    { href: '/blogs/bhagavad-gita-karma-meaning', label: 'What karma means in the Gita' },
  ],
  success: [
    { href: '/blogs/ahankara-meaning-bhagavad-gita', label: 'Ahankara: the ego that keeps score' },
    { href: '/blogs/sattva-rajas-tamas-three-gunas-bhagavad-gita', label: 'Sattva, rajas and tamas: the three gunas' },
  ],
  'new-beginnings': [
    { href: '/blogs/nishkama-karma-bhagavad-gita', label: 'Nishkama karma: acting without craving results' },
    { href: '/blogs/bhagavad-gita-for-beginners', label: 'The Bhagavad Gita for beginners' },
  ],
  devotion: [
    { href: '/gita/chapter/12', label: 'Chapter 12: the path of devotion' },
    { href: '/blogs/hare-krishna-mahamantra', label: 'The Hare Krishna mahamantra' },
  ],
  joy: [
    { href: '/blogs/sthitaprajna-bhagavad-gita', label: 'Sthitaprajna: the person of steady mind' },
    { href: '/gita/chapter/5', label: 'Chapter 5: renunciation and joy' },
  ],
}

/** Every plan day that uses a given Gita verse (for "part of a plan" links on verse pages). */
export function plansForVerse(chapter: number, verse: number): { plan: ThemePlan; day: PlanDay }[] {
  const out: { plan: ThemePlan; day: PlanDay }[] = []
  for (const plan of THEME_PLANS) {
    for (const day of plan.days) {
      const r = day.ref ?? day.anchor
      if (r && r[0] === chapter && r[1] === verse) out.push({ plan, day })
    }
  }
  return out
}

/** Hub filter tabs on /reading-plans. */
export const PLAN_GROUPS = [
  { id: 'mind', label: 'A busy mind', slugs: ['overthinking', 'stress', 'anger'] },
  { id: 'hard', label: 'Hard times', slugs: ['grief', 'losing-hope', 'loneliness'] },
  { id: 'self', label: 'How I see myself', slugs: ['comparison', 'guilt'] },
  { id: 'work', label: 'Work and choices', slugs: ['fear-of-failure', 'decision-making'] },
  { id: 'good', label: 'Good days', slugs: ['gratitude', 'success', 'new-beginnings', 'devotion', 'joy'] },
] as const

export const planGroupOf = (slug: string) => PLAN_GROUPS.find((g) => (g.slugs as readonly string[]).includes(slug))?.id ?? 'mind'

const countWords = (s?: string) => (s ? s.trim().split(/\s+/).length : 0)

/**
 * Reading time per day, in minutes, at ~180 words a minute (slow, reflective reading). Adds ~45 words
 * for the full translation and ~45 seconds for the Sanskrit recitation on verse days.
 */
export function planMinutesPerDay(plan: ThemePlan): number {
  const total = plan.days.reduce((sum, d) => {
    const w = countWords(d.line) + countWords(d.verse?.line) + countWords(d.forYou) + countWords(d.today) + countWords(d.note) + countWords(d.story?.body) + countWords(d.story?.lesson)
    return sum + w / 180 + (d.ref ? 45 / 180 + 0.75 : 0.25)
  }, 0)
  return Math.max(2, Math.round(total / plan.days.length))
}

/** Total reading time for all seven verses, in minutes. */
export const planMinutesTotal = (plan: ThemePlan) => planMinutesPerDay(plan) * plan.days.length

/** "Gita, then the Ramayana" style source line for a plan. */
export function planSources(plan: ThemePlan): string {
  const other = plan.days.map((d) => (d.ref ? null : (d.verse?.ref ?? d.story?.source ?? '').split(',')[0])).filter(Boolean) as string[]
  const names = Array.from(new Set(other.map((o) => o.replace(/^Valmiki /, '').replace(/\s+[\d.]+$/, ''))))
  return names.length ? `Gita, then the ${names.join(' and the ')}` : 'All from the Gita'
}

/** The plan's opening verse reference ("Gita 6.34"), for cards. */
export const planOpening = (plan: ThemePlan) => {
  const r = plan.days[0]?.ref
  return r ? `Gita ${r[0]}.${r[1]}` : null
}
