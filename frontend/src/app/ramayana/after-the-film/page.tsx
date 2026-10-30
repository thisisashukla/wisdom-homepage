import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import NextStep from '@/components/quotes/NextStep'
import Shell from '@/components/funnels/ramayana/Shell'
import PlanDays from '@/components/funnels/ramayana/PlanDays'
import ScriptToggle from '@/components/funnels/ramayana/ScriptToggle'
import { Crumbs, JsonLd, MethodEn } from '@/components/funnels/ramayana/Bits'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { PLAN } from '@/lib/funnels/ramayana/data'
import { PATHS } from '@/lib/funnels/ramayana/paths'
import { articleLd, breadcrumbLd, itemListLd, pageMeta } from '@/lib/funnels/ramayana/seo'

const PAGE = 'ramayana-after-the-film'
const DESC = 'Seven mornings after Ramayana: Part 1. Four lines from Valmiki, then three Bhagavad Gita verses, each with the original Sanskrit and one thing to do.'

export const metadata: Metadata = pageMeta({
  title: 'After the Ramayana film: seven lines, seven mornings',
  description: DESC,
  path: PATHS.afterFilm,
  locale: 'en',
  card: 'ram-trouble-passes',
})

export default function AfterTheFilmPage() {
  const crumbs = [
    { name: 'Wisdom', path: '/' },
    { name: 'Ramayana', path: PATHS.hub },
    { name: 'After the film', path: PATHS.afterFilm },
  ]
  return (
    <Shell locale="en">
      <BlogTracker pageName={PAGE} />
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          articleLd({
            headline: 'Seven mornings after the film',
            description: DESC,
            path: PATHS.afterFilm,
            locale: 'en',
            citations: PLAN.map((d) => d.verse.ref.en),
            about: ['Ramayana', 'Bhagavad Gita'],
          }),
          itemListLd(
            'Seven mornings after the film',
            PLAN.map((d) => ({ name: `Day ${d.day}: ${d.title}`, path: `${PATHS.afterFilm}#day-${d.day}` })),
          ),
        ]}
      />
      <Crumbs label="Breadcrumb" items={[{ name: 'Wisdom', href: '/' }, { name: 'Ramayana', href: PATHS.hub }, { name: 'After the film' }]} />

      <header className="rl-hero">
        <h1 className="rl-h1">Seven mornings after the film</h1>
        <p className="rl-promise">Seven mornings, seven lines, before Part 2 arrives.</p>
        <div className="rl-shore" aria-hidden="true" />
        <p className="rl-quick" id="quick-answer">
          A short plan for the week after Ramayana: Part 1. Days 1 to 4 are lines from Valmiki&apos;s Ramayana (Ayodhya Kanda 22
          and 105, Aranya Kanda 66, Sundara Kanda 12), spoken by Ram, Lakshman and Hanuman. Days 5 to 7 hand over to the Bhagavad
          Gita (2.14, 6.5 and 2.47), where Krishna says the same things to Arjuna. Read one line each morning.
        </p>
      </header>

      <section className="rl-section" aria-labelledby="days">
        <h2 className="rl-h2" id="days">
          One line a day
        </h2>
        <p className="rl-lede">Open a day to read its line. The original is in Sanskrit; switch to IAST if you read Roman script more easily.</p>
        <ScriptToggle locale="en" page={PAGE} />
        <PlanDays days={PLAN} page={PAGE} />
      </section>

      <section className="rl-section" aria-labelledby="why-gita">
        <h2 className="rl-h2" id="why-gita">
          Why the Gita on day 5
        </h2>
        <p className="rl-p">
          Ram, Lakshman and Hanuman show what steadiness looks like in a crisis. The Bhagavad Gita puts the same thing into
          teaching: what comes and goes, how to lift yourself, and how to do your part without gripping the result. Day 4 hands over
          to Krishna so the week ends with lines you can keep going back to.
        </p>
      </section>

      <div className="rl-next">
        <NextStep funnel="ramayana" locale="en" pageName={PAGE} pageKey="ramayana-after-film" placement="end" copy={NEXT_COPY.en} />
        <p className="rl-start">
          If you would rather have it by email, <a href="/start?plan=ramayana&ref=ramayana-after-the-film" data-mp-location="start_link">start Week 1 free</a> and get a line each morning for what you are going through.
        </p>
      </div>

      <p className="rl-muted">
        If a scene made you wonder whether it is in the text, <a href={PATHS.original}>check it against Valmiki and Tulsidas</a>.
      </p>
      <MethodEn film={false} />
    </Shell>
  )
}
