/**
 * Ram Shalaka metadata and JSON-LD builders (funnel-specific schema on top of lib/seo).
 * BreadcrumbList comes from PageHero; these return the rest.
 */
import type { Metadata } from 'next'
import type { Locale } from '@/lib/locale'
import { AUTHOR_LD, PUBLISHER_LD, SITE, faqLd } from '@/lib/seo'
import { cardUrl, firstHalf, getLines, lineCopy, pageCopy, toolHref, type RsLine } from './index'

const PUBLISHED = '2026-10-30'
const MODIFIED = '2026-10-31'

const AUTHOR = { ...AUTHOR_LD, sameAs: ['https://www.linkedin.com/in/thisisashukla/', 'https://x.com/thisisashukla'] }
const PUBLISHER = PUBLISHER_LD
const MANAS_CITATION = {
  '@type': 'Book',
  name: 'Shri Ramcharitmanas',
  alternateName: 'श्रीरामचरितमानस',
  author: { '@type': 'Person', name: 'Goswami Tulsidas', alternateName: 'गोस्वामी तुलसीदास' },
  publisher: { '@type': 'Organization', name: 'Gita Press, Gorakhpur' },
  inLanguage: 'awa',
}

const langs = () => ({
  en: `${SITE}/ram-shalaka`,
  'en-IN': `${SITE}/ram-shalaka`,
  hi: `${SITE}/hi/ram-shalaka`,
  'hi-IN': `${SITE}/hi/ram-shalaka`,
  'x-default': `${SITE}/ram-shalaka`,
})

export function toolMetadata(locale: Locale): Metadata {
  const c = pageCopy(locale)
  const url = `${SITE}${toolHref(locale)}`
  const image = `${SITE}${cardUrl(2, 'post', locale)}`
  return {
    title: { absolute: c.title },
    description: c.description,
    alternates: { canonical: url, languages: langs() },
    openGraph: {
      title: c.title,
      description: c.description,
      url,
      type: 'article',
      siteName: 'Wisdom',
      locale: locale === 'hi' ? 'hi_IN' : 'en_IN',
      alternateLocale: [locale === 'hi' ? 'en_IN' : 'hi_IN'],
      images: [{ url: image, width: 1080, height: 1350, alt: c.h1 }],
    },
    twitter: { card: 'summary_large_image', title: c.title, description: c.description, images: [image] },
  }
}

export function toolJsonLd(locale: Locale): object[] {
  const c = pageCopy(locale)
  const url = `${SITE}${toolHref(locale)}`
  const lines = getLines()
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: c.title,
      description: c.quickAnswer,
      inLanguage: locale,
      url,
      mainEntityOfPage: url,
      image: [`${SITE}${cardUrl(2, 'post', locale)}`],
      author: AUTHOR,
      publisher: PUBLISHER,
      datePublished: PUBLISHED,
      dateModified: MODIFIED,
      citation: MANAS_CITATION,
      about: [{ '@type': 'Thing', name: 'Shri Ram Shalaka Prashnavali' }, MANAS_CITATION],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: c.nineHeading,
      numberOfItems: lines.length,
      itemListElement: lines.map((l, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: firstHalf(l),
        url: `${SITE}/hi/ram-shalaka/${l.slug}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: c.h1,
      alternateName: locale === 'hi' ? 'Shri Ram Shalaka Prashnavali' : 'श्रीराम शलाका प्रश्नावली',
      url,
      inLanguage: locale,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      image: `${SITE}${cardUrl(2, 'post', locale)}`,
      publisher: PUBLISHER,
      about: MANAS_CITATION,
    },
    { ...faqLd(c.faq), inLanguage: locale },
  ]
}

/** "गरल सुधा रिपु करहिं मिताई का अर्थ | Garal Sudha Ripu Karahi Mitai": most searches for a line are typed in Latin letters. */
export const lineTitle = (l: RsLine): string => `${firstHalf(l)}${lineCopy().titleSuffix} | ${l.roman}`

const secondHalf = (l: RsLine): string => l.deva[1].replace(/[।॥\s]+$/g, '')

const SIGN_PHRASE: Record<RsLine['sign'], string> = {
  shubh: 'शुभ उत्तर',
  sanshay: 'संशय का उत्तर',
  ashubh: '‘अभी नहीं’ का उत्तर',
}

export function lineDescription(l: RsLine): string {
  const meaning = l.meaning.hi.length > 110 ? l.cardMeaning.hi : l.meaning.hi
  const lead = `${firstHalf(l)}, ${secondHalf(l)}, अर्थ: ${meaning} `
  const answer = SIGN_PHRASE[l.sign]
  const tails = [
    `${l.kand.hi}, ${l.place.hi}। श्रीराम शलाका में ${answer}।`,
    `श्रीराम शलाका में ${answer}, प्रसंग सहित।`,
    'प्रसंग सहित।',
  ]
  for (const t of tails) if ((lead + t).length <= 160) return lead + t
  return lead.trim()
}

export function lineMetadata(l: RsLine): Metadata {
  const url = `${SITE}/hi/ram-shalaka/${l.slug}`
  const title = lineTitle(l)
  const description = lineDescription(l)
  const image = `${SITE}${cardUrl(l.n, 'post', 'hi')}`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: { hi: url, 'hi-IN': url } },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: 'Wisdom',
      locale: 'hi_IN',
      images: [{ url: image, width: 1080, height: 1350, alt: firstHalf(l) }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

export function lineJsonLd(l: RsLine): object[] {
  const url = `${SITE}/hi/ram-shalaka/${l.slug}`
  const speaker = { '@type': 'Person', name: l.who.en.split(',')[0].split(' to ')[0].split(' over ')[0] }
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: lineTitle(l),
      description: l.quick.hi,
      articleBody: [l.quick.hi, l.meaning.hi, l.scene.hi, l.forYou.hi].join('\n\n'),
      inLanguage: 'hi',
      url,
      mainEntityOfPage: url,
      image: [`${SITE}${cardUrl(l.n, 'post', 'hi')}`],
      author: AUTHOR,
      publisher: PUBLISHER,
      datePublished: PUBLISHED,
      dateModified: MODIFIED,
      citation: MANAS_CITATION,
      isPartOf: { '@type': 'WebPage', name: 'श्रीराम शलाका प्रश्नावली', url: `${SITE}/hi/ram-shalaka` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Quotation',
      text: l.deva.join(' '),
      creator: MANAS_CITATION.author,
      inLanguage: 'awa',
      spokenByCharacter: speaker,
      isPartOf: MANAS_CITATION,
      url,
    },
  ]
}
