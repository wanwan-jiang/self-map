import type {
  UserMbtiResultSaveResponse,
  UserMbtiResultsListResponse,
  UserMbtiStats,
} from "../../types/userMbtiResultType";
import type {
  UserBigFiveResultSaveResponse,
  UserBigFiveResultsListResponse,
  BigFiveStatItem,
} from "../../types/userBigFiveResultType";
import type {
  UserRiasecResultSaveResponse,
  UserRiasecResultsListResponse,
  UserRiasecStats,
} from "../../types/userRiasecResultType";
import type {
  UserEnneagramResultSaveResponse,
  UserEnneagramResultsListResponse,
  UserEnneagramStats,
} from "../../types/userEnneagramResultType";
import type { SelfmapReportHeaderModel } from "../../types/selfmapReportType";

/**
 * @description 提交一条 MBTI 结果到服务端
 */
export async function saveUserMbtiResult(type: string, stats: UserMbtiStats): Promise<UserMbtiResultSaveResponse> {
  return await $fetch<UserMbtiResultSaveResponse>("/api/user-test/user-mbti-results", {
    method: "POST",
    body: { type, stats },
  });
}

/**
 * @description 拉取当前登录用户的 MBTI 测试历史
 */
export async function fetchUserLatestMbtiResults(): Promise<UserMbtiResultsListResponse> {
  return await $fetch<UserMbtiResultsListResponse>("/api/person-result/latest-mbti-results", {
    method: "GET",
  });
}

export async function fetchUserMbtiInfo(type: string, stats: UserMbtiStats): Promise<SelfmapReportHeaderModel> {
  return await $fetch<SelfmapReportHeaderModel>("/api/person-info/mbti-info", {
    method: "POST",
    body: {
      type,
      stats: stats,
    },
  });
}

/**
 * @description 提交一条 big five 结果到服务端
 */
export async function saveUserBigFiveResult(
  type: string,
  stats: BigFiveStatItem[],
): Promise<UserBigFiveResultSaveResponse> {
  return await $fetch<UserBigFiveResultSaveResponse>("/api/user-test/user-big-five-results", {
    method: "POST",
    body: { type, stats },
  });
}

/**
 * @description 拉取当前登录用户的 big five 测试历史
 */
export async function fetchUserLatestBigFiveResults(): Promise<UserBigFiveResultsListResponse> {
  return await $fetch<UserBigFiveResultsListResponse>("/api/person-result/latest-big-five-results", {
    method: "GET",
  });
}

export async function fetchUserBigFiveInfo(stats: BigFiveStatItem[]): Promise<SelfmapReportHeaderModel> {
  return await $fetch<SelfmapReportHeaderModel>("/api/person-info/bigfive-info", {
    method: "POST",
    body: { stats },
  });
}

/**
 * @description 提交一条 RIASEC 结果到服务端
 */
export async function saveUserRiasecResult(
  type: string,
  stats: UserRiasecStats,
): Promise<UserRiasecResultSaveResponse> {
  return await $fetch<UserRiasecResultSaveResponse>("/api/user-test/user-riasec-results", {
    method: "POST",
    body: { type, stats },
  });
}

/**
 * @description 拉取当前登录用户的 RIASEC 测试历史
 */
export async function fetchUserLatestRiasecResults(): Promise<UserRiasecResultsListResponse> {
  return await $fetch<UserRiasecResultsListResponse>("/api/person-result/latest-riasec-results", {
    method: "GET",
  });
}

/**
 * @description 提交一条九型人格结果到服务端
 */
export async function saveUserEnneagramResult(
  type: string,
  stats: UserEnneagramStats,
): Promise<UserEnneagramResultSaveResponse> {
  return await $fetch<UserEnneagramResultSaveResponse>("/api/user-test/user-enneagram-results", {
    method: "POST",
    body: { type, stats },
  });
}

/**
 * @description 拉取当前登录用户的九型人格测试历史
 */
export async function fetchUserLatestEnneagramResults(): Promise<UserEnneagramResultsListResponse> {
  return await $fetch<UserEnneagramResultsListResponse>("/api/person-result/latest-enneagram-results", {
    method: "GET",
  });
}
