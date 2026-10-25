import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import HomeAnimations from '@/components/HomeAnimations'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import HeroPlanCTA from '@/components/funnel/HeroPlanCTA'
import JayantiCountdown from '@/components/jayanti/JayantiCountdown'
import ChapterRun, { type RunDay } from '@/components/jayanti/ChapterRun'
import JayantiStartCTA from '@/components/jayanti/JayantiStartCTA'
import JayantiRelated from '@/components/jayanti/JayantiRelated'
import JayantiHeroArt from '@/components/jayanti/JayantiHeroArt'
import { chapterFor, daysIncl } from '@/components/jayanti/jayantiDate'
import { getAllChapters, getVerse, verseUrl, chapterUrl } from '@/lib/gita'
import { appStoreUrl } from '@/lib/app'
import '../home.css'
import '../home-v3.css'
import './gita-jayanti.css'
import './guides.css'

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="gj-shell">
        <Nav overlayHero pageName="Gita Jayanti" />

        <header className="gj-hero">
          <JayantiHeroArt serverChapter={chapterFor(daysIncl(new Date(Date.now() + 5.5 * 3600000)))} />
          <div className="gj-hero-scrim" aria-hidden="true" />

          <div className="gj-hero-inner">
            <h1 className="gj-h1">
              <span className="gj-eyebrow">
                Gita Jayanti 2026 <span aria-hidden="true">·</span> <span lang="hi">गीता जयंती</span>
              </span>
              The day Krishna <em>spoke to Arjuna.</em>
            </h1>
            <p className="gj-date"><span>Sunday, 20 December 2026</span> · <span>Mokshada Ekadashi</span></p>

            <JayantiCountdown serverNow={Date.now()} />

            <p className="gj-tithi">
              Ekadashi tithi, New Delhi: 10:09 pm IST, 19 Dec → 8:14 pm IST, 20 Dec
            </p>

            <div className="gj-hero-actions">
              <JayantiStartCTA className="btn-read-gita btn-read-gita-primary gj-btn" location="gita_jayanti_hero" />
              <a href={gcal} target="_blank" rel="noopener" className="gj-btn-ghost" data-mp-location="gita_jayanti_hero_gcal">
                Add to Google Calendar
              </a>
              <a href="/gita-jayanti-2026.ics" download className="gj-btn-ghost" data-mp-location="gita_jayanti_hero_ics">
                Apple / Outlook (.ics)
              </a>
            </div>
          </div>
        </header>
      </div>

      <main className="gj">
        {/* ── What the day is ── */}
        <section className="section gj-about">
          <div className="wrap gj-col reveal">
            <div className="eyebrow">What the day marks</div>
            <h2 className="heading">Kurukshetra, the morning before the war.</h2>
            <p className="subtext">
              Arjuna looked across the field at his teachers and cousins, put down his bow and sat in the chariot.
              Krishna’s answer to him is the Bhagavad Gita. Tradition places that conversation on the eleventh day of
              the bright half of Margashirsha, and Gita Jayanti marks it each year.
            </p>
            <p className="subtext">
              The same day is Mokshada Ekadashi, the Ekadashi of release, kept with a fast by many families.
            </p>
          </div>
        </section>

        {/* ── 18 days, 18 chapters ── */}
        <section className="section section-alt" id="run">
          <div className="wrap">
            <div className="gj-col reveal">
              <div className="eyebrow">18 days, 18 chapters</div>
              <h2 className="heading">Finish the Gita on Jayanti.</h2>
              <p className="subtext">
                Start on Thursday, 3 December with chapter 1. Read one chapter a day and chapter 18 falls on
                Sunday, 20 December. Each chapter here has the Sanskrit, Hindi and English, and every verse can be
                read aloud.
              </p>
              <p className="subtext">
                For what each chapter covers and a verse from each, see{' '}
                <a className="gj-link" href="/read-gita-in-18-days" data-mp-location="gita_jayanti_run_guide">Read the Gita in 18 days</a>.
                If you start later, the <a className="gj-link" href="/gita-jayanti/reading-plan" data-mp-location="gita_jayanti_run_plan">Gita Jayanti reading plan</a>{' '}
                has 9-day, 3-day and one-day versions.
              </p>
              <div className="gj-run-actions">
                <a href="/gita-jayanti-18-days.ics" download className="gj-btn-ghost" data-mp-location="gita_jayanti_run_ics">
                  Put the 18 days in my calendar
                </a>
                <a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noopener" className="gj-btn-ghost" data-mp-location="gita_jayanti_run_whatsapp">
                  Read it with family on WhatsApp
                </a>
              </div>
            </div>
            <ChapterRun days={run} />
          </div>
        </section>

        {/* ── A week that ends on Jayanti ── */}
        <section className="section gj-week">
          <div className="wrap gj-col reveal">
            <div className="eyebrow">Shorter on time</div>
            <h2 className="heading">
              Or one verse a day, <em>for what you’re facing.</em>
            </h2>
            <p className="subtext">
              Tell Wisdom what’s going on and it picks a verse a day for seven days, with what each means for you.
              Your first verse comes the day you start.
            </p>
            <HeroPlanCTA campaign="web_gita_jayanti" location="gita_jayanti_create_plan" pageName="Gita Jayanti" />
            <p className="gj-app">
              On iPhone, the verse sits on your Lock Screen and is read aloud.{' '}
              <a href={appStoreUrl('web_gita_jayanti')} target="_blank" rel="noopener" data-mp-location="gita_jayanti_app">
                Get the app →
              </a>
            </p>
          </div>
        </section>

        {/* ── Verses for the day ── */}
        <section className="section section-alt">
          <div className="wrap gj-col">
            <div className="eyebrow reveal">Verses for the day</div>
            <h2 className="heading reveal">Five verses to read on 20 December.</h2>
            <ol className="gj-verses">
              {verses.map(({ ref, data }) => (
                <li key={`${ref.chapter}.${ref.verse}`} className="gj-verse reveal">
                  <div className="gj-verse-ref">
                    <a href={verseUrl(ref.chapter, ref.verse)} data-mp-location={`gita_jayanti_verse_${ref.chapter}_${ref.verse}`}>
                      Bhagavad Gita {ref.chapter}.{ref.verse}
                    </a>
                    <span> · {ref.why}</span>
                  </div>
                  <p className="gj-verse-sa" lang="sa">{data!.sanskrit}</p>
                  <p className="gj-verse-en">“{data!.englishTranslation}”</p>
                  {ref.note && <p className="gj-verse-note">{ref.note}</p>}
                  <a className="gj-verse-more" href={verseUrl(ref.chapter, ref.verse)}>
                    Meaning, Hindi and audio →
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── How people keep the day ── */}
        <section className="section">
          <div className="wrap">
            <div className="gj-col reveal">
              <div className="eyebrow">How the day is kept</div>
              <h2 className="heading">Four ways to mark it.</h2>
            </div>
            <div className="gj-ways">
              {WAYS.map((w, i) => (
                <div key={w.title} className="gj-way reveal">
                  <span className="gj-way-n">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                </div>
              ))}
            </div>
            <p className="gj-ways-more">
              Short on time on the day?{' '}
              <a className="gj-link" href="/gita-jayanti/which-chapter-to-read" data-mp-location="gita_jayanti_ways_which">
                Which chapter to read on Gita Jayanti
              </a>
            </p>
          </div>
        </section>

        <JayantiRelated current="hub" heading="Plan your reading" />

        {/* ── FAQ ── */}
        <section className="section section-alt">
          <div className="wrap gj-col">
            <h2 className="heading reveal">Gita Jayanti 2026, answered</h2>
            <div className="gj-faq">
              {FAQ.map((f) => (
                <details key={f.q} className="gj-faq-item reveal">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing band ── */}
        <section className="gj-close">
          <img src="/assets/chapter18.webp" alt="" aria-hidden="true" loading="lazy" className="gj-close-bg" />
          <div className="gj-close-scrim" aria-hidden="true" />
          <div className="gj-close-inner reveal">
            <p className="gj-close-sa" lang="sa">मा शुचः</p>
            <p className="gj-close-line">“Do not grieve.” Krishna, 18.66</p>
            <a href={chapterUrl(1)} className="btn-read-gita btn-read-gita-primary gj-btn" data-mp-location="gita_jayanti_close_ch1">
              Start with chapter 1
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <BlogTracker pageName="Gita Jayanti" />
      <HomeAnimations />
    </>
  )
}
