// Writes lp/funnels/ram-shalaka/qa/ (index.html + ritual-harness.js): the Ritual component running on React UMD with
// analytics and NextStep stubbed, for a quick look in any browser without next dev. Not shipped.
// Run from frontend/: node scripts/funnels/ram-shalaka/qa-harness.mjs, then open lp/funnels/ram-shalaka/qa/index.html.
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
const FE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const require = createRequire(FE + '/package.json')
const ts = require('typescript')
const OUT = path.join(FE, '..', 'lp', 'funnels', 'ram-shalaka', 'qa')
fs.mkdirSync(OUT, { recursive: true })
const tr = (f) => ts.transpileModule(fs.readFileSync(f, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true } }).outputText
const core = tr(FE + '/src/lib/funnels/ram-shalaka/core.ts')
const ritual = tr(FE + '/src/components/funnels/ram-shalaka/Ritual.tsx')
const data = JSON.parse(fs.readFileSync(FE + '/src/content/funnels/ram-shalaka/ram-shalaka.json', 'utf8'))
function props(locale) {
  const { naam, next, ...ui } = data.ui[locale]
  return {
    locale, pageKey: locale === 'hi' ? 'ram-shalaka' : 'ram-shalaka-en', cells: data.grid.flat(), ui, naam, next,
    langHref: '#', siteUrl: 'https://wisdomquotes.in',
    lines: data.lines.map((l) => ({ n: l.n, k: l.k, slug: l.slug, sign: l.sign, deva: l.deva, iast: l.iast,
      source: `${l.kand[locale]} · ${l.place[locale]} · ${l.who[locale]}`, meaning: l.meaning[locale], scene: l.scene[locale], forYou: l.forYou[locale], signText: l.signText[locale] })),
  }
}
const js = `
(function(){
var mods = {};
mods['react'] = window.React;
mods['@/lib/app'] = { detectPlatform: function(){ return 'android' } };
mods['@/lib/mixpanel'] = { trackEvent: function(n,p){ (window.__ev=window.__ev||[]).push([n,p]); console.log('EV', n, JSON.stringify(p)) }, trackEventBeacon: function(n,p){ (window.__ev=window.__ev||[]).push([n,p]); console.log('EV', n, JSON.stringify(p)) } };
mods['@/lib/quotes-shared'] = { cardImageUrl: function(id,o){ return 'https://wisdomquotes.in/api/quote-card/'+id+'?format='+o.format+'&lang='+o.lang+'&theme='+o.theme+(o.download?'&download=1':'') } };
mods['@/components/quotes/NextStep'] = { __esModule: true, default: function(p){ return React.createElement('div',{className:'qns'}, React.createElement('p',{className:'qns-line'}, p.copy.email.line), React.createElement('a',{className:'qns-btn',href:'#'}, p.copy.email.cta)) } };
function req(n){ if(!(n in mods)) throw new Error('missing '+n); return mods[n] }
(function(){ var exports = {}, module = {exports: exports}; var require = req; ${core}; mods['@/lib/funnels/ram-shalaka/core'] = module.exports })();
(function(){ var exports = {}, module = {exports: exports}; var require = req; ${ritual}; mods['ritual'] = module.exports })();
var P = ${JSON.stringify({ hi: props('hi'), en: props('en') })};
var loc = location.hash === '#en' ? 'en' : 'hi';
document.documentElement.lang = loc;
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(mods['ritual'].default, P[loc]));
})();
`
fs.writeFileSync(path.join(OUT, 'ritual-harness.js'), js)
fs.writeFileSync(path.join(OUT, 'index.html'), `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ram Shalaka ritual QA harness (not shipped)</title>
<link href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Noto+Sans+Devanagari:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../../../frontend/src/components/funnels/ram-shalaka/shalaka.css">
<style>body{margin:0;background:#120707}.fx-ram-shalaka{--rs-tiro:'Tiro Devanagari Hindi';--font-noto-devanagari:'Noto Sans Devanagari';--font-playfair:'Playfair Display';--font-inter:'Inter'}</style>
</head><body><main class="fx-ram-shalaka" lang="hi"><section class="rs-stage"><div id="root"></div></section></main>
<script src="../../../../frontend/node_modules/react/umd/react.development.js"></script>
<script src="../../../../frontend/node_modules/react-dom/umd/react-dom.development.js"></script>
<script src="ritual-harness.js"></script></body></html>`)
console.log('ok', OUT)
