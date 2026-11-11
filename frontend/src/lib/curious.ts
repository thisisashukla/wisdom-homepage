/**
 * The "understand the Gita" pages for curious readers: the hub list, shared next-step copy and the
 * Article schema builder. Client-safe (no fs).
 */
import type { LinkCard } from '@/components/site'
import { AUTHOR_LD, PUBLISHER_LD, abs } from '@/lib/seo'

export const HUB_PATH = '/understand-the-gita'

export type CuriousKey =
  | 'oppenheimer'
  | 'stoicism'
  | 'what-is'
  | 'karma'
  | 'dharma'
  | 'maya'
  | 'atman'
  | 'gunas'
  | 'sthitaprajna'
  | 'verse-2-47'
  | 'ashtavakra'
  | 'manifestation'

type Entry = { key: CuriousKey; href: string; title: string; body: string; kicker: string }

/** Start-here pages: questions people bring from outside the tradition. */
export const CURIOUS_START: Entry[] = [
  {
    key: 'oppenheimer',
    href: '/oppenheimer-bhagavad-gita',
    kicker: 'Bhagavad Gita 11.32',
    title: '“Now I am become Death”',
    body: 'The verse Oppenheimer remembered after the first atomic test, what the Sanskrit says, and why kāla reads first as Time.',
  },
  {
    key: 'stoicism',
    href: '/blogs/bhagavad-gita-vs-stoicism',
    kicker: 'The Gita and the Stoics',
    title: 'The Bhagavad Gita and Stoicism, verse by verse',
    body: 'Five Gita verses beside Epictetus, Marcus Aurelius and Seneca, and the places where the two ways of life part.',
  },
  {
    key: 'what-is',
    href: '/blogs/bhagavad-gita-for-beginners',
    kicker: 'Start here',
    title: 'What is the Bhagavad Gita, and how to start reading it',
    body: 'Who speaks, where it sits in the Mahabharata, who wrote it, and a calm way into the first two chapters.',
  },
]

/** Words and verses that travelled into English, each read back in its own context. */
export const CURIOUS_CONCEPTS: Entry[] = [
  {
    key: 'karma',
    href: '/blogs/bhagavad-gita-karma-meaning',
    kicker: 'Karma',
    title: 'Karma means action',
    body: 'Chapters 2 to 4 on acting fully without being bound by what the action brings.',
  },
  {
    key: 'verse-2-47',
    href: '/gita/chapter/2/verse/47',
    kicker: 'Bhagavad Gita 2.47',
    title: 'Karmaṇy evādhikāras te',
    body: 'The most quoted line on work and its fruit, with the Sanskrit word by word.',
  },
  {
    key: 'dharma',
    href: '/blogs/dharma-meaning-bhagavad-gita',
    kicker: 'Dharma',
    title: 'Dharma, from the root “to hold”',
    body: 'Closer to your own nature, acted on, than to a list of duties, read through 3.35 and 18.47.',
  },
  {
    key: 'atman',
    href: '/blogs/atman-not-soul-bhagavad-gita',
    kicker: 'Ātman',
    title: 'Why “soul” is a loose fit for ātman',
    body: 'The Gita’s self set beside the Katha Upanishad and the Bible, so the differences show.',
  },
  {
    key: 'maya',
    href: '/blogs/maya-meaning-bhagavad-gita',
    kicker: 'Māyā',
    title: 'Maya, the power that makes the real look otherwise',
    body: 'Read from 7.14, where Krishna calls it divine, woven of the gunas, and hard to cross.',
  },
  {
    key: 'gunas',
    href: '/blogs/sattva-rajas-tamas-three-gunas-bhagavad-gita',
    kicker: 'The three gunas',
    title: 'Sattva, rajas and tamas',
    body: 'Clarity, drive and inertia in your food, work and moods, and chapter 14 on moving beyond all three.',
  },
  {
    key: 'sthitaprajna',
    href: '/blogs/sthitaprajna-bhagavad-gita',
    kicker: 'Sthitaprajña',
    title: 'A portrait of the steady mind',
    body: 'Verses 2.55 to 2.72, from the tortoise drawing in its limbs to the ocean that rivers fill without moving it.',
  },
  {
    key: 'manifestation',
    href: '/gita/topic/manifestation',
    kicker: 'Manifestation',
    title: 'How the divine shows itself',
    body: 'Eleven verses on the world as Krishna’s manifestation. If you came for the law of attraction, this is a different and older idea.',
  },
  {
    key: 'ashtavakra',
    href: '/ashtavakra-gita-vs-bhagavad-gita',
    kicker: 'Another Gita',
    title: 'The Ashtavakra Gita beside the Bhagavad Gita',
    body: 'A sage teaching a king that the self is already free, compared with Krishna teaching a warrior to act.',
  },
]

/** LinkCards for the hub and for "keep reading" rows (one page's own entry left out). */
export function curiousCards(entries: Entry[], location: string, exclude?: CuriousKey): LinkCard[] {
  return entries
    .filter((e) => e.key !== exclude)
    .map((e) => ({ href: e.href, title: e.title, body: e.body, kicker: e.kicker, location: `${location}_${e.key.replace(/-/g, '_')}` }))
}

/** The next step on these pages: on iPhone the app, elsewhere a week of verses on the web (/start). */
export const CURIOUS_NEXT = {
  app: { line: 'Keep one verse with you each morning, in Sanskrit and plain English, and see what it asks of your day.', cta: 'Get one verse each morning' },
  whatsapp: { line: 'One verse each morning, on WhatsApp.', cta: 'Join' },
  email: { line: 'Tell us what is on your mind and read seven verses chosen for it, one a day, with the Sanskrit and its meaning.', cta: 'Start my seven days' },
}

export function curiousArticleLd(o: {
  path: string
  headline: string
  description: string
  datePublished: string
  dateModified: string
  about?: string[]
  citation?: { name: string; url?: string; author?: string; datePublished?: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: o.headline,
    description: o.description,
    url: abs(o.path),
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(o.path) },
    inLanguage: 'en',
    datePublished: o.datePublished,
    dateModified: o.dateModified,
    image: abs('/og-image.webp'),
    author: AUTHOR_LD,
    publisher: PUBLISHER_LD,
    ...(o.about ? { about: o.about.map((name) => ({ '@type': 'Thing', name })) } : {}),
    ...(o.citation
      ? {
          citation: o.citation.map((c) => ({
            '@type': 'CreativeWork',
            name: c.name,
            ...(c.url ? { url: c.url } : {}),
            ...(c.author ? { author: { '@type': 'Person', name: c.author } } : {}),
            ...(c.datePublished ? { datePublished: c.datePublished } : {}),
          })),
        }
      : {}),
  }
}
