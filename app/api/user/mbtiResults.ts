import type {
  UserMbtiResultSaveResponse,
  UserMbtiResultsListResponse,
  UserMbtiStats,
} from "../../types/userMbtiResultType";

/**
 * @description 拉取当前登录用户的 MBTI 测试历史（依赖会话 Cookie + Bearer）。
 */
export async function fetchUserMbtiResults(): Promise<UserMbtiResultsListResponse> {
  return await $fetch<UserMbtiResultsListResponse>("/api/person-result/mbti-results", {
    method: "GET",
  });
}

/**
 * @description 提交一条 MBTI 结果到服务端持久化（userId 由服务端从会话解析）。
 */
export async function saveUserMbtiResult(mbti: string, stats: UserMbtiStats): Promise<UserMbtiResultSaveResponse> {
  return await $fetch<UserMbtiResultSaveResponse>("/api/user-test/mbti-results", {
    method: "POST",
    body: { mbti, stats },
  });
}
