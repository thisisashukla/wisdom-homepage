'use client'

import { useEffect, useRef, useState } from 'react'
import { BudGlyph, WatchGlyph } from './Devices'

const RAW = '0.0312   −0.118   pitch 6.1°   0.0044   74 bpm   −0.006   roll 1.2°   0.0191   73 bpm   0.0037   71 bpm   −0.021   '
const LINES = ['Your hands went quiet.', 'Your head stopped searching.', 'Your heart came down from 74 to 68.']
const SENTENCE = LINES.join(' ')
const SEP = '      ·      '

/** Restless wave that calms as it reaches the pill: amplitude falls to zero. */
function restlessPath(x0: number, x1: number, cy: number, amp: number) {
  const n = Math.max(6, Math.round((x1 - x0) / 70))
  const pts: [number, number][] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const a = amp * Math.pow(1 - t, 1.6)
    pts.push([x0 + (x1 - x0) * t, cy + a * Math.sin(i * 2.1) * (i % 3 === 0 ? 1.15 : 0.85)])
  }
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1]
    const [x, y] = pts[i]
    const mx = (px + x) / 2
    d += ` C${mx},${py} ${mx},${y} ${x},${y}`
  }
  return d
}

/**
 * The hero's signature motion: raw sensor numbers drift in from the left on a
 * restless line, pass through the AirPods + Watch pill, and leave on a calm line as
 * plain sentences about the sit. Text moves with requestAnimationFrame along SVG
 * textPaths; reduced motion shows it standing still.
 */
export default function Ribbon() {
  const wrap = useRef<HTMLDivElement>(null)
  const rawRef = useRef<SVGTextPathElement>(null)
  const sentRef = useRef<SVGTextPathElement>(null)
  const rawUnit = useRef<SVGTextElement>(null)
  const sentUnit = useRef<SVGTextElement>(null)
  const [w, setW] = useState(1080)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const small = w < 640
  const h = small ? 132 : 180
  const cy = h / 2
  const px = Math.round(w * (small ? 0.3 : 0.38))
  const pw = small ? 44 : 62
  const left = restlessPath(-20, px - pw, cy, small ? 14 : 22)
  const right = `M${px + pw},${cy} C${px + pw + (w - px) * 0.35},${cy - 26} ${px + pw + (w - px) * 0.65},${cy + 22} ${w + 40},${cy - 8}`

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let last = 0
    let off = 0
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    if (wrap.current) io.observe(wrap.current)
    const speed = small ? 26 : 38
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      if (!visible) {
        last = t
        return
      }
      const dt = last ? Math.min(64, t - last) : 16
      last = t
      off += (speed * dt) / 1000
      const ru = rawUnit.current?.getComputedTextLength() || 600
      const su = sentUnit.current?.getComputedTextLength() || 900
      rawRef.current?.setAttribute('startOffset', String((off % ru) - ru))
      sentRef.current?.setAttribute('startOffset', String((off % su) - su))
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [small])

  return (
    <div className="dh-ribbon" ref={wrap}>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={SENTENCE}>
        <defs>
          <path id="dhRawPath" d={left} />
          <path id="dhSentPath" d={right} />
          <linearGradient id="dhRawFade" x1="0" x2="1">
            <stop offset="0" stopColor="#978776" stopOpacity="0" />
            <stop offset=".25" stopColor="#978776" stopOpacity=".9" />
            <stop offset="1" stopColor="#BCAC9B" stopOpacity="1" />
          </linearGradient>
        </defs>
        <use href="#dhRawPath" className="dh-ribbon__line" />
        <use href="#dhSentPath" className="dh-ribbon__line dh-ribbon__line--calm" />
        <text className="dh-ribbon__raw" fill="url(#dhRawFade)" dy="-9">
          <textPath href="#dhRawPath" ref={rawRef} startOffset="0">
            {RAW.repeat(5)}
          </textPath>
        </text>
        <text className="dh-ribbon__sent" dy="-12">
          <textPath href="#dhSentPath" ref={sentRef} startOffset="0">
            {(SENTENCE + SEP).repeat(3)}
          </textPath>
        </text>
        {/* hidden one-unit copies, measured for a seamless loop */}
        <text ref={rawUnit} className="dh-ribbon__raw" opacity="0" x="-9999" y="0">
          {RAW}
        </text>
        <text ref={sentUnit} className="dh-ribbon__sent" opacity="0" x="-9999" y="0">
          {SENTENCE + SEP}
        </text>
      </svg>
      <div className="dh-ribbon__pill" style={{ left: px, top: cy }} aria-hidden="true">
        <BudGlyph size={small ? 16 : 20} />
        <span className="dh-ribbon__dot" />
        <WatchGlyph size={small ? 16 : 20} />
      </div>
    </div>
  )
}
