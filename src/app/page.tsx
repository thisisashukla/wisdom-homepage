import type { Metadata } from 'next'
import React from 'react'
import schemas from '@/lib/homeSchemas'
import BlogTracker from '@/components/BlogTracker'
import HomeAnimations from '@/components/HomeAnimations'
import Nav from '@/components/Nav'
import { getAllChapters, getAllVerseRefs, getVerse, getVerseAudio } from '@/lib/gita'
import VerseAudioPlayer from '@/components/gita/VerseAudioPlayer'
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
  title: 'Bhagavad Gita — Read All 700 Verses Online in Sanskrit, Hindi & English | Wisdom',
  description:
    'Read the complete Bhagavad Gita online — all 18 chapters, 700 verses in Sanskrit, Hindi and English. Free. No login. One verse per page with simple meaning and detailed commentary.',
  keywords:
    'bhagavad gita, bhagavad gita online, bhagavad gita hindi, bhagavad gita english, gita verses, bhagavad gita 2.47, bhagavad gita free',
  openGraph: {
    title: 'Bhagavad Gita — Read All 700 Verses Free Online | Wisdom',
    description:
      'The complete Bhagavad Gita — 18 chapters, 700 verses in Sanskrit, Hindi and English. Free to read, no login, no download required.',
    type: 'website',
    url: 'https://wisdomquotes.in',
    siteName: 'Wisdom',
    images: [
      {
        url: 'https://wisdomquotes.in/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Wisdom — Read the Bhagavad Gita free online',
      },
    ],
  },
  alternates: { canonical: 'https://wisdomquotes.in' },
}

// Curated highlights for on-page navigation. Chosen from Mixpanel top-viewed
// verses + canonical iconic verses so the homepage does double duty as an
// SEO landing and a real starting-point for readers.
const ICONIC_VERSES = [
  { ref: '2.47', chapter: 2, verse: 47, label: 'Karma Yoga', gloss: 'You have a right to action, never to its fruits.' },
  { ref: '4.7', chapter: 4, verse: 7, label: 'Dharma', gloss: 'Whenever dharma declines, I manifest myself.' },
  { ref: '4.11', chapter: 4, verse: 11, label: 'Three paths', gloss: 'However men approach me, so do I welcome them.' },
  { ref: '11.12', chapter: 11, verse: 12, label: 'Vishwarupa', gloss: "As the light of a thousand suns rising at once…" },
  { ref: '6.35', chapter: 6, verse: 35, label: 'The Mind', gloss: 'The mind is restless, but it can be tamed by practice.' },
  { ref: '18.66', chapter: 18, verse: 66, label: 'Surrender', gloss: 'Abandon all duties and come to me alone for refuge.' },
]

const THEMES = [
  { slug: 'karma', label: 'Karma', gloss: 'Action, duty, and their fruits' },
  { slug: 'dharma', label: 'Dharma', gloss: 'The path that is yours' },
  { slug: 'bhakti', label: 'Bhakti', gloss: 'Devotion, love, surrender' },
  { slug: 'vairagya', label: 'Vairagya', gloss: 'Non-attachment, letting go' },
  { slug: 'manas', label: 'Manas', gloss: 'The mind and its restlessness' },
  { slug: 'buddhi', label: 'Buddhi', gloss: 'Discernment and clarity' },
  { slug: 'brahman', label: 'Brahman', gloss: 'The absolute, the ground' },
  { slug: 'sharanagati', label: 'Sharanagati', gloss: 'Refuge and surrender' },
]

const BLOGS = [
  {
    slug: 'krishna-three-paths-bhagavad-gita',
    title: 'Krishna knew everyone seeks him differently, so he opened three doors',
    dek: "Why the Gita's three paths — Karma, Jnana, Bhakti — are one teaching read through three temperaments.",
  },
  {
    slug: 'bhagavad-gita-2-47-karmanye-vadhikaraste',
    title: 'BG 2.47 — Karmanye vadhikaraste',
    dek: 'The most quoted verse in the Gita, unpacked line by line.',
  },
  {
    slug: 'bhagavad-gita-on-anxiety',
    title: 'The Bhagavad Gita on anxiety',
    dek: 'What a 5,000-year-old text sees clearly about the restless modern mind.',
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

      {/* ── NAV + HERO (immersive Krishna backdrop) ── */}
      <div className="hero-shell">
        <Nav showSectionLinks overlayHero />

        <section className="hero hero-immersive">
          <img
            src="/assets/chapter11.webp"
            alt="Krishna revealing his universal form to Arjuna on the battlefield of Kurukshetra"
            fetchPriority="high"
            className="hero-bg"
            aria-hidden="true"
          />
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />

          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-eyebrow">Anxious. Overthinking. Restless. Lost.</div>
              <h1>
                Your mind won&apos;t stop.<br/><em>The Gita knows why.</em>
              </h1>
              <p className="hero-sub">
                For 5,000 years, three paths have quieted minds like yours —
                Action, Wisdom, Devotion. Read every verse of the Bhagavad Gita
                here, free, in Sanskrit, Hindi and English.
              </p>
              <div className="hero-actions">
                <a href="/gita/chapter/1" className="btn-read-gita btn-read-gita-primary" data-mp-location="hero_read_gita_cta">
                  Start Reading the Gita →
                </a>
                <a href="/gita/today" className="btn-hero-secondary" data-mp-location="hero_today_verse_link">
                  Today&apos;s verse →
                </a>
              </div>
              <p className="hero-note">
                Free · No login · 700 verses · Sanskrit, Hindi &amp; English
              </p>
              <div className="hero-secondary-nav">
                <a href="/hi/gita" hrefLang="hi" data-mp-location="hero_hindi_link">हिंदी में पढ़ें</a>
                <span className="hero-sep">·</span>
                <a href="/gita/chapter/2/verse/47" data-mp-location="hero_verse_247">BG 2.47 — Karma Yoga</a>
                <span className="hero-sep">·</span>
                <a href="/gita/chapter/11/verse/12" data-mp-location="hero_verse_1112">Vishwarupa 11.12</a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── PROOF BAR (reworked for the reader) ── */}
      <div className="proof-bar">
        <div className="proof-inner">
          <div className="proof-item"><strong>18 chapters</strong> · 700 verses</div>
          <div className="proof-item"><strong>Sanskrit</strong> · Hindi · English</div>
          <div className="proof-item"><strong>One verse per page</strong> with commentary</div>
          <div className="proof-item"><strong>Free</strong> · No login · No paywall</div>
        </div>
      </div>

      {/* ── TWO ENTRY POINTS + INTERACTIVE TODAY'S VERSE ── */}
      <section className="entry-section">
        <div className="wrap">
          <div className="entry-grid entry-grid-2">
            <a href="/gita/chapter/1" className="entry-card" data-mp-location="home_entry_read_gita">
              <div className="entry-card-icon">📖</div>
              <div className="entry-card-body">
                <h3>Read the Gita</h3>
                <p>All 18 chapters, 700 verses. Start where Arjuna started — with a mind full of doubt.</p>
              </div>
              <div className="entry-card-cta">Begin with Chapter 1 →</div>
            </a>
            <a href="/hi/gita" className="entry-card" hrefLang="hi" data-mp-location="home_entry_hindi_gita">
              <div className="entry-card-icon">🕉️</div>
              <div className="entry-card-body">
                <h3>हिंदी में पढ़ें</h3>
                <p>सम्पूर्ण भगवद्गीता — संस्कृत, हिंदी अनुवाद और विस्तृत अर्थ सहित। निःशुल्क।</p>
              </div>
              <div className="entry-card-cta">हिंदी गीता खोलें →</div>
            </a>
          </div>

          {/* Interactive Today's Verse — sits where the old BG 2.47 strip used to. */}
          {todayVerse && todayRef && (
            <div className="today-verse-card">
              <div className="today-verse-head">
                <div className="today-verse-eyebrow">
                  <span className="today-verse-dot" aria-hidden="true" />
                  Today&apos;s Verse
                </div>
                <div className="today-verse-ref">Bhagavad Gita {todayRef.chapter}.{todayRef.verse}</div>
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
                todayVerse.sanskrit && (
                  <p className="today-verse-sanskrit">{todayVerse.sanskrit}</p>
                )
              )}

              <blockquote className="today-verse-meaning">
                &ldquo;{todayVerse.simpleMeaning || todayVerse.englishTranslation}&rdquo;
              </blockquote>

              {todayVerse.simpleInsight && (
                <p className="today-verse-insight">{todayVerse.simpleInsight}</p>
              )}

              <div className="today-verse-footer">
                <div className="today-verse-hint">
                  <span aria-hidden="true">▶</span> Press play — follow the Sanskrit word by word.
                </div>
                <a
                  href={`/gita/chapter/${todayRef.chapter}/verse/${todayRef.verse}`}
                  className="today-verse-deeper"
                  data-mp-location="home_today_verse_go_deeper"
                >
                  Go deeper into this verse →
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── THE FULL SCRIPTURE ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .read-gita-grid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 56px; align-items: stretch; }
        .read-gita-art-col { display: flex; flex-direction: column; gap: 14px; height: 100%; }
        .read-gita-art-col > div:first-child { flex: 1 1 auto; min-height: 380px; }
        @media (max-width: 820px) {
          .read-gita-grid { grid-template-columns: 1fr; gap: 36px; align-items: start; }
          .read-gita-art-col > div:first-child { min-height: unset; aspect-ratio: 1 / 1; }
        }
      ` }} />
      <section className="section" id="read-gita" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="wrap read-gita-grid">
          <div>
            <div className="eyebrow">The full scripture, online</div>
            <h2 className="heading" style={{ marginBottom: '18px' }}>
              The Bhagavad Gita.<br/><em>Read every verse, free.</em>
            </h2>
            <p className="subtext" style={{ marginBottom: '26px' }}>
              Wisdom puts the entire Bhagavad Gita on this site: all 18 chapters,
              all 700 verses, in Sanskrit, Hindi and English. Each verse on its
              own page, with a one-line essence, the speaker named, and
              cross-links by theme. No login. No paywall. Just the scripture.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px', display: 'grid', gap: '12px' }}>
              {[
                ['18 chapters', 'Sankhya Yoga, Karma Yoga, Bhakti Yoga, Moksha Sanyasa Yoga, and all the rest.'],
                ['One page per verse', 'Sanskrit Devanagari, Hindi anuvad, English translation.'],
                ['Browse by theme', 'karma, dharma, bhakti, vairagya, the steady mind — the Gita organized around the questions you bring.'],
                ['Hindi mirror', 'every verse in Hindi-first layout at /hi/gita.'],
              ].map(([t, b]) => (
                <li key={t} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold-light)', flexShrink: 0 }}>◆</span>
                  <span style={{ color: 'var(--text-dim)', fontSize: '15.5px', lineHeight: 1.65 }}>
                    <strong style={{ color: 'var(--text)' }}>{t}</strong>: {b}
                  </span>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a href="/gita" className="btn-nav" data-mp-location="home_gita_section_cta">Open the Gita →</a>
              <a href="/gita/chapter/2/verse/47" className="btn-ghost" data-mp-location="home_gita_section_247">
                Start with 2.47 — Karma Yoga
              </a>
            </div>
          </div>
          <div className="read-gita-art-col">
            <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-warm)' }}>
              <img src="/assets/gita.webp" alt="Krishna speaking the Bhagavad Gita to Arjuna" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(18, 5, 5, 0.7))', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '22px', right: '22px', fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '15.5px', color: 'var(--gold-light, #f5c96a)', lineHeight: 1.5 }}>
                &ldquo;Whenever dharma declines, I manifest myself.&rdquo;<br/>
                <span style={{ fontSize: '12.5px', fontStyle: 'normal', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.75 }}>Bhagavad Gita 4.7</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '14px' }}>
              {[
                { n: 1, label: "Arjuna's Despair" },
                { n: 2, label: 'Sankhya Yoga' },
                { n: 4, label: 'Jnana Yoga' },
                { n: 6, label: 'Dhyana Yoga' },
                { n: 12, label: 'Bhakti Yoga' },
                { n: 18, label: 'Moksha Yoga' },
              ].map(({ n, label }) => (
                <a key={n} href={`/gita/chapter/${n}`} style={{ display: 'block', padding: '12px 14px', background: 'var(--bg-card, rgba(255,255,255,0.04))', border: '1px solid var(--border)', borderRadius: '8px', textDecoration: 'none', fontSize: '12.5px', color: 'var(--text-dim)' }}>
                  <div style={{ color: 'var(--gold-light)', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', marginBottom: '2px' }}>Ch. {n}</div>
                  {label}
                </a>
              ))}
            </div>
            <div style={{ marginTop: '18px', padding: '14px 18px', background: 'var(--bg-card, rgba(255,255,255,0.04))', border: '1px solid var(--border)', borderRadius: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px 20px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dimmer)', flexShrink: 0 }}>Most searched</span>
              {ICONIC_VERSES.slice(0, 4).map((v) => (
                <a key={v.ref} href={`/gita/chapter/${v.chapter}/verse/${v.verse}`} style={{ fontSize: '13px', color: 'var(--gold-light)', textDecoration: 'none', opacity: 0.85 }}>
                  BG {v.ref} — {v.label} →
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE EVERY VERSE PAGE ── */}
      <section className="section">
        <div className="wrap t-center">
          <div className="eyebrow">What every verse page has</div>
          <h2 className="heading" style={{ maxWidth: 720, margin: '0 auto 14px' }}>
            The scripture, in the form you actually need it.
          </h2>
          <p className="subtext" style={{ maxWidth: 560, margin: '0 auto 48px' }}>
            Every one of the 700 verses gets its own page — six things you can rely on being there.
          </p>
          <div className="problem-grid">
            {[
              { icon: '🕉️', h: 'Sanskrit Devanagari', p: 'The original verse, cleanly typeset in Devanagari with proper spacing for reading and study.' },
              { icon: 'हि', h: 'Hindi anuvad', p: 'A faithful Hindi translation for readers who prefer the mother tongue of most Gita commentaries.' },
              { icon: 'A', h: 'English translation', p: 'A clear, modern English rendering — Wisdom editorial, human-reviewed against traditional commentary.' },
              { icon: '✎', h: 'Simple meaning + insight', p: 'One sentence that says what the verse actually means. One line you can carry into your day.' },
              { icon: '📚', h: 'Detailed commentary', p: 'Who is speaking, to whom, why, and what is at stake — with the Sanskrit terms unpacked.' },
              { icon: '🧭', h: 'Cross-links by theme', p: 'Every verse links out by karma, dharma, bhakti, vairagya, so you can follow the thread instead of just the page number.' },
            ].map((c) => (
              <div key={c.h} className="prob-card">
                <div className="prob-icon">{c.icon}</div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL 18 CHAPTERS ── */}
      <section className="section section-alt" id="chapters">
        <div className="wrap">
          <div className="t-center">
            <div className="eyebrow">All 18 chapters</div>
            <h2 className="heading" style={{ maxWidth: 640, margin: '0 auto 14px' }}>
              Every chapter of the Gita — start anywhere.
            </h2>
            <p className="subtext" style={{ maxWidth: 560, margin: '0 auto 48px' }}>
              From Arjuna&apos;s despair (Ch. 1) to Krishna&apos;s final surrender teaching (Ch. 18) — every verse in Sanskrit, Hindi and English.
            </p>
          </div>
          <div className="chapters-grid">
            {chapters.map((ch) => (
              <a
                key={ch.number}
                href={`/gita/chapter/${ch.number}`}
                data-mp-location={`home_chapter_grid_${ch.number}`}
                className="chapter-tile"
              >
                <div className="chapter-tile-num">Chapter {ch.number} · {ch.totalVerses} verses</div>
                <div className="chapter-tile-name">{ch.enName}</div>
                <div className="chapter-tile-title">{ch.enTitle}</div>
              </a>
            ))}
          </div>
          <div className="t-center" style={{ marginTop: '30px' }}>
            <a href="/gita" className="btn-ghost" data-mp-location="home_chapters_all">See the full chapter index →</a>
          </div>
        </div>
      </section>

      {/* ── ICONIC VERSES ── */}
      <section className="section">
        <div className="wrap">
          <div className="t-center">
            <div className="eyebrow">Iconic verses</div>
            <h2 className="heading" style={{ maxWidth: 640, margin: '0 auto 14px' }}>
              The verses everyone comes for.
            </h2>
            <p className="subtext" style={{ maxWidth: 560, margin: '0 auto 40px' }}>
              These are the ones people search first. Start with any of them — every page has the Sanskrit, meaning, and commentary in one place.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              maxWidth: '1080px',
              margin: '0 auto',
            }}
          >
            {ICONIC_VERSES.map((v) => (
              <a
                key={v.ref}
                href={`/gita/chapter/${v.chapter}/verse/${v.verse}`}
                data-mp-location={`home_iconic_${v.ref.replace('.', '_')}`}
                style={{
                  display: 'block',
                  padding: '22px 22px',
                  background: 'var(--bg-card, rgba(255,255,255,0.04))',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  color: 'var(--text)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px', gap: '10px' }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 700, color: 'var(--gold-light)' }}>BG {v.ref}</div>
                  <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-dimmer)' }}>{v.label}</div>
                </div>
                <blockquote style={{ borderLeft: '2px solid rgba(245, 201, 106, 0.4)', paddingLeft: '12px', margin: 0, fontStyle: 'italic', fontSize: '14.5px', color: 'var(--text-dim)', lineHeight: 1.55 }}>
                  {v.gloss}
                </blockquote>
                <div style={{ marginTop: '14px', fontSize: '12.5px', color: 'var(--gold-light)' }}>Read this verse →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM (kept — the emotional hook) ── */}
      <section className="section section-alt">
        <div className="wrap t-center">
          <div className="eyebrow">Why come back to the Gita</div>
          <h2 className="heading" style={{ maxWidth: 620, margin: '0 auto 14px' }}>
            The mind hasn&apos;t changed.<br/>Only the world got louder.
          </h2>
          <p className="subtext" style={{ maxWidth: 560, margin: '0 auto' }}>
            Anxiety, overthinking, disconnection, loss of direction. Ancient cultures gave these
            names, mapped their roots, and built practices to move through them. We lost the map.
            The Gita is that map — and it is on this site, verse by verse.
          </p>
          <div className="problem-grid">
            {[
              { icon: '🌀', h: 'Overthinking that never resolves', p: 'You think in circles. The Gita has a name for the mind that will not settle — and a practice to still it.' },
              { icon: '📱', h: 'Distraction instead of depth', p: 'Scrolling offers relief and leaves you emptier. The Gita points at what actually fills you.' },
              { icon: '🧩', h: 'Disconnected from what is real', p: 'Roles, expectations, five directions at once. Krishna gives Arjuna one question that cuts through all of it.' },
              { icon: '🧭', h: 'No map for the inner life', p: 'Modern tools track your sleep and your steps. The Gita is 700 verses of the terrain inside you.' },
            ].map((c) => (
              <div key={c.h} className="prob-card">
                <div className="prob-icon">{c.icon}</div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── READ BY THEME ── */}
      <section className="section" id="themes">
        <div className="wrap">
          <div className="t-center">
            <div className="eyebrow">Read by theme</div>
            <h2 className="heading" style={{ maxWidth: 620, margin: '0 auto 14px' }}>
              The Gita, organized around the questions you bring.
            </h2>
            <p className="subtext" style={{ maxWidth: 560, margin: '0 auto 40px' }}>
              Every verse is tagged by concept. Pick a theme and read only the verses that touch it — across all 18 chapters.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
              maxWidth: '1080px',
              margin: '0 auto',
            }}
          >
            {THEMES.map((t) => (
              <a
                key={t.slug}
                href={`/gita/topic/${t.slug}`}
                data-mp-location={`home_theme_${t.slug}`}
                style={{
                  display: 'block',
                  padding: '18px 20px',
                  background: 'var(--bg-card, rgba(255,255,255,0.04))',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '19px', fontWeight: 700, color: 'var(--gold-light)', marginBottom: '4px' }}>
                  {t.label}
                </div>
                <div style={{ fontSize: '13.5px', color: 'var(--text-dim)', lineHeight: 1.45 }}>{t.gloss}</div>
              </a>
            ))}
          </div>
          <div className="t-center" style={{ marginTop: '30px' }}>
            <a href="/gita#topics" className="btn-ghost" data-mp-location="home_themes_all">Browse all themes →</a>
          </div>
        </div>
      </section>

      {/* ── HINDI MIRROR CALLOUT ── */}
      <section className="section section-alt">
        <div className="wrap">
          <div
            style={{
              maxWidth: '860px',
              margin: '0 auto',
              padding: '38px 40px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(245, 201, 106, 0.08) 0%, rgba(200, 136, 30, 0.04) 100%)',
              border: '1px solid rgba(245, 201, 106, 0.28)',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '24px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: '8px' }}>
                हिंदी में
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(22px, 2.4vw, 30px)', color: 'var(--gold-light)', lineHeight: 1.2, marginBottom: '10px' }}>
                सम्पूर्ण भगवद्गीता — हिंदी में, निःशुल्क।
              </h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                Every verse also lives on a Hindi-first mirror — same 18 chapters, same 700 verses,
                laid out with Hindi anuvad and vistrit arth in front.
              </p>
            </div>
            <a href="/hi/gita" hrefLang="hi" className="btn-nav" data-mp-location="home_hindi_callout">
              हिंदी गीता खोलें →
            </a>
          </div>
        </div>
      </section>

      {/* ── FROM THE BLOG ── */}
      <section className="section" id="blog">
        <div className="wrap">
          <div className="t-center">
            <div className="eyebrow">From the blog</div>
            <h2 className="heading" style={{ maxWidth: 620, margin: '0 auto 14px' }}>
              Long-form on the Gita.
            </h2>
            <p className="subtext" style={{ maxWidth: 560, margin: '0 auto 40px' }}>
              Deeper essays on specific verses, chapters, and the questions readers bring back to the Gita over and over.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              maxWidth: '1080px',
              margin: '0 auto',
            }}
          >
            {BLOGS.map((b) => (
              <a
                key={b.slug}
                href={`/blogs/${b.slug}`}
                data-mp-location={`home_blog_${b.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '24px',
                  background: 'var(--bg-card, rgba(255,255,255,0.04))',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  textDecoration: 'none',
                }}
              >
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.35, marginBottom: '10px' }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.55, marginBottom: '16px', flex: 1 }}>{b.dek}</p>
                <div style={{ fontSize: '12.5px', color: 'var(--gold-light)', marginTop: 'auto' }}>Read essay →</div>
              </a>
            ))}
          </div>
          <div className="t-center" style={{ marginTop: '30px' }}>
            <a href="/blogs" className="btn-ghost" data-mp-location="home_blogs_all">All essays →</a>
          </div>
        </div>
      </section>

      {/* ── ABOUT (reader-focused) ── */}
      <section className="section section-alt">
        <div className="wrap t-center">
          <div className="eyebrow">About Wisdom</div>
          <h2 className="heading" style={{ maxWidth: 580, margin: '0 auto 14px' }}>
            The Gita, made properly readable.
          </h2>
          <p className="subtext" style={{ maxWidth: 560, margin: '0 auto' }}>
            The internet had the Bhagavad Gita in many places, but nowhere clean, complete, and easy to actually read.
            Wisdom is the fix.
          </p>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-card-icon">📖</div>
              <h3>Complete</h3>
              <p>All 18 chapters. All 700 verses. Sanskrit Devanagari, Hindi anuvad, English translation, and detailed commentary — on every single verse.</p>
            </div>
            <div className="about-card">
              <div className="about-card-icon">🕯️</div>
              <h3>Free &amp; ad-free</h3>
              <p>No login. No paywall. No ads. Nothing between you and the scripture. If you want a daily-practice layer on your phone, there is an <a href="/app" style={{ color: 'var(--gold-light)' }}>iOS app</a> — optional.</p>
            </div>
            <div className="about-card">
              <div className="about-card-icon">🔎</div>
              <h3>Sourced and transparent</h3>
              <p>Sanskrit and Hindi from traditional sources. English translations Wisdom-editorial. Commentary AI-drafted from Shankara, Ramanuja and modern acharyas — human-reviewed. <a href="/methodology" style={{ color: 'var(--gold-light)' }}>Methodology →</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" id="faq">
        <div className="wrap t-center">
          <div className="eyebrow">FAQ</div>
          <h2 className="heading" style={{ maxWidth: 520, margin: '0 auto 14px' }}>
            About reading the Gita here.
          </h2>
          <div className="faq-list" role="list">
            {[
              { q: 'Is it really free?', a: 'Yes. The full Bhagavad Gita — all 18 chapters, 700 verses, in Sanskrit, Hindi and English with commentary — is free to read on this site. No sign-up. No paywall. No ads.' },
              { q: 'Do I need to log in?', a: 'No. Just visit any chapter or verse URL and start reading. Nothing is gated behind an account.' },
              { q: 'Is the Gita available in Hindi?', a: 'Yes. Every verse also lives on a Hindi-first mirror at /hi/gita — same 700 verses, Hindi anuvad and vistrit arth laid out in front of the English.' },
              { q: 'How are the translations sourced?', a: 'Sanskrit and Hindi are drawn from traditional sources. English translations are Wisdom-editorial. Commentary is AI-drafted from Shankara, Ramanuja and modern acharyas, and human-reviewed. See the Methodology page for the full detail.' },
              { q: 'Which verse should I read first?', a: 'Most readers start with BG 2.47 — Karmanye vadhikaraste — the most quoted verse in the Gita, on doing your duty without attachment to results. If you want the full arc, Chapter 1 sets the scene and Chapter 2 is where Krishna begins teaching.' },
              { q: 'Do you have an app?', a: 'The Gita itself is free on this website — that is the main product. There is an optional iPhone app that turns the Gita into a 2-minute daily practice. See /app.' },
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

      {/* ── FINAL CTA — start reading ── */}
      <div className="divider" />
      <section className="final-cta">
        <div className="wrap">
          <h2>The scripture is right here.<br/><em>Open it and begin.</em></h2>
          <p>All 18 chapters. 700 verses. Sanskrit, Hindi, English. Free.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/gita/chapter/1" className="btn-read-gita btn-read-gita-primary" data-mp-location="final_cta_read_gita">
              Start Reading the Gita →
            </a>
            <a href="/gita/today" className="btn-hero-secondary" data-mp-location="final_cta_today">
              Today&apos;s verse →
            </a>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-dimmer)', marginTop: '20px' }}>
            No login · No paywall · Sanskrit + Hindi + English
          </p>
        </div>
      </section>

      {/* ── APP SECTION — the "also on iPhone" beat before the footer ── */}
      <section className="section homepage-app-section" id="app">
        <div className="wrap">
          <div className="split">
            <div className="split-text">
              <div className="eyebrow">Also — on iPhone</div>
              <h2 className="heading" style={{ marginBottom: 18 }}>
                Prefer a 2-minute<br/>daily practice?<br/><em>Try the iOS app.</em>
              </h2>
              <p className="subtext" style={{ marginBottom: 26 }}>
                The Wisdom app turns the Gita into a daily rhythm. One teaching each morning,
                chosen for your path — Action, Wisdom, or Devotion. Read here on the web anytime;
                the app adds the loop that makes the practice stick.
              </p>
              <ul className="check-list" style={{ marginBottom: 30 }}>
                <li>
                  <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  One teaching a day, chosen for your path
                </li>
                <li>
                  <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  Home screen widget so the verse stays with you
                </li>
                <li>
                  <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  Private journal for daily reflections
                </li>
              </ul>
              <div className="app-section-actions">
                <a
                  href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
                  target="_blank"
                  rel="noopener"
                  className="btn-app-store"
                  data-mp-location="home_app_section_download"
                  aria-label="Download Wisdom on the App Store"
                >
                  <svg className="btn-app-store-icon" viewBox="0 0 384 512" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM236.7 106.1c22.1-26.2 20.1-50.1 19.4-58.6-19.5 1.1-42 13.2-54.9 28.1-14.2 16-22.6 35.8-20.8 57.4 21.1 1.7 40.4-9.4 56.3-26.9z"
                    />
                  </svg>
                  <span className="btn-app-store-text">
                    <span className="btn-app-store-eyebrow">Download on the</span>
                    <span className="btn-app-store-label">App Store</span>
                  </span>
                </a>
                <a
                  href="/app"
                  className="btn-hero-secondary"
                  data-mp-location="home_app_section_learn_more"
                >
                  How it works →
                </a>
              </div>
              <p className="hero-note" style={{ textAlign: 'left', marginTop: 18 }}>
                Free · 3-day trial on premium · ★ 4.9 on the App Store · iPhone only
              </p>
            </div>
            <div className="split-phone">
              <div className="phone-frame">
                <img
                  src="/assets/home-screen-quote1.webp"
                  alt="Wisdom app — a daily Bhagavad Gita teaching on the iPhone home screen"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
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
          <p style={{ fontSize: '11px', color: 'var(--text-dimmer)', marginTop: '4px' }}>
            Wisdom editorial translations. Commentary AI-drafted, human-reviewed. <a href="/methodology" style={{ color: 'var(--text-dimmer)' }}>Methodology →</a>
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a href="https://x.com/sansearchapp" target="_blank" rel="noopener noreferrer" aria-label="Wisdom on X (Twitter)" style={{ color: 'var(--text-dimmer)', fontSize: '13px' }} data-mp-location="footer_twitter">𝕏</a>
            <a href="https://www.instagram.com/wisdomquoteapp/" target="_blank" rel="noopener noreferrer" aria-label="Wisdom on Instagram" style={{ color: 'var(--text-dimmer)', fontSize: '13px' }} data-mp-location="footer_instagram">Instagram</a>
            <ul className="footer-links">
              <li><a href="/gita">Read the Gita</a></li>
              <li><a href="/hi/gita" hrefLang="hi">हिंदी गीता</a></li>
              <li><a href="/app">iOS app</a></li>
              <li><a href="/blogs">Blog</a></li>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/terms">Terms</a></li>
              <li><a href="/methodology">Methodology</a></li>
              <li><a href="mailto:work.ankurshukla@gmail.com">Support</a></li>
            </ul>
          </div>
        </div>
      </footer>

      <BlogTracker pageName="Home" />
      <HomeAnimations />
    </>
  )
}
