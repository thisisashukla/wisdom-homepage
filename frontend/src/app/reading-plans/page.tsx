import type { Metadata } from 'next'
import ReadingPlansHub from './ReadingPlansHub'

const URL = 'https://wisdomquotes.in/reading-plans'
const TITLE = 'Bhagavad Gita Reading Plans: 7 Verses for What You Face'
const DESCRIPTION =
  'Free Bhagavad Gita reading plans: seven verses each on overthinking, stress, grief, anger, guilt, gratitude, joy, new beginnings and more. Plus the whole Gita in 18 days.'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Wisdom` },
  description: DESCRIPTION,
  keywords: 'bhagavad gita reading plan, bhagavad gita reading plans, bhagavad gita verses by topic, gita shlokas for life problems, how to read the bhagavad gita, gita reading schedule',
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: 'website', siteName: 'Wisdom', images: [{ url: 'https://wisdomquotes.in/og/reading-plans.webp', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['https://wisdomquotes.in/og/reading-plans.webp'] },
}

export default function ReadingPlansPage() {
  return <ReadingPlansHub variant="in" />
}
