import type { Locale } from '@/lib/locale'

/** Heading and NextStep copy for every Mahabharata page: promises only what the app has. */
export const NEXT: Record<Locale, { head: string; copy: Record<'app' | 'whatsapp' | 'email', { line: string; cta: string }> }> = {
  en: {
    head: 'Keep one line close',
    copy: {
      app: { line: 'A line from the Gita on your Lock Screen each morning, picked for what you are going through.', cta: 'Get one line each morning' },
      whatsapp: { line: 'One line each morning on WhatsApp, to read before the day starts.', cta: 'Join' },
      email: { line: 'Week 1 of the Gita by email: one verse a day and what it asks of you.', cta: 'Send my week' },
    },
  },
  hi: {
    head: 'एक श्लोक अपने पास रखें',
    copy: {
      app: { line: 'हर सुबह लॉक स्क्रीन पर गीता का एक श्लोक, जो आपकी बात के हिसाब से चुना गया हो।', cta: 'हर सुबह एक श्लोक पाएं' },
      whatsapp: { line: 'हर सुबह WhatsApp पर एक श्लोक, दिन शुरू होने से पहले पढ़ने के लिए।', cta: 'जुड़ें' },
      email: { line: 'गीता का पहला हफ़्ता ईमेल पर: रोज़ एक श्लोक और उसका आपके लिए मतलब।', cta: 'मेरा हफ़्ता भेजें' },
    },
  },
}
