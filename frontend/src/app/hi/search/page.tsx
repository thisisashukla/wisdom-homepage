import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import PageTracker from '@/components/BlogTracker'
import { PageHero, Section } from '@/components/site'
import VerseSearch from '@/components/search/VerseSearch'
import { pageMeta } from '@/lib/seo'
import { DISPLAY_TOTAL_VERSES } from '@/lib/readingProgress'

const PATH = '/hi/search'

export const metadata: Metadata = pageMeta({
  path: PATH,
  title: 'श्लोक खोजें: संख्या या याद रही पंक्ति से गीता का श्लोक',
  description:
    '2.47 जैसी श्लोक संख्या या याद रही कोई पंक्ति लिखें, देवनागरी या अंग्रेज़ी अक्षरों में, और सीधे उस श्लोक पर पहुँचें। भगवद गीता, अष्टावक्र गीता, हनुमान चालीसा, कबीर के दोहे और उपनिषद।',
  locale: 'hi',
  twin: { en: '/search', hi: PATH },
  type: 'website',
})

export default function HiSearchPage() {
  return (
    <>
      <PageTracker pageName="Verse Search HI" />
      <Nav locale="hi" />
      <main lang="hi">
        <PageHero
          locale="hi"
          lang="hi"
          crumbs={[{ label: 'श्लोक खोजें', href: PATH }]}
          eyebrow="श्लोक खोज"
          title="श्लोक खोजें"
          sub="श्लोक संख्या या याद रही कोई पंक्ति लिखें, देवनागरी में या अंग्रेज़ी अक्षरों में। वर्तनी थोड़ी अलग हो, तब भी श्लोक मिल जाएगा।"
          facts={[`भगवद गीता के सभी ${DISPLAY_TOTAL_VERSES} श्लोक`, 'अष्टावक्र गीता', 'हनुमान चालीसा', 'कबीर और उपनिषद']}
          scriptToggle
        />
        <Section spacing="tight" track="search_box" lang="hi">
          <VerseSearch lang="hi" location="hi_search_page" />
          <p className="vs-later">
            श्लोक धुंधला सा याद है? उसके अर्थ का एक शब्द लिखें, जैसे कर्तव्य, डर या शरण, और जो श्लोक आएँ उन्हें पढ़कर देखें।
          </p>
        </Section>
      </main>
      <SiteFooter locale="hi" />
    </>
  )
}
