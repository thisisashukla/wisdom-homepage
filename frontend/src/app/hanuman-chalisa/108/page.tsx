import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { NextStep, PageHero, ScriptToggle, Section } from '@/components/site'
import Counter from '@/components/funnels/hanuman-chalisa/Counter'
import { MeaningTracker } from '@/components/funnels/hanuman-chalisa/Trackers'
import { FullText } from '@/components/funnels/hanuman-chalisa/Blocks'
import { pageMeta } from '@/lib/seo'
import { beads, COUNTER_PATH, getUnit, getUnits, HOW_MANY_PATH, HUB_PATH, NEXT_COPY, START_SITUATION, unitVerse } from '@/lib/funnels/hanuman-chalisa'

export const metadata: Metadata = pageMeta({
  title: 'Hanuman Chalisa 108 Times Counter, or 7, 11, 21 | Wisdom',
  description:
    'Set a sankalp of 7, 11, 21 or 108 Hanuman Chalisa recitations, or a 40-day vow, and keep count as you recite, with the full text to read along.',
  path: COUNTER_PATH,
})

export default function CounterPage() {
  const c39 = getUnit('hc.c39')!
  return (
    <main>
      <PageTracker pageName="Hanuman Chalisa Counter" />
      <MeaningTracker />

      <PageHero
        crumbs={[
          { label: 'Hanuman Chalisa', href: HUB_PATH },
          { label: 'Recitation counter', href: COUNTER_PATH },
        ]}
        eyebrow="Recitation counter"
        title="Count your Hanuman Chalisa recitations"
        sub={
          <span id="quick-answer">
            Choose a sankalp of 7, 11, 21 or 108 recitations of the Hanuman Chalisa, or a 40-day vow of one recitation a day. Mark each
            one as you finish it, and read along with the text below.
          </span>
        }
        facts={['7, 11, 21 or 108', '40-day vow']}
        actions={[{ href: '#hc-count', label: 'Choose your sankalp', location: 'counter_hero_start' }]}
        verse={{ ...unitVerse(c39), label: 'Chaupai 39' }}
      />

      <Section id="hc-count" tone="band">
        <div className="rv">
          <Counter beads={beads('en', 'anchor')} />
        </div>
        <p className="hc-note rv hc-gap">
          What the Chalisa says about counting is in chaupai 38. <a href={HOW_MANY_PATH}>How many times to recite it</a>.
        </p>
      </Section>

      <Section id="hc-text" eyebrow="43 lines" title="Read along">
        <div className="hc-controls">
          <ScriptToggle />
        </div>
        <FullText units={getUnits()} locale="en" />
      </Section>

      <Section tone="band" className="hc-next">
        <NextStep locale="en" pageKey="hc-108" placement="counter_end" startSituation={START_SITUATION} copy={NEXT_COPY.en} />
      </Section>
    </main>
  )
}
