import type { MbtiQuestion } from "~/types/mbtiType";

/**
 * 与答案 Record 的键一致：优先业务 id，避免仅 MongoDB `_id` 时与 `?? ""` 查键不一致。
 */
function getQuestionKey(question: MbtiQuestion | undefined): string {
  if (!question?.id) return "";
  return question.id;
}

export const useMbtiTest = async () => {
  const mbtiQuestions = await $fetch<MbtiQuestion[]>("/api/mbti-test/mbti");

  const total = mbtiQuestions.length;
  const currentIndex = ref(0);
  interface SelectedAnswerPayload {
    id: string;
    value: number;
    dimension_en?: string;
  }
  const answers = ref<Record<string, SelectedAnswerPayload>>({});

  const currentQuestion = computed(() => mbtiQuestions[currentIndex.value]);
  const currentNumber = computed(() => currentIndex.value + 1);
  const progressPercent = computed(() => (total > 0 ? Number(((currentNumber.value / total) * 100).toFixed(2)) : 0));
  const estimatedMinutesLeft = computed(() => Math.max(1, total - currentNumber.value));
  const canGoPrev = computed(() => currentIndex.value > 0);
  const canGoNext = computed(() => currentIndex.value < total - 1);
  const isLastQuestion = computed(() => currentIndex.value === total - 1);
  const hasSelectedCurrent = computed(() => {
    const key = getQuestionKey(currentQuestion.value);
    return key.length > 0 && Boolean(answers.value[key]);
  });

  const selectedOptionId = computed(() => {
    const key = getQuestionKey(currentQuestion.value);
    return key ? answers.value[key]?.id : undefined;
  });

  const selectOption = (payload: SelectedAnswerPayload): void => {
    const key = getQuestionKey(currentQuestion.value);
    if (!key) return;
    answers.value[key] = { ...payload, dimension_en: currentQuestion.value?.dimension_en ?? "" };
    // console.log("answers.value", answers.value);
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
    selectedOptionId,
    answers,
    selectOption,
    goPrev,
    goNext,
  };
};
