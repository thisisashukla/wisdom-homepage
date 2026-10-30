'use client'

/**
 * "Hold to be still": press and hold the verse (touch or mouse, 350ms), rest the pointer on it for 3s, or hold
 * the space bar while the verse is in view. Navigation, notes and the call to action fade over 2s, leaving the
 * line and a slow gold rule (house gold; the page puts <hr class="og-rule fx-keep"> inside the children). On release the device-specific next step appears under the verse.
 * Reduced motion: opacity only, no pulse (CSS). Without JS the verse simply reads as text.
 */
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { trackEvent } from '@/lib/mixpanel'

type Props = { verseRef: string; page: string; children: ReactNode; after: ReactNode }

const PRESS_MS = 350
const HOVER_MS = 3000
const MOVE_PX = 12

export default function HoldStill({ verseRef, page, children, after }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const timer = useRef<number | null>(null)
  const startedAt = useRef<number | null>(null)
  const origin = useRef<{ x: number; y: number } | null>(null)
  const pressing = useRef(false)
  const [holding, setHolding] = useState(false)
  const [released, setReleased] = useState(false)
  const [hint, setHint] = useState<'touch' | 'desktop' | null>(null)

  const base = useCallback(() => ({ funnel: 'other-gitas', page, locale: 'en', verse: verseRef }), [page, verseRef])
  const root = () => ref.current?.closest('[data-fx-root]') ?? null

  const clear = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current)
      timer.current = null
    }
  }

  const begin = useCallback(() => {
    timer.current = null
    if (startedAt.current !== null) return
    startedAt.current = performance.now()
    root()?.classList.add('fx-still')
    trackEvent('Hold Still Started', base())
  }, [base])

  const end = useCallback(() => {
    clear()
    pressing.current = false
    origin.current = null
    setHolding(false)
    if (startedAt.current === null) return
    const held = Math.round(performance.now() - startedAt.current)
    startedAt.current = null
    root()?.classList.remove('fx-still')
    trackEvent('Hold Still Completed', { ...base(), held_ms: held })
    setReleased(true)
  }, [base])

  const arm = (ms: number) => {
    clear()
    timer.current = window.setTimeout(begin, ms)
  }

  useEffect(() => {
    try {
      setHint(window.matchMedia('(hover: hover) and (pointer: fine)').matches ? 'desktop' : 'touch')
    } catch {
      setHint('touch')
    }
    const inView = () => {
      const el = ref.current
      if (!el) return false
      const r = el.getBoundingClientRect()
      return r.top >= 0 && r.bottom <= window.innerHeight
    }
    const free = () => {
      const a = document.activeElement
      return !a || a === document.body || a === ref.current
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        end()
        return
      }
      if (e.code !== 'Space' || e.repeat || !free() || !inView()) return
      e.preventDefault()
      pressing.current = true
      arm(PRESS_MS)
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && pressing.current) end()
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    const node = root()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
      clear()
      node?.classList.remove('fx-still')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end])

  return (
    <>
      <div
        ref={ref}
        className={`fx-hold${holding ? ' is-holding' : ''}`}
        tabIndex={0}
        role="group"
        aria-label={`Verse ${verseRef}. Press and hold, or hold the space bar, to sit with it alone.`}
        onPointerDown={(e) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return
          pressing.current = true
          origin.current = { x: e.clientX, y: e.clientY }
          setHolding(true)
          arm(PRESS_MS)
        }}
        onPointerMove={(e) => {
          const o = origin.current
          if (!o || startedAt.current !== null) return
          if (Math.abs(e.clientX - o.x) > MOVE_PX || Math.abs(e.clientY - o.y) > MOVE_PX) {
            clear()
            pressing.current = false
            origin.current = null
            setHolding(false)
          }
        }}
        onPointerUp={() => end()}
        onPointerCancel={() => end()}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse' && !pressing.current) arm(HOVER_MS)
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') end()
        }}
        onContextMenu={(e) => {
          if (holding || startedAt.current !== null) e.preventDefault()
        }}
      >
        <span className="og-ground" aria-hidden="true" />
        {children}
        {hint && (
          <p className="fx-hint">
            {hint === 'desktop'
              ? 'Rest the pointer on the verse for three seconds, or hold the space bar, to sit with it alone.'
              : 'Press and hold the verse to sit with it alone.'}
          </p>
        )}
      </div>
      <div aria-live="polite">{released && <div className="fx-after">{after}</div>}</div>
    </>
  )
}
