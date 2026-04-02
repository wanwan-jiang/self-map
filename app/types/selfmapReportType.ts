export type SelfmapInsightTone = "primary" | "secondary" | "tertiary";

export interface SelfmapReportHeaderModel {
  desc?: string;
  stats?: Record<string, number>;
  title?: string;
  type?: string;
  character?: SelfmapInsightCardModel[] | Record<string, SelfmapInsightCardModel>;
}

export interface SelfmapDimensionLegendItem {
  id: string;
  dotTone: SelfmapInsightTone;
  text: string;
}

export interface SelfmapDimensionAxisLabel {
  desc?: string;
  stats?: Record<string, number>;
  title?: string;
  type?: string;
}
export interface InsightDisplayItem {
  id: string;
  title: string;
  icon: string;
  card: SelfmapInsightCardModel;
}

export interface SelfmapInsightCardModel {
  content: string;
  tags: Record<string, string>;
}

export interface SelfmapCareerPathModel {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SelfmapSkillModel {
  id: string;
  title: string;
  description: string;
}

export interface SelfmapReportContent {
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
