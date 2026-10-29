"""Step 5: cross-encoder rerank of each beat's top K (settings.rag_ce_w, default 0 = off)."""
from pathlib import Path
p = Path("ai/planner.py"); s = p.read_text()
assert "rag_ce_w" not in s
s = s.replace("""    @staticmethod
    def _relative(sims: np.ndarray, ok: np.ndarray) -> np.ndarray:""", """    def _ce_blend(self, s: np.ndarray, ok: np.ndarray, text: str, w: float, k: int) -> np.ndarray:
        \"\"\"Cross-encoder rerank (ai/ce.py): the top `k` eligible verses by score get + w x their cross-encoder score,
        min-max scaled within those k. Untouched when the scores aren't available.\"\"\"
        cand = np.where(ok, s, -np.inf)
        top = np.argsort(-cand)[:k]
        top = top[np.isfinite(cand[top])]
        if len(top) < 2 or not text:
            return s
        from ai import ce
        ids = [self.verses[i]["id"] for i in top]
        sc = ce.score(text, ids, [self.rec._verse_doc(self.verses[i]) for i in top])
        if sc is None:
            return s
        rel = (sc - sc.min()) / max(1e-6, float(sc.max() - sc.min()))
        s = s.copy()
        s[top] += w * rel
        return s

    @staticmethod
    def _relative(sims: np.ndarray, ok: np.ndarray) -> np.ndarray:""", 1)
s = s.replace("""            if u.risk == "harm_from_others" and role in ("diagnose", "steady", "act"):
                s[~self._harm_ok] = -1e9       # only worth, courage, truth for someone being harmed
            s[~ok] = -1e9""", """            if u.risk == "harm_from_others" and role in ("diagnose", "steady", "act"):
                s[~self._harm_ok] = -1e9       # only worth, courage, truth for someone being harmed
            if ce_w > 0 and qvecs is not None:   # RAG v2 step 5: cross-encoder over this beat's top K
                elig = ok & (s > -1e8) & (self._gita if role == "hook" else True)
                s = self._ce_blend(s, elig, texts[role], ce_w, ce_k)
            s[~ok] = -1e9""", 1)
s = s.replace("""        texts = level_texts(u, level)
        out = {}""", """        texts = level_texts(u, level)
        from common.config import settings
        ce_w, ce_k = float(getattr(settings, "rag_ce_w", 0.0) or 0.0), int(getattr(settings, "rag_ce_k", 40) or 40)
        out = {}""", 1)
p.write_text(s)
c = Path("common/config.py"); t = c.read_text()
assert "rag_ce_w" not in t
t = t.replace("""    day1_other_texts: bool = False""", """    rag_ce_w: float = 0.0                # RAG v2 step 5: weight of the cross-encoder rerank on each beat's top rag_ce_k (0 = off)
    rag_ce_k: int = 40
    rag_ce_cache: str = "./evals/rag/cache/ce_scores.json"   # precomputed cross-encoder scores (ai/ce.py)
    day1_other_texts: bool = False""", 1)
c.write_text(t)
print("patched step 5")
