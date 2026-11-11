import type { ReactNode } from 'react'
import { Faq, LinkCards, PageHero, Section, type Crumb, type LinkCard } from '@/components/site'
import { APPS, CHECKED_LABEL, type AppKey } from '@/lib/app-compare/apps'
import { compareLd } from '@/lib/app-compare/pages'
import type { FaqItem } from '@/lib/seo'
import AppCompareTable, { type ColumnKey } from './AppCompareTable'
import AppEntry, { AppEntries } from './AppEntry'
import CompareMethod from './CompareMethod'
import CompareNote from './CompareNote'
import CompareShell from './CompareShell'

export type ReaderPick = {
  /** Who this is for, in their words ("You want a full commentary"). */
  reader: string
  /** The app it points to (jumps to its entry), or another page. */
  app?: AppKey
  href?: string
  title?: string
  why: string
}

export type EntryGroup = { id: string; title: string; intro?: ReactNode; items: { key: AppKey; bestFor?: string }[] }

export type ComparisonPageProps = {
  /** Prefix for data-mp-location and Section Viewed names, e.g. "gita_apps". */
  page: string
  pageName: string
  path: string
  crumbs: Crumb[]
  title: string
  sub: ReactNode
  facts: string[]
  /** Disclosure wording: "Gita apps", "prayer apps". */
  noteWhat: string
  /** false when Wisdom is not on the list (the disclosure changes). */
  oursListed?: boolean
  readersTitle?: string
  readersIntro?: ReactNode
  readers: ReaderPick[]
  tableTitle: string
  tableIntro?: ReactNode
  tableApps: AppKey[]
  columns: ColumnKey[]
  notes?: ColumnKey[]
  groups: EntryGroup[]
  /** Anything page-specific, placed after the entries (e.g. how to add a widget). */
  extra?: ReactNode
  faq: FaqItem[]
  criteria: string[]
  methodExtra?: ReactNode
  related: LinkCard[]
  ldHeadline: string
  ldDescription: string
}

/**
 * The standard comparison page: hero, disclosure, picks by reader, one table, one entry per
 * app (in groups), FAQ, method, related. Every comparison page is this component with props.
 */
export default function ComparisonPage(p: ComparisonPageProps) {
  const entryKeys = p.groups.flatMap((g) => g.items.map((i) => i.key))
  const ld = compareLd({ path: p.path, headline: p.ldHeadline, description: p.ldDescription, apps: entryKeys.map((k) => APPS[k]) })
  // Alternate grounds after the entry groups, whatever their count.
  const after = (n: number): 'band' | 'default' => ((p.groups.length + n) % 2 === 0 ? 'band' : 'default')
  const picks: LinkCard[] = p.readers.map((r) => {
    const app = r.app ? APPS[r.app] : undefined
    return {
      href: r.href ?? `#${r.app}`,
      kicker: r.reader,
      title: r.title ?? app?.name ?? '',
      body: r.why,
      location: `${p.page}_pick_${r.app ?? 'page'}`,
    }
  })

  return (
    <CompareShell pageName={p.pageName} ld={ld}>
      <PageHero
        crumbs={p.crumbs}
        eyebrow={`Compared · Last checked ${CHECKED_LABEL}`}
        title={p.title}
        sub={p.sub}
        facts={p.facts}
        actions={[
          { href: '#by-reader', label: 'Find the one for you', location: `${p.page}_hero_picks` },
          { href: '#compare', label: 'See the table', location: `${p.page}_hero_table` },
        ]}
      />

      <Section spacing="tight" width="narrow">
        <CompareNote count={entryKeys.length} what={p.noteWhat} oursListed={p.oursListed ?? true} />
      </Section>

      <Section id="by-reader" tone="band" track="picks" title={p.readersTitle ?? 'Start with what you want'} intro={p.readersIntro}>
        <LinkCards items={picks} columns={3} />
      </Section>

      <Section id="compare" track="table" title={p.tableTitle} intro={p.tableIntro}>
        <AppCompareTable
          apps={p.tableApps.map((k) => APPS[k])}
          columns={p.columns}
          notes={p.notes}
          caption={`Ratings are App Store stars and how many people gave them. "Not stated" means the developer does not say. Checked ${CHECKED_LABEL}.`}
        />
      </Section>

      {p.groups.map((g, i) => (
        <Section key={g.id} id={g.id} tone={i % 2 === 0 ? 'band' : 'default'} track={`entries_${g.id}`} title={g.title} intro={g.intro}>
          <AppEntries>
            {g.items.map((it) => (
              <AppEntry key={it.key} app={APPS[it.key]} bestFor={it.bestFor} page={p.page} />
            ))}
          </AppEntries>
        </Section>
      ))}

      {p.extra}

      <Section id="faq" track="faq" title="Questions people ask" width="narrow" tone={after(0)}>
        <Faq items={p.faq} />
      </Section>

      <Section id="method" track="method" title="How we compared" width="narrow" tone={after(1)}>
        <CompareMethod criteria={p.criteria} page={p.page} extra={p.methodExtra} oursListed={p.oursListed ?? true} />
      </Section>

      <Section track="related" title="Keep exploring" tone={after(0)}>
        <LinkCards items={p.related} columns={3} />
      </Section>
    </CompareShell>
  )
}
