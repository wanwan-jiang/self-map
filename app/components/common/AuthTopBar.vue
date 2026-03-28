<script setup lang="ts">
import { useLoginStore } from "../../../stores/login";

const route = useRoute();
const loginStore = useLoginStore();
const loginSuccess = computed<boolean>(() => {
  return loginStore.loginSuccess;
});
const isReportScene = computed<boolean>(() => {
  return route.path === "/mbti" || route.path === "/mbti-test" || route.path === "/selfmap-info";
});

const activeTab = computed<"test" | "report">(() => {
  return route.path === "/selfmap-info" ? "report" : "test";
});
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
          <NuxtLink
            to="/selfmap-info"
            class="font-medium transition-colors duration-300"
            :class="
              activeTab === 'report'
                ? 'border-b-2 border-primary pb-1 text-primary'
                : 'text-slate-400 hover:text-slate-100'
            "
          >
            报告
          </NuxtLink>
        </div>
      </div>

      <div v-if="isReportScene" class="flex items-center gap-4">
        <div v-if="!loginSuccess">
          <button
            class="bg-transparent text-white px-6 py-2 rounded-full font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
          >
            登录
          </button>
          <button
            class="bg-primary px-6 py-2 rounded-full text-on-primary-container font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
          >
            注册
          </button>
        </div>
        <AuthUserMenu v-else />
      </div>

      <div v-else class="flex items-center gap-4">
        <a class="text-sm font-medium text-slate-400 transition-colors duration-300 hover:text-slate-100" href="#">
          帮助中心
        </a>
      </div>
    </div>
  </header>
</template>
