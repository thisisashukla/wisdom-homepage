import type { Metadata } from 'next'
import React from 'react'
import schemas from '@/lib/homeSchemas'
import BlogTracker from '@/components/BlogTracker'
import HomeAnimations from '@/components/HomeAnimations'
import Nav from '@/components/Nav'
import HeroPlanCTA from '@/components/funnel/HeroPlanCTA'
import CreatePlanLink from '@/components/funnel/CreatePlanLink'
import PlanPreview from '@/components/funnel/PlanPreview'
import DevicePlans from '@/components/funnel/DevicePlans'
import { getAllChapters, getAllVerseRefs, getVerse, getVerseAudio, chapterImage } from '@/lib/gita'
import { appStoreUrl } from '@/lib/app'
import { GITA_FOR } from '@/lib/gitaFor'
import VerseAudioPlayer from '@/components/gita/VerseAudioPlayer'
import PlatformOnly from '@/components/funnel/PlatformOnly'
import './home.css'
import './home-v3.css'

import SiteFooter from '@/components/SiteFooter'
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

const TITLE = 'Bhagavad Gita: 700 Verses in Sanskrit with Meaning | Wisdom'
const DESCRIPTION =
  "All 700 Bhagavad Gita verses in Sanskrit with Hindi and English meaning, free. Today's verse, read aloud. Or a 7-day plan of verses for your situation."

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords:
    'bhagavad gita 700 verses, bhagavad gita verses in sanskrit with meaning, todays bhagavad gita verse, which bhagavad gita to read, best bhagavad gita translation, bhagavad gita in hindi, bhagavad gita app',
  openGraph: {
    title: "The Bhagavad Gita, tuned to your life",
    description: DESCRIPTION,
    type: 'website',
    url: 'https://wisdomquotes.in',
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630, alt: 'Wisdom: the Bhagavad Gita verse for what you are going through' }],
  },
  alternates: { canonical: 'https://wisdomquotes.in' },
}

const ICONIC_VERSES = [
  { ref: '2.47', chapter: 2, verse: 47, label: 'Karmanye vadhikaraste' },
  { ref: '4.7', chapter: 4, verse: 7, label: 'Yada yada hi dharmasya' },
  { ref: '2.20', chapter: 2, verse: 20, label: 'The atman never dies' },
  { ref: '18.66', chapter: 18, verse: 66, label: 'Surrender' },
  { ref: '6.5', chapter: 6, verse: 5, label: 'Raise yourself' },
  { ref: '2.62', chapter: 2, verse: 62, label: 'How anger starts' },
]

const BLOGS = [
  { slug: 'best-bhagavad-gita-translation', title: 'The best Bhagavad Gita translation in English, compared', dek: 'Easwaran, Prabhupada, Gandhi, Sargeant and more: which one to read first.' },
  { slug: 'krishna-quotes', title: '50 Krishna quotes from the Bhagavad Gita', dek: 'His best-known lines, with the Sanskrit and what each one means.' },
  { slug: 'karma-quotes-bhagavad-gita', title: 'Karma quotes from the Bhagavad Gita', dek: 'What the Gita says about action and its results.' },
]

const FAQ = [
  {
    q: 'Can I read all 700 verses of the Bhagavad Gita free?',
    a: "Yes. All 18 chapters and 700 verses are free here, each with the Sanskrit shloka, Hindi anuvad, an English translation and commentary. No login and no ads. To read the whole text, begin at 1.1: Arjuna's despair in chapter 1 is where Krishna's teaching starts.",
  },
  {
    q: 'Which Bhagavad Gita translation should I read? Is this ISKCON?',
    a: "No, it isn't ISKCON. The English here is the Wisdom translation, edited from public-domain sources and read against Shankara, Ramanuja and modern acharyas. For a side-by-side look at Gita Press, Prabhupada, Easwaran and others, see our comparison.",
  },
  {
    q: 'Is there a Bhagavad Gita verse for today?',
    a: 'Yes. A new verse goes up every morning, with the Sanskrit, its meaning and audio. On iPhone, the Wisdom app can put it on your Lock Screen.',
  },
  {
    q: 'How does the 7-day plan work?',
    a: `Answer a few questions about you and what's going on. Wisdom builds a week for it, a verse a day and a story on Day 7, starting with the Gita and drawing on the Upanishads, Ramayana and Mahabharata. Each comes with the Sanskrit and what it means for you. Week 1 is free: on iPhone in the app, and on Android and computers right here, after you sign in with Google.`,
  },
  {
    q: 'Is the Gita available in Hindi?',
    a: 'Yes. Every verse has a Hindi-first page at /hi/gita with the shloka, Hindi anuvad and vistrit arth.',
  },
  {
    q: 'What does it cost?',
    a: `Reading is free. Week 1 of a plan is free, on the web and on iPhone. On iPhone, Pro opens weeks 2 and 3.`,
  },
  {
    q: 'Is this a substitute for therapy?',
    a: "No. It can sit alongside therapy, but it doesn't replace it. If you're thinking about harming yourself, please call Tele-MANAS on 14416 (India, free, 24×7) or your local emergency number.",
  },
]

export default async function HomePage() {
  const todayRef = todaysVerseRef()
  const todayVerse = todayRef ? await getVerse(todayRef.chapter, todayRef.verse) : null
  const todayAudio = todayRef ? getVerseAudio(todayRef.chapter, todayRef.verse) : null
  const chapters = getAllChapters()

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── NAV + HERO: "your verse, right now" ── */}
      <div className="hero-shell">
        <Nav overlayHero pageName="Home" />

        <section className="hero hero-immersive hero-v3">
          <img
            src="/assets/hero-krishna-v5.webp"
            alt="Krishna revealing his universal form to Arjuna on the battlefield of Kurukshetra"
            fetchPriority="high"
            className="hero-bg"
            aria-hidden="true"
          />
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />

          <div className="hero-inner">
            <div className="hero-content">
              <h1>
                The Bhagavad Gita, <em>tuned to your life.</em>
              </h1>
              <p className="hero-sub">
                Say what&apos;s going on. You get one verse a day for seven days, starting with the Gita, with what each means for you.
              </p>

              <HeroPlanCTA />
              <a
                href="/gita/chapter/1/verse/1"
                className="hero-read-link"
                data-mp-location="hero_read_gita_cta"
              >
                Or read all 700 verses, in Sanskrit with meaning <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ── TODAY'S VERSE ── */}
      {todayVerse && todayRef && (
        <section className="section section-alt" id="today" data-mp-section="today_verse_card">
          <div className="wrap">
            <div className="today-verse-card rv" style={{ margin: '0 auto' }}>
              <div className="today-verse-head">
                <div className="today-verse-eyebrow">
                  <span className="today-verse-dot" aria-hidden="true" />
                  Today&apos;s Bhagavad Gita verse
                </div>
                <h2 className="today-verse-ref">Bhagavad Gita {todayRef.chapter}.{todayRef.verse}</h2>
              </div>
              {todayAudio && todayVerse.sanskrit ? (
                <VerseAudioPlayer
                  audioSrc={todayAudio.audio}
                  timestamps={todayAudio.timestamps}
                  text={todayVerse.sanskrit}
                  chapter={todayRef.chapter}
                  verse={todayRef.verse}
                />
              ) : (
                todayVerse.sanskrit && <p className="today-verse-sanskrit">{todayVerse.sanskrit}</p>
              )}
              <blockquote className="today-verse-meaning">
                &ldquo;{todayVerse.simpleMeaning || todayVerse.englishTranslation}&rdquo;
              </blockquote>
              {todayVerse.simpleInsight && <p className="today-verse-insight">{todayVerse.simpleInsight}</p>}
              <div className="today-verse-footer">
                <div className="today-verse-hint">
                  <span aria-hidden="true">▶</span> A new verse every morning, read aloud with the Sanskrit.
                </div>
              </div>
              <div className="today-actions">
                <a
                  href={`/gita/chapter/${todayRef.chapter}/verse/${todayRef.verse}`}
                  className="btn-read-gita btn-read-gita-primary"
                  data-mp-location="home_today_verse_go_deeper"
                  data-mp-event="Today Verse CTA Clicked"
                  data-mp-props={JSON.stringify({ verse: `${todayRef.chapter}.${todayRef.verse}` })}
                >
                  Read this verse in full →
                </a>
                <PlatformOnly on={['ios']}>
                  <a href={appStoreUrl('web_home_today_lockscreen')} target="_blank" rel="noopener" className="btn-ghost" data-mp-location="home_today_lockscreen">
                    Put it on your Lock Screen
                  </a>
                </PlatformOnly>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── PLAN PREVIEW: pick a situation, see the real week, create yours ── */}
      <section className="section" id="plans" data-mp-section="home_plan_preview">
        <div className="wrap">
          <div className="sec-head rv">
            <div className="eyebrow">Real plans</div>
            <h2 className="heading">Pick one. See all <em>seven days.</em></h2>
          </div>
          <div className="rv">
            <PlanPreview />
          </div>
        </div>
      </section>

      {/* ── WHICH GITA SHOULD YOU READ? (best-converting query; trust) ── */}
      <section className="section section-alt" id="which-gita" data-mp-section="home_which_gita">
        <div className="wrap">
          <div className="sec-head rv">
            <div className="eyebrow">Before you start</div>
            <h2 className="heading">Which Bhagavad Gita <em>should you read?</em></h2>
            <p className="subtext">
              Pick one that shows you the Sanskrit and reads it through more than one tradition. Here is how this site
              handles it.
            </p>
          </div>
          <div className="sources-grid" data-stagger="90">
            <div className="rv">
              <h3>The Sanskrit, every time</h3>
              <p>
                Every verse is shown in its original language, including the Ramayana and Mahabharata verses in the
                plans. Lines aren&apos;t trimmed to make them sound like quotes.
              </p>
            </div>
            <div className="rv">
              <h3>Shankara and Ramanuja, side by side</h3>
              <p>
                Meanings are read against Shankara, Ramanuja and modern acharyas, so no single sampradaya&apos;s reading
                decides what a verse says.
              </p>
            </div>
            <div className="rv">
              <h3>What the AI does, and what it doesn&apos;t</h3>
              <p>
                It reads what you tell it, picks verses from a library of 1,743, and writes the line about your life. It
                doesn&apos;t write or change scripture. Commentary on the site is AI-drafted and reviewed by a person.{' '}
                <a href="/methodology" data-mp-location="home_which_gita_methodology">Methodology →</a>
              </p>
            </div>
          </div>
          <p className="which-gita-essay rv">
            <a href="/blogs/best-bhagavad-gita-translation" data-mp-location="home_which_gita_essay">
              Gita Press, Prabhupada, Easwaran, Sargeant and more, compared <span aria-hidden="true">→</span>
            </a>
          </p>
          <figure className="sources-review rv">
            <blockquote>
              &ldquo;I&apos;m not a very religious or spiritual person myself, but the impact of the Shlokas at various
              points during a stressful day has had a very positive influence.&rdquo;
            </blockquote>
            <figcaption>Abhimanyu Dasgupta, App Store review</figcaption>
          </figure>
          
        </div>
      </section>

      {/* ── DEVICES: where you read it and what it costs, for your device ── */}
      <section className="section" id="app" data-mp-section="home_devices">
        <div className="wrap">
          <div className="sec-head rv">
            <div className="eyebrow">Where you get it</div>
            <h2 className="heading">Get your week on any <em>phone or computer.</em></h2>
          </div>
          <div className="rv">
            <DevicePlans />
          </div>
        </div>
      </section>

      {/* ── GITA FOR LIFE (problem pages) ── */}
      <section className="section section-alt" id="gita-for" data-mp-section="home_gita_for">
        <div className="wrap">
          <div className="sec-head rv">
            <div className="eyebrow">Gita for life</div>
            <h2 className="heading">What Krishna said about overthinking, grief, failure <em>and anger.</em></h2>
            <p className="subtext">Each page gathers the verses on one problem, with Sanskrit, Hindi and English.</p>
          </div>
          <div className="gita-for-grid" data-stagger="30">
            {GITA_FOR.map((p) => (
              <a key={p.slug} href={`/gita-for/${p.slug}`} className="gita-for-tile rv" data-mp-location={`home_gita_for_${p.slug}`}>
                <span className="gita-for-label">{p.label}</span>
                <span className="gita-for-count">{p.verses.length} verses →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── READ THE GITA (compact library) ── */}
      <section className="section" id="chapters">
        <div className="wrap">
          <div className="sec-head rv">
            <div className="eyebrow">Read the Bhagavad Gita</div>
            <h2 className="heading">All 700 verses, <em>in Sanskrit with meaning.</em></h2>
            <p className="subtext">
              18 chapters, one verse per page: the shloka in Devanagari, Hindi anuvad, an English translation and commentary.
              Free, with no login and no ads.
            </p>
          </div>
          <div className="library-actions rv">
            <a href="/gita/chapter/1/verse/1" className="btn-read-gita btn-read-gita-primary" data-mp-location="home_library_start_1_1">Start at 1.1</a>
            <a href="/gita" className="btn-ghost" data-mp-location="home_chapters_all">Open the full index</a>
          </div>
          <div className="chapters-grid" data-stagger="25">
            {chapters.map((ch) => {
              const img = chapterImage(ch.number)
              return (
                <a key={ch.number} href={`/gita/chapter/${ch.number}`} data-mp-location={`home_chapter_grid_${ch.number}`} className="chapter-tile rv">
                  <img className="chapter-tile-img" src={img.src} alt={img.alt} loading="lazy" />
                  <div className="chapter-tile-body">
                    <div className="chapter-tile-num">Chapter {ch.number} · {ch.totalVerses} verses</div>
                    <div className="chapter-tile-name">{ch.enName}</div>
                    <div className="chapter-tile-title">{ch.enTitle}</div>
                  </div>
                </a>
              )
            })}
          </div>

          <div className="library-row rv">
            <span className="library-label">Most searched</span>
            {ICONIC_VERSES.map((v) => (
              <a key={v.ref} href={`/gita/chapter/${v.chapter}/verse/${v.verse}`} data-mp-location={`home_iconic_${v.ref.replace('.', '_')}`}>
                BG {v.ref}: {v.label}
              </a>
            ))}
          </div>

          <div className="hindi-callout rv">
            <div>
              <div className="eyebrow" style={{ marginBottom: 6 }}>हिंदी में</div>
              <p className="hindi-callout-head">भगवद गीता के 700 श्लोक, हिंदी में अर्थ सहित</p>
              <p className="hindi-callout-sub">संस्कृत श्लोक, हिंदी अनुवाद और विस्तृत अर्थ। सभी 18 अध्याय, निःशुल्क।</p>
            </div>
            <a href="/hi/gita" hrefLang="hi" className="btn-nav" data-mp-location="home_hindi_callout">हिंदी गीता खोलें →</a>
          </div>

          <div className="blog-row" data-stagger="80">
            {BLOGS.map((b) => (
              <a key={b.slug} href={`/blogs/${b.slug}`} className="blog-row-card rv" data-mp-location={`home_blog_${b.slug}`}>
                <h3>{b.title}</h3>
                <p>{b.dek}</p>
                <span>Read →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section section-alt" id="faq">
        <div className="wrap faq-split">
          <div className="sec-head rv">
            <div className="eyebrow">FAQ</div>
            <h2 className="heading">Common questions</h2>
          </div>
          <div className="faq-list rv" role="list">
            {FAQ.map((f) => (
              <div key={f.q} className="faq-item" role="listitem">
                <button className="faq-q" aria-expanded="false">
                  {f.q}
                  <svg className="faq-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-band-wrap">
        <div className="final-band rv">
          <img src="/assets/chapter2.webp" alt="" aria-hidden="true" loading="lazy" className="final-band-art" />
          <div className="final-band-scrim" aria-hidden="true" />
          <div className="final-band-inner">
          <h2>Start with <em>Week 1, free.</em></h2>
          <p>A few questions, about two minutes.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <CreatePlanLink className="btn-read-gita btn-read-gita-primary" campaign="web_final_band" location="final_cta_create_plan">Create my 7-day Gita plan</CreatePlanLink>
          </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <SiteFooter />

      <BlogTracker pageName="Home" />
      <HomeAnimations />
    </>
  )
}
