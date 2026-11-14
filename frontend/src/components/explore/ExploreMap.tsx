'use client'

/**
 * The map of the mind: every inner state the scriptures name, with the verses and stories that
 * show it, ease it or grow it, drawn on one canvas. States that weigh on the mind sit on the left,
 * states that heal on the right; each verse and story orbits the states it touches.
 * Pan by dragging, zoom with the buttons, a pinch or ctrl + scroll; tap a point to open it.
 * Data: src/content/explore/map.json (loaded after the page, as its own chunk).
 * Events: Map Node Opened, Map Filter Selected, Search Completed (location explore_map), Path Followed (MapPanel).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { fold, loadMap, type MapData } from '@/lib/explore'
import MapPanel, { type MapSelection } from './MapPanel'
import './explore.css'

type RGB = [number, number, number]
type Look = { gold: RGB; goldLight: RGB; sindoor: RGB; text: RGB; bg: RGB; fontUi: string; fontDeva: string }
type Cam = { x: number; y: number; k: number }
type Hit = { kind: 'state' | 'node'; i: number } | null
type Result = { kind: 'state' | 'node'; i: number; title: string; sub: string }

const WORLD_W = 2080
const WORLD_H = 1330

function parseColor(v: string): RGB {
  const s = v.trim()
  if (s.startsWith('#')) {
    const h = s.length === 4 ? s.slice(1).split('').map((c) => c + c).join('') : s.slice(1, 7)
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
  }
  const m = s.match(/(\d+(?:\.\d+)?)[ ,]+(\d+(?:\.\d+)?)[ ,]+(\d+(?:\.\d+)?)/)
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : [245, 232, 204]
}
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`

function readLook(el: HTMLElement): Look {
  const cs = getComputedStyle(el)
  const v = (n: string) => cs.getPropertyValue(n)
  return {
    gold: parseColor(v('--gold')),
    goldLight: parseColor(v('--gold-light')),
    sindoor: parseColor(v('--sindoor')),
    text: parseColor(v('--text')),
    bg: parseColor(v('--bg')),
    fontUi: v('--font-ui').trim() || 'system-ui, sans-serif',
    fontDeva: v('--font-deva-ui').trim() || 'sans-serif',
  }
}

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function ExploreMap() {
  const [map, setMap] = useState<MapData | null>(null)
  const [sel, setSel] = useState<MapSelection>(null)
  const [hover, setHover] = useState<{ hit: Hit; x: number; y: number } | null>(null)
  const [filter, setFilter] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState(false)
  // Portrait frames (phones) turn the map a quarter: what weighs on top, what heals below.
  const [rot, setRot] = useState(false)
  const rotRef = useRef(false)

  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cam = useRef<Cam>({ x: 0, y: 0, k: 0.5 })
  const fitK = useRef(0.5)
  const size = useRef({ w: 800, h: 520, dpr: 1 })
  const look = useRef<Look | null>(null)
  const raf = useRef(0)
  const anim = useRef(0)
  const stateRef = useRef({ sel: null as MapSelection, hover: null as Hit, filter: null as number | null })
  stateRef.current = { sel, hover: hover?.hit ?? null, filter }

  useEffect(() => {
    let live = true
    loadMap()
      .then((m) => live && setMap(m))
      .catch(() => live && setFailed(true))
    return () => {
      live = false
    }
  }, [])

  // ── Indexes ────────────────────────────────────────────────────────────────
  const ix = useMemo(() => {
    if (!map) return null
    const nodeAdj: [number, number][][] = map.nodes.map(() => [])
    const stateAdj: [number, number][][] = map.states.map(() => [])
    for (let i = 0; i < map.edges.length; i += 3) {
      const [n, s, r] = [map.edges[i], map.edges[i + 1], map.edges[i + 2]]
      nodeAdj[n].push([s, r])
      stateAdj[s].push([n, r])
    }
    const linkAdj: number[][] = map.states.map(() => [])
    for (const [a, b] of map.links) {
      linkAdj[a].push(b)
      linkAdj[b].push(a)
    }
    const degree = stateAdj.map((a) => a.length)
    const order = map.states.map((_, i) => i).sort((a, b) => degree[b] - degree[a])
    const stateById = new Map(map.states.map((s, i) => [s[0], i]))
    map.states.forEach((s, i) => stateById.set(s[1], i))
    const nodeById = new Map(map.nodes.map((n, i) => [n[0], i]))
    const keys = map.nodes.map((n) => ({ ref: fold(n[5]), line: fold(n[6]) }))
    const skeys = map.states.map((s) => fold(`${s[2]} ${s[3]} ${s[0].replace(/_/g, ' ')} ${s[4]}`))
    return { nodeAdj, stateAdj, linkAdj, degree, order, stateById, nodeById, keys, skeys, maxDeg: Math.max(...degree) }
  }, [map])

  const pos = useMemo(() => {
    if (!map) return null
    const f = (x: number, y: number): [number, number] => (rot ? [y, x] : [x, y])
    return { s: map.states.map((S) => f(S[6], S[7])), n: map.nodes.map((N) => f(N[3], N[4])), weigh: f(-560, 0), heal: f(560, 0) }
  }, [map, rot])
  const posRef = useRef(pos)
  posRef.current = pos

  // ── Drawing ────────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    raf.current = 0
    const cv = canvasRef.current
    const L = look.current
    const P = posRef.current
    if (!cv || !map || !ix || !L || !P) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const { w, h, dpr } = size.current
    const { x: cx, y: cy, k } = cam.current
    const { sel: s, hover: hv, filter: f } = stateRef.current
    const sx = (x: number) => (x - cx) * k + w / 2
    const sy = (y: number) => (y - cy) * k + h / 2
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    // two grounds: what weighs (left) and what heals (right)
    const g1 = ctx.createRadialGradient(sx(P.weigh[0]), sy(P.weigh[1]), 0, sx(P.weigh[0]), sy(P.weigh[1]), 700 * k)
    g1.addColorStop(0, rgba(L.sindoor, 0.07))
    g1.addColorStop(1, rgba(L.sindoor, 0))
    ctx.fillStyle = g1
    ctx.fillRect(0, 0, w, h)
    const g2 = ctx.createRadialGradient(sx(P.heal[0]), sy(P.heal[1]), 0, sx(P.heal[0]), sy(P.heal[1]), 700 * k)
    g2.addColorStop(0, rgba(L.gold, 0.08))
    g2.addColorStop(1, rgba(L.gold, 0))
    ctx.fillStyle = g2
    ctx.fillRect(0, 0, w, h)

    // what is lit: the selection and its neighbours
    const litStates = new Set<number>()
    const litNodes = new Set<number>()
    let selState = -1
    let selNode = -1
    if (s?.kind === 'state') {
      selState = s.i
      litStates.add(s.i)
      ix.stateAdj[s.i].forEach(([n]) => litNodes.add(n))
      ix.linkAdj[s.i].forEach((b) => litStates.add(b))
    } else if (s?.kind === 'node') {
      selNode = s.i
      litNodes.add(s.i)
      ix.nodeAdj[s.i].forEach(([st]) => litStates.add(st))
    }
    const focus = s !== null

    // state to state links, gently curved
    ctx.lineWidth = 1
    for (const [a, b, kind] of map.links) {
      const A = P.s[a]
      const B = P.s[b]
      const on = selState >= 0 && (a === selState || b === selState)
      const base = kind === 2 ? L.gold : L.sindoor
      const alpha = on ? 0.55 : focus ? 0.05 : kind === 1 ? 0.1 : 0.16
      ctx.strokeStyle = rgba(base, alpha)
      ctx.setLineDash(kind === 1 ? [3, 4] : [])
      const x1 = sx(A[0]), y1 = sy(A[1]), x2 = sx(B[0]), y2 = sy(B[1])
      const mx = (x1 + x2) / 2 - (y2 - y1) * 0.12
      const my = (y1 + y2) / 2 + (x2 - x1) * 0.12
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.quadraticCurveTo(mx, my, x2, y2)
      ctx.stroke()
    }
    ctx.setLineDash([])

    // the selection's own edges
    if (selState >= 0) {
      const S = P.s[selState]
      ctx.strokeStyle = rgba(L.goldLight, 0.1)
      ctx.beginPath()
      for (const [n] of ix.stateAdj[selState]) {
        if (f !== null && map.nodes[n][2] !== f) continue
        ctx.moveTo(sx(S[0]), sy(S[1]))
        ctx.lineTo(sx(P.n[n][0]), sy(P.n[n][1]))
      }
      ctx.stroke()
    } else if (selNode >= 0) {
      const N = P.n[selNode]
      for (const [st, r] of ix.nodeAdj[selNode]) {
        const S = P.s[st]
        ctx.strokeStyle = rgba(r === 1 || r === 2 || r === 5 ? L.goldLight : L.sindoor, 0.6)
        ctx.beginPath()
        ctx.moveTo(sx(N[0]), sy(N[1]))
        ctx.lineTo(sx(S[0]), sy(S[1]))
        ctx.stroke()
      }
    }

    // verses (points) and stories (rings)
    const zr = Math.max(0.85, Math.min(2.2, Math.sqrt(k / fitK.current)))
    for (let i = 0; i < map.nodes.length; i++) {
      const N = map.nodes[i]
      const x = sx(P.n[i][0])
      const y = sy(P.n[i][1])
      if (x < -10 || y < -10 || x > w + 10 || y > h + 10) continue
      const out = f !== null && N[2] !== f
      const lit = litNodes.has(i)
      let a = out ? 0.06 : focus ? (lit ? 0.95 : 0.14) : 0.5
      if (hv?.kind === 'node' && hv.i === i) a = 1
      if (N[1] === 1) {
        ctx.strokeStyle = rgba(L.goldLight, a)
        ctx.lineWidth = 1.1
        ctx.beginPath()
        ctx.arc(x, y, 2.6 * zr, 0, Math.PI * 2)
        ctx.stroke()
      } else {
        ctx.fillStyle = rgba(lit ? L.goldLight : L.text, a)
        ctx.beginPath()
        ctx.arc(x, y, (lit ? 2.1 : 1.6) * zr, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    if (selNode >= 0) {
      ctx.strokeStyle = rgba(L.goldLight, 1)
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(sx(P.n[selNode][0]), sy(P.n[selNode][1]), 7, 0, Math.PI * 2)
      ctx.stroke()
    }

    // states: a lamp each, labels placed by weight so they never overlap
    const placed: [number, number, number, number][] = []
    const fits = (r: [number, number, number, number]) => !placed.some((p) => r[0] < p[2] && r[2] > p[0] && r[1] < p[3] && r[3] > p[1])
    const labelOrder = [...ix.order]
    for (const pin of [selState, hv?.kind === 'state' ? hv.i : -1]) {
      if (pin >= 0) labelOrder.splice(labelOrder.indexOf(pin), 1), labelOrder.unshift(pin)
    }
    const showDeva = k >= fitK.current * 1.5
    const fontPx = w < 600 ? 12 : 13
    for (const i of [...ix.order].reverse()) {
      const S = map.states[i]
      const x = sx(P.s[i][0])
      const y = sy(P.s[i][1])
      const c = S[5] === 'a' ? L.sindoor : S[5] === 'h' ? L.goldLight : L.text
      const r = 3.5 + 4 * Math.sqrt(ix.degree[i] / ix.maxDeg)
      const dim = focus && !litStates.has(i)
      const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 4)
      halo.addColorStop(0, rgba(c, dim ? 0.08 : 0.35))
      halo.addColorStop(1, rgba(c, 0))
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(x, y, r * 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = rgba(c, dim ? 0.35 : 1)
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
      if (i === selState) {
        ctx.strokeStyle = rgba(L.goldLight, 1)
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(x, y, r + 5, 0, Math.PI * 2)
        ctx.stroke()
      }
    }
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    for (const i of labelOrder) {
      const S = map.states[i]
      const x = sx(P.s[i][0])
      const y = sy(P.s[i][1])
      const r = 3.5 + 4 * Math.sqrt(ix.degree[i] / ix.maxDeg)
      ctx.font = `600 ${fontPx}px ${L.fontUi}`
      const tw = ctx.measureText(S[2]).width
      const lh = fontPx + 3 + (showDeva ? fontPx + 2 : 0)
      const rect: [number, number, number, number] = [x - tw / 2 - 3, y + r + 3, x + tw / 2 + 3, y + r + 3 + lh]
      if (!fits(rect) && i !== selState) continue
      placed.push(rect)
      const dim = focus && !litStates.has(i)
      ctx.fillStyle = rgba(L.bg, dim ? 0.4 : 0.7)
      ctx.fillRect(rect[0], rect[1], rect[2] - rect[0], lh)
      ctx.fillStyle = rgba(S[5] === 'h' ? L.goldLight : L.text, dim ? 0.4 : 0.95)
      ctx.fillText(S[2], x, y + r + 4)
      if (showDeva) {
        ctx.font = `${fontPx - 1}px ${L.fontDeva}`
        ctx.fillStyle = rgba(L.text, dim ? 0.3 : 0.6)
        ctx.fillText(S[4], x, y + r + 6 + fontPx)
      }
    }
  }, [map, ix])

  const requestDraw = useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame(draw)
  }, [draw])

  useEffect(() => {
    requestDraw()
  }, [sel, hover, filter, pos, requestDraw])

  // ── Size and fit ───────────────────────────────────────────────────────────
  useEffect(() => {
    const frame = frameRef.current
    const cv = canvasRef.current
    if (!frame || !cv || !map) return
    look.current = readLook(frame)
    const fit = () => {
      const r = frame.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      size.current = { w: r.width, h: r.height, dpr }
      cv.width = Math.round(r.width * dpr)
      cv.height = Math.round(r.height * dpr)
      const portrait = r.height > r.width * 1.1
      const turned = portrait !== rotRef.current
      if (turned) {
        rotRef.current = portrait
        setRot(portrait)
      }
      const k = portrait ? Math.min(r.width / WORLD_H, r.height / WORLD_W) : Math.min(r.width / WORLD_W, r.height / WORLD_H)
      const first = fitK.current === 0.5 && cam.current.k === 0.5
      fitK.current = k
      if (first || turned) cam.current = { x: 0, y: 0, k }
      requestDraw()
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(frame)
    // fonts settle after first paint; redraw so labels use them
    document.fonts?.ready.then(() => requestDraw())
    return () => ro.disconnect()
  }, [map, requestDraw])

  // ── Camera ────────────────────────────────────────────────────────────────
  const clampK = (k: number) => Math.max(fitK.current * 0.8, Math.min(Math.max(fitK.current * 9, 2.4), k))
  const flyTo = useCallback(
    (x: number, y: number, k: number) => {
      cancelAnimationFrame(anim.current)
      const to = { x, y, k: clampK(k) }
      if (reducedMotion()) {
        cam.current = to
        requestDraw()
        return
      }
      const from = { ...cam.current }
      const t0 = performance.now()
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 520)
        const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
        cam.current = { x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e, k: from.k + (to.k - from.k) * e }
        draw()
        if (p < 1) anim.current = requestAnimationFrame(step)
      }
      anim.current = requestAnimationFrame(step)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draw, requestDraw],
  )

  /** Centre a world point, leaving room for the panel (right side on desktop, the sheet on phones). */
  const focusOn = useCallback(
    (wx: number, wy: number, zoom: number) => {
      const { w, h } = size.current
      const k = clampK(Math.max(cam.current.k, fitK.current * zoom))
      const offX = w >= 960 ? 200 / k : 0
      const offY = w < 960 ? h * 0.22 / k : 0
      flyTo(wx + offX, wy + offY, k)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [flyTo],
  )

  const open = useCallback(
    (next: MapSelection, method: 'tap' | 'search' | 'link' | 'url') => {
      if (!map || !next) return
      setSel(next)
      if (next.kind === 'state') {
        const S = map.states[next.i]
        const p = posRef.current!.s[next.i]
        focusOn(p[0], p[1], 1.8)
        trackEvent(EVENTS.MapNodeOpened, { item_id: S[0], item_type: 'state', method })
      } else {
        const N = map.nodes[next.i]
        const p = posRef.current!.n[next.i]
        focusOn(p[0], p[1], 3)
        trackEvent(EVENTS.MapNodeOpened, { item_id: N[0], item_type: N[1] === 1 ? 'story' : 'verse', method })
      }
    },
    [map, focusOn],
  )

  // deep links (?s=chinta or ?s=chinta-worry, ?n=bg.2.47) and the reflect box's "show on the map"
  useEffect(() => {
    if (!map || !ix) return
    const q = new URLSearchParams(window.location.search)
    const s = q.get('s')
    const n = q.get('n')
    if (s && ix.stateById.has(s)) open({ kind: 'state', i: ix.stateById.get(s)! }, 'url')
    else if (n && ix.nodeById.has(n)) open({ kind: 'node', i: ix.nodeById.get(n)! }, 'url')
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<{ state: string }>).detail?.state
      if (id && ix.stateById.has(id)) open({ kind: 'state', i: ix.stateById.get(id)! }, 'link')
    }
    window.addEventListener('explore:open', onOpen)
    return () => window.removeEventListener('explore:open', onOpen)
  }, [map, ix, open])

  // ── Pointer: pan, pinch, tap, hover ───────────────────────────────────────
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const gesture = useRef({ moved: 0, startDist: 0, startK: 0 })

  const hitTest = useCallback(
    (px: number, py: number): Hit => {
      if (!map || !ix) return null
      const { w, h } = size.current
      const { x: cx, y: cy, k } = cam.current
      const wx = (px - w / 2) / k + cx
      const wy = (py - h / 2) / k + cy
      let best: Hit = null
      let bd = (16 / k) ** 2
      const P = posRef.current!
      P.s.forEach((S, i) => {
        const d = (S[0] - wx) ** 2 + (S[1] - wy) ** 2
        if (d < bd) (bd = d), (best = { kind: 'state', i })
      })
      if (best) return best
      bd = (11 / k) ** 2
      const f = stateRef.current.filter
      map.nodes.forEach((N, i) => {
        if (f !== null && N[2] !== f) return
        const d = (P.n[i][0] - wx) ** 2 + (P.n[i][1] - wy) ** 2
        if (d < bd) (bd = d), (best = { kind: 'node', i })
      })
      return best
    },
    [map, ix],
  )

  const local = (e: React.PointerEvent | React.WheelEvent) => {
    const r = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  const zoomAt = (px: number, py: number, factor: number) => {
    const { w, h } = size.current
    const c = cam.current
    const k = clampK(c.k * factor)
    const wx = (px - w / 2) / c.k + c.x
    const wy = (py - h / 2) / c.k + c.y
    cam.current = { k, x: wx - (px - w / 2) / k, y: wy - (py - h / 2) / k }
    requestDraw()
  }

  const onPointerDown = (e: React.PointerEvent) => {
    cancelAnimationFrame(anim.current)
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    pointers.current.set(e.pointerId, local(e))
    gesture.current.moved = 0
    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values())
      gesture.current.startDist = Math.hypot(a.x - b.x, a.y - b.y)
      gesture.current.startK = cam.current.k
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const p = local(e)
    const prev = pointers.current.get(e.pointerId)
    if (!prev) {
      if (e.pointerType === 'mouse') {
        const hit = hitTest(p.x, p.y)
        const cur = hover?.hit
        if (hit?.kind !== cur?.kind || hit?.i !== cur?.i) setHover(hit ? { hit, x: p.x, y: p.y } : null)
        else if (hit) setHover({ hit, x: p.x, y: p.y })
      }
      return
    }
    pointers.current.set(e.pointerId, p)
    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values())
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      if (gesture.current.startDist > 0) {
        const target = clampK(gesture.current.startK * (d / gesture.current.startDist))
        zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, target / cam.current.k)
      }
      gesture.current.moved += 10
      return
    }
    const dx = p.x - prev.x
    const dy = p.y - prev.y
    gesture.current.moved += Math.abs(dx) + Math.abs(dy)
    cam.current = { ...cam.current, x: cam.current.x - dx / cam.current.k, y: cam.current.y - dy / cam.current.k }
    requestDraw()
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const p = local(e)
    const wasTap = pointers.current.size === 1 && gesture.current.moved < 6
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) gesture.current.startDist = 0
    if (!wasTap) return
    const hit = hitTest(p.x, p.y)
    if (hit) open(hit, 'tap')
    else setSel(null)
  }

  const onWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return
    e.preventDefault()
    const p = local(e)
    zoomAt(p.x, p.y, Math.exp(-e.deltaY * 0.01))
  }

  // ctrl + wheel must not zoom the page: React's wheel listener is passive, so add one that is not
  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const stop = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault()
    }
    cv.addEventListener('wheel', stop, { passive: false })
    return () => cv.removeEventListener('wheel', stop)
  }, [map])

  const onKey = (e: React.KeyboardEvent) => {
    const c = cam.current
    const step = 60 / c.k
    const keys: Record<string, () => void> = {
      ArrowLeft: () => (cam.current = { ...c, x: c.x - step }),
      ArrowRight: () => (cam.current = { ...c, x: c.x + step }),
      ArrowUp: () => (cam.current = { ...c, y: c.y - step }),
      ArrowDown: () => (cam.current = { ...c, y: c.y + step }),
      '+': () => zoomAt(size.current.w / 2, size.current.h / 2, 1.3),
      '=': () => zoomAt(size.current.w / 2, size.current.h / 2, 1.3),
      '-': () => zoomAt(size.current.w / 2, size.current.h / 2, 1 / 1.3),
      Escape: () => setSel(null),
    }
    const fn = keys[e.key]
    if (!fn) return
    e.preventDefault()
    fn()
    requestDraw()
  }

  const showAll = () => {
    setSel(null)
    flyTo(0, 0, fitK.current)
  }

  // ── Filter and search ──────────────────────────────────────────────────────
  const pickFilter = (g: number | null) => {
    setFilter(g)
    trackEvent(EVENTS.MapFilterSelected, { to: g === null ? 'all' : map?.groups[g][0] })
  }

  const results: Result[] = useMemo(() => {
    if (!map || !ix) return []
    const q = fold(query)
    if (q.length < 2) return []
    const out: Result[] = []
    map.states.forEach((S, i) => {
      if (ix.skeys[i].includes(q)) out.push({ kind: 'state', i, title: S[2], sub: `${S[3]}, ${S[5] === 'a' ? 'a state that weighs on the mind' : 'a state that heals'}` })
    })
    const refHits: Result[] = []
    const lineHits: Result[] = []
    const refQ = q.replace(/^(bhagavad )?gita /, 'bhagavad gita ')
    map.nodes.forEach((N, i) => {
      if (filter !== null && N[2] !== filter) return
      const kk = ix.keys[i]
      if (kk.ref.includes(refQ) || (/^\d+\.\d+$/.test(q) && kk.ref.endsWith(` ${q}`))) refHits.push({ kind: 'node', i, title: N[5], sub: N[6] })
      else if (q.length >= 3 && kk.line.includes(q)) lineHits.push({ kind: 'node', i, title: N[1] === 1 ? N[6] : N[5], sub: N[1] === 1 ? N[5] : N[6] })
    })
    return [...out.slice(0, 4), ...refHits.slice(0, 6), ...lineHits].slice(0, 8)
  }, [map, ix, query, filter])

  const choose = (r: Result) => {
    trackEvent(EVENTS.SearchCompleted, { query: query.slice(0, 80), results: results.length, location: 'explore_map' })
    setQuery('')
    setActive(0)
    open({ kind: r.kind, i: r.i }, 'search')
  }

  const onSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(results.length - 1, a + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(0, a - 1))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      choose(results[active])
    } else if (e.key === 'Escape') setQuery('')
  }

  const hovered = hover?.hit && map ? (hover.hit.kind === 'state' ? { t: map.states[hover.hit.i][2], s: map.states[hover.hit.i][3] } : { t: map.nodes[hover.hit.i][5], s: map.nodes[hover.hit.i][6] }) : null

  return (
    <div className="ex-map">
      <div className="ex-map-bar">
        <div className="ex-search" role="search">
          <label htmlFor="ex-search-input" className="ex-visually-hidden">
            Search the map
          </label>
          <input
            id="ex-search-input"
            type="search"
            className="ex-search-input"
            placeholder="Search a feeling, a word or a verse (2.47)"
            value={query}
            autoComplete="off"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="ex-search-list"
            aria-activedescendant={results[active] ? `ex-r-${active}` : undefined}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={onSearchKey}
          />
          {results.length > 0 && (
            <ul id="ex-search-list" className="ex-search-list" role="listbox">
              {results.map((r, i) => (
                <li key={`${r.kind}-${r.i}`} id={`ex-r-${i}`} role="option" aria-selected={i === active}>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => choose(r)}>
                    <span className="ex-r-title">{r.title}</span>
                    <span className="ex-r-sub">{r.sub}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="ex-filters" role="group" aria-label="Show texts from">
          <button type="button" className="sx-chip ex-filter" aria-pressed={filter === null} onClick={() => pickFilter(null)}>
            All texts
          </button>
          {map?.groups.map(([id, label], g) => (
            <button key={id} type="button" className="sx-chip ex-filter" aria-pressed={filter === g} onClick={() => pickFilter(filter === g ? null : g)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={frameRef}
        className={`ex-frame${sel ? ' has-panel' : ''}${rot ? ' is-rot' : ''}`}
        tabIndex={0}
        aria-label="Map of inner states and the verses and stories around them. Use the search box or the list of states below to open one. Arrow keys move the map, plus and minus zoom."
        onKeyDown={onKey}
      >
        <span className="ex-ground ex-ground--weigh" aria-hidden="true">
          What weighs on the mind
        </span>
        <span className="ex-ground ex-ground--heal" aria-hidden="true">
          What heals it
        </span>
        <canvas
          ref={canvasRef}
          className="ex-canvas"
          role="img"
          aria-label="Map of the mind"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={() => hover && setHover(null)}
          onWheel={onWheel}
        />
        {!map && <p className="ex-loading">{failed ? 'The map did not load. Refresh the page to try again.' : 'Drawing the map'}</p>}
        {hovered && hover && (
          <div className="ex-tip" style={{ left: hover.x, top: hover.y }} aria-hidden="true">
            <strong>{hovered.t}</strong>
            <span>{hovered.s.length > 110 ? `${hovered.s.slice(0, 108).trimEnd()}…` : hovered.s}</span>
          </div>
        )}
        <div className="ex-zoom" role="group" aria-label="Zoom">
          <button type="button" aria-label="Zoom in" onClick={() => zoomAt(size.current.w / 2, size.current.h / 2, 1.4)}>
            +
          </button>
          <button type="button" aria-label="Zoom out" onClick={() => zoomAt(size.current.w / 2, size.current.h / 2, 1 / 1.4)}>
            −
          </button>
          <button type="button" className="ex-zoom-all" onClick={showAll}>
            Whole map
          </button>
        </div>
        {map && ix && sel && <MapPanel map={map} sel={sel} onOpen={(next) => open(next, 'link')} onClose={() => setSel(null)} stateById={ix.stateById} nodeById={ix.nodeById} />}
      </div>

      <ul className="ex-legend" aria-label="Key">
        <li>
          <span className="ex-key ex-key--weigh" aria-hidden="true" /> a state that weighs on the mind
        </li>
        <li>
          <span className="ex-key ex-key--heal" aria-hidden="true" /> a state that heals
        </li>
        <li>
          <span className="ex-key ex-key--verse" aria-hidden="true" /> a verse
        </li>
        <li>
          <span className="ex-key ex-key--story" aria-hidden="true" /> a story
        </li>
        <li className="ex-legend-how">Drag to move, pinch or use + and − to zoom, tap a point to open it.</li>
      </ul>
    </div>
  )
}
