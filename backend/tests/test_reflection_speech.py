import base64
import importlib.util
import io
from pathlib import Path
import sys
import types
import unittest
from unittest.mock import patch
import wave


def wav_bytes(frames=b'\x00\x00' * 12, rate=24000):
    out = io.BytesIO()
    with wave.open(out, 'wb') as writer:
        writer.setnchannels(1)
        writer.setsampwidth(2)
        writer.setframerate(rate)
        writer.writeframes(frames)
    return out.getvalue()


class SpeechTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.requests = []
        self.audio = base64.b64encode(wav_bytes()).decode()
        self.failed = False
        outer = self

        class Client:
            def __init__(self, **kwargs): pass
            async def __aenter__(self): return self
            async def __aexit__(self, *args): pass
            async def post(self, url, **kwargs):
                outer.requests.append((url, kwargs))
                return types.SimpleNamespace(is_error=outer.failed, status_code=503 if outer.failed else 200,
                                             json=lambda: {'audios': [outer.audio]})

        config = types.ModuleType('common.config')
        config.settings = types.SimpleNamespace(sarvam_api_key='test-key', sarvam_tts_speaker='shubh', sarvam_tts_language='en-IN')
        spec = importlib.util.spec_from_file_location('speech_under_test', Path(__file__).parents[1] / 'ai/reflection_speech.py')
        self.speech = importlib.util.module_from_spec(spec)
        with patch.dict(sys.modules, {'httpx': types.SimpleNamespace(AsyncClient=Client), 'common.config': config}):
            spec.loader.exec_module(self.speech)

    async def test_sarvam_contract_and_complete_multichunk_audio(self):
        text = ('Care for the work. कर्म योग। ' * 220).strip()
        result = await self.speech.synthesize_speech(text)
        self.assertGreater(len(self.requests), 1)
        sent = []
        for url, request in self.requests:
            self.assertEqual(url, 'https://api.sarvam.ai/text-to-speech')
            self.assertEqual(request['headers']['api-subscription-key'], 'test-key')
            payload = request['json']
            self.assertEqual(payload['model'], 'bulbul:v3')
            self.assertEqual(payload['output_audio_codec'], 'wav')
            self.assertEqual(payload['language_code'], 'en-IN')
            self.assertNotIn('pitch', payload)
            self.assertLessEqual(len(payload['text']), 2400)
            sent.append(payload['text'])
        self.assertEqual(' '.join(' '.join(sent).split()), ' '.join(text.split()))
        with wave.open(io.BytesIO(result), 'rb') as reader:
            self.assertEqual(reader.getnframes(), 12 * len(self.requests))
            self.assertEqual(reader.getframerate(), 24000)

    async def test_provider_failure_does_not_return_fake_audio(self):
        self.failed = True
        with self.assertRaisesRegex(RuntimeError, '503'):
            await self.speech.synthesize_speech('A short reflection.')

    async def test_invalid_audio_is_rejected(self):
        self.audio = base64.b64encode(b'not a wave file').decode()
        with self.assertRaises((wave.Error, EOFError)):
            await self.speech.synthesize_speech('A short reflection.')

    def test_long_unbroken_text_and_empty_input(self):
        self.assertEqual(''.join(self.speech.speech_chunks('ॐ' * 6000)), 'ॐ' * 6000)
        self.assertTrue(all(len(chunk) <= 2400 for chunk in self.speech.speech_chunks('ॐ' * 6000)))
        self.assertEqual(self.speech.speech_chunks('   '), [])
        with self.assertRaises(RuntimeError):
            self.speech.join_wave_audio([])

    def test_incompatible_audio_chunks_are_rejected(self):
        with self.assertRaisesRegex(RuntimeError, 'formats'):
            self.speech.join_wave_audio([wav_bytes(), wav_bytes(rate=16000)])
