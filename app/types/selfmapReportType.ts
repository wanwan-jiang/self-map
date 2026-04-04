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
  /** 大五报告：各 domain 按测评 level 在库中解析的说明 */
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
