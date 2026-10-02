import { getRequestContext } from '../_shared/auth.ts';
import { fail, handleOptions, json, readJson } from '../_shared/http.ts';
import { decodeBase64, transcribeAudio } from '../_shared/openai.ts';

type SttRequest = {
  audioBase64: string;
  mimeType?: string;
  language?: string;
  reflectionId?: string;
};

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== 'POST') return fail(405, 'method_not_allowed', 'Use POST.');

  try {
    const { user, admin } = await getRequestContext(request);
    const body = await readJson<SttRequest>(request);
    if (!body.audioBase64) return fail(400, 'audio_required', 'An audio recording is required.');

    const audio = decodeBase64(body.audioBase64);
    if (audio.byteLength < 500) return fail(400, 'audio_too_short', 'The recording is too short to transcribe.');
    if (audio.byteLength > 10 * 1024 * 1024) return fail(413, 'audio_too_large', 'The recording must be under 10 MB.');

    if (body.reflectionId) {
      await admin.from('daily_reflections').update({ status: 'transcribing' })
        .eq('id', body.reflectionId).eq('user_id', user.id);
    }

    const transcript = await transcribeAudio(
      audio,
      body.mimeType ?? 'audio/mp4',
      body.language,
    );

    if (body.reflectionId) {
      await admin.from('daily_reflections').update({
        transcript,
        status: 'created',
        updated_at: new Date().toISOString(),
      }).eq('id', body.reflectionId).eq('user_id', user.id);
    }

    return json({ transcript });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Transcription failed';
    const unauthorized = message === 'Unauthorized';
    console.error('reflection-stt', message);
    return fail(unauthorized ? 401 : 500, unauthorized ? 'unauthorized' : 'stt_failed',
      unauthorized ? 'Please sign in again.' : 'We could not hear that clearly. Please try again.');
  }
});
