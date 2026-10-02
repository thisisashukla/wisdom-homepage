import { getRequestContext } from '../_shared/auth.ts';
import { fail, handleOptions, json } from '../_shared/http.ts';

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== 'POST' && request.method !== 'GET') return fail(405, 'method_not_allowed', 'Use GET or POST.');
  try {
    const { user, admin } = await getRequestContext(request);
    const { data, error } = await admin.from('daily_reflections')
      .select('id, local_date, input_mode, transcript, theme, mirror, meaning, practice, discussion_teaser, created_at, quotes(id, verse_id, sanskrit_text, transliteration, simple_meaning, source, chapter, verse_number)')
      .eq('user_id', user.id).eq('status', 'ready')
      .order('local_date', { ascending: false }).limit(60);
    if (error) throw error;
    const reflections = (data ?? []).map((row) => {
      const quoteRaw = row.quotes as unknown;
      const quote = (Array.isArray(quoteRaw) ? quoteRaw[0] : quoteRaw) as Record<string, unknown> | null;
      return {
        id: row.id,
        local_date: row.local_date,
        input_mode: row.input_mode,
        transcript: row.transcript,
        theme: row.theme,
        mirror: row.mirror,
        meaning: row.meaning,
        practice: row.practice,
        discussion_teaser: row.discussion_teaser,
        created_at: row.created_at,
        quote: {
          id: quote?.id,
          verseId: quote?.verse_id,
          sanskrit: quote?.sanskrit_text,
          transliteration: quote?.transliteration,
          simpleMeaning: quote?.simple_meaning,
          source: quote?.source,
          chapter: quote?.chapter,
          verseNumber: quote?.verse_number,
        },
      };
    });
    return json({ reflections });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'History failed';
    const unauthorized = message === 'Unauthorized';
    console.error('reflection-history', message);
    return fail(unauthorized ? 401 : 500, unauthorized ? 'unauthorized' : 'history_failed',
      unauthorized ? 'Please sign in again.' : 'Your reflections could not be loaded.');
  }
});
