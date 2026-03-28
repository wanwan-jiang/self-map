<script setup lang="ts">
import { useLoginStore } from "../../../stores/login";

const props = defineProps<{
  /** 未传时使用占位文案，后续可由父级或 store 注入 */
  displayName?: string;
}>();

const loginStore = useLoginStore();

const resolvedDisplayName = computed(() => props.displayName ?? "用户12345");

/**
 * @description 退出登录：将 `loginSuccess` 置为 `false`，并进入 `/login`（替换当前历史记录，避免后退仍停留在需登录态页面）。
 */
const onLogout = async (): Promise<void> => {
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
