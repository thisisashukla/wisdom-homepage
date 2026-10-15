"""
story_titles.py — the line a plan shows for a story (Day 7): a named, concrete hook.

"Rama came home from his pilgrimage and stopped laughing", not the library's descriptive
title ("Rama comes home from his pilgrimage and loses interest in everything") and not
its anonymous opening ("The prince who had everything…"). Written once per story and
kept in data/taxonomy/story_titles.json next to the library, so it costs no LLM call.
"""
from __future__ import annotations

import json
import logging
from functools import lru_cache
from pathlib import Path
from typing import Dict, Optional

logger = logging.getLogger(__name__)


@lru_cache(maxsize=1)
def _titles() -> Dict[str, str]:
    from common.config import settings
    path = Path(settings.wisdom_library_path).parent / "story_titles.json"
    try:
        return dict(json.loads(path.read_text(encoding="utf-8")).get("titles") or {})
    except (OSError, ValueError) as e:
        logger.warning("story titles unavailable (%s): stories fall back to their opening line", type(e).__name__)
        return {}


def hook_title(prasang_id: Optional[str]) -> Optional[str]:
    return _titles().get(prasang_id or "") or None
