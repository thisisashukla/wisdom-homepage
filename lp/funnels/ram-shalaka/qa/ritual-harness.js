
(function(){
var mods = {};
mods['react'] = window.React;
mods['@/lib/app'] = { detectPlatform: function(){ return 'android' } };
mods['@/lib/mixpanel'] = { trackEvent: function(n,p){ (window.__ev=window.__ev||[]).push([n,p]); console.log('EV', n, JSON.stringify(p)) }, trackEventBeacon: function(n,p){ (window.__ev=window.__ev||[]).push([n,p]); console.log('EV', n, JSON.stringify(p)) } };
mods['@/lib/quotes-shared'] = { cardImageUrl: function(id,o){ return 'https://wisdomquotes.in/api/quote-card/'+id+'?format='+o.format+'&lang='+o.lang+'&theme='+o.theme+(o.download?'&download=1':'') } };
mods['@/components/quotes/NextStep'] = { __esModule: true, default: function(p){ return React.createElement('div',{className:'qns'}, React.createElement('p',{className:'qns-line'}, p.copy.email.line), React.createElement('a',{className:'qns-btn',href:'#'}, p.copy.email.cta)) } };
function req(n){ if(!(n in mods)) throw new Error('missing '+n); return mods[n] }
(function(){ var exports = {}, module = {exports: exports}; var require = req; "use strict";
/**
 * Ram Shalaka: client-safe types and pure helpers (no data imports, no Node APIs).
 * The ninth-square rule here is the one scripts/funnels/ram-shalaka/check.mjs asserts.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.planHref = exports.toolHref = exports.lineHref = exports.RS_RESET_HOUR = exports.RS_DAILY = exports.RS_STORAGE_KEY = exports.RS_FUNNEL = void 0;
exports.sequence = sequence;
exports.dayKey = dayKey;
exports.minutesToReset = minutesToReset;
exports.normQuestion = normQuestion;
exports.hashQuestion = hashQuestion;
exports.needsExpertNote = needsExpertNote;
exports.RS_FUNNEL = 'ram-shalaka';
exports.RS_STORAGE_KEY = 'wq_shalaka_v1';
exports.RS_DAILY = 3;
exports.RS_RESET_HOUR = 4;
/**
 * The count from start cell p (0..224): class k = p mod 9, start position m = (p - k) / 9,
 * then positions m..24 and 0..m-1 of that class. Returns 25 cell indices, p first.
 */
function sequence(p) {
    const k = p % 9;
    const m = (p - k) / 9;
    const out = [];
    for (let i = 0; i < 25; i++)
        out.push(k + 9 * ((m + i) % 25));
    return out;
}
/** Local day that turns over at 4 AM (Brahma muhurta). */
function dayKey(now = new Date()) {
    const d = new Date(now.getTime() - exports.RS_RESET_HOUR * 3600 * 1000);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
/** Minutes until the next 4 AM local. */
function minutesToReset(now = new Date()) {
    const next = new Date(now);
    next.setHours(exports.RS_RESET_HOUR, 0, 0, 0);
    if (next <= now)
        next.setDate(next.getDate() + 1);
    return Math.max(1, Math.round((next.getTime() - now.getTime()) / 60000));
}
/** Question text normalised for the repeat check. Never leaves the device. */
function normQuestion(s) {
    return (s || '')
        .toLowerCase()
        .normalize('NFC')
        .replace(/[\s?.,।॥!'"]+/g, ' ')
        .trim();
}
/** FNV-1a, so only a hash of the question is stored, never the words. */
function hashQuestion(s) {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(36);
}
/** Health, legal and money words (Hindi, Hinglish, English) that add the expert-advice note. */
const EXPERT_RE = /(डॉक्टर|डाक्टर|बीमार|इलाज|दवा|ऑपरेशन|सर्जरी|अस्पताल|स्वास्थ्य|सेहत|गर्भ|मुकदम|मुक़दम|अदालत|कोर्ट|वकील|पुलिस|तलाक|केस|लोन|कर्ज|क़र्ज़|कर्ज़|उधार|पैसा|पैसे|निवेश|शेयर|ज़मीन|जमीन|प्रॉपर्टी|\bdoctor|\bsurgery|\boperation\b|\bhospital|\bdisease|\billness|\bcancer|\bmedicine|\bpregnan|\bhealth|\bcourt\b|\bcase\b|\blawyer|\bvakil|\bpolice|\bdivorce|\blegal|\bloan|\bdebt|\bemi\b|\bmoney|\bpaisa|\binvest|\bstock|\bshare market|\bproperty|\bkarz)/i;
function needsExpertNote(question) {
    return !!question && EXPERT_RE.test(question);
}
const lineHref = (slug) => `/hi/ram-shalaka/${slug}`;
exports.lineHref = lineHref;
const toolHref = (locale) => (locale === 'hi' ? '/hi/ram-shalaka' : '/ram-shalaka');
exports.toolHref = toolHref;
const planHref = (n) => `/start?ref=rs-${n}`;
exports.planHref = planHref;
; mods['@/lib/funnels/ram-shalaka/core'] = module.exports })();
(function(){ var exports = {}, module = {exports: exports}; var require = req; 'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Ritual;
/**
 * Shri Ram Shalaka ritual: sankalp, dhyan hold, shalaka hold on the cloth, the count, the answer, day done.
 * Spec and approved behaviour: lp/funnels/ram-shalaka/PROTOTYPE.html.
 * Privacy: the typed question stays in component state; only an FNV hash is stored, and it is never sent to analytics.
 */
const react_1 = require("react");
const NextStep_1 = __importDefault(require("@/components/quotes/NextStep"));
const app_1 = require("@/lib/app");
const mixpanel_1 = require("@/lib/mixpanel");
const quotes_shared_1 = require("@/lib/quotes-shared");
const core_1 = require("@/lib/funnels/ram-shalaka/core");
const DHYAN_MS = 3500;
const SHALAKA_MS = 900;
const HOP_MS = 170;
const COUNT_DELAY_MS = 650;
const REVEAL_DELAY_MS = 1100;
function readMem() {
    const fresh = { day: (0, core_1.dayKey)(), used: 0, asked: [], mala: [] };
    try {
        const s = JSON.parse(localStorage.getItem(core_1.RS_STORAGE_KEY) || 'null');
        if (!s)
            return fresh;
        const mala = Array.isArray(s.mala) ? s.mala.filter((k) => Number.isInteger(k) && k >= 0 && k < 9) : [];
        if (s.day === fresh.day) {
            return { ...fresh, used: Math.min(core_1.RS_DAILY, Number(s.used) || 0), asked: Array.isArray(s.asked) ? s.asked : [], mala };
        }
        return { ...fresh, mala };
    }
    catch {
        return fresh;
    }
}
function writeMem(m) {
    try {
        localStorage.setItem(core_1.RS_STORAGE_KEY, JSON.stringify({ ...m, day: (0, core_1.dayKey)() }));
    }
    catch {
        // private mode: the ritual still works, nothing persists
    }
}
/* ---------------------------------------------------------------- sound */
let audioCtx = null;
function bell(freq, dur = 0.6, gain = 0.05) {
    try {
        const W = window;
        const Ctor = W.AudioContext || W.webkitAudioContext;
        if (!Ctor)
            return;
        audioCtx = audioCtx || new Ctor();
        const ac = audioCtx;
        const t0 = ac.currentTime;
        const g = ac.createGain();
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(gain, t0 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        for (const f of [freq, freq * 2.76]) {
            const o = ac.createOscillator();
            o.type = 'sine';
            o.frequency.value = f;
            o.connect(g);
            o.start(t0);
            o.stop(t0 + dur);
        }
        g.connect(ac.destination);
    }
    catch {
        // no audio on this device
    }
}
function buzz(ms) {
    try {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator)
            navigator.vibrate(ms);
    }
    catch {
        // vibration blocked
    }
}
const Board = (0, react_1.memo)(function Board({ cells, cellWord, gridLabel, veiled, chosen, step, focusIdx, onKey, onCellClick }) {
    const seq = (0, react_1.useMemo)(() => (chosen === null ? [] : (0, core_1.sequence)(chosen)), [chosen]);
    const order = (0, react_1.useMemo)(() => {
        const m = new Map();
        seq.forEach((c, i) => m.set(c, i));
        return m;
    }, [seq]);
    const k = chosen === null ? -1 : chosen % 9;
    return (React.createElement("div", { className: "rs-grid", role: "group", "aria-label": gridLabel, onKeyDown: onKey, lang: "hi" }, cells.map((c, i) => {
        let cls = 'rs-cell';
        if (c.length > 2)
            cls += ' sm';
        if (chosen !== null) {
            if (i === chosen)
                cls += ' chosen';
            else if (i % 9 !== k)
                cls += ' dim';
            else if ((order.get(i) ?? 99) < step)
                cls += ' lit';
        }
        return (React.createElement("button", { key: i, type: "button", className: cls, "data-i": i, tabIndex: veiled || chosen !== null ? -1 : i === focusIdx ? 0 : -1, "aria-label": `${cellWord} ${i + 1}: ${c}`, onClick: onCellClick }, c));
    })));
});
/* ---------------------------------------------------------------- ritual */
function Ritual({ locale, pageKey, cells, lines, ui, naam, next, langHref, siteUrl }) {
    const [screen, setScreen] = (0, react_1.useState)('sankalp');
    const [mem, setMem] = (0, react_1.useState)({ day: '', used: 0, asked: [], mala: [] });
    const [sound, setSound] = (0, react_1.useState)(true);
    const [reduce, setReduce] = (0, react_1.useState)(false);
    const [question, setQuestion] = (0, react_1.useState)('');
    const [repeatK, setRepeatK] = (0, react_1.useState)(null);
    const [lit, setLit] = (0, react_1.useState)(0);
    const [dhyanEarly, setDhyanEarly] = (0, react_1.useState)(false);
    const [holding, setHolding] = (0, react_1.useState)(false);
    const [veiled, setVeiled] = (0, react_1.useState)(true);
    const [chosen, setChosen] = (0, react_1.useState)(null);
    const [step, setStep] = (0, react_1.useState)(0);
    const [focusIdx, setFocusIdx] = (0, react_1.useState)(112);
    const [current, setCurrent] = (0, react_1.useState)(null);
    const [script, setScript] = (0, react_1.useState)('deva');
    const [tab, setTab] = (0, react_1.useState)('you');
    const [expert, setExpert] = (0, react_1.useState)(false);
    const [modal, setModal] = (0, react_1.useState)(false);
    const [copied, setCopied] = (0, react_1.useState)(false);
    const [resetText, setResetText] = (0, react_1.useState)('');
    const [moved, setMoved] = (0, react_1.useState)(false);
    const base = (0, react_1.useMemo)(() => ({ funnel: core_1.RS_FUNNEL, page: pageKey, locale }), [pageKey, locale]);
    const soundOn = (0, react_1.useRef)(true);
    const busy = (0, react_1.useRef)(false);
    const timers = (0, react_1.useRef)([]);
    const holdRaf = (0, react_1.useRef)(null);
    const holdStart = (0, react_1.useRef)(0);
    const holdDone = (0, react_1.useRef)(false);
    const ringRef = (0, react_1.useRef)(null);
    const haloRef = (0, react_1.useRef)(null);
    const boardRef = (0, react_1.useRef)(null);
    const touchRef = (0, react_1.useRef)(null);
    const sRaf = (0, react_1.useRef)(null);
    const sPoint = (0, react_1.useRef)(null);
    const headRef = (0, react_1.useRef)(null);
    const closeRef = (0, react_1.useRef)(null);
    const shareRef = (0, react_1.useRef)(null);
    const shownScreen = (0, react_1.useRef)('sankalp');
    const panelRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const m = readMem();
        setMem(m);
        const rm = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        if (rm) {
            setReduce(true);
            setSound(false);
            soundOn.current = false;
        }
        let referrer = '';
        try {
            referrer = document.referrer ? new URL(document.referrer).hostname : '';
        }
        catch {
            referrer = '';
        }
        (0, mixpanel_1.trackEvent)('Shalaka Opened', { ...base, lang: locale, device: (0, app_1.detectPlatform)(), referrer: referrer || 'direct' });
        const ts = timers.current;
        return () => {
            ts.forEach((t) => window.clearTimeout(t));
            if (holdRaf.current)
                cancelAnimationFrame(holdRaf.current);
            if (sRaf.current)
                cancelAnimationFrame(sRaf.current);
        };
    }, [base, locale]);
    // Move focus to the new screen's heading so keyboard and screen reader users follow the ritual.
    (0, react_1.useEffect)(() => {
        if (shownScreen.current === screen)
            return;
        shownScreen.current = screen;
        setMoved(true);
        headRef.current?.focus({ preventScroll: true });
        const top = panelRef.current?.getBoundingClientRect().top ?? 0;
        if (top < 0)
            panelRef.current?.scrollIntoView({ block: 'start' });
    }, [screen]);
    (0, react_1.useEffect)(() => {
        if (!modal)
            return;
        closeRef.current?.focus();
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setModal(false);
                shareRef.current?.focus();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [modal]);
    const later = (fn, ms) => {
        timers.current.push(window.setTimeout(fn, ms));
    };
    const ring = (f, d, g) => {
        if (soundOn.current)
            bell(f, d, g);
    };
    const goDone = (0, react_1.useCallback)(() => {
        const mins = (0, core_1.minutesToReset)();
        setResetText(`${Math.floor(mins / 60)}:${String(mins % 60).padStart(2, '0')}`);
        setScreen('done');
    }, []);
    /* ---------- sankalp */
    const onSankalp = () => {
        const q = (0, core_1.normQuestion)(question);
        setRepeatK(null);
        if (q) {
            const h = (0, core_1.hashQuestion)(q);
            const prev = mem.asked.find((a) => a.h === h);
            if (prev) {
                setRepeatK(prev.k);
                (0, mixpanel_1.trackEvent)('Repeat Question Blocked', { ...base, k: prev.k });
                return;
            }
        }
        if (mem.used >= core_1.RS_DAILY) {
            (0, mixpanel_1.trackEvent)('Daily Limit Reached', { ...base });
            goDone();
            return;
        }
        (0, mixpanel_1.trackEvent)('Sankalp Set', { ...base, typed: !!q });
        setExpert((0, core_1.needsExpertNote)(question));
        setLit(0);
        setDhyanEarly(false);
        setScreen('dhyan');
    };
    /* ---------- dhyan hold */
    const holdMs = reduce ? 600 : DHYAN_MS;
    const paintHold = (p) => {
        ringRef.current?.style.setProperty('--p', String(p));
        if (haloRef.current)
            haloRef.current.style.transform = `scale(${0.8 + p * 0.5})`;
    };
    const holdFrame = () => {
        const p = Math.min(1, (performance.now() - holdStart.current) / holdMs);
        paintHold(p);
        setLit(Math.floor(p * naam.length + 0.0001));
        if (p >= 1) {
            holdRaf.current = null;
            holdDone.current = true;
            ring(990, 1.2, 0.05);
            (0, mixpanel_1.trackEvent)('Diya Lit', { ...base, held_ms: Math.round(performance.now() - holdStart.current) });
            later(() => {
                setVeiled(true);
                setChosen(null);
                setStep(0);
                busy.current = false;
                setScreen('shalaka');
            }, 450);
            return;
        }
        holdRaf.current = requestAnimationFrame(holdFrame);
    };
    const dhyanDown = () => {
        if (holdRaf.current || holdDone.current)
            return;
        holdStart.current = performance.now();
        setDhyanEarly(false);
        setHolding(true);
        holdRaf.current = requestAnimationFrame(holdFrame);
    };
    const dhyanUp = () => {
        if (!holdRaf.current)
            return;
        cancelAnimationFrame(holdRaf.current);
        holdRaf.current = null;
        const held = Math.round(performance.now() - holdStart.current);
        paintHold(0);
        setLit(0);
        setHolding(false);
        setDhyanEarly(true);
        (0, mixpanel_1.trackEvent)('Dhyan Abandoned', { ...base, held_ms: held });
    };
    (0, react_1.useEffect)(() => {
        if (screen === 'dhyan') {
            holdDone.current = false;
            setHolding(false);
        }
    }, [screen]);
    /* ---------- the count */
    const place = (p, veil) => {
        if (busy.current)
            return;
        busy.current = true;
        const k = p % 9;
        const h = (0, core_1.normQuestion)(question) ? (0, core_1.hashQuestion)((0, core_1.normQuestion)(question)) : '';
        const used = Math.min(core_1.RS_DAILY, mem.used + 1);
        const nm = {
            day: (0, core_1.dayKey)(),
            used,
            asked: h ? [...mem.asked, { h, k }] : mem.asked,
            mala: mem.mala.includes(k) ? mem.mala : [...mem.mala, k],
        };
        setMem(nm);
        writeMem(nm);
        (0, mixpanel_1.trackEvent)('Shalaka Placed', { ...base, cell: p, veil });
        setVeiled(false);
        setChosen(p);
        setStep(0);
        setCurrent(k);
        const reveal = () => {
            ring(660, 1.6, 0.06);
            later(() => ring(990, 1.6, 0.04), 180);
            later(() => {
                setTab('you');
                setScript('deva');
                setScreen('uttar');
                (0, mixpanel_1.trackEvent)('Chaupai Revealed', { ...base, k, sign: lines[k].sign, nth_today: used });
            }, reduce ? 50 : REVEAL_DELAY_MS);
        };
        if (reduce) {
            setStep(25);
            reveal();
            return;
        }
        let s = 0;
        const hop = () => {
            s++;
            setStep(s);
            ring(1320, 0.35, 0.025);
            buzz(6);
            if (s < 25)
                later(hop, HOP_MS);
            else
                reveal();
        };
        later(hop, COUNT_DELAY_MS);
    };
    const cellFromPoint = (x, y) => {
        const g = boardRef.current?.querySelector('.rs-grid')?.getBoundingClientRect();
        if (!g)
            return 0;
        const cx = Math.max(0, Math.min(14, Math.floor(((x - g.left) / g.width) * 15)));
        const cy = Math.max(0, Math.min(14, Math.floor(((y - g.top) / g.height) * 15)));
        return cy * 15 + cx;
    };
    const sMs = reduce ? 200 : SHALAKA_MS;
    const sFrame = () => {
        const p = Math.min(1, (performance.now() - holdStart.current) / sMs);
        touchRef.current?.style.setProperty('--p', String(p));
        if (p >= 1) {
            sRaf.current = null;
            touchRef.current?.classList.remove('on');
            const pt = sPoint.current;
            if (pt)
                place(cellFromPoint(pt.x, pt.y), veiled);
            return;
        }
        sRaf.current = requestAnimationFrame(sFrame);
    };
    const boardDown = (e) => {
        if (busy.current || chosen !== null)
            return;
        if (e.pointerType === 'mouse' && e.button !== 0)
            return;
        const b = boardRef.current?.getBoundingClientRect();
        if (!b)
            return;
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        }
        catch {
            // capture unsupported
        }
        sPoint.current = { x: e.clientX, y: e.clientY };
        const t = touchRef.current;
        if (t) {
            t.style.left = `${e.clientX - b.left}px`;
            t.style.top = `${e.clientY - b.top}px`;
            t.style.setProperty('--p', '0');
            t.classList.add('on');
        }
        holdStart.current = performance.now();
        if (sRaf.current)
            cancelAnimationFrame(sRaf.current);
        sRaf.current = requestAnimationFrame(sFrame);
    };
    const boardUp = () => {
        if (sRaf.current) {
            cancelAnimationFrame(sRaf.current);
            sRaf.current = null;
            touchRef.current?.classList.remove('on');
        }
    };
    const placeRef = (0, react_1.useRef)();
    placeRef.current = place;
    // Keyboard activation only (detail 0): pointer users choose with the hold.
    const onVeilClick = (e) => {
        if (e.detail !== 0)
            return;
        place(Math.floor(Math.random() * 225), true);
    };
    const onCellClick = (0, react_1.useCallback)((e) => {
        if (e.detail !== 0)
            return;
        const i = Number(e.currentTarget.dataset.i);
        placeRef.current?.(i, false);
    }, []);
    const onGridKey = (0, react_1.useCallback)((e) => {
        const el = e.target;
        if (!el.dataset || el.dataset.i === undefined)
            return;
        const i = Number(el.dataset.i);
        let n = i;
        if (e.key === 'ArrowRight')
            n = Math.min(224, i + 1);
        else if (e.key === 'ArrowLeft')
            n = Math.max(0, i - 1);
        else if (e.key === 'ArrowDown')
            n = Math.min(224, i + 15);
        else if (e.key === 'ArrowUp')
            n = Math.max(0, i - 15);
        else
            return;
        e.preventDefault();
        setFocusIdx(n);
        const target = el.parentElement?.querySelector(`[data-i="${n}"]`);
        target?.focus();
    }, []);
    /* ---------- answer */
    const line = current !== null ? lines[current] : null;
    const shareUrl = (n, src) => `${siteUrl}${locale === 'hi' ? '/hi/ram-shalaka' : '/ram-shalaka'}?utm_source=${src}&utm_medium=share&utm_campaign=rs-${n}`;
    const shareText = (l, src) => [l.deva.join('\n'), '', l.meaning, '', `${ui.srcPrefix}, ${l.source}`, `${ui.shareFoot}: ${shareUrl(l.n, src)}`].join('\n');
    const waHref = line ? `https://wa.me/?text=${encodeURIComponent(shareText(line, 'whatsapp'))}` : '#';
    const cardSrc = line ? (0, quotes_shared_1.cardImageUrl)(`rs-${line.n}`, { format: 'status', lang: locale, theme: 'night' }) : '';
    const cardSave = line ? (0, quotes_shared_1.cardImageUrl)(`rs-${line.n}`, { format: 'status', lang: locale, theme: 'night', download: true }) : '';
    const onCopy = async () => {
        if (!line)
            return;
        (0, mixpanel_1.trackEvent)('Shalaka Shared', { ...base, channel: 'copy', k: line.k });
        try {
            await navigator.clipboard.writeText(shareText(line, 'copy'));
        }
        catch {
            // clipboard blocked: nothing to do
        }
        setCopied(true);
        later(() => setCopied(false), 2400);
    };
    const onAgain = () => {
        if (mem.used >= core_1.RS_DAILY) {
            (0, mixpanel_1.trackEvent)('Daily Limit Reached', { ...base });
            goDone();
            return;
        }
        setQuestion('');
        setRepeatK(null);
        setChosen(null);
        setStep(0);
        setScreen('sankalp');
    };
    const toggleSound = () => {
        const v = !sound;
        setSound(v);
        soundOn.current = v;
        if (v)
            bell(1320, 0.4, 0.03);
    };
    const left = Math.max(0, core_1.RS_DAILY - mem.used);
    const seqForThread = chosen === null ? [] : (0, core_1.sequence)(chosen).slice(0, Math.max(1, step));
    const threadPts = seqForThread.map((c) => `${(c % 15) + 0.5},${Math.floor(c / 15) + 0.5}`).join(' ');
    const m = chosen === null ? 0 : (chosen - (chosen % 9)) / 9;
    const slots = (0, react_1.useMemo)(() => {
        const out = new Array(25).fill('');
        if (chosen === null)
            return out;
        const seq = (0, core_1.sequence)(chosen);
        for (let s = 0; s < Math.min(step, 25); s++)
            out[(m + s) % 25] = cells[seq[s]];
        return out;
    }, [chosen, step, m, cells]);
    const mala = (React.createElement("div", { className: "rs-mala" },
        React.createElement("ul", { "aria-label": `${ui.mala} ${mem.mala.length}/9` }, lines.map((l) => {
            const got = mem.mala.includes(l.k);
            const now = current === l.k;
            return (React.createElement("li", { key: l.k },
                React.createElement("a", { href: (0, core_1.lineHref)(l.slug), className: `rs-bead${got ? ' got' : ''}${now ? ' now' : ''}`, "aria-label": `${ui.malaBead} ${l.n}: ${l.deva[0].replace(/[।॥]/g, '')}`, "data-mp-location": "rs_mala", hrefLang: "hi" },
                    React.createElement("span", { "aria-hidden": "true" }))));
        })),
        React.createElement("small", null,
            ui.mala,
            " ",
            mem.mala.length,
            "/9")));
    return (React.createElement("div", { className: `rs-panel${moved ? ' moved' : ''}`, "data-screen": screen, ref: panelRef },
        React.createElement("div", { className: "rs-glow", "aria-hidden": "true" }),
        React.createElement("div", { className: "rs-bar" },
            React.createElement("div", { className: "rs-diyas", role: "img", "aria-label": `${ui.diyasLeft} ${left}/${core_1.RS_DAILY}` }, [0, 1, 2].map((i) => (React.createElement("span", { key: i, className: `rs-diya${i < mem.used ? ' out' : ''}` },
                React.createElement("i", null),
                React.createElement("b", null))))),
            React.createElement("div", { className: "rs-bar-r" },
                React.createElement("a", { className: "rs-chip", href: langHref, hrefLang: locale === 'hi' ? 'en' : 'hi', lang: locale === 'hi' ? 'en' : 'hi' }, ui.langSwitch),
                React.createElement("button", { type: "button", className: "rs-chip", "aria-pressed": sound, "aria-label": ui.soundAria, onClick: toggleSound }, ui.sound))),
        screen === 'sankalp' && (React.createElement("div", { className: "rs-screen" },
            React.createElement("p", { className: "rs-eyebrow" }, ui.eyebrow1),
            React.createElement("h2", { className: "rs-title", ref: headRef, tabIndex: -1 }, ui.sankalpTitle),
            React.createElement("p", { className: "rs-sub" }, ui.sankalpSub),
            React.createElement("label", { htmlFor: "rs-q", className: "rs-label" }, ui.qLabel),
            React.createElement("textarea", { id: "rs-q", className: "rs-q", value: question, placeholder: ui.qPh, maxLength: 300, autoComplete: "off", onChange: (e) => {
                    setQuestion(e.target.value);
                    setRepeatK(null);
                } }),
            React.createElement("button", { type: "button", className: "rs-btn", onClick: onSankalp }, ui.sankalpBtn),
            repeatK !== null && (React.createElement("div", { className: "rs-notice", role: "status" },
                ui.repeat,
                React.createElement("span", { className: "rs-notice-line", lang: "hi" }, lines[repeatK].deva.join(' ')),
                React.createElement("a", { href: (0, core_1.lineHref)(lines[repeatK].slug), "data-mp-location": "rs_repeat_line", hrefLang: "hi" }, ui.readLine))),
            React.createElement("p", { className: "rs-rule" }, ui.rule))),
        screen === 'dhyan' && (React.createElement("div", { className: "rs-screen" },
            React.createElement("h2", { className: "rs-eyebrow", ref: headRef, tabIndex: -1 }, ui.eyebrow2),
            React.createElement("div", { className: "rs-flame-wrap", "aria-hidden": "true" },
                React.createElement("div", { className: "rs-halo", ref: haloRef }),
                React.createElement("div", { className: "rs-lamp" }),
                React.createElement("div", { className: `rs-flame${holding ? '' : ' low'}` })),
            React.createElement("p", { className: "rs-naam", lang: "hi", "aria-label": naam.join(' ') }, naam.map((w, i) => (React.createElement("span", { key: i, className: i < lit ? 'lit' : undefined, "aria-hidden": "true" }, w)))),
            React.createElement("div", { className: "rs-hold" },
                React.createElement("button", { type: "button", className: "rs-btn", onPointerDown: (e) => {
                        e.preventDefault();
                        try {
                            e.currentTarget.setPointerCapture(e.pointerId);
                        }
                        catch {
                            // capture unsupported
                        }
                        dhyanDown();
                    }, onPointerUp: dhyanUp, onPointerCancel: dhyanUp, onKeyDown: (e) => {
                        if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
                            e.preventDefault();
                            dhyanDown();
                        }
                    }, onKeyUp: (e) => {
                        if (e.key === ' ' || e.key === 'Enter')
                            dhyanUp();
                    }, onContextMenu: (e) => e.preventDefault() }, ui.holdBtn),
                React.createElement("span", { className: "rs-ring", ref: ringRef, "aria-hidden": "true" })),
            React.createElement("p", { className: "rs-rule rs-center", "aria-live": "polite" }, dhyanEarly ? ui.dhyanEarly : ui.dhyanHint))),
        screen === 'shalaka' && (React.createElement("div", { className: "rs-screen" },
            React.createElement("h2", { className: "rs-eyebrow", ref: headRef, tabIndex: -1 }, ui.eyebrow3),
            React.createElement("p", { className: "rs-sub" }, veiled ? ui.shalakaSub : ui.shalakaOpen),
            React.createElement("div", { className: "rs-board", ref: boardRef, onPointerDown: boardDown, onPointerUp: boardUp, onPointerCancel: boardUp, onContextMenu: (e) => e.preventDefault() },
                React.createElement(Board, { cells: cells, cellWord: ui.cell, gridLabel: ui.gridLabel, veiled: veiled, chosen: chosen, step: step, focusIdx: focusIdx, onKey: onGridKey, onCellClick: onCellClick }),
                React.createElement("svg", { className: "rs-thread", viewBox: "0 0 15 15", preserveAspectRatio: "none", "aria-hidden": "true" },
                    React.createElement("polyline", { points: threadPts, vectorEffect: "non-scaling-stroke" })),
                React.createElement("button", { type: "button", className: `rs-veil${veiled ? '' : ' up'}`, "aria-label": ui.veilAria, tabIndex: veiled ? 0 : -1, "aria-hidden": !veiled, onClick: onVeilClick },
                    React.createElement("span", { className: "rs-naamlekh", "aria-hidden": "true", lang: "hi" }, 'राम '.repeat(240)),
                    React.createElement("span", { className: "rs-vlabel" }, ui.veilLabel)),
                React.createElement("div", { className: "rs-touch", ref: touchRef, "aria-hidden": "true" })),
            React.createElement("div", { className: "rs-slots", "aria-live": "polite", lang: "hi" }, slots.map((s, i) => (React.createElement("span", { key: i, className: `rs-slot${s ? ' f' : ''}` }, s)))),
            React.createElement("div", { className: "rs-under" }, chosen === null ? (React.createElement("button", { type: "button", className: "rs-linkbtn", onClick: () => setVeiled((v) => !v) }, veiled ? ui.liftBtn : ui.coverBtn)) : (React.createElement("span", { className: "rs-small" }, ui.counting))))),
        screen === 'uttar' && line && (React.createElement("div", { className: "rs-screen rs-answer" },
            React.createElement("span", { className: "rs-rule-draw", "aria-hidden": "true" }),
            React.createElement("h2", { className: "rs-eyebrow", ref: headRef, tabIndex: -1 }, ui.eyebrow4),
            script === 'deva' ? (React.createElement("p", { className: "rs-chaupai", lang: "hi" },
                React.createElement("span", null, line.deva[0]),
                React.createElement("span", null, line.deva[1]))) : (React.createElement("p", { className: "rs-chaupai iast", lang: "hi-Latn" },
                React.createElement("span", null,
                    line.iast[0],
                    ","),
                React.createElement("span", null, line.iast[1]))),
            React.createElement("p", { className: "rs-src" },
                ui.srcPrefix,
                " \u00B7 ",
                line.source),
            React.createElement("div", { className: "rs-chiprow" },
                React.createElement("span", { className: `rs-phal ${line.sign}` },
                    ui.tradition,
                    ": ",
                    line.signText),
                React.createElement("button", { type: "button", className: "rs-chip", "aria-pressed": script === 'iast', onClick: () => setScript((s) => (s === 'deva' ? 'iast' : 'deva')) }, script === 'deva' ? 'IAST' : 'देवनागरी')),
            React.createElement("p", { className: "rs-mean" }, line.meaning),
            React.createElement("div", { className: "rs-tabs", role: "tablist" },
                React.createElement("button", { type: "button", role: "tab", id: "rs-tab-you", "aria-selected": tab === 'you', "aria-controls": "rs-panel", className: "rs-tab", onClick: () => setTab('you') }, ui.tabYou),
                React.createElement("button", { type: "button", role: "tab", id: "rs-tab-scene", "aria-selected": tab === 'scene', "aria-controls": "rs-panel", className: "rs-tab", onClick: () => {
                        if (tab !== 'scene')
                            (0, mixpanel_1.trackEvent)('Prasang Opened', { ...base, k: line.k });
                        setTab('scene');
                    } }, ui.tabScene)),
            React.createElement("p", { className: "rs-tabpanel", id: "rs-panel", role: "tabpanel", "aria-labelledby": tab === 'you' ? 'rs-tab-you' : 'rs-tab-scene' }, tab === 'you' ? line.forYou : line.scene),
            expert && React.createElement("p", { className: "rs-expert" }, ui.expertNote),
            mala,
            React.createElement("div", { className: "rs-acts" },
                React.createElement("a", { className: "rs-btn", href: (0, core_1.planHref)(line.n), onClick: () => (0, mixpanel_1.trackEventBeacon)('Plan From Chaupai', { ...base, k: line.k }) }, ui.planBtn),
                React.createElement("div", { className: "rs-acts-row" },
                    React.createElement("button", { type: "button", className: "rs-btn quiet", ref: shareRef, onClick: () => {
                            (0, mixpanel_1.trackEvent)('Shalaka Shared', { ...base, channel: 'card', k: line.k });
                            setModal(true);
                        } }, ui.shareBtn),
                    React.createElement("a", { className: "rs-btn quiet", href: waHref, target: "_blank", rel: "noopener", onClick: () => (0, mixpanel_1.trackEventBeacon)('Shalaka Shared', { ...base, channel: 'whatsapp', k: line.k }) }, ui.waBtn)),
                React.createElement("a", { className: "rs-btn ghost", href: (0, core_1.lineHref)(line.slug), hrefLang: "hi", "data-mp-location": "rs_answer_line" }, ui.readLine),
                React.createElement("button", { type: "button", className: "rs-btn ghost", onClick: onAgain },
                    ui.again,
                    " \u00B7 ",
                    left,
                    " ",
                    ui.left)),
            React.createElement("div", { className: "rs-next" },
                React.createElement(NextStep_1.default, { locale: locale, pageName: pageKey, pageKey: pageKey, placement: "answer", copy: next })))),
        screen === 'done' && (React.createElement("div", { className: "rs-screen rs-done" },
            React.createElement("div", { className: "rs-flame-wrap small", "aria-hidden": "true" },
                React.createElement("div", { className: "rs-halo" }),
                React.createElement("div", { className: "rs-lamp" }),
                React.createElement("div", { className: "rs-flame low" })),
            React.createElement("h2", { className: "rs-title rs-center", ref: headRef, tabIndex: -1 }, ui.doneTitle),
            React.createElement("p", { className: "rs-sub rs-center" }, ui.doneSub),
            React.createElement("p", { className: "rs-rule rs-center" },
                ui.resetAt,
                " ",
                resetText),
            mala,
            line && (React.createElement("div", { className: "rs-acts" },
                React.createElement("button", { type: "button", className: "rs-btn ghost", onClick: () => setScreen('uttar') }, ui.seeMala))))),
        modal && line && (React.createElement("div", { className: "rs-modal", role: "dialog", "aria-modal": "true", "aria-label": ui.cardTitle, onClick: (e) => e.target === e.currentTarget && setModal(false) },
            React.createElement("div", { className: "rs-modal-box" },
                React.createElement("img", { className: "rs-card-img", src: cardSrc, alt: ui.cardAlt, width: 1080, height: 1920 }),
                React.createElement("div", { className: "rs-acts" },
                    React.createElement("a", { className: "rs-btn", href: cardSave, download: `ram-shalaka-${line.slug}.png`, onClick: () => (0, mixpanel_1.trackEventBeacon)('Shalaka Shared', { ...base, channel: 'save_image', k: line.k }) }, ui.saveImage),
                    React.createElement("div", { className: "rs-acts-row" },
                        React.createElement("button", { type: "button", className: "rs-btn quiet", onClick: onCopy, "aria-live": "polite" }, copied ? ui.copied : ui.copyBtn),
                        React.createElement("button", { type: "button", className: "rs-btn quiet", ref: closeRef, onClick: () => {
                                setModal(false);
                                shareRef.current?.focus();
                            } }, ui.close))))))));
}
; mods['ritual'] = module.exports })();
var P = {"hi":{"locale":"hi","pageKey":"ram-shalaka","cells":["सु","प्र","उ","बि","हो","मु","ग","ब","सु","नु","बि","घ","धि","इ","द","र","रु","फ","सि","सि","रहिं","बस","हि","मं","ल","न","ल","य","न","अं","सुज","सो","ग","सु","कु","म","स","ग","त","न","इ","ल","धा","बे","नो","त्य","र","न","कु","जो","म","रि","र","र","अ","की","हो","सं","रा","य","पु","सु","थ","सी","जे","इ","ग","म","सं","क","रे","हो","स","स","नि","त","र","त","र","स","हुँ","ह","ब","ब","प","चि","स","हिं","स","तु","म","का","ा","र","र","म","मि","मी","म्हा","ा","जा","हू","हीं","ा","ा","ता","रा","रे","री","हृ","का","फ","खा","जू","ई","र","रा","पू","द","ल","नि","को","जो","गो","न","मु","जि","यँ","ने","मनि","क","ज","प","स","ल","हि","रा","मि","स","रि","ग","द","न्मु","ख","म","खि","जि","म","त","जं","सिं","ख","नु","न","को","मि","निज","र्क","ग","धु","ध","सु","का","स","र","गु","ब","म","अ","रि","नि","म","ल","ा","न","ढ़","ती","न","क","भ","ना","पु","व","अ","ा","र","ल","ा","ए","तु","र","न","नु","वै","थ","सि","हुँ","सु","म्ह","रा","र","स","स","र","त","न","ख","ा","ज","ा","र","ा","ा","ला","धी","ा","री","ा","हू","हीं","खा","जू","ई","रा","रे"],"ui":{"eyebrow1":"श्रीराम शलाका प्रश्नावली","sankalpTitle":"मन में एक प्रश्न रखें","sankalpSub":"श्रीराम का स्मरण करें। प्रश्न लिखना ज़रूरी नहीं। लिखेंगे तो यह इसी फ़ोन पर रहेगा।","qLabel":"आपका प्रश्न (वैकल्पिक)","qPh":"जैसे: क्या मुझे यह नौकरी बदलनी चाहिए?","sankalpBtn":"प्रश्न मन में है","rule":"परंपरा: शुद्ध मन से पूछें। एक प्रश्न एक ही बार। दिन में तीन प्रश्न।","eyebrow2":"ध्यान","holdBtn":"दबाकर रखें","dhyanHint":"श्रीराम का नाम पूरा होने तक थामे रहें","dhyanEarly":"थोड़ा और ठहरें","eyebrow3":"शलाका","shalakaSub":"आँखें मूँदें। पर्दे पर कहीं भी उँगली टिकाकर थामे रहें।","shalakaOpen":"किसी भी खाने पर उँगली टिकाकर थामे रहें।","veilLabel":"यहाँ उँगली टिकाएँ","veilAria":"ढकी हुई तालिका पर शलाका रखें","liftBtn":"पर्दा हटाकर चुनें","coverBtn":"पर्दा वापस डालें","counting":"हर नौवाँ अक्षर गिना जा रहा है","cell":"खाना","gridLabel":"श्रीराम शलाका तालिका, 15 × 15","eyebrow4":"आपकी चौपाई","srcPrefix":"श्रीरामचरितमानस","tradition":"परंपरा","tabYou":"आज आपके लिए","tabScene":"प्रसंग","planBtn":"इस चौपाई से 7 दिन का पाठ","shareBtn":"शेयर कार्ड","waBtn":"WhatsApp पर भेजें","readLine":"पूरी चौपाई और प्रसंग पढ़ें","again":"एक और प्रश्न","left":"बचे","doneTitle":"आज के तीन प्रश्न पूरे हुए","doneSub":"परंपरा कहती है, दिन में तीन से अधिक नहीं। जो मिला है उस पर मनन करें।","seeMala":"अपनी मानस माला देखें","resetAt":"दीप प्रातः 4 बजे (ब्रह्म मुहूर्त) फिर जलेंगे। बचा समय:","mala":"मानस माला","malaBead":"चौपाई","repeat":"यह प्रश्न आज पूछा जा चुका है। तब यह चौपाई मिली थी:","diyasLeft":"आज के प्रश्न बचे:","sound":"ध्वनि","soundAria":"घंटी की ध्वनि","cardTitle":"शेयर कार्ड","cardAlt":"इस चौपाई का शेयर कार्ड","saveImage":"इमेज सेव करें","copyBtn":"चौपाई कॉपी करें","copied":"चौपाई कॉपी हुई","close":"बंद करें","expertNote":"शलाका मन को दिशा देती है। स्वास्थ्य, क़ानून या पैसे के निर्णय में विशेषज्ञ की सलाह भी लें।","shareFoot":"श्रीराम शलाका प्रश्नावली","noscript":"शलाका की विधि के लिए इस ब्राउज़र में JavaScript चालू करें। नीचे पूरी तालिका और नौ उत्तर इसके बिना भी पढ़ सकते हैं।","langSwitch":"English"},"naam":["श्री","राम","जय","राम","जय","जय","राम"],"next":{"app":{"line":"हर सुबह एक पंक्ति, आपके iPhone पर।","cta":"हर सुबह एक पंक्ति पाएं"},"whatsapp":{"line":"हर सुबह मानस की एक पंक्ति, WhatsApp पर।","cta":"रोज़ एक चौपाई"},"email":{"line":"आपकी बात के लिए एक हफ़्ते की पंक्तियाँ, ईमेल पर।","cta":"मेरा हफ़्ता भेजें"}},"langHref":"#","siteUrl":"https://wisdomquotes.in","lines":[{"n":1,"k":0,"slug":"sunu-siya-satya-asis-hamari","sign":"shubh","deva":["सुनु सिय सत्य असीस हमारी।","पूजिहि मन कामना तुम्हारी॥"],"iast":["sunu siya satya asīsa hamārī","pūjihi mana kāmanā tumhārī"],"source":"बालकाण्ड · पुष्पवाटिका · माँ गौरी, सीता जी से","meaning":"हे सीता, हमारी सच्ची आशीष सुनो, तुम्हारी मनोकामना पूरी होगी।","scene":"जनकपुर की पुष्पवाटिका में सीता जी गौरी माँ के मंदिर गईं और मन ही मन श्रीराम को माँगा। माँ की मूर्ति मुस्कुराई, उसकी माला खिसक कर गिरी, और यह आशीष मिली।","forYou":"जो आपने सच्चे मन से माँगा है, वह मिलेगा। अपनी प्रार्थना पर भरोसा रखें।","signText":"शुभ संकेत · कार्य सिद्ध होगा"},{"n":2,"k":1,"slug":"prabisi-nagar-kije-sab-kaja","sign":"shubh","deva":["प्रबिसि नगर कीजे सब काजा।","हृदयँ राखि कोसलपुर राजा॥"],"iast":["prabisi nagara kīje saba kājā","hṛdayã rākhi kosalapura rājā"],"source":"सुन्दरकाण्ड · लंका का द्वार · लंकिनी, हनुमान जी से","meaning":"नगर में प्रवेश करके, कोसलपुर के राजा श्रीराम को हृदय में रखकर सब काम कीजिए।","scene":"हनुमान जी रात में लंका में प्रवेश कर रहे थे। द्वार पर लंकिनी ने रोका। उनके एक मुक्के से उसका अहंकार टूटा, और उसी ने यह कहकर उन्हें भीतर भेजा।","forYou":"आरंभ करें। राम को हृदय में रखकर हर कदम उठाएँ।","signText":"शुभ संकेत · आरंभ करें"},{"n":3,"k":2,"slug":"ugharahin-ant-na-hoi-nibahu","sign":"ashubh","deva":["उघरहिं अंत न होइ निबाहू।","कालनेमि जिमि रावन राहू॥"],"iast":["ugharahiṃ anta na hoi nibāhū","kālanemi jimi rāvana rāhū"],"source":"बालकाण्ड · आरंभ की वंदना · गोस्वामी तुलसीदास","meaning":"कपट अंत में खुल जाता है, उसका निबाह नहीं होता, जैसे कालनेमि, रावण और राहु का हुआ।","scene":"तुलसीदास कहते हैं कि जो अच्छा वेश धरकर ठगते हैं, उनका कपट अंत में खुलता है। कालनेमि साधु बनकर हनुमान को रोकना चाहता था, राहु देवता बनकर अमृत पी गया, रावण साधु बनकर सीता को ले गया।","forYou":"इस काम में कहीं कपट है, आपका या किसी और का। आगे बढ़ने से पहले उसे सुधारें।","signText":"अभी नहीं · रुकें और जाँचें"},{"n":4,"k":3,"slug":"bidhi-bas-sujan-kusangat-parahin","sign":"sanshay","deva":["बिधि बस सुजन कुसंगत परहीं।","फनि मनि सम निज गुन अनुसरहीं॥"],"iast":["bidhi basa sujana kusaṃgata parahīṃ","phani mani sama nija guna anusarahīṃ"],"source":"बालकाण्ड · सत्संग और कुसंग · गोस्वामी तुलसीदास","meaning":"विधि के वश सज्जन कुसंग में पड़ जाते हैं, पर साँप के फन की मणि की तरह अपना गुण नहीं छोड़ते।","scene":"मानस के आरंभ में तुलसीदास सत्संग और कुसंग की बात करते हैं। संयोग से सज्जन बुरी संगत में पड़ भी जाएँ, तो भी अपना स्वभाव नहीं छोड़ते।","forYou":"इस काम से जुड़े लोगों को परखें। संगत ठीक न हो तो भी अपना स्वभाव न छोड़ें।","signText":"संशय · संगत परखें"},{"n":5,"k":4,"slug":"hoihi-soi-jo-ram-rachi-rakha","sign":"sanshay","deva":["होइहि सोइ जो राम रचि राखा।","को करि तर्क बढ़ावै साखा॥"],"iast":["hoihi soi jo rāma raci rākhā","ko kari tarka baṛhāvai sākhā"],"source":"बालकाण्ड · सती का संशय · भगवान शिव","meaning":"जो राम ने रच रखा है वही होगा। तर्क करके बात की शाखाएँ कौन बढ़ाए।","scene":"सती जी शिव जी के समझाने पर भी श्रीराम की परीक्षा लेने चली गईं। शिव जी ने तर्क छोड़ दिया, यह चौपाई कही, और राम-नाम जपने लगे।","forYou":"जो आपके हाथ में था, कर लिया। अब परिणाम से बहस न करें, प्रतीक्षा करें और नाम जपें।","signText":"संशय · परिणाम प्रभु पर छोड़ें"},{"n":6,"k":5,"slug":"mud-mangalmay-sant-samaju","sign":"shubh","deva":["मुद मंगलमय संत समाजू।","जो जग जंगम तीरथराजू॥"],"iast":["muda maṃgalamaya saṃta samājū","jo jaga jaṃgama tīratharājū"],"source":"बालकाण्ड · संत समाज की वंदना · गोस्वामी तुलसीदास","meaning":"संतों का समाज आनंद और मंगल से भरा है, जो संसार में चलता-फिरता तीर्थराज प्रयाग है।","scene":"मानस के आरंभ में तुलसीदास संत समाज की वंदना करते हैं। वे कहते हैं कि सत्संग चलता-फिरता प्रयागराज है, जिसमें राम-भक्ति गंगा की धारा है।","forYou":"कार्य शुभ है। इसे अच्छे लोगों के साथ और उनकी सलाह से करें।","signText":"शुभ संकेत · मंगल होगा"},{"n":7,"k":6,"slug":"garal-sudha-ripu-karahin-mitai","sign":"shubh","deva":["गरल सुधा रिपु करहिं मिताई।","गोपद सिंधु अनल सितलाई॥"],"iast":["garala sudhā ripu karahiṃ mitāī","gopada siṃdhu anala sitalāī"],"source":"सुन्दरकाण्ड · लंका का द्वार · लंकिनी, हनुमान जी से","meaning":"जिसके हृदय में राम हों, उसके लिए विष अमृत हो जाता है, शत्रु मित्र बन जाते हैं, समुद्र गाय के खुर जितना और आग शीतल हो जाती है।","scene":"हनुमान जी को भीतर भेजते हुए लंकिनी आगे कहती है कि जिसके हृदय में राम बसते हैं, उसके लिए हर कठिनाई उलट जाती है।","forYou":"रास्ते की बाधाएँ जितनी बड़ी दिखती हैं, उतनी हैं नहीं। मन स्थिर रखकर आगे बढ़ें।","signText":"शुभ संकेत · बाधाएँ हटेंगी"},{"n":8,"k":7,"slug":"barun-kuber-sures-samira","sign":"ashubh","deva":["बरुन कुबेर सुरेस समीरा।","रन सन्मुख धरि काहुँ न धीरा॥"],"iast":["baruna kubera suresa samīrā","rana sanmukha dhari kāhũ na dhīrā"],"source":"लंकाकाण्ड · मंदोदरी का विलाप · मंदोदरी, रावण के लिए","meaning":"वरुण, कुबेर, इंद्र और वायु, इनमें से कोई भी युद्ध में तुम्हारे सामने धैर्य न रख सका।","scene":"युद्ध के बाद मंदोदरी रावण के शरीर के पास विलाप करती है। वह याद करती है कि देवता भी उसके सामने टिक न सके, फिर भी राम से वैर ने सब छीन लिया।","forYou":"ताक़त अकेली काफ़ी नहीं होती, रावण के पास सब था। पूछिए कि यह कार्य धर्म के अनुकूल है या नहीं।","signText":"अभी नहीं · रुकें और जाँचें"},{"n":9,"k":8,"slug":"suphal-manorath-hohun-tumhare","sign":"shubh","deva":["सुफल मनोरथ होहुँ तुम्हारे।","रामु लखनु सुनि भए सुखारे॥"],"iast":["suphala manoratha hohũ tumhāre","rāmu lakhanu suni bhae sukhāre"],"source":"बालकाण्ड · गुरु का आशीर्वाद · विश्वामित्र, राम-लक्ष्मण से","meaning":"तुम्हारे मनोरथ सफल हों। यह सुनकर राम और लक्ष्मण प्रसन्न हुए।","scene":"उसी सुबह राम और लक्ष्मण गुरु विश्वामित्र की पूजा के लिए फूल लाए। गुरु ने फूल लेकर पूजा की और दोनों भाइयों को यह आशीष दी।","forYou":"आपकी मेहनत और सेवा देखी गई है। मनोरथ सफल होगा।","signText":"शुभ संकेत · मनोरथ सफल होगा"}]},"en":{"locale":"en","pageKey":"ram-shalaka-en","cells":["सु","प्र","उ","बि","हो","मु","ग","ब","सु","नु","बि","घ","धि","इ","द","र","रु","फ","सि","सि","रहिं","बस","हि","मं","ल","न","ल","य","न","अं","सुज","सो","ग","सु","कु","म","स","ग","त","न","इ","ल","धा","बे","नो","त्य","र","न","कु","जो","म","रि","र","र","अ","की","हो","सं","रा","य","पु","सु","थ","सी","जे","इ","ग","म","सं","क","रे","हो","स","स","नि","त","र","त","र","स","हुँ","ह","ब","ब","प","चि","स","हिं","स","तु","म","का","ा","र","र","म","मि","मी","म्हा","ा","जा","हू","हीं","ा","ा","ता","रा","रे","री","हृ","का","फ","खा","जू","ई","र","रा","पू","द","ल","नि","को","जो","गो","न","मु","जि","यँ","ने","मनि","क","ज","प","स","ल","हि","रा","मि","स","रि","ग","द","न्मु","ख","म","खि","जि","म","त","जं","सिं","ख","नु","न","को","मि","निज","र्क","ग","धु","ध","सु","का","स","र","गु","ब","म","अ","रि","नि","म","ल","ा","न","ढ़","ती","न","क","भ","ना","पु","व","अ","ा","र","ल","ा","ए","तु","र","न","नु","वै","थ","सि","हुँ","सु","म्ह","रा","र","स","स","र","त","न","ख","ा","ज","ा","र","ा","ा","ला","धी","ा","री","ा","हू","हीं","खा","जू","ई","रा","रे"],"ui":{"eyebrow1":"Shri Ram Shalaka Prashnavali","sankalpTitle":"Hold one question in your heart","sankalpSub":"Remember Shri Ram. You don't need to type it. If you do, it stays on this phone.","qLabel":"Your question (optional)","qPh":"For example: should I change this job?","sankalpBtn":"My question is ready","rule":"Tradition: ask with a clear mind. Each question once. Three questions a day.","eyebrow2":"Dhyan","holdBtn":"Press and hold","dhyanHint":"Keep holding until Ram's name is complete","dhyanEarly":"Stay a little longer","eyebrow3":"Shalaka","shalakaSub":"Close your eyes. Rest your finger anywhere on the cloth and keep it there.","shalakaOpen":"Rest your finger on any square and keep it there.","veilLabel":"Rest your finger here","veilAria":"Place the shalaka on the covered grid","liftBtn":"Lift the cloth and choose","coverBtn":"Cover the grid again","counting":"Counting every ninth syllable","cell":"Square","gridLabel":"Shri Ram Shalaka grid, 15 by 15","eyebrow4":"Your chaupai","srcPrefix":"Ramcharitmanas","tradition":"Tradition","tabYou":"For you today","tabScene":"The scene","planBtn":"A 7-day reading from this line","shareBtn":"Share card","waBtn":"Send on WhatsApp","readLine":"Read the full chaupai and its scene","again":"Ask another","left":"left","doneTitle":"Today's three questions are done","doneSub":"Tradition asks for no more than three a day. Sit with what you received.","seeMala":"See your Manas mala","resetAt":"The diyas relight at 4 AM (Brahma muhurta). Time left:","mala":"Manas mala","malaBead":"Chaupai","repeat":"You asked this today already. The chaupai then was:","diyasLeft":"Questions left today:","sound":"Sound","soundAria":"Bell sound","cardTitle":"Share card","cardAlt":"Share card for this chaupai","saveImage":"Save image","copyBtn":"Copy chaupai","copied":"Chaupai copied","close":"Close","expertNote":"The shalaka gives the mind a direction. For health, legal or money decisions, take an expert's advice as well.","shareFoot":"Shri Ram Shalaka Prashnavali","noscript":"Turn on JavaScript in this browser for the shalaka ritual. The full grid and the nine answers below work without it.","langSwitch":"हिन्दी"},"naam":["श्री","राम","जय","राम","जय","जय","राम"],"next":{"app":{"line":"A line each morning, on your iPhone.","cta":"Get a line each morning"},"whatsapp":{"line":"A line from the Manas each morning, on WhatsApp.","cta":"A chaupai a day"},"email":{"line":"A week of lines for what you're going through, in your inbox.","cta":"Send my week"}},"langHref":"#","siteUrl":"https://wisdomquotes.in","lines":[{"n":1,"k":0,"slug":"sunu-siya-satya-asis-hamari","sign":"shubh","deva":["सुनु सिय सत्य असीस हमारी।","पूजिहि मन कामना तुम्हारी॥"],"iast":["sunu siya satya asīsa hamārī","pūjihi mana kāmanā tumhārī"],"source":"Bal Kand · the garden in Janakpur · Goddess Gauri, to Sita","meaning":"Listen, Sita, my blessing is true: the wish in your heart will be fulfilled.","scene":"In Janakpur's garden, Sita went to Gauri's shrine and silently asked for Ram. The goddess smiled, her garland slipped down, and she gave this blessing.","forYou":"What you asked for with a true heart will come. Trust your prayer.","signText":"Auspicious · it will come through"},{"n":2,"k":1,"slug":"prabisi-nagar-kije-sab-kaja","sign":"shubh","deva":["प्रबिसि नगर कीजे सब काजा।","हृदयँ राखि कोसलपुर राजा॥"],"iast":["prabisi nagara kīje saba kājā","hṛdayã rākhi kosalapura rājā"],"source":"Sundar Kand · the gate of Lanka · Lankini, to Hanuman","meaning":"Enter the city and do all your work, keeping the King of Kosala in your heart.","scene":"Hanuman was slipping into Lanka by night. Lankini, its guardian, blocked him. One blow broke her pride, and she herself sent him in with these words.","forYou":"Begin. Take each step with Ram in your heart.","signText":"Auspicious · begin"},{"n":3,"k":2,"slug":"ugharahin-ant-na-hoi-nibahu","sign":"ashubh","deva":["उघरहिं अंत न होइ निबाहू।","कालनेमि जिमि रावन राहू॥"],"iast":["ugharahiṃ anta na hoi nibāhū","kālanemi jimi rāvana rāhū"],"source":"Bal Kand · the opening · Goswami Tulsidas","meaning":"Pretense is exposed in the end and cannot last, as it was with Kalanemi, Ravana and Rahu.","scene":"Tulsidas says those who wear a good disguise to deceive are exposed in the end. Kalanemi posed as a sage to stop Hanuman, Rahu as a god to drink nectar, Ravana as a monk to take Sita.","forYou":"Somewhere in this there is pretense, yours or someone else's. Set it right before you go further.","signText":"Not now · pause and look again"},{"n":4,"k":3,"slug":"bidhi-bas-sujan-kusangat-parahin","sign":"sanshay","deva":["बिधि बस सुजन कुसंगत परहीं।","फनि मनि सम निज गुन अनुसरहीं॥"],"iast":["bidhi basa sujana kusaṃgata parahīṃ","phani mani sama nija guna anusarahīṃ"],"source":"Bal Kand · on good and bad company · Goswami Tulsidas","meaning":"By fate, good people fall into bad company, yet like the gem in a serpent's hood they keep their own nature.","scene":"In the opening of the Manas, Tulsidas speaks of good and bad company. Chance may place good people among the wrong ones, but they keep their nature.","forYou":"Look closely at the people around this. Even if the company is wrong, keep your own nature.","signText":"Uncertain · look at the company around it"},{"n":5,"k":4,"slug":"hoihi-soi-jo-ram-rachi-rakha","sign":"sanshay","deva":["होइहि सोइ जो राम रचि राखा।","को करि तर्क बढ़ावै साखा॥"],"iast":["hoihi soi jo rāma raci rākhā","ko kari tarka baṛhāvai sākhā"],"source":"Bal Kand · Sati's doubt · Lord Shiva","meaning":"What Ram has ordained will come to pass. Why grow more branches by arguing?","scene":"Sati went to test Ram although Shiva had advised against it. Shiva stopped arguing, said this, and turned to chanting Ram's name.","forYou":"You have done what was in your hands. Stop arguing with the outcome; wait, and remember the Name.","signText":"Uncertain · leave the outcome to Ram"},{"n":6,"k":5,"slug":"mud-mangalmay-sant-samaju","sign":"shubh","deva":["मुद मंगलमय संत समाजू।","जो जग जंगम तीरथराजू॥"],"iast":["muda maṃgalamaya saṃta samājū","jo jaga jaṃgama tīratharājū"],"source":"Bal Kand · praise of the company of saints · Goswami Tulsidas","meaning":"The company of saints is joy and blessing itself, a Prayag that walks the earth.","scene":"At the start of the Manas, Tulsidas honours the company of saints: a Prayag that walks, with devotion to Ram as its Ganga.","forYou":"The work is auspicious. Do it with good people and take their counsel.","signText":"Auspicious · it will go well"},{"n":7,"k":6,"slug":"garal-sudha-ripu-karahin-mitai","sign":"shubh","deva":["गरल सुधा रिपु करहिं मिताई।","गोपद सिंधु अनल सितलाई॥"],"iast":["garala sudhā ripu karahiṃ mitāī","gopada siṃdhu anala sitalāī"],"source":"Sundar Kand · the gate of Lanka · Lankini, to Hanuman","meaning":"For one who holds Ram in the heart, poison turns to nectar, enemies turn friendly, the ocean shrinks to a calf's hoofprint and fire turns cool.","scene":"Sending Hanuman in, Lankini goes on: for the one who carries Ram within, every hardship turns around.","forYou":"The obstacles are smaller than they look. Keep your mind steady and go on.","signText":"Auspicious · obstacles will ease"},{"n":8,"k":7,"slug":"barun-kuber-sures-samira","sign":"ashubh","deva":["बरुन कुबेर सुरेस समीरा।","रन सन्मुख धरि काहुँ न धीरा॥"],"iast":["baruna kubera suresa samīrā","rana sanmukha dhari kāhũ na dhīrā"],"source":"Lanka Kand · Mandodari's lament · Mandodari, over Ravana","meaning":"Varuna, Kubera, Indra and Vayu: none of them could hold steady before you in battle.","scene":"After the war, Mandodari mourns over Ravana. She recalls that even the gods could not stand before him, and yet his enmity with Ram cost him everything.","forYou":"Strength alone is not enough; Ravana had all of it. Ask whether this is right, as well as whether you can.","signText":"Not now · pause and look again"},{"n":9,"k":8,"slug":"suphal-manorath-hohun-tumhare","sign":"shubh","deva":["सुफल मनोरथ होहुँ तुम्हारे।","रामु लखनु सुनि भए सुखारे॥"],"iast":["suphala manoratha hohũ tumhāre","rāmu lakhanu suni bhae sukhāre"],"source":"Bal Kand · the guru's blessing · Vishwamitra, to Ram and Lakshman","meaning":"May your hopes bear fruit. Hearing this, Ram and Lakshman were glad.","scene":"That same morning Ram and Lakshman brought flowers for their guru's worship. Vishwamitra accepted them and blessed the brothers.","forYou":"Your effort and service have been seen. Your hope will bear fruit.","signText":"Auspicious · your hope will bear fruit"}]}};
var loc = location.hash === '#en' ? 'en' : 'hi';
document.documentElement.lang = loc;
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(mods['ritual'].default, P[loc]));
})();
