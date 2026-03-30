import { getAuthToken } from "~/utils/authToken";

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) {
    return;
  }
  const raw = getAuthToken();
  if (!raw?.trim()) {
    return;
  }
  return navigateTo("/mbti", { replace: true });
});
