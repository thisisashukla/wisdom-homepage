import type { FullDay } from '@/lib/server/startShared'

/**
 * Plan emails, through Resend's HTTP API (no SDK). Needs RESEND_API_KEY and
 * PLAN_EMAIL_FROM (an address on a domain verified in Resend, e.g.
 * "Wisdom <plans@wisdomquotes.in>"). Without them nothing is sent; callers are
 * told, so the page never claims an email that didn't go.
 *
 *  - welcomeEmail: sent once, at Google sign-in after Day 1 on /start. Day 1 in
 *    full, then what is coming, then "Day 2 arrives tomorrow morning".
 *  - dayEmail: Days 2 to 7, one each morning around 7 in the person's time zone
 *    (/api/plan/cron, run by pg_cron in Supabase every 30 minutes).
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

export const planUrl = (token: string, day?: number, extra = '') => `${SITE}/plan?t=${token}${day ? `&d=${day}` : ''}${extra}`
export const unsubUrl = (token: string) => `${SITE}/api/plan/unsubscribe?t=${token}`
const unsubPage = (token: string) => `${SITE}/plan/unsubscribe?t=${token}`

const label = (t: string, c = MUTED) =>
  `<div style="font:700 11px/16px ${SERIF};letter-spacing:2px;text-transform:uppercase;color:${c}">${t}</div>`

const button = (href: string, text: string) =>
  `<a href="${href}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:#F4B740;color:#4B2138;font:600 16px/1 ${SERIF};text-decoration:none">${text}</a>`

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

/** One day in full: the verse (Sanskrit, line, reference), what it says and what it says to them; or the story. */
function dayCard(d: FullDay) {
  if (d.beat === 'story') {
    const title = d.story?.title ?? d.line ?? ''
    const lesson = d.forYou || d.story?.lesson
    return `<tr><td style="background:${PLUM};border-radius:16px;padding:24px">
  ${label(`Day ${d.day} · A story`, '#F4B740')}
  <div style="font:italic 700 21px/30px ${SERIF};color:#FFF8ED;margin-top:12px">${esc(title)}</div>
  ${d.story?.summary ? `<div style="font:16px/26px ${SERIF};color:#F3E6D8;margin-top:14px">${esc(d.story.summary)}</div>` : ''}
  ${lesson ? `<div style="margin-top:18px;padding-top:16px;border-top:1px solid rgba(244,183,64,.35)">${label('For you', '#F4B740')}<div style="font:italic 17px/26px ${SERIF};color:#FFF8ED;margin-top:6px">${esc(lesson)}</div></div>` : ''}
  ${d.ref ? `<div style="font:13px/20px ${SERIF};color:#CDB8C4;margin-top:14px">${esc(d.ref)}</div>` : ''}
</td></tr>`
  }
  return `<tr><td style="background:${CARD};border:1px solid ${LINE};border-radius:16px;padding:24px">
  ${label(`Day ${d.day} · ${BEAT_LABEL[d.beat] ?? ''}`, GOLD)}
  ${d.sanskrit ? `<div lang="sa" style="font:17px/30px ${DEVA};color:${GOLD};margin-top:14px;white-space:pre-line">${esc(d.sanskrit)}</div>` : ''}
  <div style="font:700 21px/30px ${SERIF};color:${INK};margin-top:12px">${esc(d.line)}</div>
  ${d.ref ? `<div style="font:13px/20px ${SERIF};color:${MUTED};margin-top:4px">${esc(d.ref)}</div>` : ''}
  ${d.meaning ? `<div style="margin-top:18px">${label('What it says')}<div style="font:16px/26px ${SERIF};color:${INK};margin-top:6px">${esc(d.meaning)}</div></div>` : ''}
  ${d.forYou ? `<div style="margin-top:18px;padding-top:16px;border-top:1px solid ${LINE}">${label('For you', GOLD)}<div style="font:italic 17px/26px ${SERIF};color:${INK};margin-top:6px">${esc(d.forYou)}</div></div>` : ''}
</td></tr>`
}

function dayText(d: FullDay) {
  if (d.beat === 'story') {
    return [`DAY ${d.day} · A STORY`, d.story?.title ?? d.line ?? '', d.story?.summary ?? '', d.forYou || d.story?.lesson || '', d.ref ?? ''].filter(Boolean).join('\n')
  }
  return [
    `DAY ${d.day} · ${(BEAT_LABEL[d.beat] ?? '').toUpperCase()}`,
    d.sanskrit ?? '',
    d.line ?? '',
    d.ref ?? '',
    d.meaning ? `What it says: ${d.meaning}` : '',
    d.forYou ? `For you: ${d.forYou}` : '',
  ].filter(Boolean).join('\n')
}

const footText = (token: string | null) =>
  token
    ? `You are getting one verse each morning for the 7 days of the plan you made on Wisdom. It stops by itself after Day 7. <a href="${unsubPage(token)}" style="color:${MUTED}">Stop these emails</a>`
    : 'You are getting this because you signed in to Wisdom to open your week. We only write about your plan.'

/** At sign-in: Day 1 in full, what is coming, and when Day 2 arrives. */
export function welcomeEmail(days: FullDay[], weekTitle: string | null, name: string | null | undefined, token: string | null) {
  const first = firstName(name)
  const today = days.find((d) => d.day === 1) ?? days[0]
  const rest = days.filter((d) => d !== today)
  const title = esc(weekTitle || 'Seven days, one verse each morning')
  const daily = !!token
  const open = token ? planUrl(token, 1) : `${SITE}/start`

  const restRows = rest
    .map((d) => {
      const story = d.beat === 'story'
      return `<tr>
  <td valign="top" width="64" style="padding:12px 0;border-top:1px solid ${LINE};font:700 12px/22px ${SERIF};letter-spacing:1px;text-transform:uppercase;color:${story ? GOLD : MUTED}">Day ${d.day}</td>
  <td valign="top" style="padding:12px 0;border-top:1px solid ${LINE};font:${story ? 'italic ' : ''}16px/22px ${SERIF};color:${INK}">${story ? 'A story: ' : ''}${esc(lineOf(d))}</td>
</tr>`
    })
    .join('')

  const body = `
<tr><td style="padding:8px 4px 28px;text-align:center">
  <div style="font:700 28px/36px ${SERIF};color:${INK}">${first ? `Welcome, ${esc(first)}` : 'Welcome to Wisdom'}</div>
  <div style="font:17px/26px ${SERIF};color:${MUTED};margin-top:10px">${daily ? 'Your week has begun. Here is Day 1 to keep. A new day comes to this inbox each morning, around 7.' : 'You have read Day 1. Six more days are waiting, chosen for where you are right now.'}</div>
  <div style="display:inline-block;margin-top:18px;padding:7px 16px;border-radius:999px;background:${CHIP};font:600 14px/20px ${SERIF};color:${INK}"><span style="color:${GOLD};font-weight:700;letter-spacing:1.5px;text-transform:uppercase;font-size:11px">Week 1</span>&nbsp;&nbsp;${title}</div>
</td></tr>
<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${dayCard(today)}</table></td></tr>
<tr><td style="padding:28px 4px 0">
  ${label(daily ? 'What is coming · one each morning' : 'The rest of your week')}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:6px">${restRows}</table>
</td></tr>
<tr><td style="padding:28px 4px 0;text-align:center">
  ${button(open, daily ? 'Open my plan' : 'Open your week')}
  <div style="font:14px/22px ${SERIF};color:${MUTED};margin-top:14px">${daily ? 'Day 2 arrives here tomorrow morning. Your plan opens on any phone or computer from the button above.' : 'Your week is saved in the browser where you made it.'}</div>
</td></tr>`

  const html = shell(daily ? 'Day 1 is here. Day 2 arrives tomorrow morning.' : 'Your seven days are ready.', body, footText(token))
  const text = [
    first ? `Welcome, ${first}` : 'Welcome to Wisdom',
    daily ? 'Your week has begun. Here is Day 1 to keep. A new day comes to this inbox each morning, around 7.' : 'You have read Day 1. Six more days are waiting.',
    weekTitle ? `Week 1: ${weekTitle}` : '',
    '',
    dayText(today),
    '',
    daily ? 'WHAT IS COMING · ONE EACH MORNING' : 'THE REST OF YOUR WEEK',
    ...rest.map((d) => `Day ${d.day}: ${d.beat === 'story' ? 'A story: ' : ''}${lineOf(d)}`),
    '',
    `Open my plan: ${open}`,
    daily ? 'Day 2 arrives here tomorrow morning.' : '',
    token ? `Stop these emails: ${unsubPage(token)}` : '',
  ].join('\n').replace(/\n{3,}/g, '\n\n')
  const subject = first ? `Welcome, ${first}. Day 1 of your week` : 'Welcome to Wisdom. Day 1 of your week'
  return { subject, html, text }
}

/** Days 2 to 7, one each morning. */
export function dayEmail(day: number, days: FullDay[], weekTitle: string | null, name: string | null | undefined, token: string) {
  const d = days.find((x) => x.day === day)
  if (!d) return null
  const first = firstName(name)
  const last = day >= 7
  const next = days.find((x) => x.day === day + 1)
  const fb = (v: string, text: string) =>
    `<a href="${planUrl(token, day, `&fb=${v}`)}" style="display:inline-block;margin:4px;padding:10px 18px;border-radius:999px;border:1px solid ${LINE};background:${CARD};color:${INK};font:600 15px/1 ${SERIF};text-decoration:none">${text}</a>`

  const body = `
<tr><td style="padding:8px 4px 24px;text-align:center">
  <div style="font:700 13px/20px ${SERIF};letter-spacing:2px;text-transform:uppercase;color:${GOLD}">Day ${day} of 7${weekTitle ? ` · ${esc(weekTitle)}` : ''}</div>
  <div style="font:17px/26px ${SERIF};color:${MUTED};margin-top:10px">${first ? `Good morning, ${esc(first)}. ` : 'Good morning. '}A few quiet minutes before the day begins.</div>
</td></tr>
<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${dayCard(d)}</table></td></tr>
<tr><td style="padding:24px 4px 0;text-align:center">
  <div style="font:15px/22px ${SERIF};color:${MUTED};margin-bottom:6px">Did today's ${d.beat === 'story' ? 'story' : 'verse'} help?</div>
  ${fb('helped', 'Yes, it helped')}${fb('not_for_me', 'Not for me')}
</td></tr>
<tr><td style="padding:24px 4px 0;text-align:center">
  ${button(planUrl(token, day), `Open Day ${day}`)}
  <div style="font:14px/22px ${SERIF};color:${MUTED};margin-top:14px">${
    last
      ? 'This is the last day of Week 1. Your whole week stays on your plan page.'
      : next
        ? `Tomorrow, Day ${day + 1}: ${esc(clip(lineOf(next), 70))}`
        : `Day ${day + 1} arrives tomorrow morning.`
  }</div>
</td></tr>`

  const html = shell(clip(lineOf(d), 90), body, footText(token))
  const text = [
    `Day ${day} of 7${weekTitle ? ` · ${weekTitle}` : ''}`,
    '',
    dayText(d),
    '',
    `Open Day ${day}: ${planUrl(token, day)}`,
    `It helped: ${planUrl(token, day, '&fb=helped')}`,
    `Not for me: ${planUrl(token, day, '&fb=not_for_me')}`,
    last ? 'This is the last day of Week 1.' : next ? `Tomorrow, Day ${day + 1}: ${lineOf(next)}` : '',
    '',
    `Stop these emails: ${unsubPage(token)}`,
  ].join('\n')
  const subject = `Day ${day}: ${clip(lineOf(d), 60)}`
  return { subject, html, text }
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
