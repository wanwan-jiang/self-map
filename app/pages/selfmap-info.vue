<script setup lang="ts">
/**
 * @description SelfMap 结果分析信息页：装配报告头部、维度面板、洞察与职业建议等子模块。
 */
import { selfmapReportSample } from "../data/selfmapReportSample";
import type { SelfmapReportHeaderModel } from "../types/selfmapReportType";

const report = selfmapReportSample;
const submitResult = ref<SelfmapReportHeaderModel>({});
const submitError = ref<string>("");

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
  localStorage.removeItem("isSubmitSuccess");
  window.dispatchEvent(new Event("mbti-submit-success-changed"));
  await navigateTo("/mbti");
};

onMounted(async () => {
  const mbtiType = window.localStorage.getItem("mbti_type");
  const mbtiStatsRaw = window.localStorage.getItem("mbti_stats");

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

  try {
    submitResult.value = await $fetch<SelfmapReportHeaderModel>("/api/mbti-test/result", {
      method: "POST",
      body: {
        mbtiType,
        stats: mbtiStats,
      },
    });
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

      <!-- <InfoCareerNavigation
        :image-url="report.careerImageUrl"
        :image-alt="report.careerImageAlt"
        :paths="report.careerPaths"
        :skills="report.skills"
        :quote="report.quote"
      /> -->
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
