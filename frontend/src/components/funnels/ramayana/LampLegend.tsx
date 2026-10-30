import Diya from './Diya'

const ITEMS = {
  en: [
    { state: 'lit', text: 'In this version' },
    { state: 'partial', text: 'Mentioned, not shown' },
    { state: 'dark', text: 'Not in this version' },
    { state: 'unknown', text: 'Film: not yet known' },
  ],
  hi: [
    { state: 'lit', text: 'इस रूप में है' },
    { state: 'partial', text: 'सिर्फ़ ज़िक्र है' },
    { state: 'dark', text: 'इस रूप में नहीं' },
    { state: 'unknown', text: 'फ़िल्म: अभी पता नहीं' },
  ],
} as const

export default function LampLegend({ locale }: { locale: 'en' | 'hi' }) {
  return (
    <ul className="rl-legend" aria-label={locale === 'hi' ? 'दीयों का मतलब' : 'What the lamps mean'}>
      {ITEMS[locale].map((it) => (
        <li key={it.state}>
          <Diya lamp="film" state={it.state} size={28} />
          <span>{it.text}</span>
        </li>
      ))}
    </ul>
  )
}
