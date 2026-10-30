import type { Metadata } from 'next'
import ToolPage from '@/components/funnels/ram-shalaka/ToolPage'
import { toolMetadata } from '@/lib/funnels/ram-shalaka/seo'

export const metadata: Metadata = toolMetadata('hi')

export default function Page() {
  return <ToolPage locale="hi" />
}
