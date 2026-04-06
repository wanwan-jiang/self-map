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
        <InfoEnneagramAI
          :awareness-text="enneagramPillarTexts.awareness"
          :embodiment-text="enneagramPillarTexts.embodiment"
          :connection-text="enneagramPillarTexts.connection"
          :growth-suggestion-text="resultQwenMbti"
        />
      </div>
    </main>

    <AuthFooterLinks />
  </div>
</template>
<script setup lang="ts">
/**
 * @description SelfMap 结果分析信息页：装配报告头部、维度面板、洞察与职业建议等子模块。
 */
import { selfmapReportSample } from "../data/selfmapReportSample";
import type { SelfmapReportHeaderModel, SelfmapSkillModel } from "../types/selfmapReportType";
import type { UserMbtiResultItem } from "../types/userMbtiResultType";
import type { UserBigFiveResultItem } from "../types/userBigFiveResultType";
import type { UserRiasecResultItem } from "../types/userRiasecResultType";
import type { UserEnneagramResultItem } from "../types/userEnneagramResultType";
import { runBigFiveSelfmapInfoSection } from "../utils/bigfive-info";
import { runMbtiSelfmapInfoSection } from "../utils/mbti-info";
import { runEnneagramSelfmapInfoSection, type EnneagramPillarTexts } from "../utils/enneagram-info";
import { runRiasecSelfmapInfoSection } from "../utils/riasec-info";
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
/** 九型：`messageTitle` 流式解析为「认知觉察 / 能量具身 / 深度链接」三段，供 `InfoEnneagramAI` 展示 */
const enneagramPillarTexts = ref<EnneagramPillarTexts>({
  awareness: "",
  embodiment: "",
  connection: "",
});
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
  try {
    if (type === MBTI_TYPE_KEY) {
      await runMbtiSelfmapInfoSection({
        submitResult,
        savedHistory,
        resultQwenMbti,
        aiSkills,
        submitError,
        message,
        messageTitle,
        reportSkillsFallback: report.skills,
        askQwenStream,
        parseSkillsFromStreamText,
      });
    } else if (type === BIG_FIVE_TYPE_KEY) {
      await runBigFiveSelfmapInfoSection({
        submitResult,
        savedHistory,
        resultQwenMbti,
        aiSkills,
        message,
        messageTitle,
        messageHead,
        bigFiveAiIdentityHeadline,
        reportSkillsFallback: report.skills,
        askQwenStream,
        parseSkillsFromStreamText,
      });
    } else if (type === RIASEC_TYPE_KEY) {
      await runRiasecSelfmapInfoSection({
        submitResult,
        savedHistory,
        submitError,
        resultQwenMbti,
        aiSkills,
        message,
        messageTitle,
        messageHead,
        bigFiveAiIdentityHeadline,
        reportSkillsFallback: report.skills,
        askQwenStream,
        parseSkillsFromStreamText,
      });
    } else if (type === ENNEAGRAM_TYPE_KEY) {
      await runEnneagramSelfmapInfoSection({
        submitResult,
        savedHistory,
        submitError,
        resultQwenMbti,
        aiSkills,
        message,
        messageTitle,
        enneagramPillarTexts,
        askQwenStream,
      });
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

  // if (!mbtiType) {
  //   await navigateTo("/mbti");
  //   return;
  // }
});

const onRetryTest = async (): Promise<void> => {
  if (type === MBTI_TYPE_KEY) {
    localStorage.removeItem(MBTI_TYPE_KEY);
    localStorage.removeItem(MBTI_STATS_KEY);
    window.dispatchEvent(new Event(MBTI_SUBMIT_EVENT));
    await navigateTo("/mbti");
  } else if (type === BIG_FIVE_TYPE_KEY) {
    localStorage.removeItem(BIG_FIVE_TYPE_KEY);
    localStorage.removeItem(BIG_FIVE_STATS_KEY);
    window.dispatchEvent(new Event(BIG_FIVE_SUBMIT_EVENT));
    await navigateTo("/big-five");
  } else if (type === RIASEC_TYPE_KEY) {
    localStorage.removeItem(RIASEC_TYPE_KEY);
    localStorage.removeItem(RIASEC_STATS_KEY);
    window.dispatchEvent(new Event(RIASEC_SUBMIT_EVENT));
    await navigateTo("/riasec");
  } else if (type === ENNEAGRAM_TYPE_KEY) {
    localStorage.removeItem(ENNEAGRAM_TYPE_KEY);
    localStorage.removeItem(ENNEAGRAM_STATS_KEY);
    window.dispatchEvent(new Event(ENNEAGRAM_SUBMIT_EVENT));
    await navigateTo("/enneagram");
  }
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
