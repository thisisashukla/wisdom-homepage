import type { Metadata } from 'next'
import schemas from '@/lib/homeSchemas'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import { getAllChapters, getAllVerseRefs, getVerse, getVerseAudio } from '@/lib/gita'
import VerseAudioPlayer from '@/components/gita/VerseAudioPlayer'
import GitaAppCTA from '@/components/gita/GitaAppCTA'
import ContinueReading from '@/components/gita/ReadingProgress'
import './home.css'

// Revalidate hourly so the daily verse rolls over without a manual rebuild
export const revalidate = 3600

function todaysVerseRef() {
  const refs = getAllVerseRefs()
  if (!refs.length) return null
  const utc = new Date()
  const dayOfYear = Math.floor(
    (Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()) -
      Date.UTC(utc.getUTCFullYear(), 0, 0)) / 86400000
  )
  return refs[(utc.getUTCFullYear() * 1000 + dayOfYear) % refs.length]
}

export const metadata: Metadata = {
  title: 'Bhagavad Gita: Read All 700 Verses Online in Sanskrit, Hindi & English | Wisdom',
  description:
    'Read the complete Bhagavad Gita online. All 18 chapters, 700 verses in Sanskrit, Hindi and English. Free. No login. One verse per page with simple meaning and detailed commentary.',
  keywords:
    'bhagavad gita, bhagavad gita online, bhagavad gita hindi, bhagavad gita english, gita verses, bhagavad gita 2.47, bhagavad gita free',
  openGraph: {
    title: 'Bhagavad Gita: Read All 700 Verses Free Online | Wisdom',
    description:
      'The complete Bhagavad Gita. 18 chapters, 700 verses in Sanskrit, Hindi and English. Free to read, no login, no download required.',
    type: 'website',
    url: 'https://wisdomquotes.in',
    siteName: 'Wisdom',
    images: [
      {
        url: 'https://wisdomquotes.in/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Wisdom. Read the Bhagavad Gita free online',
      },
    ],
  },
  alternates: { canonical: 'https://wisdomquotes.in' },
}

const THEMES = [
  { slug: 'karma', name: 'Karma', hindi: 'कर्म', meaning: 'Action & its fruits' },
  { slug: 'dharma', name: 'Dharma', hindi: 'धर्म', meaning: 'Duty & discernment' },
  { slug: 'bhakti', name: 'Bhakti', hindi: 'भक्ति', meaning: 'Devotion & surrender' },
  { slug: 'manas', name: 'Manas', hindi: 'मनस्', meaning: 'The restless mind' },
]

export default async function HomePage() {
  const todayRef = todaysVerseRef()
  const verse = todayRef ? await getVerse(todayRef.chapter, todayRef.verse) : null
  const audio = todayRef ? getVerseAudio(todayRef.chapter, todayRef.verse) : null
  const chapters = getAllChapters()
  const faqs = schemas[0]['@graph'].find(item => item['@type'] === 'FAQPage')?.mainEntity || []
  return <div className="wisdom-home">
    {schemas.map((schema, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    <a className="home-skip" href="#main">Skip to content</a>
    <Nav />
    <main id="main">
      <section className="home-hero home-wrap" data-mp-section="hero">
        <div className="home-hero-copy">
          <p className="home-eyebrow">A place for daily contemplation</p>
          <h1>The Bhagavad Gita,<br /><em>a little each day.</em></h1>
          <p className="home-description">Read the complete Gita in Sanskrit, Hindi and English. Bring a verse into your day with Wisdom for iPhone.</p>
          <a className="home-read-button" href="/gita/today" data-mp-location="hero_today_verse">Read today’s verse <span aria-hidden="true">→</span></a>
          <a className="home-hindi" href="/hi/gita" hrefLang="hi" lang="hi" data-mp-location="hero_hindi">हिंदी में पढ़ें</a>
          <GitaAppCTA variant="hero" placement="hero" />
        </div>
        <figure className="home-hero-figure">
          <div className="home-figure-label"><span>WISDOM</span><span>READ · REFLECT · RETURN</span></div>
          <div className="home-phone"><img src="/assets/app-verse-sanskrit.webp" width="720" height="1565" alt="Wisdom app showing Bhagavad Gita 6.5 in Sanskrit, its meaning and Begin practice" fetchPriority="high" /></div>
          <figcaption>A verse. Its meaning. Your next small step.<br /><span>Inside the Wisdom app</span></figcaption>
        </figure>
      </section>
      <div className="home-facts home-wrap"><span>18 chapters · 700 verses</span><span>Sanskrit · Hindi · English</span><span>Free to read · No account needed</span></div>
      <div className="home-wrap home-resume"><ContinueReading /></div>

      <section className="home-daily home-wrap" id="today" data-mp-section="today_verse_card">
        <div className="home-section-intro"><p className="home-eyebrow">01 / Begin here</p><h2>A moment<br /><em>with the Gita.</em></h2><p>Read slowly. Listen to the Sanskrit. Let one thought stay with you.</p><a href="/gita/chapter/1/verse/1" data-mp-location="home_start_reading">Or begin with chapter one →</a></div>
        {verse && todayRef ? <article className="home-verse">
          <header><span>Today’s verse</span><span>Bhagavad Gita {todayRef.chapter}.{todayRef.verse}</span></header>
          {audio && verse.sanskrit ? <VerseAudioPlayer audioSrc={audio.audio} timestamps={audio.timestamps} text={verse.sanskrit} chapter={todayRef.chapter} verse={todayRef.verse} /> : <p className="home-sanskrit" lang="sa">{verse.sanskrit}</p>}
          <p className="home-small-label">English meaning · Wisdom editorial</p>
          <p className="home-meaning">{verse.simpleMeaning || verse.englishTranslation}</p>
          <a href={`/gita/chapter/${todayRef.chapter}/verse/${todayRef.verse}`} data-mp-location="home_today_full">Read the verse & commentary <span aria-hidden="true">↗</span></a>
        </article> : <a className="home-read-button" href="/gita/today">Read today’s verse →</a>}
      </section>

      <section className="home-app-band" id="app" data-mp-section="app_demonstration"><div className="home-wrap home-app-grid">
        <figure className="home-widget"><img src="/assets/app-lockscreen-widget.webp" width="720" height="1565" alt="Wisdom widget on an iPhone lock screen" loading="lazy" /><figcaption>Wisdom, within reach.</figcaption></figure>
        <div><p className="home-eyebrow">02 / Make room for a daily practice</p><h2>Keep the teaching<br /><em>close at hand.</em></h2><p className="home-description">The website is a place to read. The app makes space for returning: a verse on your screen, a teaching to explore, a reflection of your own.</p>
          <ol className="home-practice-steps"><li><span>01</span><div><h3>Read a teaching</h3><p>Meet the Sanskrit and its English meaning.</p></div></li><li><span>02</span><div><h3>Pause and reflect</h3><p>Consider how the teaching meets your day.</p></div></li><li><span>03</span><div><h3>Return in your own time</h3><p>Keep a verse nearby with a home or lock screen widget.</p></div></li></ol>
          <a className="home-text-link" href="/app" data-mp-location="home_app_details">Explore Wisdom for iPhone & iPad →</a>
          <p className="home-small-label">Free to start · Optional paid plan · Sanskrit & English in the app</p>
        </div>
      </div></section>

      <section className="home-library home-wrap" id="chapters" data-mp-section="chapter_index"><div className="home-section-heading"><div><p className="home-eyebrow">03 / The complete scripture</p><h2>Eighteen chapters.<br /><em>Many ways to begin.</em></h2></div><a href="/gita" data-mp-location="home_gita_index">Open the reading room ↗</a></div>
        <div className="home-chapter-list">{chapters.map(ch => <a key={ch.number} href={`/gita/chapter/${ch.number}`} data-mp-location={`home_chapter_${ch.number}`}><span className="home-chapter-number">{String(ch.number).padStart(2,'0')}</span><span><strong>{ch.enName}</strong><small>{ch.enTitle}</small></span><span className="home-chapter-count">{ch.totalVerses} verses</span></a>)}</div>
        <div className="home-themes">{THEMES.map(t => <a href={`/gita/topic/${t.slug}`} key={t.slug} data-mp-location={`home_theme_${t.slug}`}><span lang="sa">{t.hindi}</span><strong>{t.name}</strong><small>{t.meaning}</small></a>)}</div>
      </section>

      <section className="home-editorial home-wrap" id="editorial"><div><p className="home-eyebrow">04 / Read with context</p><h2>Care for the words.<br /><em>Clarity about the sources.</em></h2></div><div><p>The Sanskrit verse, its translation and its interpretation each have their own place here. English translations are Wisdom editorial; commentary is AI-drafted and human-reviewed.</p><p>Read our methodology for the sources and editorial process, and use the feedback tools on verse pages to point out an error.</p><a href="/methodology" data-mp-location="home_methodology">Our sources & editorial approach ↗</a><a href="/blogs/best-bhagavad-gita-translation" data-mp-location="home_translation_guide">A guide to choosing a Gita translation ↗</a></div></section>
      <section className="home-faq home-wrap" aria-label="Questions about Wisdom">{faqs.map(faq => <details key={faq.name}><summary>{faq.name}</summary><p>{faq.acceptedAnswer.text}</p></details>)}</section>
      <section className="home-final home-wrap"><p className="home-eyebrow">A small beginning is enough</p><h2>One verse today.<br /><em>Another tomorrow.</em></h2><GitaAppCTA variant="inline" placement="footer" /><a className="home-text-link" href="/gita/today" data-mp-location="footer_today">Read today’s verse on the web →</a></section>
    </main>
    <footer className="home-footer home-wrap"><a className="home-wordmark" href="/">Wisdom</a><p>The Bhagavad Gita, a little each day.<br />© {new Date().getUTCFullYear()} Wisdom · Ankur Shukla</p><nav aria-label="Footer"><a href="/about">About</a><a href="/blogs">Journal</a><a href="/methodology">Methodology</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:work.ankurshukla@gmail.com">Support</a></nav></footer>
    <BlogTracker pageName="Home" />
  </div>
}
