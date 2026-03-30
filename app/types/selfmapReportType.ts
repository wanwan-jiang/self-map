export type SelfmapInsightTone = "primary" | "secondary" | "tertiary";

export interface SelfmapReportHeaderModel {
  desc?: string;
  stats?: Record<string, number>;
  title?: string;
  type?: string;
}

export interface SelfmapDimensionLegendItem {
  id: string;
  dotTone: SelfmapInsightTone;
  text: string;
}

export interface SelfmapDimensionAxisLabel {
  id: string;
  text: string;
  positionClass: string;
  textToneClass: string;
}

export interface SelfmapInsightCardModel {
  id: string;
  icon: string;
  tone: SelfmapInsightTone;
  title: string;
  body: string;
  tags?: string[];
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
