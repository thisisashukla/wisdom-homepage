/**
 * Content map for /learn. Four pillars, each a long-form guide on its head term,
 * with cluster articles underneath. The /learn index, pillar pages, sitemap,
 * llms.txt and footer all read from here. Plan: dhyaan/lp/03-seo.md.
 */
export type PillarId = 'measuring' | 'devices' | 'silent' | 'dhyana'

export const PILLARS: { id: PillarId; slug: string; mins: number; title: string; short: string; blurb: string }[] = [
  {
    id: 'measuring',
    slug: 'measuring-meditation', mins: 7,
    title: 'How to measure meditation (and what no sensor can tell you)',
    short: 'Measuring meditation',
    blurb: 'What your heart, breath and stillness can really show about a sit, where they mislead you, and how to read your own numbers without turning practice into a test.',
  },
  {
    id: 'devices',
    slug: 'meditation-apple-watch-airpods', mins: 5,
    title: 'Meditating with Apple Watch and AirPods: the complete guide',
    short: 'Apple Watch & AirPods',
    blurb: 'What your Watch and AirPods can sense while you sit, what Apple’s Mindfulness app covers and where it stops, and how to set up a quiet, phone-free practice.',
  },
  {
    id: 'silent',
    slug: 'silent-meditation', mins: 5,
    title: 'Silent meditation: how to sit without a voice in your ear',
    short: 'Silent meditation',
    blurb: 'How to meditate in silence at home, one step at a time: where to sit, how to time it, where to put your attention, and what to do when it wanders.',
  },
  {
    id: 'dhyana',
    slug: 'dhyana', mins: 5,
    title: 'Dhyana: what meditation means in yoga and the Bhagavad Gita',
    short: 'Dhyana',
    blurb: 'What dhyāna (ध्यान) means, how it differs from dhāraṇā and samādhi, how the Bhagavad Gita describes it, and how to practise it simply.',
  },
]

export const pillarById = (id: PillarId) => PILLARS.find((p) => p.id === id)!

export type ArticleRow = { slug: string; mins: number; pillar: PillarId; title: string; blurb: string; published: string; updated?: string }

export const ARTICLES: ArticleRow[] = [
  // Measuring meditation
  {
    slug: 'is-my-meditation-working', mins: 5,
    pillar: 'measuring',
    title: 'How to know if your meditation is working',
    blurb: 'Five signs you can check yourself, what a watch or AirPods can and can’t see, and why a meditation score sends you the wrong way.',
    published: '2026-11-06',
  },
  {
    slug: 'heart-rate-during-meditation', mins: 5,
    pillar: 'measuring',
    title: 'What happens to your heart rate when you meditate',
    blurb: 'Your heart rate usually eases down a few beats while you sit. Sometimes it climbs. Here is what drives both, and how to read your own numbers.',
    published: '2026-11-06',
  },
  {
    slug: 'meditation-and-hrv', mins: 5,
    pillar: 'measuring',
    title: 'Does meditation increase HRV? What the research actually shows',
    blurb: 'Your HRV jumps during a sit. Most of that jump comes from slow breathing, and 19 trials found little lasting change. Here is how to read the number on your watch.',
    published: '2026-11-06',
  },
  {
    slug: 'falling-asleep-during-meditation', mins: 4,
    pillar: 'measuring',
    title: 'Falling asleep during meditation: why it happens and how to tell',
    blurb: 'Your head drops, then snaps back up. Why stillness tips into sleep, how to spot a doze, and how to stay awake without forcing it.',
    published: '2026-11-06',
  },
  // Apple Watch & AirPods
  {
    slug: 'track-meditation-apple-watch', mins: 4,
    pillar: 'devices',
    title: 'How to track meditation on Apple Watch',
    blurb: 'Log a sit with the Mindfulness app, find it in Apple Health, get a deleted Mindfulness app back, and see what Apple’s own tracking leaves out.',
    published: '2026-11-06',
  },
  {
    slug: 'meditate-with-airpods', mins: 4,
    pillar: 'devices',
    title: 'Can you meditate with AirPods in? Yes, and here’s what they notice',
    blurb: 'Noise cancellation or transparency, comfort on long sits, and what the motion sensors inside your AirPods quietly notice while you meditate.',
    published: '2026-11-06',
  },
  {
    slug: 'meditate-without-your-phone', mins: 3,
    pillar: 'devices',
    title: 'How to meditate without your phone (using only Apple Watch)',
    blurb: 'Start the sit from your wrist, feel the bell as a tap, keep notifications out, and still find out afterwards what happened while your eyes were closed.',
    published: '2026-11-06',
  },
  // Silent meditation
  {
    slug: 'guided-vs-silent-meditation', mins: 4,
    pillar: 'silent',
    title: 'Guided vs silent meditation: which is better for you?',
    blurb: 'What the small pile of research says, when a voice helps, when it starts getting in the way, and an easy route from guided to silent sits.',
    published: '2026-11-06',
  },
  {
    slug: 'how-long-should-you-meditate', mins: 4,
    pillar: 'silent',
    title: 'How long should you meditate each day?',
    blurb: 'What studies on dose and frequency found, why sitting most days beats sitting long, and an easy way to pick a length you will keep.',
    published: '2026-11-06',
  },
  {
    slug: 'meditation-without-streaks', mins: 4,
    pillar: 'silent',
    title: 'How to keep meditating without streaks or guilt',
    blurb: 'A broken streak makes people quit. What habit research says about missed days, and why a weekly sankalpa is a kinder target to keep.',
    published: '2026-11-06',
  },
  // Dhyana
  {
    slug: 'dhyana-mudra', mins: 4,
    pillar: 'dhyana',
    title: 'Dhyana mudra: how to hold your hands in meditation',
    blurb: 'How to form dhyāna mudrā, which hand goes on top, what your thumbs give away about your attention, and the small mistakes that make it tiring.',
    published: '2026-11-06',
  },
  {
    slug: 'trataka', mins: 4,
    pillar: 'dhyana',
    title: 'Trataka (candle gazing): how to do it safely',
    blurb: 'The classical instruction from the Haṭha Yoga Pradīpikā, a gentle beginner practice you can do tonight, what the small studies found, and who should skip it.',
    published: '2026-11-06',
  },
  {
    slug: 'japa-meditation', mins: 4,
    pillar: 'dhyana',
    title: 'Japa meditation: how to meditate with a mantra and a mala',
    blurb: 'What japa is, how to move through 108 beads, the three ways of chanting, and how to keep count without losing the mantra halfway round.',
    published: '2026-11-06',
  },
]

export const articlesFor = (id: PillarId) => ARTICLES.filter((a) => a.pillar === id)
export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug)

/** Pillar of any /learn slug (pillar guides included), for covers and labels. */
export const pillarOfSlug = (slug: string): PillarId | undefined =>
  PILLARS.find((p) => p.slug === slug)?.id ?? ARTICLES.find((a) => a.slug === slug)?.pillar
