import type { Metadata } from 'next'
import PlatformOnly from '@/components/funnel/PlatformOnly'
import React from 'react'
import appSchemas from '@/lib/appSchemas'
import BlogTracker from '@/components/BlogTracker'
import HomeAnimations from '@/components/HomeAnimations'
import Nav from '@/components/Nav'
import { appStoreUrl, WEB_PLAN_PRICE_INR } from '@/lib/app'
import '../home.css'
import '../home-v3.css'

const TITLE = 'Bhagavad Gita App for iPhone: Daily Verse & Audio | Wisdom'
const DESCRIPTION =
  'A Bhagavad Gita verse picked for how you feel today, with Sanskrit, meaning and audio, plus a 7-day listening plan for your situation. Week 1 free on iPhone.'

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

const STEPS = [
  { h: 'Say what is going on', p: 'Pick how you feel and what it is about, or say it in your own words. Overthinking, a hard boss, far from home, someone you lost.' },
  { h: 'Get your verse', p: 'Wisdom picks the verse that speaks to it, with the original Sanskrit, what it says, and what it means for your life.' },
  { h: 'Walk seven days', p: 'Your plan runs see it, steady it, act on it, then a story. One verse a day, read aloud, about two minutes.' },
  { h: 'Go deeper', p: 'Week 2 looks at the pattern underneath your situation. Week 3 at who you are beyond it.' },
]

const SCREENS = [1, 2, 3, 4, 5, 6, 7].map((n) => `/assets/app-v3/store-${n}.webp`)

const FAQ = [
  { q: 'What does Wisdom do?', a: 'It tunes the Bhagavad Gita to your life. You tell it what is going on and it picks one verse a day for it, with the Sanskrit, the meaning and what it says for you, read aloud, for seven days.' },
  { q: 'Is it only the Gita?', a: 'The Gita leads. When a story says it better, Wisdom also draws on the Ramayana, the Mahabharata and the Upanishads. Every verse comes with its original Sanskrit or Indian-language line.' },
  { q: 'How much does it cost?', a: 'Week 1 of your plan is free. Wisdom Pro opens weeks 2 and 3, monthly or yearly, with a free trial.' },
  { q: 'Is it on Android?', a: `Not yet. On Android or a computer, get your verse on wisdomquotes.in and build a 7-day plan on the web for ₹${WEB_PLAN_PRICE_INR} a week.` },
  { q: 'What happens to what I write?', a: 'Your words are sent once to choose your verses and are not stored or logged.' },
]

export default function AppLandingPage() {
  const heroUrl = appStoreUrl('web_app_hero')
  const finalUrl = appStoreUrl('web_app_final')
  return (
    <>
      {appSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <Nav pageName="App Landing" />

      {/* ── HERO ── */}
      <section className="section" style={{ paddingTop: 64, paddingBottom: 40, borderBottom: '1px solid var(--border)' }}>
        <div className="wrap t-center">
          <div className="eyebrow">Wisdom for iPhone</div>
          <h1 className="heading" style={{ maxWidth: 760, margin: '0 auto 18px' }}>
            Bhagavad Gita, tuned to your life.<br /><em>One verse a day.</em>
          </h1>
          <p className="subtext" style={{ maxWidth: 600, margin: '0 auto 32px' }}>
            Krishna answered one man&apos;s problem on a battlefield. Wisdom finds the verse that answers yours, and
            walks seven days with you, read aloud.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <PlatformOnly
              on={['ios', 'desktop']}
              fallback={
                <a href="/start?ref=app_page_android" className="btn-read-gita btn-read-gita-primary" data-mp-location="app_hero_android_create_plan">
                  Create my 7-day Gita plan →
                </a>
              }
            >
              <a href={heroUrl} target="_blank" rel="noopener" className="btn-read-gita btn-read-gita-primary" data-mp-location="app_hero_download">
                Get it on the App Store →
              </a>
            </PlatformOnly>
            <PlatformOnly on={['ios', 'desktop']}>
              <a href="/start?ref=app_page" className="btn-hero-secondary" data-mp-location="app_hero_try_web">
                Try your verse on the web →
              </a>
            </PlatformOnly>
          </div>
          <p className="hero-note" style={{ marginTop: 18, textAlign: 'center' }}>
            iPhone · Week 1 free · Pro opens weeks 2 and 3
          </p>
        </div>
        <div className="app-screens" aria-label="Wisdom app screenshots">
          {SCREENS.map((src, i) => (
            <img key={src} src={src} alt={`Wisdom app screenshot ${i + 1}`} loading={i < 3 ? 'eager' : 'lazy'} width={640} height={1391} />
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section section-alt" id="how-it-works">
        <div className="wrap">
          <div className="t-center">
            <div className="eyebrow">How it works</div>
            <h2 className="heading" style={{ maxWidth: 640, margin: '0 auto 40px' }}>
              From the battlefield <em>to your daily life.</em>
            </h2>
          </div>
          <ol className="app-steps">
            {STEPS.map((s, i) => (
              <li key={s.h}>
                <span className="app-step-n">{i + 1}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section">
        <div className="wrap">
          <div className="app-v3-grid">
            {[
              { img: '/assets/app-v3/store-4.webp', h: 'Audio stories, tuned to you', p: 'Each day is told as a story with the shloka woven in. Gita, Ramayana and Mahabharata.' },
              { img: '/assets/app-v3/store-3.webp', h: 'Shlokas on your screens', p: 'Home Screen and Lock Screen widgets with today’s verse, in every size.' },
              { img: '/assets/app-v3/store-6.webp', h: 'A plan for every problem', p: 'Overthinking, can’t sleep, my boss, my in-laws, far from home, guilt, midlife, money.' },
            ].map((c) => (
              <div key={c.h} className="app-v3-card">
                <img src={c.img} alt={`Wisdom app: ${c.h}`} loading="lazy" width={640} height={1391} />
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="section section-alt">
        <div className="wrap t-center">
          <div className="eyebrow">From the App Store</div>
          <h2 className="heading" style={{ maxWidth: 540, margin: '0 auto 40px' }}>What early readers wrote.</h2>
          <div className="testi-grid">
            {[
              { title: 'Exceptional', name: 'AbhimanyuDasgupta', body: 'This is a gem of a find — I’m not a very religious or spiritual person myself, but the impact of the Shlokas at various points during a stressful day has had a very positive influence... would highly recommend it' },
              { title: 'A Powerful Daily Mindset Companion', name: 'rahuliitb16', body: 'This app feels like a daily companion for mental clarity and inner growth. Highly recommended for anyone looking to bring a bit more peace and perspective into their life.' },
              { title: 'Helps me Stay Calm', name: 'Dibbbuuu', body: 'Beautiful app with meaningful spiritual quotes. It really helps me stay calm and positive every day.' },
            ].map((t) => (
              <div key={t.name} className="testi-card">
                <div className="testi-stars" style={{ marginBottom: 10 }}>★★★★★</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold-light)', marginBottom: '10px' }}>{t.title}</div>
                <blockquote>&ldquo;{t.body}&rdquo;</blockquote>
                <div className="testi-author">
                  <div className="testi-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">App Store review, 2026</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" id="faq">
        <div className="wrap t-center">
          <div className="eyebrow">FAQ</div>
          <h2 className="heading" style={{ maxWidth: 520, margin: '0 auto 14px' }}>About the app.</h2>
          <div className="faq-list" role="list">
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
      <div className="divider" />
      <section className="final-cta">
        <div className="wrap">
          <h2>Arjuna&apos;s battle.<br /><em>Your Monday.</em></h2>
          <p>Your first week is free.</p>
          <a href={finalUrl} target="_blank" rel="noopener" className="btn-read-gita btn-read-gita-primary" data-mp-location="app_final_download">
            Get Wisdom on the App Store →
          </a>
          <p style={{ fontSize: '14px', color: 'var(--text-dim)', marginTop: '24px' }}>
            On Android?{' '}
            <a href="/start?ref=app_page_final" style={{ color: 'var(--gold-light)', fontWeight: 600 }} data-mp-location="app_final_android">
              Get your verse and a 7-day plan on the web →
            </a>
          </p>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <img src="/assets/new-light-logo.webp" alt="Wisdom" loading="lazy" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(200, 136, 30, 0.35)' }} />
            Wisdom
          </div>
          <p className="footer-copy">© 2026 Wisdom · Ankur Shukla</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/gita">Read the Gita</a></li>
              <li><a href="/gita-for">Gita for life</a></li>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/terms">Terms</a></li>
              <li><a href="mailto:work.ankurshukla@gmail.com">Support</a></li>
            </ul>
          </div>
        </div>
      </footer>

      <BlogTracker pageName="App Landing" />
      <HomeAnimations />
    </>
  )
}
