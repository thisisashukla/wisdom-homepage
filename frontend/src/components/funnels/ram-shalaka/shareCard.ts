/**
 * The Ram Shalaka answer card, drawn on the device: 1080 × 1920 (Status / Stories size).
 * Night cloth, the verdict seal, the chaupai and an invitation to ask. The question is never drawn.
 */
import type { RsRitualLine, RsSign } from '@/lib/funnels/ram-shalaka/core'

export type CardFonts = { brush: string; scripture: string; sans: string }
export type CardCopy = { kicker: string; lead: string; directive: string; source: string; invite: string; host: string }

const W = 1080
const H = 1920

const SEAL: Record<RsSign, { fill: [string, string, string]; ink: string; glow: string }> = {
  shubh: { fill: ['#fff1b8', '#ffc93c', '#e69a14'], ink: '#7f0e12', glow: 'rgba(255, 190, 50, 0.55)' },
  sanshay: { fill: ['#fffaf0', '#fff3da', '#e9d3a8'], ink: '#3a0d0a', glow: 'rgba(255, 243, 218, 0.3)' },
  ashubh: { fill: ['#d8312f', '#b3171c', '#6b0a0e'], ink: '#fff3da', glow: 'rgba(179, 23, 28, 0.5)' },
}

function wrap(ctx: CanvasRenderingContext2D, text: string, max: number): string[] {
  const words = text.split(/\s+/)
  const out: string[] = []
  let cur = ''
  for (const w of words) {
    const t = cur ? `${cur} ${w}` : w
    if (ctx.measureText(t).width > max && cur) {
      out.push(cur)
      cur = w
    } else cur = t
  }
  if (cur) out.push(cur)
  return out
}

/** Largest size (down to min) at which every line fits in max width. */
function fit(ctx: CanvasRenderingContext2D, lines: string[], font: (px: number) => string, start: number, min: number, max: number): number {
  let px = start
  while (px > min) {
    ctx.font = font(px)
    if (lines.every((l) => ctx.measureText(l).width <= max)) break
    px -= 2
  }
  return px
}

export async function drawCard(line: RsRitualLine, copy: CardCopy, fonts: CardFonts, locale: 'hi' | 'en'): Promise<Blob> {
  const brush = (px: number) => `400 ${px}px ${fonts.brush}`
  const scripture = (px: number) => `400 ${px}px ${fonts.scripture}`
  const sans = (px: number, w = 500) => `${w} ${px}px ${fonts.sans}`
  try {
    await Promise.all([
      document.fonts.load(brush(120), line.signWord + copy.directive),
      document.fonts.load(scripture(72), line.deva.join(' ') + copy.kicker),
      document.fonts.load(sans(42), line.meaning),
    ])
  } catch {
    // fonts not ready: the canvas falls back to system faces
  }

  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const ctx = c.getContext('2d')
  if (!ctx) throw new Error('no canvas')
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'

  // night cloth
  const bg = ctx.createRadialGradient(W / 2, 520, 60, W / 2, 620, 1300)
  bg.addColorStop(0, '#5a160d')
  bg.addColorStop(0.6, '#240806')
  bg.addColorStop(1, '#1a0504')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)
  ctx.save()
  ctx.translate(W / 2, H / 2)
  ctx.rotate((-9 * Math.PI) / 180)
  ctx.font = scripture(54)
  ctx.textAlign = 'left'
  for (let r = -22; r < 22; r++) {
    ctx.fillStyle = r % 2 ? 'rgba(238, 138, 42, 0.06)' : 'rgba(238, 138, 42, 0.1)'
    const x0 = -1500 + (r % 2 ? -40 : 0)
    for (let i = 0; i < 18; i++) ctx.fillText('राम', x0 + i * 170, r * 92)
  }
  ctx.restore()
  ctx.textAlign = 'center'

  // kicker and lead
  ctx.fillStyle = 'rgba(255, 243, 218, 0.82)'
  ctx.font = locale === 'hi' ? scripture(52) : sans(40, 600)
  ctx.fillText(copy.kicker, W / 2, 190)
  ctx.fillStyle = 'rgba(255, 201, 60, 0.9)'
  ctx.font = locale === 'hi' ? scripture(44) : sans(34, 600)
  ctx.fillText(copy.lead, W / 2, 262)

  // seal
  const s = SEAL[line.sign]
  const cx = W / 2
  const cy = 610
  const R = 250
  ctx.save()
  ctx.shadowColor = s.glow
  ctx.shadowBlur = 120
  const g = ctx.createRadialGradient(cx - 80, cy - 100, 20, cx, cy, R)
  g.addColorStop(0, s.fill[0])
  g.addColorStop(0.45, s.fill[1])
  g.addColorStop(1, s.fill[2])
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(cx, cy, R, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate((-7 * Math.PI) / 180)
  ctx.strokeStyle = s.ink
  ctx.globalAlpha = 0.55
  ctx.lineWidth = 4
  ctx.setLineDash([14, 10])
  ctx.beginPath()
  ctx.arc(0, 0, R - 22, 0, Math.PI * 2)
  ctx.stroke()
  ctx.setLineDash([])
  ctx.globalAlpha = 0.3
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(0, 0, R - 36, 0, Math.PI * 2)
  ctx.stroke()
  ctx.globalAlpha = 1
  ctx.fillStyle = s.ink
  ctx.textBaseline = 'middle'
  const sw = fit(ctx, [line.signWord], brush, locale === 'hi' ? 150 : 86, 50, 360)
  ctx.font = brush(sw)
  ctx.fillText(line.signWord, 0, locale === 'hi' ? 10 : 4)
  ctx.restore()
  ctx.textBaseline = 'alphabetic'

  // directive
  ctx.fillStyle = '#fff3da'
  const dpx = fit(ctx, [copy.directive], brush, 92, 50, 940)
  ctx.font = brush(dpx)
  ctx.fillText(copy.directive, W / 2, 1010)

  // chaupai
  ctx.fillStyle = '#ffe2a3'
  ctx.shadowColor = 'rgba(255, 201, 60, 0.35)'
  ctx.shadowBlur = 30
  const cpx = fit(ctx, line.deva, scripture, 80, 48, 960)
  ctx.font = scripture(cpx)
  ctx.fillText(line.deva[0], W / 2, 1190)
  ctx.fillText(line.deva[1], W / 2, 1190 + cpx * 1.45)
  ctx.shadowBlur = 0
  ctx.fillStyle = 'rgba(255, 243, 218, 0.6)'
  ctx.font = sans(32)
  const srcLines = wrap(ctx, copy.source, 900)
  srcLines.slice(0, 2).forEach((l, i) => ctx.fillText(l, W / 2, 1190 + cpx * 1.45 + 80 + i * 44))

  // meaning
  ctx.fillStyle = 'rgba(255, 243, 218, 0.92)'
  ctx.font = sans(44)
  const mTop = 1190 + cpx * 1.45 + 80 + Math.min(2, srcLines.length) * 44 + 70
  wrap(ctx, line.meaning, 880)
    .slice(0, 5)
    .forEach((l, i) => ctx.fillText(l, W / 2, mTop + i * 66))

  // invitation
  const bw = 860
  const bh = 150
  const bx = (W - bw) / 2
  const by = 1680
  ctx.fillStyle = '#ee8a2a'
  ctx.beginPath()
  if (typeof ctx.roundRect === 'function') ctx.roundRect(bx, by, bw, bh, 40)
  else ctx.rect(bx, by, bw, bh)
  ctx.fill()
  ctx.fillStyle = '#3a0d0a'
  ctx.font = brush(locale === 'hi' ? 52 : 46)
  ctx.fillText(copy.invite, W / 2, by + 68)
  ctx.font = sans(32, 600)
  ctx.fillStyle = 'rgba(58, 13, 10, 0.8)'
  ctx.fillText(copy.host, W / 2, by + 118)

  return new Promise((resolve, reject) => c.toBlob((b) => (b ? resolve(b) : reject(new Error('no blob'))), 'image/png'))
}
