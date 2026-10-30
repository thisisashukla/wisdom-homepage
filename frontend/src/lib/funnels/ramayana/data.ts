/** Ramayana funnel: content loaders (static JSON from scripts/funnels/ramayana/build_content.py). */

import linesJson from '@/content/funnels/ramayana/lines.json'
import scenesJson from '@/content/funnels/ramayana/scenes.json'
import planJson from '@/content/funnels/ramayana/plan.json'
import diwaliJson from '@/content/funnels/ramayana/diwali.json'
import type { Diwali, Lamp, LampId, LampState, LampView, Line, LineView, Locale, PlanDay, Scene } from './types'

export const LINES = linesJson as unknown as Record<string, Line>
export const SCENES = (scenesJson as unknown as Scene[]).slice().sort((a, b) => a.order - b.order)
export const PLAN = planJson as unknown as PlanDay[]
export const DIWALI = diwaliJson as unknown as Diwali

export const getScene = (slug: string): Scene | undefined => SCENES.find((s) => s.slug === slug)

export function getLine(key: string): Line {
  const l = LINES[key]
  if (!l) throw new Error(`ramayana: unknown line ${key}`)
  return l
}

export function lineView(line: Line, locale: Locale): LineView {
  return {
    key: line.key,
    text: line.text,
    id: line.corpusId ?? line.key,
    lang: line.lang,
    sa: line.sa,
    iast: line.iast,
    meaning: line.meaning[locale],
    speaker: line.speaker[locale],
    ref: line.ref[locale],
    ...(line.href ? { href: locale === 'hi' ? `/hi${line.href}` : line.href } : {}),
  }
}

const LAMP_LABEL: Record<Locale, Record<LampId, string>> = {
  en: { film: 'Film', valmiki: 'Valmiki', tulsidas: 'Tulsidas' },
  hi: { film: 'फ़िल्म', valmiki: 'वाल्मीकि', tulsidas: 'तुलसीदास' },
}

const STATE_LABEL: Record<Locale, Record<LampId, Record<LampState, string>>> = {
  en: {
    film: { lit: 'In the film', partial: 'Partly', dark: 'Not in the film', unknown: 'Not yet known' },
    valmiki: { lit: 'In the text', partial: 'Mentioned only', dark: 'Not in the text', unknown: 'Not yet known' },
    tulsidas: { lit: 'In the text', partial: 'Mentioned only', dark: 'Not in the text', unknown: 'Not yet known' },
  },
  hi: {
    film: { lit: 'फ़िल्म में', partial: 'कुछ हद तक', dark: 'फ़िल्म में नहीं', unknown: 'अभी पता नहीं' },
    valmiki: { lit: 'ग्रंथ में', partial: 'सिर्फ़ ज़िक्र', dark: 'ग्रंथ में नहीं', unknown: 'अभी पता नहीं' },
    tulsidas: { lit: 'ग्रंथ में', partial: 'सिर्फ़ ज़िक्र', dark: 'ग्रंथ में नहीं', unknown: 'अभी पता नहीं' },
  },
}

export const LAMP_ORDER: LampId[] = ['film', 'valmiki', 'tulsidas']

export function lampViews(scene: Scene, locale: Locale): LampView[] {
  return LAMP_ORDER.map((id) => {
    const lamp: Lamp = scene.lamps[id]
    return {
      id,
      state: lamp.state,
      label: LAMP_LABEL[locale][id],
      stateLabel: STATE_LABEL[locale][id][lamp.state],
      note: lamp.note[locale],
      ...(lamp.source ? { source: lamp.source } : {}),
      lines: (lamp.lines ?? []).map((k) => lineView(getLine(k), locale)),
    }
  })
}

/** Which lamp a scene page opens with: the first text lamp that has lines. */
export function defaultLamp(scene: Scene): LampId {
  if ((scene.lamps.valmiki.lines ?? []).length) return 'valmiki'
  if ((scene.lamps.tulsidas.lines ?? []).length) return 'tulsidas'
  return 'film'
}

/** Every corpus id the funnel cites, for "Sources and method" and JSON-LD citations. */
export function sceneCitations(scene: Scene): string[] {
  const out: string[] = []
  for (const id of ['valmiki', 'tulsidas'] as const) {
    for (const k of scene.lamps[id].lines ?? []) {
      const l = getLine(k)
      if (!out.includes(l.ref.en)) out.push(l.ref.en)
    }
  }
  return out
}

export const KAND_LABEL: Record<Scene['kand'], { en: string; hi: string }> = {
  bal: { en: 'Bal Kand', hi: 'बालकाण्ड' },
  ayodhya: { en: 'Ayodhya Kand', hi: 'अयोध्याकाण्ड' },
  aranya: { en: 'Aranya Kand', hi: 'अरण्यकाण्ड' },
}
