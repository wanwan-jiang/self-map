interface BigFiveAnswer {
  id: string;
  value: number;
  domain?: string;
  facet?: number;
  keyed?: string;
}
interface BigFiveFacetBucket {
  score: number;
  count: number;
}
interface BigFiveDomainBucket {
  score: number;
  count: number;
  facets: Record<number, BigFiveFacetBucket>;
}
interface BigFiveStatItem {
  domain: string;
  average: number;
  level: "h" | "n" | "l";
}

interface UserBigFiveResultItem {
  id: string;
  userId: string;
  stats: BigFiveStatItem[];
  type: string;
  createdAt: string;
}

/** POST 写入单条大五结果 */
interface UserBigFiveResultSaveResponse {
  success: true;
  data: UserBigFiveResultItem;
}

/** GET 拉取大五历史列表（与 latest-mbti-results 一致：`data` 为数组） */
interface UserBigFiveResultsListResponse {
  success: true;
  data: UserBigFiveResultItem[];
}

export type {
  BigFiveAnswer,
  BigFiveDomainBucket,
  BigFiveFacetBucket,
  BigFiveStatItem,
  UserBigFiveResultSaveResponse,
  UserBigFiveResultsListResponse,
  UserBigFiveResultItem,
};
