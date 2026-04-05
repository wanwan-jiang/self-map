<script setup lang="ts">
import {
  ENNEAGRAM_TYPE_KEY,
  ENNEAGRAM_STATS_KEY,
  RIASEC_STATS_KEY,
  RIASEC_TYPE_KEY,
  BIG_FIVE_STATS_KEY,
  BIG_FIVE_TYPE_KEY,
  MBTI_STATS_KEY,
  MBTI_TYPE_KEY,
} from "~/variables/variable";
import { useLoginStore } from "../../../stores/login";
import { clearAuthToken, getAuthToken, getAuthUsername } from "~/utils/authToken";

const props = defineProps<{
  /** 未传时使用占位文案，后续可由父级或 store 注入 */
  displayName?: string;
}>();

const loginStore = useLoginStore();

const cachedUsername = ref<string | null>(null);

function syncUsernameFromStorage(): void {
  if (!import.meta.client) {
    return;
  }
  if (getAuthToken() && getAuthUsername()) {
    cachedUsername.value = getAuthUsername();
  } else {
    cachedUsername.value = null;
  }
}

onMounted(() => {
  syncUsernameFromStorage();
});

watch(
  () => loginStore.loginSuccess,
  (ok) => {
    if (ok) {
      syncUsernameFromStorage();
    }
  },
);

const resolvedDisplayName = computed(() => props.displayName ?? cachedUsername.value ?? "");

/**
 * @description 退出登录：先清本地 token（避免全局 $fetch 仍带 Bearer），再调服务端 `clearUserSession` 清 Cookie，并 `fetch` 同步 `useUserSession` 内存态。
 */
const onLogout = async (): Promise<void> => {
  clearAuthToken();
  const { fetch: fetchUserSession, clear: clearServerSession } = useUserSession();
  try {
    await $fetch("/api/user/logout", { method: "POST", credentials: "include" });
  } catch {
    try {
      await clearServerSession();
    } catch {
      // 仍继续清理本地 UI 态
    }
  }
  try {
    await fetchUserSession();
  } catch {
    // 拉取会话失败时仍以本地为准
  }
  cachedUsername.value = null;
  loginStore.clearLoginSuccess();

  await navigateTo("/login", { replace: true });
};
</script>

<template>
  <div class="group relative flex items-center gap-2">
    <button
      type="button"
      class="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-outline-variant/30 bg-surface-container-highest transition-all hover:border-primary/50"
      aria-expanded="false"
      aria-haspopup="true"
    >
      <span class="material-symbols-outlined text-primary-dim">person</span>
    </button>
    <span class="max-w-[140px] truncate text-sm font-bold text-on-surface md:max-w-[200px]">
      {{ resolvedDisplayName }}
    </span>
    <div
      class="invisible absolute left-0 top-full z-50 mt-2 w-48 origin-top-left translate-y-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
    >
      <div
        class="overflow-hidden rounded-xl border border-primary/30 bg-slate-950/90 shadow-2xl shadow-black/40 ring-1 ring-primary/15 backdrop-blur-2xl"
      >
        <div class="p-1">
          <!-- <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-on-surface-variant transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <span class="material-symbols-outlined text-[20px]">account_circle</span>
            个人资料
          </button>
          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-on-surface-variant transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <span class="material-symbols-outlined text-[20px]">settings</span>
            设置
          </button> -->
          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-error transition-colors hover:bg-error/10"
            @click="onLogout"
          >
            <span class="material-symbols-outlined text-[20px]">logout</span>
            退出登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
