type UserRiasecStats = Record<string, number>;

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
  UserRiasecStats,
  UserRiasecResultItem,
  UserRiasecResultSaveResponse,
  UserRiasecResultsListResponse,
};
