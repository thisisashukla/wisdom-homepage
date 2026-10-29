import fs from 'node:fs'
import path from 'node:path'
import type { ThemePlan } from './themePlans'

export type ThemeVariant = 'in' | 'global'

export type ThemeHero = {
  /** 1920x1080 desktop hero */
  desktop: string
  /** 1080x1350 mobile hero (4:5) */
  mobile: string
  /** 800x450 tile for related-plan cards */
  tile: string
  /** 1200x630 share image */
  og: string
  alt: string
  /** false while the commissioned art isn't in /public yet (chapter art stands in) */
  ready: boolean
}

const exists = (p: string) => {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', p))
  } catch {
    return false
  }
}

/**
 * Resolve the hero files for a plan. Expects, per slug and variant:
 *   /assets/themes/<slug>[-global]-1920.webp, -1080x1350.webp, -800.webp and /og/theme-<slug>[-global].webp
 * Falls back to the India set for 'global', then to the chapter art, so a page never ships without an image.
 */
export function themeHero(plan: ThemePlan, variant: ThemeVariant): ThemeHero {
  const tryBase = (suffix: string) => {
    const base = `/assets/themes/${plan.slug}${suffix}`
    if (!exists(`${base}-1920.webp`)) return null
    const og = `/og/theme-${plan.slug}${suffix}.webp`
    return {
      desktop: `${base}-1920.webp`,
      mobile: exists(`${base}-1080x1350.webp`) ? `${base}-1080x1350.webp` : `${base}-1920.webp`,
      tile: exists(`${base}-800.webp`) ? `${base}-800.webp` : `${base}-1920.webp`,
      og: exists(og) ? og : `${base}-1920.webp`,
    }
  }
  const chosen = (variant === 'global' && tryBase('-global')) || tryBase('')
  if (chosen) {
    const alt = variant === 'global' && chosen.desktop.includes('-global') ? plan.image.altGlobal : plan.image.alt
    return { ...chosen, alt, ready: true }
  }
  const fb = plan.image.fallback
  return { desktop: fb, mobile: fb, tile: fb, og: fb, alt: `${plan.label}: illustration from the Bhagavad Gita`, ready: false }
}
