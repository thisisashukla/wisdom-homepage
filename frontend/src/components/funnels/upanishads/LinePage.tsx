/**
 * A famous-line page (/upanishads/[line] and the Hindi twins). Order follows
 * the brief: quick answer, the line, plain meaning, then the arc.
 */
import type { Metadata } from 'next'
import QuoteCard from '@/components/quotes/QuoteCard'
import type { Locale } from '@/lib/quotes-shared'
import { articleLd, card, cardView, faqLd, passage, pageKey, SITE, upMeta, DISCLOSURE_EN, UPDATED } from '@/lib/funnels/upanishads'
import { LINES, lineBySlug, type FamousLine } from '@/content/funnels/upanishads/lines'
import Shell, { Band, Faq, GitaBridge, Head, HeroLine, SourcesNote, Tiles, UpNext } from './Shell'
import Sanskrit from './Sanskrit'
import PrintCard from './PrintCard'

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
    cardCaption: 'A print-ready card in Devanagari, 1080 by 1350 pixels. Open it full size for a tattoo stencil, calligraphy reference or framing.',
    post: 'Open the 4:5 card',
    status: 'Open the 9:16 story card',
    use: 'Copy or share the line',
    gita: 'The same thought in the Gita',
    gitaLead: 'Read next to',
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
    cardCaption: 'देवनागरी में प्रिंट के लायक कार्ड, 1080 x 1350 पिक्सेल। फ़्रेम, सुलेख या टैटू के लिए पूरे साइज़ में खोलें।',
    post: '4:5 कार्ड खोलें',
    status: '9:16 स्टेटस कार्ड खोलें',
    use: 'श्लोक कॉपी या शेयर करें',
    gita: 'गीता में यही बात',
    gitaLead: 'साथ में पढ़ें',
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
  const pageName = locale === 'hi' ? `upanishads-hi-${slug}` : `upanishads-${slug}`
  const key = pageKey(pageName)
  const p = passage(line.passage)
  const showWhole = (hi?.fullMeaning ?? line.fullMeaning) !== ''
  const h1 = hi?.h1 ?? line.h1
  const description = hi?.description ?? line.description
  const faq = hi?.faq ?? line.faq
  const refLabel = locale === 'hi' ? card(line.cardId).sourceName.hi : line.ref

  const crumbs =
    locale === 'hi'
      ? [
          { name: 'होम', path: '/' },
          { name: t.upanishads, path: '/hi/upanishad' },
          { name: h1.split(':')[0], path },
        ]
      : [
          { name: 'Home', path: '/' },
          { name: t.upanishads, path: '/upanishads' },
          { name: h1.split(':')[0], path },
        ]

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
    faqLd(faq),
  ]

  const share = locale === 'hi' ? 'यह श्लोक शेयर करें' : 'Share this line'
  const facts = locale === 'hi' ? ['संस्कृत और हिंदी अर्थ', 'प्रिंट के लिए कार्ड'] : [line.veda, 'Sanskrit, IAST, English', 'Print-ready card']

  return (
    <Shell
      pageName={pageName}
      locale={locale}
      crumbs={crumbs}
      jsonLd={jsonLd}
      hero={{
        eyebrow: refLabel,
        title: h1,
        facts,
        cta: { href: '#share', label: t.use, loc: 'line_hero_share' },
        second: showWhole ? { href: '#whole', label: t.whole, loc: 'line_hero_whole' } : undefined,
        visual: <HeroLine sa={line.sa} iast={line.iast} meaning={hi?.meaning ?? line.meaning} lang={locale} section="line" />,
      }}
    >
      <Band labelledBy={showWhole ? 'whole' : undefined} label={showWhole ? undefined : t.use}>
        <p id="quick-answer" className="tp-intro rv">
          {hi?.quick ?? line.quick}
        </p>

        {showWhole && (
          <div className="fx-whole rv">
            <h2 id="whole" className="tp-h2">
              {t.whole}
            </h2>
            <div className="fx-v">
              <p className="fx-v-ref-plain">{refLabel}</p>
              <Sanskrit sa={p.sa} iast={p.iast} size="small" />
              <p className="fx-v-en">{hi?.fullMeaning ?? line.fullMeaning}</p>
            </div>
          </div>
        )}

        <div id="share" className="fx-share">
          <p className="fx-share-label" aria-hidden="true">
            {share}
          </p>
          <h3 className="fx-sr">{t.use}</h3>
          <QuoteCard quote={cardView(line.cardId, locale, path)} locale={locale} pageName={pageName} pageKey={key} verseHref={null} />
        </div>
      </Band>

      <Band alt labelledBy="who">
        <Head id="who">{t.who}</Head>
        <div className="fx-card fx-card-story rv">
          {locale === 'en' && <p className="fx-who">{line.who}</p>}
          <p className="fx-scene">{hi?.scene ?? line.scene}</p>
        </div>
        {line.textHref && locale === 'en' && (
          <p className="fx-p rv" style={{ marginTop: 18 }}>
            <a href={line.textHref} className="fx-link" data-mp-location="line_read_text">
              {t.read}: {line.textName}
            </a>
          </p>
        )}
      </Band>

      <Band labelledBy="acharyas" className="fx-acharya">
        <Head id="acharyas">{t.acharyas}</Head>
        <div className="fx-grid-2" data-stagger="60">
          <div className="fx-card rv">
            <h3 className="tp-label">{t.shankara}</h3>
            <p>{hi?.shankara ?? line.shankara}</p>
          </div>
          <div className="fx-card rv">
            <h3 className="tp-label">{t.others}</h3>
            <p>{hi?.others ?? line.others}</p>
          </div>
        </div>
      </Band>

      <Band alt labelledBy="writing">
        <div data-mp-section="writing">
          <Head id="writing">{t.writing}</Head>
          <ul className="fx-forms" data-stagger="60">
            {line.writing.forms.map((f) => (
              <li key={f.sa} className="rv">
                <span className="f-sa s-deva" lang="sa">
                  {f.sa}
                </span>
                <span className="f-iast s-iast" lang="sa-Latn">
                  {f.iast}
                </span>
                {locale === 'en' && <span className="f-label">{f.label}</span>}
              </li>
            ))}
          </ul>
          <p className="fx-p rv">{hi?.writingNote ?? line.writing.note}</p>
          <PrintCard
            cardId={line.cardId}
            line={slug}
            page={pageName}
            locale={locale}
            alt={`${line.sa} (${line.ref})`}
            labels={{ post: t.post, status: t.status, caption: t.cardCaption }}
          />
        </div>
      </Band>

      {line.gita.length > 0 && (
        <Band labelledBy="gita">
          <Head id="gita">{t.gita}</Head>
          <div className="fx-bridges" data-stagger="60">
            {line.gita.map((g) => (
              <GitaBridge key={`${g.c}.${g.v}`} c={g.c} v={g.v} note={locale === 'en' ? g.note : ''} locale={locale} lead={t.gitaLead} />
            ))}
          </div>
        </Band>
      )}

      <UpNext locale={locale} pageName={pageName} pageKey={key} placement="line-end" heading={t.next} />

      <Band wide labelledBy="more">
        <Head id="more">{t.more}</Head>
        <Tiles
          cols={3}
          items={[
            ...relatedLines(line, locale).map((l) => ({
              href: locale === 'hi' ? hiPath(l.slug) : enPath(l.slug),
              sa: l.sa.split(/\s*[।|]/u)[0],
              title: locale === 'hi' && l.hi ? l.hi.h1 : l.h1,
              sub: l.ref,
              loc: `related_${l.slug}`,
            })),
            ...(locale === 'hi' ? [{ href: enPath(slug), lang: 'en', title: `English: ${line.h1}`, sub: line.ref, loc: 'related_english' }] : []),
            { href: '/upanishads/who-am-i', title: t.plan.label, sub: t.plan.sub, loc: 'related_plan' },
            { href: locale === 'hi' ? '/hi/upanishad' : '/upanishads', title: t.hub.label, sub: t.hub.sub, loc: 'related_hub' },
          ]}
        />
      </Band>

      <Faq items={faq} heading={t.faq} />

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
    </Shell>
  )
}
