/**
 * The app's motion tokens (wisdom/app/design/tokens/WMotion.ts) for the web.
 * Springs are solved once and written as CSS `linear()` easings, so a card
 * that settles on stiffness 120 / damping 15 in the app settles the same way
 * here. Browsers without `linear()` get a close cubic-bezier.
 */
export const D = { instant: 80, fast: 180, normal: 320, slow: 480, deliberate: 650, ceremony: 900, drift: 2800, breath: 1200 }
export const EASE = {
  premium: 'cubic-bezier(0.4, 0, 0.2, 1)',
  calm: 'cubic-bezier(0.37, 0, 0.63, 1)',
  decelerate: 'cubic-bezier(0.33, 1, 0.68, 1)',
}

type Spring = { stiffness: number; damping: number; mass: number }
export const SPRINGS = {
  card: { stiffness: 120, damping: 15, mass: 1 },
  art: { stiffness: 170, damping: 12, mass: 1 },
  pick: { stiffness: 220, damping: 14, mass: 0.8 },
  heavy: { stiffness: 85, damping: 17, mass: 1.25 },
  node: { stiffness: 220, damping: 14, mass: 0.8 },
  pop: { stiffness: 260, damping: 13, mass: 0.7 },
  push: { stiffness: 60 * 1.6, damping: 6 * 2.2, mass: 1 }, // RN friction 6 / tension 60, approximately
  mic: { stiffness: 150, damping: 13, mass: 1 },
} satisfies Record<string, Spring>

/** Samples a damped spring from 0 to 1 until it rests; returns a CSS linear() easing and its duration. */
export function solveSpring({ stiffness, damping, mass }: Spring) {
  const w0 = Math.sqrt(stiffness / mass)
  const zeta = damping / (2 * Math.sqrt(stiffness * mass))
  const x = (t: number) => {
    if (zeta < 1) {
      const wd = w0 * Math.sqrt(1 - zeta * zeta)
      return 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t))
    }
    return 1 - Math.exp(-w0 * t) * (1 + w0 * t)
  }
  let end = 0.1
  for (let t = 0.1; t < 4; t += 0.01) {
    end = t
    let settled = true
    for (let k = 0; k < 20; k++) if (Math.abs(1 - x(t + k * 0.01)) > 0.002) { settled = false; break }
    if (settled) break
  }
  const N = 40
  const pts = Array.from({ length: N + 1 }, (_, i) => +x((end * i) / N).toFixed(4))
  pts[N] = 1
  return { easing: `linear(${pts.join(', ')})`, duration: Math.round(end * 1000) }
}

/** CSS variables for every spring: --sp-<name> (easing) and --sp-<name>-d (duration). */
export function springVars(): Record<string, string> {
  const supports = typeof CSS !== 'undefined' && CSS.supports?.('animation-timing-function', 'linear(0, 1)')
  const out: Record<string, string> = {}
  for (const [name, s] of Object.entries(SPRINGS)) {
    const { easing, duration } = solveSpring(s)
    out[`--sp-${name}`] = supports ? easing : 'cubic-bezier(0.34, 1.25, 0.64, 1)'
    out[`--sp-${name}-d`] = `${duration}ms`
  }
  return out
}

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** A light haptic where the browser has one (Android Chrome). */
export function haptic(ms = 8) {
  try {
    navigator.vibrate?.(ms)
  } catch {}
}

/** The picker tick (the app's tick.ts): a 30 ms click, quiet. */
let ctx: AudioContext | null = null
export function tick() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return
    ctx = ctx ?? new AC()
    const t = ctx.currentTime
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'triangle'
    o.frequency.setValueAtTime(1900, t)
    o.frequency.exponentialRampToValueAtTime(900, t + 0.03)
    g.gain.setValueAtTime(0.05, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03)
    o.connect(g).connect(ctx.destination)
    o.start(t)
    o.stop(t + 0.035)
  } catch {}
  haptic(4)
}
