<script setup lang="ts">
import { getAuthToken } from "~/utils/authToken";

const viewReportError = ref(false);
const route = useRoute();

const hasMbtiType = ref(false);
const MBTI_TYPE_KEY = "mbti_type";
const MBTI_SUBMIT_EVENT = "mbti-submit-success-changed";
// SSR 期间没有 localStorage，避免导致页面 500
if (typeof window !== "undefined") {
  hasMbtiType.value = Boolean(window.localStorage.getItem(MBTI_TYPE_KEY));
}
/** 与 localStorage 中的 token 同步，用于顶栏登录态展示 */
const hasToken = ref(false);

function syncAuthTokenFromStorage(): void {
  if (!import.meta.client) {
    return;
  }
  hasToken.value = Boolean(getAuthToken());
}

function syncMbtiTypeFromStorage(): void {
  if (!import.meta.client) {
    return;
  }
  hasMbtiType.value = Boolean(window.localStorage.getItem(MBTI_TYPE_KEY));
}

onMounted(() => {
  syncAuthTokenFromStorage();
  syncMbtiTypeFromStorage();
  window.addEventListener("storage", syncAuthTokenFromStorage);
  window.addEventListener("storage", syncMbtiTypeFromStorage);
  window.addEventListener(MBTI_SUBMIT_EVENT, syncMbtiTypeFromStorage);
});

onUnmounted(() => {
  window.removeEventListener("storage", syncAuthTokenFromStorage);
  window.removeEventListener("storage", syncMbtiTypeFromStorage);
  window.removeEventListener(MBTI_SUBMIT_EVENT, syncMbtiTypeFromStorage);
});

watch(() => route.fullPath, syncAuthTokenFromStorage);
const isReportScene = computed<boolean>(() => {
  return (
    route.path === "/mbti" ||
    route.path === "/big-five" ||
    route.path === "/riasec" ||
    route.path === "/enneagram" ||
    route.path === "/selfmap-info" ||
    route.path === "/test-board"
  );
});

const activeTab = computed<"test" | "report">(() => {
  return route.path === "/selfmap-info" ? "report" : "test";
});

const reportTabLinkClass = computed(() =>
  activeTab.value === "report" ? "border-b-2 border-primary pb-1 text-primary" : "text-slate-400 hover:text-slate-100",
);

const onReportTabBlockedClick = (): void => {
  if (hasMbtiType.value) {
    void navigateTo("/selfmap-info");
    return;
  }
  viewReportError.value = true;
};
</script>

<template>
  <header class="w-full h-[50px] bg-slate-950/80 backdrop-blur-xl">
    <div class="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6">
      <div class="flex items-center gap-8">
        <div class="flex h-full items-center">
          <div
            class="font-[&quot;Manrope&quot;] text-2xl font-black tracking-tighter text-primary leading-none shrink-0"
          >
            SelfMap
          </div>
        </div>

        <div v-if="isReportScene" class="hidden md:flex gap-6">
          <NuxtLink
            to="/mbti"
            class="font-medium transition-colors duration-300"
            :class="
              activeTab === 'test'
                ? 'border-b-2 border-primary pb-1 text-primary'
                : 'text-slate-400 hover:text-slate-100'
            "
          >
            测评
          </NuxtLink>
          <button
            type="button"
            class="font-medium transition-colors duration-300"
            :class="reportTabLinkClass"
            @click="onReportTabBlockedClick"
          >
            报告
          </button>
        </div>
      </div>

      <div v-if="isReportScene" class="flex items-center gap-4">
        <div v-if="!hasToken" class="flex items-center gap-2">
          <NuxtLink
            to="/login"
            class="inline-flex items-center justify-center bg-transparent text-white px-6 py-2 rounded-full font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
          >
            登录
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="inline-flex items-center justify-center bg-primary px-6 py-2 rounded-full text-on-primary-container font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
          >
            注册
          </NuxtLink>
        </div>
        <AuthUserMenu v-else />
      </div>

      <div v-else class="flex items-center gap-4">
        <a class="text-sm font-medium text-slate-400 transition-colors duration-300 hover:text-slate-100" href="#">
          帮助中心
        </a>
      </div>
    </div>

    <PopUp v-if="viewReportError" :info-report="true" @close="viewReportError = false" />
  </header>
</template>
