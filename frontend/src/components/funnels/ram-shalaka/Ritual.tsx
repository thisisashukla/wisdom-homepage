'use client'

/**
 * Shri Ram Shalaka, as a small app: ask, touch a syllable, watch every ninth syllable
 * gather into your chaupai, then the verdict seal.
 * Privacy: the typed question stays in component state; only an FNV hash is stored, and it is never sent anywhere.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from 'react'
import { getRedirectResult } from 'firebase/auth'
import { useAuth } from '@/context/AuthContext'
import { auth } from '@/lib/firebase'
import { identify, signInWithGoogle, takePending } from '@/lib/funnelClient'
import { detectPlatform } from '@/lib/app'
import { mixpanel, trackEvent, trackEventBeacon } from '@/lib/mixpanel'
import { cardImageUrl } from '@/lib/quotes-shared'
import {
  RS_DAILY,
  RS_FUNNEL,
  RS_STORAGE_KEY,
  dayKey,
  hashQuestion,
  lineHref,
  minutesToReset,
  needsExpertNote,
  normQuestion,
  sequence,
  type RsLocale,
  type RsNextCopy,
  type RsRitualLine,
} from '@/lib/funnels/ram-shalaka/core'
import RsNext from './RsNext'
import { drawCard } from './shareCard'

type Screen = 'ask' | 'gate' | 'pick' | 'uttar' | 'done'
type Mem = { day: string; used: number; asked: { h: string; k: number }[]; mala: number[] }

type Props = {
  locale: RsLocale
  pageKey: string
  h1: string
  cells: string[]
  lines: RsRitualLine[]
  ui: Record<string, string>
  naam: string[]
  next: RsNextCopy
  langHref: string
  siteUrl: string
}

const COUNT_DELAY_MS = 700
const FLY_MS = 560
const AFTER_COUNT_MS = 1300

/** Slow, fast, slow: the shalaka gathers speed through the middle of the count. */
const hopGap = (i: number) => Math.round(70 + 210 * (1 - Math.sin(Math.PI * (i / 24))))

function readMem(): Mem {
  const fresh: Mem = { day: dayKey(), used: 0, asked: [], mala: [] }
  try {
    const s = JSON.parse(localStorage.getItem(RS_STORAGE_KEY) || 'null') as Partial<Mem> | null
    if (!s) return fresh
    const mala = Array.isArray(s.mala) ? s.mala.filter((k) => Number.isInteger(k) && k >= 0 && k < 9) : []
    if (s.day === fresh.day) {
      return { ...fresh, used: Math.min(RS_DAILY, Number(s.used) || 0), asked: Array.isArray(s.asked) ? s.asked : [], mala }
    }
    return { ...fresh, mala }
  } catch {
    return fresh
  }
}
function writeMem(m: Mem) {
  try {
    localStorage.setItem(RS_STORAGE_KEY, JSON.stringify({ ...m, day: dayKey() }))
  } catch {
    // private mode: the ritual still works, nothing persists
  }
}

/* ---------------------------------------------------------------- free attempt */
/** Signed-out visitors get one shalaka on this device; after that, a free Google sign-in. */
const FREE_KEY = 'wq_shalaka_free_v1'
const FREE_ATTEMPTS = 1
function freeUsed(): number {
  try {
    return Number(localStorage.getItem(FREE_KEY)) || 0
  } catch {
    return 0
  }
}
function markFreeUsed() {
  try {
    localStorage.setItem(FREE_KEY, String(freeUsed() + 1))
  } catch {
    // private mode: the gate falls back to this visit's count
  }
}
/** Counts on the person's Mixpanel profile, once they are identified. */
function bumpProfile(sign: string) {
  try {
    mixpanel.people.increment({ shalaka_asks: 1, [`shalaka_${sign}`]: 1 })
    mixpanel.people.set_once({ shalaka_first_at: new Date().toISOString() })
    mixpanel.people.set({ shalaka_last_at: new Date().toISOString() })
  } catch {
    // mixpanel not ready
  }
}

/* ---------------------------------------------------------------- sound */
let audioCtx: AudioContext | null = null
function bell(freq: number, dur = 0.6, gain = 0.05) {
  try {
    const W = window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }
    const Ctor = W.AudioContext || W.webkitAudioContext
    if (!Ctor) return
    audioCtx = audioCtx || new Ctor()
    const ac = audioCtx
    const t0 = ac.currentTime
    const g = ac.createGain()
    g.gain.setValueAtTime(0.0001, t0)
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
    for (const f of [freq, freq * 2.76]) {
      const o = ac.createOscillator()
      o.type = 'sine'
      o.frequency.value = f
      o.connect(g)
      o.start(t0)
      o.stop(t0 + dur)
    }
    g.connect(ac.destination)
  } catch {
    // no audio on this device
  }
}
function buzz(p: number | number[]) {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(p)
  } catch {
    // vibration blocked
  }
}

/**
 * Lay the 25 verse positions out as the chaupai itself: two rows, grouped into words,
 * so the line visibly assembles as syllables land. Falls back to two plain rows.
 */
function verseLayout(syll: string[], deva: string[]): number[][][] {
  const rows: number[][][] = []
  let j = 0
  for (const half of deva) {
    const words = half.replace(/[।॥]/g, '').trim().split(/\s+/)
    const row: number[][] = []
    for (const w of words) {
      let acc = ''
      const slots: number[] = []
      while (j < 25 && acc.length < w.length) {
        acc += syll[j]
        slots.push(j)
        j++
      }
      if (acc !== w) return [[Array.from({ length: 13 }, (_, i) => i)], [Array.from({ length: 12 }, (_, i) => i + 13)]]
      row.push(slots)
    }
    rows.push(row)
  }
  if (j !== 25) return [[Array.from({ length: 13 }, (_, i) => i)], [Array.from({ length: 12 }, (_, i) => i + 13)]]
  return rows
}

/** A lone vowel sign (the grid's standalone ा) sits on a no-break space so it shows without a dotted circle. */
const show = (c: string) => (/^\p{M}/u.test(c) ? `\u00a0${c}` : c)

/** Marigold petals for an auspicious seal: fixed pseudo-random spread so SSR and client agree. */
const PETALS = Array.from({ length: 28 }, (_, i) => {
  const a = (i / 28) * Math.PI * 2 + ((i * 37) % 11) / 20
  const r = 110 + ((i * 53) % 90)
  return {
    '--dx': `${Math.round(Math.cos(a) * r)}px`,
    '--dy': `${Math.round(Math.sin(a) * r * 0.8 - 40)}px`,
    '--fall': `${120 + ((i * 29) % 140)}px`,
    '--rot': `${((i * 71) % 360) - 180}deg`,
    '--d': `${(i % 5) * 30}ms`,
    '--s': `${0.7 + ((i * 13) % 6) / 10}`,
  } as CSSProperties
})

/* ---------------------------------------------------------------- ritual */
export default function Ritual({ locale, pageKey, h1, cells, lines, ui, naam, next, langHref, siteUrl }: Props) {
  const [screen, setScreen] = useState<Screen>('ask')
  const [mem, setMem] = useState<Mem>({ day: '', used: 0, asked: [], mala: [] })
  const [sound, setSound] = useState(true)
  const [reduce, setReduce] = useState(false)
  const [question, setQuestion] = useState('')
  const [asked, setAsked] = useState('')
  const [askedSit, setAskedSit] = useState<string | null>(null)
  const [repeatK, setRepeatK] = useState<number | null>(null)
  const [chosen, setChosen] = useState<number | null>(null)
  const [step, setStep] = useState(0)
  const [complete, setComplete] = useState(false)
  const [focusIdx, setFocusIdx] = useState(112)
  const [current, setCurrent] = useState<number | null>(null)
  const [script, setScript] = useState<'deva' | 'iast'>('deva')
  const [tab, setTab] = useState<'you' | 'scene'>('you')
  const [expert, setExpert] = useState(false)
  const [modal, setModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const [resetText, setResetText] = useState('')
  const [moved, setMoved] = useState(false)
  const [cardUrl, setCardUrl] = useState('')
  const [gateBusy, setGateBusy] = useState(false)
  const [gateError, setGateError] = useState(false)
  const [freeCount, setFreeCount] = useState(0)
  const { user } = useAuth()
  const signedIn = !!user
  const cardBlob = useRef<{ k: number; blob: Blob } | null>(null)

  const base = useMemo(() => ({ funnel: RS_FUNNEL, page: pageKey, locale, signed_in: signedIn }), [pageKey, locale, signedIn])
  const soundOn = useRef(true)
  const busy = useRef(false)
  const timers = useRef<number[]>([])
  const boardRef = useRef<HTMLDivElement>(null)
  const trayRef = useRef<HTMLDivElement>(null)
  const flyRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLHeadingElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const shareRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const shownScreen = useRef<Screen>('ask')

  const nextCopy = useMemo(
    () => ({ planTitle: ui.planTitle, planSub: ui.planSub, planBtn: ui.planBtn, planFree: ui.planFree, appLine: next.app.line, appBtn: next.app.cta }),
    [ui, next],
  )
  const chips = useMemo(
    () =>
      (ui.chips || '')
        .split(';')
        .map((c) => c.split('|'))
        .filter((c) => c.length >= 2)
        .map(([label, q, sit]) => ({ label, q, sit: sit || null })),
    [ui.chips],
  )

  useEffect(() => {
    setFreeCount(freeUsed())
    // Back from a redirect sign-in (popup blocked): land on the ask screen, signed in.
    getRedirectResult(auth)
      .then((cred) => {
        if (!cred?.user) return
        const p = takePending()
        if (p?.source !== RS_FUNNEL) return
        identify(cred.user)
        trackEvent('Shalaka Signin Completed', { funnel: RS_FUNNEL, page: pageKey, locale, signed_in: true, method: 'redirect' })
      })
      .catch(() => {})
    setMem(readMem())
    const rm = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (rm) {
      setReduce(true)
      setSound(false)
      soundOn.current = false
    }
    let referrer = ''
    try {
      referrer = document.referrer ? new URL(document.referrer).hostname : ''
    } catch {
      referrer = ''
    }
    trackEvent('Shalaka Opened', { ...base, lang: locale, device: detectPlatform(), referrer: referrer || 'direct', free_used: freeUsed() })
    const ts = timers.current
    return () => ts.forEach((t) => window.clearTimeout(t))
  }, [base, locale])

  // Move focus to the new screen's heading so keyboard and screen reader users follow along.
  useEffect(() => {
    if (shownScreen.current === screen) return
    shownScreen.current = screen
    setMoved(true)
    headRef.current?.focus({ preventScroll: true })
    const top = panelRef.current?.getBoundingClientRect().top ?? 0
    if (top < -40 || top > 120) window.scrollTo({ top: window.scrollY + top - 60, behavior: reduce || Math.abs(top) > 900 ? 'instant' : 'smooth' })
  }, [screen, reduce])

  useEffect(() => {
    if (!modal) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModal(false)
        shareRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modal])

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }
  const ring = (f: number, d?: number, g?: number) => {
    if (soundOn.current) bell(f, d, g)
  }

  const goDone = useCallback(() => {
    const mins = minutesToReset()
    setResetText(`${Math.floor(mins / 60)}:${String(mins % 60).padStart(2, '0')}`)
    setScreen('done')
  }, [])

  /* ---------- ask */
  const onAsk = () => {
    const q = normQuestion(question)
    setRepeatK(null)
    if (q) {
      const h = hashQuestion(q)
      const prev = mem.asked.find((a) => a.h === h)
      if (prev) {
        setRepeatK(prev.k)
        trackEvent('Repeat Question Blocked', { ...base, k: prev.k })
        return
      }
    }
    if (mem.used >= RS_DAILY) {
      trackEvent('Daily Limit Reached', { ...base })
      goDone()
      return
    }
    const isSignedIn = signedIn || !!auth.currentUser
    if (!isSignedIn && freeUsed() >= FREE_ATTEMPTS) {
      setGateError(false)
      setScreen('gate')
      trackEvent('Shalaka Gate Shown', { ...base, typed: !!q, free_used: freeUsed(), asked_today: mem.used })
      return
    }
    startPick()
  }

  const startPick = () => {
    const q = normQuestion(question)
    trackEvent('Sankalp Set', { ...base, typed: !!q, chip: chips.some((c) => c.q === question) })
    setExpert(needsExpertNote(question))
    setAsked(question.trim())
    setAskedSit(chips.find((c) => c.q === question)?.sit ?? null)
    trackEvent('Shalaka Grid Shown', { ...base, typed: !!q })
    setChosen(null)
    setStep(0)
    setComplete(false)
    busy.current = false
    ring(990, 1.2, 0.035)
    setScreen('pick')
  }

  /* ---------- the gate */
  const onGoogle = async () => {
    if (gateBusy) return
    setGateBusy(true)
    setGateError(false)
    trackEvent('Shalaka Signin Started', { ...base })
    try {
      const u = await signInWithGoogle({ source: RS_FUNNEL })
      if (!u) {
        trackEvent('Shalaka Signin Cancelled', { ...base })
        return
      }
      trackEvent('Shalaka Signin Completed', { ...base, signed_in: true, method: 'popup' })
      startPick()
    } catch (e) {
      setGateError(true)
      trackEvent('Shalaka Signin Failed', { ...base, code: (e as { code?: string })?.code || 'unknown' })
    } finally {
      setGateBusy(false)
    }
  }
  const onGateBack = () => {
    trackEvent('Shalaka Gate Dismissed', { ...base })
    setScreen(current !== null ? 'uttar' : 'ask')
  }

  /* ---------- the count */
  const fly = (cellIdx: number, slot: number) => {
    const layer = flyRef.current
    const from = boardRef.current?.querySelector<HTMLElement>(`[data-i="${cellIdx}"]`)
    const to = trayRef.current?.querySelector<HTMLElement>(`[data-s="${slot}"]`)
    if (!layer || !from || !to || typeof from.animate !== 'function') return
    const a = from.getBoundingClientRect()
    const b = to.getBoundingClientRect()
    const el = document.createElement('span')
    el.className = 'rs-flyer'
    el.textContent = show(cells[cellIdx])
    el.style.left = `${a.left + a.width / 2}px`
    el.style.top = `${a.top + a.height / 2}px`
    layer.appendChild(el)
    const dx = b.left + b.width / 2 - (a.left + a.width / 2)
    const dy = b.top + b.height / 2 - (a.top + a.height / 2)
    const anim = el.animate(
      [
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 },
        { transform: 'translate(-50%, -50%) scale(1.9)', opacity: 1, offset: 0.18 },
        { transform: `translate(calc(-50% + ${dx * 0.55}px), calc(-50% + ${dy * 0.55 - 46}px)) scale(1.5)`, opacity: 1, offset: 0.6 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1)`, opacity: 1 },
      ],
      { duration: FLY_MS, easing: 'cubic-bezier(0.3, 0.6, 0.35, 1)', fill: 'forwards' },
    )
    anim.onfinish = () => el.remove()
  }

  const place = (p: number, how: 'touch' | 'random' | 'key') => {
    if (busy.current || screen !== 'pick') return
    busy.current = true
    const k = p % 9
    const m = (p - k) / 9
    const seq = sequence(p)
    const h = normQuestion(asked) ? hashQuestion(normQuestion(asked)) : ''
    const used = Math.min(RS_DAILY, mem.used + 1)
    const nm: Mem = {
      day: dayKey(),
      used,
      asked: h ? [...mem.asked, { h, k }] : mem.asked,
      mala: mem.mala.includes(k) ? mem.mala : [...mem.mala, k],
    }
    setMem(nm)
    writeMem(nm)
    const freeAttempt = !(signedIn || auth.currentUser)
    if (freeAttempt) {
      markFreeUsed()
      setFreeCount(freeUsed())
    }
    trackEvent('Shalaka Placed', { ...base, cell: p, veil: false, how, free_attempt: freeAttempt })
    setChosen(p)
    setStep(0)
    setCurrent(k)
    ring(1480, 0.5, 0.04)
    buzz(12)

    const reveal = () => {
      setComplete(true)
      ring(660, 1.8, 0.05)
      later(() => ring(990, 1.6, 0.035), 200)
      later(
        () => {
          flyRef.current?.replaceChildren()
          setTab('you')
          setScript('deva')
          setScreen('uttar')
          trackEvent('Chaupai Revealed', { ...base, k, n: lines[k].n, sign: lines[k].sign, nth_today: used, typed: !!h, free_attempt: freeAttempt, mala_size: nm.mala.length })
          bumpProfile(lines[k].sign)
          later(() => {
            ring(523, 2.2, 0.07)
            later(() => ring(784, 2, 0.05), 120)
            buzz([14, 50, 26])
          }, 650)
        },
        reduce ? 300 : AFTER_COUNT_MS,
      )
    }
    if (reduce) {
      setStep(25)
      reveal()
      return
    }
    let s = 0
    const hop = () => {
      const i = s
      s++
      setStep(s)
      fly(seq[i], (m + i) % 25)
      ring(990 + i * 22, 0.32, 0.022)
      buzz(5)
      if (s < 25) later(hop, hopGap(s))
      else later(reveal, FLY_MS)
    }
    later(hop, COUNT_DELAY_MS)
  }

  const onGridKey = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const el = e.target as HTMLElement
    if (!el.dataset || el.dataset.i === undefined) return
    const i = Number(el.dataset.i)
    let n = i
    if (e.key === 'ArrowRight') n = Math.min(224, i + 1)
    else if (e.key === 'ArrowLeft') n = Math.max(0, i - 1)
    else if (e.key === 'ArrowDown') n = Math.min(224, i + 15)
    else if (e.key === 'ArrowUp') n = Math.max(0, i - 15)
    else return
    e.preventDefault()
    setFocusIdx(n)
    el.parentElement?.querySelector<HTMLButtonElement>(`[data-i="${n}"]`)?.focus()
  }

  /* ---------- answer */
  const line = current !== null ? lines[current] : null
  const directive = line ? (line.signText.split('·').pop() || '').trim() : ''
  const directiveCap = directive ? directive.charAt(0).toUpperCase() + directive.slice(1) : ''
  const toolPath = locale === 'hi' ? '/hi/ram-shalaka' : '/ram-shalaka'
  const shareUrl = (n: number, src: string) => `${siteUrl}${toolPath}?utm_source=${src}&utm_medium=share&utm_campaign=rs-${n}`
  const shareText = (l: RsRitualLine, src: string) =>
    [`${ui.shareInvite} ${l.signWord}`, '', l.deva.join('\n'), '', l.meaning, '', `${ui.shareAsk}: ${shareUrl(l.n, src)}`].join('\n')
  const waHref = line ? `https://wa.me/?text=${encodeURIComponent(shareText(line, 'whatsapp'))}` : '#'
  const cardSrc = line ? cardImageUrl(`rs-${line.n}`, { format: 'status', lang: locale, theme: 'night' }) : ''
  const cardSave = line ? cardImageUrl(`rs-${line.n}`, { format: 'status', lang: locale, theme: 'night', download: true }) : ''

  // Draw the answer card once the seal has landed, so the share sheet can open inside the tap.
  useEffect(() => {
    if (screen !== 'uttar' || !line) return
    if (cardBlob.current?.k === line.k) return
    let alive = true
    const t = window.setTimeout(async () => {
      try {
        const cs = getComputedStyle(panelRef.current || document.body)
        const fonts = {
          brush: cs.getPropertyValue('--rs-brush').trim() || 'serif',
          scripture: cs.getPropertyValue('--rs-scripture').trim() || 'serif',
          sans: cs.getPropertyValue('--rs-hi').trim() || 'sans-serif',
        }
        const blob = await drawCard(
          line,
          {
            kicker: ui.kicker,
            lead: ui.verdictLead,
            directive: directiveCap,
            source: `${ui.srcPrefix} · ${line.source}`,
            invite: ui.shareAsk,
            host: `${siteUrl.replace(/^https?:\/\//, '')}${toolPath}`,
          },
          fonts,
          locale,
        )
        if (!alive) return
        cardBlob.current = { k: line.k, blob }
        setCardUrl((old) => {
          if (old) URL.revokeObjectURL(old)
          return URL.createObjectURL(blob)
        })
      } catch {
        // canvas unavailable: the sheet falls back to the server card
      }
    }, 1200)
    return () => {
      alive = false
      window.clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, line?.k])

  const onShare = async () => {
    if (!line) return
    const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean }
    const ready = cardBlob.current?.k === line.k ? cardBlob.current.blob : null
    if (ready && nav.share && /iphone|ipad|android/i.test(navigator.userAgent)) {
      const file = new File([ready], `ram-shalaka-${line.slug}.png`, { type: 'image/png' })
      const data: ShareData = { files: [file], text: shareText(line, 'share') }
      if (nav.canShare?.(data)) {
        trackEvent('Shalaka Shared', { ...base, channel: 'native', k: line.k })
        try {
          await nav.share(data)
        } catch {
          // share sheet dismissed
        }
        return
      }
    }
    trackEvent('Shalaka Shared', { ...base, channel: 'card', k: line.k })
    setModal(true)
  }

  const onCopy = async () => {
    if (!line) return
    trackEvent('Shalaka Shared', { ...base, channel: 'copy', k: line.k })
    try {
      await navigator.clipboard.writeText(shareText(line, 'copy'))
    } catch {
      // clipboard blocked
    }
    setCopied(true)
    later(() => setCopied(false), 2400)
  }

  const onAgain = () => {
    trackEvent('Shalaka Again Tapped', { ...base, left: Math.max(0, RS_DAILY - mem.used), gated: !signedIn && freeCount >= FREE_ATTEMPTS })
    if (mem.used >= RS_DAILY) {
      trackEvent('Daily Limit Reached', { ...base })
      goDone()
      return
    }
    setQuestion('')
    setRepeatK(null)
    setChosen(null)
    setStep(0)
    setComplete(false)
    setScreen('ask')
  }

  const toggleSound = () => {
    const v = !sound
    setSound(v)
    soundOn.current = v
    trackEvent('Shalaka Sound Toggled', { ...base, on: v })
    if (v) bell(1320, 0.4, 0.03)
  }

  /* ---------- derived board state */
  const left = Math.max(0, RS_DAILY - mem.used)
  const k = chosen === null ? -1 : chosen % 9
  const m = chosen === null ? 0 : (chosen - k) / 9
  const seq = useMemo(() => (chosen === null ? [] : sequence(chosen)), [chosen])
  const order = useMemo(() => {
    const o = new Map<number, number>()
    seq.forEach((c, i) => o.set(c, i))
    return o
  }, [seq])
  const filled = useMemo(() => {
    const f = new Set<number>()
    for (let s = 0; s < Math.min(step, 25); s++) f.add((m + s) % 25)
    return f
  }, [step, m])
  const verseSyll = useMemo(() => (k < 0 ? [] : Array.from({ length: 25 }, (_, j) => cells[k + 9 * j])), [k, cells])
  const layout = useMemo(() => (k < 0 ? [] : verseLayout(verseSyll, lines[k].deva)), [k, verseSyll, lines])
  const cellPos = (c: number): CSSProperties => ({
    left: `${(((c % 15) + 0.5) / 15) * 100}%`,
    top: `${((Math.floor(c / 15) + 0.5) / 15) * 100}%`,
  })
  const head = step > 0 ? seq[step - 1] : chosen
  const beadStyle = head === null || head === undefined ? undefined : cellPos(head)
  const threadPts = seq
    .slice(0, Math.max(1, step))
    .map((c) => `${(c % 15) + 0.5},${Math.floor(c / 15) + 0.5}`)
    .join(' ')

  const mala = (
    <div className="rs-mala">
      <ul aria-label={`${ui.mala} ${mem.mala.length}/9`}>
        {lines.map((l) => {
          const got = mem.mala.includes(l.k)
          const now = current === l.k
          return (
            <li key={l.k}>
              <a
                href={lineHref(l.slug)}
                className={`rs-bead${got ? ' got' : ''}${now ? ' now' : ''}`}
                aria-label={`${ui.malaBead} ${l.n}: ${l.deva[0].replace(/[।॥]/g, '')}`}
                data-mp-location="rs_mala"
                hrefLang="hi"
                onClick={() => trackEventBeacon('Shalaka Mala Opened', { ...base, k: l.k, got, screen })}
              >
                <span aria-hidden="true" />
              </a>
            </li>
          )
        })}
      </ul>
      <p className="rs-mala-n">
        <b>{mem.mala.length}/9</b> {ui.malaCount}
      </p>
    </div>
  )

  const naamRow = (
    <p className="rs-naam" lang="hi" aria-label={naam.join(' ')}>
      {naam.map((w, i) => (
        <span key={i} aria-hidden="true" style={{ '--i': i } as CSSProperties}>
          {w}
        </span>
      ))}
    </p>
  )

  return (
    <div
      className={`rs-app${moved ? ' moved' : ''}${complete ? ' complete' : ''}`}
      data-screen={screen}
      data-sign={screen === 'uttar' && line ? line.sign : undefined}
      ref={panelRef}
    >
      <div className="rs-cloth" aria-hidden="true">
        {Array.from({ length: 34 }, (_, r) => (
          <span key={r}>{'राम '.repeat(34)}</span>
        ))}
      </div>
      <div className="rs-fly" ref={flyRef} aria-hidden="true" />

      <div className="rs-col">
        <div className="rs-bar">
          <div className="rs-diyas" role="img" aria-label={`${ui.diyasLeft} ${left}/${RS_DAILY}`}>
            {[0, 1, 2].map((i) => (
              <span key={i} className={`rs-diya${i < mem.used ? ' out' : ''}`}>
                <i />
                <b />
              </span>
            ))}
          </div>
          <h1 className="rs-kicker">{h1}</h1>
          <div className="rs-bar-r">
            <a
              className="rs-chip"
              href={langHref}
              hrefLang={locale === 'hi' ? 'en' : 'hi'}
              lang={locale === 'hi' ? 'en' : 'hi'}
              onClick={() => trackEventBeacon('Shalaka Language Switched', { ...base, to: locale === 'hi' ? 'en' : 'hi', screen })}
            >
              {ui.langSwitch}
            </a>
            <button type="button" className="rs-chip rs-snd" aria-pressed={sound} aria-label={ui.soundAria} onClick={toggleSound}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M12 3a1.5 1.5 0 0 1 1.5 1.5v.6A6 6 0 0 1 18 11v4l1.6 2.2a.5.5 0 0 1-.4.8H4.8a.5.5 0 0 1-.4-.8L6 15v-4a6 6 0 0 1 4.5-5.9v-.6A1.5 1.5 0 0 1 12 3Zm-2 16h4a2 2 0 0 1-4 0Z" fill="currentColor" />
                {!sound && <path d="M4 4l16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
              </svg>
            </button>
          </div>
        </div>

        {screen === 'ask' && (
          <div className="rs-screen rs-ask">
            <h2 className="rs-big" ref={headRef} tabIndex={-1}>
              {ui.askTitle}
            </h2>
            <p className="rs-sub">{ui.askSub}</p>
            <div className="rs-slip">
              <label htmlFor="rs-q" className="rs-sr">
                {ui.qLabel}
              </label>
              <textarea
                id="rs-q"
                className="rs-q"
                value={question}
                placeholder={ui.qPh}
                maxLength={300}
                rows={2}
                autoComplete="off"
                onChange={(e) => {
                  setQuestion(e.target.value)
                  setRepeatK(null)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    onAsk()
                  }
                }}
              />
            </div>
            <div className="rs-chips">
              {chips.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  className={`rs-pill${question === c.q ? ' on' : ''}`}
                  aria-pressed={question === c.q}
                  onClick={() => {
                    if (question !== c.q) trackEvent('Shalaka Example Picked', { ...base, label: c.label })
                    setQuestion(question === c.q ? '' : c.q)
                    setRepeatK(null)
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <button type="button" className="rs-cta" onClick={onAsk}>
              {ui.askBtn}
            </button>
            {repeatK !== null && (
              <div className="rs-notice" role="status">
                {ui.repeat}
                <span className="rs-notice-line" lang="hi">
                  {lines[repeatK].deva.join(' ')}
                </span>
                <a href={lineHref(lines[repeatK].slug)} data-mp-location="rs_repeat_line" hrefLang="hi">
                  {ui.readLine}
                </a>
              </div>
            )}
            <p className="rs-fine">{ui.askNote}</p>
          </div>
        )}

        {screen === 'gate' && (
          <div className="rs-screen rs-gate">
            <div className="rs-gate-seal" aria-hidden="true">
              <span>राम</span>
            </div>
            <h2 className="rs-big" ref={headRef} tabIndex={-1}>
              {ui.gateTitle}
            </h2>
            <p className="rs-sub">{ui.gateSub}</p>
            {question.trim() && <p className="rs-gate-q">“{question.trim()}”</p>}
            <button type="button" className="rs-google" onClick={onGoogle} disabled={gateBusy} aria-busy={gateBusy}>
              <GoogleMark />
              {gateBusy ? ui.gateBusy : ui.gateBtn}
            </button>
            {gateError && (
              <p className="rs-gate-err" role="alert">
                {ui.gateError}
              </p>
            )}
            <p className="rs-fine">{ui.gateFine}</p>
            <button type="button" className="rs-textbtn" onClick={onGateBack}>
              {current !== null ? ui.gateBackAnswer : ui.gateBack}
            </button>
          </div>
        )}

        {screen === 'pick' && (
          <div className="rs-screen rs-pick">
            <p className="rs-asked">{asked ? `“${asked}”` : ui.silentQ}</p>
            {naamRow}
            <div className="rs-board" ref={boardRef} data-state={chosen === null ? 'open' : complete ? 'done' : 'count'}>
              <div className="rs-grid" role="group" aria-label={ui.gridLabel} onKeyDown={onGridKey} lang="hi">
                {cells.map((c, i) => {
                  let cls = 'rs-cell'
                  if (c.length > 2) cls += ' sm'
                  if (chosen !== null) {
                    if (i === chosen) cls += ' chosen'
                    else if (i % 9 !== k) cls += ' dim'
                    else if ((order.get(i) ?? 99) < step) cls += ' lit'
                    else cls += ' path'
                  }
                  return (
                    <button
                      key={i}
                      type="button"
                      className={cls}
                      data-i={i}
                      disabled={chosen !== null}
                      tabIndex={chosen !== null ? -1 : i === focusIdx ? 0 : -1}
                      aria-label={`${ui.cell} ${i + 1}: ${c}`}
                      onClick={(e) => place(i, e.detail === 0 ? 'key' : 'touch')}
                    >
                      {show(c)}
                    </button>
                  )
                })}
              </div>
              {chosen !== null && (
                <div className="rs-over">
                  <svg className="rs-thread" viewBox="0 0 15 15" preserveAspectRatio="none" aria-hidden="true">
                    <polyline points={threadPts} vectorEffect="non-scaling-stroke" />
                  </svg>
                  <span className="rs-ripple" style={cellPos(chosen)} aria-hidden="true" />
                  <span className="rs-bead-head" style={beadStyle} aria-hidden="true" />
                </div>
              )}
            </div>

            <div className="rs-below">
              {chosen === null ? (
                <div className="rs-pickhelp">
                  <h2 className="rs-pick-title" ref={headRef} tabIndex={-1}>
                    {ui.pickTitle}
                  </h2>
                  <button type="button" className="rs-ghost" onClick={() => place(Math.floor(Math.random() * 225), 'random')}>
                    {ui.pickRandom}
                  </button>
                </div>
              ) : (
                <div className={`rs-tray${complete ? ' done' : ''}`} ref={trayRef} lang="hi" aria-live="polite" aria-label={complete ? ui.countDone : ui.counting}>
                  {layout.map((row, r) => (
                    <div key={r} className="rs-tray-row">
                      {row.map((word, w) => (
                        <span key={w} className="rs-word">
                          {word.map((s) => (
                            <span key={s} data-s={s} className={`rs-slot${filled.has(s) ? ' f' : ''}`} style={{ '--d': s * 28 } as CSSProperties}>
                              {filled.has(s) ? show(verseSyll[s]) : ''}
                            </span>
                          ))}
                        </span>
                      ))}
                    </div>
                  ))}
                  <p className="rs-tray-note">{complete ? ui.countDone : ui.counting}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {screen === 'uttar' && line && (
          <div className="rs-screen rs-uttar">
            <h2 className="rs-lead" ref={headRef} tabIndex={-1}>
              {ui.verdictLead}
            </h2>
            <div className={`rs-seal-wrap ${line.sign}`}>
              {line.sign === 'shubh' && (
                <div className="rs-petals" aria-hidden="true">
                  {PETALS.map((p, i) => (
                    <i key={i} style={p} />
                  ))}
                </div>
              )}
              <span className="rs-shock" aria-hidden="true" />
              <div className="rs-seal" lang={locale}>
                <span className="rs-seal-word">{line.signWord}</span>
              </div>
            </div>
            <p className="rs-directive">{directiveCap}</p>
            <p className={`rs-chaupai${script === 'iast' ? ' iast' : ''}`} lang={script === 'iast' ? 'hi-Latn' : 'hi'}>
              {(script === 'iast' ? line.iast : line.deva).map((half, r) => (
                <span key={r} className="rs-half">
                  {half.split(' ').map((w, i) => (
                    <span key={i} className="rs-w" style={{ '--i': r * 6 + i } as CSSProperties}>
                      {w}{' '}
                    </span>
                  ))}
                </span>
              ))}
            </p>
            <p className="rs-src">
              {ui.srcPrefix} · {line.source}
              <button type="button" className="rs-scr" aria-pressed={script === 'iast'} onClick={() => {
                  trackEvent('Shalaka Script Toggled', { ...base, to: script === 'deva' ? 'iast' : 'deva' })
                  setScript((s) => (s === 'deva' ? 'iast' : 'deva'))
                }}>
                {script === 'deva' ? 'ABC' : 'अआ'}
              </button>
            </p>
            <p className="rs-mean">{line.meaning}</p>
            {expert && <p className="rs-expert">{ui.expertNote}</p>}

            <div className="rs-acts">
              <button type="button" className="rs-cta gold" ref={shareRef} onClick={onShare}>
                {ui.shareBtn}
              </button>
              <div className="rs-acts-row">
                <a
                  className="rs-ghost"
                  href={waHref}
                  target="_blank"
                  rel="noopener"
                  onClick={() => trackEventBeacon('Shalaka Shared', { ...base, channel: 'whatsapp', k: line.k })}
                >
                  {ui.waBtn}
                </a>
                <button type="button" className="rs-ghost" onClick={onAgain}>
                  {left > 0 ? (
                    <>
                      {ui.again} <small>{!signedIn && freeCount >= FREE_ATTEMPTS ? ui.againGated : `${left} ${ui.left}`}</small>
                    </>
                  ) : (
                    ui.tomorrow
                  )}
                </button>
              </div>
            </div>

            <div className="rs-next-wrap">
              <RsNext locale={locale} pageKey={pageKey} placement="answer" copy={nextCopy} n={line.n} k={line.k} situation={askedSit} signedIn={signedIn} />
            </div>

            <div className="rs-deeper">
              <div className="rs-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  id="rs-tab-you"
                  aria-selected={tab === 'you'}
                  aria-controls="rs-tabpanel"
                  className="rs-tab"
                  onClick={() => setTab('you')}
                >
                  {ui.tabYou}
                </button>
                <button
                  type="button"
                  role="tab"
                  id="rs-tab-scene"
                  aria-selected={tab === 'scene'}
                  aria-controls="rs-tabpanel"
                  className="rs-tab"
                  onClick={() => {
                    if (tab !== 'scene') trackEvent('Prasang Opened', { ...base, k: line.k })
                    setTab('scene')
                  }}
                >
                  {ui.tabScene}
                </button>
              </div>
              <p className="rs-tabpanel" id="rs-tabpanel" role="tabpanel" aria-labelledby={tab === 'you' ? 'rs-tab-you' : 'rs-tab-scene'} key={tab}>
                {tab === 'you' ? line.forYou : line.scene}
              </p>
              {mala}
              <div className="rs-links">
                <a href={lineHref(line.slug)} hrefLang="hi" data-mp-location="rs_answer_line" onClick={() => trackEventBeacon('Shalaka Line Opened', { ...base, k: line.k })}>
                  {ui.readLine}
                </a>
              </div>
            </div>
          </div>
        )}

        {screen === 'done' && (
          <div className="rs-screen rs-done">
            <div className="rs-lamp-wrap" aria-hidden="true">
              <div className="rs-halo" />
              <div className="rs-flame" />
              <div className="rs-lamp" />
            </div>
            <h2 className="rs-big" ref={headRef} tabIndex={-1}>
              {ui.doneTitle}
            </h2>
            <p className="rs-sub">{ui.doneSub}</p>
            <p className="rs-fine">
              {ui.resetAt} <b>{resetText}</b>
            </p>
            {mala}
            <div className="rs-next-wrap">
              <RsNext locale={locale} pageKey={pageKey} placement="done" copy={nextCopy} n={line?.n ?? null} k={line?.k ?? null} situation={askedSit} signedIn={signedIn} />
            </div>
            {line && (
              <button type="button" className="rs-ghost" onClick={() => setScreen('uttar')}>
                {ui.seeMala}
              </button>
            )}
          </div>
        )}
      </div>

      {modal && line && (
        <div className="rs-modal" role="dialog" aria-modal="true" aria-label={ui.cardTitle} onClick={(e) => e.target === e.currentTarget && setModal(false)}>
          <div className="rs-modal-box">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="rs-card-img" src={cardUrl || cardSrc} alt={ui.cardAlt} width={1080} height={1920} />
            <div className="rs-acts">
              <a
                className="rs-cta gold"
                href={cardUrl || cardSave}
                download={`ram-shalaka-${line.slug}.png`}
                onClick={() => trackEventBeacon('Shalaka Shared', { ...base, channel: 'save_image', k: line.k })}
              >
                {ui.saveImage}
              </a>
              <div className="rs-acts-row">
                <button type="button" className="rs-ghost" onClick={onCopy} aria-live="polite">
                  {copied ? ui.copied : ui.copyBtn}
                </button>
                <button
                  type="button"
                  className="rs-ghost"
                  ref={closeRef}
                  onClick={() => {
                    setModal(false)
                    shareRef.current?.focus()
                  }}
                >
                  {ui.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function GoogleMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  )
}
