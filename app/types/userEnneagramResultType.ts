type UserEnneagramStats = Record<string, number>;

interface UserEnneagramResultItem {
  id: string;
  userId: string;
  type: string;
  stats: UserEnneagramStats;
  createdAt: string;
}

interface UserEnneagramResultSaveResponse {
  success: true;
  data: UserEnneagramResultItem;
}

interface UserEnneagramResultsListResponse {
  success: true;
  data: UserEnneagramResultItem[];
}

export type {
  UserEnneagramStats,
  UserEnneagramResultItem,
  UserEnneagramResultSaveResponse,
  UserEnneagramResultsListResponse,
};
