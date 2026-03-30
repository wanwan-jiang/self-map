<script setup lang="ts">
import type { SelfmapDimensionAxisLabel, SelfmapDimensionLegendItem } from "../../types/selfmapReportType";
import InfoGlassCard from "./InfoGlassCard.vue";

const props = defineProps<{
  axisLabels: SelfmapDimensionAxisLabel[];
  legend: SelfmapDimensionLegendItem[];
}>();

/** 与参考稿一致：上 → 右 → 下 → 左，最多展示 4 条轴标签 */
const AXIS_LABEL_LAYOUT_CLASSES = [
  "absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider uppercase",
  "absolute top-1/2 -right-12 -translate-y-1/2 text-[10px] font-bold tracking-wider uppercase text-right",
  "absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider uppercase",
  "absolute top-1/2 -left-12 -translate-y-1/2 text-[10px] font-bold tracking-wider uppercase",
] as const;

const axisLabelsForChart = computed(() => props.axisLabels.slice(0, AXIS_LABEL_LAYOUT_CLASSES.length));

const DIMENSION_POLYGON_POINTS = [
  [50, 16],
  [78.8, 50],
  [50, 86],
  [24, 50],
] as const;

const dimensionPolygonPoints = DIMENSION_POLYGON_POINTS.map(([x, y]) => `${x},${y}`).join(' ');

const dotClass = (tone: SelfmapDimensionLegendItem["dotTone"]): string => {
  if (tone === "primary") return "bg-primary";
  if (tone === "secondary") return "bg-secondary";
  return "bg-tertiary";
};
</script>

<template>
  <section class="md:col-span-5">
    <InfoGlassCard padding-class="p-8 flex flex-col justify-center min-h-[450px]">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold">维度分布</h2>
        <span class="material-symbols-outlined text-on-surface-variant">info</span>
      </div>
      <div class="relative flex-grow flex items-center justify-center">
        <div class="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-full" />
        <div class="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center">
          <svg class="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" class="stroke-outline-variant/50" stroke-width="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" class="stroke-outline-variant/50" stroke-width="0.5" />
            <circle cx="50" cy="50" r="20" fill="none" class="stroke-outline-variant/50" stroke-width="0.5" />
            <circle cx="50" cy="50" r="10" fill="none" class="stroke-outline-variant/50" stroke-width="0.5" />
            <line class="stroke-on-surface/20" stroke-width="0.5" x1="50" x2="50" y1="10" y2="90" />
            <line class="stroke-on-surface/20" stroke-width="0.5" x1="10" x2="90" y1="50" y2="50" />
            <polygon
              class="fill-primary/20 stroke-primary [stroke-linejoin:round]"
              :points="dimensionPolygonPoints"
              stroke-width="1"
            />
          </svg>
          <div
            v-for="(item, i) in axisLabelsForChart"
            :key="item.id"
            :class="[AXIS_LABEL_LAYOUT_CLASSES[i] ?? AXIS_LABEL_LAYOUT_CLASSES[0], item.textToneClass]"
          >
            {{ item.text }}
          </div>
        </div>
      </div>
      <div class="mt-8 grid grid-cols-2 gap-4 text-sm">
        <div
          v-for="row in legend"
          :key="row.id"
          class="flex items-center gap-2 rounded-xl border border-outline-variant/10 bg-surface-container-low p-2"
        >
          <div class="h-1.5 w-1.5 shrink-0 rounded-full" :class="dotClass(row.dotTone)" />
          <span class="text-xs font-medium text-on-surface-variant">{{ row.text }}</span>
        </div>
      </div>
    </InfoGlassCard>
  </section>
</template>
