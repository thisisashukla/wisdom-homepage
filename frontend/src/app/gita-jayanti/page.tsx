import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import { Actions, Button, Faq, JsonLd, PageHero, Section, VerseCard, VerseList } from '@/components/site'
import JayantiCountdown from '@/components/jayanti/JayantiCountdown'
import ChapterRun, { type RunDay } from '@/components/jayanti/ChapterRun'
import JayantiStartCTA from '@/components/jayanti/JayantiStartCTA'
import JayantiRelated from '@/components/jayanti/JayantiRelated'
import { chapterFor, daysIncl } from '@/components/jayanti/jayantiDate'
import PlanFine from '@/components/plan/PlanFine'
import { planAction } from '@/components/plan/planAction'
import { getAllChapters, getVerse, verseUrl, chapterUrl } from '@/lib/gita'
import { appStoreUrl } from '@/lib/app'
import './gita-jayanti.css'

// Hourly, so the server-rendered day count stays close before the client takes over.
export const revalidate = 3600

const URL = 'https://wisdomquotes.in/gita-jayanti'
const TITLE = 'Gita Jayanti 2026 Date, Countdown & 18-Day Gita Plan'
const DESCRIPTION =
  'Gita Jayanti 2026 is on Sunday, 20 December (Mokshada Ekadashi). Tithi timings, a countdown, and a plan to finish the Gita on the day.'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Wisdom` },
  description: DESCRIPTION,
  keywords:
    'gita jayanti 2026, gita jayanti 2026 date, gita jayanti kab hai, mokshada ekadashi 2026, gita jayanti countdown, गीता जयंती 2026, how to celebrate gita jayanti, gita jayanti reading plan',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Gita Jayanti 2026 · Sunday, 20 December',
    description: 'Read one chapter a day from 3 December and finish the Gita on Jayanti.',
    url: URL,
    type: 'article',
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og/gita-jayanti-2026.webp', width: 1200, height: 630 }],
  },
}

/** 3 Dec → 20 Dec 2026: chapter n is read on 2 Dec + n. */
function runDate(chapter: number) {
  const d = new Date(Date.UTC(2026, 11, 2 + chapter))
  return d.toISOString().slice(0, 10)
}

const VERSES = [
  { chapter: 10, verse: 35, why: 'Krishna names the month', note: 'Margashirsha, the month Gita Jayanti falls in.' },
  { chapter: 4, verse: 7, why: 'Why Krishna comes', note: null },
  { chapter: 2, verse: 47, why: 'The verse most people know', note: null },
  { chapter: 18, verse: 66, why: 'Krishna’s promise to Arjuna', note: null },
  { chapter: 18, verse: 78, why: 'The last verse of the Gita', note: 'Sanjaya closes the dialogue.' },
]

const WAYS = [
  {
    title: 'Read it aloud',
    body: 'The whole Gita in one sitting, as many temples and homes do, or one chapter. Chapters 12 and 15 are the shortest, at 20 verses each.',
  },
  {
    title: 'Keep the Ekadashi',
    body: 'The day is also Mokshada Ekadashi. Those who fast break it on the morning of 21 December, after sunrise, at the parana time your panchang gives.',
  },
  {
    title: 'Give a Gita',
    body: 'Gifting a copy, Gita daan, is an old way of marking the day. A family member who has never read it is a good place to start.',
  },
  {
    title: 'Go to Kurukshetra',
    body: 'Haryana holds the International Gita Mahotsav at Brahma Sarovar around Jayanti each year, with recitations, aarti and a fair. Check the dates before you travel.',
  },
]

const FAQ = [
  {
    q: 'When is Gita Jayanti in 2026?',
    a: 'Sunday, 20 December 2026. It is Shukla Ekadashi of Margashirsha. For New Delhi, the Ekadashi tithi runs from 10:09 pm IST on 19 December to 8:14 pm IST on 20 December.',
  },
  {
    q: 'Is Gita Jayanti the same day as Mokshada Ekadashi?',
    a: 'Yes. Both fall on the Shukla Ekadashi of Margashirsha. Tradition holds that Krishna spoke the Gita to Arjuna at Kurukshetra on this day, just before the war.',
  },
  {
    q: 'Is the date different outside India?',
    a: 'It can be. Ekadashi is set by local sunrise, so some panchangs in the Americas list the fast on 19 December. Check with your local temple or panchang.',
  },
  {
    q: 'How long does it take to read the whole Gita?',
    a: 'It has 700 verses in 18 chapters: about two hours to read in English at an unhurried pace, or about three hours to recite in Sanskrit. Split across the 18 days from 3 December, each day is 4 to 13 minutes in English, and chapter 18 lands on Jayanti.',
  },
  {
    q: 'Which chapter should I read on the day if I only have a few minutes?',
    a: 'Chapter 12, on devotion, and chapter 15, on the Supreme Person, are 20 verses each. Chapter 2 carries most of the teaching people quote. Or read 18.66 and 18.78, the close of the dialogue.',
  },
  {
    q: 'How many years since the Gita was spoken?',
    a: 'Panchangs print a traditional count each year. Scholars date the text as we have it to roughly 400 BCE to 200 CE, by most estimates.',
  },
]

export default async function GitaJayantiPage() {
  const chapters = getAllChapters()
  const run: RunDay[] = chapters.map((c) => ({
    chapter: c.number,
    title: c.enTitle,
    name: c.enName,
    verses: c.totalVerses,
    date: runDate(c.number),
    href: chapterUrl(c.number),
  }))
  const verses = (
    await Promise.all(VERSES.map(async (v) => ({ ref: v, data: await getVerse(v.chapter, v.verse) })))
  ).filter((v) => v.data)

  const shareText = encodeURIComponent(
    'Gita Jayanti is on Sunday, 20 December. Read one chapter a day from 3 December and finish the Gita on the day: https://wisdomquotes.in/gita-jayanti'
  )
  const gcal =
    'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' +
    encodeURIComponent('Gita Jayanti') +
    '&dates=20261220/20261221&details=' +
    encodeURIComponent('Margashirsha Shukla Ekadashi. Read a chapter: https://wisdomquotes.in/gita-jayanti')

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Gita Jayanti 2026',
        description: DESCRIPTION,
        inLanguage: 'en',
        datePublished: '2026-10-25',
        dateModified: '2026-10-25',
        image: 'https://wisdomquotes.in/og/gita-jayanti-2026.webp',
        author: { '@type': 'Person', name: 'Ankur Shukla', url: 'https://wisdomquotes.in/about' },
        publisher: { '@type': 'Organization', name: 'Wisdom', logo: 'https://wisdomquotes.in/assets/new-light-logo.webp' },
        mainEntityOfPage: URL,
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wisdomquotes.in' },
          { '@type': 'ListItem', position: 2, name: 'Gita Jayanti 2026', item: URL },
        ],
      },
    ],
  }

  return (
    <>
      <JsonLd data={schema} />

      <div className="gj-shell">
        <Nav overlayHero />

        <PageHero
          className="gj-hero"
          crumbs={[{ label: 'Gita Jayanti 2026', href: '/gita-jayanti' }]}
          crumbsLd={false}
          art={{ src: `/assets/chapter${chapterFor(daysIncl(new Date(Date.now() + 5.5 * 3600000)))}.webp`, alt: '', position: 'center 30%' }}
          title={
            <>
              <span className="gj-eyebrow">
                Gita Jayanti 2026 <span aria-hidden="true">·</span> <span lang="hi">गीता जयंती</span>
              </span>
              The day Krishna <em>spoke to Arjuna.</em>
            </>
          }
          sub={
            <>
              <span className="gj-nowrap">Sunday, 20 December 2026</span> · <span className="gj-nowrap">Mokshada Ekadashi</span>
            </>
          }
          facts={['Ekadashi tithi, New Delhi: 10:09 pm IST, 19 Dec → 8:14 pm IST, 20 Dec']}
          below={
            <div className="gj-hero-actions">
              <JayantiStartCTA location="gita_jayanti_hero" />
              <Button href={gcal} label="Add to Google Calendar" location="gita_jayanti_hero_gcal" variant="secondary" external />
              <a href="/gita-jayanti-2026.ics" download className="sx-btn sx-btn--secondary" data-mp-location="gita_jayanti_hero_ics">
                Apple / Outlook (.ics)
              </a>
            </div>
          }
          visual={<JayantiCountdown serverNow={Date.now()} />}
        />
      </div>

      <main className="gj">
        {/* ── What the day is ── */}
        <Section id="about" eyebrow="What the day marks" title="Kurukshetra, the morning before the war." width="narrow">
          <div className="sx-prose gj-lede rv">
            <p>
              Arjuna looked across the field at his teachers and cousins, put down his bow and sat in the chariot.
              Krishna’s answer to him is the Bhagavad Gita. Tradition places that conversation on the eleventh day of
              the bright half of Margashirsha, and Gita Jayanti marks it each year.
            </p>
            <p>The same day is Mokshada Ekadashi, the Ekadashi of release, kept with a fast by many families.</p>
          </div>
        </Section>

        {/* ── 18 days, 18 chapters ── */}
        <Section id="run" tone="band" eyebrow="18 days, 18 chapters" title="Finish the Gita on Jayanti.">
          <div className="sx-prose rv">
            <p>
              Start on Thursday, 3 December with chapter 1. Read one chapter a day and chapter 18 falls on
              Sunday, 20 December. Each chapter here has the Sanskrit, Hindi and English, and every verse can be
              read aloud.
            </p>
            <p>
              For what each chapter covers and a verse from each, see{' '}
              <a href="/read-gita-in-18-days" data-mp-location="gita_jayanti_run_guide">Read the Gita in 18 days</a>.
              If you start later, the <a href="/gita-jayanti/reading-plan" data-mp-location="gita_jayanti_run_plan">Gita Jayanti reading plan</a>{' '}
              has 9-day, 3-day and one-day versions.
            </p>
          </div>
          <div className="sx-actions gj-run-actions">
            <a href="/gita-jayanti-18-days.ics" download className="sx-btn sx-btn--secondary" data-mp-location="gita_jayanti_run_ics">
              Put the 18 days in my calendar
            </a>
            <Button href={`https://wa.me/?text=${shareText}`} label="Read it with family on WhatsApp" location="gita_jayanti_run_whatsapp" variant="secondary" external />
          </div>
          <ChapterRun days={run} />
        </Section>

        {/* ── A week that ends on Jayanti ── */}
        <Section
          id="week"
          width="narrow"
          eyebrow="Shorter on time"
          title={
            <>
              Or one verse a day, <em>for what you’re facing.</em>
            </>
          }
          intro="Tell Wisdom what’s going on and it picks a verse a day for seven days, with what each means for you. Your first verse comes the day you start."
        >
          <Actions items={[planAction({ campaign: 'web_gita_jayanti', location: 'gita_jayanti_create_plan' })]} />
          <PlanFine />
          <p className="plan-app">
            On iPhone, the verse sits on your Lock Screen and is read aloud.{' '}
            <a href={appStoreUrl('web_gita_jayanti')} target="_blank" rel="noopener" data-mp-location="gita_jayanti_app">
              Get the app →
            </a>
          </p>
        </Section>

        {/* ── Verses for the day ── */}
        <Section id="verses" tone="band" width="narrow" eyebrow="Verses for the day" title="Five verses to read on 20 December.">
          <VerseList>
            {verses.map(({ ref, data }) => (
              <VerseCard
                key={`${ref.chapter}.${ref.verse}`}
                as="li"
                rv
                label={ref.why}
                original={data!.sanskrit}
                meaning={`“${data!.englishTranslation}”`}
                source={`Bhagavad Gita ${ref.chapter}.${ref.verse}`}
                sourceHref={verseUrl(ref.chapter, ref.verse)}
              >
                {ref.note && <p className="gj-verse-note">{ref.note}</p>}
                <a className="sx-link gj-verse-more" href={verseUrl(ref.chapter, ref.verse)} data-mp-location={`gita_jayanti_verse_${ref.chapter}_${ref.verse}`}>
                  Meaning, Hindi and audio →
                </a>
              </VerseCard>
            ))}
          </VerseList>
        </Section>

        {/* ── How people keep the day ── */}
        <Section id="ways" eyebrow="How the day is kept" title="Four ways to mark it.">
          <div className="gj-ways" data-stagger="60">
            {WAYS.map((w, i) => (
              <div key={w.title} className="gj-way rv">
                <span className="gj-way-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
          <div className="sx-prose gj-ways-more">
            <p>
              Short on time on the day?{' '}
              <a href="/gita-jayanti/which-chapter-to-read" data-mp-location="gita_jayanti_ways_which">
                Which chapter to read on Gita Jayanti
              </a>
            </p>
            <p>
              Which verses do people look up most?{' '}
              <a href="/most-searched-gita-verses-2026" data-mp-location="gita_jayanti_searched_2026">
                The Gita verses people searched most in 2026
              </a>
            </p>
          </div>
        </Section>

        <JayantiRelated current="hub" heading="Plan your reading" tone="band" />

        {/* ── FAQ ── */}
        <Section id="faq" width="narrow" title="Gita Jayanti 2026, answered">
          <Faq items={FAQ} ld={false} />
        </Section>

        {/* ── Closing band ── */}
        <section className="gj-close">
          <img src="/assets/chapter18.webp" alt="" aria-hidden="true" loading="lazy" className="gj-close-bg" />
          <div className="gj-close-scrim" aria-hidden="true" />
          <div className="gj-close-inner rv">
            <p className="gj-close-sa" lang="sa">मा शुचः</p>
            <p className="gj-close-line">“Do not grieve.” Krishna, 18.66</p>
            <Button href={chapterUrl(1)} label="Start with chapter 1" location="gita_jayanti_close_ch1" variant="primary" />
          </div>
        </section>
      </main>

      <SiteFooter />
      <BlogTracker pageName="Gita Jayanti" />
    </>
  )
}
