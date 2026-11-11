import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { JsonLd, LinkCards, NextStep, PageHero, Section } from '@/components/site'
import { CURIOUS_CONCEPTS, CURIOUS_NEXT, CURIOUS_START, HUB_PATH, curiousArticleLd, curiousCards } from '@/lib/curious'
import { gitaLine, verseProps } from '@/lib/gitaLines'
import { abs, pageMeta } from '@/lib/seo'

const TITLE = 'Understand the Bhagavad Gita Through Ideas You Already Know'
const DESCRIPTION =
  'Oppenheimer’s line, Stoicism, karma, dharma, maya: many readers meet the Bhagavad Gita through ideas they already know. These pages start there and walk back to the Sanskrit, verse by verse.'

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: HUB_PATH })

export default async function UnderstandTheGitaPage() {
  const v = await gitaLine(18, 63)
  const all = [...CURIOUS_START, ...CURIOUS_CONCEPTS]
  const ld = [
    curiousArticleLd({
      path: HUB_PATH,
      headline: 'Understand the Bhagavad Gita through ideas you already know',
      description: DESCRIPTION,
      datePublished: '2026-11-11',
      dateModified: '2026-11-11',
      about: ['Bhagavad Gita'],
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Understand the Bhagavad Gita',
      itemListElement: all.map((e, i) => ({ '@type': 'ListItem', position: i + 1, name: e.title, url: abs(e.href) })),
    },
  ]

  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Understand The Gita" />
      <main lang="en">
        <PageHero
          crumbs={[{ label: 'Understand the Gita', href: HUB_PATH }]}
          eyebrow="For curious readers"
          title="Understand the Bhagavad Gita through what you already know"
          sub="Many readers meet the Gita sideways: through a line Oppenheimer remembered, through the Stoics, through the word karma. These pages begin where you are and walk back to the Sanskrit, one verse at a time."
          actions={[
            { href: '#start', label: 'Choose a way in', location: 'understand_hero_start' },
            { href: '/blogs/bhagavad-gita-for-beginners', label: 'What is the Gita?', location: 'understand_hero_what_is' },
          ]}
          verse={{ ...verseProps(v), label: 'Krishna, near the end of the Gita' }}
        />

        <Section id="start" track="start" title="Three ways in" intro="Each begins with something you may have heard, and ends at the verse it came from.">
          <LinkCards items={curiousCards(CURIOUS_START, 'understand_start')} columns={3} />
        </Section>

        <Section tone="band" id="words" track="words" title="Words that travelled" intro="Ideas from the Gita that reached English, each read back in its own context.">
          <LinkCards items={curiousCards(CURIOUS_CONCEPTS, 'understand_words')} columns={3} />
        </Section>

        <Section id="how-we-read" track="how_we_read" title="How these pages read the Gita" width="narrow">
          <div className="sx-prose rv">
            <p>
              Every verse appears with its Sanskrit, taken from our verse files, so you can see what the English stands on. Where a famous
              English line drifts from the Sanskrit, we show both and say where they part. We read the verses with the traditional Sanskrit
              commentators, Shankara, Ramanuja and those who followed them, and we quote older translations only when they are in the public
              domain.
            </p>
            <p>
              Nothing here asks you to believe anything first. Near the end of the Gita, in the verse above, Krishna asks Arjuna to reflect on
              all of it and then decide.
            </p>
          </div>
        </Section>

        <Section tone="band" track="next_step" width="narrow">
          <div className="rv">
            <NextStep locale="en" pageKey="understand" placement="end" copy={CURIOUS_NEXT} />
          </div>
        </Section>
      </main>
    </>
  )
}
