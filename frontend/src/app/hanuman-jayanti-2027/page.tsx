import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { Actions, Faq, JsonLd, NextStep, PageHero, ScriptToggle, Section, VerseCard } from '@/components/site'
import { abs, pageMeta, PUBLISHER_LD } from '@/lib/seo'
import {
  cardOg,
  COUNTER_PATH,
  getUnit,
  HOW_MANY_PATH,
  HUB_PATH,
  JAYANTI_PATH,
  LEARN_PATH,
  linePath,
  NEXT_COPY,
  START_SITUATION,
  unitVerse,
} from '@/lib/funnels/hanuman-chalisa'

export const metadata: Metadata = pageMeta({
  title: 'Hanuman Jayanti 2027 Date, Tuesday 20 April | Wisdom',
  description:
    'Hanuman Jayanti 2027 is on Tuesday, 20 April. Other dates kept for Hanuman, and a one-week plan to recite the Hanuman Chalisa 11 times as a family.',
  path: JAYANTI_PATH,
  ogImage: cardOg('hc-d3'),
})

const PLAN: { day: string; date: string; count: number; what: string; href?: string; link?: string }[] = [
  { day: 'Wednesday', date: '14 April', count: 1, what: 'Recite it once together. Before you start, read the two opening dohas and their meaning aloud.', href: linePath('doha-1-shri-guru-charan-saroj-raj'), link: 'Doha 1' },
  { day: 'Thursday', date: '15 April', count: 1, what: 'Recite it once. The youngest in the family learns chaupai 1 by heart.', href: LEARN_PATH, link: 'Learn mode' },
  { day: 'Friday', date: '16 April', count: 1, what: 'Recite it once, then tell the story behind chaupai 11: the sanjivani herb and Lakshmana.', href: linePath('11-laye-sanjivan-lakhan-jiyaye'), link: 'Chaupai 11' },
  { day: 'Saturday', date: '17 April', count: 2, what: 'A day kept for Hanuman: once in the morning and once at the evening lamp.' },
  { day: 'Sunday', date: '18 April', count: 1, what: 'Recite it once. Each person picks one line and says what it means to them.' },
  { day: 'Monday', date: '19 April', count: 1, what: 'Recite it once, then tell the story behind chaupai 19: the ring and the leap over the ocean.', href: linePath('19-prabhu-mudrika-meli-mukh-mahi'), link: 'Chaupai 19' },
  { day: 'Tuesday', date: '20 April, Hanuman Jayanti', count: 4, what: 'Twice in the morning and twice in the evening, which brings the week to eleven.' },
]

const FAQ = [
  {
    q: 'When is Hanuman Jayanti in 2027?',
    a: 'Tuesday, 20 April 2027, on Chaitra Purnima, the full moon of Chaitra, per Drik Panchang. Check your local panchang for the exact tithi times where you live.',
  },
  {
    q: 'Why do some places keep Hanuman Jayanti on other days?',
    a: 'Regions follow different traditions. Tamil Nadu keeps Hanumath Jayanthi in the month of Margazhi, on 7 January 2027. In parts of North and West India, Hanuman is worshipped on Kali Chaudas, the day before Diwali, which is Saturday, 7 November 2026.',
  },
  {
    q: 'How do families keep the day?',
    a: 'Most recite the Hanuman Chalisa, visit a Hanuman temple, and offer sindoor, a lamp and laddus. Many also read the Sundar Kand of the Ramcharitmanas.',
  },
]

export default function HanumanJayantiPage() {
  const d3 = getUnit('hc.d3')!
  const eventLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Hanuman Jayanti 2027',
    alternateName: 'हनुमान जयंती 2027',
    startDate: '2027-04-20',
    endDate: '2027-04-20',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    description: 'Hanuman Jayanti, the birth anniversary of Hanuman, on Chaitra Purnima. Families recite the Hanuman Chalisa and visit Hanuman temples.',
    location: { '@type': 'Place', name: 'Hanuman temples and homes across India', address: { '@type': 'PostalAddress', addressCountry: 'IN' } },
    image: [cardOg('hc-d3')],
    organizer: PUBLISHER_LD,
    url: abs(JAYANTI_PATH),
  }
  const c1 = getUnit('hc.c1')!

  return (
    <main>
      <PageTracker pageName="Hanuman Jayanti 2027" />
      <JsonLd data={eventLd} />

      <PageHero
        crumbs={[
          { label: 'Hanuman Chalisa', href: HUB_PATH },
          { label: 'Hanuman Jayanti 2027', href: JAYANTI_PATH },
        ]}
        eyebrow="Chaitra Purnima"
        title="Hanuman Jayanti 2027 is on Tuesday, 20 April"
        sub={
          <span id="quick-answer">
            Hanuman Jayanti 2027 falls on Tuesday, 20 April, the full moon of Chaitra, per Drik Panchang. Tamil Nadu keeps Hanumath
            Jayanthi on 7 January 2027, and many in North and West India worship Hanuman on Kali Chaudas, 7 November 2026. Below is a
            one-week plan to recite the Chalisa 11 times as a family.
          </span>
        }
        facts={['Tuesday, 20 April 2027', '11 recitations in 7 days']}
        actions={[{ href: '#h-plan', label: 'See the week\'s plan', location: 'jayanti_hero_plan' }]}
        verse={{ ...unitVerse(c1), label: 'Chaupai 1' }}
      />

      <Section id="h-dates" tone="band" eyebrow="2026 to 2027" title="Dates kept for Hanuman">
        <ul className="hc-dates" data-stagger="60">
          <li className="rv">
            <strong>Saturday, 7 November 2026</strong>
            Kali Chaudas, the day before Diwali. Hanuman puja in many homes in Gujarat and North India.
          </li>
          <li className="rv">
            <strong>Thursday, 7 January 2027</strong>
            Hanumath Jayanthi in Tamil Nadu, in the month of Margazhi.
          </li>
          <li className="rv" data-main="">
            <strong>Tuesday, 20 April 2027</strong>
            Hanuman Jayanti on Chaitra Purnima, the date most of North India keeps.
          </li>
        </ul>
        <p className="hc-note rv">Dates per Drik Panchang. Tithi times vary by city, so check your local panchang.</p>
      </Section>

      <Section
        id="h-plan"
        eyebrow="14 to 20 April"
        title="Recite it 11 times with your family this week"
        intro="Eleven recitations over the seven days up to Jayanti, never more than four in a day, so children can sit through each one. One recitation takes 6 to 10 minutes."
      >
        <ol className="hc-plan" data-stagger="50">
          {PLAN.map((p) => (
            <li key={p.date} className="rv">
              <b>
                {p.day}
                <small>{p.date}</small>
              </b>
              <p>
                <span className="hc-plan-count">{p.count === 1 ? 'Once' : `${p.count} times`}.</span> {p.what}{' '}
                {p.href && (
                  <a href={p.href} data-mp-location="jayanti_plan_link">
                    {p.link}
                  </a>
                )}
              </p>
            </li>
          ))}
        </ol>
        <Actions
          className="hc-gap rv"
          items={[
            { href: COUNTER_PATH, label: 'Count the 11 on a mala', location: 'jayanti_counter' },
            { href: HUB_PATH, label: 'The full text with meaning', location: 'jayanti_hub', variant: 'secondary' },
          ]}
        />
      </Section>

      <Section id="h-close" tone="band" eyebrow="The closing doha" title="The line to end each recitation">
        <div className="hc-controls">
          <ScriptToggle />
        </div>
        <VerseCard
          size="compact"
          rv
          {...unitVerse(d3)}
          meaning={d3.meaning.en}
          source="The closing doha, word by word"
          sourceHref={linePath(d3.slug)}
        />
        <p className="hc-note rv">
          <a href={HOW_MANY_PATH}>How many times to recite it</a>, and what the Chalisa says about itself.
        </p>
      </Section>

      <Section id="hc-faq" title="Questions people ask">
        <Faq items={FAQ} />
      </Section>

      <Section tone="band" className="hc-next">
        <NextStep locale="en" pageKey="hc-jayanti-2027" placement="jayanti_end" startSituation={START_SITUATION} copy={NEXT_COPY.en} />
      </Section>
    </main>
  )
}
