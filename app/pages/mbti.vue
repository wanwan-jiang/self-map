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
const SUBMIT_SUCCESS_KEY = "isSubmitSuccess";
const SUBMIT_SUCCESS_EVENT = "mbti-submit-success-changed";

const syncSubmitSuccess = (): void => {
  if (typeof window === "undefined") {
    return;
  }
  isSubmitSuccess.value = Boolean(window.localStorage.getItem(SUBMIT_SUCCESS_KEY));
};

onMounted(() => {
  syncSubmitSuccess();
  window.addEventListener("storage", syncSubmitSuccess);
  window.addEventListener(SUBMIT_SUCCESS_EVENT, syncSubmitSuccess);
});

onUnmounted(() => {
  window.removeEventListener("storage", syncSubmitSuccess);
  window.removeEventListener(SUBMIT_SUCCESS_EVENT, syncSubmitSuccess);
});
</script>
