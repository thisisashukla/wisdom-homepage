"""Word for word for the library verses sanscripts never parsed (Mahabharata, Yoga Vasishtha, Bhartrihari,
the Upanishads, most of the Valmiki Ramayana, Tulsi, Surdas, Meera...). build_verse_words.py only reads
sanscripts' `translation_literal`, which exists for the Gita, the Ramcharitmanas and part of the Valmiki
Ramayana, so about two thirds of the library had none and the day screen's turned card fell back to the
plain translation.

Asks the LLM for the same slash format sanscripts used ("word (meaning) / word (meaning)"), then keeps a
verse only when its words really are the original's words, in order, covering most of it (sandhi and
compounds stay one entry). Rejects go to the review file with the reason.

    python3 scripts/fill_verse_words.py --sample 8          # a few per text, to read before a full run
    python3 scripts/fill_verse_words.py                     # every verse still missing
    python3 scripts/build_verse_words.py                    # then merge into verse_words.json

Writes data/taxonomy/verse_words_llm.json ({id: [[surface, gloss], ...]}) and out/verse_words_llm_review.jsonl.
Resumable: verses already in verse_words_llm.json are skipped.
"""
import argparse, collections, difflib, json, os, re, sys, time, unicodedata, urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "data" / "taxonomy" / "wisdom_library.json"
HAVE = ROOT / "data" / "taxonomy" / "verse_words.json"
OUT = ROOT / "data" / "taxonomy" / "verse_words_llm.json"
REVIEW = ROOT / "out" / "verse_words_llm_review.jsonl"

LANG = {
    "mbh": "Sanskrit (Mahabharata)", "yv": "Sanskrit (Yoga Vasishtha)", "bh": "Sanskrit (Bhartrihari's Shatakas)",
    "up": "Sanskrit (Upanishad)", "vr": "Sanskrit (Valmiki Ramayana)", "gitas": "Sanskrit", "bg": "Sanskrit",
    "rcm": "Awadhi (Tulsidas, Ramcharitmanas)", "tulsi": "Awadhi/Braj (Tulsidas)", "sur": "Braj Bhasha (Surdas)",
    "meera": "Rajasthani/Braj (Meera)", "kabir": "Sadhukkadi Hindi (Kabir)", "rahim": "Braj/Awadhi (Rahim)",
}

SYSTEM = """You give a verse word by word, for a reader who knows no Sanskrit or old Hindi.

Output JSON only: {"literal": "word (meaning) / word (meaning) / ..."}

Rules
- Go through the verse in its own order, every word, nothing skipped, nothing added.
- Copy each word exactly as it is written in the verse, in Devanagari. Where sandhi joins words, or a compound
  (samasa) is written as one word, keep it as ONE entry exactly as written; do not split or re-spell it.
- The meaning in brackets: 1 to 5 plain English words, its sense in THIS verse. No grammar labels, no Sanskrit.
- Separate entries with " / ". Leave out danda marks (। ॥) and verse numbers.
- Never smooth it into prose.

Example
Verse: धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः
{"literal": "धर्मक्षेत्रे (on the field of dharma) / कुरुक्षेत्रे (at Kurukshetra) / समवेता (gathered) / युयुत्सवः (eager to fight)"}"""

CHUNK = re.compile(r"^\s*(.*?)\s*\((.*)\)\s*$")
DEVA = re.compile(r"[ऀ-ॣ०-ॿ]")       # Devanagari, without the dandas


def parse(lit: str):
    out = []
    for ch in (lit or "").split(" / "):
        m = CHUNK.match(ch.strip(" ।॥|"))
        if m and m.group(1):
            s, g = m.group(1).strip(" ।॥|,;"), m.group(2).strip()
            if s and g and len(g) < 80:
                out.append([s, g])
    return out


def letters(s: str) -> str:
    s = unicodedata.normalize("NFC", s or "")
    return "".join(c for c in s if DEVA.match(c) and not ("०" <= c <= "९"))   # no digits, spaces, marks


def check(orig: str, pairs):
    """The words must be the original's, in order: nothing in it skipped, little added. Split sandhi is fine
    (the Gita's data is split the same way: कर्मण्येवाधिकारस्ते → कर्मणि / एव / अधिकारः / ते), so this compares
    letter runs, not whole words."""
    if not 2 <= len(pairs) <= 48:
        return False, f"{len(pairs)} words"
    o = letters(orig)
    if not o:
        return False, "no Devanagari original"
    w = "".join(letters(x) for x, _ in pairs)
    sm = difflib.SequenceMatcher(None, o, w, autojunk=False)
    same = sum(b.size for b in sm.get_matching_blocks())
    cover = same / len(o)                 # how much of the original is there
    extra = (len(w) - same) / len(o)      # how much is not in the original (sandhi restores a little)
    if cover < 0.92:                      # below this a dropped न or मा slips through (नामृता read as "immortal")
        return False, f"covers {cover:.0%} of the original"
    if extra > 0.25:
        return False, f"{extra:.0%} added beyond the original"
    return True, f"ok (cover {cover:.0%}, extra {extra:.0%})"


def skipped(orig: str, pairs) -> list:
    """Stretches of the original (2+ letters) with nothing for them in the answer, to name in a retry."""
    o = letters(orig)
    w = "".join(letters(x) for x, _ in pairs)
    out = []
    for tag, i1, i2, _, _ in difflib.SequenceMatcher(None, o, w, autojunk=False).get_opcodes():
        if tag in ("delete", "replace") and i2 - i1 >= 2:
            out.append(o[max(0, i1 - 2):i2 + 2])
    return out[:8]


def ask(key: str, model: str, verse: dict, tries: int = 3, missed: list | None = None):
    lang = LANG.get(verse["family"], "Sanskrit")
    user = f"Language: {lang}\nVerse:\n{verse['sanskrit']}\n\nIts sense, for reference only: {verse.get('translation') or verse.get('line') or ''}"
    if missed:
        user += ("\n\nAn earlier answer left out these parts of the verse (letters around each gap shown): "
                 + ", ".join(missed) + ". Give every word, including small ones like न, मा, च, हि.")
    body = json.dumps({"model": model, "temperature": 0.1, "max_tokens": 2400, "reasoning_effort": None,
                       "messages": [{"role": "system", "content": SYSTEM}, {"role": "user", "content": user}]}).encode()
    for t in range(tries):
        try:
            req = urllib.request.Request("https://api.sarvam.ai/v1/chat/completions", data=body,
                                         headers={"Content-Type": "application/json", "api-subscription-key": key})
            with urllib.request.urlopen(req, timeout=90) as r:
                txt = json.loads(r.read())["choices"][0]["message"]["content"] or ""
            txt = re.sub(r"<think>.*?</think>", "", txt, flags=re.S)
            m = re.search(r"\{.*\}", txt, re.S)
            return json.loads(m.group(0))["literal"] if m else ""
        except Exception as e:
            if t == tries - 1:
                return f"ERROR {e}"
            time.sleep(2 * (t + 1))


def env_key():
    k = os.environ.get("SARVAM_API_KEY", "")
    if not k and (ROOT / ".env").exists():
        for line in (ROOT / ".env").read_text().splitlines():
            if line.startswith("SARVAM_API_KEY="):
                k = line.split("=", 1)[1].strip().strip('"')
    return k


def fill(key: str, model: str, v: dict, rounds: int = 3):
    """Ask; while words are missing, ask again naming them. Returns (ok, why, pairs) for the best try."""
    best, missed = (False, "empty", []), None
    for _ in range(rounds):
        lit = ask(key, model, v, missed=missed)
        if lit.startswith("ERROR"):
            return False, lit[:120], []
        pairs = parse(lit)
        ok, why = check(v["sanskrit"], pairs) if pairs else (False, "nothing parsed")
        if ok:
            return ok, why, pairs
        best = (ok, why, pairs)
        missed = skipped(v["sanskrit"], pairs) if pairs else None
        if not missed and pairs:
            break                       # nothing to name: asking again won't help
    return best


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sample", type=int, default=0, help="this many per text, then stop")
    ap.add_argument("--model", default="sarvam-105b")
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("--redo", action="store_true", help="ask again for verses already in verse_words_llm.json")
    a = ap.parse_args()
    key = env_key()
    if not key:
        sys.exit("SARVAM_API_KEY not set")

    lib = json.loads(LIB.read_text(encoding="utf-8"))
    have = json.loads(HAVE.read_text(encoding="utf-8")) if HAVE.exists() else {}
    done = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() and not a.redo else {}
    todo = [v for v in lib["verses"] if v["id"] not in have and v["id"] not in done and letters(v.get("sanskrit") or "")]
    if a.sample:
        per = collections.defaultdict(list)
        for v in todo:
            if len(per[v["family"]]) < a.sample:
                per[v["family"]].append(v)
        todo = [v for vs in per.values() for v in vs]
    print(f"{len(todo)} verses to do ({collections.Counter(v['family'] for v in todo)})", flush=True)

    REVIEW.parent.mkdir(parents=True, exist_ok=True)
    kept = 0
    with ThreadPoolExecutor(a.workers) as ex, REVIEW.open("a", encoding="utf-8") as rf:
        for v, (ok, why, pairs) in zip(todo, ex.map(lambda v: fill(key, a.model, v), todo)):
            rf.write(json.dumps({"id": v["id"], "family": v["family"], "ok": ok, "why": why, "sanskrit": v["sanskrit"],
                                 "pairs": pairs}, ensure_ascii=False) + "\n")
            if ok:
                done[v["id"]] = pairs; kept += 1
                if kept % 20 == 0:
                    OUT.write_text(json.dumps(done, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
            print(f"{'ok ' if ok else 'NO '} {v['id']:28s} {why}", flush=True)
    OUT.write_text(json.dumps(done, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"kept {kept}/{len(todo)} → {OUT.relative_to(ROOT)} ({len(done)} in all)")


if __name__ == "__main__":
    main()
