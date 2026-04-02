<template>
  <div class="min-h-screen flex flex-col selection:bg-primary/30">
    <AuthTopBar report-scene report-tab="test" />
    <EnneagramTest v-if="!hasType" />
    <PersonFinish v-else :test-type="ENNEAGRAM_TYPE_KEY" />
    <AuthFooterLinks />
  </div>
</template>

<script setup lang="ts">
import { usePersonTestCompletion } from "~/composables/person_test/usePersonTestCompletion";
import { ENNEAGRAM_TYPE_KEY, ENNEAGRAM_SUBMIT_EVENT } from "../variables/variable";

//检测是否已提交
const { hasType } = usePersonTestCompletion(ENNEAGRAM_TYPE_KEY, ENNEAGRAM_SUBMIT_EVENT);
</script>
