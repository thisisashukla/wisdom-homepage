import React from 'react'
import { ICONS } from '@/lib/onboarding/icons'

/** The app's WIcon on the web: Phosphor glyphs in currentColor. */
export default function Icon({
  name,
  weight = 'regular',
  size = 20,
  className,
  style,
}: {
  name: string
  weight?: 'regular' | 'bold' | 'fill' | 'duotone'
  size?: number
  className?: string
  style?: React.CSSProperties
}) {
  const inner = ICONS[`${name}:${weight}`] ?? ICONS[`${name}:regular`] ?? ''
  return (
    <svg
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  )
}
