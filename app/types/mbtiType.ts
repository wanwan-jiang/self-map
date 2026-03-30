export interface MbtiOption {
  id: string;
  label: string;
  text: string;
  value: number;
}

export interface MbtiQuestion {
  id: string;
  dimension: string;
  dimension_en: string;
  title: string;
  options: MbtiOption[];
}
