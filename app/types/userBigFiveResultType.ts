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
  domainName: string;
  score: number;
  count: number;
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

interface UserBigFiveResultSaveResponse {
  success: true;
  data: UserBigFiveResultItem;
}

export type { BigFiveAnswer, BigFiveDomainBucket, BigFiveFacetBucket, BigFiveStatItem, UserBigFiveResultSaveResponse };
