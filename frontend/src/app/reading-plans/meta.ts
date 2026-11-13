import type { Metadata } from 'next'

/** One title and description for /reading-plans, shared by the India page and the global variant
 *  (middleware rewrites non-India visitors and Googlebot to /reading-plans/global; the URL stays the same). */
export const HUB_URL = 'https://wisdomquotes.in/reading-plans'
export const HUB_TITLE = 'Bhagavad Gita Reading Plan: 7, 18 and 30 Days, or a Verse a Day'
export const HUB_DESCRIPTION =
  'Free Bhagavad Gita reading plans: the whole Gita in 7, 18 or 30 days, one verse each morning, or seven verses for overthinking, stress, grief and more. Sanskrit and plain English.'

export const HUB_METADATA: Metadata = {
  title: { absolute: `${HUB_TITLE} | Wisdom` },
  description: HUB_DESCRIPTION,
  keywords:
    'bhagavad gita reading plan, gita reading plan, bhagavad gita reading schedule, bhagavad gita daily reading, how to read the bhagavad gita, bhagavad gita in 30 days, bhagavad gita one verse a day, bhagavad gita verses by topic',
  alternates: { canonical: HUB_URL },
  openGraph: { title: HUB_TITLE, description: HUB_DESCRIPTION, url: HUB_URL, type: 'website', siteName: 'Wisdom', images: [{ url: 'https://wisdomquotes.in/og/reading-plans.webp', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: HUB_TITLE, description: HUB_DESCRIPTION, images: ['https://wisdomquotes.in/og/reading-plans.webp'] },
}
