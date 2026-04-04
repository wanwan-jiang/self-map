<template>
  <div class="flex h-full flex-col space-y-6 md:col-span-5">
    <div
      class="flex h-full min-h-[500px] flex-col rounded-lg border border-primary/5 bg-surface-container-high p-6"
    >
      <div class="flex justify-between items-center mb-6">
        <h3 class="font-headline text-xl font-bold">人格镜像</h3>
        <span class="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded">TOP 类型</span>
      </div>
      <div v-if="rankingCards.length > 0" class="space-y-4">
        <div
          v-for="(item, idx) in rankingCards"
          :key="`${item.tags.no}-${item.tags.letter}-${idx}`"
          class="p-4 rounded-lg flex items-center justify-between"
          :class="rowToneClass(idx)"
        >
          <div class="flex items-center gap-4 min-w-0 flex-1">
            <div
              class="w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm"
              :style="badgeStyleForLetter(item.tags.letter)"
            >
              {{ item.tags.no }}
            </div>
            <div class="min-w-0">
              <div class="text-sm font-bold truncate">{{ item.tags.domainName || `型${item.tags.no}` }}</div>
              <div class="text-[10px] text-on-surface-variant line-clamp-2">{{ item.tags.desc || item.content }}</div>
            </div>
          </div>
          <div
            class="shrink-0 ml-2 font-headline font-bold text-sm"
            :style="percentStyleForLetter(item.tags.letter)"
          >
            {{ item.tags.percentLabel }}
          </div>
        </div>
      </div>
      <p v-else class="text-sm text-on-surface-variant">暂无排名数据，请完成测评后刷新。</p>
      <div v-if="footerText" class="mt-8 pt-6 border-t border-outline-variant/15">
        <p class="text-xs leading-relaxed text-on-surface-variant">
          {{ footerText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SelfmapReportHeaderModel } from "../../../types/selfmapReportType";
import { getEnneagramUiHexForLetter } from "../../../utils/enneagramRingPalette";

/**
 * @description 展示 `enneagram-info` 返回的 `character`：前三名及第三名同分并列项。
 */
defineOptions({
  name: "InfoEnneagramRanking",
});

const props = defineProps<{
  model?: SelfmapReportHeaderModel;
}>();

interface RankingCard {
  content: string;
  tags: Record<string, string>;
}

const rankingCards = computed((): RankingCard[] => {
  const ch = props.model?.character;
  if (!Array.isArray(ch)) {
    return [];
  }
  return ch.filter((c): c is RankingCard => {
    return typeof c === "object" && c !== null && "tags" in c && typeof (c as RankingCard).tags === "object";
  }) as RankingCard[];
});

const footerText = computed(() => {
  const d = props.model?.desc?.trim();
  return d && d.length > 0 ? d : "";
});

const rowToneClass = (idx: number): string => {
  if (idx === 0) {
    return "bg-surface-container-highest";
  }
  return "bg-surface-container-low/50 opacity-90";
};

/**
 * @description 与 `InfoEnneagramPanel` 同字母弧段代表色一致（实心圆底 + 高对比字色）。
 */
const badgeStyleForLetter = (letter: string | undefined): Record<string, string> => {
  const hex = getEnneagramUiHexForLetter(letter ?? "");
  return {
    backgroundColor: hex,
    color: "#f1f3fc",
  };
};

const percentStyleForLetter = (letter: string | undefined): Record<string, string> => {
  return { color: getEnneagramUiHexForLetter(letter ?? "") };
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
