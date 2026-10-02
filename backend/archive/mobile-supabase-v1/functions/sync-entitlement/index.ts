import { getRequestContext } from '../_shared/auth.ts';
import { fail, handleOptions, json } from '../_shared/http.ts';

type RevenueCatEntitlement = {
  expires_date?: string | null;
  product_identifier?: string | null;
};

Deno.serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== 'POST') return fail(405, 'method_not_allowed', 'Use POST.');
  try {
    const { user, admin } = await getRequestContext(request);
    const apiKey = Deno.env.get('REVENUECAT_SECRET_API_KEY');
    if (!apiKey) throw new Error('Missing REVENUECAT_SECRET_API_KEY');
    const response = await fetch(`https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(user.id)}`, {
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`RevenueCat lookup failed (${response.status})`);
    const payload = await response.json() as {
      subscriber?: { entitlements?: Record<string, RevenueCatEntitlement> };
    };
    const entitlements = Object.values(payload.subscriber?.entitlements ?? {});
    const now = Date.now();
    const active = entitlements.find((item) => !item.expires_date || new Date(item.expires_date).getTime() > now);
    await admin.from('user_entitlements').upsert({
      user_id: user.id,
      is_pro: Boolean(active),
      product_id: active?.product_identifier ?? null,
      expires_at: active?.expires_date ?? null,
      source: 'revenuecat_api',
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
    return json({ isPro: Boolean(active), expiresAt: active?.expires_date ?? null });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Entitlement sync failed';
    const unauthorized = message === 'Unauthorized';
    console.error('sync-entitlement', message);
    return fail(unauthorized ? 401 : 500, unauthorized ? 'unauthorized' : 'sync_failed',
      unauthorized ? 'Please sign in again.' : 'Subscription status could not be refreshed.');
  }
});
