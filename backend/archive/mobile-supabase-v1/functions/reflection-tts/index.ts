import { getRequestContext, hasProOrPreview } from '../_shared/auth.ts';
import { fail, handleOptions, json, readJson } from '../_shared/http.ts';
import { encodeBase64, synthesizeSpeech } from '../_shared/openai.ts';

type TtsRequest = { reflectionId: string };

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== 'POST') return fail(405, 'method_not_allowed', 'Use POST.');

  try {
    const { user, admin } = await getRequestContext(request);
    const { reflectionId } = await readJson<TtsRequest>(request);
    if (!reflectionId) return fail(400, 'reflection_required', 'Reflection ID is required.');

    const access = await hasProOrPreview(admin, user.id);
    if (!access.allowed) return fail(402, 'pro_required', 'Listening is part of Wisdom Pro.');

    const { data: reflection, error } = await admin
      .from('daily_reflections')
      .select('id, mirror, meaning, practice, quotes(source, chapter, verse_number, sanskrit_text, simple_meaning)')
      .eq('id', reflectionId).eq('user_id', user.id).eq('status', 'ready')
      .single();
    if (error || !reflection) return fail(404, 'not_found', 'Reflection not found.');

    const quoteRaw = reflection.quotes as unknown;
    const quote = (Array.isArray(quoteRaw) ? quoteRaw[0] : quoteRaw) as Record<string, string | null> | null;
    const source = [quote?.source, quote?.chapter, quote?.verse_number].filter(Boolean).join(' ');
    const speech = [
      reflection.mirror,
      quote?.sanskrit_text,
      source ? `From ${source}.` : null,
      reflection.meaning,
      `For tonight: ${reflection.practice}`,
    ].filter(Boolean).join('\n\n');

    await admin.from('daily_reflections').update({ tts_status: 'processing' })
      .eq('id', reflectionId).eq('user_id', user.id);
    const bytes = await synthesizeSpeech(speech);
    await admin.from('daily_reflections').update({
      tts_status: 'ready',
      updated_at: new Date().toISOString(),
    }).eq('id', reflectionId).eq('user_id', user.id);

    return json({ audioBase64: encodeBase64(bytes), mimeType: 'audio/mpeg', access });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Speech failed';
    const unauthorized = message === 'Unauthorized';
    console.error('reflection-tts', message);
    return fail(unauthorized ? 401 : 500, unauthorized ? 'unauthorized' : 'tts_failed',
      unauthorized ? 'Please sign in again.' : 'The audio could not be prepared. Please try again.');
  }
});
