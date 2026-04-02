<template>
  <main class="flex-grow flex flex-col items-center justify-center pt-8 pb-12 px-6">
    <PersonProgress
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
import { usePersonTest } from "~/composables/person_test/usePersonTest";
import { MBTI_TYPE_KEY } from "~/variables/variable";
import { usePersonSubmit } from "~/composables/person_test/usePersonSubmit";

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
  answers,
  selectedOptionId,
  selectOption,
  goPrev,
  goNext,
} = await usePersonTest(MBTI_TYPE_KEY);

const handleSubmit = async (): Promise<void> => {
  await usePersonSubmit(MBTI_TYPE_KEY, answers);
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
