<template>
  <div class="lg:col-span-12 flex flex-col gap-6">
    <section class="mt-20">
      <div class="flex items-end justify-between mb-10">
        <div>
          <h2 class="font-headline text-3xl font-extrabold text-on-surface">AI赋能九型人格进化路径</h2>
          <p class="text-on-surface-variant mt-2">从观察者到创造者的蜕变</p>
        </div>
        <button
          type="button"
          class="px-6 py-2 bg-surface-container-highest rounded-full text-xs font-bold text-on-surface hover:bg-primary/20 transition-all"
        >
          定制计划
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          class="group p-8 bg-surface-container-low rounded-xl border border-transparent hover:border-primary/20 transition-all duration-300"
        >
          <div
            class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform"
          >
            <span class="material-symbols-outlined">visibility</span>
          </div>
          <h4 class="font-bold text-lg mb-3">认知觉察</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap">
            {{ displayAwareness }}
          </p>
        </div>
        <div
          class="group p-8 bg-surface-container-low rounded-xl border border-transparent hover:border-primary/20 transition-all duration-300"
        >
          <div
            class="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform"
          >
            <span class="material-symbols-outlined">electric_bolt</span>
          </div>
          <h4 class="font-bold text-lg mb-3">能量具身</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap">
            {{ displayEmbodiment }}
          </p>
        </div>
        <div
          class="group p-8 bg-surface-container-low rounded-xl border border-transparent hover:border-primary/20 transition-all duration-300"
        >
          <div
            class="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-6 group-hover:scale-110 transition-transform"
          >
            <span class="material-symbols-outlined">hub</span>
          </div>
          <h4 class="font-bold text-lg mb-3">深度链接</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap">
            {{ displayConnection }}
          </p>
        </div>
      </div>
      <div
        v-if="growthSuggestionText.trim().length > 0"
        class="mt-10 rounded-xl border border-outline-variant/15 bg-surface-container-low/80 p-6"
      >
        <h3 class="text-sm font-bold text-on-surface mb-2">成长建议</h3>
        <p class="text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap">
          {{ growthSuggestionText.trim() }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * @description 九型报告：展示 `messageTitle` 流式解析后的「认知觉察 / 能量具身 / 深度链接」与可选的成长建议正文。
 */
defineOptions({
  name: "InfoEnneagramAI",
});

const props = withDefaults(
  defineProps<{
    awarenessText?: string;
    embodimentText?: string;
    connectionText?: string;
    /** 对应 `message` 流式：整体成长建议 */
    growthSuggestionText?: string;
  }>(),
  {
    awarenessText: "",
    embodimentText: "",
    connectionText: "",
    growthSuggestionText: "",
  },
);

const FALLBACK_AWARENESS = "AI正在分析......";
const FALLBACK_EMBODIMENT = "AI正在分析......";
const FALLBACK_CONNECTION = "AI正在分析......";
/** 单栏长时间无正文时提示刷新（毫秒） */
const PILLAR_LOADING_TIMEOUT_MS = 60_000;
const PILLAR_TIMEOUT_HINT = "请稍候或刷新页面重试";

/**
 * @description 某栏流式正文超时仍为空时标记超时，收到正文后清除定时器。
 */
const usePillarStreamTimeout = (getText: () => string | undefined): Ref<boolean> => {
  const timedOut = ref(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const clearTimer = (): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  watch(
    () => getText()?.trim() ?? "",
    (trimmed) => {
      if (trimmed.length > 0) {
        timedOut.value = false;
        clearTimer();
      }
    },
    { immediate: true },
  );

  onMounted(() => {
    const trimmedOnMount = getText()?.trim() ?? "";
    if (trimmedOnMount.length > 0) {
      return;
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      if ((getText()?.trim() ?? "").length === 0) {
        timedOut.value = true;
      }
    }, PILLAR_LOADING_TIMEOUT_MS);
  });

  onBeforeUnmount(() => {
    clearTimer();
  });

  return timedOut;
};

const awarenessLoadTimedOut = usePillarStreamTimeout(() => props.awarenessText);
const embodimentLoadTimedOut = usePillarStreamTimeout(() => props.embodimentText);
const connectionLoadTimedOut = usePillarStreamTimeout(() => props.connectionText);

const displayAwareness = computed(() => {
  const t = props.awarenessText?.trim();
  if (t && t.length > 0) {
    return t;
  }
  if (awarenessLoadTimedOut.value) {
    return PILLAR_TIMEOUT_HINT;
  }
  return FALLBACK_AWARENESS;
});

const displayEmbodiment = computed(() => {
  const t = props.embodimentText?.trim();
  if (t && t.length > 0) {
    return t;
  }
  if (embodimentLoadTimedOut.value) {
    return PILLAR_TIMEOUT_HINT;
  }
  return FALLBACK_EMBODIMENT;
});

const displayConnection = computed(() => {
  const t = props.connectionText?.trim();
  if (t && t.length > 0) {
    return t;
  }
  if (connectionLoadTimedOut.value) {
    return PILLAR_TIMEOUT_HINT;
  }
  return FALLBACK_CONNECTION;
});
</script>
