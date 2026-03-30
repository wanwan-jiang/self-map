<script setup lang="ts">
/**
 * @description SelfMap 结果分析信息页：装配报告头部、维度面板、洞察与职业建议等子模块。
 */
import { selfmapReportSample } from "../data/selfmapReportSample";

const report = selfmapReportSample;

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
  await navigateTo("/mbti");
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AuthTopBar />

    <main class="flex-grow pt-8 pb-20 px-6 max-w-7xl mx-auto w-full">
      <InfoReportHeader :model="report.header" @retry-test="onRetryTest" />

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        <InfoDimensionPanel :axis-labels="report.dimensionAxisLabels" :legend="report.dimensionLegend" />
        <InfoInsightsSection :cards="report.insightCards" />
      </div>

      <InfoCareerNavigation
        :image-url="report.careerImageUrl"
        :image-alt="report.careerImageAlt"
        :paths="report.careerPaths"
        :skills="report.skills"
        :quote="report.quote"
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
