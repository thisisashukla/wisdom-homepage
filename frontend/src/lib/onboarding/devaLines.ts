// Copied from the Wisdom app (wisdom/app/constants/devaLines.ts, v3). Keep in sync.
// Devanagari laid out as card lines. Verses break at their dandas (and ASCII
// pipes); a piece too long for one line becomes the fewest balanced lines that
// each fit, words never split. Prose passages with no dandas (Upaniṣad prose,
// long chaupai blocks) don't fall back to English: they set a size down and
// wrap wider, and only a passage too long even for that is cut at a line end.

export type DevaLayout = { lines: string[]; size: number; lineHeight: number; cut: boolean };

const TIERS = [
  { width: 38, max: 6, size: 22, lineHeight: 40 },   // a verse: one pada a line
  { width: 46, max: 8, size: 17, lineHeight: 31 },   // prose: smaller, wider lines
];

function wrapBalanced(seg: string, width: number): string[] {
  if (seg.length <= width) return [seg];
  const words = seg.split(" ");
  for (let n = Math.ceil(seg.length / width); ; n++) {
    const target = seg.length / n;
    const out: string[] = [];
    let cur = "";
    for (const w of words) {
      const cand = cur ? `${cur} ${w}` : w;
      if (cur && cand.length > target + 4 && out.length < n - 1) { out.push(cur); cur = w; }
      else cur = cand;
    }
    out.push(cur);
    if (out.every((l) => l.length <= width) || n >= words.length) return out;
  }
}

export function devaSegments(s?: string | null): string[] {
  if (!s) return [];
  const clean = s
    .replace(/[॥|]\s*[०-९0-9.\-–\s]+\s*[॥|]/g, "॥")
    .replace(/\|\|/g, "॥").replace(/\|/g, "।")
    .replace(/\s+/g, " ")
    .trim();
  const segs: string[] = [];
  for (const raw of clean.replace(/([।॥]+)\s*/g, "$1\n").split("\n")) {
    const seg = raw.trim();
    if (!seg) continue;
    if (/^[।॥\s]+$/.test(seg) && segs.length) segs[segs.length - 1] += ` ${seg}`;
    else segs.push(seg);
  }
  return segs;
}

/** The Sanskrit as card lines at the largest size that keeps it readable, or null if there is none. */
export function devaLayout(s?: string | null): DevaLayout | null {
  const segs = devaSegments(s);
  if (!segs.length) return null;
  for (const t of TIERS) {
    const lines = segs.flatMap((g) => wrapBalanced(g, t.width));
    if (lines.length <= t.max) return { lines, size: t.size, lineHeight: t.lineHeight, cut: false };
  }
  const t = TIERS[TIERS.length - 1];
  const lines = segs.flatMap((g) => wrapBalanced(g, t.width)).slice(0, t.max);
  lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[।॥\s]+$/, "")} …`;
  return { lines, size: t.size, lineHeight: t.lineHeight, cut: true };
}
