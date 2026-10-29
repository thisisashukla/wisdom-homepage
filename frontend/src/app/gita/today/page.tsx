import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllVerseRefs,
  getVerse,
  getChapter,
  verseUrl,
  chapterUrl,
  hasTopic,
  topicUrl,
  topicLabel,
} from '@/lib/gita'
// GitaAppCTA source preserved at @/components/gita/GitaAppCTA — currently swapped out
// for the Scripture AI waitlist while that product launches.
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import BlogTracker from '@/components/BlogTracker'
import SanskritText from '@/components/gita/SanskritText'
import VerseAudioPlayer from '@/components/gita/VerseAudioPlayer'
// DailyVerseEmail source preserved at @/components/gita/DailyVerseEmail — usage
// disabled for now; only the Scripture AI waitlist is shown on this page.
// import DailyVerseEmail from '@/components/gita/DailyVerseEmail'
import { getVerseAudio } from '@/lib/gita'

// Re-render once an hour so the day rolls over cleanly without manual rebuilds.
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Gita Verse of the Day: Today\'s Shlok & Meaning',
  description:
    'A new verse from the Bhagavad Gita every day. Sanskrit original, Hindi and English meaning, plus the story behind why this shloka fits today.',
  alternates: {
    canonical: 'https://wisdomquotes.in/gita/today',
    languages: {
      'en': 'https://wisdomquotes.in/gita/today',
      'en-IN': 'https://wisdomquotes.in/gita/today',
      'hi': 'https://wisdomquotes.in/hi/gita/today',
      'hi-IN': 'https://wisdomquotes.in/hi/gita/today',
      'x-default': 'https://wisdomquotes.in/gita/today',
    },
  },
  openGraph: {
    title: 'Bhagavad Gita — Verse of the Day',
    description: 'A new verse from the Bhagavad Gita each day, with story and context.',
    url: 'https://wisdomquotes.in/gita/today',
    siteName: 'Wisdom',
    type: 'article',
    locale: 'en_IN',
    alternateLocale: ['hi_IN'],
    images: ['https://wisdomquotes.in/og-image.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bhagavad Gita — Verse of the Day',
    description: 'A new verse from the Bhagavad Gita each day.',
    images: ['https://wisdomquotes.in/og-image.webp'],
  },
  keywords: 'hindu verse of the day, bhagavad gita verse of the day, daily shloka, shloka of the day, sanskrit verse daily',
}

// ── Types ─────────────────────────────────────────────────────────────────────

type VerseOfDayContext = {
  chapter: number
  verse: number
  day_of_week: string
  deity: string
  day_name_hi: string
  date_context: string
  why_chosen: string
  story: string
  themes: string[]
}

// ── Fallback: deterministic verse when backend is unavailable ─────────────────

const deterministicVerseRef = () => {
  const refs = getAllVerseRefs()
  if (refs.length === 0) return null
  const utc = new Date()
  const dayOfYear = Math.floor(
    (Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()) -
      Date.UTC(utc.getUTCFullYear(), 0, 0)) /
      86400000,
  )
  const yearKey = utc.getUTCFullYear() * 1000
  return refs[(yearKey + dayOfYear) % refs.length]
}

// ── Fetch from backend API ────────────────────────────────────────────────────

async function fetchVerseOfDay(): Promise<VerseOfDayContext | null> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL
  if (!backendUrl) return null

  try {
    const res = await fetch(`${backendUrl}/api/v1/verse-of-day`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.warn(`[today] verse-of-day API returned ${res.status}`)
      return null
    }
    return await res.json() as VerseOfDayContext
  } catch (err) {
    console.warn('[today] verse-of-day API unreachable:', err)
    return null
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function TodayPage() {
  // Try API-driven verse first, fall back to deterministic
  const context = await fetchVerseOfDay()

  let chapter: number
  let verseNum: number

  if (context) {
    chapter  = context.chapter
    verseNum = context.verse
  } else {
    const ref = deterministicVerseRef()
    if (!ref) notFound()
    chapter  = ref.chapter
    verseNum = ref.verse
  }

  const verse = await getVerse(chapter, verseNum)
  const audio = verse ? getVerseAudio(chapter, verseNum) : null
  if (!verse) notFound()
  const ch = getChapter(chapter)

  const longDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

  const isoDate = new Date().toISOString()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quotation',
    text: verse.sanskrit,
    inLanguage: 'sa',
    spokenByCharacter: verse.speaker
      ? { '@type': 'Person', name: verse.speaker }
      : undefined,
    creator: { '@type': 'Person', name: 'Vyasa' },
    isPartOf: {
      '@type': 'Chapter',
      name: ch?.enName ?? `Bhagavad Gita Chapter ${chapter}`,
      position: chapter,
      isPartOf: { '@type': 'Book', name: 'Bhagavad Gita', url: 'https://wisdomquotes.in/gita' },
    },
    datePublished: isoDate,
  }
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Bhagavad Gita ${verse.chapter}.${verse.verse} — Verse of the Day`,
    url: 'https://wisdomquotes.in/gita/today',
    inLanguage: 'en',
    lastReviewed: isoDate,
    mainEntity: {
      '@type': 'Quotation',
      text: verse.englishTranslation,
      spokenByCharacter: verse.speaker
        ? { '@type': 'Person', name: verse.speaker }
        : undefined,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Bhagavad Gita', item: 'https://wisdomquotes.in/gita' },
        { '@type': 'ListItem', position: 2, name: 'Verse of the day', item: 'https://wisdomquotes.in/gita/today' },
      ],
    },
  }

  return (
    <main className="gita-main">
      <BlogTracker pageName="gita_today" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />

      <nav className="gita-crumb" aria-label="Breadcrumb">
        <a href="/gita" data-mp-location="today_crumb_gita">Bhagavad Gita</a>
        <span className="sep">›</span>
        <span>Verse of the day</span>
      </nav>

      {/* ── Date header ── */}
      <div className="gita-eyebrow">
        Verse of the day · {longDate}
        {context && (
          <span style={{ opacity: 0.7 }}> · {context.day_name_hi} ({context.deity})</span>
        )}
      </div>
      <h1 className="gita-h1">Gita verse of the day: Bhagavad Gita {verse.chapter}.{verse.verse}</h1>
      {verse.essence && (
        <p className="gita-lede" style={{ fontStyle: 'italic', color: 'var(--gold-pale)', maxWidth: 640 }}>
          "{verse.essence}"
        </p>
      )}

      {/* ── Why today ── */}
      {context && (
        <div
          className="gita-verse-card"
          style={{
            background: 'var(--surface-2, rgba(255,255,255,0.04))',
            borderLeft: '3px solid var(--gold-pale, #c9a84c)',
            paddingLeft: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <div
            className="gita-translation-label"
            style={{ marginBottom: '0.5rem', letterSpacing: '0.08em', fontSize: '0.72rem' }}
          >
            WHY TODAY
          </div>
          <p style={{ margin: 0, lineHeight: 1.7, fontSize: '0.97rem' }}>
            {context.date_context}
          </p>
          <p style={{ margin: '0.75rem 0 0', lineHeight: 1.7, fontSize: '0.97rem' }}>
            {context.why_chosen}
          </p>
        </div>
      )}

      {/* ── Verse card ── */}
      <article className="gita-verse-card">
        {audio ? (
          <VerseAudioPlayer
            audioSrc={audio.audio}
            timestamps={audio.timestamps}
            text={verse.sanskrit}
            chapter={chapter}
            verse={verseNum}
          />
        ) : (
          <SanskritText text={verse.sanskrit} className="gita-sanskrit" />
        )}

        <div className="gita-translation">
          <div className="gita-translation-label">Hindi · हिन्दी</div>
          <div className="gita-translation-text gita-translation-text--hi" lang="hi">
            {verse.hindiTranslation}
          </div>
        </div>
        <div className="gita-translation">
          <div className="gita-translation-label">English</div>
          <div className="gita-translation-text" lang="en">
            {verse.englishTranslation}
          </div>
        </div>

        {verse.tags.some(hasTopic) && (
          <div className="gita-meta-row">
            <span>Themes:</span>
            {verse.tags.filter(hasTopic).map((t) => (
              <a key={t} href={topicUrl(t)} className="gita-tag" data-mp-location="today_tag">
                {topicLabel(t)}
              </a>
            ))}
          </div>
        )}

        <div className="gita-meta-row" style={{ borderTop: 'none', paddingTop: 0 }}>
          <a href={verseUrl(verse.chapter, verse.verse)} className="gita-tag" data-mp-location="today_full_verse">
            Read this verse →
          </a>
          {ch && (
            <a href={chapterUrl(ch.number)} className="gita-tag" data-mp-location="today_chapter">
              {ch.enName} →
            </a>
          )}
        </div>
      </article>

      {/* ── DailyVerseEmail removed for now — Scripture AI waitlist below is
             the only signup on this page. Component code preserved at
             @/components/gita/DailyVerseEmail. */}

      {/* ── The backstory ── */}
      {context && (
        <div
          className="gita-verse-card"
          style={{
            background: 'var(--surface-2, rgba(255,255,255,0.04))',
            marginTop: '1.5rem',
          }}
        >
          <div
            className="gita-translation-label"
            style={{ marginBottom: '0.5rem', letterSpacing: '0.08em', fontSize: '0.72rem' }}
          >
            THE SCENE ON KURUKSHETRA
          </div>
          <p style={{ margin: 0, lineHeight: 1.8, fontSize: '0.97rem' }}>
            {context.story}
          </p>
        </div>
      )}

      {Date.now() < Date.UTC(2026, 11, 20, 18, 30) && (
        <p style={{ margin: '28px 0 0', fontSize: 15, color: 'var(--text-dim)' }}>
          Gita Jayanti 2026 is on Sunday, 20 December.{' '}
          <a href="/gita-jayanti" data-mp-location="gita_today_jayanti" style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}>
            Read a chapter a day and finish the Gita on the day →
          </a>
        </p>
      )}

      <VerseFunnelCTA variant="verse" locale="en" verse={verse} pageName="Gita Today" />
    </main>
  )
}
