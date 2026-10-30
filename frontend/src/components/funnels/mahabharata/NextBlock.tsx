import NextStep from '@/components/quotes/NextStep'
import { Band } from './Shell'

const COPY = {
  en: {
    head: 'Keep one line close',
    copy: {
      app: { line: 'A line from the Gita on your Lock Screen each morning, in Sanskrit and plain English.', cta: 'Get one line each morning' },
      whatsapp: { line: 'One line each morning on WhatsApp, Sanskrit with plain English.', cta: 'Join' },
      email: { line: 'Week 1 of the Gita by email: one verse a day and what it asks of you.', cta: 'Send my week' },
    },
  },
  hi: {
    head: 'एक श्लोक अपने पास रखें',
    copy: {
      app: { line: 'हर सुबह लॉक स्क्रीन पर गीता का एक श्लोक, संस्कृत और आसान अर्थ के साथ।', cta: 'हर सुबह एक श्लोक पाएं' },
      whatsapp: { line: 'हर सुबह WhatsApp पर एक श्लोक, संस्कृत और सरल अर्थ के साथ।', cta: 'जुड़ें' },
      email: { line: 'गीता का पहला हफ़्ता ईमेल पर: रोज़ एक श्लोक और उसका आपके लिए मतलब।', cta: 'मेरा हफ़्ता भेजें' },
    },
  },
} as const

/** Device-aware next step (shared NextStep) with funnel copy that promises only what the app has. */
export default function NextBlock({ locale = 'en', page, placement = 'end', alt }: { locale?: 'en' | 'hi'; page: string; placement?: string; alt?: boolean }) {
  const c = COPY[locale]
  return (
    <Band alt={alt} mp="next_step" h={c.head} hId={`mb-next-${placement}`} className="mb-next">
      <div className="rv">
        <NextStep funnel="mahabharata" locale={locale} pageName={page} pageKey={page} placement={placement} copy={c.copy} />
      </div>
    </Band>
  )
}
