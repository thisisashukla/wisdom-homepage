/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import indexJson from '@/content/gita/index.json'
import chaptersJson from '@/content/gita/chapters.json'

export const runtime = 'edge'

type Idx = { chapter: number; verse: number; speaker: string; essence: string; snippet: string }
type Ch = { number: number; enName: string; enTitle: string }

export async function GET(
  _req: Request,
  { params }: { params: { chapter: string; verse: string } },
) {
  const c = Number(params.chapter)
  const v = Number(params.verse)
  const entry = (indexJson as Idx[]).find((e) => e.chapter === c && e.verse === v)
  if (!entry) return new Response('Not found', { status: 404 })
  const ch = (chaptersJson as Ch[]).find((x) => x.number === c)

  // Prefer essence (one-line distilled) over snippet (truncated translation)
  const headline = (entry.essence || entry.snippet || '').slice(0, 160)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 88px',
          background:
            'radial-gradient(ellipse 120% 90% at 50% 0%, rgba(200,136,30,0.18), transparent 60%), linear-gradient(160deg, #1a0606, #120505 60%, #0f0404)',
          color: '#f5e8cc',
          fontFamily: 'serif',
        }}
      >
        {/* Top: chapter context */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            color: '#c8881e',
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          <span>Bhagavad Gita</span>
          {ch && (
            <>
              <span style={{ color: 'rgba(200,136,30,0.4)' }}>·</span>
              <span style={{ letterSpacing: 4, opacity: 0.85 }}>{ch.enName}</span>
            </>
          )}
        </div>

        {/* Verse identifier — the visual anchor */}
        <div
          style={{
            marginTop: 36,
            fontSize: 132,
            fontWeight: 700,
            color: '#f5c96a',
            lineHeight: 1,
            letterSpacing: -2,
            display: 'flex',
          }}
        >
          {c}.{v}
        </div>

        {/* Headline / essence */}
        <div
          style={{
            marginTop: 32,
            fontSize: headline.length > 90 ? 38 : 46,
            lineHeight: 1.35,
            color: '#fdf3dc',
            maxWidth: 980,
            fontStyle: 'italic',
            display: 'flex',
          }}
        >
          “{headline}”
        </div>

        {/* Footer row */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: '#c8881e',
          }}
        >
          <div style={{ fontSize: 22, opacity: 0.85, display: 'flex' }}>
            {entry.speaker || 'Bhagavad Gita'}
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 8,
              color: '#f5c96a',
              display: 'flex',
            }}
          >
            WISDOM
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
