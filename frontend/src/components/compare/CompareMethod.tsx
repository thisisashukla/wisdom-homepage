import { CHECKED_LABEL } from '@/lib/app-compare/apps'
import './compare.css'

const MAIL = 'work.ankurshukla@gmail.com'

/**
 * "How we compared": the same method on every comparison page, plus the criteria that
 * matter for this page's readers.
 */
export default function CompareMethod({
  criteria,
  page,
  extra,
  oursListed = true,
}: {
  criteria: string[]
  page: string
  extra?: React.ReactNode
  oursListed?: boolean
}) {
  return (
    <div className="sx-prose cx-method rv">
      <h3 className="sx-h3">How apps were chosen</h3>
      <p>
        We searched the US and India App Stores for the words people use (for example &quot;bhagavad gita&quot;, &quot;hindu
        prayer&quot; and &quot;hanuman chalisa&quot;), sorted the results by how many ratings each app has, and kept the ones
        with real use or a feature nobody else offers. Apps that have not been updated in over a year stay on the list with a
        note, because many people still use them.
      </p>
      <h3 className="sx-h3">What we looked at</h3>
      <ul className="cx-plain">
        {criteria.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <h3 className="sx-h3">What we checked, and where</h3>
      <p>
        Price, in-app purchases, last update, languages and Apple&apos;s privacy label come from each app&apos;s live App Store
        page (US store). Ratings come from Apple&apos;s own lookup service for the US and India stores. Android availability
        comes from Google Play. A feature is marked only if the developer states it on the store page or their website. If
        nobody says, we write &quot;not stated&quot;. We did not install every app, so a feature may exist without being
        listed.
      </p>
      <p>
        There are no scores here. Star ratings are what people gave on the App Store, shown with how many people gave them.
        {oursListed && ' Our own app, Wisdom, is held to the same rules, and its weak points are in its entry.'}
      </p>
      {extra}
      <h3 className="sx-h3">Updates and corrections</h3>
      <p>
        Last checked {CHECKED_LABEL}. We check again every three months and whenever a developer writes in. If you make one
        of these apps and something here is wrong or out of date, email{' '}
        <a href={`mailto:${MAIL}?subject=App%20comparison%20correction`} data-mp-location={`${page}_method_correction`}>
          {MAIL}
        </a>{' '}
        and we will fix it.
      </p>
    </div>
  )
}
