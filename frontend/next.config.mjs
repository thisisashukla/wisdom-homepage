/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },

  // /api/quote-card/[id] (share images): load satori and resvg from node_modules at
  // runtime instead of bundling them, and ship the files the route reads from disk
  // (resvg wasm, bundled fonts, quote JSON, Gita verse JSON) with the function.
  experimental: {
    serverComponentsExternalPackages: ['satori', '@resvg/resvg-wasm'],
    outputFileTracingIncludes: {
      '/api/quote-card/**': [
        './node_modules/@resvg/resvg-wasm/index_bg.wasm',
        './src/app/api/quote-card/fonts/**/*',
        './src/content/quotes/*.json',
        './src/content/gita/verses/*.json',
      ],
    },
  },
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
      // NOTE: www → apex is handled by the Vercel domain setting (apex is the
      // primary domain). Do NOT add a host redirect here: if the Vercel setting
      // ever points apex → www again, a code-level www → apex rule loops forever.
      // Legacy / mistyped URLs Google still crawls (GSC "Not found (404)").
      { source: '/hi', destination: '/hi/gita', permanent: true },
      { source: '/gita/topic', destination: '/gita', permanent: true },
      { source: '/hi/gita/topic', destination: '/hi/gita', permanent: true },
      { source: '/blogs/index.html', destination: '/blogs', permanent: true },
      { source: '/blog', destination: '/blogs', permanent: true },
      { source: '/blog/:slug', destination: '/blogs/:slug', permanent: true },
      { source: '/support.html', destination: '/support', permanent: true },
      // The 2.47 essay now lives on the verse page, which carries the shareable
      // quote card at the top. The old page file stays on disk but is unreachable.
      {
        source: '/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste',
        destination: '/gita/chapter/2/verse/47',
        statusCode: 301,
      },
    ]
  },

  // /support is the App Store support URL — served from public/support.html.
  async rewrites() {
    return [{ source: '/support', destination: '/support.html' }]
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
