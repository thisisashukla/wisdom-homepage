/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },

  // Chapters 1-5 used to redirect to /gita/chapter/N via a 301. The redirect
  // has been removed — the long-form article blogs at
  // /blogs/bhagwat-geeta-chapter-{1..5} are the canonical pages now.
  //
  // The headers() block below sends Cache-Control: no-store on every chapter
  // blog URL so the browser/CDN cannot lock in another permanent redirect or
  // stale response in the future. (It does NOT clear cached 301s already in a
  // browser — those must be cleared client-side via hard refresh or incognito.)
  async headers() {
    return [
      {
        source: '/blogs/bhagwat-geeta-chapter-:n*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        ],
      },
    ]
  },
}

export default nextConfig
