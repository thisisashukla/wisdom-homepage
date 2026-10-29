"""Step 6 (+8): verse_enrich_v3.json fields in the planner's scores.
  rag_persp_w  a verse voiced from the other side of the person's relationship (a parent's line to someone at odds with
               their parents, and the reverse) loses this much in every beat
  rag_emo_w    hook and steady: + w x overlap between the reading's emotion words and the verse's emotions
  rag_ctx_w    (step 8) a verse that only makes sense with the verses around it loses this much (none are placed with it)
All default 0 (= v1)."""
from pathlib import Path
p = Path("ai/planner.py"); s = p.read_text()
assert "rag_persp_w" not in s
s = s.replace("""        self._bm25 = None          # RAG v2 step 4: keyword leg, built on first use (ai/sparse.py)
""", """        self._bm25 = None          # RAG v2 step 4: keyword leg, built on first use (ai/sparse.py)
        # RAG v2 step 6: enrichment v3 (voice, emotions, standalone), when the file is there
        from common.config import settings as _st
        _ep = Path(getattr(_st, "rag_enrich_path", "") or "")
        _en = json.loads(_ep.read_text()) if _ep.is_file() else {}
        self._voice = [(_en.get(v["id"]) or {}).get("voice", "any") for v in self.verses]
        self._emos = [set((_en.get(v["id"]) or {}).get("emotions") or []) for v in self.verses]
        self._needs_ctx = np.array([not (_en.get(v["id"]) or {}).get("standalone", 1) for v in self.verses])
""", 1)
s = s.replace("""    def _sparse(self, text: str) -> np.ndarray:""", """    # Whose side of a relationship the person is on, read off their top situations (RAG v2 step 6).
    CHILD_SIDE = {"parents_expectations", "parent_conflict", "grief_parent", "parents_aging"}
    PARENT_SIDE = {"teen_conflict", "present_parent", "raising_kids_values", "new_parent", "empty_nest"}
    OTHER_SIDE = {"child": "parent", "parent": "child"}
    EMO_WORDS = {"grief": r"griev|grief|loss|lost|mourn|miss", "fear": r"fear|afraid|scared|terrif|dread",
                 "anxiety": r"anxi|worr|nervous|panic|uneasy|stress", "anger": r"anger|angry|rage|furious|boil|resent|irritat",
                 "guilt": r"guilt|regret|sorry|failed", "shame": r"shame|ashamed|humiliat|embarrass", "envy": r"envy|jealous|compar",
                 "loneliness": r"lonel|alone|isolat|unseen|empty", "confusion": r"confus|lost|torn|stuck|unsure|undecid",
                 "restlessness": r"restless|racing|can't settle|scattered|distract", "despair": r"despair|hopeless|heavy|low|numb|drain",
                 "hurt": r"hurt|wound|betray|shut out|rejected", "pride": r"proud|pride|ego", "craving": r"crav|addict|urge|hooked",
                 "numbness": r"numb|nothing|empty|flat", "hope": r"hope|eager|excit", "gratitude": r"grateful|thankful|gratitude",
                 "resolve": r"determin|resolve|ready|commit", "love": r"love|tender", "peace": r"calm|peace|still"}

    def _side(self, u: Understanding) -> Optional[str]:
        for s in u.situations[:3]:
            if s["id"] in self.CHILD_SIDE:
                return "child"
            if s["id"] in self.PARENT_SIDE:
                return "parent"
        return None

    def _emo_fit(self, u: Understanding) -> np.ndarray:
        txt = (getattr(u, "emotion", "") or "").lower()
        want = {e for e, rx in self.EMO_WORDS.items() if re.search(rx, txt)}
        if not want:
            return np.zeros(len(self.verses), dtype=np.float32)
        return np.array([len(want & e) / len(want) for e in self._emos], dtype=np.float32)

    def _sparse(self, text: str) -> np.ndarray:""", 1)
s = s.replace("""        ce_w, ce_k = float(getattr(settings, "rag_ce_w", 0.0) or 0.0), int(getattr(settings, "rag_ce_k", 40) or 40)
        out = {}""", """        ce_w, ce_k = float(getattr(settings, "rag_ce_w", 0.0) or 0.0), int(getattr(settings, "rag_ce_k", 40) or 40)
        persp_w = float(getattr(settings, "rag_persp_w", 0.0) or 0.0)
        emo_w = float(getattr(settings, "rag_emo_w", 0.0) or 0.0)
        ctx_w = float(getattr(settings, "rag_ctx_w", 0.0) or 0.0)
        side = self._side(u) if persp_w > 0 else None
        if side:
            other = self.OTHER_SIDE[side]
            pri = pri - persp_w * np.array([vo == other for vo in self._voice], dtype=np.float32)
        if ctx_w > 0:
            pri = pri - ctx_w * self._needs_ctx
        emo = self._emo_fit(u) if emo_w > 0 else None
        out = {}""", 1)
s = s.replace("""            if adjust is not None:
                s = s + adjust                    # what they told us with "Not for me" (feedback_adjust)""", """            if emo is not None and role in ("hook", "steady"):
                s = s + emo_w * emo               # RAG v2 step 6: meets the feeling they named
            if adjust is not None:
                s = s + adjust                    # what they told us with "Not for me" (feedback_adjust)""", 1)
p.write_text(s)
c = Path("common/config.py"); t = c.read_text()
assert "rag_persp_w" not in t
t = t.replace("""    day1_other_texts: bool = False""", """    rag_enrich_path: str = "./data/taxonomy/verse_enrich_v3.json"   # RAG v2 step 6: voice, emotions, standalone per verse
    rag_persp_w: float = 0.0             # a verse voiced from the other side of their relationship loses this much
    rag_emo_w: float = 0.0               # hook/steady: + this x overlap of their emotion with the verse's
    rag_ctx_w: float = 0.0               # step 8: a verse that needs its neighbours to make sense loses this much
    day1_other_texts: bool = False""", 1)
c.write_text(t)
print("patched step 6")
