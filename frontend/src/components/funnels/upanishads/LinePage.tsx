/**
 * A famous-line page (/upanishads/[line] and the Hindi twins). Order follows
 * the brief: quick answer, the line, plain meaning, then the arc.
 */
import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { Faq, JsonLd, LinkCards, PageHero, Section, VerseCard } from '@/components/site'
import type { Locale } from '@/lib/locale'
import { articleLd, card, cardView, passage, padas, pageKey, SITE, upMeta, DISCLOSURE_EN, UPDATED } from '@/lib/funnels/upanishads'
import { LINES, lineBySlug, type FamousLine } from '@/content/funnels/upanishads/lines'
import { Bridge, Bridges, SourcesNote, UpNext } from './parts'
import PrintCard from './PrintCard'
import LineShare from './LineShare'

const enPath = (slug: string) => `/upanishads/${slug}`
const hiPath = (slug: string) => `/hi/upanishads/${slug}`

export function lineMetadata(slug: string, locale: Locale): Metadata {
  const line = lineBySlug(slug)
  if (!line) return { title: 'Not found', robots: { index: false } }
  const hi = locale === 'hi' ? line.hi : undefined
  return upMeta({
    title: hi?.title ?? line.title,
    description: hi?.description ?? line.description,
    path: locale === 'hi' ? hiPath(slug) : enPath(slug),
    locale,
    twin: line.hi ? (locale === 'hi' ? enPath(slug) : hiPath(slug)) : undefined,
    ogCard: line.cardId,
  })
}

const T = {
  en: {
    upanishads: 'Upanishads',
    whole: 'The whole passage',
    who: 'Who said it, and to whom',
    acharyas: 'How the acharyas read it',
    shankara: 'Shankara',
    others: 'Where others read it differently',
    writing: 'Writing it out',
    cardCaption: 'Open the card full size if you want to frame the line or take it to a tattoo artist.',
    post: 'Open the 4:5 card',
    status: 'Open the 9:16 story card',
    use: 'Copy or share the line',
    gita: 'The same thought in the Gita',
    next: 'One line each morning',
    more: 'Keep reading',
    faq: 'Questions people ask',
    sources: 'Sources and method',
    plan: { label: 'Who am I: a 7-verse plan', sub: 'Seven lines from seven Upanishads, one a day.' },
    hub: { label: 'The Upanishads', sub: 'What they are, how many, and where to start.' },
    read: 'Read the full text',
  },
  hi: {
    upanishads: 'उपनिषद',
    whole: 'पूरा अंश',
    who: 'किसने, किससे कहा',
    acharyas: 'आचार्य इसे कैसे पढ़ते हैं',
    shankara: 'शंकराचार्य',
    others: 'दूसरी बात',
    writing: 'लिखने का सही रूप',
    cardCaption: 'इस श्लोक को फ़्रेम करवाना हो या टैटू बनवाना हो, तो कार्ड पूरे साइज़ में खोलें।',
    post: '4:5 कार्ड खोलें',
    status: '9:16 स्टेटस कार्ड खोलें',
    use: 'श्लोक कॉपी या शेयर करें',
    gita: 'गीता में यही बात',
    next: 'हर सुबह एक श्लोक',
    more: 'आगे पढ़ें',
    faq: 'लोग अक्सर पूछते हैं',
    sources: 'स्रोत और तरीका',
    plan: { label: 'Who am I: 7 श्लोकों का प्लान (अंग्रेज़ी)', sub: 'सात उपनिषदों से सात श्लोक, रोज़ एक।' },
    hub: { label: 'उपनिषद क्या हैं', sub: 'कितने हैं, कौन से मुख्य हैं, कहाँ से शुरू करें।' },
    read: 'पूरा पाठ पढ़ें (अंग्रेज़ी)',
  },
} as const

function relatedLines(line: FamousLine, locale: Locale): FamousLine[] {
  if (locale === 'hi') return LINES.filter((l) => l.hi && l.slug !== line.slug)
  return line.related.map((s) => lineBySlug(s)).filter((l): l is FamousLine => !!l)
}

export default function LinePage({ slug, locale }: { slug: string; locale: Locale }) {
  const line = lineBySlug(slug)
  if (!line) return null
  const t = T[locale]
  const hi = locale === 'hi' ? line.hi : undefined
  const path = locale === 'hi' ? hiPath(slug) : enPath(slug)
  const key = pageKey(locale === 'hi' ? `upanishads-hi-${slug}` : `upanishads-${slug}`)
  const p = passage(line.passage)
  const showWhole = (hi?.fullMeaning ?? line.fullMeaning) !== ''
  const h1 = hi?.h1 ?? line.h1
  const description = hi?.description ?? line.description
  const faq = hi?.faq ?? line.faq
  const refLabel = locale === 'hi' ? card(line.cardId).sourceName.hi : line.ref
  const view = cardView(line.cardId, locale, path)

  const jsonLd = [
    articleLd({ headline: h1, description, path, citation: `${line.ref}. Sanskrit: ${p.basis.startsWith('sanscripts corpus') ? 'Wisdom corpus' : p.basis}. English: Wisdom translation.`, locale, about: line.textName }),
    {
      '@context': 'https://schema.org',
      '@type': 'Quotation',
      text: line.sa,
      inLanguage: 'sa',
      url: `${SITE}${path}`,
      citation: line.ref,
      isPartOf: { '@type': 'Book', name: line.textName },
      image: `${SITE}/api/quote-card/${line.cardId}?format=post&lang=${locale}&theme=paper`,
      dateModified: UPDATED,
    },
  ]

  const share = locale === 'hi' ? 'यह श्लोक शेयर करें' : 'Share this line'
  const facts = locale === 'hi' ? [] : [line.veda]

  return (
    <>
      <PageTracker pageName={locale === 'hi' ? 'Upanishads Line HI' : 'Upanishads Line'} />
      <JsonLd data={jsonLd} />
      <PageHero
        locale={locale}
        crumbs={[
          { label: t.upanishads, href: locale === 'hi' ? '/hi/upanishad' : '/upanishads' },
          { label: h1.split(':')[0], href: path },
        ]}
        eyebrow={refLabel}
        title={h1}
        facts={facts}
        actions={[
          { href: '#share', label: t.use, location: 'line_hero_share' },
          ...(showWhole ? [{ href: '#whole', label: t.whole, location: 'line_hero_whole' }] : []),
        ]}
        visual={
          <div data-mp-section="line">
            <VerseCard original={padas(line.sa)} iast={padas(line.iast)} meaning={hi?.meaning ?? line.meaning} size="hero" reveal toggle locale={locale} />
          </div>
        }
      />

      <Section id="answer" width="narrow" spacing="tight">
        <p id="quick-answer" className="sx-intro rv">
          {hi?.quick ?? line.quick}
        </p>
      </Section>

      <Section id={showWhole ? 'whole' : 'use'} tone="band" width="narrow" title={showWhole ? t.whole : undefined}>
        {showWhole && <VerseCard align="left" label={refLabel} original={padas(p.sa)} iast={padas(p.iast)} meaning={hi?.fullMeaning ?? line.fullMeaning} locale={locale} rv />}

        <div id="share" className="up-share">
          <p className="up-share-label" aria-hidden="true">
            {share}
          </p>
          <h3 className="up-sr">{t.use}</h3>
          <VerseCard
            original={padas(view.sa)}
            iast={view.iast ? padas(view.iast) : undefined}
            meaning={view.meaning}
            source={view.sourceLine}
            locale={locale}
            rv
            actions={
              <LineShare view={view} locale={locale} pageKey={key} />
            }
          />
        </div>
      </Section>

      <Section id="who" width="narrow" title={t.who}>
        <div className="up-card up-card--story rv">
          {locale === 'en' && <p className="up-who-chip">{line.who}</p>}
          <p className="up-scene">{hi?.scene ?? line.scene}</p>
        </div>
        {line.textHref && locale === 'en' && (
          <p className="up-after rv">
            <a href={line.textHref} className="sx-link" data-mp-location="line_read_text">
              {t.read}: {line.textName}
            </a>
          </p>
        )}
      </Section>

      <Section id="acharyas" tone="band" title={t.acharyas}>
        <div className="up-grid-2" data-stagger="60">
          <div className="up-card rv">
            <h3 className="sx-h3">{t.shankara}</h3>
            <p>{hi?.shankara ?? line.shankara}</p>
          </div>
          <div className="up-card rv">
            <h3 className="sx-h3">{t.others}</h3>
            <p>{hi?.others ?? line.others}</p>
          </div>
        </div>
      </Section>

      <Section id="writing" width="narrow" title={t.writing} track="writing">
        <ul className="up-forms" data-stagger="60">
          {line.writing.forms.map((f) => (
            <li key={f.sa} className="rv">
              <span className="up-form-sa sx-deva" lang="sa">
                {f.sa}
              </span>
              <span className="up-form-sa up-form-iast sx-iast" lang="sa-Latn">
                {f.iast}
              </span>
              {locale === 'en' && <span className="up-form-label">{f.label}</span>}
            </li>
          ))}
        </ul>
        <p className="sx-prose rv">{hi?.writingNote ?? line.writing.note}</p>
        <PrintCard cardId={line.cardId} line={slug} locale={locale} alt={`${line.sa} (${line.ref})`} labels={{ post: t.post, status: t.status, caption: t.cardCaption }} />
      </Section>

      {line.gita.length > 0 && (
        <Section id="gita" width="narrow" title={t.gita}>
          <Bridges>
            {line.gita.map((g) => (
              <Bridge key={`${g.c}.${g.v}`} c={g.c} v={g.v} note={locale === 'en' ? g.note : ''} locale={locale} from={line.cardId} />
            ))}
          </Bridges>
        </Section>
      )}

      <UpNext locale={locale} pageKey={key} placement="line-end" heading={t.next} />

      <Section id="more" title={t.more}>
        <LinkCards
          columns={3}
          items={[
            ...relatedLines(line, locale).map((l) => ({
              href: locale === 'hi' ? hiPath(l.slug) : enPath(l.slug),
              orig: l.sa.split(/\s*[।|]/u)[0],
              title: locale === 'hi' && l.hi ? l.hi.h1 : l.h1,
              body: l.ref,
              location: `related_${l.slug}`,
            })),
            ...(locale === 'hi' ? [{ href: enPath(slug), hrefLang: 'en', title: `English: ${line.h1}`, body: line.ref, location: 'related_english' }] : []),
            { href: '/upanishads/who-am-i', title: t.plan.label, body: t.plan.sub, location: 'related_plan' },
            { href: locale === 'hi' ? '/hi/upanishad' : '/upanishads', title: t.hub.label, body: t.hub.sub, location: 'related_hub' },
          ]}
        />
      </Section>

      <Section id="faq" tone="band" width="narrow" title={t.faq}>
        <Faq items={faq} locale={locale} />
      </Section>

      <SourcesNote heading={t.sources}>
        {locale === 'hi' ? (
          <p>
            संस्कृत पाठ Wisdom के संग्रह से है, जिसे sanskritdocuments.org के संस्करण से मिलाया गया है। हिंदी और अंग्रेज़ी अर्थ Wisdom का अपना है, शंकराचार्य के भाष्य के आधार पर। अभी इसकी मानवीय समीक्षा चल रही है।
          </p>
        ) : (
          <>
            <p>
              {line.ref}, {line.veda}. Sanskrit {p.basis.startsWith('sanscripts corpus') ? 'from the Wisdom corpus, read against the sanskritdocuments.org edition' : `from ${p.basis}`}
              {p.kb.length > 0 ? ` (KB ${p.kb.join(', ')})` : ''}. {p.note ?? ''}
            </p>
            <p>
              The English is Wisdom&apos;s own, drafted from the Sanskrit with Shankara&apos;s commentary (S. Sitarama Sastri&apos;s public-domain English) and
              checked against Swami Paramananda (1919) for tone. {DISCLOSURE_EN}
            </p>
          </>
        )}
      </SourcesNote>
    </>
  )
}
