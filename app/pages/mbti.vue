<template>
  <div class="min-h-screen flex flex-col selection:bg-primary/30">
    <AuthTopBar report-scene report-tab="test" />
    <MbtiTest v-if="!hasType" />
    <PersonFinish v-else :test-type="MBTI_TYPE_KEY" />
    <AuthFooterLinks />
  </div>
</template>

<script setup lang="ts">
import { usePersonTestCompletion } from "~/composables/person_test/usePersonTestCompletion";
import { MBTI_TYPE_KEY, MBTI_SUBMIT_EVENT } from "../variables/variable";

//检测是否已提交
const { hasType } = usePersonTestCompletion(MBTI_TYPE_KEY, MBTI_SUBMIT_EVENT);
</script>
