import type { Metadata } from 'next'
import { COMPARE_PAGES, ComparisonPage } from '@/components/compare'
import { pageMeta } from '@/lib/seo'

const PATH = COMPARE_PAGES.prayer.path
const TITLE = 'Best Hindu Prayer App in 2026: 15 Apps for Daily Practice'
const DESCRIPTION =
  'Hindu prayer, puja, japa and meditation apps compared: Sadhana, Diya, Karana, Vignanam, Sadhguru and more. Who each suits, prices and privacy, checked 11 Nov 2026.'

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION })

export default function BestHinduPrayerAppsPage() {
  return (
    <ComparisonPage
      page="prayer_apps"
      pageName="Best Hindu Prayer Apps"
      path={PATH}
      crumbs={[
        { label: 'App comparisons', href: COMPARE_PAGES.hub.path },
        { label: 'Hindu prayer apps', href: PATH },
      ]}
      title="The best Hindu prayer and practice apps in 2026"
      sub="Some apps walk you through a puja. Some count your japa, play the aarti, or give you a verse and a quiet minute each morning. Here are 15 of them, grouped by the kind of practice you want to keep."
      facts={['15 apps checked', 'Puja, japa, prayer, meditation', 'No scores, no paid placements']}
      noteWhat="prayer and practice apps"
      oursListed={false}
      readersIntro="Pick the line closest to the practice you want. Each one takes you to that app's entry."
      readers={[
        { reader: 'You want a daily routine, like Hallow, for Hindus', app: 'diya', why: 'Scripture, prayers to listen to, a digital altar and a Gita verse on your Lock Screen, in English. A subscription after the trial.' },
        { reader: 'You want a daily practice that is mostly free', app: 'karana', why: 'A lamp, a verse and the next festival each day, free. Fifty-eight prayers with recorded audio. Plus opens guided journeys.' },
        { reader: 'You want guided puja and japa at a home shrine', app: 'sadhana', why: 'Japa, nitya puja, yajna and abhishekam for the deity you choose. Free, with no subscription and no ads.' },
        { reader: 'You want to understand why you do what you do', app: 'yangra', why: 'Daily prayers in translation, festival puja guides with shopping lists, and life rituals explained.' },
        { reader: 'You want stotras in your own script', app: 'vignanam', why: 'The vignanam.org library in 20+ Indian scripts, with svaras marked and a chanting series. Free.' },
        { reader: 'You want slokas and discourses to listen to, offline', app: 'stotralahari', why: 'Slokas, learning sessions, bhajans and discourses, downloadable. Free, and no data collected.' },
        { reader: 'You want to meditate with a Hindu teacher', app: 'sadhguru', why: "Free guided practices such as Isha Kriya. For Vedic chants and breathwork, bliss by Gurudev, which also runs on Apple Watch." },
        { reader: 'You want to pray before you scroll', app: 'dharmalock', why: 'Locks the apps you choose until you finish a short prayer. A weekly or yearly subscription.' },
        { reader: 'You want a quiet verse and a reflection, no account', app: 'saachi', why: 'A Gita verse with a short story each day, and a virtue from chapter 16 to practise. Free and very new.' },
      ]}
      tableTitle="All 15 apps side by side"
      tableIntro="The same nine things for every app. Tap an app's name for its full entry."
      tableApps={['diya', 'karana', 'bhagavan', 'saachi', 'dharmam', 'sadhana', 'ghar', 'yangra', 'dharmalock', 'srimandir', 'vignanam', 'stotralahari', 'hindudaily', 'sadhguru', 'bliss']}
      columns={['price', 'ratings', 'updated', 'android', 'audio', 'plans', 'widgets', 'languages', 'privacy']}
      notes={['audio', 'plans', 'widgets']}
      groups={[
        {
          id: 'daily-practice',
          title: 'A daily practice, guided',
          intro: 'Apps that hand you a short routine each day: a prayer, a verse, a moment of quiet.',
          items: [
            { key: 'diya', bestFor: 'Closest to Hallow, for the diaspora' },
            { key: 'karana', bestFor: 'Best mostly free daily practice' },
            { key: 'bhagavan', bestFor: 'A shloka, prompt, meditation and challenge' },
            { key: 'saachi', bestFor: 'Best for quiet reflection, no account' },
            { key: 'dharmam', bestFor: 'Prayer, meditation and japa in one routine' },
          ],
        },
        {
          id: 'puja-japa',
          title: 'Puja, japa and home rituals',
          intro: 'For doing the practice itself, step by step.',
          items: [
            { key: 'sadhana', bestFor: 'Best for guided puja and japa, free' },
            { key: 'ghar', bestFor: 'Best for home rituals in English and Hindi' },
            { key: 'yangra', bestFor: 'Best for festivals and life rituals explained' },
            { key: 'dharmalock', bestFor: 'Best for praying before you scroll' },
            { key: 'srimandir', bestFor: 'For booking a puja at a temple in India' },
          ],
        },
        {
          id: 'texts',
          title: 'Prayers and stotras to read or chant',
          intro: 'Libraries you open when you know what you want to recite.',
          items: [
            { key: 'vignanam', bestFor: 'Best for stotras in your own script' },
            { key: 'stotralahari', bestFor: 'Best for listening, offline' },
            { key: 'hindudaily', bestFor: 'A short list of daily prayers' },
          ],
        },
        {
          id: 'meditation',
          title: 'Meditation from Hindu teachers',
          items: [
            { key: 'sadhguru', bestFor: 'Best free guided meditation' },
            { key: 'bliss', bestFor: 'Best for chants, breathwork and Apple Watch' },
          ],
        },
      ]}
      faq={[
        {
          q: 'Is there a Hallow app for Hindus?',
          a: 'No single app does everything Hallow does. The closest in shape are Diya (scripture, prayers to listen to, a digital altar and Lock Screen widgets, with a subscription) and Karana (a free daily practice with recorded prayers, and paid guided journeys through whole texts). Bhagavan and Saachi are smaller apps with a similar daily rhythm.',
        },
        {
          q: 'What is the best Hindu prayer app?',
          a: 'For guided puja and japa at a home shrine, free, Sadhana. For a short daily routine with recorded prayers, Karana or Diya. For stotras in your own script, Vignanam. For understanding festivals and rituals, Yangra.',
        },
        {
          q: 'Which Hindu meditation app is best?',
          a: 'For free guided meditation from a Hindu teacher, the Sadhguru app, which includes the 12-minute Isha Kriya. For a large library of guided meditations, Vedic chants and breathwork, bliss by Gurudev, which also runs on Apple Watch. For mantra japa with a counter, Sadhana.',
        },
        {
          q: 'Which of these apps are free?',
          a: 'Sadhana, Vignanam, Stotra Lahari and Saachi say they are free. Karana and Bhagavan have a free daily practice with paid extras. Hindu Daily Prayers is free with ads. Diya, Yangra and Dharma Lock need a subscription for most of what they do.',
        }
      ]}
      criteria={[
        'What a day with the app looks like: prayer, verse, puja, japa or meditation',
        'Audio: recorded prayers, chants or guidance',
        'Languages and scripts',
        'Price, subscriptions and paid services',
        "Ads and Apple's privacy label",
        'Widgets, reminders and streaks',
        'When it was last updated, and its ratings in the US and India',
      ]}
      related={[
        { href: COMPARE_PAGES.gita.path, kicker: 'Compared', title: 'Bhagavad Gita apps', body: 'Commentary, chanting, languages and a verse a day.', location: 'prayer_apps_related_gita' },
        { href: COMPARE_PAGES.chalisa.path, kicker: 'Compared', title: 'Hanuman Chalisa apps', body: 'Audio, text and counting your paaths.', location: 'prayer_apps_related_chalisa' },
        { href: COMPARE_PAGES.widget.path, kicker: 'Compared', title: 'Gita widgets for iPhone', body: 'A verse on your Lock Screen.', location: 'prayer_apps_related_widget' },
        { href: '/hanuman-chalisa', kicker: 'No app needed', title: 'The Hanuman Chalisa, line by line', body: 'All 43 lines with their meaning, on this site.', location: 'prayer_apps_related_chalisa_text' },
        { href: '/blogs/20-famous-sanskrit-shlokas', kicker: 'No app needed', title: '20 famous Sanskrit shlokas', body: 'From Vakratunda Mahakaya to Om Purnamadah, with meaning.', location: 'prayer_apps_related_shlokas' },
        { href: COMPARE_PAGES.hub.path, kicker: 'All comparisons', title: 'Every app guide in one place', location: 'prayer_apps_related_hub' },
      ]}
      ldHeadline="The best Hindu prayer and practice apps in 2026"
      ldDescription={DESCRIPTION}
    />
  )
}
