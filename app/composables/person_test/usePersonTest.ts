import type { TestQuestion } from "~/types/questionType";
import { MBTI_TYPE_KEY, BIG_FIVE_TYPE_KEY, RIASEC_TYPE_KEY, ENNEAGRAM_TYPE_KEY } from "~/variables/variable";
import type { SelectedAnswerPayload } from "~/types/questionType";

/**
 * 与答案 Record 的键一致：优先业务 id，避免仅 MongoDB `_id` 时与 `?? ""` 查键不一致。
 */
function getQuestionKey(question: TestQuestion | undefined): string {
  if (!question?.id) return "";
  return question.id;
}

export const usePersonTest = async (type: string) => {
  let questions: TestQuestion[] = [];
  //TODO
  if (type === MBTI_TYPE_KEY) {
    questions = await $fetch<TestQuestion[]>("/api/person-test/mbti");
  } else if (type === BIG_FIVE_TYPE_KEY) {
    questions = await $fetch<TestQuestion[]>("/api/person-test/big-five");
  } else if (type === RIASEC_TYPE_KEY) {
    questions = await $fetch<TestQuestion[]>("/api/person-test/riasec");
  } else if (type === ENNEAGRAM_TYPE_KEY) {
    questions = await $fetch<TestQuestion[]>("/api/person-test/enneagram");
  }

  const total = questions.length;
  const currentIndex = ref(0);

  //TODO
  const answers = ref<Record<string, SelectedAnswerPayload>>({});

  const currentQuestion = computed(() => questions[currentIndex.value]);
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
    // TODO
    if (type === MBTI_TYPE_KEY) {
      answers.value[key] = { ...payload, dimension_en: currentQuestion.value?.dimension_en ?? "" };
    } else if (type === BIG_FIVE_TYPE_KEY) {
      answers.value[key] = {
        ...payload,
        domain: currentQuestion.value?.domain ?? "",
        facet: currentQuestion.value?.facet ?? 0,
        keyed: currentQuestion.value?.keyed ?? "",
      };
    } else if (type === RIASEC_TYPE_KEY) {
      answers.value[key] = {
        ...payload,
        t: currentQuestion.value?.t ?? "",
      };
    } else if (type === ENNEAGRAM_TYPE_KEY) {
      answers.value[key] = {
        ...payload,
        code: currentQuestion.value?.code ?? "",
      };
    }

    console.log("answers.value", answers.value);
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
