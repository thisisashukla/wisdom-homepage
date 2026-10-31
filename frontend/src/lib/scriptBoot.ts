/** Server-safe part of the script setting (see lib/script.ts): the storage key and the pre-paint boot script. */
export const SCRIPT_KEY = 'wq.script'
/** Keys the funnels used before the site-wide setting; read once so a saved choice carries over. */
const LEGACY_KEYS = ['mbh_script', 'fx-up-script', 'fx-script', 'wisdom.ramayana.script', 'wq_hc_script']

/** Inline <script> body for <head>: sets data-script before paint. */
export const SCRIPT_BOOT = `try{var s=localStorage.getItem('${SCRIPT_KEY}');if(!s){var k=${JSON.stringify(LEGACY_KEYS)};for(var i=0;i<k.length;i++){if(localStorage.getItem(k[i])==='iast'){s='iast';break}}}if(s==='iast')document.documentElement.setAttribute('data-script','iast')}catch(e){}`
