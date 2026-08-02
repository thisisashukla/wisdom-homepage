"""
context_builder.py — Compact prior-turn context for follow-up queries.

The /intent endpoint accepts an optional `context` field. When present, the
intent extractor uses it to rewrite context-dependent follow-ups ("tell me
more", "what about anger?") into standalone queries before extracting intents.

This module produces that compact string. The frontend can either:
  1. Call distill_prior_turn(...) on the previous /rag response and pass the
     result as IntentRequest.context on the next turn, OR
  2. Do the same shape in TypeScript — this module is small enough to mirror.

Length target: ≤ 150 tokens (~600 characters). Longer contexts crowd the
intent prompt and rarely add signal — the model only needs enough to resolve
pronouns and topic references.
"""
from __future__ import annotations

from typing import Iterable, Optional

from common.models import Segment


# Characters, not tokens — cheap approximation. Real tokens for English prose
# average ~4 chars/token, so 600 chars ≈ 150 tokens for BPE tokenizers.
_MAX_CHARS = 600


def _shorten(text: str, limit: int) -> str:
    """Truncate text at a word boundary near limit chars, adding an ellipsis."""
    text = text.strip()
    if len(text) <= limit:
        return text
    cut = text[: limit].rsplit(" ", 1)[0].rstrip(",;:.-")
    return f"{cut}…"


def distill_prior_turn(
    prior_user_query: str,
    prior_segments: Iterable[Segment] | Iterable[dict],
    max_chars: int = _MAX_CHARS,
) -> str:
    """
    Build a compact summary of the previous turn.

    Shape:
        User asked: "<prior query>"
        You replied (paraphrased): <first + last text segment, trimmed>
        Verses cited: uid1, uid2

    Args:
        prior_user_query: the user's question on the previous turn.
        prior_segments: the RagResponse.segments from the previous turn.
          Accepts either Segment objects or dicts (frontend-friendly).
        max_chars: soft cap on the returned string.

    Returns:
        A single string ready to pass as IntentRequest.context. Empty string
        if there's not enough material to build a useful context (in which
        case the frontend should omit the `context` field entirely).
    """
    prior_user_query = (prior_user_query or "").strip()
    if not prior_user_query:
        return ""

    # Normalise segments to (type, content, uid) tuples.
    normed: list[tuple[str, str, str]] = []
    for seg in prior_segments or []:
        if isinstance(seg, Segment):
            normed.append((seg.type, seg.content or "", seg.uid or ""))
        elif isinstance(seg, dict):
            normed.append((
                seg.get("type", ""),
                seg.get("content", "") or "",
                seg.get("uid", "") or "",
            ))

    text_segs = [c for t, c, _ in normed if t == "text" and c.strip()]
    verse_uids = [u for t, _, u in normed if t == "verse" and u]

    # Prefer first + last text segments — they're the "acknowledge" and
    # "return to their life" bookends, which is what usually carries the
    # topic of the previous turn.
    if not text_segs:
        reply_paraphrase = ""
    elif len(text_segs) == 1:
        reply_paraphrase = text_segs[0]
    else:
        reply_paraphrase = f"{text_segs[0]} … {text_segs[-1]}"

    # Budget the reply portion. Reserve ~30% for the query line + verses list.
    reply_budget = max(120, int(max_chars * 0.7))
    reply_paraphrase = _shorten(reply_paraphrase, reply_budget)

    lines = [
        f'User asked: "{_shorten(prior_user_query, 240)}"',
    ]
    if reply_paraphrase:
        lines.append(f"You replied (paraphrased): {reply_paraphrase}")
    if verse_uids:
        # Cap at 4 uids — beyond that adds no signal for follow-up rewriting.
        pretty = ", ".join(verse_uids[:4])
        lines.append(f"Verses cited: {pretty}")

    result = "\n".join(lines)
    # Final hard cap in case the pieces overshot.
    return _shorten(result, max_chars)


def summarise_query_only(prior_user_query: Optional[str]) -> str:
    """
    Fallback when segments aren't available (e.g. a UI that hasn't wired
    the full response). Just wraps the prior query as context.
    """
    q = (prior_user_query or "").strip()
    if not q:
        return ""
    return f'User asked: "{_shorten(q, 400)}"'
