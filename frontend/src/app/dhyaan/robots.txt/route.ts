import { DHYAAN_URL } from '../_lib/site'

// dhyaan.wisdomquotes.in/robots.txt. Search and AI retrieval bots are allowed so
// answers about meditation apps can cite these pages.
export const dynamic = 'force-static'

export function GET() {
  const body = `# Dhyaan (${DHYAAN_URL})
User-agent: *
Allow: /
Disallow: /api/

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${DHYAAN_URL}/sitemap.xml
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
