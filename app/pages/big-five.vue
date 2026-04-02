<template>
  <div class="min-h-screen flex flex-col selection:bg-primary/30">
    <AuthTopBar report-scene report-tab="test" />
    <BigFiveTest v-if="!hasType" />
    <PersonFinish v-else :test-type="BIG_FIVE_TYPE_KEY" />
    <AuthFooterLinks />
  </div>
</template>

<script setup lang="ts">
import { usePersonTestCompletion } from "~/composables/person_test/usePersonTestCompletion";
import { BIG_FIVE_TYPE_KEY, BIG_FIVE_SUBMIT_EVENT } from "../variables/variable";

const { hasType } = usePersonTestCompletion(BIG_FIVE_TYPE_KEY, BIG_FIVE_SUBMIT_EVENT);
</script>
