import { sectionSitemapResponse } from '@/lib/sectionSitemap'

export const dynamic = 'force-static'

export function GET() {
  return sectionSitemapResponse('verses-hi')
}
