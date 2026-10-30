import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Counter from '@/components/funnels/hanuman-chalisa/Counter'
import ScriptToggle from '@/components/funnels/hanuman-chalisa/ScriptToggle'
import { MeaningTracker } from '@/components/funnels/hanuman-chalisa/Trackers'
import { FullText, HcNextStep } from '@/components/funnels/hanuman-chalisa/Blocks'
import HcHero, { HeroLine } from '@/components/funnels/hanuman-chalisa/Hero'
import { beads, breadcrumbLd, COUNTER_PATH, getUnit, getUnits, HOW_MANY_PATH, HUB_PATH, ldJson, pageMeta } from '@/lib/funnels/hanuman-chalisa'

const PAGE = 'hanuman-chalisa-108'

export const metadata: Metadata = pageMeta({
  title: 'Hanuman Chalisa 108 Times Counter, or 7, 11, 21 | Wisdom',
  description:
    'Set a sankalp of 7, 11, 21 or 108 Hanuman Chalisa recitations, or a 40-day vow, and count each one on a mala, with the full text. Saved on your device.',
  path: COUNTER_PATH,
})

export default function CounterPage() {
  const crumbs = breadcrumbLd([
    { name: 'Wisdom', path: '/' },
    { name: 'Hanuman Chalisa', path: HUB_PATH },
    { name: 'Recitation counter', path: COUNTER_PATH },
  ])
  const c39 = getUnit('hc.c39')!
  return (
    <main className="hc-main">
      <BlogTracker pageName={PAGE} />
      <MeaningTracker page={PAGE} locale="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson([crumbs]) }} />

      <HcHero
        crumbs={
          <nav className="hc-crumbs" aria-label="Breadcrumb">
            <a href="/">Wisdom</a> / <a href={HUB_PATH}>Hanuman Chalisa</a> / <span>Recitation counter</span>
          </nav>
        }
        eyebrow="Recitation counter"
        title="Count your Hanuman Chalisa recitations"
        sub={
          <>
            Choose a sankalp of 7, 11, 21 or 108 recitations of the Hanuman Chalisa, or a 40-day vow of one recitation a day. Tap once each
            time you finish the whole Chalisa and a bead lights on the outer ring of 108. The text is below, and your count stays on this
            device.
          </>
        }
        facts={['7, 11, 21 or 108', '40-day vow', 'Saved on this device']}
        actions={
          <a href="#hc-count" className="btn-read-gita btn-read-gita-primary" data-mp-location="counter_hero_start">
            Choose your sankalp
          </a>
        }
        visual={<HeroLine awadhi={c39.awadhi} iast={c39.iast} caption="Chaupai 39" />}
      />

      <section className="section hc-band" id="hc-count" aria-label="Recitation counter">
        <div className="wrap">
          <div className="rv">
            <Counter beads={beads('en', 'anchor')} page={PAGE} />
          </div>
          <p className="hc-note rv" style={{ marginTop: 30 }}>
            What the Chalisa says about counting is in chaupai 38. <a href={HOW_MANY_PATH}>How many times to recite it</a>.
          </p>
        </div>
      </section>

      <section className="section section-alt hc-band" aria-labelledby="hc-text-h">
        <div className="wrap">
          <div className="sec-head hc-sec-head rv">
            <p className="eyebrow">43 lines</p>
            <h2 className="heading" id="hc-text-h">
              Read along
            </h2>
            <div className="hc-controls">
              <ScriptToggle locale="en" page={PAGE} />
            </div>
          </div>
          <div className="rv">
            <FullText units={getUnits()} locale="en" />
          </div>
        </div>
      </section>

      <section className="section hc-band">
        <div className="wrap hc-col">
          <HcNextStep locale="en" pageName={PAGE} pageKey="hc-108" placement="counter_end" />
        </div>
      </section>
    </main>
  )
}
