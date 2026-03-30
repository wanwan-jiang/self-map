<script setup lang="ts">
import type { SelfmapInsightCardModel, SelfmapInsightTone } from "../../types/selfmapReportType";

defineProps<{
  card: SelfmapInsightCardModel;
  title: string;
}>();

const iconWrapClass = (tone: SelfmapInsightTone): string => {
  const map: Record<SelfmapInsightTone, string> = {
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
    tertiary: "bg-tertiary/10",
  };
  return map[tone];
};

const iconClass = (tone: SelfmapInsightTone): string => {
  const map: Record<SelfmapInsightTone, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
  };
  return map[tone];
};
</script>

<template>
  <article
    class="glass-card rounded-lg p-6 flex gap-6 hover:bg-surface-container-highest/40 transition-all cursor-default"
  >
    <div class="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center" :class="iconWrapClass(card.tone)">
      <span class="material-symbols-outlined text-3xl" :class="iconClass(card.tone)">{{ card.icon }}</span>
    </div>
    <div>
      <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
      <p class="text-on-surface-variant leading-relaxed" :class="card.tags?.length ? 'mb-3' : ''">
        {{ card.body }}
      </p>
      <div v-if="card.tags?.length" class="flex gap-2 flex-wrap">
        <span
          v-for="tag in card.tags"
          :key="tag"
          class="text-xs px-2 py-1 rounded bg-surface-container-high border border-outline-variant/10 text-secondary"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.glass-card {
  background: rgba(32, 38, 47, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(68, 72, 79, 0.15);
}
</style>
