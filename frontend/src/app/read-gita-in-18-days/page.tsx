import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import { Actions, Button, Faq, JsonLd, PageHero, Section, VerseCard } from '@/components/site'
import JayantiRelated from '@/components/jayanti/JayantiRelated'
import PlanFine from '@/components/plan/PlanFine'
import { planAction } from '@/components/plan/planAction'
import { getAllChapters, getVerse, verseUrl, chapterUrl } from '@/lib/gita'
import { CHAPTER_GUIDE, minutesEn, minutesSa, runIso, fmtDay } from '@/lib/jayanti'
import '../gita-jayanti/guides.css'

const URL = 'https://wisdomquotes.in/read-gita-in-18-days'
const TITLE = 'Read the Bhagavad Gita in 18 Days: A Chapter a Day'
const DESCRIPTION =
  'A day-by-day plan to read all 18 chapters of the Bhagavad Gita: what each chapter covers, one verse from it in Sanskrit, and how long each day takes.'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Wisdom` },
  description: DESCRIPTION,
  keywords: 'read gita in 18 days, bhagavad gita 18 day reading plan, gita chapter a day, how to read bhagavad gita, bhagavad gita reading schedule',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Read the Bhagavad Gita in 18 days',
    description: 'One chapter a day, with what each covers and how long it takes.',
    url: URL,
    type: 'article',
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og/read-gita-in-18-days.webp', width: 1200, height: 630 }],
  },
}

const JAYANTI_START: [number, number, number] = [2026, 11, 3]

const FAQ = [
  {
    q: 'Do I need to read the chapters in order?',
    a: 'It helps. Chapter 1 sets up the scene the rest answers, and later chapters refer back to ideas from chapters 2 to 6. If you only have a few days, see which chapters to pick first.',
  },
  {
    q: 'What if I miss a day?',
    a: 'Read two chapters the next day. Chapters 5, 8, 12, 14, 15, 16 and 17 have under 30 verses each and are the easiest to double up with.',
  },
  {
    q: 'Which translation should I read alongside?',
    a: 'Every chapter here has the Sanskrit, a Hindi anuvad and an English translation. If you want a printed edition too, our comparison of English translations covers Gita Press, Easwaran, Prabhupada and others.',
  },
  {
    q: 'How long does the whole Gita take?',
    a: 'All 700 verses take about two hours to read in English at an unhurried pace, or about three hours to recite in Sanskrit. Spread over 18 days, that is between 4 and 13 minutes a day in English.',
  },
]

/** Two answers end with a link. The kit's Faq types `a` as the JSON-LD string; it renders any node, and this page
 *  emits its own FAQPage from FAQ (ld={false}), so the linked answers are passed as nodes here. */
const FAQ_LINK: Record<string, ReactNode> = {
  'Do I need': <a className="sx-link" href="/gita-jayanti/which-chapter-to-read">Which chapters to pick →</a>,
  'Which translation': <a className="sx-link" href="/blogs/best-bhagavad-gita-translation">Compare translations →</a>,
}
const faqItems = FAQ.map((f) => {
  const link = Object.entries(FAQ_LINK).find(([k]) => f.q.startsWith(k))?.[1]
  return link ? { q: f.q, a: (<>{f.a} {link}</>) as unknown as string } : f
})

export default async function ReadIn18DaysPage() {
  const chapters = getAllChapters()
  const days = await Promise.all(
    chapters.map(async (c) => {
      const g = CHAPTER_GUIDE[c.number]
      const v = await getVerse(c.number, g.verse)
      return { c, g, v, date: runIso(JAYANTI_START, c.number) }
    })
  )

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Read the Bhagavad Gita in 18 days',
        description: DESCRIPTION,
        inLanguage: 'en',
        datePublished: '2026-10-25',
        dateModified: '2026-10-25',
        image: 'https://wisdomquotes.in/og/read-gita-in-18-days.webp',
        author: { '@type': 'Person', name: 'Ankur Shukla', url: 'https://wisdomquotes.in/about' },
        publisher: { '@type': 'Organization', name: 'Wisdom', logo: 'https://wisdomquotes.in/assets/new-light-logo.webp' },
        mainEntityOfPage: URL,
      },
      {
        '@type': 'ItemList',
        name: 'Bhagavad Gita, one chapter a day',
        itemListElement: chapters.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `Day ${c.number}: Chapter ${c.number}, ${c.enTitle}`,
          url: `https://wisdomquotes.in${chapterUrl(c.number)}`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wisdomquotes.in' },
          { '@type': 'ListItem', position: 2, name: 'Gita Jayanti 2026', item: 'https://wisdomquotes.in/gita-jayanti' },
          { '@type': 'ListItem', position: 3, name: 'Read the Gita in 18 days', item: URL },
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
          { label: 'Gita Jayanti 2026', href: '/gita-jayanti' },
          { label: 'Read the Gita in 18 days', href: '/read-gita-in-18-days' },
        ]}
        crumbsLd={false}
        eyebrow="18 chapters, 18 days"
        title="Read the Bhagavad Gita in 18 days"
        sub="The Gita has 18 chapters, so a chapter a day takes 18 days. Chapters run from 20 verses (12 and 15) to 78 (chapter 18). A day’s reading takes 4 to 13 minutes in English, or 5 to 20 minutes to recite the Sanskrit."
        below={
          <>
            <p className="gjg-lede">
              You can start any day. For <a className="sx-link" href="/gita-jayanti">Gita Jayanti 2026</a>, start on Thursday, 3 December and
              chapter 18 falls on Sunday, 20 December, the day tradition says the Gita was spoken.
            </p>
            <div className="sx-actions">
              <Button href={chapterUrl(1)} label="Start with chapter 1" location="read18_start_ch1" variant="primary" />
              <a href="/gita-jayanti-18-days.ics" download className="sx-btn sx-btn--secondary" data-mp-location="read18_ics">
                Add 3–20 Dec to my calendar
              </a>
            </div>
            <p className="gjg-note">Times assume about 10 seconds a verse for the English and 15 to recite the Sanskrit.</p>
          </>
        }
        visual={
          <div className="gjg-art">
            <img src="/assets/chapter1.webp" alt="Arjuna seated in his chariot beside Krishna at Kurukshetra" fetchPriority="high" />
          </div>
        }
      />

      <main className="gjg">
        <Section id="days" width="narrow" spacing="tight">
          <ol className="gjg-days">
            {days.map(({ c, g, v, date }) => (
              <li key={c.number} id={`day-${c.number}`} className={`gjg-day${c.number === 18 ? ' is-jayanti' : ''}`}>
                <div className="gjg-day-meta">
                  Day {c.number}
                  <span>
                    {c.totalVerses} verses · {minutesEn(c.totalVerses)} min in English · {minutesSa(c.totalVerses)} min to recite
                  </span>
                  <span>For Jayanti: {fmtDay(date)}{c.number === 18 ? ', Gita Jayanti' : ''}</span>
                </div>
                <h2>
                  Chapter {c.number}: {c.enTitle}
                  <small>{c.enName}</small>
                </h2>
                <div className="sx-prose">
                  <p>{g.line}</p>
                </div>
                {v && (
                  <VerseCard
                    className="gjg-versecard"
                    size="compact"
                    original={v.sanskrit}
                    meaning={`“${v.englishTranslation}”`}
                    source={`${c.number}.${g.verse} · ${v.speaker}`}
                    sourceHref={verseUrl(c.number, g.verse)}
                  />
                )}
                <a className="sx-btn sx-btn--link" href={chapterUrl(c.number)} data-mp-location={`read18_read_ch${c.number}`}>
                  Read chapter {c.number} →
                </a>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="fewer" tone="band" width="narrow" title="Fewer than 18 days?">
          <div className="sx-prose">
            <p>
              The <a href="/gita-jayanti/reading-plan">Gita Jayanti reading plan</a> fits the same 700 verses into 9 days,
              3 days or the day itself, and can split them evenly from whatever day you start. If you only have one sitting,
              see <a href="/gita-jayanti/which-chapter-to-read">which chapter to read on Gita Jayanti</a>.
            </p>
          </div>
        </Section>

        <Section id="faq" width="narrow" title="Questions about reading a chapter a day">
          <Faq items={faqItems} ld={false} />
        </Section>

        <Section
          id="your-plan"
          tone="band"
          width="narrow"
          title="Or one verse a day, for what you’re facing"
          intro="Tell Wisdom what’s going on and it picks a verse a day for seven days, with what each one means for you."
        >
          <Actions items={[planAction({ campaign: 'web_read18', location: 'read18_create_plan' })]} />
          <PlanFine />
        </Section>

        <JayantiRelated current="eighteen" />
      </main>

      <SiteFooter />
      <BlogTracker pageName="Read Gita 18 Days" />
    </>
  )
}
