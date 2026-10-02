import { createClient, type SupabaseClient, type User } from 'https://esm.sh/@supabase/supabase-js@2';

export type RequestContext = {
  user: User;
  admin: SupabaseClient;
  token: string;
};

const requiredEnv = (name: string): string => {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing ${name}`);
  return value;
};

export const getRequestContext = async (request: Request): Promise<RequestContext> => {
  const authorization = request.headers.get('Authorization') ?? '';
  if (!authorization.startsWith('Bearer ')) throw new Error('Unauthorized');

  const token = authorization.slice('Bearer '.length).trim();
  const url = requiredEnv('SUPABASE_URL');
  const secret = Deno.env.get('SUPABASE_SECRET_KEY') ?? requiredEnv('SUPABASE_SERVICE_ROLE_KEY');
  const admin = createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) throw new Error('Unauthorized');
  return { user: data.user, admin, token };
};

export const hasProOrPreview = async (
  admin: SupabaseClient,
  userId: string,
): Promise<{ allowed: boolean; isPro: boolean; isPreview: boolean }> => {
  const [{ data: entitlement }, { data: profile }] = await Promise.all([
    admin
      .from('user_entitlements')
      .select('is_pro, expires_at')
      .eq('user_id', userId)
      .maybeSingle(),
    admin
      .from('reflection_profiles')
      .select('first_cycle_started_on')
      .eq('user_id', userId)
      .maybeSingle(),
  ]);

  const expiry = entitlement?.expires_at ? new Date(entitlement.expires_at).getTime() : null;
  const isPro = Boolean(entitlement?.is_pro) && (expiry === null || expiry > Date.now());
  const previewStart = profile?.first_cycle_started_on
    ? new Date(`${profile.first_cycle_started_on}T00:00:00Z`).getTime()
    : null;
  const isPreview = previewStart !== null && Date.now() - previewStart < 7 * 86_400_000;
  return { allowed: isPro || isPreview, isPro, isPreview };
};

