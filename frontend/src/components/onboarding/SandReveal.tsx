'use client'

import React, { useEffect, useRef, useState } from 'react'
import { SAND } from '@/lib/onboarding/profile'
import { haptic, reducedMotion } from './motion'

/**
 * Sand over the first verse (wisdom/app/components/onboarding/SandReveal.tsx).
 * A finger brushes it away; loose grains fly off along the stroke. After a
 * couple of strokes (or half the sand) the rest is carried off in one gust,
 * and the card comes forward: it rises from slightly sunken, a gold halo
 * blooms behind it, and its outline echoes outward three times, like a
 * temple bell after it is struck.
 */
const COLS = 10
const BRUSH = 1.7 // cells
const MIN_STROKE = 48
const GUST_AT = 0.5
const GRAIN_COLORS = ['#C9A25E', '#E2BE7C', '#F1D9A4', '#B98F4E']

function rand(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

export default function SandReveal({ children, onRevealed, strokes = 2 }: { children: React.ReactNode; onRevealed: () => void; strokes?: number }) {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const grains = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<'sand' | 'brushing' | 'gust' | 'revealed'>('sand')
  const done = useRef(false)
  const stroke = useRef<{ x: number; y: number; dist: number } | null>(null)
  const count = useRef(0)

  // Lay the dune once: a warm base, then ~90 overlapping clumps.
  useEffect(() => {
    const el = wrap.current
    const c = canvas.current
    if (!el || !c) return
    const draw = () => {
      const { width, height } = el.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      c.width = Math.round(width * dpr)
      c.height = Math.round(height * dpr)
      c.style.width = `${width}px`
      c.style.height = `${height}px`
      const g = c.getContext('2d')!
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
      const grad = g.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, '#EBD3A2')
      grad.addColorStop(1, '#D9B67A')
      g.fillStyle = grad
      g.fillRect(0, 0, width, height)
      const imgs = SAND.map((src) => {
        const im = new Image()
        im.src = src
        return im
      })
      const r = rand(7)
      const cell = width / COLS
      const rows = Math.ceil(height / cell) + 1
      const paint = () => {
        if (done.current) return
        for (let y = -1; y < rows; y++)
          for (let x = -1; x < COLS + 1; x++) {
            const im = imgs[Math.floor(r() * imgs.length)]
            const size = cell * (2 + r() * 0.6)
            g.save()
            g.translate((x + 0.5 + (r() - 0.5) * 0.6) * cell, (y + 0.5 + (r() - 0.5) * 0.6) * cell)
            g.rotate(r() * Math.PI * 2)
            g.globalAlpha = 0.9
            if (im.complete) g.drawImage(im, -size / 2, -size / 2, size, size)
            g.restore()
          }
      }
      Promise.all(imgs.map((im) => (im.complete ? Promise.resolve() : new Promise((res) => { im.onload = res; im.onerror = res })))).then(paint)
    }
    draw()
  }, [])

  const cleared = () => {
    const c = canvas.current!
    const g = c.getContext('2d')!
    const w = 24
    const h = Math.max(8, Math.round((c.height / c.width) * w))
    const tmp = document.createElement('canvas')
    tmp.width = w
    tmp.height = h
    const tg = tmp.getContext('2d')!
    tg.drawImage(c, 0, 0, w, h)
    const d = tg.getImageData(0, 0, w, h).data
    let clear = 0
    for (let i = 3; i < d.length; i += 4) if (d[i] < 40) clear++
    void g
    return clear / (w * h)
  }

  const gust = () => {
    if (done.current) return
    done.current = true
    haptic(30)
    setPhase('gust')
    setTimeout(() => { setPhase('revealed'); onRevealed() }, reducedMotion() ? 0 : 650)
  }

  const spray = (x: number, y: number, dx: number, dy: number) => {
    const host = grains.current
    if (!host || reducedMotion()) return
    const len = Math.hypot(dx, dy) || 1
    for (let i = 0; i < 3; i++) {
      const s = document.createElement('span')
      const size = 2 + Math.random() * 3
      s.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${GRAIN_COLORS[i % 4]}`
      host.appendChild(s)
      const dist = 30 + Math.random() * 50
      s.animate(
        [
          { transform: 'translate(0,0)', opacity: 1 },
          { transform: `translate(${(dx / len) * dist + (Math.random() - 0.5) * 20}px, ${(dy / len) * dist + (Math.random() - 0.5) * 20}px)`, opacity: 0 },
        ],
        { duration: 450 + Math.random() * 250, easing: 'cubic-bezier(0.33, 1, 0.68, 1)' },
      ).onfinish = () => s.remove()
    }
  }

  const brush = (x: number, y: number, px: number, py: number) => {
    const c = canvas.current!
    const g = c.getContext('2d')!
    const rect = c.getBoundingClientRect()
    const r = (rect.width / COLS) * BRUSH
    g.save()
    g.globalCompositeOperation = 'destination-out'
    g.lineCap = 'round'
    g.lineWidth = r * 2
    g.beginPath()
    g.moveTo(px, py)
    g.lineTo(x, y)
    g.stroke()
    g.restore()
    spray(x, y, x - px, y - py)
  }

  const local = (e: React.PointerEvent) => {
    const rect = canvas.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }
  const down = (e: React.PointerEvent) => {
    if (done.current) return
    if (reducedMotion()) { gust(); return }
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
    const p = local(e)
    stroke.current = { ...p, dist: 0 }
    setPhase('brushing')
    haptic(6)
    brush(p.x, p.y, p.x - 0.1, p.y)
  }
  const move = (e: React.PointerEvent) => {
    const s = stroke.current
    if (!s || done.current) return
    const p = local(e)
    brush(p.x, p.y, s.x, s.y)
    s.dist += Math.hypot(p.x - s.x, p.y - s.y)
    s.x = p.x
    s.y = p.y
    if (s.dist > 120 && Math.random() < 0.12 && cleared() >= GUST_AT) gust()
  }
  const up = () => {
    const s = stroke.current
    stroke.current = null
    if (!s || done.current) return
    if (s.dist >= MIN_STROKE) count.current++
    if (count.current >= strokes || cleared() >= GUST_AT) gust()
  }

  return (
    <div className={`ob-sand is-${phase}`} ref={wrap}>
      <div className="ob-sand-card">{children}</div>
      <span className="ob-echo" aria-hidden="true" />
      <span className="ob-echo is-2" aria-hidden="true" />
      <span className="ob-echo is-3" aria-hidden="true" />
      {phase !== 'revealed' && (
        <>
          <canvas
            ref={canvas}
            className="ob-sand-canvas"
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            aria-hidden="true"
          />
          <div className="ob-sand-grains" ref={grains} aria-hidden="true" />
          <button type="button" className="ob-sand-label" onClick={gust} tabIndex={0}>
            <b>Brush away the sand</b>
            <span>your verse is underneath</span>
          </button>
        </>
      )}
    </div>
  )
}
