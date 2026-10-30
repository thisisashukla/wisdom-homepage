import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import LearnMode from '@/components/funnels/hanuman-chalisa/LearnMode'
import ScriptToggle from '@/components/funnels/hanuman-chalisa/ScriptToggle'
import { HcNextStep } from '@/components/funnels/hanuman-chalisa/Blocks'
import {
  abs,
  beads,
  breadcrumbLd,
  editionCitation,
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
    'Memorise the Hanuman Chalisa in 11 days: four lines a day, words that fade as you learn them, and a mala that turns green as you go. Saved on your device.',
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

  return (
    <main className="hc-main">
      <BlogTracker pageName={PAGE} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson([howTo, crumbs]) }} />
      <nav className="hc-crumbs" aria-label="Breadcrumb">
        <a href="/">Wisdom</a> / <a href={HUB_PATH}>Hanuman Chalisa</a> / <span>Learn by heart</span>
      </nav>
      <h1 className="hc-h1">Learn the Hanuman Chalisa by heart, four lines a day</h1>
      <p className="hc-quick" id="quick-answer">
        Most people learn the Hanuman Chalisa in about 11 days at four lines a day. Read the day&apos;s four lines aloud with their
        meaning, hide a few words at a time until you can say each line without looking, then mark it. Start each day by saying
        yesterday&apos;s lines once. Your progress stays on this device.
      </p>
      <div className="hc-controls">
        <ScriptToggle locale="en" page={PAGE} />
      </div>
      <p className="hc-note">
        Many parents do this with children at bedtime: one line from the parent, the same line back from the child.
      </p>
      <div style={{ marginTop: 24 }}>
        <LearnMode lines={lines} beads={beads('en', 'page')} locale="en" page={PAGE} />
      </div>
      <HcNextStep locale="en" pageName={PAGE} pageKey="hc-learn" placement="learn_end" />
    </main>
  )
}
