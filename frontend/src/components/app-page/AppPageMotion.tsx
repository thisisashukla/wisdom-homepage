'use client'

import { useEffect } from 'react'

/**
 * Motion for /app: scroll reveals, the night/paper tone the page breathes
 * between, parallax, the scroll-lit bridge line, screenshot tilt and the
 * section index. Everything is transform/opacity and stops under
 * prefers-reduced-motion.
 */
export default function AppPageMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('main.ap')
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups: Array<() => void> = []

    // Reveals and per-section "in view" state (drives micro animations).
    const revealIO = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('is-in')
          revealIO.unobserve(e.target)
        }),
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    )
    root.querySelectorAll('.ap-reveal, .ap-feat').forEach((el) => revealIO.observe(el))
    cleanups.push(() => revealIO.disconnect())

    // Tone follows whichever section crosses the middle of the screen.
    const toneIO = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const tone = (e.target as HTMLElement).dataset.tone
          if (tone) root.dataset.tone = tone
        }),
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )
    root.querySelectorAll('section[data-tone]').forEach((el) => toneIO.observe(el))
    cleanups.push(() => toneIO.disconnect())

    // Section index (desktop): visible across the seven sections, marks the current one.
    const index = root.querySelector<HTMLElement>('.ap-index')
    const feats = Array.from(root.querySelectorAll<HTMLElement>('.ap-feat'))
    const indexIO = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const n = (e.target as HTMLElement).dataset.feat
          index?.querySelectorAll('a').forEach((a) => a.classList.toggle('is-active', a.dataset.index === n))
        }),
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )
    feats.forEach((el) => indexIO.observe(el))
    cleanups.push(() => indexIO.disconnect())

    if (reduce) {
      root.querySelectorAll('.ap-scrub-w').forEach((w) => w.classList.add('is-lit'))
      return () => cleanups.forEach((f) => f())
    }

    // Scroll-driven: parallax, bridge words, index visibility.
    const para = Array.from(root.querySelectorAll<HTMLElement>('[data-parallax]'))
    const scrub = root.querySelector<HTMLElement>('[data-scrub]')
    const words = scrub ? Array.from(scrub.querySelectorAll<HTMLElement>('.ap-scrub-w')) : []
    const featsWrap = root.querySelector<HTMLElement>('.ap-features')
    let ticking = false
    let lastLit = -1

    const frame = () => {
      ticking = false
      const vh = window.innerHeight
      for (const el of para) {
        const host = el.parentElement
        if (!host) continue
        const r = host.getBoundingClientRect()
        if (r.bottom < -200 || r.top > vh + 200) continue
        const d = r.top + r.height / 2 - vh / 2
        el.style.transform = `translate3d(0, ${(-d * parseFloat(el.dataset.parallax || '0')).toFixed(1)}px, 0)`
      }
      if (scrub && words.length) {
        const r = scrub.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (r.height + vh * 0.3)))
        const lit = Math.round(p * words.length * 1.12)
        if (lit !== lastLit) {
          words.forEach((w, k) => w.classList.toggle('is-lit', k < lit))
          lastLit = lit
        }
      }
      if (index && featsWrap) {
        const r = featsWrap.getBoundingClientRect()
        index.classList.toggle('is-on', r.top < vh * 0.5 && r.bottom > vh * 0.5)
      }
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(frame)
      }
    }
    frame()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    cleanups.push(() => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    })

    // Pointer tilt and glare on the screenshots.
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      root.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
        const move = (ev: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const px = (ev.clientX - r.left) / r.width
          const py = (ev.clientY - r.top) / r.height
          el.style.setProperty('--ry', `${((px - 0.5) * 12).toFixed(2)}deg`)
          el.style.setProperty('--rx', `${((0.5 - py) * 10).toFixed(2)}deg`)
          el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
          el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
          el.classList.add('is-hover')
        }
        const leave = () => {
          el.style.setProperty('--ry', '0deg')
          el.style.setProperty('--rx', '0deg')
          el.classList.remove('is-hover')
        }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        cleanups.push(() => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
        })
      })
    }

    return () => cleanups.forEach((f) => f())
  }, [])

  return null
}
