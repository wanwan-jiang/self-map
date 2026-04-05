/**
 * @description 在客户端为所有 $fetch 请求自动附加 Bearer token（来自 localStorage）。
 */
import { AUTH_TOKEN_STORAGE_KEY } from "~/variables/variable";

export default defineNuxtPlugin({
  name: "fetch-auth",
  enforce: "pre",
  setup() {
    const withAuth = $fetch.create({
      onRequest({ request, options }) {
        const path = typeof request === "string" ? request : String(request);
        // nuxt-auth-utils 会话接口依赖 Cookie，勿附加 Bearer，避免与模块内部处理冲突
        if (path.includes("/api/_auth")) {
          return;
        }
        const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
        if (!token) {
          return;
        }
        const headers = new Headers(options.headers as HeadersInit | undefined);
        if (!headers.has("Authorization")) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        options.headers = headers;
      },
    });
    globalThis.$fetch = withAuth as typeof $fetch;
  },
});
