"""Environment-driven config for the blur-demo endpoint.

Kept separate from the top-level `common/config.py` (which is Wisdom's
scripture-search config) so a future Wisdom deploy that doesn't need the
blur demo can leave every BLUR_DEMO_* var unset and this router simply
stays disabled at import time.

Every knob has a sensible default so a fresh clone runs; only the two
Supabase secrets are required for uploads to actually succeed. If they
are missing, the endpoint returns 503 with a clear error instead of
crashing at startup — Wisdom's other endpoints (scripture search, verse
of the day) keep working either way.
"""

from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class BlurDemoSettings:
    # Upload sink -----------------------------------------------------
    supabase_url: str | None
    supabase_service_key: str | None
    bucket: str
    # How long the returned signed URL is valid for. 6 h is long enough
    # that a visitor can share it with a colleague without us leaking a
    # permanent public asset.
    signed_url_seconds: int

    # Input caps ------------------------------------------------------
    # Max clip duration (seconds). Kept at 60 to match the marketing
    # promise on /demo. Enforced twice: once by PyAV's stream metadata
    # before decoding, and once by a running frame-count guard during
    # decode (so a lying container header can't slip past the first
    # check).
    max_duration_s: int
    # Hard file-size cap. 100 MB is a reasonable upper bound for 60 s
    # of typical phone footage even at 4K; anything larger is almost
    # always a bad upload (or an attempt).
    max_upload_bytes: int
    # Longest edge the pipeline will operate on. A 4K clip is
    # downscaled to fit inside this box before detection/blur; keeps
    # per-request wall-clock in the tens of seconds.
    max_edge_px: int

    # Detector cadence ------------------------------------------------
    # YuNet is milliseconds/frame so we run it on every frame.
    # RT-DETR-v2-LP is much slower (seconds/frame on CPU), so we run
    # it every Nth frame and hold the previous detections between
    # runs. A held-detection window that briefly outlives the object
    # is a false-positive blur — harmless. The reverse (a missed
    # plate) is a privacy leak, which is why we bias toward oversized
    # masks and short hold windows.
    plate_detect_every_n: int
    plate_hold_frames: int


def _int_env(name: str, default: int) -> int:
    raw = os.getenv(name)
    if raw is None or raw == "":
        return default
    try:
        return int(raw)
    except ValueError:
        return default


def load_settings() -> BlurDemoSettings:
    return BlurDemoSettings(
        supabase_url=os.getenv("SUPABASE_URL") or None,
        supabase_service_key=os.getenv("SUPABASE_SERVICE_ROLE_KEY") or None,
        bucket=os.getenv("BLUR_DEMO_BUCKET", "blur-demo"),
        signed_url_seconds=_int_env("BLUR_DEMO_SIGNED_URL_SECONDS", 6 * 60 * 60),
        max_duration_s=_int_env("BLUR_DEMO_MAX_DURATION_S", 60),
        max_upload_bytes=_int_env("BLUR_DEMO_MAX_UPLOAD_BYTES", 100 * 1024 * 1024),
        max_edge_px=_int_env("BLUR_DEMO_MAX_EDGE_PX", 1280),
        plate_detect_every_n=_int_env("BLUR_DEMO_PLATE_DETECT_EVERY_N", 3),
        plate_hold_frames=_int_env("BLUR_DEMO_PLATE_HOLD_FRAMES", 6),
    )


settings = load_settings()
