/* eslint-disable @next/next/no-img-element */
import type { PillarId } from '../_lib/articles'
import { COVERS } from '../_lib/covers'

/**
 * Header image and thumbnail for /learn pages. Uses a generated image from
 * /dhyaan-assets/blog when one exists for the slug (COVERS); otherwise draws
 * brand artwork in SVG, seeded by the slug so every article gets its own
 * composition in the same visual family:
 *   measuring → lanes of motion settling, devices → sensor rings around a flame,
 *   silent → a single flame on a dusk horizon, dhyana → a ring of lamps.
 */
type Variant = 'hero' | 'card' | 'thumb'

function seeded(slug: string) {
  let h = 2166136261
  for (let i = 0; i < slug.length; i++) h = Math.imul(h ^ slug.charCodeAt(i), 16777619)
  let s = h >>> 0 || 1
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296)
}

const FLAME = 'M0 -64 C 16 -38, 22 -16, 9 4 C 4 11, -6 12, -11 7 C -22 -4, -18 -30, 0 -64 Z'
const CORE = 'M0 -28 C 6 -17, 6 -6, 0 2 C -5 -3, -6 -14, 0 -28 Z'

function Lamp({ x, y, s = 1, id }: { x: number; y: number; s?: number; id: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r="120" fill={`url(#${id}-glow)`} className="dh-cover__glow" />
      <g className="dh-cover__flame">
        <path d={FLAME} fill={`url(#${id}-fire)`} />
        <path d={CORE} fill="#FFF4DD" opacity=".85" />
      </g>
      <path d="M-58 14 C -44 44, 44 44, 58 14 C 46 22, 22 26, 0 26 C -22 26, -46 22, -58 14 Z" fill="#B8643A" />
      <path d="M-58 14 C -46 6, -22 4, 0 4 C 22 4, 46 6, 58 14 C 44 22, 22 25, 0 25 C -22 25, -44 22, -58 14 Z" fill="#7A3B1F" />
    </g>
  )
}

function Art({ slug, pillar }: { slug: string; pillar: PillarId }) {
  const r = seeded(slug)
  const id = `cv-${slug.replace(/[^a-z0-9]/g, '')}`
  const W = 1600
  const H = 900
  const defs = (
    <defs>
      <radialGradient id={`${id}-glow`}>
        <stop offset="0" stopColor="#E8792A" stopOpacity=".55" />
        <stop offset=".45" stopColor="#E8792A" stopOpacity=".12" />
        <stop offset="1" stopColor="#E8792A" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-fire`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#E8792A" />
        <stop offset=".55" stopColor="#F4A24B" />
        <stop offset="1" stopColor="#FFE3B0" />
      </linearGradient>
      <radialGradient id={`${id}-bg`} cx={0.3 + r() * 0.4} cy="0.35" r="0.9">
        <stop offset="0" stopColor="#2A1C16" />
        <stop offset=".6" stopColor="#140E0B" />
        <stop offset="1" stopColor="#0B0807" />
      </radialGradient>
      <filter id={`${id}-grain`}>
        <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed={Math.floor(r() * 50)} />
        <feColorMatrix values="0 0 0 0 1  0 0 0 0 .9  0 0 0 0 .8  0 0 0 .06 0" />
      </filter>
    </defs>
  )

  let body: React.ReactNode
  if (pillar === 'measuring') {
    const lanes = [
      { y: 300, c: '#B9A7F0' },
      { y: 470, c: '#E8792A' },
    ]
    const n = 64
    const x0 = 180
    const xw = 1240
    const calm = 0.12 + r() * 0.1
    body = (
      <>
        {lanes.map((l, li) => (
          <g key={li} opacity=".9">
            {Array.from({ length: n }, (_, i) => {
              const t = i / n
              const a = t < calm ? 0.55 + r() * 0.45 : r() < 0.08 ? 0.5 : 0.05 + r() * 0.08
              const h = a * 120
              return <rect key={i} x={x0 + i * (xw / n)} y={l.y - h / 2} width={xw / n - 7} height={Math.max(4, h)} rx="3" fill={l.c} opacity={0.35 + a * 0.6} />
            })}
          </g>
        ))}
        <path
          d={Array.from({ length: 40 }, (_, i) => {
            const t = i / 39
            const y = 640 + 90 * (1 - Math.min(1, t / (0.35 + r() * 0.1))) ** 2 + (r() - 0.5) * 8
            return `${i ? 'L' : 'M'}${x0 + t * xw},${y.toFixed(1)}`
          }).join(' ')}
          fill="none"
          stroke="#F0907A"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line x1={x0 + xw * calm} x2={x0 + xw * calm} y1="210" y2="760" stroke="#978776" strokeDasharray="6 10" opacity=".6" />
        <Lamp x={1420} y={210} s={0.9} id={id} />
      </>
    )
  } else if (pillar === 'devices') {
    const cx = 560 + r() * 480
    const cy = 450
    body = (
      <>
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx={cx} cy={cy} r={110 + i * 74} fill="none" stroke="#F3EADF" strokeOpacity={0.16 - i * 0.015} strokeWidth="2" />
        ))}
        <circle cx={cx} cy={cy} r={110 + 3 * 74} fill="none" stroke="#B9A7F0" strokeWidth="3" strokeDasharray={`${40 + r() * 80} 1600`} strokeLinecap="round" className="dh-cover__orbit" />
        <circle cx={cx} cy={cy} r={110 + 5 * 74} fill="none" stroke="#E8792A" strokeWidth="3" strokeDasharray={`${60 + r() * 80} 2400`} strokeLinecap="round" className="dh-cover__orbit dh-cover__orbit--b" />
        {Array.from({ length: 5 }, (_, i) => {
          const a = r() * Math.PI * 2
          const rr = 110 + (2 + Math.floor(r() * 6)) * 74
          return <circle key={i} cx={cx + Math.cos(a) * rr} cy={cy + Math.sin(a) * rr} r="6" fill={i % 2 ? '#B9A7F0' : '#F0907A'} />
        })}
        <Lamp x={cx} y={cy + 30} s={1.4} id={id} />
      </>
    )
  } else if (pillar === 'silent') {
    const hx = 380 + r() * 840
    const hy = 560
    body = (
      <>
        <rect width={W} height={hy} fill={`url(#${id}-sky)`} />
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#120C18" stopOpacity="0" />
            <stop offset="1" stopColor="#4A2210" stopOpacity=".55" />
          </linearGradient>
        </defs>
        {Array.from({ length: 46 }, (_, i) => (
          <circle key={i} cx={r() * W} cy={r() * (hy - 120)} r={r() * 2.2 + 0.4} fill="#F3EADF" opacity={0.15 + r() * 0.5} />
        ))}
        <line x1="0" x2={W} y1={hy} y2={hy} stroke="#E8792A" strokeOpacity=".35" strokeWidth="2" />
        <rect x={hx - 7} y={hy + 10} width="14" height="240" rx="7" fill="#E8792A" opacity=".28" style={{ filter: 'blur(6px)' }} />
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1={hx - 40 - i * 26} x2={hx + 40 + i * 26} y1={hy + 40 + i * 30} y2={hy + 40 + i * 30} stroke="#F4A24B" strokeOpacity={0.22 - i * 0.025} strokeWidth="2" strokeLinecap="round" />
        ))}
        <Lamp x={hx} y={hy - 30} s={1.15} id={id} />
      </>
    )
  } else {
    const cx = W / 2 + (r() - 0.5) * 300
    const cy = 450
    const n = 8 + Math.floor(r() * 5)
    const R = 280
    body = (
      <>
        {[R + 90, R, R - 120].map((rr, i) => (
          <circle key={i} cx={cx} cy={cy} r={rr} fill="none" stroke="#E8B04B" strokeOpacity={0.12 + i * 0.04} strokeWidth="2" />
        ))}
        {Array.from({ length: n * 2 }, (_, i) => {
          const a = (i / (n * 2)) * Math.PI * 2
          const x1 = cx + Math.cos(a) * (R - 120)
          const y1 = cy + Math.sin(a) * (R - 120)
          const x2 = cx + Math.cos(a) * (R + 90)
          const y2 = cy + Math.sin(a) * (R + 90)
          const mx = cx + Math.cos(a + Math.PI / (n * 2)) * R
          const my = cy + Math.sin(a + Math.PI / (n * 2)) * R
          return <path key={i} d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`} fill="none" stroke="#E8B04B" strokeOpacity=".1" strokeWidth="2" />
        })}
        {Array.from({ length: n }, (_, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2
          return <Lamp key={i} x={cx + Math.cos(a) * R} y={cy + Math.sin(a) * R + 20} s={0.42} id={id} />
        })}
        <Lamp x={cx} y={cy + 40} s={1.1} id={id} />
      </>
    )
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" role="presentation" aria-hidden="true">
      {defs}
      <rect width={W} height={H} fill={`url(#${id}-bg)`} />
      {body}
      <rect width={W} height={H} filter={`url(#${id}-grain)`} />
    </svg>
  )
}

export default function Cover({
  slug,
  pillar,
  alt,
  variant = 'card',
  className = '',
  eager = false,
}: {
  slug: string
  pillar: PillarId
  alt: string
  variant?: Variant
  className?: string
  eager?: boolean
}) {
  const img = COVERS[slug]
  return (
    <div className={`dh-cover dh-cover--${variant} dh-cover--${pillar} ${className}`}>
      {img ? (
        <img src={img} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" width={1280} height={720} />
      ) : (
        <Art slug={slug} pillar={pillar} />
      )}
    </div>
  )
}
