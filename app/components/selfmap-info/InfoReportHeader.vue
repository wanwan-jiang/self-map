<template>
  <header class="mb-16 relative">
    <div class="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
    <div class="flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
      <div class="max-w-2xl">
        <span
          class="inline-block py-1 px-4 rounded-full bg-secondary-container/30 text-secondary text-sm font-medium mb-4"
        >
          深度解析
        </span>
        <template v-if="isMbti">
          <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            你的性格类型是：
            <span class="text-primary text-glow">{{ model.type }} - {{ model.title }}</span>
          </h1>
          <p class="text-on-surface-variant text-lg leading-relaxed">
            {{ model.desc }}
          </p>
        </template>
      </div>
      <div class="flex gap-4">
        <button
          type="button"
          class="flex items-center gap-2 px-6 py-3 bg-surface-container-high rounded-full border border-outline-variant/20 hover:bg-surface-container-highest transition-all group"
          @click="emit('retry-test')"
        >
          <span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">refresh</span>
          <span>重新测评</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { MBTI_STATS_KEY } from "~/variables/variable";
import type { SelfmapReportHeaderModel } from "../../types/selfmapReportType";
import { MBTI_TYPE_KEY } from "~/variables/variable";

defineProps<{
  model: SelfmapReportHeaderModel;
}>();

const emit = defineEmits<{
  "retry-test": [];
}>();

const route = useRoute();
const type = route.query.type as string;

const isMbti = computed(() => type === MBTI_TYPE_KEY);
</script>

<style scoped>
.text-glow {
  text-shadow: 0 0 20px rgba(165, 165, 255, 0.3);
}
</style>
