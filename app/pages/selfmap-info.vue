<template>
  <div class="min-h-screen flex flex-col">
    <AuthTopBar />

    <main class="flex-grow pt-8 pb-20 px-6 max-w-7xl mx-auto w-full">
      <InfoReportHeader :model="submitResult" @retry-test="onRetryTest" />

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6" v-if="isMbti">
        <InfoDimensionMbtiPanel :model="submitResult" />
        <InfoInsightsSection :cards="submitResult.character" />
        <InfoCareerNavigation
          :image-url="report.careerImageUrl ?? ''"
          :image-alt="report.careerImageAlt ?? ''"
          :skills="aiSkills"
          :result-qwen-mbti="resultQwenMbti"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12" v-if="isBigFive">
        <InfoDimensionBigFivePanel :model="submitResult" />
        <InfoPercentageBigFiveSection
          :model="submitResult"
          :ai-identity-headline="bigFiveAiIdentityHeadline"
          :ai-career-text="resultQwenMbti"
          :ai-skills="aiSkills"
        />
        <InfoEachBigFiveScore :model="submitResult" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6" v-if="isRiasec">
        <InfoDimensionRiasecPanel :model="submitResult" />
        <InfoPercentageRiasecSection
          :model="submitResult"
          :ai-identity-headline="bigFiveAiIdentityHeadline"
          :ai-career-text="resultQwenMbti"
          :ai-skills="aiSkills"
        />
        <InfoEachRiasecScore :model="submitResult" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6" v-if="isEnneagram">
        <InfoEnneagramPanel :model="submitResult" />
        <InfoEnneagramRanking :model="submitResult" />
      </div>
    </main>

    <AuthFooterLinks />
  </div>
</template>
<script setup lang="ts">
/**
 * @description SelfMap 结果分析信息页：装配报告头部、维度面板、洞察与职业建议等子模块。
 */
import {
  fetchUserLatestMbtiResults,
  fetchUserLatestBigFiveResults,
  fetchUserLatestRiasecResults,
  fetchUserLatestEnneagramResults,
  fetchUserMbtiInfo,
  fetchUserBigFiveInfo,
  fetchUserRiasecInfo,
  fetchUserEnneagramInfo,
} from "../api/user/personResults";
import { selfmapReportSample } from "../data/selfmapReportSample";
import type { SelfmapReportHeaderModel, SelfmapSkillModel } from "../types/selfmapReportType";
import type { UserMbtiResultItem } from "../types/userMbtiResultType";
import type { BigFiveStatItem, UserBigFiveResultItem } from "../types/userBigFiveResultType";
import type { UserRiasecResultItem, UserRiasecStats } from "../types/userRiasecResultType";
import type { UserEnneagramResultItem, UserEnneagramStats } from "../types/userEnneagramResultType";
import { clearAuthToken, getAuthToken } from "../utils/authToken";
import { useChatAI } from "../composables/chat/chat_ai";
import {
  MBTI_TYPE_KEY,
  MBTI_STATS_KEY,
  MBTI_SUBMIT_EVENT,
  BIG_FIVE_TYPE_KEY,
  BIG_FIVE_STATS_KEY,
  BIG_FIVE_SUBMIT_EVENT,
  RIASEC_TYPE_KEY,
  RIASEC_STATS_KEY,
  RIASEC_SUBMIT_EVENT,
  ENNEAGRAM_TYPE_KEY,
  ENNEAGRAM_STATS_KEY,
  ENNEAGRAM_SUBMIT_EVENT,
} from "../variables/variable";

const route = useRoute();
const type = route.query.type as string;

const isMbti = computed(() => type === MBTI_TYPE_KEY);
const isBigFive = computed(() => type === BIG_FIVE_TYPE_KEY);
const isRiasec = computed(() => type === RIASEC_TYPE_KEY);
const isEnneagram = computed(() => type === ENNEAGRAM_TYPE_KEY);

const report = selfmapReportSample;
const submitResult = ref<SelfmapReportHeaderModel>({});
const submitError = ref<string>("");
const savedHistory = ref<
  (UserMbtiResultItem | UserBigFiveResultItem | UserRiasecResultItem | UserEnneagramResultItem)[]
>([]);
const resultQwenMbti = ref<string>("");
/** 大五：`messageHead` 流式结果，作侧栏标题（个性化人物身份，约 6 字内） */
const bigFiveAiIdentityHeadline = ref<string>("");
const aiSkills = ref<SelfmapSkillModel[]>([]);
let message = ref<string>("");
let messageTitle = ref<string>("");
let messageHead = ref<string>("");

const { askQwenStream } = useChatAI();
const parseSkillsFromStreamText = (fullText: string): SelfmapSkillModel[] => {
  const lines = fullText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const parsed: SelfmapSkillModel[] = [];

  for (const line of lines) {
    const cleanedLine = line.replace(/^\d+[\.、]\s*/, "").replace(/^[-*]\s*/, "");
    const separator = cleanedLine.includes("|")
      ? "|"
      : cleanedLine.includes("：")
        ? "："
        : cleanedLine.includes(":")
          ? ":"
          : "";

    if (!separator) {
      continue;
    }

    const [rawTitle, ...restParts] = cleanedLine.split(separator);
    const title = rawTitle?.trim();
    const description = restParts.join(separator).trim();

    if (!title || !description) {
      continue;
    }

    parsed.push({
      id: `ai-skill-${parsed.length + 1}`,
      title,
      description,
    });

    if (parsed.length >= 3) {
      break;
    }
  }

  return parsed;
};

onMounted(async () => {
  //todo others
  if (getAuthToken()) {
    try {
      if (type === MBTI_TYPE_KEY) {
        let type = window.localStorage.getItem(MBTI_TYPE_KEY) ?? "";
        let stats = JSON.parse(window.localStorage.getItem(MBTI_STATS_KEY) ?? "{}");
        const res = await fetchUserLatestMbtiResults();
        savedHistory.value = res.data ?? [];
        if (savedHistory.value.length > 0) {
          const latestType = savedHistory.value[0]?.type?.toUpperCase() ?? "";
          const latestStats = savedHistory.value[0]?.stats ?? {};
          type = latestType;
          stats = latestStats;
          window.localStorage.setItem(MBTI_TYPE_KEY, latestType);
          window.localStorage.setItem(MBTI_STATS_KEY, JSON.stringify(latestStats));
          window.dispatchEvent(new Event(MBTI_SUBMIT_EVENT));
        }
        try {
          submitResult.value = await fetchUserMbtiInfo(type, stats);
          console.log("submitResult111", submitResult.value);
          message.value = `你好，分析下我的MBTI:${type}的报告，并给出职业规划建议。最后不要出现任何其他内容，只返回职业规划建议。`;
          messageTitle.value = `请给出三点${type}的核心赋能技能。严格按三行输出，每行格式：标题|描述。标题6个字以内，描述16个字以内，不要输出其他内容。`;

          resultQwenMbti.value = "";
          await askQwenStream(message.value, (_delta, fullText) => {
            resultQwenMbti.value = fullText;
          });

          aiSkills.value = [];
          await askQwenStream(messageTitle.value, (_delta, fullText) => {
            aiSkills.value = parseSkillsFromStreamText(fullText);
          });

          if (aiSkills.value.length === 0) {
            aiSkills.value = report.skills ?? [];
          }
        } catch (error) {
          submitError.value = "获取 MBTI 报告失败，请稍后重试。";
          console.error("获取 MBTI 报告失败", error);
        }
      } else if (type === BIG_FIVE_TYPE_KEY) {
        let stats = JSON.parse(window.localStorage.getItem(BIG_FIVE_STATS_KEY) ?? "{}");
        const res = await fetchUserLatestBigFiveResults();
        savedHistory.value = res.data ?? [];
        if (savedHistory.value.length > 0) {
          const latestStats = savedHistory.value[0]?.stats ?? {};
          stats = latestStats;
          window.localStorage.setItem(BIG_FIVE_STATS_KEY, JSON.stringify(latestStats));
          window.dispatchEvent(new Event(BIG_FIVE_SUBMIT_EVENT));
        }
        submitResult.value = await fetchUserBigFiveInfo(stats as BigFiveStatItem[]);
        const BIG_FIVE_DOMAIN_ROWS = [
          { id: "O", title: "经验开放性" },
          { id: "C", title: "尽责性" },
          { id: "E", title: "外向性" },
          { id: "A", title: "亲和性" },
          { id: "N", title: "神经质" },
        ] as const;

        /** `bigfive-info` 返回的 stats 项含库表解析字段 `levelText` */
        type BigFiveStatWithLevelText = BigFiveStatItem;

        /**
         * @description 将带 `levelText` 的 stats 同步到 `domainLevelDescriptions`，供子组件展示。
         */
        const syncBigFiveDomainLevelDescriptions = (model: SelfmapReportHeaderModel): void => {
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
        };

        /**
         * @description 按 OCEAN 顺序拼接 AI 上下文：`中文名（字母）：得分 x（满分100），性格：levelText`
         */
        const buildBigFiveAiContextLines = (statList: unknown): string => {
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
        };

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
          aiSkills.value = report.skills ?? [];
        }
      } else if (type === RIASEC_TYPE_KEY) {
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
        const syncRiasecDomainLevelDescriptions = (model: SelfmapReportHeaderModel): void => {
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
        };

        /**
         * @description 按 R→I→A→S→E→C 顺序拼接 AI 上下文：`中文名（字母）：得分 x（满分100），兴趣特点：levelText`
         */
        const buildRiasecAiContextLines = (descriptions: unknown): string => {
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
        };

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
            aiSkills.value = report.skills ?? [];
          }
        } catch (error) {
          submitError.value = "获取霍兰德报告失败，请稍后重试。";
          console.error("获取霍兰德报告失败", error);
        }
      } else if (type === ENNEAGRAM_TYPE_KEY) {
        let hollandType = window.localStorage.getItem(ENNEAGRAM_TYPE_KEY) ?? "";
        let stats: UserEnneagramStats = JSON.parse(window.localStorage.getItem(ENNEAGRAM_STATS_KEY) ?? "{}");
        const res = await fetchUserLatestEnneagramResults();
        savedHistory.value = res.data ?? [];
        if (savedHistory.value.length > 0) {
          const latestType = savedHistory.value[0]?.type?.toUpperCase() ?? "";
          const latestStats = savedHistory.value[0]?.stats ?? {};
          hollandType = latestType;
          stats = latestStats as UserEnneagramStats;
          window.localStorage.setItem(ENNEAGRAM_TYPE_KEY, latestType);
          window.localStorage.setItem(ENNEAGRAM_STATS_KEY, JSON.stringify(latestStats));
          window.dispatchEvent(new Event(ENNEAGRAM_SUBMIT_EVENT));
        }
        try {
          submitResult.value = await fetchUserEnneagramInfo(stats, hollandType);
          message.value = `你好，我的九型人格测评主型为 ${submitResult.value.type ?? hollandType}，请结合报告给出成长建议(150字以内)。最后不要出现任何其他内容，只返回建议。`;
          messageTitle.value = `请根据我的九型人格测评给出三点核心赋能技能。严格按三行输出，每行格式：标题|描述。标题6个字以内，描述16个字以内，不要输出其他内容。`;

          resultQwenMbti.value = "";
          await askQwenStream(message.value, (_delta, fullText) => {
            resultQwenMbti.value = fullText;
          });

          aiSkills.value = [];
          await askQwenStream(messageTitle.value, (_delta, fullText) => {
            aiSkills.value = parseSkillsFromStreamText(fullText);
          });

          if (aiSkills.value.length === 0) {
            aiSkills.value = report.skills ?? [];
          }
        } catch (error) {
          submitError.value = "获取九型人格报告失败，请稍后重试。";
          console.error("获取九型人格报告失败", error);
        }
      } else {
        savedHistory.value = [];
      }
    } catch (error: unknown) {
      console.error("获取测试结果失败", error);
      const statusCode =
        typeof error === "object" &&
        error !== null &&
        "statusCode" in error &&
        typeof (error as { statusCode?: unknown }).statusCode === "number"
          ? (error as { statusCode: number }).statusCode
          : undefined;

      // 本地 token 存在但会话已失效时，清理本地登录态，避免重复触发 401 请求。
      if (statusCode === 401) {
        clearAuthToken();
      }
      savedHistory.value = [];
    }
  }

  // if (!mbtiType) {
  //   await navigateTo("/mbti");
  //   return;
  // }
});

const onRetryTest = async (): Promise<void> => {
  localStorage.removeItem(MBTI_TYPE_KEY);
  localStorage.removeItem(MBTI_STATS_KEY);
  window.dispatchEvent(new Event(MBTI_SUBMIT_EVENT));
  await navigateTo("/mbti");
};

useHead({
  title: "SelfMap - 报告",
  htmlAttrs: {
    lang: "zh-CN",
    class: "dark",
  },
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
    },
  ],
});
</script>

<style scoped>
:global(.material-symbols-outlined) {
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}

:global(body) {
  background-color: #0a0e14;
  color: #f1f3fc;
  font-family: "Plus Jakarta Sans", sans-serif;
}

:deep(h1),
:deep(h2),
:deep(h3) {
  font-family: "Manrope", sans-serif;
}
</style>
