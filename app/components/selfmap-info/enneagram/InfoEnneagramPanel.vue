<template>
  <section class="md:col-span-7 flex h-full flex-col">
    <div class="big-five-panel p-8 flex h-full min-h-[500px] flex-col justify-center rounded-lg">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold">维度分布</h2>
      </div>
      <div class="relative flex-grow flex items-center justify-center overflow-visible min-h-0">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-[#b2a1ff]/10 rounded-full blur-[120px]" />
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-[#50e1f9]/10 rounded-full blur-[120px]" />
        <svg
          class="mx-auto block aspect-square w-full max-w-md shrink-0 drop-shadow-2xl"
          viewBox="-40 -40 480 480"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="enneagram-grad-1" gradientUnits="userSpaceOnUse" x1="48" y1="48" x2="352" y2="352">
              <stop offset="0%" stop-color="#7858f6" stop-opacity="1" />
              <stop offset="100%" stop-color="#b2a1ff" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="enneagram-grad-2" gradientUnits="userSpaceOnUse" x1="320" y1="80" x2="80" y2="320">
              <stop offset="0%" stop-color="#50e1f9" stop-opacity="1" />
              <stop offset="100%" stop-color="#40d5ee" stop-opacity="1" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" class="fill-surface-container-highest" r="60" />
          <text
            class="fill-secondary-fixed"
            font-family="Plus Jakarta Sans, sans-serif"
            font-size="24"
            font-weight="800"
            text-anchor="middle"
            x="200"
            y="220"
          >
            ENNEAGRAM
          </text>
          <g v-for="seg in ringSegments" :key="seg.letter">
            <path
              v-if="seg.sweepDeg > 0.05"
              class="ring-segment"
              :d="seg.pathD"
              fill="none"
              stroke-linecap="butt"
              stroke-width="24"
              :opacity="seg.opacity"
              :stroke="seg.strokeValue"
            />
            <text
              v-if="seg.sweepDeg > 0.05"
              class="enneagram-ring-label"
              pointer-events="none"
              text-anchor="middle"
              :fill="seg.labelFill"
              :opacity="seg.opacity"
              :x="seg.labelX"
              :y="seg.labelY"
            >
              {{ seg.name }}
              <tspan class="opacity-80" :x="seg.labelX" dy="1.15em" font-size="9">
                {{ seg.score }}分 · {{ seg.percentLabel }}
              </tspan>
            </text>
          </g>
          <text
            class="fill-on-surface-variant"
            font-family="Plus Jakarta Sans, sans-serif"
            font-size="12"
            font-weight="bold"
            text-anchor="middle"
            x="200"
            y="195"
          >
            九型人格
          </text>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SelfmapReportHeaderModel } from "../../../types/selfmapReportType";
import {
  ENNEAGRAM_LETTERS,
  type EnneagramLetter,
  getEnneagramRingSegmentStyle,
} from "../../../utils/enneagramRingPalette";

/**
 * @description 九型环图：总分 = 各字母 A–I 得分之和（如 36 题×每题 1 分）；整圈 360° 按得分比例切分，每段 `d` 为对应圆心角的圆弧。
 */
defineOptions({
  name: "InfoEnneagramPanel",
});

const props = withDefaults(
  defineProps<{
    model?: SelfmapReportHeaderModel;
  }>(),
  {
    model: () => ({}),
  },
);

const CX = 200;
const CY = 200;
const R = 140;
/** 标签放在弧中点外侧（圆环外沿约 R+12≈152，略大则文字更靠外） */
const LABEL_R = 186;

const ENNEAGRAM_LETTER_TO_TYPE_NO: Record<EnneagramLetter, number> = {
  A: 9,
  B: 6,
  C: 3,
  D: 1,
  E: 4,
  F: 2,
  G: 8,
  H: 5,
  I: 7,
};

const TYPE_NO_LABEL: Record<number, string> = {
  1: "完美型",
  2: "助人型",
  3: "成就型",
  4: "自我型",
  5: "理智型",
  6: "忠诚型",
  7: "活跃型",
  8: "领袖型",
  9: "和平型",
};

/**
 * @description 数学角（度）：0° 为右侧，逆时针为正；12 点方向为 -90°。与 `Math.cos`/`Math.sin` 一致。
 */
function polarDeg(cx: number, cy: number, r: number, deg: number): { x: number; y: number } {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/**
 * @description 从 `startDeg` 顺时针画到 `endDeg` 的圆弧（沿半径 `r` 的圆）。`endDeg > startDeg`。
 */
function arcPathClockwise(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const p0 = polarDeg(cx, cy, r, startDeg);
  const p1 = polarDeg(cx, cy, r, endDeg);
  const delta = endDeg - startDeg;
  const largeArc = delta > 180 ? 1 : 0;
  return `M ${round2(p0.x)} ${round2(p0.y)} A ${r} ${r} 0 ${largeArc} 1 ${round2(p1.x)} ${round2(p1.y)}`;
}

/**
 * @description 整圆（360°）时单段 `A` 起终点重合无法渲染，用两段半圆拼接。
 */
function fullCircleDoubleArc(cx: number, cy: number, r: number): string {
  const top = polarDeg(cx, cy, r, -90);
  const bottom = polarDeg(cx, cy, r, 90);
  const left = polarDeg(cx, cy, r, 270);
  return `M ${round2(top.x)} ${round2(top.y)} A ${r} ${r} 0 0 1 ${round2(bottom.x)} ${round2(bottom.y)} A ${r} ${r} 0 0 1 ${round2(left.x)} ${round2(left.y)}`;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * @description 最大余数法：九项「百分点×10」的整数之和为 1000，展示为一位小数时合计严格为 100.0%。
 */
function allocatePercentTenths(
  weights: Record<EnneagramLetter, number>,
  weightTotal: number,
): Record<EnneagramLetter, number> {
  const letters: EnneagramLetter[] = [...ENNEAGRAM_LETTERS];
  if (weightTotal <= 0) {
    const out = {} as Record<EnneagramLetter, number>;
    const base = Math.floor(1000 / letters.length);
    const rem = 1000 - base * letters.length;
    letters.forEach((L, i) => {
      out[L] = base + (i < rem ? 1 : 0);
    });
    return out;
  }

  const rows = letters.map((L) => {
    const exact = (weights[L] / weightTotal) * 1000;
    const flo = Math.floor(exact + 1e-9);
    const frac = exact - flo;
    return { L, flo, frac };
  });
  const sumFlo = rows.reduce((s, r) => s + r.flo, 0);
  const rem = 1000 - sumFlo;
  rows.sort((a, b) => b.frac - a.frac);
  const out = {} as Record<EnneagramLetter, number>;
  for (const r of rows) {
    out[r.L] = r.flo;
  }
  for (let k = 0; k < rem; k++) {
    const L = rows[k]?.L;
    if (L !== undefined) {
      out[L] += 1;
    }
  }
  return out;
}

function tenthsToPercentLabel(tenths: number): string {
  return `${(tenths / 10).toFixed(1)}%`;
}

const isEnneagramLetterStats = (stats: SelfmapReportHeaderModel["stats"]): stats is Record<string, number> => {
  if (!stats || typeof stats !== "object" || Array.isArray(stats)) {
    return false;
  }
  const rec = stats as Record<string, unknown>;
  return ENNEAGRAM_LETTERS.some((L) => typeof rec[L] === "number" || typeof rec[L.toLowerCase()] === "number");
};

const scoreForLetter = (stats: Record<string, unknown> | undefined, letter: EnneagramLetter): number => {
  if (!stats) {
    return 0;
  }
  const raw = stats[letter] ?? stats[letter.toLowerCase()];
  const n = typeof raw === "number" ? raw : Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

const letterStatsComputed = computed(() => {
  const raw = props.model?.stats;
  const rec = isEnneagramLetterStats(raw) ? (raw as Record<string, unknown>) : ({} as Record<string, unknown>);
  const scores: Record<EnneagramLetter, number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
    G: 0,
    H: 0,
    I: 0,
  };
  let total = 0;
  for (const L of ENNEAGRAM_LETTERS) {
    const s = scoreForLetter(rec, L);
    scores[L] = s;
    total += s;
  }
  return { scores, total };
});

const ringSegments = computed(() => {
  const { scores, total } = letterStatsComputed.value;
  const equalWeights: Record<EnneagramLetter, number> = {
    A: 1,
    B: 1,
    C: 1,
    D: 1,
    E: 1,
    F: 1,
    G: 1,
    H: 1,
    I: 1,
  };
  const percentTenths = allocatePercentTenths(total > 0 ? scores : equalWeights, total > 0 ? total : 9);
  /** 从 12 点顺时针铺满分母：无数据时每段均分 360° */
  let cursorDeg = -90;
  const out: Array<{
    letter: EnneagramLetter;
    name: string;
    score: number;
    share: number;
    percentLabel: string;
    sweepDeg: number;
    pathD: string;
    labelX: number;
    labelY: number;
    strokeValue: string;
    /** 与 `strokeValue` 同源，供标签 `fill` 与弧段同色 */
    labelFill: string;
    opacity: number;
  }> = [];

  for (const letter of ENNEAGRAM_LETTERS) {
    const score = scores[letter];
    const share = total > 0 ? score / total : 1 / ENNEAGRAM_LETTERS.length;
    const sweepDeg = total > 0 ? (score / total) * 360 : 360 / ENNEAGRAM_LETTERS.length;
    const endDeg = cursorDeg + sweepDeg;
    const midDeg = cursorDeg + sweepDeg / 2;
    let pathD = "";
    if (sweepDeg >= 359.5) {
      pathD = fullCircleDoubleArc(CX, CY, R);
    } else if (sweepDeg > 0.05) {
      pathD = arcPathClockwise(CX, CY, R, cursorDeg, endDeg);
    }
    const labelPt = polarDeg(CX, CY, LABEL_R, midDeg);
    const no = ENNEAGRAM_LETTER_TO_TYPE_NO[letter];
    const style = getEnneagramRingSegmentStyle(letter);
    out.push({
      letter,
      name: TYPE_NO_LABEL[no] ?? letter,
      score: total > 0 ? score : 0,
      share,
      percentLabel: tenthsToPercentLabel(percentTenths[letter]),
      sweepDeg,
      pathD,
      labelX: round2(labelPt.x),
      labelY: round2(labelPt.y),
      strokeValue: style.stroke,
      labelFill: style.stroke,
      opacity: style.opacity,
    });
    cursorDeg = endDeg;
  }

  return out;
});
</script>

<style scoped>
.big-five-panel {
  background: rgba(32, 38, 47, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(68, 72, 79, 0.15);
}

.enneagram-ring-label {
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 10px;
  font-weight: 600;
}

.ring-segment {
  transition: opacity 0.25s ease;
}

.ring-segment:hover {
  filter: brightness(1.15);
}
</style>
