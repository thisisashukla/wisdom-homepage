import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import { Faq, JsonLd, LinkCards, NextStep, PageHero, Section, VerseCard } from '@/components/site'
import VerseMap from '@/components/plan/VerseMap'
import DailyToday from '@/components/plan/DailyToday'
import { lengthPlanCards } from '@/components/plan/LengthPlanParts'
import { getVerse } from '@/lib/gita'
import { verseUrl } from '@/lib/gitaUrls'
import { firstLine, sanskritPadas } from '@/lib/devanagari'
import { AUTHOR_LD, PUBLISHER_LD, SITE } from '@/lib/seo'
import { VERSE_A_DAY, parseRef, pointSegments } from '@/lib/readingPlans'
import '@/components/plan/length-plans.css'

const PATH = '/bhagavad-gita-one-verse-a-day'
const URL = `${SITE}${PATH}`
const TITLE = 'Bhagavad Gita One Verse a Day: 30 Mornings, in Order'
const DESCRIPTION =
  'Read the Bhagavad Gita one verse a day: thirty verses for a month of mornings, in the order they come in the Gita, each with the Sanskrit, plain English and one line to carry through the day. Opens on your day each morning.'
const IMG = `${SITE}/og/bhagavad-gita-one-verse-a-day.webp`

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Wisdom` },
  description: DESCRIPTION,
  keywords:
    'bhagavad gita one verse a day, bhagavad gita verse a day, daily bhagavad gita verses, gita sloka a day, bhagavad gita daily reading, bhagavad gita daily devotional, bhagavad gita verse of the day app',
  alternates: { canonical: URL },
  openGraph: { title: 'The Bhagavad Gita, one verse a day', description: 'Thirty mornings, thirty verses, in order.', url: URL, type: 'article', siteName: 'Wisdom', images: [{ url: IMG, width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'The Bhagavad Gita, one verse a day', description: 'Thirty mornings, thirty verses, in order.', images: [IMG] },
}

const FAQ = [
  {
    q: 'Is one verse a day enough?',
    a: 'For a daily practice, yes. A verse read slowly in the morning and remembered through the day stays with you longer than a chapter read in a rush. When you want the whole text, the 30-day plan reads every verse at 3 to 6 minutes a day.',
  },
  {
    q: 'Which verse should I start with?',
    a: 'Start with 1.47, where Arjuna sits down and drops his bow. The Gita is Krishna’s answer to that moment, so every verse after it reads more clearly once you have seen it.',
  },
  {
    q: 'How long would the whole Gita take at a verse a day?',
    a: 'About two years: the Gita has 700 verses. This month picks thirty that follow the conversation from start to end, so you get the whole arc in thirty mornings.',
  },
  {
    q: 'Is there an app with a Bhagavad Gita verse of the day?',
    a: 'Wisdom on iPhone puts one verse on your Lock Screen and Home Screen each day, in Sanskrit with its meaning, and picks it for what you are going through. On the web, the verse of the day page changes every morning.',
  },
  {
    q: 'Do I need to read Sanskrit?',
    a: 'No. Every verse has plain English under it. The Sanskrit is there for when you want to hear or say the original.',
  },
]

export default async function VerseADayPage() {
  const verses = await Promise.all(VERSE_A_DAY.map((d) => getVerse(parseRef(d.verse).ch, parseRef(d.verse).vs)))
  const segments = pointSegments(VERSE_A_DAY.map((d) => d.verse))

  const cards = VERSE_A_DAY.map((d, i) => {
    const v = verses[i]
    if (!v) return null
    const r = parseRef(d.verse)
    return (
      <VerseCard
        key={d.day}
        size="default"
        original={sanskritPadas(v.sanskrit).filter((row) => /[।॥]/.test(row))}
        meaning={`“${v.englishTranslation}”`}
        source={`${d.verse} · ${v.speaker}`}
        sourceHref={verseUrl(r.ch, r.vs)}
      >
        <p className="rpl-morning-carry">{d.carry}</p>
      </VerseCard>
    )
  })

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'The Bhagavad Gita, one verse a day',
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
        '@type': 'ItemList',
        name: 'Thirty mornings: one Bhagavad Gita verse a day',
        itemListElement: VERSE_A_DAY.map((d) => {
          const r = parseRef(d.verse)
          return { '@type': 'ListItem', position: d.day, name: `Day ${d.day}: Bhagavad Gita ${d.verse}`, url: `${SITE}${verseUrl(r.ch, r.vs)}` }
        }),
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
          { '@type': 'ListItem', position: 3, name: 'One verse a day', item: URL },
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
          { label: 'One verse a day', href: PATH },
        ]}
        crumbsLd={false}
        eyebrow="A month of mornings"
        title="The Bhagavad Gita, one verse a day"
        sub="Thirty verses for thirty mornings, in the order they come in the Gita. Each takes a minute: the Sanskrit, what it says, and one line to carry into your day. Come back tomorrow and the page opens on your next verse."
        facts={['1 minute a day', '30 mornings', 'Keeps your day, no sign-in']}
        actions={[{ href: '#today', label: 'Open today’s verse', location: 'verseaday_hero_today' }]}
        visual={
          <div className="rpl-maphold" id="verse-map">
            <span className="rpl-maphold-k">Thirty lamps, chapter 1 to chapter 18</span>
            <VerseMap
              plan="verse-a-day"
              mode="points"
              segments={segments}
              label="Map of the Bhagavad Gita’s 700 verses with the thirty verses of this month lit, in order from chapter 1 to chapter 18"
              caption="The month walks the whole Gita in order. Your day is ringed once you start."
            />
          </div>
        }
      />

      <main className="rpl-page">
        <Section id="today" width="narrow" spacing="tight">
          <DailyToday plan="verse-a-day" total={VERSE_A_DAY.length} cards={cards} />
        </Section>

        <Section id="month" tone="band" title="The thirty mornings" intro="Read one each morning, in order. Each links to its own page with more on what it means.">
          <ol className="rpl-month">
            {VERSE_A_DAY.map((d, i) => {
              const v = verses[i]
              const r = parseRef(d.verse)
              return (
                <li key={d.day} id={`day-${d.day}`} className="rpl-morning">
                  <span className="rpl-morning-n">{d.day}</span>
                  <div>
                    {v && (
                      <p className="rpl-morning-sa" lang="sa">
                        {firstLine(v.sanskrit)}
                      </p>
                    )}
                    {v && <p className="rpl-morning-en">{v.englishTranslation}</p>}
                    <p className="rpl-morning-carry">{d.carry}</p>
                    <a className="rpl-morning-ref" href={verseUrl(r.ch, r.vs)} data-mp-location={`verseaday_month_day${d.day}`}>
                      Bhagavad Gita {d.verse}
                    </a>
                  </div>
                </li>
              )
            })}
          </ol>
        </Section>

        <Section
          id="every-morning"
          width="narrow"
          title="A verse that finds you each morning"
          intro="If opening a page every day is one step too many, let the verse come to you: on your Lock Screen, picked for what you’re going through. The verse of the day page also changes every morning."
        >
          <NextStep locale="en" pageKey="verse-a-day" placement="every_morning" />
          <p className="sx-intro rpl-noprint" style={{ marginTop: 18 }}>
            <a className="sx-link" href="/bhagavad-gita-widget-iphone" data-mp-location="verseaday_widget">
              See the verse on an iPhone widget
            </a>{' '}
            or{' '}
            <a className="sx-link" href="/gita/today" data-mp-location="verseaday_today_page">
              open today’s verse of the day
            </a>
            .
          </p>
        </Section>

        <Section id="faq" tone="band" width="narrow" title="Questions about a verse a day">
          <Faq items={FAQ} ld={false} />
        </Section>

        <Section id="more-plans" title="When you want more">
          <LinkCards items={lengthPlanCards('verseaday_more', 'verse-a-day')} columns={2} layout="rail" />
        </Section>
      </main>

      <SiteFooter />
      <BlogTracker pageName="Gita One Verse A Day" />
    </>
  )
}
