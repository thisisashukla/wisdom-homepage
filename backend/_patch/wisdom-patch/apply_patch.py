#!/usr/bin/env python3
"""
apply_patch.py — stance-aware reading for the Wisdom backend.

Run from wisdom-homepage/backend:   python3 /path/to/wisdom-patch/apply_patch.py

Every edit is an exact-string replacement against the files as read on 21 Oct 2026. A target that is
missing aborts the run with its name, nothing half-applied: the script checks every target first, then
writes. prompts/understand.py and ai/stance.py are copied in whole (the old understand.py is kept as
prompts/understand_v1.py).
"""
from __future__ import annotations

import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = Path.cwd()
if not (ROOT / "ai" / "understanding.py").exists():
    sys.exit("run this from wisdom-homepage/backend")

EDITS: dict[str, list[tuple[str, str]]] = {}


def edit(path: str, old: str, new: str) -> None:
    EDITS.setdefault(path, []).append((old, new))


# ── ai/mechanisms.py ───────────────────────────────────────────────────────────
edit("ai/mechanisms.py",
     '        "themes": ["wisdom", "impermanence", "duty", "gratitude"],\n    },\n}\n',
     '        "themes": ["wisdom", "impermanence", "duty", "gratitude"],\n    },\n'
     '    # ── Not a struggle: an aspiration. The "diagnose" line is what tests a resolve, not a cause of pain. ──\n'
     '    "resolve_begin": {\n'
     '        "label": "Starting what is yours to build",\n'
     '        "diagnose": "Resolve fades when the mind runs ahead to the prize or looks sideways at others; it holds when the work itself is the reward.",\n'
     '        "act": "Rise and act; do your work fully and well each day, let the result go, and keep at it when no one is watching.",\n'
     '        "steady": "No honest effort on the right path is ever wasted; even a little of it protects you and carries you forward.",\n'
     '        "pattern": "Every time I begin something that is mine, the first weeks are fire, and then the mind starts counting results and watching others.",\n'
     '        "self": "The one who acts is not the result of the work; success and failure pass through, and the self that chose to begin stays whole.",\n'
     '        "self_act": "Act as an offering, with full effort and no claim on the fruit, and stay the same whether the work is praised or ignored.",\n'
     '        "themes": ["effort", "courage", "duty", "decision"],\n'
     '    },\n'
     '    # ── Not a struggle: being wronged. The cause is in the other person; the texts give footing and courage. ──\n'
     '    "dignity_denied": {\n'
     '        "label": "Being seen as less than you are",\n'
     '        "diagnose": "When others see only a role, their picture is their smallness and not your measure; the harm deepens only when their picture begins to replace your own.",\n'
     '        "act": "Speak the true thing gently and firmly, hold your ground on what is yours, and do your own duty without shrinking to fit the picture they hold.",\n'
     '        "steady": "What you are cannot be cut smaller by what they see; your worth was never theirs to grant, and standing in your own truth is itself the duty.",\n'
     '        "pattern": "In more than one room of my life, people have handed me a smaller role than the one I live, and expected me to fit it.",\n'
     '        "self": "The self cannot be cut, burned or made less; what they see is a role, and you were never only a role.",\n'
     '        "self_act": "Stand in your own truth and do your own duty from it; let their picture stay theirs, and let your conduct speak.",\n'
     '        "themes": ["courage", "truth", "self_worth", "duty", "speech"],\n'
     '    },\n'
     '}\n')

edit("ai/mechanisms.py",
     '    "stick": "I want to stick with it this time",\n',
     '    "stick": "I have decided, and I am ready to begin",\n')

edit("ai/mechanisms.py",
     '    "no_meaning": "Nothing is exactly wrong, and that\'s the hard part. You\'ve outgrown the reasons that used to carry you.",\n}\n',
     '    "no_meaning": "Nothing is exactly wrong, and that\'s the hard part. You\'ve outgrown the reasons that used to carry you.",\n'
     '    "resolve_begin": "Nothing is wrong, and nothing needs fixing. The resolve is real and it is yours now. What will test it is the morning the work stops being exciting.",\n'
     '    "dignity_denied": "You are not asking for too much. You are being handed a smaller picture of yourself than the one you live, and the smallness is theirs.",\n'
     '}\n')

edit("ai/mechanisms.py",
     '    "no_meaning": ["What\'s it all for", "What does not pass", "The meaning within"],\n}\n',
     '    "no_meaning": ["What\'s it all for", "What does not pass", "The meaning within"],\n'
     '    "resolve_begin": ["Your turn to begin", "What tests a resolve", "The one who acts"],\n'
     '    "dignity_denied": ["Seen as less", "Whose picture it is", "No smaller than you are"],\n'
     '}\n')

# ── ai/understanding.py ────────────────────────────────────────────────────────
U = "ai/understanding.py"
edit(U,
     "from ai.verse_roles import IMPERATIVE_START\nfrom prompts.understand import EXAMPLE_ASSISTANT, EXAMPLE_USER, build_system\n",
     "from ai.verse_roles import IMPERATIVE_START\n"
     "from ai.stance import (ASPIRATION_HOOK, ASPIRATION_LAMENT_RE, ASPIRATION_STORY, SEEKING_HOOK, SEEKING_STORY, STANCES,\n"
     "                       STANCE_BANNED_SITUATIONS, WRONGED_HOOK, WRONGED_HOOK_RE, WRONGED_STORY, WRONGED_UNSAFE_RE,\n"
     "                       constrain_mechanism, stance_from_profile)\n"
     "from prompts.understand import EXAMPLES, build_system\n")

edit(U,
     '    insight: str = ""',
     '    stance: str = "struggle"                      # struggle | aspiration | wronged | seeking (ai/stance.py)\n'
     '    insight: str = ""')

edit(U,
     'def check_statement(role: str, text: str, risk: str = "none") -> tuple[Optional[str], List[str]]:\n'
     '    """Returns (clean statement, problems). A None statement means: use the template."""\n',
     'def check_statement(role: str, text: str, risk: str = "none", stance: str = "struggle") -> tuple[Optional[str], List[str]]:\n'
     '    """Returns (clean statement, problems). A None statement means: use the template."""\n')

edit(U,
     '    if role == "hook":\n'
     '        if IMPERATIVE_START.match(s) or HEDGE_RE.search(s):\n'
     '            return None, problems + ["hook_gives_advice"]\n',
     '    # The stance decides what a statement may never say (ai/stance.py): someone wronged is not asked to\n'
     '    # accept it or shown a fault in themselves; an aspiration is not met with a lament.\n'
     '    if stance == "wronged":\n'
     '        if role == "hook" and WRONGED_HOOK_RE.search(s):\n'
     '            return None, problems + ["hook_blames_wronged"]\n'
     '        if role in ("diagnose", "steady", "act") and WRONGED_UNSAFE_RE.search(s):\n'
     '            return None, problems + [f"{role}_asks_wronged_to_accept"]\n'
     '    elif stance == "aspiration" and role == "hook" and ASPIRATION_LAMENT_RE.search(s):\n'
     '        return None, problems + ["hook_laments_aspiration"]\n'
     '    if role == "hook":\n'
     '        if IMPERATIVE_START.match(s) or HEDGE_RE.search(s):\n'
     '            return None, problems + ["hook_gives_advice"]\n')

edit(U,
     'def template_queries(p: Profile, mechanism: str, situations: List[dict], labels: Dict[str, str], risk: str) -> Dict[str, str]:\n'
     '    m = MECHANISMS[mechanism]\n'
     '    top = [labels[s["id"]] for s in situations[:2] if s["id"] in labels]\n'
     '    state = FEELING_STATE.get(p.feeling, "something weighs on me")\n'
     '    hook = (f"{top[0]}. " if top else "") + f"Inside, {state}, and I don\'t know how to carry it."\n',
     'def template_queries(p: Profile, mechanism: str, situations: List[dict], labels: Dict[str, str], risk: str,\n'
     '                     stance: str = "struggle") -> Dict[str, str]:\n'
     '    m = MECHANISMS[mechanism]\n'
     '    top = [labels[s["id"]] for s in situations[:2] if s["id"] in labels]\n'
     '    state = FEELING_STATE.get(p.feeling, "something weighs on me")\n'
     '    if stance == "aspiration":\n'
     '        hook = ASPIRATION_HOOK\n'
     '    elif stance == "wronged":\n'
     '        hook = (f"{top[0]}. " if top else "") + WRONGED_HOOK\n'
     '    elif stance == "seeking":\n'
     '        hook = SEEKING_HOOK\n'
     '    else:\n'
     '        hook = (f"{top[0]}. " if top else "") + f"Inside, {state}, and I don\'t know how to carry it."\n')

edit(U,
     '    q = {"hook": hook, "diagnose": m["diagnose"], "steady": m["steady"], "act": m["act"], "story": story}\n'
     '    if risk in SAFE_STEADY:\n',
     '    story = {"aspiration": ASPIRATION_STORY, "wronged": WRONGED_STORY, "seeking": SEEKING_STORY}.get(stance, story)\n'
     '    q = {"hook": hook, "diagnose": m["diagnose"], "steady": m["steady"], "act": m["act"], "story": story}\n'
     '    if risk in SAFE_STEADY:\n')

edit(U,
     '        return [\n'
     '            {"role": "system", "content": self.system},\n'
     '            {"role": "user", "content": EXAMPLE_USER},\n'
     '            {"role": "assistant", "content": EXAMPLE_ASSISTANT},\n'
     '            {"role": "user", "content": self.user_message(p, note)},\n'
     '        ]\n',
     '        msgs = [{"role": "system", "content": self.system}]\n'
     '        for ex_user, ex_assistant in EXAMPLES:\n'
     '            msgs.append({"role": "user", "content": ex_user})\n'
     '            msgs.append({"role": "assistant", "content": ex_assistant})\n'
     '        msgs.append({"role": "user", "content": self.user_message(p, note)})\n'
     '        return msgs\n')

edit(U,
     '        try:\n'
     '            conf = float(raw.get("confidence", 0.5))\n'
     '        except (TypeError, ValueError):\n'
     '            conf = 0.5\n'
     '        conf = max(0.0, min(1.0, conf))\n'
     '\n'
     '        # Meaning-matched situations only back up the model\'s own reading: top 3, light weight.\n'
     '        note_sits = dict(sorted(note_sits.items(), key=lambda kv: -kv[1])[:3])\n',
     '        try:\n'
     '            conf = float(raw.get("confidence", 0.5))\n'
     '        except (TypeError, ValueError):\n'
     '            conf = 0.5\n'
     '        conf = max(0.0, min(1.0, conf))\n'
     '        # Where they stand (ai/stance.py). Someone at risk of self-harm is read as a struggle: the safety\n'
     '        # templates take over every statement either way.\n'
     '        stance = raw.get("stance") if raw.get("stance") in STANCES else None\n'
     '        if stance is None:\n'
     '            flags.append("llm_stance_missing")\n'
     '            stance = stance_from_profile(p.feeling, bool(p.topic or p.follow), bool(note.text) and quality in ("useful", "partial"))\n'
     '        if risk == "self_harm":\n'
     '            stance = "struggle"\n'
     '        banned_sits = STANCE_BANNED_SITUATIONS.get(stance, set())\n'
     '\n'
     '        # Meaning-matched situations only back up the model\'s own reading: top 3, light weight.\n'
     '        note_sits = dict(sorted(((k, v) for k, v in note_sits.items() if k not in banned_sits), key=lambda kv: -kv[1])[:3])\n')

edit(U,
     '        for s in raw.get("situations") or []:\n'
     '            if isinstance(s, dict) and s.get("id") in self.valid:\n'
     '                try:\n'
     '                    llm_sits[s["id"]] = max(0.2, min(1.0, float(s.get("weight", 0.6))))\n'
     '                except (TypeError, ValueError):\n'
     '                    llm_sits[s["id"]] = 0.6\n'
     '            elif isinstance(s, str) and s in self.valid:\n'
     '                llm_sits[s] = 0.7\n',
     '        for s in raw.get("situations") or []:\n'
     '            sid = s.get("id") if isinstance(s, dict) else s\n'
     '            if sid in banned_sits:\n'
     '                flags.append(f"situation_off_stance:{sid}")\n'
     '                continue\n'
     '            if isinstance(s, dict) and s.get("id") in self.valid:\n'
     '                try:\n'
     '                    llm_sits[s["id"]] = max(0.2, min(1.0, float(s.get("weight", 0.6))))\n'
     '                except (TypeError, ValueError):\n'
     '                    llm_sits[s["id"]] = 0.6\n'
     '            elif isinstance(s, str) and s in self.valid:\n'
     '                llm_sits[s] = 0.7\n')

edit(U,
     '        if risk == "harm_from_others":\n'
     '            mech, sec = "fear_of_loss", None      # courage and safety; never a cause located in them\n'
     '        if quality == "unusable" or conf < 0.25:\n'
     '            flags.append("low_confidence")\n'
     '\n'
     '        templates = template_queries(p, mech, situations, self.labels, risk)\n',
     '        mech, sec, changed = constrain_mechanism(stance, mech, sec)\n'
     '        if changed:\n'
     '            flags.append(f"mechanism_off_stance:{raw.get(\'mechanism\')}")\n'
     '        if risk == "harm_from_others":\n'
     '            mech, sec = "fear_of_loss", None      # courage and safety; never a cause located in them\n'
     '        if quality == "unusable" or conf < 0.25:\n'
     '            flags.append("low_confidence")\n'
     '\n'
     '        templates = template_queries(p, mech, situations, self.labels, risk, stance)\n')

edit(U,
     '            clean, problems = check_statement(role, rq.get(role, ""), risk)\n'
     '            if clean and quality == "unusable" and role == "hook":\n',
     '            clean, problems = check_statement(role, rq.get(role, ""), risk, stance)\n'
     '            if clean and quality == "unusable" and role == "hook":\n')

edit(U,
     '        return Understanding(\n'
     '            source="llm", note_quality=quality, risk=risk, confidence=round(conf, 2), core_struggle=core,\n'
     '            mechanism=mech, secondary_mechanism=sec, situations=situations, mirror=mirror, queries=queries,\n',
     '        return Understanding(\n'
     '            source="llm", note_quality=quality, risk=risk, confidence=round(conf, 2), core_struggle=core, stance=stance,\n'
     '            mechanism=mech, secondary_mechanism=sec, situations=situations, mirror=mirror, queries=queries,\n')

# Deterministic path: the tapped feeling decides the stance when nothing says there is a problem.
edit(U,
     '        risk = "self_harm" if note.crisis else ("harm_from_others" if note.harm else "none")\n'
     '        mechs = SITUATION_MECHANISMS.get(situations[0]["id"], ["restless_mind"])\n'
     '        mech = mechs[0]\n'
     '        sec = next((m for s in situations[1:3] for m in SITUATION_MECHANISMS.get(s["id"], [])[:1] if m != mech), None)\n'
     '        if risk == "harm_from_others":\n'
     '            mech, sec = "fear_of_loss", None\n'
     '        quality = "none" if not note.text else {"ok": "partial", "weak": "partial"}.get(note.signal, "unusable")\n'
     '        templates = template_queries(p, mech, situations, self.labels, risk)\n'
     '        return Understanding(\n'
     '            source="fallback", note_quality=quality, risk=risk,\n',
     '        risk = "self_harm" if note.crisis else ("harm_from_others" if note.harm else "none")\n'
     '        mechs = SITUATION_MECHANISMS.get(situations[0]["id"], ["restless_mind"])\n'
     '        mech = mechs[0]\n'
     '        sec = next((m for s in situations[1:3] for m in SITUATION_MECHANISMS.get(s["id"], [])[:1] if m != mech), None)\n'
     '        stance = "struggle" if risk != "none" else stance_from_profile(p.feeling, bool(p.topic or p.follow), note.signal == "ok")\n'
     '        mech, sec, _ = constrain_mechanism(stance, mech, sec)\n'
     '        if risk == "harm_from_others":\n'
     '            mech, sec = "fear_of_loss", None\n'
     '        quality = "none" if not note.text else {"ok": "partial", "weak": "partial"}.get(note.signal, "unusable")\n'
     '        templates = template_queries(p, mech, situations, self.labels, risk, stance)\n'
     '        return Understanding(\n'
     '            source="fallback", note_quality=quality, risk=risk, stance=stance,\n')

# Client round-trip: the stance travels with the reading.
edit(U,
     '            risk = d.get("risk") if d.get("risk") in ("none", "distress", "self_harm", "harm_from_others") else "none"\n'
     '            p = Profile(feeling="quiet")\n'
     '            templates = template_queries(p, mech, situations, self.labels, risk)\n'
     '            queries, qsrc = {}, {}\n'
     '            for role in ("hook", "diagnose", "steady", "act", "story"):\n'
     '                clean, _ = check_statement(role, (d.get("queries") or {}).get(role, ""), risk)\n',
     '            risk = d.get("risk") if d.get("risk") in ("none", "distress", "self_harm", "harm_from_others") else "none"\n'
     '            stance = d.get("stance") if d.get("stance") in STANCES else "struggle"\n'
     '            p = Profile(feeling="quiet")\n'
     '            templates = template_queries(p, mech, situations, self.labels, risk, stance)\n'
     '            queries, qsrc = {}, {}\n'
     '            for role in ("hook", "diagnose", "steady", "act", "story"):\n'
     '                clean, _ = check_statement(role, (d.get("queries") or {}).get(role, ""), risk, stance)\n')

edit(U,
     '            return Understanding(\n'
     '                source="client", note_quality=d.get("note_quality") if d.get("note_quality") in ("useful", "partial", "unusable", "none") else "none",\n'
     '                risk=risk, confidence=round(max(0.0, min(1.0, float(d.get("confidence", 0.5)))), 2),\n',
     '            return Understanding(\n'
     '                source="client", note_quality=d.get("note_quality") if d.get("note_quality") in ("useful", "partial", "unusable", "none") else "none",\n'
     '                risk=risk, stance=stance, confidence=round(max(0.0, min(1.0, float(d.get("confidence", 0.5)))), 2),\n')

# ── ai/voice.py ────────────────────────────────────────────────────────────────
V = "ai/voice.py"
edit(V,
     "import re\nfrom dataclasses import dataclass, field\nfrom typing import Dict, List, Optional, Sequence\n",
     "import re\nfrom dataclasses import dataclass, field\nfrom typing import Dict, List, Optional, Sequence\n\n"
     "from ai.stance import STANCE_CORE_LABEL, STANCE_NOTE\n")

edit(V,
     '    risk: str = "none"\n'
     '    level: str = "situation"\n'
     '    week: int = 1\n',
     '    risk: str = "none"\n'
     '    stance: str = "struggle"             # struggle | aspiration | wronged | seeking (ai/stance.py)\n'
     '    level: str = "situation"\n'
     '    week: int = 1\n')

edit(V,
     '    if c.core:\n'
     '        lines.append(f"What they are struggling with: {c.core}")\n',
     '    if c.core:\n'
     '        lines.append(f"{STANCE_CORE_LABEL.get(c.stance, STANCE_CORE_LABEL[\'struggle\'])}: {c.core}")\n'
     '    lines.append(f"Where they stand: {STANCE_NOTE.get(c.stance, STANCE_NOTE[\'struggle\'])}")\n')

edit(V,
     '    lines = [f"The person: {c.core}" + (f" ({head})" if head else "")]\n'
     '    if c.seat:\n',
     '    lines = [f"The person: {c.core}" + (f" ({head})" if head else "")]\n'
     '    lines.append(f"Where they stand: {STANCE_NOTE.get(c.stance, STANCE_NOTE[\'struggle\'])}")\n'
     '    if c.seat:\n')

edit(V,
     '- Never make them the one at fault for what they are suffering. If the verse is a confession or a warning (someone admitting carelessness, greed or anger), apply it to them only if they named that in themselves; otherwise draw from it what helps, not what accuses.\n',
     '- Never make them the one at fault for what they are suffering. If the verse is a confession or a warning (someone admitting carelessness, greed or anger), apply it to them only if they named that in themselves; otherwise draw from it what helps, not what accuses.\n'
     '- Meet them where they stand ("Where they stand" below). A resolve is not a wound: do not console, soften or warn someone who is ready; believe them and name what will test them. Someone being wronged is never asked to accept, adjust, be patient, be content, forgive, lower expectations, keep the peace or understand the other\'s nature, and the cause is never placed in them; give them footing, courage and the true word.\n')

# ── ai/llm_rerank.py ───────────────────────────────────────────────────────────
R = "ai/llm_rerank.py"
edit(R,
     'Judge the verse as the scripture means it (its speaker, setting and plain sense), not as it could be bent to fit.\n'
     'Return ONLY JSON: {"seat": "...", "scores": {"<id>": 0.0, ...}} with every candidate id."""\n',
     'Judge the verse as the scripture means it (its speaker, setting and plain sense), not as it could be bent to fit.\n'
     'Where they stand changes the scoring ("Where they stand" in the person block):\n'
     '  - an aspiration (a resolve, a beginning, inspired by others): 1.0 is a verse of rising, resolve, effort and one\'s own path; any verse of consolation, burden, fear, envy or comparison scores 0.0, however well it matches the words.\n'
     '  - wronged (treated as less than they are, dismissed, held to a role): 1.0 is a verse of standing in one\'s truth, courage, the self that cannot be cut, speaking the true word; any verse that names envy, contentment, desire, ego or expectation as the trouble, or asks for acceptance, patience, adjustment or keeping the peace, scores 0.0: it tells them the fault is theirs.\n'
     '  - seeking: 1.0 is an invitation into the text, not a cure for a pain they did not describe.\n'
     'Return ONLY JSON: {"seat": "...", "scores": {"<id>": 0.0, ...}} with every candidate id."""\n')

edit(R,
     'Avoid stories told from the other side, stories whose lesson would blame the person, and, if the person is being harmed, any story about enduring, obeying or keeping the peace.\n',
     'Avoid stories told from the other side, stories whose lesson would blame the person, and, if the person is being harmed or wronged, any story about enduring, obeying, adjusting or keeping the peace. For an aspiration pick a protagonist who set out to do something and kept going, not one who was broken and healed.\n')

# ── ai/personalize.py ──────────────────────────────────────────────────────────
P = "ai/personalize.py"
edit(P,
     "from ai.understanding import CLICHE_RE, ui_line, _words\n",
     "from ai.stance import ASPIRATION_WRITER_RE, WRONGED_WRITER_RE\n"
     "from ai.understanding import CLICHE_RE, ui_line, _words\n")

edit(P,
     'If they are being harmed by someone, never suggest enduring, adjusting, forgiving or keeping the peace. If they are in acute distress, be gentle and point only to the next small step.\n',
     'If they are being harmed by someone, never suggest enduring, adjusting, forgiving or keeping the peace. If they are in acute distress, be gentle and point only to the next small step.\n'
     'Read "Where they stand" before you write. For an aspiration there is no wound: no consoling, no "you are not alone", no warning; believe the resolve and name what will test it. For someone wronged, the cause is in the other person: never suggest accepting, adjusting, patience, contentment, forgiving, lowering expectations or keeping the peace, never name envy, need for approval or their expectations as the trouble, and never ask them to earn or prove anything to the ones who diminish them.\n')

edit(P,
     'def _why(text, lo: int, hi: int, risk: str, item: Optional[dict] = None, grounded: bool = False) -> tuple[Optional[str], str]:\n',
     'def _why(text, lo: int, hi: int, risk: str, item: Optional[dict] = None, grounded: bool = False,\n'
     '         stance: str = "struggle") -> tuple[Optional[str], str]:\n')

edit(P,
     '    if risk == "harm_from_others" and ENDURE_RE.search(s):\n'
     '        return None, "endure"\n',
     '    if risk == "harm_from_others" and ENDURE_RE.search(s):\n'
     '        return None, "endure"\n'
     '    if stance == "wronged" and WRONGED_WRITER_RE.search(s):\n'
     '        return None, "accept"\n'
     '    if stance == "aspiration" and ASPIRATION_WRITER_RE.search(s):\n'
     '        return None, "console"\n')

edit(P,
     'def why_for_you(text, risk: str = "none", item: Optional[dict] = None) -> tuple[Optional[str], str]:\n'
     '    s, why = _why(text, 12, 55, risk, item)\n',
     'def why_for_you(text, risk: str = "none", item: Optional[dict] = None, stance: str = "struggle") -> tuple[Optional[str], str]:\n'
     '    s, why = _why(text, 12, 55, risk, item, stance=stance)\n')

edit(P,
     'def why_meaning(text, item: dict, risk: str = "none") -> tuple[Optional[str], str]:\n'
     '    s, why = _why(text, 25, 95, risk, item, grounded=True)\n',
     'def why_meaning(text, item: dict, risk: str = "none", stance: str = "struggle") -> tuple[Optional[str], str]:\n'
     '    s, why = _why(text, 25, 95, risk, item, grounded=True, stance=stance)\n')

edit(P,
     '        fy, why = why_for_you(r.get("for_you"), ctx.risk, it)\n',
     '        fy, why = why_for_you(r.get("for_you"), ctx.risk, it, ctx.stance)\n')

edit(P,
     '            m, why = why_meaning(r.get("meaning"), it, ctx.risk)\n',
     '            m, why = why_meaning(r.get("meaning"), it, ctx.risk, ctx.stance)\n')

# ── server/plan.py ─────────────────────────────────────────────────────────────
edit("server/plan.py",
     '        risk=u.risk, level=level, week=week, days_seen=(j.days_seen if j else 0), helped=helped,\n',
     '        risk=u.risk, stance=u.stance, level=level, week=week, days_seen=(j.days_seen if j else 0), helped=helped,\n')

edit("server/plan.py",
     '        "%s: feeling=%s age=%s stages=%d chips=%s note=%s source=%s quality=%s risk=%s mech=%s conf=%.2f q=%s flags=%s %s %.0fms",\n'
     '        kind, req.feeling, req.age, len(req.stages), bool(req.topic or req.follow), "yes" if req.note else "no",\n'
     '        u.source, u.note_quality, u.risk, u.mechanism, u.confidence,\n',
     '        "%s: feeling=%s age=%s stages=%d chips=%s note=%s source=%s quality=%s risk=%s stance=%s mech=%s conf=%.2f q=%s flags=%s %s %.0fms",\n'
     '        kind, req.feeling, req.age, len(req.stages), bool(req.topic or req.follow), "yes" if req.note else "no",\n'
     '        u.source, u.note_quality, u.risk, u.stance, u.mechanism, u.confidence,\n')


# ── apply ──────────────────────────────────────────────────────────────────────
def main() -> None:
    texts = {}
    for path, edits in EDITS.items():
        t = (ROOT / path).read_text(encoding="utf-8")
        for i, (old, _) in enumerate(edits):
            n = t.count(old)
            if n != 1:
                sys.exit(f"{path}: edit #{i + 1} matched {n} times (expected 1); nothing written. First line of target:\n  {old.splitlines()[0]!r}")
        texts[path] = t
    for path, edits in EDITS.items():
        t = texts[path]
        for old, new in edits:
            t = t.replace(old, new, 1)
        (ROOT / path).write_text(t, encoding="utf-8")
        print(f"patched {path} ({len(edits)} edits)")
    old_prompt = ROOT / "prompts" / "understand.py"
    keep = ROOT / "prompts" / "understand_v1.py"
    if not keep.exists():
        shutil.copyfile(old_prompt, keep)
    shutil.copyfile(HERE / "prompts" / "understand.py", old_prompt)
    print("replaced prompts/understand.py (old kept as prompts/understand_v1.py)")
    shutil.copyfile(HERE / "ai" / "stance.py", ROOT / "ai" / "stance.py")
    print("added ai/stance.py")
    (ROOT / "evals").mkdir(exist_ok=True)
    for name in ("stance_cases.json", "run_stance.py"):
        shutil.copyfile(HERE / "evals" / name, ROOT / "evals" / name)
    print("added evals/stance_cases.json, evals/run_stance.py")


if __name__ == "__main__":
    main()
