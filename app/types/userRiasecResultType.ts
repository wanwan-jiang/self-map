/** 单维度：累计得分与各题满分之和（通常为 题数 × 每题最高分） */
interface RiasecDimensionScore {
  score: number;
  max: number;
}

/** 六维 R/I/A/S/E/C，每维为 { score, max } */
type UserRiasecStats = Record<string, RiasecDimensionScore>;

interface UserRiasecResultItem {
  id: string;
  userId: string;
  type: string;
  stats: UserRiasecStats;
  createdAt: string;
}

interface UserRiasecResultSaveResponse {
  success: true;
  data: UserRiasecResultItem;
}

interface UserRiasecResultsListResponse {
  success: true;
  data: UserRiasecResultItem[];
}

export type {
  RiasecDimensionScore,
  UserRiasecStats,
  UserRiasecResultItem,
  UserRiasecResultSaveResponse,
  UserRiasecResultsListResponse,
};
