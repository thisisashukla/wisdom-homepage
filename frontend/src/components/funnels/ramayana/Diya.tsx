import type { LampId, LampState } from '@/lib/funnels/ramayana/types'

/**
 * A clay lamp drawn in code (no image, no deity art), in house gold. The flame says the state:
 * full flame = in that version, low flame = mentioned only, no flame = not there,
 * dashed bowl = not yet known (film only). The rim carries the text's marker.
 */
export default function Diya({ lamp, state, size = 44 }: { lamp: LampId | 'plain'; state: LampState; size?: number }) {
  return (
    <svg
      className={`rl-diya rl-diya-${lamp}`}
      data-state={state}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      {(state === 'lit' || state === 'partial') && (
        <g className="rl-glow">
          <circle cx="24" cy="21" r="17" />
          <circle cx="24" cy="21" r="10" />
        </g>
      )}
      {(state === 'lit' || state === 'partial') && (
        <g className="rl-flame">
          <path className="rl-flame-out" d="M24 7c4.6 6.2 6.4 10.6 6.4 14.1A6.4 6.4 0 0 1 24 27.5a6.4 6.4 0 0 1-6.4-6.4C17.6 17.6 19.4 13.2 24 7z" />
          <path className="rl-flame-in" d="M24 15.5c2.2 3 3.1 5.1 3.1 6.8a3.1 3.1 0 0 1-6.2 0c0-1.7.9-3.8 3.1-6.8z" />
        </g>
      )}
      <path className="rl-wick" d="M24 27.5v3" />
      <path className="rl-bowl" d="M7 30.5h34c-1.6 7.2-8.6 11.5-17 11.5S8.6 37.7 7 30.5z" />
      <path className="rl-rim" d="M7 30.5h34" />
    </svg>
  )
}
