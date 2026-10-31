'use client'

/**
 * The next step after a shalaka: the kit NextStep (app on iPhone, WhatsApp on Android when the
 * channel is set, otherwise the custom 7-day Gita plan on /start), framed by the plan copy when
 * the step is the plan. Used on the answer, the day-done screen, below the tool and on line pages.
 * Events: Next Step Viewed / Clicked (kit), plus Plan From Chaupai Clicked when the plan is opened.
 */

import { useEffect, useState } from 'react'
import { NextStep } from '@/components/site'
import { detectPlatform } from '@/lib/app'
import type { Locale } from '@/lib/locale'
import { EVENTS, trackEventBeacon } from '@/lib/mixpanel'
import type { RsNextCopy } from '@/lib/funnels/ram-shalaka/core'

export type ShalakaPlanCopy = { planTitle: string; planSub: string; planBtn: string; planFree: string }

type Props = {
  locale: Locale
  placement: 'answer' | 'done' | 'page' | 'line'
  plan: ShalakaPlanCopy
  next: RsNextCopy
  n?: number | null
  situation?: string | null
}

const WHATSAPP_CHANNEL = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL || ''

export default function ShalakaNext({ locale, placement, plan, next, n = null, situation = null }: Props) {
  // Same choice NextStep makes; the server and desktop render the plan.
  const [kind, setKind] = useState<'app' | 'whatsapp' | 'email'>('email')
  useEffect(() => {
    const p = detectPlatform()
    setKind(p === 'ios' ? 'app' : p === 'android' && WHATSAPP_CHANNEL ? 'whatsapp' : 'email')
  }, [])
  const isPlan = kind === 'email'

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlan || !(e.target as Element).closest?.('a')) return
    trackEventBeacon(EVENTS.PlanFromChaupaiClicked, { placement, ...(n ? { item_id: `rs-${n}`, item_type: 'shalaka' } : {}), situation })
  }

  return (
    <div className={`rs-plan${isPlan ? ' is-plan' : ''}`} lang={locale} onClick={onClick}>
      {isPlan && (
        <>
          <span className="rs-plan-mark" aria-hidden="true">
            {locale === 'hi' ? '७' : '7'}
          </span>
          <h3 className="rs-plan-title">{plan.planTitle}</h3>
        </>
      )}
      <NextStep
        locale={locale}
        placement={placement}
        pageKey={n ? `rs-${n}` : 'rs'}
        startSituation={situation ?? undefined}
        copy={{ app: next.app, whatsapp: next.whatsapp, email: { line: plan.planSub, cta: plan.planBtn } }}
        className="rs-plan-step"
      />
      {isPlan && <p className="rs-plan-free">{plan.planFree}</p>}
    </div>
  )
}
