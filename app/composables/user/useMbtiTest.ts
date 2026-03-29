import { mbtiQuestions } from "../../data/mbtiQuestions";

export const useMbtiTest = () => {
  const total = mbtiQuestions.length;
  const currentIndex = ref(0);
  const answers = ref<Record<string, string>>({});

  const currentQuestion = computed(() => mbtiQuestions[currentIndex.value]);
  const currentNumber = computed(() => currentIndex.value + 1);
  const progressPercent = computed(() => (total > 0 ? Number(((currentNumber.value / total) * 100).toFixed(2)) : 0));
  const estimatedMinutesLeft = computed(() => Math.max(1, total - currentNumber.value));
  const canGoPrev = computed(() => currentIndex.value > 0);
  const canGoNext = computed(() => currentIndex.value < total - 1);
  const isLastQuestion = computed(() => currentIndex.value === total - 1);
  const hasSelectedCurrent = computed(() => Boolean(answers.value[currentQuestion.value?.id ?? ""]));

  const selectOption = (optionId: string): void => {
    if (!currentQuestion.value) return;
    answers.value[currentQuestion.value.id] = optionId;
  };

  const goPrev = (): void => {
    if (!canGoPrev.value) return;
    currentIndex.value -= 1;
  };

  const goNext = (): void => {
    if (!canGoNext.value || !hasSelectedCurrent.value) return;
    currentIndex.value += 1;
  };

  return {
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
  };
};
