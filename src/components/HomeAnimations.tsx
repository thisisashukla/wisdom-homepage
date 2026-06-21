'use client'

import { useEffect } from 'react'

export default function HomeAnimations() {
  useEffect(() => {
    // ── Scroll Reveal ──────────────────────────────────────────────────
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))

    // ── FAQ Accordion ──────────────────────────────────────────────────
    const faqItems = document.querySelectorAll<HTMLElement>('.faq-item')
    const faqHandlers: Array<{ btn: HTMLButtonElement; fn: () => void }> = []

    faqItems.forEach((item) => {
      const btn = item.querySelector<HTMLButtonElement>('.faq-q')
      if (!btn) return
      const fn = () => {
        const isOpen = item.classList.contains('open')
        faqItems.forEach((i) => {
          i.classList.remove('open')
          i.querySelector<HTMLButtonElement>('.faq-q')?.setAttribute('aria-expanded', 'false')
        })
        if (!isOpen) {
          item.classList.add('open')
          btn.setAttribute('aria-expanded', 'true')
        }
      }
      btn.addEventListener('click', fn)
      faqHandlers.push({ btn, fn })
    })

    // ── Proof bar count-up ────────────────────────────────────────────
    // Animate any element with data-count to count up from 0 to its value
    const countEls = document.querySelectorAll<HTMLElement>('[data-count]')
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const target = parseFloat(el.dataset.count || '0')
          const suffix = el.dataset.suffix || ''
          const duration = 1200
          const start = performance.now()
          const isFloat = String(target).includes('.')
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = target * eased
            el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current).toString()) + suffix
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
          countObserver.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )
    countEls.forEach((el) => countObserver.observe(el))

    // ── Cursor glow (desktop only) ────────────────────────────────────
    const glow = document.createElement('div')
    glow.className = 'cursor-glow'
    document.body.appendChild(glow)

    let glowVisible = false
    const onMouseMove = (e: MouseEvent) => {
      if (!glowVisible) {
        glow.style.opacity = '1'
        glowVisible = true
      }
      glow.style.transform = `translate(${e.clientX - 160}px, ${e.clientY - 160}px)`
    }
    const onMouseLeave = () => {
      glow.style.opacity = '0'
      glowVisible = false
    }

    // Only on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseleave', onMouseLeave)
    }

    return () => {
      revealObserver.disconnect()
      countObserver.disconnect()
      faqHandlers.forEach(({ btn, fn }) => btn.removeEventListener('click', fn))
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      if (document.body.contains(glow)) document.body.removeChild(glow)
    }
  }, [])

  return null
}
