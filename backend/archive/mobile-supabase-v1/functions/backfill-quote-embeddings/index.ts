import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { fail, handleOptions, json } from '../_shared/http.ts';
import { embedTexts } from '../_shared/openai.ts';

type QuoteRow = {
  id: string;
  simple_meaning: string;
  simple_insight: string | null;
  modern_relevance: string | null;
  insight: string | null;
  essence: string | null;
  source: string | null;
  tone: string | null;
  themes: string[] | null;
  emotions: string[] | null;
  life_domains: string[] | null;
};

const quoteText = (quote: QuoteRow): string => [
  quote.simple_meaning,
  quote.simple_insight,
  quote.modern_relevance,
  quote.insight,
  quote.essence,
  quote.source,
  quote.tone,
  ...(quote.themes ?? []),
  ...(quote.emotions ?? []),
  ...(quote.life_domains ?? []),
].filter(Boolean).join(' ');

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== 'POST') return fail(405, 'method_not_allowed', 'Use POST.');

  try {
    const expected = Deno.env.get('BACKFILL_AUTHORIZATION');
    if (!expected || request.headers.get('Authorization') !== expected) {
      return fail(401, 'unauthorized', 'Invalid backfill authorization.');
    }
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SECRET_KEY') ?? Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) throw new Error('Supabase service credentials are missing');
    const admin = createClient(url, key, { auth: { persistSession: false } });

    const { data, error } = await admin.from('quotes')
      .select('id, simple_meaning, simple_insight, modern_relevance, insight, essence, source, tone, themes, emotions, life_domains')
      .eq('editorial_status', 'approved')
      .is('embedding', null)
      .limit(50);
    if (error) throw error;
    const quotes = (data ?? []) as QuoteRow[];
    if (!quotes.length) return json({ processed: 0, complete: true });

    const model = Deno.env.get('OPENAI_EMBEDDING_MODEL') ?? 'text-embedding-3-small';
    const embeddings = await embedTexts(quotes.map(quoteText));
    const results = await Promise.all(quotes.map((quote, index) => admin.from('quotes').update({
      embedding: embeddings[index],
      embedding_model: model,
    }).eq('id', quote.id)));
    const updateError = results.find((result) => result.error)?.error;
    if (updateError) throw updateError;
    return json({ processed: quotes.length, complete: quotes.length < 50 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Backfill failed';
    console.error('backfill-quote-embeddings', message);
    return fail(500, 'backfill_failed', 'Quote embeddings could not be backfilled.');
  }
});
