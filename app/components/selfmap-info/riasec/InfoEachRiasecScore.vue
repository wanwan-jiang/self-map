<script setup lang="ts">
import type { SelfmapReportHeaderModel } from "../../../types/selfmapReportType";
import type { RiasecDimensionScore } from "~/types/userRiasecResultType";

/**
 * @description 霍兰德 RIASEC 六维得分卡片，与 `InfoDimensionRiasecPanel` 轴标签、计分一致。
 */
defineOptions({
  name: "InfoEachRiasecScore",
});

const props = defineProps<{
  model?: SelfmapReportHeaderModel;
}>();

interface RiasecScoreCardItem {
  title: string;
  score: number;
  description: string;
}

const RIASEC_AXES_ORDER = ["R", "I", "A", "S", "E", "C"] as const;
type RiasecLetter = (typeof RIASEC_AXES_ORDER)[number];

const RIASEC_TYPE_LABEL: Record<RiasecLetter, string> = {
  R: "R 现实型",
  I: "I 研究型",
  A: "A 艺术型",
  S: "S 社会型",
  E: "E 企业型",
  C: "C 常规型",
};

const isRiasecStatsRecord = (
  stats: SelfmapReportHeaderModel["stats"],
): stats is Record<string, RiasecDimensionScore> => {
  if (!stats || typeof stats !== "object" || Array.isArray(stats)) {
    return false;
  }
  const rec = stats as Record<string, unknown>;
  const sample = rec.R ?? rec.r ?? rec.I ?? rec.A;
  return typeof sample === "object" && sample !== null && "score" in sample && "max" in sample;
};

const riasecDimensionPercent = (stats: SelfmapReportHeaderModel["stats"], letter: RiasecLetter): number => {
  if (!isRiasecStatsRecord(stats)) {
    return 0;
  }
  const cell = stats[letter] as RiasecDimensionScore | undefined;
  if (!cell || typeof cell !== "object") {
    return 0;
  }
  const max = Number(cell.max);
  const score = Number(cell.score);
  if (Number.isNaN(max) || Number.isNaN(score) || max <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(100, (score / max) * 100));
};

const scoreCards = computed<RiasecScoreCardItem[]>(() => {
  const rawStats = props.model?.stats;
  return RIASEC_AXES_ORDER.map((letter) => {
    const title = RIASEC_TYPE_LABEL[letter];
    const pct = Math.round(riasecDimensionPercent(rawStats, letter));
    let description = "暂无该维度测评数据。";
    if (isRiasecStatsRecord(rawStats)) {
      const cell = rawStats[letter];
      if (cell && typeof cell === "object") {
        const s = Number(cell.score);
        const m = Number(cell.max);
        if (!Number.isNaN(s) && !Number.isNaN(m) && m > 0) {
          description = `原始分 ${s} / 满分 ${m}，折合相对强度见百分比与雷达图。`;
        }
      }
    }
    return { title, score: pct, description };
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
            <span class="text-2xl font-headline font-black">{{ item.score }}%</span>
          </div>
          <p class="text-xs text-on-surface-variant leading-relaxed mb-6">
            {{ item.description }}
          </p>
        </div>
        <div class="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full" :style="{ width: `${item.score}%` }" />
        </div>
      </div>
    </div>
  </div>
</template>
