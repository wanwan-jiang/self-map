import { RiasecInfo } from "../../db/riasec-infos";

type RiasecLevelKey = "h" | "n" | "l";

const RIASEC_ORDER = ["R", "I", "A", "S", "E", "C"] as const;
type RiasecLetter = (typeof RIASEC_ORDER)[number];

const LEVEL_KEYS = new Set<RiasecLevelKey>(["h", "n", "l"]);

interface DimensionInput {
  score?: unknown;
  max?: unknown;
}

interface SubmitBody {
  /** Holland 三字码等，与前端 `RIASEC_TYPE_KEY` 存值一致 */
  type?: string;
  /** 六维 R/I/A/S/E/C，每项 `{ score, max }` */
  stats?: Record<string, DimensionInput>;
}

/**
 * @description 将原始分占满分的比例映射为高/中/低三档，与库表 `RiasecInfo.levels` 键一致。
 */
function ratioToLevel(ratio: number): RiasecLevelKey {
  const pct = Math.max(0, Math.min(1, ratio)) * 100;
  if (pct >= 67) {
    return "h";
  }
  if (pct >= 34) {
    return "n";
  }
  return "l";
}

function readLevelText(levels: Record<string, string>, level: RiasecLevelKey): string {
  const text = levels[level];
  if (text === undefined || text === null) {
    throw createError({
      statusCode: 404,
      statusMessage: `维度说明缺少等级文案: level=${level}`,
    });
  }
  return String(text).trim();
}

/**
 * @description 归一化为六维大写键，缺项补 `{ score: 0, max: 0 }`。
 */
function normalizeRiasecStats(raw: unknown): Record<RiasecLetter, { score: number; max: number }> {
  const out: Record<RiasecLetter, { score: number; max: number }> = {
    R: { score: 0, max: 0 },
    I: { score: 0, max: 0 },
    A: { score: 0, max: 0 },
    S: { score: 0, max: 0 },
    E: { score: 0, max: 0 },
    C: { score: 0, max: 0 },
  };
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return out;
  }
  const rec = raw as Record<string, unknown>;
  for (const k of RIASEC_ORDER) {
    const cell = rec[k] ?? rec[k.toLowerCase()];
    if (cell && typeof cell === "object" && cell !== null && "score" in cell && "max" in cell) {
      const score = Number((cell as DimensionInput).score);
      const max = Number((cell as DimensionInput).max);
      out[k] = {
        score: Number.isFinite(score) ? score : 0,
        max: Number.isFinite(max) ? max : 0,
      };
    }
  }
  return out;
}

function hasAnyPositiveMax(stats: Record<RiasecLetter, { score: number; max: number }>): boolean {
  return RIASEC_ORDER.some((k) => stats[k].max > 0);
}

/**
 * @description 根据六维 `score/max` 计算相对强度，查 `RiasecInfo` 取 `levels[h|n|l]` 文案，供报告页与 AI 上下文使用。
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<SubmitBody>(event);
  const hollandType = typeof body?.type === "string" ? body.type.trim().toUpperCase() : "";
  const normalized = normalizeRiasecStats(body?.stats);

  if (!hasAnyPositiveMax(normalized)) {
    throw createError({
      statusCode: 400,
      statusMessage: "stats 缺少有效的霍兰德测评数据（各维 max 需大于 0）",
    });
  }

  const domainLevelDescriptions: Array<{
    domain: string;
    level: RiasecLevelKey;
    average: number;
    levelText: string;
  }> = [];

  for (const domainKey of RIASEC_ORDER) {
    const { score, max } = normalized[domainKey];

    if (max <= 0) {
      domainLevelDescriptions.push({
        domain: domainKey,
        level: "l",
        average: 0,
        levelText: "（该维度暂无有效答题，未计入强度）",
      });
      continue;
    }

    const ratio = score / max;
    const averagePct = Math.round(Math.max(0, Math.min(100, ratio * 100)));
    const level = ratioToLevel(ratio);
    const kNorm = level.toLowerCase() as RiasecLevelKey;

    const doc = await RiasecInfo.findOne({ domain: domainKey }).lean();
    if (!doc) {
      throw createError({
        statusCode: 404,
        statusMessage: `未发现霍兰德维度配置: domain=${domainKey}`,
      });
    }

    const levelsRaw = doc.levels as Record<string, unknown>;
    const levels: Record<string, string> = {};
    for (const [k, v] of Object.entries(levelsRaw)) {
      if (v !== undefined && v !== null) {
        levels[k] = String(v);
      }
    }

    if (!LEVEL_KEYS.has(kNorm)) {
      throw createError({
        statusCode: 500,
        statusMessage: `内部错误: 无效 level ${level}`,
      });
    }

    const levelText = readLevelText(levels, kNorm);

    domainLevelDescriptions.push({
      domain: domainKey,
      level: kNorm,
      average: averagePct,
      levelText,
    });
  }

  const titleLead = hollandType.length > 0 ? `霍兰德职业兴趣 · ${hollandType}` : "霍兰德职业兴趣";

  return {
    type: hollandType || undefined,
    title: titleLead,
    desc: "以下为你在现实型、研究型、艺术型、社会型、企业型、常规型六个维度上的相对强度与说明。",
    stats: normalized,
    domainLevelDescriptions,
  };
});
