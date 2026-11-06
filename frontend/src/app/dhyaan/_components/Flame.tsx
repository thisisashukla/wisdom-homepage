/**
 * The Dhyaan lamp: a flat clay diya with an asymmetric flame. `state` drives the CSS
 * animation only (steady = barely moves, flicker = wind). Decorative: aria-hidden.
 */
export default function Flame({ size = 120, state = 'steady', className = '' }: { size?: number; state?: 'steady' | 'flicker' | 'unlit'; className?: string }) {
  return (
    <svg className={`dh-flame dh-flame--${state} ${className}`} width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="dhGlow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#E8792A" stopOpacity=".35" />
          <stop offset="100%" stopColor="#E8792A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dhFire" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#E8792A" />
          <stop offset="55%" stopColor="#F4A24B" />
          <stop offset="100%" stopColor="#FFE3B0" />
        </linearGradient>
      </defs>
      {state !== 'unlit' && <circle cx="60" cy="52" r="44" fill="url(#dhGlow)" className="dh-flame__glow" />}
      {state !== 'unlit' && (
        <g className="dh-flame__fire">
          <path d="M60 22 C 70 38, 74 52, 66 64 C 63 68, 57 69, 54 66 C 47 59, 50 44, 60 22 Z" fill="url(#dhFire)" />
          <path d="M60 44 C 64 51, 64 58, 60 63 C 57 60, 56 53, 60 44 Z" fill="#FFF4DD" opacity=".85" />
        </g>
      )}
      <path d="M22 74 C 30 92, 90 92, 98 74 C 92 79, 74 82, 60 82 C 46 82, 28 79, 22 74 Z" fill="#B8643A" />
      <path d="M22 74 C 28 70, 46 69, 60 69 C 74 69, 92 70, 98 74 C 90 79, 74 81, 60 81 C 46 81, 30 79, 22 74 Z" fill="#7A3B1F" />
      <path d="M58 69 L 61 64 L 63 69 Z" fill="#3A1C10" />
    </svg>
  )
}
