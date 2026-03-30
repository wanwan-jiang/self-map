<template>
  <div class="min-h-screen flex flex-col selection:bg-primary/30">
    <AuthTopBar report-scene report-tab="test" />
    <MbtiFinish v-if="isSubmitSuccess" />
    <MbtiTest v-else />
    <AuthFooterLinks />
  </div>
</template>

<script setup lang="ts">
const isSubmitSuccess = ref(false);

// SSR 期间没有 localStorage，避免导致 /mbti 页面 500
if (typeof window !== "undefined") {
  isSubmitSuccess.value = Boolean(window.localStorage.getItem("isSubmitSuccess"));
}
</script>
