/**
 * @description MBTI 报告页数据流：同步本地与服务端最新结果、拉取报告头、触发 Qwen 流式职业与技能文案。
 */
import type { Ref } from "vue";
import { fetchUserLatestMbtiResults, fetchUserMbtiInfo } from "../api/user/personResults";
import type { SelfmapReportHeaderModel, SelfmapSkillModel } from "../types/selfmapReportType";
import type { UserBigFiveResultItem } from "../types/userBigFiveResultType";
import type { UserEnneagramResultItem } from "../types/userEnneagramResultType";
import type { UserMbtiResultItem } from "../types/userMbtiResultType";
import type { UserMbtiStats } from "../types/userMbtiResultType";
import type { UserRiasecResultItem } from "../types/userRiasecResultType";
import { MBTI_STATS_KEY, MBTI_SUBMIT_EVENT, MBTI_TYPE_KEY } from "../variables/variable";

export type SelfmapSavedHistoryItem =
  | UserMbtiResultItem
  | UserBigFiveResultItem
  | UserRiasecResultItem
  | UserEnneagramResultItem;

export interface RunMbtiSelfmapInfoSectionDeps {
  submitResult: Ref<SelfmapReportHeaderModel>;
  savedHistory: Ref<SelfmapSavedHistoryItem[]>;
  resultQwenMbti: Ref<string>;
  aiSkills: Ref<SelfmapSkillModel[]>;
  submitError: Ref<string>;
  message: Ref<string>;
  messageTitle: Ref<string>;
  reportSkillsFallback: SelfmapSkillModel[] | undefined;
  askQwenStream: (prompt: string, onDelta: (delta: string, fullText: string) => void) => Promise<string | null>;
  parseSkillsFromStreamText: (fullText: string) => SelfmapSkillModel[];
}

/**
 * @description 在已登录前提下执行 MBTI 分支：写回 `savedHistory`、可能更新 localStorage 并请求报告与 AI 流。
 */
export async function runMbtiSelfmapInfoSection(deps: RunMbtiSelfmapInfoSectionDeps): Promise<void> {
  const {
    submitResult,
    savedHistory,
    resultQwenMbti,
    aiSkills,
    submitError,
    message,
    messageTitle,
    reportSkillsFallback,
    askQwenStream,
    parseSkillsFromStreamText,
  } = deps;

  let mbtiType = window.localStorage.getItem(MBTI_TYPE_KEY) ?? "";
  let stats: UserMbtiStats = JSON.parse(window.localStorage.getItem(MBTI_STATS_KEY) ?? "{}") as UserMbtiStats;

  if (getAuthToken()) {
    const res = await fetchUserLatestMbtiResults();
    savedHistory.value = res.data ?? [];

    if (savedHistory.value.length > 0) {
      const latestType = savedHistory.value[0]?.type?.toUpperCase() ?? "";
      const latestStats = savedHistory.value[0]?.stats ?? {};
      mbtiType = latestType;
      stats = latestStats as UserMbtiStats;
      window.localStorage.setItem(MBTI_TYPE_KEY, latestType);
      window.localStorage.setItem(MBTI_STATS_KEY, JSON.stringify(latestStats));
      window.dispatchEvent(new Event(MBTI_SUBMIT_EVENT));
    }
  }

  try {
    submitResult.value = await fetchUserMbtiInfo(mbtiType, stats);
    message.value = `你好，分析下我的MBTI:${mbtiType}的报告，并给出职业规划建议。最后不要出现任何其他内容，只返回职业规划建议。`;
    messageTitle.value = `请给出三点${mbtiType}的核心赋能技能。严格按三行输出，每行格式：标题|描述。标题6个字以内，描述16个字以内，不要输出其他内容。`;

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
    submitError.value = "获取 MBTI 报告失败，请稍后重试。";
    console.error("获取 MBTI 报告失败", error);
  }
}
