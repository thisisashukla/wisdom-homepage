import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import PageTracker from '@/components/BlogTracker'
import { PageHero, Section } from '@/components/site'
import VerseSearch from '@/components/search/VerseSearch'
import { pageMeta } from '@/lib/seo'
import { DISPLAY_TOTAL_VERSES } from '@/lib/readingProgress'

const PATH = '/search'

export const metadata: Metadata = pageMeta({
  path: PATH,
  title: 'Find a Gita verse by number or by a line you remember',
  description:
    'Type a verse number like 2.47 or a line you half remember, in English letters or Devanagari, and go straight to it. Bhagavad Gita, Ashtavakra Gita, Hanuman Chalisa, Kabir and the Upanishads.',
  twin: { en: PATH, hi: '/hi/search' },
  type: 'website',
})

export default function SearchPage() {
  return (
    <>
      <PageTracker pageName="Verse Search" />
      <Nav locale="en" />
      <main lang="en">
        <PageHero
          crumbs={[{ label: 'Find a verse', href: PATH }]}
          eyebrow="Verse search"
          title="Find a verse"
          sub="Type a verse number or a line you remember, in English letters or Devanagari. The spelling does not have to be exact."
          facts={[`Bhagavad Gita, all ${DISPLAY_TOTAL_VERSES} verses`, 'Ashtavakra Gita', 'Hanuman Chalisa', 'Kabir and the Upanishads']}
          scriptToggle
        />
        <Section spacing="tight" track="search_box">
          <VerseSearch lang="en" location="search_page" />
          <p className="vs-later">
            Half remember a verse? Type one word from its meaning, like duty, fear or surrender, and look through the verses that come up.
          </p>
        </Section>
      </main>
      <SiteFooter locale="en" />
    </>
  )
}
