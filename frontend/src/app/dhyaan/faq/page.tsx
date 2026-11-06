import { BlogTracker } from '@/components/BlogTracker'
import FaqList from '../_components/Faq'
import JsonLd from '../_components/JsonLd'
import WaitlistForm from '../_components/WaitlistForm'
import PageHero from '../_components/PageHero'
import Flame from '../_components/Flame'
import { FAQS, FAQ_GROUPS, faqLd, type Faq } from '../_lib/faqs'
import { pageMeta } from '../_lib/site'

export const metadata = pageMeta({
  title: 'Dhyaan FAQ: launch, pricing, Apple Watch, privacy',
  description: 'Answers about Dhyaan, the silent meditation app for iPhone and Apple Watch: when it launches, what it measures, why there is no grade, devices and privacy.',
  path: '/faq',
})

export default function FaqPage() {
  const groups = Object.keys(FAQ_GROUPS) as Faq['group'][]
  return (
    <>
      <BlogTracker pageName="Dhyaan FAQ" />
      <JsonLd data={faqLd(FAQS)} />
      <PageHero
        kicker="FAQ"
        soft="Questions,"
        ink="answered plainly."
        sub="When it launches, what it reads from your AirPods and Apple Watch, why there is no grade, and where your data goes."
      >
        <nav className="dh-chips dh-chips--links" aria-label="FAQ sections">
          {groups.map((g) => (
            <a key={g} href={`#${g}`}>
              {FAQ_GROUPS[g]}
            </a>
          ))}
        </nav>
      </PageHero>
      <section className="dh-wrap" style={{ paddingBottom: 40 }}>
        <div style={{ maxWidth: 760 }}>
          {groups.map((g) => (
            <div key={g} id={g} className="dh-faqgroup">
              <h2 className="dh-faqgroup__h" data-reveal>
                {FAQ_GROUPS[g]}
              </h2>
              <FaqList items={FAQS.filter((f) => f.group === g)} />
            </div>
          ))}
        </div>
        <div className="dh-cta dh-cta--join">
          <Flame size={64} />
          <h2>
            Still curious? <em>Sit with us first.</em>
          </h2>
          <p>Beta invites go out in waitlist order. Every friend who joins with your link moves you up ten places.</p>
          <div className="dh-cta__form">
            <WaitlistForm source="faq" compact cta="Save my place" />
          </div>
        </div>
      </section>
    </>
  )
}
