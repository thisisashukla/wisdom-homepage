'use client'

/**
 * "Today's line" and, for visitors who kept lines on this hub before, "Lines you kept", in their
 * own band. Hubs place it below their first section of lines, so a searcher reaches real lines
 * first. Both parts are client-only. Renders nothing when the hub has no lines.
 *
 *   const { lines, todayCount } = hubLinesFrom(toLine, mainItems, moreItems)
 *   <HubTop hub={path} locale={locale} lines={lines} todayCount={todayCount}
 *           labels={{ today: 'आज का दोहा', kept: 'आपके रखे दोहे', note: '...' }} />
 *
 * `labels` names what the hub holds (a doha, a thought, a niti); the defaults say line / श्लोक.
 *
 * Today's line: a deterministic pick from the hub's main lines by the date in India (today.ts),
 * so a visitor who comes back tomorrow finds a new one. It sits in a fixed-height slot that the
 * server renders empty (heading only), so filling it never moves the page. Fires Today Line
 * Viewed { item_id, item_type 'quote' } once per hub per IST day, when the slot comes into view.
 *
 * Lines you kept: renders nothing until the device has kept lines from this hub, so new visitors
 * get no extra space and no shift. Each kept line links to its card on the page.
 */

import { useEffect, useRef, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { favouritesForHub, normHub } from '@/lib/favourites'
import type { Locale } from '@/lib/quotes-shared'
import KeepButton from './KeepButton'
import { useFavourites } from './KeepScope'
import { claimTodayView, istDayNumber, todayIndex } from './today'
import type { HubLine } from './hubLines'
import '@/components/site/site.css'
import './keep.css'

export type { HubLine }

export type HubTopLabels = {
  /** Heading of Today's line ("Today's doha", "आज का विचार"). */
  today: string
  /** The line under it ("... Tomorrow brings a new one."). */
  note: string
  /** Heading of the kept lines ("Dohas you kept", "आपके रखे विचार"). */
  kept: string
  keptSub: string
}

export type HubTopProps = {
  hub: string
  locale: Locale
  /** Every keepable line on the hub; the first `todayCount` are the hub's main lines. */
  lines: HubLine[]
  todayCount: number
  /** Per-hub wording; anything left out uses the default for the locale. */
  labels?: Partial<HubTopLabels>
}

const T: Record<Locale, HubTopLabels & { read: string }> = {
  en: {
    today: "Today's line",
    note: 'Sit with it today. Tomorrow brings a new one.',
    read: 'Read it in full',
    kept: 'Lines you kept',
    keptSub: 'The ones that stayed with you.',
  },
  hi: {
    today: 'आज का श्लोक',
    note: 'आज इसे मन में रखें। कल एक नया श्लोक मिलेगा।',
    read: 'पूरा पढ़ें',
    kept: 'आपके रखे श्लोक',
    keptSub: 'जो आपके मन में रह गए।',
  },
}

type Copy = HubTopLabels & { read: string }

export default function HubTop({ hub, locale, lines, todayCount, labels }: HubTopProps) {
  if (!lines.length) return null
  const h = normHub(hub)
  const t: Copy = { ...T[locale], ...labels }
  return (
    <div className="qhub-top-band">
      <div className="sx-wrap sx-wrap--narrow">
        <div className="qhub-top" lang={locale}>
          {todayCount > 0 && <TodayLine hub={h} locale={locale} t={t} lines={lines.slice(0, todayCount)} />}
          <KeptLines hub={h} t={t} lines={lines} />
        </div>
      </div>
    </div>
  )
}

function TodayLine({ hub, locale, t, lines }: { hub: string; locale: Locale; t: Copy; lines: HubLine[] }) {
  const ref = useRef<HTMLElement>(null)
  // null until mounted: the server and the first client render show the empty slot.
  const [day, setDay] = useState<number | null>(null)

  useEffect(() => {
    setDay(istDayNumber())
    // Pages left open past midnight IST move to the new line when the tab is shown again.
    const onShow = () => {
      if (document.visibilityState === 'visible') setDay(istDayNumber())
    }
    document.addEventListener('visibilitychange', onShow)
    return () => document.removeEventListener('visibilitychange', onShow)
  }, [])

  const line = day === null ? null : lines[todayIndex(hub, lines.length, day)] ?? null
  const id = line?.id ?? null

  useEffect(() => {
    const el = ref.current
    if (!id || !el) return
    const fire = () => {
      if (claimTodayView(hub)) trackEvent(EVENTS.TodayLineViewed, { item_id: id, item_type: 'quote', hub })
    }
    if (typeof IntersectionObserver === 'undefined') {
      fire()
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          fire()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [id, hub])

  return (
    <section ref={ref} className="qtl" aria-labelledby="today-line-h">
      <div className="qtl-head">
        <h2 id="today-line-h" className="qtl-kicker">
          {t.today}
        </h2>
        {line && <KeepButton id={line.id} hub={hub} locale={locale} props={{ location: 'today_line' }} className="qc-keep--inline" />}
      </div>
      <div className="qtl-body" aria-live="polite">
        {line && (
          <div key={line.id} className="qtl-line">
            <p className="qtl-meaning">{line.meaning}</p>
            <p className="qtl-foot">
              <span className="qtl-src">{line.source}</span>
              <a
                className="qtl-read"
                href={`#${line.anchor ?? line.id}`}
                data-mp-location="today_line_read"
                data-mp-props={JSON.stringify({ item_id: line.id, item_type: 'quote' })}
              >
                {t.read}
              </a>
            </p>
          </div>
        )}
      </div>
      <p className="qtl-note">{t.note}</p>
    </section>
  )
}

function KeptLines({ hub, t, lines }: { hub: string; t: Copy; lines: HubLine[] }) {
  const favs = favouritesForHub(hub, useFavourites())
  if (!favs.length) return null
  const byId = new Map(lines.map((l) => [l.id, l]))
  const items = favs.map((f) => byId.get(f.id)).filter((l): l is HubLine => Boolean(l))
  if (!items.length) return null

  return (
    <section className="qsv" aria-labelledby="kept-lines-h">
      <div className="qsv-head">
        <h2 id="kept-lines-h" className="qtl-kicker">
          {t.kept}
        </h2>
        <span className="qsv-n">{items.length}</span>
      </div>
      <p className="qsv-sub">{t.keptSub}</p>
      <ul className="qsv-row">
        {items.map((l, i) => (
          <li key={l.id}>
            <a
              className="qsv-item"
              href={`#${l.anchor ?? l.id}`}
              data-mp-location="kept_lines"
              data-mp-props={JSON.stringify({ item_id: l.id, item_type: 'quote', position: i + 1 })}
            >
              <span className="qsv-meaning">{l.meaning}</span>
              <span className="qsv-src">{l.source}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
