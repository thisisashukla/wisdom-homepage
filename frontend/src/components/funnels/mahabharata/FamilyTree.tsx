'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Person, Side } from '@/lib/funnels/mahabharata/family'
import GitaLink from './GitaLink'
import { mbTrack } from './track'

export type TreeLine = { deva: string; iast: string; en: string; ref: string; speaker: string; anchor: string }

type Rel = 'self' | 'parent' | 'spouse' | 'child' | 'kin'
type Props = {
  people: Person[]
  rows: { label: string; groups: { label?: string; ids: string[] }[] }[]
  lines: Record<string, TreeLine>
  page: string
}

const SIDE: Record<Side, string> = { pandava: 'Pandava side', kaurava: 'Kaurava side', none: 'Not fighting' }

function relationsFor(people: Person[], id: string) {
  const me = people.find((p) => p.id === id)
  if (!me) return null
  const spouses = Array.from(new Set([...me.spouses, ...people.filter((q) => q.spouses.includes(id)).map((q) => q.id)]))
  const kin = Array.from(new Set([...(me.kin ?? []), ...people.filter((q) => q.kin?.includes(id)).map((q) => q.id)]))
  const children = people.filter((q) => q.parents.includes(id)).map((q) => q.id)
  return { me, parents: me.parents, spouses, children, kin }
}

/**
 * "Pull a thread": tap a name and their parents, spouses and children light in bronze,
 * joined by drawn threads; everyone else dims. "Day 1" splits the family into the two armies.
 * Server-rendered as plain buttons; FamilyList carries the same relations as text.
 */
export default function FamilyTree({ people, rows, lines, page }: Props) {
  const [sel, setSel] = useState<string | null>(null)
  const [army, setArmy] = useState(false)
  const [paths, setPaths] = useState<{ d: string; k: Rel }[]>([])
  const [motion, setMotion] = useState(false)
  const treeRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>())
  const panelRef = useRef<HTMLDivElement>(null)
  const byId = new Map(people.map((p) => [p.id, p]))
  const rel = sel ? relationsFor(people, sel) : null

  const relOf = (id: string): Rel | undefined => {
    if (!rel) return undefined
    if (id === sel) return 'self'
    if (rel.parents.includes(id)) return 'parent'
    if (rel.spouses.includes(id)) return 'spouse'
    if (rel.children.includes(id)) return 'child'
    if (rel.kin.includes(id)) return 'kin'
    return undefined
  }

  const pick = useCallback(
    (id: string, source: 'tree' | 'panel' | 'url') => {
      setSel((cur) => (cur === id && source === 'tree' ? null : id))
      if (source !== 'url') mbTrack('Family Node Tapped', page, 'en', { person: id, source })
    },
    [page],
  )

  useEffect(() => {
    try {
      setMotion(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      const p = new URLSearchParams(window.location.search).get('person')
      if (p && people.some((x) => x.id === p)) pick(p, 'url')
    } catch {
      // ignore
    }
  }, [people, pick])

  const draw = useCallback(() => {
    const tree = treeRef.current
    if (!tree || !sel || !rel) {
      setPaths([])
      return
    }
    const box = tree.getBoundingClientRect()
    const center = (id: string) => {
      const el = nodeRefs.current.get(id)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 }
    }
    const a = center(sel)
    if (!a) return
    const out: { d: string; k: Rel }[] = []
    const add = (ids: string[], k: Rel) => {
      for (const id of ids) {
        const b = center(id)
        if (!b) continue
        if (Math.abs(a.y - b.y) < 12) {
          const lift = Math.min(34, 10 + Math.abs(a.x - b.x) / 8)
          out.push({ d: `M${a.x},${a.y} Q${(a.x + b.x) / 2},${a.y - lift} ${b.x},${b.y}`, k })
        } else {
          const my = (a.y + b.y) / 2
          out.push({ d: `M${a.x},${a.y} C${a.x},${my} ${b.x},${my} ${b.x},${b.y}`, k })
        }
      }
    }
    add(rel.parents, 'parent')
    add(rel.spouses, 'spouse')
    add(rel.children, 'child')
    add(rel.kin, 'kin')
    setPaths(out)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel])

  useLayoutEffect(() => {
    draw()
  }, [draw, army])

  useEffect(() => {
    const tree = treeRef.current
    if (!tree || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => draw())
    ro.observe(tree)
    return () => ro.disconnect()
  }, [draw])

  useLayoutEffect(() => {
    treeRef.current?.querySelectorAll<SVGPathElement>('.mb-threads path').forEach((p) => {
      try {
        p.style.setProperty('--len', String(Math.ceil(p.getTotalLength())))
      } catch {
        // jsdom or old browser
      }
    })
  }, [paths])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSel(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const toggleArmy = () => {
    const on = !army
    setArmy(on)
    mbTrack('Army View Toggled', page, 'en', { on })
  }

  const p = sel ? byId.get(sel) : undefined
  const ln = p?.lineId ? lines[p.lineId] : undefined
  const names = (ids: string[]) =>
    ids.map((id) => (
      <button key={id} type="button" onClick={() => pick(id, 'panel')}>
        {byId.get(id)?.name ?? id}
      </button>
    ))

  return (
    <div className="mb-tree-wrap" data-army={army ? '' : undefined}>
      <div className="mb-tree-bar">
        <button type="button" className="mb-army" aria-pressed={army} onClick={toggleArmy}>
          <span className="mb-army-dot" aria-hidden="true" />
          Day 1: who stood where
        </button>
        <p className="mb-tree-hint">Tap a name to pull its thread.</p>
      </div>
      <ul className="mb-legend" aria-hidden={!army}>
        <li>
          <i className="lg-p" /> Pandava side
        </li>
        <li>
          <i className="lg-k" /> Kaurava side
        </li>
        <li>
          <i className="lg-n" /> Not fighting
        </li>
      </ul>
      <div className="mb-tree" ref={treeRef} data-sel={sel ? '' : undefined} data-army={army ? '' : undefined}>
        <svg className="mb-threads" aria-hidden="true" data-motion={motion ? '' : undefined}>
          {paths.map((x, i) => (
            <path key={`${sel}-${i}`} d={x.d} data-k={x.k} className="draw" />
          ))}
        </svg>
        {rows.map((row) => (
          <div className="mb-row" key={row.label} role="group" aria-label={row.label}>
            <p className="mb-row-label">{row.label}</p>
            <div className="mb-row-groups">
              {row.groups.map((g, gi) => (
                <div className="mb-group" key={gi}>
                  {g.label && <p className="mb-group-label">{g.label}</p>}
                  {g.ids.map((id) => {
                    const person = byId.get(id)
                    if (!person) return null
                    const r = relOf(id)
                    return (
                      <button
                        key={id}
                        type="button"
                        className="mb-node"
                        ref={(el) => {
                          if (el) nodeRefs.current.set(id, el)
                          else nodeRefs.current.delete(id)
                        }}
                        data-rel={r}
                        data-side={person.side}
                        data-page={person.page ? '' : undefined}
                        aria-pressed={sel === id}
                        aria-controls="mb-person"
                        onClick={() => pick(id, 'tree')}
                      >
                        {person.name}
                        {army && <small>{SIDE[person.side]}</small>}
                        {!army && r && r !== 'self' && <small>{r}</small>}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-person-slot" id="mb-person" ref={panelRef} aria-live="polite">
        {p && rel ? (
          <div className="mb-person">
            <h3>
              {p.name}
              <span lang="hi">{p.hi}</span>
            </h3>
            <p>{p.role}</p>
            {p.note && <p className="mb-note">{p.note}</p>}
            {army && <p className="mb-note">On Day 1: {p.sideNote ?? SIDE[p.side]}</p>}
            <div className="mb-person-rel">
              {rel.parents.length > 0 && (
                <div>
                  <span>Parents</span>
                  {names(rel.parents)}
                </div>
              )}
              {rel.spouses.length > 0 && (
                <div>
                  <span>Married to</span>
                  {names(rel.spouses)}
                </div>
              )}
              {rel.children.length > 0 && (
                <div>
                  <span>Children</span>
                  {names(rel.children)}
                </div>
              )}
              {rel.kin.length > 0 && (
                <div>
                  <span>Kin</span>
                  {names(rel.kin)}
                </div>
              )}
            </div>
            {ln && (
              <div className="mb-line">
                <p className="mb-deva" lang="sa">
                  {ln.deva.split('\n').map((r, i) => (
                    <span key={i}>{r}</span>
                  ))}
                </p>
                <p className="mb-iast" lang="sa-Latn">
                  {ln.iast.split('\n').map((r, i) => (
                    <span key={i}>{r}</span>
                  ))}
                </p>
                <p className="mb-meaning">{ln.en}</p>
                <p className="mb-src">
                  <span className="mb-ref">{ln.ref}</span>
                  <span className="mb-speaker">{ln.speaker}</span>
                </p>
              </div>
            )}
            <p className="mb-person-links">
              {p.page && <a href={`/mahabharata/characters/${p.page}`}>Read {p.name}&apos;s story</a>}
              {p.gita && (
                <GitaLink
                  href={`/gita/chapter/${p.gita.c}/verse/${p.gita.v}`}
                  from={`tree_${p.id}`}
                  toRef={`${p.gita.c}.${p.gita.v}`}
                  page={page}
                  locale="en"
                >
                  Gita {p.gita.c}.{p.gita.v}: {p.gita.why}
                </GitaLink>
              )}
            </p>
          </div>
        ) : (
          <p className="mb-person-empty">
            Names with a small bronze dot have their own page. Try Karna, then Kunti: the thread between them is the secret of the Udyoga Parva.
          </p>
        )}
      </div>
    </div>
  )
}
