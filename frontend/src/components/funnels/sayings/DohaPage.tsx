/** /hi/kabir-ke-dohe/[slug]: one doha (Hindi). Server. */

import PageTracker from '@/components/BlogTracker'
import { Faq, JsonLd, PageHero, Section } from '@/components/site'
import { dohe, kabirSources, type Doha } from '@/lib/funnels/sayings/data'
import { FOUND_SHORT, KAB_PATH, KAB_PATH_EN, KAB_THEME, dohaPath } from '@/lib/funnels/sayings/copy-kabir'
import { cardOg, ldArticle, ldQuotation } from '@/lib/funnels/sayings/seo'
import { devaVerseProps } from './cards'
import { dohaShareText, foundIn, kabirCardId } from './KabirHub'
import { Method, NextBand, Related } from './parts'

export const dohaTitle = (d: Doha): string => {
  const first = d.lines[0].replace(/[।॥,]/g, '').trim()
  const t = `${first}: कबीर का दोहा, अर्थ सहित`
  return t.length <= 60 ? t : `${first}: अर्थ सहित`
}

export default function DohaPage({ doha: d }: { doha: Doha }) {
  const path = dohaPath(d.slug)
  const pageKey = `kabir-doha-${d.slug}`.slice(0, 40).replace(/-+$/, '')
  const first = d.lines[0].replace(/[।॥]/g, '').trim()
  const src = kabirSources()
  const all = dohe()
  const i = all.findIndex((x) => x.slug === d.slug)
  const sameTheme = all.filter((x) => x.theme === d.theme && x.slug !== d.slug).slice(0, 3)
  const next = all[(i + 1) % all.length]
  const quick = `"${first}" कबीर का दोहा है। इसका अर्थ है: ${d.meaning.hi} यह दोहा ${d.foundIn.map((f) => src[f].hi).join(' और ')} में मिलता है।`
  const faq = [
    { q: `"${first}" का अर्थ क्या है?`, a: d.meaning.hi },
    {
      q: 'यह दोहा किस संग्रह में है?',
      a: `${d.foundIn.map((f) => src[f].hi).join(' और ')}। कबीर के दोहे सदियों तक गाए गए, इसलिए शब्दों में थोड़ा फ़र्क मिल सकता है।`,
    },
    { q: 'What does this doha mean in English?', a: d.meaning.en },
  ]
  const ld = [
    ldArticle({
      headline: dohaTitle(d),
      description: d.meaning.hi,
      path,
      locale: 'hi',
      citation: d.foundIn.map((f) => src[f].en).join('; '),
      about: 'Kabir',
      ...(kabirCardId(d) ? { image: cardOg(d.id, 'hi') } : {}),
    }),
    {
      '@context': 'https://schema.org',
      ...ldQuotation({
        text: d.lines.join(' '),
        author: 'Kabir',
        path,
        locale: 'hi',
        citation: d.foundIn.map((f) => src[f].en).join('; '),
      }),
    },
  ]
  return (
    <>
      <PageTracker pageName="Kabir Doha HI" />
      <JsonLd data={ld} />
      <PageHero
        locale="hi"
        crumbs={[
          { label: 'कबीर के दोहे', href: KAB_PATH },
          { label: first, href: path },
        ]}
        eyebrow={FOUND_SHORT[d.foundIn[0]].hi}
        title={`${first}: अर्थ सहित`}
        actions={[{ href: '#shabd', label: 'शब्दार्थ', location: 'doha_hero_words' }]}
        below={
          <p id="quick-answer" className="fx-quick">
            {quick}
          </p>
        }
        verse={devaVerseProps({
          id: d.id,
          hub: 'kabir',
          lines: d.lines,
          roman: d.roman,
          lang: 'hi',
          meaning: d.meaning.hi,
          meaning2: { text: d.meaning.en, lang: 'en' },
          gloss: d.gloss,
          source: foundIn(d, 'hi'),
          cardId: kabirCardId(d),
          locale: 'hi',
          pageKey,
          section: d.theme,
          shareText: dohaShareText(d, 'hi'),
          fileStem: `kabir-doha-${d.slug}`,
          reveal: false,
        })}
      />

      <Section id="shabd" width="narrow" title="शब्दार्थ">
        <dl className="fx-words rv">
          {d.gloss.map((g) => (
            <div key={g.w}>
              <dt lang="hi">{g.w}</dt>
              <dd>
                {g.hi} <span lang="en">({g.en})</span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="src" tone="band" width="narrow" title="यह दोहा कहाँ मिलता है">
        <div className="sx-prose">
          <p>
            {d.foundIn.map((f) => src[f].hi).join(' और ')}।{' '}
            {d.foundIn.includes('sung')
              ? 'यह दोहा कबीर ग्रंथावली या कविता-कौमुदी में इस रूप में नहीं मिला, पर लोक और भजन गायकी में कबीर के नाम से गाया जाता है।'
              : 'छपे हुए संग्रह में मिलना इसे कबीर की परंपरा से जोड़ता है, क्योंकि कबीर ने खुद कुछ नहीं लिखा।'}{' '}
            <a href={d.record.url} rel="noopener" target="_blank">
              स्रोत पाठ
            </a>
          </p>
          <p>{`विषय: ${KAB_THEME[d.theme].hi}।`}</p>
        </div>
      </Section>

      <NextBand heading="एक पंक्ति रोज़ अपने साथ रखें" hub="kabir" locale="hi" pageKey={pageKey} />

      <Section id="faq" width="narrow" title="लोग अक्सर पूछते हैं">
        <Faq items={faq} locale="hi" />
      </Section>
      <Method heading="स्रोत और तरीका">
        <p>{`पाठ: ${d.record.section}।${d.fixes.length ? ` टाइपिंग की गलती ठीक की गई: ${d.fixes.map((f) => `${f.from} से ${f.to}`).join(', ')}।` : ''} अर्थ और शब्दार्थ Wisdom के अपने हैं।`}</p>
      </Method>
      <Related
        heading="आगे पढ़ें"
        locale="hi"
        links={[
          ...sameTheme.map((x) => ({
            href: dohaPath(x.slug),
            label: x.lines[0].replace(/[।॥]/g, '').trim(),
          })),
          ...(next && next.slug !== d.slug && !sameTheme.includes(next)
            ? [
                {
                  href: dohaPath(next.slug),
                  label: next.lines[0].replace(/[।॥]/g, '').trim(),
                },
              ]
            : []),
          { href: KAB_PATH, label: 'कबीर के सभी 50 दोहे' },
          { href: KAB_PATH_EN, label: 'Kabir dohe in English' },
        ]}
      />
    </>
  )
}
