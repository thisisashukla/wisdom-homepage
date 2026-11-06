'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * The inner voice after a sit, one line at a time. All lines are in the HTML (for
 * readers without JS and for search); CSS shows only the active one once JS runs.
 */
export default function Thoughts({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLUListElement>(null)
  const [i, setI] = useState(0)
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setLive(true)
    let timer: ReturnType<typeof setInterval> | undefined
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer)
      if (e.isIntersecting) timer = setInterval(() => setI((n) => (n + 1) % lines.length), 2600)
    })
    if (ref.current) io.observe(ref.current)
    return () => {
      clearInterval(timer)
      io.disconnect()
    }
  }, [lines.length])

  return (
    <ul ref={ref} className={`dh-thoughts${live ? ' dh-thoughts--live' : ''}`}>
      {lines.map((l, n) => (
        <li key={l} className={n === i ? 'on' : ''} aria-hidden={live && n !== i ? true : undefined}>
          {l}
        </li>
      ))}
    </ul>
  )
}
