import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { JsonLd, NextStep, PageHero, Section } from '@/components/site'
import '@/components/learn/learn.css'
import KeyIdeasList from '@/components/learn/KeyIdeasList'
import { gitaLine, verseProps } from '@/lib/gitaLines'
import { LEARNING_PATH, PATH_HUB, PATH_LENGTH, stepUrl } from '@/lib/learningPath'
import { abs, pageMeta } from '@/lib/seo'

const PATH = PATH_HUB.en
const TITLE = `${PATH_LENGTH} Key Ideas of the Bhagavad Gita, in Order | Wisdom`
const DESCRIPTION =
  'Dharma, karma, karma yoga, the gunas, the mind, the Self, bhakti and moksha: the twelve core ideas of the Bhagavad Gita in an order that builds, each with its verses.'

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  twin: { en: PATH_HUB.en, hi: PATH_HUB.hi },
})

export default async function KeyIdeasPage() {
  const v = await gitaLine(2, 7)
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${PATH_LENGTH} key ideas of the Bhagavad Gita`,
    description: DESCRIPTION,
    url: abs(PATH),
    inLanguage: 'en',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: PATH_LENGTH,
    itemListElement: LEARNING_PATH.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title.en,
      url: abs(stepUrl(s, 'en')),
    })),
  }

  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Gita Key Ideas" />
      <main lang="en">
        <PageHero
          crumbs={[
            { label: 'Bhagavad Gita', href: '/gita' },
            { label: `${PATH_LENGTH} key ideas`, href: PATH },
          ]}
          eyebrow="A path through the Gita"
          title={`${PATH_LENGTH} key ideas of the Gita`}
          sub="Twelve words carry most of the Gita’s teaching. Read in this order, each one makes the next easier to understand, from duty and action through the mind and the Self to devotion and freedom."
          facts={['From dharma to moksha', 'Each idea leads to the next']}
          actions={[
            { href: '#path', label: 'Start with dharma', location: 'key_ideas_hero_start' },
            { href: PATH_HUB.hi, label: 'हिन्दी में पढ़ें', location: 'key_ideas_hero_hi', hrefLang: 'hi' },
          ]}
          verse={{ ...verseProps(v), label: 'Arjuna, asking to be taught' }}
        />

        <Section
          id="path"
          track="key_ideas_path"
          title="The path, in order"
          intro="Each idea opens into its own page with every verse on it. The line under each says why it sits where it does."
          width="narrow"
        >
          <KeyIdeasList lang="en" from="key_ideas" />
        </Section>

        <Section tone="band" track="key_ideas_how" title="How these are read" width="narrow">
          <div className="sx-prose rv">
            <p>
              The intros follow the traditional Sanskrit commentators, Shankaracharya and Ramanujacharya, and the Hindi of the Gita Press. Where
              they read a word differently, we say so. Verse numbers follow the verse pages on this site.
            </p>
            <p>
              The order is a reading order, one way in. The Gita itself moves back and forth between these ideas across its eighteen chapters.
            </p>
          </div>
        </Section>

        <Section track="next_step" width="narrow">
          <div className="rv">
            <NextStep locale="en" pageKey="key-ideas" placement="end" />
          </div>
        </Section>
      </main>
    </>
  )
}
