import type { Metadata } from 'next'
import { COMPARE_PAGES, ComparisonPage, OutLink } from '@/components/compare'
import { Section } from '@/components/site'
import { pageMeta } from '@/lib/seo'

const PATH = COMPARE_PAGES.chalisa.path
const TITLE = 'Best Hanuman Chalisa App in 2026: Audio, Text and Widgets'
const DESCRIPTION =
  'Hanuman Chalisa apps compared: audio with synced text, offline play, your own script, paath counters and widgets. 11 iPhone apps plus Android picks, checked 11 Nov 2026.'

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION })

export default function BestChalisaAppsPage() {
  return (
    <ComparisonPage
      page="chalisa_apps"
      pageName="Best Hanuman Chalisa Apps"
      path={PATH}
      crumbs={[
        { label: 'App comparisons', href: COMPARE_PAGES.hub.path },
        { label: 'Hanuman Chalisa apps', href: PATH },
      ]}
      title="The best Hanuman Chalisa apps in 2026"
      sub="Most Chalisa apps play the audio and show the forty chaupais. They differ in the voice, the scripts, whether they work offline, how they count your paaths, and how many ads you sit through. Here is what each one offers."
      facts={['11 iPhone apps checked', 'Plus two on Android', 'No scores, no paid placements']}
      noteWhat="Chalisa apps"
      oursListed={false}
      readersIntro="Pick the line that sounds like you. Each one takes you to that app's entry."
      readers={[
        { reader: 'You want audio and text, and a Home Screen widget', app: 'mychalisa', why: "Chalisas for many deities with synced lyrics, offline play and widgets for today's Chalisa. Ads unless you pay $5.99 once." },
        { reader: 'You want to count 11, 21 or 108 paaths', app: 'hcdailypath', why: 'Sing along as each verse lights up, and a counter keeps your paaths. No ads, no account, offline. Brand new.' },
        { reader: 'You want it in your own script, offline', app: 'hcintus', why: 'Ten scripts, from Gurmukhi to Malayalam, with audio you can repeat as often as you like.' },
        { reader: 'You want Bajrang Baan and Sunderkand too', app: 'hcbajrang', why: "The Chalisa sung by Hariharan, Bajrang Baan, Sankat Mochan Ashtak, Ram Stuti and Sunderkand." },
        { reader: 'You want to wake up to it', app: 'hcdotzoo', why: 'Set the Chalisa as your morning alarm. Free.' },
        { reader: 'You read in Hindi and want more than the Chalisa', app: 'gitaseva', why: 'Gita Press books and recitations, including the Chalisa and Sunderkand, with synced lyrics.' },
        { reader: 'You want the meaning of every line', href: '/hanuman-chalisa', title: 'The Chalisa, line by line, on this site', why: 'All 43 lines with their meaning, free in your browser. No app needed. (Our own page.)' },
      ]}
      tableTitle="All 11 apps side by side"
      tableIntro="The same nine things for every app. Tap an app's name for its full entry."
      tableApps={['mychalisa', 'hcdailypath', 'hcintus', 'hcbajrang', 'hcninder', 'hchd', 'hcdotzoo', 'hcdotzooold', 'gitaseva', 'diya', 'srimandir']}
      columns={['price', 'ratings', 'updated', 'android', 'audio', 'offline', 'widgets', 'languages', 'privacy']}
      notes={['audio', 'offline', 'widgets']}
      groups={[
        {
          id: 'audio-text',
          title: 'Chalisa apps with audio and text',
          items: [
            { key: 'mychalisa', bestFor: 'Best all-round, with widgets' },
            { key: 'hcdailypath', bestFor: 'Best for counting paaths, no ads' },
            { key: 'hcintus', bestFor: 'Best for your own script' },
            { key: 'hcbajrang', bestFor: 'Best for more Hanuman stotras' },
            { key: 'hcninder', bestFor: 'Many stotras, in Hindi, offline' },
            { key: 'hchd', bestFor: 'Repeat 1, 3, 7 or 11 times' },
          ],
        },
        {
          id: 'simple',
          title: 'Simple and older apps',
          intro: 'Still used and still rated well, but not updated recently.',
          items: [
            { key: 'hcdotzoo', bestFor: 'Best for an alarm' },
            { key: 'hcdotzooold', bestFor: 'The Chalisa and aarti, nothing else' },
          ],
        },
        {
          id: 'wider',
          title: 'Inside a wider devotional app',
          intro: 'Apps where the Chalisa is one recording among many.',
          items: [
            { key: 'gitaseva', bestFor: 'Best for Hindi and Gita Press' },
            { key: 'diya', bestFor: 'For a daily practice that includes it' },
            { key: 'srimandir', bestFor: 'For temple puja, with Chalisa audio' },
          ],
        },
      ]}
      extra={
        <Section id="android" track="android" title="On Android" width="narrow">
          <div className="sx-prose rv">
            <p>
              Two Chalisa apps on Google Play have far more ratings than any on iPhone. We list them for Android readers. We did
              not find iPhone apps under the same developer names.
            </p>
            <ul className="cx-plain">
              <li>
                <strong>Hanuman Chalisa</strong> by Sai Soft: 1M+ installs, 4.9 from about 49,000 ratings, updated October 2026.
                Fourteen tracks that play offline, lyrics in 11 Indian languages, the 108 names and an alarm.{' '}
                <OutLink href="https://play.google.com/store/apps/details?id=com.pricefull.hanumanchalisa" app="android_saisoft" loc="chalisa_apps_android_google_play">
                  Google Play page
                </OutLink>
              </li>
              <li>
                <strong>Hanuman Chalisa</strong> by Spiritual Studio: 1M+ installs, 4.9 from about 27,000 ratings, last updated
                July 2024. Repeat 1, 3, 7 or 11 times, text in sync with the audio, works offline, and it can be your alarm.{' '}
                <OutLink href="https://play.google.com/store/apps/details?id=spiritualstudio.hanumanchalisa" app="android_spiritualstudio" loc="chalisa_apps_android_google_play">
                  Google Play page
                </OutLink>
              </li>
            </ul>
          </div>
        </Section>
      }
      faq={[
        {
          q: 'What is the best Hanuman Chalisa app?',
          a: 'For audio, text, offline play and widgets in one place, My Chalisa (with ads unless you pay $5.99 once). For counting 11, 21 or 108 paaths with no ads, Hanuman Chalisa Daily Path. For your own script, Hanuman Chalisa Audio & Text. On Android, the Sai Soft app has the most ratings.',
        },
        {
          q: 'Is there a Hanuman Chalisa widget for iPhone?',
          a: "My Chalisa has Home Screen widgets that show today's Chalisa and aarti with a streak. None of the Chalisa apps we checked says it has a Lock Screen widget. Diya has Lock Screen widgets, but they show Bhagavad Gita verses.",
        },
        {
          q: 'Which Hanuman Chalisa app works offline?',
          a: 'My Chalisa (offline play), Hanuman Chalisa Text And Audio, Hanuman Chalisa (HD audio), Hanuman Chalisa Audio & Text and Hanuman Chalisa Daily Path all say they work without internet.',
        },
        {
          q: 'Which Hanuman Chalisa app has no ads?',
          a: 'Hanuman Chalisa Daily Path says it has no ads, accounts or tracking. My Chalisa, Hanuman Chalisa Text And Audio and Hanuman Chalisa Bajrang Baan sell a purchase that removes ads.',
        }
      ]}
      criteria={[
        'Audio: whose voice, and whether the text follows it',
        'Scripts and languages',
        'Offline play, repeat and paath counting',
        'Widgets and alarms',
        "Price, ads and Apple's privacy label",
        'When it was last updated, and its ratings in the US and India',
      ]}
      related={[
        { href: '/hanuman-chalisa', kicker: 'No app needed', title: 'The Hanuman Chalisa, line by line', body: 'All 43 lines with their meaning.', location: 'chalisa_apps_related_text' },
        { href: COMPARE_PAGES.prayer.path, kicker: 'Compared', title: 'Hindu prayer and practice apps', body: 'Puja, japa, mantras and a daily routine.', location: 'chalisa_apps_related_prayer' },
        { href: COMPARE_PAGES.gita.path, kicker: 'Compared', title: 'Bhagavad Gita apps', body: 'Commentary, chanting, languages and a verse a day.', location: 'chalisa_apps_related_gita' },
        { href: COMPARE_PAGES.hub.path, kicker: 'All comparisons', title: 'Every app guide in one place', location: 'chalisa_apps_related_hub' },
      ]}
      ldHeadline="The best Hanuman Chalisa apps in 2026"
      ldDescription={DESCRIPTION}
    />
  )
}
