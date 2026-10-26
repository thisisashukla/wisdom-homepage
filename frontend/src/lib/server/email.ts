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
  const first = name ? esc(name.trim().split(/\s+/)[0]) : null
  const today = days.find((d) => d.day === 1) ?? days[0]
  const rest = days.filter((d) => d !== today)
  const forYou = today?.forYou ?? null
  const title = esc(weekTitle || 'Seven days, one verse each morning')
  const label = (t: string, c = MUTED) =>
    `<div style="font:700 11px/16px ${SERIF};letter-spacing:2px;text-transform:uppercase;color:${c}">${t}</div>`

  const steps = [
    ['Open one day each morning', 'Before the phone pulls you elsewhere. A few quiet minutes is enough.'],
    ['Read the verse, then what it says to you', 'Each day is chosen for where you are right now, not for everyone.'],
    ['Carry one line into your day', 'Come back to it when the day gets loud. That is the whole practice.'],
  ]
  const stepRows = steps
    .map(
      ([h, p], i) => `
<tr>
  <td valign="top" width="44" style="padding:14px 0">
    <div style="width:30px;height:30px;border-radius:15px;background:#FBEBC8;color:${GOLD};font:700 14px/30px ${SERIF};text-align:center">${i + 1}</div>
  </td>
  <td valign="top" style="padding:14px 0">
    <div style="font:700 17px/24px ${SERIF};color:${INK}">${h}</div>
    <div style="font:15px/23px ${SERIF};color:${MUTED};margin-top:2px">${p}</div>
  </td>
</tr>`,
    )
    .join('')

  const restRows = rest
    .map((d) => {
      const story = d.beat === 'story'
      return `
<tr>
  <td valign="top" width="64" style="padding:12px 0;border-top:1px solid ${LINE};font:700 12px/22px ${SERIF};letter-spacing:1px;text-transform:uppercase;color:${story ? GOLD : MUTED}">Day ${d.day}</td>
  <td valign="top" style="padding:12px 0;border-top:1px solid ${LINE};font:${story ? 'italic ' : ''}16px/22px ${SERIF};color:${INK}">${story ? 'A story: ' : ''}${esc(lineOf(d))}</td>
</tr>`
    })
    .join('')

  const preheader = `Your seven days are ready. Here is how to make the most of them.`
  const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;background:#FFF8ED;padding:32px 16px">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto">

<tr><td style="padding:0 4px 8px;text-align:center">
  <img src="${SITE}/assets/new-light-logo.webp" width="48" height="48" alt="Wisdom" style="display:inline-block;border:0;border-radius:12px">
</td></tr>
<tr><td style="padding:8px 4px 28px;text-align:center">
  <div style="font:700 28px/36px ${SERIF};color:${INK}">${first ? `Welcome, ${first}` : 'Welcome to Wisdom'}</div>
  <div style="font:17px/26px ${SERIF};color:${MUTED};margin-top:10px">You have read Day 1. Six more days are waiting, chosen for where you are right now.</div>
  <div style="display:inline-block;margin-top:18px;padding:7px 16px;border-radius:999px;background:#FBEBC8;font:600 14px/20px ${SERIF};color:${INK}"><span style="color:${GOLD};font-weight:700;letter-spacing:1.5px;text-transform:uppercase;font-size:11px">Week 1</span>&nbsp;&nbsp;${title}</div>
</td></tr>

<tr><td style="background:#FFFDF7;border:1px solid ${LINE};border-radius:16px;padding:20px 24px 10px">
  ${label('How your week works', GOLD)}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:4px">${stepRows}</table>
</td></tr>

<tr><td style="padding:28px 0 0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="background:#FFFDF7;border:1px solid ${LINE};border-radius:16px;padding:24px">
  ${label('Where you began · Day 1', GOLD)}
  <div style="font:700 21px/30px ${SERIF};color:${INK};margin-top:12px">${esc(lineOf(today))}</div>
  ${today?.sanskrit ? `<div style="font:15px/26px 'Noto Serif Devanagari',${SERIF};color:${GOLD};margin-top:12px;white-space:pre-line">${esc(today.sanskrit)}</div>` : ''}
  ${today?.ref ? `<div style="font:13px/20px ${SERIF};color:${MUTED};margin-top:4px">${esc(today.ref)}</div>` : ''}
  ${forYou ? `<div style="font:italic 17px/26px ${SERIF};color:${INK};margin-top:18px;padding-top:18px;border-top:1px solid ${LINE}">${esc(forYou)}</div>` : ''}
</td></tr></table>
</td></tr>

<tr><td style="padding:28px 4px 0">
  ${label('What is coming · one each morning')}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:6px">${restRows}</table>
</td></tr>

<tr><td style="padding:28px 4px 0;text-align:center">
  <a href="${SITE}/start" style="display:inline-block;padding:14px 28px;border-radius:999px;background:#F4B740;color:#4B2138;font:600 16px/1 ${SERIF};text-decoration:none">Open your week</a>
  <div style="font:14px/22px ${SERIF};color:${MUTED};margin-top:14px">Tomorrow morning, Day 2 is yours.</div>
</td></tr>

<tr><td style="padding:32px 4px 0;border-top:0">
  <div style="font:13px/20px ${SERIF};color:${MUTED};text-align:center">You are getting this because you signed in to Wisdom to open your week. We only write about your plan.</div>
  <div style="font:13px/20px ${SERIF};color:${MUTED};text-align:center;margin-top:10px">In crisis? Call Tele-MANAS on 14416 (India, free, 24×7) or your local emergency number.</div>
</td></tr>
</table></body></html>`

  const text = [
    first ? `Welcome, ${first}` : 'Welcome to Wisdom',
    'You have read Day 1. Six more days are waiting, chosen for where you are right now.',
    weekTitle ? `Week 1: ${weekTitle}` : '',
    '',
    'HOW YOUR WEEK WORKS',
    ...steps.map(([h, p], i) => `${i + 1}. ${h}. ${p}`),
    '',
    'WHERE YOU BEGAN · DAY 1',
    lineOf(today),
    today?.sanskrit ?? '',
    today?.ref ?? '',
    forYou ?? '',
    '',
    'WHAT IS COMING · ONE EACH MORNING',
    ...rest.map((d) => `Day ${d.day}: ${d.beat === 'story' ? 'A story: ' : ''}${lineOf(d)}`),
    '',
    `Open your week: ${SITE}/start`,
    'Tomorrow morning, Day 2 is yours.',
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
      body: JSON.stringify({ from: process.env.PLAN_EMAIL_FROM, to: [to], subject: name ? `Welcome to Wisdom, ${name.trim().split(/\s+/)[0]}. Your week has begun` : 'Welcome to Wisdom. Your week has begun', html, text }),
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
