import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { JsonLd, NextStep, PageHero, Section } from '@/components/site'
import PlanDays, { type PlanDayView } from '@/components/funnels/ramayana/PlanDays'
import { Speaker } from '@/components/funnels/ramayana/LineVerse'
import { MethodEn } from '@/components/funnels/ramayana/Method'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { PLAN, lineView } from '@/lib/funnels/ramayana/data'
import { PATHS } from '@/lib/funnels/ramayana/paths'
import { articleLd, itemListLd, ramayanaMeta } from '@/lib/funnels/ramayana/seo'
import { lineOriginal } from '@/lib/funnels/ramayana/verse'

const DESC = 'Seven mornings after Ramayana: Part 1. Four lines from Valmiki, then three Bhagavad Gita verses, each with the original Sanskrit and one thing to do.'

export const metadata: Metadata = ramayanaMeta({
  title: 'After the Ramayana film: seven lines, seven mornings',
  description: DESC,
  path: PATHS.afterFilm,
  locale: 'en',
  card: 'ram-trouble-passes',
})

export default function AfterTheFilmPage() {
  const days: PlanDayView[] = PLAN.map((d) => {
    const gita = d.verse.text === 'bg'
    return {
      day: d.day,
      title: d.title,
      why: d.why,
      todo: d.todo,
      ...(d.bridge ? { bridge: d.bridge } : {}),
      gita,
      src: gita ? d.verse.ref.en : d.verse.refShort.en,
      ...(d.verse.chapter ? { chapter: d.verse.chapter, verse: d.verse.verse } : {}),
      line: lineView(d.verse, 'en'),
    }
  })
  const hero = days[0].line
  return (
    <main>
      <PageTracker pageName="Ramayana After The Film" />
      <JsonLd
        data={[
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
      <PageHero
        crumbs={[
          { label: 'Ramayana', href: PATHS.hub },
          { label: 'After the film', href: PATHS.afterFilm },
        ]}
        eyebrow="7-line reading plan"
        title="Seven mornings after the film"
        sub="Read one line each morning in the week after you see Part 1, while the story is still with you."
        facts={['One line a morning', '4 from Valmiki, 3 from the Gita']}
        actions={[{ href: '#day-1', label: 'Read the first line', location: 'hero_day_1' }]}
        verse={{ ...lineOriginal(hero), label: <Speaker line={hero} locale="en" />, source: hero.ref }}
      />

      <Section spacing="tight" rv={false}>
        <p className="sx-prose rv" id="quick-answer">
          A short plan for the week after Ramayana: Part 1. Days 1 to 4 are lines from Valmiki&apos;s Ramayana (Ayodhya Kanda 22
          and 105, Aranya Kanda 66, Sundara Kanda 12), spoken by Ram, Lakshman and Hanuman. Days 5 to 7 hand over to the Bhagavad
          Gita (2.14, 6.5 and 2.47), where Krishna says the same things to Arjuna. Read one line each morning.
        </p>
      </Section>

      <Section
        id="days"
        tone="band"
       
        title="One line a day"
        intro="Read one each morning, and try the small thing it asks of you before the day is out."
      >
        <div className="rv">
          <PlanDays days={days} />
        </div>
      </Section>

      <Section id="why-gita" title="Why the Gita on day 5">
        <p className="sx-prose rv">
          Ram, Lakshman and Hanuman show what steadiness looks like in a crisis. The Bhagavad Gita puts the same thing into
          teaching: what comes and goes, how to lift yourself, and how to do your part without gripping the result. After day 4 the plan
          moves to Krishna, so the week ends with lines you can keep going back to.
        </p>
      </Section>

      <Section tone="band">
        <NextStep locale="en" pageKey="ramayana-after-film" placement="end" copy={NEXT_COPY.en} />
        <p className="rl-start">
          If you would rather have it by email, <a href="/start?plan=ramayana&ref=ramayana-after-the-film" data-mp-location="start_link">start Week 1 free</a> and get a line each morning for what you are going through.
        </p>
        <p className="rl-muted rv">
          If a scene made you wonder whether it is in the text, <a href={PATHS.original}>check it against Valmiki and Tulsidas</a>.
        </p>
      </Section>

      <MethodEn film={false} />
    </main>
  )
}
