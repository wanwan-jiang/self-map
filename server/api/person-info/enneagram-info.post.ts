import { EnneagramInfo } from "../../db/enneagram-infos";

const ENNEAGRAM_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I"] as const;
type EnneagramLetter = (typeof ENNEAGRAM_LETTERS)[number];

const ENNEAGRAM_LETTER_TO_TYPE_NO: Record<EnneagramLetter, number> = {
  A: 9,
  B: 6,
  C: 3,
  D: 1,
  E: 4,
  F: 2,
  G: 8,
  H: 5,
  I: 7,
};

interface SubmitBody {
  /** 与 `usePersonSubmit` 写入的 Holland 码一致，可选 */
  type?: string;
  stats?: Record<string, unknown>;
}

interface ScoreRow {
  letter: EnneagramLetter;
  no: number;
  score: number;
}

function readLetterScore(stats: Record<string, unknown>, letter: EnneagramLetter): number {
  const raw = stats[letter] ?? stats[letter.toLowerCase()];
  const n = typeof raw === "number" ? raw : Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

/**
 * @description 最大余数法：九项展示用「×10 百分点」整数和为 1000（合计 100.0%）。
 */
function allocatePercentTenths(weights: Record<EnneagramLetter, number>, weightTotal: number): Record<EnneagramLetter, number> {
  const letters: EnneagramLetter[] = [...ENNEAGRAM_LETTERS];
  if (weightTotal <= 0) {
    const out = {} as Record<EnneagramLetter, number>;
    const base = Math.floor(1000 / letters.length);
    const rem = 1000 - base * letters.length;
    letters.forEach((L, i) => {
      out[L] = base + (i < rem ? 1 : 0);
    });
    return out;
  }

  const rows = letters.map((L) => {
    const exact = (weights[L] / weightTotal) * 1000;
    const flo = Math.floor(exact + 1e-9);
    const frac = exact - flo;
    return { L, flo, frac };
  });
  const sumFlo = rows.reduce((s, r) => s + r.flo, 0);
  const rem = 1000 - sumFlo;
  rows.sort((a, b) => b.frac - a.frac);
  const out = {} as Record<EnneagramLetter, number>;
  for (const r of rows) {
    out[r.L] = r.flo;
  }
  for (let k = 0; k < rem; k++) {
    const L = rows[k]?.L;
    if (L !== undefined) {
      out[L] += 1;
    }
  }
  return out;
}

/**
 * @description 按得分降序、九型编号升序；取「前三名」并包含与第三名同分的后续项。
 */
function selectTopRowsWithTieAtThird(sorted: ScoreRow[]): ScoreRow[] {
  if (sorted.length === 0) {
    return [];
  }
  const thirdScore = sorted[2]?.score ?? 0;
  if (thirdScore > 0) {
    return sorted.filter((r) => r.score >= thirdScore);
  }
  return sorted.filter((r) => r.score > 0);
}

/**
 * @description 根据测评 stats（字母 A–I 计分）取前三名（含第三名同分并列），查库拼成 `character` 等返回前端。
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<SubmitBody>(event);
  const statsRaw = body?.stats;

  if (!statsRaw || typeof statsRaw !== "object" || Array.isArray(statsRaw)) {
    throw createError({
      statusCode: 400,
      statusMessage: "stats 必须为对象",
    });
  }

  const scores: Record<EnneagramLetter, number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
  };
  let total = 0;
  for (const L of ENNEAGRAM_LETTERS) {
    const s = readLetterScore(statsRaw as Record<string, unknown>, L);
    scores[L] = s;
    total += s;
  }

  if (total <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "stats 得分总和须大于 0",
    });
  }

  const rows: ScoreRow[] = ENNEAGRAM_LETTERS.map((letter) => ({
    letter,
    no: ENNEAGRAM_LETTER_TO_TYPE_NO[letter],
    score: scores[letter],
  }));

  rows.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.no - b.no;
  });

  const selected = selectTopRowsWithTieAtThird(rows);
  if (selected.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "无有效得分类型",
    });
  }

  const percentTenths = allocatePercentTenths(scores, total);

  const maxScore = rows[0]?.score ?? 0;
  const primaryType = rows
    .filter((r) => r.score === maxScore)
    .map((r) => String(r.no))
    .sort((a, b) => Number(a) - Number(b))
    .join(",");

  const character: Array<{ content: string; tags: Record<string, string> }> = [];

  for (let i = 0; i < selected.length; i++) {
    const row = selected[i]!;
    const noStr = String(row.no);
    const doc =
      (await EnneagramInfo.findOne({ no: noStr }).lean()) ??
      (await EnneagramInfo.findOne({ domain: row.letter }).lean()) ??
      (await EnneagramInfo.findOne({ domain: noStr }).lean());

    if (!doc) {
      throw createError({
        statusCode: 404,
        statusMessage: `未发现九型库配置：编号 ${noStr}（字母 ${row.letter}）`,
      });
    }

    const domain = String(doc.domain ?? "").trim();
    const domainName = String(doc.domainName ?? "").trim();
    const desc = String(doc.desc ?? "").trim();
    const pctLabel = `${(percentTenths[row.letter] / 10).toFixed(1)}%`;

    const composed = [domainName, domain ? `域 ${domain}` : "", `九型 ${doc.no}`, `得分 ${row.score}`, `占比 ${pctLabel}`, desc]
      .filter((p) => p.length > 0)
      .join(" · ");

    character.push({
      content: composed,
      tags: {
        rank: String(i + 1),
        letter: row.letter,
        no: noStr,
        domain,
        domainName,
        score: String(row.score),
        percentLabel: pctLabel,
        desc,
      },
    });
  }

  const typeFromClient = typeof body.type === "string" ? body.type.trim().toUpperCase() : "";
  const title =
    typeFromClient.length > 0 ? `九型人格测评 · ${typeFromClient}` : `九型人格测评 · 主型 ${primaryType}`;

  const descSummary = character
    .slice(0, 3)
    .map((c) => c.tags.domainName || c.tags.no)
    .filter(Boolean)
    .join("、");

  return {
    type: primaryType,
    title,
    desc:
      selected.length > 3
        ? `得分靠前的类型包括：${character.map((c) => c.tags.domainName || `型${c.tags.no}`).join("、")}。`
        : `核心画像：${descSummary}。`,
    stats: scores,
    character,
  };
});
