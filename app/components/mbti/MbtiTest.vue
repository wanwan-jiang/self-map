<template>
  <main class="flex-grow flex flex-col items-center justify-center pt-8 pb-12 px-6">
    <MbtiProgress
      :current="currentNumber"
      :total="total"
      :progress-percent="progressPercent"
      :estimated-minutes-left="estimatedMinutesLeft"
    />

    <MbtiQuestionPanel
      v-if="currentQuestion"
      :question="currentQuestion"
      :selected-option-id="selectedOptionId"
      :can-go-prev="canGoPrev"
      :can-go-next="canGoNext"
      :is-last-question="isLastQuestion"
      :has-selected-current="hasSelectedCurrent"
      @select="selectOption"
      @prev="goPrev"
      @next="goNext"
      @submit="handleSubmit"
    />

    <div
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"
    />
  </main>
</template>

<script setup lang="ts">
import { useMbtiTest } from "~/composables/user/useMbtiTest";

const {
  total,
  currentNumber,
  currentQuestion,
  progressPercent,
  estimatedMinutesLeft,
  canGoPrev,
  canGoNext,
  isLastQuestion,
  hasSelectedCurrent,
  selectedOptionId,
  answers,
  selectOption,
  goPrev,
  goNext,
} = await useMbtiTest();

const handleSubmit = async (): Promise<void> => {
  if (typeof window === "undefined") {
    return;
  }

  type Answer = { id: string; value: number; dimension_en?: string };

  type AxisPair = "EI" | "SN" | "TF" | "JP";
  type AxisLetter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
  type AxisKey = AxisPair | AxisLetter;
  const stats: Record<AxisKey, number> = {
    EI: 0,
    E: 0,
    I: 0,
    SN: 0,
    S: 0,
    N: 0,
    TF: 0,
    T: 0,
    F: 0,
    JP: 0,
    J: 0,
    P: 0,
  };

  const axisPairByDimension = new Map<string, AxisPair>([
    ["EI", "EI"],
    ["SN", "SN"],
    ["TF", "TF"],
    ["JP", "JP"],
  ]);

  const mbtiScoreToLetter = (pair: AxisPair, value: number): AxisLetter | undefined => {
    if (value === 0) return undefined;

    if (pair === "EI") return value > 0 ? "E" : "I";
    if (pair === "SN") return value > 0 ? "S" : "N";
    if (pair === "TF") return value > 0 ? "T" : "F";
    // pair === "JP"
    return value > 0 ? "J" : "P";
  };

  for (const answer of Object.values(answers.value) as Answer[]) {
    const dim = (answer.dimension_en ?? "").toUpperCase();
    const pair = axisPairByDimension.get(dim);
    if (pair === undefined) continue;

    stats[pair] = stats[pair] + 1;

    const picked = mbtiScoreToLetter(pair, answer.value);
    if (picked === undefined) continue;
    stats[picked] = stats[picked] + 1;
  }

  const getFinalLetter = (pair: AxisPair, positive: AxisLetter, negative: AxisLetter): AxisLetter => {
    // 按你的规则：正数 > 负数 => positive，否则 => negative（包含相等时）
    return stats[positive] > stats[negative] ? positive : negative;
  };

  const ei = getFinalLetter("EI", "E", "I");
  const sn = getFinalLetter("SN", "S", "N");
  const tf = getFinalLetter("TF", "T", "F");
  const jp = getFinalLetter("JP", "J", "P");

  const mbtiType = `${ei}${sn}${tf}${jp}`;
  
  console.log("answers", answers.value);
  console.log("mbtiType", mbtiType);
  console.log("stats", stats);
  
  // window.localStorage.setItem("mbti_stats", JSON.stringify(stats));
  // window.localStorage.setItem("mbti_type", mbtiType);
  // window.localStorage.setItem("isSubmitSuccess", "true");
};

useHead({
  title: "SelfMap - MBTI 测试",
  htmlAttrs: {
    lang: "zh-Hans",
    class: "dark",
  },
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap",
    },
  ],
});
</script>
