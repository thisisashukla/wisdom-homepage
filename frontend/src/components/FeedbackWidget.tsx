'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/mixpanel'

type PageType = 'blog' | 'chapter' | 'verse'
type Phase = 'rating' | 'detail' | 'done'

interface FeedbackWidgetProps {
  pageType: PageType
  /** Stable identifier sent to Mixpanel as page_id (e.g. "chapter_2", "verse_2_47"). Falls back to pathname. */
  pageId?: string
  /** Same pageName used in BlogTracker — for Mixpanel page attribution. Falls back to pathname. */
  pageName?: string
}

const REACTIONS: Record<PageType, Array<{ emoji: string; label: string }>> = {
  blog: [
    { emoji: '💡', label: 'Learned something new' },
    { emoji: '🙏', label: 'Found peace' },
    { emoji: '🤔', label: 'Need more clarity' },
    { emoji: '📌', label: 'Will revisit' },
  ],
  chapter: [
    { emoji: '✨', label: 'Clear & insightful' },
    { emoji: '📖', label: 'Want to read more' },
    { emoji: '🤔', label: 'Needs more context' },
    { emoji: '🙏', label: 'Felt a connection' },
  ],
  verse: [
    { emoji: '💫', label: 'This resonated' },
    { emoji: '🔍', label: 'Made me think' },
    { emoji: '🌿', label: 'Brought me calm' },
    { emoji: '📖', label: 'Want to explore more' },
  ],
}

const CONTENT_LABEL: Record<PageType, string> = {
  blog: 'this article',
  chapter: 'this chapter',
  verse: 'this verse',
}

// ── Mixpanel events fired:
// "Feedback Content Rated"  — on 👍/👎 tap
// "Feedback Submitted"      — on Send (includes liked, reactions[], text)
// "Section Viewed"          — via the data-mp-section attribute read by BlogTracker

export function FeedbackWidget({ pageType, pageId, pageName }: FeedbackWidgetProps) {
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('rating')
  const [liked, setLiked] = useState<boolean | null>(null)
  const [selectedReactions, setSelectedReactions] = useState<Set<string>>(new Set())
  const [text, setText] = useState('')
  const [visible, setVisible] = useState(false)

  const pid = pageId ?? pathname
  const page = pageName ?? pathname
  const label = CONTENT_LABEL[pageType]
  const reactions = REACTIONS[pageType]

  // Soft fade-in after a short delay — not jarring on page load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900)
    return () => clearTimeout(t)
  }, [])

  const handleLike = (isLiked: boolean) => {
    setLiked(isLiked)
    setPhase('detail')
    trackEvent('Feedback Content Rated', {
      page,
      page_type: pageType,
      page_id: pid,
      liked: isLiked,
    })
  }

  const toggleReaction = (reactionLabel: string) => {
    setSelectedReactions(prev => {
      const next = new Set(prev)
      if (next.has(reactionLabel)) next.delete(reactionLabel)
      else next.add(reactionLabel)
      return next
    })
  }

  const handleSubmit = () => {
    const trimmed = text.trim()
    trackEvent('Feedback Submitted', {
      page,
      page_type: pageType,
      page_id: pid,
      liked,
      reactions: Array.from(selectedReactions),
      text: trimmed || null,
    })
    setPhase('done')
  }

  return (
    <div
      data-mp-section="feedback_widget"
      style={{
        borderTop: '1px solid rgba(200,136,30,0.12)',
        marginTop: 64,
        paddingTop: 40,
        paddingBottom: 56,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.55s ease',
      }}
    >
      <div style={{ maxWidth: 500, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>

        {/* ── Phase 1: Like / Not like ── */}
        {phase === 'rating' && (
          <>
            <p style={{
              fontSize: 12.5,
              color: 'rgba(245,232,204,0.38)',
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              marginBottom: 18,
              fontWeight: 500,
            }}>
              Did you like {label}?
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              {[
                { display: '👍  Yes', value: true },
                { display: '👎  Not really', value: false },
              ].map(btn => (
                <button
                  key={String(btn.value)}
                  onClick={() => handleLike(btn.value)}
                  style={ratingBtnStyle}
                >
                  {btn.display}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── Phase 2: Reactions + open text ── */}
        {phase === 'detail' && (
          <div style={{ textAlign: 'left' }}>
            <p style={{
              fontSize: 12.5,
              color: 'rgba(245,232,204,0.38)',
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              fontWeight: 500,
              marginBottom: 16,
              textAlign: 'center',
            }}>
              {liked ? 'What did you find here?' : 'What could be better?'}
              {' '}
              <span style={{ textTransform: 'none', letterSpacing: 0, opacity: 0.7 }}>(pick any)</span>
            </p>

            {/* Reaction chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 22 }}>
              {reactions.map(r => {
                const sel = selectedReactions.has(r.label)
                return (
                  <button
                    key={r.label}
                    onClick={() => toggleReaction(r.label)}
                    style={{
                      borderRadius: 22,
                      padding: '7px 15px',
                      fontSize: 13,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'background 0.15s, border-color 0.15s, color 0.15s',
                      background: sel ? 'rgba(200,136,30,0.18)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${sel ? 'rgba(200,136,30,0.55)' : 'rgba(245,232,204,0.11)'}`,
                      color: sel ? 'rgba(245,201,106,1)' : 'rgba(245,232,204,0.6)',
                    }}
                  >
                    {r.emoji} {r.label}
                  </button>
                )
              })}
            </div>

            {/* Open text */}
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Anything to add? (optional)"
              rows={3}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(245,232,204,0.11)',
                borderRadius: 10,
                padding: '12px 14px',
                color: 'rgba(245,232,204,0.85)',
                fontSize: 14,
                lineHeight: 1.55,
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                marginBottom: 16,
                display: 'block',
                caretColor: 'rgba(245,201,106,0.8)',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={handleSubmit} style={submitBtnStyle}>
                Send feedback
              </button>
            </div>
          </div>
        )}

        {/* ── Phase 3: Thank you ── */}
        {phase === 'done' && (
          <div>
            <div style={{ fontSize: 26, marginBottom: 10 }}>🙏</div>
            <p style={{ fontSize: 13.5, color: 'rgba(245,232,204,0.45)', letterSpacing: '0.04em', marginBottom: 18 }}>
              Thank you for the feedback
            </p>
            <a
              href={`https://x.com/intent/tweet?text=${encodeURIComponent('Just read on @wisdomquotesin — worth it 🙏')}&url=${encodeURIComponent('https://wisdomquotes.in' + pathname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(245,232,204,0.13)',
                borderRadius: 8,
                padding: '8px 18px',
                color: 'rgba(245,232,204,0.55)',
                fontSize: 12.5,
                textDecoration: 'none',
                letterSpacing: '0.03em',
                transition: 'border-color 0.15s, color 0.15s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.734-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

const ratingBtnStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(245,232,204,0.13)',
  borderRadius: 10,
  padding: '10px 22px',
  color: 'rgba(245,232,204,0.65)',
  fontSize: 14,
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'background 0.15s, border-color 0.15s',
}

const submitBtnStyle: React.CSSProperties = {
  background: 'rgba(200,136,30,0.14)',
  border: '1px solid rgba(200,136,30,0.38)',
  borderRadius: 8,
  padding: '10px 28px',
  color: 'rgba(245,201,106,0.88)',
  fontSize: 13.5,
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
  letterSpacing: '0.03em',
  transition: 'background 0.15s, border-color 0.15s',
}

export default FeedbackWidget
