/**
 * Essays on the site that go deeper into this verse (lib/blogVerseLinks), as compact rows.
 *
 *   <VerseEssays chapter={2} verse={47} lang="en" links={getBlogLinksForVerse(2, 47)} />
 *
 * Server component. Events: Link Clicked (<loc>_blog_<slug> or <loc>_dhyaan_<slug>);
 * blog rows also send Blog Deep Dive Clicked.
 */
import type { BlogLink } from '@/lib/blogVerseLinks'
import './verse.css'

const COPY = { en: 'Go deeper', hi: 'और जानें' } as const

export default function VerseEssays({ chapter, verse, lang, links }: { chapter: number; verse: number; lang: 'en' | 'hi'; links: BlogLink[] }) {
  if (!links.length) return null
  const loc = `verse_${lang === 'hi' ? 'hi_' : ''}${chapter}_${verse}`
  return (
    <section className="vp-essays" aria-label={COPY[lang]} data-mp-section={`${loc}_go_deeper`}>
      <h2 className="vp-sechead">{COPY[lang]}</h2>
      {links.map((link) => {
        const source = link.source ?? 'blog'
        const blog = source === 'blog'
        return (
        <a
          key={`${source}_${link.slug}`}
          href={link.href ?? `/blogs/${link.slug}`}
          className="vp-essay"
          data-mp-location={`${loc}_${source}_${link.slug}`}
          {...(blog && {
            'data-mp-event': 'Blog Deep Dive Clicked',
            'data-mp-props': JSON.stringify({ verse: `${chapter}.${verse}`, slug: link.slug, locale: lang }),
          })}
        >
          <img src={link.image} alt="" aria-hidden="true" width={72} height={72} loading="lazy" />
          <span>{link.cta}</span>
        </a>
        )
      })}
    </section>
  )
}
