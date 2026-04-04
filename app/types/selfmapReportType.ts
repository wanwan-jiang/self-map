import type { BigFiveStatItem } from "./userBigFiveResultType";
import type { RiasecDimensionScore } from "./userRiasecResultType";

type SelfmapInsightTone = "primary" | "secondary" | "tertiary";

/** 大五：库表 `BigFiveInfo.levels[level]` 解析结果 */
interface SelfmapBigFiveDomainLevelDescription {
  domain: string;
  level: "h" | "n" | "l";
  average: number;
  levelText: string;
}

interface SelfmapReportHeaderModel {
  desc?: string;
  stats?: Record<string, number> | BigFiveStatItem[] | Record<string, RiasecDimensionScore>;
  title?: string;
  type?: string;
  character?: SelfmapInsightCardModel[] | Record<string, SelfmapInsightCardModel>;
  /** 大五 / 霍兰德：各 domain 按相对强度档在库中解析的说明（`average` 在大五为 1–5 均分；霍兰德为 0–100 相对强度） */
  domainLevelDescriptions?: SelfmapBigFiveDomainLevelDescription[];
}

interface SelfmapDimensionLegendItem {
  id: string;
  dotTone: SelfmapInsightTone;
  text: string;
}

interface SelfmapDimensionAxisLabel {
  desc?: string;
  stats?: Record<string, number> | BigFiveStatItem[] | Record<string, RiasecDimensionScore>;
  title?: string;
  type?: string;
}
interface InsightDisplayItem {
  id: string;
  title: string;
  icon: string;
  card: SelfmapInsightCardModel;
}

interface SelfmapInsightCardModel {
  content: string;
  tags: Record<string, string>;
}

interface SelfmapCareerPathModel {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface SelfmapSkillModel {
  id: string;
  title: string;
  description: string;
}

interface SelfmapReportContent {
  header?: SelfmapReportHeaderModel;
  dimensionAxisLabels?: SelfmapDimensionAxisLabel[];
  dimensionLegend?: SelfmapDimensionLegendItem[];
  insightCards?: SelfmapInsightCardModel[];
  careerImageUrl?: string;
  careerImageAlt?: string;
  careerPaths?: SelfmapCareerPathModel[];
  skills?: SelfmapSkillModel[];
  quote?: string;
}

export type {
  SelfmapInsightTone,
  SelfmapBigFiveDomainLevelDescription,
  SelfmapReportHeaderModel,
  SelfmapDimensionLegendItem,
  SelfmapDimensionAxisLabel,
  InsightDisplayItem,
  SelfmapInsightCardModel,
  SelfmapCareerPathModel,
  SelfmapSkillModel,
  SelfmapReportContent,
};
