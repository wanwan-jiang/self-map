<script setup lang="ts">
import type { SelfmapInsightCardModel } from "../../types/selfmapReportType";
import InfoInsightCard from "./InfoInsightCard.vue";

defineProps<{
  cards: SelfmapInsightCardModel[];
}>();
</script>

<template>
  <div class="md:col-span-7 grid grid-cols-1 gap-6">
    <InfoInsightCard v-for="item in cards" :key="item.id" :card="item" />
  </div>
</template>
