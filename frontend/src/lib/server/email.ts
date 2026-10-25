import type { FullDay } from '@/lib/server/startShared'

/**
 * The free week, by email. Sent once the person signs in with Google after
 * Day 1, through Resend's HTTP API (no SDK). Needs RESEND_API_KEY and
 * PLAN_EMAIL_FROM (an address on a domain verified in Resend, e.g.
 * "Wisdom <plans@wisdomquotes.in>"). Without them nothing is sent and the
 * week only opens in the browser; the caller is told so it never claims
 * an email that didn't go.
 *
 * Layout, in order of weight: the week's name; today (Day 1) as the one
 * hero, with its line large, the Sanskrit under it and one line for them;
 * then the rest of the week as a quiet list, one line each (what the day
 * says), so it reads as "today, then what's coming", not seven equal cards.
 */
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://wisdomquotes.in'
const SERIF = "Georgia,'Times New Roman',serif"
const INK = '#2E1824'
const MUTED = '#7A6470'
const GOLD = '#8F5E00'
const LINE = '#EFE3CC'

const esc = (s: string | null | undefined) =>
  (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function emailConfigured() {
  return !!(process.env.RESEND_API_KEY && process.env.PLAN_EMAIL_FROM)
}

const lineOf = (d: FullDay) => (d.beat === 'story' ? d.story?.title ?? d.line : d.line) ?? ''

export function weekEmail(days: FullDay[], weekTitle: string | null, name?: string | null) {
  const first = name ? esc(name.split(' ')[0]) : null
  const today = days.find((d) => d.day === 1) ?? days[0]
  const rest = days.filter((d) => d !== today)
  const forYou = today?.forYou ?? null

  const restRows = rest
    .map((d) => {
      const story = d.beat === 'story'
      return `
<tr>
  <td valign="top" width="64" style="padding:14px 0;border-top:1px solid ${LINE};font:700 12px/22px ${SERIF};letter-spacing:1px;text-transform:uppercase;color:${story ? GOLD : MUTED}">Day ${d.day}</td>
  <td valign="top" style="padding:14px 0;border-top:1px solid ${LINE};font:${story ? 'italic ' : ''}16px/22px ${SERIF};color:${INK}">${story ? 'A story: ' : ''}${esc(lineOf(d))}</td>
</tr>`
    })
    .join('')

  const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#FFF8ED;padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto">
<tr><td style="padding:0 4px 24px;font-family:${SERIF}">
  <div style="font:15px/22px ${SERIF};color:${MUTED}">${first ? `${first}, your week` : 'Your week'}</div>
  <div style="font:700 26px/34px ${SERIF};color:${INK};margin-top:4px">${esc(weekTitle || 'Seven days, one verse each morning')}</div>
</td></tr>

<tr><td style="background:#FFFDF7;border:1px solid ${LINE};border-radius:16px;padding:28px 24px">
  <div style="font:700 11px/16px ${SERIF};letter-spacing:2px;text-transform:uppercase;color:${GOLD}">Today · Day 1</div>
  <div style="font:700 22px/31px ${SERIF};color:${INK};margin-top:12px">${esc(lineOf(today))}</div>
  ${today?.sanskrit ? `<div style="font:15px/26px 'Noto Serif Devanagari',${SERIF};color:${GOLD};margin-top:12px;white-space:pre-line">${esc(today.sanskrit)}</div>` : ''}
  ${today?.ref ? `<div style="font:13px/20px ${SERIF};color:${MUTED};margin-top:4px">${esc(today.ref)}</div>` : ''}
  ${forYou ? `<div style="font:italic 17px/26px ${SERIF};color:${INK};margin-top:20px;padding-top:20px;border-top:1px solid ${LINE}">${esc(forYou)}</div>` : ''}
</td></tr>

<tr><td style="padding:32px 4px 0">
  <div style="font:700 11px/16px ${SERIF};letter-spacing:2px;text-transform:uppercase;color:${MUTED};padding-bottom:6px">The rest of your week · one each morning</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${restRows}</table>
</td></tr>

<tr><td style="padding:28px 4px 0">
  <a href="${SITE}/start" style="display:inline-block;padding:13px 24px;border-radius:999px;background:#F4B740;color:#4B2138;font:600 16px/1 ${SERIF};text-decoration:none">Open your week</a>
  <div style="font:13px/20px ${SERIF};color:${MUTED};margin-top:24px">In crisis? Call Tele-MANAS on 14416 (India, free, 24×7) or your local emergency number.</div>
</td></tr>
</table></body></html>`

  const text = [
    `${first ? `${first}, your week` : 'Your week'}: ${weekTitle ?? ''}`.trim(),
    '',
    'TODAY · DAY 1',
    lineOf(today),
    today?.sanskrit ?? '',
    today?.ref ?? '',
    forYou ?? '',
    '',
    'THE REST OF YOUR WEEK · ONE EACH MORNING',
    ...rest.map((d) => `Day ${d.day}: ${d.beat === 'story' ? 'A story: ' : ''}${lineOf(d)}`),
    '',
    `Open your week: ${SITE}/start`,
  ]
    .filter((l, i, a) => l !== '' || a[i - 1] !== '')
    .join('\n')
  return { html, text }
}

/** Sends the week. Resolves true only when Resend accepted it. */
export async function sendWeekEmail(to: string, days: FullDay[], weekTitle: string | null, name?: string | null): Promise<boolean> {
  if (!emailConfigured()) return false
  const { html, text } = weekEmail(days, weekTitle, name)
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 8000)
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.PLAN_EMAIL_FROM, to: [to], subject: weekTitle ? `Your week: ${weekTitle}` : 'Your seven days', html, text }),
      signal: ctrl.signal,
    })
    if (!res.ok) console.error('[email] resend', res.status, await res.text().catch(() => ''))
    return res.ok
  } catch (e) {
    console.error('[email]', e)
    return false
  } finally {
    clearTimeout(t)
  }
}
