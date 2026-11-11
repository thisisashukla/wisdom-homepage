import type { Metadata } from 'next'
import { COMPARE_PAGES, ComparisonPage } from '@/components/compare'
import { Section } from '@/components/site'
import { pageMeta } from '@/lib/seo'

const PATH = COMPARE_PAGES.widget.path
const TITLE = 'Bhagavad Gita Widget for iPhone: Lock Screen Apps Compared (2026)'
const DESCRIPTION =
  'Which apps put a daily Gita verse on your iPhone Lock Screen or Home Screen: Diya, Wisdom, Sattva and more, compared, plus how to add one. Checked 11 Nov 2026.'

const GITA_PAGE = COMPARE_PAGES.gita.path
const NO_WIDGET: { key: string; name: string }[] = [
  { key: 'jkyog', name: 'Bhagavad Gita: Krishna Bhakti' },
  { key: 'songofgod', name: 'Bhagavad Gita: The Song of God' },
  { key: 'gitavardhan', name: 'GitaVardhan' },
  { key: 'bbt', name: 'Bhagavad-gita As It Is (it has a Verse of the Day inside the app)' },
  { key: 'tenmin', name: '10 Minute Gita' },
  { key: 'gita365', name: 'Gita 365' },
  { key: 'banaka', name: 'Shrimad Bhagavad Gita English' },
  { key: 'gitaseva', name: 'Gita Seva' },
]

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION })

export default function GitaWidgetPage() {
  return (
    <ComparisonPage
      page="gita_widget"
      pageName="Gita Widget iPhone"
      path={PATH}
      crumbs={[
        { label: 'App comparisons', href: COMPARE_PAGES.hub.path },
        { label: 'Gita widgets for iPhone', href: PATH },
      ]}
      title="A Bhagavad Gita verse on your iPhone Lock Screen: the apps that do it"
      sub="A widget puts the verse where your eyes already go. You meet it without opening anything. Most well-known Gita apps do not offer one; these do."
      facts={['8 apps with a widget', 'Lock Screen and Home Screen', 'How to add one, below']}
      noteWhat="apps with a Gita or devotional widget"
      readersIntro="Pick the line that sounds like you. Each one takes you to that app's entry."
      readers={[
        { reader: 'A verse that changes through the day', app: 'diya', why: 'Lock Screen and Home Screen widgets with a daily or hourly Gita verse, inside a fuller Hindu practice app. Subscription after the trial.' },
        { reader: 'A verse chosen for what you are going through', app: 'wisdom', why: "Today's verse from a week planned around what you told it, in every widget size. Made by us; English only." },
        { reader: 'Free, with no data collected', app: 'sattva', why: 'Home and Lock Screen widgets with daily quotes and weekly lessons. Not updated since October 2025.' },
        { reader: 'A Gita verse next to your Chalisa and japa', app: 'mychalisa', why: "Home Screen widgets for today's Chalisa and aarti, a daily Gita verse, japa beads and festivals." },
        { reader: 'The Gita, Upanishads and Yoga Sutras', app: 'ancient', why: 'A daily reading in Hindi or English, with a Home or Lock Screen widget. Very new.' },
        { reader: 'A nudge to keep reading where you stopped', app: 'kavisha', why: 'A Home Screen widget that shows your last bookmark. Not updated since 2021.' },
      ]}
      tableTitle="Every app here with a widget"
      tableIntro="What the developer says each widget does. Tap an app's name for its full entry."
      tableApps={['diya', 'wisdom', 'sattva', 'mychalisa', 'ancient', 'kavisha', 'ghar', 'vignanam']}
      columns={['widgetHome', 'widgetLock', 'widgetShows', 'price', 'ratings', 'updated', 'android', 'privacy']}
      notes={[]}
      groups={[
        {
          id: 'apps',
          title: 'Each app, with what is worth knowing',
          items: [
            { key: 'diya', bestFor: 'Best for a verse through the day' },
            { key: 'wisdom', bestFor: 'Best for a verse picked for your life' },
            { key: 'sattva', bestFor: 'Best free option' },
            { key: 'mychalisa', bestFor: 'Best for Gita plus Chalisa and japa' },
            { key: 'ancient', bestFor: 'Gita, Upanishads and Yoga Sutras' },
            { key: 'kavisha', bestFor: 'A bookmark widget for reading' },
            { key: 'ghar', bestFor: 'Shortcuts to home practice' },
            { key: 'vignanam', bestFor: 'Festival widgets, not verses' },
          ],
        },
      ]}
      extra={
        <>
          <Section id="how-to" track="how_to" title="How to put a Gita verse on your Lock Screen" width="narrow">
            <div className="sx-prose rv">
              <ol className="cx-steps">
                <li>Install an app from this page that offers a Lock Screen widget, and open it once so it can load today&apos;s verse.</li>
                <li>On your iPhone, touch and hold the Lock Screen until Customize appears. Tap Customize, then Lock Screen.</li>
                <li>Tap the row of widgets under the time and pick the app from the list.</li>
                <li>Choose a widget, place it, and tap Done.</li>
              </ol>
              <p>
                For the Home Screen, touch and hold an empty spot, tap Edit and then Add Widget (on older iPhones, the + button),
                find the app and choose a size. Lock Screen widgets need iOS 16 or later.
              </p>
            </div>
          </Section>
          <Section id="no-widget" track="no_widget" title="Well-known Gita apps with no widget mentioned" width="narrow" tone="band">
            <div className="sx-prose rv">
              <p>
                We checked the store pages of these popular Gita apps and found no widget mentioned. They are good at other things,
                which our Gita app comparison covers.
              </p>
              <ul className="cx-plain">
                {NO_WIDGET.map((a) => (
                  <li key={a.key}>
                    <a href={`${GITA_PAGE}#${a.key}`} data-mp-location="gita_widget_no_widget_app">
                      {a.name}
                    </a>
                  </li>
                ))}
              </ul>
              <p>
                Many very small apps, most with fewer than five ratings, also mention a verse widget. We left them out until
                people start using them; we will add any that grow.
              </p>
            </div>
          </Section>
        </>
      }
      faq={[
        {
          q: 'Can I put a Bhagavad Gita verse on my iPhone Lock Screen?',
          a: 'Yes, with an app that offers a Lock Screen widget. Diya, Wisdom, Sattva and Bhagavad Gita English & Hindi say they do. You need iOS 16 or later. The steps are on this page.',
        },
        {
          q: 'Which Bhagavad Gita app has a widget?',
          a: 'Diya (daily or hourly verse, Lock and Home Screen), Wisdom (every size, Lock and Home Screen), Sattva (Lock and Home Screen, free), My Chalisa (Home Screen, with a daily Gita verse among others), Bhagavad Gita English & Hindi (Home or Lock Screen) and Bhagavad Gita Interpretation (a bookmark widget).',
        },
        {
          q: 'Do the big Gita apps have widgets?',
          a: 'Not that they say. The store pages of Bhagavad Gita: Krishna Bhakti, The Song of God, GitaVardhan, Bhagavad-gita As It Is, 10 Minute Gita and Gita 365 do not mention a widget.',
        },
        {
          q: 'Is there a free Gita widget?',
          a: 'Sattva is free and says it collects no data, though it has not been updated since October 2025. My Chalisa is free with ads. Diya needs a subscription after its trial, and Wisdom needs Pro after the first week.',
        },
        {
          q: 'Does Wisdom work on Apple Watch?',
          a: "Wisdom's App Store description mentions Apple Watch complications, but Apple Watch is not listed under the app's Compatibility on the store. We will update this when the listing changes.",
        },
      ]}
      criteria={[
        'Whether the developer says the app has a Home Screen widget, a Lock Screen widget, or both',
        'What the widget shows',
        "Price, ads and Apple's privacy label",
        'When it was last updated, and its ratings in the US and India',
      ]}
      related={[
        { href: GITA_PAGE, kicker: 'Compared', title: 'Bhagavad Gita apps', body: 'Commentary, chanting, languages and a verse a day.', location: 'gita_widget_related_gita' },
        { href: '/gita/today', kicker: 'No app needed', title: "Today's verse on this site", body: 'One verse each day with the Sanskrit and its meaning.', location: 'gita_widget_related_today' },
        { href: COMPARE_PAGES.prayer.path, kicker: 'Compared', title: 'Hindu prayer and practice apps', body: 'Puja, japa, mantras and a daily routine.', location: 'gita_widget_related_prayer' },
        { href: COMPARE_PAGES.hub.path, kicker: 'All comparisons', title: 'Every app guide in one place', location: 'gita_widget_related_hub' },
      ]}
      ldHeadline="Bhagavad Gita widgets for iPhone, compared"
      ldDescription={DESCRIPTION}
    />
  )
}
