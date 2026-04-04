<script setup lang="ts">
import type { SelfmapReportHeaderModel } from "../../../types/selfmapReportType";
import type { BigFiveStatItem } from "~/types/userBigFiveResultType";

/**
 * @description 大五人格各维度得分卡片：由 `model.stats` 与 `domainLevelDescriptions` 驱动分数与说明。
 */
defineOptions({
  name: "InfoEachBigFiveScore",
});

const props = defineProps<{
  model?: SelfmapReportHeaderModel;
}>();

interface BigFiveScoreCardItem {
  title: string;
  score: number;
  description: string;
}

/** OCEAN 顺序与题库 domain 一致 */
const BIG_FIVE_DOMAIN_ROWS = [
  { id: "O", title: "经验开放性" },
  { id: "C", title: "尽责性" },
  { id: "E", title: "外向性" },
  { id: "A", title: "亲和性" },
  { id: "N", title: "神经质" },
] as const;

const isBigFiveStatsArray = (raw: SelfmapReportHeaderModel["stats"]): raw is BigFiveStatItem[] =>
  Array.isArray(raw) && raw.every((s) => typeof s === "object" && s !== null && "domain" in s && "average" in s);

const scoreCards = computed<BigFiveScoreCardItem[]>(() => {
  const rawStats = props.model?.stats;

  const statByDomain = new Map<string, BigFiveStatItem>();
  if (isBigFiveStatsArray(rawStats)) {
    for (const s of rawStats) {
      statByDomain.set(String(s.domain).toUpperCase(), s);
    }
  }

  return BIG_FIVE_DOMAIN_ROWS.map(({ id, title }) => {
    const stat = statByDomain.get(id);
    const average =
      stat !== undefined && typeof stat.average === "number" && !Number.isNaN(stat.average) ? stat.average : 0;
    const score = Math.round(Math.max(0, Math.min(100, (average / 5) * 100)));
    const description = stat?.levelText ?? "";
    return { title, score, description };
  });
});
</script>

<template>
  <div class="lg:col-span-12 flex flex-col gap-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <div
        v-for="item in scoreCards"
        :key="item.title"
        class="bg-surface-container rounded-lg p-6 flex flex-col justify-between group hover:bg-surface-container-high transition-colors"
      >
        <div>
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-primary font-bold">{{ item.title }}</h4>
            <span class="text-2xl font-headline font-black">{{ item.score + "%" }}</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed mb-6">
            {{ item.description || "暂无该维度说明。" }}
          </p>
        </div>
        <div class="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full" :style="{ width: `${item.score}%` }" />
        </div>
      </div>
    </div>
  </div>
</template>
