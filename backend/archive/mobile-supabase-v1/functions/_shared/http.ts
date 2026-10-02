export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

export const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

export const fail = (status: number, code: string, message: string): Response =>
  json({ error: { code, message } }, status);

export const handleOptions = (request: Request): Response | null =>
  request.method === 'OPTIONS'
    ? new Response('ok', { headers: corsHeaders })
    : null;

export const readJson = async <T>(request: Request): Promise<T> => {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new Error('Expected application/json');
  }
  return await request.json() as T;
};

