<template>
  <section class="md:col-span-7">
    <div class="big-five-panel rounded-lg p-8 flex flex-col justify-center min-h-[500px]">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold">维度分布</h2>
      </div>
      <div class="relative flex-grow flex items-center justify-center overflow-visible min-h-0">
        <div class="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-full" />
        <div
          class="relative mx-auto flex aspect-square w-full max-w-[min(100%,440px)] items-center justify-center overflow-visible"
        >
          <svg class="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="40" fill="none" class="stroke-outline-variant/50" stroke-width="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" class="stroke-outline-variant/50" stroke-width="0.5" />
            <circle cx="50" cy="50" r="20" fill="none" class="stroke-outline-variant/50" stroke-width="0.5" />
            <circle cx="50" cy="50" r="10" fill="none" class="stroke-outline-variant/50" stroke-width="0.5" />
            <line
              v-for="(line, i) in radialLineEnds"
              :key="'radial-' + i"
              class="stroke-on-surface/20"
              stroke-width="0.5"
              x1="50"
              y1="50"
              :x2="line.x2"
              :y2="line.y2"
            />
            <polygon
              class="fill-primary/20 stroke-primary [stroke-linejoin:round]"
              :points="dimensionPolygonPoints"
              stroke-width="1.25"
            />
          </svg>
          <div
            v-for="(item, i) in axisLabelsForChart"
            :key="item.id"
            class="absolute pointer-events-none z-10"
            :style="axisLabelOuterStyles[i]"
          >
            <span
              class="inline-block whitespace-nowrap text-center text-[11px] sm:text-xs font-bold leading-tight tracking-tight"
              :class="item.textToneClass"
            >
              {{ item.text }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SelfmapReportHeaderModel } from "../../../types/selfmapReportType";
import type { AxisLabelItem, LegendRowItem } from "~/types/questionType";

const props = defineProps<{
  model: SelfmapReportHeaderModel;
}>();

/** OCEAN 五维：字母 → 中文名 */
const BIG_FIVE_DOMAINS = [
  { id: "O", name: "经验开放性" },
  { id: "C", name: "尽责性" },
  { id: "E", name: "外向性" },
  { id: "A", name: "亲和性" },
  { id: "N", name: "神经质" },
] as const;

const TONE_CLASSES = [
  "text-primary",
  "text-secondary",
  "text-tertiary",
  "text-on-surface",
  "text-primary-dim",
] as const;

/**
 * 将 `model.stats` 中各域分值转为 0–100（用于雷达半径）。
 * 支持：已是 0–100；或 1–5 量表（典型大五平均分）。
 */
const domainScorePercent = (stats: Record<string, number>, key: string): number => {
  const raw = stats[key];
  if (raw === undefined || raw === null || Number.isNaN(Number(raw))) {
    return 0;
  }
  const v = Number(raw);
  if (v >= 0 && v <= 5) {
    return Math.max(0, Math.min(100, ((v - 1) / 4) * 100));
  }
  return Math.max(0, Math.min(100, v));
};

/** 五轴放射线终点（viewBox 0–100，中心 50,50，与外圈 r=40 一致） */
const radialLineEnds = computed(() => {
  const n = 5;
  const r = 40;
  return Array.from({ length: n }, (_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return {
      x2: 50 + r * Math.cos(angle),
      y2: 50 + r * Math.sin(angle),
    };
  });
});

/**
 * 轴标签置于各轴最外端：与 SVG 同一坐标系（viewBox 0–100），
 * 外圈同心圆最大 r=40；标签锚点半径明显大于 40，避免文字仍落在圆内。
 */
const axisLabelOuterStyles = computed(() => {
  const n = 5;
  const rGridOuter = 40;
  const labelOffset = 8;
  const rOuter = rGridOuter + labelOffset;
  return Array.from({ length: n }, (_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
    const x = 50 + rOuter * Math.cos(angle);
    const y = 50 + rOuter * Math.sin(angle);
    return {
      left: `${x}%`,
      top: `${y}%`,
      transform: "translate(-50%, -50%)",
    };
  });
});

const axisLabelsForChart = computed<AxisLabelItem[]>(() => {
  const stats = props.model.stats ?? {};
  return BIG_FIVE_DOMAINS.map((d, i) => {
    const pct = Math.round(domainScorePercent(stats, d.id));
    return {
      id: d.id,
      text: `${d.name} ${pct}%`,
      textToneClass: TONE_CLASSES[i] ?? "text-on-surface-variant",
    };
  });
});

const dimensionPolygonPoints = computed(() => {
  const stats = props.model.stats ?? {};
  const n = 5;
  const radiusFromPercent = (percent: number): number => 10 + (Math.max(0, Math.min(100, percent)) / 100) * 30;

  const points: Array<[number, number]> = [];
  for (let i = 0; i < n; i++) {
    const key = BIG_FIVE_DOMAINS[i]?.id;
    if (!key) continue;
    const pct = domainScorePercent(stats, key);
    const r = radiusFromPercent(pct);
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    points.push([x, y]);
  }

  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
});

const legendRows = computed<LegendRowItem[]>(() => {
  const stats = props.model.stats ?? {};
  const tones: LegendRowItem["dotTone"][] = ["primary", "secondary", "tertiary", "primary", "secondary"];
  return BIG_FIVE_DOMAINS.map((d, i) => {
    const pct = Math.round(domainScorePercent(stats, d.id));
    return {
      id: `bf-${d.id}`,
      dotTone: tones[i] ?? "tertiary",
      text: `${d.id}: ${d.name} — 相对强度 ${pct}%`,
    };
  });
});

const dotClass = (tone: LegendRowItem["dotTone"]): string => {
  if (tone === "primary") return "bg-primary";
  if (tone === "secondary") return "bg-secondary";
  return "bg-tertiary";
};
</script>

<style scoped>
.big-five-panel {
  background: rgba(32, 38, 47, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(68, 72, 79, 0.15);
}
</style>
