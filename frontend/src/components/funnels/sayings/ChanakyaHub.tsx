/** /hi/chanakya-niti (Hindi). Server. */

import { BlogTracker } from '@/components/BlogTracker'
import { CHK_SECTIONS, chkEdition, chkNotSaid, chkSituations, chkVerse, chkVerses, chkWomen, type ChkVerse } from '@/lib/funnels/sayings/data'
import { CHK_HUB, CHK_PATH, CHK_SECTION, sealText } from '@/lib/funnels/sayings/copy-chanakya'
import { abs, cardOg, ldArticle, ldBreadcrumb, ldFaq, ldItemList, ldQuotation } from '@/lib/funnels/sayings/seo'
import DevaCard from './DevaCard'
import FxNextStep from './FxNextStep'
import ScriptToggle from './ScriptToggle'
import SituationPicker from './SituationPicker'
import { Crumbs, Faq, JsonLd, Method, Related } from './parts'
import { tiroSa } from './fonts'
import './sayings.css'

const PAGE_KEY = 'chanakya-hub-hi'
const PAGE_NAME = 'Chanakya Niti Hub HI'

const shareText = (v: ChkVerse) =>
  [...v.lines, '', v.meaning.hi, '', `चाणक्य नीति ${v.ref}`, `${abs(CHK_PATH)}?utm_source=copy&utm_medium=quote#${v.id}`].join('\n')

function Card({ v, pos, section, domId }: { v: ChkVerse; pos?: number; section: string; domId?: string }) {
  return (
    <DevaCard
      id={v.id}
      domId={domId}
      hub="chanakya"
      lines={v.lines}
      roman={v.roman}
      lang="sa"
      meaning={v.meaning.hi}
      seal={sealText(v.ref)}
      sealLabel={`चाणक्य नीति ${v.ref}`}
      chip={<span className="fx-tag">{`चाणक्य नीति, अध्याय ${v.chapter}, श्लोक ${v.verse}`}</span>}
      cardId={v.card ? v.id : undefined}
      locale="hi"
      pageName={PAGE_NAME}
      pageKey={PAGE_KEY}
      position={pos}
      section={section}
      shareText={shareText(v)}
      fileStem={`chanakya-niti-${v.ref.replace('.', '-')}`}
    />
  )
}

export default function ChanakyaHub() {
  const c = CHK_HUB
  const verses = chkVerses()
  const women = chkWomen()
  let pos = 0
  const ld = [
    ldBreadcrumb([{ name: 'Wisdom', path: '/' }, { name: 'चाणक्य नीति', path: CHK_PATH }]),
    ldArticle({ headline: c.h1, description: c.description, path: CHK_PATH, locale: 'hi', citation: chkEdition(), about: 'Chanakya Niti', image: cardOg('chk-13-2', 'hi') }),
    ldFaq(c.faq),
    ldItemList(c.h1, verses.map((v) => ldQuotation({ text: v.lines.join(' '), author: 'Chanakya', path: CHK_PATH, anchor: v.id, locale: 'hi', citation: `Chanakya Niti ${v.ref}` }))),
  ]
  return (
    <div className={`fx-sayings ${tiroSa.variable}`} data-hub="chanakya" data-script="deva" lang="hi">
      <BlogTracker pageName={PAGE_NAME} />
      {ld.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <div className="fx-page">
        <Crumbs items={[{ label: 'होम', href: '/' }, { label: 'चाणक्य नीति' }]} locale="hi" />
        <header className="fx-hero">
          <h1 className="fx-h1">{c.h1}</h1>
          <p className="fx-promise">{c.promise}</p>
          <p id="quick-answer" className="fx-quick">
            {c.quick}
          </p>
          <ul className="fx-jump">
            {CHK_SECTIONS.map((s) => (
              <li key={s}>
                <a href={`#${s}`}>{CHK_SECTION[s].hi}</a>
              </li>
            ))}
            <li>
              <a href="#nahin-kaha">{c.notSaidH}</a>
            </li>
          </ul>
          <ScriptToggle locale="hi" />
        </header>

        <section className="fx-sec" aria-labelledby="pick-h">
          <h2 id="pick-h" className="fx-h2">
            {c.pickerH}
          </h2>
          <p className="fx-intro">{c.pickerIntro}</p>
          <SituationPicker situations={chkSituations().map((s) => ({ id: s.id, label: s.hi }))} locale="hi" pageKey={PAGE_KEY} label={c.pickerH}>
            {chkSituations().map((s) => (
              <div key={s.id} id={`sit-${s.id}`} data-sit={s.id} className="fx-sit-group" tabIndex={-1}>
                <h3>{s.hi}</h3>
                {s.refs
                  .map((r) => chkVerse(r))
                  .filter((v): v is ChkVerse => Boolean(v))
                  .map((v) => (
                    <Card key={v.id} v={v} section={`situation-${s.id}`} domId={`${v.id}-${s.id}`} />
                  ))}
              </div>
            ))}
          </SituationPicker>
        </section>

        {CHK_SECTIONS.map((s, si) => (
          <section key={s} id={s} className="fx-sec" aria-labelledby={`${s}-h`}>
            <h2 id={`${s}-h`} className="fx-h2">
              {CHK_SECTION[s].hi}
            </h2>
            <p className="fx-intro">{CHK_SECTION[s].intro}</p>
            <div className="fx-list">
              {verses
                .filter((v) => v.section === s)
                .map((v) => {
                  pos += 1
                  return <Card key={v.id} v={v} pos={pos} section={s} />
                })}
            </div>
            {si === 1 && (
              <div className="fx-next">
                <h2 className="fx-h2">हर सुबह काम की एक पंक्ति</h2>
                <FxNextStep hub="chanakya" locale="hi" pageName={PAGE_NAME} pageKey={PAGE_KEY} placement="mid" />
              </div>
            )}
          </section>
        ))}

        <section id="nahin-kaha" className="fx-sec" aria-labelledby="ns-h">
          <h2 id="ns-h" className="fx-h2">
            {c.notSaidH}
          </h2>
          <p className="fx-intro">{c.notSaidIntro}</p>
          <div className="fx-checks">
            {chkNotSaid().map((n) => (
              <div key={n.slug} className="fx-check">
                <p>
                  <span className="fx-stamp" data-verdict={n.realRef === '7.12' ? 'paraphrase' : 'not-found'}>
                    {n.realRef === '7.12' ? 'आधा सच' : 'चाणक्य नीति में नहीं'}
                  </span>
                </p>
                <p className="fx-check-q">
                  <s>&ldquo;{n.line.hi}&rdquo;</s>
                </p>
                <p className="fx-intro">{n.finding.hi}</p>
                {n.realRef && (
                  <p>
                    <a className="fx-check-link" href={`#${chkVerse(n.realRef)?.id ?? ''}`}>{`असली श्लोक ${n.realRef} पढ़ें`}</a>
                  </p>
                )}
                {n.source && (
                  <p>
                    <a className="fx-check-link" href={n.source.url} target="_blank" rel="noopener">
                      {n.source.label}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="fx-note-box">
            <p>{c.exclusion}</p>
            <p className="fx-meta">{`स्त्रियों के ज़िक्र वाले श्लोक: ${women.mentions}। हटाए गए: ${women.excluded}।`}</p>
          </div>
        </section>

        <section className="fx-next" aria-label="आगे">
          <h2 className="fx-h2">एक श्लोक रोज़ अपने साथ रखें</h2>
          <FxNextStep hub="chanakya" locale="hi" pageName={PAGE_NAME} pageKey={PAGE_KEY} placement="end" />
        </section>

        <Faq items={c.faq} heading="लोग अक्सर पूछते हैं" />
        <Method heading="स्रोत और तरीका">
          <p>पाठ: चाणक्य नीति (वृद्ध-चाणक्य), 17 अध्याय, 342 श्लोक, Wisdom के संस्कृत संग्रह से। श्लोक संख्या इसी पाठ के हिसाब से है; दूसरे छपे संस्करणों में कुछ अध्यायों की गिनती अलग है। हिंदी अर्थ Wisdom ने सीधे संस्कृत से लिखे हैं।</p>
        </Method>
        <Related
          heading="आगे पढ़ें"
          links={[
            { href: '/hi/gita', label: 'भगवद गीता के श्लोक हिंदी में', gita: true },
            { href: '/hi/kabir-ke-dohe', label: 'कबीर के दोहे अर्थ सहित' },
            { href: '/hi/vivekananda-quotes', label: 'स्वामी विवेकानंद के विचार' },
          ]}
        />
      </div>
    </div>
  )
}
