import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import { Actions, Faq, JsonLd, LinkCards, PageHero, Section } from '@/components/site'
import PlanFine from '@/components/plan/PlanFine'
import { planAction } from '@/components/plan/planAction'
import VerseMap from '@/components/plan/VerseMap'
import PlanDayStatus from '@/components/plan/PlanDayStatus'
import PrintPlanButton from '@/components/plan/PrintPlanButton'
import { StopVerse, lengthPlanCards } from '@/components/plan/LengthPlanParts'
import { getVerse } from '@/lib/gita'
import { chapterUrl, readModeUrl } from '@/lib/gitaUrls'
import { AUTHOR_LD, PUBLISHER_LD, SITE } from '@/lib/seo'
import { THIRTY_DAYS, THIRTY_WEEKS, minutesFor, parseRef, spanCount, spanLabel, thirtyDaySegments } from '@/lib/readingPlans'
import '@/components/plan/length-plans.css'

const PATH = '/bhagavad-gita-in-30-days'
const URL = `${SITE}${PATH}`
const TITLE = 'Bhagavad Gita in 30 Days: A Daily Reading Plan for All 700 Verses'
const DESCRIPTION =
  'Read the whole Bhagavad Gita in 30 days, 3 to 6 minutes a day. Each day lists its verses, what happens in the conversation and one verse to stop on. Free, printable, and it keeps your place.'
const IMG = `${SITE}/og/bhagavad-gita-in-30-days.webp`

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Wisdom` },
  description: DESCRIPTION,
  keywords:
    'bhagavad gita in 30 days, bhagavad gita reading plan, gita reading plan, bhagavad gita daily reading, how many days to read bhagavad gita, bhagavad gita reading schedule, 30 day gita reading plan',
  alternates: { canonical: URL },
  openGraph: { title: 'Read the Bhagavad Gita in 30 days', description: 'All 700 verses, 3 to 6 minutes a day, with one verse to stop on each day.', url: URL, type: 'article', siteName: 'Wisdom', images: [{ url: IMG, width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'Read the Bhagavad Gita in 30 days', description: 'All 700 verses, 3 to 6 minutes a day.', images: [IMG] },
}

const FAQ = [
  {
    q: 'How long does it take to read the Bhagavad Gita?',
    a: 'About two hours in English at an unhurried pace, for all 700 verses. Spread over 30 days that is 3 to 6 minutes a day. Reciting the Sanskrit takes about half as long again.',
  },
  {
    q: 'What if I miss a day?',
    a: 'Pick up where you stopped; the plan waits. If you want to finish on time, days 9, 16, 17, 27 and 30 have 18 verses or fewer and are the easiest to double up with.',
  },
  {
    q: 'Do I have to read in order?',
    a: 'For a first reading, yes. Chapter 1 sets up the question that the other 17 answer, and later chapters lean on ideas from chapters 2 to 6. If you want the teaching first, the 7-day plan starts you in chapter 2.',
  },
  {
    q: 'Which translation should I use?',
    a: 'Each day links to the chapter on this site with the Sanskrit, a Hindi anuvad and an English translation. If you want a printed edition alongside, our comparison of English translations covers Gita Press, Easwaran, Prabhupada and others.',
  },
  {
    q: 'How does the page know what I have read?',
    a: 'Verses you read on this site are remembered on this device, with no sign-in. They light up on the map and count toward each day. If you read a day somewhere else, tap Mark as read.',
  },
  {
    q: 'Can I print it?',
    a: 'Yes. Print or save as PDF turns the 30 days into a checklist with each day’s verses and its verse to stop on.',
  },
]

export default async function ThirtyDaysPage() {
  const stops = await Promise.all(THIRTY_DAYS.map((d) => getVerse(parseRef(d.stop).ch, parseRef(d.stop).vs)))
  const segments = thirtyDaySegments()

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HowTo',
        name: 'Read the Bhagavad Gita in 30 days',
        description: DESCRIPTION,
        image: IMG,
        totalTime: 'P30D',
        inLanguage: 'en',
        step: THIRTY_DAYS.map((d) => ({
          '@type': 'HowToStep',
          position: d.day,
          name: `Day ${d.day}: ${spanLabel(d.span)}`,
          text: `${d.line} Stop on verse ${d.stop}.`,
          url: `${URL}#day-${d.day}`,
        })),
      },
      {
        '@type': 'Article',
        headline: 'Read the Bhagavad Gita in 30 days',
        description: DESCRIPTION,
        inLanguage: 'en',
        datePublished: '2026-11-13',
        dateModified: '2026-11-13',
        image: IMG,
        author: AUTHOR_LD,
        publisher: PUBLISHER_LD,
        mainEntityOfPage: URL,
        about: { '@type': 'Book', name: 'Bhagavad Gita', sameAs: ['https://en.wikipedia.org/wiki/Bhagavad_Gita', 'https://www.wikidata.org/wiki/Q48268'] },
        isPartOf: { '@type': 'CollectionPage', name: 'Bhagavad Gita reading plans', url: `${SITE}/reading-plans` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Reading plans', item: `${SITE}/reading-plans` },
          { '@type': 'ListItem', position: 3, name: 'The Gita in 30 days', item: URL },
        ],
      },
    ],
  }

  return (
    <>
      <JsonLd data={schema} />
      <Nav />

      <PageHero
        crumbs={[
          { label: 'Reading plans', href: '/reading-plans' },
          { label: 'The Gita in 30 days', href: PATH },
        ]}
        crumbsLd={false}
        eyebrow="All 700 verses, one month"
        title="Read the Bhagavad Gita in 30 days"
        sub="About 23 verses a day, 3 to 6 minutes in English. Each day stops where the conversation turns, so you never break off mid-thought, and each one gives you a single verse to stay with."
        facts={['30 days', '3 to 6 min a day', 'Sanskrit and English', 'Keeps your place']}
        actions={[{ href: `${readModeUrl(1)}#v1`, label: 'Start day 1', location: 'thirty_hero_start' }]}
        below={<PrintPlanButton plan="thirty" location="thirty_hero_print" />}
        visual={
          <div className="rpl-maphold" id="verse-map">
            <span className="rpl-maphold-k">The month on the Gita’s 700 verses</span>
            <VerseMap
              plan="thirty"
              segments={segments}
              label="Map of all 700 verses of the Bhagavad Gita, one row per chapter, grouped into 30 daily readings"
              caption="Each circle is a verse; the gold and cream bands are the 30 days. Tap a band to find its day."
            />
          </div>
        }
      />

      <main className="rpl-page">
        <Section id="days" width="narrow" title="The 30 days" intro="Read the day’s verses on the chapter page, then come back to the verse to stop on. Days you finish turn gold.">
          {THIRTY_WEEKS.map((w, wi) => (
            <section key={w.from} className="rpl-week" aria-labelledby={`week-${wi + 1}`}>
              <h3 className="rpl-week-h" id={`week-${wi + 1}`}>
                Week {wi + 1}: {w.title}
              </h3>
              <p className="rpl-week-sub">
                {w.chapters}, days {w.from} to {w.to}
              </p>
              <ol className="rpl-days" start={w.from}>
                {THIRTY_DAYS.filter((d) => d.day >= w.from && d.day <= w.to).map((d) => {
                  const v = stops[d.day - 1]
                  const n = spanCount(d.span)
                  return (
                    <li key={d.day} id={`day-${d.day}`} className="rpl-day">
                      <span className="rpl-day-n" aria-hidden="true">
                        {d.day}
                      </span>
                      <div className="rpl-day-body">
                        <h4 className="rpl-day-h">
                          Day {d.day}: {spanLabel(d.span)}
                          <span className="rpl-check" aria-hidden="true">
                            ☐
                          </span>
                        </h4>
                        <p className="rpl-day-meta">
                          {n} verses, about {minutesFor(n)} minutes
                        </p>
                        <p className="rpl-day-line">{d.line}</p>
                        {v && <StopVerse v={v} location={`thirty_stop_day${d.day}`} />}
                        <div className="rpl-day-foot">
                          <a className="sx-btn sx-btn--secondary sx-btn--sm" href={`${readModeUrl(d.span.ch)}#v${d.span.from}`} data-mp-location={`thirty_read_day${d.day}`}>
                            Read verses {d.span.from} to {d.span.to}
                          </a>
                          <PlanDayStatus plan="thirty" day={d.day} spans={[d.span]} />
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </section>
          ))}
        </Section>

        <Section id="how" tone="band" width="narrow" title="How the days are cut">
          <div className="sx-prose">
            <p>
              The Gita’s chapters run from 20 verses to 78, so a chapter a day makes some days four minutes and others thirteen. This plan evens them out.
              Short chapters get a day each. Long ones split where the conversation turns: chapter 2 at Arjuna’s duty (2.31) and at his question about the steady person (2.54),
              chapter 6 at the restless mind (6.24), chapter 11 at “I am Time” (11.32), and chapter 18 at work done by one’s nature (18.41) and at Krishna’s last word (18.63).
            </p>
            <p>
              If ten minutes a day suits you better, <a href="/read-gita-in-18-days">read a chapter a day for 18 days</a>. For a first taste before the full read, try{' '}
              <a href="/bhagavad-gita-in-7-days">the Gita in 7 days</a>, or <a href="/how-to-read-bhagavad-gita">see how to read the Bhagavad Gita</a> for where to start and what to expect in each part.
            </p>
            <p>
              Every chapter page has the full text: <a href={chapterUrl(2)}>chapter 2</a> is where most people say the teaching begins.
            </p>
          </div>
        </Section>

        <Section id="faq" width="narrow" title="Questions about reading the Gita in 30 days">
          <Faq items={FAQ} ld={false} />
        </Section>

        <Section
          id="your-plan"
          tone="band"
          width="narrow"
          title="Or one verse a day, for what you’re facing"
          intro="Tell Wisdom what’s going on and it picks a verse a day for seven days, with what each one means for your life."
        >
          <Actions items={[planAction({ campaign: 'web_thirty', location: 'thirty_create_plan' })]} />
          <PlanFine />
        </Section>

        <Section id="more-plans" title="Other ways through the Gita" className="rpl-noprint">
          <LinkCards items={lengthPlanCards('thirty_more', 'thirty')} columns={2} layout="rail" />
        </Section>
      </main>

      <SiteFooter />
      <BlogTracker pageName="Gita In 30 Days" />
    </>
  )
}
