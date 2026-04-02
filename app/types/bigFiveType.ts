interface BigFiveOption {
  id: string;
  label: string;
  text: string;
  value: number;
}

interface BigFiveQuestion {
  id: string;
  domain: string;
  facet: number;
  keyed: string;
  text: string;
  options: BigFiveOption[];
}

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
  percentile: number;
}

export type { BigFiveOption, BigFiveQuestion, BigFiveAnswer, BigFiveDomainBucket, BigFiveFacetBucket, BigFiveStatItem };
