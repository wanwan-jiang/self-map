<template>
  <div class="min-h-screen flex flex-col selection:bg-primary/30">
    <AuthTopBar report-scene report-tab="test" />
    <RiasecTest v-if="!hasType" />
    <PersonFinish v-else :test-type="RIASEC_TYPE_KEY" />
    <AuthFooterLinks />
  </div>
</template>

<script setup lang="ts">
import { usePersonTestCompletion } from "~/composables/person_test/usePersonTestCompletion";
import { RIASEC_TYPE_KEY, RIASEC_SUBMIT_EVENT } from "../variables/variable";

//检测是否已提交
const { hasType } = usePersonTestCompletion(RIASEC_TYPE_KEY, RIASEC_SUBMIT_EVENT);
</script>
