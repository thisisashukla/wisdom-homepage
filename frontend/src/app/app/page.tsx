import type { Metadata } from 'next'
import React from 'react'
import appSchemas from '@/lib/appSchemas'
import BlogTracker from '@/components/BlogTracker'
import HomeAnimations from '@/components/HomeAnimations'
import Nav from '@/components/Nav'
import '../home.css'

const APP_STORE_URL = 'https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125'

export const metadata: Metadata = {
  title: 'Wisdom for iPhone — Daily Bhagavad Gita Practice App',
  description:
    'The Wisdom iOS app: 2 minutes a day of guided Bhagavad Gita practice. Pick your path — Action, Wisdom, or Devotion — and receive a daily teaching with a reflection you keep private. Free on the App Store.',
  keywords:
    'bhagavad gita app, daily shloka app, gita practice iphone, wisdom app, daily verse widget, karma yoga app',
  openGraph: {
    title: 'Wisdom for iPhone — Daily Bhagavad Gita Practice',
    description:
      'A 2-minute daily practice rooted in the Gita. Free on iPhone. Pick your path — Action, Wisdom, Devotion — and grow one teaching at a time.',
    type: 'website',
    url: 'https://wisdomquotes.in/app',
    siteName: 'Wisdom',
    images: [
      {
        url: 'https://wisdomquotes.in/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Wisdom app — daily Bhagavad Gita practice on iPhone',
      },
    ],
  },
  alternates: { canonical: 'https://wisdomquotes.in/app' },
}

export default function AppLandingPage() {
  return (
    <>
      {appSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <Nav showSectionLinks />

      {/* ── HERO ── */}
      <section className="section" style={{ paddingTop: 64, paddingBottom: 40, borderBottom: '1px solid var(--border)' }}>
        <div className="wrap t-center">
          <div className="eyebrow">The iPhone app</div>
          <h1 className="heading" style={{ maxWidth: 720, margin: '0 auto 18px' }}>
            The Gita.<br/><em>As a 2-minute daily practice.</em>
          </h1>
          <p className="subtext" style={{ maxWidth: 560, margin: '0 auto 32px' }}>
            Wisdom for iPhone turns the Gita into a rhythm you can hold. One
            teaching a day, chosen for your path — Action, Wisdom, or Devotion.
            Free.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener"
              className="btn-read-gita btn-read-gita-primary"
              data-mp-location="app_hero_download"
            >
              Download Free on the App Store →
            </a>
            <a href="/" className="btn-hero-secondary" data-mp-location="app_hero_read_online">
              Just want to read it? →
            </a>
          </div>
          <p className="hero-note" style={{ marginTop: 18, textAlign: 'center' }}>
            Free · 3-day trial on premium · ★ 4.9 on the App Store · iPhone only
          </p>

          {/* Three-phone fan */}
          <div className="hero-phones" style={{ marginTop: 56 }}>
            <div className="phones-fan">
              <div className="fan-phone fan-left">
                <div className="iphone-mock">
                  <div className="iphone-screen">
                    <img
                      src="/assets/app-wisdom-practice.webp"
                      alt="Wisdom app — the Clarity Practice screen on the Path of Wisdom"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
              <div className="fan-phone fan-center">
                <div className="iphone-mock">
                  <div className="iphone-screen">
                    <img
                      src="/assets/home-screen-quote1.webp"
                      alt="Wisdom app — daily teaching home screen"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
              <div className="fan-phone fan-right">
                <div className="iphone-mock">
                  <div className="iphone-screen">
                    <img
                      src="/assets/app-path-wisdom.webp"
                      alt="Wisdom app — path progress showing unlocked nodes"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="phones-floor" />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section section-alt" id="how-it-works">
        <div className="wrap t-center">
          <div className="eyebrow">How it works</div>
          <h2 className="heading" style={{ maxWidth: 620, margin: '0 auto 14px' }}>
            Tell us what&apos;s heavy.<br/>Receive your path.<br/>Practice two minutes a day.
          </h2>
          <p className="subtext" style={{ maxWidth: 520, margin: '0 auto 60px' }}>
            Wisdom isn&apos;t a content feed. It&apos;s a guided practice system, built around
            the way ancient teachers actually taught.
          </p>
          <div className="steps">
            <div className="step reveal" style={{ ['--d' as string]: '0ms' } as React.CSSProperties}>
              <div className="step-num">1</div>
              <h3>Breathe. Then tell us what&apos;s weighing on you.</h3>
              <p>
                Wisdom opens with three breaths, then asks what&apos;s been heavy.
                Overthinking? Losing direction? Relationship stress? Your answers
                shape everything that follows.
              </p>
            </div>
            <div className="step reveal" style={{ ['--d' as string]: '100ms' } as React.CSSProperties}>
              <div className="step-num">2</div>
              <h3>Receive your path. Your first teaching follows.</h3>
              <p>
                Based on how you struggle and what you need, Wisdom places you on
                one of three ancient paths. Your first teaching is chosen for where
                you are right now. Not a random quote.
              </p>
            </div>
            <div className="step reveal" style={{ ['--d' as string]: '200ms' } as React.CSSProperties}>
              <div className="step-num">3</div>
              <h3>Two minutes. One quote. One practice.</h3>
              <p>
                A quote arrives. Read what it means today. Then your path&apos;s practice
                asks you to respond. One honest line, written privately. That&apos;s the loop.
              </p>
            </div>
          </div>

          <div className="milestone-strip">
            <div className="milestone">
              <div className="milestone-dot">1</div>
              <h4>Day 1</h4>
              <p>Your first node unlocked. The path begins.</p>
            </div>
            <div className="milestone">
              <div className="milestone-dot">3</div>
              <h4>Day 3</h4>
              <p>Your path deepens. The next node opens.</p>
            </div>
            <div className="milestone">
              <div className="milestone-dot">7</div>
              <h4>Day 7</h4>
              <p>First reflection cycle. Your pattern becomes visible.</p>
            </div>
            <div className="milestone">
              <div className="milestone-dot">21</div>
              <h4>Day 21</h4>
              <p>Your rhythm is real. Wisdom grows when you return.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE 1: Daily Teaching ── */}
      <section className="section" id="daily-teaching">
        <div className="wrap">
          <div className="split">
            <div className="split-text">
              <span className="pill">Daily Teaching</span>
              <h2>One quote. What it means today.<br/>Two minutes.</h2>
              <p>
                Every day, Wisdom delivers one teaching chosen for your current path
                and node. Not a random pull. The quote arrives with what it means
                for your actual life right now, and a clear invitation to practice.
              </p>
              <ul className="check-list">
                <li>
                  <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  Teaching chosen for your path and node
                </li>
                <li>
                  <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  Sanskrit quote with clear modern meaning
                </li>
                <li>
                  <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  &ldquo;What this means today&rdquo; — how it applies to your life right now
                </li>
                <li>
                  <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  Home screen widget so the verse stays with you
                </li>
              </ul>
            </div>
            <div className="split-phone">
              <div className="phone-frame">
                <img
                  src="/assets/home-screen-quote1.webp"
                  alt="Wisdom app daily teaching home screen"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE 2: Three Practices (one per path) ── */}
      <section className="section section-alt">
        <div className="wrap t-center">
          <div className="eyebrow">A practice for every path</div>
          <h2 className="heading" style={{ maxWidth: 680, margin: '0 auto 14px' }}>
            Every quote opens into a practice<br/><em>tuned to the path you walk.</em>
          </h2>
          <p className="subtext" style={{ maxWidth: 580, margin: '0 auto' }}>
            The seeker is asked to clarify. The doer is asked to commit. The
            devoted is asked to offer. Same quote, three different invitations,
            so the teaching actually lands the way <em>you</em> need it to.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '32px',
              marginTop: '60px',
              maxWidth: '1040px',
              marginLeft: 'auto',
              marginRight: 'auto',
              alignItems: 'start',
            }}
          >
            {[
              {
                eyebrow: 'Wisdom · The Clarity Practice',
                q: '“What did it help you see more clearly?”',
                img: '/assets/app-wisdom-practice.webp',
                alt: "Clarity Practice — Jnana path reflection prompt",
                body: 'The quote clarified something. Name it. One honest line, and the insight lands. Just for you.',
              },
              {
                eyebrow: 'Action · The Living Practice',
                q: '“What will you do differently?”',
                img: '/assets/app-action-practice.webp',
                alt: 'Living Practice — Karma path commitment prompt',
                body: "The quote is asking to be lived. Pick one thing you'll do differently today. Commit to it in writing. Privately.",
              },
              {
                eyebrow: 'Devotion · The Offering Practice',
                q: '“Who or what came to mind?”',
                img: '/assets/app-devotion-practice.webp',
                alt: 'Offering Practice — Bhakti path heart-response prompt',
                body: 'The quote is asking your heart to answer. Name who came to mind. Offer one small thing: a word, a thought, an act.',
              },
            ].map((p) => (
              <div key={p.eyebrow} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: '10px' }}>
                  {p.eyebrow}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(15px, 1.45vw, 17px)', fontWeight: 700, color: 'var(--gold-light)', lineHeight: 1.3, marginBottom: '18px' }}>
                  {p.q}
                </h3>
                <div className="phone-frame" style={{ maxWidth: '240px' }}>
                  <img src={p.img} alt={p.alt} loading="lazy" />
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.65, marginTop: '22px', maxWidth: '280px' }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE 3: Path Progress ── */}
      <section className="section">
        <div className="wrap">
          <div className="split flip">
            <div className="split-text">
              <span className="pill">Your Path Progress</span>
              <h2>Each practice moves you<br/>through your path.</h2>
              <p>
                Wisdom isn&apos;t a daily-quote app. It&apos;s a progression. Every practice
                advances you through nodes on your path. Connection → Devotion → Mastery,
                day by day. The sages built this as a journey. So did we.
              </p>
              <ul className="check-list">
                <li>
                  <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  Nodes unlock as you practice
                </li>
                <li>
                  <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  Switch between all three paths as you deepen
                </li>
                <li>
                  <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  Day streak, bookmarks, and reflections all yours
                </li>
              </ul>
            </div>
            <div className="split-phone">
              <div className="phone-frame">
                <img src="/assets/app-path-wisdom.webp" alt="Wisdom app path progress showing unlocked nodes" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE 4: The Sacred Verse (in the app) ── */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="split">
            <div className="split-text">
              <span className="pill">The Scripture</span>
              <h2>Every quote traces back to<br/>a Sanskrit verse.</h2>
              <p>
                Wisdom draws every quote from the Bhagavad Gita, the Upanishads,
                the Ashtavakra Gita and other Hindu scriptures. When a quote
                resonates, you go deeper into the actual Sanskrit and its detailed
                meaning to widen your practice.
              </p>
              <ul className="check-list">
                <li>
                  <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  Sanskrit Devanagari with transliteration
                </li>
                <li>
                  <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  Meaning drawn from traditional commentary
                </li>
                <li>
                  <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  Chapter and verse reference. Every teaching is traceable.
                </li>
                <li>
                  <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  Bookmark and share the verses that speak to you
                </li>
              </ul>
              <p style={{ marginTop: 18, fontSize: 13.5, color: 'var(--text-dim)' }}>
                Prefer to read at your desk instead? <a href="/" style={{ color: 'var(--gold-light)' }}>Read the full Gita free on the web →</a>
              </p>
            </div>
            <div className="split-phone">
              <div className="phone-frame">
                <img src="/assets/sanskrit-word-by-word.webp" alt="Wisdom app verse screen — Sanskrit Devanagari with word-by-word transliteration" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="wrap t-center">
          <div className="eyebrow">App Store Reviews</div>
          <h2 className="heading" style={{ maxWidth: 540, margin: '0 auto 10px' }}>
            From those already on the path.
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '52px' }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: 700, color: 'var(--gold-light)', lineHeight: 1 }}>4.9</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: 'var(--gold)', fontSize: '16px', letterSpacing: '2px' }}>★★★★★</div>
              <div style={{ fontSize: '12px', color: 'var(--text-dimmer)', marginTop: '2px' }}>App Store reviews</div>
            </div>
          </div>
          <div className="testi-grid">
            {[
              { title: 'Exceptional', date: '2 Apr', name: 'AbhimanyuDasgupta', body: 'This is a gem of a find — I’m not a very religious or spiritual person myself, but the impact of the Shlokas at various points during a stressful day has had a very positive influence... would highly recommend it' },
              { title: 'A Powerful Daily Mindset Companion', date: '4 Apr', name: 'rahuliitb16', body: 'This app feels like a daily companion for mental clarity and inner growth. Highly recommended for anyone looking to bring a bit more peace and perspective into their life.' },
              { title: 'Helps me Stay Calm', date: '5 Apr', name: 'Dibbbuuu', body: 'Beautiful app with meaningful spiritual quotes. It really helps me stay calm and positive every day.' },
            ].map((t, i) => (
              <div key={t.name} className="testi-card reveal" style={{ ['--d' as string]: `${i * 100}ms` } as React.CSSProperties}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div className="testi-stars">★★★★★</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dimmer)' }}>{t.date}</div>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gold-light)', marginBottom: '10px' }}>{t.title}</div>
                <blockquote>&ldquo;{t.body}&rdquo;</blockquote>
                <div className="testi-author">
                  <div className="testi-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">App Store · India</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '32px', fontSize: '13px', color: 'var(--text-dimmer)' }}>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-light)' }} data-mp-location="app_reviews_link">
              See all reviews on the App Store →
            </a>
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section section-alt" id="faq">
        <div className="wrap t-center">
          <div className="eyebrow">FAQ</div>
          <h2 className="heading" style={{ maxWidth: 520, margin: '0 auto 14px' }}>
            About the app.
          </h2>
          <div className="faq-list" role="list">
            {[
              {
                q: 'Is Wisdom free?',
                a: 'The Wisdom app is free to download. The free version includes today’s teaching and your first practice. A premium subscription (3-day trial, then monthly or yearly) unlocks the full daily-practice system: your path, all nodes, the reflection journal, and access to all three paths as you grow.',
              },
              {
                q: 'What platforms is the app on?',
                a: 'iPhone only, for now. The full Bhagavad Gita is available free on the web at wisdomquotes.in — no download required — if you’re on Android or desktop.',
              },
              {
                q: 'How does the app choose my path?',
                a: 'When you first open Wisdom, it asks a few honest questions: what’s been weighing on you, how you respond when life gets heavy, and what you want to move toward. Based on your answers, Wisdom places you on the path — Action, Wisdom, or Devotion — that fits how you actually think and feel. You can switch paths as your practice deepens.',
              },
              {
                q: 'How long does a daily practice take?',
                a: 'Two minutes. One teaching arrives, you read what it means today, and write one honest reflection in the offering practice. That’s the complete loop. You can go deeper into the full Sanskrit verse and commentary when it resonates.',
              },
              {
                q: 'Do I need to know anything about the Gita?',
                a: 'No. Wisdom is built for complete beginners. Every teaching comes with a clear, plain-English explanation of what the verse means and how it applies to your life right now. The Sanskrit is there if you want it, but never required.',
              },
              {
                q: 'What if I just want to read the Gita?',
                a: 'Read it free online — no download required — at wisdomquotes.in. Every chapter and every verse in Sanskrit, Hindi and English with commentary. The app is a daily-practice layer on top of that.',
              },
            ].map((f) => (
              <div key={f.q} className="faq-item" role="listitem">
                <button className="faq-q" aria-expanded="false">
                  {f.q}
                  <svg className="faq-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
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
          <h2>The path was already drawn.<br/><em>You just have to walk it.</em></h2>
          <p>Free to download. Two minutes a day. One teaching, one path, one step at a time.</p>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener"
            className="btn-read-gita btn-read-gita-primary"
            style={{ display: 'inline-flex' }}
            data-mp-location="app_bottom_cta"
          >
            Download Free on the App Store →
          </a>
          <p style={{ fontSize: '13px', color: 'var(--text-dimmer)', marginTop: '16px' }}>
            Free · 3-day trial on premium · Available on iPhone
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-dim)', marginTop: '28px' }}>
            Not ready to download?{' '}
            <a href="/" style={{ color: 'var(--gold-light)', fontWeight: 600 }} data-mp-location="app_final_read_online">
              Read the full Gita free on the web →
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <img
              src="/assets/new-light-logo.webp"
              alt="Wisdom"
              loading="lazy"
              style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(200, 136, 30, 0.35)' }}
            />
            Wisdom
          </div>
          <p className="footer-copy">© 2026 Wisdom · Ankur Shukla</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <ul className="footer-links">
              <li><a href="/">Read the Gita</a></li>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/terms">Terms</a></li>
              <li><a href="/methodology">Methodology</a></li>
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
