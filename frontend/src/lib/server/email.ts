import type { FullDay } from '@/lib/server/startShared'

/**
 * Plan emails, through Resend's HTTP API (no SDK). Needs RESEND_API_KEY and
 * PLAN_EMAIL_FROM (an address on a domain verified in Resend, e.g.
 * "Wisdom <plans@wisdomquotes.in>"). Without them nothing is sent; callers are
 * told, so the page never claims an email that didn't go.
 *
 * The email brings the verse; the page brings the rest. Each morning's email
 * carries the day's verse (Sanskrit, line, reference) and one button to the
 * plan page, where "What it says", "For you", "Did this help?" and the week
 * are. Days open on their morning, so the email and the page always agree.
 *
 *  - welcomeEmail: once, at Google sign-in after Day 1 on /start. Day 1 to keep,
 *    Day 2 sealed ("arrives tomorrow around 7").
 *  - dayEmail: Days 2 to 7, one each morning around 7 in the person's time zone.
 *  - completeEmail: the morning after Day 7. The week in one list, and "Start a new week".
 * The last two go from /api/plan/cron (pg_cron in Supabase, every 30 minutes).
 *
 * With a saved plan (token) every link opens /plan?t=… on any device, and each
 * email carries a one-click unsubscribe (List-Unsubscribe + -Post, RFC 8058).
 * Without one (WEB_PLANS_SECRET unset) only the welcome email goes, linking /start.
 */
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://wisdomquotes.in'
const SERIF = "Georgia,'Times New Roman',serif"
const DEVA = "'Noto Serif Devanagari','Tiro Devanagari Sanskrit',Georgia,serif"
const INK = '#2E1824'
const MUTED = '#7A6470'
const GOLD = '#8F5E00'
const LINE = '#EFE3CC'
const CARD = '#FFFDF7'
const CHIP = '#FBEBC8'
const PLUM = '#3A1F2E'

export const BEAT_LABEL: Record<string, string> = { hook: 'Where you are', diagnose: "What's underneath", steady: 'What steadies you', act: 'What to do', story: 'A story' }

const esc = (s: string | null | undefined) =>
  (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function emailConfigured() {
  return !!(process.env.RESEND_API_KEY && process.env.PLAN_EMAIL_FROM)
}

const firstName = (name?: string | null) => (name ? name.trim().split(/\s+/)[0] || null : null)
const lineOf = (d: FullDay) => (d.beat === 'story' ? d.story?.title ?? d.line : d.line) ?? ''
const clip = (s: string, n = 60) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…`)
/** What a sealed day shows: its first six words, as on the week screen and the plan page. */
const glimpse = (s: string) => {
  const w = s.split(/\s+/)
  return w.length <= 6 ? s : `${w.slice(0, 6).join(' ')}…`
}

export const planUrl = (token: string, day?: number, extra = '') => `${SITE}/plan?t=${token}${day ? `&d=${day}` : ''}${extra}`
export const unsubUrl = (token: string) => `${SITE}/api/plan/unsubscribe?t=${token}`
const unsubPage = (token: string) => `${SITE}/plan/unsubscribe?t=${token}`

const label = (t: string, c = MUTED) =>
  `<div style="font:700 11px/16px ${SERIF};letter-spacing:2px;text-transform:uppercase;color:${c}">${t}</div>`

const button = (href: string, text: string) =>
  `<a href="${href}" style="display:inline-block;padding:15px 30px;border-radius:999px;background:#F4B740;color:#4B2138;font:600 17px/1 ${SERIF};text-decoration:none">${text}</a>`

function shell(preheader: string, body: string, foot: string) {
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;background:#FFF8ED;padding:32px 16px">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto">
<tr><td style="padding:0 4px 8px;text-align:center">
  <img src="${SITE}/assets/new-light-logo.webp" width="48" height="48" alt="Wisdom" style="display:inline-block;border:0;border-radius:12px">
</td></tr>
${body}
<tr><td style="padding:32px 4px 0">
  <div style="font:13px/20px ${SERIF};color:${MUTED};text-align:center">${foot}</div>
  <div style="font:13px/20px ${SERIF};color:${MUTED};text-align:center;margin-top:10px">In crisis? Call Tele-MANAS on 14416 (India, free, 24×7) or your local emergency number.</div>
</td></tr>
</table></body></html>`
}

/** The day's verse as the email shows it: Sanskrit, the line, the reference (or the story's title). The rest is on the page. */
function verseCard(d: FullDay) {
  if (d.beat === 'story') {
    return `<tr><td style="background:${PLUM};border-radius:16px;padding:26px 24px;text-align:center">
  ${label(`Day ${d.day} · A story`, '#F4B740')}
  <div style="font:italic 700 22px/31px ${SERIF};color:#FFF8ED;margin-top:14px">${esc(d.story?.title ?? d.line)}</div>
  ${d.ref ? `<div style="font:13px/20px ${SERIF};color:#CDB8C4;margin-top:12px">${esc(d.ref)}</div>` : ''}
</td></tr>`
  }
  return `<tr><td style="background:${CARD};border:1px solid ${LINE};border-radius:16px;padding:26px 24px;text-align:center">
  ${label(`Day ${d.day} · ${BEAT_LABEL[d.beat] ?? ''}`, GOLD)}
  ${d.sanskrit ? `<div lang="sa" style="font:18px/32px ${DEVA};color:${GOLD};margin-top:16px;white-space:pre-line">${esc(d.sanskrit)}</div>` : ''}
  <div style="font:700 22px/31px ${SERIF};color:${INK};margin-top:14px">${esc(d.line)}</div>
  ${d.ref ? `<div style="font:13px/20px ${SERIF};color:${MUTED};margin-top:8px">${esc(d.ref)}</div>` : ''}
</td></tr>`
}

function verseText(d: FullDay) {
  if (d.beat === 'story') return [`DAY ${d.day} · A STORY`, d.story?.title ?? d.line ?? '', d.ref ?? ''].filter(Boolean).join('\n')
  return [`DAY ${d.day} · ${(BEAT_LABEL[d.beat] ?? '').toUpperCase()}`, d.sanskrit ?? '', d.line ?? '', d.ref ?? ''].filter(Boolean).join('\n')
}

/** A sealed day: its label and a glimpse, and when it comes. */
function sealedRow(d: FullDay, when: string) {
  const story = d.beat === 'story'
  return `<tr><td style="padding:16px 18px;border:1px dashed ${LINE};border-radius:14px">
  <div style="font:700 12px/18px ${SERIF};letter-spacing:1.5px;text-transform:uppercase;color:${story ? GOLD : MUTED}">Day ${d.day} · ${esc(BEAT_LABEL[d.beat] ?? '')}</div>
  <div style="font:italic 16px/24px ${SERIF};color:${MUTED};margin-top:4px">${esc(glimpse(lineOf(d)))}</div>
  <div style="font:13px/20px ${SERIF};color:${MUTED};margin-top:6px">${when}</div>
</td></tr>`
}

const footText = (token: string | null) =>
  token
    ? `One verse each morning for the 7 days of the plan you made on Wisdom, then one note when the week is done. <a href="${unsubPage(token)}" style="color:${MUTED}">Stop these emails</a>`
    : 'You are getting this because you signed in to Wisdom to open your week. We only write about your plan.'

/** At sign-in: Day 1 to keep, Day 2 sealed. */
export function welcomeEmail(days: FullDay[], weekTitle: string | null, name: string | null | undefined, token: string | null) {
  const first = firstName(name)
  const today = days.find((d) => d.day === 1) ?? days[0]
  const next = days.find((d) => d.day === 2)
  const title = esc(weekTitle || 'Seven days, one verse each morning')
  const daily = !!token
  const open = token ? planUrl(token, 1, '&src=email_welcome') : `${SITE}/start`

  const body = `
<tr><td style="padding:8px 4px 28px;text-align:center">
  <div style="font:700 28px/36px ${SERIF};color:${INK}">${first ? `Welcome, ${esc(first)}` : 'Welcome to Wisdom'}</div>
  <div style="font:17px/26px ${SERIF};color:${MUTED};margin-top:10px">${daily ? 'Your week has begun. Here is the verse you opened today, to keep.' : 'You have read Day 1. Six more days are waiting, chosen for where you are right now.'}</div>
  <div style="display:inline-block;margin-top:18px;padding:7px 16px;border-radius:999px;background:${CHIP};font:600 14px/20px ${SERIF};color:${INK}"><span style="color:${GOLD};font-weight:700;letter-spacing:1.5px;text-transform:uppercase;font-size:11px">Week 1</span>&nbsp;&nbsp;${title}</div>
</td></tr>
<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${verseCard(today)}</table></td></tr>
<tr><td style="padding:24px 4px 0;text-align:center">
  ${button(open, daily ? 'Open my plan' : 'Open your week')}
  <div style="font:14px/22px ${SERIF};color:${MUTED};margin-top:12px">${daily ? 'What it says, what it says to you, and your week are on your plan page. It opens on any phone or computer.' : 'Your week is saved in the browser where you made it.'}</div>
</td></tr>
${daily && next ? `<tr><td style="padding:28px 0 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${sealedRow(next, 'Arrives here tomorrow morning, around 7.')}</table></td></tr>` : ''}`

  const html = shell(daily ? 'Your week has begun. Day 2 arrives tomorrow morning.' : 'Your seven days are ready.', body, footText(token))
  const text = [
    first ? `Welcome, ${first}` : 'Welcome to Wisdom',
    daily ? 'Your week has begun. Here is the verse you opened today, to keep.' : 'You have read Day 1. Six more days are waiting.',
    weekTitle ? `Week 1: ${weekTitle}` : '',
    '',
    verseText(today),
    '',
    `Open my plan: ${open}`,
    daily && next ? `\nDay 2 · ${BEAT_LABEL[next.beat] ?? ''}: arrives here tomorrow morning, around 7.` : '',
    token ? `\nStop these emails: ${unsubPage(token)}` : '',
  ].join('\n').replace(/\n{3,}/g, '\n\n')
  const subject = first ? `Welcome, ${first}. Your week has begun` : 'Welcome to Wisdom. Your week has begun'
  return { subject, html, text }
}

/** Days 2 to 7: the verse, and the button to what it says to them. */
export function dayEmail(day: number, days: FullDay[], weekTitle: string | null, name: string | null | undefined, token: string) {
  const d = days.find((x) => x.day === day)
  if (!d) return null
  const first = firstName(name)
  const story = d.beat === 'story'
  const next = days.find((x) => x.day === day + 1)
  const href = planUrl(token, day, '&src=email')

  const body = `
<tr><td style="padding:8px 4px 24px;text-align:center">
  <div style="font:700 13px/20px ${SERIF};letter-spacing:2px;text-transform:uppercase;color:${GOLD}">Day ${day} of 7${weekTitle ? ` · ${esc(weekTitle)}` : ''}</div>
  <div style="font:17px/26px ${SERIF};color:${MUTED};margin-top:10px">${first ? `Good morning, ${esc(first)}. ` : 'Good morning. '}${story ? 'Today is a story.' : 'Today’s verse:'}</div>
</td></tr>
<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${verseCard(d)}</table></td></tr>
<tr><td style="padding:24px 4px 0;text-align:center">
  ${button(href, story ? 'Read today’s story' : 'Read what it says to you')}
  <div style="font:14px/22px ${SERIF};color:${MUTED};margin-top:12px">${story ? 'The story and what it says to you are on your plan page.' : 'What it means, and what it says to where you are right now, are on your plan page.'}</div>
</td></tr>
<tr><td style="padding:28px 0 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${
    next
      ? sealedRow(next, 'Arrives here tomorrow morning, around 7.')
      : `<tr><td style="padding:16px 18px;border:1px dashed ${LINE};border-radius:14px;font:15px/22px ${SERIF};color:${MUTED};text-align:center">This is the last day of Week 1. Tomorrow morning: your seven days, together.</td></tr>`
  }</table></td></tr>`

  const html = shell(story ? `A story: ${clip(lineOf(d), 80)}` : clip(lineOf(d), 90), body, footText(token))
  const text = [
    `Day ${day} of 7${weekTitle ? ` · ${weekTitle}` : ''}`,
    '',
    verseText(d),
    '',
    `${story ? 'Read today’s story' : 'Read what it says to you'}: ${href}`,
    '',
    next ? `Tomorrow, Day ${day + 1} · ${BEAT_LABEL[next.beat] ?? ''}: ${glimpse(lineOf(next))}` : 'This is the last day of Week 1.',
    '',
    `Stop these emails: ${unsubPage(token)}`,
  ].join('\n')
  const subject = story ? `Day ${day}: a story. ${clip(lineOf(d), 50)}` : `Day ${day}: ${clip(lineOf(d), 60)}`
  return { subject, html, text }
}

/** The morning after Day 7: the whole week in one list, and the next step. */
export function completeEmail(days: FullDay[], weekTitle: string | null, name: string | null | undefined, token: string) {
  const first = firstName(name)
  const sorted = [...days].sort((a, b) => a.day - b.day)
  const rows = sorted
    .map((d) => {
      const story = d.beat === 'story'
      return `<tr>
  <td valign="top" width="64" style="padding:12px 0;border-top:1px solid ${LINE};font:700 12px/22px ${SERIF};letter-spacing:1px;text-transform:uppercase;color:${story ? GOLD : MUTED}">Day ${d.day}</td>
  <td valign="top" style="padding:12px 0;border-top:1px solid ${LINE};font:${story ? 'italic ' : ''}16px/22px ${SERIF};color:${INK}"><a href="${planUrl(token, d.day, '&src=email_complete')}" style="color:${INK};text-decoration:none">${story ? 'A story: ' : ''}${esc(lineOf(d))}</a></td>
</tr>`
    })
    .join('')
  const next = `${SITE}/start?new=1&ref=email_week_complete`

  const body = `
<tr><td style="padding:8px 4px 24px;text-align:center">
  <div style="font:700 28px/36px ${SERIF};color:${INK}">${first ? `${esc(first)}, your week is complete` : 'Your week is complete'}</div>
  <div style="font:17px/26px ${SERIF};color:${MUTED};margin-top:10px">Seven mornings${weekTitle ? ` with <i>${esc(weekTitle.toLowerCase())}</i>` : ''}. Here they are together. Which one stayed with you?</div>
</td></tr>
<tr><td style="padding:0 4px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
<tr><td style="padding:28px 4px 0;text-align:center">
  ${button(next, 'Start a new week')}
  <div style="font:14px/22px ${SERIF};color:${MUTED};margin-top:12px">A few questions about where you are now, and a new week is chosen for it.</div>
  <div style="margin-top:14px"><a href="${planUrl(token, undefined, '&src=email_complete')}" style="font:15px/22px ${SERIF};color:${GOLD}">Revisit your seven days</a></div>
</td></tr>`

  const html = shell('Seven mornings, together. And what comes next.', body, `This was the last email for this plan. <a href="${unsubPage(token)}" style="color:${MUTED}">Stop emails</a>`)
  const text = [
    first ? `${first}, your week is complete` : 'Your week is complete',
    weekTitle ? `Week 1: ${weekTitle}` : '',
    '',
    ...sorted.map((d) => `Day ${d.day}: ${d.beat === 'story' ? 'A story: ' : ''}${lineOf(d)}`),
    '',
    `Start a new week: ${next}`,
    `Revisit your seven days: ${planUrl(token)}`,
  ].join('\n')
  return { subject: first ? `${first}, your week is complete` : 'Your week is complete', html, text }
}

/** Resolves true only when Resend accepted it. */
export async function sendEmail(to: string, msg: { subject: string; html: string; text: string }, token?: string | null): Promise<boolean> {
  if (!emailConfigured()) return false
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 8000)
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.PLAN_EMAIL_FROM,
        to: [to],
        subject: msg.subject,
        html: msg.html,
        text: msg.text,
        ...(token ? { headers: { 'List-Unsubscribe': `<${unsubUrl(token)}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' } } : {}),
      }),
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
