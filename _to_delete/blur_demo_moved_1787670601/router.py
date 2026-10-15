"""FastAPI router for the blur-demo endpoint.

One route: POST /api/v1/blur-demo. Multipart form with the video file
plus a small set of controls (faces on/off, plates on/off, blur
intensity, blur style). Returns JSON with the signed URL of the
blurred video and a compact stats payload the client instruments as a
Mixpanel event.

Sync-response design (per the /demo product decision): the request is
held open for the entire encode. Typical wall-clock is 20-90 s for a
60 s clip on CPU. This will exceed some CDN edge timeouts (Vercel
default is 100 s on Serverless Functions, longer on Edge / Node
runtimes; Cloudflare Free is 100 s). Two mitigations, both baked into
the design and worth calling out:

    1. The FastAPI service is meant to be reached DIRECTLY from the
       browser (via NEXT_PUBLIC_DEMO_API_URL), not proxied through
       the Next.js server. Point CORS at bluranything.in and the
       browser talks straight to the backend, so its host's timeout
       is the only one that matters.
    2. If the client eventually needs to survive very long uploads,
       flip to the async job model (POST → 202 + job_id, GET job
       status) — the router below already has all the pieces
       (`process_video` returns a stats object; storage upload is a
       separate call) to lift into a background worker.
"""

from __future__ import annotations

import logging
import os
import shutil
import tempfile
from typing import Optional

from fastapi import APIRouter, File, Form, HTTPException, Query, Request, UploadFile
from fastapi.responses import JSONResponse

from server.blur_demo.config import settings as demo_settings
from server.blur_demo.pipeline import BlurOptions, DurationExceeded, process_video
from server.blur_demo.storage import BlurDemoStorage

logger = logging.getLogger(__name__)

router = APIRouter(tags=["blur-demo"])


# The set of MIME prefixes we'll accept. Browsers report a fairly
# consistent 'video/*' family for MP4/MOV/WebM; we still fall back to
# PyAV's own decode attempt if the header is missing (some Safari
# uploads arrive as application/octet-stream).
_ACCEPTED_PREFIXES = ("video/",)
_ACCEPTED_FALLBACKS = ("application/octet-stream",)


@router.get("/blur-demo/health")
async def blur_demo_health() -> dict:
    """Cheap health probe — the /demo page pings this on load so it
    can grey out the CTA if the endpoint is down or unconfigured."""
    supabase_ok = bool(
        demo_settings.supabase_url and demo_settings.supabase_service_key
    )
    return {
        "ok": True,
        "supabase_configured": supabase_ok,
        "max_duration_s": demo_settings.max_duration_s,
        "max_upload_bytes": demo_settings.max_upload_bytes,
        "max_edge_px": demo_settings.max_edge_px,
    }


@router.post("/blur-demo")
async def blur_demo(
    request: Request,
    video: UploadFile = File(..., description="Video clip, ≤ 60 s."),
    blur_faces: bool = Form(True),
    blur_plates: bool = Form(True),
    intensity: int = Form(51, ge=5, le=151),
    style: str = Form("gaussian"),
    filename: Optional[str] = Query(None, description="Original filename hint for the upload."),
) -> JSONResponse:
    # ── Validate + collect ───────────────────────────────────────
    if not (blur_faces or blur_plates):
        raise HTTPException(
            status_code=400,
            detail="At least one of blur_faces / blur_plates must be true.",
        )
    if style not in ("gaussian", "pixelate"):
        raise HTTPException(status_code=400, detail="style must be 'gaussian' or 'pixelate'.")

    ct = (video.content_type or "").lower()
    if not (ct.startswith(_ACCEPTED_PREFIXES) or ct in _ACCEPTED_FALLBACKS or ct == ""):
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported content type {ct!r}. Upload a video file.",
        )

    # Content-length is advisory (some clients omit it) — we ALSO
    # cap while reading in chunks below.
    cl = request.headers.get("content-length")
    if cl and cl.isdigit() and int(cl) > demo_settings.max_upload_bytes:
        raise HTTPException(
            status_code=413,
            detail=f"Upload exceeds {demo_settings.max_upload_bytes // (1024 * 1024)} MB cap.",
        )

    tmp_dir = tempfile.mkdtemp(prefix="blur-demo-")
    input_path = os.path.join(tmp_dir, "input.bin")
    output_path = os.path.join(tmp_dir, "blurred.mp4")

    try:
        total = 0
        with open(input_path, "wb") as out:
            while True:
                chunk = await video.read(1024 * 1024)
                if not chunk:
                    break
                total += len(chunk)
                if total > demo_settings.max_upload_bytes:
                    raise HTTPException(
                        status_code=413,
                        detail=f"Upload exceeds {demo_settings.max_upload_bytes // (1024 * 1024)} MB cap.",
                    )
                out.write(chunk)

        if total == 0:
            raise HTTPException(status_code=400, detail="Empty upload.")

        # ── Get the storage client FIRST — we want to fail fast
        # if Supabase is misconfigured, before spending 30 s on a
        # CPU-heavy encode.
        try:
            storage = BlurDemoStorage()
        except BlurDemoStorage.MissingConfig as exc:
            raise HTTPException(
                status_code=503,
                detail=f"Demo endpoint is not configured on this server: {exc}",
            ) from exc

        opts = BlurOptions(
            blur_faces=blur_faces,
            blur_plates=blur_plates,
            intensity=intensity,
            style=style,
        )

        try:
            stats = process_video(input_path, output_path, opts)
        except DurationExceeded as exc:
            raise HTTPException(status_code=413, detail=str(exc)) from exc
        except Exception as exc:  # PyAV / cv2 / model
            logger.exception("blur-demo processing failed")
            raise HTTPException(
                status_code=422,
                detail=f"Could not process this video: {exc}",
            ) from exc

        try:
            key, signed_url = storage.upload_and_sign(
                output_path, filename_hint=filename or video.filename or "blurred.mp4",
            )
        except Exception as exc:
            logger.exception("Supabase upload failed for %s", key if 'key' in locals() else '?')
            raise HTTPException(status_code=502, detail=f"Upload sink failed: {exc}") from exc

        return JSONResponse(
            {
                "ok": True,
                "url": signed_url,
                "storage_key": key,
                "expires_in_s": demo_settings.signed_url_seconds,
                "stats": {
                    "input_width": stats.input_width,
                    "input_height": stats.input_height,
                    "output_width": stats.output_width,
                    "output_height": stats.output_height,
                    "fps": round(stats.fps, 2),
                    "frame_count": stats.frame_count,
                    "duration_s": round(stats.duration_s, 2),
                    "faces_seen": stats.faces_seen,
                    "plates_seen": stats.plates_seen,
                    "frames_with_face": stats.frames_with_face,
                    "frames_with_plate": stats.frames_with_plate,
                    "face_detect_ms": round(stats.face_detect_ms, 1),
                    "plate_detect_ms": round(stats.plate_detect_ms, 1),
                    "blur_ms": round(stats.blur_ms, 1),
                    "encode_ms": round(stats.encode_ms, 1),
                    "total_ms": round(stats.total_ms, 1),
                    "options": {
                        "blur_faces": blur_faces,
                        "blur_plates": blur_plates,
                        "intensity": intensity,
                        "style": style,
                    },
                },
            }
        )
    finally:
        shutil.rmtree(tmp_dir, ignore_errors=True)
