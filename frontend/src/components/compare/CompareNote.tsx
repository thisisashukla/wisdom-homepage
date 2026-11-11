import { CHECKED_LABEL } from '@/lib/app-compare/apps'
import './compare.css'

/** The disclosure every comparison page opens with. */
export default function CompareNote({
  count,
  what,
  oursListed = true,
}: {
  count: number
  what: string
  /** false when Wisdom is not on the list: the note then does not mention it. */
  oursListed?: boolean
}) {
  const lead = oursListed ? (
    <>
      <strong>We make Wisdom, one of the apps on this list.</strong> To keep that from tilting the page, we looked at
    </>
  ) : (
    <>We looked at</>
  )
  return (
    <div className="cx-note rv" role="note">
      <p>
        {lead} {count} {what} people actually find on the App Store, checked each fact on the app&apos;s own store page or
        website, and matched each app to the reader it suits best. We give no scores and take no money from any developer.
      </p>
      <p className="cx-checked">
        Last checked {CHECKED_LABEL}. <a href="#method" data-mp-location="compare_note_method">How we compared</a>
      </p>
    </div>
  )
}
