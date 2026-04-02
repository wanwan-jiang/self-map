<template>
  <div class="min-h-screen flex flex-col selection:bg-primary/30">
    <AuthTopBar report-scene report-tab="test" />
    <BigFiveFinish v-if="hasBigFiveType" />
    <BigFiveTest v-else />
    <AuthFooterLinks />
  </div>
</template>

<script setup lang="ts">
const hasBigFiveType = ref(false);
const BIG_FIVE_TYPE_KEY = 'big_five_type';
const BIG_FIVE_SUBMIT_EVENT = 'big-five-submit-success-changed';

const syncBigFiveTypeStatus = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  hasBigFiveType.value = Boolean(window.localStorage.getItem(BIG_FIVE_TYPE_KEY));
};

onMounted(() => {
  syncBigFiveTypeStatus();
  window.addEventListener('storage', syncBigFiveTypeStatus);
  window.addEventListener(BIG_FIVE_SUBMIT_EVENT, syncBigFiveTypeStatus);
});

onUnmounted(() => {
  window.removeEventListener('storage', syncBigFiveTypeStatus);
  window.removeEventListener(BIG_FIVE_SUBMIT_EVENT, syncBigFiveTypeStatus);
});
</script>
