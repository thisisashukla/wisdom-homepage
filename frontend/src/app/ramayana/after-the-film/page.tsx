import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import NextStep from '@/components/quotes/NextStep'
import Shell from '@/components/funnels/ramayana/Shell'
import PlanDays from '@/components/funnels/ramayana/PlanDays'
import ScriptToggle from '@/components/funnels/ramayana/ScriptToggle'
import Hero from '@/components/funnels/ramayana/Hero'
import { Band, JsonLd, MethodEn } from '@/components/funnels/ramayana/Bits'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { PLAN, lineView } from '@/lib/funnels/ramayana/data'
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
      <Hero
        locale="en"
        crumbLabel="Breadcrumb"
        crumbs={[{ name: 'Wisdom', href: '/' }, { name: 'Ramayana', href: PATHS.hub }, { name: 'After the film' }]}
        eyebrow="7-line reading plan"
        h1="Seven mornings after the film"
        sub="Seven mornings, seven lines, before Part 2 arrives."
        facts={['4 from Valmiki', '3 from the Bhagavad Gita', 'Sanskrit and plain English']}
        cta={{ href: '#day-1', label: 'Read the first line', loc: 'hero_day_1' }}
        lines={[lineView(PLAN[0].verse, 'en')]}
      />

      <Band className="rl-introsec">
        <p className="rl-intro rv" id="quick-answer">
          A short plan for the week after Ramayana: Part 1. Days 1 to 4 are lines from Valmiki&apos;s Ramayana (Ayodhya Kanda 22
          and 105, Aranya Kanda 66, Sundara Kanda 12), spoken by Ram, Lakshman and Hanuman. Days 5 to 7 hand over to the Bhagavad
          Gita (2.14, 6.5 and 2.47), where Krishna says the same things to Arjuna. Read one line each morning.
        </p>
      </Band>

      <Band
        id="days"
        title="One line a day"
        tone="alt"
        lede="Open a day to read its line. The original is in Sanskrit; switch to IAST if you read Roman script more easily."
      >
        <div className="rv">
          <ScriptToggle locale="en" page={PAGE} />
        </div>
        <div className="rv">
          <PlanDays days={PLAN} page={PAGE} />
        </div>
      </Band>

      <Band id="why-gita" title="Why the Gita on day 5">
        <p className="rl-p rv">
          Ram, Lakshman and Hanuman show what steadiness looks like in a crisis. The Bhagavad Gita puts the same thing into
          teaching: what comes and goes, how to lift yourself, and how to do your part without gripping the result. Day 4 hands over
          to Krishna so the week ends with lines you can keep going back to.
        </p>
      </Band>

      <Band tone="alt">
        <div className="rl-final rv">
          <NextStep funnel="ramayana" locale="en" pageName={PAGE} pageKey="ramayana-after-film" placement="end" copy={NEXT_COPY.en} />
          <p className="rl-start">
            If you would rather have it by email, <a href="/start?plan=ramayana&ref=ramayana-after-the-film" data-mp-location="start_link">start Week 1 free</a> and get a line each morning for what you are going through.
          </p>
        </div>
        <p className="rl-muted rv">
          If a scene made you wonder whether it is in the text, <a href={PATHS.original}>check it against Valmiki and Tulsidas</a>.
        </p>
      </Band>

      <MethodEn film={false} />
    </Shell>
  )
}
