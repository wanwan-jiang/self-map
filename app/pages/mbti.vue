<template>
  <div class="min-h-screen flex flex-col selection:bg-primary/30">
    <AuthTopBar report-scene report-tab="test" />
    <MbtiFinish v-if="hasMbtiType" />
    <MbtiTest v-else />
    <AuthFooterLinks />
  </div>
</template>

<script setup lang="ts">
const hasMbtiType = ref(false);
const MBTI_TYPE_KEY = 'mbti_type';
const MBTI_SUBMIT_EVENT = 'mbti-submit-success-changed';

const syncMbtiTypeStatus = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  hasMbtiType.value = Boolean(window.localStorage.getItem(MBTI_TYPE_KEY));
};

onMounted(() => {
  syncMbtiTypeStatus();
  window.addEventListener('storage', syncMbtiTypeStatus);
  window.addEventListener(MBTI_SUBMIT_EVENT, syncMbtiTypeStatus);
});

onUnmounted(() => {
  window.removeEventListener('storage', syncMbtiTypeStatus);
  window.removeEventListener(MBTI_SUBMIT_EVENT, syncMbtiTypeStatus);
});
</script>
