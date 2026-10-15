"""Slim video-blur pipeline for the demo endpoint.

Reads an uploaded clip (PyAV), downscales to ``max_edge_px`` if
oversized, runs YuNet on every frame and RT-DETR on every Nth frame
(holding detections between runs), composites a dilated mask, applies
either Gaussian blur or pixelation, and writes an H.264 MP4 back out.

Kept intentionally simpler than blur-app/app/core/pipeline.py:

  * No scene detection / no tracker — the desktop app's per-scene
    keyframe+track speedup matters when you're processing hours of
    footage, not 60 s.
  * No verification loop — the demo can't ask the visitor "is this
    the right face?" and get a useful answer inline.
  * No audio passthrough — a re-encode with audio would need PyAV's
    re-mux path and the demo isn't the place to relitigate the
    hev1/hvc1 QuickTime bug the desktop app already ate.

Everything above is documented so a future engineer knows what was
deliberately dropped vs. what was forgotten.
"""

from __future__ import annotations

import logging
import time
from dataclasses import dataclass, field
from typing import Callable, List, Optional

import av
import cv2
import numpy as np

from server.blur_demo.config import settings as demo_settings
from server.blur_demo.detectors import Detection, FaceDetector, PlateDetector

logger = logging.getLogger(__name__)


# ── Options / result ─────────────────────────────────────────────────

@dataclass(frozen=True)
class BlurOptions:
    blur_faces: bool = True
    blur_plates: bool = True
    # Gaussian kernel radius (px). UI ships a 1-100 slider; we clamp
    # to a sane range and always coerce to odd (cv2 requirement).
    intensity: int = 51
    # "gaussian" | "pixelate". Pixelate is mathematically
    # irreversible; Gaussian is nicer to look at but partially
    # reversible via deconvolution.
    style: str = "gaussian"


@dataclass
class ProcessStats:
    input_width: int = 0
    input_height: int = 0
    output_width: int = 0
    output_height: int = 0
    fps: float = 0.0
    frame_count: int = 0
    duration_s: float = 0.0
    faces_seen: int = 0
    plates_seen: int = 0
    face_detect_ms: float = 0.0
    plate_detect_ms: float = 0.0
    blur_ms: float = 0.0
    encode_ms: float = 0.0
    total_ms: float = 0.0
    frames_with_face: int = 0
    frames_with_plate: int = 0
    warnings: List[str] = field(default_factory=list)


class DurationExceeded(ValueError):
    """Raised when a clip's actual decoded duration goes past the cap
    even though its container header claimed to be under."""


# ── Helpers ──────────────────────────────────────────────────────────

def _resize_if_needed(frame: np.ndarray, max_edge: int) -> tuple[np.ndarray, float]:
    """Return (frame_out, scale). scale is the multiplier applied so
    callers can un-scale detections back to input coords if needed —
    not used in the demo pipeline (we detect on the downscaled frame
    and blur on the same downscaled frame, then encode it out), but
    the value is kept in the return type for future callers."""
    h, w = frame.shape[:2]
    edge = max(h, w)
    if edge <= max_edge:
        return frame, 1.0
    scale = max_edge / float(edge)
    new_w = int(round(w * scale))
    new_h = int(round(h * scale))
    resized = cv2.resize(frame, (new_w, new_h), interpolation=cv2.INTER_AREA)
    return resized, scale


def _build_mask(shape: tuple[int, ...], dets: List[Detection], dilate_px: int = 8) -> np.ndarray:
    h, w = shape[0], shape[1]
    mask = np.zeros((h, w), dtype=np.uint8)
    for d in dets:
        x1, y1, x2, y2 = int(d.x1), int(d.y1), int(d.x2), int(d.y2)
        if x2 <= x1 or y2 <= y1:
            continue
        if d.label == "face":
            cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
            axes = (max(1, int((x2 - x1) / 2 * 1.2)), max(1, int((y2 - y1) / 2 * 1.3)))
            cv2.ellipse(mask, (cx, cy), axes, 0, 0, 360, 255, -1)
        else:
            cv2.rectangle(mask, (x1, y1), (x2, y2), 255, -1)
    if dilate_px > 0 and mask.any():
        k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (dilate_px * 2 + 1,) * 2)
        mask = cv2.dilate(mask, k)
    return mask


def _apply_blur(frame: np.ndarray, mask: np.ndarray, opts: BlurOptions) -> np.ndarray:
    if not mask.any():
        return frame
    intensity = max(5, min(151, int(opts.intensity))) | 1  # odd, 5..151
    if opts.style == "pixelate":
        block = max(4, intensity // 4)
        h, w = frame.shape[:2]
        small = cv2.resize(frame, (max(1, w // block), max(1, h // block)), interpolation=cv2.INTER_LINEAR)
        modified = cv2.resize(small, (w, h), interpolation=cv2.INTER_NEAREST)
    else:  # gaussian (default)
        modified = cv2.GaussianBlur(frame, (intensity, intensity), 0)
    # Feather the mask edge so the blurred region doesn't have a
    # hard seam. Same trick as the desktop app.
    mask_f = cv2.GaussianBlur(mask.astype(np.float32) / 255.0, (11, 11), 0)[..., None]
    composite = modified.astype(np.float32) * mask_f + frame.astype(np.float32) * (1 - mask_f)
    return composite.astype(np.uint8)


# ── Main entry point ─────────────────────────────────────────────────

def process_video(
    input_path: str,
    output_path: str,
    opts: BlurOptions,
    progress_cb: Optional[Callable[[float], None]] = None,
) -> ProcessStats:
    """Run the pipeline on ``input_path`` and write the result to
    ``output_path``. Raises DurationExceeded if the decoded clip is
    longer than the configured cap. Returns ProcessStats for telemetry.
    """
    stats = ProcessStats()
    t_total = time.perf_counter()

    face_detector: Optional[FaceDetector] = FaceDetector() if opts.blur_faces else None
    plate_detector: Optional[PlateDetector] = PlateDetector() if opts.blur_plates else None

    container = av.open(input_path)
    try:
        stream = container.streams.video[0]
        stats.input_width = int(stream.width or 0)
        stats.input_height = int(stream.height or 0)
        fps = float(stream.average_rate) if stream.average_rate else 30.0
        stats.fps = fps
        # Container-level duration in seconds. Some containers lie
        # (or lack a duration); we ALSO count decoded frames below and
        # abort mid-decode if we go past.
        if stream.duration and stream.time_base:
            declared = float(stream.duration * stream.time_base)
            if declared > demo_settings.max_duration_s + 0.5:
                raise DurationExceeded(
                    f"Video is {declared:.1f}s (limit {demo_settings.max_duration_s}s)."
                )

        max_frames = int((demo_settings.max_duration_s + 1) * fps)

        # First pass: get first frame to size the writer. PyAV needs
        # width/height/pix_fmt set at add_stream() time and we don't
        # know the *output* dimensions until after downscale.
        writer = None
        v_stream = None
        held_plates: List[Detection] = []
        held_plate_ttl = 0

        for i, frame in enumerate(container.decode(stream)):
            if i >= max_frames:
                raise DurationExceeded(
                    f"Video exceeded {demo_settings.max_duration_s}s during decode."
                )

            arr = frame.to_ndarray(format="bgr24")
            arr, _scale = _resize_if_needed(arr, demo_settings.max_edge_px)
            h, w = arr.shape[:2]

            if writer is None:
                writer = av.open(output_path, mode="w")
                # Always libx264 for the demo output: broadly
                # supported by browsers (including Safari), no
                # QuickTime hvc1/hev1 tagging trap to fall into.
                v_stream = writer.add_stream("libx264", rate=round(fps) or 30)
                v_stream.width = w
                v_stream.height = h
                v_stream.pix_fmt = "yuv420p"
                # yuv420p requires even dimensions; rounding-down
                # above can produce an odd number after INTER_AREA.
                if w % 2 or h % 2:
                    new_w = w - (w % 2)
                    new_h = h - (h % 2)
                    arr = arr[:new_h, :new_w]
                    v_stream.width = new_w
                    v_stream.height = new_h
                    w, h = new_w, new_h
                stats.output_width = w
                stats.output_height = h

            # Face detection every frame.
            face_dets: List[Detection] = []
            if face_detector is not None:
                t = time.perf_counter()
                face_dets = face_detector.detect(arr)
                stats.face_detect_ms += (time.perf_counter() - t) * 1000
                stats.faces_seen += len(face_dets)
                if face_dets:
                    stats.frames_with_face += 1

            # Plate detection every Nth frame; hold last detections
            # for a small window between runs.
            plate_dets: List[Detection] = []
            if plate_detector is not None:
                if i % demo_settings.plate_detect_every_n == 0:
                    t = time.perf_counter()
                    plate_dets = plate_detector.detect(arr)
                    stats.plate_detect_ms += (time.perf_counter() - t) * 1000
                    held_plates = plate_dets
                    held_plate_ttl = demo_settings.plate_hold_frames
                elif held_plate_ttl > 0:
                    plate_dets = held_plates
                    held_plate_ttl -= 1
                stats.plates_seen += len(plate_dets)
                if plate_dets:
                    stats.frames_with_plate += 1

            all_dets = face_dets + plate_dets
            t = time.perf_counter()
            mask = _build_mask(arr.shape, all_dets)
            blurred = _apply_blur(arr, mask, opts)
            stats.blur_ms += (time.perf_counter() - t) * 1000

            t = time.perf_counter()
            out_frame = av.VideoFrame.from_ndarray(blurred, format="bgr24")
            for packet in v_stream.encode(out_frame):  # type: ignore[union-attr]
                writer.mux(packet)  # type: ignore[union-attr]
            stats.encode_ms += (time.perf_counter() - t) * 1000
            stats.frame_count = i + 1

            if progress_cb is not None and stats.frame_count % 5 == 0:
                progress_cb(min(1.0, stats.frame_count / max_frames))

        if writer is None:
            raise ValueError("No decodable video frames found in upload.")

        # Flush encoder + close container.
        for packet in v_stream.encode():  # type: ignore[union-attr]
            writer.mux(packet)  # type: ignore[union-attr]
        writer.close()
    finally:
        container.close()

    stats.duration_s = stats.frame_count / stats.fps if stats.fps else 0.0
    stats.total_ms = (time.perf_counter() - t_total) * 1000
    logger.info(
        "blur-demo done: frames=%d duration=%.1fs faces=%d plates=%d total=%.1fs",
        stats.frame_count, stats.duration_s,
        stats.faces_seen, stats.plates_seen, stats.total_ms / 1000,
    )
    return stats
