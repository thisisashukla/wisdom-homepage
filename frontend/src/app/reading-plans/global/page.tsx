import ReadingPlansHub from '../ReadingPlansHub'
import { HUB_METADATA } from '../meta'

/**
 * /reading-plans with the global image set. Middleware rewrites non-India visitors here; the URL stays
 * /reading-plans. Must stay indexable: Googlebot crawls from the US and gets this variant. Direct hits on
 * /reading-plans/global are 308'd to /reading-plans by the middleware.
 */
export const metadata = HUB_METADATA

export default function ReadingPlansGlobal() {
  return <ReadingPlansHub variant="global" />
}
