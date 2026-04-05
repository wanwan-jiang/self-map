/**
 * @description 霍兰德 RIASEC 报告页数据流：同步结果、拉取报告、同步维度描述、构建 AI 上下文并触发流式生成。
 */
import type { Ref } from "vue";
import { fetchUserLatestRiasecResults, fetchUserRiasecInfo } from "../api/user/personResults";
import type { SelfmapReportHeaderModel, SelfmapSkillModel } from "../types/selfmapReportType";
import type { UserRiasecStats } from "../types/userRiasecResultType";
import { RIASEC_STATS_KEY, RIASEC_SUBMIT_EVENT, RIASEC_TYPE_KEY } from "../variables/variable";
import type { SelfmapSavedHistoryItem } from "./mbti-info";

const RIASEC_DOMAIN_ROWS = [
  { id: "R", title: "现实型" },
  { id: "I", title: "研究型" },
  { id: "A", title: "艺术型" },
  { id: "S", title: "社会型" },
  { id: "E", title: "企业型" },
  { id: "C", title: "常规型" },
] as const;

type RiasecDomainLevelRow = {
  domain: string;
  level: "h" | "n" | "l";
  average: number;
  levelText: string;
};

/**
 * @description 将 `riasec-info` 返回的 `domainLevelDescriptions` 保留在 model 上，供后续扩展；此处同时用于拼 AI 上下文。
 */
function syncRiasecDomainLevelDescriptions(model: SelfmapReportHeaderModel): void {
  const raw = model.domainLevelDescriptions;
  if (!Array.isArray(raw)) {
    return;
  }
  const descriptions = raw
    .filter((s): s is RiasecDomainLevelRow & { levelText: string } => {
      if (typeof s !== "object" || s === null) {
        return false;
      }
      const lt = (s as RiasecDomainLevelRow).levelText;
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
 * @description 按 R→I→A→S→E→C 顺序拼接 AI 上下文：`中文名（字母）：得分 x（满分100），兴趣特点：levelText`
 */
function buildRiasecAiContextLines(descriptions: unknown): string {
  if (!Array.isArray(descriptions)) {
    return "";
  }
  const byDomain = new Map<string, RiasecDomainLevelRow>();
  for (const item of descriptions) {
    if (typeof item !== "object" || item === null || !("domain" in item)) {
      continue;
    }
    const s = item as RiasecDomainLevelRow;
    byDomain.set(String(s.domain).toUpperCase(), {
      domain: String(s.domain),
      average: typeof s.average === "number" && !Number.isNaN(s.average) ? s.average : Number(s.average) || 0,
      level: s.level,
      levelText: typeof s.levelText === "string" ? s.levelText : "",
    });
  }
  return RIASEC_DOMAIN_ROWS.map(({ id, title }) => {
    const row = byDomain.get(id);
    if (!row) {
      return `${title}（${id}）：暂无测评数据`;
    }
    const score = Math.round(Math.max(0, Math.min(100, row.average)));
    const trait = row.levelText?.trim() || "（暂无兴趣特点说明）";
    return `${title}（${id}）：得分 ${score}（满分100），兴趣特点：${trait}`;
  }).join("\n");
}

export interface RunRiasecSelfmapInfoSectionDeps {
  submitResult: Ref<SelfmapReportHeaderModel>;
  savedHistory: Ref<SelfmapSavedHistoryItem[]>;
  submitError: Ref<string>;
  resultQwenMbti: Ref<string>;
  aiSkills: Ref<SelfmapSkillModel[]>;
  message: Ref<string>;
  messageTitle: Ref<string>;
  messageHead: Ref<string>;
  bigFiveAiIdentityHeadline: Ref<string>;
  reportSkillsFallback: SelfmapSkillModel[] | undefined;
  askQwenStream: (
    prompt: string,
    onDelta: (delta: string, fullText: string) => void,
  ) => Promise<string | null>;
  parseSkillsFromStreamText: (fullText: string) => SelfmapSkillModel[];
}

/**
 * @description 在已登录前提下执行霍兰德分支：写回 `savedHistory`、可能更新 localStorage、请求报告并触发 AI 流。
 */
export async function runRiasecSelfmapInfoSection(deps: RunRiasecSelfmapInfoSectionDeps): Promise<void> {
  const {
    submitResult,
    savedHistory,
    submitError,
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

  let hollandType = window.localStorage.getItem(RIASEC_TYPE_KEY) ?? "";
  let stats: UserRiasecStats = JSON.parse(window.localStorage.getItem(RIASEC_STATS_KEY) ?? "{}");

  const res = await fetchUserLatestRiasecResults();
  savedHistory.value = res.data ?? [];

  if (savedHistory.value.length > 0) {
    const latest = savedHistory.value[0];
    const latestType = typeof latest?.type === "string" ? latest.type.trim().toUpperCase() : "";
    const latestStats = latest?.stats ?? {};
    hollandType = latestType;
    stats = latestStats as UserRiasecStats;
    window.localStorage.setItem(RIASEC_TYPE_KEY, latestType);
    window.localStorage.setItem(RIASEC_STATS_KEY, JSON.stringify(latestStats));
    window.dispatchEvent(new Event(RIASEC_SUBMIT_EVENT));
  }

  try {
    submitResult.value = await fetchUserRiasecInfo(hollandType, stats);
    syncRiasecDomainLevelDescriptions(submitResult.value);
    const riasecAiContextLines = buildRiasecAiContextLines(submitResult.value.domainLevelDescriptions);

    messageHead.value = `你好，我的霍兰德职业兴趣六维度如下：\n${riasecAiContextLines}\n请据此给出个性化人物身份(6字以内)。最后不要出现任何其他内容，只返回个性化人物身份。`;
    message.value = `你好，我的霍兰德职业兴趣六维度如下：\n${riasecAiContextLines}\n请据此给出职业发展建议(150字以内)。最后不要出现任何其他内容，只返回职业发展建议。`;
    messageTitle.value = `你好，我的霍兰德职业兴趣六维度如下：\n${riasecAiContextLines}\n严格按三行输出，每行格式：标题|描述。标题6个字以内，描述16个字以内，不要输出其他内容。`;

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
  } catch (error: unknown) {
    submitError.value = "获取霍兰德报告失败，请稍后重试。";
    console.error("获取霍兰德报告失败", error);
  }
}
