/**
 * @description 退出登录：在当前请求上调用 nuxt-auth-utils 的 `clearUserSession`，清除加密会话 Cookie（与模块内 DELETE `/api/_auth/session` 等价）。
 */
export default defineEventHandler(async (event) => {
  await clearUserSession(event);
  return { ok: true as const };
});
