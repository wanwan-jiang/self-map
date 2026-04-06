/**
 * @description 九型人格报告页数据流：同步结果、拉取报告、流式解析三柱文案与成长建议。
 */
import type { Ref } from "vue";
import { fetchUserLatestEnneagramResults, fetchUserEnneagramInfo } from "../api/user/personResults";
import type { SelfmapReportHeaderModel, SelfmapSkillModel } from "../types/selfmapReportType";
import type { UserEnneagramStats } from "../types/userEnneagramResultType";
import { ENNEAGRAM_STATS_KEY, ENNEAGRAM_SUBMIT_EVENT, ENNEAGRAM_TYPE_KEY } from "../variables/variable";
import type { SelfmapSavedHistoryItem } from "./mbti-info";

export type EnneagramPillarTexts = {
  awareness: string;
  embodiment: string;
  connection: string;
};

/**
 * @description 解析九型「三点赋能」流式全文，约定格式含 `认知觉察：…` `能量具身：…` `深度链接：…`（支持中英文冒号与换行）。
 */
function parseEnneagramTriplePillars(fullText: string): EnneagramPillarTexts {
  const empty: EnneagramPillarTexts = { awareness: "", embodiment: "", connection: "" };
  const raw = fullText.replace(/\r\n/g, "\n").trim();
  if (!raw) {
    return empty;
  }
  const labels = ["认知觉察", "能量具身", "深度链接"] as const;
  const out: EnneagramPillarTexts = { ...empty };
  const keys = ["awareness", "embodiment", "connection"] as const;

  for (let i = 0; i < labels.length; i++) {
    const label = labels[i] as (typeof labels)[number];
    const key = keys[i] as (typeof keys)[number];
    const nextLabel: (typeof labels)[number] | undefined = labels[i + 1];
    const idx = raw.indexOf(label);
    if (idx === -1) {
      continue;
    }
    let after = raw.slice(idx + label.length).replace(/^[：:\s]+/, "");
    if (nextLabel !== undefined) {
      const nextIdx = after.indexOf(nextLabel);
      if (nextIdx >= 0) {
        after = after.slice(0, nextIdx);
      }
    }
    out[key] = after.replace(/[。．]+$/u, "").trim();
  }
  return out;
}

export interface RunEnneagramSelfmapInfoSectionDeps {
  submitResult: Ref<SelfmapReportHeaderModel>;
  savedHistory: Ref<SelfmapSavedHistoryItem[]>;
  submitError: Ref<string>;
  resultQwenMbti: Ref<string>;
  aiSkills: Ref<SelfmapSkillModel[]>;
  message: Ref<string>;
  messageTitle: Ref<string>;
  enneagramPillarTexts: Ref<EnneagramPillarTexts>;
  askQwenStream: (prompt: string, onDelta: (delta: string, fullText: string) => void) => Promise<string | null>;
}

/**
 * @description 在已登录前提下执行九型人格分支：写回 `savedHistory`、可能更新 localStorage、请求报告并触发 AI 流。
 */
export async function runEnneagramSelfmapInfoSection(deps: RunEnneagramSelfmapInfoSectionDeps): Promise<void> {
  const {
    submitResult,
    savedHistory,
    submitError,
    resultQwenMbti,
    aiSkills,
    message,
    messageTitle,
    enneagramPillarTexts,
    askQwenStream,
  } = deps;

  let enneagramType = window.localStorage.getItem(ENNEAGRAM_TYPE_KEY) ?? "";
  let stats: UserEnneagramStats = JSON.parse(window.localStorage.getItem(ENNEAGRAM_STATS_KEY) ?? "{}");
  if (getAuthToken()) {
    const res = await fetchUserLatestEnneagramResults();
    savedHistory.value = res.data ?? [];

    if (savedHistory.value.length > 0) {
      const latestType = savedHistory.value[0]?.type?.toUpperCase() ?? "";
      const latestStats = savedHistory.value[0]?.stats ?? {};
      enneagramType = latestType;
      stats = latestStats as UserEnneagramStats;
      window.localStorage.setItem(ENNEAGRAM_TYPE_KEY, latestType);
      window.localStorage.setItem(ENNEAGRAM_STATS_KEY, JSON.stringify(latestStats));
      window.dispatchEvent(new Event(ENNEAGRAM_SUBMIT_EVENT));
    }
  }

  try {
    submitResult.value = await fetchUserEnneagramInfo(stats, enneagramType);
    const typeLabel = submitResult.value.type ?? enneagramType;
    messageTitle.value = `请根据我的九型人格 ${typeLabel} 测评给出认知觉察、能量具身、深度链接三点核心赋能技能。每点描述40-60个字以内，必须严格连续输出三句，格式示例：认知觉察：……。能量具身：……。深度链接：……。不要输出其他内容。`;
    message.value = `你好，我的九型人格测评主型为 ${typeLabel}。报告摘要：${submitResult.value.desc ?? ""}。请结合以上给出成长建议(150字以内)。最后不要出现任何其他内容，只返回建议。`;

    enneagramPillarTexts.value = { awareness: "", embodiment: "", connection: "" };
    resultQwenMbti.value = "";

    await askQwenStream(messageTitle.value, (_delta, fullText) => {
      enneagramPillarTexts.value = parseEnneagramTriplePillars(fullText);
    });

    await askQwenStream(message.value, (_delta, fullText) => {
      resultQwenMbti.value = fullText;
    });

    aiSkills.value = [];
  } catch (error: unknown) {
    submitError.value = "获取九型人格报告失败，请稍后重试。";
    console.error("获取九型人格报告失败", error);
  }
}
