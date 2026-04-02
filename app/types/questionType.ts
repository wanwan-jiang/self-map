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
