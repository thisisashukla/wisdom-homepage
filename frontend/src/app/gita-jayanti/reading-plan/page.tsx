import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import HeroPlanCTA from '@/components/funnel/HeroPlanCTA'
import JayantiRelated from '@/components/jayanti/JayantiRelated'
import PlanFromToday from '@/components/jayanti/PlanFromToday'
import { getAllChapters, chapterUrl } from '@/lib/gita'
import { minutesEn, hoursLabel, runIso, fmtDay } from '@/lib/jayanti'
import '../../home.css'
import '../../home-v3.css'
import '../gita-jayanti.css'
import '../guides.css'

const URL = 'https://wisdomquotes.in/gita-jayanti/reading-plan'
const TITLE = 'Gita Jayanti Reading Plan: Finish the Gita by 20 Dec'
const DESCRIPTION =
  'Gita Jayanti 2026 reading plans: 18 days from 3 December, 9 days from 12 December, 3 days, or the whole Gita on the day. Or split it evenly from today.'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Wisdom` },
  description: DESCRIPTION,
  keywords: 'gita jayanti reading plan, gita jayanti 2026 reading plan, finish bhagavad gita before gita jayanti, gita path schedule, akhand gita path time',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Gita Jayanti reading plan',
    description: 'Finish the Gita by Sunday, 20 December, from whatever day you start.',
    url: URL,
    type: 'article',
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og/gita-jayanti-reading-plan.jpg', width: 1200, height: 630 }],
  },
}

type Ch = { number: number; verses: number; title: string }

/** Group consecutive chapters into days of `size` chapters. */
function groups(chs: Ch[], size: number) {
  const out: Ch[][] = []
  for (let i = 0; i < chs.length; i += size) out.push(chs.slice(i, i + size))
  return out
}
const sum = (g: Ch[]) => g.reduce((a, c) => a + c.verses, 0)
const span = (g: Ch[]) => (g.length === 1 ? `Chapter ${g[0].number}` : `Chapters ${g[0].number}–${g[g.length - 1].number}`)
const range = (gs: Ch[][]) => {
  const m = gs.map((g) => minutesEn(sum(g)))
  return `${Math.min(...m)}–${Math.max(...m)} min`
}

const SIX_NAMES = ['Karma (action)', 'Bhakti (devotion)', 'Jnana (knowledge)']
const ONE_DAY_SLOTS = ['Morning', 'Afternoon', 'Evening']

const FAQ = [
  {
    q: 'How long does it take to read the whole Gita in one day?',
    a: 'About two hours to read all 700 verses in English at an unhurried pace, or about three hours to recite the Sanskrit. Split into three sittings of six chapters, each takes 35 to 50 minutes in English.',
  },
  {
    q: 'When should I finish if I am keeping the Ekadashi?',
    a: 'For New Delhi, the Ekadashi tithi ends at 8:14 pm IST on 20 December. If you want to finish within the tithi, start the last sitting by about 7 pm. Times differ in other cities, so check your local panchang.',
  },
  {
    q: 'Can a family or group share the reading?',
    a: 'Yes. Split the 18 chapters into six sets of three and give one set to each person. The longest set, chapters 1 to 3, takes under half an hour in English, so six people can finish the Gita together in one sitting.',
  },
]

export default function ReadingPlanPage() {
  const chs: Ch[] = getAllChapters().map((c) => ({ number: c.number, verses: c.totalVerses, title: c.enTitle }))
  const nine = groups(chs, 2)
  const three = groups(chs, 6)
  const totalMin = minutesEn(700)

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: TITLE,
        description: DESCRIPTION,
        inLanguage: 'en',
        datePublished: '2026-10-25',
        dateModified: '2026-10-25',
        image: 'https://wisdomquotes.in/og/gita-jayanti-reading-plan.jpg',
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
          { '@type': 'ListItem', position: 2, name: 'Gita Jayanti 2026', item: 'https://wisdomquotes.in/gita-jayanti' },
          { '@type': 'ListItem', position: 3, name: 'Reading plan', item: URL },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav pageName="Gita Jayanti Reading Plan" />

      <main className="gjg">
        <header className="gjg-head">
          <div className="wrap">
            <div className="gjg-col">
              <nav className="gjg-crumbs" aria-label="Breadcrumb">
                <a href="/">Home</a> / <a href="/gita-jayanti">Gita Jayanti 2026</a> / <span>Reading plan</span>
              </nav>
              <div className="gjg-eyebrow">18 days, 9 days, 3 days or one</div>
              <h1 className="gjg-h1">Gita Jayanti reading plan: finish the Gita by 20 December</h1>
              <p className="gjg-lede">
                <a href="/gita-jayanti">Gita Jayanti 2026</a> falls on Sunday, 20 December. Pick the plan that matches the
                day you can start. Every plan covers all 18 chapters and 700 verses.
              </p>

              <div className="gjg-table-wrap">
                <table className="gjg-table">
                  <thead>
                    <tr><th>Plan</th><th>Start</th><th>Each day</th><th>Time a day</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><a href="#plan-18">18 days</a></td><td>Thu 3 Dec</td><td>1 chapter</td><td>4–13 min</td></tr>
                    <tr><td><a href="#plan-9">9 days</a></td><td>Sat 12 Dec</td><td>2 chapters</td><td>{range(nine)}</td></tr>
                    <tr><td><a href="#plan-3">3 days</a></td><td>Fri 18 Dec</td><td>6 chapters</td><td>{range(three)}</td></tr>
                    <tr><td><a href="#plan-1">1 day</a></td><td>Sun 20 Dec</td><td>All 18</td><td>About {hoursLabel(totalMin)}</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="gjg-note">Times are for reading the English at about 10 seconds a verse. Reciting the Sanskrit takes about half as long again.</p>

              <div className="gjg-today-box">
                <h2>Starting on a different day?</h2>
                <PlanFromToday chapters={chs.map(({ number, verses }) => ({ number, verses }))} />
              </div>
            </div>
          </div>
        </header>

        <section className="section">
          <div className="wrap gjg-col">
            <article className="gjg-plan" id="plan-18">
              <h2>18 days: one chapter a day</h2>
              <p className="gjg-plan-sub">Thursday 3 December to Sunday 20 December</p>
              <p>
                Chapter 1 on 3 December, chapter 18 on Jayanti. The shortest days are chapters 12 and 15 at 20 verses; the
                longest is chapter 18 at 78. Each day of this plan, with what the chapter covers and a verse from it, is on{' '}
                <a href="/read-gita-in-18-days">Read the Gita in 18 days</a>.
              </p>
              <a className="gj-btn-ghost" href="/gita-jayanti-18-days.ics" download data-mp-location="plan_18_ics">Add all 18 days to my calendar</a>
            </article>

            <article className="gjg-plan" id="plan-9">
              <h2>9 days: two chapters a day</h2>
              <p className="gjg-plan-sub">Saturday 12 December to Sunday 20 December</p>
              <p>The heaviest day is the first, chapters 1 and 2, because chapter 2 has 72 verses. The lightest is chapters 15 and 16.</p>
              <ol className="gjg-split">
                {nine.map((g, i) => (
                  <li key={i}>
                    <span className="gjg-split-day">{fmtDay(runIso([2026, 11, 12], i + 1))}</span>
                    <a className="gjg-split-what" href={chapterUrl(g[0].number)}>{span(g)}</a>
                    <span className="gjg-split-time">{sum(g)} verses · {minutesEn(sum(g))} min</span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="gjg-plan" id="plan-3">
              <h2>3 days: six chapters a day</h2>
              <p className="gjg-plan-sub">Friday 18 December to Sunday 20 December</p>
              <p>
                Commentators often read the Gita as three sets of six chapters, broadly on action, devotion and knowledge.
                This plan reads one set a day, so the last six chapters, ending with chapter 18, fall on Jayanti.
              </p>
              <ol className="gjg-split">
                {three.map((g, i) => (
                  <li key={i}>
                    <span className="gjg-split-day">{fmtDay(runIso([2026, 11, 18], i + 1))} · {SIX_NAMES[i]}</span>
                    <a className="gjg-split-what" href={chapterUrl(g[0].number)}>{span(g)}</a>
                    <span className="gjg-split-time">{sum(g)} verses · {minutesEn(sum(g))} min</span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="gjg-plan" id="plan-1">
              <h2>1 day: the whole Gita on Jayanti</h2>
              <p className="gjg-plan-sub">Sunday 20 December</p>
              <p>
                Many temples and families read the full Gita on the day. Split into three sittings, each is under an hour in
                English. In New Delhi the Ekadashi tithi ends at 8:14 pm IST, so start the evening sitting by about 7 pm if
                you want to finish within it.
              </p>
              <ol className="gjg-split">
                {three.map((g, i) => (
                  <li key={i}>
                    <span className="gjg-split-day">{ONE_DAY_SLOTS[i]}</span>
                    <a className="gjg-split-what" href={chapterUrl(g[0].number)}>{span(g)}</a>
                    <span className="gjg-split-time">{sum(g)} verses · {minutesEn(sum(g))} min</span>
                  </li>
                ))}
              </ol>
              <p>
                Short on time on the day itself? See <a href="/gita-jayanti/which-chapter-to-read">which chapter to read on Gita Jayanti</a>.
              </p>
            </article>
          </div>
        </section>

        <section className="section section-alt">
          <div className="wrap gjg-col">
            <h2 className="gjg-h2">Questions about the plans</h2>
            <div className="gjg-faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section gjg-cta">
          <div className="wrap gjg-col">
            <h2 className="gjg-h2">Or one verse a day, for what you’re facing</h2>
            <p>Tell Wisdom what’s going on and it picks a verse a day for seven days, with what each one means for you.</p>
            <HeroPlanCTA campaign="web_jayanti_plan" location="jayanti_plan_create_plan" pageName="Gita Jayanti Reading Plan" />
          </div>
        </section>

        <JayantiRelated current="plan" />
      </main>

      <SiteFooter />
      <BlogTracker pageName="Gita Jayanti Reading Plan" />
    </>
  )
}
