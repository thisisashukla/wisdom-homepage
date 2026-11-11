import type { Metadata } from 'next'
import { COMPARE_PAGES, CompareMethod, CompareNote, CompareShell } from '@/components/compare'
import { LinkCards, PageHero, Section } from '@/components/site'
import { APPS, CHECKED_ISO, CHECKED_LABEL } from '@/lib/app-compare/apps'
import { AUTHOR_LD, PUBLISHER_LD, abs, pageMeta } from '@/lib/seo'

const PATH = COMPARE_PAGES.hub.path
const TITLE = 'Bhagavad Gita and Hindu Practice Apps Compared (2026)'
const DESCRIPTION =
  'Four guides to the apps people use for the Bhagavad Gita, daily Hindu prayer, the Hanuman Chalisa and a Gita verse on the iPhone Lock Screen. 38 apps, checked 11 Nov 2026.'
const COUNT = Object.keys(APPS).length

export const metadata: Metadata = pageMeta({ path: PATH, title: TITLE, description: DESCRIPTION, type: 'website' })

const GUIDES = [
  { k: COMPARE_PAGES.gita, kicker: '15 apps', body: 'For study with a commentary, for chanting, for Hindi and other languages, or for a verse a day.', loc: 'gita' },
  { k: COMPARE_PAGES.prayer, kicker: '15 apps', body: 'Puja and japa at home, a short daily routine, stotras to chant, and meditation from Hindu teachers.', loc: 'prayer' },
  { k: COMPARE_PAGES.chalisa, kicker: '11 apps, plus Android', body: 'Audio with synced text, your own script, offline play, alarms and paath counters.', loc: 'chalisa' },
  { k: COMPARE_PAGES.widget, kicker: '8 apps', body: 'The apps that put a verse on your Lock Screen or Home Screen, and how to add one.', loc: 'widget' },
]

export default function BestAppsHubPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TITLE,
    description: DESCRIPTION,
    url: abs(PATH),
    dateModified: CHECKED_ISO,
    inLanguage: 'en',
    author: AUTHOR_LD,
    publisher: PUBLISHER_LD,
    hasPart: [...GUIDES.map((g) => ({ '@type': 'Article', name: g.k.title, url: abs(g.k.path) })), { '@type': 'Article', name: 'Best Bhagavad Gita translation', url: abs('/blogs/best-bhagavad-gita-translation') }],
  }
  return (
    <CompareShell pageName="Best Apps Hub" ld={ld}>
      <PageHero
        crumbs={[{ label: 'App comparisons', href: PATH }]}
        eyebrow={`Compared · Last checked ${CHECKED_LABEL}`}
        title="Gita and Hindu practice apps, compared"
        sub="Four guides to the apps people use for the Bhagavad Gita, daily prayer, the Hanuman Chalisa and a verse on the Lock Screen. Each one starts from what you want, and tells you what is worth knowing before you install."
        facts={[`${COUNT} apps checked`, 'iPhone and Android', 'We make one of them']}
        actions={[
          { href: '#guides', label: 'See the guides', location: 'best_apps_hero_guides' },
          { href: '#quick-picks', label: 'Quick picks', location: 'best_apps_hero_picks' },
        ]}
      />

      <Section spacing="tight" width="narrow">
        <CompareNote count={COUNT} what="apps" />
      </Section>

      <Section id="guides" tone="band" track="guides" title="The guides" intro="Pick the kind of app you are looking for.">
        <LinkCards
          items={[
            ...GUIDES.map((g) => ({ href: g.k.path, kicker: g.kicker, title: g.k.title, body: g.body, location: `best_apps_guide_${g.loc}` })),
            {
              href: '/blogs/best-bhagavad-gita-translation',
              kicker: 'Before you pick a Gita app',
              title: 'Which Gita translation to read',
              body: "Every app carries someone's translation and commentary. This guide shows whose reading each one follows.",
              location: 'best_apps_guide_translation',
            },
          ]}
        />
      </Section>

      <Section id="quick-picks" track="quick_picks" title="Quick picks" intro="The short answer for the most common wishes. Each links to the full entry, with its limits.">
        <LinkCards
          columns={3}
          items={[
            { href: `${COMPARE_PAGES.gita.path}#songofgod`, kicker: 'A full Gita commentary, free', title: 'The Song of God', body: 'Five layers per verse, recited aloud, offline, six languages.', location: 'best_apps_pick_songofgod' },
            { href: `${COMPARE_PAGES.gita.path}#gitavardhan`, kicker: 'The Gita in your own language', title: 'GitaVardhan', body: 'Thirteen languages with chanting. No account, no ads.', location: 'best_apps_pick_gitavardhan' },
            { href: `${COMPARE_PAGES.prayer.path}#sadhana`, kicker: 'Guided puja and japa', title: 'Sadhana', body: 'Japa, puja, yajna and abhishekam for your deity. Free.', location: 'best_apps_pick_sadhana' },
            { href: `${COMPARE_PAGES.prayer.path}#diya`, kicker: 'A daily routine, like Hallow', title: 'Diya or Karana', body: 'Diya for widgets and audio prayers; Karana for a mostly free practice.', location: 'best_apps_pick_diya' },
            { href: `${COMPARE_PAGES.chalisa.path}#mychalisa`, kicker: 'The Hanuman Chalisa', title: 'My Chalisa', body: 'Audio with lyrics, offline play and Home Screen widgets.', location: 'best_apps_pick_mychalisa' },
            { href: `${COMPARE_PAGES.gita.path}#wisdom`, kicker: 'A verse for what you are going through', title: 'Wisdom (ours)', body: 'One verse a day for a week, read aloud. iPhone only, English only.', location: 'best_apps_pick_wisdom' },
          ]}
        />
      </Section>

      <Section id="method" tone="band" track="method" title="How we compared" width="narrow">
        <CompareMethod
          page="best_apps"
          criteria={[
            'What the app is for, and the reader it suits best',
            'What it shows: Sanskrit, translation, commentary, prayers',
            'Audio, languages, offline use and widgets',
            "Price, ads and Apple's privacy label",
            'When it was last updated, and its ratings in the US and India',
          ]}
        />
      </Section>
    </CompareShell>
  )
}
