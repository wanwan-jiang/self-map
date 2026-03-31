export interface UserMbtiStats {
  EI: number;
  E: number;
  I: number;
  SN: number;
  S: number;
  N: number;
  TF: number;
  T: number;
  F: number;
  JP: number;
  J: number;
  P: number;
}

export interface UserMbtiResultItem {
  id: string;
  userId: string;
  mbti: string;
  stats: UserMbtiStats;
  createdAt: string;
}

export interface UserMbtiResultsListResponse {
  success: true;
  data: {
    items: UserMbtiResultItem[];
  };
}

export interface UserMbtiResultSaveResponse {
  success: true;
  data: UserMbtiResultItem;
}
