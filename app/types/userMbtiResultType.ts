interface UserMbtiResultSaveResponse {
  success: true;
  data: UserMbtiResultItem;
}

interface UserMbtiResultItem {
  id: string;
  userId: string;
  type: string;
  stats: UserMbtiStats;
  createdAt: string;
}

interface UserMbtiStats {
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

interface UserMbtiResultsListResponse {
  success: true;
  data: UserMbtiResultItem[];
}

export type { UserMbtiStats, UserMbtiResultItem, UserMbtiResultsListResponse, UserMbtiResultSaveResponse };
