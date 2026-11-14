'use client'

/**
 * The panel beside the map (a bottom sheet on phones) for whatever is open: a state, a verse or a story.
 * Details load on demand: states/<id>.json for a state, nodes/<group>.json for a verse or story.
 * Following a link inside the panel opens that point on the map and sends Path Followed.
 */

import { useEffect, useRef, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import {
  gitaHref,
  isStory,
  loadGroup,
  loadState,
  ROLE_LABEL,
  stateHref,
  type MapData,
  type NodeDetail,
  type Role,
  type StateData,
  type StateMini,
  type StoryDetail,
  type VerseDetail,
} from '@/lib/explore'
import ExploreVerse, { Why } from './ExploreVerse'
import './explore.css'

export type MapSelection = { kind: 'state' | 'node'; i: number } | null

type Props = {
  map: MapData
  sel: NonNullable<MapSelection>
  onOpen: (s: NonNullable<MapSelection>) => void
  onClose: () => void
  stateById: Map<string, number>
  nodeById: Map<string, number>
}

const groupCache = new Map<string, Promise<Record<string, NodeDetail>>>()
const stateCache = new Map<string, Promise<StateData>>()
const group = (g: string) => {
  if (!groupCache.has(g)) groupCache.set(g, loadGroup(g))
  return groupCache.get(g)!
}
const stateData = (id: string) => {
  if (!stateCache.has(id)) stateCache.set(id, loadState(id))
  return stateCache.get(id)!
}

export default function MapPanel({ map, sel, onOpen, onClose, stateById, nodeById }: Props) {
  const [state, setState] = useState<StateData | null>(null)
  const [node, setNode] = useState<NodeDetail | null>(null)
  const headRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const fromId = sel.kind === 'state' ? map.states[sel.i][0] : map.nodes[sel.i][0]

  useEffect(() => {
    let live = true
    setState(null)
    setNode(null)
    if (sel.kind === 'state') {
      stateData(map.states[sel.i][0]).then((d) => live && setState(d))
    } else {
      const N = map.nodes[sel.i]
      group(map.groups[N[2]][0]).then((d) => live && setNode(d[N[0]] ?? null))
    }
    bodyRef.current?.scrollTo({ top: 0 })
    return () => {
      live = false
    }
  }, [map, sel])

  useEffect(() => {
    headRef.current?.focus({ preventScroll: true })
  }, [state, node])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const follow = (kind: 'state' | 'node', id: string, rel: string) => {
    const i = kind === 'state' ? stateById.get(id) : nodeById.get(id)
    if (i === undefined) return
    trackEvent(EVENTS.PathFollowed, { from: fromId, to: id, rel })
    onOpen({ kind, i })
  }

  const StateChip = ({ m, rel }: { m: { s: string; en: string; iast?: string }; rel: string }) => (
    <button type="button" className="sx-chip ex-state-chip" data-val={map.states[stateById.get(m.s) ?? 0]?.[5]} onClick={() => follow('state', m.s, rel)}>
      {m.en}
      {m.iast && <span className="ex-chip-iast">{m.iast}</span>}
    </button>
  )

  const S = sel.kind === 'state' ? map.states[sel.i] : null
  const N = sel.kind === 'node' ? map.nodes[sel.i] : null

  return (
    <aside className="ex-panel" aria-label="Details">
      <button type="button" className="ex-panel-close" aria-label="Close" onClick={onClose}>
        ×
      </button>
      <div className="ex-panel-body" ref={bodyRef}>
        {S && (
          <>
            <p className="ex-panel-kicker">{S[5] === 'a' ? 'A state that weighs on the mind' : S[5] === 'h' ? 'A state that heals' : 'Where every question starts'}</p>
            <h2 className="ex-panel-title" tabIndex={-1} ref={headRef}>
              {S[2]}
            </h2>
            <p className="ex-panel-name">
              <span lang="sa">{S[4]}</span> <span className="ex-iast">{S[3]}</span>
            </p>
            {!state && <p className="ex-quiet">Opening</p>}
            {state && <StatePanel d={state} Chip={StateChip} />}
            <p className="ex-panel-more">
              <a
                className="sx-btn sx-btn--primary sx-btn--sm"
                href={stateHref(S[1])}
                data-mp-location="explore_panel_state"
                data-mp-event="State Opened"
                data-mp-props={JSON.stringify({ item_id: S[0] })}
              >
                Read everything on {S[2]}
              </a>
            </p>
          </>
        )}
        {N && !node && (
          <>
            <h2 className="ex-panel-title" tabIndex={-1} ref={headRef}>
              {N[1] === 1 ? N[6] : N[5]}
            </h2>
            <p className="ex-quiet">Opening</p>
          </>
        )}
        {N && node && !isStory(node) && <VersePanel d={node as VerseDetail} headRef={headRef} Chip={StateChip} follow={follow} map={map} nodeById={nodeById} />}
        {N && node && isStory(node) && <StoryPanel d={node as StoryDetail} headRef={headRef} Chip={StateChip} map={map} />}
      </div>
    </aside>
  )
}

type ChipT = (p: { m: { s: string; en: string; iast?: string }; rel: string }) => JSX.Element

function ChipRow({ label, items, rel, Chip }: { label: string; items: StateMini[]; rel: string; Chip: ChipT }) {
  if (!items.length) return null
  return (
    <div className="ex-row">
      <h3 className="ex-row-label">{label}</h3>
      <div className="ex-chips">
        {items.map((m) => (
          <Chip key={m.s} m={m} rel={rel} />
        ))}
      </div>
    </div>
  )
}

function StatePanel({ d, Chip }: { d: StateData; Chip: ChipT }) {
  const verses = [...d.depicts.slice(0, 2), ...(d.val === 'afflictive' ? d.heals.slice(0, 2) : d.practices.slice(0, 2))]
  return (
    <>
      {d.gloss && <p className="ex-gloss">{d.gloss}</p>}
      {d.val === 'afflictive' ? (
        <>
          <ChipRow label="What feeds it" items={d.feeds} rel="feeds" Chip={Chip} />
          <ChipRow label="Where it leads" items={d.leads} rel="leads_to" Chip={Chip} />
          <ChipRow label="What heals it" items={d.healed_by} rel="healed_by" Chip={Chip} />
        </>
      ) : (
        <>
          <ChipRow label="What it heals" items={d.heals_what} rel="heals" Chip={Chip} />
          <ChipRow label="What grows it" items={d.feeds} rel="feeds" Chip={Chip} />
          <ChipRow label="Where it leads" items={d.leads} rel="leads_to" Chip={Chip} />
        </>
      )}
      {verses.length > 0 && (
        <div className="ex-row">
          <h3 className="ex-row-label">{d.val === 'afflictive' ? 'In the verses' : 'Verses that show and grow it'}</h3>
          <div className="ex-panel-verses">
            {verses.map((v) => (
              <ExploreVerse key={v.id} v={v} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

const ROLE_ORDER: Role[] = ['locus_of', 'depicts', 'heals', 'cultivates', 'enacts_in', 'enacts_turn']

function RoleRows({ roles, Chip, map }: { roles: [Role, string, ...unknown[]][]; Chip: ChipT; map: MapData }) {
  const by = new Map<Role, string[]>()
  for (const [r, s] of roles) by.set(r, [...(by.get(r) ?? []), s])
  const st = new Map(map.states.map((S) => [S[0], S]))
  return (
    <>
      {ROLE_ORDER.filter((r) => by.has(r)).map((r) => (
        <div className="ex-row" key={r}>
          <h3 className="ex-row-label">{ROLE_LABEL[r]}</h3>
          <div className="ex-chips">
            {Array.from(new Set(by.get(r))).map((s) => {
              const S = st.get(s)
              return S ? <Chip key={s} m={{ s, en: S[2], iast: S[3] }} rel={r} /> : null
            })}
          </div>
        </div>
      ))}
    </>
  )
}

function VersePanel({
  d,
  headRef,
  Chip,
  follow,
  map,
  nodeById,
}: {
  d: VerseDetail
  headRef: React.RefObject<HTMLHeadingElement>
  Chip: ChipT
  follow: (kind: 'state' | 'node', id: string, rel: string) => void
  map: MapData
  nodeById: Map<string, number>
}) {
  const top = d.roles[0]
  const lineage: [string, string[] | undefined, string][] = [
    ['Comes after', d.prev, 'prev'],
    ['Leads on to', d.next, 'next'],
    ['Answers', d.answers, 'answers'],
    ['Answered by', d.answered_by, 'answered_by'],
  ]
  const href = gitaHref(d)
  return (
    <>
      <h2 className="ex-panel-title" tabIndex={-1} ref={headRef}>
        {d.r}
      </h2>
      {d.scene && (d.scene.t || d.scene.s) && (
        <p className="ex-scene">
          {d.scene.t && <strong>{d.scene.t}. </strong>}
          {d.scene.s}
        </p>
      )}
      <ExploreVerse v={{ ...d, why: undefined }} />
      {top && top[2] && <Why text={top[2]} prov={top[3]} />}
      <RoleRows roles={d.roles} Chip={Chip} map={map} />
      {lineage.some(([, ids]) => ids?.length) && (
        <div className="ex-row">
          <h3 className="ex-row-label">The thread it sits in</h3>
          <ul className="ex-lineage">
            {lineage.flatMap(([label, ids, rel]) =>
              (ids ?? []).map((id) => {
                const N = map.nodes[nodeById.get(id) ?? -1]
                if (!N) return null
                return (
                  <li key={`${rel}-${id}`}>
                    <button type="button" onClick={() => follow('node', id, rel)}>
                      <span className="ex-lin-k">{label}</span>
                      <span className="ex-lin-ref">{N[5]}</span>
                      <span className="ex-lin-line">{N[6]}</span>
                    </button>
                  </li>
                )
              }),
            )}
          </ul>
        </div>
      )}
      {href && (
        <p className="ex-panel-more">
          <a className="sx-btn sx-btn--sm" href={href} data-mp-location="explore_panel_gita">
            Read {d.r} with its meaning
          </a>
        </p>
      )}
    </>
  )
}

function StoryPanel({ d, headRef, Chip, map }: { d: StoryDetail; headRef: React.RefObject<HTMLHeadingElement>; Chip: ChipT; map: MapData }) {
  return (
    <>
      <p className="ex-panel-kicker">A story from the {d.grp}</p>
      <h2 className="ex-panel-title" tabIndex={-1} ref={headRef}>
        {d.t}
      </h2>
      <p className="ex-story-summary">{d.s}</p>
      {d.l && (
        <div className="ex-row">
          <h3 className="ex-row-label">What it teaches</h3>
          <p className="ex-story-lesson">{d.l}</p>
        </div>
      )}
      <RoleRows roles={d.roles} Chip={Chip} map={map} />
    </>
  )
}
