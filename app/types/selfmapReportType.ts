type SelfmapInsightTone = "primary" | "secondary" | "tertiary";

interface SelfmapReportHeaderModel {
  desc?: string;
  stats?: Record<string, number>;
  title?: string;
  type?: string;
  character?: SelfmapInsightCardModel[] | Record<string, SelfmapInsightCardModel>;
}

interface SelfmapDimensionLegendItem {
  id: string;
  dotTone: SelfmapInsightTone;
  text: string;
}

interface SelfmapDimensionAxisLabel {
  desc?: string;
  stats?: Record<string, number>;
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
  SelfmapReportHeaderModel,
  SelfmapDimensionLegendItem,
  SelfmapDimensionAxisLabel,
  InsightDisplayItem,
  SelfmapInsightCardModel,
  SelfmapCareerPathModel,
  SelfmapSkillModel,
  SelfmapReportContent,
};
