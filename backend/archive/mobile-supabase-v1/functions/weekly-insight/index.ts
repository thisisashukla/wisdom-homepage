import { getRequestContext } from '../_shared/auth.ts';
import { fail, handleOptions, json, readJson } from '../_shared/http.ts';
import { structuredResponse } from '../_shared/openai.ts';
import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';

type WeeklyRequest = { cycleId: string };
type InsightCopy = {
  weekSentence: string;
  recurringPattern: string;
  nextWeekPractice: string;
  evidenceReflectionIds: string[];
};

const insightSchema = {
  type: 'object', additionalProperties: false,
  required: ['weekSentence', 'recurringPattern', 'nextWeekPractice', 'evidenceReflectionIds'],
  properties: {
    weekSentence: { type: 'string', maxLength: 220 },
    recurringPattern: { type: 'string', maxLength: 420 },
    nextWeekPractice: { type: 'string', maxLength: 180 },
    evidenceReflectionIds: { type: 'array', items: { type: 'string' }, minItems: 2, maxItems: 7 },
  },
};

const saveCycleMemory = async (
  admin: SupabaseClient,
  userId: string,
  cycleId: string,
  summary: string,
  evidenceCount: number,
) => {
  const { error } = await admin.from('user_memories').upsert({
    user_id: userId,
    pattern_key: `weekly:${cycleId}`,
    summary,
    evidence_count: evidenceCount,
    confidence: Math.min(0.9, 0.5 + evidenceCount * 0.05),
    status: 'active',
    last_seen_at: new Date().toISOString(),
  }, { onConflict: 'user_id,pattern_key' });
  if (error) throw error;
};

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== 'POST') return fail(405, 'method_not_allowed', 'Use POST.');
  try {
    const { user, admin } = await getRequestContext(request);
    const { cycleId } = await readJson<WeeklyRequest>(request);
    if (!cycleId) return fail(400, 'cycle_required', 'Cycle ID is required.');

    const { data: cycle, error: cycleError } = await admin.from('reflection_cycles')
      .select('id, ends_on, timezone').eq('id', cycleId).eq('user_id', user.id).single();
    if (cycleError || !cycle) return fail(404, 'not_found', 'Reflection week not found.');
    const today = new Intl.DateTimeFormat('en-CA', {
      timeZone: cycle.timezone,
      year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(new Date());
    if (today < cycle.ends_on) {
      return fail(409, 'week_in_progress', 'Your pattern reveals at the end of Day 7.');
    }

    const { data: existing } = await admin.from('weekly_insights')
      .select('*').eq('cycle_id', cycleId).eq('user_id', user.id).maybeSingle();
    if (existing) {
      await saveCycleMemory(
        admin,
        user.id,
        cycleId,
        existing.recurring_pattern,
        existing.evidence_reflection_ids?.length ?? 2,
      );
      await admin.from('reflection_cycles').update({ status: 'completed' }).eq('id', cycleId).eq('user_id', user.id);
      return json({ insight: existing, cached: true });
    }

    const { data: reflections, error } = await admin.from('daily_reflections')
      .select('id, local_date, private_summary, theme, mirror, practice, quote_id')
      .eq('cycle_id', cycleId).eq('user_id', user.id).eq('status', 'ready')
      .order('local_date', { ascending: true });
    if (error) throw error;
    if (!reflections || reflections.length < 4) {
      return fail(409, 'not_ready', 'Complete at least four reflections to reveal your week.');
    }

    const insight = await structuredResponse<InsightCopy>({
      name: 'weekly_reflection_insight',
      schema: insightSchema,
      instructions: [
        'Summarise a week of private reflections with warmth and precision.',
        'Use only patterns supported by at least two supplied reflections. Never diagnose or overclaim.',
        'Write one vivid sentence for the week, one recurring pattern with evidence, and one tiny practice for next week.',
        'Return only IDs present in the supplied reflections.',
      ].join(' '),
      userText: JSON.stringify(reflections),
    });
    const validIds = new Set(reflections.map((item) => item.id));
    const requestedEvidence = insight.evidenceReflectionIds.filter((id) => validIds.has(id));
    const evidence = requestedEvidence.length >= 2
      ? requestedEvidence
      : reflections.slice(0, 2).map((item) => item.id);
    const quoteId = reflections.find((item) => item.quote_id)?.quote_id ?? null;
    const { data: saved, error: saveError } = await admin.from('weekly_insights').insert({
      user_id: user.id,
      cycle_id: cycleId,
      week_sentence: insight.weekSentence,
      recurring_pattern: insight.recurringPattern,
      quote_id: quoteId,
      next_week_practice: insight.nextWeekPractice,
      evidence_reflection_ids: evidence,
    }).select('*').single();
    if (saveError) throw saveError;
    await saveCycleMemory(admin, user.id, cycleId, saved.recurring_pattern, evidence.length);
    await admin.from('reflection_cycles').update({ status: 'completed' }).eq('id', cycleId).eq('user_id', user.id);
    return json({ insight: saved, cached: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Insight failed';
    const unauthorized = message === 'Unauthorized';
    console.error('weekly-insight', message);
    return fail(unauthorized ? 401 : 500, unauthorized ? 'unauthorized' : 'insight_failed',
      unauthorized ? 'Please sign in again.' : 'Your week could not be prepared yet. Please retry.');
  }
});
