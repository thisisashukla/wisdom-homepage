'use client'

import { useEffect, useState } from 'react'

type Item = { id: string; text: string }

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)

/**
 * "On this page" for long articles. Reads the H2s inside .dh-prose, gives them ids,
 * and highlights the section you are reading. A thin line beside the list fills as
 * you scroll through the article. On small screens it collapses into a details box.
 */
export default function Toc() {
  const [items, setItems] = useState<Item[]>([])
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const prose = document.querySelector('.dh-prose')
    if (!prose) return
    const hs = Array.from(prose.querySelectorAll<HTMLHeadingElement>('h2'))
    const seen = new Set<string>()
    const list = hs.map((h) => {
      let id = h.id || slugify(h.textContent || '')
      while (seen.has(id)) id += '-2'
      seen.add(id)
      h.id = id
      return { id, text: h.textContent || '' }
    })
    setItems(list)

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive((e.target as HTMLElement).id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    hs.forEach((h) => io.observe(h))

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = prose.getBoundingClientRect()
        const total = r.height - window.innerHeight * 0.5
        setProgress(Math.max(0, Math.min(1, (window.innerHeight * 0.3 - r.top) / Math.max(1, total))))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (items.length < 3) return null

  const list = (
    <ol>
      {items.map((it) => (
        <li key={it.id} className={it.id === active ? 'on' : ''}>
          <a href={`#${it.id}`}>{it.text}</a>
        </li>
      ))}
    </ol>
  )

  return (
    <>
      <nav className="dh-toc" aria-label="On this page" style={{ ['--p' as string]: progress }}>
        <p className="dh-toc__k">On this page</p>
        <div className="dh-toc__rail" aria-hidden="true">
          <span />
        </div>
        {list}
      </nav>
      <details className="dh-toc-m">
        <summary>On this page</summary>
        {list}
      </details>
    </>
  )
}

/** A hairline under the nav that fills as you read. */
export function ReadProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const h = document.documentElement
        setP(Math.max(0, Math.min(1, h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight))))
      })
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return <div className="dh-progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />
}
