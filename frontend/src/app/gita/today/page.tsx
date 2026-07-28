import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllVerseRefs,
  getVerse,
  getChapter,
  verseUrl,
  chapterUrl,
  topicUrl,
} from '@/lib/gita'
import GitaAppCTA from '@/components/gita/GitaAppCTA'
import BlogTracker from '@/components/BlogTracker'
import SanskritText from '@/components/gita/SanskritText'
import VerseAudioPlayer from '@/components/gita/VerseAudioPlayer'
import DailyVerseEmail from '@/components/gita/DailyVerseEmail'
import { getVerseAudio } from '@/lib/gita'

// Re-render once an hour so the day rolls over cleanly without manual rebuilds.
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Hindu Verse of the Day — Bhagavad Gita | Wisdom',
  description:
    'A new verse from the Bhagavad Gita every day. Sanskrit original, Hindi and English meaning, and the essence in a single line. Your daily Hindu practice.',
  alternates: {
    canonical: 'https://wisdomquotes.in/gita/today',
    languages: {
      'en-IN': 'https://wisdomquotes.in/gita/today',
      'hi-IN': 'https://wisdomquotes.in/hi/gita/today',
    },
  },
  openGraph: {
    title: 'Bhagavad Gita — Verse of the Day',
    description: 'A new verse from the Bhagavad Gita each day.',
    url: 'https://wisdomquotes.in/gita/today',
    siteName: 'Wisdom',
    type: 'article',
  },
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

  return (
    <main className="gita-main">
      <BlogTracker pageName="gita_today" />

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
      <h1 className="gita-h1">Bhagavad Gita {verse.chapter}.{verse.verse}</h1>
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

        {verse.tags.length > 0 && (
          <div className="gita-meta-row">
            <span>Themes:</span>
            {verse.tags.map((t) => (
              <a key={t} href={topicUrl(t)} className="gita-tag" data-mp-location="today_tag">
                {t}
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

      {/* ── Email capture — highest-engagement page, the only retention hook ── */}
      <DailyVerseEmail page="gita_today" locale="en" />

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

      <GitaAppCTA variant="verse" locale="en" verse={verse} />
    </main>
  )
}
