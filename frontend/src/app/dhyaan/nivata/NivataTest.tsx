'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import Flame from '../_components/Flame'
import { Title } from '../_components/Words'
import WaitlistForm from '../_components/WaitlistForm'
import { DHYAAN_HOST } from '../_lib/site'

/**
 * The Nivāta test, web edition: 60 seconds of holding the phone in your palms.
 * Order is deliberate (same as the app): nothing to read during the minute, the felt
 * report (anubhava) before any number, then a descriptive card. No score.
 *
 * Per second we keep two features from DeviceMotion: mean rotation rate (deg/s) and
 * mean linear acceleration (m/s²). A second is "still" when both are under a hand-held
 * threshold. A near-zero noise floor means the phone was lying on something.
 */
type Phase = 'intro' | 'desktop' | 'settle' | 'sit' | 'feel' | 'result' | 'denied'
type Sec = { rot: number; acc: number }
type Result = { still: number; longest: number; settledAt: number | null; moves: number; surface: boolean; seconds: Sec[]; feel: string }

const DURATION = 60
const ROT_STILL = 4 // deg/s
const ACC_STILL = 0.08 // m/s²
const SURFACE_ROT = 0.12

type MotionCtor = typeof DeviceMotionEvent & { requestPermission?: () => Promise<'granted' | 'denied'> }

function bell(ctx: AudioContext | null) {
  if (!ctx) return
  const now = ctx.currentTime
  for (const [f, g] of [[528, 0.22], [1056, 0.06], [792, 0.05]] as const) {
    const o = ctx.createOscillator()
    const v = ctx.createGain()
    o.frequency.value = f
    v.gain.setValueAtTime(0, now)
    v.gain.linearRampToValueAtTime(g, now + 0.02)
    v.gain.exponentialRampToValueAtTime(0.0001, now + 4)
    o.connect(v).connect(ctx.destination)
    o.start(now)
    o.stop(now + 4.1)
  }
}

function analyse(seconds: Sec[], feel: string): Result {
  const stillArr = seconds.map((s) => s.rot < ROT_STILL && s.acc < ACC_STILL)
  let longest = 0, run = 0, settledAt: number | null = null, moves = 0
  stillArr.forEach((st, i) => {
    run = st ? run + 1 : 0
    longest = Math.max(longest, run)
    if (settledAt === null && run === 10) settledAt = i - 9
    if (i > 0 && !st && stillArr[i - 1]) moves++
  })
  const surface = seconds.length > 20 && seconds.every((s) => s.rot < SURFACE_ROT)
  return { still: stillArr.filter(Boolean).length, longest, settledAt, moves, surface, seconds, feel }
}

const mmss = (s: number) => `0:${String(s).padStart(2, '0')}`

function drawCard(canvas: HTMLCanvasElement, r: Result) {
  const W = 1080, H = 1350
  canvas.width = W
  canvas.height = H
  const c = canvas.getContext('2d')!
  c.fillStyle = '#0F0B09'
  c.fillRect(0, 0, W, H)
  const glow = c.createRadialGradient(W / 2, 520, 10, W / 2, 520, 520)
  glow.addColorStop(0, 'rgba(232,121,42,0.30)')
  glow.addColorStop(1, 'rgba(232,121,42,0)')
  c.fillStyle = glow
  c.fillRect(0, 0, W, H)

  // flame: lean and width follow how unsettled the minute was
  const unsteady = 1 - r.still / DURATION
  const lean = unsteady * 46
  const cx = W / 2, base = 640
  const fire = c.createLinearGradient(0, base, 0, base - 300)
  fire.addColorStop(0, '#E8792A')
  fire.addColorStop(0.55, '#F4A24B')
  fire.addColorStop(1, '#FFE3B0')
  c.fillStyle = fire
  c.beginPath()
  c.moveTo(cx + lean, base - 300)
  c.bezierCurveTo(cx + 70 + lean * 0.6, base - 170, cx + 80, base - 60, cx + 30, base - 8)
  c.bezierCurveTo(cx + 10, base + 10, cx - 30, base + 6, cx - 42, base - 22)
  c.bezierCurveTo(cx - 70, base - 90, cx - 40 + lean * 0.4, base - 190, cx + lean, base - 300)
  c.fill()
  c.fillStyle = 'rgba(255,244,221,0.85)'
  c.beginPath()
  c.ellipse(cx + lean * 0.15, base - 70, 20, 52, 0, 0, Math.PI * 2)
  c.fill()
  // diya
  c.fillStyle = '#7A3B1F'
  c.beginPath()
  c.ellipse(cx, base + 18, 250, 34, 0, 0, Math.PI * 2)
  c.fill()
  c.fillStyle = '#B8643A'
  c.beginPath()
  c.moveTo(cx - 250, base + 18)
  c.bezierCurveTo(cx - 200, base + 150, cx + 200, base + 150, cx + 250, base + 18)
  c.bezierCurveTo(cx + 160, base + 52, cx - 160, base + 52, cx - 250, base + 18)
  c.fill()

  c.textAlign = 'center'
  c.fillStyle = '#F3EADF'
  const head = `Still for ${r.still} of 60 seconds`
  let size = 92
  do {
    c.font = `600 ${size}px -apple-system, "Helvetica Neue", Arial, sans-serif`
    size -= 2
  } while (c.measureText(head).width > W - 140 && size > 40)
  c.fillText(head, W / 2, 900)
  c.fillStyle = '#BCAC9B'
  c.font = '400 44px -apple-system, "Helvetica Neue", Arial, sans-serif'
  const line2 = r.settledAt !== null ? `Settled at ${mmss(r.settledAt)} · longest steady stretch ${r.longest}s` : `Longest steady stretch ${r.longest}s`
  c.fillText(line2, W / 2, 975)

  // movement strip
  const sx = 140, sw = W - 280, sy = 1040, sh = 70
  c.strokeStyle = '#2E2520'
  c.lineWidth = 2
  c.beginPath(); c.moveTo(sx, sy + sh); c.lineTo(sx + sw, sy + sh); c.stroke()
  c.strokeStyle = '#E8792A'
  c.lineWidth = 5
  c.lineJoin = 'round'
  c.beginPath()
  const vals = r.seconds.map((s) => Math.min(1, s.rot / 25))
  vals.forEach((v, i) => {
    const x = sx + (i / Math.max(1, vals.length - 1)) * sw
    const y = sy + sh - v * sh
    if (i === 0) c.moveTo(x, y)
    else c.lineTo(x, y)
  })
  c.stroke()

  c.fillStyle = '#F3EADF'
  c.font = 'italic 400 40px Georgia, "New York", serif'
  c.fillText('“As a lamp in a windless place does not flicker.”', W / 2, 1185)
  c.fillStyle = '#978776'
  c.font = '400 32px -apple-system, "Helvetica Neue", Arial, sans-serif'
  c.fillText(`Bhagavad Gita 6.19  ·  Be the lamp: ${DHYAAN_HOST}/n`, W / 2, 1250)
}

export default function NivataTest() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [count, setCount] = useState(3)
  const [elapsed, setElapsed] = useState(0)
  const [result, setResult] = useState<Result | null>(null)
  const [cardUrl, setCardUrl] = useState<string | null>(null)
  const samples = useRef<{ rot: number; acc: number }[]>([])
  const seconds = useRef<Sec[]>([])
  const audio = useRef<AudioContext | null>(null)
  const timers = useRef<number[]>([])
  const canvas = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (!touch || typeof DeviceMotionEvent === 'undefined') setPhase('desktop')
    const t = timers.current
    return () => t.forEach((id) => window.clearInterval(id))
  }, [])

  const onMotion = useCallback((e: DeviceMotionEvent) => {
    const r = e.rotationRate
    const a = e.acceleration
    const rot = r ? Math.hypot(r.alpha ?? 0, r.beta ?? 0, r.gamma ?? 0) : 0
    const acc = a ? Math.hypot(a.x ?? 0, a.y ?? 0, a.z ?? 0) : 0
    samples.current.push({ rot, acc })
  }, [])

  const finish = useCallback((feel: string) => {
    const r = analyse(seconds.current, feel)
    setResult(r)
    setPhase('result')
    trackEvent(EVENTS.NivataTestCompleted, { still: r.still, longest: r.longest, settled_at: r.settledAt, surface: r.surface, feel })
  }, [])

  useEffect(() => {
    if (phase !== 'result' || !result || !canvas.current || result.surface) return
    drawCard(canvas.current, result)
    setCardUrl(canvas.current.toDataURL('image/png'))
  }, [phase, result])

  async function begin() {
    try {
      const Ctor = DeviceMotionEvent as MotionCtor
      if (typeof Ctor.requestPermission === 'function') {
        const p = await Ctor.requestPermission()
        if (p !== 'granted') throw new Error('denied')
      }
    } catch {
      setPhase('denied')
      trackEvent(EVENTS.NivataTestFailed, { error: 'permission_denied' })
      return
    }
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audio.current = new AC()
    } catch {
      audio.current = null
    }
    trackEvent(EVENTS.NivataTestStarted)
    window.addEventListener('devicemotion', onMotion)
    setPhase('settle')
    setCount(3)
    let n = 3
    const settle = window.setInterval(() => {
      n -= 1
      setCount(n)
      if (n > 0) return
      window.clearInterval(settle)
      bell(audio.current)
      samples.current = []
      seconds.current = []
      setElapsed(0)
      setPhase('sit')
      let s = 0
      const tick = window.setInterval(() => {
        const win = samples.current
        samples.current = []
        const mean = (k: 'rot' | 'acc') => (win.length ? win.reduce((t, x) => t + x[k], 0) / win.length : 99)
        seconds.current.push({ rot: mean('rot'), acc: mean('acc') })
        s += 1
        setElapsed(s)
        if (s >= DURATION) {
          window.clearInterval(tick)
          window.removeEventListener('devicemotion', onMotion)
          bell(audio.current)
          if (navigator.vibrate) navigator.vibrate(200)
          setPhase('feel')
        }
      }, 1000)
      timers.current.push(tick)
    }, 1000)
    timers.current.push(settle)
  }

  async function share() {
    if (!cardUrl) return
    try {
      const blob = await (await fetch(cardUrl)).blob()
      const file = new File([blob], 'dhyaan-nivata.png', { type: 'image/png' })
      const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean }
      if (nav.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: `Can you be a lamp in a windless place for 60 seconds? https://${DHYAAN_HOST}/n` })
        trackEvent(EVENTS.NivataCardShared, { channel: 'share_sheet' })
        return
      }
    } catch {
      /* cancelled or unsupported: fall through to save */
    }
    save()
  }

  function save() {
    if (!cardUrl) return
    const a = document.createElement('a')
    a.href = cardUrl
    a.download = 'dhyaan-nivata.png'
    a.click()
    trackEvent(EVENTS.NivataCardSaved)
  }

  if (phase === 'desktop')
    return (
      <div className="dh-test">
        <Flame size={110} />
        <Title soft="Open this" ink="on your phone." className="dh-test__title" />
        <p className="dh-muted" style={{ maxWidth: 480, margin: '16px auto 0' }}>
          The test reads your phone’s motion sensors while you hold it in your palms. On your phone, go to <b style={{ color: 'var(--ink)' }}>{DHYAAN_HOST}/n</b>
        </p>
        <div style={{ maxWidth: 520, width: '100%', marginTop: 34, textAlign: 'left' }}>
          <WaitlistForm source="nivata_desktop" compact />
        </div>
      </div>
    )

  if (phase === 'intro' || phase === 'denied')
    return (
      <div className="dh-test">
        <Flame size={120} />
        <p className="dh-pill">The Nivāta test</p>
        <Title soft="Can you be a lamp" ink="in a windless place for 60 seconds?" className="dh-test__title" />
        <p className="dh-muted" style={{ maxWidth: 480, margin: '18px auto 0' }}>
          Sit down. Hold your phone in both palms, resting on your lap. When the bell rings, close your eyes and stay as still as you can until the second bell.
        </p>
        {phase === 'denied' && (
          <p className="dh-form__err" style={{ marginTop: 16 }}>
            Motion access was blocked. On iPhone, reload the page and tap Allow when asked.
          </p>
        )}
        <div style={{ marginTop: 28 }}>
          <button className="dh-btn" onClick={begin}>Light the lamp · 60 seconds</button>
        </div>
        <p className="dh-small dh-muted" style={{ marginTop: 16, maxWidth: 420 }}>Nothing leaves your phone. Turn the sound on for the bell.</p>
      </div>
    )

  if (phase === 'settle')
    return (
      <div className="dh-test">
        <Flame size={120} state="steady" />
        <p className="dh-test__big">{count}</p>
        <p className="dh-muted">Settle your hands. Eyes closed at the bell.</p>
      </div>
    )

  if (phase === 'sit')
    return (
      <div className="dh-test dh-test__dim">
        <Flame size={120} state="steady" />
        <p className="dh-test__timer">{mmss(Math.max(0, DURATION - elapsed)).replace('0:60', '1:00')}</p>
      </div>
    )

  if (phase === 'feel')
    return (
      <div className="dh-test">
        <Flame size={100} />
        <h1 className="dh-title dh-test__title">How did that feel?</h1>
        <p className="dh-muted" style={{ marginTop: 10 }}>Your answer first. Then what the phone saw.</p>
        <div className="dh-test__choices">
          {['Restless', 'Somewhere in between', 'Still'].map((f) => (
            <button key={f} className="dh-btn dh-btn--ghost" onClick={() => finish(f)}>{f}</button>
          ))}
        </div>
      </div>
    )

  // result
  const r = result!
  return (
    <div className="dh-test">
      {r.surface ? (
        <>
          <Flame size={100} state="unlit" />
          <h1 className="dh-title dh-test__title">Your phone was resting on something</h1>
          <p className="dh-muted" style={{ maxWidth: 460, margin: '14px auto 24px' }}>Hold it in your palms and it can feel you. The minute still counts as a sit.</p>
          <button className="dh-btn" onClick={() => { setResult(null); setPhase('intro') }}>Try again</button>
        </>
      ) : (
        <>
          <p className="dh-muted">You said: “{r.feel}”</p>
          <p className="dh-test__big" style={{ marginTop: 8 }}>{r.still}<span style={{ fontSize: '0.4em', color: 'var(--ink3)' }}> / 60 s still</span></p>
          <p className="dh-muted" style={{ marginTop: 10, maxWidth: 440 }}>
            {r.settledAt !== null ? `You settled at ${mmss(r.settledAt)}` : 'You never quite settled, and that’s a real first sit too'}
            {` · longest steady stretch ${r.longest}s · moved ${r.moves} ${r.moves === 1 ? 'time' : 'times'}`}
          </p>
          <canvas ref={canvas} style={{ display: 'none' }} />
          {cardUrl && <img className="dh-test__card" src={cardUrl} alt={`Dhyaan Nivāta card: still for ${r.still} of 60 seconds`} />}
          <div className="dh-test__actions">
            <button className="dh-btn" onClick={share}>Share your flame</button>
            <button className="dh-btn dh-btn--ghost" onClick={save}>Save image</button>
            <button className="dh-btn dh-btn--ghost" onClick={() => { setResult(null); setCardUrl(null); setPhase('intro') }}>Again</button>
          </div>
          <p className="dh-small dh-muted" style={{ maxWidth: 440, marginBottom: 22 }}>
            This is one minute from one sensor. The app adds your heart rate from Apple Watch and head stillness from AirPods, and never turns it into a score.
          </p>
          <div style={{ maxWidth: 520, width: '100%', textAlign: 'left' }}>
            <WaitlistForm source="nivata_result" compact />
          </div>
        </>
      )}
    </div>
  )
}
