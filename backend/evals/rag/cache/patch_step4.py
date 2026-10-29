"""Step 4: BM25 leg blended into the planner's meaning score (settings.rag_sparse_w, default 0 = v1)."""
from pathlib import Path
p = Path("ai/planner.py"); s = p.read_text()
assert "rag_sparse_w" not in s
s = s.replace("""        self._idf = {t: math.log(1 + n / c) for t, c in df.items()}
""", """        self._idf = {t: math.log(1 + n / c) for t, c in df.items()}
        self._bm25 = None          # RAG v2 step 4: keyword leg, built on first use (ai/sparse.py)
""", 1)
s = s.replace("""    @staticmethod
    def _relative(sims: np.ndarray, ok: np.ndarray) -> np.ndarray:""", """    def _sparse(self, text: str) -> np.ndarray:
        \"\"\"BM25 of a beat statement against each verse's document (ai/sparse.py).\"\"\"
        if self._bm25 is None:
            from ai.sparse import BM25
            self._bm25 = BM25([_toks(self.rec._verse_doc(v) + " " + " ".join(v.get("themes") or [])) for v in self.verses])
        return self._bm25.scores(_toks(text))

    def _meaning(self, qvec: np.ndarray, text: str, ok: np.ndarray) -> np.ndarray:
        \"\"\"Dense meaning, blended with the BM25 leg when settings.rag_sparse_w > 0 (both on the query's own spread).\"\"\"
        from common.config import settings
        sem = self._relative(self.rec.verse_vecs @ qvec, ok)
        w = float(getattr(settings, "rag_sparse_w", 0.0) or 0.0)
        if w > 0 and text:
            sp = self._sparse(text)
            if sp.max() > 0:
                sem = (1 - w) * sem + w * self._relative(sp, ok & (sp > 0)) * (sp > 0)
        return sem

    @staticmethod
    def _relative(sims: np.ndarray, ok: np.ndarray) -> np.ndarray:""", 1)
s = s.replace("""        texts = level_texts(u, level) if qvecs is None else None
        out = {}""", """        texts = level_texts(u, level)
        out = {}""", 1)
s = s.replace("""            if qvecs is not None:
                sem = self._relative(self.rec.verse_vecs @ qvecs[role], ok)
            else:""", """            if qvecs is not None:
                sem = self._meaning(qvecs[role], texts[role], ok)
            else:""", 1)
p.write_text(s)
c = Path("common/config.py"); t = c.read_text()
assert "rag_sparse_w" not in t
t = t.replace("""    day1_other_texts: bool = False""", """    rag_sparse_w: float = 0.0            # RAG v2 step 4: weight of the BM25 leg in each beat's meaning score (0 = dense only)
    day1_other_texts: bool = False""", 1)
c.write_text(t)
print("patched")
