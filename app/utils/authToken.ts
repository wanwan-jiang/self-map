/**
 * @description 浏览器端保存登录接口返回的 token，供 $fetch 拦截器附加 Authorization 头使用。
 */
export const AUTH_TOKEN_STORAGE_KEY = "selfmap_auth_token";

/** 与 token 配套的展示用用户名（与接口字段 username 一致） */
export const AUTH_USERNAME_STORAGE_KEY = "selfmap_user_name";

/** 当前登录用户在数据库中的主键（MongoDB ObjectId 字符串） */
export const AUTH_USER_ID_STORAGE_KEY = "selfmap_user_id";

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
  localStorage.removeItem("mbti_type");
  localStorage.removeItem("mbti_stats");
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_USERNAME_STORAGE_KEY);
  localStorage.removeItem(AUTH_USER_ID_STORAGE_KEY);
}
