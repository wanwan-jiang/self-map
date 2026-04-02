export interface TestOption {
  id: string;
  label?: string;
  text?: string;
  value?: number;
}

export interface TestQuestion {
  id: string;
  dimension?: string;
  dimension_en?: string;
  title?: string;
  options?: TestOption[];
  domain?: string;
  facet?: number;
  keyed?: string;
  text?: string;
}

interface TestQuestionPanelProps {
  question: TestQuestion;
  selectedOptionId?: string;
  canGoPrev: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  hasSelectedCurrent: boolean;
}

interface PersonProgressProps {
  current: number;
  total: number;
  progressPercent: number;
  estimatedMinutesLeft: number;
}

interface AvatarItem {
  src: string;
  alt: string;
}

interface AxisLabelItem {
  id: string;
  text: string;
  textToneClass: string;
}

interface LegendRowItem {
  id: string;
  dotTone: "primary" | "secondary" | "tertiary";
  text: string;
}

interface PairPercentageResult {
  dominantLabel: string;
  dominantPercent: number;
  leftPercent: number;
  rightPercent: number;
}

interface InfoGlassCardProps {
  paddingClass?: string;
}

export type {
  TestQuestionPanelProps,
  PersonProgressProps,
  AvatarItem,
  AxisLabelItem,
  LegendRowItem,
  PairPercentageResult,
  InfoGlassCardProps,
};
