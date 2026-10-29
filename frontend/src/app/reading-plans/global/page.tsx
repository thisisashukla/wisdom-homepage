import type { Metadata } from 'next'
import ReadingPlansHub from '../ReadingPlansHub'

/**
 * /reading-plans with the global image set. Middleware rewrites non-India visitors here; the URL stays
 * /reading-plans. Must stay indexable: Googlebot crawls from the US and gets this variant. Direct hits on
 * /reading-plans/global are 308'd to /reading-plans by the middleware.
 */
export const metadata: Metadata = {
  description:
    'Free Bhagavad Gita reading plans: seven verses each on overthinking, stress, grief, anger, guilt, gratitude, joy, new beginnings and more. Plus the whole Gita in 18 days.',
  openGraph: { title: 'Bhagavad Gita Reading Plans: 7 Verses for What You Face', url: 'https://wisdomquotes.in/reading-plans', type: 'website', siteName: 'Wisdom', images: [{ url: 'https://wisdomquotes.in/og/reading-plans.webp', width: 1200, height: 630 }] },
  title: { absolute: 'Bhagavad Gita Reading Plans: 7 Verses for What You Face | Wisdom' },
  alternates: { canonical: 'https://wisdomquotes.in/reading-plans' },
}

export default function ReadingPlansGlobal() {
  return <ReadingPlansHub variant="global" />
}
