import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { JsonLd, NextStep, PageHero, ScriptToggle, Section } from '@/components/site'
import LearnMode from '@/components/funnels/hanuman-chalisa/LearnMode'
import { abs, pageMeta, PUBLISHER_LD } from '@/lib/seo'
import { beads, editionCitation, getUnit, getUnits, HUB_PATH, LEARN_PATH, NEXT_COPY, START_SITUATION, toLineView, unitVerse } from '@/lib/funnels/hanuman-chalisa'

export const metadata: Metadata = pageMeta({
  title: 'Learn the Hanuman Chalisa by Heart, 4 Lines a Day | Wisdom',
  description:
    'Learn the Hanuman Chalisa by heart in about 11 days. Say four lines a day aloud with their meaning until each one stays with you.',
  path: LEARN_PATH,
})

export default function LearnPage() {
  const units = getUnits()
  const lines = units.map((u) => toLineView(u, 'en'))
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Learn the Hanuman Chalisa by heart in 11 days',
    url: abs(LEARN_PATH),
    totalTime: 'P11D',
    publisher: PUBLISHER_LD,
    citation: editionCitation,
    step: [
      { '@type': 'HowToStep', name: 'Read four lines aloud', text: 'Read the day\'s four lines aloud with their meaning, two or three times.' },
      { '@type': 'HowToStep', name: 'Hide words', text: 'Hide more words each round and say the line with the gaps.' },
      { '@type': 'HowToStep', name: 'Mark what you can say', text: 'When you can say a line with every word hidden, mark it learned.' },
      { '@type': 'HowToStep', name: 'Repeat the day before', text: 'Each new day, say the earlier lines once before starting the next four.' },
    ],
  }
  const d2 = getUnit('hc.d2')!

  return (
    <main>
      <PageTracker pageName="Hanuman Chalisa Learn" />
      <JsonLd data={howTo} />

      <PageHero
        crumbs={[
          { label: 'Hanuman Chalisa', href: HUB_PATH },
          { label: 'Learn by heart', href: LEARN_PATH },
        ]}
        eyebrow="Learn by heart"
        title="Learn the Hanuman Chalisa by heart, four lines a day"
        sub={
          <span id="quick-answer">
            Most people learn the Hanuman Chalisa in about 11 days at four lines a day. Read the day&apos;s four lines aloud with their
            meaning, and keep at each one until you can say it without looking. Start each day by saying
            yesterday&apos;s lines once.
          </span>
        }
        facts={['About 11 days', 'Four lines a day']}
        actions={[{ href: '#hc-learn', label: 'Start with today\'s four lines', location: 'learn_hero_start' }]}
        verse={{ ...unitVerse(d2), label: 'Doha 2, asking for strength and wisdom' }}
      />

      <Section id="hc-learn" tone="band">
        <div className="hc-controls rv">
          <ScriptToggle />
        </div>
        <p className="hc-note rv">Many parents do this with children at bedtime: one line from the parent, the same line back from the child.</p>
        <div className="hc-gap rv">
          <LearnMode lines={lines} beads={beads('en', 'page')} locale="en" />
        </div>
      </Section>

      <Section className="hc-next">
        <NextStep locale="en" pageKey="hc-learn" placement="learn_end" startSituation={START_SITUATION} copy={NEXT_COPY.en} />
      </Section>
    </main>
  )
}
