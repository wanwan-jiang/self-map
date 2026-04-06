<template>
  <AuthTopBar />
  <main class="pt-8 pb-24 px-8 max-w-7xl mx-auto">
    <!-- Hero Section -->
    <section class="mb-10 text-left max-w-3xl">
      <h3 class="text-3xl md:text-4xl font-headline font-extrabold tracking-tight mb-6 text-on-surface leading-tight">
        探索测评
      </h3>
      <p class="text-lg md:text-xl text-on-surface-variant leading-relaxed font-light">
        通过 AI 赋能的深度测评，精准解构您的性格图谱与职业潜能。开启您的认知觉醒之旅。
      </p>
    </section>
    <!-- Discovery Grid - Optimized to 2x2 Larger Cards -->
    <div class="asymmetric-grid">
      <!-- Card 1: MBTI -->
      <div
        class="group relative bg-surface-container-low p-12 rounded-lg border border-transparent card-glow transition-all duration-500 hover:-translate-y-3 cursor-pointer flex flex-col justify-between h-[520px]"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
        ></div>
        <div class="relative z-10">
          <div
            class="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center mb-10 border border-primary/30"
          >
            <span class="material-symbols-outlined text-primary text-5xl mso-fill-1">psychology</span>
          </div>
          <h3 class="text-3xl md:text-4xl font-headline font-bold mb-6 text-on-surface leading-tight">
            MBTI 性格类型测评
          </h3>
          <p class="text-lg text-on-surface-variant leading-relaxed mb-4">
            探索 16 种人格类型，寻找最适合您的工作环境与团队角色。基于荣格心理学深度研发，为您提供职场互动的金钥匙。
          </p>
        </div>
        <div class="relative z-10 flex justify-between items-end mt-8">
          <div class="flex flex-col gap-1">
            <span class="text-xs uppercase tracking-widest text-primary font-bold">Time Investment</span>
            <span class="text-sm font-label text-on-surface/60">预计用时 10 分钟</span>
          </div>
          <!-- <button
            v-if="hasAuthToken"
            type="button"
            class="px-6 py-3 rounded-full border border-primary text-primary font-bold text-lg flex items-center gap-2 hover:bg-primary/10 transition-all active:scale-95"
            @click="goSelfmapReport(MBTI_TYPE_KEY)"
          >
            <span class="material-symbols-outlined text-xl">history</span>
            <span>历史记录</span>
          </button> -->
          <button
            type="button"
            class="px-8 py-3 rounded-full bg-primary text-on-primary font-bold text-lg transition-all hover:shadow-[0_0_25px_rgba(165,165,255,0.6)] active:scale-95"
            @click="onMbtiCta"
          >
            {{ hasMbtiStats ? "查看报告" : "立即测评" }}
          </button>
        </div>
      </div>
      <!-- Card 2: Big Five -->
      <div
        class="group relative bg-surface-container-low p-12 rounded-lg border border-transparent card-glow transition-all duration-500 hover:-translate-y-3 cursor-pointer flex flex-col justify-between h-[520px]"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
        ></div>
        <div class="relative z-10">
          <div
            class="w-20 h-20 rounded-2xl bg-secondary/15 flex items-center justify-center mb-10 border border-secondary/30"
          >
            <span class="material-symbols-outlined text-secondary text-5xl mso-fill-1">pentagon</span>
          </div>
          <h3 class="text-3xl md:text-4xl font-headline font-bold mb-6 text-on-surface leading-tight">
            大五人格 (BIG FIVE)测评
          </h3>
          <p class="text-lg text-on-surface-variant leading-relaxed mb-4">
            从外向性、亲和性、尽责性、情绪性及开放性五个维度深度剖析，是国际学术界公认的最科学的性格描述模型。
          </p>
        </div>
        <div class="relative z-10 flex justify-between items-end mt-8">
          <div class="flex flex-col gap-1">
            <span class="text-xs uppercase tracking-widest text-secondary font-bold">Time Investment</span>
            <span class="text-sm font-label text-on-surface/60">预计用时 12 分钟</span>
          </div>
          <!-- <button
            v-if="hasAuthToken"
            type="button"
            class="px-6 py-3 rounded-full border border-secondary text-secondary font-bold text-lg flex items-center gap-2 hover:bg-secondary/10 transition-all active:scale-95"
            @click="goSelfmapReport(BIG_FIVE_TYPE_KEY)"
          >
            <span class="material-symbols-outlined text-xl">history</span>
            <span>历史记录</span>
          </button> -->
          <button
            type="button"
            class="px-8 py-3 rounded-full border border-secondary/50 text-secondary font-bold text-lg hover:bg-secondary/10 transition-all active:scale-95"
            @click="onBigFiveCta"
          >
            {{ hasBigFiveStats ? "查看报告" : "立即测评" }}
          </button>
        </div>
      </div>
      <!-- Card 3: Holland -->
      <div
        class="group relative bg-surface-container-low p-12 rounded-lg border border-transparent card-glow transition-all duration-500 hover:-translate-y-3 cursor-pointer flex flex-col justify-between h-[520px]"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-tertiary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
        ></div>
        <div class="relative z-10">
          <div
            class="w-20 h-20 rounded-2xl bg-tertiary/15 flex items-center justify-center mb-10 border border-tertiary/30"
          >
            <span class="material-symbols-outlined text-tertiary text-5xl mso-fill-1">explore</span>
          </div>
          <h3 class="text-3xl md:text-4xl font-headline font-bold mb-6 text-on-surface leading-tight">
            霍兰德 (RIASEC)兴趣测评
          </h3>
          <p class="text-lg text-on-surface-variant leading-relaxed mb-4">
            精准识别您的职业偏好类型，为您匹配理想的职业发展路径。将个人天赋与市场需求完美融合。
          </p>
        </div>
        <div class="relative z-10 flex justify-between items-end mt-8">
          <div class="flex flex-col gap-1">
            <span class="text-xs uppercase tracking-widest text-tertiary font-bold">Time Investment</span>
            <span class="text-sm font-label text-on-surface/60">预计用时 15 分钟</span>
          </div>
          <!-- <button
            v-if="hasAuthToken"
            type="button"
            class="px-6 py-3 rounded-full border border-tertiary text-tertiary font-bold text-lg flex items-center gap-2 hover:bg-tertiary/10 transition-all active:scale-95"
            @click="goSelfmapReport(RIASEC_TYPE_KEY)"
          >
            <span class="material-symbols-outlined text-xl">history</span>
            <span>历史记录</span>
          </button> -->
          <button
            type="button"
            class="px-8 py-3 rounded-full border border-tertiary/50 text-tertiary font-bold text-lg hover:bg-tertiary/10 transition-all active:scale-95"
            @click="onRiasecCta"
          >
            {{ hasRiasecStats ? "查看报告" : "立即测评" }}
          </button>
        </div>
      </div>
      <!-- Card 4: Enneagram -->
      <div
        class="group relative bg-surface-container-low p-12 rounded-lg border border-transparent card-glow transition-all duration-500 hover:-translate-y-3 cursor-pointer flex flex-col justify-between h-[520px]"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
        ></div>
        <div class="relative z-10">
          <div
            class="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center mb-10 border border-primary/30"
          >
            <span class="material-symbols-outlined text-primary text-5xl mso-fill-1">hub</span>
          </div>
          <h3 class="text-3xl md:text-4xl font-headline font-bold mb-6 text-on-surface leading-tight">
            九型人格 (Enneagram)测评
          </h3>
          <p class="text-lg text-on-surface-variant leading-relaxed mb-4">
            洞察您最深层的核心动机与潜意识行为驱动力。提升自我觉察能力，优化人际洞察与团队协作效能。
          </p>
        </div>
        <div class="relative z-10 flex justify-between items-end mt-8">
          <div class="flex flex-col gap-1">
            <span class="text-xs uppercase tracking-widest text-primary font-bold">Time Investment</span>
            <span class="text-sm font-label text-on-surface/60">预计用时 20 分钟</span>
          </div>
          <!-- <button
            v-if="hasAuthToken"
            type="button"
            class="px-6 py-3 rounded-full border border-primary text-primary font-bold text-lg flex items-center gap-2 hover:bg-primary/10 transition-all active:scale-95"
            @click="goSelfmapReport(ENNEAGRAM_TYPE_KEY)"
          >
            <span class="material-symbols-outlined text-xl">history</span>
            <span>历史记录</span>
          </button> -->
          <button
            type="button"
            class="px-8 py-3 rounded-full bg-surface-container-highest border border-outline-variant/30 text-on-surface font-bold text-lg hover:border-primary/50 transition-all active:scale-95"
            @click="onEnneagramCta"
          >
            {{ hasEnneagramStats ? "查看报告" : "立即测评" }}
          </button>
        </div>
      </div>
    </div>
    <!-- Secondary CTA/Insight -->
    <section
      class="mt-24 rounded-lg bg-surface-container-low overflow-hidden relative border border-outline-variant/10"
    >
      <div
        class="absolute inset-0 z-0 opacity-20"
        data-alt="abstract cosmic mesh of violet and blue glowing lines on a black background representing neural networks"
      ></div>
      <div
        class="relative z-10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-r from-surface-container-low to-transparent"
      >
        <div class="max-w-xl text-left">
          <h2 class="text-3xl md:text-4xl font-headline font-bold mb-6">不确定从哪开始？</h2>
          <p class="text-on-surface-variant text-lg mb-8">
            让我们的 AI 导师分析您的近况与目标，为您定制最能带来洞见的测评序列。
          </p>
          <button
            class="flex items-center gap-3 px-8 py-4 rounded-full bg-primary-container text-on-primary-container font-bold hover:shadow-[0_0_30px_rgba(150,149,255,0.4)] transition-all group"
          >
            <span>获取定制建议</span>
            <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
        <div
          class="hidden md:flex w-72 h-72 rounded-full border border-primary/20 items-center justify-center p-8 bg-surface/50 backdrop-blur-md"
        >
          <span class="material-symbols-outlined text-primary text-9xl animate-pulse mso-wght-200">
            network_intelligence
          </span>
        </div>
      </div>
    </section>
  </main>
  <AuthFooterLinks />
</template>

<script setup lang="ts">
import {
  MBTI_STATS_KEY,
  MBTI_TYPE_KEY,
  MBTI_SUBMIT_EVENT,
  BIG_FIVE_STATS_KEY,
  BIG_FIVE_TYPE_KEY,
  BIG_FIVE_SUBMIT_EVENT,
  RIASEC_STATS_KEY,
  RIASEC_TYPE_KEY,
  RIASEC_SUBMIT_EVENT,
  ENNEAGRAM_STATS_KEY,
  ENNEAGRAM_TYPE_KEY,
  ENNEAGRAM_SUBMIT_EVENT,
} from "~/variables/variable";
import { getAuthToken } from "~/utils/authToken";

/** 已登录（存在 selfmap_auth_token）时才展示「历史记录」入口 */
const hasAuthToken = ref(false);

/** SSR 无 localStorage，默认 false，挂载后再同步 */
const hasMbtiStats = ref(false);
const hasBigFiveStats = ref(false);
const hasRiasecStats = ref(false);
const hasEnneagramStats = ref(false);

function syncTestCompletionFromStorage(): void {
  if (!import.meta.client) {
    return;
  }
  hasAuthToken.value = Boolean(getAuthToken());
  hasMbtiStats.value = Boolean(window.localStorage.getItem(MBTI_STATS_KEY)?.trim());
  hasBigFiveStats.value = Boolean(window.localStorage.getItem(BIG_FIVE_STATS_KEY)?.trim());
  hasRiasecStats.value = Boolean(window.localStorage.getItem(RIASEC_STATS_KEY)?.trim());
  hasEnneagramStats.value = Boolean(window.localStorage.getItem(ENNEAGRAM_STATS_KEY)?.trim());
}

onMounted(() => {
  syncTestCompletionFromStorage();
  window.addEventListener("storage", syncTestCompletionFromStorage);
  window.addEventListener(MBTI_SUBMIT_EVENT, syncTestCompletionFromStorage);
  window.addEventListener(BIG_FIVE_SUBMIT_EVENT, syncTestCompletionFromStorage);
  window.addEventListener(RIASEC_SUBMIT_EVENT, syncTestCompletionFromStorage);
  window.addEventListener(ENNEAGRAM_SUBMIT_EVENT, syncTestCompletionFromStorage);
});

onUnmounted(() => {
  if (!import.meta.client) {
    return;
  }
  window.removeEventListener("storage", syncTestCompletionFromStorage);
  window.removeEventListener(MBTI_SUBMIT_EVENT, syncTestCompletionFromStorage);
  window.removeEventListener(BIG_FIVE_SUBMIT_EVENT, syncTestCompletionFromStorage);
  window.removeEventListener(RIASEC_SUBMIT_EVENT, syncTestCompletionFromStorage);
  window.removeEventListener(ENNEAGRAM_SUBMIT_EVENT, syncTestCompletionFromStorage);
});

/** 已登录用户从看板进入对应类型的报告页（与 `selfmap-info` 的 `query.type` 一致） */
function goSelfmapReport(reportType: string): void {
  void navigateTo({ path: "/selfmap-info", query: { type: reportType } });
}

function onMbtiCta(): void {
  if (hasMbtiStats.value) {
    void navigateTo({ path: "/selfmap-info", query: { type: MBTI_TYPE_KEY } });
    return;
  }
  void navigateTo("/mbti");
}

function onBigFiveCta(): void {
  if (hasBigFiveStats.value) {
    void navigateTo({ path: "/selfmap-info", query: { type: BIG_FIVE_TYPE_KEY } });
    return;
  }
  void navigateTo("/big-five");
}

function onRiasecCta(): void {
  if (hasRiasecStats.value) {
    void navigateTo({ path: "/selfmap-info", query: { type: RIASEC_TYPE_KEY } });
    return;
  }
  void navigateTo("/riasec");
}

function onEnneagramCta(): void {
  if (hasEnneagramStats.value) {
    void navigateTo({ path: "/selfmap-info", query: { type: ENNEAGRAM_TYPE_KEY } });
    return;
  }
  void navigateTo("/enneagram");
}

useHead({
  title: "SelfMap - 看板",
  htmlAttrs: {
    lang: "zh-Hans",
    class: "dark",
  },
  meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1.0" }],
  bodyAttrs: {
    class: "bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container",
  },
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
    },
  ],
});
</script>

<style scoped>
/* 与 aaa.html <style> 中一致 */
.material-symbols-outlined {
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}

.tonal-shift {
  transition: background-color 0.3s ease;
}

.card-glow:hover {
  box-shadow: 0 0 40px -10px rgba(165, 165, 255, 0.4);
  border-color: rgba(165, 165, 255, 0.4);
}

.asymmetric-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
}

@media (max-width: 768px) {
  .asymmetric-grid {
    grid-template-columns: 1fr;
  }
}

/* 对应原 HTML 内联 font-variation-settings */
.mso-fill-1 {
  font-variation-settings: "FILL" 1;
}

.mso-wght-200 {
  font-variation-settings: "wght" 200;
}
</style>
