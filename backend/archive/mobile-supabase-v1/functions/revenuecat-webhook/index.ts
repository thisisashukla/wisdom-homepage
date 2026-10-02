import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { fail, handleOptions, json } from '../_shared/http.ts';

type RevenueCatEvent = {
  type: string;
  app_user_id: string;
  product_id?: string;
  expiration_at_ms?: number | null;
};

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== 'POST') return fail(405, 'method_not_allowed', 'Use POST.');
  try {
    const expected = Deno.env.get('REVENUECAT_WEBHOOK_AUTHORIZATION');
    const received = request.headers.get('Authorization');
    if (!expected || received !== expected) return fail(401, 'unauthorized', 'Invalid webhook authorization.');

    const payload = await request.json() as { event?: RevenueCatEvent };
    const event = payload.event;
    if (!event?.app_user_id || !event.type) return fail(400, 'invalid_event', 'RevenueCat event is incomplete.');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SECRET_KEY') ?? Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !serviceKey) throw new Error('Supabase service credentials are missing');
    const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

    // Cancellation normally means auto-renew is off, not that access ended.
    const expired = event.type === 'EXPIRATION';
    const activeUntil = event.expiration_at_ms ? new Date(event.expiration_at_ms) : null;
    const stillActive = !expired && (!activeUntil || activeUntil.getTime() > Date.now());
    const { error } = await admin.from('user_entitlements').upsert({
      user_id: event.app_user_id,
      is_pro: stillActive,
      product_id: event.product_id ?? null,
      expires_at: activeUntil?.toISOString() ?? null,
      source: 'revenuecat_webhook',
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
    if (error) throw error;
    return json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook failed';
    console.error('revenuecat-webhook', message);
    return fail(500, 'webhook_failed', 'Webhook could not be processed.');
  }
});
