<template>
  <div
    class="flex min-h-0 w-full flex-1 flex-col overflow-x-hidden bg-background font-body text-on-background antialiased selection:bg-primary/30"
  >
    <div class="flex w-full flex-1 flex-col items-center justify-center px-4 py-10 md:py-14">
      <div class="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <div class="relative mb-8 group">
          <div
            class="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"
          />
          <div class="relative w-52 h-52 md:w-64 md:h-64 flex items-center justify-center">
            <div class="absolute inset-0 opacity-40">
              <svg class="w-full h-full animate-pulse" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style="stop-color: rgb(165, 165, 255); stop-opacity: 1" />
                    <stop offset="100%" style="stop-color: rgb(167, 144, 254); stop-opacity: 0" />
                  </radialGradient>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#grad1)"
                  stroke-width="0.5"
                  stroke-dasharray="4 2"
                />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#a5a5ff" stroke-width="0.2" opacity="0.3" />
                <circle cx="60" cy="70" r="3" fill="#a5a5ff" />
                <circle cx="140" cy="80" r="2" fill="#a790fe" />
                <circle cx="100" cy="40" r="4" fill="#a5a5ff" />
                <circle cx="80" cy="140" r="2.5" fill="#fd8bcc" />
                <circle cx="130" cy="150" r="3" fill="#a5a5ff" />
                <path
                  d="M60 70 L100 40 L140 80 L130 150 L80 140 Z"
                  fill="none"
                  stroke="#a5a5ff"
                  stroke-width="0.5"
                  opacity="0.4"
                />
              </svg>
            </div>
            <div
              class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_50px_rgba(165,165,255,0.35)]"
            >
              <span class="material-symbols-outlined text-on-primary text-5xl md:text-6xl fill-symbol">psychology</span>
            </div>
          </div>
        </div>

        <div class="max-w-xl space-y-6">
          <h1 class="font-headline font-extrabold text-4xl md:text-6xl tracking-tight text-on-background">
            测评已完成
          </h1>
          <p class="text-on-surface-variant text-lg md:text-xl leading-relaxed">
            AI 正在对您的测试结果进行深度建模，
            <br class="hidden md:block" />
            开启您的自我探索之旅。
          </p>
        </div>

        <div class="mt-6 flex flex-col items-center gap-6 w-full">
          <NuxtLink
            :to="reportSelfmapLink"
            class="group relative px-12 py-5 w-full max-w-xs rounded-full bg-primary-container text-on-primary-container font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(150,149,255,0.3)]"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              查看报告
              <span class="material-symbols-outlined text-xl">arrow_forward</span>
            </span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </NuxtLink>
          <button
            type="button"
            class="text-on-surface-variant hover:text-primary transition-colors duration-300 font-medium text-sm tracking-wide py-2 border-b border-transparent hover:border-primary/30 bg-transparent cursor-pointer"
            @click="onRetryTest"
          >
            重新测评
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MBTI_TYPE_KEY,
  MBTI_STATS_KEY,
  MBTI_SUBMIT_EVENT,
  BIG_FIVE_TYPE_KEY,
  BIG_FIVE_STATS_KEY,
  BIG_FIVE_SUBMIT_EVENT,
  RIASEC_TYPE_KEY,
  ENNEAGRAM_TYPE_KEY,
  RIASEC_STATS_KEY,
  RIASEC_SUBMIT_EVENT,
  ENNEAGRAM_STATS_KEY,
  ENNEAGRAM_SUBMIT_EVENT,
} from "../../variables/variable";

const props = defineProps<{
  testType: string;
}>();

const route = useRoute();

/** 根据完成页所在测评路由，携带对应 type 查询参数进入报告页 */
const reportSelfmapLink = computed(() => {
  const path = route.path;
  const type =
    path === "/mbti"
      ? MBTI_TYPE_KEY
      : path === "/big-five"
        ? BIG_FIVE_TYPE_KEY
        : path === "/riasec"
          ? RIASEC_TYPE_KEY
          : path === "/enneagram"
            ? ENNEAGRAM_TYPE_KEY
            : props.testType;
  return {
    path: "/selfmap-info",
    query: { type },
  };
});

const onRetryTest = async (): Promise<void> => {
  if (props.testType === MBTI_TYPE_KEY) {
    localStorage.removeItem(MBTI_TYPE_KEY);
    localStorage.removeItem(MBTI_STATS_KEY);
    window.dispatchEvent(new Event(MBTI_SUBMIT_EVENT));
    await navigateTo("/mbti");
  } else if (props.testType === BIG_FIVE_TYPE_KEY) {
    localStorage.removeItem(BIG_FIVE_TYPE_KEY);
    localStorage.removeItem(BIG_FIVE_STATS_KEY);
    window.dispatchEvent(new Event(BIG_FIVE_SUBMIT_EVENT));
    await navigateTo("/big-five");
  } else if (props.testType === RIASEC_TYPE_KEY) {
    localStorage.removeItem(RIASEC_TYPE_KEY);
    localStorage.removeItem(RIASEC_STATS_KEY);
    window.dispatchEvent(new Event(RIASEC_SUBMIT_EVENT));
    await navigateTo("/riasec");
  } else if (props.testType === ENNEAGRAM_TYPE_KEY) {
    localStorage.removeItem(ENNEAGRAM_TYPE_KEY);
    localStorage.removeItem(ENNEAGRAM_STATS_KEY);
    window.dispatchEvent(new Event(ENNEAGRAM_SUBMIT_EVENT));
    await navigateTo("/enneagram");
  }
};

useHead({
  title: "SelfMap AI - 测评完成",
  htmlAttrs: {
    lang: "zh-CN",
    class: "dark",
  },
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
    },
  ],
});
</script>

<style scoped>
/* .cosmic-glow {
  background: radial-gradient(circle at center, rgba(165, 165, 255, 0.15) 0%, rgba(10, 14, 20, 0) 70%);
}

.glass-panel {
  backdrop-filter: blur(24px);
  background: rgba(15, 20, 26, 0.6);
}

.fill-symbol {
  font-variation-settings: "FILL" 1;
} */
</style>
