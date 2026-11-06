import type { Metadata } from 'next'

/**
 * Dhyaan's waitlist site lives at DHYAAN_HOST. next.config.mjs rewrites every path on
 * that host to /dhyaan/<path>, so links inside these pages are written as plain
 * root paths ("/learn", "/nivata") and canonicals point at the subdomain.
 */
export const DHYAAN_HOST = 'dhyaan.wisdomquotes.in'
export const DHYAAN_URL = `https://${DHYAAN_HOST}`
export const dabs = (path: string) => (path.startsWith('http') ? path : `${DHYAAN_URL}${path === '/' ? '' : path}`)

export const NAME = 'Dhyaan'
export const TAGLINE = 'Silent meditation for iPhone and Apple Watch'
/** One sentence, used everywhere (title tags, schema, bios, press). Do not vary it. */
export const ONE_LINER =
  'Dhyaan is a silent meditation app for iPhone, Apple Watch and AirPods. After the bell it reads your sit back to you: when you arrived, how still you stayed, how your heart settled. No voice, no grade.'
export const LAUNCH = 'early 2027'
export const OG_IMAGE = `${DHYAAN_URL}/dhyaan-assets/og.png`
export const ICON = '/dhyaan-assets/icon.png'
export const WISDOM_URL = 'https://wisdomquotes.in'

export const ORG_LD = {
  '@type': 'Organization',
  '@id': `${DHYAAN_URL}/#organization`,
  name: NAME,
  url: DHYAAN_URL,
  logo: `${DHYAAN_URL}/dhyaan-assets/icon.png`,
  description: ONE_LINER,
  founder: { '@type': 'Person', name: 'Ankur Shukla', url: `${WISDOM_URL}/about` },
  parentOrganization: { '@type': 'Organization', name: 'Wisdom', url: WISDOM_URL },
}

export const APP_LD = {
  '@type': 'SoftwareApplication',
  '@id': `${DHYAAN_URL}/#app`,
  name: NAME,
  alternateName: 'Dhyaan: Silent Meditation',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'iOS, watchOS',
  description: ONE_LINER,
  url: DHYAAN_URL,
  publisher: { '@id': `${DHYAAN_URL}/#organization` },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Every sit is free. Optional Plus adds history and patterns.' },
}

export function pageMeta({ title, description, path, type = 'website' }: { title: string; description: string; path: string; type?: 'website' | 'article' }): Metadata {
  const url = dabs(path)
  return {
    // The home page shares a segment with the Dhyaan layout, so the layout's title
    // template doesn't reach it; give it an absolute title instead of Wisdom's.
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: NAME, type, locale: 'en_US', images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Dhyaan: a lamp in a windless place' }] },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE], creator: '@thisisashukla' },
  }
}

export const NAV = [
  { href: '/#witnesses', label: 'How it reads you' },
  { href: '/learn', label: 'Blog' },
  { href: '/nivata', label: '60-second test' },
  { href: '/faq', label: 'FAQ' },
] as const
