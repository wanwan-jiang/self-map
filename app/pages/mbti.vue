<template>
  <div class="min-h-screen flex flex-col selection:bg-primary/30">
    <AuthTopBar report-scene report-tab="test" />
    <MbtiFinish v-if="isSubmitSuccess" />
    <MbtiTest v-else />
    <AuthFooterLinks />
  </div>
</template>

<script setup lang="ts">
import { useMbtiStore } from "../../stores/mbti";

const mbtiStore = useMbtiStore();
const { isSubmitSuccess } = storeToRefs(mbtiStore);
</script>
