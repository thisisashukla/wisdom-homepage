import type { Metadata } from 'next'
import { COMPARE_PAGES, ComparisonPage } from '@/components/compare'
import { pageMeta } from '@/lib/seo'

const PATH = COMPARE_PAGES.gita.path
const TITLE = 'Best Bhagavad Gita App in 2026: 15 Apps Compared'
const DESCRIPTION =
  'Which Gita app suits you: a full commentary, Hindi and 13 languages, chanting audio, free and offline, or one verse a day. 15 apps, prices and features checked 11 Nov 2026.'

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION })

export default function BestGitaAppsPage() {
  return (
    <ComparisonPage
      page="gita_apps"
      pageName="Best Gita Apps"
      path={PATH}
      crumbs={[
        { label: 'App comparisons', href: COMPARE_PAGES.hub.path },
        { label: 'Bhagavad Gita apps', href: PATH },
      ]}
      title="The best Bhagavad Gita apps in 2026, by what you want from them"
      sub="The right Gita app depends on how you like to read: slowly with a commentary, aloud in Sanskrit, in your own language, or one verse a day. Here are 15 apps people actually use, and the reader each one suits."
      facts={['15 apps checked', 'iPhone and Android', 'No scores, no paid placements']}
      noteWhat="Gita apps"
      readersIntro="Pick the line that sounds like you. Each one takes you to that app's entry, with what is worth knowing before you install."
      readers={[
        { reader: 'You want to study with a full commentary', app: 'songofgod', why: "Swami Mukundananda's commentary, five layers for every verse, each shloka recited, offline, in six languages. Free, with no ads." },
        { reader: 'You want it free, offline and in your language', app: 'gitavardhan', why: 'Thirteen languages in their own scripts, chanting for every verse, and the commentaries of Shankara and Ramanuja. No account, no ads, no data collected.' },
        { reader: 'You read the Gita Press way, in Hindi', app: 'gitaseva', why: 'Gita Press books, pravachan by Swami Ramsukhdas and Jayadayal Goyandka, and Geeta path to listen to.' },
        { reader: "You want Prabhupada's edition", app: 'bbt', why: 'The official Bhaktivedanta Book Trust app, with Devanagari, word for word and purports you can switch on and off. $4.99 once.' },
        { reader: 'You want to finish the whole Gita, ten minutes a day', app: 'tenmin', why: 'All 700 verses in 239 short readings, with Sanskrit, transliteration, commentary and narration. Free, with no ads.' },
        { reader: 'You would rather listen to a teacher', app: 'gita365', why: "Two to four minutes a day of Swami Chinmayananda in his own voice. The iPhone version has not changed since 2020; Android is current." },
        { reader: 'You want a verse for what you are going through', app: 'wisdom', why: 'Tell it what is on your mind and it plans a week of verses for it, read aloud. Made by us, iPhone only. Sattva is a free alternative.' },
        { reader: 'You want the Gita on your Lock Screen', href: COMPARE_PAGES.widget.path, title: 'Gita widgets for iPhone', why: 'Few Gita apps offer a Lock Screen widget. We compared the ones that do.' },
        { reader: 'You want many translators side by side', app: 'vedvyas', why: 'Translations and commentaries from more than 20 authors. Its Android app is far more established than the iPhone one.' },
      ]}
      tableTitle="All 15 apps side by side"
      tableIntro="The same ten things for every app. Tap an app's name for its full entry."
      tableApps={['songofgod', 'jkyog', 'gitavardhan', 'gitaseva', 'bbt', 'vedvyas', 'banaka', 'kavisha', 'gita365', 'datta', 'bgfa', 'tenmin', 'diya', 'wisdom', 'sattva']}
      columns={['price', 'ratings', 'updated', 'android', 'sanskrit', 'commentary', 'audio', 'offline', 'widgets', 'privacy']}
      groups={[
        {
          id: 'read-and-study',
          title: 'To read and study the text',
          intro: 'Apps built around the 700 verses, with translation and, in most, a commentary.',
          items: [
            { key: 'songofgod', bestFor: 'Best for a full commentary, free' },
            { key: 'jkyog', bestFor: 'Best if you also want bhajans, talks and a temple' },
            { key: 'gitavardhan', bestFor: 'Best for free, offline, many languages' },
            { key: 'gitaseva', bestFor: 'Best for Hindi and Gita Press' },
            { key: 'bbt', bestFor: "Best for Prabhupada's edition" },
            { key: 'vedvyas', bestFor: 'Best for many translators (on Android)' },
            { key: 'banaka', bestFor: 'A simple free reader' },
            { key: 'kavisha', bestFor: 'A plain English interpretation' },
          ],
        },
        {
          id: 'listen',
          title: 'To listen or watch',
          intro: 'When you would rather hear the Gita than read it.',
          items: [
            { key: 'gita365', bestFor: 'Best for a daily talk from a teacher' },
            { key: 'datta', bestFor: 'Best for chanting along with the text' },
            { key: 'bgfa', bestFor: 'Best for short videos in Hindi or English' },
          ],
        },
        {
          id: 'daily',
          title: 'For a verse a day',
          intro: 'Small daily doses, for when a whole chapter is too much.',
          items: [
            { key: 'tenmin', bestFor: 'Best for finishing the whole Gita' },
            { key: 'diya', bestFor: 'Best for a daily Hindu practice around the Gita' },
            { key: 'wisdom', bestFor: 'Best for a verse picked for what you are going through' },
            { key: 'sattva', bestFor: 'A free way to match verses to how you feel' },
          ],
        },
      ]}
      faq={[
        {
          q: 'What is the best Bhagavad Gita app?',
          a: "It depends on how you read. For a full commentary that is free and works offline, The Song of God. For many Indian languages with chanting and no account, GitaVardhan. For Prabhupada's edition, Bhagavad-gita As It Is ($4.99). To read all 700 verses ten minutes a day, 10 Minute Gita. For one verse a day picked for what you are going through, Wisdom (iPhone, made by us) or the free Sattva.",
        },
        {
          q: 'Which Bhagavad Gita app has audio?',
          a: 'GitaVardhan has chanting for every verse and the full parayan. The Song of God recites each shloka, even offline. Bhagavad Gita: Krishna Bhakti has pronunciation audio. Gita 365 is a short daily talk with chanting. Bhagavad Gita: Text & Audio has every shloka chanted with synced text ($4.99). 10 Minute Gita and Wisdom read to you.',
        },
        {
          q: 'Is there a good Bhagavad Gita app for iPhone in English?',
          a: "Most apps here are in English. For a commentary, The Song of God or Bhagavad Gita: Krishna Bhakti. For the whole Gita in daily readings, 10 Minute Gita. For one verse a day with the Sanskrit, read aloud and kept on your Lock Screen, Wisdom or Diya.",
        },
        {
          q: 'Which Gita apps work offline?',
          a: 'GitaVardhan, The Song of God (after you download a language), Bhagavad Gita: Krishna Bhakti, 10 Minute Gita (after download) and Shrimad Bhagavad Gita English all say they work without internet.',
        },
        {
          q: 'Which Gita apps are free with no ads?',
          a: 'Bhagavad Gita: Krishna Bhakti, The Song of God, GitaVardhan and 10 Minute Gita say they are free with no ads. Wisdom has no ads, but after the first week it needs Pro.',
        },
        {
          q: 'Is there a Bhagavad Gita app in Hindi?',
          a: 'Yes. GitaVardhan (Hindi among 13 languages), Gita Seva (Gita Press, mostly Hindi), The Song of God and Bhagavad Gita: Krishna Bhakti (Hindi commentary), 10 Minute Gita (Hindi option) and Bhagavad Gita: Hindi & English. Wisdom is English only.',
        },
        {
          q: 'Is Wisdom free?',
          a: 'The first week is free. After that, Pro costs $4.99 a month or $39.99 a year in the US store. It has no ads.',
        },
      ]}
      criteria={[
        'Whether it shows the Sanskrit, transliteration and word meanings',
        'Whose commentary it carries, if any',
        'Audio: recitation, chanting or narration',
        'Languages',
        "Offline use, ads, sign-in and Apple's privacy label",
        'Price in the US store, including subscriptions',
        'Widgets and daily reminders',
        'When it was last updated, and its ratings in the US and India',
      ]}
      related={[
        { href: '/blogs/best-bhagavad-gita-translation', kicker: 'Before you pick an app', title: 'Which Gita translation to read', body: 'Every app carries someone\'s translation. Here is whose reading each one follows.', location: 'gita_apps_related_translation' },
        { href: COMPARE_PAGES.widget.path, kicker: 'Compared', title: 'Gita widgets for iPhone', body: 'The apps that put a verse on your Lock Screen.', location: 'gita_apps_related_widget' },
        { href: COMPARE_PAGES.prayer.path, kicker: 'Compared', title: 'Hindu prayer and practice apps', body: 'Puja, japa, mantras and a daily routine.', location: 'gita_apps_related_prayer' },
        { href: COMPARE_PAGES.chalisa.path, kicker: 'Compared', title: 'Hanuman Chalisa apps', body: 'Audio, text and counting your paaths.', location: 'gita_apps_related_chalisa' },
        { href: '/gita', kicker: 'No app needed', title: 'Read all 700 verses here', body: 'Sanskrit, Hindi and English on this site, one page per verse, free.', location: 'gita_apps_related_reader' },
        { href: COMPARE_PAGES.hub.path, kicker: 'All comparisons', title: 'Every app guide in one place', location: 'gita_apps_related_hub' },
      ]}
      ldHeadline="The best Bhagavad Gita apps in 2026"
      ldDescription={DESCRIPTION}
    />
  )
}
