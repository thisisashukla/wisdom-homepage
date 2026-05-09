/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },

  // 301 redirects from legacy hand-coded chapter blog URLs to the new
  // dynamic /gita/chapter/N pages. Preserves SEO equity from the existing pages.
  async redirects() {
    const chapters = [1, 2, 3, 4, 5]
    return chapters.map((n) => ({
      source: `/blogs/bhagwat-geeta-chapter-${n}`,
      destination: `/gita/chapter/${n}`,
      permanent: true,
    }))
  },
}

export default nextConfig
