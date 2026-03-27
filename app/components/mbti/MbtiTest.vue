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
      :selected-option-id="answers[currentQuestion.id]"
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

  <footer class="bg-background w-full py-12 mt-auto border-t border-slate-800/15">
    <div class="flex flex-col items-center gap-6 px-8 w-full max-w-7xl mx-auto">
      <div class="flex items-center gap-2">
        <span class="text-lg font-bold text-slate-200 font-headline">SelfMap</span>
        <span class="w-1 h-1 bg-primary rounded-full" />
        <span class="text-slate-500 text-sm font-body">探索未知的自己</span>
      </div>
      <div class="flex gap-8">
        <a class="text-slate-500 hover:text-slate-300 text-sm transition-colors" href="#">关于我们</a>
        <a class="text-slate-500 hover:text-slate-300 text-sm transition-colors" href="#">隐私政策</a>
        <a class="text-slate-500 hover:text-slate-300 text-sm transition-colors" href="#">服务条款</a>
        <a class="text-slate-500 hover:text-slate-300 text-sm transition-colors" href="#">联系我们</a>
      </div>
      <p class="text-primary text-sm font-body tracking-wide">© 2024 SelfMap. 认知光芒，指引成长。</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useMbtiStore } from "../../../stores/mbti";

const mbtiStore = useMbtiStore();

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
  selectOption,
  goPrev,
  goNext,
} = useMbtiTest();

const handleSubmit = async (): Promise<void> => {
  await mbtiStore.submitTest();
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
