/**
 * @description 浏览器端保存登录接口返回的 token，供 $fetch 拦截器附加 Authorization 头使用。
 */
import { AUTH_TOKEN_STORAGE_KEY, AUTH_USERNAME_STORAGE_KEY, AUTH_USER_ID_STORAGE_KEY } from "~/variables/variable";
import {
  MBTI_TYPE_KEY,
  MBTI_STATS_KEY,
  BIG_FIVE_TYPE_KEY,
  BIG_FIVE_STATS_KEY,
  RIASEC_TYPE_KEY,
  RIASEC_STATS_KEY,
  ENNEAGRAM_TYPE_KEY,
  ENNEAGRAM_STATS_KEY,
} from "~/variables/variable";

export function setAuthToken(token: string): void {
  if (import.meta.server) {
    return;
  }
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
}

export function getAuthToken(): string | null {
  if (import.meta.server) {
    return null;
  }
  return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function setAuthUsername(username: string): void {
  if (import.meta.server) {
    return;
  }
  localStorage.setItem(AUTH_USERNAME_STORAGE_KEY, username);
}

export function setAuthUserId(userId: string): void {
  if (import.meta.server) {
    return;
  }
  localStorage.setItem(AUTH_USER_ID_STORAGE_KEY, userId);
}

export function getAuthUserId(): string | null {
  if (import.meta.server) {
    return null;
  }
  return localStorage.getItem(AUTH_USER_ID_STORAGE_KEY);
}

export function getAuthUsername(): string | null {
  if (import.meta.server) {
    return null;
  }
  return localStorage.getItem(AUTH_USERNAME_STORAGE_KEY);
}

export function clearAuthToken(): void {
  if (import.meta.server) {
    return;
  }
  localStorage.removeItem(MBTI_TYPE_KEY);
  localStorage.removeItem(MBTI_STATS_KEY);
  localStorage.removeItem(BIG_FIVE_TYPE_KEY);
  localStorage.removeItem(BIG_FIVE_STATS_KEY);
  localStorage.removeItem(RIASEC_TYPE_KEY);
  localStorage.removeItem(RIASEC_STATS_KEY);
  localStorage.removeItem(ENNEAGRAM_TYPE_KEY);
  localStorage.removeItem(ENNEAGRAM_STATS_KEY);
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_USERNAME_STORAGE_KEY);
  localStorage.removeItem(AUTH_USER_ID_STORAGE_KEY);
  navigateTo("/login");
}
