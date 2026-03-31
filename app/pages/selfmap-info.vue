<script setup lang="ts">
/**
 * @description SelfMap 结果分析信息页：装配报告头部、维度面板、洞察与职业建议等子模块。
 */
import { fetchUserMbtiResults } from "../api/user/mbtiResults";
import { selfmapReportSample } from "../data/selfmapReportSample";
import type { SelfmapReportHeaderModel, SelfmapSkillModel } from "../types/selfmapReportType";
import type { UserMbtiResultItem } from "../types/userMbtiResultType";
import { clearAuthToken, getAuthToken } from "../utils/authToken";
import { useChatAI } from "../composables/chat/chat_ai";

const report = selfmapReportSample;
const submitResult = ref<SelfmapReportHeaderModel>({});
const submitError = ref<string>("");
const savedHistory = ref<UserMbtiResultItem[]>([]);
const resultQwenMbti = ref<string>("");
const aiSkills = ref<SelfmapSkillModel[]>([]);
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

useHead({
  title: "SelfMap - 性格报告",
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

const onRetryTest = async (): Promise<void> => {
  localStorage.removeItem("mbti_type");
  localStorage.removeItem("mbti_stats");
  window.dispatchEvent(new Event("mbti-submit-success-changed"));
  await navigateTo("/mbti");
};

onMounted(async () => {
  let mbtiType = window.localStorage.getItem("mbti_type");
  const mbtiStatsRaw = window.localStorage.getItem("mbti_stats");

  if (getAuthToken()) {
    try {
      const res = await fetchUserMbtiResults();
      savedHistory.value = res.data.items;

      if (!mbtiType && savedHistory.value.length > 0) {
        const latestMbti = savedHistory.value[0]?.mbti?.toUpperCase() ?? "";
        const latestStats = savedHistory.value[0]?.stats ?? {};
        window.localStorage.setItem("mbti_type", latestMbti);
        window.localStorage.setItem("mbti_stats", JSON.stringify(latestStats));
        window.dispatchEvent(new Event("mbti-submit-success-changed"));
        mbtiType = latestMbti;
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

  if (!mbtiType) {
    await navigateTo("/mbti");
    return;
  }

  let mbtiStats: Record<string, number> | null = null;
  if (mbtiStatsRaw) {
    try {
      mbtiStats = JSON.parse(mbtiStatsRaw) as Record<string, number>;
    } catch {
      mbtiStats = null;
    }
  }

  const message = `你好，分析下我的MBTI:${mbtiType}的报告，并给出职业规划建议。最后不要出现任何其他内容，只返回职业规划建议。`;
  const messageTitle = `请给出三点${mbtiType}的核心赋能技能。严格按三行输出，每行格式：标题|描述。标题6个字以内，描述16个字以内，不要输出其他内容。`;
  try {
    submitResult.value = await $fetch<SelfmapReportHeaderModel>("/api/mbti-test/result", {
      method: "POST",
      body: {
        mbtiType,
        stats: mbtiStats,
      },
    });

    resultQwenMbti.value = "";
    await askQwenStream(message, (_delta, fullText) => {
      resultQwenMbti.value = fullText;
    });

    aiSkills.value = [];
    await askQwenStream(messageTitle, (_delta, fullText) => {
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
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AuthTopBar />

    <main class="flex-grow pt-8 pb-20 px-6 max-w-7xl mx-auto w-full">
      <InfoReportHeader :model="submitResult" @retry-test="onRetryTest" />

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        <InfoDimensionPanel :model="submitResult" />
        <InfoInsightsSection :cards="submitResult.character" />
      </div>

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
