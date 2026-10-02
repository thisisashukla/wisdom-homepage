const apiKey = (): string => {
  const value = Deno.env.get('OPENAI_API_KEY');
  if (!value) throw new Error('Missing OPENAI_API_KEY');
  return value;
};

const openAIRequest = async (path: string, init: RequestInit): Promise<Response> => {
  const response = await fetch(`https://api.openai.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      ...(init.headers ?? {}),
    },
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`OpenAI ${path} failed (${response.status}): ${message.slice(0, 500)}`);
  }
  return response;
};

export const transcribeAudio = async (
  bytes: Uint8Array,
  mimeType: string,
  language?: string,
): Promise<string> => {
  const form = new FormData();
  const extension = mimeType.includes('webm') ? 'webm'
    : mimeType.includes('wav') ? 'wav'
    : mimeType.includes('mpeg') ? 'mp3'
    : 'm4a';
  form.append('file', new File([bytes], `reflection.${extension}`, { type: mimeType }));
  form.append('model', Deno.env.get('OPENAI_TRANSCRIBE_MODEL') ?? 'gpt-4o-transcribe');
  form.append('response_format', 'json');
  form.append('prompt', 'A personal reflection which may include Indian names, Hindi, Hinglish, Sanskrit, Bhagavad Gita, dharma, karma, bhakti, viveka, vairagya, and yoga terminology. Preserve the speaker’s wording.');
  if (language) form.append('language', language);

  const response = await openAIRequest('/audio/transcriptions', { method: 'POST', body: form });
  const payload = await response.json() as { text?: string };
  const transcript = payload.text?.trim();
  if (!transcript) throw new Error('Transcription was empty');
  return transcript;
};

export const embedTexts = async (texts: string[]): Promise<number[][]> => {
  if (!texts.length) return [];
  const response = await openAIRequest('/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: Deno.env.get('OPENAI_EMBEDDING_MODEL') ?? 'text-embedding-3-small',
      input: texts,
    }),
  });
  const payload = await response.json() as { data?: Array<{ embedding?: number[]; index?: number }> };
  const rows = [...(payload.data ?? [])].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  const embeddings = rows.map((item) => item.embedding).filter((item): item is number[] => Boolean(item?.length));
  if (embeddings.length !== texts.length) throw new Error('Embedding response was incomplete');
  return embeddings;
};

export const embedText = async (text: string): Promise<number[]> => (await embedTexts([text]))[0];

const outputText = (payload: Record<string, unknown>): string => {
  if (typeof payload.output_text === 'string') return payload.output_text;
  const output = Array.isArray(payload.output) ? payload.output as Array<Record<string, unknown>> : [];
  for (const item of output) {
    const content = Array.isArray(item.content) ? item.content as Array<Record<string, unknown>> : [];
    for (const part of content) {
      if (typeof part.text === 'string') return part.text;
    }
  }
  throw new Error('Model returned no output text');
};

export const structuredResponse = async <T>(input: {
  name: string;
  schema: Record<string, unknown>;
  instructions: string;
  userText: string;
  model?: string;
}): Promise<T> => {
  const response = await openAIRequest('/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: input.model ?? Deno.env.get('OPENAI_TEXT_MODEL') ?? 'gpt-5-mini',
      store: false,
      instructions: input.instructions,
      input: input.userText,
      text: {
        format: {
          type: 'json_schema',
          name: input.name,
          strict: true,
          schema: input.schema,
        },
      },
    }),
  });
  const payload = await response.json() as Record<string, unknown>;
  return JSON.parse(outputText(payload)) as T;
};

export const synthesizeSpeech = async (text: string): Promise<Uint8Array> => {
  const response = await openAIRequest('/audio/speech', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: Deno.env.get('OPENAI_TTS_MODEL') ?? 'gpt-4o-mini-tts',
      voice: Deno.env.get('OPENAI_TTS_VOICE') ?? 'sage',
      response_format: 'mp3',
      input: text,
      instructions: 'Speak with calm warmth and grounded confidence. Reflective, unhurried, never theatrical or preachy. Pronounce Sanskrit source names carefully.',
    }),
  });
  return new Uint8Array(await response.arrayBuffer());
};

export const decodeBase64 = (value: string): Uint8Array => {
  const normalized = value.includes(',') ? value.slice(value.indexOf(',') + 1) : value;
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
};

export const encodeBase64 = (bytes: Uint8Array): string => {
  const chunkSize = 0x8000;
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
};
