import { MBTI_TYPE_KEY, BIG_FIVE_TYPE_KEY } from "~/variables/variable";
type PersonTestTypeKey = typeof MBTI_TYPE_KEY | typeof BIG_FIVE_TYPE_KEY;

type SelectPayload = {
  id: string;
  value: number;
};

type PersonTestState<Q, A> = {
  total: number;
  currentNumber: ComputedRef<number>;
  currentQuestion: ComputedRef<Q | undefined>;
  progressPercent: ComputedRef<number>;
  estimatedMinutesLeft: ComputedRef<number>;
  canGoPrev: ComputedRef<boolean>;
  canGoNext: ComputedRef<boolean>;
  isLastQuestion: ComputedRef<boolean>;
  hasSelectedCurrent: ComputedRef<boolean>;
  selectedOptionId: ComputedRef<string | undefined>;
  answers: Ref<Record<string, A>>;
  selectOption: (payload: SelectPayload) => void;
  goPrev: () => void;
  goNext: () => void;
};

export type { PersonTestTypeKey, SelectPayload, PersonTestState };
