import type { UserBigFiveResultSaveResponse, BigFiveStatItem } from "../../types/userBigFiveResultType";

/**
 * @description 提交一条 Big Five 结果到服务端持久化（userId 由服务端从会话解析）。
 */
export async function saveUserBigFiveResult(
  type: string,
  stats: BigFiveStatItem[],
): Promise<UserBigFiveResultSaveResponse> {
  return await $fetch<UserBigFiveResultSaveResponse>("/api/user/big-five-results", {
    method: "POST",
    body: { type, stats },
  });
}
