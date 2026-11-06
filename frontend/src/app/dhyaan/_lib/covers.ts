import fs from 'node:fs'
import path from 'node:path'

/**
 * Header images for /learn, keyed by slug (pillar slugs included). Generated with
 * Grok Imagine (via Grok Bot), 1280×720, stored as public/dhyaan-assets/blog/<slug>.webp.
 * Any slug whose file exists at build time uses it; the rest fall back to the SVG
 * artwork drawn by <Cover>. Drop a file in and rebuild, no code change needed.
 */
const DIR = path.join(process.cwd(), 'public', 'dhyaan-assets', 'blog')

function scan(): Record<string, string> {
  try {
    return Object.fromEntries(
      fs
        .readdirSync(DIR)
        .filter((f) => f.endsWith('.webp'))
        .map((f) => [f.replace(/\.webp$/, ''), `/dhyaan-assets/blog/${f}`]),
    )
  } catch {
    return {}
  }
}

export const COVERS: Record<string, string> = scan()
