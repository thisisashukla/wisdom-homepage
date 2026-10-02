import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';

export type ReflectionCycle = {
  id: string;
  starts_on: string;
  ends_on: string;
  timezone: string;
  completed_days: number;
  status: 'active' | 'qualified' | 'completed';
};

const addDays = (date: string, days: number): string => {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
};

export const getOrCreateCycle = async (
  admin: SupabaseClient,
  userId: string,
  localDate: string,
  timezone: string,
): Promise<ReflectionCycle> => {
  const { data: existing, error: existingError } = await admin
    .from('reflection_cycles')
    .select('id, starts_on, ends_on, timezone, completed_days, status')
    .eq('user_id', userId)
    .in('status', ['active', 'qualified'])
    .maybeSingle();
  if (existingError) throw existingError;
  if (existing && localDate <= existing.ends_on) return existing as ReflectionCycle;

  if (existing) {
    await admin.from('reflection_cycles').update({ status: 'completed' }).eq('id', existing.id);
  }

  const row = {
    user_id: userId,
    starts_on: localDate,
    ends_on: addDays(localDate, 6),
    timezone,
  };
  const { data, error } = await admin
    .from('reflection_cycles')
    .insert(row)
    .select('id, starts_on, ends_on, timezone, completed_days, status')
    .single();
  if (error) throw error;

  const { data: profile } = await admin
    .from('reflection_profiles')
    .select('first_cycle_started_on')
    .eq('user_id', userId)
    .maybeSingle();
  await admin.from('reflection_profiles').upsert({
    user_id: userId,
    timezone,
    first_cycle_started_on: profile?.first_cycle_started_on ?? localDate,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id', ignoreDuplicates: false });

  return data as ReflectionCycle;
};

export const refreshCycleCount = async (
  admin: SupabaseClient,
  cycleId: string,
): Promise<number> => {
  const { count, error } = await admin
    .from('daily_reflections')
    .select('id', { count: 'exact', head: true })
    .eq('cycle_id', cycleId)
    .eq('status', 'ready');
  if (error) throw error;
  const completed = Math.min(count ?? 0, 7);
  await admin
    .from('reflection_cycles')
    .update({
      completed_days: completed,
      status: completed >= 4 ? 'qualified' : 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('id', cycleId);
  return completed;
};
