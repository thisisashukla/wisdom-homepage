"""Detector wrappers for the blur-demo endpoint.

These are slimmed-down clones of blur-app/app/detectors/{faces,plates}.py,
inlined here so the FastAPI service has NO import-path dependency on the
desktop app source tree — the two projects live in separate repos and
deploy independently.

Both classes lazy-load their weights on first `.detect()` call so cold
starts of the endpoint don't pay for weights the request may not need
(e.g. a request with plates disabled never loads RT-DETR).
"""

from __future__ import annotations

import os
import threading
import urllib.request
from dataclasses import dataclass
from typing import List

import cv2
import numpy as np


# ── YuNet face detector ──────────────────────────────────────────────
# Same model + URL as the desktop app. Downloaded once into
# ~/.cache/blur-demo-models on first call; safe to bake into a Docker
# image if you'd rather not hit the network at request time.

YUNET_URL = (
    "https://media.githubusercontent.com/media/opencv/opencv_zoo/main/"
    "models/face_detection_yunet/face_detection_yunet_2023mar.onnx"
)
YUNET_FILENAME = "face_detection_yunet_2023mar.onnx"


@dataclass(frozen=True)
class Detection:
    x1: float
    y1: float
    x2: float
    y2: float
    score: float
    label: str

    def clipped(self, w: int, h: int) -> "Detection | None":
        x1 = max(0.0, self.x1)
        y1 = max(0.0, self.y1)
        x2 = min(float(w), self.x2)
        y2 = min(float(h), self.y2)
        if x2 <= x1 or y2 <= y1:
            return None
        return Detection(x1, y1, x2, y2, self.score, self.label)


def _models_dir() -> str:
    root = os.environ.get("BLUR_DEMO_MODELS_DIR")
    if root:
        os.makedirs(root, exist_ok=True)
        return root
    root = os.path.join(os.path.expanduser("~"), ".cache", "blur-demo-models")
    os.makedirs(root, exist_ok=True)
    return root


class FaceDetector:
    """YuNet wrapper. Reinitialised whenever input size changes so a
    portrait clip after a landscape one doesn't fail silently.

    Instances are NOT thread-safe (cv2's FaceDetectorYN keeps mutable
    state). The router uses a per-request instance and reuses weights
    via the on-disk cache — cheap since the model is 350 KB.
    """

    def __init__(self, score_threshold: float = 0.6):
        self._score_threshold = score_threshold
        self._model = None
        self._input_size: tuple[int, int] | None = None

    @staticmethod
    def _model_path() -> str:
        path = os.path.join(_models_dir(), YUNET_FILENAME)
        if not os.path.exists(path):
            urllib.request.urlretrieve(YUNET_URL, path)
        return path

    def _ensure(self, size: tuple[int, int]) -> None:
        if self._model is None or self._input_size != size:
            self._model = cv2.FaceDetectorYN_create(
                self._model_path(), "", size,
                score_threshold=self._score_threshold,
            )
            self._input_size = size

    def detect(self, frame_bgr: np.ndarray) -> List[Detection]:
        h, w = frame_bgr.shape[:2]
        self._ensure((w, h))
        _, faces = self._model.detect(frame_bgr)  # type: ignore[union-attr]
        if faces is None:
            return []
        out: List[Detection] = []
        for f in faces:
            x, y, bw, bh = float(f[0]), float(f[1]), float(f[2]), float(f[3])
            score = float(f[14])
            det = Detection(x, y, x + bw, y + bh, score, "face").clipped(w, h)
            if det is not None:
                out.append(det)
        return out


# ── RT-DETR-v2-LP plate detector ─────────────────────────────────────
# Shared across requests (weights are hundreds of MB — reloading per
# request would be a real cost). Guarded by a lock so we serialise
# forwards; the router already runs one request at a time on a given
# worker but this makes the class safe against future concurrency.

PLATE_MODEL_ID = "justjuu/rtdetr-v2-license-plate-detection"


class PlateDetector:
    _instance: "PlateDetector | None" = None
    _init_lock = threading.Lock()

    def __new__(cls, *_a, **_kw):
        # Singleton — the weights are large enough that we do NOT want
        # per-request instances even though the router is currently
        # sync/single-worker.
        if cls._instance is None:
            with cls._init_lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, score_threshold: float = 0.5):
        if getattr(self, "_initialised", False):
            return
        self._score_threshold = score_threshold
        self._model = None
        self._processor = None
        self._device = None
        self._torch = None
        self._infer_lock = threading.Lock()
        self._initialised = True

    def _ensure(self) -> None:
        if self._model is not None:
            return
        import torch
        from transformers import AutoImageProcessor, AutoModelForObjectDetection

        device = "cpu"  # server is CPU by default; MPS/CUDA path
        # requires the same float64 patch as the desktop app has and
        # isn't worth the complexity for a demo endpoint.
        self._device = device
        self._torch = torch
        self._processor = AutoImageProcessor.from_pretrained(PLATE_MODEL_ID)
        self._model = (
            AutoModelForObjectDetection.from_pretrained(PLATE_MODEL_ID)
            .to(device)
            .eval()
        )

    def detect(self, frame_bgr: np.ndarray) -> List[Detection]:
        with self._infer_lock:
            self._ensure()
            torch = self._torch
            processor = self._processor
            model = self._model

            # .copy() — same reason as the desktop app: a bare
            # [..., ::-1] view has a negative stride that torch
            # rejects at from_numpy() inside newer transformers.
            rgb = frame_bgr[:, :, ::-1].copy()
            inputs = processor(images=[rgb], return_tensors="pt").to(self._device)  # type: ignore[union-attr]
            with torch.no_grad():  # type: ignore[union-attr]
                outputs = model(**inputs)  # type: ignore[union-attr]

            h, w = frame_bgr.shape[:2]
            target_sizes = torch.tensor([[h, w]], dtype=torch.float32)  # type: ignore[union-attr]
            results = processor.post_process_object_detection(  # type: ignore[union-attr]
                outputs, target_sizes=target_sizes, threshold=self._score_threshold,
            )[0]

            dets: List[Detection] = []
            for score, box in zip(results["scores"], results["boxes"]):
                pts = box.tolist()
                det = Detection(
                    float(pts[0]), float(pts[1]),
                    float(pts[2]), float(pts[3]),
                    float(score), "plate",
                ).clipped(w, h)
                if det is not None:
                    dets.append(det)
            return dets
