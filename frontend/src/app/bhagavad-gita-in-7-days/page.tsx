import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import { Faq, JsonLd, LinkCards, NextStep, PageHero, Section, VerseCard } from '@/components/site'
import VerseMap from '@/components/plan/VerseMap'
import PlanDayStatus from '@/components/plan/PlanDayStatus'
import { lengthPlanCards } from '@/components/plan/LengthPlanParts'
import { getVerse } from '@/lib/gita'
import { chapterUrl, verseUrl } from '@/lib/gitaUrls'
import { sanskritPadas } from '@/lib/devanagari'
import { AUTHOR_LD, PUBLISHER_LD, SITE } from '@/lib/seo'
import { SEVEN_DAYS, parseRef, pointSegments } from '@/lib/readingPlans'
import '@/components/plan/length-plans.css'

const PATH = '/bhagavad-gita-in-7-days'
const URL = `${SITE}${PATH}`
const TITLE = 'The Bhagavad Gita in 7 Days: The Whole Story in Seven Verses'
const DESCRIPTION =
  'A short version of the Bhagavad Gita for a busy week: seven verses, one a day, that follow Arjuna from the moment he drops his bow to the moment he stands up. Sanskrit, plain English and what happens around each one.'
const IMG = `${SITE}/og/bhagavad-gita-in-7-days.webp`

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Wisdom` },
  description: DESCRIPTION,
  keywords:
    'bhagavad gita in 7 days, bhagavad gita summary, bhagavad gita short version, bhagavad gita in a nutshell, bhagavad gita for busy people, bhagavad gita for beginners where to start, most important verses of bhagavad gita',
  alternates: { canonical: URL },
  openGraph: { title: 'The Bhagavad Gita in 7 days', description: 'The whole conversation in seven verses, one a day.', url: URL, type: 'article', siteName: 'Wisdom', images: [{ url: IMG, width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'The Bhagavad Gita in 7 days', description: 'The whole conversation in seven verses, one a day.', images: [IMG] },
}

const FAQ = [
  {
    q: 'Can you really understand the Gita in seven days?',
    a: 'You can follow its arc: why Arjuna stops, what Krishna answers, and how it ends. The full teaching takes longer, and most readers come back to it for years. These seven verses give you the map, so the whole text makes sense when you read it.',
  },
  {
    q: 'Why these seven verses?',
    a: 'Each one sits at a turn in the conversation: the collapse (1.47), the first teaching (2.14), action without clinging (2.47), how the mind slips (2.62), lifting yourself (6.5), trust (9.22) and the last word (18.66). Together they follow the Gita’s own order.',
  },
  {
    q: 'How long does each day take?',
    a: 'About three minutes: the verse in Sanskrit and English, a few lines on where it falls, and why it matters. Read the chapter around it if you have more time.',
  },
  {
    q: 'What should I read after the seven days?',
    a: 'The whole Gita in 30 days, at 3 to 6 minutes a day, or one verse each morning for a month. Both start from the beginning and go in order.',
  },
]

export default async function SevenDaysPage() {
  const verses = await Promise.all(SEVEN_DAYS.map((d) => getVerse(parseRef(d.verse).ch, parseRef(d.verse).vs)))
  const v1873 = await getVerse(18, 73)
  const segments = pointSegments(SEVEN_DAYS.map((d) => d.verse))

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'The Bhagavad Gita in 7 days',
        description: DESCRIPTION,
        inLanguage: 'en',
        datePublished: '2026-11-13',
        dateModified: '2026-11-13',
        image: IMG,
        author: AUTHOR_LD,
        publisher: PUBLISHER_LD,
        mainEntityOfPage: URL,
        about: { '@type': 'Book', name: 'Bhagavad Gita', sameAs: ['https://en.wikipedia.org/wiki/Bhagavad_Gita', 'https://www.wikidata.org/wiki/Q48268'] },
        mentions: SEVEN_DAYS.map((d) => ({ '@type': 'CreativeWork', name: `Bhagavad Gita ${d.verse}`, url: `${SITE}${verseUrl(parseRef(d.verse).ch, parseRef(d.verse).vs)}` })),
        isPartOf: { '@type': 'CollectionPage', name: 'Bhagavad Gita reading plans', url: `${SITE}/reading-plans` },
      },
      {
        '@type': 'ItemList',
        name: 'The Bhagavad Gita in seven verses',
        itemListElement: SEVEN_DAYS.map((d) => ({ '@type': 'ListItem', position: d.day, name: `Day ${d.day}: ${d.title} (${d.verse})`, url: `${URL}#day-${d.day}` })),
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
          { '@type': 'ListItem', position: 3, name: 'The Gita in 7 days', item: URL },
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
          { label: 'The Gita in 7 days', href: PATH },
        ]}
        crumbsLd={false}
        eyebrow="Seven verses, one a day"
        title="The Bhagavad Gita in 7 days"
        answer={{
          question: 'What is the Bhagavad Gita about, in short?',
          answer:
            'A warrior, Arjuna, refuses to fight a war against his own family, and Krishna, driving his chariot, spends 700 verses helping him see clearly enough to act. These seven verses follow that arc, one a day.',
          source: v1873 ? { text: sanskritPadas(v1873.sanskrit).filter((r) => /[।॥]/.test(r)).join('\n'), ref: 'Arjuna’s last words, Bhagavad Gita 18.73', lang: 'sa' } : undefined,
        }}
        facts={['7 days', 'About 3 minutes a day', 'Sanskrit and plain English']}
        actions={[{ href: '#day-1', label: 'Start with day 1', location: 'seven_hero_start' }]}
        visual={
          <div className="rpl-maphold" id="verse-map">
            <span className="rpl-maphold-k">Seven lamps across 700 verses</span>
            <VerseMap
              plan="seven"
              mode="points"
              numbered
              segments={segments}
              label="Map of the Bhagavad Gita’s 700 verses with the seven verses of this plan lit, from chapter 1 to chapter 18"
              caption="The seven verses sit across the whole Gita, from the first chapter to the last. Tap one to jump to its day."
            />
          </div>
        }
      />

      <main className="rpl-page">
        <Section id="days" width="narrow" spacing="tight">
          <ol className="rpl-seven">
            {SEVEN_DAYS.map((d, i) => {
              const v = verses[i]
              const r = parseRef(d.verse)
              return (
                <li key={d.day} id={`day-${d.day}`} className="rpl-seven-day">
                  <span className="rpl-day-n" aria-hidden="true">
                    {d.day}
                  </span>
                  <div className="rpl-seven-body">
                    <h2 className="rpl-seven-h">
                      Day {d.day}: {d.title}
                    </h2>
                    <div className="sx-prose">
                      <p>{d.context}</p>
                    </div>
                    {v && (
                      <VerseCard
                        framed
                        original={sanskritPadas(v.sanskrit).filter((row) => /[।॥]/.test(row))}
                        meaning={`“${v.englishTranslation}”`}
                        source={`${d.verse} · ${v.speaker}`}
                        sourceHref={verseUrl(r.ch, r.vs)}
                      />
                    )}
                    <p className="rpl-seven-why">
                      <strong>Why this one: </strong>
                      {d.why}
                    </p>
                    <div className="rpl-day-foot">
                      <a className="sx-btn sx-btn--link sx-btn--sm" href={chapterUrl(r.ch)} data-mp-location={`seven_chapter_day${d.day}`}>
                        Read all of chapter {r.ch}
                      </a>
                      <PlanDayStatus plan="seven" day={d.day} spans={[{ ch: r.ch, from: r.vs, to: r.vs }]} />
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </Section>

        <Section
          id="busy-week"
          tone="band"
          width="narrow"
          title="For a week with no room in it"
          intro="Read the day’s verse with your first cup of tea. Keep one line of it with you. On a hard day, that one line is the whole practice."
        >
          <NextStep locale="en" pageKey="gita-in-7-days" placement="after_days" />
        </Section>

        <Section id="faq" width="narrow" title="Questions about the Gita in 7 days">
          <Faq items={FAQ} ld={false} />
        </Section>

        <Section id="after" tone="band" title="After the seven days">
          <LinkCards items={lengthPlanCards('seven_after', 'seven')} columns={2} layout="rail" />
        </Section>
      </main>

      <SiteFooter />
      <BlogTracker pageName="Gita In 7 Days" />
    </>
  )
}
