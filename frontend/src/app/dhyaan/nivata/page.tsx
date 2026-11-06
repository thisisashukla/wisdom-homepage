import { BlogTracker } from '@/components/BlogTracker'
import JsonLd from '../_components/JsonLd'
import { DHYAAN_URL, pageMeta } from '../_lib/site'
import NivataTest from './NivataTest'

export const metadata = pageMeta({
  title: 'The 60-second stillness test (Nivāta)',
  description:
    'Can you be a lamp in a windless place for 60 seconds? Hold your phone in your palms, close your eyes, and see how still you really were. Free, in your browser, nothing leaves your phone.',
  path: '/nivata',
})

export default function NivataPage() {
  return (
    <>
      <BlogTracker pageName="Dhyaan Nivata Test" />
      <JsonLd
        data={{
          '@type': 'WebApplication',
          name: 'Nivāta: the 60-second stillness test',
          url: `${DHYAAN_URL}/nivata`,
          applicationCategory: 'HealthApplication',
          operatingSystem: 'iOS Safari, Android Chrome',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          isPartOf: { '@id': `${DHYAAN_URL}/#website` },
        }}
      />
      <div className="dh-wrap">
        <NivataTest />
      </div>
    </>
  )
}
