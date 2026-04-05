/**
 * @description 登录/注册页路由守卫：基于 nuxt-auth-utils 会话 Cookie（`/api/user/login` 中 `setUserSession` 已写入）。
 * 服务端与客户端均 `fetch` 会话后根据 `loggedIn` 重定向；客户端另用 localStorage token 兜底（兼容仅本地有旧 token 的情况）。
 */
import { getAuthToken } from "~/utils/authToken";

export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn, fetch: fetchSession } = useUserSession();

  try {
    await fetchSession();
  } catch {
    // 会话接口异常时仍允许进入登录/注册页
  }

  if (loggedIn.value) {
    return navigateTo("/test-board", { replace: true });
  }

  if (import.meta.client) {
    const raw = getAuthToken();
    if (raw?.trim()) {
      return navigateTo("/test-board", { replace: true });
    }
  }
});
