import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import HeroPlanCTA from '@/components/funnel/HeroPlanCTA'
import JayantiRelated from '@/components/jayanti/JayantiRelated'
import { getChapter, getVerse, verseUrl, chapterUrl } from '@/lib/gita'
import { minutesEn, minutesSa } from '@/lib/jayanti'
import '../../home.css'
import '../../home-v3.css'
import '../gita-jayanti.css'
import '../guides.css'

const URL = 'https://wisdomquotes.in/gita-jayanti/which-chapter-to-read'
const TITLE = 'Which Gita Chapter to Read on Gita Jayanti'
const DESCRIPTION =
  'Which Bhagavad Gita chapter to read on Gita Jayanti, by the time you have: two verses, chapter 12 or 15, chapter 2, chapter 18, or the whole Gita.'

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Wisdom` },
  description: DESCRIPTION,
  keywords: 'which chapter to read on gita jayanti, gita jayanti which chapter, gita chapter to read on mokshada ekadashi, short gita chapter, gita chapter 15 recitation',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Which chapter to read on Gita Jayanti',
    description: 'What to read with two minutes, fifteen, half an hour or the whole day.',
    url: URL,
    type: 'article',
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og/gita-jayanti-which-chapter.webp', width: 1200, height: 630 }],
  },
}

type Pick = {
  id: string
  time: string
  title: string
  body: string[]
  verses: [number, number][]
  chapter?: number
}

const FAQ = [
  {
    q: 'Is there a chapter you have to read on Gita Jayanti?',
    a: 'No single chapter is prescribed. Temples usually recite all 18 chapters on the day. At home, people read what they have time for, and any of the picks on this page is a reasonable choice.',
  },
  {
    q: 'Which is the shortest chapter of the Gita?',
    a: 'Chapters 12 and 15, with 20 verses each. Either takes about 4 minutes to read in English or 5 minutes to recite.',
  },
  {
    q: 'Which is the longest chapter?',
    a: 'Chapter 18, with 78 verses: about 13 minutes in English or 20 minutes to recite. Chapter 2 is next with 72.',
  },
]

export default async function WhichChapterPage() {
  const ch = (n: number) => getChapter(n)!
  const m = (n: number) => `${ch(n).totalVerses} verses · ${minutesEn(ch(n).totalVerses)} min in English · ${minutesSa(ch(n).totalVerses)} min to recite`

  const PICKS: Pick[] = [
    {
      id: 'two-minutes',
      time: 'Two minutes',
      title: '18.66 and 18.78',
      body: [
        'Two verses from the end of the Gita. In 18.66 Krishna tells Arjuna to take refuge in him and not to grieve; Sri Vaishnavas call it the charama shloka, the final teaching. 18.78 is the last verse of the Gita, spoken by Sanjaya, who has been narrating the whole dialogue to the blind king Dhritarashtra.',
      ],
      verses: [[18, 66], [18, 78]],
    },
    {
      id: 'five-minutes',
      time: 'Five minutes',
      title: 'Chapter 12 or chapter 15',
      body: [
        `The two shortest chapters, 20 verses each. Chapter 12 is on devotion: Arjuna asks whether it is better to worship Krishna in form or the formless, and the chapter ends with Krishna describing, quality by quality, the devotee who is dear to him (12.13 to 12.20).`,
        `Chapter 15 describes the world as an ashvattha tree with its roots above, and ends with Krishna naming himself Purushottama. Some families and ashrams chant chapter 15 before meals, so many people already know it by heart.`,
      ],
      verses: [[12, 13]],
      chapter: 12,
    },
    {
      id: 'fifteen-minutes',
      time: 'Fifteen minutes',
      title: 'Chapter 2',
      body: [
        `Where Krishna starts teaching after Arjuna sits down in chapter 1. It holds 2.47 on doing the work without holding on to its fruit, and closes with Arjuna asking how a person of steady mind speaks, sits and walks (2.54), and Krishna’s answer in the last 18 verses. ${m(2)}.`,
      ],
      verses: [[2, 47]],
      chapter: 2,
    },
    {
      id: 'twenty-minutes',
      time: 'Twenty minutes',
      title: 'Chapter 18',
      body: [
        `The last chapter, read on the day the dialogue took place. Krishna gathers up the teaching on action, renunciation and devotion, tells Arjuna to reflect on all of it and then decide (18.63), and Arjuna answers that his confusion is gone and he will do as Krishna says (18.73). ${m(18)}.`,
      ],
      verses: [[18, 63]],
      chapter: 18,
    },
    {
      id: 'with-children',
      time: 'Reading with children',
      title: 'Chapters 1 and 11',
      body: [
        `Both chapters are scenes a child can picture. Chapter 1 has the armies, the conch shells and Arjuna putting down his bow. Chapter 11 has Arjuna asking to see Krishna’s universal form and being frightened by it. Together they are ${ch(1).totalVerses + ch(11).totalVerses} verses, about ${minutesEn(ch(1).totalVerses + ch(11).totalVerses)} minutes in English.`,
      ],
      verses: [[11, 32]],
      chapter: 1,
    },
  ]

  const verseData = new Map<string, Awaited<ReturnType<typeof getVerse>>>()
  await Promise.all(
    PICKS.flatMap((p) => p.verses).map(async ([c, v]) => verseData.set(`${c}.${v}`, await getVerse(c, v)))
  )

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
        image: 'https://wisdomquotes.in/og/gita-jayanti-which-chapter.webp',
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
          { '@type': 'ListItem', position: 3, name: 'Which chapter to read', item: URL },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav pageName="Gita Jayanti Which Chapter" />

      <main className="gjg">
        <header className="gjg-head">
          <div className="wrap">
            <div className="gjg-col">
              <nav className="gjg-crumbs" aria-label="Breadcrumb">
                <a href="/">Home</a> / <a href="/gita-jayanti">Gita Jayanti 2026</a> / <span>Which chapter to read</span>
              </nav>
              <div className="gjg-eyebrow">Gita Jayanti, 20 December</div>
              <h1 className="gjg-h1">Which chapter to read on Gita Jayanti</h1>
              <p className="gjg-lede">
                If you can read the whole Gita on <a href="/gita-jayanti">Gita Jayanti</a>, read it in order; the{' '}
                <a href="/gita-jayanti/reading-plan#plan-1">one-day plan</a> splits it into three sittings. If you can’t, choose
                by the time you have. Each pick below says what the chapter covers and why it suits the day.
              </p>

              <div className="gjg-table-wrap">
                <table className="gjg-table">
                  <thead>
                    <tr><th>Time you have</th><th>Read</th></tr>
                  </thead>
                  <tbody>
                    {PICKS.map((p) => (
                      <tr key={p.id}>
                        <td>{p.time}</td>
                        <td><a href={`#${p.id}`}>{p.title}</a></td>
                      </tr>
                    ))}
                    <tr><td>Two to three hours</td><td><a href="#whole">The whole Gita</a></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="gjg-art">
              <img src="/assets/chapter18.webp" alt="Krishna and Arjuna at the close of the Gita" fetchPriority="high" />
            </div>
          </div>
        </header>

        <section className="section">
          <div className="wrap gjg-col">
            <div className="gjg-picks">
              {PICKS.map((p) => (
                <article key={p.id} id={p.id} className="gjg-pick">
                  <span className="gjg-pick-time">{p.time}</span>
                  <h2>{p.title}</h2>
                  {p.body.map((b, i) => <p key={i}>{b}</p>)}
                  {p.verses.map(([c, v]) => {
                    const d = verseData.get(`${c}.${v}`)
                    if (!d) return null
                    return (
                      <div className="gjg-verse" key={`${c}.${v}`}>
                        <div className="gjg-verse-ref">
                          <a href={verseUrl(c, v)} data-mp-location={`which_ch_verse_${c}_${v}`}>{c}.{v}</a> · {d.speaker}
                        </div>
                        <p className="gjg-verse-sa" lang="sa">{d.sanskrit}</p>
                        <p className="gjg-verse-en">“{d.englishTranslation}”</p>
                      </div>
                    )
                  })}
                  {p.chapter && (
                    <a className="gjg-day-go" href={chapterUrl(p.chapter)} data-mp-location={`which_ch_read_${p.id}`}>
                      Read chapter {p.chapter} →
                    </a>
                  )}
                  {p.id === 'five-minutes' && (
                    <>
                      {' '}
                      <a className="gjg-day-go" style={{ marginLeft: 16 }} href={chapterUrl(15)} data-mp-location="which_ch_read_15">
                        Read chapter 15 →
                      </a>
                    </>
                  )}
                </article>
              ))}

              <article id="whole" className="gjg-pick">
                <span className="gjg-pick-time">Two to three hours</span>
                <h2>The whole Gita</h2>
                <p>
                  All 700 verses take about two hours to read in English or about three to recite in Sanskrit. Start a few days
                  early and it is shorter each day: the <a href="/read-gita-in-18-days">18-day plan</a> is 4 to 13 minutes a
                  day, and the <a href="/gita-jayanti/reading-plan">Gita Jayanti reading plan</a> has 9-day and 3-day versions.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="wrap gjg-col">
            <h2 className="gjg-h2">Questions about choosing a chapter</h2>
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
            <HeroPlanCTA campaign="web_jayanti_which" location="jayanti_which_create_plan" pageName="Gita Jayanti Which Chapter" />
          </div>
        </section>

        <JayantiRelated current="which" />
      </main>

      <SiteFooter />
      <BlogTracker pageName="Gita Jayanti Which Chapter" />
    </>
  )
}
