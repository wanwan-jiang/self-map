import { BigFiveInfo } from "../../db/bigfive-infos";

type BigFiveLevelKey = "h" | "n" | "l";

interface BigFiveStatItemInput {
  domain: string;
  average: number;
  level: BigFiveLevelKey;
}

interface SubmitBody {
  /** 与前端 `BigFiveStatItem` 一致：各维度 domain、平均分、等级 */
  stats?: BigFiveStatItemInput[];
}

const LEVEL_KEYS = new Set<BigFiveLevelKey>(["h", "n", "l"]);

function normalizeLevel(raw: string): BigFiveLevelKey | null {
  const k = raw.toLowerCase() as BigFiveLevelKey;
  return LEVEL_KEYS.has(k) ? k : null;
}

function readLevelText(levels: Record<string, string>, level: BigFiveLevelKey): string {
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
 * @description 根据测评 `stats` 每条记录的 `domain` + `level`，查询 `BigFiveInfo`，取 `levels[level]` 文案。
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<SubmitBody>(event);
  const stats = body?.stats;

  if (!Array.isArray(stats) || stats.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "stats 必须为非空数组",
    });
  }

  const statsLevelDescriptions: Array<{
    domain: string;
    level: BigFiveLevelKey;
    average: number;
    levelText: string;
  }> = [];

  for (const item of stats) {
    const domainRaw = typeof item.domain === "string" ? item.domain.trim() : "";
    if (!domainRaw) {
      throw createError({
        statusCode: 400,
        statusMessage: "stats 项缺少 domain",
      });
    }

    const levelNorm = normalizeLevel(String(item.level ?? ""));
    if (!levelNorm) {
      throw createError({
        statusCode: 400,
        statusMessage: `无效的 level: ${String(item.level)}（仅支持 h / n / l）`,
      });
    }

    const domainKey = domainRaw.toUpperCase();
    const doc = await BigFiveInfo.findOne({ domain: domainKey }).lean();
    if (!doc) {
      throw createError({
        statusCode: 404,
        statusMessage: `未发现维度配置: domain=${domainKey}`,
      });
    }

    const levelsRaw = doc.levels as Record<string, unknown>;
    const levels: Record<string, string> = {};
    for (const [k, v] of Object.entries(levelsRaw)) {
      if (v !== undefined && v !== null) {
        levels[k] = String(v);
      }
    }

    const levelText = readLevelText(levels, levelNorm);

    statsLevelDescriptions.push({
      domain: domainKey,
      level: levelNorm,
      average:
        typeof item.average === "number" && !Number.isNaN(item.average) ? item.average : Number(item.average) || 0,
      levelText,
    });
  }

  return {
    stats: statsLevelDescriptions,
  };
});
