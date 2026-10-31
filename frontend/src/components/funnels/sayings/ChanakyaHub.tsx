/** /hi/chanakya-niti (Hindi). Server. */

import PageTracker from '@/components/BlogTracker'
import { Faq, JsonLd, PageHero, Section, VerseList } from '@/components/site'
import { CHK_SECTIONS, chkEdition, chkNotSaid, chkSituations, chkVerse, chkVerses, chkWomen, type ChkVerse } from '@/lib/funnels/sayings/data'
import { CHK_HUB, CHK_PATH, CHK_SECTION, sealText } from '@/lib/funnels/sayings/copy-chanakya'
import { abs, cardOg, ldArticle, ldItemList, ldQuotation } from '@/lib/funnels/sayings/seo'
import { DevaVerse } from './cards'
import SituationPicker from './SituationPicker'
import { JumpChips, Method, NextBand, NextPanel, Related } from './parts'

const PAGE_KEY = 'chanakya-hub-hi'
/** The verse the hub opens with: the straight trees (7.12), the line people quote most. */
const HERO_REF = '7.12'

const shareText = (v: ChkVerse) => [...v.lines, '', v.meaning.hi, '', `चाणक्य नीति ${v.ref}`, `${abs(CHK_PATH)}?utm_source=copy&utm_medium=quote#${v.id}`].join('\n')

function Card({ v, pos, section, domId, reveal, as }: { v: ChkVerse; pos?: number; section: string; domId?: string; reveal?: boolean; as?: 'li' | 'article' }) {
  return (
    <DevaVerse
      as={as}
      id={v.id}
      domId={domId}
      hub="chanakya"
      lines={v.lines}
      roman={v.roman}
      lang="sa"
      meaning={v.meaning.hi}
      seal={sealText(v.ref)}
      sealLabel={`चाणक्य नीति ${v.ref}`}
      source={`चाणक्य नीति, अध्याय ${v.chapter}, श्लोक ${v.verse}`}
      cardId={v.card ? v.id : undefined}
      locale="hi"
      pageKey={PAGE_KEY}
      position={pos}
      section={section}
      shareText={shareText(v)}
      fileStem={`chanakya-niti-${v.ref.replace('.', '-')}`}
      reveal={reveal}
    />
  )
}

export default function ChanakyaHub() {
  const c = CHK_HUB
  const verses = chkVerses()
  const women = chkWomen()
  const hero = chkVerse(HERO_REF)
  let pos = 0
  const ld = [
    ldArticle({
      headline: c.h1,
      description: c.description,
      path: CHK_PATH,
      locale: 'hi',
      citation: chkEdition(),
      about: 'Chanakya Niti',
      image: cardOg('chk-13-2', 'hi'),
    }),
    ldItemList(
      c.h1,
      verses.map((v) =>
        ldQuotation({
          text: v.lines.join(' '),
          author: 'Chanakya',
          path: CHK_PATH,
          anchor: v.id,
          locale: 'hi',
          citation: `Chanakya Niti ${v.ref}`,
        }),
      ),
    ),
  ]
  return (
    <>
      <PageTracker pageName="Chanakya Niti Hub HI" />
      <JsonLd data={ld} />
      <PageHero
        locale="hi"
        crumbs={[{ label: 'चाणक्य नीति', href: CHK_PATH }]}
        title={c.h1}
        sub={c.promise}
        actions={[{ href: '#pick', label: 'अपनी स्थिति चुनें', location: 'hub_hero_pick' }]}
        below={
          <>
            <p id="quick-answer" className="fx-quick">
              {c.quick}
            </p>
            <JumpChips
              locale="hi"
              items={[
                ...CHK_SECTIONS.map((s) => ({
                  href: `#${s}`,
                  label: CHK_SECTION[s].hi,
                })),
                { href: '#nahin-kaha', label: c.notSaidH },
              ]}
            />
          </>
        }
        verse={
          hero
            ? {
                label: `चाणक्य नीति ${hero.ref}`,
                original: hero.lines,
                iast: hero.roman,
                meaning: hero.meaning.hi,
                source: `चाणक्य नीति, अध्याय ${hero.chapter}, श्लोक ${hero.verse}`,
                sourceHref: `#${hero.id}`,
              }
            : undefined
        }
      />

      <Section id="pick" tone="band" width="narrow" title={c.pickerH} intro={c.pickerIntro} className="fx-sit-wrap">
        <SituationPicker situations={chkSituations().map((s) => ({ id: s.id, label: s.hi }))} locale="hi" label={c.pickerH}>
          {chkSituations().map((s) => (
            <div key={s.id} id={`sit-${s.id}`} data-sit={s.id} className="fx-sit-group" tabIndex={-1}>
              <h3>{s.hi}</h3>
              {s.refs
                .map((r) => chkVerse(r))
                .filter((v): v is ChkVerse => Boolean(v))
                .map((v) => (
                  <Card key={v.id} v={v} section={`situation-${s.id}`} domId={`${v.id}-${s.id}`} reveal={false} />
                ))}
            </div>
          ))}
        </SituationPicker>
      </Section>

      {CHK_SECTIONS.map((s, si) => (
        <Section key={s} id={s} tone={si % 2 ? 'band' : 'default'} width="narrow" title={CHK_SECTION[s].hi} intro={CHK_SECTION[s].intro}>
          <VerseList>
            {verses
              .filter((v) => v.section === s)
              .map((v) => {
                pos += 1
                return <Card key={v.id} as="li" v={v} pos={pos} section={s} />
              })}
          </VerseList>
          {si === 1 && <NextPanel heading="हर सुबह काम की एक पंक्ति" hub="chanakya" locale="hi" pageKey={PAGE_KEY} />}
        </Section>
      ))}

      <Section id="nahin-kaha" tone={CHK_SECTIONS.length % 2 ? 'band' : 'default'} width="narrow" title={c.notSaidH} intro={c.notSaidIntro}>
        <div className="fx-fakes">
          {chkNotSaid().map((n) => (
            <div key={n.slug} className="fx-fake rv">
              <p>
                <span className="fx-stamp" data-verdict={n.realRef === '7.12' ? 'paraphrase' : 'not-found'}>
                  {n.realRef === '7.12' ? 'आधा सच' : 'चाणक्य नीति में नहीं'}
                </span>
              </p>
              <p className="fx-fake-line">
                <s>&ldquo;{n.line.hi}&rdquo;</s>
              </p>
              <p className="fx-fake-origin">{n.finding.hi}</p>
              {n.realRef && (
                <p>
                  <a className="sx-link" href={`#${chkVerse(n.realRef)?.id ?? ''}`}>{`असली श्लोक ${n.realRef} पढ़ें`}</a>
                </p>
              )}
              {n.source && (
                <p>
                  <a className="sx-link" href={n.source.url} target="_blank" rel="noopener">
                    {n.source.label}
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="fx-note rv">
          <p>{c.exclusion}</p>
          <p className="fx-meta">{`स्त्रियों के ज़िक्र वाले श्लोक: ${women.mentions}। हटाए गए: ${women.excluded}।`}</p>
        </div>
      </Section>

      <NextBand heading="एक श्लोक रोज़ अपने साथ रखें" hub="chanakya" locale="hi" pageKey={PAGE_KEY} />

      <Section id="faq" width="narrow" title="लोग अक्सर पूछते हैं">
        <Faq items={c.faq} locale="hi" />
      </Section>
      <Method heading="स्रोत और तरीका">
        <p>
          पाठ: चाणक्य नीति (वृद्ध-चाणक्य), 17 अध्याय, 342 श्लोक, Wisdom के संस्कृत संग्रह से। श्लोक संख्या इसी पाठ के हिसाब से है; दूसरे छपे संस्करणों में कुछ अध्यायों की गिनती अलग
          है। हिंदी अर्थ Wisdom ने सीधे संस्कृत से लिखे हैं।
        </p>
      </Method>
      <Related
        heading="आगे पढ़ें"
        locale="hi"
        links={[
          {
            href: '/hi/gita',
            label: 'भगवद गीता के श्लोक हिंदी में',
            gita: true,
          },
          { href: '/hi/kabir-ke-dohe', label: 'कबीर के दोहे अर्थ सहित' },
          {
            href: '/hi/vivekananda-quotes',
            label: 'स्वामी विवेकानंद के विचार',
          },
        ]}
      />
    </>
  )
}
