'use client'

/**
 * Theme plan pages (/gita-for/<slug>): verse reveal on scroll, the week progress UI,
 * and coverage tracking. The server renders every word; this only animates and measures.
 *
 * Events (all carry theme, variant, plan_source: "web_theme"):
 *   Theme Plan Viewed      on load            {returning, verses_read_before, referrer_host, internal, utm_*, landing_hash}
 *   Theme Verse Seen       card ≥35% visible  {verse, phase, ref}
 *   Theme Verse Read       card visible long enough to read it (≈200 wpm, min 6 s) {verse, phase, ref, seconds}
 *   Theme Plan Progress    verses read reaches 3, 5, 7 {verses_read}
 *   Theme Plan Completed   verse 7 read and ≥5 verses read {verses_read}
 *   Theme Audio Played     a recitation starts {verse, ref}
 *   Theme Translation Opened / Theme FAQ Opened   {verse, ref} / {question}
 *   Theme CTA Seen         the "create your own" block is 40% in view {verses_read}
 *   (clicks via BlogTracker data-mp-event: Theme CTA Clicked, Theme Strip Clicked, Theme Verse Opened,
 *    Theme Related Clicked, Theme Further Reading Clicked, Theme Continue Clicked)
 *   Theme Plan Exit        page hidden/closed (beacon) {verses_seen, verses_read, max_verse_seen, max_verse_read, coverage_pct, seconds_on_page, completed, audio_plays}
 */
import { useEffect } from 'react'
import { trackEvent, trackEventBeacon } from '@/lib/mixpanel'

type DayMeta = { day: number; phase: string; ref: string | null; words: number }

type Props = {
  slug: string
  variant: 'in' | 'global'
  days: DayMeta[]
}

const STORE_KEY = 'wisdom_theme_progress_v1'

type Stored = Record<string, { read: number[]; at: number }>

const load = (): Stored => {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || '{}') as Stored
  } catch {
    return {}
  }
}
const save = (s: Stored) => {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(s))
  } catch {
    /* private mode */
  }
}

export default function ThemePlanClient({ slug, variant, days }: Props) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.tp')
    if (!root) return
    root.dataset.ready = '1'

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const base = { theme: slug, variant, plan_source: 'web_theme' }
    const meta = new Map(days.map((d) => [d.day, d]))
    const started = Date.now()

    // ── Restore earlier progress ──────────────────────────────────────────────
    const stored = load()
    const before = new Set(stored[slug]?.read ?? [])
    const read = new Set<number>(before)
    const seen = new Set<number>()
    let audioPlays = 0
    let exitSent = false
    let exitSeq = 0

    const qs = new URLSearchParams(window.location.search)
    let refHost = ''
    try {
      refHost = document.referrer ? new URL(document.referrer).hostname : ''
    } catch {
      /* bad referrer */
    }
    trackEvent('Theme Plan Viewed', {
      ...base,
      returning: before.size > 0,
      verses_read_before: before.size,
      referrer_host: refHost || 'direct',
      internal: refHost === window.location.hostname,
      utm_source: qs.get('utm_source'),
      utm_medium: qs.get('utm_medium'),
      utm_campaign: qs.get('utm_campaign'),
      landing_hash: window.location.hash || null,
    })

    // Translation and FAQ opens
    const onToggle = (ev: Event) => {
      const el = ev.target as HTMLDetailsElement
      if (!el.open || !el.dataset.track) return
      if (el.dataset.track === 'translation') {
        const card = el.closest<HTMLElement>('.tp-day')
        const d = Number(card?.dataset.day)
        trackEvent('Theme Translation Opened', { ...base, verse: d, ref: meta.get(d)?.ref })
      } else if (el.dataset.track === 'faq') {
        trackEvent('Theme FAQ Opened', { ...base, question: el.dataset.q })
      }
    }
    root.addEventListener('toggle', onToggle, true)

    // The create-your-own block coming into view (denominator for its click rate)
    const cta = document.getElementById('find')
    let ctaObs: IntersectionObserver | null = null
    if (cta) {
      ctaObs = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return
        trackEvent('Theme CTA Seen', { ...base, verses_read: read.size })
        ctaObs?.disconnect()
      }, { threshold: 0.4 })
      ctaObs.observe(cta)
    }

    // Number the Sanskrit words so they can rise in one after another.
    root.querySelectorAll<HTMLElement>('.tp-day').forEach((card) => {
      card.querySelectorAll<HTMLElement>('.sa-word').forEach((w, i) => w.style.setProperty('--i', String(i)))
    })

    // ── Progress UI ───────────────────────────────────────────────────────────
    const pill = root.querySelector<HTMLElement>('.tp-pill')
    const pillText = root.querySelector<HTMLElement>('.tp-pill-text')
    const cont = root.querySelector<HTMLAnchorElement>('.tp-continue')
    const done = root.querySelector<HTMLElement>('.tp-done')

    const paint = () => {
      root.querySelectorAll<HTMLElement>('[data-day]').forEach((el) => {
        const d = Number(el.dataset.day)
        el.classList.toggle('is-read', read.has(d))
        el.classList.toggle('is-seen', seen.has(d) || read.has(d))
      })
      const n = read.size
      if (pillText) pillText.textContent = n >= 7 ? 'All seven read' : `${n} of 7 verses read`
      if (done) done.classList.toggle('is-done', n >= 7 || (read.has(7) && n >= 5))
    }

    if (cont && before.size > 0 && before.size < 7) {
      const next = [1, 2, 3, 4, 5, 6, 7].find((d) => !before.has(d)) ?? 1
      cont.href = `#verse-${next}`
      cont.querySelector('span')!.textContent = `Pick up at verse ${next}`
      cont.hidden = false
      cont.addEventListener('click', () => trackEvent('Theme Continue Clicked', { ...base, verse: next }))
    }
    paint()

    // Show the pill once the hero is gone.
    const hero = root.querySelector('.tp-hero')
    let heroObs: IntersectionObserver | null = null
    if (hero && pill) {
      heroObs = new IntersectionObserver(([e]) => pill.classList.toggle('is-on', !e.isIntersecting), { threshold: 0 })
      heroObs.observe(hero)
    }

    // ── Reveal + dwell measurement ────────────────────────────────────────────
    const visibleSince = new Map<number, number>()
    const dwell = new Map<number, number>()
    const needMs = (d: number) => Math.max(6000, Math.round(((meta.get(d)?.words ?? 60) / 200) * 60000))

    const markRead = (d: number) => {
      if (read.has(d)) return
      read.add(d)
      const m = meta.get(d)
      trackEvent('Theme Verse Read', { ...base, verse: d, phase: m?.phase, ref: m?.ref, seconds: Math.round((dwell.get(d) ?? 0) / 1000) })
      const n = read.size
      if (n === 3 || n === 5 || n === 7) trackEvent('Theme Plan Progress', { ...base, verses_read: n })
      if (d === 7 && n >= 5) trackEvent('Theme Plan Completed', { ...base, verses_read: n })
      const s = load()
      s[slug] = { read: Array.from(read).sort(), at: Date.now() }
      save(s)
      paint()
    }

    const flush = (d: number, now: number) => {
      const since = visibleSince.get(d)
      if (since == null) return
      dwell.set(d, (dwell.get(d) ?? 0) + (now - since))
      visibleSince.set(d, now)
      if ((dwell.get(d) ?? 0) >= needMs(d)) markRead(d)
    }

    const cards = Array.from(root.querySelectorAll<HTMLElement>('.tp-day'))
    const openObs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const card = e.target as HTMLElement
          card.classList.add('is-open')
          const d = Number(card.dataset.day)
          if (!seen.has(d)) {
            seen.add(d)
            const m = meta.get(d)
            trackEvent('Theme Verse Seen', { ...base, verse: d, phase: m?.phase, ref: m?.ref })
            paint()
          }
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' },
    )
    const dwellObs = new IntersectionObserver(
      (entries) => {
        const now = Date.now()
        for (const e of entries) {
          const d = Number((e.target as HTMLElement).dataset.day)
          if (e.isIntersecting && e.intersectionRatio >= 0.5) {
            if (!visibleSince.has(d)) visibleSince.set(d, now)
          } else {
            flush(d, now)
            visibleSince.delete(d)
          }
        }
      },
      { threshold: [0, 0.5, 1] },
    )
    cards.forEach((c) => {
      if (reduce) c.classList.add('is-open')
      openObs.observe(c)
      dwellObs.observe(c)
    })
    const tick = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      const now = Date.now()
      visibleSince.forEach((_, d) => flush(d, now))
    }, 1000)

    // ── Thread fill follows the reader through the week ───────────────────────
    const week = root.querySelector<HTMLElement>('.tp-week')
    const fill = root.querySelector<HTMLElement>('.tp-thread-fill')
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!week || !fill) return
        const r = week.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / r.height))
        fill.style.transform = `scaleY(${p})`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // ── Audio plays ───────────────────────────────────────────────────────────
    const onPlay = (ev: Event) => {
      const card = (ev.target as HTMLElement).closest<HTMLElement>('.tp-day')
      if (!card) return
      audioPlays += 1
      const d = Number(card.dataset.day)
      trackEvent('Theme Audio Played', { ...base, verse: d, ref: meta.get(d)?.ref })
    }
    document.addEventListener('play', onPlay, true)

    // ── Exit summary ──────────────────────────────────────────────────────────
    const sendExit = () => {
      if (exitSent) return
      exitSent = true
      exitSeq += 1
      const now = Date.now()
      visibleSince.forEach((_, d) => flush(d, now))
      const maxOf = (s: Set<number>) => (s.size ? Math.max(...Array.from(s)) : 0)
      trackEventBeacon('Theme Plan Exit', {
        ...base,
        verses_seen: seen.size,
        verses_read: read.size,
        verses_read_this_visit: Array.from(read).filter((d) => !before.has(d)).length,
        max_verse_seen: maxOf(seen),
        max_verse_read: maxOf(read),
        coverage_pct: Math.round((read.size / 7) * 100),
        seconds_on_page: Math.round((now - started) / 1000),
        completed: read.has(7) && read.size >= 5,
        audio_plays: audioPlays,
        exit_seq: exitSeq,
      })
    }
    const onHide = () => {
      if (document.visibilityState === 'hidden') sendExit()
      else exitSent = false // came back: a later hide sends a fresh summary
    }
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', sendExit)

    return () => {
      openObs.disconnect()
      dwellObs.disconnect()
      ctaObs?.disconnect()
      root.removeEventListener('toggle', onToggle, true)
      heroObs?.disconnect()
      window.clearInterval(tick)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      document.removeEventListener('play', onPlay, true)
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', sendExit)
    }
  }, [slug, variant, days])

  return null
}
