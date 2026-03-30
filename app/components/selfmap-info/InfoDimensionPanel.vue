<script setup lang="ts">
import type { SelfmapReportHeaderModel } from "../../types/selfmapReportType";
import InfoGlassCard from "./InfoGlassCard.vue";

const props = defineProps<{
  model: SelfmapReportHeaderModel;
}>();

/** 与参考稿一致：上 → 右 → 下 → 左，最多展示 4 条轴标签 */
const AXIS_LABEL_LAYOUT_CLASSES = [
  "absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider uppercase",
  "absolute top-1/2 -right-12 -translate-y-1/2 text-[10px] font-bold tracking-wider uppercase text-right",
  "absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider uppercase",
  "absolute top-1/2 -left-12 -translate-y-1/2 text-[10px] font-bold tracking-wider uppercase",
] as const;

interface AxisLabelItem {
  id: string;
  text: string;
  textToneClass: string;
}

interface LegendRowItem {
  id: string;
  dotTone: "primary" | "secondary" | "tertiary";
  text: string;
}

interface PairPercentageResult {
  dominantLabel: string;
  dominantPercent: number;
  leftPercent: number;
  rightPercent: number;
}

const getPairPercentages = (
  leftScore: number,
  rightScore: number,
  leftLabel: string,
  rightLabel: string,
): PairPercentageResult => {
  const safeLeft = Math.max(0, leftScore);
  const safeRight = Math.max(0, rightScore);
  const total = safeLeft + safeRight;

  if (total === 0) {
    return {
      dominantLabel: leftLabel,
      dominantPercent: 0,
      leftPercent: 0,
      rightPercent: 0,
    };
  }

  const leftPercent = (safeLeft / total) * 100;
  const rightPercent = (safeRight / total) * 100;
  const leftIsDominant = leftPercent >= rightPercent;

  return {
    dominantLabel: leftIsDominant ? leftLabel : rightLabel,
    dominantPercent: leftIsDominant ? leftPercent : rightPercent,
    leftPercent,
    rightPercent,
  };
};

const axisLabelsForChart = computed<AxisLabelItem[]>(() => {
  const stats = props.model.stats ?? {};
  const ei = getPairPercentages(stats.E ?? 0, stats.I ?? 0, "外向 (E)", "内向 (I)");
  const sn = getPairPercentages(stats.S ?? 0, stats.N ?? 0, "感觉 (S)", "直觉 (N)");
  const tf = getPairPercentages(stats.T ?? 0, stats.F ?? 0, "思考 (T)", "情感 (F)");
  const jp = getPairPercentages(stats.J ?? 0, stats.P ?? 0, "判断 (J)", "感知 (P)");

  return [
    {
      id: "EI",
      text: `${ei.dominantLabel} ${Math.round(ei.dominantPercent)}%`,
      textToneClass: "text-primary",
    },
    {
      id: "SN",
      text: `${sn.dominantLabel} ${Math.round(sn.dominantPercent)}%`,
      textToneClass: "text-secondary",
    },
    {
      id: "TF",
      text: `${tf.dominantLabel} ${Math.round(tf.dominantPercent)}%`,
      textToneClass: "text-tertiary",
    },
    {
      id: "JP",
      text: `${jp.dominantLabel} ${Math.round(jp.dominantPercent)}%`,
      textToneClass: "text-on-surface",
    },
  ];
});

const dimensionPolygonPoints = computed(() => {
  const stats = props.model.stats ?? {};
  const ei = getPairPercentages(stats.E ?? 0, stats.I ?? 0, "E", "I");
  const sn = getPairPercentages(stats.S ?? 0, stats.N ?? 0, "S", "N");
  const tf = getPairPercentages(stats.T ?? 0, stats.F ?? 0, "T", "F");
  const jp = getPairPercentages(stats.J ?? 0, stats.P ?? 0, "J", "P");

  // 以 50,50 为中心，最小半径 10，最大半径 40
  const radiusFromPercent = (percent: number): number => 10 + (Math.max(0, Math.min(100, percent)) / 100) * 30;

  const topR = radiusFromPercent(ei.dominantPercent);
  const rightR = radiusFromPercent(sn.dominantPercent);
  const bottomR = radiusFromPercent(tf.dominantPercent);
  const leftR = radiusFromPercent(jp.dominantPercent);

  const points: Array<[number, number]> = [
    [50, 50 - topR],
    [50 + rightR, 50],
    [50, 50 + bottomR],
    [50 - leftR, 50],
  ];

  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
});

const legendRows = computed<LegendRowItem[]>(() => {
  const stats = props.model.stats ?? {};
  const ei = getPairPercentages(stats.E ?? 0, stats.I ?? 0, "外向", "内向");
  const sn = getPairPercentages(stats.S ?? 0, stats.N ?? 0, "实感", "直觉");
  const tf = getPairPercentages(stats.T ?? 0, stats.F ?? 0, "思考", "情感");
  const jp = getPairPercentages(stats.J ?? 0, stats.P ?? 0, "判断", "感知");

  return [
    { id: "energy", dotTone: "primary", text: `能量来源: ${ei.dominantLabel}为主` },
    { id: "info", dotTone: "secondary", text: `信息处理: ${sn.dominantLabel}为主` },
    { id: "decision", dotTone: "tertiary", text: `决策方式: ${tf.dominantLabel}为主` },
    { id: "lifestyle", dotTone: "primary", text: `行动风格: ${jp.dominantLabel}为主` },
  ];
});

const dotClass = (tone: LegendRowItem["dotTone"]): string => {
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
        <!-- <span class="material-symbols-outlined text-on-surface-variant">info</span> -->
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
          v-for="row in legendRows"
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
