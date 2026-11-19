/**
 * One clock for "engaged time": seconds the tab was visible while the reader was active (scroll, touch,
 * pointer, key) in the last `idleMs`, or while audio was playing. Page Engaged / Page Left
 * (useEngagedTime) and the sign-in card (components/account) both count with it, so "longer than most"
 * means the same thing in Mixpanel and on the page.
 */

export const audioPlaying = () => Array.from(document.querySelectorAll('audio')).some((a) => !a.paused && !a.ended)

export type EngagedClock = { engaged: () => number; stop: () => void }

export function startEngagedClock(onSecond: (engaged: number) => void, idleMs = 120_000): EngagedClock {
  let engaged = 0
  let lastActive = Date.now()
  const onActive = () => {
    lastActive = Date.now()
  }
  const onVisibility = () => {
    if (document.visibilityState === 'visible') onActive()
  }
  const tick = window.setInterval(() => {
    if (document.visibilityState !== 'visible') return
    if (Date.now() - lastActive > idleMs && !audioPlaying()) return
    engaged += 1
    onSecond(engaged)
  }, 1000)

  const opts = { passive: true } as const
  const ACTIVE = ['scroll', 'pointerdown', 'pointermove', 'touchstart', 'keydown'] as const
  ACTIVE.forEach((e) => window.addEventListener(e, onActive, opts))
  document.addEventListener('visibilitychange', onVisibility)

  return {
    engaged: () => engaged,
    stop: () => {
      window.clearInterval(tick)
      ACTIVE.forEach((e) => window.removeEventListener(e, onActive))
      document.removeEventListener('visibilitychange', onVisibility)
    },
  }
}
