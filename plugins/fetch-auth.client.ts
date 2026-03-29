/**
 * @description 在客户端为所有 $fetch 请求自动附加 Bearer token（来自 localStorage）。
 */
import { AUTH_TOKEN_STORAGE_KEY } from "~/utils/authToken";

export default defineNuxtPlugin({
  name: "fetch-auth",
  enforce: "pre",
  setup() {
    const withAuth = $fetch.create({
      onRequest({ options }) {
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
