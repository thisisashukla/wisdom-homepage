"""
config.py — Central settings loaded from environment / .env file.
"""
from __future__ import annotations

from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        # `model_dir` and `model_config` both start with "model_" — pydantic
        # v2 protects that namespace by default and warns at class-creation
        # time. Opt out so our field names are allowed. (We're using
        # pydantic-settings, not defining actual model weights, so nothing
        # is at risk here.)
        protected_namespaces=(),
    )

    # ── Sarvam ───────────────────────────────────────────────────────────────
    sarvam_api_key: str = ""
    sarvam_model: str = "sarvam-105b"

    # ── Models per role (ai/llm_providers.py): "sarvam" (default), "openai:<model>", "gemini:<model>" ──
    llm_reader: str = ""                 # the reading of the person
    llm_writer: str = ""                 # plan lines, audio script, go deeper
    llm_rerank: str = ""                 # hook / story / week checks
    llm_reasoning: str = "minimal"       # reasoning effort for reasoning models on the user-facing path
    openai_api_key: str = ""
    openai_base_url: str = ""

    # ── Data directory (self-contained; no sanscripts dependency) ────────────
    # Directory containing embeddings.npy and verses.json.
    data_dir: str = "./data"

    # The curated verse + prasang library served by /recommend
    # (sanscripts/wisdom_kb/taxonomy/wisdom_library.json, copied in by
    # scripts/sync_wisdom_library.py). Point it at the sanscripts file locally if you like.
    wisdom_library_path: str = "./data/taxonomy/wisdom_library.json"

    # Plan endpoints (/recommend/hook, /preview, /plan).
    # verse_roles.json is optional: written by scripts/label_verse_roles.py; heuristics otherwise.
    verse_roles_path: str = "./data/taxonomy/verse_roles.json"
    # Deadline for the LLM reading of the person. Onboarding waits 12 s in total, so keep
    # this well under it; past the deadline the deterministic reading is used.
    understand_timeout_s: float = 7.0
    # A second, short LLM pass reorders the top hooks and picks the story (perspective, not
    # just topic). Skipped when the request has used up its budget; embedding order stands.
    rerank_timeout_s: float = 3.5
    # Day 1 is a Gita verse. With this on, when no Gita candidate speaks to their situation (the rerank's best
    # Gita score under day1_gita_floor) and a verse from another text clearly does (+day1_other_margin), that
    # verse opens the plan instead. Off by default: "Bhagavad Gita tuned to your life" is the promise.
    day1_other_texts: bool = False       # tried on 21-22 Oct 2026: the other texts lack the Gita's curation and surfaced wounding Day 1 lines; off
    day1_gita_floor: float = 0.6         # the Gita opens the plan unless its best hook scores under this on the fit rerank...
    day1_other_margin: float = 0.25      # ...and a verse from another text beats it by this much
    for_you_timeout_s: float = 14.0      # "What it says" + "For you" under each plan day (parallel calls per week, one rewrite round)
    # "Listen" on a plan day (server/narration.py): a storyteller narrator in English, and a devotional
    # reciter for the verse in its own language (Devanagari read in Hindi script mode, a little slower).
    tts_model: str = "bulbul:v4-flash"
    # Chosen 15 Oct 2026 from the voice audition: "E", one devotional voice for the story and the verse.
    # The other pick was "C": tts_speaker="sarang_en_narration", tts_shloka_speaker="ratan_hi_devotional".
    tts_speaker: str = "girish_en_devotional"
    tts_pace: float = 0.92
    tts_shloka_speaker: str = "girish_hi_devotional"
    tts_shloka_lang: str = "hi-IN"
    tts_shloka_pace: float = 0.9
    tts_sample_rate: int = 24000          # every part at one rate, so the joined MP3 plays as one
    narration_script_timeout_s: float = 12.0
    tts_timeout_s: float = 20.0
    narration_max_chars: int = 3200
    narration_cache_dir: str = "data/narration"
    depth_timeout_s: float = 12.0        # "go deeper" on a plan day (ai/depth.py)
    depth_cache_dir: str = "data/depth"
    # The default week of a plan: days of see, steady, act and story (four digits adding up to 7).
    # A request's `shape` overrides it. "2221" = hook, diagnose, steady ×2, act ×2, story.
    plan_week_shape: str = "2221"
    request_budget_s: float = 16.0      # reading + planning + the week gate; the writers have their own 14 s. The app must allow 30 s.
    # /recommend/hook answers kept in Supabase (ai/hook_cache.py): the same onboarding answers get the
    # same reading and Day 1 verse. Only good answers are kept (LLM reading, reranked, no risk).
    hook_cache_enabled: bool = True
    hook_cache_ttl_days: int = 7
    hook_cache_timeout_s: float = 1.5

    # Local BGE-M3 model weights directory.
    # If empty or non-existent, loads from HuggingFace (cached after first download).
    model_dir: str = ""

    # ── Embedding model name (used when model_dir is empty) ───────────────────
    embed_model: str = "BAAI/bge-m3"

    # "local" = sentence-transformers (needs requirements-ml.txt),
    # "cloudflare" = Workers AI REST (what Vercel uses; no torch).
    embed_backend: str = "local"
    cf_account_id: str = ""
    cf_api_token: str = ""
    cf_embed_model: str = "@cf/baai/bge-m3"

    # ── Reranker ─────────────────────────────────────────────────────────────
    # HF model id for the cross-encoder reranker. Empty string disables the
    # reranker entirely (search degrades gracefully to dense-only).
    reranker_model: str = "BAAI/bge-reranker-v2-m3"

    # ── Search defaults ───────────────────────────────────────────────────────
    default_top_k: int = 8       # bumped 5 → 8 with cross-intent re-ranking
    max_intents: int = 3         # cap now enforced at 3 (1–2 default)
    rag_max_verses: int = 8

    # ── CORS ──────────────────────────────────────────────────────────────────
    allowed_origins: str = "http://localhost:3000"

    def allowed_origins_list(self) -> List[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


settings = Settings()
