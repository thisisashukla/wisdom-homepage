// Asserts the ninth-square rule over the whole grid: every one of the 225 start cells
// yields its chaupai. Class k = p mod 9; start position m = (p - k) / 9; the count visits
// positions m..24 then 0..m-1 of class k (cells k + 9j), and each syllable lands in slot j.
// Run from frontend/: node scripts/funnels/ram-shalaka/check.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const FE = path.resolve(HERE, '..', '..', '..')
const DIR = path.join(FE, 'src', 'content', 'funnels', 'ram-shalaka')
const data = JSON.parse(fs.readFileSync(path.join(DIR, 'ram-shalaka.json'), 'utf8'))
const cards = JSON.parse(fs.readFileSync(path.join(DIR, 'cards.json'), 'utf8'))

let failures = 0
const fail = (msg) => {
  failures++
  console.error(`FAIL ${msg}`)
}
const key = (s) => s.normalize('NFC').replace(/[\s।॥|,.]/g, '')

const cells = data.grid.flat()
if (data.grid.length !== 15 || data.grid.some((r) => r.length !== 15)) fail('grid is not 15 x 15')
if (cells.length !== 225) fail(`grid has ${cells.length} cells`)
if (data.lines.length !== 9) fail(`expected 9 lines, got ${data.lines.length}`)
data.lines.forEach((l, i) => {
  if (l.k !== i) fail(`line ${i} has k=${l.k}`)
})

/** Same function the client uses (src/lib/funnels/ram-shalaka/core.ts). */
function sequence(p) {
  const k = p % 9
  const m = (p - k) / 9
  const out = []
  for (let i = 0; i < 25; i++) out.push(k + 9 * ((m + i) % 25))
  return out
}

let ok = 0
for (let p = 0; p < 225; p++) {
  const k = p % 9
  const m = (p - k) / 9
  const seq = sequence(p)
  if (seq[0] !== p) fail(`p=${p}: count does not start on the chosen cell`)
  if (new Set(seq).size !== 25 || seq.some((c) => c % 9 !== k)) fail(`p=${p}: sequence leaves class ${k}`)
  const slots = new Array(25)
  seq.forEach((cell, step) => {
    slots[(m + step) % 25] = cells[cell]
  })
  const got = key(slots.join(''))
  const want = key(data.lines[k].deva.join(''))
  if (got !== want) fail(`p=${p} (k=${k}): got "${slots.join(' ')}" want "${data.lines[k].deva.join(' ')}"`)
  else ok++
}

// The answer pair inside each full unit must be the grid-verified text.
for (const l of data.lines) {
  const pair = l.unit.find((u) => u.answer)
  if (!pair || key(pair.deva.join('')) !== key(l.deva.join(''))) fail(`k=${l.k}: unit answer pair differs from the grid line`)
  if (l.unit.length !== 2) fail(`k=${l.k}: unit should hold 2 pairs (4 half-lines)`)
  if (l.reviewed !== false) fail(`k=${l.k}: reviewed must stay false until the owner signs off`)
}

// Share cards: one per line, ids rs-1..rs-9, meanings at most 20 words.
cards.forEach((c, i) => {
  if (c.id !== `rs-${i + 1}`) fail(`card ${i} id ${c.id}`)
  if (key(c.sanskritLine) !== key(data.lines[i].deva.join(''))) fail(`card ${c.id} line differs`)
  for (const lang of ['hi', 'en']) if (c.meaning[lang].trim().split(/\s+/).length > 20) fail(`card ${c.id} ${lang} meaning > 20 words`)
})

// No em or en dashes anywhere in the published data.
const raw = fs.readFileSync(path.join(DIR, 'ram-shalaka.json'), 'utf8') + fs.readFileSync(path.join(DIR, 'cards.json'), 'utf8')
if (/[\u2013\u2014]/.test(raw)) fail('em or en dash in data')

console.log(`${ok}/225 start cells yield their chaupai`)
if (failures) {
  console.error(`${failures} failure(s)`)
  process.exit(1)
}
console.log('all checks passed')
