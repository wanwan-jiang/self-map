<template>
  <section class="md:col-span-7">
    <div class="riasec-panel rounded-lg p-8 flex flex-col justify-center min-h-[500px]">
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
            class="absolute pointer-events-none z-10 flex max-w-[40%] sm:max-w-[36%] items-center justify-center"
            :style="axisLabelOuterStyles[i]"
          >
            <span
              class="inline-block text-center text-[9px] sm:text-[10px] font-bold leading-none tracking-tight whitespace-nowrap"
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
import type { RiasecDimensionScore } from "~/types/userRiasecResultType";

const props = defineProps<{
  model: SelfmapReportHeaderModel;
}>();

/** 与题库、提交逻辑一致：R → I → A → S → E → C（逆时针自顶轴起） */
const RIASEC_AXES_ORDER = ["R", "I", "A", "S", "E", "C"] as const;

type RiasecLetter = (typeof RIASEC_AXES_ORDER)[number];

/** 霍兰德六型全称（与参考稿 TYPE_LABEL 一致） */
const RIASEC_TYPE_LABEL: Record<RiasecLetter, string> = {
  R: "R 现实型",
  I: "I 研究型",
  A: "A 艺术型",
  S: "S 社会型",
  E: "E 企业型",
  C: "C 常规型",
};

const TONE_CLASSES = [
  "text-primary",
  "text-secondary",
  "text-tertiary",
  "text-on-surface",
  "text-primary-dim",
  "text-secondary",
] as const;

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

/**
 * @description 单维得分占该维满分的比例 → 0–100，供雷达半径与标签。
 */
const riasecDimensionPercent = (stats: SelfmapReportHeaderModel["stats"], letter: RiasecLetter): number => {
  if (!isRiasecStatsRecord(stats)) {
    return 0;
  }
  const key = letter.toUpperCase();
  const cell = stats[key] as RiasecDimensionScore | undefined;
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

const AXES_COUNT = RIASEC_AXES_ORDER.length;

/** 六轴放射线终点（viewBox 0–100，中心 50,50，外圈 r=40） */
const radialLineEnds = computed(() => {
  const r = 40;
  return Array.from({ length: AXES_COUNT }, (_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / AXES_COUNT;
    return {
      x2: 50 + r * Math.cos(angle),
      y2: 50 + r * Math.sin(angle),
    };
  });
});

const axisLabelOuterStyles = computed(() => {
  const rGridOuter = 40;
  const labelOffset = 10;
  const rOuter = rGridOuter + labelOffset;
  return Array.from({ length: AXES_COUNT }, (_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / AXES_COUNT;
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
  const stats = props.model.stats;
  return RIASEC_AXES_ORDER.map((letter, i) => {
    const pct = Math.round(riasecDimensionPercent(stats, letter));
    return {
      id: letter,
      text: `${RIASEC_TYPE_LABEL[letter]} ${pct}%`,
      textToneClass: TONE_CLASSES[i] ?? "text-on-surface-variant",
    };
  });
});

const dimensionPolygonPoints = computed(() => {
  const stats = props.model.stats;
  const radiusFromPercent = (percent: number): number => 10 + (Math.max(0, Math.min(100, percent)) / 100) * 30;

  const points: Array<[number, number]> = [];
  for (let i = 0; i < AXES_COUNT; i++) {
    const letter = RIASEC_AXES_ORDER[i];
    if (!letter) continue;
    const pct = riasecDimensionPercent(stats, letter);
    const r = radiusFromPercent(pct);
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / AXES_COUNT;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    points.push([x, y]);
  }

  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
});

const legendRows = computed<LegendRowItem[]>(() => {
  const stats = props.model.stats;
  const tones: LegendRowItem["dotTone"][] = ["primary", "secondary", "tertiary", "primary", "secondary", "tertiary"];
  return RIASEC_AXES_ORDER.map((letter, i) => {
    const pct = Math.round(riasecDimensionPercent(stats, letter));
    return {
      id: `riasec-${letter}`,
      dotTone: tones[i] ?? "tertiary",
      text: `${RIASEC_TYPE_LABEL[letter]} — 相对强度 ${pct}%`,
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
.riasec-panel {
  background: rgba(32, 38, 47, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(68, 72, 79, 0.15);
}
</style>
