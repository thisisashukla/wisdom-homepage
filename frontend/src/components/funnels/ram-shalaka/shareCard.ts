/**
 * The Ram Shalaka answer card, drawn on the device for ShareActions (`image.render`):
 * status 1080 x 1920 (Status / Stories) or post 1080 x 1350 (feed, 4:5).
 * House ground (maroon night, a faint gold राम pattern), the verdict seal, the chaupai and an
 * invitation to ask. Colours are the house tokens (styles/tokens.css). The question is never drawn.
 */
import type { Locale } from '@/lib/locale'
import type { ShareFormat } from '@/components/site'
import type { RsRitualLine, RsSign } from '@/lib/funnels/ram-shalaka/core'

export type CardFonts = { display: string; scripture: string; sans: string }
export type CardCopy = { kicker: string; lead: string; directive: string; source: string; invite: string; host: string }

/* token values: --maroon-mid, --maroon, --bg, --gold, --gold-light, --gold-pale, --gold-border, --text, --sindoor, --maroon-deep */
const C = {
  maroonMid: '#5c1a1a',
  maroon: '#3d0c0c',
  bg: '#120505',
  deep: '#1a0606',
  gold: '#c8881e',
  goldLight: '#f5c96a',
  goldPale: '#fdf3dc',
  goldBorder: '#e8c97a',
  text: '#f5e8cc',
  sindoor: '#e0884f',
}

const SEAL: Record<RsSign, { fill: [string, string, string]; ink: string; glow: string; ring?: string }> = {
  shubh: { fill: [C.goldPale, C.goldLight, C.gold], ink: C.deep, glow: 'rgba(200, 136, 30, 0.55)' },
  sanshay: { fill: [C.goldPale, C.text, C.goldBorder], ink: C.maroon, glow: 'rgba(245, 232, 204, 0.3)' },
  ashubh: { fill: [C.maroonMid, C.maroon, C.deep], ink: C.sindoor, glow: 'rgba(224, 136, 79, 0.3)', ring: C.sindoor },
}

type Layout = { H: number; kicker: number; lead: number; cy: number; R: number; directive: number; chaupai: number; cpx: number; meaningPx: number; meaningGap: number; boxY: number; boxH: number }

const LAYOUT: Record<ShareFormat, Layout> = {
  status: { H: 1920, kicker: 190, lead: 262, cy: 610, R: 250, directive: 1010, chaupai: 1190, cpx: 80, meaningPx: 44, meaningGap: 66, boxY: 1680, boxH: 150 },
  post: { H: 1350, kicker: 112, lead: 170, cy: 382, R: 160, directive: 640, chaupai: 770, cpx: 64, meaningPx: 38, meaningGap: 54, boxY: 1180, boxH: 120 },
}

/** The faces the page uses, resolved from the tokens so the card matches the screen. */
export function cardFonts(locale: Locale): CardFonts {
  const cs = getComputedStyle(document.documentElement)
  const v = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback
  const scripture = v('--font-awadhi', 'serif')
  return { display: locale === 'hi' ? scripture : v('--font-display', 'Georgia, serif'), scripture, sans: v('--font-ui', 'sans-serif') }
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

export async function drawCard(line: RsRitualLine, copy: CardCopy, fonts: CardFonts, locale: Locale, format: ShareFormat = 'status'): Promise<Blob> {
  const L = LAYOUT[format]
  const W = 1080
  const H = L.H
  const display = (px: number) => `${locale === 'hi' ? 400 : 600} ${px}px ${fonts.display}`
  const scripture = (px: number) => `400 ${px}px ${fonts.scripture}`
  const sans = (px: number, w = 500) => `${w} ${px}px ${fonts.sans}`
  try {
    await Promise.all([
      document.fonts.load(display(120), line.signWord + copy.directive + copy.invite),
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

  // maroon night ground
  const bg = ctx.createRadialGradient(W / 2, L.cy - 80, 60, W / 2, L.cy, H * 0.7)
  bg.addColorStop(0, C.maroonMid)
  bg.addColorStop(0.45, C.maroon)
  bg.addColorStop(1, C.bg)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // the Ramnami cloth, as a faint gold pattern
  ctx.save()
  ctx.translate(W / 2, H / 2)
  ctx.rotate((-9 * Math.PI) / 180)
  ctx.font = scripture(54)
  ctx.textAlign = 'left'
  for (let r = -22; r < 22; r++) {
    ctx.fillStyle = r % 2 ? 'rgba(200, 136, 30, 0.045)' : 'rgba(200, 136, 30, 0.075)'
    const x0 = -1500 + (r % 2 ? -40 : 0)
    for (let i = 0; i < 18; i++) ctx.fillText('राम', x0 + i * 170, r * 92)
  }
  ctx.restore()
  ctx.textAlign = 'center'

  // thin gold frame
  ctx.strokeStyle = 'rgba(200, 136, 30, 0.35)'
  ctx.lineWidth = 2
  ctx.strokeRect(36, 36, W - 72, H - 72)

  // kicker and lead
  ctx.fillStyle = 'rgba(245, 232, 204, 0.82)'
  ctx.font = locale === 'hi' ? scripture(format === 'post' ? 46 : 52) : sans(format === 'post' ? 34 : 40, 600)
  ctx.fillText(copy.kicker, W / 2, L.kicker)
  ctx.fillStyle = C.goldLight
  ctx.font = locale === 'hi' ? scripture(format === 'post' ? 38 : 44) : sans(format === 'post' ? 28 : 34, 600)
  ctx.fillText(copy.lead, W / 2, L.lead)

  // seal
  const s = SEAL[line.sign]
  const cx = W / 2
  const cy = L.cy
  const R = L.R
  ctx.save()
  ctx.shadowColor = s.glow
  ctx.shadowBlur = 120
  const g = ctx.createRadialGradient(cx - R * 0.32, cy - R * 0.4, 20, cx, cy, R)
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
  if (s.ring) {
    ctx.strokeStyle = s.ring
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(0, 0, R - 2, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.strokeStyle = s.ink
  ctx.globalAlpha = 0.55
  ctx.lineWidth = 4
  ctx.setLineDash([14, 10])
  ctx.beginPath()
  ctx.arc(0, 0, R * 0.91, 0, Math.PI * 2)
  ctx.stroke()
  ctx.setLineDash([])
  ctx.globalAlpha = 0.3
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(0, 0, R * 0.855, 0, Math.PI * 2)
  ctx.stroke()
  ctx.globalAlpha = 1
  ctx.fillStyle = s.ink
  ctx.textBaseline = 'middle'
  const sw = fit(ctx, [line.signWord], display, Math.round(R * (locale === 'hi' ? 0.6 : 0.34)), 40, R * 1.44)
  ctx.font = display(sw)
  ctx.fillText(line.signWord, 0, locale === 'hi' ? sw * 0.08 : 4)
  ctx.restore()
  ctx.textBaseline = 'alphabetic'

  // directive
  ctx.fillStyle = C.text
  const dpx = fit(ctx, [copy.directive], display, format === 'post' ? 76 : 92, 44, 940)
  ctx.font = display(dpx)
  ctx.fillText(copy.directive, W / 2, L.directive)

  // chaupai
  ctx.fillStyle = C.goldLight
  ctx.shadowColor = 'rgba(200, 136, 30, 0.35)'
  ctx.shadowBlur = 30
  const cpx = fit(ctx, line.deva, scripture, L.cpx, 44, 960)
  ctx.font = scripture(cpx)
  ctx.fillText(line.deva[0], W / 2, L.chaupai)
  ctx.fillText(line.deva[1], W / 2, L.chaupai + cpx * 1.45)
  ctx.shadowBlur = 0
  ctx.fillStyle = 'rgba(245, 232, 204, 0.6)'
  ctx.font = sans(format === 'post' ? 28 : 32)
  const srcTop = L.chaupai + cpx * 1.45 + (format === 'post' ? 64 : 80)
  const srcLines = wrap(ctx, copy.source, 900).slice(0, 2)
  srcLines.forEach((l, i) => ctx.fillText(l, W / 2, srcTop + i * 44))

  // meaning, as many lines as fit above the invitation
  ctx.fillStyle = 'rgba(245, 232, 204, 0.92)'
  ctx.font = sans(L.meaningPx)
  const mTop = srcTop + srcLines.length * 44 + (format === 'post' ? 48 : 70)
  const room = Math.max(0, Math.floor((L.boxY - 50 - mTop) / L.meaningGap) + 1)
  wrap(ctx, line.meaning, 880)
    .slice(0, Math.min(5, room))
    .forEach((l, i) => ctx.fillText(l, W / 2, mTop + i * L.meaningGap))

  // invitation: the house gold button
  const bw = 860
  const bx = (W - bw) / 2
  const by = L.boxY
  const bh = L.boxH
  ctx.fillStyle = C.gold
  ctx.beginPath()
  if (typeof ctx.roundRect === 'function') ctx.roundRect(bx, by, bw, bh, 28)
  else ctx.rect(bx, by, bw, bh)
  ctx.fill()
  ctx.fillStyle = C.deep
  ctx.font = display(locale === 'hi' ? (format === 'post' ? 44 : 52) : format === 'post' ? 40 : 46)
  ctx.fillText(copy.invite, W / 2, by + bh * 0.45)
  ctx.font = sans(format === 'post' ? 28 : 32, 600)
  ctx.fillStyle = 'rgba(26, 6, 6, 0.78)'
  ctx.fillText(copy.host, W / 2, by + bh * 0.79)

  return new Promise((resolve, reject) => c.toBlob((b) => (b ? resolve(b) : reject(new Error('no blob'))), 'image/png'))
}
