import type { Metadata } from 'next'
import React from 'react'
import appSchemas from '@/lib/appSchemas'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import StoreCTA from '@/components/app-page/StoreCTA'
import AppStoreQR from '@/components/app-page/AppStoreQR'
import HeroDemo from '@/components/app-page/HeroDemo'
import AppPageMotion from '@/components/app-page/AppPageMotion'
import '../home.css'
import './app-page.css'

const TITLE = 'Bhagavad Gita App for iPhone: Daily Verse & Audio | Wisdom'
const DESCRIPTION =
  'A Bhagavad Gita verse picked for what is on your mind, with Sanskrit, meaning and audio, plus a 7-day listening plan for your situation. Week 1 free on iPhone.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords:
    'bhagavad gita app, bhagavad gita app for iphone, best bhagavad gita app, gita app with audio, daily gita verse app, bhagavad gita verse of the day app',
  openGraph: {
    title: 'Wisdom: Bhagavad Gita, tuned to your life',
    description: DESCRIPTION,
    type: 'website',
    url: 'https://wisdomquotes.in/app',
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630, alt: 'Wisdom app for iPhone' }],
  },
  alternates: { canonical: 'https://wisdomquotes.in/app' },
}

type Tone = 'night' | 'paper'
type Feature = {
  n: number
  tone: Tone
  word: string
  art: string
  eyebrow: string
  h: string
  p: string
  alt: string
  micro?: 'listen' | 'clock' | 'stories' | 'thennow' | 'chips' | 'weeks'
}

/** One section per App Store screenshot. Copy is about what the person feels and gets. */
const FEATURES: Feature[] = [
  {
    n: 1,
    tone: 'night',
    word: 'मन',
    art: 'then_now',
    eyebrow: 'When it feels too much to explain',
    h: 'Say it the way it sounds in your head.',
    p: '“I’m so scared I’ll fail.” That is enough to begin. Wisdom hears the worry underneath and brings back the verse Krishna spoke to it, Sanskrit first, then in words you would use with a friend. For a moment, it feels like someone was listening.',
    alt: 'Wisdom turns “I’m so scared I’ll fail” into Bhagavad Gita 2.47, the work is yours, the result never was',
  },
  {
    n: 2,
    tone: 'paper',
    word: 'श्रवण',
    art: 'dusk_river',
    eyebrow: 'On mornings you can’t face a book',
    h: 'Press play. Your week is already planned around you.',
    p: 'Seven days, one verse a day, read to you in about two minutes. You never have to work out where to begin in a book of 700 verses. The order is set for what you are going through, so all that is left is to listen.',
    alt: 'Seven-day Bhagavad Gita audio reading plans for overthinking, can’t sleep, far from home and guilt',
    micro: 'listen',
  },
  {
    n: 3,
    tone: 'night',
    word: 'प्रभात',
    art: 'lotus_strip',
    eyebrow: 'Before the first message of the day',
    h: 'Calm meets you the first time you look at your screen.',
    p: 'You pick it up to check the time and today’s line is already there on your Lock Screen. One glance and the morning starts a little steadier. There is no app to open and nothing to remember.',
    alt: 'Gita shlokas on the iPhone Home Screen and Lock Screen as widgets',
    micro: 'clock',
  },
  {
    n: 4,
    tone: 'paper',
    word: 'कथा',
    art: 'hills_path',
    eyebrow: 'On the drive, at the stove',
    h: 'The stories you grew up half hearing, told for the life you have now.',
    p: 'Arjuna lays down his bow. Ram asks the ocean for a way through. Each story is told for the week you are having, with the shloka inside it, and the Gita, Ramayana and Mahabharata start to sound like home again, wherever home is now.',
    alt: 'Audio stories from the Mahabharata, Ramayana and Bhagavad Gita, each matched to a feeling',
    micro: 'stories',
  },
  {
    n: 5,
    tone: 'night',
    word: 'अर्जुन',
    art: 'battlefield_dusk',
    eyebrow: 'When your hands won’t stop shaking',
    h: 'Arjuna felt this too. You are in good company.',
    p: 'His hands shook before the war. Yours might shake before Monday’s big meeting. Finding your fear inside the oldest story in the family makes it feel smaller, and the answer Krishna gave him still holds for you.',
    alt: 'Arjuna’s hands shake before the war, your hands shake before the big pitch, with Gita 2.47',
    micro: 'thennow',
  },
  {
    n: 6,
    tone: 'paper',
    word: 'प्रश्न',
    art: 'city_night',
    eyebrow: 'When the words won’t come',
    h: 'Tap the one that’s closest. That is all it asks of you.',
    p: 'It might be overthinking, a difficult boss, your in-laws, being far from home, someone you lost or money. You don’t need to explain it or write a single sentence. One tap, and the next seven days are about your life.',
    alt: 'Pick a problem such as overthinking, my boss, my in-laws or far from home to get a 7-day plan',
    micro: 'chips',
  },
  {
    n: 7,
    tone: 'night',
    word: 'मार्ग',
    art: 'diya',
    eyebrow: 'After the first week',
    h: 'Week by week, the grip loosens.',
    p: 'The first week sits with what is happening. The second looks at the pattern underneath it, and the third at who you are beyond it. Week 1 is yours free. Keep going only if it helps.',
    alt: 'Three weeks of reading: your situation, the pattern underneath, who you are beyond it',
    micro: 'weeks',
  },
]

const DEV_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']
const devNum = (n: number) => `${DEV_DIGITS[0]}${DEV_DIGITS[n]}`

const PROMISES = [
  { icon: 'leaf', h: 'Nothing to keep up with', p: 'No streaks and no guilt for a missed day. Your plan waits for you.' },
  { icon: 'scroll', h: 'The verse stays the verse', p: 'Every line comes with its Sanskrit original and is never rewritten.' },
  { icon: 'lock', h: 'What you share stays yours', p: 'Your words choose your verses once and are never stored.' },
  { icon: 'coin', h: 'No surprise charges', p: 'Week 1 is free. You see the price before you pay and can cancel in one tap.' },
] as const

const REVIEWS = [
  {
    title: 'Exceptional',
    name: 'AbhimanyuDasgupta',
    body: 'I’m not a very religious or spiritual person myself, but the impact of the Shlokas at various points during a stressful day has had a very positive influence.',
  },
  {
    title: 'A Powerful Daily Mindset Companion',
    name: 'rahuliitb16',
    body: 'Highly recommended for anyone looking to bring a bit more peace and perspective into their life.',
  },
  {
    title: 'Helps me Stay Calm',
    name: 'Dibbbuuu',
    body: 'Beautiful app with meaningful spiritual quotes. It really helps me stay calm and positive every day.',
  },
]

const FAQ = [
  {
    q: 'What does Wisdom do?',
    a: 'You tell it what is on your mind. It picks one verse a day for it, with the Sanskrit, the meaning and what it says for your life, read aloud, for seven days.',
  },
  {
    q: 'Do I need to know Sanskrit or Hindi?',
    a: 'No. Every verse shows its Sanskrit line with plain English beside it, and the audio says it for you.',
  },
  {
    q: 'Is it only the Gita?',
    a: 'The Gita leads. When a story says it better, Wisdom also draws on the Ramayana, the Mahabharata and the Upanishads. Every verse comes with its original Sanskrit or Indian-language line.',
  },
  {
    q: 'How much does it cost?',
    a: 'Week 1 of your plan is free. Wisdom Pro opens weeks 2 and 3, monthly or yearly, with a free trial.',
  },
  {
    q: 'Is it on Android?',
    a: 'Wisdom is on iPhone for now. On Android or a computer, get your verse on wisdomquotes.in and build a 7-day plan on the web. Week 1 is free there too.',
  },
  {
    q: 'What happens to what I write?',
    a: 'Your words are sent once to choose your verses and are not stored or logged.',
  },
]

const BRIDGE =
  'The Gita begins with Arjuna sinking down in his chariot, his heart too heavy to fight, feeling the way you might feel tonight.'

const CHIPS = ['Overthinking', 'Can’t sleep', 'My boss', 'My in-laws', 'Far from home', 'Someone I lost', 'Guilt', 'Money is tight']

function Micro({ kind }: { kind: NonNullable<Feature['micro']> }) {
  if (kind === 'listen' || kind === 'stories') {
    const label = kind === 'listen' ? 'Overthinking · Day 3' : 'Gita · Ramayana · Mahabharata'
    return (
      <div className="ap-micro ap-listen" aria-hidden="true">
        <span className="ap-listen-play">
          <svg viewBox="0 0 24 24" width="14" height="14"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
        </span>
        <span className="ap-bars">
          {Array.from({ length: 18 }).map((_, i) => (
            <i key={i} style={{ '--i': i } as React.CSSProperties} />
          ))}
        </span>
        <span className="ap-listen-label">{label}</span>
      </div>
    )
  }
  if (kind === 'clock') {
    return (
      <div className="ap-micro ap-clock" aria-hidden="true">
        <div className="ap-clock-time">
          <span className="ap-clock-roll">
            <span>6:58</span>
            <span>6:59</span>
            <span>7:00</span>
          </span>
        </div>
        <div className="ap-clock-line">
          <small>Today · Gita 2.47</small>
          The work is yours. The result never was.
        </div>
      </div>
    )
  }
  if (kind === 'thennow') {
    return (
      <div className="ap-micro ap-thennow" aria-hidden="true">
        <span className="ap-tn ap-tn-a"><small>Then</small>Kurukshetra, before the war</span>
        <span className="ap-tn ap-tn-b"><small>Now</small>The night before your big day</span>
      </div>
    )
  }
  if (kind === 'chips') {
    return (
      <div className="ap-micro ap-chips" aria-hidden="true">
        {CHIPS.map((c, i) => (
          <span key={c} className="ap-chip" style={{ '--i': i } as React.CSSProperties}>
            {c}
          </span>
        ))}
      </div>
    )
  }
  return (
    <ol className="ap-micro ap-weeks" aria-hidden="true">
      {[
        ['Week 1', 'Your situation', 'Free'],
        ['Week 2', 'The pattern underneath', 'Pro'],
        ['Week 3', 'Who you are beyond it', 'Pro'],
      ].map(([w, t, tag], i) => (
        <li key={w} style={{ '--i': i } as React.CSSProperties}>
          <span className="ap-week-n">{w}</span>
          <span className="ap-week-t">{t}</span>
          <span className={`ap-week-tag${tag === 'Free' ? ' is-free' : ''}`}>{tag}</span>
          <span className="ap-week-fill" />
        </li>
      ))}
    </ol>
  )
}

function PromiseIcon({ name }: { name: (typeof PROMISES)[number]['icon'] }) {
  const p: Record<string, React.ReactNode> = {
    leaf: <path d="M6 26C6 14 14 6 26 6c0 12-8 20-20 20zM6 26l11-11" />,
    scroll: (
      <>
        <path d="M9 6h15v18a3 3 0 0 1-3 3H8" />
        <path d="M9 6a3 3 0 0 0-3 3v2h3M8 27a3 3 0 0 0 3-3V6" />
        <path d="M14 12h6M14 17h6" />
      </>
    ),
    lock: (
      <>
        <rect x="7" y="14" width="18" height="13" rx="3" />
        <path d="M11 14v-3a5 5 0 0 1 10 0v3M16 19v3" />
      </>
    ),
    coin: (
      <>
        <circle cx="16" cy="16" r="10" />
        <path d="M12 12h8M12 16h8M17 12c3 0 3 8-2 8l5 4" />
      </>
    ),
  }
  return (
    <svg className="ap-promise-icon" viewBox="0 0 32 32" width="34" height="34" fill="none" aria-hidden="true">
      {p[name]}
    </svg>
  )
}

export default function AppLandingPage() {
  return (
    <>
      {appSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <Nav pageName="App Landing" />

      <main className="ap" data-tone="night">
        <noscript>
          <style>{'.ap .ap-reveal,.ap-feat .ap-shot-enter{opacity:1;transform:none;filter:none}.ap-num i{transform:none}.ap-promise-icon *{stroke-dashoffset:0}'}</style>
        </noscript>
        {/* ── HERO ── */}
        <section className="ap-hero" data-tone="night" aria-labelledby="ap-title">
          <div className="ap-hero-sky" aria-hidden="true">
            <div className="ap-hero-sun" />
            {Array.from({ length: 22 }).map((_, i) => (
              <span
                key={i}
                className="ap-ember"
                style={
                  {
                    '--x': `${42 + ((i * 37) % 58)}%`,
                    '--d': `${9 + ((i * 7) % 8)}s`,
                    '--delay': `${-((i * 1.3) % 9)}s`,
                    '--s': `${2 + (i % 3)}px`,
                    '--drift': `${((i % 5) - 2) * 14}px`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          <div className="ap-hero-inner">
            <div className="ap-hero-copy">
              <div className="ap-hero-app ap-in" style={{ '--d': '0ms' } as React.CSSProperties}>
                <img src="/assets/app-page/app-icon.webp" alt="" width={44} height={44} />
                <span>
                  <strong>Wisdom</strong>
                  <small>Bhagavad Gita for iPhone</small>
                </span>
              </div>
              <h1 id="ap-title" className="ap-hero-title">
                <span className="ap-line"><span className="ap-in" style={{ '--d': '120ms' } as React.CSSProperties}>Bhagavad Gita,</span></span>
                <span className="ap-line"><span className="ap-in" style={{ '--d': '220ms' } as React.CSSProperties}>tuned to your life.</span></span>
                <span className="ap-line"><em className="ap-in" style={{ '--d': '360ms' } as React.CSSProperties}>One verse a day.</em></span>
              </h1>
              <p className="ap-hero-sub ap-in" style={{ '--d': '520ms' } as React.CSSProperties}>
                Tell it what has been on your mind. Each morning the Gita speaks to it with one verse, in Sanskrit and plain
                English, read to you in about two minutes.
              </p>
              <div className="ap-hero-ctas ap-in" style={{ '--d': '660ms' } as React.CSSProperties}>
                <StoreCTA campaign="web_app_hero" location="app_hero_download" androidRef="app_page_android" size="lg" />
                <AppStoreQR className="ap-qr-hero" caption="On a computer? Scan with your iPhone camera." />
              </div>
              <ul className="ap-hero-meta ap-in" style={{ '--d': '780ms' } as React.CSSProperties}>
                <li>Week 1 free</li>
                <li>No streaks</li>
                <li>
                  <a href="/start?ref=app_page" data-mp-location="app_hero_try_web">Try your first verse on the web</a>
                </li>
              </ul>
            </div>

            <HeroDemo />
          </div>

          <a href="#ap-bridge" className="ap-scrollcue" aria-label="Scroll to read more">
            <span />
          </a>
        </section>

        {/* ── BRIDGE ── */}
        <section id="ap-bridge" className="ap-bridge" data-tone="night">
          <p className="ap-bridge-text" data-scrub>
            {BRIDGE.split(' ').map((w, i) => (
              <span key={i} className="ap-scrub-w">
                {w}{' '}
              </span>
            ))}
          </p>
          <p className="ap-bridge-ref ap-reveal">
            <span lang="sa">रथोपस्थ उपाविशत्</span> · Bhagavad Gita 1.47, “he sat down in the chariot”
          </p>
        </section>

        {/* ── FEATURES, one per screenshot ── */}
        <div className="ap-features">
          {FEATURES.map((f, idx) => (
            <section
              key={f.n}
              id={`ap-f${f.n}`}
              className={`ap-feat${idx % 2 ? ' is-flip' : ''}`}
              data-tone={f.tone}
              data-feat={f.n}
              aria-labelledby={`ap-f${f.n}-h`}
            >
              <div className="ap-feat-bg" aria-hidden="true">
                <span className="ap-watermark" lang="sa" data-parallax="-0.18">{f.word}</span>
              </div>
              <div className="ap-feat-inner">
                <figure className="ap-shot-wrap" data-parallax="0.035">
                  <div
                    className={`ap-shot-glow${f.art === 'diya' ? ' is-diya' : ''}`}
                    style={{ backgroundImage: `url(/assets/app-page/${f.art}.webp)` }}
                    aria-hidden="true"
                  />
                  <div className="ap-shot-enter">
                    <div className="ap-shot" data-tilt>
                      <img
                        src={`/assets/app-v3/store-${f.n}.webp`}
                        alt={f.alt}
                        width={640}
                        height={1391}
                        loading={f.n === 1 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                      <span className="ap-shot-glare" aria-hidden="true" />
                    </div>
                  </div>
                </figure>

                <div className="ap-feat-copy">
                  <div className="ap-num ap-reveal" aria-hidden="true">
                    <span lang="sa">{devNum(f.n)}</span>
                    <i />
                    <small>{String(f.n).padStart(2, '0')} of 07</small>
                  </div>
                  <p className="ap-eyebrow ap-reveal" style={{ '--d': '80ms' } as React.CSSProperties}>{f.eyebrow}</p>
                  <h2 id={`ap-f${f.n}-h`} className="ap-feat-h ap-reveal" style={{ '--d': '160ms' } as React.CSSProperties}>
                    {f.h}
                  </h2>
                  <p className="ap-feat-p ap-reveal" style={{ '--d': '260ms' } as React.CSSProperties}>{f.p}</p>
                  {f.micro && (
                    <div className="ap-reveal" style={{ '--d': '380ms' } as React.CSSProperties}>
                      <Micro kind={f.micro} />
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>

        <nav className="ap-index" aria-label="Sections">
          {FEATURES.map((f) => (
            <a key={f.n} href={`#ap-f${f.n}`} data-index={f.n} aria-label={f.h}>
              <span lang="sa">{DEV_DIGITS[f.n]}</span>
            </a>
          ))}
        </nav>

        {/* ── REVIEWS ── */}
        <section className="ap-reviews" data-tone="paper" aria-labelledby="ap-rev-h">
          <div className="ap-wrap">
            <p className="ap-eyebrow ap-reveal">From the App Store</p>
            <h2 id="ap-rev-h" className="ap-sec-h ap-reveal" style={{ '--d': '100ms' } as React.CSSProperties}>
              In the words of people who kept it.
            </h2>
            <div className="ap-rev-grid">
              {REVIEWS.map((r, i) => (
                <figure key={r.name} className="ap-rev ap-reveal" style={{ '--d': `${200 + i * 120}ms` } as React.CSSProperties}>
                  <div className="ap-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <h3>{r.title}</h3>
                  <blockquote>“{r.body}”</blockquote>
                  <figcaption>{r.name} · App Store</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROMISES ── */}
        <section className="ap-promises" data-tone="night" aria-labelledby="ap-pro-h">
          <div className="ap-wrap">
            <p className="ap-eyebrow ap-reveal">Made to be gentle with you</p>
            <h2 id="ap-pro-h" className="ap-sec-h ap-reveal" style={{ '--d': '100ms' } as React.CSSProperties}>
              Nothing here will make you feel behind.
            </h2>
            <ul className="ap-pro-grid">
              {PROMISES.map((p, i) => (
                <li key={p.h} className="ap-pro ap-reveal" style={{ '--d': `${180 + i * 110}ms` } as React.CSSProperties}>
                  <PromiseIcon name={p.icon} />
                  <h3>{p.h}</h3>
                  <p>{p.p}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="ap-faq" id="faq" data-tone="night" aria-labelledby="ap-faq-h">
          <div className="ap-wrap ap-wrap-narrow">
            <h2 id="ap-faq-h" className="ap-sec-h ap-reveal">Questions people ask first.</h2>
            <div className="ap-faq-list">
              {FAQ.map((f) => (
                <details key={f.q} className="ap-faq-item ap-reveal">
                  <summary>
                    {f.q}
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL ── */}
        <section className="ap-final" data-tone="paper" aria-labelledby="ap-final-h">
          <div className="ap-final-art" aria-hidden="true" data-parallax="0.12" />
          <div className="ap-wrap ap-final-inner">
            <div className="ap-diya ap-reveal" aria-hidden="true">
              <span className="ap-diya-glow" />
              <img src="/assets/app-page/diya.webp" alt="" width={260} height={260} loading="lazy" />
            </div>
            <h2 id="ap-final-h" className="ap-final-h ap-reveal" style={{ '--d': '120ms' } as React.CSSProperties}>
              Your first verse is already waiting.
            </h2>
            <p className="ap-final-p ap-reveal" style={{ '--d': '220ms' } as React.CSSProperties}>
              Tell Wisdom what is on your mind and read it in a minute. Week 1 is free.
            </p>
            <div className="ap-final-ctas ap-reveal" style={{ '--d': '320ms' } as React.CSSProperties}>
              <StoreCTA campaign="web_app_final" location="app_final_download" androidRef="app_page_final" size="lg" />
              <AppStoreQR className="ap-qr-final" caption="Scan with your iPhone camera." />
            </div>
            <p className="ap-final-alt ap-reveal" style={{ '--d': '420ms' } as React.CSSProperties}>
              On Android?{' '}
              <a href="/start?ref=app_page_final" data-mp-location="app_final_android">
                Get your verse and a 7-day plan on the web
              </a>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <BlogTracker pageName="App Landing" />
      <AppPageMotion />
    </>
  )
}
