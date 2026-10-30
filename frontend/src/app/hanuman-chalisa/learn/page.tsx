import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import LearnMode from '@/components/funnels/hanuman-chalisa/LearnMode'
import ScriptToggle from '@/components/funnels/hanuman-chalisa/ScriptToggle'
import { HcNextStep } from '@/components/funnels/hanuman-chalisa/Blocks'
import HcHero, { HeroLine } from '@/components/funnels/hanuman-chalisa/Hero'
import {
  abs,
  beads,
  breadcrumbLd,
  editionCitation,
  getUnit,
  getUnits,
  HUB_PATH,
  LEARN_PATH,
  ldJson,
  pageMeta,
  PUBLISHER_LD,
  toLineView,
} from '@/lib/funnels/hanuman-chalisa'

const PAGE = 'hanuman-chalisa-learn'

export const metadata: Metadata = pageMeta({
  title: 'Learn the Hanuman Chalisa by Heart, 4 Lines a Day | Wisdom',
  description:
    'Memorise the Hanuman Chalisa in 11 days: four lines a day, words that fade as you learn them, and a mala that fills with gold as you go. Saved on your device.',
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
  const crumbs = breadcrumbLd([
    { name: 'Wisdom', path: '/' },
    { name: 'Hanuman Chalisa', path: HUB_PATH },
    { name: 'Learn by heart', path: LEARN_PATH },
  ])

  const d2 = getUnit('hc.d2')!

  return (
    <main className="hc-main">
      <BlogTracker pageName={PAGE} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson([howTo, crumbs]) }} />

      <HcHero
        crumbs={
          <nav className="hc-crumbs" aria-label="Breadcrumb">
            <a href="/">Wisdom</a> / <a href={HUB_PATH}>Hanuman Chalisa</a> / <span>Learn by heart</span>
          </nav>
        }
        eyebrow="Learn by heart"
        title="Learn the Hanuman Chalisa by heart, four lines a day"
        sub={
          <>
            Most people learn the Hanuman Chalisa in about 11 days at four lines a day. Read the day&apos;s four lines aloud with their
            meaning, hide a few words at a time until you can say each line without looking, then mark it. Start each day by saying
            yesterday&apos;s lines once. Your progress stays on this device.
          </>
        }
        facts={['11 days', '4 lines a day', 'Saved on this device']}
        actions={
          <a href="#hc-learn" className="btn-read-gita btn-read-gita-primary" data-mp-location="learn_hero_start">
            Start with today&apos;s four lines
          </a>
        }
        visual={<HeroLine awadhi={d2.awadhi} iast={d2.iast} caption="Doha 2, asking for strength and wisdom" />}
      />

      <section className="section hc-band" id="hc-learn" aria-label="Learn mode">
        <div className="wrap">
          <div className="hc-controls rv">
            <ScriptToggle locale="en" page={PAGE} />
          </div>
          <p className="hc-note rv" style={{ margin: '0 0 30px' }}>
            Many parents do this with children at bedtime: one line from the parent, the same line back from the child.
          </p>
          <div className="rv">
            <LearnMode lines={lines} beads={beads('en', 'page')} locale="en" page={PAGE} />
          </div>
        </div>
      </section>

      <section className="section section-alt hc-band">
        <div className="wrap hc-col">
          <HcNextStep locale="en" pageName={PAGE} pageKey="hc-learn" placement="learn_end" />
        </div>
      </section>
    </main>
  )
}
