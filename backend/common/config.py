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
    sarvam_model: str = "sarvam-30b"

    # ── Data directory (self-contained; no sanscripts dependency) ────────────
    # Directory containing embeddings.npy and verses.json.
    data_dir: str = "./data"

    # Local BGE-M3 model weights directory.
    # If empty or non-existent, loads from HuggingFace (cached after first download).
    model_dir: str = ""

    # ── Embedding model name (used when model_dir is empty) ───────────────────
    embed_model: str = "BAAI/bge-m3"

    # ── Search defaults ───────────────────────────────────────────────────────
    default_top_k: int = 5
    max_intents: int = 4
    rag_max_verses: int = 8

    # ── CORS ──────────────────────────────────────────────────────────────────
    allowed_origins: str = "http://localhost:3000"

    def allowed_origins_list(self) -> List[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


settings = Settings()
