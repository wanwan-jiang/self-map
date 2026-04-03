<template>
  <div class="min-h-screen flex flex-col">
    <AuthTopBar />

    <main class="flex-grow pt-8 pb-20 px-6 max-w-7xl mx-auto w-full">
      <InfoReportHeader :model="submitResult" @retry-test="onRetryTest" />

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6" v-if="isMbti">
        <InfoDimensionMbtiPanel :model="submitResult" />
        <InfoInsightsSection :cards="submitResult.character" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12" v-if="isBigFive">
        <InfoDimensionBigFivePanel :model="submitResult" />
        <InfoPercentageSection :cards="submitResult.character" />
      </div>

      <!-- <div class="grid grid-cols-1 md:grid-cols-12 gap-6" v-if="isRiasec">
        <InfoDimensionRiasecPanel :model="submitResult" />
        <InfoInsightsSection :cards="submitResult.character" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6" v-if="isEnneagram">
        <InfoDimensionEnneagramPanel :model="submitResult" />
        <InfoInsightsSection :cards="submitResult.character" />
      </div> -->

      <InfoCareerNavigation
        :image-url="report.careerImageUrl ?? ''"
        :image-alt="report.careerImageAlt ?? ''"
        :skills="aiSkills"
        :result-qwen-mbti="resultQwenMbti"
      />
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
} from "../api/user/personResults";
import { selfmapReportSample } from "../data/selfmapReportSample";
import type { SelfmapReportHeaderModel, SelfmapSkillModel } from "../types/selfmapReportType";
import type { UserMbtiResultItem } from "../types/userMbtiResultType";
import type { UserBigFiveResultItem } from "../types/userBigFiveResultType";
import type { UserRiasecResultItem } from "../types/userRiasecResultType";
import type { UserEnneagramResultItem } from "../types/userEnneagramResultType";
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
const aiSkills = ref<SelfmapSkillModel[]>([]);
let message = ref<string>("");
let messageTitle = ref<string>("");

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
  let mbtiType = window.localStorage.getItem(MBTI_TYPE_KEY);
  let mbtiStats = window.localStorage.getItem(MBTI_STATS_KEY);
  let bigFiveType = window.localStorage.getItem(BIG_FIVE_TYPE_KEY);
  let bigFiveStats = window.localStorage.getItem(BIG_FIVE_STATS_KEY);
  let riasecType = window.localStorage.getItem(RIASEC_TYPE_KEY);
  let riasecStats = window.localStorage.getItem(RIASEC_STATS_KEY);
  let enneagramType = window.localStorage.getItem(ENNEAGRAM_TYPE_KEY);
  let enneagramStats = window.localStorage.getItem(ENNEAGRAM_STATS_KEY);

  //todo others
  if (getAuthToken()) {
    try {
      if (type === MBTI_TYPE_KEY) {
        const res = await fetchUserLatestMbtiResults();
        savedHistory.value = res.data ?? [];
      } else if (type === BIG_FIVE_TYPE_KEY) {
        const res = await fetchUserLatestBigFiveResults();
        savedHistory.value = res.data ?? [];
      } else if (type === RIASEC_TYPE_KEY) {
        const res = await fetchUserLatestRiasecResults();
        savedHistory.value = res.data ?? [];
      } else if (type === ENNEAGRAM_TYPE_KEY) {
        const res = await fetchUserLatestEnneagramResults();
        savedHistory.value = res.data ?? [];
      } else {
        savedHistory.value = [];
      }

      if (!mbtiType && savedHistory.value.length > 0) {
        const latestMbti = savedHistory.value[0]?.type?.toUpperCase() ?? "";
        const latestStats = savedHistory.value[0]?.stats ?? {};
        window.localStorage.setItem(MBTI_TYPE_KEY, latestMbti);
        window.localStorage.setItem(MBTI_STATS_KEY, JSON.stringify(latestStats));
        window.dispatchEvent(new Event(MBTI_SUBMIT_EVENT));
        mbtiType = window.localStorage.getItem(MBTI_TYPE_KEY);
        mbtiStats = window.localStorage.getItem(MBTI_STATS_KEY);
      }
    } catch (error: unknown) {
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

  try {
    submitResult.value = await $fetch<SelfmapReportHeaderModel>("/api/person-info/mbti-info", {
      method: "POST",
      body: {
        mbtiType,
        stats: mbtiStats,
      },
    });
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
      aiSkills.value = report.skills ?? [];
    }
  } catch (error) {
    submitError.value = "获取 MBTI 报告失败，请稍后重试。";
    console.error("获取 MBTI 报告失败", error);
  }
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
