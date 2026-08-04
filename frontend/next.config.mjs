/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // Consistent no-trailing-slash policy across the site (matches how internal
  // links + sitemap URLs are written).  Prevents 308 redirects on links that
  // accidentally include the trailing slash.
  trailingSlash: false,

  // Chapters 1-5 used to redirect to /gita/chapter/N via a 301. The redirect
  // has been removed — the long-form article blogs at
  // /blogs/bhagwat-geeta-chapter-{1..5} are the canonical pages now.
  async redirects() {
    return [
      // Google has indexed the old static-export .html URL; 301 to the clean canonical.
      {
        source: '/blogs/bhagwat-geeta-chapter-1.html',
        destination: '/blogs/bhagwat-geeta-chapter-1',
        permanent: true,
      },
      // Canonicalise the apex `www` host and any accidental trailing slash on /blogs/
      {
        source: '/blogs/',
        destination: '/blogs',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        // Chapter blog pages — allow the CDN to hold them briefly but keep
        // them revalidatable so content edits appear within the hour.
        // Previously `no-store` — that disabled the CDN entirely and was overkill.
        source: '/blogs/bhagwat-geeta-chapter-:n*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        // Long-cache static assets (webps, fonts) so mobile users don't
        // re-download 200-500KB chapter illustrations on every visit.
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
}

export default nextConfig
