/**
 * @description 大五人格报告页数据流：同步结果、拉取报告、同步维度描述、构建 AI 上下文并触发流式生成。
 */
import type { Ref } from "vue";
import { fetchUserLatestBigFiveResults, fetchUserBigFiveInfo } from "../api/user/personResults";
import type { SelfmapReportHeaderModel, SelfmapSkillModel } from "../types/selfmapReportType";
import type { BigFiveStatItem } from "../types/userBigFiveResultType";
import { BIG_FIVE_STATS_KEY, BIG_FIVE_SUBMIT_EVENT } from "../variables/variable";
import type { SelfmapSavedHistoryItem } from "./mbti-info";

const BIG_FIVE_DOMAIN_ROWS = [
  { id: "O", title: "开放性" },
  { id: "C", title: "尽责性" },
  { id: "E", title: "外向性" },
  { id: "A", title: "亲和性" },
  { id: "N", title: "情绪性" },
] as const;

/** `bigfive-info` 返回的 stats 项含库表解析字段 `levelText` */
type BigFiveStatWithLevelText = BigFiveStatItem;

/**
 * @description 将带 `levelText` 的 stats 同步到 `domainLevelDescriptions`，供子组件展示。
 */
function syncBigFiveDomainLevelDescriptions(model: SelfmapReportHeaderModel): void {
  const raw = model.stats;
  if (!Array.isArray(raw)) {
    return;
  }
  const descriptions = raw
    .filter((s): s is BigFiveStatWithLevelText & { levelText: string } => {
      if (typeof s !== "object" || s === null) {
        return false;
      }
      const lt = (s as BigFiveStatWithLevelText).levelText;
      return typeof lt === "string" && lt.trim().length > 0;
    })
    .map((s) => ({
      domain: String(s.domain).toUpperCase(),
      level: s.level,
      average: typeof s.average === "number" && !Number.isNaN(s.average) ? s.average : Number(s.average) || 0,
      levelText: s.levelText.trim(),
    }));
  if (descriptions.length > 0) {
    model.domainLevelDescriptions = descriptions;
  }
}

/**
 * @description 按 OCEAN 顺序拼接 AI 上下文：`中文名（字母）：得分 x（满分100），性格：levelText`
 */
function buildBigFiveAiContextLines(statList: unknown): string {
  if (!Array.isArray(statList)) {
    return "";
  }
  const byDomain = new Map<string, BigFiveStatWithLevelText>();
  for (const item of statList) {
    if (typeof item !== "object" || item === null || !("domain" in item)) {
      continue;
    }
    const s = item as BigFiveStatWithLevelText;
    byDomain.set(String(s.domain).toUpperCase(), {
      domain: String(s.domain),
      average: typeof s.average === "number" && !Number.isNaN(s.average) ? s.average : Number(s.average) || 0,
      level: s.level,
      levelText: typeof s.levelText === "string" ? s.levelText : "",
    });
  }
  return BIG_FIVE_DOMAIN_ROWS.map(({ id, title }) => {
    const row = byDomain.get(id);
    if (!row) {
      return `${title}（${id}）：暂无测评数据`;
    }
    const score = Math.round(Math.max(0, Math.min(100, (row.average / 5) * 100)));
    const trait = row.levelText?.trim() || "（暂无性格说明）";
    return `${title}（${id}）：得分 ${score}（满分100），性格：${trait}`;
  }).join("\n");
}

export interface RunBigFiveSelfmapInfoSectionDeps {
  submitResult: Ref<SelfmapReportHeaderModel>;
  savedHistory: Ref<SelfmapSavedHistoryItem[]>;
  resultQwenMbti: Ref<string>;
  aiSkills: Ref<SelfmapSkillModel[]>;
  message: Ref<string>;
  messageTitle: Ref<string>;
  messageHead: Ref<string>;
  bigFiveAiIdentityHeadline: Ref<string>;
  reportSkillsFallback: SelfmapSkillModel[] | undefined;
  askQwenStream: (prompt: string, onDelta: (delta: string, fullText: string) => void) => Promise<string | null>;
  parseSkillsFromStreamText: (fullText: string) => SelfmapSkillModel[];
}

/**
 * @description 在已登录前提下执行大五人格分支：写回 `savedHistory`、可能更新 localStorage、请求报告并触发 AI 流。
 */
export async function runBigFiveSelfmapInfoSection(deps: RunBigFiveSelfmapInfoSectionDeps): Promise<void> {
  const {
    submitResult,
    savedHistory,
    resultQwenMbti,
    aiSkills,
    message,
    messageTitle,
    messageHead,
    bigFiveAiIdentityHeadline,
    reportSkillsFallback,
    askQwenStream,
    parseSkillsFromStreamText,
  } = deps;

  let stats = JSON.parse(window.localStorage.getItem(BIG_FIVE_STATS_KEY) ?? "{}") as BigFiveStatItem[];

  const res = await fetchUserLatestBigFiveResults();
  savedHistory.value = res.data ?? [];

  if (savedHistory.value.length > 0) {
    const latestStats = savedHistory.value[0]?.stats ?? {};
    stats = latestStats as BigFiveStatItem[];
    window.localStorage.setItem(BIG_FIVE_STATS_KEY, JSON.stringify(latestStats));
    window.dispatchEvent(new Event(BIG_FIVE_SUBMIT_EVENT));
  }

  submitResult.value = await fetchUserBigFiveInfo(stats as BigFiveStatItem[]);

  syncBigFiveDomainLevelDescriptions(submitResult.value);
  const bigFiveAiContextLines = buildBigFiveAiContextLines(submitResult.value.stats);
  messageHead.value = `你好，我的大五人格维度如下：\n${bigFiveAiContextLines}\n请据此给出个性化人物身份(6字以内)。最后不要出现任何其他内容，只返回个性化人物身份。`;
  message.value = `你好，我的大五人格维度如下：\n${bigFiveAiContextLines}\n请据此给出个性成长建议(150字以内)。最后不要出现任何其他内容，只返回个性成长建议。`;
  messageTitle.value = `你好，我的大五人格维度如下：\n${bigFiveAiContextLines}\n严格按三行输出，每行格式：标题|描述。标题6个字以内，描述16个字以内，不要输出其他内容。`;

  bigFiveAiIdentityHeadline.value = "";
  await askQwenStream(messageHead.value, (_delta, fullText) => {
    bigFiveAiIdentityHeadline.value = fullText;
  });

  resultQwenMbti.value = "";
  await askQwenStream(message.value, (_delta, fullText) => {
    resultQwenMbti.value = fullText;
  });

  aiSkills.value = [];
  await askQwenStream(messageTitle.value, (_delta, fullText) => {
    aiSkills.value = parseSkillsFromStreamText(fullText);
  });

  if (aiSkills.value.length === 0) {
    aiSkills.value = reportSkillsFallback ?? [];
  }
}
