<template>
  <div class="min-h-screen flex flex-col selection:bg-primary/30">
    <AuthTopBar />
    <MbtiFinish v-if="isSubmitSuccess" />
    <template v-else>
      <MbtiTest />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useMbtiStore } from "../../stores/mbti";

const mbtiStore = useMbtiStore();
const { isSubmitSuccess } = storeToRefs(mbtiStore);
</script>
